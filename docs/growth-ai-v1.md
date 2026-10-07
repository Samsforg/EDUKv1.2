# Edukora — Growth AI v1

> **Phase 3h — document d'architecture.**
> Aucune modification de production. n8n **n'est pas installé**.
> Aucune dépendance applicative ajoutée. Aucun commit, push ni déploiement.
>
> Budget cible : **0 FCFA**.

---

## 0. Résumé exécutif

**La mauvaise nouvelle d'abord : l'essentiel de « Growth AI v1 » existe déjà dans le code.**

Edukora possède déjà un module `src/lib/growth/`, quatre routes `/api/growth/*`,
un tableau de bord admin, un module IA branché sur le gateway multi-providers,
15 tâches cron configurées, un connecteur WhatsApp et un client e-mail Brevo.

```
src/lib/growth/
├── ai/
│   ├── types.ts              GrowthStrategy · Content · Metrics · Recommendation
│   ├── provider.ts           getAIProvider()
│   └── gateway-provider.ts   → generateWithGateway()  (7 providers)
├── marketing/
│   ├── content.ts            generateContent()
│   ├── strategy.ts           generateStrategy() · generateRecommendation()
│   ├── scoring.ts            calculateContentScore()
│   └── visual.ts             generateVisualPrompt()
└── data/store.ts             4 tables (growth_strategies / contents / metrics / recommendations)
```

**Ce qui manque n'est pas l'IA : c'est l'orchestration, les triggers, la boucle de
validation humaine et la référence de KPI.** C'est exactement ce que cette phase
conçoit — et n8n, auto-hébergé, permet de l'ajouter **sans toucher au code Edukora**.

> **Recommandation : ne pas écrire de nouveau code de growth dans Edukora.**
> n8n orchestre, lit la base en lecture seule, génère via un Groq gratuit,
> livre par WhatsApp et e-mail existants. **Zéro ligne ajoutée dans l'application.**

### Trois conclusions

1. **Aucune nouvelle collecte n'est nécessaire.** La Phase 3f vient d'instrumenter
   exactement le funnel dont Growth AI a besoin.
2. **Cinq écarts bloquants** ont été relevés dans le module existant (§2) — dont un
   qui **casse la boucle de validation humaine** demandée par cette phase.
3. **Le coût est réellement nul** si l'on auto-hberge n8n et que l'on réutilise les
   quotas gratuits existants (§7).

---

## 1. Audit — les données déjà disponibles

### 1.1 Ce qu'Edukora capte déjà

