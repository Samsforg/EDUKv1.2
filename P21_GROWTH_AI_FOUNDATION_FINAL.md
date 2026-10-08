# RAPPORT P2.1 — GROWTH AI FOUNDATION

> **Decision Layer — Audit-first / Production-safe / Sans automatisation externe.**
> Aucun push, aucun déploiement, aucun commit automatique, aucune action
> externe (n8n, WhatsApp, email/SMS, campagne, LLM) déclenchée.

---

## 1. Verdict

**PHASE P2.1 — GROWTH AI FOUNDATION : PASS WITH OBSERVATIONS**

Fondation fonctionnelle et conforme au cahier :

| Critère PASS | État |
|---|---|
| Decision Layer fonctionnelle (DATA → SIGNALS → SEGMENTS → OPPORTUNITIES → RECOMMENDATIONS → ACTIONS PROPOSÉES) | ✅ |
| Règles déterministes (mêmes données → même output) | ✅ testé (idempotence) |
| Données réelles uniquement | ✅ comptages `analytics_events` / `subscriptions` test-exclus |
| Aucune métrique fabriquée (retention n=1 → INSUFFICIENT_DATA, taux null si dénominateur 0) | ✅ |
| Test users exclus dès la source | ✅ prouvé par test SQL dédié |
| Tests OK (783/783), build OK, tsc 0, lint 0 err | ✅ |
| Aucune action externe, 0 FCFA, IA générative hors du core | ✅ scan de sécurité automatisé |
| Aucune nouvelle table, aucune migration, 0 modification `src/` hors ajout | ✅ |

Observations qui motivent **PASS WITH OBSERVATIONS** (et non PASS pur) :
historique rétention insuffisant (D7 indisponible), métriques UTM/referral
non consolidées en SQL portable (reportées), dettes G1/G2 toujours
présentes, seuils de référence à recalibrer avec ≥ 30 jours d'historique.

---

## 2. Git

| | |
|---|---|
| Branche | `master` |
| HEAD de départ | `376714c` (P2 local, 1 en avance sur `origin/master` = `bef324b`) |
| État | working tree propre avant travaux P2.1 |
| Travail P2.1 | **non commité** (validation requise avant `feat(growth): add deterministic growth ai foundation`) |
| Push | **NON EXÉCUTÉ** |
| Deploy | **NON EXÉCUTÉ** |

Fichiers créés/modifiés (voir §13) : 9 fichiers ajoutés, 1 fichier modifié
(2 lignes), **0 fichier supprimé**, **0 fichier `src/lib/analytics*`,
`db.ts`, `growth/data/store.ts` modifié**.

---

## 3. Architecture

```
DATA (analytics_events, subscriptions — test users exclus)
 ↓  data.ts : countFunnelForDay × N jours (courant + précédent)
 ↓          + 6 comptages DISTINCT segments + MRR/abonnements
 ↓          + rétention officielle rapportée telle quelle
SIGNALS (rules.ts — IF/THEN, seuils constants)
 ↓
SEGMENTS (segments.ts — 7 clés déterministes)
 ↓
OPPORTUNITIES (impact × confidence × urgency → priority_score 0-100)
 ↓
RECOMMENDATIONS (recommend.ts — WHAT/WHY/FOR WHOM/WHEN/IMPACT/CONFIDENCE)
 ↓
ACTIONS PROPOSÉES (mode: "PROPOSED" — jamais exécutées)
```

- `src/lib/growth/decision/` : **8 fichiers purs** (types, thresholds,
  scoring, segments, rules, recommend, data, index) — zéro import LLM,
  zéro `fetch`, zéro `process.env`, zéro écriture SQL.
- **DETERMINISTIC FIRST** : le moteur n'appelle ni OpenAI/Gemini/Claude ni
  aucun provider du gateway (`src/lib/growth/ai/*` **inchangé**). La couche
  LLM existante (`generateStrategy`/`generateRecommendation`) continue de
  fonctionner à côté, non modifiée. Architecture future :
  `RULE ENGINE → [LLM ENRICHMENT optionnel]` en P2.2+.
- Couche DATA injectable (`anchorDate`, `days`, `now`) → tests reproductibles.

---

## 4. Existing Growth tables

Audit §14 avant toute création — **aucune table créée, 0 migration** :

