# Analytics Edukora — Référence des événements (GA4 + Clarity)

## Vue d'ensemble

- **GA4** : `NEXT_PUBLIC_GA_ID=G-TQ3KSRHL9B` (format `G-XXXXXXX` obligatoire — un ID de flux numérique ne charge pas de conteneur et rien n'est collecté) via gtag.js côté client + Measurement Protocol côté serveur (`sendGa4Purchase`).
- **Clarity** : `NEXT_PUBLIC_CLARITY_ID` (y4hyfds0yh) — session replay, heatmaps, automatique après consentement.
- **CSP (`next.config.mjs`)** : `script-src` doit autoriser `https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms` et `connect-src` les domaines de collecte GA4 (`google-analytics.com`, `region1.google-analytics.com`, `analytics.google.com`, `stats.g.doubleclick.net`) + `*.clarity.ms`. Sans cela les scripts se chargent mais sont **bloqués silencieusement** (erreur `a[c] is not a function`, aucun `g/collect`).
- **Respect du consentement (RGPD)** : aucun script ne charge tant que `edukora_consent.analytics !== true`. `ConsentBanner` émet `edukora-consent-updated` → `EdukoraAnalytics` (monté dans `layout.tsx`) charge gtag.js + clarity puis définit le cookie `edukora_gacid` (2 ans, `cid.gid`).
- **Déduplication** : `trackEvent` ignore les doublons par `name:params` par vue (Set `sentThisView`).
- **Dimension plan** : événements enrichis avec `plan` (free|premium, cache sessionStorage `edukora_plan`, alimenté par `/api/auth/me` via `attachGlobalTracker`).
- Les événements sont envoyés tels quels (ex. `login_completed`, `begin_checkout`) — noms simples pour faciliter les rapports/funnels GA4.

## Moteur (`src/lib/analytics.ts`)

| Fonction | Rôle |
|---|---|
| `trackEvent(name, params)` | Envoi gtag + dataLayer + clarity, dédup. |
| `loadAnalyticsScripts()` | Injection dynamique gtag.js + Clarity (après consentement). |
| `ensureGaClientId()` | Lecture/stockage `edukora_gacid`. |
| `attachGlobalTracker()` | Attache `window.edukoraTrack` + précharge le plan utilisateur. |
| `userPlan()` | Retourne free/premium depuis `/api/auth/me` (étape 1 de chaque page serveur). |

## Événements

### Acquisition & inscription
| Événement | Déclencheur | Paramètres |
|---|---|---|
| `signup_started` | Clic « S'inscrire » (formulaire inscription) | `method` (email/phone), `utm_campaign`, `utm_medium`, `utm_source` |
| `signup_completed` | Création de compte réussie | `method`, utm_* |
| `signup_step_2_completed` | Choix de l'examen (étape 2 inscription) | — |
| `login_completed` | Connexion élève (email ou téléphone) | `method` |
| `login_completed` (parent) | Connexion parent | `method`, `role: parent` |
| `referral_code_copied` | Copie du code de parrainage | — |
| `referral_link_shared` | Partage du lien de parrainage | `method` (native/whatsapp) |

### Engagement pédagogique
| Événement | Déclencheur | Paramètres |
|---|---|---|
| `course_opened` | Ouverture d'un cours (vue fiche) | `subject_code`, `grade_code`, `plan` |
| `lesson_started` | Démarrage d'une leçon | `subject`, `grade`, `lesson_id`, `plan` |
| `lesson_completed` | Leçon terminée (mode pas à pas / auto) | idem |
| `quiz_started` | Démarrage d'un quiz | `quiz_id`, `subject`, `plan` |
| `quiz_completed` | Quiz terminé | idem + `correct`, `total` |
| `fiche_opened` | Ouverture d'une fiche de révision | `fiche_id`, `subject`, `grade` |
| `fiche_read` | Lecture du contenu de la fiche | idem |
| `fiche_saved` | Sauvegarde d'une fiche | idem |
| `fiche_unsaved` | Retrait d'une fiche sauvegardée | idem |
| `simulateur_started` | Démarrage du simulateur d'examen | `simulator_id`, `subject` |
| `simulateur_completed` | Simulation terminée | idem + `score` |

### IA (Kora)
| Événement | Déclencheur | Paramètres |
|---|---|---|
| `ai_tutor_opened` | Ouverture du tuteur IA | — |
| `ai_question_sent` | Question envoyée à Kora | `channel` (chat/dissertation) |
| `quota_exceeded` | Quota IA gratuit épuisé | `source` (kora/fiche/dissertation), `plan` |

### Monétisation
| Événement | Déclencheur | Paramètres |
|---|---|---|
| `subscription_started` | Clic CTA vers le plan (tarifs, comparateur) | — |
| `begin_checkout` | Clic « Choisir ce plan » / Vérifier | `plan_id`, `value` (XOF), `interval` (mensuel/trimestriel), `promo` |
| `add_payment_info` | Validation numéro USSD | `plan_id`, `value`, `provider`, `promo` |
| `purchase` **(serveur)** | Webhook GeniusPay (paiement confirmé) | `transaction_id` (ref GP, dédup), `value`, `currency: XOF`, `items[0]` |

### Système
| Événement | Déclencheur | Paramètres |
|---|---|---|
| `push_permission_granted` | Notification push acceptée | `context` (banner/prompt) |
| `push_permission_denied` | Notification push refusée | idem |

⚠️ **Conversions à déclarer dans GA4** (Admin → Événements → Marquer comme conversion) : `signup_completed`, `begin_checkout`, `purchase`.

## Purchase serveur (`src/lib/ga4-ssr.ts`)

1. Checkout stocke `ga_client_id` (cookie `edukora_gacid`) dans `subscriptions.ga_client_id`.
2. Webhook GeniusPay : après création abonnement → `sendGa4Purchase()` fire-and-forget (MP, pas de blocage du webhook).
3. Échec silencieux si secret absent (évite toute erreur en prod).

## Funnel de référence

```
signup_completed → login_completed → begin_checkout → add_payment_info → purchase
```

Cette documentation est à jour au **19/08/2026**. Fichiers à maintenir :
`src/lib/analytics.ts`, `src/lib/ga4-ssr.ts`, `src/components/{EdukoraAnalytics,ConsentBanner,SubscriptionCta,PushSubscribe}.tsx`, `src/app/api/auth/me/route.ts`, `src/app/api/premium/{checkout,webhook}/route.ts`, `src/lib/init.ts`, `scripts/deploy-vercel.sh`.