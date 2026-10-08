# P2.3 — Growth Action Engine — Rapport final

> Moteur d'actions **proposées** : DATA → SIGNALS → SEGMENTS → OPPORTUNITIES →
> RECOMMENDATIONS → **ACTIONS (PROPOSED)** → **MEASUREMENT PLAN**.
> Aucune exécution, 0 FCFA, aucune infrastructure d'automatisation.

## 1. Contexte & objectif (§1)

P2.3 ajoute la couche de décision **« quoi faire, pourquoi, pour qui, quand,
comment mesurer »** par-dessus le Decision Layer existant (P2.1 + P2.2) :
chaque recommandation devient un **plan d'action** priorisé, classé par horizon
et accompagné d'un plan de mesure. Le moteur **propose** — un humain décide,
exécute et valide. Objectifs atteints : déterminisme total (même input → mêmes
plans), transparence (evidence chiffrée), maîtrise (blocs `blocked` quand la
donnée ne permet pas de conclure).

## 2. Périmètre & interdits (§2)

Respectés à la lettre : **aucun** envoi (email/SMS/messagerie), aucune
publication, aucun CRM, aucune pub payante, aucun LLM obligatoire, aucun
webhook d'action, **aucun scheduler / cron / worker / file d'attente**, **0
nouvelle table ni migration** (aucun `MIGRATION_REQUIRED`), aucun A/B implémenté
(seulement le drapeau `experiment_ready`), **aucun commit / push / deploy /
PR**. Budget : 0 FCFA. Vérifié par les scans de sécurité (§19-§20).

## 3. Chaîne DATA → ACTIONS (§3)

```
GrowthData ─ evaluateRules / evaluateAttributionRules ─→ opportunities
          ─ buildRecommendation ─→ recommendations
          ─ buildActionPlans ─→ actions {now, this_week, backlog, blocked}
```

Le module `src/lib/growth/decision/action-plans.ts` (496 lignes, pur) est
orchestré dans `runDecisionLayer` (`index.ts`) : `buildActionPlans({data,
recommendations, opportunities: allOpportunities, metrics})`. Aucune requête,
aucun accès réseau, aucun `process.env` (scan §19-§20).

## 4. Réutilisation & non-régression (§4)

Le bundle existant a été **étendu, pas reconstruit** : champ `actions` ajouté à
`GrowthInsightBundle` ; route `GET /api/admin/growth/insights` inchangée
fonctionnellement (admin + `guardApi` + GET seul, seul commentaire mis à jour) ;
les 6 métriques d'`insights`, les 5 `health` et `meta` sont **strictement
identiques** (test de non-régression §20). Les suites P2.1 (84) et P2.2 (56)
restent vertes : aucun contrat existant cassé.

## 5. Modèle GrowthActionPlan (§5)

Types ajoutés à `types.ts` (417 lignes) : `Actionability`, `ActionPriorityBand`
(P0-P3), `ActionHorizon` (NOW/THIS_WEEK/BACKLOG), `ActionMetricKey` (8 valeurs),
`TargetCalibration`, `GrowthActionMetric`, `GrowthActionPlan`,
`GrowthActionQueue`. Le plan porte : `id`, `opportunity_id`,
`recommendation_id`, `opportunity_type`, `action_type`, `title`, `objective`,
`target_segment`, `channel`, `priority_score`, `action_priority`,
`actionability`, `urgency` (libellé), `effort`, `expected_impact`,
`mode: "PROPOSED"`, `status: "PROPOSED"`, `horizon`, `experiment_ready`,
`steps[]`, `success_metrics[]`, `guardrails[]`, `evidence[]`, `created_at`.
**Aucun statut d'exécution n'existe** dans le modèle.

## 6. Actionnabilité (§6)

`computeActionability(reco, opp)` — bornes constantes testées
(`ACTION_SCORE_BUCKETS = {60, 40}`, `ACTION_CONFIDENCE_FLOOR = 40`) :

