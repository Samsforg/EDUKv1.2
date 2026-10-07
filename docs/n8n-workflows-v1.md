# Edukora — Workflows n8n v1

> **Phase 3h — document d'architecture.**
> n8n **n'est pas installé**. Ce document décrit ce qu'il faudra déployer, et où.
> Aucun fichier de ce dépôt n'est modifié. Aucun commit, push ni déploiement.
>
> Complément de `docs/growth-ai-v1.md`.

---

## 0. Principes

1. **Zéro modification d'Edukora.** n8n lit la base **en lecture seule**.
2. **Zéro FCFA.** n8n auto-hébergé, Groq quota gratuit.
3. **Zéro publication automatique.** Chaque sortie est une **proposition**.
4. **Zéro donnée personnelle** dans un prompt (§9 de `growth-ai-v1.md`).
5. **Toute statistique publiée vient du SQL**, jamais du LLM.

---

## 1. Installation de n8n

> **Hors du dépôt Edukora.** Ni dans `src/`, ni dans `docs/`, ni dans `.github/`.

```bash
mkdir -p ~/edukora-growth && cd ~/edukora-growth

docker run -d \
  --name edukora-n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -e GENERIC_TIMEZONE=Africa/Abidjan \
  -e N8N_DIAGNOSTICS_ENABLED=false \
  -e N8N_RUNNERS_ENABLED=true \
  -e EXECUTIONS_DATA_PRUNE=true \
  -e EXECUTIONS_DATA_MAX_AGE=336 \
  -v edukora_n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

| Option | Rôle |
|---|---|
| `EXECUTIONS_DATA_MAX_AGE=336` | purge l'historique à 14 jours (S10) |
| `N8N_RUNNERS_ENABLED` | isolation des exécutions |
| `GENERIC_TIMEZONE` | aligne les crons sur l'heure d'Abidjan |

Accès : `https://<hôte>.n8n.interne` — **derrière HTTPS + 2FA**, réservé aux personnes
qui valident les publications.

---

## 2. Connexions (Credentials)

Toutes dans **n8n Credentials**, jamais dans un workflow ni dans Git.

| Nom | Type | Détail |
|---|---|---|
| `Edukora PG (RO)` | Postgres | **utilisateur lecture seule** — `SELECT` seul, voir §2.1 |
| `Groq Free` | HTTP Header | `Authorization: Bearer $GROQ_API_KEY` |
| `WhatsApp Admin` | HTTP Header | `Instance` + `apikey` — mêmes valeurs que `WHATSAPP_*` |
| `Edukora Mail` | SMTP | `smtp-relay.brevo.com:587` — mêmes valeurs que le mailer |

### 2.1 Utilisateur PostgreSQL en lecture seule

```sql
CREATE ROLE edukora_growth_ro LOGIN PASSWORD '<mot-de-passe-long-aléatoire>';
GRANT CONNECT ON DATABASE edukora TO edukora_growth_ro;
GRANT USAGE ON SCHEMA public TO edukora_growth_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO edukora_growth_ro;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO edukora_growth_ro;

-- vérification : aucune écriture possible
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM edukora_growth_ro;
```

> n8n n'a **aucun** droit d'écriture. C'est la garantie que le growth ne peut pas
> altérer les données (§ S1/S7).

### 2.2 Modèle IA

`llama-3.3-70b-versatile` — le même modèle que le provider principal d'Edukora.
Endpoint : `https://api.groq.com/openai/v1/chat/completions`

---

## 3. Vue d'ensemble des workflows

| # | Workflow | Agent | Déclencheur | Sortie |
|---|---|---|---|---|
| **W1** | Snapshot quotidien | Analytics | 07:00 | table `growth_metrics` miroir |
| **W2** | Rapport quotidien | Analytics | 07:30 | WhatsApp + mail |
| **W3** | Rapport hebdomadaire | Analytics + Conversion | lun. 08:00 | WhatsApp + mail |
| **W4** | Alerte baisse de trafic | Analytics | 07:45 | WhatsApp si alerte |
| **W5** | Contenu & calendrier | Content | mar. 09:00 | propositions de posts |
| **W6** | Risque de rétention | Retention | 06:00 | liste de comptes à risque |
| **W7** | Opportunités SEO | SEO | jeu. 09:00 | propositions de contenu |
| **W8** | Plan de campagne | Campaign | 1ᵉʳ du mois | proposition de campagne |

