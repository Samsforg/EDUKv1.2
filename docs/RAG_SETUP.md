# RAG Setup — Indexation et recherche des contenus Edukora

## 1. Principe

Le tuteur Kora consulte les **contenus officiels Edukora** (455 chapitres, 763 leçons) avant de répondre :

1. **Indexation** (script CLI) : charge chapitres + leçons, nettoie le HTML, découpe en chunks (1200 car., overlap 100), génère les embeddings, insère dans `document_chunks`.
2. **Recherche** (runtime) : la question de l'élève est vectorisée puis comparée (cosine) aux chunks, filtrée par matières favorites / leçon en cours / classe.
3. **Injection** : jusqu'à 5 extraits pertinents sont injectés dans le prompt système avec consignes anti-hallucination.

## 2. Exécution

```bash
# Prérequis : DATABASE_URL (PostgreSQL/Neon) + GEMINI_API_KEY ou HF_API_KEY
npm run ai:index-courses
```

### Watcher automatique (quota Gemini)

Si la limite gratuite Gemini (1000 requêtes/jour, partagée entre clés d'un même compte) est atteinte, `ai:watch-index` attend la libération puis lance l'indexation :

```bash
# Relance du watcher : remplacez par vos vraies valeurs
DATABASE_URL="postgresql://..." AI_EMBEDDING_PROVIDER=gemini GEMINI_API_KEY="..." npm run ai:watch-index
```

- Poll léger (1 requête) toutes les 5 min (`AI_WATCH_POLL_MINUTES`), deadline 12 h par défaut (`AI_WATCH_DEADLINE_MINUTES`).
- Log : `C:\Users\GESTFICHIER\AppData\Local\Temp\opencode\ai-watch.log` (sur Windows) ; succès logué `✅ Indexation RAG terminée avec succès.`
- L'indexeur étant reposable, relancer `ai:index-courses` ou le watcher à tout moment est sans risque.

Comportements du script (idempotent, reposable) :
- Crée l'extension `vector` si absente.
- Crée `document_chunks` avec la bonne dimension (768 Gemini / 384 HF) ; recrée la table si la dimension change.
- **Reprise** : les chunks déjà présents (`embedding IS NOT NULL`) sont sautés ; seuls les manquants sont indexés, avec insertion par lots (64) immédiate.
- **Robustesse** : pacing ~60 req/min (limite gratuite Gemini 1000 req/jour, partagée entre clés d'un même compte), retry auto sur 429 (attente 60 s) et erreurs 5xx (attente 30 s).
- Nettoyage final des chunks orphelins (chapitres/leçons supprimés).
- Écrit l'état dans `ai_index_status` (provider, modèle, dimension, count, date).

Exemple de sortie :
```
Préparation du schéma (pgvector)...
Sources : 1218 documents (455 chapitres, 763 leçons)
Chunks : 4821
✅ Indexation terminée : 4821 chunks (gemini, dim 768).
```

## 3. Mode SQLite (développement local)

Sans `DATABASE_URL`, le RAG fonctionne en mode dégradé : recherche par mots-clés (LIKE + score) sur `document_chunks`. La table existe via `initDb` mais reste vide tant que l'indexation n'est pas faite sur PG.

## 4. Re-indexation

- Après modification/ajout de leçons ou de chapitres : relancer `npm run ai:index-courses` (réindexation complète, rapide et sans risque).
- Changement de provider d'embeddings : le script détecte la dimension et recrée la table automatiquement.

## 5. Vérification (optionnel, avec PostgreSQL local)

```bash
docker run -d --name edukora-pg-rag -e POSTGRES_PASSWORD=test123 -e POSTGRES_DB=edukora -p 5433:5432 pgvector/pgvector:pg16
export DATABASE_URL="postgresql://postgres:test123@localhost:5433/edukora" DATABASE_SSL_DISABLED=true GEMINI_API_KEY=...
npm run ai:index-courses
npx jest tests/ai-rag.test.ts   # exécute aussi les tests PG si DATABASE_URL défini
```
