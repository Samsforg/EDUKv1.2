# Contrat de données Analytics — Edukora

> **Phases P0.8 → P1.0 — contrat avant Growth / Acquisition.**
> Le corps date de l'audit **read-only** P0.8 ; P1.0 met le contrat à jour
> sur les trois ajouts qu'il autorise : attribution first-party (§4),
> activation dérivée et purchase first-party (§3, §10), rétention explicite.
> Le code est la source de vérité : tout ce qui n'est pas instrumenté ici
> est déclaré **non mesurable**. Aucun commit, push ni déploiement.
>
> Complète `docs/analytics-funnel.md` (taxonomie 3f) et
> `docs/growth-metrics.md` (KPI 3h) sans les remplacer.

Dernière vérification : 06/10/2026 — `HEAD 269603a` + modifications locales P0.8 / P0.9 / P1.0.

---

## 1. Surface d'émission (ce qui existe réellement)

| Canal | Point d'entrée | Destinations | Consentement |
|---|---|---|---|
| **T1 — événements produit** | `trackEvent()` (`src/lib/analytics.ts`) | `analytics_events` (toujours) + GA4 + Clarity + Meta/TikTok/Ads (7 événements mappés) | interne : aucun ; tiers : cookie `edukora_consent` |
| **T2 — navigation** | `fetch POST /api/analytics/track` direct (`src/components/EdukoraAnalytics.tsx:54`) | `analytics_events` uniquement (`event: "pageview"`) | aucun |
| **T3 — script inline** | `window.edukoraTrack('signup_step_2_completed', …)` (`src/app/inscription-2-2-…/page.tsx:175`) | même chaîne que T1 | idem |
| **T4 — serveur (GA4 MP)** | `sendGa4Purchase()` (`src/lib/ga4-ssr.ts`, appelé par le webhook GeniusPay) | GA4 **uniquement** | hors navigateur |

Stocker : `analytics_events(id, user_id, session_id, event, props, url, created_at)`
(`src/lib/analytics-db.ts`), écrit par `trackDb()` via
`POST /api/analytics/track` **plus**, depuis P1.0, par deux writers serveur
directs : `maybeRecordActivation()` (activation dérivée) et
`recordPurchase()` (idempotent, hook webhook — §3). Rate limit : `guardApi`
→ preset `api_general` (120 req/min/IP). *(`docs/analytics-funnel.md` §6 dit
« pas de rate limit » : observation 3e dépassée.)*

### 1.1 Constantes

- `EVENTS` (`src/lib/analytics.ts:18-53`) : **33 noms**. La formule
  historique « **34 noms** » comptait en réalité la liste complète du §10
  (**33 EVENTS** + `pageview` hors EVENTS) et pointerait à tort vers §4
  (attribution) — audit P1.1 : aucun commit n'a jamais porté 34 clés
  (25 → 26 → 27 en historique git, +6 clés 3f non commitées = 33).
- Émission littérale hors `EVENTS` : **`pageview`** (T2), **`activated`** et
  **`purchase`** (serveur, dérivés P1.0 — cf. §3/§10) ; le §10 listait
  34 noms avant P1.0 (33 + `pageview`), 36 depuis (33 + 3 hors `EVENTS`).
- Taxonomie dupliquée `src/lib/growth/ai/types.ts:63-88` : **périmée** (liste
  `page_view` — jamais écrit tel quel en base —, ignore `activated` et les
  événements 3f ; `purchase` y figure sans la sémantique first-party
  documentée au §10).
  **Ne pas utiliser comme référence** (écart E5 de `growth-metrics.md`).

### 1.2 Inventaire observé en base (dev, 213 lignes, 05/10/2026)

| event | lignes | anonymes | connectés | sessions distinctes |
|---|---|---|---|---|
| `pageview` | 180 | 48 | 132 | 9 |
| `course_opened` | 22 | 0 | 22 | 2 |
| `lesson_started` | 4 | 0 | 4 | 1 |
| `ab_test_variant` | 2 | 0 | 2 | 1 |
| `ai_tutor_opened` | 2 | 0 | 2 | 1 |
| `login_completed` | 2 | 0 | 2 | 2 |
| `ai_question_sent` | 1 | 0 | 1 | 1 |

