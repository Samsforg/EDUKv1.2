# Edukora — Stratégie de monétisation v1

> **Phase 3g — document de stratégie.**
> Aucune modification de production. Aucun prestataire de paiement connecté.
> Aucun commit, push ni déploiement.
>
> Document de **proposition à valider**, pas une décision d'exécution.
> Les prix cités sont des **hypothèses à tester**, pas des tarifs à imposer.

---

## 0. Résumé exécutif

**Recommandation principale : ne pas lancer de nouvelle monétisation avant d'avoir
corrigé l'activation.**

Edukora est un produit **très complet** (129 pages, 1 361 leçons, 725 chapitres,
2 212 questions, 16 matières, 17 niveaux, tuteur IA, simulateur d'examen, espace parent,
espace professeur, espace live) dont l'**adoption réelle est quasi nulle**.

| Indicateur | Valeur observée (base locale de développement) |
|---|---|
| Comptes enregistrés | 290 |
| ... élèves | 241 |
| ... professeurs | 45 |
| ... parents | 3 |
| Comptes avec au moins une progression de lecture | **7** (2,4 %) |
| Comptes ayant utilisé le tuteur IA | **3** (1,0 %) |
| Comptes ayant passé un quiz | **0** |
| Abonnements actifs | 5 |
| Contenu disponible | 1 361 leçons · 725 chapitres · 2 212 questions |

> **Le problème n°1 n'est pas le prix : c'est que les élèves ne reviennent pas.**
> Ajouter des offres ou augmenter les tarifssi amplifierait un entonnoir qui fuit en amont.

Le modèle économique, lui, est **sain à prix constant** : l'IA ne représente que ~3 %
du revenu d'un abonné, et la valeur perçue est très supérieure au prix affiché.
**La marge n'est pas le problème ; le volume et la rétention le sont.**

Deux priorités absolues avant toute mise en vente :

1. **Corriger l'écart de contrôle d'accès** (`/espace-prof`, `/espace-admin`,
   `/espace-parent` ne sont pas couverts par le proxy) — risque de fuite de contenu premium.
2. **Réactiver le produit** : transformer le trafic en comptes actifs, puis en abonnés.

---

## 1. Audit du produit

### 1.1 Ce qui existe réellement

| Domaine | Implémentation constatée | Maturité |
|---|---|---|
| Cours | filière → matière → chapitre → leçon. Vidéo, `MarkdownRenderer`, export PDF, hors-ligne, complétion | Complet |
| Matières | Catalogue 16 matières, progression, meilleur score de quiz | Complet |
| Quiz | **QCM uniquement**, correction automatique, scoring par points, XP proportionnel, **révision espacée SM-2**, défis de ligue, badges, upsell après 3 sans-faute | Complet et bien conçu |
| Tuteur IA (Kora) | Chat, historique en base, RAG (6 sources), mémoire étudiant, **chaîne de 7 providers**, quota, rate-limit, XP, fallback local | Complet |
| Exercices / corrections | Correction de dissertation (plan, critères, points forts, améliorations, réponse modèle) | Complet |
| Simulateur | Sujets d'examen chronométrés BAC/BEPC + résultats | Complet |
| Annales | Sujet + série + correction, arborescence | Complet |
| Suivi | Progression, streak, révision espacée, gaps de progression, résultats | Complet |
| Profil | 637 lignes, avatar, réglages, rappels | Complet |
| Parrainage | Code de jumelage, XP parrain/filleul, −20 % premier mois | Complet |
| Espace professeur | 14 pages, ~30 API : classes, devoirs, création de contenu, statistiques, live | Complet, **non monétisé** |
| Espace parent | 6 pages (assiduités, examens, jumelage, profil, notifications) | Complet, **non monétisé, 3 comptes** |
| Espace live | Lives + replays | Présent, **non monétisé** |
| Abonnements | Plans en base, GeniusPay + USSD, essai 3 j, codes promo, parrainage, webhook HMAC | **Robuste** |
| Reporting | `conversion-report.ts`, `abandoned-checkout.ts`, `espace-admin/revenus` | Présent |

### 1.2 Classification

#### FREE — à maintenir gratuits (acquisition, SEO, rétention)

| Fonctionnalité | Raison |
|---|---|
| Annales (accès partiel) | principale source de SEO long-tail (« sujet BAC 2024 corrigé ») |
| 1ʳᵉ leçon de chaque chapitre | **déjà implémenté** : `FREE_LESSONS_PER_CHAPTER = 1` → 683 leçons gratuites sur 1 361 |
| Correction automatique des QCM | c'est la promesse ; la facturer casse la valeur |
| Classement, badges, XP, ligues, défis | moteurs de rétention, non facturables |
| Inscription, connexion, compte, profil | portails d'entrée |
| Blog, forum | coût porté par l'acquisition |
| Révision espacée, tableau de bord élève | socle d'usage |

#### PREMIUM POTENTIEL — déjà construites, monétisables

