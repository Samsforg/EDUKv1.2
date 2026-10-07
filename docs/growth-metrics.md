# Edukora — Growth Metrics v1

> **Phase 3h — référence de mesure.**
> Aucun code applicatif. Aucune collecte ajoutée. Aucun commit, push ni déploiement.
>
> Définit **ce que l'on mesure**, **où** le mesurer et **quand s'inquiéter**.
> Complète `docs/growth-ai-v1.md` et `docs/n8n-workflows-v1.md`.

---

## 0. Règle fondatrice

> **Aucun chiffre publié ne provient d'un modèle IA.**
> L'IA explique ; la base mesure. Un chiffre absent des données fait échouer le workflow.

Cette règle est appliquée par le garde-fou `n8n-workflows-v1.md` §6.2.

---

## 1. Sources de données

| Source | Table / API | Contenu | Accès |
|---|---|---|---|
| **First-party** | `analytics_events` | tous les événements : `user_id`, `session_id`, `event`, `props`, `url`, `created_at` — **pas de colonne `utm`** : UTM / gclid / fbclid sont dans les props de `signup_completed` (contrat `analytics-data-contract.md` §4) | SQL |
| **Comptes** | `users` | rôle, date d'inscription | SQL |
| **Abonnements** | `subscriptions`, `subscription_plans` | statut, plan, `price_cents`, `started_at`, `end_at` | SQL |
| **Engagement** | `lesson_reads`, `quiz_attempts`, `exam_attempts`, `tutor_messages` | activité réelle | SQL |
| **Parrainage** | codes, XP, appariements | acquisition organique | SQL |
| **Promos** | `promo_codes`, `idempotency_keys` | acquisition payante / promo | SQL |
| **Growth** | `growth_metrics`, `growth_strategies`, `growth_contents`, `growth_recommendations` | historique IA | SQL |
| **GA4** | Data API | trafic organique, sources, **sessions** | API |
| **Clarity** | — | heatmaps, enregistrements | interface |

### 1.1 Ce qu'on ne mesure pas — et pourquoi

| Non mesuré | Raison |
|---|---|
| Score de satisfaction | aucun questionnaire n'existe ; **à créer seulement si Justifié** |
| Temps de session | `analytics_events` n'enregistre pas la durée |
| Provenance fine d'un élève | UTM n'est capté qu'à l'inscription, et de façon partielle |
| Attribution multi-touch | GA4 sans identifiant utilisateur |

> **Principe : ne pas ajouter de collecte.** Les données ci-dessus suffisent pour
> piloter. Toute nouvelle collecte doit être justifiée par une décision précise.

---

## 2. Taxonomie des événements

Source de vérité : `src/lib/analytics.ts` et `docs/analytics-funnel.md`.

### 2.1 Événements de funnel

| Étape | Événement(s) |
|---|---|
| Acquisition | `pageview`, `landing_viewed`, `return_visit`, `ab_test_variant`, `pricing_variant_viewed` |
| Intention | `cta_clicked` |
| Inscription | `signup_started`, `signup_step_2_completed`, `signup_completed` |
| Catalogue | `subject_selected`, `grade_selected` |
| Activation | `lesson_started`, `fiche_opened`, `fiche_read`, `fiche_saved` |
| Engagement | `lesson_completed`, `quiz_started`, `quiz_completed`, `simulateur_started`, `simulateur_completed` |
| IA | `ai_tutor_opened`, `ai_question_sent` |
| Gamification | `defis`, `ligues`, `badges` |
| Limite | `quota_exceeded` |
| Paiement | `begin_checkout`, `add_payment_info`, `purchase`, `subscription_started` |
| Parrainage | `referral_clicked`, `referral_code_copied`, `referral_link_shared` |
| Produit | `fiche_unsaved` |

### 2.2 Deux pièges de nommage

> ⚠️ **1 — l'événement s'appelle `pageview`, pas `page_view`.**
> `src/components/EdukoraAnalytics.tsx:57` émet `"pageview"`.
> `src/app/api/growth/metrics/route.ts:58,62` lit `funnel["page_view"]` → **toujours 0**.
> C'est l'écart **E1**, à corriger avant tout tableau de bord.

> ⚠️ **2 — `src/lib/growth/ai/types.ts` définit une taxonomie dupliquée et périmée**
> (écart **E5**) : elle contient `page_view` et `course_opened`, et ignore les six
> événements ajoutés en Phase 3f. **Ne jamais l'utiliser comme référence.**

---

## 3. North Star

