# AI Architecture Audit — Edukora (Kora, Tuteur IA)

> **Phase 0 du projet « Reconfiguration du Tuteur IA »** — Audit complet de l'existant.
> Aucun code n'a été modifié durant cette phase.
> Date : 2026-08-11 — Auteur : Lead Developer (audit opencode)

---

## 1. Vue d'ensemble du projet

| Élément | Valeur |
|---|---|
| **Nom** | Edukora — plateforme éducative ivoirienne (BAC/BEPC) |
| **Production** | `https://edukora.net` |
| **Framework** | Next.js **16.3.0** (App Router), React **19.2.8**, TypeScript 5.7 |
| **Styling** | Tailwind CSS 3.4, Material Symbols, design tokens maison |
| **Backend** | Routes API Next.js (`src/app/api/**`), pas de serveur séparé |
| **Base de données** | Dual-mode : **SQLite** (local, via better-sqlite3) / **PostgreSQL Neon** (production, via `pg`) |
| **Couche DB** | `src/lib/db.ts` — flag `IS_PG`, traducteurs `toPgSchema`, `toPgPlaceholders`, `toPgDatetime`, `toPgRound` |
| **Authentification** | Cookie stateless HMAC `edukora_session` (`src/lib/session.ts`), `getCurrentUser()`, `guardApi` |
| **Paiements** | GeniusPay (Mobile Money) — webhooks + abonnements |
| **Push** | web-push / VAPID |
| **Observabilité** | Sentry (`@sentry/nextjs`), Vercel Analytics |
| **Déploiement** | **Vercel** (pas Render, pas de Docker en prod — uniquement Docker local pour tester PG) |
| **Tests** | Jest (11 suites / 74 tests) + Playwright (1 spec e2e) |
| **Architecture** | PWA : service worker, manifest, offline (fiches) |

**Variables d'environnement existantes (prod Vercel vérifiées)** :
`GEMINI_API_KEY`, `GEMINI_TUTOR_MODEL`, `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `GENIUSPAY_*`, `VAPID_*`, `SENTRY_*`, `NEXT_PUBLIC_*` (analytics/URL), `GSC_VERIFICATION`.

---

## 2. Fonctionnement actuel du Tuteur IA « Kora »

### 2.1 Fichiers impliqués

| Fichier | Rôle |
|---|---|
| `src/app/api/tutor/route.ts` | **Cœur** : POST (question → réponse, quota, historique, persistance, XP) + GET (50 derniers messages) |
| `src/app/api/tutor/quota/route.ts` | GET du quota Kora + quota Fiches + plan Réussite |
| `src/app/api/tutor/demo/route.ts` | POST public (sans auth), rate-limit IP 30/h, sans persistance |
| `src/lib/tutor-ai.ts` | **Sélection provider + prompt système + appels LLM (OpenAI/Gemini)** |
| `src/lib/quotas.ts` | Calcul du quota (constantes, fenêtres, comptage) |
| `src/lib/rate-limit.ts` | Rate limiting générique (préset `tutor_demo`) |
| `src/lib/api-guard.ts` | Wrapper d'erreurs API (Sentry sur crash) |
| `src/app/tuteur-ia/page.tsx` | Page chat élève authentifié |
| `src/components/TutorDemoPage.tsx` | UI chat de démonstration (publique) |
| `src/app/tuteur-ia-edukora/page.tsx` | Landing publique SEO (embarque `TutorDemoPage`) |
| `src/proxy.ts` | Middleware : `/api/tutor/demo` public ; `/api/tutor` + `/api/tutor/quota` protégés |

### 2.2 Flux d'une question élève → réponse

```
Frontend (tuteur-ia/page.tsx)
   POST /api/tutor { message, chatId }
      → getCurrentUser()                     (401 si absent)
      → validation message ≤ 1000 caractères (400 si vide)
      → getKoraQuota(user.id)                (429 quota_exceeded si dépassé)
      → résolution chatId (nouveau ou existant)
      → SELECT 16 derniers messages (user_id + chat_id)
      → provider() :
            OPENAI_API_KEY présent → "openai" (prioritaire)
            sinon GEMINI_API_KEY  → "gemini"
            sinon null
      → generateTutorReply({ message, history, studentName, serieName, classLevel })
      → si null → localReply() (fallback par regex, hors-ligne)
      → 2 INSERT tutor_messages (user + assistant, même chat_id)
      → addXp(user.id, 2) + creditLigueChallenges(user.id, "xp_total", 2)
      → { chatId, reply }