| Fonctionnalité | Quota FREE | Quota PREMIUM |
|---|---|---|
| Kora IA (tuteur) | 5 questions/mois | 30/mois · 100/trimestre |
| Fiches de révision | 10/mois | illimitées |
| Simulateur BAC/BEPC | 1/mois | illimité |
| Correction de dissertation | 1/mois | 5/mois · 15/trimestre |
| Export PDF / hors-ligne | non | oui |
| Support prioritaire | non | oui |

#### NON MONÉTISABLE — hors périmètre

| Fonctionnalité | Raison |
|---|---|
| Espace admin | outil interne |
| Passerelle de paiement, USSD, webhook | infrastructure |
| Notation, quiz, notes | outils de confiance |
| Modération du forum | coût sans revenu direct |
| Proctoring / surveillance d'examen | bénéfice plus que douteux |

#### À ARBITRER EXPLICITEMENT

| Espace | Statut | Recommandation |
|---|---|---|
| `espace-live` / replays | non monétisé | candidat palier PREMIUM (§3.4) |
| `espace-parent` | non monétisé | **candidat offre Parent** — levier d'ARPU n°1 (§3.5b) |
| `espace-prof` | non monétisé | **gratuit** — c'est l'offre qui amène les élèves |

### 1.3 L'écart qui compte vraiment

La base contient **1 361 leçons** et **2 212 questions**, mais seulement **7 comptes
ont lu au moins une leçon**, **3 ont utilisé l'IA** et **aucun n'a passé un quiz**.

> Le contenu est profond, l'usage est nul. **Tout effort commercial appliqué aujourd'hui
> subirait sur un entonnoir vide.**

La Phase 3f a déjà instrumenté exactement les événements nécessaires pour mesurer cela :
`landing_viewed`, `cta_clicked`, `signup_started`, `signup_completed`,
`subject_selected`, `grade_selected`, `lesson_started`, `return_visit`, `referral_clicked`.
Ces événements **sont** le KPI de l'activation.

### 1.4 Écarts techniques à corriger avant de monétiser

Constat d'audit — **aucune modification apportée** :

```
src/proxy.ts:186  const TEACHER_ROUTES = ["/prof", "/api/prof"];
src/proxy.ts:187  const ADMIN_ROUTES  = ["/admin", "/api/admin"];
```

Or les routes réelles sont `/espace-prof/*`, `/espace-admin/*`, `/espace-parent/*`,
`/espace-live/*`, `/espace-eleve/*`. **Aucun de ces espaces n'est couvert par le proxy.**

- `/espace-admin/*` refait le contrôle en page (`role !== "admin"` → redirection),
  mais **pas** dans `cours/[id]` et `utilisateurs/[id]`.
- `/espace-prof/*` : contrôle présent dans 7 pages sur 14.
- `/espace-parent/*` : **aucun contrôle de rôle détecté**.

**Impact commercial direct :** du contenu premium et des outils d'administration non
facturés sont potentiellement accessibles sans contrôle serveur. À corriger **avant**
toute mise en vente — c'est une fuite de revenu, pas seulement une faille technique.

---

## 2. Proposition de valeur

### 2.1 Le problème

Un élève ivoirien en 3ᵉ ou en 2nde qui veut réussir BEPC ou BAC :

- n'a pas de professeur particulier — 7 500 à 9 500 FCFA/heure, minimum 4 séances/mois
  soit environ 60 000 FCFA ;
- n'a pas de cours clair, progressif et aligné sur le programme ivoirien ;
- n'a personne pour lui dire **où il a faux** et **pourquoi** ;
- révise de façon désordonnée, sans répétition espacée ni mesure de progression.

### 2.2 La promesse

> **« Révise le programme ivoirien, chapitre par chapitre, et découvre exactement où
> tu en es — avec un tuteur IA disponible à toute heure, pour le prix d'un dixième
> d'une heure de cours particulier. »**

### 2.3 Les quatre piliers

| Pilier | Preuve dans le produit | Force |
|---|---|---|
| **Programme ivoirien** | 16 matières, 725 chapitres alignés sur les programmes, `officiel_ref` « BO MENAET 2023 » | **Très forte** — conformité au curriculum, rare |
| **Contenu de masse** | 1 361 leçons (678 premium / 683 gratuites), 2 212 questions, 78 badges | **Forte** |
| **Personnalisation** | Kora IA + RAG + mémoire étudiant, révision espacée SM-2, gaps de progression | **Forte** — le différenciateur |
| **Prix** | 4 900 FCFA/mois ≈ **65 % d'une seule heure** de cours particulier | **Très forte** |

### 2.4 Cible prioritaire

> **Le parent est le client, l'élève est l'utilisateur.**

C'est le renversement qui manque aujourd'hui : 3 comptes parent en base pour 241 élèves.
Les parents paient et veulent une **preuve de progrès** ; les élèves veulent une
**réponse immédiate**.

