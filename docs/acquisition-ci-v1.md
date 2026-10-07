# Edukora — Acquisition Côte d'Ivoire v1

> **Phase 3i — stratégie d'acquisition organique.**
> Aucun code. Aucune campagne payante. **Budget : 0 FCFA.**
> Aucun commit, push ni déploiement.

---

## 0. Résumé exécutif

| Levier | Coût | Effet attendu | Priorité |
|---|---|---|---|
| **SEO annales BEPC** | 0 FCFA | **le plus gros gisement** — 0 annale BEPC 2025/2026 | **P0** |
| **Groupes WhatsApp** | 0 FCFA | distribution virale, inmediata | **P0** |
| **Ambassadeurs** | 0 FCFA ( commissions offertes ) | confiance, bouche-à-oreille | **P0** |
| **TikTok** | 0 FCFA | la plus forte portée organique | **P1** |
| **Facebook (groupes)** | 0 FCFA | seul canal qui atteint **P3 Parent** | **P1** |
| **Angle technique** | 0 FCFA | demande > offre, contenu déjà en base | **P1** |
| **YouTube** | 0 FCFA | preuve durable, référencement long | P2 |
| **YouTube Shorts** | 0 FCFA | réutilisation TikTok | P2 |

> **Le SEO annales est prioritaire pour une raison simple :** c'est le seul levier
> où la demande est certaine (examens nationaux) et l'offre quasi nulle.
> Les 9 canaux demandés sont traités ci-dessous, mais **ils ne se valent pas tous.**

---

## 1. Ce que la base permet déjà

Avant toute stratégie, l'état réel :

| Actif | Détail | Verdict |
|---|---|---|
| **Sitemap** | `src/app/sitemap.ts` — statique + **14 posts** + **annales approuvées** | ✅ prêt |
| **`robots.txt`** | 20 exclusions, `sitemap.xml` déclaré | ✅ bon |
| **Annales** | **15 sujets** : BAC 2026 (8), BAC 2024 (4), BEPC 2024 (3) | ⚠️ **BEPC vide** |
| **Séries** | C, D, A, B | ⚠️ non dans l'URL |
| **Blog** | **14 posts**, source statique dans `src/lib/blog.ts` | ⚠️ pas d'API admin |
| **Landing** | 11 pages : `/tarifs` `/tuteur-ia` `/annales` `/simulateur-d-examen-bac-bepc` `/parrainage` `/fonctionnalites` `/resultats` | ✅ prêt |
| **Parrainage** | `-20%` + **300 XP** parrain, **+50 XP** filleul | ✅ **levier pret** |
| **WhatsApp** | `WHATSAPP_REPORT_GROUP` déjà configuré | ⚠️ groupe **admin**, pas élèves |
| **Facebook** | 2 URLs **différentes** | ❌ **écart** |

### 1.1 Trois écarts bloquants

| # | Constat | Effet |
|---|---|---|
| **E7** | `src/app/page.tsx:29` → `id=61591805488598` ; `src/components/JsonLd.tsx:26` → `id=61578083930498` | **deux pages Facebook différentes** dans les balises et les liens de partage |
| **E8** | Annales BEPC **2025 et 2026 absentes** | le persona P0 (BEPC) n'a **aucune preuve** |
| **E9** | Les séries C/D/A/B **n'apparaissent pas dans l'URL** (`slugify(series_code ?? "general")`) | une page `/annales/bac/general/…` perd le signal de série |

> **E7 est le plus facile à corriger et le plus visible :** chaque partage sur
> Facebook peut partir vers la mauvaise page. **Une ligne par fichier.**

---

## 2. Canaux

### 2.1 TikTok — portée maximale, 0 FCFA

**Pourquoi :** l'audience CI y est massivement présente, et le format court +
éducation + examen fonctionne.

| Cible | Format | Fréquence |
|---|---|---|
| BEPC / collège | 30 s, tableau + voix off | 2 / semaine |
| BAC / lycée | 60 s, méthode pas à pas | 2 / semaine |
| Technique | 45 s, notion compta | 1 / semaine |

**Règles :**
- **une seule idée** par post
- **le correctif visible** dans le post même
- **aucun mensonge chiffré** — pas de « 95% de réussite », pas de faux score
- **sous-titres** : beaucoup regardent sans le son

> ⚠️ **Contrainte à respecter :** TikTok n'autorise pas la publicité pour les
> **mineurs** dans plusieurs juridictions. Cible 16+ ou passer par le parent.

### 2.2 Facebook — le seul canal qui atteint P3

**Pourquoi :** les **groupes de parents** et de promotion sont l'infrastructure
de distribution déjà existante en CI. Aucune n'a besoin d'un budget.