| Condition | Actionnabilité |
|---|---|
| statut reco ou opportunité ≠ VALID | **BLOCKED** |
| confiance < 40 (couverture d'attribution plafonnante) | **BLOCKED** |
| score ≥ 60 | HIGH |
| score ≥ 40 | MEDIUM |
| sinon | LOW |

Intégration testée : couverture 12/100 → confiance canal 12 → plan
`CHANNEL_ACTIVATION_GAP` **BLOCKED**, uniquement dans le bucket `blocked`.
Cas synthétique statut `INSUFFICIENT_DATA` → BLOCKED également.

## 7. Priorité P0-P3 (§7)

`computeActionPriority(actionability, priorityLabel)` — matrice complète testée
(12 combinaisons) :

| | CRITICAL | HIGH | MEDIUM | LOW/IGNORE |
|---|---|---|---|---|
| **HIGH** | P0 | P1 | P2 | P2 |
| **MEDIUM** | P2 | P2 | P2 | P2 |
| **LOW** | P2 | P2 | P2 | P3 |
| **BLOCKED** | P3 | P3 | P3 | P3 |

Aucune seconde échelle de score : la bande se dérive du `priority_score`
P2.1 inchangé (`PRIORITY_BUCKETS`).

## 8. Horizons (§8)

`horizonForPriority` : P0/P1 → **NOW**, P2 → **THIS_WEEK**, P3 → **BACKLOG**.
Les horizons sont des **propositions d'ordre de grandeur**, jamais un
ordonnancement : rien n'est planifié ni déclenché.

## 9. File d'actions & buckets (§9)

`GrowthActionQueue = {now, this_week, backlog, blocked}` — **buckets
disjoints** (testé) : une action BLOCKED n'appartient qu'à `blocked` (jamais à
un horizon), chaque plan non bloqué est exactement dans un horizon, chaque
bucket est trié `priority_score` décroissant puis `id` croissant. `Object.keys`
du bucket = `["now","this_week","backlog","blocked"]` (test).

## 10. Dédoublonnage & ids déterministes (§10)

`id = action_<TYPE>#<période>#<segment|global>` via `actionPlanId` (testé sur le
format `action_ATTRIBUTION_GAP#1999-01-01/1999-01-07#global`). Dédoublonnage en
`Map` : en cas de collision, le plan au `priority_score` le plus haut l'emporte.
Test : recommandations **dupliquées ×2** → exactement 1 plan par opportunité,
ids uniques, score préservé.

## 11. Playbooks (steps / effort)

Un playbook par type d'opportunité (9/9 couverts, test d'union des 3 jeux de
données) : titre contextualisé (ex. canal extrait de l'evidence `canal <nom>`),
effort LOW/MEDIUM/HIGH, 4 étapes concrètes, garde-fous spécifiques. Le plan
réutilise `reco.what` comme `objective` et `reco.action.type` comme
`action_type` (aucun élargissement de `GrowthActionType`).

## 12. Success metrics (§12)

`GrowthActionMetric = {metric, baseline, target, direction, minimum_sample,
target_calibration}` — 1 métrique contractuelle par plan :

| Type | metric | baseline | cible | direction |
|---|---|---|---|---|
| ACTIVATION_BOTTLENECK / CHANNEL / REFERRAL | activation_rate | taux observé (canal / agrégat filleuls) | 0.3 | UP |
| ACQUISITION_WEAKNESS | signup_rate | taux observé | 0.1 | UP |
| ACQUISITION_STRENGTH | signup_rate | taux observé | 0.3 (seuil haut) | UP |
| CHECKOUT_DROPOFF | checkout_dropoff | taux observé | 0.5 | DOWN |
| MONETIZATION_OPPORTUNITY | subscription_count | achats réels | — | UP |
| RETENTION_OPPORTUNITY | return_visit_rate | taux observé | 0.2 | UP |
| ATTRIBUTION_GAP | attribution_coverage | couverture réelle | 1.0 | UP |

`minimum_sample` repris de `MIN_SAMPLE` (30 / 10). Baselines vérifiées
numériquement (0.2, 1, 0.1, 0.06, 0.4, 8/40, 5/30…).

## 13. Calibration des cibles (§13)

Deux origines seulement : **`THRESHOLD_BASED`** (seuil documenté de
`thresholds.ts`, baseline non nulle) ou **`TARGET_NOT_CALIBRATED`** (`target:
null`). Règle testée : baseline `null` (dénominateur nul) → cible `null` +
`TARGET_NOT_CALIBRATED` + `experiment_ready: false`. Monétisation sans seuil
documenté → `TARGET_NOT_CALIBRATED`. **Aucune cible n'est inventée.**

## 14. Evidence (§14)

`evidence[]` = [evidence chiffrée de l'opportunité, format
`priorité … · score … · confiance … · actionnabilité …`]. Test : longueur ≥ 2,
première entrée identique à celle de l'opportunité, présence de chiffres, et
**scan anti-qualitatif** sur tous les textes des plans
(`excellent|bon|mauvais|faible|moyenne|ivoirien|meilleur|pire|benchmark
edtech|au-dessus de la moyenne`) → zéro match.

## 15. Retention & données insuffisantes (§15)

Aucune action n'est fondée sur une conclusion statistique inexistante : la
rétention D7 reste `INSUFFICIENT_DATA` (aucune action de rétention fabriquée à
partir d'elle), les plans issus d'un constat non fiable vont en `blocked`, et
les métriques sans baseline ne portent aucune cible. Le proxy `return_visit_rate`
est explicitement documenté comme proxy court dans les garde-fous.

## 16. Guardrails (§16)

Chaque plan porte ses garde-fous spécifiques + 3 garde-fous communs :
**exécution humaine requise**, **proposition sans budget (aucun envoi ni
publication automatique)**, **rejouer la mesure avant de conclure**. Test :
≥ 3 guardrails et ≥ 3 steps par plan.

## 17. API & UI (§17)

- **Route** : inchangée (GET seul, `requireAdmin` + `guardApi`, read-only,
  réponse = bundle sans PII maintenant enrichi de `actions`).
- **UI** (`GrowthInsightsPanel.tsx`, 313 lignes) : section **« Actions
  recommandées »** avec les 4 sous-files **À faire maintenant · Cette semaine ·
  À surveiller · Bloquées par les données**. Chaque carte affiche : titre,
  objectif (pourquoi), bande P0-P3, actionnabilité, effort, impact, urgence,
  segment/canal, score, métrique de succès (baseline → cible + calibration +
  min sample), evidence, chip **PROPOSED**, drapeau d'expérimentation. États
  vides inclus. Légère (composants natifs, aucun Kanban/drag-drop/chart) : le
  test UI interdit explicitement `draggable|onDrop|Kanban`.

## 18. Performance (§18)

**0 requête supplémentaire** — le module est 100 % calcul pur :
- `runDecisionLayer` sous spy `db.query`/`db.queryOne` → **0 appel** ;
- `computeGrowthData` borné **[51, 53]** identique à P2.2 (P2.1 = 51, P2.2 = +2,
  **P2.3 = +0**) ;
- aucune requête par action : les plans se dérivent du bundle mémorisé.

## 19. Security (§19-§20)

- Scan du répertoire `src/lib/growth/decision` (regex P2.1 : `fetch(`, axios,
  LLM, `n8n`, `whatsapp`, `mailer`, `process.env`, `DATABASE_URL`, `Bearer`,
  `INSERT INTO`, `UPDATE … SET`, `DELETE FROM`, `generateRecommendation`…) sur
  `action-plans.ts`, `types.ts`, `index.ts` → **0 match** ;
- route : admin, GET seul, aucune mutation, aucune dépendance LLM ajoutée ;
- UI : lecture seule, `PROPOSED` affiché, aucun `POST`/`.post(` ;
- réponse sans PII (scan `@edukora.net`, `+225 …`) ;
- **SQL production** : `DATABASE_URL` absente de l'environnement d'exécution →
  `PRODUCTION_SQL_NOT_DIRECTLY_EXECUTED` ; substituts = health 200 + CI.

## 20. Tests (§20)

`tests/p23-growth-action-engine.test.ts` (753 lignes) — **34 tests, 34 verts** :

| Bloc | Tests |
|---|---|
| §5 mapping opportunity → reco → plan | 5 |
| §6 actionnabilité (unit + intégration) | 6 |
| §7-§8 priorité/horizons (matrice 12 cas + buckets) | 4 |
| §10 dédoublonnage & déterminisme | 2 |
| §12-§13 plan de mesure | 5 |
| §14 evidence + scan module | 3 |
| §19-§20 security | 5 |
| §18 performance (0 requête, bornes 51-53) | 2 |
| §15 idempotence + non-régression contrat | 2 |

**Suite complète : 873/873 tests, 53 suites, 0 échec.**

## 21. Validations (§21)

| Contrôle | Résultat |
|---|---|
| `npm test -- --runInBand` | **873/873 — 53 suites** (839 + 34) |
| `npx tsc --noEmit` | **0 erreur** |
| `npm run lint` | **0 erreur / 232 warnings** (= baseline inchangée) |
| `npm run build` | **exit 0** |
| `git diff --check` | **exit 0** (aucune whitespace) |
| `GET https://edukora.net/api/health` | **200** `{"ok":true,"service":"edukora-api","warnings":[]}` |

## 22. Verdict, git & message de commit (§22)

**Verdict : PASS WITH OBSERVATIONS — 0 BLOCKER, 3 OBSERVATIONS.**

Observations (non bloquantes) :
1. Le planning repose sur des seuils **WORKING** recalibrables (audit P2.2 §8
   inchangé) — les cibles des success metrics suivront ce recalibrage.
2. `experiment_ready` est un drapeau de faisabilité (baseline existante), pas
   un cadre d'expérimentation : A/B non implémenté (conforme au cahier).
3. Un même type d'opportunité ne génère qu'un plan par période/segment
   (déterminisme par construction) : les doublons de signaux ne créent pas de
   second plan.

**État git** (aucun commit effectué, conformément au cahier) :

```
HEAD   = e04bfbe feat(growth): add deterministic growth ai foundation
origin = bef324b (ahead = 2)
9 fichiers modifiés (+886 / −26 vs HEAD) + 8 nouveaux non suivis
  dont src/lib/growth/decision/action-plans.ts,
       tests/p23-growth-action-engine.test.ts,
       P23_GROWTH_ACTION_ENGINE_FINAL.md
```

**Message de commit préparé — NON EXÉCUTÉ** (2 commits en attente : P2.2 puis
P2.3, à valider avant exécution) :

```
feat(growth): add deterministic action engine
```

*Aucun push, aucune PR, aucun déploiement.*