| Table | Rôle existant | Décision P2.1 |
|---|---|---|
| `growth_metrics` | agrégats quotidiens (alimentation manuelle, E4) | non utilisée par le moteur (le funnel est recompté à la volée) |
| `growth_strategies` | objets LLM | inchangée |
| `growth_contents` | contenus LLM | inchangée |
| `growth_recommendations` | recommandations LLM (sans colonne `status` — dette E2) | **non réutilisée en P2.1** : le calcul à la volée est idempotent sans persistance, et le format diffère (type `content/campaign/…` vs types d'opportunité) |

Décision : **pas de table `growth_ai_recommendations`** (interdiction §14
respectée). Le stockage des recommandations P2.1 dans
`growth_recommendations` (avec migration idempotente ajoutant `status` +
payload) est remis à **P2.2** — cf. §19.

---

## 5. Growth signals

7 types de signal (faits observés, jamais des actions) :

| Type | Condition | Seuil (documenté, constant) |
|---|---|---|
| `activation_rate_low` | activated / signup_completed < seuil | 0.30 |
| `signup_rate_low` | inscrits / pages vues < seuil | 0.10 |
| `signup_rate_high` | idem > seuil haut | 0.30 |
| `checkout_dropoff_high` | 1 − achats/checkouts > seuil | 0.50 |
| `purchase_rate_low` | ≥ 30 activations et 0 achat (booléen, pas de seuil inventé) | comptage |
| `return_visit_low` | return_visit / pages vues < seuil | 0.20 |
| `retention_unavailable` | état officiel du contrat P2 rapporté | n/a |

Chaque signal contient `id · type · metric · value · threshold · period ·
severity · source · status · created_at` (§4). Les ids sont dérivés du
type + période (jamais `Date.now()`) → idempotence.

Observation : `utm_source_performing` / `referral_performing` **non
implémentés** — `analytics_events` n'a pas de colonne `utm` (les UTM sont
dans `props` JSON, non portable SQLite/PG sans fonction JSON dédiée).
Reporté à P2.2 avec une couche d'attribution consolidée (cf. §18).

---

## 6. Segments

7 segments déterministes, tous fondés sur des comptages réels :

| Segment | Source réelle |
|---|---|
| `NEW_VISITOR` | pages vues de la période (proxy documenté — `session_id` fréquemment NULL) |
| `REGISTERED_NOT_ACTIVATED` | `signup_completed` DISTINCT période sans aucun `activated` |
| `ACTIVATED_NOT_PAID` | `activated` DISTINCT sans `purchase` ni abonnement actif |
| `PAID_USER` | `subscriptions.status='active'` non-test |
| `RETURNING_USER` | `return_visit` DISTINCT période |
| `HIGH_INTENT` | `begin_checkout` DISTINCT sans achat ni abonnement actif |
| `DORMANT_USER` | activité entre J-30 et J-14, aucune activité depuis J-14 |

Segments **interdits et non créés** : `HIGH_VALUE_USER`, `PARENT`,
`STUDENT`, `TEACHER` (informations non fiables — testé). Chaque segment
porte `count` (réel, 0 compris) + `status` (`VALID` si ≥ 30 membres,
`INSUFFICIENT_DATA` sinon, `UNAVAILABLE` si la source échoue).

---

## 7. Opportunities

| Type | Segment | Preuve (exemple) |
|---|---|---|
| `ACTIVATION_BOTTLENECK` | REGISTERED_NOT_ACTIVATED | `signup_completed = 150 · activated = 35 · activation_rate = 0.233 (seuil 0.3)` |
| `CHECKOUT_DROPOFF` | HIGH_INTENT | `begin_checkout = 40 · purchase = 0 · abandon = 1.0 (seuil 0.5)` |
| `MONETIZATION_OPPORTUNITY` | ACTIVATED_NOT_PAID | `activated = 35 · purchase = 0 (min sample 30)` |
| `RETENTION_OPPORTUNITY` | RETURNING_USER | `return_visit = 50 · page_view = 2000 · return_visit_rate = 0.025 (seuil 0.2)` |
| `ACQUISITION_WEAKNESS` | NEW_VISITOR | `signup_rate = 0.075 (seuil 0.1)` |
| `ACQUISITION_STRENGTH` | NEW_VISITOR | `signup_rate = 0.4 (seuil haut 0.3)` |

Chaque opportunité porte `evidence` chiffrée, `impact`, `confidence`,
`urgency`, `priority_score`, `priority`, `status`, `created_at` (§6).
Tri garanti par `priority_score` décroissant (tie-break par id).

---

## 8. Recommendations

Contrat §7 respecté pour chaque recommandation :

