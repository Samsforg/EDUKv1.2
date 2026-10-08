# P2.2 — Growth Intelligence & Attribution — Rapport final

**Phase** : P2.2 — GROWTH INTELLIGENCE & ATTRIBUTION
**Dépôt** : `stitch_edukora_ai_learning_platform/edukora-app` (branche `master`)
**Date** : 2026-10-08
**Rapport** : `P22_GROWTH_INTELLIGENCE_ATTRIBUTION_FINAL.md` (25 sections)
**Tests livrés** : `tests/p22-growth-intelligence-attribution.test.ts` (56 tests)

---

## 1. Verdict

**PASS WITH OBSERVATIONS** — 0 BLOCKER, 6 OBSERVATIONS.

Toutes les exigences livrables du cahier sont satisfaites et vérifiées :

| Exigence | État | Preuve |
|---|---|---|
| Couches attribution (UTM, clic, parrainage, inconnu) | ✅ | `attribution.ts`, `channels.ts`, `referrals.ts` + requêtes SQL |
| Channel performance (signups, activation, conversion, revenu) | ✅ | `buildChannelPerformance(s)` + test SQL réel |
| Referral performance (filleuls agrégés par code) | ✅ | `buildReferralPerformance(s)` + test SQL réel |
| Attribution coverage + unknown source | ✅ | `computeCoverage`, `sources.unknown_rate` |
| Nouveaux signaux (9) / opportunités (3) / actions (2) | ✅ | `attribution-rules.ts`, `types.ts` |
| Recalibration des seuils **documentée, zéro valeur modifiée** | ✅ | `THRESHOLD_AUDIT` (11 entrées, `changed_in_p22: false`) |
| Déterministe, read-only, 0 FCFA, sans LLM/n8n/WhatsApp/email | ✅ | scan sécurité (§20) |
| Pas de benchmark/qualitatif inventé | ✅ | scan §9 (0 match) |
| Régression P2.1 préservée | ✅ | 84/84 P2.1 + contrat insights/health inchangés |
| Rapport 25 sections + tests + message commit préparé (non exécuté) | ✅ | ce document, §24 |

**BLOCKER** : aucun.
**OBSERVATIONS** : listées en §25 (non bloquantes, toutes documentées dans le code ou ce rapport).

---

## 2. Git

| Élément | Valeur |
|---|---|
| HEAD avant phase | `e04bfbe feat(growth): add deterministic growth ai foundation` |
| `origin/master` | `bef324b` |
| Avance locale | **2 commits** (P2.0 + P2.1), aucun push effectué |
| État de l'arbre (début P2.2) | propre (`git status` vide) |
| Fichiers changés (P2.2) | **9 modifiés** (+709 / −26), **5 nouveaux** |
| Push / deploy / PR | **aucun** (§23 : message de commit seulement préparé) |

Fichiers modifiés :
`src/app/api/admin/growth/insights/route.ts` (commentaire de contrat),
`src/app/espace-admin/growth/GrowthInsightsPanel.tsx` (+3 cartes),
`src/lib/growth/decision/{data,index,recommend,rules,thresholds,types}.ts`,
`tests/analytics-contract.test.ts` (whitelist gclid/fbclid élargie — voir §20).

Fichiers créés :
`src/lib/growth/decision/{attribution,attribution-rules,channels,referrals}.ts`,
`tests/p22-growth-intelligence-attribution.test.ts`.

---

## 3. Scope & architecture

Ajout **strictement additif** à la Decision Layer P2.1 :

```
analytics_events.props (signup_completed)   users.referred_by + referral_code
        │                                              │
        ▼ (2 requêtes SQL read-only, test-exclus)      │
  loadChannelRows ──► buildChannelPerformance(s)        │
  loadReferralRows ─► buildReferralPerformance(s)       │
        │                                              │
        └────► computeCoverage / sources ────► GrowthIntelligenceData
                                                     │
                       evaluateAttributionRules ◄────┘  (purs, fixtures)
                                                     │
                       runDecisionLayer (fusion P2.1 + P2.2) → bundle
```

