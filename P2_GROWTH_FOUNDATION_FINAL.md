# P2 — GROWTH FOUNDATION : rapport final

> **Phase « P2 — GROWTH FOUNDATION »** — audit-first de l'existant growth /
> analytics avant toute modification, définition du funnel canonique et du
> contrat KPI, tests de fondation, verdict.
>
> Date : 08/10/2026 · Base : `master` @ `bef324b` (= `origin/master`, working
> tree propre avant travail) · Rapport : 17 sections ·
> Verdict : **PASS WITH OBSERVATIONS** (§17).

---

## 1. Contexte, objectif et priorités

**Objectif P2** : rendre Edukora **mesurable** avant de la rendre **automatique**
— funnels, attribution, activation, conversion, revenus et rétention doivent
reposer sur des fondations auditées, testées et non fabriquées.

Priorités appliquées : **FIABILITÉ > OBSERVABILITÉ > SIMPLICITÉ > PERFORMANCE >
AUTOMATISATION**.

**Ce que P2 a fait** :
1. audit read-only complet de la chaîne analytics/growth (aucune modification
   de code applicatif) ;
2. définition du funnel canonique (§6) et du contrat KPI (§16) sur la base du
   code **réellement instrumenté** ;
3. création de `tests/p2-growth-foundation.test.ts` (**98 tests**) qui exécute
   ce contrat et verrouille l'état des dettes documentées ;
4. validations locales + contrôles production (§15, §17).

**Ce que P2 n'a PAS fait** (interdits respectés, §2) : aucun refactor, aucune
migration, aucune route nouvelle, aucun CRM/n8n/Growth AI, aucun backfill de
rétention, aucun changement MRR/pricing, aucune donnée fabriquée.

---

## 2. Périmètre et règles absolues

| Règle | État P2 |
|---|---|
| Pas de refactor global | ✅ 0 fichier `src/` modifié |
| Pas de CRM / n8n / WhatsApp / Growth AI / chatbot | ✅ rien de créé |
| Pas de migration destructive, pas de suppression prod | ✅ aucune écriture prod |
| Pas de création `referrals` / `courses` (G2) | ✅ interdit + verrou test |
| Pas de changement MRR / pricing / curriculum | ✅ MRR inchangé (§16) |
| Pas de fausses données (rétention, historique) | ✅ unavailable explicite (§12) |
| Pas de secrets dans logs/rapport | ✅ `DATABASE_URL` jamais affiché |
| Pas de routes publiques nouvelles | ✅ 0 nouvelle route |
| G1 non corrigé sauf nécessité absolue | ✅ non corrigé, documenté + verrou (§14) |

---

## 3. Méthode d'audit et preuves

**Sources lues (code)** : `src/lib/analytics.ts`, `src/lib/analytics-db.ts`,
`src/app/api/analytics/track/route.ts`, `src/lib/attribution.ts`,
`src/lib/utm-report.ts`, `src/lib/business-metrics.ts`,
`src/lib/conversion-report.ts`, `src/lib/test-users.ts`,
`src/app/api/growth/metrics/route.ts`, `src/lib/growth/data/store.ts`,
`src/app/api/premium/webhook/route.ts`, `src/components/EdukoraAnalytics.tsx`,
`src/app/espace-admin/analytics/page.tsx`, `src/app/espace-admin/revenus/page.tsx`,
`src/lib/db.ts` (SCHEMA), `src/lib/growth/ai/types.ts`.

**Documents de référence** : `docs/analytics-data-contract.md` (contrat P0.8→P1.2),
`docs/analytics-funnel.md`, `docs/growth-metrics.md` (KPI 3h), `docs/acquisition-ci-v1.md`.

**Recherches** : emitters/lecteurs par événement (`trackEvent(EVENTS.*)`,
littéraux), writers serveur, `countFunnelForDay`, `retention`, `growth_*`,
`FROM referrals|courses`, `ARR/ARPU/landing_views/unique_sessions/activation_rate`,
`GROUP BY event`.

**SQL production** : `DATABASE_URL` absent de la session →
**`DIRECT PROD SQL AUDIT = NOT AVAILABLE`** (jamais demandé, jamais affiché).
Substituts : health publique, CI GitHub, état git local (§4, §16).

