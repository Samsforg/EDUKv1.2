# Edukora — Content Calendar v1

> **Phase 3i — moteur de contenu.**
> Aucun code. Aucune collecte ajoutée. Aucune campagne payante. **0 FCFA.**
>
> Calendrier hebdomadaire demandé, décliné par persona et par canal, avec les
> règles d'adaptation aux données GA4.

---

## 0. Le calendrier demandé

```text
Lundi     : conseil scolaire
Mardi     : contenu pédagogique
Mercredi : démonstration Kora
Jeudi     : exercice
Vendredi  : témoignage / valeur
Samedi    : orientation
Dimanche  : révision
```

> ### « Démonstration Kora » — vérifié en Phase 3j
>
> **Kora est le tuteur IA d'Edukora.** Le nom est déjà partout en production :
> `src/lib/ai/prompts.ts:26` (« Tu es Kora, le tuteur IA bienveillant »),
> `src/lib/quotas.ts` (`KORA_DAILY_LIMIT`, `getKoraQuota()`),
> `src/components/TutorDemoPage.tsx` (« Bonjour, je suis Kora »),
> `src/app/page.tsx:94` (FAQ JSON-LD), 236 occurrences dans `src/`.
>
> **Il n'y a donc rien à créer** : « démonstration Kora » = **démonstration du
> tuteur IA**, et une page de démonstration existe déjà : `/tuteur-ia-edukora`
> embarque `TutorDemoPage`.
>
> | Élément | Disponibilité |
> |---|---|
> | Tuteur IA Kora | ✅ en production |
> | Page de démo | ✅ `/tuteur-ia-edukora` |
> | Enregistrement d'écran pour TikTok | ✅ 0 FCFA |
>
> **Ce document implémente la démonstration du tuteur IA le mercredi.**
> Le calendrier demandé est **respecté sans adaptation**.

---

## 1. Rythme hebdomadaire

| Jour | Pilier | Objectif unique | Persona principal | Format principal |
|---|---|---|---|---|
| **Lundi** | Conseil scolaire | Faire revenir | P3 Parent, P4 | Texte long, Facebook |
| **Mardi** | Contenu pédagogique | Donner valeur | P1, P2, P5 | Fiche + capture, TikTok |
| **Mercredi** | Démonstration tuteur IA | Prouver | tous | Vidéo 30–60 s |
| **Jeudi** | Exercice | Faire pratiquer | P1, P2, P6 | Exercice corrigé |
| **Vendredi** | Témoignage / valeur | Rassurer | P3, P7 | Témoignage, vidéo |
| **Samedi** | Orientation | Aider à choisir | P5, P6, P7 | Guide, carousel |
| **Dimanche** | Révision | Créer l'habitude | P1, P2 | Rappel WhatsApp |

> **Un jour, un pilier, un objectif.** Jamais deux objectifs le même jour : on ne
> sait pas lequel a fonctionné.

---

## 2. Vue hebdo — contenu type

### Lundi — conseil scolaire

**Angle :** P3 (parent) et P4.

**Sujet :** « 4 erreurs qui font perdre des points en maths au BEPC »

| Canal | Adaptation |
|---|---|
| Facebook | version longue (600–800 mots), pour les groupes parents |
| WhatsApp | version courte (400 caractères) + lien |
| TikTok | 45 s, 3 erreursmaximum |
| Blog | 1 200 mots, cible SEO « conseils BEPC maths » |

**CTA :** `Sais ce que ton enfant révise → /resultats`

---

### Mardi — contenu pédagogique

**Angle :** P1, P2, P5.

**Sujet :** « Terminale S — la fonction dérivée, méthode pas à pas »

| Canal | Adaptation |
|---|---|
| TikTok | 60 s, tableau à l'écran, voix off |
| Facebook | la même fiche avec l'image |
| WhatsApp | la fiche en PDF, forwarded |
| Blog | page de fiche rattachée au chapitre |

**CTA :** `Répéter cette fiche → /cours`

> **Coût réel : 0 FCFA** si la fiche existe déjà en base. Le calendrier **exploite
> le catalogue** — il ne demande pas de produire 7 contenus nouveaux par semaine.

---

### Mercredi — démonstration du tuteur IA

**Angle :** tous. **C'est le jour qui prouve le produit.**

**Format :** capture d'écran réelle, 30 à 60 s.

**Script (à enregistrer une fois, puis réutiliser) :**

| Temps | Action | Texte à l'écran |
|---|---|---|
| 0–5 s | Posez une question d'examen | « 3 points : tu bloques sur quoi ? » |
| 5–20 s | Le tuteur répond, pas à pas | réponse qui se construit |
| 20–35 s | **Insiste, se trompe, recommence** | « et si j'avais écrit ça ? » |
| 35–45 s | Second exemple, autre matière | changement de matière |
| 45–55 s | Texte final, réponse complète | « voilà, tu as la méthode » |
| 55–60 s | CTA | `1 élève = 1 tuteur IA personnel` |

> **Le moment le plus important est 20–35 s :** c'est là que se joue la promesse
> « personnel ». Un élève qui **se trompe et se corrige** comprend la différence
> entre un tuteur et un moteur de recherche.