---

## 3. Offres

### 3.1 Architecture

```
FREE              Découverte           0 FCFA       existe, fonctionnel
EDUKORA PLUS      Réussite        4 900 FCFA/mois   existe, fonctionnel  ← offre cœur
EDUKORA PREMIUM   à définir                hypothèse  NON CONSTRUIT
+ offres          Pass examen, Parent, Professeur
```

**Point d'honnêteté :** l'échelle FREE / PLUS / PREMIUM **ne peut pas être construite
aujourd'hui**. Le contenu du palier supérieur n'existe pas encore — le live, le tableau
de bord parent et les certificats ne sont pas factorisés comme des avantages premium.
Le palier PREMIUM est donc une **hypothèse à valider**, pas une fonctionnalité à annoncer.

### 3.2 Limites FREE — à maintenir, avec un ajustement

| Limite | Actuel | Avis |
|---|---|---|
| Fiches de révision | 10/mois | **Conserver** — assez pour créer une habitude, pas assez pour tout couvrir |
| Questions Kora IA | 5/mois | **À tester à la hausse** — 5 questions ≈ 1 par semaine : l'élève peut **jamais** ressentir la valeur du produit phare |
| Simulateur | 1/mois | **Conserver** — 1 examen blanc suffit à créer l'envie d'en faire plus |
| Correction dissertation | 1/mois | **Conserver** — c'est le premier « vrai » résultat |
| Leçons | 1 gratuite/chapitre | **Conserver** — mécanique déjà en place, 683 leçons en libre accès |

### 3.3 EDUKORA PLUS — l'offre cœur (existante)

| Élément | Mensuel 4 900 | Trimestriel 14 700 |
|---|---|---|
| Fiches | illimitées | illimitées |
| Kora IA | 30/mois | 100/trimestre |
| Simulateur | illimité | illimité |
| Corrections dissertation | 5/mois | 15/trimestre |
| Support | prioritaire | prioritaire |

**Défaut à corriger :** `Réussite Trimestriel` = 14 700 = exactement 3 × 4 900.
**Aucune remise n'existe pour un engagement trimestriel**, alors que c'est
précisément l'engagement le moins risqué pour le producteur et le plus rassurant pour
l'élève dont l'examen est en juin. C'est le défaut de tarification le plus manifeste.

### 3.4 EDUKORA PREMIUM — hypothèse, non construite

Un palier supérieur ne peut pas être artificiel (« 2× plus de questions » n'a pas de
valeur pédagogique). Il doit regrouper des **capacités qui n'existent pas encore** :

| Capacité | Base technique | Justification |
|---|---|---|
| Kora IA quasi illimité | quota existant | supprime la principale frustration payante |
| Séances live avec professeur | `espace-live` existe | seul avantage non réplicable par du contenu |
| Tableau de bord parent | `espace-parent` existe | le parent **paie**, il doit **voir** |
| Packs d'annales imprimables | module annales | usage réel en travail hors-ligne |
| Certificat / bulletin de progrès | non construit | argument fort pour le parent |

**Recommandation :** ne pas annoncer PREMIUM tant que 2 à 3 de ces capacités ne sont pas
réellement livrées. Un palier vide décrédibilise le palier du milieu.

### 3.5 Offres complémentaires

**a) Pass examen saisonnier — la opportunité la plus sous-exploitée**

Le calendrier ivoirien crée une fenêtre naturelle :

| Examen | Épreuves | Candidats session 2026 |
|---|---|---|
| **BEPC** | 26–29 mai 2026 | **606 583** inscrits — 52,17 % de réussite |
| **BAC** | 15–19 juin 2026 | **329 372** (303 625 général · 25 150 technique · 597 artistique) |

Un pass « BEPC/BAC » à durée limitée, vendu **avant** les épreuves, transforme un
abonnement subi en **intention d'achat à forte motivation et cycle de décision court**.
C'est le meilleur candidat au premier test commercial.

**b) Offre parent — le paiement par un tiers**

Rien n'empêche un parent de payer pour son enfant, mais **rien ne l'exploite**.
Un parcours dédié — compte parent lié à un ou plusieurs enfants — est le levier d'ARPU
le plus important du modèle.

**c) Offre professeur — B2B, différée**

Gratuit maintenant. Envisageable à terme : abonnement par classe et par année scolaire.

### 3.6 Mécanismes existants à conserver

| Mécanisme | État | Avis |
|---|---|---|
| Parrainage −20 % + 300 XP | opérationnel | excellent levier d'acquisition, à **systématiser** plutôt qu'à monétiser |
| Essai gratuit 3 jours | opérationnel | tester sa suppression (H5) |
| Codes promo (`max_uses`) | opérationnel | outil d'acquisition |
| Relance panier abandonné (3 étapes) | opérationnel | **actif sous-utilisé** — même mécanisme, WhatsApp + e-mail |
| Reçu par e-mail (Brevo) | opérationnel | confiance |