| Groupe type | Langue | Persona |
|---|---|---|
| Parents d'élèves de 3e | français | **P3** |
| Parents Terminale | français | **P3** |
| Séries B / G2 | français | **P5** |
| Promotion 2026 | français | **P1** |

**Règles :**
- **ne jamais spammer** : une contribution utile sur 3, une promotion sur 10
- **répondre aux commentaires** — c'est là que se fait la conversion
- **pas de lien dans le premier post** d'un groupe
- **formats qui marchent :** carousel 6 visuels, conseil court, témoignage

> **Le groupe est le produit.** Edukora doit être **utile** dans le groupe, pas
> seulement présent.

### 2.3 WhatsApp — la distribution qui ignore les algorithmes

**Levier existant :** `/parrainage` génère un lien + un code.

| Mécanisme | Détail | Coût |
|---|---|---|
| **Parrainage** | `-20%` + **300 XP** / **+50 XP** | 0 FCFA |
| **Groupes de classe** | création gérée par les profs | 0 FCFA |
| **Groupes de promotion** | animation par l'admin | 0 FCFA |
| **Liste de diffusion** | `WHATSAPP_REPORT_GROUP` existe déjà | 0 FCFA |

> ⚠️ **`WHATSAPP_REPORT_GROUP` est un groupe d'admin** (Phase 3h). **Ne pas y
> inviter des élèves.** Il faut **créer un groupe distinct** par promotion.

**Règle :** **2 messages par semaine maximum.** Au-delà, c'est du spam et le
numéro se fait bloquer.

### 2.4 YouTube — la preuve durable

| Format | Usage |
|---|---|
| **Shorts** | réutilisation directe des TikTok |
| **Long (5–10 min)** | correction complète d'un sujet d'examen |

**Pourquoi le long format :** une vidéo de correction d'un sujet BEPC/BAC est un
**contenu de recherche** : quelqu qui cherche « correction sujet maths BEPC 2024 »
la trouvera sur YouTube **et** sur le site.

> **0 FCFA :** enregistrement d'écran. Pas de montage lourd.

### 2.5 Groupes étudiants

| Groupe | Levier |
|---|---|
| WhatsApp de promotion | partage du lien parrainage |
| Groupes Telegram / Discord | **à éviter** : faible présence CI, coût de modération |
| **Groupes d'internat / collège** | relais par le personnel |

### 2.6 Communautés scolaires

**C'est le levier le sous-exploité du projet.**

| Cible | Comment |
|---|---|
| **Établissements** | proposer une session de révision gratuite |
| **Associations d'élèves** | matériel de révision partagé |
| **Professeurs** | `espace-prof` existe déjà — leur donner les fiches |

> **Pourquoi c'est puissant :** un professeur qui utilise les fiches d'Edukora
> devient un **prescripteur gratuit** pour des centaines d'élèves.
> **Cost marginal nul, effet réseau réel.**

### 2.7 Ambassadeurs — 0 FCFA

| Type | Cible | Rémunération |
|---|---|---|
| **Élève ambassadeur** | 5 filleuls | accès premium offert (0 FCFA) |
| **Parent ambassadeur** | 3 filleuls | accès premium offert |
| **Professeur ambassadeur** | 5 élèves inscrits | accès premium offert |
| **Communautaire** | animateur de groupe WhatsApp | accès premium offert |

**Mécanique :** lien `/parrainage` + code → **`referral_clicked` avec
`has_code: true`** → attribution mesurable en SQL.

> **Aucune commission en espèces** : uniquement des accès premium offerts. Le coût
> est un abonnement, pas une dépense — et chaque ambassadeur coûte **du revenu
> récurrent**, pas du budget.

**Premier geste :** recruter **10 ambassadeurs** parmi les 241 élèves et 45
professeurs déjà inscrits. Coût : 10 accès premium. Effet : 10 cercles de
diffusion.

### 2.8 SEO

Voir §5. **C'est le levier P0.**

### 2.9 Référencement local

**Éléments déjà en place :** `sitemap.xml`, `robots.txt`, JSON-LD, `NEXT_PUBLIC_APP_URL`.

| Manque | Priorité |
|---|---|
| **E7** — 2 URLs Facebook divergentes | **P0** |
| **E8** — annales BEPC | **P0** |
| **E9** — séries absentes des URL | P1 |
| `hreflang` / variantes FR | P2 |
| Données structurées `Course` / `Exam` | P1 |
| Maillage interne blog → annales | P1 |

> **Le référencement local n'est pas un sujet technique** : c'est une
> question de **nommage d'URL** et de **maillage interne**.

---

## 3. Angles testés