```

### 2.3 Appels LLM (src/lib/tutor-ai.ts)

- **OpenAI** : `POST https://api.openai.com/v1/chat/completions` — `model: OPENAI_TUTOR_MODEL ?? "gpt-4o-mini"`, `max_tokens: 500`, `temperature: 0.7`, messages `[system, ...history.slice(-8), user]`.
- **Gemini** : `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key=...` — `systemInstruction`, `contents` (8 derniers messages), `maxOutputTokens: 500`, `temperature: 0.7`. Modèle par défaut : `gemini-3-flash-preview` (**incohérence** : `.env.example` indique `gemini-3.1-flash-lite`).
- **Timeout** : 30 000 ms (AbortController). **Retries : 0.** Un seul try/catch → retourne `null`.
- **Post-traitement** : réponse tronquée à 2000 caractères ; `null` si vide.

### 2.4 Prompt système actuel (extrait fidèle)

```
Tu es Kora, le tuteur IA bienveillant d'Edukora, une application éducative
ivoirienne pour les élèves préparant le BAC et le BEPC.

Ton rôle : expliquer des notions de cours (maths, physique-chimie, SVT,
français, anglais, histoire-géo), corriger des exercices, proposer des
méthodes de révision et motiver l'élève.

Règles :
- Réponds toujours en français.
- Adopte un ton chaleureux, encourageant et pédagogique.
- Explique étape par étape et donne un exemple concret quand c'est utile.
- Reste concis : 60 à 150 mots, sauf si une réponse détaillée est demandée.
- Si l'élève demande un corrigé d'exercice, explique le raisonnement avant la réponse finale.
- Ne fais jamais les devoirs à la place de l'élève : guide-le vers la solution.
- Si tu ne sais pas, propose une piste de révision plutôt qu'inventer.
- Utilise du texte simple (pas de markdown lourd ni d'emojis).

[Profil : nom / classe / série — lignes ajoutées si présentes]
```

### 2.5 Quota (src/lib/quotas.ts)

- Calcul **à la volée** (COUNT sur `tutor_messages`), jamais stocké en compteur.
- Découverte (sans abonnement) : **5 questions/mois** (mois civil UTC).
- Réussite (`interval=month`) : **30/période de facturation** (bornée par `billingPeriodStart`).
- Trimestriel (`interval=quarter`) : **100/période de facturation**.
- Annuel / inconnu : **illimité**.
- Fiches : 10/mois (séparé).
- `POST /api/tutor` → 429 si `used >= limit` ; incrément = INSERT `role='user'` **après** l'appel LLM (léger risque de dépassement en concurrence).

### 2.6 Schéma `tutor_messages` (SQLite = PG via toPgSchema)

```sql
CREATE TABLE IF NOT EXISTS tutor_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  chat_id INTEGER,
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
-- Aucun index (user_id, chat_id, role, created_at non indexés)
```

### 2.7 Contrats JSON

| Route | Requête | Réponse |
|---|---|---|
| `POST /api/tutor` | `{ message, chatId? }` | `{ chatId, reply }` / 400 / 401 / 429 (`{ error, code:"quota_exceeded", quota, plan }`) |
| `GET /api/tutor` | — | `{ messages: [{ id, role, content, created_at }] }` (50 derniers) |
| `POST /api/tutor/demo` | `{ message, history }` | `{ reply }` / 429 avec `Retry-After` |
| `GET /api/tutor/quota` | — | `{ kora, fiche, plan, decouverte_price }` |

### 2.8 Streaming

**Aucun streaming** actuellement : appels LLM non-stream, réponses en bloc. Le seul effet visuel est un indicateur de frappe côté frontend.

---

## 3. Dépendances

**Installées (package.json)** : `next`, `react`, `react-dom`, `pg`, `zod`, `web-push`, `sharp`, `jspdf`/`jspdf-autotable`, `@sentry/nextjs`, `@vercel/analytics`, `@vercel/speed-insights`.
**Dev** : `jest`, `ts-jest`, `@types/*`, `tailwindcss`, `postcss`, `autoprefixer`, `@playwright/test`, `parse5`.

**Absents (à évaluer) :**
- Aucun SDK IA (`ai`, `@ai-sdk/*`, `langchain`, `openai`…) — appels HTTP bruts. ✅ léger, à conserver comme style.
- Aucune dépendance pour pgvector (extension PostgreSQL native, pas de package nécessaire).
- Aucun package de logging structuré (pino/winston) — logs console + Sentry suffisent pour le MVP.

---

## 4. Risques identifiés