---

## 4. Hypothèses de prix

> **Aucun prix n'est imposé ici.** Les montants sont justifiés par ancrage externe.

### 4.1 Ancrage concurrentiel — cours particuliers Abidjan

| Offre | Tarif publié |
|---|---|
| Bamacours — programme ivoirien | à partir de **7 500 FCFA / heure** |
| Bamacours — programme français | à partir de 9 500 FCFA / heure |
| Monprofchezmoi — séance de 2 h | 15 000 FCFA (7 500 FCFA/h), **minimum 4 séances/mois** |
| AbiCours — cycle 8 semaines | 145 000 FCFA / 16 h ≈ 9 000 FCFA/h |
| AbiCours — Objectif Examen 18 semaines | 580 000 FCFA / 72 h ≈ 8 000 FCFA/h |
| OKALM — collège | 3 750 FCFA/h, avec dégressivité |

**Plancher de référence : 7 500 FCFA/heure. Engagement mensuel typique : 60 000 FCFA.**

### 4.2 Positionnement d'Edukora

| | Montant | Comparaison |
|---|---|---|
| **Edukora Réussite** | **4 900 FCFA/mois** | ≈ **9 minutes** de cours particulier |
| Concurrentiel 4 h/semaine | 60 000 FCFA/mois | Edukora = **8 %** de l'offre concurrente |
| Coût de 30 questions IA | ~135 FCFA | **2,8 %** du revenu |

> **Conclusion : le prix actuel est bas et la valeur perçue forte.**
> Ce n'est pas un problème de prix, c'est un problème de **volume et de rétention**.

### 4.3 Hypothèses à tester — un seul paramètre à la fois

| # | Hypothèse | Test | Critère de décision |
|---|---|---|---|
| **H1** | Remise trimestrielle (~13 000 au lieu de 14 700) | A/B sur `/tarifs` | taux mensuel → trimestriel |
| **H2** | Plan annuel (~46 000) | A/B sur `/tarifs` | part d'abonnement annuel |
| **H3** | FREE à 10–15 questions IA/mois | cohortes | activation IA et conversion à J30 |
| **H4** | Pass examen 9 900 FCFA / 8 semaines | mai–juin | conversion vs abonnement classique |
| **H5** | Supprimer l'essai 3 jours | A/B | conversion essai → payant |
| **H6** | Augmenter le prix (7 900) | **seulement si activation dépassée** | conversion maintenue |

**Règle :** ne jamais changer le prix et les limites simultanément — on ne sait plus
ce qui a expliqué le résultat.

---

## 5. Marché ivoirien

### 5.1 Taille de la cible — session 2026 (source DECO)

| Segment | Candidats | Rôle |
|---|---|---|
| CEPE (primaire) | 609 384 | **Hors périmètre** — le produit commence au collège |
| **BEPC** (3ᵉ / fin de collège) | **606 583** | **Cœur de cible** |
| **BAC** (2nde–Tle) | **329 372** | **Cœur de cible, intention forte** |
| — dont technique | 25 150 | segment réel et **sous-exploité** (`term_b`, `term_g2` existent) |
| — dont artistique | 597 | niche |
| Test d'Orientation 2nde | 23 492 | point d'entrée du funnel |

**Marché adressable cœur : ~936 000 candidats/an**, sans compter tout le collège et le
lycée. La **seconde chance** n'est pas traitée par les examens nationaux ivoiriens :
priorité faible.

### 5.2 Capacité de paiement

| Indicateur | Valeur | Source |
|---|---|---|
| Population | ~28–29 M | — |
| Comptes mobile money | ~25 M | BCEAO 2025 |
| Pénétration | >70 % des adultes (89 % GSMA) | GSMA / BCEAO |
| Bancarisation élargie | 15 % (2010) → >60 % (2025) | BCEAO |
| Valeur des transactions | 28 000 à 40 000 milliards FCFA/an | BCEAO |
| Paiements marchands | ~55 % des comptes actifs | — |
| Frais | 1–2 % · Wave 1 % · Orange 1–2 % · Peya Pay 0,5 % | 2025–2026 |

**Conséquences directes :**

1. **Le paiement mobile money n'est pas un frein** : infrastructure présente, habitude
   acquise, frais bas. Ce n'est pas un obstacle technique au modèle.
2. **Le ticket moyen doit rester bas.** 4 900 FCFA représente un aller-retour urbain ;
   au-delà de ~10 000 FCFA/mois, on change de catégorie d'acheteur.
3. **La fréquence mensuelle est risquée** (voir objections §5.3).

### 5.3 Objections attendues

