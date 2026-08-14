# AI Testing — Stratégie de tests

## 1. Commandes

```bash
npm run typecheck   # tsc --noEmit
npx jest            # 14 suites / 123 tests
npx jest tests/ai-gateway.test.ts        # gateway + fallback
npx jest tests/ai-rag.test.ts            # chunker + RAG SQLite + RAG PG (si DATABASE_URL défini)
npx jest tests/ai-personalization.test.ts # rate limit IA + mémoire pédagogique
```

## 2. Couverture IA

| Sujet | Fichier | Cas clés |
|---|---|---|
| Activation gateway | `ai-gateway.test.ts` | auto-enable, `AI_GATEWAY_ENABLED=false`, flag explicite |
| Chaîne de providers | `ai-gateway.test.ts` | ordre, `AI_PRIMARY_PROVIDER`, skip sans clé, chaîne vide |
| Fallback | `ai-gateway.test.ts` | échec 429/500, réponse vide, troncature 2000, success sur le 2ᵉ provider |
| Intégration tutor | `ai-gateway.test.ts` | contrat `generateTutorReply`, prompt Kora + profil, échec → null |
| Chunker | `ai-rag.test.ts` | textes courts/longs, headings, maxLength, overlap, métadonnées |
| RAG SQLite | `ai-rag.test.ts` | mots-clés, filtres grade/matière/leçon, contexte formaté, injections |
| RAG PG | `ai-rag.test.ts` | recherche vectorielle + filtres (exécuté si `DATABASE_URL` défini, sinon no-op) |
| Rate limit IA | `ai-personalization.test.ts` | défauts env, limites minute/jour, compteurs par sujet |
| Mémoire élève | `ai-personalization.test.ts` | leçons lues, en cours, matières favorites, format du bloc |

## 3. Tests de non-régression

Les 14 suites couvrent l'ensemble du projet (auth, quotas, webhooks GeniusPay, rate-limit, ligue/XP, validation, export, RGPD, intégration API, schéma PG). Le contrat `/api/tutor` est testé via `api.integration.test.ts`.

## 4. Validation en environnement PG réel (optionnel)

```bash
docker run -d --name edukora-pg-rag -e POSTGRES_PASSWORD=test123 -e POSTGRES_DB=edukora -p 5433:5432 pgvector/pgvector:pg16
export DATABASE_URL="postgresql://postgres:test123@localhost:5433/edukora" DATABASE_SSL_DISABLED=true GEMINI_API_KEY=...
npm run ai:index-courses
npx jest tests/ai-rag.test.ts
```

## 5. Watcher d'indexation (quota Gemini)

En cas de quota Gemini atteint (1000 req/jour), `npm run ai:watch-index` attend la libération puis indexe :
`DATABASE_URL="postgresql://..." AI_EMBEDDING_PROVIDER=gemini GEMINI_API_KEY="..." npm run ai:watch-index`
(réglages : `AI_WATCH_POLL_MINUTES`, `AI_WATCH_DEADLINE_MINUTES` — cf. `RAG_SETUP.md`).