**À réutiliser tel quel sur** TikTok, Facebook, YouTube (Shorts) et WhatsApp.

---

### Jeudi — exercice

**Angle :** P1, P2, P6.

**Sujet :** exercice d'entraînement, **avec le corrigé dans le même post**

| Règle | Détail |
|---|---|
| corrigé visible | ne jamais faire deviner |
| durée annoncée | « 15 min » |
| difficulté annoncée | « niveau BEPC » ou « niveau BAC » |
| CTA | `Tenter le simulateur → /simulateur-d-examen-bac-bepc` |

> Un exercice sans corrigé génère de l'engagement mais **zéro activation**.
> Le corrigé dans le post est ce qui amène sur `/simulateur`.

---

### Vendredi — témoignage / valeur

**Angle :** P3, P7.

**Sujets possibles, par ordre de priorité**

| # | Témoignage | Persona | Pourquoi |
|---|---|---|---|
| 1 | Parent qui voit enfin la révision de son enfant | **P3** | lève l'opacité, argument le plus fort |
| 2 | Élève de série B qui trouve enfin de la compta | **P5** | angle sous-exploité |
| 3 | Second parcours, sans visage | **P7** | `Ton parcours ne s'arrête pas ici` |
| 4 | Élève qui rate puis réussit une simulation | P1, P2 | preuve par le progression |