| Objection | Réponse produit à construire |
|---|---|
| « C'est gratuit sur YouTube » | Correction **personnalisée** : où j'ai faux et pourquoi. Une vidéo ne le dit pas. |
| « Je n'ai pas de connexion ni de bon smartphone » | Le mode hors-ligne existe — **le mettre en avant** |
| « 4 900 FCFA tous les mois, c'est trop » | Pass trimestriel / annuel ; pass examen saisonnier |
| « J'ai un examen dans 3 mois, ça sert à rien » | **Message inverse** : c'est exactement quand il faut s'abonner |
| « J'ai déjà payé une année et je n'ai pas utilisé » | Le FREE est assez large pour ne jamais avoir l'impression d'avoir payé pour rien |
| « Je ne fais pas confiance à payer en ligne » | Paiement USSD, reçu par e-mail (Brevo), référence GeniusPay |

### 5.4 Valeur perçue : le vrai fossé

> **Ce n'est pas le prix qui bloque, c'est la confiance dans la promesse.**

Un élève ou un parent ne sait pas si Edukora marche. Il faut donc, **avant** de vendre :

- des **preuves de résultat** — score obtenu, avant / après ;
- des **témoignages** de parents et d'élèves réels ;
- une **démonstration** du tuteur IA en 30 secondes, sans carte bancaire.

C'est le rôle du **FREE** — et il est trop étroit : 5 questions IA/mois ne permettent pas
d'expérimenter le produit. **H3 (tester 10–15 questions gratuites) est la recommandation
la plus importante de ce document**, car elle conditionne tout le reste.

---

## 6. Unit economics

### 6.1 Formules

| KPI | Formule |
|---|---|
| **CAC** | Dépenses marketing ÷ nouveaux abonnés payants |
| **ARPU** | MRR ÷ abonnés payants actifs |
| **MRR** | Σ prix des abonnements actifs |
| **ARR** | MRR × 12 |
| **LTV** | ARPU × marge brute % ÷ churn mensuel |
| **Conversion** | nouveaux abonnés payants ÷ nouveaux comptes gratuits activés |
| **Churn mensuel** | abonnés perdus ÷ abonnés en début de période |
| **Rétention** | 1 − churn |
| **Marge brute** | (revenu − coût des ventes) ÷ revenu |
| **Coût IA / utilisateur** | coût IA mensuel (FCFA) ÷ total utilisateurs |
| **Coût IA / conversation** | coût IA ÷ nombre d'échanges IA |
| **Payback du CAC** | CAC ÷ (ARPU × marge brute %) — en mois |

**Coût des ventes (COGS)** = IA + frais de paiement + hébergement par utilisateur + support.

### 6.2 Coût d'un abonné mensuel

| Poste | FCFA/mois |
|---|---|
| Kora IA — 30 échanges | ~60 |
| Corrections dissertation — 5 | ~75 |
| **Sous-total IA** | **~135** |
| Frais de paiement (~3 %) | ~147 |
| Hébergement + base (par utilisateur) | ~60 |
| Support | ~40 |
| **COGS total** | **~382** |
| **Marge brute** | **~92 %** |

### 6.3 Scénario chiffré — hypothèse, pas prévision

**Cible : 500 abonnés payants à 4 900 FCFA/mois.**

| | Montant |
|---|---|
| MRR | 4 900 × 500 = **2 450 000 FCFA** (~3 700 EUR) |
| ARR | **29 400 000 FCFA** (~44 400 EUR) |
| COGS | ~382 × 500 = 191 000 FCFA |
| **Marge brute** | **92 %** |
| LTV (churn 8 %/mois) | 4 900 × 0,92 ÷ 0,08 = **56 400 FCFA** |
| CAC max soutenable (règle LTV/3) | **~18 800 FCFA** |
| CAC réaliste (contenu + parrainage) | **1 000 – 3 000 FCFA** |

**Lecture :** le modèle est **très rentable**. Avec un churn de 8 %/mois, un CAC de
2 000 FCFA acquis par contenu est multiplié par ~28. Il y a donc **de la marge pour
investir dans l'acquisition** — et même pour augmenter le prix.

**Mais le scénario suppose 500 abonnés payants.** Le vrai goulot est là : passer de
**5** abonnés actifs observés à 500 suppose d'abord que les élèves utilisent le produit.

---

## 7. Coûts IA

### 7.1 Architecture existante

Chaîne de basculement — une requête peut traverser plusieurs providers :

`Groq → HuggingFace → Cloudflare → Cerebras → Gemini → OpenRouter → OpenAI`

| Provider | Modèle par défaut |
|---|---|
| **Groq (principal)** | `llama-3.3-70b-versatile` |
| HuggingFace | `Mistral-7B-Instruct-v0.3` |
| Cerebras | `llama-3.1-8b` |
| Gemini | `gemini-3-flash-preview` |
| OpenAI | `gpt-4o-mini` |

Garde-fous déjà en place qui protègent la marge :

- réponses tronquées à **2 000 caractères** (`MAX_RESPONSE_CHARS`) ;
- historique limité à **8 messages** (`MAX_HISTORY`) ;
- RAG limité à **6 sources** ;
- correction quiz : contexte RAG tronqué à 600–800 caractères ;
- correction dissertation : sortie bornée (résumé 600, modèle 1 200 caractères).