> **W2 peut être désactivé** au démarrage : `/api/cron/report` (7h45) produit déjà un
> rapport quotidien via `getConversionStats()` + WhatsApp + e-mail. Activer W2
> seulement si l'on veut la version **augmentée par IA**.

---

## 4. Requêtes SQL partagées

Toutes lisent des tables existantes. **Aucune création de table.**

### 4.1 Volume de trafic et funnel du jour

> ⚠️ **Prérequis E1** — l'événement émis est `pageview` (sans tiret bas),
> pas `page_view`. Corriger avant de déployer.

```sql
SELECT event, COUNT(*)::int AS n, COUNT(DISTINCT user_id)::int AS users
FROM analytics_events
WHERE created_at::date = CURRENT_DATE
GROUP BY event;
```

### 4.2 Funnel sur N jours

```sql
WITH e AS (
  SELECT event, user_id, created_at FROM analytics_events
  WHERE created_at >= NOW() - INTERVAL '30 days'
)
SELECT
  COUNT(*) FILTER (WHERE event = 'pageview')::int                    AS v_pageviews,
  COUNT(*) FILTER (WHERE event = 'landing_viewed')::int              AS v_landing,
  COUNT(*) FILTER (WHERE event = 'cta_clicked')::int                 AS v_cta,
  COUNT(*) FILTER (WHERE event = 'signup_started')::int              AS v_signup_start,
  COUNT(*) FILTER (WHERE event = 'signup_completed')::int            AS v_signup_done,
  COUNT(*) FILTER (WHERE event = 'lesson_started')::int              AS v_lesson_start,
  COUNT(*) FILTER (WHERE event = 'lesson_completed')::int            AS v_lesson_done,
  COUNT(*) FILTER (WHERE event = 'quiz_completed')::int              AS v_quiz,
  COUNT(*) FILTER (WHERE event = 'ai_question_sent')::int            AS v_ai,
  COUNT(*) FILTER (WHERE event = 'begin_checkout')::int              AS v_checkout,
  COUNT(*) FILTER (WHERE event = 'add_payment_info')::int            AS v_payment,
  COUNT(*) FILTER (WHERE event = 'purchase')::int                    AS v_purchase,
  COUNT(*) FILTER (WHERE event = 'return_visit')::int                AS v_return,
  COUNT(*) FILTER (WHERE event = 'quota_exceeded')::int              AS v_quota
FROM e;
```

### 4.3 Activation — la fuite n°1 (Phase 3g)

```sql
SELECT
  COUNT(*)::int AS inscrits,
  COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM lesson_reads lr WHERE lr.user_id = u.id
  ))::int AS avec_progression,
  ROUND(100.0 * COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM lesson_reads lr WHERE lr.user_id = u.id
  )) / NULLIF(COUNT(*), 0), 1) AS taux_activation_pct
FROM users u
WHERE role = 'student' AND created_at >= NOW() - INTERVAL '90 days';
```

### 4.4 Rétention et churn (absents — à créer par cet agent)

```sql
-- J7
WITH cohorts AS (
  SELECT DATE_TRUNC('week', created_at)::date AS semaine, id
  FROM users WHERE role = 'student' AND created_at >= NOW() - INTERVAL '12 weeks'
), actifs AS (
  SELECT DISTINCT lr.user_id, DATE_TRUNC('week', lr.read_at)::date AS semaine
  FROM lesson_reads lr WHERE lr.read_at >= NOW() - INTERVAL '12 weeks'
)
SELECT c.semaine, COUNT(*)::int AS taille,
  ROUND(100.0 * COUNT(a.user_id) / NULLIF(COUNT(*), 0), 1) AS retention_pct
FROM cohorts c LEFT JOIN actifs a ON a.user_id = c.id AND a.semaine = c.semaine
GROUP BY c.semaine ORDER BY c.semaine;
```

### 4.5 Comptes à risque de churn (grille §4.5 de l'growth-ai-v1.md)

```sql
WITH signals AS (
  SELECT u.id,
    (CASE WHEN EXISTS (SELECT 1 FROM lesson_reads l
        WHERE l.user_id = u.id AND l.read_at > NOW() - INTERVAL '7 days')
        AND NOT EXISTS (SELECT 1 FROM lesson_reads l2
        WHERE l2.user_id = u.id AND l2.read_at > NOW() - INTERVAL '14 days')
      THEN 40 ELSE 0 END)
  + (CASE WHEN NOT EXISTS (SELECT 1 FROM lesson_reads l
        WHERE l.user_id = u.id) THEN 35 ELSE 0 END)
  + (CASE WHEN EXISTS (SELECT 1 FROM analytics_events e
        WHERE e.user_id = u.id AND e.event = 'quota_exceeded'
        AND e.created_at > NOW() - INTERVAL '30 days')
      THEN 20 ELSE 0 END) AS score
  FROM users u WHERE u.role = 'student' AND u.created_at <= NOW() - INTERVAL '7 days'
)
SELECT id, score FROM signals WHERE score >= 70 ORDER BY score DESC LIMIT 100;
```

