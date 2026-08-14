# AI Architecture — Kora (Tuteur IA Edukora)

Architecture cible mise en place dans le cadre du projet « Reconfiguration du Tuteur IA ».
Doc racine : lire ensuite `AI_SETUP.md`, `RAG_SETUP.md`, `AI_PROVIDER_FALLBACK.md`, `AI_TESTING.md`, `AI_ARCHITECTURE_DECISIONS.md`, `AI_MIGRATION_REPORT.md`.
État initial : `AI_ARCHITECTURE_AUDIT.md`.

---

## 1. Vue d'ensemble

```
Frontend (/tuteur-ia, /tuteur-ia-edukora)
   │  POST /api/tutor { message, chatId?, subjectId?, lessonId? }
   ▼
Route API (src/app/api/tutor/route.ts)
   ├─ Auth HMAC stateless (src/lib/session.ts)
   ├─ Quota par plan (src/lib/quotas.ts)            → 429 quota_exceeded
   ├─ Rate limit IA (src/lib/ai/rate-limit.ts)      → 429 ai_rate_limit
   ├─ Historique (16 derniers messages) + XP/ligue
   └─ generateTutorReply(ctx)  (src/lib/tutor-ai.ts)
        ├─ Mémoire pédagogique (src/lib/ai/memory.ts)          [si userId]
        ├─ RAG (src/lib/ai/rag.ts + embeddings + pgvector)     [PG prod]
        │     └─ filtre par matières favorites / lessonId
        ├─ Prompt système centralisé (src/lib/ai/prompts.ts)
        └─ AI Gateway (src/lib/ai/gateway.ts)
             ├─ GroqProvider        (principal)
             ├─ HuggingFaceProvider (fallback 1)
             ├─ CloudflareProvider  (fallback 2)
             ├─ GeminiProvider      (fallback 3 / mode legacy)
             └─ OpenAIProvider      (fallback 4 / mode legacy)
             → retour : { text, provider, model }
        └─ si null → localReply() (regex hors-ligne, route)
```

## 2. Modules

| Module | Rôle |
|---|---|
| `src/lib/ai/types.ts` | Contrats communs : `AIChatMessage`, `AIProvider`, `AICompletion`, `TutorReplyContext` |
| `src/lib/ai/gateway.ts` | Sélection de la chaîne (`AI_GATEWAY_ENABLED`, `AI_PRIMARY_PROVIDER`), itération avec logs, court-circuit |
| `src/lib/ai/providers/*.ts` | Adapters HTTP bruts (sans SDK) : groq, huggingface, cloudflare, gemini, openai |
| `src/lib/ai/providers/base.ts` | `fetchWithTimeout`, `sanitizeText` (tronque à 2000 car.) |
| `src/lib/ai/prompts.ts` | Prompt système « Kora » centralisé + profil élève |
| `src/lib/ai/embeddings.ts` | `EmbeddingProvider` abstrait : Gemini (`gemini-embedding-2`, dim 768) et HF (dim 384) |
| `src/lib/ai/chunker.ts` | Découpage markdown par sections/paragraphes/phrases (taille 1200, overlap 100) |
| `src/lib/ai/rag.ts` | `searchChunks` (PG : cosine `<=>` ; SQLite : LIKE score), `buildRAGContextBlock`, `buildTutorRAGContext` |
| `src/lib/ai/memory.ts` | Mémoire pédagogique : dernières leçons, leçons en cours, matières favorites |
| `src/lib/ai/rate-limit.ts` | Fenêtres par minute et par jour (`AI_MAX_*`) sur la table `rate_limits` |
| `src/lib/ai/logger.ts` | Logs structurés JSON `[ai]` (jamais de secrets) |
| `src/lib/tutor-ai.ts` | Point d'entrée public, contrat stable (`generateTutorReply`, `isTutorAIConfigured`) |
| `scripts/ai-index-courses.mjs` | Indexation RAG (CLI, `npm run ai:index-courses`) |

## 3. Données

- `document_chunks` : chunks du programme (leçons + chapitres) avec métadonnées `lesson_id`, `chapter_id`, `subject_id`, `grade_id` et `embedding vector(768)` en PG.
- `ai_index_status` : état de l'indexation (provider, modèle, dimension, nombre de chunks, date).
- PG : extension `vector` créée par `initDb` et par le script d'indexation.
- SQLite (dev) : recherche par mots-clés (LIKE) sans embeddings — comportement dégradé mais fonctionnel.

## 4. Comportements garantis

- Contrats API existants inchangés : `POST /api/tutor`, `GET /api/tutor`, `POST /api/tutor/demo`, `GET /api/tutor/quota`.
- Erreurs frontend contrôlées : 400/401/429 documentés ; toute erreur LLM → `localReply` ou message de repli, jamais d'erreur technique brute.
- Aucune clé API côté client ; variables serveur uniquement.
- Basculable : `AI_GATEWAY_ENABLED=false` → comportement legacy (OpenAI → Gemini).