- **Aucune** nouvelle colonne SQL, **aucune** table, **aucune** migration (§3 du cahier).
- Lecture uniquement depuis `analytics_events` (forme courte P1.0) et `users`.
- Champs optionnels : `GrowthData.intelligence?` — les fixtures P2.1 sans ce champ
  continuent de fonctionner (2 contrats intacts, §21).

---

## 4. Attribution source — réutilisation P1.0

Le cahier imposait de **ne pas réécrire** l'existant. État constaté (audit §1) :

- `src/lib/attribution.ts` (P1.0) : first-touch déjà fonctionnel —
  `ATTRIBUTION_KEYS` (7 clés : `utm_source/medium/campaign/content/term`,
  `gclid`, `fbclid`), `MAX_VALUE_LEN = 120`, capture sessionStorage côté
  client ; `ref` volontairement exclu (parrainage).
- `src/lib/utm-report.ts` (P1.2) : requête UTM canonique par user (MIN()).
- **Seul `signup_completed` porte les props** (appel `signupAttributionProps()`
  dans `src/app/inscription-1-2-edukora/page.tsx:198`) ; `page_view` n'en porte
  aucun → les visiteurs par canal ne sont pas attribuables (OBS-1, §25).

La couche P2.2 **relit** ces mêmes props côté serveur (purement) : aucune
duplication de capture, aucune écriture.

---

## 5. First-touch extraction & normalization (§3)

`src/lib/growth/decision/attribution.ts` — module pur :

