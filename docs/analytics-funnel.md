# Funnel analytics Edukora

Parcours **visiteur → élève**, mesuré sans nouveau système : GA4 (existant) +
Microsoft Clarity (existant) + base first-party `analytics_events`.

Dernière mise à jour : Phase 3f.

---

## 1. Architecture de collecte

| Destination | Chargement | Rôle |
|---|---|---|
| **First-party DB** `analytics_events` | à chaque `trackEvent`, **sans consentement** | base du produit, contexte complet (`user_id`, `session_id`, `props`, `url`) |
| **GA4** | `NEXT_PUBLIC_GA_ID` + consentement `analytics === true` | analyse de parcours, reporting |
| **Microsoft Clarity** | `NEXT_PUBLIC_CLARITY_ID` + consentement `analytics === true` | heatmaps, enregistrements de session |
| **Meta / TikTok / Google Ads** | consentement `marketing === true` | campagnes, Conversions API |

Point d'entrée unique : `trackEvent()` (`src/lib/analytics.ts`). Aucun appel `gtag`
direct dans les pages — c'est ce qui permet de garantir le filtrage PII.

---

## 2. Taxonomie

### Acquisition

| Événement | Déclencheur | Paramètres | KPI | Objectif | Source | Calcul |
|---|---|---|---|---|---|---|
| `landing_viewed` | affichage d'une page marketing (8 routes) | `page_path` | visiteurs entrants | 100 % des sessions marketing | GA4 + DB | `count(distinct session_id)` par `page_path` |
| `cta_clicked` | clic sur un lien vers `/inscription*` ou `/connexion*` (listener délégué) | `cta_target`, `cta_source`, `cta_label` | taux de clic CTA | **> 8 %** des `landing_viewed` *(proposition)* | GA4 + DB | `count / count(landing_viewed)` |
| `referral_clicked` | arrivee sur `/inscription-1-2-edukora` avec `?ref=` | `has_code`, `landing` | apport du parrainage | 5 % des inscriptions *(proposition)* | GA4 + DB | `count` où `has_code = true` |
| `referral_code_copied` | copie du code de parrainage | `copied` | activation parrainage | — | DB | `count` |
| `referral_link_shared` | partage du lien (natif / WhatsApp) | `method` | viralité | — | DB | `count` par `method` |

### Engagement

| Événement | Déclencheur | Paramètres | KPI | Source | Calcul |
|---|---|---|---|---|---|
| `subject_selected` | ouverture d'une matière (`/cours`, `/matieres`) | `subject`, `grade`, `from` | entrées catalogue | GA4 + DB | `count` par `subject` |
| `grade_selected` | clic sur un niveau dans `/cours` | `grade`, `track` | orientation catalogue | GA4 + DB | `count` par `grade` |
| `course_opened` | chargement d'un cours | `subject_code`, `grade_code`, `chapters_count` | profondeur catalogue | DB | `count` |
| `lesson_started` | ouverture d'une leçon | `subject`, `lesson_id` | engagement cours | DB | `count(distinct user_id)` |
| `lesson_completed` | fin de leçon | `subject`, `lesson_id` | progression | DB | `count(distinct user_id)` |
| `fiche_opened` / `fiche_read` | ouverture / lecture d'une fiche | `subject` | usage fiches | DB | `count` |
| `fiche_saved` / `fiche_unsaved` | sauvegarde d'une fiche | `subject` | intention de retour | DB | `count` |
| `quiz_started` | lancement d'un quiz | `quiz_id`, `subject` | effort | DB | `count(distinct user_id)` |
| `quiz_completed` | soumission d'un quiz | `quiz_id`, `score`, `max`, `pct` | maîtrise | DB + Meta (`CompleteQuiz`) | `count(distinct user_id)` |
| `simulateur_started` / `simulateur_completed` | simulateur d'examen | `exam` | usage simulateur | DB | `count(distinct user_id)` |
| `ai_tutor_opened` | ouverture du tuteur IA | — | entrée IA | GA4 + DB | `count(distinct user_id)` |
| `ai_question_sent` | message envoyé à Kora (**jamais le contenu**) | `blocked` | usage IA | DB | `count(distinct user_id)` |
| `quota_exceeded` | quota IA atteint | `source`, `plan` | friction monetize | DB | `count` |

