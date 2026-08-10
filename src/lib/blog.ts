export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  readingMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  heroImage?: string;
  blocks: BlogBlock[];
};

const posts: BlogPost[] = [
  {
    slug: "comment-reussir-le-bac-en-cote-d-ivoire",
    title: "Comment réussir le BAC en Côte d'Ivoire : la méthode complète",
    description:
      "Programme officiel, méthodes de révision, gestion du temps et stratégie le jour J : le guide complet pour réussir le BAC en Côte d'Ivoire (BAC 2026).",
    keywords: ["BAC Côte d'Ivoire", "réussir son BAC", "révision BAC 2026", "méthode de révision"],
    category: "Réussite BAC",
    readingMinutes: 8,
    publishedAt: "2026-08-08",
    blocks: [
      {
        type: "p",
        text: "Chaque année, des milliers de candidats au BAC en Côte d'Ivoire échouent non par manque de travail, mais par manque de méthode. Le programme est vaste, les matières nombreuses, et sans stratégie, on se disperse. Voici la méthode pas à pas pour aborder les révisions et aborder l'épreuve avec confiance.",
      },
      { type: "h2", text: "1. Comprendre les coefficients et le barème dès le départ" },
      {
        type: "p",
        text: "Avant de réviser, sachez ce qui rapporte le plus de points. Un candidat sérieux connaît les coefficients de ses matières : ils déterminent où concentrer l'essentiel de son temps. Une matière à fort coefficient mérite une préparation plus poussée qu'une matière où un effort moyen suffit.",
      },
      {
        type: "p",
        text: "Reprenez l'arrêté officiel des coefficients de votre série (C, D, A, A1, B, E…) et notez vos points forts et vos points faibles par matière. Le but n'est pas d'exceller partout, mais d'obtenir un total au-dessus de la moyenne, en s'appuyant sur vos forces et en consolidant vos faiblesses.",
      },
      { type: "h2", text: "2. Établir un planning de révision réaliste" },
      {
        type: "ul",
        items: [
          "Révisez par blocs de 45 minutes entrecoupés de pauses de 10 minutes : la mémoire retient mieux sur des séquences courtes.",
          "Alterner les matières (une matière scientifique puis une matière littéraire) pour garder le cerveau actif.",
          "Réserver les deux dernières semaines à la révision des sujets types et des annales.",
          "Planifier au moins une demi-journée de repos par semaine pour éviter l'épuisement.",
        ],
      },
      { type: "h2", text: "3. Utiliser les annales et sujets types" },
      {
        type: "p",
        text: "Rien ne vaut l'entraînement sur les épreuves des années précédentes. Les épreuves du BAC en Côte d'Ivoire suivent des schémas récurrents : mêmes types de questions, mêmes barèmes, mêmes attentes dans les corrigés.",
      },
      {
        type: "callout",
        text: "Astuce Edukora : entraînez-vous en conditions réelles avec notre simulateur d'examen chronométré, noté sur 20, avec correction et analyse de votre niveau par la tuteur IA.",
      },
      { type: "h2", text: "4. La gestion du temps le jour J" },
      {
        type: "p",
        text: "Le jour de l'épreuve, la gestion du temps fait la différence entre un candidat stressé et un candidat serein. À l'ouverture du sujet, prenez 5 minutes pour lire toutes les questions. Répondez d'abord aux questions faciles qui vous rapportent des points sûrs, puis attaquez les questions difficiles.",
      },
      {
        type: "p",
        text: "Sur une dissertation ou un sujet de réflexion, structurez votre travail : introduction, développement en deux ou trois parties, conclusion. Ne dépassez jamais le temps alloué à une partie au détriment des autres.",
      },
      { type: "h2", text: "5. L'importance des révisions actives" },
      {
        type: "p",
        text: "Relire ses cours ne suffit pas. La mémorisation durable vient des révisions actives : reformuler, s'auto-interroger, résoudre des exercices, expliquer à voix haute. Chaque fois que vous vous souvenez d'une notion sans la regarder, vous renforcez le souvenir.",
      },
      {
        type: "p",
        text: "Avec un plan structuré, des annales travaillées et des révisions actives, la réussite au BAC devient un objectif atteignable. Commencez dès maintenant : le temps de préparation est votre meilleur allié.",
      },
    ],
  },
  {
    slug: "comment-reussir-le-bepc-methodes-et-astuces",
    title: "BEPC : méthodes et astuces pour décrocher la moyenne",
    description:
      "Le BEPC est le premier grand examen. Méthodes de révision, gestion du stress et astuces pour les épreuves écrites : préparez-vous efficacement dès la classe de 3e.",
    keywords: ["BEPC Côte d'Ivoire", "réussir le BEPC", "classe de 3e", "épreuves BEPC"],
    category: "Réussite BEPC",
    readingMinutes: 6,
    publishedAt: "2026-08-08",
    blocks: [
      {
        type: "p",
        text: "Le BEPC est le premier grand rendez-vous du parcours scolaire ivoirien. S'il est accessible avec une préparation sérieuse, il ne se réussit pas au hasard. Découvrez les méthodes et astuces qui font la différence dès la classe de 3e.",
      },
      { type: "h2", text: "1. Commencer tôt, c'est déjà gagner" },
      {
        type: "p",
        text: "Beaucoup d'élèves ne commencent leurs révisions qu'un mois avant l'examen. Résultat : des nuits blanches, du stress et une mémoire saturée. Les meilleurs candidats révisent de façon régulière tout au long de l'année, avec des séances courtes et ciblées.",
      },
      {
        type: "p",
        text: "Dès le premier trimestre de 3e, prenez l'habitude de relire vos cours chaque semaine. Les notions s'installent durablement et les révisions finales ne servent plus qu'à consolider.",
      },
      { type: "h2", text: "2. Les matières à fort coefficient" },
      {
        type: "p",
        text: "Français, mathématiques et les matières principales pèsent lourd dans le total. Maîtrisez parfaitement les bases : conjugaison et rédaction en français, équations et géométrie en mathématiques. Une erreur fréquente est de négliger les matières dites secondaires : chaque point compte pour la moyenne générale.",
      },
      { type: "h2", text: "3. S'entraîner sur les sujets des années précédentes" },
      {
        type: "ul",
        items: [
          "Téléchargez et traitez les sujets de BEPC des 5 dernières années.",
          "Reproduisez les conditions d'examen : temps limité, sans livre, sans téléphone.",
          "Comparez vos réponses aux corrigés types pour comprendre les attentes des correcteurs.",
          "Identifiez vos erreurs récurrentes et ciblez vos révisions dessus.",
        ],
      },
      { type: "h2", text: "4. Gérer son stress le jour de l'épreuve" },
      {
        type: "p",
        text: "Le stress est normal : il devient un problème seulement quand il bloque. La veille, préparez tout (convocation, pièce d'identité, stylos, calculatrice autorisée). Le matin, arrivez en avance. Pendant l'épreuve, respirez, lisez le sujet en entier avant de répondre, et quittez les questions bloquantes pour y revenir ensuite.",
      },
      {
        type: "callout",
        text: "Astuce Edukora : utilisez notre simulateur d'examen BEPC pour vous entraîner dans des conditions réelles et recevoir une analyse de vos points faibles par la tuteur IA.",
      },
      {
        type: "p",
        text: "Avec de la régularité, des entraînements sur annales et une bonne gestion du stress, le BEPC est à votre portée. Lancez vos révisions dès maintenant et transformez l'examen en réussite.",
      },
    ],
  },
  {
    slug: "plan-de-revision-bac-bepc-2-mois",
    title: "Plan de révision BAC et BEPC en 2 mois : jour par jour",
    description:
      "Un plan de révision jour par jour sur 8 semaines pour le BAC et le BEPC en Côte d'Ivoire : matières, séances, pauses et stratégie pour aborder sereinement les épreuves.",
    keywords: ["plan de révision", "planning révision BAC", "préparation BEPC", "8 semaines"],
    category: "Organisation",
    readingMinutes: 7,
    publishedAt: "2026-08-08",
    blocks: [
      {
        type: "p",
        text: "Vous avez deux mois devant vous avant les épreuves ? C'est largement suffisant pour une préparation efficace, à condition de suivre un plan structuré. Voici un planning de révision sur 8 semaines, adaptable au BAC comme au BEPC.",
      },
      { type: "h2", text: "Semaines 1 et 2 : faire le point et consolider les bases" },
      {
        type: "p",
        text: "Les deux premières semaines servent à établir un état des lieux honnête : quelles matières maîtrisez-vous, lesquelles sont à renforcer ? Pour chaque matière à fort coefficient, relisez le cours en entier et notez les notions floues.",
      },
      {
        type: "ul",
        items: [
          "Jour 1-2 : français — grammaire et méthodologie de la dissertation.",
          "Jour 3-4 : mathématiques — réviser les chapitres clés du programme.",
          "Jour 5-6 : sciences (PC ou SVT selon la série) — notions fondamentales.",
          "Jour 7 : journée de repos et de révision légère des matières de culture générale.",
        ],
      },
      { type: "h2", text: "Semaines 3 et 4 : approfondir et s'entraîner" },
      {
        type: "p",
        text: "Les semaines 3 et 4 sont consacrées à l'approfondissement. Chaque jour, traitez un exercice ou une question de type examen sur une matière différente. Corrigez-vous sérieusement et notez vos erreurs dans un carnet de révision : c'est votre arme la plus précieuse.",
      },
      {
        type: "callout",
        text: "Astuce Edukora : après chaque entraînement, posez vos questions à la tuteur IA Kora pour comprendre vos erreurs et obtenir des explications pas à pas.",
      },
      { type: "h2", text: "Semaines 5 et 6 : les annales en conditions réelles" },
      {
        type: "p",
        text: "C'est le moment de passer aux épreuves complètes des années précédentes, en respectant scrupuleusement le temps officiel. Faites au moins 3 sujets complets par matière principale. Analysez chaque copie : points perdus, temps mal réparti, erreurs d'étourderie.",
      },
      { type: "h2", text: "Semaines 7 et 8 : consolidation et derniers réglages" },
      {
        type: "p",
        text: "Les deux dernières semaines sont réservées à la consolidation. Relisez vos carnets de révision, retravaillez uniquement vos points faibles et faites un dernier sujet par matière pour garder le rythme. Diminuez progressivement l'intensité pour arriver reposé le jour J.",
      },
      {
        type: "ul",
        items: [
          "Dernière semaine : révisions légères le matin, repos l'après-midi.",
          "La veille de chaque épreuve : ne révisez plus le soir, détendez-vous.",
          "Préparez votre sac d'examen et un repas équilibré pour le matin de l'épreuve.",
        ],
      },
      {
        type: "p",
        text: "Ce plan est un cadre : adaptez-le à votre rythme, vos forces et votre série. La constance bat l'intensité. Bonne préparation, et au travail !",
      },
    ],
  },
  {
    slug: "le-simulateur-dexamen-pourquoi-ca-marche",
    title: "Le simulateur d'examen : pourquoi c'est la méthode la plus efficace",
    description:
      "Pourquoi les tests en conditions réelles (chronométrés et notés) sont la méthode de préparation la plus efficace pour le BAC et le BEPC en Côte d'Ivoire.",
    keywords: ["simulateur d'examen", "méthode d'entraînement", "préparation examen", "tests blancs"],
    category: "Méthodes",
    readingMinutes: 5,
    publishedAt: "2026-08-08",
    blocks: [
      {
        type: "p",
        text: "Relire ses cours dix fois ne remplace pas un seul test en conditions réelles. Les recherches sur l'apprentissage sont formelles : s'auto-tester est plus efficace que la relecture passive. C'est exactement le principe du simulateur d'examen.",
      },
      { type: "h2", text: "1. Le testing effect : tester plutôt que relire" },
      {
        type: "p",
        text: "Le « testing effect » est l'un des résultats les plus solides de la psychologie cognitive : lorsqu'on se soumet à un test, la mémorisation s'améliore nettement par rapport à une simple relecture du cours. Chaque test est un rappel actif qui grave la connaissance dans la mémoire à long terme.",
      },
      { type: "h2", text: "2. Se mettre en conditions réelles" },
      {
        type: "ul",
        items: [
          "Chronomètre : un sujet dans le temps officiel, comme le jour de l'épreuve.",
          "Notation sur 20 : savoir exactement où on se situe, sans indulgence.",
          "Correction détaillée : comprendre chaque point perdu.",
          "Répétition : multiplier les sujets pour automatiser la gestion du temps.",
        ],
      },
      { type: "h2", text: "3. La gestion du temps s'apprend" },
      {
        type: "p",
        text: "Le jour de l'examen, la panique vient souvent du temps. S'entraîner au chronomètre élimine cette variable : vous savez combien de minutes consacrer à chaque type de question, et quand passer à la suite. La gestion du temps devient un réflexe, plus une source de stress.",
      },
      { type: "h2", text: "4. Analyser ses erreurs pour progresser" },
      {
        type: "p",
        text: "L'intérêt d'un simulateur ne s'arrête pas à la note. En analysant vos erreurs, vous identifiez précisément vos points faibles : une notion mal comprise, une méthode de résolution à revoir, une mauvaise répartition du temps. C'est ce diagnostic qui oriente vos révisions et accélère vos progrès.",
      },
      {
        type: "callout",
        text: "Edukora : entraînez-vous au simulateur d'examen BAC et BEPC avec des épreuves des années précédentes, une correction notée sur 20 et une analyse de niveau par la tuteur IA. Essayez-le dès maintenant.",
      },
      {
        type: "p",
        text: "Le simulateur d'examen transforme la préparation en entraînement concret. Adoptez cette méthode : elle fait la différence entre un candidat qui révise et un candidat qui réussit.",
      },
    ],
  },
  {
    slug: "les-epreuves-du-bac-en-cote-d-ivoire-guide-complet",
    title: "Les épreuves du BAC en Côte d'Ivoire : le guide complet des séries et des barèmes",
    description:
      "Toutes les épreuves du BAC ivoirien par série (C, D, A, A1, B, E) : matières, coefficients, durées et barèmes officiels pour préparer l'examen en connaissance de cause.",
    keywords: ["épreuves BAC Côte d'Ivoire", "BAC séries C D A B E", "coefficients BAC", "barème BAC"],
    category: "Réussite BAC",
    readingMinutes: 9,
    publishedAt: "2026-08-09",
    blocks: [
      {
        type: "p",
        text: "Le BAC ivoirien n'est pas une seule épreuve mais un ensemble de matières, chacune avec son coefficient et sa durée. Connaître précisément les épreuves de votre série est le premier réflexe d'un candidat préparé : vous saurez où concentrer vos révisions et comment gérer chaque session.",
      },
      { type: "h2", text: "1. Les séries du BAC en Côte d'Ivoire" },
      {
        type: "p",
        text: "Le BAC ivoirien comprend plusieurs séries, regroupées en deux grandes familles : les séries scientifiques et technologiques (C, D, E et les filières STI, STT…) et les séries littéraires (A, A1, B). Chaque série a son propre programme et ses propres coefficients.",
      },
      {
        type: "ul",
        items: [
          "Série C : sciences mathématiques — mathématiques et physique-chimie dominent.",
          "Série D : sciences expérimentales — sciences de la vie et de la terre (SVT) et physique-chimie en force.",
          "Série E : sciences et techniques — mathématiques, technologie et sciences industrielles.",
          "Série A : littéraire — philosophie, français, langues vivantes et histoire-géographie.",
          "Série A1 : littéraire moderne — mêmes dominantes que A avec un accent sur les langues.",
          "Série B : économique et sociale — mathématiques, économie et droit renforcés.",
        ],
      },
      { type: "h2", text: "2. Les épreuves communes à toutes les séries" },
      {
        type: "p",
        text: "Certaines matières sont obligatoires quelle que soit la série : le français (épreuve écrite de dissertation ou de commentaire composé), la philosophie pour les séries littéraires, l'histoire-géographie, les mathématiques et une ou deux langues vivantes. Les épreuves de langues comportent généralement une partie écrite et une partie orale.",
      },
      {
        type: "p",
        text: "Depuis la réforme des examens ivoiriens, l'évaluation continue (notes de classe et devoirs surveillés) compte dans le total final. Ne négligez pas vos notes du dernier trimestre : elles peuvent faire basculer une moyenne.",
      },
      { type: "h2", text: "3. Coefficients : là où se joue l'admissibilité" },
      {
        type: "p",
        text: "Le coefficient détermine le poids d'une matière dans le total. En série C, les mathématiques et la physique-chimie cumulent une part importante des points ; en série A, la philosophie et le français dominent. Votre stratégie de révision doit refléter ces priorités : 30 minutes gagnées sur une matière à fort coefficient valent mieux qu'une heure passée sur une matière à faible enjeu.",
      },
      { type: "h2", text: "4. Les épreuves orales et pratiques" },
      {
        type: "p",
        text: "Selon la série, le BAC comprend aussi des épreuves orales (langues vivantes, philosophie pour certaines séries) et des épreuves pratiques ou sportives (éducation physique et sportive). Renseignez-vous sur les modalités exactes de votre série et entraînez-vous à l'oral : la prise de parole en public se travaille, elle aussi.",
      },
      { type: "h2", text: "5. Comment exploiter ces informations pour réviser" },
      {
        type: "ol",
        items: [
          "Téléchargez le programme officiel et les coefficients de votre série.",
          "Classez vos matières par coefficient décroissant pour établir votre planning.",
          "Travaillez les annales des 5 dernières années pour chaque épreuve majeure.",
          "Vérifiez les barèmes : chaque point compte, surtout aux écrits.",
        ],
      },
      {
        type: "callout",
        text: "Astuce Edukora : notre simulateur d'examen reproduit les conditions réelles du BAC (durée, notation sur 20, correction détaillée). Entraînez-vous sur les épreuves types de votre série avec la tuteur IA Kora.",
      },
      {
        type: "p",
        text: "En connaissant parfaitement les épreuves, les coefficients et les barèmes de votre série, vous abordez l'examen avec un plan clair. C'est la première victoire d'un candidat qui veut réussir son BAC en Côte d'Ivoire.",
      },
    ],
  },
  {
    slug: "reviser-les-mathematiques-pour-le-bac-methodes-et-exercices",
    title: "Réviser les mathématiques pour le BAC : méthodes et exercices qui marchent",
    description:
      "Maths au BAC ivoirien : comment réviser efficacement, quels chapitres privilégier, comment traiter un exercice type et éviter les erreurs qui coûtent des points.",
    keywords: ["réviser les maths BAC", "mathématiques BAC Côte d'Ivoire", "exercices maths terminale", "préparation maths"],
    category: "Matières",
    readingMinutes: 7,
    publishedAt: "2026-08-09",
    blocks: [
      {
        type: "p",
        text: "Les mathématiques sont souvent la matière qui fait la différence au BAC, surtout dans les séries scientifiques où elles ont un coefficient élevé. Bonne nouvelle : les maths se préparent par la pratique, pas par la relecture. Voici la méthode qui fonctionne.",
      },
      { type: "h2", text: "1. Réviser les maths par la résolution, jamais par la lecture" },
      {
        type: "p",
        text: "Lire un corrigé de mathématiques donne une illusion de maîtrise : on « comprend » la solution sans être capable de la retrouver seul. Le jour de l'examen, c'est la résolution qui est évaluée. Résolvez donc des exercices, en fermant les corrigés, et n'ouvrez le cours qu'en cas de blocage.",
      },
      { type: "h2", text: "2. Les chapitres incontournables en terminale" },
      {
        type: "ul",
        items: [
          "Fonctions et étude de fonctions : limites, dérivées, variations, représentations graphiques.",
          "Suites numériques et suites géométriques, avec leur sens de variation et leur convergence.",
          "Probabilités et statistiques : calculs de probabilités, arbres, loi binomiale.",
          "Géométrie dans le plan et l'espace : vecteurs, droites, plans, produit scalaire.",
          "Équations différentielles du premier ordre pour les séries scientifiques.",
        ],
      },
      { type: "h2", text: "3. La méthode pour traiter un exercice type" },
      {
        type: "ol",
        items: [
          "Lisez l'énoncé en entier et surlignez les données chiffrées et les hypothèses.",
          "Recopiez ce que l'on sait (données, formules utiles) avant de chercher la solution.",
          "Commencez par les questions les plus simples pour accumuler des points sûrs.",
          "Rédigez chaque étape même si le résultat est incomplet : le barème récompense la démarche.",
          "Vérifiez la cohérence de vos résultats (signes, ordres de grandeur, unités).",
        ],
      },
      { type: "h2", text: "4. Les erreurs qui coûtent des points" },
      {
        type: "ul",
        items: [
          "Erreurs de calcul bêtes : toujours relire la dernière ligne de chaque calcul.",
          "Oublier le domaine de définition avant d'étudier une fonction.",
          "Réponses sans justification : une question de maths sans démonstration vaut rarement des points.",
          "Mal répartir le temps : une question à 1 point ne mérite pas 20 minutes.",
        ],
      },
      {
        type: "callout",
        text: "Astuce Edukora : entraînez-vous sur des exercices types notés sur 20 avec notre simulateur d'examen. La tuteur IA Kora vous explique pas à pas chaque erreur pour progresser vite.",
      },
      {
        type: "p",
        text: "Les mathématiques se remportent avec de l'entraînement régulier et une méthode rigoureuse. Quelques exercices par jour, corrigés sérieusement, valent mieux que des heures de cours relus passivement. À vos cahiers !",
      },
    ],
  },
  {
    slug: "reussir-la-physique-chimie-au-bac-methode-complete",
    title: "Réussir la physique-chimie au BAC : la méthode complète pour toutes les séries",
    description:
      "Physique-chimie au BAC ivoirien : connaître les chapitres clés (mécanique, électricité, chimie organique), savoir rédiger un raisonnement et éviter les pièges classiques.",
    keywords: ["physique chimie BAC", "réussir la physique-chimie", "chimie organique terminale", "mécanique BAC"],
    category: "Matières",
    readingMinutes: 7,
    publishedAt: "2026-08-09",
    blocks: [
      {
        type: "p",
        text: "La physique-chimie est une matière à fort coefficient dans les séries C, D et E. Elle combine deux exigences : la maîtrise des connaissances (formules, lois, notions) et la capacité à raisonner. Un candidat qui suit la méthode suivante maximise ses points, même sans être un « génie » des sciences.",
      },
      { type: "h2", text: "1. Les grands chapitres de physique à maîtriser" },
      {
        type: "ul",
        items: [
          "Mécanique : forces, mouvement, principe d'inertie, lois de Newton, travail et énergie.",
          "Électricité : circuits, lois d'Ohm et de Kirchhoff, puissance, condensateurs.",
          "Ondes et signaux : ondes sonores et électromagnétiques, fréquence, longueur d'onde.",
          "Énergie : conversions énergétiques, rendement, énergie mécanique.",
        ],
      },
      { type: "h2", text: "2. La chimie : organique et générale" },
      {
        type: "p",
        text: "En chimie, deux grandes parties reviennent chaque année : la chimie générale (atomes, molécules, réactions, équilibres) et la chimie organique (familles de composés, réactions, mécanismes simples). La chimie organique est particulièrement rentable aux examens : les questions sont stéréotypées et les points faciles si vous connaissez les schémas réactionnels.",
      },
      { type: "h2", text: "3. La méthode pour un exercice de physique" },
      {
        type: "ol",
        items: [
          "Identifiez le thème de l'exercice (mécanique, électricité, ondes…) et les lois concernées.",
          "Recensez les données avec leurs unités et convertissez si nécessaire.",
          "Écrivez les relations utilisées AVANT de faire les calculs : les correcteurs valorisent le raisonnement.",
          "Calculez avec les unités du système international.",
          "Concluez avec un résultat chiffré, son unité et une phrase qui répond à la question.",
        ],
      },
      { type: "h2", text: "4. Le vocabulaire de la chimie, un piège fréquent" },
      {
        type: "p",
        text: "Utiliser le bon vocabulaire est noté : électron, ion, molécule, atomique… Une phrase comme « une molécule de NaCl » est fausse (le chlorure de sodium est un composé ionique). Apprenez à distinguer les termes et à les employer précisément dans vos réponses.",
      },
      { type: "h2", text: "5. Entraînement et gestion du temps" },
      {
        type: "p",
        text: "La physique-chimie demande de la vitesse. Entraînez-vous sur les sujets des années précédentes en respectant la durée officielle, puis corrigez-vous à l'aide des barèmes. Repérez les questions « parachutes » : souvent les premières, elles rapportent des points faciles à condition d'y répondre vite.",
      },
      {
        type: "callout",
        text: "Astuce Edukora : notre simulateur d'examen inclut des épreuves de physique-chimie notées sur 20 avec correction détaillée. Réalisez un diagnostic de votre niveau et révisez vos chapitres faibles avec la tuteur IA.",
      },
      {
        type: "p",
        text: "Avec les bons chapitres révisés, un raisonnement rédigé étape par étape et un entraînement chronométré, la physique-chimie cesse d'être une montagne. C'est une matière qui se gagne par la méthode.",
      },
    ],
  },
  {
    slug: "svt-terminale-bac-comment-reviser-efficacement",
    title: "SVT terminale : comment réviser efficacement pour le BAC",
    description:
      "SVT au BAC ivoirien (séries D et C) : les chapitres indispensables (génétique, géologie, immunologie), la méthode pour répondre aux questions et réussir l'épreuve écrite.",
    keywords: ["SVT terminale BAC", "réviser les SVT", "génétique BAC", "sciences de la vie et de la terre"],
    category: "Matières",
    readingMinutes: 7,
    publishedAt: "2026-08-09",
    blocks: [
      {
        type: "p",
        text: "Les sciences de la vie et de la terre (SVT) sont la matière reine des séries D et C : souvent au plus fort coefficient, elles pèsent lourd dans la moyenne finale. Contrairement aux maths, les SVT demandent à la fois des connaissances précises et un savoir-faire de rédaction. Voici comment les aborder.",
      },
      { type: "h2", text: "1. Les chapitres incontournables" },
      {
        type: "ul",
        items: [
          "Génétique : méiose, fécondation, transmission des caractères, brassage génétique.",
          "Immunologie : défenses de l'organisme, réaction immunitaire, vaccins, sérothérapie.",
          "Géologie : tectonique des plaques, roches, fossiles, histoire de la Terre.",
          "Reproduction : cycles, hormones, régulation (chez les végétaux et les animaux).",
          "Écologie et évolution : écosystèmes, biodiversité, mécanismes de l'évolution.",
        ],
      },
      { type: "h2", text: "2. La génétique : le chapitre qui rapporte le plus" },
      {
        type: "p",
        text: "Les exercices de génétique reviennent chaque année et suivent toujours le même schéma : un croisement, un tableau de gamètes, un échiquier de croisement et une interprétation. Maîtrisez la méthode : déterminer les génotypes des parents, former les gamètes, construire l'échiquier, puis conclure sur les proportions phénotypiques.",
      },
      { type: "h2", text: "3. La méthode pour rédiger une réponse" },
      {
        type: "ol",
        items: [
          "Lisez la question et repérez les mots-clés (expliquer, comparer, montrer, déduire…).",
          "Organisez votre réponse en paragraphes : une idée par paragraphe.",
          "Utilisez un vocabulaire scientifique précis et exact.",
          "Appuyez vos affirmations sur des exemples ou des données du texte et des documents.",
          "Concluez en répondant explicitement à la question posée.",
        ],
      },
      { type: "h2", text: "4. Les schémas et la lecture de documents" },
      {
        type: "p",
        text: "Les épreuves de SVT sont souvent documentées : graphiques, schémas, tableaux. Apprenez à lire un graphique (axes, unités, tendance générale) et à exploiter un document dans votre réponse. Savoir réaliser un schéma légendé proprement (ex. un échiquier de croisement, une coupe géologique) est un atout majeur : les schémas sont des points garantis pour qui les maîtrise.",
      },
      { type: "h2", text: "5. La mémorisation : fiches et révisions actives" },
      {
        type: "p",
        text: "Les SVT demandent de retenir du vocabulaire et des mécanismes. Réalisez des fiches par chapitre (définitions, schémas, points clés) et testez-vous régulièrement : masquez un schéma et tentez de le reproduire, expliquez un mécanisme à voix haute, refaites les exercices de génétique sans regarder le corrigé.",
      },
      {
        type: "callout",
        text: "Astuce Edukora : répondez aux questions de SVT de la tuteur IA Kora pour vérifier votre maîtrise, et entraînez-vous aux épreuves notées sur 20 avec notre simulateur d'examen.",
      },
      {
        type: "p",
        text: "Les SVT se réussissent avec des connaissances précises, une méthode de rédaction structurée et un entraînement sur les sujets types. Choisissez vos chapitres forts, fichez-les et exercez-vous : la moyenne est à portée de main.",
      },
    ],
  },
  {
    slug: "les-epreuves-du-bepc-en-cote-d-ivoire-guide-complet",
    title: "Les épreuves du BEPC en Côte d'Ivoire : le guide complet",
    description:
      "Toutes les épreuves du BEPC ivoirien : matières, coefficients, durées, épreuves écrites et orales. Préparez-vous efficacement avec les sujets des années précédentes.",
    keywords: ["épreuves BEPC Côte d'Ivoire", "BEPC ivoirien", "sujets BEPC", "réussir le BEPC"],
    category: "Réussite BEPC",
    readingMinutes: 8,
    publishedAt: "2026-08-09",
    blocks: [
      {
        type: "p",
        text: "Le BEPC (Brevet d'Études du Premier Cycle) est l'examen qui clôt la classe de 3e en Côte d'Ivoire. S'il donne accès au lycée, il conditionne aussi le choix de la série. Pour le réussir, il faut connaître précisément les épreuves, leurs coefficients et leurs barèmes. Voici le guide complet.",
      },
      { type: "h2", text: "1. Le déroulement du BEPC" },
      {
        type: "p",
        text: "Le BEPC se déroule en deux étapes : l'évaluation continue, qui compte les notes de classe de l'année, et les épreuves écrites finales organisées dans les centres d'examen. Les épreuves écrites se tiennent généralement en juin, sur plusieurs jours, dans les matières fondamentales.",
      },
      { type: "h2", text: "2. Les matières et leurs coefficients" },
      {
        type: "ul",
        items: [
          "Français : coefficient élevé, avec une épreuve de rédaction et des questions sur un texte.",
          "Mathématiques : coefficient élevé, exercices d'algèbre, de géométrie et de statistiques.",
          "Histoire-géographie : questions de cours et exploitation de documents.",
          "Anglais : compréhension écrite et expression sur des sujets du programme.",
          "Sciences de la vie et de la terre et physique-chimie pour les candidats concernés.",
          "Éducation physique et sportive : épreuve pratique pour certains candidats.",
        ],
      },
      { type: "h2", text: "3. Le français : l'épreuve à ne pas rater" },
      {
        type: "p",
        text: "L'épreuve de français au BEPC repose sur un texte accompagné de questions de compréhension, de vocabulaire et de grammaire, suivi d'une rédaction (récit, lettre, texte argumentatif). Maîtrisez la méthode : lire le texte plusieurs fois, repérer les éléments demandés par les questions, citer le texte pour justifier, et soigner la rédaction finale.",
      },
      { type: "h2", text: "4. Les mathématiques : la méthode pour les exercices" },
      {
        type: "p",
        text: "Les mathématiques au BEPC évaluent des compétences précises : calcul numérique et algébrique, résolution d'équations, géométrie plane, statistiques. La méthode gagnante est l'entraînement régulier : chaque notion vue en classe doit être consolidée par des exercices du même type que les sujets d'examen.",
      },
      { type: "h2", text: "5. Comment s'entraîner avec les annales" },
      {
        type: "ol",
        items: [
          "Récupérez les sujets de BEPC des 5 dernières années.",
          "Traitez chaque sujet en conditions réelles : temps limité, sans aide.",
          "Corrigez-vous à l'aide des corrigés types et notez vos erreurs.",
          "Refaites les sujets ratés une semaine plus tard pour vérifier la progression.",
        ],
      },
      {
        type: "callout",
        text: "Astuce Edukora : entraînez-vous avec notre simulateur d'examen BEPC, noté sur 20 avec correction détaillée et analyse de vos points faibles par la tuteur IA Kora.",
      },
      {
        type: "p",
        text: "Le BEPC est accessible avec une préparation sérieuse et régulière. Connaître les épreuves, s'entraîner sur les annales et gérer son temps le jour J : c'est toute la recette pour décrocher le brevet ivoirien avec une bonne moyenne.",
      },
    ],
  },
  {
    slug: "la-dissertation-francaise-methode-complete-pour-reussir",
    title: "La dissertation française : la méthode complète pour réussir à l'écrit",
    description:
      "Comment réussir une dissertation française au BAC et au BEPC : analyser le sujet, construire le plan, rédiger l'introduction, le développement et la conclusion.",
    keywords: ["dissertation française", "méthode dissertation", "réussir la dissertation", "rédaction BAC"],
    category: "Français",
    readingMinutes: 7,
    publishedAt: "2026-08-09",
    blocks: [
      {
        type: "p",
        text: "La dissertation est l'épreuve reine du français au BAC et une épreuve majeure au BEPC. Beaucoup de candidats la redoutent, pourtant c'est une épreuve très technique qui se maîtrise avec la bonne méthode. Voici comment construire une dissertation qui rapporte des points à chaque étape.",
      },
      { type: "h2", text: "1. Analyser le sujet avant tout" },
      {
        type: "p",
        text: "Une dissertation commence par l'analyse rigoureuse du sujet. Repérez les mots-clés, la consigne (« discuter », « montrer », « dans quelle mesure ») et les limites du sujet. Définissez chaque notion dans vos propres mots. Un sujet mal compris est la première cause d'échec : ne rédigez jamais avant d'avoir passé au moins 15 minutes à le décortiquer.",
      },
      { type: "h2", text: "2. Construire un plan solide" },
      {
        type: "p",
        text: "La dissertation classique suit un plan en deux ou trois parties, chacune développant une grande idée avec des arguments et des exemples. Formulez vos parties sous forme d'affirmations, pas de simples intitulés. Un bon plan répond progressivement au sujet : thèse, nuance, synthèse.",
      },
      { type: "h2", text: "3. L'introduction : la première impression" },
      {
        type: "ul",
        items: [
          "L'accroche : une phrase générale qui présente le thème sans hors-sujet.",
          "La présentation du sujet : reformulez la question posée.",
          "La problématique : la question que votre dissertation va résoudre.",
          "L'annonce du plan : présentez vos grandes parties de façon naturelle.",
        ],
      },
      { type: "h2", text: "4. Le développement : arguments et exemples" },
      {
        type: "p",
        text: "Chaque partie contient deux ou trois paragraphes. Un paragraphe développe une idée : une phrase pour l'affirmer, deux ou trois pour l'expliquer et l'argumenter, un exemple concret (œuvre littéraire, fait d'actualité, expérience personnelle) pour l'illustrer. Faites des transitions entre les parties pour donner du liant à votre réflexion.",
      },
      { type: "h2", text: "5. La conclusion et la relecture" },
      {
        type: "p",
        text: "La conclusion répond clairement à la problématique et ouvre éventuellement sur une perspective. Évitez d'y introduire des idées nouvelles. Gardez enfin 10 minutes pour relire : la syntaxe, l'orthographe et la ponctuation sont notées, et une copie propre fait toujours bonne impression.",
      },
      {
        type: "callout",
        text: "Astuce Edukora : exercez-vous à rédiger des dissertations et faites-les corriger. Notre tuteur IA Kora vous donne une correction détaillée de votre méthodologie, argumentation et expression.",
      },
      {
        type: "p",
        text: "La dissertation n'est pas un exercice de don inné : c'est une technique. En analysant bien le sujet, en construisant un plan clair et en soignant la rédaction, vous transformez cette épreuve en opportunité de gagner des points décisifs.",
      },
    ],
  },
  {
    slug: "comment-choisir-sa-serie-au-lycee-guide-ivoirien",
    title: "Comment choisir sa série au lycée : le guide pour les élèves ivoiriens",
    description:
      "Série C, D, A, A1, B ou E : comment choisir la bonne série au lycée en Côte d'Ivoire selon vos résultats, vos goûts et vos ambitions professionnelles.",
    keywords: ["choisir sa série au lycée", "série C ou D", "orientation lycée Côte d'Ivoire", "séries BAC"],
    category: "Orientation",
    readingMinutes: 6,
    publishedAt: "2026-08-09",
    blocks: [
      {
        type: "p",
        text: "Le choix de la série au lycée est l'une des décisions les plus importantes du parcours scolaire ivoirien. Il oriente les études supérieures et les débouchés professionnels. Pourtant, beaucoup d'élèves choisissent par défaut, par imitation ou sous la pression de l'entourage. Voici comment faire un choix éclairé.",
      },
      { type: "h2", text: "1. Connaître les séries du lycée en Côte d'Ivoire" },
      {
        type: "ul",
        items: [
          "Série C : mathématiques et sciences — idéale pour médecine, ingénierie, architecture, informatique.",
          "Série D : sciences de la vie et de la terre — pour médecine, pharmacie, agronomie, biologie.",
          "Série E : sciences et techniques — pour les filières technologiques et industrielles.",
          "Série A : littéraire — pour droit, lettres, communication, journalisme, enseignement.",
          "Série A1 : littéraire moderne — langues, traduction, relations internationales.",
          "Série B : économique et sociale — pour économie, gestion, commerce, comptabilité.",
        ],
      },
      { type: "h2", text: "2. Se baser sur ses résultats réels, pas sur ses envies" },
      {
        type: "p",
        text: "Le premier critère, c'est la réalité de vos résultats. Un élève qui a des difficultés persistantes en mathématiques visera difficilement une série C. Regardez honnêtement vos notes en classe de 3e et de seconde : elles sont le meilleur indicateur de ce qui vous attend. Il vaut mieux exceller en série B qu'échouer en série C.",
      },
      { type: "h2", text: "3. Intégrer ses goûts et ses ambitions" },
      {
        type: "p",
        text: "Les résultats ne font pas tout : la motivation compte aussi. Si vous aimez comprendre le vivant, la série D peut vous convenir même avec un bon niveau en sciences. Si vous rêvez d'écrire ou de défendre des causes, les séries littéraires mènent à des carrières riches. Listez les métiers qui vous attirent et vérifiez quelles séries y mènent.",
      },
      { type: "h2", text: "4. Les erreurs à éviter" },
      {
        type: "ol",
        items: [
          "Choisir une série uniquement parce qu'un ami ou un frère l'a choisie.",
          "Se laisser imposer un choix contre ses résultats et ses goûts.",
          "Choisir une série scientifique « pour l'avenir » en ignorant son niveau réel.",
          "Refuser les séries littéraires par méconnaissance de leurs débouchés.",
        ],
      },
      { type: "h2", text: "5. Se renseigner et tester" },
      {
        type: "p",
        text: "Parlez-en à vos professeurs, au conseiller d'orientation de votre établissement et à des étudiants ou professionnels de chaque filière. Consultez les débouchés de chaque série. Et surtout, testez votre niveau : les examens blancs et les évaluations du programme sont d'excellents révélateurs.",
      },
      {
        type: "callout",
        text: "Astuce Edukora : réalisez un diagnostic de votre niveau en mathématiques, physique-chimie et SVT avec notre simulateur et la tuteur IA Kora pour choisir votre série en connaissance de cause.",
      },
      {
        type: "p",
        text: "Le bon choix de série se construit sur trois piliers : des résultats honnêtes, des goûts personnels et des ambitions professionnelles claires. Prenez le temps de réfléchir, de vous informer et de tester : c'est votre avenir qui se joue.",
      },
    ],
  },
  {
    slug: "reussir-les-langues-vivantes-au-bac-methode-anglais-espagnol",
    title: "Réussir les langues vivantes au BAC : la méthode pour l'anglais et l'espagnol",
    description:
      "Anglais et espagnol au BAC ivoirien : compréhension écrite et orale, expression, vocabulaire et grammaire. La méthode pour gagner des points en langues vivantes.",
    keywords: ["langues vivantes BAC", "réussir l'anglais au BAC", "épreuve d'anglais", "espagnol BAC"],
    category: "Langues",
    readingMinutes: 6,
    publishedAt: "2026-08-09",
    blocks: [
      {
        type: "p",
        text: "Les langues vivantes (anglais, espagnol, allemand) comptent au BAC ivoirien avec des coefficients qui ne sont pas négligeables. Souvent délaissées car perçues comme difficiles à réviser, elles offrent en réalité des points accessibles à qui adopte la bonne méthode.",
      },
      { type: "h2", text: "1. Comprendre l'épreuve de langue vivante" },
      {
        type: "p",
        text: "L'épreuve écrite de langue vivante repose sur un texte ou un dialogue suivi de questions de compréhension, des exercices de vocabulaire et de grammaire, et une partie d'expression écrite (lettre, dialogue, rédaction courte). Dans certaines séries, une épreuve orale complète l'évaluation : lecture, questions et conversation.",
      },
      { type: "h2", text: "2. La compréhension : le piège des faux amis" },
      {
        type: "p",
        text: "Pour comprendre un texte, entraînez-vous régulièrement à lire des articles, dialogues et histoires dans la langue étudiée. Méfiez-vous des faux amis (mots qui ressemblent au français mais ne veulent pas dire la même chose) et apprenez à déduire le sens des mots inconnus grâce au contexte.",
      },
      { type: "h2", text: "3. Le vocabulaire thématique" },
      {
        type: "ul",
        items: [
          "La vie quotidienne : école, famille, loisirs, santé, alimentation.",
          "La société : travail, ville et campagne, environnement, technologie.",
          "Les sentiments et opinions : exprimer un accord, un désaccord, une préférence.",
          "Le temps et les activités : moments de la journée, projets, passé et futur.",
        ],
      },
      { type: "h2", text: "4. La grammaire qui rapporte des points" },
      {
        type: "p",
        text: "Les correcteurs valorisent la maîtrise des temps (présent, passé, futur), des structures de base (phrases affirmatives, négatives, interrogatives) et des connecteurs logiques (mais, parce que, cependant). Révisez systématiquement les tableaux de conjugaison et les constructions courantes : ce sont des points faciles à sécuriser.",
      },
      { type: "h2", text: "5. L'expression écrite : la méthode" },
      {
        type: "ol",
        items: [
          "Lisez bien la consigne : lettre, dialogue, récit, opinion…",
          "Notez 5 à 8 idées ou phrases utiles avant de rédiger.",
          "Utilisez des phrases simples et correctes plutôt que des phrases complexes hasardeuses.",
          "Respectez la longueur demandée et soignez la présentation.",
          "Relisez pour corriger les fautes de temps et d'orthographe.",
        ],
      },
      {
        type: "callout",
        text: "Astuce Edukora : exercez votre compréhension et votre expression avec la tuteur IA Kora, et entraînez-vous sur des épreuves de langues vivantes notées sur 20 avec notre simulateur.",
      },
      {
        type: "p",
        text: "Les langues vivantes se révisent par la pratique régulière : lecture, vocabulaire thématique, grammaire et expression. En y consacrant un peu de temps chaque semaine, vous transformez une matière souvent négligée en source de points précieux au BAC.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  const date = new Date(iso + "T00:00:00Z");
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