### 7.2 Consommation estimée par échange

| Élément | Tokens (estimés) |
|---|---|
| Prompt système + RAG (6 sources) + mémoire étudiant | ~2 500 |
| Historique (8 messages) | ~1 000 |
| Message élève | ~80 |
| **Total entrée** | **~3 500** |
| **Sortie** | **~500** (plafond 2 000 car. ≈ 500 tokens) |

### 7.3 Coût par conversation

*Estimation fondée sur les tarifs publics des providers, à revalider sur les factures réelles.*

| Hypothèse | Valeur |
|---|---|
| Groq `llama-3.3-70b` | ~0,59 USD / M tokens en entrée · ~0,79 USD / M en sortie |
| Taux indicatif | 1 USD ≈ 650 FCFA |
| **Coût par échange (Groq nominal)** | **≈ 1,6 FCFA → arrondi 2 FCFA** |
| **Coût par échange (pire cas, 3 providers)** | **≈ 5 FCFA** |

### 7.4 Coût par utilisateur et par mois

| Profil | Échanges IA | Coût nominal | Pire cas |
|---|---|---|---|
| FREE (5/mois) | 5 | ~10 FCFA | ~25 FCFA |
| PLUS mensuel (30/mois) | 30 | ~60 FCFA | ~150 FCFA |
| PLUS trimestriel (33/mois) | 33 | ~67 FCFA | ~167 FCFA |
| **+ corrections dissertation (5/mois)** | — | ~75 FCFA | ~200 FCFA |
| **Total PLUS mensuel** | — | **~135 FCFA** | **~350 FCFA** |

### 7.5 Fonctionnalités IA à limiter en FREE

| Fonctionnalité | Limite | Justification |
|---|---|---|
| Kora IA | **seule limite forte à respecter** | coût unitaire faible mais cumulatif ; c'est aussi la source de conversion |
| Correction dissertation | 1/mois | coût par appel plus élevé (document complet en entrée) |
| Correction IA de quiz | à surveiller | à maintenir gratuite : c'est la boucle d'apprentissage |
| Génération de sujets / quiz | réservée aux professeurs | usage illimité possible |

> **Conclusion : l'IA ne représente que ~2,8 % du revenu d'un abonné (jusqu'à ~7 % en
> pire cas). Lever les quotas n'est pas un risque de marge — c'est un levier de
> conversion. Une offre « illimité » est envisageable à 4 900 FCFA.**
>
> Le seul vrai risque est l'abus. Les garde-fous existants — rate-limit IA dédié,
> `Retry-After`, historique borné — doivent être conservés et surveillés.

---

## 8. Parcours

```
Visiteur
   │  landing_viewed / return_visit / cta_clicked          ← mesuré (Phase 3f)
   ▼
Compte gratuit
   │  signup_started → signup_completed
   ▼
Activation ─────────── ★ ZONE DE FUITURE 1 : 7 comptes actifs sur 241 élèves
   │  first_lesson_completed                              ← LE KPI à optimiser
   ▼
Découverte de la valeur
   │  ai_question_sent / quiz_completed / fiche_read       ★ ZONE DE FUITURE 2
   ▼
Limite FREE atteinte
   │  quota_exceeded → upsell                              ← 1er contact commercial réel
   ▼
Premium
   │  begin_checkout → add_payment_info → subscription_started
   ▼
Paiement — USSD GeniusPay
   │
   ▼
Rétention ───────────── ★ ZONE DE FUITURE 3
      return_visit / lesson_started en session suivante
      → sinon churn
```

### Les trois zones de fuite à traiter

| Zone | Mesure actuelle | Cible à valider |
|---|---|---|
| **1. Activation** — inscrit mais n'ouvre jamais une leçon | ~97 % des élèves | >60 % |
| **2. Valeur perçue** — n'utilise ni l'IA ni les quiz | ~99 % des élèves | >40 % |
| **3. Rétention** — pas de retour en session suivante | non mesuré | >35 % à J7 |

**Règle de conception :** le parcours ne doit déclencher un upsell qu'**après** que
l'élève a ressenti de la valeur. Aujourd'hui l'upsell `quota_exceeded` est techniquement
correct, mais il intervient sur un produit que l'élève n'a pas encore éprouvé — donc il
ne convertit pas.

---

## 9. KPI

### 9.1 North Star

| KPI | Formule | Source | Cible (à valider) |
|---|---|---|---|
| **Élèves actifs mensuels** | comptes avec ≥1 `lesson_started` sur 30 j | first-party | cible principale |
| **First success rate** | `first_lesson_completed` ÷ inscrits | SQL first-party | >60 % |

### 9.2 Funnel — déjà instrumentés en Phase 3f