1. **Provider unique défaillant** : un seul provider tenté (OpenAI prioritaire, sinon Gemini). Échec → réponse locale par regex (très dégradée). Aucun fallback inter-provider.
2. **0 retry** : un timeout réseau (30 s) met KO la question de l'élève.
3. **Erreurs brutes exposées** : la route renvoie `{ error: "..." }` technique en cas d'échec (l'UI affiche un message d'erreur générique, mais le format 500 passe au client).
4. **Clés API** : `GEMINI_API_KEY` et `OPENAI_API_KEY` côté serveur uniquement (OK), mais absence de config centralisée des modèles (hardcode + incohérence gemini-flash-preview vs flash-lite).
5. **Pas de RAG** : le LLM répond sans jamais consulter les contenus Edukora (leçons, fiches, chapitres existent pourtant en base). Risque d'hallucination / hors-programme ivoirien.
6. **Pas de pagination d'historique** : 50 messages renvoyés au frontend, 8 au LLM — OK pour MVP mais sans purge.
7. **Pas de tests** sur tutor (route, quota, provider, fallback) — toute refonte risque de casser le flux sans détection.
8. **Index manquants** sur `tutor_messages` (volumétrie élève : 5-100 msgs/mois, faible — risque faible mais gratuit à corriger).
9. **Secrets en clair hors repo** : `opencode.json` à la racine du workspace contient des clés GeniusPay (hors périmètre, à nettoyer manuellement).
10. **`NO_ID_TABLES` / `RETURNING id`** : `run()` PG ajoute `RETURNING id` sauf tables listées — toute nouvelle table RAG devra être ajoutée si elle n'a pas de colonne `id` exploitable.

---

## 5. Points d'intégration pour l'architecture cible