> **Règle absolue :** ne jamais inventer un témoignage, un nom, un score ou une
> phrase. **Aucun témoignage n'existe encore** en base.
> - soit **un parent filmé le dit**, soit on publie un **format de valeurs** :
> une conviction d'Edukora, pas une histoire inventée.
> - **Format valeurs (0 FCFA, aucun témoignage) :**
>   « Ce qu'Edukora croit » — rencontre l'angoisse de P7 (« il croit que c'est trop tard »).

---

### Samedi — orientation

**Angle :** P5, P6, P7.

**Sujet :** « Quelle filière choisir après la 3e ? Général ou technique ? »

| Canal | Adaptation |
|---|---|
| Facebook | carousel 6 visuels — **le format le plus partagé** |
| Blog | page pilier, cible SEO longue traîne |
| WhatsApp | version 5 points |

**Pourquoi le samedi :** jour de décision familiale. Le parentsdecide avec
l'enfant. C'est le créneau où P6 se transforme en P5 ou en P1.

**CTA :** `Découvrir les filières → /fonctionnalites`

---

### Dimanche — révision

**Angle :** P1, P2.

**Format :** rappel WhatsApp court, **sans contenu nouveau**

```
📅 Dimanche — 20 min de révision.

BEPC : 3 sujets à couvrir cette semaine.
BAC : la fonction dérivée, puis les probabilités.

Commence par ton point faible, pas par le plus facile.
→ ton planning
```

> **Objectif du dimanche : l'habitude, pas la performance.** Un rappel inutile
> vaut mieux qu'un post oublié. C'est le jour le plus rentable en rétention et le
> moins coûteux à produire.

---

## 3. Calendrier — 4 semaines types

### Semaine 1 — lainage BAC (P1)

| Jour | Sujet | Canal principal |
|---|---|---|
| Lundi | Conseils aux parents de Terminale | Facebook |
| Mardi | Maths Terminale S — dérivées | TikTok |
| Mercredi | Démo tuteur IA | TikTok + FB |
| Jeudi | Exercice dérivées + corrigé | TikTok |
| Vendredi | Valeur : la méthode qui tient | Facebook |
| Samedi | Choisir entre Série S et L | Facebook carousel |
| Dimanche | Rappel révision | WhatsApp |

### Semaine 2 — BEPC (P2)

| Jour | Sujet | Canal principal |
|---|---|---|
| Lundi | 4 erreurs qui coûtent des points | Facebook |
| Mardi | Maths 3e — les bases | TikTok |
| Mercredi | Démo tuteur IA | TikTok + FB |
| Jeudi | Exercice niveau BEPC | TikTok |
| Vendredi | Valeur : le BEPC est une chance | Facebook |
| Samedi | Après le BEPC : quelles options | Facebook carousel |
| Dimanche | Rappel révision | WhatsApp |

### Semaine 3 — Technique (P5)

| Jour | Sujet | Canal principal |
|---|---|---|
| Lundi | Parents : la filière technique, décryptée | Facebook |
| Mardi | Comptabilité Tle-B — première notion | TikTok |
| Mercredi | Démo tuteur IA en compta | TikTok + FB |
| Jeudi | Exercice compta | TikTok |
| Vendredi | Valeur : les séries B sont neglected | Facebook |
| Samedi | G2, AB ou B : comment choisir | Facebook carousel |
| Dimanche | Rappel révision | WhatsApp |

### Semaine 4 — Seconde chance (P7)

| Jour | Sujet | Canal principal |
|---|---|---|
| Lundi | Reprendre sa scolarité à 25 ans | Facebook |
| Mardi | Maths bases pour adultes | TikTok |
| Mercredi | Démo tuteur IA | TikTok + FB |
| Jeudi | Exercice niveau BEPC | TikTok |
| Vendredi | **Valeur** : ton parcours ne s'arrête pas ici | Facebook |
| Samedi | Quelle filière après une reprise | Facebook carousel |
| Dimanche | Rappel révision | WhatsApp |

> **Ne pas activer P5 et P7 la même semaine.** Chaque semaine = **un** persona
> principal. Sinon le signal GA4 est illisible.

---

## 4. Production : 0 FCFA

| Besoin | Solution | Coût |
|---|---|---|
| Visuels de démonstration | **capture d'écran réelle** du tuteur IA | 0 FCFA |
| Vidéo | **enregistrement écran** du téléphone | 0 FCFA |
| Design | Canva gratuit | 0 FCFA |
| Rédaction | **Edukora AI**, déjà branché (Phase 3h) | 0 FCFA |
| Programmation | n8n auto-hébergé + Groq gratuit (Phase 3h) | 0 FCFA |
| Publication | manuelle, après validation | 0 FCFA |

> **Le seul coût réel est humain : environ 2 h par semaine** pour valider et
> publier. C'est le coût à assumer explicitement.

---

## 5. Adaptation aux données GA4

### 5.1 Ce qu'il faut corriger avant de pouvoir adapter

> ⚠️ **Deux blocages,similaires à ceux de la Phase 3h :**

| # | Blocage | Effet |
|---|---|---|
| **E1** | `pageview` émis, `page_view` lu | le trafic est **invisible** dans l'app |
| **E6** | UTM capté **seulement à l'inscription** | impossible de savoir quel canal a.Converti |

> **Conséquence : l'adaptation GA4 ne peut pas être fine.** Elle peut être
> **macro** (source, page, appareil) mais pas **par canal et par message** tant que
> E1 et E6 ne sont pas corrigés.

### 5.2 Boucle d'adaptation

Toutes les **4 semaines**, à partir des données GA4 disponibles.

| Signal observé | Lecture | Décision |
|---|---|---|
| TikTok organqiue en hausse | l'angle court fonctionne | +1 post TikTok, -1 Facebook |
| Facebook parental en hausse | P3 répond | +1 post Facebook long |
| YouTube faible | format long non consommé | réduire le format long |
| WhatsApp fort, site faible | l interest est là, la conversion manque | tester la CTA `/resultats` |
| Clic entrant mais inscription faible | la landing ne suit pas | retravailler `landing-page-edukora-marketing` |
| Inscription forte mais activation faible | l problema est **le produit**, pas le contenu | arrêter la production, corriger l'onboarding |

> **Dernière ligne la plus importante :** si l'activation est faible, **arrêter de
> produire du contenu.** Davantage de contenu sur un produit qui ne convertit pas
> ne fait que diligence.

### 5.3 Tests d'angle

Un seul angle à la fois, sur 4 semaines.

| Test | Variante A | Variante B | Durée |
|---|---|---|---|
| **IA** | `1 élève = 1 tuteur IA personnel` | `Il ne se tait jamais` | 4 semaines |
| **Examens** | `Prépare ton BEPC` | `Le BEPC c'est une seule chance` | 4 semaines |
| **Parent** | `Sais ce qu'il révise` | `Il révise seul ?` | 4 semaines |
> produire du contenu.** Davantage de contenu sur un produit qui ne convertit pas
> ne fait qu'aggraver le constat.

---

Un seul angle à la fois, sur 4 semaines.

| Canal | Fréquence | Pourquoi |
|---|---|---|
| **TikTok** | 4 à 5 / semaine | l'algorithme récompense la régularité |
| **Facebook** | 3 / semaine | groupes parents + algorithmme |
| **WhatsApp** | 2 / semaine | rappel, pas de spam |
| **YouTube Shorts** | 2 / semaine | réutilisation du même footage |
| **Blog / SEO** | 1 / semaine | le SEO se construit lentement |

> **Un même tournage = 4 contenus.** C'est la seule façon de tenir ce rythme à
> 0 FCFA avec 2 h par semaine.

---

## 7. Vérifier que ça marche

Voir `acquisition-ci-v1.md` §6 pour le KPI complet.

**Minimum hebdomadaire :**

| Indicateur | Source | Fréquence |
|---|---|---|
| Reach | plateforme | hebdo |
| CTR | plateforme | hebdo |
| Visites site | `pageview` + GA4 | hebdo |
| Inscriptions | `signup_completed` | hebdo |
| Activation | 1re leçon | mensuel |
| Referral | `referral_clicked` | mensuel |

> **Ne pas juger un contenu sur le reach seul.** Le reach est vanity ; ce qui
> compte est **inscription puis activation**.

---

## Voir aussi
- `docs/acquisition-ci-v1.md` — canaux, angles, SEO, ambassadeurs, KPI
- `docs/personas-ci.md` — personas et messages par angle
- `docs/n8n-workflows-v1.md` — W5 : génération de contenu (Phase 3h)
- `docs/analytics-funnel.md` — taxonomie des événements (Phase 3f)