> Les identifiants returned **ne transitent pas vers un LLM**. Seul `COUNT(*)` est
> envoyé à l'IA (§9).

### 4.6 Activité IA et coût (W6)

```sql
SELECT COUNT(*)::int AS echanges,
  ROUND(AVG(length(tutor_messages.content))::numeric, 0)::int AS longueur_moyenne
FROM tutor_messages WHERE role = 'user' AND created_at >= NOW() - INTERVAL '30 days';
```

### 4.7 Contenu sous-exploité — entrée du SEO Agent

```sql
SELECT c.code, c.title, COUNT(DISTINCT l.id)::int AS lessons,
  COUNT(DISTINCT lr.user_id)::int AS lecteurs_30j
FROM chapters c
LEFT JOIN lessons l ON l.chapter_id = c.id
LEFT JOIN lesson_reads lr ON lr.lesson_id = l.id AND lr.read_at >= NOW() - INTERVAL '30 days'
GROUP BY c.id, c.code, c.title
HAVING COUNT(DISTINCT l.id) > 0 AND COUNT(DISTINCT lr.user_id) = 0
ORDER BY lessons DESC LIMIT 40;
```

---

## 5. W1 — Snapshot quotidien

**Rôle :** matérialiser les agrégats du jour pour que les rapports n'aient pas à
interroger la base à chaque exécution.

| Nœud | Configuration |
|---|---|
| `Schedule Trigger` | `0 7 * * *` (07:00, Abidjan) |
| `Postgres` | **Execute Query** · §4.1 + §4.3 |
| `Code` — *Seuils* | agrégat + comparaison N-1 |
| `IF` — *Alerte ?* | routes vers W4 si variation > 30 % |
| `NoOp` | sinon |

> **Écriture :** aucune dans Edukora. Le résultat est stocké **dans n8n** uniquement.
> Option advanced : un `POST /api/growth/metrics` (une ligne, `ENCRYPT` credentials).

**Règle de bruit (L1) :** si `total < 30`, le workflow **ne déclenche aucune alerte** et
inscrit `insufficient_data` dans le rapport.

---

## 6. W2 — Rapport quotidien augmenté

| Nœud | Configuration |
|---|---|
| `Schedule Trigger` | `30 7 * * *` |
| `Postgres` | §4.1, §4.2 |
| `HTTP Request` — IA | Groq, `temperature 0.2`, `max_tokens 900` |
| `Code` — *Garde-fous* | vérifie que tout chiffre du texte existe dans l'agrégat |
| `WhatsApp` → `HTTP Request` | `POST {WHATSAPP_API_URL}/message/sendText/{INSTANCE}` |
| `Send Email` | Brevo |

### 6.1 Prompt — Analytics Agent

```
SYSTEM:
Tu es l'Analytics Agent d'Edukora, plateforme éducative ivoirienne
(BAC/BEPC). Tu produis un rapport quotidien pour un administrateur.

Règles ABSOLUES :
- N'invente JAMAIS un chiffre. Utilise uniquement les valeurs de DONNÉES.
- Si une métrique n'est pas fournie, écris "n.d.".
- Si le total d'événements < 30, commence par "⚠️ ÉCHANTILLON INSUFFISANT
  (<30) — indicateurs non fiables, analyse indicative uniquement."
- Français, sobre, 200 mots maximum, pas d'emoji décoratif.
- Signale au maximum 3 points d'attention, du plus au moins important.

DONNÉES (agrégats, J-1 vs J-7) :
{{ $json.aggregats }}

Format de sortie :
## Synthèse
(2 phrases)

## Funnel
| étape | J-1 | J-7 | variation |

## Points d'attention
- [critique|attention] <métrique> : <diagnostic> → <action>

## Action du jour
(une seule, concrète)
```

### 6.2 Garde-fou anti-hallucination