Aucune ligne de type `page_view`, `signup_*`, `subscription_started`,
`begin_checkout` n'a encore été produite sur cet environnement. **Un nom déclaré
en code ≠ un événement qui a déjà des données.** *(Inventaire figé au 05/10 ;
depuis, total 215 lignes au 06/10 : `activated` existe via la backfill §3 —
lignes réelles, comptées — et `purchase` via un fixture `is_test` — exclu des
KPI par `testUsersWhere`, §7. Les fixtures STAMP des suites sont nettoyées en
afterAll ; persiste uniquement le `purchase` de fixture `TXN-1` (compte
`is_test`, idempotent : 1 ligne unique quel que soit le nombre de runs).)*

---

## 2. Trois couches — séparation stricte

| Couche | Source | Règle |
|---|---|---|
| **A. Product Analytics** | `analytics_events` + GA4 + Clarity | mesure du comportement ; filtrage test **par couche** — brut non filtré, KPI filtrés (§7, état P1.2) ; **jamais** de MRR ici |
| **B. Funnel Analytics** | dérivé de A (SQL sur `analytics_events`) | étapes non instrumentées = non mesurables, pas de métrique de complaisance |
| **C. Business Metrics** | `subscriptions` / `users` via **P0.7** : `getCanonicalMRR()`, `getBusinessRevenue()`, `getConversionStats()` | comptes test **exclus** (prédicat `testUsersWhere`) ; seule source des KPI financiers |

**Frontière vérifiée par test :** `business-metrics.ts` et `conversion-report.ts`
ne lisent **jamais** `analytics_events` ; `api/growth/metrics` ne lit **jamais**
`subscriptions` / `price_cents`. L'event `subscription_started` (couche A) mesure
une **intention de CTA**, pas un paiement : le paiement réel = couche C.

---

## 3. Funnel réellement mesurable