### Conversion

| Événement | Déclencheur | Paramètres | KPI | Objectif | Source | Calcul |
|---|---|---|---|---|---|---|
| `signup_started` | 1er clic « Continuer » de l'inscription | `role`, `method`, `variant` | début d'inscription | — | GA4 + DB | `count(distinct session_id)` |
| `signup_completed` | création de compte réussie | `role`, `method`, `campaign`, `medium`, `source`, `variant` | **inscriptions** | **> 35 %** des `signup_started` *(proposition)* | GA4 + DB + Meta | `count(distinct user_id)` |
| `login_completed` | connexion réussie (3 portails) | `role` | retours actifs | — | GA4 + DB | `count(distinct user_id)` |
| `begin_checkout` | sélection d'un plan | `plan_id`, `value`, `currency`, `interval`, `promo` | intention d'abonnement | — | GA4 + DB + Meta | `count(distinct user_id)` |
| `add_payment_info` | paiement USSD démarré (référence **jamais envoyée**) | `value`, `currency`, `plan`, `payment_type` | initiation paiement | — | GA4 + Meta | `count` |
| `subscription_started` | clic CTA d'abonnement | `cta`, `ab_variant` | conversions | **> 3 %** des visiteurs *(proposition)* | GA4 + DB + Meta | `count(distinct user_id)` |

### Rétention

| Événement | Déclencheur | Paramètres | KPI | Source | Calcul |
|---|---|---|---|---|---|
| `return_visit` | visite marketing sur un appareil déjà venu (`localStorage: edukora_seen`) | `page_path` | rétention | GA4 + DB | `count(distinct session_id)` |
| `push_permission_granted` / `push_permission_denied` | réponse à la demande push | `context` | opt-in notification | DB | `count` par `context` |

---

## 3. Funnel principal

```text
landing_viewed
      ↓  cta_clicked
cta_clicked
      ↓  signup_started
registration_started   → signup_started
      ↓  signup_completed
registration_completed → signup_completed
      ↓  lesson_completed / quiz_completed / ai_question_sent
first_lesson_completed  (dérivé)
      ↓
first_ai_interaction    (dérivé)
      ↓
return_visit
```

### Étapes et calcul

| # | Étape du funnel | Événement mesurant | SQL first-party |
|---|---|---|---|
| 1 | `landing_viewed` | `landing_viewed` | `SELECT count(DISTINCT session_id) FROM analytics_events WHERE event='landing_viewed' AND created_at >= now() - interval '30 days'` |
| 2 | `cta_clicked` | `cta_clicked` | idem avec `event='cta_clicked'` |
| 3 | `registration_started` | `signup_started` | `event='signup_started'` |
| 4 | `registration_completed` | `signup_completed` | `event='signup_completed'` |
| 5 | `first_lesson_completed` | **dérivé** de `lesson_completed` | `SELECT user_id, min(created_at) FROM analytics_events WHERE event='lesson_completed' GROUP BY user_id` |
| 6 | `first_ai_interaction` | **dérivé** de `ai_question_sent` | `SELECT user_id, min(created_at) ... WHERE event='ai_question_sent' GROUP BY user_id` |
| 7 | `return_visit` | `return_visit` | `event='return_visit'` |

Taux de passage étape n → n+1 = `count(n+1) / count(n)`, sur la même fenêtre.

### Pourquoi les étapes d'activation sont dérivées

