const SAFE_HASH = "2026-08-18-edhc-v1";
export { SAFE_HASH };
export const EDHC_SUBJECT_ID = 9;

export const EDHC_GRADES = [
  { id: 1, code: "6eme", name: "Sixième" },
  { id: 2, code: "5eme", name: "Cinquième" },
  { id: 3, code: "4eme", name: "Quatrième" },
  { id: 4, code: "3eme", name: "Troisième" },
];

export const EDHC_CONTENT = [
  {
    gradeId: 1,
    gradeCode: "6eme",
    gradeName: "Sixième",
    chapters: [
      {
        code: "6eme-droits-enfant",
        title: "Les droits de l'enfant, les droits humains et le DIH",
        description: "Compétence 1 : traiter une situation relative aux droits de l'homme, aux droits de l'enfant et au droit international humanitaire (DIH).",
        lessons: [
          {
            title: "Les droits à la survie et à la protection de l'enfant",
            summary: "Découvrir les droits de l'enfant à la survie (vie, alimentation, santé) et à la protection (protection contre les violences et l'exploitation).",
            difficulty: 1,
            contentMd: `## Situation

Dans un quartier, un enfant de 9 ans est contraint de vendre des sachets d'eau au lieu d'aller à l'école. Ses droits sont-ils respectés ?

## Définition

L'enfant est tout être humain âgé de moins de 18 ans, sauf si la loi nationale fixe une majorité plus précoce.

Les droits de l'enfant sont un ensemble de garanties que la société et l'État reconnaissent à l'enfant. Ils sont contenus dans la **Convention internationale relative aux droits de l'enfant (CIDE)** du 20 novembre 1989 (ratifiée par la Côte d'Ivoire le 4 février 1991) et dans la **Charte africaine des droits et du bien-être de l'enfant (CADBE)** du 1er juillet 1990.

Le droit à la **survie** : droit de l'enfant à la vie, à une alimentation suffisante, à l'eau potable, aux soins de santé et à un logement.

Le droit à la **protection** : droit d'être protégé contre les violences, les mauvais traitements, l'exploitation (travail forcé), l'abandon et toute forme de discrimination.

## À retenir

- Un enfant est une personne de moins de 18 ans.
- La CIDE (1989) protège les droits de l'enfant dans le monde entier.
- Les droits à la survie concernent la vie, la nourriture, les soins et le logement.
- Les droits à la protection défendent l'enfant contre les violences et l'exploitation.
- En Côte d'Ivoire, chaque enfant a droit à l'école, à la santé, à l'identité et à une famille.

## Exemple corrigé

**Énoncé :** Aminata, 7 ans, ne mange qu'un repas par jour et n'est jamais inscrite à l'école. De quels droits est-elle privée ?

**Corrigé :** Aminata est privée de son droit à la survie (alimentation suffisante) et de son droit au développement (éducation). Sa famille et l'État doivent garantir ces droits.`,
          },
          {
            title: "Les droits humains",
            summary: "Connaître les droits humains, leur origine et leur importance pour chaque personne, dans le monde et en Côte d'Ivoire.",
            difficulty: 1,
            contentMd: `## Situation

À la radio, on parle de la « Déclaration universelle des droits de l'homme ». Que signifie cette expression ?

## Définition

Les droits humains (ou droits de l'homme) sont des droits fondamentaux qui appartiennent à **toute personne** du simple fait d'être un être humain, sans aucune distinction de race, de sexe, de religion, de langue ou de nationalité.

Ils sont proclamés par la **Déclaration universelle des droits de l'homme (DUDH)**, adoptée le **10 décembre 1948** par l'Organisation des Nations unies (ONU).

Les droits humains sont :
- **universels** : ils valent pour tous les êtres humains, partout dans le monde ;
- **inaliénables** : personne ne peut les retirer à quelqu'un ;
- **indivisibles et interdépendants** : le respect d'un droit dépend du respect des autres.

Ils regroupent les droits civils et politiques (vie, liberté, expression, vote), économiques et sociaux (travail, éducation, santé) et culturels (participation à la vie culturelle).

## À retenir

- Les droits humains s'appliquent à chaque personne, sans distinction.
- La DUDH a été adoptée le 10 décembre 1948 par l'ONU.
- Quatre caractéristiques : universels, inaliénables, indivisibles, interdépendants.
- La Constitution ivoirienne garantit ces droits dans son préambule et son article 2.
- Les droits humains se concrétisent par des devoirs : respecter les droits des autres.

## Exemple corrigé

**Énoncé :** Un élève dit : « Les droits humains ne concernent que les adultes. » Vrai ou faux ?

**Corrigé :** Faux. Les droits humains concernent toutes les personnes, y compris les enfants. La CIDE étend même des protections particulières aux enfants.`,
          },
          {
            title: "Le droit international humanitaire (DIH)",
            summary: "Comprendre les règles qui protègent les personnes en temps de guerre et de conflit armé.",
            difficulty: 1,
            contentMd: `## Situation

Pendant un conflit armé, des civils sont bombardés et des écoles détruites. Quelles règles protègent les personnes qui ne combattent pas ?

## Définition

Le **droit international humanitaire (DIH)** est l'ensemble des règles internationales qui protègent les personnes en temps de **conflit armé** : les civils, les blessés, les malades, les prisonniers de guerre et le personnel humanitaire.

Il repose principalement sur les **quatre Conventions de Genève de 1949**, complétées par les **Protocoles additionnels de 1977**, et il est promu par le **Comité international de la Croix-Rouge (CICR)**.

Principes essentiels du DIH :
- distinguer les combattants des civils et **épargner les civils** ;
- soigner les blessés et les malades, sans distinction ;
- traiter les prisonniers avec humanité ;
- interdire les armes et les méthodes qui frappent sans distinction ;
- protéger les hôpitaux, les écoles et le personnel humanitaire.

## À retenir

- Le DIH protège les personnes en temps de conflit armé.
- Il est contenu dans les Conventions de Genève de 1949 et leurs Protocoles.
- Le CICR veille à son application.
- Les civils, blessés, prisonniers et humanitaires sont protégés.
- La guerre a des limites : tout n'est pas permis, même en temps de conflit.

## Exemple corrigé

**Énoncé :** Un groupe armé détruit un hôpital pour affaiblir son ennemi. Que dit le DIH ?

**Corrigé :** Le DIH interdit d'attaquer les hôpitaux et les lieux de soins : ils sont protégés. Détruire un hôpital est une violation grave du droit international humanitaire.`,
          },
        ],
      },
      {
        code: "6eme-citoyennete",
        title: "Vie communautaire et principes de la démocratie",
        description: "Compétence 2 : traiter une situation relative aux règles de vie communautaire et aux principes de la démocratie.",
        lessons: [
          {
            title: "La Constitution de la Côte d'Ivoire",
            summary: "Découvrir la loi fondamentale du pays, ses symboles et la République.",
            difficulty: 1,
            contentMd: `## Situation

À la cérémonie de levée des couleurs, le drapeau orange-blanc-vert est hissé. Que représente-t-il ?

## Définition

La **Constitution** est la loi fondamentale d'un État : elle organise les institutions (Président de la République, Parlement, tribunaux) et garantit les droits et les devoirs des citoyens. Toutes les autres lois doivent lui être conformes.

La Côte d'Ivoire est une **République** : le peuple est souverain et élit ses représentants. La Constitution en vigueur date du **8 novembre 2016** (3e République).

Les symboles de la République de Côte d'Ivoire :
- le **drapeau** : orange, blanc, vert ;
- l'**hymne national** : L'Abidjanaise ;
- la **devise** : Union – Discipline – Travail ;
- les **armoiries** et le **sceau** de la République.

## À retenir

- La Constitution est la loi suprême du pays.
- La Côte d'Ivoire est une République dont la Constitution date du 8 novembre 2016.
- Les symboles nationaux : drapeau, hymne, devise, armoiries.
- Respecter la Constitution, c'est respecter les lois et les institutions.
- La Constitution garantit les droits de l'homme et les libertés fondamentales.

## Exemple corrigé

**Énoncé :** Cite deux symboles de la République de Côte d'Ivoire et la devise nationale.

**Corrigé :** Le drapeau orange-blanc-vert et l'hymne L'Abidjanaise. La devise est « Union – Discipline – Travail ».`,
          },
          {
            title: "Le Président de la République",
            summary: "Comprendre le rôle du chef de l'État en Côte d'Ivoire et son élection.",
            difficulty: 1,
            contentMd: `## Situation

Un élève entend à la télévision : « Le Président de la République a promulgué une loi. » Que fait le Président de la République ?

## Définition

Le **Président de la République** est le **chef de l'État**, élu par les citoyens au **suffrage universel direct** pour un mandat de **cinq ans**, renouvelable une seule fois.

En Côte d'Ivoire, le Président de la République :
- est le garant de la Constitution et des institutions ;
- dirige l'État et définit la politique de la nation ;
- est le chef des armées ;
- promulgue les lois votées par le Parlement ;
- représente le pays auprès des autres États (diplomatie).

Pour être élu, un candidat doit obtenir la majorité des suffrages exprimés lors des élections, organisées par la Commission électorale indépendante (CEI).

## À retenir

- Le Président de la République est le chef de l'État.
- Il est élu au suffrage universel direct pour 5 ans, renouvelable une fois.
- Il garantit la Constitution, promulgue les lois et est le chef des armées.
- Le vote est un droit et un devoir citoyen.
- La souveraineté appartient au peuple, qui élit ses dirigeants.

## Exemple corrigé

**Énoncé :** Pourquoi dit-on que le Président de la République est le garant de la Constitution ?

**Corrigé :** Parce qu'il veille au respect de la loi fondamentale, promulguée par lui après le vote des lois par le Parlement, et qu'il assure la continuité des institutions de la République.`,
          },
          {
            title: "Les règles de vie en famille et en communauté",
            summary: "Connaître les règles du vivre-ensemble qui permettent l'harmonie en famille et dans le quartier.",
            difficulty: 1,
            contentMd: `## Situation

Dans la cour d'un immeuble, deux enfants se disputent la même place. Que faire pour que la vie en communauté reste paisible ?

## Définition

Les **règles de vie** sont des principes et des comportements qui organisent la vie en société et garantissent le respect de chacun.

En **famille** : obéir et respecter les parents et les aînés, aider aux tâches ménagères, participer aux décisions familiales, respecter les horaires et le travail des autres.

En **communauté** : saluer et être poli, respecter les voisins et les personnes âgées, participer aux travaux collectifs (salubrité, sécurité), éviter les disputes et le bruit excessif, aider les personnes en difficulté.

## À retenir

- Les règles de vie assurent l'harmonie en famille et en communauté.
- Respect, politesse, entraide et responsabilité sont des valeurs essentielles.
- Chaque membre de la famille a des droits et des devoirs.
- La vie communautaire suppose la tolérance et le dialogue.
- Le respect des règles évite les conflits et protège chacun.

## Exemple corrigé

**Énoncé :** Cite trois règles de vie en communauté.

**Corrigé :** Saluer et être poli, respecter ses voisins et les personnes âgées, participer aux travaux collectifs d'assainissement du quartier.`,
          },
          {
            title: "Les principes de la démocratie",
            summary: "Comprendre les grandes règles de la démocratie : liberté, égalité, élection et participation.",
            difficulty: 1,
            contentMd: `## Situation

Dans la classe, le délégué est élu à main levée. Certains élèves estiment que seul le professeur devait le choisir. Qu'en penses-tu ?

## Définition

La **démocratie** est un système politique dans lequel le **peuple détient la souveraineté** : il choisit ses dirigeants et participe aux décisions qui le concernent.

Ses principes fondamentaux :
- la **souveraineté du peuple** : le pouvoir vient du peuple ;
- le **suffrage universel** : tous les citoyens peuvent voter ;
- le **pluralisme** : plusieurs opinions et partis peuvent exister ;
- la **séparation des pouvoirs** : législatif, exécutif, judiciaire ;
- l'**État de droit** : la loi s'applique à tous, y compris aux dirigeants ;
- la **liberté d'expression** et le respect des droits de l'homme ;
- l'**alternance** : les dirigeants sont élus pour un temps limité et peuvent être remplacés.

## À retenir

- La démocratie, c'est le pouvoir du peuple, par le peuple et pour le peuple.
- Le vote est le moyen d'expression de la souveraineté populaire.
- Le pluralisme et la liberté d'expression sont indispensables.
- Les élections scolaires (délégué de classe) sont un premier apprentissage de la démocratie.

## Exemple corrigé

**Énoncé :** Qu'est-ce que la souveraineté du peuple en démocratie ?

**Corrigé :** C'est le principe selon lequel le pouvoir appartient au peuple : c'est lui qui choisit ses représentants et ses dirigeants par le vote.`,
          },
        ],
      },
      {
        code: "6eme-entrepreneuriat-routiere",
        title: "Entrepreneuriat et éducation routière",
        description: "Compétence 3 : traiter une situation relative à l'entrepreneuriat et à l'éducation routière.",
        lessons: [
          {
            title: "Les règles de la circulation routière",
            summary: "Apprendre les règles de sécurité routière du piéton, du cycliste et du passager.",
            difficulty: 1,
            contentMd: `## Situation

Chaque matin, des élèves traversent une grande route pour rejoindre leur école. Quelles règles doivent-ils respecter pour leur sécurité ?

## Définition

La **circulation routière** est le déplacement des personnes et des véhicules sur les routes. Pour la rendre sûre, il existe des règles et des panneaux.

Règles du **piéton** : marcher sur le trottoir, traverser au passage clouté ou sur les passages piétons, regarder à gauche puis à droite avant de traverser, ne pas jouer sur la chaussée.

Règles du **cycliste** : rouler sur le côté droit de la route, signaler ses changements de direction, ne pas transporter trop de passagers, être visible de nuit.

Règles du **passager** : monter dans un véhicule à l'arrêt, mettre la ceinture de sécurité, ne pas gêner le conducteur, descendre côté trottoir.

Les **panneaux de signalisation** informent : danger (triangle), interdiction (rond rouge), obligation (rond bleu), indication (rectangle).

## À retenir

- La route se partage : piétons, cyclistes, automobilistes doivent se respecter.
- Le piéton traverse au passage protégé et regarde des deux côtés.
- Le cycliste roule à droite et reste visible.
- Les panneaux donnent des obligations, des interdictions et des indications.
- Respecter le code de la route, c'est protéger sa vie et celle des autres.

## Exemple corrigé

**Énoncé :** Un panneau triangulaire rouge sur une route annonce quoi ?

**Corrigé :** Un panneau en forme de triangle signale un danger : virage, passage d'animaux, chaussée rétrécie, etc. Il oblige le piéton et le conducteur à la prudence.`,
          },
          {
            title: "Le secteur primaire",
            summary: "Découvrir les activités du secteur primaire en Côte d'Ivoire : agriculture, élevage, pêche.",
            difficulty: 1,
            contentMd: `## Situation

Le cacao ivoirien est connu dans le monde entier. À quel secteur d'activité appartient la culture du cacao ?

## Définition

Le **secteur primaire** regroupe les activités qui exploitent les ressources naturelles : **l'agriculture** (cacao, café, coton, riz, igname, banane, hévéa, palmier à huile), **l'élevage** (bovins, ovins, volailles), la **pêche** (lagunes, fleuves, mer) et l'exploitation **forestière**.

En Côte d'Ivoire, ce secteur est essentiel :
- il emploie une grande partie de la population ;
- il fournit la nourriture de tous les jours ;
- le cacao et le café sont les premières exportations du pays ;
- il alimente les industries (transformation, artisanat).

## À retenir

- Le secteur primaire exploite les ressources de la nature.
- Il comprend l'agriculture, l'élevage, la pêche et la forêt.
- La Côte d'Ivoire est le premier producteur mondial de cacao.
- Ce secteur nourrit les familles et finance l'économie nationale.
- Il faut exploiter les ressources sans détruire l'environnement.

## Exemple corrigé

**Énoncé :** Classe ces activités dans le secteur primaire : culture du maïs, vente de tissus, pêche en lagune, enseignement.

**Corrigé :** Culture du maïs et pêche en lagune (secteur primaire). La vente de tissus appartient au commerce (secteur secondaire/tertiaire) et l'enseignement au secteur tertiaire (services).`,
          },
        ],
      },
      {
        code: "6eme-puberte",
        title: "La puberté et la santé de l'adolescent",
        description: "Compétence 4 : traiter une situation relative à la puberté et aux comportements responsables.",
        lessons: [
          {
            title: "La puberté",
            summary: "Comprendre les transformations du corps à l'adolescence et les attitudes pour bien les vivre.",
            difficulty: 1,
            contentMd: `## Situation

Depuis quelques mois, Koffi, 12 ans, remarque que sa voix change et qu'il grandit plus vite. Que se passe-t-il dans son corps ?

## Définition

La **puberté** est la période de la vie où le corps de l'enfant se transforme en corps d'adulte, capable de se reproduire. Elle survient le plus souvent entre **10 et 14 ans** et varie selon chaque personne et son sexe.

Chez la **fille** : apparition des règles (menstruations), croissance des seins, élargissement du bassin, pilosité.

Chez le **garçon** : mue de la voix, croissance, pilosité, développement des organes génitaux.

Pendant la puberté, il faut :
- accepter ses transformations sans honte ni moquerie ;
- respecter son corps (hygiène quotidienne, alimentation équilibrée, sommeil) ;
- parler avec ses parents ou un adulte de confiance ;
- respecter les autres, car chacun se développe à son rythme.

## À retenir

- La puberté transforme le corps de l'enfant en corps d'adulte.
- Elle survient entre 10 et 14 ans environ.
- Les transformations sont normales et propres à chaque personne.
- Hygiène, alimentation et dialogue aident à bien vivre cette période.
- Se moquer du corps des autres est un manque de respect.

## Exemple corrigé

**Énoncé :** Pourquoi l'hygiène corporelle est-elle particulièrement importante pendant la puberté ?

**Corrigé :** Parce que le corps change (transpiration, pilosité, règles) : se laver régulièrement, se changer et prendre soin de soi protège la santé et le respect de soi et des autres.`,
          },
          {
            title: "L'abstinence sexuelle",
            summary: "Comprendre ce qu'est l'abstinence sexuelle et ses avantages pour les adolescents.",
            difficulty: 1,
            contentMd: `## Situation

Un camarade de classe affirme que « coucher avec quelqu'un » prouve que l'on est devenu grand. Est-ce une bonne raison ?

## Définition

L'**abstinence sexuelle** consiste à ne pas avoir de rapports sexuels. Pour les adolescents, elle est le comportement le plus sûr : c'est la seule protection qui évite à 100 % les grossesses non désirées et les infections sexuellement transmissibles (IST), dont le VIH/SIDA.

Avantages de l'abstinence :
- protéger sa santé (aucun risque d'IST, ni de grossesse) ;
- se concentrer sur les études et ses projets d'avenir ;
- respecter son corps et sa dignité ;
- éviter les pressions et les regrets ;
- préparer un avenir fondé sur le respect mutuel.

L'abstinence est un choix libre : accepter son corps, dire « non » sans culpabilité, et ne pas se laisser influencer par les autres.

## À retenir

- L'abstinence = ne pas avoir de rapports sexuels.
- Elle protège totalement contre les grossesses et les IST.
- Elle permet de se concentrer sur l'école et l'avenir.
- Refuser n'est pas une honte : c'est un choix responsable.
- Chaque adolescent a droit au respect de son corps.

## Exemple corrigé

**Énoncé :** Cite deux avantages de l'abstinence sexuelle chez l'adolescent.

**Corrigé :** Elle protège la santé (aucune IST, ni grossesse) et permet de se concentrer sur les études et les projets d'avenir.`,
          },
        ],
      },
      {
        code: "6eme-assainissement",
        title: "Assainissement du cadre de vie",
        description: "Compétence 5 : traiter une situation relative à l'assainissement du cadre de vie.",
        lessons: [
          {
            title: "L'entretien du cadre de vie",
            summary: "Apprendre à entretenir sa classe, sa cour et son quartier pour vivre en bonne santé.",
            difficulty: 1,
            contentMd: `## Situation

Autour de l'école, des sachets plastiques et des boîtes vides traînent dans la cour et les caniveaux. Quels sont les risques ?

## Définition

Le **cadre de vie** est l'environnement dans lequel on vit : la maison, l'école, la cour, le quartier. L'**entretien du cadre de vie**, c'est l'ensemble des actions qui le maintiennent propre et salubre.

Ces actions sont simples :
- balayer la classe et la cour chaque jour ;
- utiliser les poubelles et les bacs à ordures ;
- ne pas jeter les déchets dans la rue ni dans les caniveaux ;
- évacuer les eaux usées vers des caniveaux propres ;
- couper les herbes autour de la maison et de l'école ;
- dératiser et désinfecter régulièrement.

Pourquoi est-ce important ? Un cadre sale attire les mouches, les rats et les microbes : il favorise les maladies (choléra, typhoïde, paludisme) et nuit à l'image du quartier.

## À retenir

- Le cadre de vie est l'endroit où l'on vit : il doit rester propre.
- L'entretien est l'affaire de tous : famille, école, quartier.
- Les déchets attirent les maladies.
- Salubrité rime avec santé.
- Chaque geste compte : balayer, jeter à la poubelle, désherber.

## Exemple corrigé

**Énoncé :** Pourquoi faut-il nettoyer les caniveaux autour de la maison ?

**Corrigé :** Les caniveaux bouchés font stagner les eaux sales : ils attirent les mouches et les moustiques et favorisent les maladies. Les nettoyer évite aussi les inondations en saison des pluies.`,
          },
          {
            title: "L'entretien des latrines et des toilettes",
            summary: "Comprendre l'importance de l'entretien des latrines pour la santé et la dignité.",
            difficulty: 1,
            contentMd: `## Situation

Dans un village, les latrines de l'école sont sales et mal fermées. Que risque la communauté ?

## Définition

Les **latrines** et les **toilettes** sont les lieux d'aisance où l'on satisfait les besoins naturels. Leur entretien est essentiel : les excréments humains contiennent des microbes qui provoquent des maladies graves (choléra, typhoïde, dysenterie, vers intestinaux, poliomyélite).

Règles d'entretien :
- nettoyer les latrines chaque jour avec de l'eau et du savon ou de l'eau de javel ;
- fermer la porte et recouvrir la fosse après usage ;
- se laver les mains au savon après être allé aux toilettes ;
- jeter les papiers et déchets dans des poubelles prévues à cet effet ;
- fermer les fosses pleines et en creuser de nouvelles ;
- signaler les latrines cassées pour qu'elles soient réparées.

## À retenir

- Les toilettes sales sont une source de maladies.
- L'entretien quotidien (eau, savon, javel) est indispensable.
- Le lavage des mains après usage protège de nombreuses maladies.
- Avoir des latrines propres est un signe de dignité et de respect.
- Chacun doit utiliser et entretenir les toilettes correctement.

## Exemple corrigé

**Énoncé :** Une personne utilise les latrines de l'école sans se laver les mains ensuite. Quel risque cela fait-il courir à la classe ?

**Corrigé :** Elle peut transmettre par les mains sales des microbes (choléra, dysenterie, vers) aux objets et aux aliments partagés. Le lavage des mains au savon élimine ce risque.`,
          },
        ],
      },
    ],
  },

  {
    gradeId: 2,
    gradeCode: "5eme",
    gradeName: "Cinquième",
    chapters: [
      {
        code: "5eme-droits",
        title: "Droits de l'enfant, droits humains et protection en conflit",
        description: "Compétence 1 : traiter une situation relative aux droits de l'homme, aux droits de l'enfant et au droit international humanitaire.",
        lessons: [
          {
            title: "Les droits au développement et à la participation de l'enfant",
            summary: "Découvrir les droits de l'enfant à se développer (école, santé, loisirs) et à participer.",
            difficulty: 1,
            contentMd: `## Situation

Lors d'un conseil de village, on veut construire un centre de loisirs pour les enfants. Certains adultes pensent que c'est inutile. Ont-ils raison ?

## Définition

Les droits de l'enfant regroupent 4 catégories : la survie, la protection, le **développement** et la **participation**.

Le droit au **développement** : droit à l'éducation, aux soins de santé, aux loisirs, à la culture et à un niveau de vie suffisant. Les articles 28 et 29 de la CIDE garantissent l'éducation ; l'article 31 garantit le repos et les loisirs.

Le droit à la **participation** : droit de l'enfant de donner son avis, d'être informé, de s'exprimer librement et de participer à la vie de sa famille, de son école et de sa communauté (articles 12 à 15 de la CIDE). L'avis de l'enfant doit être pris en compte selon son âge et sa maturité.

## À retenir

- 4 familles de droits de l'enfant : survie, protection, développement, participation.
- École, santé et loisirs : le développement de l'enfant doit être assuré.
- L'enfant a le droit de dire ce qu'il pense et d'être écouté.
- La participation se pratique en famille, à l'école et au village.
- Les droits au développement et à la participation sont complémentaires.

## Exemple corrigé

**Énoncé :** Dans un club d'élèves, les enfants élisent leur bureau. Quel droit exercent-ils ?

**Corrigé :** Ils exercent leur droit à la participation : s'organiser, donner leur avis et élire leurs représentants, conformément à la CIDE.`,
          },
          {
            title: "Les principes des droits humains",
            summary: "Approfondir les principes qui fondent les droits humains : universalité, dignité, égalité.",
            difficulty: 1,
            contentMd: `## Situation

Un élève déclare : « Les droits humains ne sont pas les mêmes selon les pays. » Que réponds-tu ?

## Définition

Les **droits humains** reposent sur des principes fondamentaux :

- **l'universalité** : les droits sont identiques pour tous les êtres humains, dans tous les pays. La DUDH (10 décembre 1948) les proclame pour tous, sans exception ;
- la **dignité humaine** : chaque personne a une valeur absolue que personne ne peut lui retirer ;
- **l'égalité** : tous les humains naissent libres et égaux en dignité et en droits (article 1er de la DUDH) ;
- **l'indivisibilité** : droits civils, politiques, économiques, sociaux et culturels forment un tout ;
- la **non-discrimination** : aucun traitement injuste fondé sur la race, le sexe, la religion, l'origine ou la condition ;
- la **responsabilité de l'État** : l'État doit protéger et garantir ces droits.

## À retenir

- Les droits humains sont universels et s'appliquent à tous.
- La dignité de la personne humaine est le fondement de tous les droits.
- Tous les humains naissent libres et égaux en dignité.
- L'État est responsable de la protection des droits.
- La non-discrimination est un principe clé des droits humains.

## Exemple corrigé

**Énoncé :** Qu'exprime l'article 1er de la Déclaration universelle des droits de l'homme ?

**Corrigé :** « Tous les êtres humains naissent libres et égaux en dignité et en droits. » C'est le principe d'égalité : aucune distinction ne justifie un traitement injuste.`,
          },
          {
            title: "Les règles de protection des victimes de conflits armés",
            summary: "Connaître les règles qui protègent les civils, les blessés et les réfugiés en temps de guerre.",
            difficulty: 1,
            contentMd: `## Situation

En raison d'un conflit dans un pays voisin, des familles arrivent en Côte d'Ivoire. Comment le droit international les protège-t-il ?

## Définition

En temps de conflit armé, le **droit international humanitaire (DIH)** — principalement les **Conventions de Genève de 1949** et leurs Protocoles additionnels — protège les personnes qui ne participent pas ou plus aux combats :

- les **civils** : interdiction de les attaquer, de détruire leurs maisons, écoles et hôpitaux ;
- les **blessés et les malades** : obligation de les recueillir et de les soigner ;
- les **prisonniers de guerre** : traitement humain, interdiction de les tuer ou de les torturer ;
- les **réfugiés** : personnes qui fuient la guerre ou la persécution ; elles sont protégées par la Convention de 1951 et reçoivent l'aide du **HCR** (Haut-Commissariat des Nations unies pour les réfugiés) ;
- les **déplacés internes** : personnes qui fuient sans quitter leur pays ; elles restent sous la protection de leur État et du DIH.

## À retenir

- Les civils ne doivent jamais être visés.
- Blessés, malades et prisonniers doivent être traités avec humanité.
- Les réfugiés fuient la guerre : ils sont protégés par le droit.
- Le HCR assiste les réfugiés dans le monde.
- La solidarité envers les victimes de conflits est un devoir.

## Exemple corrigé

**Énoncé :** Quelle est la différence entre un réfugié et un déplacé interne ?

**Corrigé :** Le réfugié a quitté son pays à cause de la guerre ou des persécutions ; le déplacé interne a fui son lieu de vie sans quitter son pays.`,
          },
        ],
      },
      {
        code: "5eme-citoyennete",
        title: "Citoyenneté, démocratie et entente entre les peuples",
        description: "Compétence 2 : traiter une situation relative aux règles de vie communautaire et aux principes de la démocratie.",
        lessons: [
          {
            title: "Le Parlement de la Côte d'Ivoire",
            summary: "Comprendre le rôle du Parlement : l'Assemblée nationale et le Sénat.",
            difficulty: 1,
            contentMd: `## Situation

À la télévision, le président d'une chambre du Parlement annonce : « L'Assemblée nationale a adopté une loi. » Qui sont ces élus ?

## Définition

Le **Parlement** est l'institution qui exerce le **pouvoir législatif** : il vote les lois et contrôle le gouvernement. Il se compose de deux chambres :

- l'**Assemblée nationale** : ses membres, les députés, sont élus au suffrage universel direct pour 5 ans. Ils votent les lois, dont la loi de finances (budget de l'État) ;
- le **Sénat** : institué en 2018, il représente les collectivités territoriales (régions, communes) et les Ivoiriens de l'étranger. Les sénateurs sont élus au suffrage indirect pour 5 ans.

Rôle du Parlement :
- **voter les lois** (après examen en commission et débat en séance) ;
- **voter le budget** de l'État ;
- **contrôler l'action du gouvernement** (questions au gouvernement, commissions d'enquête).

## À retenir

- Le Parlement vote les lois et contrôle le gouvernement.
- Il comprend l'Assemblée nationale (députés élus directement) et le Sénat.
- Les députés sont élus pour 5 ans au suffrage universel direct.
- Voter le budget (loi de finances) est une attribution majeure du Parlement.
- La loi votée est promulguée par le Président de la République.

## Exemple corrigé

**Énoncé :** Cite deux rôles de l'Assemblée nationale.

**Corrigé :** Elle vote les lois et le budget de l'État ; elle contrôle l'action du gouvernement (par exemple par des questions au gouvernement).`,
          },
          {
            title: "Les droits et les devoirs du citoyen",
            summary: "Connaître les droits garantis au citoyen et les devoirs qui lui incombent.",
            difficulty: 1,
            contentMd: `## Situation

À la fin de l'émission, un journaliste dit : « Être citoyen, c'est avoir des droits… mais aussi des devoirs. » Explique cette phrase.

## Définition

Un **citoyen** est une personne qui, ayant la nationalité d'un État, jouit de droits civils et politiques et participe à la vie de sa communauté.

Les **droits** du citoyen ivoirien :
- droits civils : vie, liberté, propriété, protection égale de la loi ;
- droits politiques : voter, être éligible, adhérer à des partis et associations ;
- droits sociaux : éducation, santé, travail ;
- droits à la justice et à l'information.

Les **devoirs** du citoyen :
- respecter la Constitution et les lois ;
- payer ses impôts et taxes ;
- s'acquitter de ses obligations scolaires et professionnelles ;
- défendre la patrie et ses symboles ;
- respecter les autres citoyens et leurs droits ;
- participer à la vie de la cité : voter, contribuer aux travaux d'intérêt commun.

## À retenir

- Le citoyen jouit de droits civils, politiques et sociaux.
- Droits et devoirs vont toujours ensemble.
- Payer l'impôt et respecter la loi sont des devoirs fondamentaux.
- Voter est à la fois un droit et un devoir civique.
- La citoyenneté se vit chaque jour, pas seulement le jour du vote.

## Exemple corrigé

**Énoncé :** « Les droits et les devoirs du citoyen sont inséparables. » Justifie.

**Corrigé :** Pour que les droits de chacun soient garantis, chaque citoyen doit accomplir ses devoirs : si personne ne paie l'impôt, plus d'écoles ni d'hôpitaux ; si personne ne respecte la loi, plus de sécurité pour tous.`,
          },
          {
            title: "Les principes de la démocratie dans les clubs et les associations",
            summary: "Appliquer la démocratie dans la vie scolaire : réunion, débat, élection et règles communes.",
            difficulty: 1,
            contentMd: `## Situation

Le club « jeunes citoyens » de ton école veut élire un nouveau bureau. Comment organiser cette élection à la manière démocratique ?

## Définition

Un **club** ou une **association** est un groupe de personnes qui se réunissent autour d'un projet commun (sport, culture, environnement, solidarité). Pour fonctionner démocratiquement, il applique des principes :

- respecter des **statuts** (règles écrites approuvées par les membres) ;
- organiser des **assemblées générales** où tous les membres sont informés ;
- débattre librement : chacun peut donner son avis sans crainte ;
- **élire le bureau** (président, secrétaire, trésorier) au vote, à bulletin secret ou à main levée ;
- respecter la **décision de la majorité** tout en écoutant la minorité ;
- rendre des **comptes** : le trésorier présente les comptes de l'association.

## À retenir

- Les clubs et associations fonctionnent avec des statuts.
- L'assemblée générale réunit tous les membres.
- Le débat, le vote et l'élection sont des pratiques démocratiques.
- La décision de la majorité s'impose, dans le respect de la minorité.
- Le bureau élu rend des comptes aux membres.

## Exemple corrigé

**Énoncé :** Ton club doit choisir le lieu de sa prochaine sortie. Décris la démarche démocratique.

**Corrigé :** Le président convoque une assemblée générale ; chacun propose et argumente sa destination ; on vote ; la destination qui obtient le plus de voix est choisie ; la décision est consignée au procès-verbal.`,
          },
          {
            title: "L'entente entre les peuples",
            summary: "Comprendre l'importance de la paix, de la tolérance et de la solidarité entre les peuples.",
            difficulty: 1,
            contentMd: `## Situation

À l'école, des élèves d'origines différentes se disputent pour une histoire de football. Quelles valeurs permettraient de rétablir l'entente ?

## Définition

L'**entente entre les peuples** est la capacité des individus et des communautés à vivre ensemble dans la paix, malgré leurs différences (langues, cultures, religions, origines).

Elle repose sur :
- la **tolérance** : accepter les différences de l'autre ;
- le **respect mutuel** : considérer l'autre comme un égal ;
- le **dialogue** : parler pour résoudre les conflits ;
- la **solidarité** : s'entraider entre pays et entre communautés.

Des organisations favorisent cette entente en Afrique et dans le monde : l'**Union africaine (UA)**, la **CEDEAO** (Communauté économique des États de l'Afrique de l'Ouest) et l'**ONU**. En Côte d'Ivoire, la coexistence de nombreuses cultures est une richesse : la paix sociale se construit chaque jour.

## À retenir

- L'entente entre les peuples repose sur la tolérance et le respect.
- Le dialogue permet de prévenir et de régler les conflits.
- L'UA, la CEDEAO et l'ONU œuvrent pour la paix.
- La diversité culturelle est une richesse, pas une menace.
- La paix commence à l'école et dans le quartier.

## Exemple corrigé

**Énoncé :** Que peut faire une association d'élèves pour promouvoir l'entente entre les cultures de l'école ?

**Corrigé :** Organiser des journées culturelles où chaque groupe présente ses traditions, des débats sur le respect mutuel et des activités communes, pour apprendre à se connaître et à se respecter.`,
          },
        ],
      },
      {
        code: "5eme-entrepreneuriat-routiere",
        title: "Éducation routière et entrepreneuriat",
        description: "Compétence 3 : traiter une situation relative à l'entrepreneuriat et à l'éducation routière.",
        lessons: [
          {
            title: "Les engins à deux roues, les tricycles et les automobiles",
            summary: "Connaître les règles d'utilisation des deux-roues et des véhicules en ville et en campagne.",
            difficulty: 1,
            contentMd: `## Situation

Dans ta ville, des chauffeurs de moto-taxis roulent à vive allure entre les voitures, sans casque. Quels sont les dangers ?

## Définition

Les **engins à deux roues** (vélo, moto, mobylette), les **tricycles** (mototricycles de transport) et les **automobiles** sont réglementés par le code de la route : circulation, signalisation, équipements et contrôles.

Règles essentielles :
- porter un **casque** pour le conducteur et le passager de deux-roues ;
- détenir un **permis de conduire** adapté au véhicule (permis A pour la moto, permis B pour la voiture) et une assurance ;
- respecter les feux, la signalisation et les limites de vitesse ;
- faire contrôler régulièrement le véhicule (freins, éclairage, pneus) ;
- ne pas transporter trop de passagers ni de marchandises ;
- ne pas rouler sous l'effet de l'alcool ou de la fatigue ;
- en ville, la vitesse doit être réduite, notamment près des écoles.

## À retenir

- Le casque est obligatoire sur un deux-roues, conducteur et passager.
- Permis, assurance et contrôle du véhicule sont obligatoires.
- Respecter la vitesse et la signalisation protège tous les usagers.
- L'alcool et la fatigue sont des causes majeures d'accidents.
- La prudence près des écoles est un devoir de tous les conducteurs.

## Exemple corrigé

**Énoncé :** La moto d'un élève tombe en panne de freins, et son conducteur refuse de la réparer. Que risque-t-il ?

**Corrigé :** Un véhicule avec des freins défectueux est dangereux : le conducteur s'expose, ainsi que les passagers et les piétons, à un accident grave. Il doit réparer avant de reprendre la route.`,
          },
          {
            title: "Les activités génératrices de revenus (AGR)",
            summary: "Comprendre ce qu'est une AGR et son rôle dans la famille et la communauté.",
            difficulty: 1,
            contentMd: `## Situation

La mère de Mariam vend des beignets à la sortie de l'école pour compléter le budget familial. Quelle est l'importance de cette activité ?

## Définition

Les **activités génératrices de revenus (AGR)** sont de petites activités économiques qui produisent un revenu : petit commerce (beignets, sachets d'eau, fruits), transformation (jus, manioc, savon), élevage (volailles, chèvres), maraîchage, artisanat (coiffure, couture), vente de produits.

Elles sont importantes car elles :
- augmentent le revenu de la famille ;
- réduisent la pauvreté et la dépendance ;
- créent des emplois pour les jeunes et les femmes ;
- valorisent les savoir-faire locaux ;
- favorisent l'autonomie et l'épargne.

Une bonne gestion exige : un petit plan (produit, clients, prix), une comptabilité simple, le remboursement des prêts et l'épargne.

## À retenir

- Une AGR est une petite activité qui génère un revenu.
- Exemples : petit commerce, transformation, élevage, maraîchage.
- Elle réduit la pauvreté et crée des emplois locaux.
- Bien gérer signifie : planifier, compter, épargner.
- L'argent gagné doit servir à la famille, pas au gaspillage.

## Exemple corrigé

**Énoncé :** Pourquoi dit-on que la vente de jus par la mère de Mariam est une activité génératrice de revenus ?

**Corrigé :** Parce qu'elle produit de l'argent (un revenu) grâce à la transformation des fruits : cet argent finance les besoins de la famille, comme la scolarité des enfants.`,
          },
        ],
      },
      {
        code: "5eme-sante",
        title: "Santé et comportements responsables",
        description: "Compétence 4 : traiter une situation relative à la puberté, aux IST et aux comportements responsables.",
        lessons: [
          {
            title: "Les IST et le VIH/SIDA",
            summary: "Connaître les infections sexuellement transmissibles, le VIH/SIDA et leurs modes de prévention.",
            difficulty: 1,
            contentMd: `## Situation

Dans un film, un adolescent dit : « Le SIDA existe encore ? » Que sais-tu du VIH/SIDA pour répondre ?

## Définition

Les **infections sexuellement transmissibles (IST)** sont des maladies transmises lors des rapports sexuels : chlamydia, gonococcie, syphilis, hépatites B, et le **VIH** (virus de l'immunodéficience humaine). Le VIH affaiblit le système immunitaire : sans traitement, il peut évoluer vers le **SIDA**, stade des maladies opportunistes.

Modes de transmission du VIH :
- lors de rapports sexuels non protégés ;
- par le sang (transfusion contaminée, seringues partagées) ;
- de la mère à l'enfant : pendant la grossesse, l'accouchement ou l'allaitement.

Le VIH ne se transmet pas par les poignées de main, les baisers, les repas partagés, les piqûres de moustiques ni les toilettes.

Prévention : **abstinence** ou rapports protégés (préservatif), fidélité mutuelle, dépistage, traitement des IST, et pour la mère : suivi médical et traitement contre la transmission mère-enfant.

## À retenir

- Les IST se transmettent par les rapports sexuels.
- Le VIH attaque le système immunitaire et peut conduire au SIDA.
- Trois modes de transmission : sexuel, sanguin, mère-enfant.
- Le préservatif protège efficacement lors des rapports sexuels.
- Les malades du SIDA ne doivent être ni rejetés, ni discriminés.

## Exemple corrigé

**Énoncé :** Un élève pense que le VIH se transmet par les poignées de main. Qu'est-ce qui est faux ?

**Corrigé :** C'est faux : le VIH ne se transmet ni par les poignées de main, ni par les baisers ou les repas partagés. Il se transmet par les rapports sexuels non protégés, le sang et de la mère à l'enfant.`,
          },
          {
            title: "Les grossesses précoces",
            summary: "Comprendre les causes et les conséquences des grossesses chez les adolescentes.",
            difficulty: 1,
            contentMd: `## Situation

Une élève de 5ème tombe enceinte et abandonne l'école. Quelles sont les conséquences de la grossesse précoce pour elle et pour l'enfant ?

## Définition

Une **grossesse précoce** est une grossesse survenant chez une adolescente, avant qu'elle ne soit prête physiquement, psychologiquement et économiquement.

Ses causes : rapports sexuels précoces non protégés, manque d'information, pression sociale, parfois violences ou exploitation.

Ses conséquences :
- **médicales** : risques pour la santé de la mère et de l'enfant (accouchements difficiles, anémie, mortalité maternelle et infantile) ;
- **scolaires** : abandon de l'école et perte d'avenir professionnel ;
- **économiques** : précarité de la jeune mère et de son enfant ;
- **sociales** : rejet, exclusion, stigmatisation.

La prévention passe par l'information (éducation sexuelle), l'**abstinence**, le dialogue avec les parents, la protection lors des rapports et le refus de la pression du groupe.

## À retenir

- La grossesse précoce touche des adolescentes trop jeunes pour la porter et l'assumer.
- Elle entraîne des risques médicaux, scolaires et sociaux graves.
- Elle conduit souvent à l'abandon de l'école.
- L'abstinence est la protection la plus sûre.
- L'information et le dialogue protègent les adolescentes.

## Exemple corrigé

**Énoncé :** Cite deux conséquences d'une grossesse précoce.

**Corrigé :** Sur le plan médical : des risques pour la santé de la mère et de l'enfant ; sur le plan scolaire : l'abandon de l'école et la perte des chances d'avenir.`,
          },
          {
            title: "La consommation de l'alcool et l'usage de la drogue",
            summary: "Connaître les dangers de l'alcool et de la drogue et apprendre à dire non.",
            difficulty: 1,
            contentMd: `## Situation

À une fête, un grand frère propose de l'alcool à un adolescent : « Bois, c'est pour être un homme ! » Que doit répondre l'adolescent ?

## Définition

L'**alcool** (bière, vin, liqueurs) et les **drogues** (cannabis, chanvre, produits industriels détournés) sont des substances qui modifient le système nerveux et créent une **dépendance**.

Leurs dangers :
- sur la **santé** : maladies du foie, du cœur et du cerveau, troubles de la mémoire, surdose mortelle ;
- sur le **comportement** : violence, ivresse, perte de contrôle, accidents ;
- sur **l'école** : baisse des résultats, désintérêt, abandon ;
- sur la **vie sociale** : conflits familiaux, délinquance, exclusion ;
- la consommation d'alcool et de drogue est **interdite aux mineurs** par la loi.

Pour refuser : être informé, avoir confiance en soi, préparer ses réponses (« Non merci, je ne bois pas »), choisir des amis qui respectent ses choix et pratiquer des loisirs sains (sport, musique).

## À retenir

- L'alcool et la drogue créent une dépendance et détruisent la santé.
- Ils favorisent l'échec scolaire et les accidents.
- Leur consommation est interdite aux mineurs.
- Dire non, c'est un acte de liberté et de responsabilité.
- Les loisirs sains sont les meilleures protections.

## Exemple corrigé

**Énoncé :** Un camarade insiste pour que tu fumes du chanvre « pour être relax ». Comment réagis-tu ?

**Corrigé :** Je refuse fermement : le chanvre crée la dépendance, nuit au cerveau en développement et aggrave l'échec scolaire. Je m'éloigne poliment et j'informe un adulte de confiance si la pression continue.`,
          },
        ],
      },
      {
        code: "5eme-assainissement",
        title: "Hygiène publique et assainissement",
        description: "Compétence 5 : traiter une situation relative à l'assainissement du cadre de vie.",
        lessons: [
          {
            title: "L'hygiène publique et l'assainissement",
            summary: "Comprendre les règles d'hygiène qui protègent la santé de toute la communauté.",
            difficulty: 1,
            contentMd: `## Situation

Dans un quartier, les eaux usées s'écoulent dans la rue et les ordures s'accumulent devant les maisons. Quels sont les dangers pour la population ?

## Définition

L'**hygiène publique** est l'ensemble des règles et pratiques qui protègent la santé de la population : propreté des rues et des marchés, évacuation des eaux usées, gestion des déchets, vaccination, qualité de l'eau et des aliments.

L'**assainissement** regroupe les actions qui évitent la contamination par les déchets et les eaux sales : caniveaux, fosses septiques, bacs à ordures, ramassage des déchets.

Règles à appliquer :
- ne pas jeter les déchets dans les rues et les caniveaux ;
- vider et curer les caniveaux régulièrement ;
- traiter les eaux usées avant rejet (fosses septiques) ;
- participer aux journées de salubrité du quartier ;
- se laver les mains avant de manger et après les toilettes ;
- protéger l'eau de consommation (récipients couverts et propres).

## À retenir

- L'hygiène publique protège la santé de toute la communauté.
- L'assainissement évite la contamination par les déchets et les eaux usées.
- Caniveaux bouchés et ordures attirent les maladies.
- La salubrité est une affaire collective.
- Lavage des mains, eau propre, déchets gérés : les gestes qui sauvent.

## Exemple corrigé

**Énoncé :** Pourquoi la salubrité d'un quartier est-elle l'affaire de tous ?

**Corrigé :** Parce que chacun produit des déchets et des eaux usées : si tous les ménages participent au nettoyage et à la gestion des ordures, les maladies reculent pour tout le quartier.`,
          },
          {
            title: "La gestion des ordures ménagères",
            summary: "Apprendre à trier, évacuer et valoriser les ordures ménagères.",
            difficulty: 1,
            contentMd: `## Situation

Chaque semaine, la famille de Yao remplit plusieurs sacs de déchets. Où vont ces ordures et comment mieux les gérer ?

## Définition

Les **ordures ménagères** sont les déchets produits par les ménages : restes de cuisine, emballages, plastiques, papiers, verres, déchets de jardin.

Bien gérer ses ordures :
- **réduire** : acheter juste ce qu'il faut, éviter les emballages superflus ;
- **trier** : séparer les déchets biodégradables (épluchures), les plastiques, le papier, le verre ;
- **réutiliser** : bocaux, sacs, bouteilles en verre ;
- **consommer les déchets organiques** par le **compost** (engrais naturel pour le jardin) ;
- **évacuer** les déchets vers les bacs, poubelles publiques ou déchetteries prévues ;
- **interdire les déchets sauvages** : brûlage en pleine rue, dépôt dans les caniveaux et les espaces verts.

## À retenir

- Les ordures ménagères doivent être réduites, triées et évacuées.
- Le compost valorise les déchets organiques au jardin.
- Brûler les ordures dans la rue pollue l'air.
- Les déchets jetés dans la nature polluent les sols et les eaux.
- Une gestion saine des ordures évite les maladies et la pollution.

## Exemple corrigé

**Énoncé :** Que peut-on faire des épluchures de légumes au lieu de les jeter dans la rue ?

**Corrigé :** On peut les mettre dans un compost : elles se décomposent en engrais naturel qui fertilise le jardin potager. C'est de la valorisation des déchets organiques.`,
          },
        ],
      },
    ],
  },

  {
    gradeId: 3,
    gradeCode: "4eme",
    gradeName: "Quatrième",
    chapters: [
      {
        code: "4eme-protection-enfant",
        title: "Protection de l'enfant et lutte contre les discriminations",
        description: "Compétence 1 : traiter une situation relative aux droits de l'homme, aux droits de l'enfant et au droit international humanitaire.",
        lessons: [
          {
            title: "La promotion des droits de l'enfant",
            summary: "Faire connaître et défendre les droits de l'enfant dans son environnement.",
            difficulty: 2,
            contentMd: `## Situation

Dans ta commune, des enfants ne vont pas à l'école et travaillent. Une association veut lancer une campagne. Quel est son intérêt ?

## Définition

La **promotion des droits de l'enfant** consiste à faire connaître ces droits (CIDE de 1989, CADBE de 1990) et à agir pour qu'ils soient respectés : information, sensibilisation, formation, plaidoyer et dénonciation des violations.

Les droits de l'enfant se regroupent en 4 familles : **survie** (vie, santé, alimentation), **protection** (violences, exploitation, abus), **développement** (éducation, culture, loisirs) et **participation** (expression, association, information).

Des actions concrètes de promotion :
- célébrer la journée des droits de l'enfant (20 novembre) et la journée de l'enfant africain (16 juin) ;
- animer des clubs d'enfants et des émissions de sensibilisation ;
- signaler les cas d'exploitation, de mariage forcé ou de non-scolarisation ;
- encourager la participation des enfants dans les écoles et les villages.

## À retenir

- Promouvoir les droits de l'enfant, c'est les faire connaître et les défendre.
- 4 familles de droits : survie, protection, développement, participation.
- La Côte d'Ivoire a ratifié la CIDE le 4 février 1991.
- Les journées du 20 novembre et du 16 juin célèbrent l'enfant.
- Chacun peut promouvoir les droits de l'enfant.

## Exemple corrigé

**Énoncé :** Qu'est-ce que « promouvoir » les droits de l'enfant ?

**Corrigé :** C'est faire connaître les droits de l'enfant (information, sensibilisation) et agir pour leur respect : dénoncer les violations, soutenir les associations et encourager la participation des enfants.`,
          },
          {
            title: "La lutte contre le recrutement des enfants soldats",
            summary: "Comprendre le phénomène des enfants soldats, ses causes, ses conséquences et les moyens de lutte.",
            difficulty: 2,
            contentMd: `## Situation

Dans un pays en guerre, des adolescents sont enrôlés de force par des groupes armés. Pourquoi cela est-il une violation grave des droits ?

## Définition

Un **enfant soldat** est un enfant (moins de 18 ans) enrôlé de force ou volontairement par une armée ou un groupe armé, et utilisé comme combattant, porteur, messager, cuisinier ou espion.

Ses **causes** : conflits armés, pauvreté, insécurité, faible scolarisation, embrigadement par la contrainte ou la manipulation.

Ses **conséquences** : traumatismes physiques et psychologiques, perte de l'enfance et de l'école, violences subies, désinsertion sociale.

La **lutte** contre ce fléau :
- le **Protocole facultatif à la CIDE** (2000) interdit le recrutement des moins de 18 ans ;
- les **Principes de Paris** (2007) exigent la fin de l'utilisation des enfants soldats et leur réinsertion ;
- la justice internationale (Cour pénale internationale) peut poursuivre les responsables ;
- l'éducation, la paix et la réinsertion (école, formation, soutien psychologique) sont des outils de prévention et de reconstruction.

## À retenir

- Un enfant soldat est un enfant utilisé par une force armée.
- Ses causes : guerre, pauvreté, manipulation, faible scolarisation.
- Ses conséquences : traumatismes et perte de l'enfance.
- Le Protocole facultatif de 2000 interdit le recrutement des moins de 18 ans.
- La prévention passe par l'éducation, la paix et la réinsertion.

## Exemple corrigé

**Énoncé :** Cite deux moyens de lutte contre le recrutement des enfants soldats.

**Corrigé :** Les instruments juridiques (Protocole facultatif à la CIDE de 2000, Principes de Paris) et les actions de terrain : éducation, protection et programmes de réinsertion des enfants démobilisés.`,
          },
          {
            title: "Les instruments et mécanismes de protection contre les discriminations",
            summary: "Identifier les instruments juridiques et les mécanismes de lutte contre les discriminations.",
            difficulty: 2,
            contentMd: `## Situation

Une jeune fille souhaite s'inscrire dans un atelier de formation, mais on lui répond : « Les filles n'apprennent pas la mécanique. » Quel droit est bafoué ?

## Définition

La **discrimination** est un traitement injuste fondé sur la race, l'ethnie, le sexe, la religion, la langue, le handicap, la condition sociale ou l'opinion. Elle viole le principe d'égalité.

Les **instruments** de lutte :
- la **DUDH** (1948), articles 2 et 7 : égalité et protection égale devant la loi ;
- la **Convention internationale sur l'élimination de toutes les formes de discrimination raciale** (1965) ;
- la **Convention sur l'élimination de toutes les formes de discrimination à l'égard des femmes (CEDEF)** (1979) ;
- la **CIDE** (article 2) et la **CADBE** (1990) ;
- la Constitution ivoirienne et les lois nationales qui interdisent les discriminations.

Les **mécanismes** de protection : saisir les tribunaux, porter plainte, recourir aux institutions de défense des droits (Médiateur de la République, commissions des droits de l'homme, ONG), sensibiliser et éduquer contre les préjugés.

## À retenir

- La discrimination est un traitement injuste interdit par le droit.
- La DUDH, la CEDEF et la CIDE interdisent la discrimination.
- Les victimes disposent de recours : plainte, tribunaux, institutions de défense des droits.
- Éduquer contre les préjugés est une arme efficace.
- L'égalité est un droit pour tous, sans exception.

## Exemple corrigé

**Énoncé :** Quel droit est violé lorsqu'on refuse d'inscrire une fille à une formation de mécanique ?

**Corrigé :** Le droit à l'égalité et à la non-discrimination : le choix d'une formation ne doit dépendre ni du sexe, ni de l'origine. La jeune fille peut saisir les services sociaux ou la justice.`,
          },
        ],
      },
      {
        code: "4eme-institutions",
        title: "Institutions de la République et citoyenneté",
        description: "Compétence 2 : traiter une situation relative aux droits et devoirs du citoyen et aux principes de la démocratie.",
        lessons: [
          {
            title: "Les comportements responsables face aux symboles et institutions de la République",
            summary: "Adopter les comportements de respect envers les symboles et les institutions de l'État.",
            difficulty: 2,
            contentMd: `## Situation

Pendant la levée des couleurs, des élèves discutent entre eux. Pourquoi le respect des symboles est-il important ?

## Définition

Les **symboles de la République** (drapeau orange-blanc-vert, hymne L'Abidjanaise, devise « Union – Discipline – Travail », armoiries) représentent la Nation et ses valeurs.

Les **institutions de la République** sont les organes qui exercent le pouvoir : le **Président de la République** (chef de l'État, garant de la Constitution), l'**Assemblée nationale** (vote des lois), le Sénat, le gouvernement, la justice.

Les **comportements responsables** :
- respecter les symboles : se lever pendant l'hymne, ne pas dégrader le drapeau ;
- respecter les institutions : obéir aux lois, honorer les représentants élus ;
- consolider l'autorité de l'État : payer ses impôts, accomplir ses obligations ;
- participer à la vie publique : s'informer, voter en âge de le faire.

Ces comportements **consolident l'autorité de l'État** : un État respecté garantit l'ordre, la justice et le développement.

## À retenir

- Les symboles incarnent la Nation : ils méritent le respect.
- L'État s'appuie sur des institutions : Président, Parlement, justice.
- Respecter les institutions, c'est respecter la loi.
- L'autorité de l'État repose sur la participation des citoyens.
- Le civisme se manifeste chaque jour, pas seulement en période électorale.

## Exemple corrigé

**Énoncé :** Cite deux comportements qui consolident l'autorité de l'État.

**Corrigé :** Respecter les symboles et les institutions (hymne, drapeau, lois) et accomplir ses obligations de citoyen : payer ses impôts, s'informer et participer à la vie publique.`,
          },
          {
            title: "Le paiement de l'impôt",
            summary: "Comprendre le rôle de l'impôt et les responsabilités du citoyen contribuable.",
            difficulty: 2,
            contentMd: `## Situation

Un commerçant cache une partie de ses revenus pour ne pas payer d'impôts. Quelles sont les conséquences pour la collectivité ?

## Définition

L'**impôt** est une **contribution obligatoire** versée par les personnes et les entreprises à l'État et aux collectivités, pour financer les services publics : écoles, hôpitaux, routes, sécurité, justice.

Les principales formes d'impôt : les impôts **directs** (impôt sur les traitements et salaires, impôt sur les bénéfices des entreprises, contributions foncières) et les impôts **indirects** (TVA, droits de douane).

Le **rôle** de l'impôt :
- financer les investissements publics et les services sociaux ;
- assurer la redistribution et réduire les inégalités.

Les **responsabilités du citoyen** :
- déclarer ses revenus avec exactitude ;
- payer l'impôt dans les délais ;
- ne pas frauder (fausses déclarations, corruption) ;
- exiger la bonne gestion des fonds publics.

La fraude fiscale prive l'État de ressources : les services publics se dégradent pour tous.

## À retenir

- L'impôt est une contribution obligatoire au service de tous.
- Il finance les écoles, hôpitaux, routes, sécurité et justice.
- Directs (revenus, bénéfices) ou indirects (TVA, douanes).
- Déclarer et payer son impôt est un devoir citoyen.
- La fraude fiscale appauvrit la collectivité.

## Exemple corrigé

**Énoncé :** Pourquoi l'impôt est-il qualifié de « devoir du citoyen » ?

**Corrigé :** Parce qu'il finance les services publics dont tous profitent (écoles, hôpitaux, routes). Sans impôts, l'État ne peut plus remplir ses missions. Le payer exactement et à temps est donc un devoir civique.`,
          },
          {
            title: "Les organisations de la société civile",
            summary: "Comprendre le rôle des organisations de la société civile dans la démocratie et le développement.",
            difficulty: 2,
            contentMd: `## Situation

Une association de quartier organise une collecte pour les enfants démunis de l'école. À quelle catégorie d'organisations appartient-elle ?

## Définition

La **société civile** regroupe les organisations non politiques et non étatiques qui expriment les intérêts et les préoccupations des citoyens : **associations** (développement, culture, sport), **ONG** (humanitaire, environnement, droits de l'homme), **syndicats** (travailleurs), **organisations professionnelles** (agriculteurs, commerçants), groupements féminins et associations de quartier.

Leur **rôle** :
- défendre les droits et intérêts des populations ;
- fournir des services : éducation, santé, formation, microcrédit ;
- sensibiliser et éduquer les citoyens ;
- **contrôler** l'action des pouvoirs publics et lutter contre l'injustice ;
- promouvoir le **bien-être des populations** et le développement local.

Une société civile forte est un pilier de la démocratie : elle relie les citoyens aux décideurs et veille à l'intérêt général.

## À retenir

- La société civile rassemble associations, ONG, syndicats et groupements.
- Elle défend les citoyens et complète l'action de l'État.
- Elle participe au développement et au bien-être des populations.
- Elle exerce un regard citoyen sur la gestion publique.
- Une société civile active renforce la démocratie.

## Exemple corrigé

**Énoncé :** Cite deux rôles d'une ONG de quartier.

**Corrigé :** Fournir des services aux populations (alphabétisation, santé, microcrédit) et sensibiliser les citoyens à leurs droits, tout en contribuant au développement local.`,
          },
        ],
      },
      {
        code: "4eme-famille-entreprise",
        title: "Famille, entreprise et cohésion sociale",
        description: "Compétence 3 : traiter une situation relative à la gestion des ressources, à l'entrepreneuriat et à la vie communautaire.",
        lessons: [
          {
            title: "L'utilisation rationnelle des ressources et le bien-être de la famille",
            summary: "Bien gérer les ressources de la famille pour assurer son bien-être.",
            difficulty: 2,
            contentMd: `## Situation

À la fin du mois, la famille de Koffi n'a plus d'argent, alors qu'elle a reçu un important revenu. Que s'est-il passé ?

## Définition

Les **ressources de la famille** sont l'ensemble de ses moyens : revenus (salaire, commerce, agriculture), épargne, biens (terres, maison, outils).

L'**utilisation rationnelle** des ressources consiste à les gérer avec méthode :
- établir un **budget familial** : noter les entrées (revenus) et les sorties (dépenses) ;
- classer les besoins par **priorité** : alimentation, santé, éducation, logement avant les dépenses secondaires ;
- **épargner** une partie des revenus pour les imprévus et les projets ;
- éviter le gaspillage et les achats impulsifs ;
- faire des achats groupés et comparer les prix ;
- associer tous les membres de la famille à la gestion.

Le **bien-être familial** (santé, éducation, repos, sécurité) dépend d'une gestion équilibrée des ressources.

## À retenir

- Les ressources de la famille : revenus, épargne et biens.
- Le budget familial classe les dépenses par priorité.
- Épargner protège des imprévus.
- Éviter le gaspillage assure le bien-être de tous.
- Tous les membres de la famille participent à la gestion.

## Exemple corrigé

**Énoncé :** La famille de Mariam a 100 000 FCFA par mois. Classe les dépenses par ordre de priorité.

**Corrigé :** 1. Alimentation, 2. Santé et éducation des enfants, 3. Logement et transport, 4. Épargne, 5. Dépenses secondaires (loisirs, vêtements).`,
          },
          {
            title: "L'entreprise et l'insertion dans la vie active",
            summary: "Comprendre ce qu'est une entreprise et comment s'insérer dans la vie active.",
            difficulty: 2,
            contentMd: `## Situation

Après le BEPC, un jeune hésite entre créer une petite entreprise et chercher un emploi. Quelles sont ses options ?

## Définition

L'**entreprise** est une organisation qui produit des biens (meubles, vêtements, aliments) ou des services (transport, coiffure, réparation) dans le but de réaliser un profit.

On distingue : les très petites entreprises (TPE) et petites et moyennes entreprises (**PME**), les grandes entreprises et les industries. On peut aussi distinguer les entreprises privées et publiques (État).

L'**insertion dans la vie active** est le passage de la formation à l'activité professionnelle. Elle peut se faire :
- par l'**emploi salarié** (dans une entreprise, l'administration) ;
- par **l'auto-emploi** : créer sa propre activité (métier, petit commerce, atelier) ;
- par la **formation professionnelle** et l'apprentissage d'un métier ;
- par le **travail indépendant** : artisan, commerçant, prestataire.

Réussir son insertion exige : une formation, un projet clair, du sérieux, de la persévérance et le développement de ses qualités.

## À retenir

- L'entreprise produit des biens ou des services dans un but de profit.
- TPE, PME, industries : différentes tailles d'entreprises.
- L'insertion peut passer par l'emploi salarié, l'auto-emploi ou l'apprentissage.
- La formation et le projet professionnel favorisent l'insertion.
- Entreprendre, c'est créer son propre emploi.

## Exemple corrigé

**Énoncé :** Cite deux façons de s'insérer dans la vie active après l'école.

**Corrigé :** Trouver un emploi salarié dans une entreprise ou une administration, et créer sa propre activité (auto-emploi) : atelier, commerce, prestations de services.`,
          },
          {
            title: "Les alliances interethniques : les cultures des Kwa et des Krou",
            summary: "Découvrir les alliances interethniques qui renforcent la cohésion sociale en Côte d'Ivoire.",
            difficulty: 2,
            contentMd: `## Situation

Dans un village, deux communautés différentes pratiquent le « cousinage à plaisanterie » : ils se taquinent sans que cela crée de conflit. Que représente cette pratique ?

## Définition

Les **alliances interethniques** sont des liens historiques et culturels entre des groupes ethniques, fondés sur le respect mutuel et la solidarité. Le **cousinage à plaisanterie** (ou alliance à plaisanterie) permet de se taquiner, de plaisanter et de se critiquer sans offense : il prévient et apaise les conflits.

En Côte d'Ivoire, les peuples sont regroupés en grands ensembles culturels : les **Akan** (dont les Kwa : Baoulé, Agni, Abbey, Attié…), les **Krou** (Bété, Dida, Wê, Guéré…), les **Mandé** et les **Gour**.

Les cultures **Kwa** et **Krou** illustrent la diversité : langues, danses, masques, traditions agraires. Leurs alliances historiques (par exemple entre Baoulé et certains peuples Krou) se manifestent par l'entraide, les mariages et les échanges.

Ces alliances renforcent la **cohésion sociale** : elles rappellent que la diversité est une richesse et que tous les Ivoiriens sont unis par le destin commun de la Nation.

## À retenir

- Les alliances interethniques unissent les peuples par le respect et la solidarité.
- Le cousinage à plaisanterie apaise les tensions.
- Les grands ensembles culturels ivoiriens : Akan, Krou, Mandé, Gour.
- Les Kwa (Baoulé, Agni) et les Krou (Bété, Dida) cultivent des alliances anciennes.
- La diversité culturelle renforce la cohésion nationale.

## Exemple corrigé

**Énoncé :** Quel est le rôle du cousinage à plaisanterie entre communautés ?

**Corrigé :** Il crée des liens de parenté symbolique qui permettent de plaisanter et de se critiquer sans offense, de prévenir les conflits et de rétablir la paix en cas de désaccord.`,
          },
        ],
      },
      {
        code: "4eme-sante-adolescent",
        title: "La santé et les comportements responsables de l'adolescent",
        description: "Compétence 4 : traiter une situation relative à la santé et aux comportements responsables de l'adolescent.",
        lessons: [
          {
            title: "Les comportements responsables contre les grossesses à risques et les IST/VIH",
            summary: "Adopter les comportements qui protègent l'adolescent des grossesses à risques et des IST/VIH.",
            difficulty: 2,
            contentMd: `## Situation

Une adolescente apprend qu'elle est enceinte et ne sait pas vers qui se tourner. Quels comportements auraient pu éviter cette situation ?

## Définition

Une **grossesse à risques** est une grossesse qui présente des dangers pour la santé de la mère ou de l'enfant : grossesse de l'adolescente, grossesses rapprochées, grossesse après 40 ans ou sans suivi médical.

Les **IST** (infections sexuellement transmissibles) et le **VIH/SIDA** se transmettent lors de rapports sexuels non protégés. Leur prévention passe par l'abstinence, le préservatif, la fidélité et le dépistage.

Les **comportements responsables** de l'adolescent :
- s'informer auprès des adultes de confiance et des structures de santé ;
- pratiquer l'abstinence et différer les rapports sexuels ;
- utiliser le préservatif en cas de rapports ;
- se faire dépister et se faire soigner sans honte ;
- accompagner une amie ou un camarade en difficulté vers un centre de santé ;
- refuser la stigmatisation des personnes vivant avec le VIH.

## À retenir

- La grossesse de l'adolescente est une grossesse à risques.
- Les IST/VIH se préviennent par l'abstinence ou le préservatif.
- Le dépistage est un acte responsable, sans honte.
- L'information et le dialogue protègent les adolescents.
- Accompagner et ne pas juger : la solidarité est aussi une prévention.

## Exemple corrigé

**Énoncé :** Cite deux comportements responsables face au risque de grossesse précoce.

**Corrigé :** Pratiquer l'abstinence et différer les rapports sexuels, et s'informer auprès d'un adulte de confiance ou d'un centre de santé avant toute situation à risque.`,
          },
          {
            title: "Les comportements responsables de l'adolescent et l'intégration sociale harmonieuse",
            summary: "S'insérer positivement dans la société en adoptant des comportements responsables.",
            difficulty: 2,
            contentMd: `## Situation

Un adolescent dit : « Tant que je ne fais pas de mal, je peux faire ce que je veux, même manquer l'école et traîner la nuit. » Que lui réponds-tu ?

## Définition

L'**adolescence** est la période de transition entre l'enfance et l'âge adulte (12-18 ans environ). Elle se caractérise par des transformations physiques et psychologiques et par la recherche de son identité.

Les **comportements responsables** de l'adolescent :
- poursuivre sérieusement ses **études** (assiduité, travail personnel) ;
- respecter ses parents, ses enseignants et les règles de la maison et de l'école ;
- pratiquer des **loisirs sains** : sport, musique, lecture, clubs ;
- éviter les dangers : drogue, alcool, bandes violentes, internet dangereux ;
- gérer ses émotions et dialoguer plutôt que se taire ou s'isoler ;
- aider sa famille et s'engager dans sa communauté (bénévolat).

L'**intégration sociale harmonieuse** est la capacité à trouver sa place dans la société par le respect, le travail, la participation et l'échange positif avec les autres.

## À retenir

- L'adolescence est une période de transformation et de construction de soi.
- Les études et le respect des règles aident grandement à s'insérer.
- Les loisirs sains protègent des mauvaises fréquentations.
- Le dialogue est plus fort que l'isolement.
- L'intégration harmonieuse se construit par la participation et le respect.

## Exemple corrigé

**Énoncé :** Cite deux comportements qui favorisent l'intégration sociale de l'adolescent.

**Corrigé :** Réussir sérieusement ses études et pratiquer des loisirs sains (sport, musique, clubs), tout en aidant sa famille et sa communauté.`,
          },
        ],
      },
      {
        code: "4eme-environnement",
        title: "Protection de l'environnement et du cadre de vie",
        description: "Compétence 5 : traiter une situation relative à l'assainissement du cadre de vie et à la protection de l'environnement.",
        lessons: [
          {
            title: "La préservation de l'environnement et le bien-être de la population",
            summary: "Protéger l'environnement pour garantir le bien-être présent et futur de la population.",
            difficulty: 2,
            contentMd: `## Situation

Dans ta région, la forêt recule à cause de l'orpaillage et des feux de brousse. Quelles en sont les conséquences ?

## Définition

L'**environnement** est l'ensemble des éléments naturels qui entourent l'homme : l'air, l'eau, les sols, la faune, la flore et le climat.

La **préservation de l'environnement** regroupe les actions qui protègent ces ressources :
- lutter contre la **déforestation** : reboiser, respecter les forêts classées ;
- prévenir les **feux de brousse** et l'orpaillage illégal ;
- réduire la **pollution** : déchets plastiques, eaux usées, fumées, produits chimiques ;
- protéger la **biodiversité** (plantes et animaux) et les aires protégées ;
- économiser l'eau et l'énergie ;
- éduquer et sensibiliser la population.

Protéger l'environnement, c'est garantir le **bien-être de la population** : air pur, eau potable, sols fertiles, climat stable, santé préservée. Un environnement dégradé nuit à la santé et aux activités économiques.

## À retenir

- L'environnement est le cadre de vie naturel de l'homme.
- Déforestation, feux, pollution et orpaillage le dégradent.
- Reboisement, propreté et économie des ressources le protègent.
- Un environnement sain garantit la santé et le bien-être.
- Chacun peut agir : tri, jardinage, respect de la nature.

## Exemple corrigé

**Énoncé :** Cite deux gestes de protection de l'environnement au quotidien.

**Corrigé :** Recycler les déchets et ne pas les brûler, et reboiser ou entretenir les arbres autour de la maison et de l'école, tout en économisant l'eau et l'énergie.`,
          },
          {
            title: "L'entretien des latrines et des toilettes",
            summary: "Entretenir les latrines pour préserver le cadre de vie et la santé de la communauté.",
            difficulty: 2,
            contentMd: `## Situation

Dans un marché, les latrines publiques sont insalubres : cela fait fuir les clients. Que faut-il faire ?

## Définition

Les **latrines** sont des installations sanitaires utilisées pour les besoins naturels. Mal entretenues, elles deviennent une source de maladies : choléra, typhoïde, dysenterie, vers intestinaux, infections cutanées.

Les règles d'entretien et de **préservation du cadre de vie** :
- nettoyer chaque jour avec de l'eau, du savon ou de l'eau de javel ;
- fermer la fosse et la porte après usage ;
- se laver les mains au savon après être allé aux toilettes ;
- ne pas jeter d'objets qui bouchent la fosse ;
- curer régulièrement les fosses et les vider par des professionnels ;
- fermer les fosses pleines et creuser de nouvelles latrines à distance des maisons, des puits et des cours d'eau.

Des latrines propres protègent la santé, la dignité des usagers et l'image du quartier ; elles respectent aussi les règles d'assainissement de la commune.

## À retenir

- Des latrines sales transmettent des maladies graves.
- Nettoyage quotidien et lavage des mains sont obligatoires.
- Les fosses doivent être curées et fermées correctement.
- Les latrines doivent être éloignées des puits et des cours d'eau.
- Entretenir les latrines protège la santé et la dignité de tous.

## Exemple corrigé

**Énoncé :** Pourquoi faut-il installer les latrines loin des puits ?

**Corrigé :** Parce que les excréments contaminent le sol et les nappes d'eau : une fosse trop proche d'un puits pollue l'eau de boisson et provoque des épidémies.`,
          },
          {
            title: "L'entretien des points d'eau",
            summary: "Protéger les points d'eau pour préserver la santé des populations.",
            difficulty: 2,
            contentMd: `## Situation

Dans ton village, les bœufs boivent au même marigot que les habitants. Quels sont les risques ?

## Définition

Les **points d'eau** sont les lieux d'approvisionnement en eau : puits, forages, sources, marigots, cours d'eau, retenues d'eau.

L'eau non protégée est un vecteur de maladies : **diarrhées, choléra, typhoïde, paludisme (moustiques), vers parasites**. La protection des points d'eau garantit la **santé des populations**.

Règles d'entretien :
- éviter les activités polluantes à proximité (bétail, lessive, latrines, déchets) ;
- clôturer les puits et les sources ; couvrir les puits (puits busés) ;
- désinfecter les puits (eau de javel, chlore) et traiter l'eau de boisson ;
- curer régulièrement les marigots et les retenues d'eau ;
- faire analyser l'eau des forages et tests de qualité ;
- sensibiliser la communauté au partage et à l'économie de l'eau.

## À retenir

- L'eau sale transmet diarrhées, choléra et parasites.
- Les points d'eau doivent être propres, couverts et éloignés des pollutions.
- Traiter l'eau de boisson protège la famille.
- Bétail, lessive et latrines doivent être tenus à distance.
- L'eau est un bien précieux : la protéger, c'est protéger la santé.

## Exemple corrigé

**Énoncé :** Cite deux règles de protection d'un puits de village.

**Corrigé :** Le couvrir et le clôturer pour empêcher les chutes et la pollution, et tenir à distance le bétail, les latrines et les déchets, tout en désinfectant l'eau régulièrement.`,
          },
        ],
      },
    ],
  },

  {
    gradeId: 4,
    gradeCode: "3eme",
    gradeName: "Troisième",
    chapters: [
      {
        code: "3eme-droits-humanitaires",
        title: "Droits humains et protection des personnes vulnérables",
        description: "Compétence 1 : traiter une situation relative aux droits de l'homme, aux droits de l'enfant et au droit international humanitaire.",
        lessons: [
          {
            title: "Les devoirs de parents",
            summary: "Connaître les obligations des parents envers leurs enfants et réciproquement.",
            difficulty: 2,
            contentMd: `## Situation

Un élève est régulièrement absent de l'école parce que ses parents l'emploient à la maison ou au champ. Quels devoirs des parents sont bafoués ?

## Définition

Les **devoirs de parents** sont les obligations légales et morales que les parents ont envers leurs enfants. L'autorité parentale s'accompagne de responsabilités :

- **éduquer** l'enfant : l'envoyer à l'école, veiller à son instruction et à sa formation ;
- **nourrir, loger et habiller** l'enfant (obligation d'entretien) ;
- **protéger** l'enfant contre les violences, les mauvais traitements et les dangers ;
- assurer la **santé** de l'enfant (vaccins, soins) ;
- lui transmettre les **valeurs** : respect, travail, honnêteté, civisme ;
- représenter l'enfant dans les actes de la vie civile (inscription à l'école, papiers).

En contrepartie, l'enfant doit le **respect**, l'obéissance et l'assistance à ses parents, notamment lorsqu'ils vieillissent.

La Bible de la famille ivoirienne reste la solidarité : parents et enfants sont unis par des devoirs réciproques.

## À retenir

- Les parents doivent nourrir, éduquer, protéger et soigner leurs enfants.
- L'obligation scolaire relève de la responsabilité des parents.
- L'enfant doit respect et assistance à ses parents.
- La négligence parentale est une violation des droits de l'enfant.
- La famille est fondée sur des devoirs réciproques.

## Exemple corrigé

**Énoncé :** Cite trois devoirs des parents envers leurs enfants.

**Corrigé :** Nourrir et entretenir l'enfant, l'éduquer et l'envoyer à l'école, le protéger contre les violences et veiller à sa santé.`,
          },
          {
            title: "Les organisations humanitaires",
            summary: "Connaître les organisations humanitaires, leurs principes et leurs actions.",
            difficulty: 2,
            contentMd: `## Situation

Après une inondation, des équipes distribuent de la nourriture et des médicaments dans ta région. Qui sont ces organisations ?

## Définition

Les **organisations humanitaires** sont des institutions et associations qui portent assistance aux personnes en détresse : victimes de conflits, de catastrophes naturelles, malades, réfugiés, déplacés et populations pauvres.

On distingue :
- les organisations **internationales** : le **CICR** (Comité international de la Croix-Rouge, protection en temps de conflit), l'**UNICEF** (enfants), le **HCR** (réfugiés), le **PAM** (Programme alimentaire mondial), l'**OMS** (santé), les **ONG** internationales (Médecins sans frontières, etc.) ;
- les organisations **nationales** : la Croix-Rouge de Côte d'Ivoire, les associations de solidarité et les ONG locales.

Les **principes humanitaires** : humanité (porter secours sans distinction), impartialité (aider selon les besoins, sans préférence), neutralité (ne pas prendre parti dans les conflits) et indépendance.

Leurs **actions** : secours d'urgence, soins de santé, eau potable, nourriture, abris, éducation, protection de l'enfance, reconstruction et développement.

## À retenir

- Les organisations humanitaires viennent en aide aux personnes en détresse.
- CICR, UNICEF, HCR, PAM, OMS : les grandes organisations internationales.
- Quatre principes : humanité, impartialité, neutralité, indépendance.
- Leur action : secours, santé, eau, nourriture, éducation, protection.
- La Croix-Rouge de Côte d'Ivoire agit au niveau national.

## Exemple corrigé

**Énoncé :** Nomme deux organisations humanitaires et une action de chacune.

**Corrigé :** Le CICR protège les personnes en temps de conflit ; l'UNICEF protège les enfants (vaccination, éducation) ; le PAM distribue de la nourriture aux populations en insécurité alimentaire.`,
          },
          {
            title: "Les instruments et mécanismes de protection contre les violences faites aux personnes vulnérables",
            summary: "Identifier les outils juridiques et les mécanismes qui protègent les personnes vulnérables.",
            difficulty: 2,
            contentMd: `## Situation

Une fille-mère est régulièrement battue par son compagnon et n'ose rien dire. Quels instruments et mécanismes la protègent ?

## Définition

Les **personnes vulnérables** sont celles qui sont exposées aux violences et à l'exploitation en raison de leur âge, de leur sexe, de leur état de santé ou de leur situation : **enfants, femmes, personnes âgées, personnes handicapées, déplacés**.

Les **violences** peuvent être physiques (coups), sexuelles, morales (insultes, humiliations) ou économiques (exploitation, spoliation).

Les **instruments** de protection :
- la **DUDH** (1948) et les conventions onusiennes : **CEDEF** (1979, femmes), **CIDE** (1989, enfants), Convention relative aux droits des **personnes handicapées** (2006) ;
- la **CADBE** (1990) et la protection des personnes âgées dans le droit africain ;
- la **Constitution ivoirienne** et les lois nationales réprimant les violences (code pénal, loi sur les mutilations génitales, loi contre le harcèlement).

Les **mécanismes** de protection : porter plainte à la police ou la gendarmerie, saisir les tribunaux, recourir aux services sociaux, aux ONG de défense des droits, aux lignes d'assistance (enfance en danger), et bénéficier de structures d'accueil et de prise en charge.

## À retenir

- Personnes vulnérables : enfants, femmes, aînés, handicapés, déplacés.
- Violences : physiques, sexuelles, morales, économiques.
- CEDEF, CIDE, CADBE : instruments internationaux clés.
- Plainte, tribunaux et services sociaux : les mécanismes de recours.
- Dénoncer et protéger les victimes est un devoir citoyen.

## Exemple corrigé

**Énoncé :** Cite deux mécanismes de protection d'une personne vulnérable victime de violences.

**Corrigé :** Porter plainte (police, gendarmerie) et se faire accompagner par une ONG ou un service social qui assure la prise en charge (protection, hébergement, soutien psychologique).`,
          },
        ],
      },
      {
        code: "3eme-democratie",
        title: "Démocratie, institutions et vie politique",
        description: "Compétence 2 : traiter une situation relative aux droits et devoirs du citoyen et aux principes de la démocratie.",
        lessons: [
          {
            title: "Les partis politiques",
            summary: "Comprendre le rôle des partis politiques dans la démocratie ivoirienne.",
            difficulty: 2,
            contentMd: `## Situation

À quelques mois d'une élection, plusieurs partis politiques organisent des meetings. Quel est leur rôle dans la démocratie ?

## Définition

Un **parti politique** est une organisation qui regroupe des citoyens partageant une même vision de la société et qui vise à conquérir le pouvoir par les élections pour y appliquer son programme.

Son **rôle** dans la démocratie :
- exprimer la volonté des citoyens et relayer leurs préoccupations ;
- proposer des **programmes** de gouvernement ;
- désigner des **candidats** aux élections ;
- former les citoyens à la vie politique et civique ;
- **contrôler** l'action du gouvernement (opposition) ;
- contribuer au pluralisme politique.

En Côte d'Ivoire, la vie politique est organisée par la loi : les partis doivent être déclarés et respecter les règles de financement et de fonctionnement démocratique. La liberté de créer un parti et d'y adhérer est garantie par la Constitution.

## À retenir

- Un parti politique vise à conquérir le pouvoir par les élections.
- Il propose un programme et présente des candidats.
- Il éduque les citoyens et contrôle le gouvernement.
- Le pluralisme des partis est un principe démocratique.
- Les partis doivent fonctionner dans le respect de la loi.

## Exemple corrigé

**Énoncé :** Cite deux rôles des partis politiques en démocratie.

**Corrigé :** Proposer des programmes et présenter des candidats aux élections, et contrôler l'action du gouvernement tout en éduquant les citoyens à la vie politique.`,
          },
          {
            title: "Les institutions juridictionnelles",
            summary: "Connaître l'organisation de la justice en Côte d'Ivoire et le rôle des juridictions.",
            difficulty: 2,
            contentMd: `## Situation

Un commerçant veut porter un litige devant la justice. Devant quels tribunaux peut-il se présenter ?

## Définition

Les **institutions juridictionnelles** sont les tribunaux et cours chargés de rendre la **justice** : trancher les litiges, punir les infractions et protéger les droits.

En Côte d'Ivoire, la justice est organisée en deux grands ordres :
- l'**ordre judiciaire** : les **tribunaux de première instance** (affaires civiles, pénales, familiales), les **cours d'appel** (réexamen des décisions), et la **Cour de cassation** (contrôle de l'application du droit) ;
- l'ordre **administratif** : le tribunal administratif et le **Conseil d'État**, qui jugent les litiges entre les citoyens et l'administration.

Des juridictions **spécialisées** existent : tribunal de commerce, tribunal du travail, tribunal militaire, et le **Conseil constitutionnel** (contrôle de la constitutionnalité des lois et des élections). La **Cour des comptes** contrôle la gestion des finances publiques et la **Haute Cour de justice** juge les hauts responsables politiques.

Principes de la justice : indépendance du juge, publicité des audiences, double degré de juridiction (possibilité d'appel) et droits de la défense.

## À retenir

- Les juridictions règlent les litiges et punissent les infractions.
- Tribunal de première instance, cour d'appel, Cour de cassation : ordre judiciaire.
- Conseil d'État et tribunal administratif : ordre administratif.
- Conseil constitutionnel, Cour des comptes : juridictions spécialisées.
- Tout justiciable a droit à un procès équitable.

## Exemple corrigé

**Énoncé :** Où se règle d'abord un litige entre deux commerçants ?

**Corrigé :** Au tribunal de commerce (ou devant le tribunal de première instance). La décision peut ensuite être réexaminée en appel, puis contrôlée par la Cour de cassation si des règles de droit ont été mal appliquées.`,
          },
          {
            title: "Le scrutin électoral",
            summary: "Comprendre l'organisation des élections et le déroulement du vote en Côte d'Ivoire.",
            difficulty: 2,
            contentMd: `## Situation

Le jour d'une élection, un électeur se présente au bureau de vote sans sa carte d'électeur. Peut-il voter ?

## Définition

Le **scrutin électoral** est l'opération par laquelle les citoyens choisissent leurs représentants : élection **présidentielle**, **législatives** (députés), **sénatoriales**, **régionales**, **municipales** et référendums.

En Côte d'Ivoire, les élections sont organisées par la **CEI** (Commission électorale indépendante). Le vote est **secret**, **libre** et **égal**.

Le processus électoral :
1. l'inscription sur la **liste électorale** (avec la carte nationale d'identité) ;
2. la remise de la **carte d'électeur** ;
3. la convocation du corps électoral et la **campagne électorale** ;
4. le **vote** : présentation de la carte, émargement, bulletin dans l'enveloppe, bulletin déposé dans l'urne ;
5. le **dépouillement** public et la **proclamation** des résultats ;
6. le **contentieux électoral** : les contestations sont jugées (Conseil constitutionnel pour la présidentielle).

Devoirs de l'électeur : vérifier son inscription, voter librement et en connaissance de cause, respecter le secret du vote et l'ordre au bureau.

## À retenir

- Le scrutin permet aux citoyens de choisir leurs dirigeants.
- La CEI organise les élections en Côte d'Ivoire.
- Le vote est libre, secret et égal.
- Carte d'électeur, émargement, urne : les étapes du vote.
- Voter est un droit et un devoir civique.

## Exemple corrigé

**Énoncé :** Un électeur ne peut pas se présenter au bureau de vote sans carte d'électeur. Vrai ou faux ?

**Corrigé :** Vrai : la carte d'électeur (ou un justificatif d'inscription accepté) est exigée pour vérifier l'identité et l'éligibilité de l'électeur sur la liste électorale, avant l'émargement.`,
          },
          {
            title: "Le civisme fiscal",
            summary: "Comprendre le devoir fiscal du citoyen et l'utilisation des impôts.",
            difficulty: 2,
            contentMd: `## Situation

Un artisan déclare moins de revenus qu'il n'en gagne pour payer moins d'impôts. Qu'est-ce que cette attitude a de répréhensible ?

## Définition

Le **civisme fiscal** est l'attitude du citoyen qui remplit volontairement et correctement ses obligations fiscales : déclarer ses revenus, payer ses impôts et taxes dans les délais, ne pas frauder.

L'impôt est une **contribution obligatoire** qui finance les services publics : éducation, santé, routes, sécurité, justice, administration. En Côte d'Ivoire, les impôts sont gérés par la **Direction générale des impôts (DGI)** et les recettes collectées alimentent le **budget de l'État**.

Les comportements de civisme fiscal :
- déclarer exactement ses revenus et sa situation ;
- payer l'impôt dans les délais ;
- conserver ses factures et reçus ;
- accompagner l'administration fiscale en cas de contrôle ;
- lutter contre la fraude, la corruption et le détournement.

Les **comportements inciviques** (fraude, fausses déclarations, corruption, contrebande) privent l'État de ressources, dégradent les services publics et font peser plus d'impôts sur les contribuables honnêtes.

## À retenir

- Le civisme fiscal : déclarer et payer ses impôts honnêtement.
- L'impôt finance les services publics de tous.
- La DGI gère les impôts en Côte d'Ivoire.
- Frauder, c'est voler la collectivité.
- Chaque contribuable honnête assure le développement du pays.

## Exemple corrigé

**Énoncé :** Pourquoi la fraude fiscale est-elle un comportement incivique ?

**Corrigé :** Parce qu'elle prive l'État des recettes qui financent les écoles, les hôpitaux et les routes : les services publics se dégradent et les contribuables honnêtes sont surchargés.`,
          },
        ],
      },
      {
        code: "3eme-biens-publics",
        title: "Les biens publics et leur protection",
        description: "Compétence : traiter une situation relative à la gestion des biens publics et à leur protection.",
        lessons: [
          {
            title: "Les biens publics",
            summary: "Connaître les biens publics, leur importance et la nécessité de les protéger.",
            difficulty: 2,
            contentMd: `## Situation

Dans une commune, des équipements du marché et des bancs publics sont dégradés et volés. Pourquoi faut-il les protéger ?

## Définition

Les **biens publics** sont les biens qui appartiennent à la collectivité et servent à tous : écoles, hôpitaux et centres de santé, routes et ponts, marchés, gares, monuments, jardins publics, équipements sportifs, eau, énergie et installations de distribution.

Ils sont financés par l'**impôt** et gérés par l'État et les collectivités.

Pourquoi les protéger ?
- ils servent à **tous les citoyens** : les dégrader, c'est pénaliser toute la communauté ;
- ils représentent l'héritage commun et l'image de la nation ;
- les remplacer coûte très cher à la collectivité.

Les comportements de protection :
- utiliser les équipements avec soin et selon leur fonction ;
- signaler les dégradations et les vols ;
- payer ses taxes et redevances d'utilisation ;
- dénoncer le **détournement des biens publics** (corruption, mauvaise gestion) ;
- participer à leur entretien (journées de salubrité, actions citoyennes).

## À retenir

- Les biens publics appartiennent à tous les citoyens.
- Ils sont financés par l'impôt.
- Les dégrader, c'est pénaliser toute la communauté.
- Leur protection est un devoir civique.
- Détourner un bien public est un délit grave.

## Exemple corrigé

**Énoncé :** Pourquoi la dégradation d'un banc public coûte-t-elle cher à la communauté ?

**Corrigé :** Parce que son remplacement est financé par l'impôt de tous : chaque dégradation alourdit les dépenses publiques et réduit les moyens disponibles pour les écoles ou les hôpitaux.`,
          },
        ],
      },
      {
        code: "3eme-entrepreneuriat-cohesion",
        title: "Entrepreneuriat et cohésion sociale",
        description: "Compétence 3 : traiter une situation relative à la gestion des ressources, à l'entrepreneuriat et à la vie communautaire.",
        lessons: [
          {
            title: "Le projet d'entreprise",
            summary: "Concevoir un projet d'entreprise : de l'idée au lancement de l'activité.",
            difficulty: 2,
            contentMd: `## Situation

Un jeune diplômé veut créer un atelier de couture. Par quelles étapes doit-il passer pour que son projet aboutisse ?

## Définition

Un **projet d'entreprise** est un plan qui décrit une activité économique à créer : son produit ou service, ses clients, ses moyens et sa rentabilité.

Les étapes de la création :
1. **l'idée** : quel produit ou service, pour quels clients ;
2. **l'étude de marché** : analyser les clients, les concurrents et les prix ;
3. le **plan d'affaires** (business plan) : description de l'activité, budget prévisionnel (investissements, charges, recettes) ;
4. le **financement** : apport personnel, épargne, prêts, soutiens aux jeunes entrepreneurs ;
5. les **formalités** : inscription de l'entreprise, immatriculation, licences ;
6. le **lancement** : installation, recrutement, démarrage de la production ;
7. le **suivi et la gestion** : comptabilité, amélioration continue, marketing.

Étapes d'un projet (en APC) : identification du projet → préparation → réalisation → évaluation.

## À retenir

- Un projet d'entreprise part d'une idée et d'une étude de marché.
- Le plan d'affaires prévoit les coûts et les recettes.
- Le financement peut venir de l'épargne, des prêts ou de soutiens.
- L'entreprise doit être immatriculée et déclarée.
- La gestion et le suivi assurent la survie de l'entreprise.

## Exemple corrigé

**Énoncé :** Cite trois étapes de la création d'une entreprise.

**Corrigé :** Étudier le marché (clients et concurrence), préparer un plan d'affaires avec le budget, trouver le financement et accomplir les formalités d'immatriculation avant le lancement.`,
          },
          {
            title: "Les alliances interethniques : les Mandé et les Gour",
            summary: "Comprendre le rôle des alliances à plaisanterie entre Mandé et Gour dans la cohésion sociale.",
            difficulty: 2,
            contentMd: `## Situation

Dans le nord du pays, un Malinké (Mandé) et un Sénoufo (Gour) se taquinent au marché en se traitant de « cousin ». Que signifie ce rapprochement ?

## Définition

Les **alliances interethniques** sont des pactes historiques entre communautés, transmis de génération en génération. Le **cousinage à plaisanterie** (alliance à plaisanterie) permet à deux groupes de plaisanter, de se taquiner et de se critiquer sans offense : il crée confiance et fraternité.

En Côte d'Ivoire, l'alliance emblématique unit les **Mandé** (Malinké, Dioula…) et les **Gour** (Sénoufo, Lobi, Koulango, Tagouana…). Elle se manifeste par des plaisanteries codées (« cousin-cousine »), l'échange de services et l'entraide.

Le **rôle** de ces alliances :
- prévenir les conflits : la plaisanterie désamorce les tensions ;
- **régler les litiges** par le dialogue et la médiation ;
- renforcer la **cohésion sociale** et la paix entre les communautés ;
- faciliter les échanges économiques et les mariages ;
- transmettre les valeurs de tolérance et de solidarité.

## À retenir

- Le cousinage à plaisanterie unit les Mandé et les Gour.
- Il permet de plaisanter et de critiquer sans offense.
- Il prévient et apaise les conflits.
- Il renforce la paix et la cohésion sociale.
- Ces alliances sont un patrimoine culturel à préserver.

## Exemple corrigé

**Énoncé :** En quoi le cousinage à plaisanterie entre Mandé et Gour renforce-t-il la paix ?

**Corrigé :** Il crée des liens de parenté symbolique : les plaisanteries désamorcent les tensions, les litiges se règlent par la médiation et les communautés s'entraident, ce qui renforce la cohésion sociale.`,
          },
        ],
      },
      {
        code: "3eme-sante",
        title: "La santé et la prévention",
        description: "Compétence 4 : traiter une situation relative à la santé, aux maladies et aux comportements de prévention.",
        lessons: [
          {
            title: "La lutte contre les maladies endémiques et l'automédication",
            summary: "Connaître les maladies endémiques en Côte d'Ivoire et les dangers de l'automédication.",
            difficulty: 2,
            contentMd: `## Situation

Un élève a de la fièvre et prend des médicaments « conseillés par un ami » sans consulter un médecin. Quels sont les risques ?

## Définition

Les **maladies endémiques** sont des maladies présentes en permanence dans une région : en Côte d'Ivoire, le **paludisme** (première cause de consultation), la **fièvre jaune** (virus transmis par les moustiques), la **tuberculose**, la **méningite**, le **choléra**, l'**onchocercose** (cécité des rivières) et les maladies liées à l'eau.

La lutte contre ces maladies passe par :
- les **vaccinations** (PEV : Programme élargi de vaccination) ;
- la protection contre les moustiques : moustiquaires imprégnées, assainissement ;
- l'assainissement du cadre de vie (eaux, déchets) ;
- le traitement rapide et les soins dans les centres de santé ;
- l'information et la surveillance épidémiologique.

L'**automédication** (se soigner sans avis médical) est dangereuse :
- mauvaise dose ou mauvais médicament : inefficacité ;
- effets secondaires et **iatrogénie** (maladie provoquée par le médicament) ;
- **résistance** aux médicaments (antibiotiques inutiles) ;
- faux médicaments, produits périmés ou contre-indiqués.

La bonne pratique : consulter un médecin ou un pharmacien, suivre l'**ordonnance**, et ne jamais partager ses médicaments.

## À retenir

- Paludisme, fièvre jaune, tuberculose, choléra : endémies ivoiriennes.
- Vaccination et moustiquaires imprégnées : armes essentielles.
- L'automédication expose à des doses erronées et à la résistance.
- Les faux médicaments tuent.
- Consulter un professionnel de santé, c'est se protéger.

## Exemple corrigé

**Énoncé :** Cite deux dangers de l'automédication.

**Corrigé :** Un dosage ou un médicament inapproprié peut être inefficace ou toxique (iatrogénie), et l'usage abusif des antibiotiques crée des résistances qui rendent les traitements inefficaces.`,
          },
          {
            title: "Le test de dépistage du VIH",
            summary: "Comprendre l'importance du dépistage du VIH et son déroulement.",
            difficulty: 2,
            contentMd: `## Situation

Un jeune homme a eu des rapports non protégés et hésite à faire un test de dépistage du VIH. Que doit-il savoir ?

## Définition

Le **test de dépistage du VIH** est un examen biologique qui détecte la présence du virus dans le sang. En Côte d'Ivoire, il est proposé dans les centres de santé, les centres de dépistage (dont le **CNTS**, Centre national de transfusion sanguine) et par les campagnes mobiles.

Le dépistage se déroule en trois temps :
1. le **conseil pré-test** : information sur le VIH, les risques et le test ;
2. le **test** : prise de sang ou test rapide (résultat en quelques minutes) ;
3. le **conseil post-test** : explication du résultat et orientation.

Le dépistage est **volontaire**, **gratuit** dans la plupart des structures et **anonyme ou confidentiel**.

Pourquoi se faire dépister ?
- connaître son statut et **se soigner tôt** (traitements antirétroviraux, ARV) ;
- protéger son partenaire et éviter la transmission ;
- prévenir la **transmission mère-enfant** (femme enceinte) ;
- vivre longtemps et en bonne santé avec le VIH ;
- **lever les doutes** et réduire l'angoisse.

Se faire dépister est un acte de **responsabilité** : la discrimination envers les personnes vivant avec le VIH est interdite.

## À retenir

- Le test détecte le VIH dans le sang.
- Dépistage volontaire, confidentiel et généralement gratuit.
- Conseils pré et post-test : le parcours encadré.
- Dépisté tôt, le VIH se soigne avec les ARV.
- Ne pas se faire dépister, c'est risquer sa santé et celle des autres.

## Exemple corrigé

**Énoncé :** Pourquoi le dépistage précoce du VIH est-il important pour une femme enceinte ?

**Corrigé :** Parce qu'un traitement précoce prévient la transmission du virus de la mère à l'enfant pendant la grossesse, l'accouchement et l'allaitement, protégeant ainsi le bébé.`,
          },
        ],
      },
      {
        code: "3eme-environnement",
        title: "Protection de la nature et gestion de l'eau",
        description: "Compétence 5 : traiter une situation relative à la protection de l'environnement et à la gestion des ressources naturelles.",
        lessons: [
          {
            title: "Les parcs nationaux et les réserves forestières",
            summary: "Connaître les aires protégées de Côte d'Ivoire et leur importance.",
            difficulty: 2,
            contentMd: `## Situation

Un groupe d'orpailleurs s'installe illégalement dans un parc national. Quel préjudice cela cause-t-il ?

## Définition

Les **parcs nationaux** et les **réserves forestières** sont des aires protégées où la nature (faune, flore, écosystèmes) est conservée. En Côte d'Ivoire, les principaux parcs sont : le **parc national de Taï** (forêt primaire, patrimoine mondial de l'UNESCO), le **parc national de la Comoé** (réserve de biosphère de l'UNESCO), le **parc du Banco** (forêt urbaine d'Abidjan), et les parcs d'Azagny, de la Marahoué, du Mont Péko, du Mont Sangbé et des Îles Éhotilé.

Leur **importance** :
- protéger la **biodiversité** : chimpanzés, éléphants, pangolins, espèces végétales rares ;
- conserver les **forêts** qui régulent le climat et les pluies ;
- protéger les **ressources en eau** (rivières et sources des parcs) ;
- préserver un **patrimoine** pour les générations futures ;
- développer l'écotourisme (emplois et revenus).

Ils sont gérés par l'**OIPR** (Office ivoirien des parcs et réserves).

Les **menaces** : braconnage, orpaillage illégal, déforestation, feux de brousse, agriculture envahissante. Leur lutte mobilise les agents des parcs et la vigilance de tous.

## À retenir

- Les parcs nationaux protègent la faune, la flore et les forêts.
- Taï et Comoé sont des sites reconnus par l'UNESCO.
- Ils régulent le climat et les eaux.
- Braconnage, orpaillage et feux les menacent.
- L'OIPR en assure la gestion et la surveillance.

## Exemple corrigé

**Énoncé :** Cite deux rôles d'un parc national.

**Corrigé :** Protéger la biodiversité (espèces animales et végétales rares) et préserver les forêts et les ressources en eau, tout en offrant des opportunités d'écotourisme.`,
          },
          {
            title: "La gestion de l'eau",
            summary: "Comprendre l'importance de l'eau et les règles de sa gestion durable.",
            difficulty: 2,
            contentMd: `## Situation

En saison sèche, les femmes de ton village parcourent des kilomètres pour trouver de l'eau. Comment mieux gérer cette ressource ?

## Définition

L'**eau** est une ressource naturelle indispensable à la vie : boisson, hygiène, agriculture, industrie, énergie. En Côte d'Ivoire, les ressources hydriques sont l'eau de pluie, les fleuves (Comoé, Bandama, Sassandra, Cavally), les lagunes, les nappes souterraines et les barrages-réservoirs (Kossou, Taabo, Soubré), qui produisent aussi de l'électricité.

La **gestion de l'eau** consiste à satisfaire les besoins de tous en préservant la ressource :
- distribuer l'eau potable (la **SODECI** assure la distribution dans les villes) ;
- protéger les **points d'eau** contre la pollution (déchets, latrines, produits chimiques) ;
- **économiser** l'eau : réparer les fuites, fermer les robinets, récupérer l'eau de pluie ;
- développer l'**assainissement** : traiter les eaux usées avant rejet ;
- préserver les bassins versants (reboisement, lutte contre l'érosion) ;
- organiser les usages agricoles et domestiques par bassin versant.

L'eau est un bien rare et précieux : sa mauvaise gestion provoque pénuries, conflits et maladies.

## À retenir

- L'eau est vitale : boisson, hygiène, agriculture, énergie.
- La SODECI distribue l'eau potable dans les villes ivoiriennes.
- Les barrages (Kossou, Soubré) produisent de l'électricité.
- Protéger les points d'eau et économiser : les règles d'or.
- Gaspiller ou polluer l'eau, c'est menacer la vie de tous.

## Exemple corrigé

**Énoncé :** Cite deux gestes de bonne gestion de l'eau à la maison.

**Corrigé :** Réparer les robinets qui fuient et fermer le robinet pendant le brossage des dents, récupérer l'eau de pluie pour le jardin et ne pas y jeter de déchets ou de produits chimiques.`,
          },
        ],
      },
    ],
  },
];