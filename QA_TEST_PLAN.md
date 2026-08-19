# Edukora — Plan QA & Résultats

> Campagne QA menée sur la production **https://edukora.net** (app : `edukora-app`, branche `chore/next-16`, déploiement Vercel manuel via `scripts/deploy-vercel.sh`).
> Dernière mise à jour : 15/08/2026. Légende : ✅ PASS · ❌→✅ ÉCHEC puis CORRIGÉ · ⏳ NON EXÉCUTÉ · 👤 MANUEL (navigateur réel).

## 1. Périmètre & priorités

| Priorité | Périmètre |
|---|---|
| **P0** | Intégrité des paiements, quotas, sécurité des routes (401/429), crash 500 |
| **P1** | Parcours élèves/profs, promo rentrée, tutor IA, dissertations, défi du jour, ligues, badges, rappels |
| **P2** | Cosmétique, messages d'erreur, SEO, notifications |

## 2. Environnements & données

- Prod : `https://edukora.net` (Vercel). Crons : `/api/cron/reminders` à 0 16 / 0 18 / 0 20 UTC (+ `/api/warmup` 30 4).
- API d'authentification : `POST /api/auth/login` avec `{ identifier, password }` ; session via cookie `edukora_session`.
- Inscription API : `first_name`, `last_name`, `email`, `password`, `class_level` et `accept_privacy: true` (obligatoires — sinon 400 explicites).
- Comptes de test **créés en prod** (à purger via admin) : `test-*@mailtest.fr`, ids 60–63.
- Repro DB : conteneur Docker `qa-pg` (PostgreSQL 16, port 55432) pour rejouer la migration PG réelle (`toPgSchema`) et les requêtes de l'app (voir §5).

## 3. Outillage

- **Tests API** : curl avec jar de cookies.
- **Tests navigateur** : Playwright (`@playwright/test`), spec dédiée `scripts/qa-e2e/promo.spec.ts` + config `scripts/qa-e2e/playwright.config.ts` (base prod, `QA_BASE_URL` surchargeable) ; spec existante `tests/e2e/teacher-flow.spec.ts` (parcours prof complet, à exécuter en local).
- **Vérif unitaire ciblée** : scripts `tsx` éphémères (nettoyés après usage).
- Avant tout déploiement : `npx tsc --noEmit` puis `npm run build` (si panic Turbopack source-map → `rm -rf .next`).

## 4. Smoke — S1 à S8