| Point d'intégration | Détail |
|---|---|
| **Contrat API stable** | `POST /api/tutor { message, chatId } → { chatId, reply }` : le frontend n'a **pas besoin de changer** si on garde l'interface. |
| **`src/lib/tutor-ai.ts`** | Point unique actuel d'appel LLM → **remplacé par l'AI Gateway** (les routes l'importent déjà). |
| **`src/lib/quotas.ts`** | Réutilisable tel quel pour le rate limiting IA par plan. |
| **`src/lib/db.ts`** | Dual SQLite/PG déjà en place → extension possible avec table `document_chunks` + type `vector` (PG uniquement ; SQLite = stub/mode dégradé). |
| **Contenu pédagogique existant** | `lessons.content/content_md/content_html`, `chapters.title/description`, `subjects.name`, `grades.name` → **sources RAG idéales**, déjà en base. |
| **Profil élève** | `users.class_level`, série (jointure `series`), progression (`user_progress`), tutor_messages (historique) → personnalisation sans nouvel stockage. |
| **`init.ts`** | Migrations idempotentes (`migrate(...)`) → point d'entrée pour la migration `pgvector` / nouvelles tables. |
| **Vercel env** | Variables chiffrées côté serveur uniquement → ajouter `GROQ_API_KEY` etc. via `vercel env add`. |
| **Middleware `proxy.ts`** | Aucun changement nécessaire (routes déjà protégées / publiques). |

---

## 6. Éléments à CONSERVER (ne pas toucher)

- Les 3 routes `/api/tutor*` et leurs contrats JSON (le frontend ne change pas).
- `getKoraQuota`, `billingPeriodStart`, logique de fenêtres de facturation.
- Persistance `tutor_messages` + `chat_id` + GET 50 messages.
- XP/ligue (`addXp`, `creditLigueChallenges`) déclenchés par la route.
- Auth stateless HMAC, `guardApi`, rate-limit IP de la démo.
- Fallback local par regex (`localReply`) — dernière ligne de défense hors-ligne.
- Prompt système « Kora » (à enrichir, pas à remplacer).
- Le style d'appels HTTP bruts (pas de SDK lourd) — cohérent avec le critère « faible coût / 3G ».
- PWA, design, branding : intouchés.

---

## 7. Éléments à MODIFIER

1. **`src/lib/tutor-ai.ts`** → remplacé par l'**AI Gateway** (`src/lib/ai/gateway.ts` + providers), en conservant l'interface appelée par la route (`generateTutorReply`) ou en le branchant par-dessus (migration progressive).
2. **Prompt système** : centralisé dans un fichier dédié (`src/lib/ai/prompts.ts`) avec injectables (profil, contexte RAG, consignes anti-hallucination).
3. **Gestion d'erreurs** : les erreurs techniques ne doivent plus jamais atteindre le frontend (message utilisateur contrôlé + logs serveur structurés).
4. **`.env.example`** : ajout des variables IA (voir §11).
5. **`src/lib/db.ts`** : schéma pour les nouvelles tables RAG + index `tutor_messages` (optionnel, recommandé).

---

## 8. Éléments à AJOUTER

1. **AI Gateway** : interface `AIProvider { generateResponse, isAvailable }`, adapters `GroqProvider`, `HuggingFaceProvider`, `CloudflareProvider` (ce dernier uniquement si compte Cloudflare dispo ; sinon `NullProvider`/désactivé).
2. **Chaîne de fallback** : Groq → HF → Cloudflare → message contrôlé (avec retries limités + court-circuit).
3. **RAG** :
   - Extension `vector` (PG uniquement, idempotent).
   - Tables : `document_chunks` (chunks + métadonnées pédagogiques) et éventuellement `ai_index_status` pour l'état d'indexation.
   - Abstraction `EmbeddingProvider` (ex. modèle local-free HF ou embedding API) — découplée.
   - Script `npm run ai:index-courses` : nettoie, découpe (chunking par sections), génère embeddings, upsert, réindexation.
4. **Filtrage classe/matière** : métadonnées `class_level`, `subject_id`, `chapter_id`, `lesson_id` dans les chunks → filtre vectoriel (`WHERE metadata->>'grade' = ...` ou colonnes).
5. **Mémoire pédagogique** : bloc compact (difficulty_topics, mastered_topics, current_subject) construit depuis la base, injecté dans le prompt.
6. **Rate limiting IA** : `AI_MAX_REQUESTS_PER_MINUTE`, `AI_MAX_DAILY_REQUESTS` (table `rate_limits` existante réutilisable).
7. **Cache** : réponses de questions « canoniques » (hash du message + classe) — uniquement non-personnalisé (sans injection de données utilisateur).
8. **Logs structurés IA** : timestamp, userId anonymisé, provider, model, latency, succès/échec, fallback, RAG, tokens — jamais de secrets.
9. **Tests** : providers (mock fetch), fallback, RAG (filtrage classe/matière), sécurité, API.
10. **Documentation** : `/docs/AI_ARCHITECTURE.md`, `AI_SETUP.md`, `RAG_SETUP.md`, `AI_PROVIDER_FALLBACK.md`, `AI_TESTING.md`, `AI_ARCHITECTURE_DECISIONS.md`, `AI_MIGRATION_REPORT.md`.

---

## 9. Conflits potentiels avec l'architecture cible

| Conflit | Analyse | Résolution proposée |
|---|---|---|
| **SQLite en dev, PG en prod** | pgvector n'existe que sur PG. | Le RAG fonctionne en prod (PG Neon — vérifier que l'extension `vector` est activable ; Neon la supporte). En dev SQLite : mode dégradé (recherche texte `LIKE`/FTS) ou désactivation RAG avec warning. |
| **Provider actuel OpenAI/Gemini** | L'architecture cible met Groq en principal. | **Migration progressive** : garder OpenAI/Gemini comme providers additionnels dans la chaîne (Groq → HF → Cloudflare → Gemini/OpenAI → local), piloté par env vars. `AI_GATEWAY_ENABLED` pour basculer. |
| **Réponses non-stream** | La cible tolère « sans streaming si propre » (fiabilité > effets). | Conserver le non-streaming pour le MVP (décision documentée). |
| **Erreurs frontend** | L'UI actuelle gère `{ error }` et 429. | Conserver les codes 400/401/429 ; transformer les 500 techniques en message utilisateur contrôlé. |
| **Neon serverless pooler** | Certaines extensions nécessitent l'endpoint direct. | Vérifier `CREATE EXTENSION vector` sur l'endpoint utilisé (pooler vs direct) ; utiliser l'URL directe pour les scripts d'indexation si nécessaire. |
| **Coût / quotas gratuits** | Groq gratuit a des rate limits sévères (RPM). | Rate limiting local `AI_MAX_*` + cache + retry avec backoff. |

---

## 10. Conclusion de la phase 0

Le socle Edukora est **excellent pour la migration** :
- contrat API stable (le frontend ne bougera pas),
- quota par plan déjà fin,
- couche DB duale PG prête à l'extension,
- contenu pédagogique (455 chapitres, 763 leçons) déjà en base → sources RAG immédiates,
- style d'appels HTTP bruts = faible empreinte, compatible 3G.

**Le chantier principal est l'ajout** (gateway, fallback, RAG, embeddings, tests), **pas la réécriture**. La règle `extension > adaptation > migration progressive > réécriture` s'applique naturellement : on branche la gateway sous l'interface existante, on garde Gemini/OpenAI dans la chaîne de secours, et on active le RAG derrière un flag.

**Prochaine étape (Phase 1)** : création de l'AI Gateway (`src/lib/ai/**`) avec interface provider + adapters Groq/HF/Cloudflare + chaîne de fallback, branchée sur `generateTutorReply` sans toucher aux routes ni au frontend.