```
const chiffresRapport = (texte.match(/\d+/g) || []).map(Number);
const chiffresAutorises = new Set(
  Object.values($json.aggregats).flatMap(v =>
    typeof v === "number" ? [String(v)] :
    v && typeof v === "object" ? Object.values(v).map(String) : []
  )
);
const introuvables = chiffresRapport.filter(c =>
  !chiffresAutorises.includes(c) && !/^\d{4}$/.test(c)
);
if (introuvables.length) {
  throw new Error("Chiffres non sourcés dans le rapport : " + introuvables.join(", "));
}
return items;
```

> **Principe : le LLM explique, le SQL mesure.** Un chiffre absent des données
> fait échouer le workflow (L11).

---

## 7. W3 — Rapport hebdomadaire

| Nœud | Configuration |
|---|---|
| `Schedule Trigger` | `0 8 * * 1` (lundi) |
| `Postgres` | §4.2, §4.3, §4.4 |
| `HTTP Request` — IA | Groq, `temperature 0.3`, `max_tokens 1200` |
| `IF` — *Volume suffisant ?* | `non` → rapport « données insuffisantes » |
| `WhatsApp` + `Send Email` | groupe admin |

**Prompt — synthèse hebdomadaire :**

```
SYSTEM:
Tu es l'Analytics Agent d'Edukora. Produis la synthèse HEBDOMADAIRE.

DONNÉES (7 derniers jours vs 7 précédents) :
{{ $json.semaines }}

Contraintes :
- Chiffres exclusivement issus de DONNÉES ; sinon "n.d."
- < 30 observations → le dire explicitement
- 250 mots max

Structure :
## Tendance de la semaine
## Funnel (7j)
## Activation   ← priorité absolue (cf. Phase 3g)
## Rétention
## Conversion
## Une décision à prendre
```

---

## 8. W4 — Alerte baisse de trafic

| Nœud | Configuration |
|---|---|
| `Schedule Trigger` | `45 7 * * *` |
| `Postgres` | §4.1 |
| `Code` — *Détection* | compare à la moyenne 7 jours |
| `IF` — *Seuil franchi ?* | **≥ 30 %** de baisse **ET** volume ≥ 30 |
| `HTTP Request` — IA | **explication seulement** |
| `WhatsApp` | alerte au groupe admin |

### 8.1 Détection

```js
const a = $json.agrege;
const SEUIL = 0.30;

if (a.total < 30) {
  return [{ alerte: false, raison: "insufficient_data", total: a.total }];
}
const baisse = (a.veille - a.moyenne7) / Math.max(a.moyenne7, 1);
const critique = baisse <= -SEUIL && a.veille >= 30;

return [{
  alerte: critique,
  severity: baisse <= -0.5 ? "critique" : "attention",
  metrique: baisse <= -0.5 ? "trafic" : "trafic_ou_conversion",
  variation_pct: Math.round(baisse * 100),
  fenetre: "J-1 vs moyenne 7 jours",
  action_suggeree: "Vérifier les campagnes des 48 dernières heures et l\'état du tuteur IA."
}];
```

### 8.2 Prompt — diagnostic

```
SYSTEM:
Tu es l'Analytics Agent d'Edukora. Un indicateur a baissé.
Explique en 3 phrases maximum ce qui peut l'expliquer.

DONNÉES : {{ $json }}
CONTRAINTES :
- Ne propose AUCUNE cause certaine : uniquement des pistes vérifiables.
- Ne propose jamais d'action qui modifie la production.
- Français, sobre.
```

> Les alertes **proposent des pistes**, elles n'**agissent jamais** sur le produit.

---

## 9. W5 — Contenu & calendrier éditorial

| Nœud | Configuration |
|---|---|
| `Schedule Trigger` | `0 9 * * 2` (mardi) |
| `Postgres` | catalogue : chapitres, matières, annales |
| `Postgres` | §4.7 — chapitres sans lecteurs |
| `HTTP Request` — IA | génération des variantes |
| `Code` — *Scoring* | note chaque proposition (longueur, CTA, hashtags, urgence) |
| `Google Sheets` / `Write Binary` | export CSV **pour validation** |
| `WhatsApp` | notification « 3 propositions à valider » |

### 9.1 Prompt — Content Agent