```json
{
  "what": "Simplifier le parcours signup → premier cours …",
  "why": "ACTIVATION_BOTTLENECK — signup_completed = 150 · activated = 35 …",
  "for_whom": "REGISTERED_NOT_ACTIVATED",
  "when": "immediately | this_week | next_cycle",
  "expected_impact": "Rapprocher le taux d'activation du seuil documenté 0.3 …",
  "confidence": 100,
  "action": { "type": "IMPROVE_ONBOARDING", "mode": "PROPOSED", "note": "… humain …" }
}
```

- `expected_impact` décrit la **cible documentée à rejoindre** — jamais une
  promesse chiffrée fabriquée (ex. « +15 % » inventé).
- 8 types d'action possibles définis (§8) : `OPTIMIZE_LANDING`,
  `IMPROVE_ONBOARDING`, `PROMOTE_COURSE`, `IMPROVE_KORA_ENTRY`,
  `REACTIVATE_USER`, `PROMOTE_SUBSCRIPTION`, `CREATE_CONTENT`,
  `RUN_CAMPAIGN` — testé ; le playbook P2.1 en utilise 6.
- **Aucune action n'est exécutée** : `mode: "PROPOSED"` systématique,
  vérifié par test sur toutes les recommandations.

---

## 9. Rule engine

| Règle | Formulation | Test |
|---|---|---|
| R1 | IF `activation_rate < 0.30` AND signups ≥ 30 THEN `ACTIVATION_BOTTLENECK` | ✅ + frontière 0.30 exacte |
| R2 | IF abandon checkout `> 0.50` AND checkouts ≥ 10 THEN `CHECKOUT_DROPOFF` | ✅ + sous le seuil → aucun signal |
| R3 | IF activations ≥ 30 AND achats = 0 THEN `MONETIZATION_OPPORTUNITY` | ✅ + 29 activations → INSUFFICIENT_DATA |
| R4 | IF `return_visit_rate < 0.20` THEN `RETENTION_OPPORTUNITY` ; rétention D7 → **jamais de recommandation** | ✅ |
| R5 | IF `signup_rate < 0.10` THEN `ACQUISITION_WEAKNESS` ; IF `> 0.30` THEN `ACQUISITION_STRENGTH` | ✅ |

**Score de priorité (§9)** — tout est dans
`src/lib/growth/decision/thresholds.ts` + `scoring.ts`, constants et testés :

```
priority_score = round(impact × confidence × urgency / 10000) ∈ [0,100]
  impact    : |valeur − seuil| / seuil, saturé à 100   (écart observé)
  confidence: linéaire vs min sample, 100 au-delà      (fiabilité)
  urgency   : table constante — trend ≥ 0 → 40 ; trend < 0 → 60 + min(40, |baisse %|) ; sans trend → 50

80-100 CRITICAL · 60-79 HIGH · 40-59 MEDIUM · 20-39 LOW · 0-19 IGNORE
```

Aucun coefficient tuné hors tables documentées ; `SEVERITY_GAPS`
(0.2 / 0.5) gouverne aussi la gravité des signaux (`low|medium|high`).

---

## 10. Sample-size protection

```ts
MIN_SAMPLE = {
  traffic_rate: 30,   // taux à dénominateur visiteurs/inscrits
  checkout_rate: 10,  // taux à dénominateur checkouts
  monetization: 30,   // activations pour conclure sur la monétisation
  retention: 30,      // cohorte minimum (P2 : n = 1)
  segment: 30,        // segment représentatif pour décider
  revenue_subs: 30,   // abonnés actifs pour juger le revenue sain
}
```

Sous le minimum : `status = INSUFFICIENT_DATA`, signal éventuel marqué
`severity: info`, **zéro opportunité, zéro recommandation forte** (testé
avec 12, 29, 5, 0 inscrits). Rétention D7 : `INSUFFICIENT_DATA` permanent
tant que le contrat P2 dit `retention: null` — le moteur **ne recalcule
jamais** une rétention alternative (§12 « aucune métrique Growth ne doit
être fabriquée »).

---

## 11. KPI contract

Contrat §13 implémenté (`GrowthInsight`) — 6 métriques :

| metric | benchmark | status courant |
|---|---|---|
| `signup_rate` | 0.10 | VALID / INSUFFICIENT_DATA selon sample |
| `activation_rate` | 0.30 | idem |
| `checkout_dropoff` | 0.50 (max) | idem |
| `purchase_rate` | **null** (aucun seuil inventé) | VALID si activations > 0 |
| `return_visit_rate` | 0.20 | VALID / INSUFFICIENT_DATA |
| `retention_d7` | null | **INSUFFICIENT_DATA** (officiel) |