| Étape | Événement | KPI |
|---|---|---|
| Acquisition | `landing_viewed` | volume, sources |
| Intention | `cta_clicked` | taux de clic CTA |
| Inscription | `signup_started` → `signup_completed` | taux de complétion |
| Découverte | `subject_selected`, `grade_selected` | profondeur de découverte |
| Activation | `lesson_started`, `fiche_opened` | **north star** |
| Valeur | `ai_question_sent`, `quiz_completed` | part d'usage de la valeur |
| Limite | `quota_exceeded` | **taux de conversion sponsor** |
| Paiement | `begin_checkout` → `subscription_started` | taux de conversion |
| Rétention | `return_visit` | J7 / J30 |
| Parrainage | `referral_clicked` (`has_code`) → `signup_completed` | efficacité du parrainage |

### 9.3 KPI financiers

| KPI | Formule | Outil existant |
|---|---|---|
| MRR / ARR | Σ prix actifs × 12 | `espace-admin/revenus` |
| Conversion | abonnés payants ÷ comptes gratuits activés | `conversion-report.ts` |
| Churn mensuel | perdus ÷ abonnés début de période | **à créer** |
| ARPU | MRR ÷ abonnés actifs | `espace-admin/abonnes` |
| Panier abandonné | checkouts non finalisés | `abandoned-checkout.ts` |
| Essai → payant | essais non convertis à J3 | `findExpiredTrials()` |
| LTV / CAC | §6.1 | **à consolider** |

**Manquants :** churn, rétention nette, ARPU par segment (élève / parent), et une table
de coûts IA — il n'en existe aucune aujourd'hui.

---

## 10. Risques

| # | Risque | Gravité | Réponse |
|---|---|---|---|
| **1** | **Contrôle d'accès absent sur `/espace-prof`, `/espace-admin`, `/espace-parent`** (§1.4) | **Critique** | Corriger **avant** toute mise en vente : fuite de contenu premium et d'outils d'administration |
| **2** | **Adoption quasi nulle** — 7 comptes actifs sur 241 élèves | **Critique** | Ne pas monétiser avant d'avoir activé. Priorité à l'onboarding |
| **3** | Le FREE ne permet pas de ressentir la valeur (5 questions IA/mois) | Élevé | Tester H3 (10–15 questions) |
| **4** | Aucune remise sur l'engagement trimestriel | Élevé | Tester H1 — défaut de tarification manifeste |
| **5** | Dépendance à un seul prestataire de paiement (GeniusPay) | Moyen | Commission inconnue, à confirmer. Garder le tunnel USSD. **Ne pas connecter de second prestataire** avant d'avoir un volume qui le justifie |
| **6** | Coût de production du contenu non modélisé (1 361 leçons) | Moyen | Chiffrer avant de fixer la politique des professeurs |
| **7** | Saisonnalité forte — examens en mai–juin | Moyen | Pass examen + recrutement hors saison |
| **8** | Dépendance à la disponibilité des providers IA | Faible | Mitigé : 7 providers + fallback local |
| **9** | Baisse des frais mobile money (0,5–1 %) → pression sur la marge | Faible | Marge à 92 % : non bloquant |
| **10** | Valeur perçue insuffisante → churn | **Élevé** | Preuves de résultat, témoignages, démo IA sans carte bancaire |
| **11** | Données parentales sensibles (espace parent) | Moyen | Bénévolat de conformité Phase 3f à étendre au compte parent |

---

## 11. Stratégie de test

Séquencée. **Aucun nouveau prestataire de paiement avant d'avoir un volume.**

### T0 — Prérequis bloquants (semaine 1–2)

1. Corriger l'écart de contrôle d'accès (§1.4).
2. Rendre le parental control **obligatoire côté serveur** sur les trois espaces.
3. Documenter la commission GeniusPay réelle — elle n'apparaît nulle part dans le code.

### T1 — Mesurer la base (semaine 2–6)

4. Utiliser les événements Phase 3f pour mesurer le funnel réel sur 30 jours.
5. Établir la baseline : activation, IA, quiz, rétention, conversion.
6. Identifier la zone de fuite n°1 et la traiter en priorité.

### T2 — Premier test commercial (semaine 6–10)

7. **H1** — remise trimestrielle, A/B sur `/tarifs`.
8. **H3** — FREE à 10–15 questions IA/mois, mesure par cohortes.
9. **H5** — suppression de l'essai 3 jours, A/B.

> Ces trois tests ne coûtent que de la configuration de plans existants. **Aucun
> développement de paiement n'est nécessaire.**

### T3 — Offres ciblées (mois 3–4)

10. **H4** — pass examen saisonnier, testé avant les épreuves de mai.
11. Offre **parent** : landing + liste d'attente, **avant** tout développement.

### T4 — Segment professeur (mois 6+)

12. Enquêter les 45 professors: usage réel de l'espace professeur.
13. Décider gratuit (offre) ou payant (B2B) sur preuve d'usage.

### T5 — Palier PREMIUM (mois 6+)