```
SYSTEM:
Tu es le Content Agent d'Edukora (BAC/BEPC, Côte d'Ivoire).

Ta mission : proposer des posts qui font découvrir la plateforme à un élève
de 3e ou 2nde et ses parents.

RÈGLES ABSOLUES :
- N'invente AUCUN fait, chiffres, dates d'examen, note ou tarif.
- Ne cite QUE les matières, chapitres et types d'annales fournis.
- Interdiction absolue de tout nom, email, téléphone ou donnée d'élève.
- Français, registre clair, phrases courtes.

Entrées :
- Chapitres sous-exploités : {{ $json.sansLecteurs }}
- Sujets d'annales disponibles : {{ $json.annales }}

Produis EXACTEMENT 3 propositions, chacune :

### Proposition N — [matière] [niveau]
PLATEFORME : facebook | tiktok | whatsapp
ACCROCHE : (1 phrase, <= 90 caractères)
TEXTE : (80-150 mots)
CTA : (1 phrase, <= 60 caractères)
HASHTAGS : 3 à 5
SCORE : /10 — utilité pédagogique +clr+A likelihood d Higher engagement

Justifie chaque choix en 1 phrase : "Pourquoi : …"
```

### 9.2 Calendrier éditorial

| Fenêtre | Occasion | Angle |
|---|---|---|
| **Mai** | BEPC 26–29 (~606 583 candidats) | méthodes, plan de révision |
| **Juin** | BAC 15–19 (~329 372 candidats) | dissertation, sujet par sujet |
| **Sept.–oct.** | rentrée | creer un compte, organisation |
| **Hors saison** | continue | maths, français, anglais, sciences |

### 9.3 Sortie

**CSV vers un fichier local ou un Google Sheet.** Le contenu est **proposé**, jamais
publié. La publication se fait à la main depuis `espace-admin/growth`.

---

## 10. W6 — Risque de rétention

| Nœud | Configuration |
|---|---|
| `Schedule Trigger` | `0 6 * * *` |
| `Postgres` | §4.5 |
| `IF` | `COUNT(*) ≥ 30` |
| `HTTP Request` — IA | segmentation de la population à risque |
| `WhatsApp` + mail | liste **agrégée**, jamais d'identifiants |

### 10.1 Prompt — Retention Agent

```
SYSTEM:
Tu es le Retention Agent d'Edukora. Analyse une population d'élèves
à risque de désabonnement.

DONNÉES (agrégats uniquement, aucun identifiant) :
{{ $json.segments }}

RÈGLES :
- N'invente AUCUN chiffre.
- N'identifie AUCUN élève. Tu raisonnes sur des SEGMENTS.
- Français, 200 mots max.

Structure :
## Taille de la population à risque
## Trois causes probables (par ordre)
## Une action de réactivation par cause
## Ce qu'il ne faut PAS faire
```

### 10.2 Garde-fou

```js
// Le LLM ne doit jamais produire d'identifiant
const sortie = $json.texte;
if (/\b(user_id|@\w+\.\w+|07\d{8})\b/.test(sortie)) {
  throw new Error("Sortie contenant une donnée personnelle — rejetée.");
}
return items;
```

> Ce garde-fou est **non négociable** : il implémente §9 de `growth-ai-v1.md`.

---

## 11. W7 — Opportunités SEO

| Nœud | Configuration |
|---|---|
| `Schedule Trigger` | `0 9 * * 4` (jeudi) |
| `Postgres` | §4.7 |
| `Postgres` | annales existantes par année |
| `HTTP Request` — IA | propositions |
| `Write Binary` → CSV | à valider |

### 11.1 Prompt — SEO Agent

```
SYSTEM:
Tu es le SEO Agent d'Edukora.

RÈGLES ABSOLUES :
- Tu ne connais PAS les volumes de recherche : ne les invente JAMAIS.
- N'indique un volume que si il est explicitement fourni.
- Français.

DONNÉES :
- Chapitres publiés sans lecteurs : {{ $json.sansLecteurs }}
- Annales disponibles (année, examen, matière) : {{ $json.annales }}
- Pages existantes : {{ $json.pages }}

Produis :
## 5 opportunités classées
| # | page à créer | motif | matière | niveau | priorité |

Justifie chaque ligne par le contenu existant qui la rend crédible.
Note explicitement : "volumes de recherche non mesurés — priorisation heuristique".
```

> **Honnêteté obligatoire (L8)** : sans Search Console, cet agent produit des
> **heuristiques**, pas des volumes. Il **doit le dire** dans sa sortie.

---

## 12. W8 — Plan de campagne

| Nœud | Configuration |
|---|---|
| `Schedule Trigger` | `0 9 1 * *` (1ᵉʳ du mois) |
| `Postgres` | performances des campagnes passées |
| `HTTP Request` — IA | plan |
| `WhatsApp` + mail | proposition |

