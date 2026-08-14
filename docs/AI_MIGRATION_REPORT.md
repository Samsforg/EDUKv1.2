# AI Migration Report — Rapport de migration du Tuteur IA

> Date : 2026-08-11 — État final du projet « Reconfiguration du Tuteur IA ».

## 1. Résumé

Le Tuteur IA « Kora » est passé d'un appel LLM unique (Gemini) à une **AI Gateway multi-provider** (Groq principal, Hugging Face, Cloudflare, Gemini, OpenAI) avec **RAG sur PostgreSQL/pgvector** et **personnalisation** par profil élève — **sans aucune modification du frontend ni des contrats API**.

## 2. Périmètre livré

### Phase 0 — Audit
- Rapport complet : `docs/AI_ARCHITECTURE_AUDIT.md` (13 fichiers IA analysés, flux, risques, points d'intégration).

### Phase 1 — AI Gateway
- `src/lib/ai/` : types, gateway, 5 providers (Groq, HF, Cloudflare, Gemini, OpenAI), logger, prompts centralisés.
- `src/lib/tutor-ai.ts` : contrat conservé, branché sur la gateway.
- `.env.example` : variables `AI_*`, `GROQ_*`, `HF_*`, `CLOUDFLARE_*` ajoutées.
- `AI_GATEWAY_ENABLED` + `AI_PRIMARY_PROVIDER` : bascule / réordonnancement.

### Phase 2 — RAG
- `EmbeddingProvider` abstrait : Gemini `gemini-embedding-2` (768) par défaut (clé déjà en prod), HF en alternative.
- Table `document_chunks` (+ `vector(768)` en PG, extension `vector`) créée par `initDb` en dual-mode.
- Chunker markdown (sections/paragraphes/phrases, 1200 car., overlap 100).
- `npm run ai:index-courses` : indexation idempotente (chapitres + leçons, embeddings, batches, `ai_index_status`).
- `npm run ai:watch-index` : watcher qui attend la libération du quota Gemini puis relance l'indexation automatiquement (poll + deadline configurables).
- `searchChunks` : cosine `<=>` sur PG (filtres matières/classe/leçon), LIKE avec score en SQLite.
- Injection de jusqu'à 5 extraits dans le prompt système (consignes anti-hallucination).

### Phase 3 — Personnalisation
- `src/lib/ai/memory.ts` : dernières leçons, leçons en cours, matières favorites (tables existantes).
- RAG filtré par matières favorites ou par `subjectId`/`lessonId` envoyés par l'API (optionnels, rétro-compatibles).

### Phase 4 — Rate limiting & sécurité
- `src/lib/ai/rate-limit.ts` : fenêtres minute (10) et jour (100), configurables (`AI_MAX_*`).
- Branché sur `/api/tutor` (par utilisateur) et `/api/tutor/demo` (par IP) → 429 `ai_rate_limit` avec `Retry-After`.
- Aucune clé exposée au client ; logs JSON sans secrets ; erreurs techniques jamais envoyées au frontend.

### Phase 5 — Qualité & documentation
- 14 suites / 123 tests (dont 9 nouveaux : gateway, fallback, RAG, rate-limit IA, mémoire).
- `docs/AI_ARCHITECTURE.md`, `AI_SETUP.md`, `RAG_SETUP.md`, `AI_PROVIDER_FALLBACK.md`, `AI_TESTING.md`, `AI_ARCHITECTURE_DECISIONS.md`, `AI_MIGRATION_REPORT.md`.

## 3. Vérifications effectuées

| Vérification | Résultat |
|---|---|
| `npm run typecheck` | OK |
| `npx jest` (14 suites) | 123/123 |
| Pipeline d'indexation réel (PG pgvector Docker + embeddings Gemini) | 4 chunks OK, table vector(768), `ai_index_status` mis à jour |
| Recherche vectorielle réelle (PG + embeddings Gemini) | pertinence vérifiée + filtres matière/classe |
| Idempotence du script d'indexation | relance sans recréation (fix `atttypmod`) |
| Mode legacy (`AI_GATEWAY_ENABLED=false`) | comportement OpenAI → Gemini conservé |
| Build Next.js | OK |

## 4. Déploiement restant (recommandé)

1. Ajouter les variables Vercel : `AI_GATEWAY_ENABLED`, `GROQ_API_KEY`, `GROQ_MODEL`, `AI_MAX_REQUESTS_PER_MINUTE`, `AI_MAX_DAILY_REQUESTS` (optionnels : `HF_API_KEY`, `HF_MODEL`, `CLOUDFLARE_*`).
2. `npm run ai:index-courses` avec `DATABASE_URL` de production (Neon) — indexation des 455 chapitres + 763 leçons (~quelques minutes).
3. `npx vercel deploy --prod --yes`.
4. Vérifier : `POST /api/tutor/demo` (réponse Kora), `POST /api/tutor` connecté (quota + RAG + mémoire), logs `[ai]` (provider utilisé).

## 5. Évolutions possibles

- Streaming (SSE) par provider — décision documentée (ADR-006).
- Cache de réponses canoniques (questions génériques sans donnée élève).
- Admin : interface de statut d'indexation (`ai_index_status`).
- Encore plus de granularité : embedding par section de leçon, quiz incorporés dans les chunks.