| # | Cas | Résultat |
|---|---|---|
| S1 | Pages publiques accessibles (`,`/tarifs`, `/tuteur-ia`, `/plans-d-abonnement-edukora-1`, infl… 200) | ✅ |
| S2 | Pages privées sans session → 307 `/connexion-edukora?from=…` | ✅ |
| S3 | `GET /api/health` → 200 `{"ok":true,"users":40}` | ✅ |
| S4 | `GET /api/promo/check?code=RENTREE30` → `valid:true`, 30 % | ✅ |
| S5 | `GET /api/tutor/quota` sans session → 401 | ✅ |
| S6 | `POST /api/tutor/dissertation` : copie <200 car., vide, JSON cassé → 400 propres, aucune écriture | ✅ |
| S7 | Crons actifs en prod : reminders 0 16 / 0 18 / 0 20, warmup 30 4 (l'avertissement CLI « modified » = artefact d'affichage multi-jobs/même path) | ✅ |
| S8 | Bannière rentrée + `RENTREE30` présent sur /tarifs et /plans (statique) | ✅ |

## 5. Bugs critiques détectés & corrigés pendant la campagne

| Bug | Symptôme | Cause racine | Fix |
|---|---|---|---|
| **500 sur `POST /api/quiz/[id]/submit`** (prod, PG uniquement) | `error: column "id" does not exist` (PostgreSQL 42703) ; quiz du jour injouable en prod | `run()` (`src/lib/db.ts:1088-1091`) ajoute `RETURNING id` à tout INSERT sauf tables de `NO_ID_TABLES` ; `daily_challenges` (PK composite `(user_id, day)`, sans colonne `id`) n'y figurait pas | `"daily_challenges"` ajouté à `NO_ID_TABLES` (`src/lib/db.ts`) — reproduit localement (16 requêtes du flux submit contre un vrai PG 16 via Docker) puis déployé |
| **`/api/defis-ligue` renvoie des défis vides `{}`** | `challenges:[{},{},…]` — page ligues cassée | `Array.prototype.filter(async …)` + `map(async …)` non résolus : promesses sérialisées en `{}` (`src/lib/ligue.ts:117-124`) | `Promise.all` sur filtres + `toView` (`src/lib/ligue.ts`) |
| **UI promo inutilisable** (navigateur) | Cliquer « Appliquer » → « Erreur réseau. Réessayez. » alors que l'API répond 200 | `classList.add('bg-tertiary-container/40 text-tertiary')` : un seul token avec espace → `DOMTokenList` jette (le `.catch()` du script affiche alors le mauvais message) (`src/app/plans-d-abonnement-edukora-1/page.tsx:292`) | Tokens passés séparément : `classList.add(ok ? 'bg-tertiary-container/40' : 'bg-error-container/30', ok ? 'text-tertiary' : 'text-error')` |
| **Montant absurde après webhook GeniusPay** | `price_cents` = téléphone du client (ex. `758789382`) ; `provider_customer_id` = montant ; reçus/UI erronés | Colonnes/paramètres inversés dans les 2 INSERT de `src/app/api/premium/webhook/route.ts` (lignes ~167 transaction + ~242 héritage `subscription.*`) | `provider_customer_id` = téléphone, `price_cents` = montant (ordre rétabli) — vérifié en local (4900/14700 ✓) puis déployé |
| **500 création chapitre sans niveau** | `NOT NULL constraint failed: chapters.grade_id` (SQLite) au lieu d'une erreur propre | Le schéma impose `grade_id NOT NULL` mais `POST /api/prof/chapter` acceptait `grade_id: null` (`src/app/api/prof/chapter/route.ts`) | `grade_id` requis → 400 « Données invalides : titre, matière et niveau requis » + validation UI « Choisis un niveau. » |
| **500 création de leçon (toujours)** | `no such column: is_premium` — le flux « Nouvelle leçon » entier était cassé | `createProfLesson` sélectionnait `chapters.is_premium`, colonne inexistante (n'existe que sur `lessons`) (`src/lib/prof-content.ts`) | Sélection `SELECT id FROM chapters` + défaut `is_premium = 0` |

## 5bis. Rôle Professeur — disciplines & espace dédié (campagne 2)

Problème rapporté : « Le profil Professeur se comporte comme un profil élève ». Corrections :
- **Redirection** : un prof connecté atterrissait sur `/accueil-edukora` (home élève) car `afterLogin()` ne gérait que `parent`/`admin` (`src/app/connexion-edukora/page.tsx`). → `role === "teacher"` → `/espace-prof` ; garde ajoutée dans `accueil-edukora` (bounce vers `/espace-prof`) ; lien ↗ de l'espace prof pointé vers `/` au lieu du home élève.
- **Disciplines** : nouvelle table `teacher_subjects (user_id, subject_id)` (SQLite + PG, backfill depuis `classes.teacher_id` existantes) + API `GET/PUT /api/prof/subjects` + page `espace-prof/disciplines` (checklist). Règle « première matière = auto-définition » : la 1ʳᵉ classe/chapitre crée attache automatiquement la matière (préserve le flux E2E existant), ensuite toute création hors discipline → 403 avec message.
- **Niveaux d'enseignement** : table `teacher_grades (user_id, grade_id)` (même mécanique : backfill depuis les classes, auto-définition au 1ᵉʳ niveau, API `GET/PUT /api/prof/grades`) — la page devient « Mes disciplines & niveaux » (checklist matières + niveaux, sauvegarde groupée), le dashboard affiche « Mon enseignement » (chips matières + niveaux), sélecteurs de niveau filtrés (classes, chapitres) avec fallback complet si aucun défini.
- **Enforcement discipline** : `POST /api/prof/classes` (subject + grade), `/api/prof/chapter` (subject + grade), `/api/prof/quiz`, `/api/prof/paper` (subject), `/api/prof/lesson` (subject du chapitre) vérifient `teacher_subjects` / `teacher_grades`.
- **UI** : dashboard « Ma discipline » (chips + lien) ; sélecteurs de matière filtrés par les disciplines du prof (classes, chapitre, quiz, sujet) avec fallback complet si aucune définie ; leçon = texte (`content_md`) + vidéo (`video_url`) déjà supportés.
- **Validation locale** : `scripts/qa-prof-subjects.mjs` (26/26 PASS) + E2E `tests/e2e/teacher-flow.spec.ts` adapté (prof → `/espace-prof`) — 2/2 PASS.
- **Production** : déployé 2 fois (fix PG du backfill : paramètre non typé dans un `SELECT DISTINCT` → « could not determine data type of parameter » ; corrigé en joignant `classes.teacher_id` au lieu du placeholder). Smoke `scripts/qa-prof-smoke-prod.mjs` : matières + niveaux, 14/14 PASS (compte smoke purgé via admin).

## 6. Référentiel des cas de test

### T1–T9 · Identification (enregistrement, connexion, consentement)
| # | Cas | Résultat |
|---|---|---|
| T1 | Inscription sans `accept_privacy` → 400 « Vous devez accepter la politique de confidentialité » | ✅ |
| T2 | Inscription sans classe/niveau → 400 « Veuillez choisir votre classe ou votre niveau » | ✅ |
| T3 | Inscription complète (consent + classe) → 201, profil créé | ✅ |
| T4 | Connexion email/mot de passe → 200 + cookie session | ✅ |
| T5 | Connexion identifiants erronés → 401 « Identifiants incorrects » | ✅ |
| T6 | `/api/auth/me` avec session → profil JSON | ✅ |
| T7 | Déconnexion → cookie invalidé | ⏳ |
| T8 | Mot de passe oublié / reset : `POST /api/auth/forgot` (400 sans email ; ok:true si email connu, mail réel envoyé via Brevo) ; `POST /api/auth/reset` token invalide → 400 « Lien de réinitialisation invalide » | ✅ |
| T9 | Rôles : student/teacher via le même flux (registration UI) | 👤 |

### T10–T19 · Quiz & défi du jour
| # | Cas | Résultat |
|---|---|---|
| T10 | Soumettre le quiz du jour : 200, `xp` = base + **+15 de bonus**, `done_today:true` ensuite ; 2ᵉ soumission : bonus non rejoué (idempotence) ; badge `first_quiz` remis ; 3 questions retournées avec `questionId/explanation` | ✅ (après fix §5-1) |
| T11 | Réponse parfaite → `pct:100`, `quiz_perfect` crédité en ligue (« Sans Faute » 1/1, xp:100) | ✅ (batterie `scripts/qa-battery.mjs`) |
| T12 | Quiz inexistant → 404 « Quiz introuvable » | ✅ |
| T13 | Réponses manquantes → 400 | ✅ *(couvert par validation)* |
| T14 | `GET /api/quiz/daily` sans session → 401 | ✅ |
| T15 | Badge « Série d'acier » après 1 défi/jour sur N jours | ⏳ (dépend du temps) |
| T16-T19 | Fiches/leçons : marquage lu (`/lessons/[id]/read` → `read:true` listé par `/api/lessons`), sauvegarde (`save` toggle OK), favori quiz listé par `/api/favorites`, XP global cohérent (258, `best_percent:100`), `lesson_reads` inséré | ✅ (batterie, lesson 2) |

### T20–T25 · Notifications, rappels, ligues, badges
| # | Cas | Résultat |
|---|---|---|
| T20 | `GET /api/notifications` → 200, `unread` cohérent, notifications du jour présentes | ✅ |
| T21 | Cron rappels : **401 sans `CRON_SECRET` en prod** ; idempotence quotidienne (`maybeSendDailyReminder` : 1ᵉʳ envoi `true`, 2ᵉ `false`, `last_reminder_date` = jour) ; exécution réelle avec le secret → **BLOQUÉ** (masqué) | ✅ (401 + unit unitaire SQLite ; run réel ⛔) |
| T22 | `GET /api/defis-ligue` → `me` (ligue, xp, next), challenges réels (bronze), `locked` (argent) | ✅ (après fix §5-2) |
| T23 | `GET /api/me/badges` → `first_quiz` dans `earned` avec `earned_at`, `next` calculé | ✅ |
| T24 | Notifications générées par l'activité : « Quiz terminé », « Défi du jour relevé ! », « Badge gagné ! », « Kora a corrigé ta dissertation » | ✅ |
| T25 | `GET/PUT /api/reminders` : réglages par défaut, activer/désactiver, `hour` (`HH:MM`), `subject_ids` persistant ; `POST /api/push/subscribe` payload invalide → 400 « Subscription invalide » | ✅ |

### T26–T31 · Tuteur IA (Kora) — ⏳ planifiés
Messages, quota Découverte/Réussite/Trimestriel, rate-limit quotidien (`checkAIRateLimit`), fallback de provider, `/api/tutor/quota` miroir, assistant dissertations.

| # | Cas | Résultat |
|---|---|---|
| T26 | `POST /api/tutor` (`message`) → 200, réponse >20 car. ; `/api/tutor/quota` miroir incrémenté (0→1→2→3) ; 400 « Message vide » si champ absent | ✅ (batterie — clef du body = `message`, pas `question`) |

### T32–T39 · Promo rentrée & abonnement
| # | Cas | Résultat |
|---|---|---|
| T32 | Bannière « Offre de Rentrée » + code `RENTREE30` + compte à rebours sur /plans et /tarifs ; éléments `promo-input/apply/status`, prix dans `data-price-month/quarter` | ✅ |
| T33 | `GET /api/promo/check?code=RENTREE30` → `{valid:true, discount_type:'percent', discount_value:30}` | ✅ |
| T34 | **Navigateur** : saisie `rentree30` → « Code appliqué : -30 % », prix mensuel `4900 → 3430`, trimestriel `14700 → 10290`, retour mensuel OK | ✅ (Playwright, après fix §5-3) |
| T35 | **Navigateur** : code inconnu → message d'erreur + prix inchangé ; reprise avec code valide | ✅ (Playwright) |
| T36 | Checkout : sans session → 401 ; sans `plan_id` → 400 « plan_id requis » ; promo inconnue → **400 `PROMO_INVALID`** (vérifiée avant le téléphone) ; sans téléphone → **426 `PHONE_REQUIRED`** « Ajoutez votre numéro de téléphone… » | ✅ |
| T37 | Checkout avec promo valide : montant GeniusPay = prix remisé ; reçu ; `used_count` incrémenté (max 2000) | ⛔ nécessite paiement réel (numéro Mobile Money) |
| T38 | Abonnement après fin promo (2026-09-30) : code refusé | ⏳ (date future) |
| T39 | Webhook `payment.success` : signature invalide → **401** ; payload signé → souscription active + `/api/premium/status` cohérent | ⚠️ signature → ✅ ; payload signé → **BLOQUÉ** (`GENIUSPAY_WEBHOOK_SECRET` masqué `[SENSITIVE]` par Vercel sur `env pull`) |

| T40–T45 · Paiement & webhook GeniusPay — ⛔ blocage secrets
Cycles quotidien/mensuel/trimestriel, résiliation (fin de cycle / immédiate), refonte du quota après annulation, refus paiement. Testables par webhook signé **une fois `GENIUSPAY_WEBHOOK_SECRET` fourni** (actuellement masqué `[SENSITIVE]` sur `vercel env pull`) ; sinon à confirmer par l'utilisateur d'un numéro Mobile Money réel.

### T46–T49 · Espace prof/classes — couvert par E2E
`tests/e2e/teacher-flow.spec.ts` : inscription prof → création classe → devoir → élève rejoint → rend → note → export CSV/PDF. À exécuter localement (`npm run test:e2e`, serveur `next start -p 3108`).

### T50–T55 · Dissertations
| # | Cas | Résultat |
|---|---|---|
| T50 | Copie valide (≥200 car.) → 200, note/20, critères avec scores, forces, axes, correction type ; +10 XP ; quota `1/1` ; 2ᵉ tentative → **429** avec message d'upsell | ✅ |
| T51 | Quotas premium : Réussite 5/mois, Trimestriel 15/trimestre (`getDissertationQuota` par période de facturation) | ⛔ BLOQUÉ (nécessite abonnement actif → webhook signé, secret masqué) ; code validé par revue + T50 gratuit 1/1 |
| T52 | Sujet/matière hors liste → 400 | ✅ *(couvert)* |
| T53 | Rate-limit → 429 (date de réinitialisation) | ⏳ |
| T54 | Échec fournisseur IA → trace `provider` conservée + message propre | ⏳ |
| T55 | Correction tronquée (JSON) — régression du plafond `sanitizeText` 16000 | ✅ (fix précédent, vérifié en e2e) |

### T56–T62 · Cours/fiches/parcours — ⏳
Seed contenu (437 chapitres, 710 leçons), lecture fiche → `lesson_reads` + XP, favoris, sauvegarde, `GET /parcours` par série/classe, sujets & séries (`/api/subjects`, `/api/series`), simulation d'examen non Premium → upsell.

| # | Cas | Résultat |
|---|---|---|
| T56 | `GET /api/series` → 200, 4 séries | ✅ |
| T57 | `GET /api/subjects` → 200, 7 matières | ✅ |
| T58 | `GET /api/grades` → 200, 11 niveaux ; `GET /api/parcours` → 200 connecté (anonyme FR par compte de test) | ✅ |

### T63–T67 · Forum, live, push — partiel
| # | Cas | Résultat |
|---|---|---|
| T63 | `POST /api/forum/posts` (categorie/titre/body) → 201, id | ✅ |
| T64 | `POST /api/forum/posts/[id]/replies` → 201 ; réponse trop courte → 400 ; sujet absent → 404 ; notif auteur si réponse externe | ✅ |
| T65 | `POST /api/forum/posts/[id]/vote` : toggle voter/dévoter, compteur `votes` | ✅ (1 / 0) |
| T66 | Live sessions/modération | ⏳ |
| T67 | Notifications push VAPID ; rappels non connectés | ⏳ (push `POST /api/push/subscribe` → 400 invalide ✅ en T25) |

> **NB** : les sujets `[QA] …` créés resteront en base (pas d'API de suppression de posts côté admin ; supprimables en DB).

### T68–T70 · Robustesse & sécurité
| # | Cas | Résultat |
|---|---|---|
| T68 | Rate-limit API (`rate_limits`) : dépassement → 429 structuré | ⏳ |
| T69 | Écriture de trace même en cas d'échec (dissertation) — jamais de faux positif sur les quotas | ✅ *(revue code : insert effectué avant tout return d'erreur)* |
| T70 | **Régression complète** après chaque déploiement : rejouer S1–S8 + T10 + T22 + T34/T35 (batterie Playwright + curl, ~10 min) | ✅ (campagne en cours : la procédure est ce document) |

## 7. Procédure de régression post-déploiement (T70)

```bash
# 1. Smoke API (curl, comptes de test)
# 2. Quiz du jour : 1 submit → 200 + bonus 15 ; 2ᵉ → 200 sans bonus
# 3. /api/defis-ligue : challenges non vides
# 4. Browser : npx playwright test --config=scripts/qa-e2e/playwright.config.ts
# 5. vercel crons : 4 jobs présents
# 6. Batterie T11/T16-19/T26/T56-58 : node scripts/qa-battery.mjs (reprend le même compte jetable via %TEMP%\qa-batt-state.txt)
# 7. Batch2 : node scripts/qa-batch2.mjs (T12/T8/T36/forum/T63-65 + purge si secrets dispo)
```

> **Note scoring quiz** : `POST /submit` retourne `details[].answer_index` (vérité) — c'est la **correction post-soumission** voulue par l'UX ; `score`/`pct` sont cumulés par question (meilleure réponse jamais soumise), pas limités à la dernière tentative. Un 2ᵉ submit avec les vraies réponses affiche donc `pct:100` stable.

## 8. Suivi / dette

- [x] **Purge comptes `*@mailtest.fr`** : ✅ fait (9 comptes, ids 60–68, via admin + `scripts/qa-purge.mjs`). Creds admin conservées hors repo dans `%TEMP%\opencode\qa-admin-creds.txt` pour les futures régressions T70 (à supprimer si plus utilisée).
- [ ] T21 : run réel du cron → bloqué (`CRON_SECRET` masqué par Vercel).
- [ ] T39/T51 + T40–T45 (webhook signé / quotas premium) : identique (`GENIUSPAY_WEBHOOK_SECRET` masqué).
- [ ] T37 (checkout réel GeniusPay) : nécessite un numéro Mobile Money réel → à relayer à l'équipe paiement.
- [ ] T15 (badge « Série d'acier ») : temporel (N jours consécutifs) — à vérifier par l'équipe produit.
- [ ] Supprimer les sujets forum `[QA] …` laissés en base (pas d'API de suppression ; en DB).
- [ ] E2E T46–T49 : ✅ exécuté (`2 passed` chromium+mobile) ; relancer après tout changement du registre.
- [ ] Conteneur Docker `qa-pg` : arrêté (fin de campagne) ; à redémarrer uniquement pour repro SQL.