Chaque insight contient les 13 champs : `metric · period · sample_size ·
value · benchmark · status · signal · opportunity · recommendation ·
priority · confidence`. Statuts autorisés : `VALID | INSUFFICIENT_DATA |
UNAVAILABLE` (UNAVAILABLE notamment si source absente).

**Growth Health (§17)** — 5 étapes, ratings `GOOD | LOW | MEDIUM | HIGH |
INSUFFICIENT_DATA` :

```
Acquisition   signup_rate      vs 0.10
Activation    activation_rate  vs 0.30
Conversion    checkout_dropoff vs 0.50 (max)
Retention     retention_d7     → INSUFFICIENT_DATA (officiel)
Revenue       abonnés actifs   : 0→HIGH · 1-9→MEDIUM · 10-29→LOW · ≥30→GOOD
```

Gravité = écart relatif au seuil (`SEVERITY_GAPS`), `GOOD` si conforme.

---

## 12. API / UI

**Une seule route** (§16 — aucune cascade `/api/growth/*`) :

```
GET /api/admin/growth/insights
  guardApi("GET /api/admin/growth/insights") + requireAdmin()
  → computeGrowthData() + runDecisionLayer()
  → bundle JSON agrégé (aucune PII, aucun email/phone)
  read-only : aucune écriture, GET seul (testé)
```

**UI minimaliste (§17)** : `GrowthInsightsPanel.tsx` (client) importé dans
`espace-admin/growth/page.tsx` (2 lignes modifiées) — **le dashboard
`GrowthDashboard.tsx` existant est intact**. Le panneau affiche Growth
Health, Top Signals, Top Opportunities, Top Recommendations + segments.
Aucune action exposée côté UI (état `PROPOSED` affiché tel quel).

---

## 13. Tests

`tests/p21-growth-ai-foundation.test.ts` — **84 tests, 10 blocs** :

| Bloc | Couverture |
|---|---|
| §9 score | échelle, buckets aux 10 bornes, formule, confidence, impact, urgence, gravité, trend, seuils |
| §4 signaux | valide, insuffisant, frontière exacte du seuil, période, dropoff (3 cas), signup_high, retention |
| §5 segments | 7 clés + classes interdites, NEW_VISITOR, min sample, comptages 0, sources, UNAVAILABLE |
| §6 opportunités | création+preuve, score/bucket, confidence, **29 → aucune opp**, monétisation 30/29, tri |
| §7/§8 reco | it.each 5 types (WHAT/WHY/FOR WHOM/WHEN/IMPACT/CONFIDENCE), mode PROPOSED, 8 types d'action, RUN_CAMPAIGN |
| §11 règles | R1-R5 + tendances + données vides → 0 opportunité |
| §17 health | 5 étapes, INSUFFICIENT_DATA, HIGH/GOOD, retention, revenue 0/15/40/unavailable, déterminisme |
| §13 contrat | 6 métriques, 13 champs, benchmark null, retention null, meta |
| §18 safety | scan `decision/*.ts` (0 réseau/LLM/secrets/SQL write), route admin read-only, panneau read-only, 0 dépendance LLM |
| §12 data trust | 0 métrique fabriquée, dénominateurs nuls, INSUFFICIENT_DATA sans reco |
| §18 idempotence | 2 exécutions → output strictement identique, ids stables |
| couche data SQL | **comptes de test exclus** (REGISTRATION/HIGH_INTENT/NEW_VISITOR/funnel), bornes de fenêtre glissante |

Couverture totale : **783/783 tests, 51 suites** (baseline P2 : 699/699,
50 suites → +84 tests, +1 suite).

---

## 14. Security

- **0 secret dans les logs ou les réponses** : le moteur ne lit ni
  `DATABASE_URL`, ni `process.env` (scan automatisé des 8 fichiers).
- Réponse route : agrégats (comptages, taux, libellés) — **aucun
  email/phone/user_id**, aucune donnée personnelle dans les insights.
- Route admin-only (`requireAdmin`) + `guardApi` — aucune route publique
  créée.
- Test users exclus **dès la source** (prédicats P1.0 réutilisés) — prouvé
  par test SQL avec compte `@test.ci` + compte réel.
- Aucune écriture SQL dans la couche decision (SELECT uniquement, scan
  automatisé `INSERT INTO|UPDATE … SET|DELETE FROM`).

---

## 15. Performance

- **Aucun calcul sur les parcours utilisateur** : landing, cours, Kora,
  quiz, login inchangés (0 ligne modifiée sur ces chemins).