| Source | Nature | Coût | Disponible |
|---|---|---|---|
| **GA4** | `gtag.js`, bootstrap inline avec nonce CSP, gate par consentement | 0 FCFA | oui |
| **Clarity** | stub `clarity.q`, heatmaps, session recordings | 0 FCFA | oui |
| **`analytics_events`** | table first-party, tous les événements, `user_id` / `session_id` / `props` / `utm` | 0 FCFA | **cœur du système** |
| **E-commerce GA4** | `begin_checkout`, `add_payment_info`, `purchase` | 0 FCFA | oui |
| **Users** | `users` (rôle, date d'inscription, classe, notes) | 0 FCFA | oui |
| **Subscriptions** | `subscriptions` + `subscription_plans`, statut, `price_cents` | 0 FCFA | oui |
| **Engagement** | `lesson_reads`, `quiz_attempts`, `exam_attempts`, `tutor_messages` | 0 FCFA | oui |
| **Catalogue** | 16 matières, 725 chapitres, 1 361 leçons, 2 212 questions, `official_ref` | 0 FCFA | oui |
| **Annales** | sujets, séries, corrections | 0 FCFA | oui |
| **Parrainage** | codes, XP, appariements | 0 FCFA | oui |
| **Promos / paniers** | `promo_codes`, `idempotency_keys`, paniers abandonnés | 0 FCFA | oui |
| **IA** | `logAI` (provider, modèle, latence, statut, index/total) | 0 FCFA (quotas gratuits) | oui |
| **Stats** | streak, `spaced-repetition`, `progression-gaps` | 0 FCFA | oui |

### 1.2 Ce qui est déjà construit pour le growth

| Composant | Emplacement | État |
|---|---|---|
| **4 routes API growth** | `/api/growth/{metrics,strategy,content,recommendation}` | fonctionnelles |
| **Tableau de bord admin** | `src/app/espace-admin/growth/GrowthDashboard.tsx` | fonctionnel |
| **Génération de contenu** | `generateContent()` — Facebook, TikTok, WhatsApp | fonctionnel |
| **Scoring de contenu** | `calculateContentScore()` | fonctionnel |
| **Prompt visuel** | `generateVisualPrompt()` | fonctionnel |
| **Stratégie & reco** | `generateStrategy()`, `generateRecommendation()` | fonctionnels |
| **4 tables de stockage** | `growth_strategies`, `growth_contents`, `growth_metrics`, `growth_recommendations` | en place |
| **Rapport quotidien** | `/api/cron/report` — 7h45, **WhatsApp + e-mail** | **déjà planifié** |
| **Relance paniers** | `/api/cron/abandoned` — 10h, 14h, 18h | déjà planifié |
| **Réactivation** | `/api/cron/reactivation` — 6h | déjà planifié |
| **Connecteur WhatsApp** | `src/lib/whatsapp.ts` — `sendWhatsappText()` | fonctionnel |
| **E-mail** | `src/lib/mailer.ts` — Brevo SMTP + API | fonctionnel |
| **Infra cron** | `vercel.json` — **15 tâches** + `CRON_SECRET` | en place |

### 1.3 Conclusion de l'audit

> **Il ne manque aucune donnée.** Growth AI n'a pas besoin de nouvelles collectes.
> Le travail restant est de l'**orchestration** et de la **discipline opérationnelle**.

---

## 2. Écarts constatés dans le module existant

> **Constats d'audit — aucune modification apportée.** Ces écarts sont des
> prérequis (T0) : les corriger est plus rentable que d'écrire de nouveaux agents.

### E1 — `pageViews` vaut toujours 0 · **bloquant pour l'Analytics Agent**

| | |
|---|---|
| Émis | `"pageview"` — `src/components/EdukoraAnalytics.tsx:57` |
| Lu | `funnel["page_view"]` — `src/app/api/growth/metrics/route.ts:58,62` |
| Effet | **toujours 0** — l'agent ignorant le volume de trafic ne peut pas détecter une baisse |

### E2 — La validation humaine des recommandations est cassée · **bloquant §5**

`growth_recommendations` est créée **sans colonne `status`** :

```
id · date · type · title · description · priority · estimated_impact · created_at
```

Et `updateRecommendationStatus(id, status)` exécute :

```sql
UPDATE growth_recommendations SET priority = $1 WHERE id = $2
```

→ Valider une recommandation **écrase sa priorité** avec le texte `"validated"`.
La boucle `proposition → validation humaine → publication` demandée par la phase 3h
**ne fonctionne donc pas**.

### E3 — SQL PostgreSQL-only qui échoue silencieusement en dev

7 occurrences de `JSONB`, `ON CONFLICT`, `created_at::date` dans le module growth.
Or le projet est **SQLite en dev**. Les `CREATE TABLE` sont enveloppés dans
`.catch(() => {})` : l'échec est **muet**, et `growth_metrics` reste vide en local.

### E4 — `/api/growth/metrics` n'est appelé par aucun cron

`vercel.json` ne contient aucune entrée `growth`. La table `growth_metrics` n'est donc
alimentée que lorsqu'un admin clique manuellement → **les rapports automatisés
n'auraient aucune donnée**.

### E5 — Taxonomie d'événements dupliquée et périmée

`src/lib/growth/ai/types.ts` définit son propre `AnalyticsEventType` — distinct de
`src/lib/analytics.ts`. Il contient `page_view` et `course_opened`, et **ignore les
6 événements ajoutés en Phase 3f** (`landing_viewed`, `cta_clicked`, `subject_selected`,
`grade_selected`, `return_visit`, `referral_clicked`).

### E6 — Les routes `/api/growth/*` exigent une session admin

Toutes vérifient `getCurrentUser()` + `role === "admin"`. **n8n ne peut pas les
appeler directement** sans session réelle. C'est la contrainte d'architecture
principale de cette phase → §3.3.

---

## 3. Architecture

### 3.1 Cible

```
                          ÉDUKORA (inchangé)
   ┌──────────┬───────────┬──────────┬──────────────┐
   │   GA4    │  Clarity  │    DB    │  analytics_  │
   │          │           │          │   events     │
   └────┬─────┴─────┬─────┴────┬─────┴──────┬───────┘
        │           │          │            │
        │           │          │            │  lecture seule (SQL)
        └───────────┴────┬─────┴────────────┘
                         ▼
                  ┌─────────────┐
                  │     n8n     │  auto-hébergé  ·  0 FCFA
                  │  (orchestr.)│  15 min → quotidienne
                  └──────┬──────┘
                         │  Groq (quota gratuit) · 0 FCFA
                         ▼
                  ┌─────────────┐
                  │  GROWTH AI  │  6 agents
                  └──────┬──────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
    ┌───────┐      ┌──────────┐     ┌─────────┐
    │Analyse│      │ Contenu  │     │ Actions │
    └───┬───┘      └────┬─────┘     └────┬────┘
        │               │               │
        └───────────────┼───────────────┘
                        ▼
              ╔══════════════════╗
              ║ VALIDATION       ║  ← **jamais de publication auto**
              ║ HUMAINE          ║
              ╚═════════╤════════╝
                        ▼
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
    ┌───────┐      ┌─────────┐    ┌──────────┐
    │Rapport│      │  Posts  │    │ WhatsApp │
    │quotid.│      │  (file) │    │  + mail  │
    └───────┘      └─────────┘    └──────────┘
```

### 3.2 Répartition des responsabilités

| Couche | Déteneur | Justification |
|---|---|---|
| **Collecte** | Edukora | déjà en place, inchangé |
| **Orchestration** | **n8n** | évite d'ajouter du code applicatif |
| **Génération IA** | n8n + Groq gratuit | 0 FCFA, découplé |
| **Stockage** | Edukora (`growth_*`) | déjà en place |
| **Validation** | Humain, via `espace-admin/growth` | exigence §5 |
| **Publication** | Humain | aucun automatisme au démarrage |

### 3.3 Contournement de la contrainte E6

Les routes `/api/growth/*` exigent une session admin. Trois options :

| Option | Coût | Code Edukora | Verdict |
|---|---|---|---|
| **A — n8n lit la base en lecture seule** + Groq propre | 0 FCFA | **aucun** | ✅ **recommandée** |
| B — jeton de service machine-à-machine sur `/api/growth/*` | 0 FCFA | ~15 lignes | plus tard, si le dashboard doit piloter n8n |
| C — n8n rejoue une session admin | 0 FCFA | aucun | **déconseillé** (fragile, risque sécurité) |

**Option A retenue.** n8n obtient un accès **PostgreSQL en lecture seule** et une clé
Groq gratuite. Edukora n'est **pas modifié**. L'IA utilise le même modèle que
`llama-3.3-70b-versatile`, mais via la clé n8n — pas via le gateway applicatif.

> Conséquence assumée : la génération faite par n8n n'est pas automatiquement
> persistée dans `growth_*`. Si l'on veut l'historique dans l'admin, c'est l'option B
> qui le permet. **Décision à prendre au moment de la mise en œuvre.**

---

## 4. Les six agents

Chaque agent = **une source de données + un prompt + un contrat de sortie**.
Aucun agent ne publie. Tous produisent une **proposition**.

### 4.1 Analytics Agent — trafic et funnel

| | |
|---|---|
| **Lit** | `analytics_events`, `growth_metrics`, `users`, `subscriptions` |
| **Fréquence** | quotidien (W1) + hebdomadaire (W2) |
| **Détecte** | baisse de trafic, rupture de funnel, pic anormal, jour anomalous |

**Sortie attendue** — JSON strict :

```json
{
  "alerts": [
    { "severity": "critical|warn|info",
      "metric": "landing_viewed→signup_started",
      "delta_pct": -34,
      "diagnosis": "…", "recommended_action": "…" }
  ],
  "funnel": { "landing_viewed": 0, "signup_started": 0, "signup_completed": 0 },
  "summary": "…"
}
```

**Prérequis : corriger E1**, sinon l'agent est aveugle au volume.

### 4.2 Content Agent — contenu et création

| | |
|---|---|
| **Réutilise** | `generateContent()`, `calculateContentScore()`, `generateVisualPrompt()` — déjà écrits |
| **Plateformes** | Facebook · TikTok · WhatsApp (type `ContentPlatform` existant) |
| **Sujets** | posts, vidéos, articles, contenus pédagogiques, CTA |
| **Fréquence** | hebdomadaire (W3) |

**Uniquement les Annales, subjects, chapters, lessons** — aucune donnée personnelle
dans le contexte (§9).

> L'agent **propose**, l'admin **valide**. Aucun post automatique.

### 4.3 SEO Agent — opportunités

| | |
|---|---|
| **Lit** | catalogue (`subjects`, `chapters`, `lessons`, annales), `analytics_events` (trafic organique GA4), pages existantes |
| **Détecte** | chapitres sans trafic, annales manquantes par année, titres dupliqués, pages orphelines |

**Principe : aucune collecte ajoutée.** Les volumes viennent du catalogue existant et
du trafic organique déjà remonté par GA4.

**Privilégie les pages à fort volume d'examens** : BEPC ~606 583 candidats, BAC ~329 372.

### 4.4 Conversion Agent — abandons

| | |
|---|---|
| **Réutilise** | `getConversionStats()`, `findAbandonedCheckouts()`, `findExpiredTrials()`, `/api/cron/abandoned` |
| **Détecte** | palier d'abandon (`landing_viewed → signup → begin_checkout → add_payment_info → purchase`), panier froid, essai non converti |
| **Fréquence** | quotidien (W4) |

**Point d'attention majeur (Phase 3g)** : l'activation fuit **avant** le paiement
(7 comptes actifs sur 241 élèves). L'agent doit donc signaler aussi les fuites
**amont** — un panier vide n'est pas le premier problème.

### 4.5 Retention Agent — risque de perte

| | |
|---|---|
| **Lit** | `lesson_reads`, `tutor_messages`, `quiz_attempts`, `exam_attempts`, `streak`, `subscriptions`, `analytics_events` |
| **Détecte** | compte actif puis silencieux, streak rompu, essai qui expire, abonnement à échéance |

**C'est l'agent le plus utile et le moins déjà construit.** La Phase 3g a constaté que
**ni le churn ni la rétention ne sont mesurés** : cet agent définit ces deux KPI
(voir `docs/growth-metrics.md`).

**Grille de risque proposée :**

| Signal | Score |
|---|---|
| Actif J-7 puis inactif | +40 |
| Inscription sans aucune leçon | +35 |
| Streak rompu après ≥ 7 jours | +25 |
| Essai expirant dans 48 h sans engagement | +25 |
| Abonnement renouvelé sans usage | +20 |
| `quota_exceeded` sans conversion | +20 |

Seuil d'alerte : **≥ 70**.

### 4.6 Campaign Agent — campagnes

| | |
|---|---|
| **Réutilise** | `generateStrategy()` |
| **Lit** | performances des campagnes précédentes, `growth_recommendations` validées |
| **Fréquence** | hebdomadaire (W5) |

**Saisonnalité à intégrer** — le calendrier ivoirien est un levier majeur :

| Fenêtre | Occasion |
|---|---|
| **Mai** (26–29) | BEPC — 606 583 candidats |
| **Juin** (15–19) | BAC — 329 372 candidats |
| **Septembre–octobre** | rentrée scolaire, forte inscription |

### 4.7 Synthèse des agents

| Agent | Réutilise l'existant | Nouveau |
|---|---|---|
| Analytics | `analytics_events` | **prompts + détection** |
| Content | `generateContent`, scoring, visuel | **calendrier éditorial** |
| SEO | catalogue + GA4 | **détection de gaps** |
| Conversion | `getConversionStats`, paniers | **lecture de palier** |
| Retention | tables engagement | **définition churn / rétention** |
| Campaign | `generateStrategy` | **calendrier + UTM** |

---

## 5. Validation humaine

> **Exigence : aucune publication automatique au début.** Elle est **technique**, pas
> seulement organisationnelle : `Content.status` existe déjà (`draft → validated →
> archived`), mais le module n'expose qu'une **lecture/écriture admin**.

```
IA
 ↓
proposition        statut = draft
 ↓
validation humaine  espace-admin/growth
 ↓
publication         statut = validated → publication manuelle
```

### 5.1 Règles

| Règle | Détail |
|---|---|
| Rien ne part tout seul | e-mail et WhatsApp ne contiennent **que** des propositions |
| Rien sans identifiant | tout contenu porte un `id` et une date → traçable |
| Auditabilité | `created_at` + `status` + auteur de la validation |
| Réversibilité | `archived` toujours possible |
| Priorité explicite | `high` / `medium` / `low` par recommandation |

### 5.2 Prérequis bloquant

> **E2 doit être corrigé** : sans colonne `status` et sans écriture correcte,
> la validation humaine est **impossible** à enregistrer. C'est le premier chantier.

---

## 6. Automatisations retenues

| # | Automatisation | Statut | Agent |
|---|---|---|---|
| 1 | Rapport quotidien | **existe** (7h45, WhatsApp + mail) | Analytics |
| 2 | Rapport hebdomadaire | à créer (W2) | Analytics + Conversion |
| 3 | Détection de baisse de trafic | à créer (W1) | Analytics |
| 4 | Détection de hausse de contenu | à créer (W3) | SEO |
| 5 | Suggestion de publication | à créer (W3) | Content |
| 6 | Génération de calendrier éditorial | à créer (W3) | Content |
| 7 | Analyse de funnel | **existe** (`getConversionStats`) | Conversion |
| 8 | Alerte conversion | à créer (W4) | Conversion |
| 9 | Score de risque de rétention | à créer (W6) | Retention |
| 10 | Plan de campagne saisonnier | à créer (W5) | Campaign |
| 11 | Relance panier abandonné | **existe** (10h/14h/18h) | Conversion |
| 12 | Réactivation | **existe** (6h) | Retention |

> **4 des 12 existent déjà.** La valeur de n8n est d'orchestrer les 8 restantes
> ajouter l'IA — sans écrire dans Edukora.

**Workflows détaillés, triggers, actions et prompts : `docs/n8n-workflows-v1.md`.**

---

## 7. Coûts

### 7.1 Budget réel

| Poste | Choix | Coût |
|---|---|---|
| n8n | auto-hébergé, édition Community (Docker) | **0 FCFA** |
| IA | Groq — quota gratuit | **0 FCFA** |
| WhatsApp | connecteur existant, API déjà configurée | **0 FCFA** |
| E-mail | Brevo — palier gratuit | **0 FCFA** |
| GA4 | palier gratuit | **0 FCFA** |
| Clarity | **gratuit** | **0 FCFA** |
| Base | PostgreSQL existante, **lecture seule** | **0 FCFA** |
| GitHub | dépôt + Actions gratuit | **0 FCFA** |
| **Total** | | **0 FCFA** |

### 7.2 Ce qui ferait sortir du budget

Dépenser suppose d'ajouter : un n8n **hébergé** (~10 €/mois), une clé IA **payante**,
ou du volume de messages WhatsApp au-delà du palier gratuit. **Aucun n'est nécessaire
au démarrage.**

### 7.3 Coût IA — ordre de grandeur

Reprise de la Phase 3g : **≈ 2 FCFA par échange** sur Groq (pire cas multi-failover
≈ 5 FCFA). Un rapport de 6 agents, 2 fois par jour, à ~2 000 tokens entrée / 800 sortie
≈ **6 FCFA/mois**, couvert par le quota gratuit.

> **La génération de croissance n'est pas un poste de coût.**
> Le coût du growth, ce sont les **heures humaines de validation**.

---

## 8. Sécurité

| # | Mesure | Mise en œuvre |
|---|---|---|
| S1 | **Lecture seule sur la base** | utilisateur PostgreSQL n8n avec `SELECT` seul |
| S2 | **Clés dans n8n Credentials**, jamais dans un workflow ni un dépôt | vault chiffré |
| S3 | **Git ignoré** — aucune clé dans le dépôt | `.gitignore` vérifié |
| S4 | **Edukora non modifié** | surface d'attaque inchangée |
| S5 | **Groupe WhatsApp restreint** | `WHATSAPP_REPORT_GROUP` — un groupe admin, pas un canal public |
| S6 | **Prompt injection** | aucune donnée utilisateur dans les prompts ; §9 |
| S7 | **Boucle fermée** | n8n n'écrit **jamais** dans la base |
| S8 | **CRON_SECRET** | les routes cron Edukora restent protégées ; n8n ne les appelle pas |
| S9 | **Compte n8n** | HTTPS + 2FA, accès restreint aux personnes qui valident |
| S10 | **Rétention n8n** | purger l'historique des exécutions (contient des métriques agrégées) |

---

## 9. Données personnelles

### 9.1 Principe

> **Aucune donnée personnelle n'est envoyée à un fournisseur d'IA tiers.**
> Conforme à la règle établie en Phase 3f.

### 9.2 Ce qui est interdit dans un prompt

| Interdit | Exemple |
|---|---|
| Identité | nom, prénom, email, téléphone |
| Identifiants | `user_id`, `session_id`, identifiant de commande |
| Contenu libre | message d'un élève, texte de dissertation, nom d'établissement |
| Scolarité sensible | notes, classement, redoublement |
| Code de parrainage | transmitted en clair |

### 9.3 Ce qui est autorisé

| Autorisé | Pourquoi |
|---|---|
| **Agrégats** | « 42 inscriptions aujourd'hui » |
| **Taxonomie** | `subject`, `grade`, `event` |
| **Noms de matières, chapitres, leçons, annales** | contenu public |
| **Ratios** | « conversion 12 % » |

### 9.4 Application obligatoire du sanitizer

Le sanitizer de la Phase 3f (`sanitizeForThirdParty` dans `src/lib/analytics.ts`)
**doit être réutilisé** — conceptuellement — avant toute sortie vers un LLM.
En pratique, en option A, n8n ne reçoit **que des agrégats** : la donnée
personnelle n'arrive jamais au prompt.

### 9.5 Ce qui reste first-party

`analytics_events`, `users`, `subscriptions` et les scores restent dans la base
Edukora. Seuls des totaux et des ratios en sortent, vers un LLM, sans identifiant.

---

## 10. Limites

| # | Limite | Impact |
|---|---|---|
| L1 | **Données insuffisantes** — 241 élèves mais 7 comptes actifs, 3 usages IA | **Tout taux calculé sur n < 30 est du bruit** : les alertes doivent être inhibées sous ce seuil |
| L2 | `/api/growth/*` non appelable par n8n (E6) | contourner par lecture directe (option A) |
| L3 | `pageViews` toujours 0 (E1) | l'Analytics Agent est aveugle au trafic tant que ce n'est pas corrigé |
| L4 | Validation humaine cassée (E2) | **bloquant §5** |
| L5 | `growth_metrics` non alimenté (E4) | les rapports automatisés n'auraient rien à analyser |
| L6 | SQL PostgreSQL-only (E3) | rien ne se voit en développement SQLite |
| L7 | Taxonomie dupliquée (E5) | risque de divergence croissante |
| L8 | **Le SEO Agent n'a pas de Search Console** | « mots-clés » = heuristiques, **pas** de volumes réels |
| L9 | n8n auto-hébergé = **indisponibilité si la machine tombe** | contre : un plan Vercel payant serait le premier coût |
| L10 | Aucune publication automatique | **délai éditorial = temps humain** : la Growth AI propose, l'humain publie |
| L11 | L'IA peut halluciner une statistique | **règle : tout chiffre publié doit venir du SQL, jamais du LLM** |
| L12 | Les predictions LLM ne sont pas des prédictions | traiter les recommandations comme des **hypothèses** |
| L13 | Scores de risque non validés empiriquement | grille §4.5 à recalibrer |

---

## 11. Roadmap

### T0 — Prérequis bloquants (avant tout agent)

1. Corriger **E1** (`pageview`) — 1 ligne.
2. Corriger **E2** (colonne `status` + requête) — conditionne la validation humaine.
3. Corriger **E3** (SQL portable ou au minimum ne pas masquer l'échec).
4. Ajouter un cron pour `/api/growth/metrics` (**E4**).
5. Réconcilier **E5** (taxonomie unique).

### T1 — Socle n8n

6. Installer n8n auto-hébergé (**hors dépôt Edukora**).
7. Connecter PostgreSQL **en lecture seule** + Groq + WhatsApp.
8. Déployer W1/W2 (rapports) — vérifié contre le rapport cron existant.

### T2 — Agents

9. W3 Content · W4 Conversion · W6 Retention.
10. Calibrer la grille de risque sur **30 jours de données réelles**.

### T3 — Acquisition

11. W5 Campaign, aligné sur les fenêtres BEPC / BAC / rentrée.
12. W7 SEO, à partir du catalogue et du trafic organique.

### T4 — Industrialisation

13. Option B (jeton de service) si le pilotage depuis l'admin devient nécessaire.
14. Revue de sécurité trimestrielle des clés et des accès.

---

## 12. Recommandations

1. **Ne pas écrire de nouveau code de growth dans Edukora.** n8n orchestre.
2. **Corriger E1 et E2 d'abord.** Un analysis sur `pageViews = 0` et une validation
   humaine qui n'écrit pas le statut sont deux fondations cassées.
3. **Zéro collecte supplémentaire.** La Phase 3f suffit ; toute nouvelle collecte
   doit être justifiée.
4. **Inhiber les alertes sous 30 observations** — sinon le système devient du bruit
   dès la première semaine.
5. **Aucun chiffre publié ne provient d'un LLM.** Les LLM expliquent ; le SQL mesure.
6. **La validation humaine n'est pas optionnelle** au démarrage, même si c'est le
   poste le plus coûteux : c'est ce qui protège la réputation du produit et la
   qualité pédagogique.
7. **Commencer par l'Analytics Agent.** Il est le moins cher, et c'est lui qui
   démontera la valeur des autres.
8. **Réactiver le compte parent** (3 comptes en base) dès que l'agent Retention le
   signale — c'est le levier d'ARPU identifié en Phase 3g.

---

## Voir aussi

- `docs/n8n-workflows-v1.md` — les 8 workflows, triggers, actions, prompts
- `docs/growth-metrics.md` — sources, funnel, KPI, SQL, seuils d'alerte
- `docs/analytics-funnel.md` — taxonomie des événements (Phase 3f)
- `docs/monetisation-v1.md` — stratégie de monétisation (Phase 3g)

---

## Verdict

# PHASE 3h : PASS

L'architecture est **réalisable à 0 FCFA** sans modifier l'application : les données,
le connecteur WhatsApp, l'e-mail, les crons et l'IA existent déjà ; n8n auto-hébergé
apporte l'orchestration manquante.

Ce document ne propose **aucune modification de production**, **n'installe pas n8n**,
**n'ajoute aucune dépendance applicative**, **aucun commit**, **aucun push** et
**aucun déploiement**.