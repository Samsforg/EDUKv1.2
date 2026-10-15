# P2.32 — Audit de conformité : Vercel (edukora.net) + Neon (production)

- Date : 2026-10-15 17:01:00
- Auteur : Audit automatisé (opencode)
- Périmètre : Code déployé sur Vercel, schéma DB Neon, non-publication de secrets.

## 1) État Vercel
- Projet : edukora-app (prj_yIkyDDcDaYbH1tsUeCzYEbswonGf), org team_S92B7zTXodce3RcmMWKVn2Vd
- Framework : Next.js 16.3.8 (node 24.x)
- Production actuelle (ready) : edukora-7vz6vuny0 (dpl_972cao42Qf7aTWeGpDUQaZ7Kvifn)
- Création prod : 2026-10-12 09:26:08 UTC (il y a 3j selon CLI)
- Build : Turbopack, duration ~1m14s build + ~35s post-build
- Commit déployé : `9c47a55`22716d9f0b9d5b2bfb8780a88f37a0b4f (githubCommitSha)
- Branche : master (githubCommitRef)
- Repo : Samsforg/EDUKv1.2 (public)
- Domaines vérifiés : edukora.net, www.edukora.net, edukora-app.vercel.app
- SSO Protection : ll_except_custom_domains

## 2) Live check edukora.net
- GET https://edukora.net/api/health → HTTP 200
- Réponse : {"ok":true,"service":"edukora-api","timestamp":...,"warnings":[]}

## 3) Variables d'env Vercel (production) — présence
Clés présentes en production (extrait) : ADMIN_EMAIL/PASSWORD, BREVO_API_KEY, CRON_SECRET, DATABASE_URL (sensitive), GA4_API_SECRET, GEMINI_API_KEY/TUTOR_MODEL, GENIUSPAY_API_KEY/SECRET/WEBHOOK_SECRET, GROQ_API_KEY/MODEL, MAIL_FROM_EMAIL, NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_CLARITY_ID, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_SENTRY_DSN, NEXT_PUBLIC_VAPID_PUBLIC_KEY, OPENROUTER_API_KEY, SENTRY_DSN, SESSION_SECRET, SMTP_HOST/PORT/USER/PASS, VAPID_PRIVATE/PUBLIC_KEY, WHATSAPP_*.
- BLOB_READ_WRITE_TOKEN (P1 selon env-validation) : non visible dans l'extrait récupéré (sensitive/absent de la liste complète) — à surveiller.
- GENIUSPAY_WEBHOOK_SECRET : présent en prod.
- GENIUSPAY_API_SECRET : présent en prod (comme confirmé antérieurement).

## 4) Base Neon (production) — audit lecture seule
- URL utilisée : fournie dans 
eon-url.txt (temp, supprimée après audit).
- Serveur : PostgreSQL 18.6
- Base : 
eondb (user 
eondb_owner)
- Tables totales : 77 (schéma public)
- Tables ciblées (référence code) :
  - nalytics_events, ssignment_submissions, udit_logs, adges, challenge_contributions, course_progress, lessons, users, webhook_events, idempotency_keys, exam_attempts, subscriptions, subscription_plans, etc. — présentes au besoin.
- Migration/repérage : aucune table de migration commune identifiée explicitement (seulement contenu applicatif).
- État colonnes attendues (référence db.ts + init.ts + nalytics-db.ts) :

| Table | Colonnes attendues | Statut Neon |
|---|---|---|
| users | id, email, session_epoch, referral_bonus_at, is_test | **MANQUANTES** : session_epoch, eferral_bonus_at |
| webhook_events | event_id, provider, processed_at | **OK** (toutes présentes) |
| idempotency_keys | key, created_at | **OK** (toutes présentes) |
| exam_attempts | id, score, timed_out, completed_at | **MANQUANTE** : 	imed_out |
| analytics_events | id, event, user_id, created_at | **OK** (toutes présentes) |

## 5) Conformité code <-> DB prod
- Code HEAD (`9c47a55`, déployé) : src/lib/init.ts ajoute `users.session_epoch` (DEFAULT 0) + `users.referral_bonus_at` (NULL). db.ts ajoute `exam_attempts.timed_out` (INTEGER/BOOLEAN selon dialecte). src/lib/analytics-db.ts garantit nalytics_events. webhook_events/idempotency_keys existent dans DDL.
- Neon prod actuel : **désynchronisé sur 3 colonnes** :
  1. `users.session_epoch` → absente
  2. `users.referral_bonus_at` → absente
  3. `exam_attempts.timed_out` → absente

En conséquence :
- Les chemins utilisant session_epoch (invalidation HMAC / rotation) peuvent échouer à niveau SQL (ALTER TABLE/additionnelle non appliquée en prod, ou requêtes dépendantes) selon l'init runtime.
- L'idempotence parrainage (eferral_bonus_at) ne sera pas effective en prod tant que la colonne n'existe pas.
- `exam_attempts.timed_out` manquante → risque d'échec sur INSERT/UPDATE si le code écrit cette colonne (même si init() tente ALTER TABLE IF NOT EXISTS côté app ; selon état exact, peut dépendre de PG).
- webhook_events + idempotency_keys + nalytics_events → **conformes**.