- Calcul **admin-only, à la volée, read-only** : ~21 petits appels
  `countFunnelForDay` (7 jours × 2 fenêtres) + 6 requêtes DISTINCT
  indexées (`idx_analytics_event`, `idx_analytics_user`) + 2 requêtes
  business — aucun index ni table ajouté.
- Panneau client : un seul `fetch` au montage de la page admin.
- Aucune dépendance npm ajoutée (0 FCFA, testée).

---

## 16. Production

| Contrôle | Résultat |
|---|---|
| `GET https://edukora.net/api/health` | **200** — `ok:true`, `warnings:[]` (2026-10-08T13:55:30Z) |
| Déploiement | **aucun** (0 push, 0 `vercel deploy`) |
| `DATABASE_URL` | non présente en session — audit SQL prod direct **non disponible** (jamais affichée/demandée) |
| CI | inchangée (dernier run P2.0 = success ; aucun nouveau run déclenché) |

---

## 17. G1/G2

Aucune correction automatique (§3 respecté) :

- **G1** (`growth/store.ts` : signature `_init` avant CREATE,
  `.catch(() => {})`, `DEFAULT now()` PG-only, hybride SQLite/PG) :
  **inchangé**. Le Decision Layer **ne dépend pas de G1** — il ne lit ni
  n'écrit aucune table `growth_*` (constaté : aucune importation de
  `growth/data/store` dans `src/lib/growth/decision/`).
- **G2** (`referrals` / `courses` absentes, 0 lecteur) : **inchangé**,
  toujours 0 référence (`FROM/JOIN referrals|courses` = 0 dans le
  domaine P2.1).
- Aucun blocage G1/G2 n'a empêché l'implémentation — rien à documenter
  comme bloquant.

---

## 18. Remaining debt

1. **E2 — `growth_recommendations` sans colonne `status`** :
   `updateRecommendationStatus` écrase toujours `priority` (dette
   historique, non régression P2.1). Bloque toujours la boucle de
   validation humaine de la couche LLM.
2. **E4 — `growth_metrics` non alimentée par cron** : le Decision Layer ne
   l'utilise pas (recomptage à la volée), mais les rapports automatisés
   restent vides sans clic admin.
3. **E5 — taxonomie périmée** dans `growth/ai/types.ts` (`page_view`
   fantôme, 6 événements manquants) : non corrigée (hors périmètre P2.1).
4. **UTM/referral non évaluables** en SQL portable (colonnes dans `props`
   JSON) → signaux `utm_source_performing` / `referral_performing`
   reportés.
5. **Rétention D7** indisponible (n = 1, seuil 30) — état explicite,
   aucune approximation.
6. **Seuils de référence** (0.30 / 0.10 / 0.50 / 0.20) : cibles EdTech de
   travail, pas de benchmarks marché CI — recalibrage requis (§19).
7. **LIMITATION héritée P2.0** : le schema guard vérifie la présence des
   tables, non leur conformité colonne par colonne.
8. **SMTP Brevo `535`** observé en P1.x — hors scope Growth AI.

---

## 19. Recommendation for P2.2

**P2.2 — Growth AI Intelligence** (prochaine phase) :

1. **Persistance des insights** : migration idempotente ajouter
   `status` + `payload JSONB` à `growth_recommendations` (ou table
   dédiée si le format l'exige) pour historiser les décisions P2.1 et
   activer la boucle de validation humaine (correction E2).
2. **Consolidation d'attribution** : exposer `utm_source/medium/campaign`
   en colonnes ou index SQL portable → débloquer
   `utm_source_performing` / `referral_performing`.
3. **Recalibration des seuils** dès ≥ 30 jours d'historique exploitable
   (garder les constantes, changer les valeurs par décision documentée).
4. **LLM enrichment optionnel** : reformulation des recommandations via le
   gateway existant (`growth/ai/provider`) — **après** le noyau
   déterministe, jamais dans le core, coût 0 garanti par quotas gratuits.
5. **Rétention** : activer le calcul D7 quand l'historique atteint n ≥ 30
   (le contrat et le moteur sont prêts : `retention.available`).

Ne pas entamer P2.3 (Automation Engine) avant que P2.2 soit validé :
**Growth AI doit d'abord savoir observer et décider avant d'apprendre à
agir.**

---

### Validation technique (exécutée)

```
npm test -- --runInBand   → 783/783 tests, 51 suites   ✅
npx tsc --noEmit          → 0 erreur                    ✅
npm run lint              → 0 erreur / 232 warnings (baseline) ✅
npm run build             → OK                          ✅
git diff --check          → 0                           ✅
health production         → 200 ok=true warnings=[]     ✅
```