`first_lesson_completed`, `first_quiz_completed` et `first_ai_interaction` ne sont
**pas** instrumentés côté client. Un « premier » suppose une mémoire « à vie », que
le navigateur ne peut pas garantir de façon fiable (navigation privée, effacement de
`localStorage`, changement d'appareil) et quifractionnerait l'activation par appareil
plutôt que par élève.

Ces trois indicateurs sont donc **calculés** depuis les événements existants, ce qui est
plus juste et ne demande aucun code supplémentaire. Chaque élève est compté une seule
fois, via son `user_id`.

Si un jour le comptage « premier » doit être figé au moment de l'action, il faudra un
`user_id` dans le payload (donc un envoi authentifié) — aujourd'hui volontairement évité.

```sql
-- Activation : élèves ayant terminé au moins un lesson / quiz / interaction IA
SELECT 'lesson' AS axe, count(*) AS eleves
FROM (SELECT user_id FROM analytics_events
      WHERE event='lesson_completed' AND user_id IS NOT NULL GROUP BY user_id)
UNION ALL
SELECT 'quiz', count(*) FROM (SELECT user_id FROM analytics_events
      WHERE event='quiz_completed' AND user_id IS NOT NULL GROUP BY user_id)
UNION ALL
SELECT 'ai', count(*) FROM (SELECT user_id FROM analytics_events
      WHERE event='ai_question_sent' AND user_id IS NOT NULL GROUP BY user_id);
```

---

## 4. Paramètres

### Autorisés (non personnels)

`grade`, `grade_code`, `subject`, `subject_code`, `content_type`, `source`, `medium`,
`campaign`, `referrer_type`, `device_type`, `role`, `method`, `variant`, `plan`,
`plan_id`, `value`, `currency`, `interval`, `from`, `to`, `method`, `page_path`,
`cta_target`, `cta_source`, `cta_label`, `exam`, `quiz_id`, `score`, `max`, `pct`,
`lesson_id`, `context`, `has_code`, `copied`, `blocked`, `chapters_count`,
`payment_type`, `ab_variant`, `event_source`.

### Interdits — filtrés à la source

`first_name`, `last_name`, `nom`, `prénom`, `email`, `phone`, `tel`, `password`,
`code` (code de parrainage), `ref` (référence de paiement), `token`, `secret`,
`address`, `adresse`, `commune`, `message`, `content`, `prompt`, `user_id`.

Le filtre est appliqué par `sanitizeForThirdParty()` avant **toute** sortie vers GA4,
Clarity, Meta, TikTok et Google Ads. Il couvre aussi les valeurs qui *ressemblent* à une
PII (adresse e-mail, numéro de téléphone) et les textes de plus de 100 caractères.

---

## 5. Protection PII

1. **Aucun événement ne porte d'identité.** Pas de `user_id`, pas d'email, pas de nom.
   Le rattachement GA4 repose sur `client_id` (cookie `edukora_gacid`, 2 ans).
2. **Filtre en sortie.** `sanitizeForThirdParty()` est la barrière vers les tiers.
   Les données first-party restent internes, avec leur propre base légale.
3. **Correction à la source.** Deux call sites expédiaient une PII :
   - `referral_code_copied` / `referral_link_shared` envoyaient le **code de parrainage**
     (identifiant unique lié à un compte) ;
   - `add_payment_info` envoyait la **référence de transaction** GeniusPay.
   Les deux ont été corrigés ; les paramètres utiles (montant, devisee, méthode) sont conservés.
4. **Contenu du tuteur.** `ai_question_sent` n'envoie que `{ blocked }`. Le contenu des
   messages ne part jamais vers un tiers, et `message`/`content`/`prompt` sont bloqués
   par le filtre.
5. **Tests.** `tests/analytics-funnel-pii.test.ts` verrouille ces garanties (37 tests).

---

## 6. Limites connues

- `return_visit` est mesuré **par appareil** (localStorage), pas par personne. Un élève
  qui change d'appareil sera compté comme nouveau.
- `/tuteur-ia` et les autres espaces connectés ne sont pas des pages marketing : ils ne
  produisent pas de `landing_viewed`. C'est intentionnel (sinon le parcours internal
  polluent le funnel d'acquisition).
- Les objectifs chiffrés du tableau sont des **propositions**, à caler sur la baseline
  réelle après 30 jours de collecte.
- La table first-party ne porte pas d'index sur `props` : lesSegments par paramètre
  passent par GA4, pas par SQL.
- `/api/analytics/track` n'a pas de rate limit (Phase 3e, observation F8) : un tiers
  pourrait polluer la base interne. Sans impact sur GA4, qui a ses propres quotas.