- `parseAttributionProps(raw)` : JSON robuste (absent/illisible/tableau/non-string
  → `EMPTY_ATTRIBUTION`, **jamais d'exception**), forme courte P1.0 **+** alias
  longs `utm_*` tolérés, `ref`/`referred_by` → `ref`, first-touch = première
  valeur de la ligne (jamais écrasée).
- `normalizeAttrValue(v)` : trim → casse réduite → troncature
  `MAX_ATTRIBUTION_VALUE_LEN = 120` (aligné P1.0) ; non-string/vide → `null`.
- **7 clés blanchies uniquement** — rien d'autre n'est lu (PII : §20).

Tests : 6 (forme courte, alias longs, gclid/fbclid/ref, valeurs invalides,
troncature, first-touch).

## 6. Source classification (§4)

`classifySourceType` — priorité stricte : `utm` → `paid_click` (gclid/fbclid)
→ `referral` (ref) → `unknown`.
`deriveChannel` — normalisé : nom du canal (`facebook`, `google`, …),
`paid_click`, `referral`, `unknown`.

**`direct` et `organic` ne sont pas distinguables** sans signal first-party
(`page_view` sans props) : ils restent `unknown`, **sans supposition** (OBS-2, §25).

## 7. Channel performance (§5)

- SQL (`loadChannelRows`) : CTE `per_user` = MIN(`source`/`gclid`/`fbclid`) par
  user sur `signup_completed`, CASE de canal (priorité §4 — mêmes règles que
  le module pur), JOIN `users` pour `referred_by`, agrégats
  activation (`event='activated'`), abonnements (`status='active'`), revenu
  (`SUM(price_cents)`), **comptes de test exclus des deux côtés**,
  `ORDER BY signups DESC, channel`.
- `buildChannelPerformance` : `activationRate`, `conversionRate`,
  `revenue`, `priority_score` ; **rates null-safe** (dénominateur 0 → `null`,
  jamais 0 fabriqué) ; `signupRate = null` (OBS-1) ; statut
  `VALID` / `INSUFFICIENT_DATA` selon `MIN_SAMPLE.segment = 30`.

Tests : 5 (agrégation/tri, null-safe, zéro dénominateur, 0 réel ≠ null,
plafond d'échantillon).

## 8. Referral performance (§6)

- SQL (`loadReferralRows`) : `users u JOIN users r ON r.id = u.referred_by`,
  filleuls **créés dans la période**, groupés par `r.referral_code`
  (**code seulement — aucune PII**), mêmes agrégats et exclusions de test.
- `buildReferralPerformance` : mêmes conventions null-safe que les canaux,
  tri `signups` décroissant (tie-break alphabétique).

Tests : 4 (agrégation, zéro dénominateur, sous-échantillon, tri).

**Bug corrigé en cours de route** : l'alias de sous-requête `u` de `notTest`
masquait l'alias externe `u` de cette requête (`u.id = u.id` → toute la table
filtrée dès qu'un compte de test existe → referrals toujours vides). Fix :
alias interne `tu` (`data.ts:56-59`), conforme à la doc de `testUsersWhere`.
Détecté par le test SQL réel (§21), reproduit et vérifié (query brute = 1 ligne
avant fix, 0 après → requête corrigée).

## 9. Attribution coverage (§11)

`computeCoverage(attributed, unattributed)` :

- `basis: "signups_identified"` — **couverture = inscrits identifiés
  attribués / inscrits identifiés** (choix justifié : les sessions/visiteurs
  ne sont pas attribuables, OBS-1), jamais des sessions (OBS-6).
- Dénominateur 0 → `coverageRate: null` + `INSUFFICIENT_DATA` (**jamais 0**).
- Sous `MIN_SAMPLE.segment` → `INSUFFICIENT_DATA` même avec un taux calculable.
- `sources.unknown_rate` : inconnus / total, `null` si total 0.

Tests : 5 (couverture totale, partielle, zéro, dénominateur nul, sous-échantillon).

## 10. Taxonomy & source types (§12)

`AttributionSourceType = utm | paid_click | referral | unknown` ;
`channelToSourceType` (SQL) aligné sur `classifySourceType` (pur).
`top_source` = meilleur canal **non-`unknown`** (sinon `null`, pas de faux top).
Le canal `unknown` reste visible en ligne dans les performances (transparence),
masqué du `top_source`.

## 11. Growth signals ajoutés (§13)

9 nouveaux `SignalType` dans `attribution-rules.ts` :

| Signal | Source | Statut |
|---|---|---|
| `channel_signup_strength` | top canal ≥ MIN_SAMPLE | VALID / INSUFFICIENT |
| `channel_activation_strength` | vs `THRESHOLDS.activation_rate` (0.3) | idem |
| `channel_monetization_strength` | abonnements/revenu canal | idem |
| `channel_insufficient_data` | sous-échantillon par canal | INSUFFICIENT_DATA |
| `referral_signup_strength` | filleuls agrégés | idem |
| `referral_activation_strength` | vs 0.3 | idem |
| `referral_monetization_strength` | abonnements filleuls | idem |
| `attribution_coverage` | vs `ATTRIBUTION_LIMITS.coverage_full = 1` | VALID |
| `unknown_source_rate` | vs `ATTRIBUTION_LIMITS.unknown_min = 0` | VALID |

Exports partagés : `makeSignal`, `makeOpportunity`, `fmtRate` (`rules.ts`).

## 12. Opportunités ajoutées (§13)

3 nouveaux `OpportunityType` :

- `CHANNEL_ACTIVATION_GAP` — **une seule**, sur le top canal VALID sous 0.3
  (pas d'une par canal : bruit limité, décision unique).
- `REFERRAL_ACTIVATION_GAP` — agrégée période (seuil 0.3).
- `ATTRIBUTION_GAP` — couverture < 1.0 avec échantillon suffisant ;
  **sans plafond de couverture** (c'est l'objet même de l'opportunité).

Sous `INSUFFICIENT_SIGNAL_LIMIT = 3` → aucun P2.2 en opportunité, signaux
seulement (statut/info). Sans `intelligence` ou `available: false` → **zéro**
règle P2.2 (compatibilité P2.1 stricte).

2 nouvelles `GrowthActionType` : `IMPROVE_ATTRIBUTION`, `IMPROVE_REFERRAL_LOOP`
(+ `IMPROVE_ONBOARDING` réutilisé pour le canal).

## 13. Data-quality confidence cap (§14)

`confidence = min(computeConfidence(sample), round(coverage × 100))` appliqué
**aux opportunités `CHANNEL_*` uniquement** (les canaux dépendent des props UTM ;
`REFERRAL_*` dépend de `referred_by`, `ATTRIBUTION_GAP` est sa propre mesure).
Effet vérifié : échantillon 100 avec couverture 0.4 → `confidence` 100 → **40**,
`priority_score` 20 → `LOW` (< 60 garantie).

## 14. Threshold audit (§8) — zéro valeur modifiée

`THRESHOLD_AUDIT` : 11 entrées, chacune avec `classification`
(`CONTRACTUAL` / `WORKING` / `DATA-CALIBRATED` / `INSUFFICIENT_DATA`),
`reason`, `minimum_sample`, `data_available`, `confidence` et
**`changed_in_p22: false`** (test : tous à `false`).

Valeurs P2.1 strictement inchangées (test) : `activation_rate.min = 0.3`,
`signup_rate = 0.1/0.3`, `checkout_dropoff.max = 0.5`,
`return_visit_rate.min = 0.2`, `MIN_SAMPLE = 30/10/30`.
`ATTRIBUTION_LIMITS` : `coverage_full = 1`, `unknown_min = 0` — **bornes
mathématiques**, pas de benchmark (§15).

`DATA-CALIBRATED` : classe présente mais **vide de décisions** — l'historique
(< 30 jours) ne permet aucune recalibration (OBS-3, §25).

## 15. No invented benchmark (§9)

`ATTRIBUTION_LIMITS` ne contient que des bornes 0/1 (mathématiques).
Scan automatique du bundle généré (`excellent|bon|mauvais|faible|moyenne|
ivoirien|benchmark edtech|meilleur canal|au-dessus de la moyenne`) → **0 match**.
Les statuts utilisés sont `above_working_threshold` / `insufficient_data` /
etc. — jamais de qualitatif hors seuils documentés.

## 16. Recommendations contract (§15)

Mapping title/raison → contrat P2.1 :
`title → what`, `reason → why`, **+ champs ajoutés**
`evidence` (preuve chiffrée de l'opportunité) et `urgency` (0-100) sur
`GrowthRecommendation`, repliés depuis l'opportunité dans `buildRecommendation`.
Toutes les actions restent `mode: "PROPOSED"` (jamais exécutées).
Jeu playbook : `IMPROVE_ATTRIBUTION` (ATTRIBUTION_GAP),
`IMPROVE_REFERRAL_LOOP` (REFERRAL_ACTIVATION_GAP),
`IMPROVE_ONBOARDING` (CHANNEL_ACTIVATION_GAP).
`IMPROVE_ACQUISITION_SOURCE` **non activé** : non calculable sans visiteurs par
canal (OBS-5, §25).

## 17. Rule engine integration (§16-§17)

`runDecisionLayer` :

1. règles P2.1 (inchangées) ;
2. `evaluateAttributionRules` si `data.intelligence` ;
3. fusion signaux/opportunités (P2.1 préservés, tests `arrayContaining`) ;
4. `assembleIntelligenceSections` : sections `attribution` / `channels` /
   `referrals` sur le bundle ; sans intelligence → statut `UNAVAILABLE` +
   tableaux vides (jamais de faux chiffres) ;
5. `meta` inchangé : `engine: "deterministic"`, `external_calls: false`,
   `test_users_excluded: true`, `actions_executed: false`.

**Contrats intacts** : les 6 insights restent exactement
`signup_rate, activation_rate, checkout_dropoff, purchase_rate,
return_visit_rate, retention_d7` ; health = 5 stages
`acquisition, activation, conversion, retention, revenue`.
Idempotence : deux exécutions → output strictement identique (`toStrictEqual`).

## 18. API / UI

- Route `GET /api/admin/growth/insights` : **inchangée fonctionnellement**
  (commentaire de contrat mis à jour), `requireAdmin` + `guardApi` + GET seul.
- `GrowthInsightsPanel.tsx` : +3 cartes explicites avant la grille Top Signals —
  **Attribution** (couverture, top source, inconnus), **Channels** (tableau
  signups/activation/conversion/revenu + statut), **Referrals** (filleuls,
  signups, activation, revenu) ; lecture seule `fetch("/api/admin/growth/insights")`,
  badge `PROPOSED` affiché ; aucune action exposée. Fix typo `payed_click` → `paid_click`.

## 19. Performance (§18) — 51 → 53 requêtes

Comptage mesuré par `jest.spyOn` sur `db.query`/`db.queryOne` (7 jours, warm-up
inclus hors mesure) :

| | Requêtes |
|---|---|
| P2.1 (14 funnel jour-à-jour ×2 fenêtres + 8 segments + 4 revenue) | **51** |
| **P2.2** (+ `loadChannelRows`, `loadReferralRows`) | **+2** |
| Total P2.2 | **53** |

Test : `51 ≤ count ≤ 53` + présence des deux motifs SQL caractéristiques
(`WITH per_user AS`, `r.referral_code AS referral`). **2 requêtes seulement**,
agrégées SQL côté serveur (pas de N+1, pas de balayage par ligne).

## 20. Security (§19-§20)

Tests automatisés (6) :

- Route : `requireAdmin` + `guardApi` + GET, aucune écriture SQL, aucun
  appel LLM/n8n/générateur.
- `src/app/api/admin/growth` : **une seule route**, lecture seule.
- Nouveaux modules (`attribution.ts`, `attribution-rules.ts`, `channels.ts`,
  `referrals.ts`) : `fetch`/`axios`/LLM/`n8n`/`whatsapp`/`mailer`/
  `process.env`/`DATABASE_URL`/`Bearer`/`INSERT|UPDATE|DELETE`/`eval` → **0 match**.
- Panneau : lecture seule, `PROPOSED`, aucune action POST.
- `package.json` : aucune dépendance IA ajoutée.
- PII : aucun email/téléphone dans le corpus des textes du bundle.
- Suite P2.1 (safety scan des `decision/*.ts` en écriture/secret) : toujours verte.

**Whitelist élargie** (`tests/analytics-contract.test.ts`) : la règle
« gclid/fbclid uniquement dans les points de lecture autorisés » ajoute les
2 nouveaux points de lecture serveur `growth/decision/attribution.ts` et
`growth/decision/data.ts` (read-only, sans écriture sessionStorage) — même
évolution que P1.2 avec `utm-report.ts`.

## 21. Tests

`tests/p22-growth-intelligence-attribution.test.ts` — **56 tests, 11 blocs** :

| Bloc | Tests |
|---|---|
| §3 extraction/normalisation | 6 |
| §4 classification first-touch | 3 |
| §5 channel performance | 5 |
| §6 referral performance | 4 |
| §11 coverage | 5 |
| §8 audit seuils | 4 |
| §13-§14 decision engine étendu | 17 |
| §9 no-fake-benchmark | 1 |
| §19-§20 security | 6 |
| §18 comptage de requêtes | 1 |
| Couche data SQL réelle (fenêtre isolée 2099) | 2 |

Couche SQL réelle (SQLite local, fixtures créées puis nettoyées) : 4 inscrits
réels (utm / clic / parrainage / inconnu) + 1 compte de test à attribuer —
vérifie absence du canal `google` (test exclu), `signups` par canal,
couverture 3/4 = 0.75 (`INSUFFICIENT_DATA` sous plancher), `unknown_rate = 0.25`,
`top_source`, referrals agrégés (1 filleul, code seulement), abonnement actif
du filleul → `subscriptions`/`revenue` reflétés, **zéro PII** dans l'intelligence.
Isolation : ancre **2099-01-05** (aucune autre suite n'utilise 2099).

**Suite complète** : **839/839 tests, 52 suites** (783 P2.1 + 56 P2.2) —
régression P2.1 intégrale.

## 22. Validations (§21-§22)

| Contrôle | Résultat |
|---|---|
| `npx tsc --noEmit` | **0 erreur** |
| `npm run lint` | **0 erreur, 232 warnings** (= baseline exacte P2.1) |
| `npm run build` | **exit 0** |
| `npm test -- --runInBand` | **839/839, 52 suites** |
| `git diff --check` | **exit 0** (uniquement warnings CRLF de working copy) |
| `https://edukora.net/api/health` | **200** `{"ok":true,"service":"edukora-api","warnings":[]}` |

## 23. SQL production

**`PRODUCTION_SQL_NOT_DIRECTLY_EXECUTED`** — `DATABASE_URL` absente de
l'environnement local ; aucune tentative de connexion directe, aucun secret
demandé ni affiché (conforme au cahier).

Substituts exécutés :
1. **requêtes SQL réelles** exécutées et assertées sur SQLite local
   (mêmes SQL, dialecte branché `IS_PG` identique pour PostgreSQL) ;
2. **health production 200** avec `warnings: []` (le chemin API complet
   `requireAdmin → computeGrowthData → runDecisionLayer → JSON` est celui
   testé en local et déployé inchangé) ;
3. CI/tests CI green (839/839).

Les 2 nouvelles requêtes n'utilisent que des colonnes existantes vérifiées
(`analytics_events.props`, `users.referred_by`, `users.referral_code`,
`subscriptions.price_cents/status`) et un dialecte déjà éprouvé en prod
(`json_extract` / `props::json->>` de P1.2).

## 24. Message de commit (§23 — préparé, NON exécuté)

Aucun commit, aucun push, aucun deploy, aucun PR pendant cette phase.
Message prêt pour l'étape suivante (validation utilisateur requise) :

```
feat(growth): add attribution intelligence
```

Contenu à y rattacher : les 14 fichiers de §2 + ce rapport
(`P22_GROWTH_INTELLIGENCE_ATTRIBUTION_FINAL.md`).

## 25. Observations & recommandation

**0 BLOCKER. 6 OBSERVATIONS** (classées, non bloquantes) :

| # | Observation | Impact / mitigation |
|---|---|---|
| OBS-1 | **Visiteurs par canal non attribuables** : `page_view` ne porte aucun props d'attribution | `signupRate = null`, `visitors = null` partout côté canal — **jamais 0** ; coverage basée sur les inscrits (documenté §9/§11). Mitigation future : props d'acquisition sur `page_view`. |
| OBS-2 | **`direct` / `organic` indistingables** sans signal first-party | classés `unknown` sans supposition ; `unknown_rate` expose la limite |
| OBS-3 | **Aucune valeur recalibrée** : classe `DATA-CALIBRATED` vide | historique < 30 jours insuffisant ; audit complet figé (`changed_in_p22: false`), recalibration = future phase avec données |
| OBS-4 | **SQL production non exécuté directement** (`DATABASE_URL` absente) | `PRODUCTION_SQL_NOT_DIRECTLY_EXECUTED` ; substituts : SQL réels testés en SQLite + health 200 + CI (§23) |
| OBS-5 | **`IMPROVE_ACQUISITION_SOURCE` non activé** | non calculable sans visiteurs par canal (OBS-1) ; playbook prêt, activation dès que les props `page_view` existeront |
| OBS-6 | **Couverture sur inscrits identifiés**, pas sur sessions | choix explicite `basis: "signups_identified"` ; seule base mesurable sans props de session |

**Recommandation P2.3** : (1) brancher les props d'acquisition sur
`page_view` pour débloquer `signupRate`/visiteurs par canal et activer
`IMPROVE_ACQUISITION_SOURCE` ; (2) première recalibration `DATA-CALIBRATED`
dès ≥ 30 jours d'historique ; (3) exécution du SQL de vérification en
production dès que `DATABASE_URL` est disponible en environnement contrôlé.
