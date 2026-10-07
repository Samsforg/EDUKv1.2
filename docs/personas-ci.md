# Edukora — Personas Côte d'Ivoire v1

> **Phase 3i — référence de personas.**
> Aucun code. Aucune collecte ajoutée. Aucune campagne payante. **0 FCFA.**
>
> Les personas sont dérivés du **catalogue réel** de la base, pas d'imaginaires.
> Sources : `grades`, `subjects`, `subject_grades`, `series`, `exam_papers`.

---

## 0. Ce que la base dit vraiment

### 0.1 Deux mondes séparés

`grades.track` contient exactement deux valeurs : **`general`** et **`technique`**.

| Track | Niveaux | Matières exclusives |
|---|---|---|
| `general` | 11 : `6eme` `5eme` `4eme` `3eme` `2nde` `1ere_s` `1ere_l` `1ere_es` `term_s` `term_l` `term_es` | 10 matières : maths, pc, svt, français, anglais, hg, edhc, espagnol, allemand, philo |
| `technique` | 6 : `2nde_g2` `2nde_ab` `1ere_g2` `1ere_b` `term_b` `term_g2` | 6 matières : **comptabilité, droit, économie, gestion, informatique, marketing** |

> **Conséquence stratégique :** aucune des 6 matières techniques n'existe sur le
> track general. Un élève de `term_b` ne voit rien du catalogue general, et
> l'inverse. **Les deux publics sont adressables séparément**, avec des messages
> qui ne se recoupent pas.

### 0.2 Matières à audience étroite

| Matière | Niveaux | Conséquence |
|---|---|---|
| `philo` | `term_s` `term_l` `term_es` uniquement | angle « philo » = terminales générales **uniquement** |
| `marketing` | `2nde_ab` `1ere_b` `term_b` | séries B et AB **uniquement** |
| `gestion` | 5 niveaux — absent de `2nde_ab` | écart de couverture à signaler |
| `informatique` | les 6 niveaux technique | angle différenciant fort |

### 0.3 Le vide le plus coûteux

| Catégorie | 2024 | 2026 |
|---|---|---|
| **BEPC** | 3 sujets | **0 sujet** |
| **BAC** | 4 sujets | 8 sujets |

> **Aucune annale BEPC 2025 ni 2026.** Le BEPC est l'examen le plus large
> (environ 606 583 candidats, contre environ 329 372 au BAC).
> C'est la **plus grosse opportunité SEO non exploitée** d'Edukora.
> Voir `acquisition-ci-v1.md` §5.

---

## 1. Personas

Priorité = taille de la population x accès au canal x valeur produit.

| # | Persona | Cycle | Examen | Priorité |
|---|---|---|---|---|
| P1 | **Candidat BAC** | lycée | BAC | **P0** |
| P2 | **Candidat BEPC** | collège | BEPC | **P0** |
| P3 | **Parent** | — | — | **P0** |
| P4 | **Élève lycée** | lycée | — | P1 |
| P5 | **Élève technique** | lycée | Bac technique | **P1** |
| P6 | **Élève collège** | collège | — | P2 |
| P7 | **Élève seconde chance** | — | BEPC ou BAC | P2 |

---

## 2. P1 — Candidat BAC

| | |
|---|---|
| **Niveaux** | `term_s`, `term_l`, `term_es` |
| **Matières** | les 10 matières general ; **philo** en plus pour les terminales |
| **Âge** | 17–19 ans |
| **Device** | mobile-first, partage sur WhatsApp |
| **Contrainte** | réseau instable, données limitées, examen dans 2–3 mois |

### Quote reconstitué
> « Je révise dans le silence, je ne sais pas si ma méthode est la bonne, et la
> correction de mon sujet m'a pris deux semaines. »

### Douleur
- corrections tardives, parfois jamais
- pas de retour sur sa méthode
- cours particuliers consultants hors de portée

### Ce qu'Edukora lui apporte
`simulateur-d-examen-bac-bepc`, annales et corrigés, fiches, tuteur IA.

### Message central
```
Prépare ton BAC avec ton tuteur personnel.
```

### Preuve à afficher
BAC 2026 : **8 sujets** déjà en base, séries C, D, A et B.

### Canaux
TikTok (30 s), YouTube (preuve), groupes WhatsApp de Terminale.

---

## 3. P2 — Candidat BEPC

| | |
|---|---|
| **Niveaux** | `3eme` |
| **Matières** | 10 matières general |
| **Âge** | 14–16 ans |
| **Contrainte** | une seule chance, pas de rattrapage |

### Quote reconstitué
> « Le BEPC c'est une seule fois. Si je rate, je redouble et je perds une année. »

### Douleur
- stress de l'unique examen
- révision non structurée
- aucune annale BEPC récente et corrigée