| Indicateur | Définition | Pourquoi |
|---|---|---|
| **Élèves actifs mensuels** | `COUNT(DISTINCT user_id)` avec ≥ 1 `lesson_started` sur 30 j | La valeur d'Edukora est l'apprentissage, pas la visite |

> **Rappel Phase 3g : 7 comptes actifs sur 241 élèves.** Le North Star est bas.
> C'est **le** chantier, pas un prix à ajuster.

---

## 4. Funnel — définitions

| KPI | Formule | Table SQL |
|---|---|---|
| **PV** | `COUNT(*)` de `pageview` | `analytics_events` |
| **Sessions** | `COUNT(DISTINCT session_id)` | idem |
| **Taux de clic CTA** | `cta_clicked` ÷ `landing_viewed` | idem |
| **Taux d'inscription** | `signup_completed` ÷ `landing_viewed` | idem |
| **Taux de complétion inscription** | `signup_completed` ÷ `signup_started` | idem |
| **Taux d'activation** | comptes avec ≥ 1 `lesson_started` ÷ inscrits | `lesson_reads` |
| **Taux de découverte** | `subject_selected` ÷ inscrits | idem |
| **Taux d'engagement IA** | `ai_question_sent` ÷ actifs | idem |
| **Taux de complétion leçon** | `lesson_completed` ÷ `lesson_started` | idem |
| **Taux de simulation** | `simulateur_completed` ÷ `simulateur_started` | idem |
| **Conversion checkout** | `purchase` ÷ `begin_checkout` | idem |
| **Conversion inscription → payant** | `subscription_started` ÷ `signup_completed` | idem |
| **Taux de contact sponsor** | `quota_exceeded` ÷ `quota_exceeded` | idem |

---

## 5. KPI financiers

| KPI | Formule |
|---|---|
| **MRR** | Σ `price_cents` des abonnements `status = 'active'` ÷ 100 |
| **ARR** | MRR × 12 |
| **ARPU** | MRR ÷ abonnés payants actifs |
| **Conversion payante** | nouveaux `subscription_started` ÷ nouveaux inscrits |
| **Churn mensuel** | résiliés ÷ abonnés en début de période |
| **Rétention nette** | 1 − churn |
| **LTV** | ARPU × marge brute % ÷ churn mensuel |
| **CAC** | dépenses d'acquisition ÷ nouveaux abonnés payants |
| **Payback** | CAC ÷ (ARPU × marge brute %) |

**Détail :** voir `docs/monetisation-v1.md` §6 pour la marge brute (~92 %) et le
coût IA (~135 FCFA/mois).

> **Marge = revenu − IA − frais de paiement (≈3 %) − hébergement − support.**
> `price_cents` est conservé dans `subscriptions` : **le CA réel est vérifiable en SQL**.

---

## 6. Rétention — définition nouvelle

> La Phase 3g a établi que **ni le churn ni la rétention n'étaient mesurés**.
> Ce document les définit. C'est l'apport du Retention Agent.

### 6.1 Rétention par cohorte

| Définition |
|---|
| **Cohorte** = semaine de `users.created_at` |
| **Actif** = ≥ 1 `lesson_reads` sur la semaine |
| **Rétention Wn** | actifs en semaine n ÷ taille de la cohorte |

### 6.2 Rétention par activité

| Définition |
|---|
| **J7** | actif à J7 depuis l'inscription ÷ inscrits |
| **J30** | idem à J30 |
| **Retention rate** | 1 − churn mensuel |

### 6.3 Churn par palier

| Palier | Événement | Cause probable |
|---|---|---|
| **Inscription → 1ʳᵉ leçon** | absence de `lesson_started` | onboarding — **la fuite n°1** |
| **Actif → silencieux** | plus de `lesson_reads` depuis 7 j, moins de 14 | rétention |
| **Essai → non converti** | `findExpiredTrials()` | offre ou moment |
| **Limite atteinte → non converti** | `quota_exceeded` sans `subscription_started` | valeur IA insuffisante |
| **Abonné → inactif** | renouvellement sans usage | contenu lassant |

### 6.4 Grille de risque

Reprise de `growth-ai-v1.md` §4.5. **À recalibrer sur 30 jours de données réelles.**

| Signal | Points |
|---|---|
| Actif J-7 puis inactif | +40 |
| Inscrit sans aucune leçon | +35 |
| Streak rompu après ≥ 7 jours | +25 |
| Essai expirant dans 48 h | +25 |
| Abonnement renouvelé sans usage | +20 |
| `quota_exceeded` sans conversion | +20 |

**Seuils :** < 30 = ignoré · 30–69 = surveillance · ≥ 70 = alerte.

---

## 7. Métriques d'acquisition