---

## 4. État de la plateforme (pré-travail)

| Contrôle | Résultat |
|---|---|
| `git status` | propre · branche `master` |
| `HEAD` = `origin/master` | `bef324b` *fix(p2.0): harden schema init…* |
| CI GitHub (dernier run) | `37708931265` completed/**success** @ `bef324b` |
| Health `https://edukora.net/api/health` | **200**, `ok=true`, `warnings=[]` |
| Vercel (edge) | `Server: Vercel`, `X-Vercel-Id: cpt1::iad1::…` — projet `edukora-app` (`prj_yIkyDDcDaYbH1tsUeCzYEbswonGf`) |
| API Vercel | **non disponible en session** (aucun `VERCEL_TOKEN`) — contrôle via health + CI |
| SCHEMA `db.ts` | 62 tables (baseline P2.0) · prod 77 tables · 15 hors SCHEMA = EXPECTED |

---

## 5. Cartographie : événements, sources, lecteurs, idempotence, tests

**36 événements** = 33 clés `EVENTS` + `pageview` (hors EVENTS) + `activated` +
`purchase` (serveur). Chaque EVENTS a **≥ 1 producteur** dans `src/`
(vérifié par test, §15).

| event | source | stocké | lecteur dédié | idempotence | test producteur |
|---|---|---|---|---|---|
| `pageview` | T2 client (`EdukoraAnalytics`) | ✅ | growth (normalisé `page_view`) | aucune | P2 §3 |
| `landing_viewed` | client | ✅ | générique admin | aucune (tiers dédup) | P2 §2 |
| `return_visit` | client (localStorage) | ✅ | générique | idem | P2 §2 |
| `cta_clicked` | client (listener délégué) | ✅ | générique | `dedupe:false` côté tiers | P2 §2 |
| `referral_clicked` | client (`?ref=`) | ✅ | générique | aucune | P2 §2 |
| `signup_started` | client | ✅ | growth + dashboard 7j | aucune | P2 §2 |
| `signup_step_2_completed` | T3 script inline | ✅ | générique | aucune | P2 §1/§2 (sync) |
| `signup_completed` | client | ✅ | growth + `utm-report` | aucune | P2 §2 |
| `login_completed` | client (3 portails) | ✅ | growth | aucune | P2 §2 |
| `ab_test_variant` | client | ✅ | générique | aucune | P2 §2 |
| `pricing_variant_viewed` | client | ✅ | générique | aucune | P2 §2 |
| `course_opened` | client | ✅ | growth | aucune | P2 §2 |
| `lesson_started` | client | ✅ | growth (+ déclenche activation) | — | P2 §2/§4 |
| `lesson_completed` | client | ✅ | growth | aucune | P2 §2 |
| `quiz_started` / `quiz_completed` | client | ✅ | growth + dashboard 7j | aucune | P2 §2 |
| `fiche_opened` | client | ✅ | growth | aucune | P2 §2 |
| `fiche_read` / `fiche_saved` / `fiche_unsaved` | client | ✅ | générique | aucune | P2 §2 |
| `simulateur_started` / `simulateur_completed` | client | ✅ | growth | aucune | P2 §2 |
| `ai_tutor_opened` / `ai_question_sent` | client | ✅ | growth | aucune | P2 §2 |
| `subject_selected` / `grade_selected` | client | ✅ | générique | aucune | P2 §2 |
| `begin_checkout` | client (PlanSelector) | ✅ | growth (+ `_unique_checkouts`) | aucune | P2 §2 |
| `add_payment_info` | client (USSD) | ✅ | growth | aucune | P2 §2 |
| `subscription_started` | client (CTA) | ✅ | growth + dashboard 7j | aucune | P2 §2 |
| `referral_code_copied` / `referral_link_shared` | client | ✅ | growth (`referralCount`) | aucune | P2 §2 |
| `quota_exceeded` | client (3 surfaces) | ✅ | growth | aucune | P2 §2 |
| `push_permission_granted` / `denied` | client | ✅ | générique | aucune | P2 §2 |
| **`activated`** | **serveur** (`maybeRecordActivation`) | ✅ | growth (`activation`) | **index unique partiel** | p10 §9-11, P2 §6 |
| **`purchase`** | **serveur** (webhook → `recordPurchase`) | ✅ | growth (`purchase`) | **`WHERE NOT EXISTS`** | p10 §12-15, P2 §6 |

- « générique » = `espace-admin/analytics` (`GROUP BY event`, flux brut libellé
  non filtré). Ces événements sont **stockés sans KPI dédié** (observation §14).
- Déduplication : interne = **aucune** (décision contrat §6 maintenue) ; tiers =
  `Set sentThisView` ; serveur = auto-dédup (seuls `activated` et `purchase`).

---

## 6. Funnel canonique (définition P2)

| Étape | Événements | Identifiant | Mesurable ? | Limite assumée |
|---|---|---|---|---|
| **VISIT** | `pageview` | session hashée si cookie, sinon NULL | partiel (comptage de vues) | pas de visiteurs uniques first-party (anonymes `session_id NULL`) |
| **ACQUISITION** | `landing_viewed` → `cta_clicked` → (`referral_clicked`) | appareil / session | oui (stockage) | **lecteur générique uniquement** (pas de KPI dédié §16) |
| **SIGNUP** | `signup_started` → `signup_step_2_completed` → `signup_completed` (+ `login_completed`) | `user_id` si résolu | **oui** | UTM uniquement dans `signup_completed` |
| **ENGAGEMENT** | `course_opened`, `lesson_*`, `quiz_*`, `fiche_*`, `simulateur_*`, `ai_*` | `user_id` / NULL | **oui** | pas de durée de session |
| **ACTIVATION** | **`activated`** (dérivé serveur à la 1ʳᵉ `lesson_started` identifiée) | `user_id` **serveur** | **oui** | anonymes jamais activables (non attribuables) |
| **CONVERSION** | intention : `begin_checkout`, `add_payment_info`, `subscription_started` — réalité : **`purchase`** (webhook) + couche C | `user_id` serveur | **oui** | ne jamais sommer DB + GA4 ; MRR = couche C seule |
| **RÉTENTION** | `return_visit`, `login_completed`, `lesson_*`/`quiz_*` | appareil / `user_id` | partiel | **D1/D7/D30 = indisponible** tant que volume insuffisant (§12) |

Règles : un événement non instrumenté = **non mesurable** (jamais deviné) ;
chaque étape a ≥ 1 producteur vérifié par test (P2 §4) ; les lecteurs KPI sont
centralisés dans `/api/growth/metrics` (liste verrouillée par le test §4).

---

## 7. Règles comptes test (KPI propres)

- **Définition** (`src/lib/test-users.ts`) : compte de test =
  `users.is_test = 1` **OU** email sur domaine réservé (RFC 2606 / `.test` /
  convention `*.test@edukora.net`) — union JS (`isTestUser`) et SQL
  (`realUsersWhere` / `testUsersWhere` / `testEmailOnlyWhere`) synchronisés.
- **Application** :
  - Business Metrics (`getCanonicalMRR`, `getBusinessRevenue`,
    `getConversionStats`, revenus page) → test **exclus** ;
  - Product Analytics : `countFunnelForDay` + `getAnalyticsDashboard7d` +
    `utm-report` → test exclu dès que `user_id` résolu **serveur** ;
  - événements **anonymes** : non filtrables (pas d'identité) → comptés
    séparément (`*_anon`), jamais transformés en inscrits attribuables ;
  - nettoyage : `DELETE /api/admin/test-accounts` purge aussi `analytics_events`.
- **Observation persistante (DECISION_REQUIRED depuis P1.2)** : `role='admin'`
  n'entre pas dans le prédicat → `support@edukora.net` compte comme réel.
  Aucune décision métier trouvée → **prédicat inchangé**, verrouillé par test
  (`p12-dashboard-hygiene`).

---

## 8. Attribution (first-party, first-touch)

- **Capture** : `src/lib/attribution.ts` — liste blanche de **7 clés**
  (`utm_source/medium/campaign/content/term`, `gclid`, `fbclid`), valeurs
  ≤ 120 car., stockées en `sessionStorage` (`edukora_attr`, onglet),
  montée via `<AttributionCapture />` dans le layout.
- **`ref` (parrainage) volontairement exclu** de la map d'attribution :
  chaîne serveur `/api/auth/register` → `users.referred_by` — jamais mélangé
  aux UTM (contrat §5).
- **Aucune colonne** `utm_*` sur `users`, aucune PII dans le module.
- **Jointure conversion** : par `user_id` sur les props de `signup_completed`.
- **Lecture agrégée unique** : `src/lib/utm-report.ts`
  (`getUtmAcquisitionReport`) — GROUP BY 7 clés courtes (`source`, `medium`…),
  par segment `signups` / `activated` / `purchasers` / `purchases` /
  `mrr_active_cents`, signups anonymes isolés en `unattributed_signups`,
  branche dialectale `IS_PG` (`json_extract` vs `props::json->>`),
  statut `ok | indisponible` (jamais de zéros silencieux), comptes test exclus.
- **Verrous** : capture exclusive à `attribution.ts` (+ lecture `utm-report.ts`)
  — test `analytics-contract` §E ; chaîne `?ref=` → `referred_by` → abonnement
  joignable — test p10 §8.

---

## 9. session_id et identité

- **Identité toujours serveur** : `getCurrentUser()` dans
  `/api/analytics/track` — le corps de requête n'est jamais source d'identité
  (anti-spoofing, test P2 §5 + analytics-contract §B).
- **session_id haché sha256** (`fingerprint()`) : le cookie `edukora_session`
  n'est jamais archivé en clair ; migration rétroactive P0.9
  (`hashLegacySessionIds`, test `p09-referral-session`) ; visiteurs anonymes →
  `NULL` (limite VISIT §6).
- **Bornes d'ingestion** : `event` ≤ 80 car., `url` ≤ 500 car., 400 si event
  vide ; **`guardApi("POST /api/analytics/track")`** → rate limit
  `api_general` (120 req/min/IP) — verrouillé P2 §5 (la doc « pas de rate
  limit » d'`analytics-funnel.md` §6 est obsolète, notée contrat §1).
- PII : identité et contenu filtrés côté tiers
  (`sanitizeForThirdParty`, tests `analytics-funnel-pii`) ; le stockage
  first-party garde le contexte complet (finalité propre, contrat §2).

---

## 10. Idempotence / déduplication

| Couche | Mécanisme | Verdict P2 |
|---|---|---|
| `activated` | index unique partiel `idx_analytics_activated(user_id) WHERE event='activated'` + `ON CONFLICT DO NOTHING`, déclencheur `lesson_started` identifié | infaillible (concurrence comprise) — p10 §10, P2 §6 |
| `purchase` | `INSERT … SELECT … WHERE NOT EXISTS` sur `"transaction_id":"<ref>"` (LIKE échappé `!`) | rejeu webhook = 1 ligne — p10 §14, P2 §6 |
| webhook GeniusPay | table `webhook_events`, `event_id` = event:ref:timestamp, rejeu → `duplicate: true` | traitement unique — P2 §6 |
| client (interne) | **aucune** (envoi avant le test de dédup) | risque = double rendu StrictMode en dev seulement — décision contrat §6 **maintenue** |
| tiers (GA4/Clarity) | `Set sentThisView` (clé événement+params) ; `cta_clicked` en `dedupe:false` | asymétrie assumée, documentée |

**Décision P2** : aucune infrastructure d'idempotence générale à créer — les
deux writers serveur auto-dédupliqués suffisent.

---

## 11. Conversion paiement (purchase first-party)

- **Chaîne** : webhook GeniusPay (signature HMAC + tolérance 300 s +
  `webhook_events`) → abonnement `active` → `sendReceiptIfActive` →
  `recordPurchase` (**await** avant le 200, catch → `logger.warn`) → reçu email
  + miroir GA4 MP (fire-and-forget).
- **Identité** : `user_id` serveur ; `transaction_id = provider_subscription_id`
  ; `value_cents = price_cents` ; `payment.initiated` / `payment.failed`
  n'atteignent jamais le writer.
- **Frontière couche A/C** : `purchase` ne modifie **jamais** MRR ni revenue
  (tests p10 §19-20 + P2 §6/§8 : `business-metrics`/`conversion-report`
  ne contiennent pas `analytics_events` ; `growth/metrics` ne lit ni
  `subscriptions` ni `price_cents`).
- **Ne pas sommer** `purchase` (DB) + achat GA4 MP.

---

## 12. Rétention (D1 / D7 / D30)

- **État** : `retention: null` +
  `retentionStatus: "non_disponible:_retention_d7_historique_insuffisant"`
  dans `/api/growth/metrics` — **jamais de faux 0** (test P2 §7, p10 §23).
- **Pourquoi** : première activation remontable **2026-09-29** → premier jour
  D7 éligible 2026-10-06 (première lecture sur journée complète 2026-10-07) ;
  **n = 1 activation** ≪ 30 (volume minimal `growth-metrics.md` §11.1).
- **D1 / D30** : aucune implémentation (verrou P2 §7 : aucun code
  `retention_d1/d30` dans `src/`) — n'afficher que lorsque les données seront
  suffisantes, avec statut explicite sinon.
- **Rétention partielle disponible** : `return_visit` (appareil),
  `login_completed`, activité `lesson_*`/`quiz_*` — à ne pas présenter comme
  rétention personne.

---

## 13. Tables growth (stockage KPI)

| Table | Rôle | Écriture | Lecture | État |
|---|---|---|---|---|
| `growth_metrics` | snapshot KPI par jour (PK = `date`) | POST `/api/growth/metrics` (admin) → `saveMetrics` UPSERT portable `excluded.*` | GET (admin), `marketing/strategy.ts` | ✅ fonctionnelle (test P2 §9) |
| `growth_strategies` | plans de croissance | admin/store | admin + strategy | DDL G1 (§14) |
| `growth_contents` | contenus publiés | admin/store | admin | DDL G1 |
| `growth_recommendations` | recommandations | admin/store | admin | DDL G1 |

- **Route KPI** : GET/POST `/api/growth/metrics` — admin uniquement (403 sinon),
  POST recalcule `countFunnelForDay` (SQL portable, test exclus) puis
  `saveMetrics` ; réponse = funnel complet (§6) + statut rétention.
- **Colonnes `growth_metrics`** : `signups, active_users, premium_conversions,
  referral_count, quiz_completions, kora_interactions, page_views, utm`.
- **Noms supposés du brief** : `growth_cohorts`, `growth_funnel`,
  `growth_attribution` **n'existent nulle part** (0 référence) — verrou §9.
  Les vraies tables sont les 4 ci-dessus.
- **Hors SCHEMA `db.ts`** : ces 4 tables sont créées par `growth/data/store.ts`
  (attendu, comme `analytics_events` et les 10 tables `init.ts`).

---

## 14. Dettes documentées (non corrigées en P2)

| # | Dette | État | Décision P2 |
|---|---|---|---|
| **G1** | `store.ts` : `_init = true` posé **avant** les 4 CREATE + `.catch(() => {})` (échec jamais retenté) + `DEFAULT now()` (syntaxe PG) dans 3 des 4 DDL → divergence dev SQLite / prod PG possible | **non corrigé** (règle du prompt : sauf nécessité absolue — aucun KPI P2 ne lit que `growth_metrics`) | verrou test §9 (caractérisation + signature code) ; corriger = mettre à jour rapport + test |
| **G2** | tables `referrals` / `courses` absentes du schema | **non créées** (interdit) | verrou §9 : 0 lecteur SQL, 0 CREATE |
| E5 | taxonomie `growth/ai/types.ts` périmée (`page_view` fantôme, ignore `activated`, ignore 3f) | inchangée | verrou §1 : jamais référencée par les lecteurs |
| — | événements stockés **sans lecteur dédié** (`landing_viewed`, `cta_clicked`, `return_visit`, `referral_clicked`, `ab_test_variant`, `pricing_variant_viewed`, `push_*`, `signup_step_2_completed`, `fiche_read/saved/unsaved`, `subject_selected`, `grade_selected`) | couverts par le flux brut admin | P2 les déclare « stockés, KPI non dédié » (§5/§16) |
| — | `role='admin'` inclus dans les comptes « réels » des KPI | `DECISION_REQUIRED` (P1.2) | prédicat inchangé, verrou existant |
| — | limitation du schema guard P2.0 : présence de table ≠ conformité colonnes/types/contraintes | connue | hors scope P2 |
| — | SMTP Brevo (`smtp AUTH PLAIN 535` sur `mail.edukora.net:587`, cron reactivation) | erreur observée en logs prod | **hors scope** P2 |
| — | idempotence client absente (décision contrat §6) | assumée | maintenue (§10) |

---

## 15. Tests P2 créés

**Fichier : `tests/p2-growth-foundation.test.ts` — 98 tests, 9 blocs.**

| Bloc | Ce qu'il prouve |
|---|---|
| §1 taxonomie | 33 clés, uniques, snake_case ; sync script inline T3 ; taxonomie `types.ts` périmée jamais référencée |
| §2 producteurs | `it.each(33)` : chaque événement du contrat a ≥ 1 producteur dans `src/` |
| §3 hors EVENTS | `pageview` client exclusif ; `activated`/`purchase` **jamais** émis côté client, writers serveur présents (appels webhook/track vérifiés) |
| §4 funnel canonique | 7 étapes : producteurs ; 23 lecteurs KPI `funnel["…"]` dans growth/metrics ; flux brut admin présent ; pas de comptage KPI éparpillé ; règles ACTIVATION/CONVERSION |
| §5 ingestion | `guardApi`, troncatures 80/500, identité serveur + sha256, 400 si event vide |
| §6 idempotence | index unique `activated`, `NOT EXISTS`+`ESCAPE` purchase, dédup `webhook_events`, frontière A/C |
| §7 non-fabrication | rétention `null`+statut ; 0 code D1/D30 ; 0 `ARR` ; ARPU couche C hors test ; KPI sans source non fabriqués |
| §8 contrat KPI | sources codees de visitors/signups/activation/checkout/conversion/MRR/revenu |
| §9 tables growth | 4 tables déclarées ; `growth_metrics` roundtrip ; G1 caractérisé (table absente = dette connue, sinon échec) ; verrous G1/G2/noms supposés |

**Tripwires assumés** : les tests §9 échouent volontairement si un futur commit
corrige G1/G2 ou introduit `growth_cohorts` — mettre alors à jour le rapport et
les verrous.

**Validations (obligatoires, exécutées)** :

| Commande | Résultat |
|---|---|
| `npm test -- --runInBand` | **699/699 tests, 50 suites** (baseline P2.0 : 601/601, 49) |
| `npx tsc --noEmit` | **0 erreur** |
| `npm run lint` | **0 erreur / 232 warnings** (baseline inchangée) |
| `npm run build` | **0** (build production OK) |
| `git diff --check` | 0 |
| `git status` | **1 fichier ajouté** : `tests/p2-growth-foundation.test.ts` (aucun `src/` modifié) |

---

## 16. Contrat KPI (P2)

Règle : **chaque KPI livré a une source code ; sinon il est déclaré
« indisponible » ou « non implémenté » — jamais fabriqué.**

### Acquisition
| KPI | Définition | Source | État |
|---|---|---|---|
| `visitors` | vues `pageview` (normalisées `page_view`) | `/api/growth/metrics` | partiel : **vues**, pas d'unicité first-party (anonymes `session_id NULL`) |
| `landing_views` | `landing_viewed` | stocké, lecteur générique | **non implémenté** (pas de KPI dédié) |
| `unique_sessions` | sessions distinctes | — | **indisponible** first-party (réf. GA4) |
| `signups` | `signup_completed` (test exclus) | growth + `getAnalyticsDashboard7d` | ✅ |

### Attribution
| KPI | Source | État |
|---|---|---|
| segments UTM/gclid/fbclid → signups/activated/purchasers/MRR | `utm-report.ts` | ✅ `ok` ou `indisponible` (jamais de 0 silencieux) |
| signups sans identité | `unattributed_signups` | ✅ isolés, jamais attribués |
| parrainage (`ref`) | chaîne `?ref=` → `referred_by` | ✅ **séparé** des UTM |

### Activation
| KPI | Définition | Source | État |
|---|---|---|---|
| `activated_users` | 1 `activated`/compte (dérivé serveur) | `funnel["activated"]` | ✅ |
| `activation_rate` | activated ÷ signups | non calculé en code | **dérivable** (rapport) — jamais fabriqué (verrou §7) |

### Conversion
| KPI | Source | État |
|---|---|---|
| `checkout_started` | `funnel["begin_checkout"]` (+ `_unique_checkouts`) | ✅ |
| `subscription_started` (intention) | `funnel["subscription_started"]` | ✅ — ≠ paiement |
| `paid_users` / purchases | `funnel["purchase"]` (webhook, idempotent) | ✅ |
| `conversion_rate` | `getConversionStats()` (couche C, `subs_auth/signups_auth`, `null` si 0) | ✅ |

### Revenue (couche C seule)
| KPI | Définition inchangeable | Source | État |
|---|---|---|---|
| **MRR** | `SUM(subscriptions.price_cents) WHERE status='active' AND non-test` | `getCanonicalMRR()` | ✅ — **inchangable** |
| revenue | total + mois courant, test exclus | `getBusinessRevenue()` | ✅ |
| `ARR` | MRR × 12 si dérivé documenté | aucun code | **non implémenté** — jamais calculé (verrou §7) |
| `ARPU` | revenu ÷ payants (abonnés, test exclus) | page revenus (couche C) | ✅ |

### Retention
| KPI | Source | État |
|---|---|---|
| D1 / D7 / D30 | — | **unavailable / insufficient history** tant que n < 30 et historique insuffisant (§12) — aucun backfill |
| proxies partiels | `return_visit` (appareil), `login_completed` | partiel — à ne pas présenter comme rétention personne |

---

## 17. Validations finales, verdict, livrables

### Contrôles exécutés (après travail)
- Locaux : **699/699 tests** · `tsc` 0 · `lint` 0/232 · `build` 0 ·
  `git diff --check` 0 · arbre = **1 ajout** (`tests/p2-growth-foundation.test.ts`),
  **0 modification `src/`**.
- Production (sans `DATABASE_URL`) : health **200 / ok / warnings=[]** ; edge
  Vercel actif ; CI dernière run = **success** @ `bef324b` ; **aucun push**,
  **aucun déploiement** déclenché.
- Audit régression : aucun changement de code applicatif → routes
  login/signup/Kora/cours/quiz/pricing/subscription/admin/health inchangées ;
  les suites existantes couvrant ces domaines (`auth`, `api.integration`,
  `espace-admin-rbac`, `webhook-geniuspay`…) sont toutes vertes dans les 699.

### Observations (pourquoi pas un PASS plein)
1. **SQL production non audité directement** (`DATABASE_URL` absent) — preuves
   indirectes uniquement (health/CI/tests).
2. **API Vercel indisponible en session** (pas de token) — health + CI suffisants.
3. Dettes **G1/G2** livrées avec verrous, pas corrigées (choix conformes au
   prompt) — correction = mise à jour rapport + tests.
4. Rétention D1/D7/D30 **structurellement indisponible** (volume) — état
   explicite, aucun faux 0.
5. KPI acquisition (`landing_views`, `unique_sessions`, `activation_rate`,
   `ARR`) **non implémentés** — documentés tels quels (§16).
6. `role='admin'` toujours compté comme réel — `DECISION_REQUIRED` hérité P1.2.
7. Erreur SMTP Brevo en logs prod — hors scope, à traiter séparément.

### Verdict

```
PHASE P2 — GROWTH FOUNDATION : PASS WITH OBSERVATIONS
```

- Fondations mesurables établies et **prouvées par 98 tests** ;
- funnel canonique + contrat KPI écrits sur du code réel, sans fabrication ;
- aucune régression, aucun interdit violé, aucune donnée sensible exposée ;
- observations = dettes documentées/verrouillées et limites d'accès outil.

### Livrables
- `tests/p2-growth-foundation.test.ts` (98 tests) ;
- ce rapport `P2_GROWTH_FOUNDATION_FINAL.md` ;
- commit préparé (non poussé) : **`feat(growth): establish production-safe growth foundation`**
  — présentation « P2 IMPLEMENTATION COMPLETE » d'abord, push uniquement sur
  validation explicite (jamais automatique).