### Ce qu'Edukora lui apporte
simulateur, fiches de 3e, tuteur IA disponible en période d'examen.

### Message central
```
Le BEPC c'est une seule chance. Prépare-le avec ton tuteur IA.
```

### Preuve à afficher
**15 sujets au total — c'est là que l'argument doit porter.** Voir §0.3 : le
catalogue annales est faible sur BEPC. **Ne pas promettre une couverture
d'annales que la base ne contient pas.**

### Canaux
TikTok (pic massif), WhatsApp parental, groupes d'école.

---

## 4. P3 — Parent

| | |
|---|---|
| **Rôle** | décideur et prescripteur |
| **Devices** | Facebook, WhatsApp, téléphone |
| **Contrainte** | paie de la scolarité (150 000 à 700 000 FCFA par an) |

### Quote reconstitué
> « Je veux savoir que mon enfant travaille vraiment, et qu'il ne part pas
> sur internet toute la journée. »

### Douleur
- **opacité** : ne sait pas ce que l'enfant fait
- **budget scolaire limité** : pas de comparaison possible avec les autres
- **structure** : moins de temps disponible, pas plus de budget

### Ce qu'Edukora lui apporte
**`/resultats`** (résultats de l'enfant), suivi de classe, groupes de classe.

### Message central
```
Sais ce que ton enfant révise, chaque jour.
```

### Argument clé
> Edukora n'est pas un jeu vidéo : c'est un espace de travail signé,
> avec un historique de progression visible.

### Preuve à afficher
`/resultats`, `espace-live`, suivi de lecture.

### Canaux
Facebook (groupes parents), WhatsApp parental, radio de proximité.

> **P3 est le multiplicateur de P1 et P2.** Un parent convaincu entraîne deux à
> trois élèves. C'est le seul persona qui parle à un **groupe**, pas à un
> individu.

---

## 5. P4 — Élève lycée

| | |
|---|---|
| **Niveaux** | `2nde`, `1ere_s`, `1ere_l`, `1ere_es` |
| **Âge** | 15–17 ans |
| **Objectif** | notes en cours, pas encore la pression d'examen |

### Quote reconstitué
> « Je comprends rien en maths et j'ose pas demander au prof. »

### Douleur
- peur de demander
- cours trop lents ou trop rapides
- rien à faire après le cours

### Ce qu'Edukora lui apporte
fiches, quiz, tuteur IA immédiat et sans jugement.

### Message central
```
1 élève = 1 tuteur IA personnel.
```

### Canaux
TikTok, bouche-à-oreille, groupes de classe WhatsApp.

---

## 6. P5 — Élève technique

| | |
|---|---|
| **Niveaux** | `2nde_g2`, `2nde_ab`, `1ere_g2`, `1ere_b`, `term_b`, `term_g2` |
| **Séries** | **B** (technique, économique), **G2**, **AB** |
| **Matières** | **comptabilité, droit, économie, gestion, informatique, marketing** |

### Quote reconstitué
> « Personne ne fait les vidéos de comptabilité pour nous. On est les premiers
> à être oubliés. »

### Douleur
- **absence totale de ressources** : c'est le trou le plus net d'Edukora
- personne ne parle des séries B et G2
- personne ne fait d'explication

### Ce qu'Edukora lui apporte
6 matières exclusives, fiches, tuteur IA et annales.

### Message central
```
Comptabilité, droit, économie, gestion : enfin un tuteur.
```

### Preuve à afficher
**Le catalogue existe déjà et personne ne le met en avant.** C'est l'angle le
plus sous-exploité d'Edukora : contenu existant, demande réelle, **zéro
production nécessaire**.

### Canaux
Facebook (groupes séries B et G2), WhatsApp de promotion, YouTube.

> **Pourquoi cet angle est prioritaire :** c'est le seul persona où la demande
> est clairement plus forte que l'offre — donc où 0 FCFA produit le plus d'effet.

---

## 7. P6 — Élève collège

| | |
|---|---|
| **Niveaux** | `6eme`, `5eme`, `4eme` |
| **Âge** | 11–14 ans |

### Douleur
- bases fragiles
- pas d'autonomie
- parents pas disponibles

### Message central
```
Les bases d'abord.
```

### Preuve à afficher
fiches de 6e à 4e, français, maths, SVT.

### Canaux
TikTok, parent relais.

> **Priorité P2** : le catalogue existe mais la conversion est longue.
> À adresser via P3 (parent) avant en direct.

---

## 8. P7 — Élève en seconde chance

> **Persona demandé explicitement. Aucun niveau ne lui correspond en base.**

| Problème | Détail |
|---|---|
| **Aucun niveau « seconde chance »** | `grades` ne contient que des niveaux de la voie scolaire officielle |
| **Aucune voie ni profession** | aucun contenu spécifique |
| **Aucune annale DEC** | `exam_papers.category` ne contient que `BAC` et `BEPC` |

### La seule porte d'entrée aujourd'hui : `3eme`

Un élève de seconde chance qui vise le BEPC est **exactement** le persona P2.
Il n'a pas besoin d'une inscription séparée : il utilise `3eme`.

### Message central demandé
```
Ton parcours scolaire ne s'arrête pas ici.
```

### Douleur
- honte, échec, jugement
- il croit que c'est trop tard
- personne ne lui parle

### Levier spécifique et puissant
Edukora propose **`/resultats`**, les **annales** et le **simulateur** : un
adulte en reprise peut vérifier son niveau **sans se comparer à personne** et
**sans exposer son parcours**. C'est une caractéristique **structurelle** de la
plateforme, pas un argument marketing inventé.

### Adaptation de la communication

| Interdit | Autorisé |
|---|---|
| « redouble », « échec », « raté » | « nouvelle expérience », « décision » |
| images de la vie d'avant | focus sur l'étape d'après |
| comparaison avec un groupe d'âge | focus sur **lui** |

> **Recommandation : ne pas créer de parcours « seconde chance » dans le produit.**
> Adresser P7 **par le contenu** (messages, posts, groupes), pas par une
> fonctionnalité — l'outillage est déjà là, gratuit.

---

## 9. Matrice persona x message

| Angle demandé | P1 BAC | P2 BEPC | P3 Parent | P4 Lycée | P5 Technique | P6 Collège | P7 Seconde chance |
|---|---|---|---|---|---|---|---|
| **IA — 1 élève = 1 tuteur IA personnel** | ⭐ | ⭐ | ⭐⭐ | ⭐⭐ | ⭐ | ⭐ | ⭐⭐ |
| **Seconde chance** | — | ⭐ | — | ⭐ | ⭐ | — | ⭐⭐⭐ |
| **Examens — Prépare ton BEPC/BAC avec ton tuteur personnel** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ | ⭐ | ⭐⭐ | — | ⭐⭐ |
| **Technique** | — | — | ⭐ | ⭐⭐ | ⭐⭐⭐ | — | ⭐ |
| **Parent — accompagnement** | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐ | ⭐⭐ |

**Lecture :** ⭐ = pertinent, ⭐⭐ = fort, ⭐⭐⭐ = angle principal.

> **Aucun angle n'est fort partout.** C'est normal et c'est une force : un seul
> message universel serait mou. Il faut **un message par persona**.

---

## 10. Messages prêts à l'emploi

### IA
```
1 élève = 1 tuteur IA personnel.
Pose ta question, reçois une explication, recommence jusqu'à comprendre.
```
- **P4** (le mieux placé), **P7** (l'argument de fond)

### Seconde chance
```
Ton parcours scolaire ne s'arrête pas ici.
Reprends à ton rythme. Le même tuteur, la même méthode, aucun jugement.
```
- **P7** exclusivement

### Examens
```
Prépare ton BEPC ou ton BAC avec ton tuteur personnel.
Annales, fiches, simulation — et un correctif immédiat.
```
- **P1**, **P2** — le message le plus fort : examen = échéance = urgence

### Technique
```
Comptabilité, droit, économie, gestion, informatique.
Enfin des fiches et un tuteur pour les séries B et G2.
```
- **P5** exclusivement

### Parent
```
Ton enfant révise seul ? Pas toujours.
Edukora garde une trace : matières, progression, temps, résultats.
```
- **P3** exclusivement

---

## 11. Ce que chaque persona exige du produit

| Persona | Fonctionnalité obligatoire | Si absente |
|---|---|---|
| P1 BAC | Annales BAC et corrigés | l'angle « examen » s'effondre |
| P2 BEPC | **Annales BEPC récentes** | **promesse non tenable** (§0.3) |
| P3 Parent | `/resultats` lisible | l'argument « suivi » tombe à plat |
| P4 Lycée | Réponse IA immédiate | « tuteur personnel » est faux |
| P5 Technique | Fiches des 6 matières techniques | contenu inexploitable |
| P6 Collège | Fiches de 6e à 4e | longue conversion, faible volume |
| P7 Seconde chance | aucune exclusive | **OK** — passer par `3eme` |

> **Point critique :** P2 est persona P0 **et** son pilier de preuve est absent
> (0 annale BEPC 2025 et 2026). Voir `acquisition-ci-v1.md` §5.

---

## Voir aussi
- `docs/acquisition-ci-v1.md` — canaux, angles, SEO, ambassadeurs, KPI
- `docs/content-calendar-v1.md` — calendrier hebdomadaire et adaptation GA4
- `docs/monetisation-v1.md` — segments et pricing (Phase 3g)
- `docs/analytics-funnel.md` — taxonomie des événements (Phase 3f)