| KPI | Source | Note |
|---|---|---|
| **Sessions organiques** | GA4 | principal moteur d'un contenu éducatif |
| **Sessions par source** | `utm` + GA4 | voir §8 |
| **Taux d'inscription par source** | `signup_completed` ÷ sessions par source | **le vrai classement** |
| **Coût par inscription** | dépenses ÷ inscriptions attribuées | |
| **Part du parrainage** | `referral_clicked` (`has_code: true`) ÷ inscriptions | organique |
| **Part de la promo** | `promo_codes` ÷ inscriptions | commerciale |
| **Valeur vie par canal** | CAC par canal vs LTV | **la seule métrique de décision** |

> ⚠️ **L'UTM n'est capté qu'à l'inscription.** Le classement par canal est donc
> **partiel**. Ne pas en tirer de conclusion fine sans le savoir.

---

## 8. Suivi de campagne

Convention à appliquer partout :

```
utm_source    facebook | tiktok | whatsapp | newsletter
utm_medium    social | message | email
utm_campaign  bepc_mai | bac_juin | rentree_sept | continu
utm_content   <slug du post>
```

| KPI | Cible |
|---|---|
| Clics par `utm_campaign` | GA4 |
| Inscriptions par `utm_campaign` | SQL |
| Conversion par `utm_campaign` | SQL |
| CAC par `utm_campaign` | calcul |

---

## 9. Métriques de contenu

| KPI | Requête | Usage |
|---|---|---|
| **Chapitres sans lecteurs** | `HAVING COUNT(lecteurs_30j) = 0` | entrée du SEO Agent |
| **Taux de lecture par chapitre** | lecteurs ÷ `lesson_started` | qualité |
| **Leçons premium vues** | `lesson_started` sur `is_premium = 1` | attrait du premium |
| **Annales consultées** | `exam_attempts` | valeur des annales |
| **Ratio gratuit/premium** | 683 / 678 | équilibre du freemium |

> **Équilibre actuel : 683 leçons gratuites, 678 premium.** L Student's hook est
> déjà en place (`FREE_LESSONS_PER_CHAPTER = 1`).

---

## 10. Métriques IA et coût

| KPI | Source | Fréquence |
|---|---|---|
| **Échanges IA** | `tutor_messages` (`role = 'user'`) | 30 j |
| **Comptes utilisant l'IA** | `COUNT(DISTINCT user_id)` | 30 j |
| **Taux d'usage IA** | comptes IA ÷ comptes actifs | 30 j |
| **Longueur moyenne** | `AVG(length(content))` | 30 j |
| **Provider dominant** | `logAI.provider` | 30 j |
| **Taux d'échec** | `logAI.status = 'failure'` ÷ total | hebdo |
| **Latence p95** | `logAI.latencyMs` | hebdo |

### 10.1 Coût estimé

| Profil | Coût IA/mois |
|---|---|
| FREE (5 échanges) | ~10 FCFA |
| PLUS (30 échanges + 5 corrections) | ~135 FCFA |
| **Part du revenu** | **~2,8 %** |

> **Coût par utilisateur = coût IA mensuel ÷ total utilisateurs.**
> Aucun tableau de coûts IA n'existe en base : **à créer** si le suivi devient récurrent.

---

## 11. Seuils d'alerte

### 11.1 Volume minimal

| Volume | Comportement |
|---|---|
| **< 30** | **aucune alerte** — rapport « échantillon insuffisant » |
| 30 – 100 | alerte `info` seulement |
| > 100 | alerte `warn` / `critique` selon l'ampleur |

> **Non négociable.** Avec 7 comptes actifs, toute alerte serait du bruit et
> discrédirait l'outil dès la première semaine.

### 11.2 Seuils

| Signal | Seuil | Sévérité |
|---|---|---|
| Trafic (J-1 vs moy. 7 j) | ≥ −30 % | attention |
| Trafic | ≥ −50 % | critique |
| Taux d'inscription | −25 % vs 7 j | attention |
| Activation | < 30 % | attention |
| Taux d'engagement IA | < 15 % des actifs | attention |
| Conversion checkout | −30 % vs 7 j | attention |
| Panier abandonné > 24 h | tout nouveau | info |
| Rétention J7 | < 20 % | critique |
| Churn mensuel | > 10 % | critique |
| Échec IA | > 20 % des appels | attention |
| Latence p95 IA | > 10 s | attention |

---

## 12. Requêtes de référence

Toutes lues par n8n en **lecture seule**.

### 12.1 Volumétrie