| Étape | Source | Mesurable ? | Identifiant | Limite |
|---|---|---|---|---|
| **VISIT** | `pageview` (T2) | **partiel** — comptage de vues | aucun avant login | `session_id` est NULL pour les visiteurs anonymes (cookie de session = auth) : **pas de visiteurs uniques first-party**. Référence sessions = GA4 (console) |
| **ENGAGEMENT** | `landing_viewed`, `cta_clicked`, `subject_selected`, `grade_selected`, `course_opened`, `lesson_started`, `fiche_opened`, `ai_tutor_opened`… | **oui** | `user_id` si connecté, sinon NULL | pas de durée de session (aucun timestamp de fin) |
| **SIGNUP** | `signup_started` → `signup_step_2_completed` → `signup_completed` → `login_completed` | **oui** | idem | UTM disponible **uniquement** dans les props de `signup_completed` (§4) |
| **ACTIVATION** | **`activated` (P1.0)** : événement serveur dérivé à la **première `lesson_started` attribuée à un compte** (index unique partiel sur `user_id`, backfill rétroactif copiant le `created_at` de la première `lesson_started`) | **oui** | `user_id` **toujours résolu côté serveur** (jamais depuis le corps) | les visiteurs anonymes ne sont **jamais** activables (pas d'identité) — limitation documentée, pas un trou |
| **CONVERSION** | intention : `begin_checkout`, `add_payment_info`, `subscription_started` (couche A) — réalité paiement : couche C (`getConversionStats`) + **`purchase` first-party en couche A** (P1.0 : hook `sendReceiptIfActive` dans `api/premium/webhook`, idempotent `WHERE NOT EXISTS`, id = `provider_subscription_id`, valeur = `price_cents`) | **oui** | `user_id` | `purchase` existe **dans** `analytics_events` (P1.0) **et** dans GA4 MP (T4) — ne **pas sommer** les deux sources ; MRR/revenue restent couche C |
| **RETENTION** | `return_visit` (localStorage `edukora_seen`), `login_completed`, activité `lesson_*`/`quiz_*` | **partiel** | appareil ou `user_id` | `return_visit` = par appareil, pas par personne |
| **RÉTENTION D7 (KPI growth)** | exigé par `growth-metrics.md` §3h | **non disponible** — état explicite : `retention: null` + `retentionStatus: "non_disponible:_retention_d7_historique_insuffisant"` | `user_id` | le calcul exige une activation ≥ 7 jours avant aujourd'hui **et** un retour ≥ 7j après ; première activation remontable 2026-09-29 → premier jour éligible 2026-10-06 (jour D7 de la **seule** cohorte, journée encore ouverte ce jour-là : première lecture sur journée complète le 2026-10-07) ; volume insuffisant : **n = 1 activation** (cohorte unique, ≪ 30 = volume minimal de `growth-metrics.md` §11.1) ; **jamais** de faux 0 |

---

## 4. Attribution

| Donnée | Capturée ? | Où ? | Persistance | Disponible à la conversion ? |
|---|---|---|---|---|
| `utm_source` / `utm_medium` / `utm_campaign` / `utm_content` / `utm_term` | **oui (P1.0, first-touch)** | capture au montage de chaque page via `<AttributionCapture />` (`src/lib/attribution.ts`, liste blanche de 7 clés, valeurs ≤ 120 car.) + lecture URL au submit → props de `signup_completed` | **sessionStorage `edukora_attr`** (onglet) ; **ligne d'événement uniquement** ; aucune colonne UTM sur `users` ; **aucune colonne `utm` dans `analytics_events`** | **oui, limitationné (P1.0)** : `signup_completed` porte les props **et** le `user_id` → jointure vers `subscriptions` (tests p10-funnel §5/§8) |
| `gclid` | **oui (P1.0)** | même capture first-party (`attribution.ts`, seule source `src/` qui contient le littéral) | sessionStorage → props `signup_completed` (`gclid`) | idem (via `user_id`) |
| `fbclid` | **oui (P1.0)** | idem | idem (`fbclid`) | idem (via `user_id`) |
| `ref` (parrainage) | **oui, partiellement** | `referral_clicked { has_code }` sur `/inscription…?ref=` + pré-remplissage `referralCode` (P0.9) | props de l'événement + `users.referred_by` (§5) | **volontairement hors de la map d'attribution** (jamais mélangé aux UTM) |
| URL de landing | oui (incidemment) | `url` de la page `pageview` (query string conservée, 500 car. max) | tant que la landing garde les params | improvisé, non structuré |

**Décisions P1.0 (remplace les « corrections proposées » de P0.8) :**
1. capture **first-touch côté client** (sessionStorage) plutôt que des colonnes
   `users.utm_*` — aucun changement de schema ; la jointure conversion se fait
   par `user_id` sur `signup_completed`, pas par colonne ;
2. identité **toujours** serveur : aucun `gclid`/`fbclid`/UTM n'est accepté
   depuis le corps d'une requête authentifiée (le corps est ignoré pour
   l'identité — §7) ;
3. `ref` **jamais** injecté dans la map d'attribution (test : aucun autre
   fichier `src/` ne contient les littéraux `gclid`/`fbclid` hormis
   `attribution.ts`).
