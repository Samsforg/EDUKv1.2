# AI Architecture Decisions (ADR)

## ADR-001 — Pas de SDK IA, appels HTTP bruts

**Statut** : accepté.
**Contexte** : les SDK (`openai`, `@ai-sdk/*`, `langchain`) ajoutent du poids et des dépendances ; Edukora cible des élèves sous réseau 3G.
**Décision** : chaque provider est un adapter HTTP léger avec `fetch` + `AbortController` (timeout 30 s).
**Conséquence** : empreinte minimale, dépendances nulles, migration facile.

## ADR-002 — Ordre de fallback Groq → HF → Cloudflare → Gemini → OpenAI

**Statut** : accepté.
**Contexte** : l'architecture cible impose Groq en principal et HF/Cloudflare en replis ; le projet conserve Gemini/OpenAI (déjà configurés) comme filet de sécurité.
**Décision** : chaîne complète, providers sans clé skippés, `AI_PRIMARY_PROVIDER` permet de réordonner.
**Conséquence** : si aucune clé n'est ajoutée, le comportement actuel (Gemini) est strictement conservé.

## ADR-003 — Migration progressive par l'interface, pas de réécriture

**Statut** : accepté.
**Contexte** : `generateTutorReply` et `isTutorAIConfigured` sont importés par les routes et le frontend.
**Décision** : `tutor-ai.ts` garde son contrat ; la gateway est branchée dessous. `AI_GATEWAY_ENABLED=false` restaure le mode legacy.
**Conséquence** : aucun changement frontend, aucun risque de régression sur le flux élève.

## ADR-004 — Embeddings Gemini `gemini-embedding-2` (dim 768) par défaut

**Statut** : accepté.
**Contexte** : `GEMINI_API_KEY` est déjà en production ; `text-embedding-004` n'est plus disponible avec la clé du projet.
**Décision** : `gemini-embedding-2` avec `outputDimensionality=768` (compatible `vector(768)`), fallback HF `paraphrase-multilingual-MiniLM-L12-v2` (384).
**Conséquence** : RAG opérationnel **sans nouvelle clé** ; le script d'indexation recrée la table si la dimension change.

## ADR-005 — pgvector en PG, LIKE en SQLite (dev)

**Statut** : accepté.
**Contexte** : la couche DB est duale (SQLite local / Neon PG prod) ; `vector` n'existe que sur PG.
**Décision** : recherche cosinus `<=>` sur PG avec filtres (matières, classe, leçon) ; recherche mots-clés LIKE avec score en SQLite.
**Conséquence** : comportement dégradé mais cohérent en dev, identique à la prod en CI avec `DATABASE_URL`.

## ADR-006 — Pas de streaming (MVP)

**Statut** : accepté.
**Contexte** : la fiabilité et la simplicité priment ; le frontend affiche déjà un indicateur de frappe.
**Décision** : réponses non-stream, mêmes contrats JSON qu'avant.
**Conséquence** : aucun changement frontend ; le streaming reste une évolution possible (nouveau provider + SSE).

## ADR-007 — Rate limiting IA couche séparée

**Statut** : accepté.
**Contexte** : le quota métier (5/mois gratuit, plans) est distinct des limites d'abus (requêtes/minute, /jour).
**Décision** : `src/lib/ai/rate-limit.ts` sur la table `rate_limits` existante, fenêtres glissantes par minute (10) et par jour (100), configurables via `AI_MAX_*`.
**Conséquence** : 429 contrôlés (`ai_rate_limit`) avec `Retry-After`, indépendants du quota.

## ADR-008 — Erreurs jamais brutes vers le frontend

**Statut** : accepté.
**Contexte** : l'audit a relevé des messages d'erreur techniques transmis au client.
**Décision** : la gateway ne remonte que `null`/message contrôlé ; les détails sont journalisés (logs JSON `[ai]`, Sentry).
**Conséquence** : UX dégradation douce (réponse locale), opérabilité conservée côté serveur.

## ADR-009 — Mémoire pédagogique construite à la volée

**Statut** : accepté.
**Contexte** : les données élèves existent (lesson_reads, user_progress) ; aucun nouveau stockage requis.
**Décision** : bloc « mémoire » (dernières leçons, leçons en cours, matières favorites) injecté dans le prompt, RAG filtré par matières favorites.
**Conséquence** : personnalisation progressive sans coût de stockage, désactivable par l'absence de `userId`.

## ADR-010 — Table `document_chunks` hors `NO_ID_TABLES`

**Statut** : accepté.
**Contexte** : `run()` ajoute `RETURNING id` pour les INSERT PG sauf tables listées.
**Décision** : `document_chunks` a une clé `id SERIAL` et n'est pas dans la liste → les INSERT retournent l'id (utile pour de futurs upserts).
**Conséquence** : aucun impact sur les INSERT du script (qui gère ses propres batches).