### 12.1 Prompt — Campaign Agent

```
SYSTEM:
Tu es le Campaign Agent d'Edukora (Côte d'Ivoire, examens BAC/BEPC).

CONTEXTE : deux moments dominent l'année — BEPC (mai) et BAC (juin).
Le reste de l'année, c'est la rentrée et la révision continue.

DONNÉES : {{ $json.performance }}

RÈGLES :
- N'invente AUCUN chiffre de marché. Utilise uniquement DONNÉES.
- Pas de budget en FCFA : tu proposes des actions, pas des dépenses.
- Français, 300 mots max.

Structure :
## Contexte du mois
## Objectif unique (un seul)
## 3 actions, chacune avec : action, canal, message, UTM, indicateur de succès
## Ce qu'on ne fait pas ce mois-ci
```

**Convention UTM (à appliquer partout) :**

```
utm_source    = facebook | tiktok | whatsapp | newsletter
utm_medium    = social | message | email
utm_campaign  = bepc_mai | bac_juin | rentree_sept | continu
utm_content   = <slug du post>
```

---

## 13. Tableau des prompts

| Workflow | Agent | `temperature` | `max_tokens` | Sortie attendue |
|---|---|---|---|---|
| W1 | Analytics | — | — | agrégats |
| W2 | Analytics | 0.2 | 900 | rapport texte |
| W3 | Analytics + Conversion | 0.3 | 1 200 | synthèse hebdo |
| W4 | Analytics | 0.2 | 400 | explication |
| W5 | Content | 0.8 | 2 500 | 3 propositions |
| W6 | Retention | 0.4 | 800 | analyse de segments |
| W7 | SEO | 0.5 | 1 500 | 5 opportunités |
| W8 | Campaign | 0.6 | 1 200 | plan de campagne |

> `temperature` faible pour les agents d'analyse (fidélité), élevée pour le Content
> Agent (créativité).

---

## 14. Gestion des erreurs

| Cas | Traitement |
|---|---|
| Groq indisponible | **retry 3×**, puis `fallback` → rapport **sans** commentaire IA (les chiffres restent) |
| Base injoignable | notification groupe admin, **aucune donnée inventée** |
| Volume < 30 | rapport « échantillon insuffisant », **aucune alerte** |
| Sortie contenant une donnée personnelle | **rejet** (§10.2) |
| Workflow en erreur 3× | alerte groupe admin, pas de boucle silencieuse |

**Principe : en cas d'échec, le système doit être bruyant sur ses pannes et muet sur ses succes.** Une IA qui
dysfonctionne ne doit jamais produire de chiffre faux.

---

## 15. Déploiement

| Ordre | Étape | Vérification |
|---|---|---|
| 1 | Corriger **E1** (`pageview`) et **E2** (statut) | `pageviews` ≠ 0 |
| 2 | Créer `Edukora PG (RO)` + `Groq Free` | `SELECT` OK, `INSERT` refusé |
| 3 | n8n auto-hébergé | `https://…/healthz` |
| 4 | **W1** seul | agrégats cohérents avec SQL manuel |
| 5 | **W2** | rapport WhatsApp reçu |
| 6 | **W6** | alerte reçue |
| 7 | **W5**, **W7**, **W3**, **W4**, **W8** | un par un |

> **Jamais deux workflows le même jour.** Une erreur d'orchestration se diagnostique
> plus facilement isolée.

---

## 16. Vérification du garde-fou PII

Test à exécuter **avant** tout déploiement de W5/W6 :

```sql
-- Doit renvoyer 0 ligne
SELECT COUNT(*) FROM analytics_events
WHERE event IN ('pageview','landing_viewed','cta_clicked','subject_selected')
  AND props::text ~* '(name|email|phone|ref|code|password)';
```

Si le résultat est > 0, **ne pas déployer** : le contexte envoyé au LLM pourrait
contenir des données personnelles.

---

## Voir aussi

- `docs/growth-ai-v1.md` — architecture, agents, sécurité, PII, limites
- `docs/growth-metrics.md` — sources, funnel, KPI, seuils
- `docs/analytics-funnel.md` — taxonomie des événements (Phase 3f)

---

## Absence d'installation

**n8n n'a pas été installé.** Aucun fichier n'a été créé hors `docs/`, aucune
connexion n'a été établie, aucune clé n'a été utilisée, aucune base n'a été
interrogée en écriture. **Aucun commit, aucun push, aucun déploiement.**