4. **requête canonique d'acquisition (P1.2)** : `src/lib/utm-report.ts`
   (`getUtmAcquisitionReport()`) est la seule lecture agrégée d'acquisition —
   GROUP BY sur les **7 clés stockées en forme courte** (`source`, `medium`,
   `campaign`, `content`, `term`, `gclid`, `fbclid` — émises par
   `signupAttributionProps()`, PAS les alias `utm_*` de l'URL), alias `utm_*`
   en sortie ; par segment : `signups` (distinct par `user_id`), `activated`,
   `purchasers`/`purchases` (`purchase` first-party) et `mrr_active_cents`
   (abonnement actif) ; signups sans identité (`user_id NULL`) isolés dans
   `unattributed_signups` — **jamais** attribués, **jamais** transformés en 0 ;
   branche dialectale `IS_PG` (`props::json->>` vs `json_extract`) ; comptes
   test exclus ; statut `ok | indisponible` (aucun zéro silencieux).

---

## 5. Referral produit ≠ attribution marketing

- **A — acquisition marketing** : `utm_*` / `gclid` / `fbclid` (§4). Ne jamais
  mélanger avec le parrainage.
- **B — parrainage produit** : `users.referral_code` → `referred_by`
  (`api/auth/register:79-86`) → prime webhook (`api/premium/webhook:245+`).
  Chaîne **mesurable côté Business/Parrainage**, indépendante des UTM.

**Chaîne réparée depuis P0.9 :** `/parrainage` partage
`…/inscription-1-2-edukora?ref=CODE`, et la page d'inscription lit
`params.get("ref")` à l'état initial (`useState(() => …)`, P0.9) **avant**
d'émettre `referral_clicked { has_code }`. Le code arrive donc dans
`referred_by` côté serveur sans rétapage manuel. Chaîne complète vérifiée par
test (p10-funnel §8) : `?ref=` → `referred_by` → abonnement du filleul
joignable. Les mesures « clics de lien » et « filleul rattaché au lien » sont
toutes deux mesurables ; elles restent **séparées** de l'attribution UTM (§4).

---

## 6. Déduplication

| Canal | Mécanisme | Verdict |
|---|---|---|
| `analytics_events` (interne) | **aucune** — `sendToInternal()` est appelé **avant** le test de dédup (`analytics.ts:271` vs `:290`) ; pas de `event_id` ni de clé d'idempotence | risque réel = double rendu React StrictMode **en dev** (2 lignes/pageview) ; pas de retry réseau (fetch fire-and-forget) → **acceptable en prod**, documenté |
| GA4 + Clarity | `Set sentThisView` (clé `nom + params[0..120]`), **jamais vidé** ; `dedupe: false` pour `cta_clicked` | même événement + mêmes params envoyés **une fois par session d'application** ; perte possible de répétitions légitimes (2e `landing_viewed` identique). Asymétrie interne/tiers assumée |
| Meta/TikTok/Ads | aucun (7 événements mappés, consentement marketing) | ok |
| Client + serveur | un seul canal par événement ; `purchase` GA4 MP côté serveur sans doublon client | pas de double instrumentation |

**Décision : aucune infrastructure d'idempotence générale.** Le système actuel
suffit pour les événements client ; l'asymétrie interne/tiers est documentée.
**Exception P1.0** : `purchase` (writer serveur) possède sa propre
idempotence — `INSERT … WHERE NOT EXISTS` sur
`"transaction_id":"<ref>"` — un rejeu de webhook ne crée **jamais** un
second `purchase` ; `activated` est protégé par un index unique partiel sur
`user_id`. Ces deux writers sont les seuls à s'auto-dédupliquer.

---

## 7. Comptes test

| Couche | Filtrable ? | État |
|---|---|---|
| **Business Metrics** | **oui, obligatoire** | exclus via `testUsersWhere` (P0.7), tests `data-trust.test.ts` |
| **Product Analytics — événement connecté** | **oui** : `user_id` est résolu **côtère serveur** depuis la session (`track/route.ts`), jamais depuis le corps de la requête → un compte de test connecté est identifiable | **appliqué depuis P1.0** dans `countFunnelForDay` (funnel `api/growth/metrics`) via `testUsersWhere` — testé p10-funnel §16/§17 ; **appliqué depuis P1.2** pour l'entonnoir + la conversion 7j du tableau `espace-admin/analytics` via `getAnalyticsDashboard7d()` (helper partagé — la page ne cite aucun prédicat, garde data-trust) ; les flux **bruts** de ce tableau (total, top events, derniers events) restent volontairement non filtrés et sont libellés comme tels |
| **Product Analytics — événement anonyme** | **non** : `user_id NULL`, aucun identifiant fiable → **non attribuable à un compte de test** | « non filtrable actuellement » — ne pas inventer de filtre ; compté séparément en conversion (`*_anon` = « non attribués ») depuis P1.2, jamais transformé en inscrit attribuable |
| **Conversion 7j** (`analytics/page.tsx`) | mêmes limites (décidé en P0.7) → **filtrée depuis P1.2** côté authentifié | dénominateur = inscrits authentifiés hors test, événements anonymes affichés séparément (choix A+B), taux `subs_auth / signups_auth` avec `null` (`—`) si dénominateur nul — plus de faux 0 sur 0/0 |
| **Parrainage admin** (`getReferralStats`) | **oui** : KPI administratif sur comptes identifiés | **appliqué depuis P1.2** : `testUsersWhere` des deux côtés de la relation (parrain ET filleul) — test p12-dashboard-hygiene ; le mécanisme referral lui-même (chaîne `?ref=` → `referred_by`) est inchangé |
| **Nettoyage** | possible pour les événements rattachés | `DELETE /api/admin/test-accounts` supprime aussi `analytics_events` des comptes test ; les lignes anonymes restent |

> **Modèle d'identité — observation P1.1** : « compte de test » = `is_test = 1`
> **ou** email réservé (§7, `src/lib/test-users.ts`) ; `role = 'admin'` n'entre
> **pas** dans le prédicat. Conséquence mesurée en dev : `support@edukora.net`
> (admin, `is_test = 0`) **compte** dans signups / activation / actifs /
> rétention — c'est d'ailleurs la seule activation du jeu (1 activation
> observée) — sans jamais avoir produit `purchase` ni MRR. Un compte étudiant
> sans email (`email NULL`, `is_test = 0`) compte aussi comme réel
> (`COALESCE(email,'')` ne matche aucun motif réservé). État dev : 2 comptes
> réels / 344 (342 `is_test`). **Solution minimale proposée (non appliquée —
> décision produit requise)** : ajouter `role = 'admin'` à `testUsersWhere`
> (une seule ligne, appliquée uniformément à tous les prédicats) — sans
> re-marquer aucun compte existant.
>
> **Statut P1.2 — `DECISION_REQUIRED`** : audit complet des documents du
> projet (contrat, growth-metrics, specs) : **aucune décision métier** sur
> l'exclusion des administrateurs n'a été trouvée → prédicat **inchangé**
> (ligne précédente reprise telle quelle) ; l'état actuel est verrouillé par
> test (p12-dashboard-hygiene §C) pour qu'un changement futur soit un choix
> explicite. État dev mis à jour (06/10/2026, mesure P1.2) : 2 comptes réels
> KPI / 358 (355 `is_test` ; 1 compte `@test.ci` créé par un test de
> register-consent — filet email réservé déjà hors KPI).

---

## 8. GA4

- Config : `NEXT_PUBLIC_GA_ID` présent (`.env.local`, `.env.prod`,
  `.env.production.local`), bootstrap inline **avec nonce CSP**
  (`analytics.ts:146-175`), `send_page_view: true` au chargement, gate
  `edukora_consent.analytics`, `client_id` = cookie `edukora_gacid` (2 ans).
- `purchase` serveur : `GA4_API_SECRET` configuré → Measurement Protocol
  (`ga4-ssr.ts`), appelé par le webhook paiement.
- **Aucun `page_view` manuel sur navigation SPA** : le décompte GA4 des
  navigations dépend de l'Enhanced Measurement activé dans la console GA4
  (paramètre externe, non vérifiable depuis le code). L'interne `pageview`
  couvre, lui, **chaque** navigation — **ne pas sommer GA4 + interne**.
- PII : `sanitizeForThirdParty()` filtre identifiants/contenus avant tout envoi
  (tests `analytics-funnel-pii.test.ts`). *Résidu : l'URL automatique du
  `page_view` GA4 peut contenir `?ref=CODE` — à exclure via les paramètres de
  la console GA4 (Data stream), pas via le code.*
- **Stable. Aucune modification P0.8.**

---

## 9. Microsoft Clarity

- Config : `NEXT_PUBLIC_CLARITY_ID` présent ; stub `window.clarity` injecté
  **avant** le tag (correctif 3d.3), injection idempotente, gate consentement.
- Usage : événements custom limités (~20/jour/session) + heatmaps. **Outil
  comportemental, jamais source de vérité business.**
- *Observation : les paramètres passés en 3e argument de `clarity("event", …)`
  ne sont pas garantis par l'API Clarity — ne pas bâtir de KPI dessus.*
- **Stable. Aucune modification P0.8.**

---

## 10. Contrat canonique (événements réels)

Légende destinations : **DB** = `analytics_events`, **G** = GA4,
**C** = Clarity, **M** = Meta/TikTok/Google Ads.

| event_name | v | trigger | source | user_id | params (require / optional) | destinations | impact business |
|---|---|---|---|---|---|---|---|
| `pageview` | 1 | navigation (chaque `pathname`) | client T2 | si connecté / sinon NULL | require : `path` ; url complet | DB | VISIT (comptage de vues) |
| `landing_viewed` | 1 | affichage page marketing (8 routes) | client | idem | require : `page_path` | DB+G+C | début funnel acquisition |
| `return_visit` | 1 | `landing_viewed` sur appareil déjà vu | client | idem | require : `page_path` | DB+G+C | rétention appareil |
| `cta_clicked` | 1 | clic lien → `/inscription*` ou `/connexion*` (listener délégué, **non dédupliqué**) | client | idem | require : `cta_target`, `cta_source` ; opt : `cta_label` | DB+G+C | intention d'inscription |
| `referral_clicked` | 1 | arrivée `/inscription…?ref=` | client | idem | require : `has_code`, `landing` (**jamais le code**) | DB+G+C | apport parrainage |
| `signup_started` | 1 | submit inscription (validation OK) | client | — | require : `role`, `method`, `variant` | DB+G+C | début conversion |
| `signup_step_2_completed` | 1 | submit étape 2 (script inline T3) | client | — | require : `examen` | DB+G+C | progression inscription |
| `signup_completed` | 1 | création de compte OK | client | si session déjà posée | require : `role`, `method`, `variant` ; opt : `campaign`, `medium`, `source` (UTM) | DB+G+C+M | **inscriptions** ; seul porteur d'UTM |
| `login_completed` | 1 | connexion OK (3 portails) | client | si connecté | require : `role` | DB+G+C | rétention |
| `ab_test_variant` | 1 | résolution variante A/B | client | idem | require : `test`, `variant` | DB+G+C | experimentation |
| `pricing_variant_viewed` | 1 | affichage variante tarifs | client | idem | (variante) | DB+G+C | pricing |
| `course_opened` / `lesson_started` / `lesson_completed` | 1 | parcours cours | client | idem | codes/ids, **jamais de contenu** | DB (+M pour `lesson_completed`) | activation / engagement |
| `quiz_started` / `quiz_completed` | 1 | parcours quiz | client | idem | `quiz_id`, `score`, `max`, `pct` | DB (+M pour `quiz_completed`) | engagement |
| `fiche_opened` / `fiche_read` / `fiche_saved` / `fiche_unsaved` | 1 | fiches | client | idem | `subject` | DB | intention de retour |
| `simulateur_started` / `simulateur_completed` | 1 | simulateur | client | idem | `exam` | DB (+M si complété) | usage examen |
| `ai_tutor_opened` / `ai_question_sent` | 1 | tuteur IA | client | idem | require : `blocked` (**jamais le message**) | DB+G+C | usage IA |
| `subject_selected` / `grade_selected` | 1 | clic catalogue | client | idem | `subject`/`grade` | DB+G+C | orientation catalogue |
| `begin_checkout` / `add_payment_info` | 1 | sélection plan / paiement USSD | client | si connecté | `value`, `currency`, `plan` (**jamais de ref de transaction**) | DB+G+C+M | **intention** de paiement |
| `subscription_started` | 1 | CTA d'abonnement | client | si connecté | `cta`, `ab_variant` | DB+G+C+M | intention — **≠ paiement** |
| `referral_code_copied` / `referral_link_shared` | 1 | copie / partage | client | idem | `copied` / `method` (**jamais le code**) | DB | viralité |
| `quota_exceeded` | 1 | quota IA | client | idem | `source`, `plan` | DB | friction monetize |
| `push_permission_granted` / `push_permission_denied` | 1 | réponse push | client | idem | `context` | DB | opt-in notification |
| `purchase` | 1 | webhook GeniusPay réussi (`payment.success` sur abonnement actif) | **serveur** (hook `sendReceiptIfActive` → `recordPurchase`, P1.0) ; **et** GA4 MP | `user_id` **serveur** (jamais le corps) | `transaction_id` (id first-party = `provider_subscription_id`), `value_cents`, `currency`, `plan`, `subscription_id` | **DB + G (MP)** | conversion paiement confirmé — **first-party dans `analytics_events`** ; idempotent (rejeu webhook = 1 ligne) ; `payment.initiated` / `payment.failed` n'atteignent **jamais** ce writer |
| `activated` | 1 | première `lesson_started` attribuée à un compte (dérivé serveur, P1.0) | **serveur** (`maybeRecordActivation`, await avant réponse) | `user_id` serveur (jamais le corps) | `trigger: "lesson_started"` | DB | **activation KPI** ; dédoublonné par index unique partiel ; anonymes exclus (non attribuables) |

Règles communes : noms **stables** (ne pas renommer — dashboards GA4 existants),
identité **toujours** serveur, PII filtrée à la source, `session_id` **haché**
(sha256, P0.8), consentement requis pour les tiers, **aucune whitelist côté
route** (tout nom est stocké) — seuls les noms ci-dessus sont lus par les
tableaux de bord.

---

## 11. Événements recommandés — état au 06/10/2026

Les lignes marquées **fait P0.9 / P1.0** ont été implémentées depuis la
rédaction initiale (documentation-only) ; le reste reste non implémenté.

| Événement | Pourquoi | Manque | Dépendance | Priorité | Risque |
|---|---|---|---|---|---|
| `signup_started` temps réel + abandon | mesure de la fuite formulaire | instrumentation déjà présente ; manque le **join session** | session anonyme stable | P1 | créer un faux identifiant anonyme |
| `onboarding_completed` | fin parcours découverte | **n'existe pas** — étape non définie produit | spec produit | P2 | événement fantôme |
| `first_lesson_started` | activer l'activation « premier » | **fait P1.0** sous le nom `activated` (dérivé serveur sur la première `lesson_started`, identité serveur — cf. §3/§10) | — | P1 | réglé |
| `payment_completed` (DB) | converger couche A ↔ C | **fait P1.0** sous le nom `purchase` first-party (hook webhook, idempotent) + GA4 MP existant | — | P1 | ne pas sommer DB + GA4 |
| `referral_signup` (lié au lien) | réparer la rupture §5 | **fait P0.9** : pré-remplissage `?ref=` à l'état initial + `referred_by` serveur ; chaîne testée (p10-funnel §8) | — | **P1** | réglé |
| `utm` persisté à l'inscription | attribution canal → conversion | **fait P1.0** autrement : sessionStorage first-touch + props `signup_completed` (décision §4 — pas de colonne `users.utm_*`) | — | P1 | réglé |
| `ai_tutor_opened` enrichi (durée) | qualité usage IA | aucun timer de session | nouveau type d'événement | P2 | collecte supplémentaire (règle « ne pas ajouter de collecte ») |

---

## 12. `FALLBACK_STATS` — audit

- **Valeur** : `src/lib/stats.ts:12-17` → `students 150`, `quizzesCorrected 1200`,
  `lessonsRead 3500`, `xpEarned 48000` (durcies).
- **Utilisé par** : `getPlatformStats()` → **un seul appelant**, la page publique
  `/resultats` (`src/app/resultats/page.tsx:33`), qui affiche ces chiffres dans
  des cartes « élèves inscrits / quiz corrigés / fiches lues / XP gagnés ».
- **Déclenchement** : uniquement si `collectStats()` throw (base indisponible).
  Le commentaire de la page (« chiffres réels de la plateforme ») est donc **en
  contradiction** avec le repli silencieux.
- **Risque** : en cas d'erreur DB, la page affiche des valeurs **inventées**
  présentées comme réelles → confusion business / revendication publique.
- **Décision P0.8** : **aucune suppression** (règle : ne pas supprimer sans
  preuve de panne réelle ; aucune observation de déclenchement). Le défaut est
  uniquement du `console.error`.
- **Correction minimale proposée (P0.9)** : exposer un flag `fallback: true` et
  afficher « — » sur `/resultats` tant que la collecte échoue (2 lignes :
  `stats.ts` + `resultats/page.tsx`), au lieu de chiffres démonstratifs.