14. Seulement si T3 valide la demande parent.
15. Livrer d'abord 2–3 capacités réelles, **ensuite** annoncer le palier.

---

## 12. Recommandations

### Priorité 1 — Bloquante

1. **Corriger le contrôle d'accès** sur `/espace-prof`, `/espace-admin`, `/espace-parent`.
   C'est une fuite de revenu *et* une faille de sécurité. Préalable à toute vente.
2. **Ne pas changer les prix** tant que l'activation n'est pas traitée. Le prix n'est
   pas le facteur limitant.

### Priorité 2 — Activation

3. **Élargir le FREE sur l'IA** (H3) : c'est la recommandation au plus fort levier.
   5 questions/mois empêchent l'élève de ressentir la valeur du produit phare.
4. **Transformer les 683 leçons gratuites** en parcours débloqué : la prochaine leçon
   se débloque avec ta progression. Le contenu existe déjà, la boucle d'activation manque.
5. **Instrumenter la rétention** : `return_visit` existe mais n'est pas encore suivi
   en cohortes.

### Priorité 3 — Tarification

6. **Introduire une remise trimestrielle** (H1) : l'absence de remise sur un engagement
   trimestriel est un défaut manifeste de l'offre actuelle.
7. **Ajouter un plan annuel** (H2) : le code supporte déjà `interval: "year"`.
8. **Tester H6 (prix à 7 900)** uniquement quand l'activation est saine.

### Priorité 4 — Nouveaux revenus

9. **Pass examen saisonnier** avant les épreuves de mai — fenêtre naturelle,
   forte motivation, cycle de décision court.
10. **Offre parent** : le levier d'ARPU n°1. Un parent qui paie veut **voir** le
    progrès ; l'espace parent existe déjà.
11. **Espace professeur gratuit** dans l'immédiat — c'est l'offre qui amène les élèves.

### Priorité 5 — Discipline

12. **Un seul paramètre modifié à la fois** lors des tests de prix.
13. **Créer une table de coûts IA** pour tracer le coût réel par utilisateur.
14. **Ne pas connecter de second prestataire de paiement** avant d'avoir un volume et une
    commission GeniusPay documentée.

---

## Annexe A — Sources

### Marché et capacité de paiement
- **Candidats examens session 2026** : DECO / ministère de l'Éducation — 1 568 831
  candidats ; CEPE 609 384, BEPC 606 583, BAC 329 372 (303 625 général, 25 150
  technique, 597 artistique) ; 23 492 au test d'orientation. Taux de réussite BEPC
  52,17 % (306 001 admis / 586 587 présents).
- **Mobile money** : BCEAO 2025 (≈25 M de comptes, 28 000–40 000 Mds FCFA/an),
  GSMA (adoption 89 %), INS via ecomatin (Wave 20 M de comptes, 70 % des paiements
  marchands). Frais : Wave 1 %, Orange 1–2 %, MTN en recul, Peya Pay 0,5 %.
- **Tarifs de soutien scolaire à Abidjan** : Bamacours (7 500–9 500 FCFA/h),
  Monprofchezmoi (15 000 FCFA / 2 h, min. 4 séances/mois), AbiCours (145 000 FCFA /
  8 semaines ; 580 000 FCFA / 18 semaines), OKALM (3 125–5 000 FCFA/h).

### Code
- Plans et quotas : `src/lib/init.ts` (l. 1521–1636), `src/lib/quotas.ts`,
  `src/lib/plans.ts`
- IA : `src/lib/ai/gateway.ts`, `src/lib/tutor-ai.ts`, `src/lib/ai/rag.ts`
- Paiement : `src/lib/geniuspay.ts`, `src/app/api/premium/checkout/route.ts`,
  `src/app/api/premium/webhook/route.ts`
- Contrôle d'accès : `src/proxy.ts` (l. 186–187)
- Funnel : `src/lib/analytics.ts`, `src/components/EdukoraAnalytics.tsx`,
  `docs/analytics-funnel.md`

### Réserves méthodologiques
- Les volumes de contenu et d'utilisateurs proviennent de la **base locale de
  développement** (`data/edukora.db`) et peuvent contenir des données de démonstration.
- Les coûts IA sont une **estimation** fondée sur les tarifs publics des providers, à
  revalider sur les factures réelles.
- Le scénario à 500 abonnés est une **hypothèse de travail**, pas une prévision.
- Le taux de conversion IA de la Phase 3f a été validé ; les chiffres de conversion
  commerciale n'ont pas été validés et reposent sur un échantillon minuscule (5 abonnés).

---

## Annexe B — Verdict

# PHASE 3g : PASS

Le modèle est économiquement sain à prix constant, la proposition de valeur est solide,
et la plateforme technique de paiement est déjà robuste. **Le blocage n'est pas
commercial : il est produit.**

Ce document ne propose **aucune modification de production**, **aucun nouveau
prestataire de paiement**, **aucun commit**, **aucun push** et **aucun déploiement**.