```sql
SELECT DATE(created_at)::date AS jour,
       COUNT(*) FILTER (WHERE event = 'pageview')::int          AS pageviews,
       COUNT(DISTINCT session_id)::int                           AS sessions,
       COUNT(*) FILTER (WHERE event = 'signup_completed')::int  AS inscriptions,
       COUNT(*) FILTER (WHERE event = 'lesson_started')::int    AS lecons,
       COUNT(*) FILTER (WHERE event = 'purchase')::int           AS achats
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY 1 ORDER BY 1;
```

### 12.2 MRR

```sql
SELECT COALESCE(SUM(s.price_cents), 0) / 100.0 AS mrr
FROM subscriptions s
JOIN subscription_plans p ON p.id = s.plan_id
WHERE s.status = 'active' AND (s.end_at IS NULL OR s.end_at > NOW());
```

### 12.3 Activation — la fuite n°1

```sql
SELECT COUNT(*)::int AS inscrits,
  COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM lesson_reads lr WHERE lr.user_id = u.id))::int AS actifs,
  ROUND(100.0 * COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM lesson_reads lr WHERE lr.user_id = u.id))
    / NULLIF(COUNT(*), 0), 1) AS activation_pct
FROM users u
WHERE role = 'student' AND created_at >= NOW() - INTERVAL '90 days';
```

### 12.4 Contenu sans lecteurs

```sql
SELECT c.code, c.title, COUNT(DISTINCT l.id)::int AS lessons
FROM chapters c
JOIN lessons l ON l.chapter_id = c.id
LEFT JOIN lesson_reads lr
  ON lr.lesson_id = l.id AND lr.read_at >= NOW() - INTERVAL '30 days'
GROUP BY c.id, c.code, c.title
HAVING COUNT(DISTINCT lr.user_id) = 0
ORDER BY lessons DESC;
```

### 12.5 Vérification PII — à passer avant tout déploiement IA

```sql
-- DOIT RENVOYER 0
SELECT COUNT(*) FROM analytics_events
WHERE props::text ~* '(name|email|phone|ref|code|password|token|address)';
```

> **Si > 0, ne pas déployer** : le contexte des prompts pourrait contenir des
> données personnelles.

---

## 13. Tableau de bord

### 13.1 Page « Croissance » — quotidien

| Bloc | Contenu | Source |
|---|---|---|
| **Funnel du jour** | PV → clic → inscription → activation → IA → paiement | SQL |
| **Comparaison** | J-1 vs moy. 7 j | SQL |
| **Points d'attention** | alertes actives | W1/W4 |
| **Recommandations** | `growth_recommendations` validées | store |

### 13.2 Page « Contenu » — hebdomadaire

| Bloc | Contenu |
|---|---|
| Propositions de posts | statut `draft` / `validated` |
| Calendrier éditorial | à valider |
| Opportunités SEO | classées |
| Chapitres sans lecteurs | liste |

### 13.3 Page « Rétention »

| Bloc | Contenu |
|---|---|
| Cohortes W0–W8 | rétention en % |
| Segments à risque | décompte par tranche de score |
| J7 / J30 | courbes |

### 13.4 Page « Revenus »

| Bloc | Contenu |
|---|---|
| MRR / ARR | SQL §12.2 |
| Abonnés actifs / résiliés | SQL |
| ARPU | dérivé |
| CAC par canal | §7 |

> Ces pages **agrègent** des métriques déjà disponibles. Aucune collecte ajoutée.

---

## 14. Ce qui manque aujourd'hui

| Manquant | Cause | Priorité |
|---|---|---|
| `pageviews` toujours 0 | **E1** — `page_view` vs `pageview` | **critique** |
| Statut de recommandation | **E2** — pas de colonne `status` | **critique** |
| `growth_metrics` non alimenté | **E4** — aucun cron | haute |
| Churn / rétention | non implémenté | haute |
| Coût IA par utilisateur | aucun tableau de coûts | moyenne |
| Taxonomie dupliquée | **E5** | moyenne |
| Sessions GA4 dans l'app | non récupéré (Data API non branchée) | moyenne |
| Attribution multi-touch | hors périmètre | basse |

> Les trois premiers doivent être corrigés **avant** le premier workflow.
> Ils sont listés en T0 de `docs/growth-ai-v1.md`.

---

## Voir aussi

- `docs/growth-ai-v1.md` — architecture, agents, sécurité, PII, limites
- `docs/n8n-workflows-v1.md` — workflows, triggers, prompts, garde-fous
- `docs/analytics-funnel.md` — taxonomie détaillée (Phase 3f)
- `docs/monetisation-v1.md` — stratégie, prix, unit economics (Phase 3g)