## 6) État Vercel/Neon synthétique
- **Production déployée** : conforme au commit `9c47a55` (master). Build Ready. Aliases edukora.net/www.edukora.net OK.
- **DB Neon prod** : schéma partiellement aligné avec HEAD. Les migrations additifs (session_epoch, eferral_bonus_at, 	imed_out) **ne sont pas encore présents** en prod.
- **Live health** : 200 OK (connexion DB prod fonctionnelle). Aucune alerte critique visible.
- **Vercel SSO** : ll_except_custom_domains (mur SSO confirmé, ne bloque pas edukora.net).
- **Secrets** : GENIUSPAY_API_SECRET présent en prod (edukora-app) — cohérent avec précédents audits.

## 7) Recommandations (sans action destructive)
- **Mise à jour schéma Neon (prudente)** : appliquer les 3 ALTER TABLE additifs en prod (lecture seule audit → écriture doit être manuelle/sécurisée) :
  - ALTER TABLE users ADD COLUMN IF NOT EXISTS session_epoch INTEGER NOT NULL DEFAULT 0;
  - ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_bonus_at TEXT;
  - ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS timed_out INTEGER NOT NULL DEFAULT 0; (ou BOOLEAN selon usage SQLite)
- **Vérifier migrate() au démarrage** (src/lib/init.ts) : s'exécute-t-il à froid sur Vercel (serverless) ? Les ALTER TABLE IF NOT EXISTS peuvent passer la 1re fois ; à confirmer en logs.
- **BLOB_READ_WRITE_TOKEN** : vérifier présence effective en prod Vercel (P1). S'il est absent, certaines routes cron/blob retourneront 503 (explicite) — acceptable s'inutilisé, mais à confirmer.
- **Neon isolation** : edu-kv1-2 distinct (alias séparé). Pas d'indice de croisement dans cet audit.
- **PG concurrency** : p2144 reste skippé (pas de TEST_DATABASE_URL) — **ne pas déclarer validé**.

## 8) Verdict
- **Vercel (edukora.net)** : **CONFORME** au code HEAD `9c47a55`. Déploiement sain, health OK, domaines corrects.
- **Neon prod** : **PARTIELLEMENT CONFORME** — webhook_events, idempotency_keys, nalytics_events OK. **ÉCART** sur `users.session_epoch`, `users.referral_bonus_at`, `exam_attempts.timed_out` (absentes). À corriger en prod (ALTER TABLE additifs).

**Rapport non suivi (git add) — archivé tel quel.**
## 9) Headers de sécurité (https://edukora.net)

Vérifiés via HEAD (lecture seule) :
- Strict-Transport-Security : max-age=63072000; includeSubDomains; preload → OK
- Content-Security-Policy : présent (nonce + domaines autorisés) → OK
- X-Content-Type-Options : nosniff → OK
- X-Frame-Options : DENY → OK (frame-ancestors self aussi via CSP moderne)
- Referrer-Policy : strict-origin-when-cross-origin → OK
- Permissions-Policy : camera=(), microphone=(), geolocation=(), payment=() → OK
- Cache-Control : private, no-cache, no-store, max-age=0, must-revalidate → OK (dynamique)
- Cross-Origin-Opener-Policy : same-origin → OK
- Cross-Origin-Resource-Policy : same-origin → OK

Conclusion sécurité : **conforme** (headers présents, cohérents avec 
ext.config.mjs).

**Verdict global** : Vercel prod conforme à `9c47a55`, headers sécurité OK, health OK. Neon prod partiellement conforme (webhook/idempotency/analytics OK ; `users.session_epoch`, `users.referral_bonus_at`, `exam_attempts.timed_out` absentes).

## 10) Patch SQL pour aligner Neon prod au HEAD

Les colonnes manquantes identifiées ci-dessus doivent être ajoutées avec IF NOT EXISTS (idempotents, sans risque sur données existantes).

`sql
-- Alignement schéma Neon prod avec HEAD (9c47a55)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS session_epoch INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS referral_bonus_at TEXT;

ALTER TABLE exam_attempts
  ADD COLUMN IF NOT EXISTS timed_out INTEGER NOT NULL DEFAULT 0;
`

Notes :
- session_epoch initialise à 0 (tokens existants sans epoch conservent 0 jusqu'à rotation).
- eferral_bonus_at NULL autorisé (prime jamais accordée).
- 	imed_out INTEGER (cohérent avec SQLite; si PG prefere BOOLEAN, 	imed_out BOOLEAN NOT NULL DEFAULT FALSE est aussi valide). Le code db.ts utilise BOOLEAN en PG et INTEGER en SQLite.

À exécuter en **lecture seule préalable** : les colonnes sont bien absentes (confirmé par audit). Exécuter avec compte restreint à DDL sur ces tables.