Repris de `personas-ci.md` §9, avec le canal recommandé.

| Angle | Message | Persona | Canal principal | Statut |
|---|---|---|---|---|
| **IA** | `1 élève = 1 tuteur IA personnel` | P4, P7 | TikTok | ⭐ à tester |
| **Examens** | `Prépare ton BEPC ou ton BAC avec ton tuteur personnel` | **P1, P2** | TikTok + Facebook | ⭐⭐⭐ **principal** |
| **Technique** | `Comptabilité, droit, économie : enfin un tuteur` | **P5** | Facebook + YouTube | ⭐⭐⭐ **différenciant** |
| **Parent** | `Sais ce que ton enfant révise, chaque jour` | **P3** | Facebook | ⭐⭐⭐ **principal** |
| **Seconde chance** | `Ton parcours scolaire ne s'arrête pas ici` | **P7** | Facebook | ⭐⭐ |

> **Règle : un angle par semaine, mesuré sur 4 semaines.** Voir
> `content-calendar-v1.md` §5.3.

---

## 4. Ambassadeurs — plan de démarrage

### 4.1 Semaine 1

| Action | Coût |
|---|---|
| Recruter 10 ambassadeurs parmi les inscrits | 10 accès premium |
| Chaque ambassadeur partage dans **2 groupes** | 0 FCFA |
| Chaque ambassadeur invite **3 élèves** | 0 FCFA |

**Objectif : 30 inscriptions attribuées.** Measurable via `referral_clicked`
(`has_code: true`) puis `signup_completed`.

### 4.2 Ce qui rend un ambassadeur efficace

| Traitement | Effet |
|---|---|
| Premium offert | 🟢 fort |
| Premium offert **+** mention dans la communauté | 🟢🟢 fort |
| Badge « ambassadeur » visible | 🟢 fort |
| Commission en espèces | 🔴 interdit — coût récurrent, hors budget 0 FCFA |

---

## 5. SEO — le chantier P0

### 5.1 Le constat

| Catégorie | 2024 | 2025 | 2026 |
|---|---|---|---|
| **BEPC** | 3 | **0** | **0** |
| **BAC** | 4 | 0 | 8 |

> **Le BEPC concerne environ 606 583 candidats ; le BAC environ 329 372.**
> Le BEPC est **le plus gros examen** — et c'est celui qu'Edukora ne couvre pas.
> Les élèves de 3e constituent le persona **P2**, l'un des deux P0.

### 5.2 Les 3 actions SEO

| # | Action | Coût | Résultat attendu |
|---|---|---|---|
| **1** | Saisir les annales **BEPC 2025 et 2026** dans `exam_papers` | **0 FCFA** | pages indexables sur la plus grosse demande |
| **2** | Créer un **pilier** : « Annales BEPC 2026 : tous les sujets et corrigés » | 0 FCFA | hub + maillage interne |
| **3** | Publier **1 post de blog / semaine** sur un sujet d'examen | 0 FCFA | 4 pages/mois, autorité |

> **Point clé :** les annales sont **déjà dans le modèle de données**. Le sitemap
> les génère automatiquement dès qu'elles sont `status = 'approved'`.
> **Saisir une annale BEPC est une action de base de données, pas un développement.**
> C'est le meilleur rapport valeur/effort de tout le projet.

### 5.3 Référencement local

| Élément | Statut |
|---|---|
| `sitemap.xml` dynamique | ✅ |
| `robots.txt` | ✅ |
| JSON-LD | ✅ (⚠️ E7) |
| Pages par série | ❌ E9 |
| Maillage blog → annales | ❌ |

---

## 6. KPI

Les 8 indicateurs demandés, avec leur source réelle.

| KPI | Définition | Source | Fréquence | Statut |
|---|---|---|---|---|
| **Reach** | personnes touchées | plateforme | hebdo | ✅ |
| **CTR** | clics / impressions | plateforme | hebdo | ✅ |
| **Visites** | `pageview` | GA4 + `analytics_events` | hebdo | ⚠️ **E1** |
| **Inscriptions** | `signup_completed` | SQL | hebdo | ✅ |
| **Activation** | ≥ 1 `lesson_started` | SQL | mensuel | ✅ |
| **Rétention** | J7 / J30 | SQL | mensuel | ⚠️ non implémenté |
| **Referral** | `referral_clicked` (`has_code: true`) | SQL | mensuel | ✅ |
| **Conversion** | `subscription_started` | SQL | mensuel | ✅ |

### 6.1 Le problème de volume

> **Rappel Phase 3g : 241 élèves inscrits, 7 progressions, 3 usages IA.**
>
> **Aucun seuil d'alerte ne peut être déclenché utilement.** Avec 7 comptes
> actifs, un « taux d'activation de 45% » n'a **aucune signification statistique.**

**Règle appliquée :** aucun objetivo chiffré n'est fixé sur les données actuelles.
Le suivi doit d'abord **installer la mesure** (§6.2), ensuite **fixer des cibles**.

### 6.2 Ordre de mise en place

| Ordre | Action | Raison |
|---|---|---|
| **1** | Corriger **E1** (`pageview`) et **E7** (Facebook) | sans E1, « visites » est invisible |
| **2** | Mesurer 4 semaines **sans objectif** | établir une base |
| **3** | Fixer des cibles | sur des données réelles |
| **4** | Activer n8n (Phase 3h) | automatiser le reporting |

### 6.3 Requête de base

```sql
-- Inscritions et activation par semaine
SELECT DATE_TRUNC('week', u.created_at)::date AS semaine,
  COUNT(*)::int AS inscriptions,
  COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM lesson_reads lr WHERE lr.user_id = u.id
  ))::int AS actives,
  ROUND(100.0 * COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM lesson_reads lr WHERE lr.user_id = u.id
  )) / NULLIF(COUNT(*), 0), 1) AS activation_pct
FROM users u
WHERE u.role = 'student'
  AND u.created_at >= NOW() - INTERVAL '90 days'
GROUP BY 1 ORDER BY 1;
```

### 6.4 Requête attribution parrainage

```sql
-- Inscriptions via parrainage
SELECT COUNT(DISTINCT e.user_id)::int AS inscriptions_parrainees
FROM analytics_events e
WHERE e.event = 'referral_clicked'
  AND e.props::text ~* 'has_code.*true'
  AND e.created_at >= NOW() - INTERVAL '30 days';
```

---

## 7. Ce qu'Edukora n'a pas

| Manque | Impact | Coût pour le corriger |
|---|---|---|
| **Aucun témoignage** | le pilier « vendredi » est vide | filmer un parent — **0 FCFA** |
| **Aucune photo d'élève** | pas de preuve sociale | demander l'accord — **0 FCFA** |
| **Aucun contenu technique** | P5 non adressable | **déjà en base** — à mettre en avant |
| **Pas de Search Console** | SEO non mesurable | 0 FCFA, inscription Google |
| **Aucun groupe WhatsApp élèves** | pas de distribution | 0 FCFA, à créer |

> **Aucun de ces manques n'exige de développement.** Tous exigent une décision.

---

## 8. Plan 90 jours — 0 FCFA

### Jours 1–7 : réparer et mesurer

| # | Action | Coût | Impact |
|---|---|---|---|
| 1 | Corriger **E7** (2 URLs Facebook) | 0 | chaque partage part au bon endroit |
| 2 | Corriger **E1** (`pageview`) | 0 | le trafic devient visible |
| 3 | Inscrire **Search Console** | 0 | le SEO devient mesurable |
| 4 | Créer **1 groupe WhatsApp** par promotion | 0 | distribution |

### Jours 8–30 : produire et publier

| # | Action | Fréquence | Coût |
|---|---|---|---|
| 5 | Calendrier de contenu | 1 / semaine | 0 FCFA |
| 6 | **Saisir 10 annales BEPC 2025/2026** | 1 / semaine | 0 FCFA |
| 7 | Recruter **10 ambassadeurs** | 1 fois | 10 premium |
| 8 | Contacter **5 établissements** | 1 / semaine | 0 FCFA |

### Jours 31–90 : mesurer et doubler

| # | Action | Coût |
|---|---|---|
| 9 | Analyser les 4 semaines de données | 0 |
| 10 | Doubler le canal qui convertit le mieux | 0 |
| 11 | Activer n8n (Phase 3h) | 0 |
| 12 | Fixer des objectifs chiffrés | 0 |

---

## 9. Conformité

- **Aucune campagne payante.**
- **Aucune modification de production** : les 3 documents sont la seule livraison.
- **Aucun développement** : les 3 actions SEO sont des **saisies en base** dans un
  modèle déjà existant.
- **Aucun commit, aucun push, aucun déploiement.**
- **Coût total : 0 FCFA** (hors temps humain, et hors 10 accès premium offerts
  aux ambassadeurs — un coût marginal, pas une dépense).

---

## Voir aussi
- `docs/personas-ci.md` — les 7 personas et leurs messages
- `docs/content-calendar-v1.md` — calendrier hebdomadaire et adaptation GA4
- `docs/growth-metrics.md` — définitions KPI détaillées (Phase 3h)
- `docs/analytics-funnel.md` — taxonomie des événements (Phase 3f)