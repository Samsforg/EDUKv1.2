import { query, queryOne, run } from "./db";

/**
 * Contenu de fiches pour les niveaux qui n'ont pas encore de leçons seedées
 * (collège 6ème→3ème, 2nde, séries L/ES). Les fiches Terminale S et 1ère S
 * existent déjà et ne sont pas touchées.
 */

interface LessonSeed {
  title: string;
  markdown: string;
}

type ContentBlock = {
  definition: string;
  keyPoints: string[];
  example?: { question: string; answer: string };
  practice?: { question: string; answer: string };
};

const GRADES_FR: Record<string, string> = {
  "6eme": "en sixième",
  "5eme": "en cinquième",
  "4eme": "en quatrième",
  "3eme": "en troisième",
  "2nde": "en seconde",
  "1ere_es": "en première ES",
  "1ere_l": "en première L",
  "term_es": "en terminale ES",
  "term_l": "en terminale L",
};

function md(title: string, block: ContentBlock, gradeFr: string): LessonSeed[] {
  const intro = block.definition;
  const key = block.keyPoints.map((k) => `- ${k}`).join("\n");
  const example = block.example
    ? `## Exemple corrigé\n\n**Énoncé :** ${block.example.question}\n\n**Corrigé :** ${block.example.answer}`
    : "";
  const practice = block.practice
    ? `## À toi de jouer\n\n**Exercice :** ${block.practice.question}\n\n**Corrigé :** ${block.practice.answer}`
    : "";

  return [
    {
      title: `${title} : l'essentiel`,
      markdown: `## Définition\n\n${intro}\n\n## À retenir ${gradeFr}\n\n${key}\n${example ? "\n" + example : ""}`,
    },
    {
      title: `${title} : s'entraîner`,
      markdown: `## Rappel du cours\n\n${intro}\n\n${practice ? practice : example ? "\n" + example : ""}`,
    },
  ];
}

const MATHS_BLOCKS: Record<string, ContentBlock> = {
  "nombres-entiers": {
    definition: "Les nombres entiers naturels sont les nombres 0, 1, 2, 3… Les nombres décimaux s'écrivent avec une virgule.",
    keyPoints: [
      "Un nombre entier naturel n'a pas de partie décimale.",
      "Un nombre décimal s'écrit avec une virgule : partie entière + partie décimale.",
      "Comparer deux nombres : on compare d'abord les parties entières.",
      "Encadrer un nombre, c'est trouver deux nombres entre lesquels il se situe.",
      "Un ordre de grandeur permet de vérifier rapidement un résultat.",
    ],
    example: { question: "Encadre 47,83 entre deux entiers consécutifs, puis donne un ordre de grandeur de 47,83 × 3.", answer: "47 < 47,83 < 48. Ordre de grandeur : 50 × 3 = 150." },
    practice: { question: "Range ces nombres dans l'ordre croissant : 12,5 ; 3,8 ; 12,09 ; 3,75.", answer: "3,75 < 3,8 < 12,09 < 12,5." },
  },
  operations: {
    definition: "Les quatre opérations (addition, soustraction, multiplication, division) obéissent à des règles précises de calcul.",
    keyPoints: [
      "La multiplication est prioritaire sur l'addition et la soustraction.",
      "Les parenthèses sont toujours calculées en premier.",
      "La division euclidienne : dividende = diviseur × quotient + reste (reste < diviseur).",
      "Additionner et soustraire : on aligne les virgules des nombres décimaux.",
      "Multiplier par 10, 100, 1000 : on déplace la virgule vers la droite.",
    ],
    example: { question: "Calcule : 5 + 3 × 4.", answer: "D'abord la multiplication : 3 × 4 = 12, puis 5 + 12 = 17." },
    practice: { question: "Calcule : (5 + 3) × 4.", answer: "D'abord les parenthèses : 5 + 3 = 8, puis 8 × 4 = 32." },
  },
  "multiples-diviseurs": {
    definition: "Un multiple de a est un nombre qui s'écrit a × k. Un diviseur de a est un nombre qui divise a sans reste.",
    keyPoints: [
      "Multiples de 2 : nombres pairs. Multiples de 3 : somme des chiffres divisible par 3.",
      "Multiples de 5 : nombres finissant par 0 ou 5. Multiples de 10 : nombres finissant par 0.",
      "Un nombre premier n'a que deux diviseurs : 1 et lui-même.",
      "Décomposer un nombre en produit de facteurs premiers : diviser par les nombres premiers successifs.",
      "Le PGCD de deux nombres est leur plus grand diviseur commun.",
    ],
    example: { question: "Décompose 60 en produit de facteurs premiers.", answer: "60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5, donc 60 = 2² × 3 × 5." },
    practice: { question: "Calcule le PGCD de 24 et 36.", answer: "24 = 2³ × 3 et 36 = 2² × 3², donc PGCD = 2² × 3 = 12." },
  },
  fractions: {
    definition: "Une fraction est une écriture fractionnaire : numérateur / dénominateur. Elle représente un partage égal.",
    keyPoints: [
      "Le dénominateur indique en combien de parts égales l'unité est partagée.",
      "Deux fractions sont égales si on multiplie (ou divise) numérateur et dénominateur par le même nombre.",
      "Pour additionner des fractions, on les met au même dénominateur.",
      "Simplifier une fraction, c'est la rendre irréductible.",
      "Prendre une fraction d'une quantité : on multiplie la quantité par le numérateur puis on divise par le dénominateur.",
    ],
    example: { question: "Calcule : 1/4 + 1/6.", answer: "Dénominateur commun 12 : 1/4 = 3/12 et 1/6 = 2/12, donc 3/12 + 2/12 = 5/12." },
    practice: { question: "Calcule les 2/3 de 120.", answer: "120 × 2 ÷ 3 = 240 ÷ 3 = 80." },
  },
  "decimaux-relatifs": {
    definition: "Les nombres relatifs sont positifs ou négatifs. Ils se placent sur une droite graduée autour de 0.",
    keyPoints: [
      "Deux nombres opposés (ex. +3 et −3) sont à égale distance de 0.",
      "Un nombre positif est toujours supérieur à un nombre négatif.",
      "Additionner deux négatifs : on additionne et on garde le signe −.",
      "Soustraire un nombre, c'est additionner son opposé.",
      "La valeur absolue d'un nombre est sa distance à zéro.",
    ],
    example: { question: "Calcule : (−5) + (−3) puis (−5) − (−3).", answer: "(−5) + (−3) = −8. (−5) − (−3) = (−5) + (+3) = −2." },
    practice: { question: "Range dans l'ordre croissant : −4 ; +2 ; 0 ; −7 ; +1.", answer: "−7 < −4 < 0 < +1 < +2." },
  },
  "calcul-litteral": {
    definition: "Le calcul littéral utilise des lettres pour représenter des nombres inconnus ou variables.",
    keyPoints: [
      "Une expression littérale peut être évaluée en remplaçant les lettres par des valeurs.",
      "La distributivité : k × (a + b) = k × a + k × b.",
      "Développer, c'est appliquer la distributivité ; factoriser, c'est l'inverse.",
      "Les identités remarquables : (a + b)² = a² + 2ab + b² ; (a − b)² = a² − 2ab + b² ; (a + b)(a − b) = a² − b².",
      "Réduire une expression : regrouper les termes de même nature.",
    ],
    example: { question: "Développe 3(x + 5).", answer: "3 × x + 3 × 5 = 3x + 15." },
    practice: { question: "Développe (x + 3)².", answer: "x² + 2 × x × 3 + 3² = x² + 6x + 9." },
  },
  proportionnalite: {
    definition: "Deux grandeurs sont proportionnelles si l'une s'obtient en multipliant l'autre par un même nombre (coefficient).",
    keyPoints: [
      "Dans un tableau de proportionnalité, les produits en croix sont égaux.",
      "Le coefficient de proportionnalité est le rapport constant entre les deux grandeurs.",
      "Un pourcentage est une proportion sur 100 : p% d'une quantité = quantité × p ÷ 100.",
      "Une échelle 1/10000 signifie que 1 cm sur la carte représente 10000 cm dans la réalité.",
      "La vitesse moyenne : v = distance ÷ temps.",
    ],
    example: { question: "3 kg de riz coûtent 1500 F. Combien coûtent 5 kg ?", answer: "Coefficient : 1500 ÷ 3 = 500 F/kg, donc 5 × 500 = 2500 F." },
    practice: { question: "Quel est le prix soldé d'un article à 4000 F avec 20 % de réduction ?", answer: "Remise = 4000 × 20 ÷ 100 = 800 F, prix = 4000 − 800 = 3200 F." },
  },
  "droites-angles": {
    definition: "Les droites peuvent être sécantes, parallèles ou perpendiculaires. Les angles se mesurent en degrés.",
    keyPoints: [
      "Deux droites perpendiculaires forment un angle droit (90°).",
      "Deux droites parallèles ne se coupent jamais.",
      "Un angle droit mesure 90°, un angle plat 180°, un angle aigu < 90°, un angle obtus > 90°.",
      "La bissectrice d'un angle partage l'angle en deux angles égaux.",
      "Deux angles opposés par le sommet sont égaux.",
    ],
    example: { question: "Sur une droite graduée, un angle mesure 145°. Est-il aigu ou obtus ?", answer: "145° > 90°, c'est un angle obtus." },
    practice: { question: "Deux droites sont perpendiculaires à une même troisième. Que peut-on dire ?", answer: "Elles sont parallèles entre elles." },
  },
  "triangles-quadrilateres": {
    definition: "Un triangle a 3 côtés et 3 angles (somme = 180°). Un quadrilatère a 4 côtés (somme = 360°).",
    keyPoints: [
      "Triangle isocèle : deux côtés égaux. Triangle équilatéral : trois côtés égaux (angles de 60°).",
      "Triangle rectangle : possède un angle droit.",
      "Un parallélogramme a ses côtés opposés parallèles et égaux.",
      "Rectangle, losange et carré sont des parallélogrammes particuliers.",
      "Pour construire un triangle, la somme des deux plus petits côtés doit être supérieure au plus grand.",
    ],
    example: { question: "Un triangle a deux angles de 50° et 60°. Que vaut le troisième ?", answer: "180 − 50 − 60 = 70°." },
    practice: { question: "Les angles d'un quadrilatère mesurent 90°, 110° et 100°. Que vaut le dernier ?", answer: "360 − 90 − 110 − 100 = 60°." },
  },
  "symetrie-axiale": {
    definition: "La symétrie axiale est un pliage le long d'un axe : la figure et son image se superposent.",
    keyPoints: [
      "L'axe de symétrie est la droite du pliage.",
      "Un point et son image sont à égale distance de l'axe.",
      "Le segment reliant un point à son image est perpendiculaire à l'axe.",
      "Une figure a un axe de symétrie si elle se superpose à elle-même par pliage.",
      "La symétrie conserve les longueurs et les angles.",
    ],
    example: { question: "Combien d'axes de symétrie a un carré ?", answer: "4 axes : les deux diagonales et les deux médianes." },
    practice: { question: "Combien d'axes de symétrie a un triangle équilatéral ?", answer: "3 axes : chacun passant par un sommet et le milieu du côté opposé." },
  },
  "aires-volumes": {
    definition: "L'aire mesure une surface, le volume mesure un espace. Chaque figure a sa formule.",
    keyPoints: [
      "Rectangle : A = L × l. Carré : A = c × c. Triangle : A = (base × hauteur) ÷ 2.",
      "Disque : A = π × r² avec π ≈ 3,14.",
      "Pavé droit : V = longueur × largeur × hauteur.",
      "Cube : V = c³.",
      "Convertir : 1 m² = 10000 cm² ; 1 m³ = 1000 L.",
    ],
    example: { question: "Calcule l'aire d'un rectangle de 8 cm sur 5 cm.", answer: "A = 8 × 5 = 40 cm²." },
    practice: { question: "Calcule le volume d'un pavé droit de 3 cm × 4 cm × 5 cm.", answer: "V = 3 × 4 × 5 = 60 cm³." },
  },
  statistiques: {
    definition: "Les statistiques permettent d'organiser des données pour les résumer (tableaux, diagrammes, moyennes).",
    keyPoints: [
      "Une série statistique est une liste de valeurs, souvent organisées en tableau d'effectifs.",
      "La moyenne = somme des valeurs × effectifs ÷ effectif total.",
      "Diagrammes en bâtons : hauteur proportionnelle à l'effectif.",
      "Diagramme circulaire : l'angle est proportionnel à l'effectif.",
      "La médiane partage la série triée en deux parties égales (niveau 3ème).",
    ],
    example: { question: "Notes : 12, 15, 9, 16, 13. Calcule la moyenne.", answer: "(12 + 15 + 9 + 16 + 13) ÷ 5 = 65 ÷ 5 = 13." },
    practice: { question: "Un élève a 12, 15 et 18. Quelle note faut-il pour avoir 15 de moyenne ?", answer: "Somme visée : 15 × 4 = 60. Notes : 12 + 15 + 18 = 45, donc 60 − 45 = 15." },
  },
  arithmetique: {
    definition: "L'arithmétique étudie les nombres entiers : divisibilité, nombres premiers, PGCD et PPCM.",
    keyPoints: [
      "Un nombre est premier s'il n'admet que 1 et lui-même comme diviseurs.",
      "Tout nombre se décompose en produit de facteurs premiers.",
      "PGCD : plus grand diviseur commun (méthode des divisions successives ou des facteurs).",
      "PPCM : plus petit multiple commun.",
      "Une fraction est irréductible quand numérateur et dénominateur sont premiers entre eux.",
    ],
    example: { question: "Simplifie 24/36.", answer: "PGCD(24,36) = 12, donc 24/36 = (24÷12)/(36÷12) = 2/3." },
    practice: { question: "Décompose 72 en facteurs premiers.", answer: "72 = 2³ × 3²." },
  },
  "nombres-premiers": {
    definition: "Les nombres premiers sont les entiers naturels qui n'ont exactement deux diviseurs : 1 et eux-mêmes.",
    keyPoints: [
      "2, 3, 5, 7, 11, 13, 17, 19, 23, 29… sont les premiers nombres premiers.",
      "1 n'est pas un nombre premier.",
      "La décomposition en facteurs premiers est unique.",
      "Le PGCD se calcule avec les facteurs communs ; le PPCM avec tous les facteurs à la plus grande puissance.",
      "Deux nombres sont premiers entre eux si leur PGCD vaut 1.",
    ],
    example: { question: "PGCD de 24 et 18 ?", answer: "24 = 2³ × 3 ; 18 = 2 × 3². Facteurs communs : 2 × 3, PGCD = 6." },
    practice: { question: "PPCM de 4 et 6 ?", answer: "4 = 2² ; 6 = 2 × 3. PPCM = 2² × 3 = 12." },
  },
  "fractions-rationnels": {
    definition: "Un nombre rationnel peut s'écrire sous forme de fraction de deux entiers.",
    keyPoints: [
      "Simplifier : diviser numérateur et dénominateur par leur PGCD.",
      "Comparer : mettre au même dénominateur positif.",
      "Additionner/soustraire : dénominateur commun.",
      "Multiplier : numérateurs entre eux, dénominateurs entre eux.",
      "Diviser : multiplier par l'inverse.",
    ],
    example: { question: "Calcule : 2/3 ÷ 4/5.", answer: "2/3 × 5/4 = 10/12 = 5/6." },
    practice: { question: "Calcule : 3/4 + 5/6.", answer: "Dénominateur commun 12 : 9/12 + 10/12 = 19/12." },
  },
  relatifs: {
    definition: "Les nombres relatifs comportent un signe (+ ou −) et une valeur absolue.",
    keyPoints: [
      "Addition de deux relatifs de même signe : on additionne les valeurs absolues, on garde le signe.",
      "Addition de signes contraires : on soustrait, on garde le signe du plus grand.",
      "Soustraire : ajouter l'opposé.",
      "Multiplication : signe + si les deux signes sont identiques, sinon −.",
      "Produit de trois négatifs : −.",
    ],
    example: { question: "Calcule : (−3) × (−4).", answer: "Signes identiques, résultat positif : +12." },
    practice: { question: "Calcule : (−12) ÷ 3.", answer: "Signes contraires, résultat négatif : −4." },
  },
  equations: {
    definition: "Une équation est une égalité contenant une inconnue. La résoudre, c'est trouver la valeur qui rend l'égalité vraie.",
    keyPoints: [
      "On peut ajouter ou retrancher le même nombre aux deux membres.",
      "On peut multiplier ou diviser les deux membres par un même nombre non nul.",
      "Une équation du premier degré a au plus une solution.",
      "Vérifier une solution : remplacer l'inconnue et tester l'égalité.",
      "Mettre un problème en équation : traduire l'énoncé en écriture algébrique.",
    ],
    example: { question: "Résous : 3x + 5 = 20.", answer: "3x = 20 − 5 = 15, donc x = 15 ÷ 3 = 5." },
    practice: { question: "Résous : 2x − 7 = 9.", answer: "2x = 16, donc x = 8." },
  },
  "symetrie-centrale": {
    definition: "La symétrie centrale est une rotation d'un demi-tour (180°) autour d'un point appelé centre.",
    keyPoints: [
      "Le centre est le milieu du segment reliant un point à son image.",
      "La symétrie centrale transforme une droite en une droite parallèle.",
      "Elle conserve les longueurs, les angles et les aires.",
      "Le centre est un point invariant (il reste à sa place).",
      "La composée de deux symétries centrales est une translation.",
    ],
    example: { question: "Quelle est l'image d'une droite par une symétrie centrale ?", answer: "Une droite parallèle à la droite de départ." },
    practice: { question: "Où se trouve le centre d'une symétrie centrale qui transforme A en A' ?", answer: "Au milieu du segment [AA']." },
  },
  parallelogrammes: {
    definition: "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.",
    keyPoints: [
      "Les côtés opposés sont égaux.",
      "Les angles opposés sont égaux.",
      "Les diagonales se coupent en leur milieu.",
      "Rectangle : parallélogramme à 4 angles droits.",
      "Losange : parallélogramme à 4 côtés égaux (diagonales perpendiculaires).",
      "Carré : rectangle ET losange.",
    ],
    example: { question: "Dans un parallélogramme, un angle mesure 110°. Que valent les autres ?", answer: "L'angle opposé mesure 110°, les deux autres 70° chacun (somme 360°)." },
    practice: { question: "Quelles sont les propriétés des diagonales d'un losange ?", answer: "Elles se coupent en leur milieu et sont perpendiculaires." },
  },
  "angles-droites": {
    definition: "Les droites remarquables d'un triangle sont la médiatrice, la médiane, la hauteur et la bissectrice.",
    keyPoints: [
      "Médiatrice d'un segment : droite perpendiculaire passant par son milieu.",
      "Hauteur : droite passant par un sommet et perpendiculaire au côté opposé.",
      "Médiane : droite passant par un sommet et le milieu du côté opposé.",
      "Bissectrice : partage l'angle en deux angles égaux.",
      "Angles alternes-internes : égaux si les droites sont parallèles.",
    ],
    example: { question: "Où se coupent les trois médiatrices d'un triangle ?", answer: "Au centre du cercle circonscrit au triangle." },
    practice: { question: "Si deux droites parallèles sont coupées par une sécante, que peut-on dire des angles correspondants ?", answer: "Ils sont égaux." },
  },
  "triangle-proprietes": {
    definition: "Le triangle possède des droites et des points remarquables aux propriétés précises.",
    keyPoints: [
      "Le cercle circonscrit passe par les trois sommets ; son centre est l'intersection des médiatrices.",
      "Les trois médianes se coupent au centre de gravité.",
      "Les trois hauteurs se coupent à l'orthocentre.",
      "Dans un triangle rectangle, le milieu de l'hypoténuse est le centre du cercle circonscrit.",
      "La somme des angles d'un triangle vaut toujours 180°.",
    ],
    example: { question: "Dans un triangle rectangle en A, où se trouve le centre du cercle circonscrit ?", answer: "Au milieu de l'hypoténuse [BC]." },
    practice: { question: "Comment s'appelle le point de rencontre des médianes ?", answer: "Le centre de gravité." },
  },
  prismes: {
    definition: "Un prisme droit a deux bases parallèles superposables et des faces latérales rectangulaires.",
    keyPoints: [
      "Les bases sont des polygones (triangle, rectangle, carré…).",
      "L'aire latérale = périmètre de la base × hauteur.",
      "Le volume = aire de la base × hauteur.",
      "Le patron d'un prisme est un dépliage de toutes ses faces.",
      "Un cylindre peut être vu comme un prisme à base circulaire.",
    ],
    example: { question: "Volume d'un prisme à base triangulaire d'aire 12 cm² et de hauteur 10 cm ?", answer: "V = 12 × 10 = 120 cm³." },
    practice: { question: "Aire latérale d'un prisme dont la base a un périmètre de 20 cm et la hauteur 7 cm ?", answer: "20 × 7 = 140 cm²." },
  },
  sphere: {
    definition: "La sphère est la surface de tous les points situés à la même distance d'un point appelé centre.",
    keyPoints: [
      "Le rayon relie le centre à un point de la sphère.",
      "L'aire de la sphère : A = 4 × π × r².",
      "Le volume de la boule : V = (4/3) × π × r³.",
      "Le grand cercle a pour centre le centre de la sphère.",
      "Une sphère coupée par un plan donne un cercle.",
    ],
    example: { question: "Aire d'une sphère de rayon 3 cm (π ≈ 3,14) ?", answer: "A = 4 × 3,14 × 9 = 113,04 cm²." },
    practice: { question: "Volume d'une boule de rayon 3 cm ?", answer: "V = 4/3 × 3,14 × 27 = 113,04 cm³." },
  },
  reperage: {
    definition: "Repérer un point, c'est donner sa position sur une droite graduée ou dans un quadrillage.",
    keyPoints: [
      "Sur une droite graduée, un point est repéré par un nombre : son abscisse.",
      "Sur un quadrillage, un point est repéré par deux nombres (x ; y).",
      "L'abscisse x se lit sur l'axe horizontal, l'ordonnée y sur l'axe vertical.",
      "L'origine du repère a pour coordonnées (0 ; 0).",
      "Deux points alignés horizontalement ont la même ordonnée.",
    ],
    example: { question: "Quelles sont les coordonnées de l'origine d'un repère ?", answer: "(0 ; 0)." },
    practice: { question: "Le point A(3 ; −2) : où se trouve-t-il sur l'axe vertical ?", answer: "À 2 unités sous l'axe horizontal (ordonnée −2)." },
  },
  puissances: {
    definition: "La puissance n d'un nombre a est le produit de n facteurs égaux à a : aⁿ.",
    keyPoints: [
      "aⁿ × aᵖ = aⁿ⁺ᵖ ; aⁿ ÷ aᵖ = aⁿ⁻ᵖ ; (aⁿ)ᵖ = aⁿᵖ.",
      "a⁰ = 1 pour tout a ≠ 0.",
      "10ⁿ : 1 suivi de n zéros.",
      "Notation scientifique : a × 10ᵖ avec 1 ≤ a < 10.",
      "Puissance d'un produit : (a × b)ⁿ = aⁿ × bⁿ.",
    ],
    example: { question: "Calcule 2⁵.", answer: "2 × 2 × 2 × 2 × 2 = 32." },
    practice: { question: "Écris 450000 en notation scientifique.", answer: "4,5 × 10⁵." },
  },
  pythagore: {
    definition: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
    keyPoints: [
      "Théorème : si ABC est rectangle en A, alors AB² + AC² = BC².",
      "L'hypoténuse est le côté opposé à l'angle droit (le plus long).",
      "Pour calculer un côté : BC = √(AB² + AC²).",
      "Réciproque : si AB² + AC² = BC², alors le triangle est rectangle en A.",
      "La racine carrée √ d'un nombre positif est le nombre positif dont le carré est ce nombre.",
    ],
    example: { question: "Dans un triangle rectangle, les côtés de l'angle droit mesurent 3 et 4 cm. Que vaut l'hypoténuse ?", answer: "c² = 3² + 4² = 9 + 16 = 25, donc c = √25 = 5 cm." },
    practice: { question: "Un triangle a des côtés 6, 8 et 10. Est-il rectangle ?", answer: "6² + 8² = 36 + 64 = 100 = 10², donc oui." },
  },
  "triangles-egaux": {
    definition: "Deux triangles sont égaux s'ils sont superposables : leurs côtés et angles correspondants sont égaux.",
    keyPoints: [
      "Cas d'égalité 1 : trois côtés égaux.",
      "Cas d'égalité 2 : un côté égal compris entre deux angles égaux.",
      "Cas d'égalité 3 : deux côtés égaux avec l'angle compris égal.",
      "Deux triangles semblables ont des angles égaux et des côtés proportionnels.",
      "Le rapport de similitude relie les longueurs des côtés correspondants.",
    ],
    example: { question: "Deux triangles ont leurs trois angles égaux. Sont-ils égaux ?", answer: "Non, ils sont semblables (les côtés sont proportionnels, pas forcément égaux)." },
    practice: { question: "Deux triangles ont un côté de 5 cm, un angle de 40° et l'autre angle adjacent de 60° en commun. Que peut-on conclure ?", answer: "Ils sont égaux (cas : un côté compris entre deux angles)." },
  },
  cosinus: {
    definition: "Dans un triangle rectangle, le cosinus d'un angle aigu est le rapport du côté adjacent sur l'hypoténuse.",
    keyPoints: [
      "cos(angle) = côté adjacent ÷ hypoténuse.",
      "Le cosinus est toujours compris entre 0 et 1 pour un angle aigu.",
      "cos(60°) = 0,5 ; cos(45°) ≈ 0,707 ; cos(30°) ≈ 0,866.",
      "On utilise le cosinus pour calculer un côté ou un angle.",
      "Mémoriser : cosinus → adjacent sur hypoténuse.",
    ],
    example: { question: "Dans un triangle rectangle, le côté adjacent mesure 4 cm et l'hypoténuse 5 cm. Que vaut cos(angle) ?", answer: "cos = 4/5 = 0,8." },
    practice: { question: "Si cos(angle) = 0,6 et l'hypoténuse mesure 10 cm, que vaut le côté adjacent ?", answer: "adjacent = 0,6 × 10 = 6 cm." },
  },
  "distances-cercles": {
    definition: "La distance d'un point à une droite est la longueur du plus court segment reliant ce point à la droite.",
    keyPoints: [
      "Ce plus court segment est perpendiculaire à la droite.",
      "La médiatrice est l'ensemble des points équidistants des extrémités du segment.",
      "Le cercle circonscrit d'un triangle passe par ses trois sommets.",
      "Tout point du cercle est à égale distance du centre : le rayon.",
      "Une tangente à un cercle est perpendiculaire au rayon au point de contact.",
    ],
    example: { question: "Quel est le lien entre un point de la médiatrice et les extrémités du segment ?", answer: "Il est à égale distance des deux extrémités." },
    practice: { question: "Une tangente au cercle en A : quelle est sa position par rapport au rayon [OA] ?", answer: "Elle est perpendiculaire au rayon [OA]." },
  },
  fonctions: {
    definition: "Une fonction f associe à chaque nombre x un unique nombre f(x).",
    keyPoints: [
      "x est la variable ; f(x) est l'image de x.",
      "Un antécédent de y est un x tel que f(x) = y.",
      "La courbe représentative est l'ensemble des points (x ; f(x)).",
      "Une fonction affine s'écrit f(x) = ax + b ; sa courbe est une droite.",
      "a est le coefficient directeur (pente), b l'ordonnée à l'origine.",
    ],
    example: { question: "f(x) = 2x + 1. Calcule f(3).", answer: "f(3) = 2 × 3 + 1 = 7." },
    practice: { question: "f(x) = 3x − 2. Quel est l'antécédent de 10 ?", answer: "3x − 2 = 10 → 3x = 12 → x = 4." },
  },
  "translation-vecteurs": {
    definition: "Une translation glisse une figure sans la tourner ni la déformer. Le vecteur décrit cette translation.",
    keyPoints: [
      "Un vecteur a une direction, un sens et une longueur.",
      "La translation qui transforme A en B est notée par le vecteur AB.",
      "La somme de deux vecteurs suit la règle du parallélogramme.",
      "Le vecteur nul a une longueur nulle (point invariant).",
      "Deux vecteurs sont égaux s'ils ont même direction, sens et longueur.",
    ],
    example: { question: "Qu'est-ce que le vecteur nul ?", answer: "Le vecteur de longueur nulle : la translation qui ne déplace rien." },
    practice: { question: "Comment s'appelle le résultat de la composition de deux translations ?", answer: "Une translation de vecteur égal à la somme des deux vecteurs." },
  },
  "proportionnalite-statistiques": {
    definition: "Les statistiques et la proportionnalité s'appuient sur les mêmes outils : fréquences, moyennes pondérées, pourcentages.",
    keyPoints: [
      "Fréquence = effectif d'une valeur ÷ effectif total.",
      "Moyenne pondérée : somme des (valeur × coefficient) ÷ somme des coefficients.",
      "La moyenne pondérée s'utilise avec les coefficients officiels des matières.",
      "Un pourcentage de fréquences cumulées aide à lire un tableau.",
      "Un diagramme circulaire : angle = fréquence × 360°.",
    ],
    example: { question: "Notes : 12 (coef 2), 15 (coef 3). Moyenne pondérée ?", answer: "(12 × 2 + 15 × 3) ÷ 5 = (24 + 45) ÷ 5 = 69 ÷ 5 = 13,8." },
    practice: { question: "Une valeur a une fréquence de 0,25. Quel angle lui correspond ?", answer: "0,25 × 360° = 90°." },
  },
  agrandissements: {
    definition: "Agrandir ou réduire une figure, c'est multiplier toutes ses longueurs par un même facteur k.",
    keyPoints: [
      "Si k > 1 : agrandissement ; si 0 < k < 1 : réduction.",
      "Les angles sont conservés.",
      "Les aires sont multipliées par k².",
      "Les volumes sont multipliés par k³.",
      "Une figure agrandie reste semblable à l'originale.",
    ],
    example: { question: "On agrandit une figure par k = 2. Que deviennent les aires ?", answer: "Elles sont multipliées par 2² = 4." },
    practice: { question: "k = 3 : que deviennent les volumes ?", answer: "Ils sont multipliés par 3³ = 27." },
  },
  probabilites: {
    definition: "Une probabilité mesure la chance qu'un événement se produise lors d'une expérience aléatoire.",
    keyPoints: [
      "Une probabilité est un nombre entre 0 et 1.",
      "Événement certain : probabilité 1. Événement impossible : probabilité 0.",
      "Si tous les résultats sont équiprobables : P = nombre de cas favorables ÷ nombre de cas possibles.",
      "La somme des probabilités de tous les résultats vaut 1.",
      "P(événement contraire) = 1 − P(événement).",
    ],
    example: { question: "On lance un dé à 6 faces. Probabilité d'obtenir un 4 ?", answer: "P = 1/6." },
    practice: { question: "Dans un sac de 5 billes (3 rouges, 2 bleues), probabilité de tirer une bleue ?", answer: "P = 2/5 = 0,4." },
  },
  "racines-carrees": {
    definition: "La racine carrée d'un nombre positif a est le nombre positif dont le carré est égal à a.",
    keyPoints: [
      "√a est toujours positif ; √a² = a pour a ≥ 0.",
      "√(a × b) = √a × √b.",
      "√(a/b) = √a ÷ √b (b > 0).",
      "√(a + b) ≠ √a + √b en général.",
      "Simplifier : √12 = √(4 × 3) = 2√3.",
    ],
    example: { question: "Simplifie √18.", answer: "√18 = √(9 × 2) = 3√2." },
    practice: { question: "Calcule √(25 × 4).", answer: "√25 × √4 = 5 × 2 = 10." },
  },
  "equations-inequations": {
    definition: "Résoudre une équation ou une inéquation, c'est trouver toutes les valeurs de l'inconnue qui rendent l'affirmation vraie.",
    keyPoints: [
      "Une inéquation a généralement une infinité de solutions (intervalle).",
      "Multiplier ou diviser par un nombre NÉGATIF inverse le sens de l'inégalité.",
      "On représente les solutions d'une inéquation sur une droite graduée.",
      "Un intervalle se note avec des crochets : [2 ; +∞[.",
      "Vérifier : tester une valeur de l'intervalle solution.",
    ],
    example: { question: "Résous : 2x + 3 ≥ 7.", answer: "2x ≥ 4 → x ≥ 2. Solutions : [2 ; +∞[." },
    practice: { question: "Résous : −3x < 9.", answer: "x > −3 (le sens est inversé)." },
  },
  systemes: {
    definition: "Un système de deux équations à deux inconnues se résout par substitution ou par combinaison.",
    keyPoints: [
      "Substitution : exprimer une inconnue puis la remplacer dans l'autre équation.",
      "Combinaison : additionner ou soustraire les équations pour éliminer une inconnue.",
      "La solution est un couple (x ; y).",
      "Graphiquement, la solution est le point d'intersection des deux droites.",
      "Trois cas : une solution, aucune (droites parallèles), infinité (droites confondues).",
    ],
    example: { question: "Résous : x + y = 10 et x − y = 2.", answer: "Par combinaison : 2x = 12 → x = 6, puis y = 4. Solution : (6 ; 4)." },
    practice: { question: "Résous : 2x + y = 7 et y = 3.", answer: "2x + 3 = 7 → 2x = 4 → x = 2. Solution : (2 ; 3)." },
  },
  "fonctions-affines": {
    definition: "Une fonction affine f(x) = ax + b a une courbe représentative qui est une droite.",
    keyPoints: [
      "a est le coefficient directeur : pente de la droite.",
      "b est l'ordonnée à l'origine : f(0) = b.",
      "Si a > 0, la droite monte ; si a < 0, elle descend.",
      "Si b = 0, f est linéaire et passe par l'origine.",
      "Le taux d'accroissement de f entre x₁ et x₂ est (f(x₂) − f(x₁)) ÷ (x₂ − x₁) = a.",
    ],
    example: { question: "f(x) = −2x + 3 : la droite monte-t-elle ou descend-elle ?", answer: "a = −2 < 0, elle descend." },
    practice: { question: "Une droite passe par (0 ; 4) et a pour pente 3. Quelle est son équation ?", answer: "f(x) = 3x + 4." },
  },
  thales: {
    definition: "Le théorème de Thalès relie les longueurs dans une configuration de deux droites parallèles coupées par deux sécantes.",
    keyPoints: [
      "Configuration : deux droites sécantes en A, deux parallèles coupant les côtés en B/C et B'/C'.",
      "Rapport : AB/AB' = AC/AC' = BC/B'C'.",
      "La réciproque permet de prouver que deux droites sont parallèles.",
      "Utilisation : calculer une longueur, agrandir ou réduire.",
      "Les quotients doivent être écrits dans le même ordre (petit sur grand).",
    ],
    example: { question: "AB = 4, AB' = 10, AC = 6. Que vaut AC' ?", answer: "AB/AB' = AC/AC' → 4/10 = 6/AC' → AC' = 15." },
    practice: { question: "AB/AB' = 3/5 et AC/AC' = 3/5 : que peut-on conclure des droites (BC) et (B'C') ?", answer: "Elles sont parallèles (réciproque de Thalès)." },
  },
  trigonometrie: {
    definition: "La trigonométrie relie les angles et les longueurs dans le triangle rectangle.",
    keyPoints: [
      "cos = adjacent ÷ hypoténuse ; sin = opposé ÷ hypoténuse ; tan = opposé ÷ adjacent.",
      "sin² + cos² = 1 pour un même angle.",
      "tan = sin ÷ cos.",
      "Angles remarquables : 30°, 45°, 60°.",
      "Utiliser la bonne formule selon la donnée cherchée (SOH-CAH-TOA).",
    ],
    example: { question: "Dans un triangle rectangle, l'opposé mesure 3 et l'hypoténuse 5. Que vaut sin ?", answer: "sin = 3/5 = 0,6." },
    practice: { question: "tan(angle) = 0,75 : que vaut le rapport opposé/adjacent ?", answer: "0,75, soit 3/4." },
  },
  vecteurs: {
    definition: "Un vecteur est un objet mathématique qui a une direction, un sens et une longueur.",
    keyPoints: [
      "AB et CD sont égaux si ABDC est un parallélogramme.",
      "Le vecteur −u a même direction et longueur, sens opposé.",
      "u + (−u) = 0 (vecteur nul).",
      "La relation de Chasles : AB + BC = AC.",
      "Un point M est le milieu de [AB] si AM = MB (vecteurs).",
    ],
    example: { question: "Simplifie : AB + BC.", answer: "Par la relation de Chasles : AB + BC = AC." },
    practice: { question: "Que vaut AB + BA ?", answer: "Le vecteur nul (0)." },
  },
  "rotations-homotheties": {
    definition: "La rotation tourne une figure autour d'un point ; l'homothétie agrandit ou réduit à partir d'un centre.",
    keyPoints: [
      "Une rotation a un centre, un angle et un sens.",
      "La rotation d'angle 180° est une symétrie centrale.",
      "Une homothétie de rapport k multiplie les distances par k.",
      "Si k < 0, la figure est de l'autre côté du centre.",
      "Rotation et homothétie conservent les angles.",
    ],
    example: { question: "Quelle transformation est une rotation de 180° ?", answer: "La symétrie centrale." },
    practice: { question: "Homothétie de rapport −2 : que devient une distance de 3 cm ?", answer: "3 × 2 = 6 cm (de l'autre côté du centre)." },
  },
  "solides-espace": {
    definition: "Les solides usuels : pavé droit, cube, prisme, pyramide, cylindre, cône, sphère.",
    keyPoints: [
      "Pyramide : V = (aire de la base × hauteur) ÷ 3.",
      "Cône : V = (π × r² × h) ÷ 3.",
      "Cylindre : V = π × r² × h.",
      "Sphère/boule : A = 4πr², V = (4/3)πr³.",
      "Les faces, arêtes et sommets se comptent sur le solide ou son patron.",
    ],
    example: { question: "Volume d'une pyramide à base carrée de côté 6 et de hauteur 9 ?", answer: "Base = 36, V = 36 × 9 ÷ 3 = 108." },
    practice: { question: "Volume d'un cône de rayon 3 et de hauteur 10 (π ≈ 3,14) ?", answer: "V = 3,14 × 9 × 10 ÷ 3 = 94,2." },
  },
  "geometrie-espace": {
    definition: "La géométrie dans l'espace étudie les positions relatives des droites et des plans.",
    keyPoints: [
      "Deux droites de l'espace peuvent être sécantes, parallèles ou non coplanaires.",
      "Deux plans peuvent être sécants (une droite) ou parallèles.",
      "Une droite est parallèle à un plan si elle ne le coupe pas.",
      "La section d'un cube par un plan est un polygone.",
      "Le théorème de Pythagore s'applique dans un plan de l'espace.",
    ],
    example: { question: "Deux droites de l'espace qui ne se coupent pas sont-elles toujours parallèles ?", answer: "Non, elles peuvent être non coplanaires." },
    practice: { question: "Quelle est l'intersection de deux plans sécants ?", answer: "Une droite." },
  },
  "applications-trigo": {
    definition: "La trigonométrie s'applique aux mesures de terrain : hauteurs, distances, angles d'élévation.",
    keyPoints: [
      "Angle d'élévation : angle entre l'horizontale et la ligne de visée vers le haut.",
      "Pour mesurer une hauteur inaccessible, on utilise tan ou sin.",
      "Bien identifier l'angle de référence avant de choisir la formule.",
      "Arrondir les résultats avec la précision demandée.",
      "Vérifier la cohérence : une hauteur ne peut être négative.",
    ],
    example: { question: "Un arbre projette une ombre de 12 m ; l'angle du soleil est de 45°. Hauteur de l'arbre ?", answer: "tan(45°) = h/12 → h = 12 × 1 = 12 m." },
    practice: { question: "Une échelle de 5 m appuyée fait un angle de 60° avec le sol. Quelle hauteur atteint-elle ?", answer: "h = 5 × sin(60°) ≈ 5 × 0,866 ≈ 4,33 m." },
  },
};

const SUBJECT_BANKS: Record<string, Record<"college" | "lycee", ContentBlock>> = {
  pc: {
    college: {
      definition: "Les sciences physiques et la chimie expliquent la matière, ses transformations, l'énergie et les phénomènes du quotidien.",
      keyPoints: [
        "La matière existe sous trois états : solide, liquide, gazeux.",
        "Un changement d'état (fusion, vaporisation, condensation…) se fait sans changer la substance.",
        "L'eau pure a une température d'ébullition de 100°C et de fusion de 0°C.",
        "Un circuit électrique simple : générateur + fils + dipôles, courant en boucle fermée.",
        "La masse se mesure avec une balance, le volume avec une éprouvette graduée.",
        "Une transformation chimique produit de nouvelles substances.",
      ],
      example: { question: "Quelle est la différence entre une fusion et une vaporisation ?", answer: "La fusion est le passage solide → liquide ; la vaporisation, liquide → gaz." },
      practice: { question: "Que faut-il pour qu'un courant circule dans un circuit ?", answer: "Une boucle fermée contenant un générateur." },
    },
    lycee: {
      definition: "La chimie étudie les atomes, les ions et leurs réactions ; la physique étudie les forces, le mouvement et l'énergie.",
      keyPoints: [
        "Un atome : noyau (protons + neutrons) et électrons.",
        "Les ions sont des atomes ayant gagné ou perdu des électrons.",
        "Une équation de réaction doit être équilibrée (même nombre d'atomes de chaque côté).",
        "Loi d'Ohm : U = R × I.",
        "La pression se mesure en pascal (Pa) ; 1 bar = 100000 Pa.",
        "L'énergie cinétique : Ec = ½ m v².",
      ],
      example: { question: "Un conducteur a R = 10 Ω et I = 0,5 A. Que vaut U ?", answer: "U = 10 × 0,5 = 5 V." },
      practice: { question: "Qu'est-ce qu'un ion ?", answer: "Un atome ou groupe d'atomes ayant perdu ou gagné des électrons (charge électrique)." },
    },
  },
  svt: {
    college: {
      definition: "La SVT étudie le vivant : cellules, organes, fonctions, environnement et géologie.",
      keyPoints: [
        "Tout être vivant est constitué de cellules.",
        "La respiration et la nutrition fournissent l'énergie aux cellules.",
        "La digestion transforme les aliments en nutriments.",
        "Un écosystème = êtres vivants + milieu + interactions.",
        "La biodiversité est la variété des êtres vivants.",
        "Les roches et le sol proviennent de la dégradation des roches et des êtres vivants.",
      ],
      example: { question: "Quelle est la plus petite unité du vivant ?", answer: "La cellule." },
      practice: { question: "Qu'est-ce qu'un écosystème ?", answer: "L'ensemble formé par les êtres vivants, leur milieu et les interactions entre eux." },
    },
    lycee: {
      definition: "Au lycée, la SVT aborde la cellule, la génétique, l'immunité, la reproduction et les grands cycles du vivant.",
      keyPoints: [
        "La cellule : membrane, cytoplasme, noyau ; organites et métabolisme.",
        "L'ADN porte l'information génétique sous forme de gènes.",
        "La mitose produit deux cellules identiques ; la méiose produit les gamètes.",
        "Le groupe sanguin dépend des antigènes A, B et du rhésus.",
        "Le système immunitaire distingue le soi du non-soi.",
        "La reproduction humaine fait intervenir des hormones de contrôle.",
      ],
      example: { question: "Quel est le rôle de la mitose ?", answer: "Produire deux cellules filles génétiquement identiques à la cellule mère." },
      practice: { question: "Où est portée l'information génétique ?", answer: "Dans l'ADN, organisé en gènes sur les chromosomes." },
    },
  },
  francais: {
    college: {
      definition: "Le français au collège : grammaire, conjugaison, orthographe, vocabulaire, lecture et expression.",
      keyPoints: [
        "Une phrase : groupe sujet + groupe verbal, organisés autour d'un verbe conjugué.",
        "Les classes de mots : nom, déterminant, adjectif, pronom, verbe, adverbe, préposition, conjonction.",
        "Le verbe s'accorde avec son sujet (même inversé).",
        "Les temps du récit : passé simple et imparfait ; le présent ; le futur.",
        "Un texte narratif : situation initiale, élément perturbateur, péripéties, dénouement.",
        "Lire à voix haute avec intonation améliore la compréhension.",
      ],
      example: { question: "Quelles sont les cinq étapes du schéma narratif ?", answer: "Situation initiale, élément perturbateur, péripéties, dénouement, situation finale." },
      practice: { question: "« Ils (manger) » — conjugue au présent de l'indicatif.", answer: "Ils mangent." },
    },
    lycee: {
      definition: "Au lycée, le français : textes littéraires (roman, poésie, théâtre), argumentation, dissertation et commentaire.",
      keyPoints: [
        "Le registre d'un texte : pathétique, lyrique, comique, satirique, épique…",
        "Une argumentation : thèse + arguments + exemples ; elle s'oppose parfois à une contre-thèse.",
        "Le commentaire composé suit un plan organisé (I, II, III).",
        "La dissertation : problématique, plan, développement argumenté, conclusion.",
        "Les figures de style : métaphore, comparaison, hyperbole, antithèse, anaphore.",
        "La versification : vers, rimes, strophes, rythme.",
      ],
      example: { question: "Quelle est la différence entre une métaphore et une comparaison ?", answer: "La comparaison utilise un outil (comme, tel, semblable à) ; la métaphore ne l'utilise pas." },
      practice: { question: "Cite trois registres littéraires.", answer: "Comique, lyrique, épique (ou pathétique, satirique, tragique…)." },
    },
  },
  hg: {
    college: {
      definition: "L'histoire-géographie au collège : les grandes périodes historiques et l'étude des milieux et des populations.",
      keyPoints: [
        "Les grandes périodes de l'histoire : Préhistoire, Antiquité, Moyen Âge, Temps modernes, Époque contemporaine.",
        "La frise chronologique se lit de gauche à droite, du passé vers le présent.",
        "Les premières civilisations : Égypte, Grèce, Rome (Afrique ancienne incluse).",
        "La Terre : continents, océans, reliefs, climats, population.",
        "Lire une carte : titre, légende, échelle, orientation.",
        "La mondialisation relie les économies du monde entier.",
      ],
      example: { question: "À quoi sert la légende d'une carte ?", answer: "Elle explique la signification des symboles et couleurs de la carte." },
      practice: { question: "Cite trois océans.", answer: "Atlantique, Indien, Pacifique (ou Arctique, Austral)." },
    },
    lycee: {
      definition: "Au lycée : histoire des mondes (Afrique, Europe, monde), géographie des grands espaces et développement durable.",
      keyPoints: [
        "La colonisation puis les indépendances ont construit les États africains.",
        "Les deux guerres mondiales ont redessiné la carte du monde.",
        "La mondialisation : flux, acteurs (États, firmes, ONG) et espaces moteurs.",
        "Le développement durable : équilibre entre économie, social et environnement.",
        "La géographie se lit à différentes échelles : local, national, mondial.",
        "Les migrations transforment les sociétés d'origine et d'accueil.",
      ],
      example: { question: "Quels sont les trois piliers du développement durable ?", answer: "Économique, social et environnemental." },
      practice: { question: "Qu'est-ce que la mondialisation ?", answer: "Le processus d'interdépendance croissante des économies et des sociétés à l'échelle mondiale." },
    },
  },
  anglais: {
    college: {
      definition: "L'anglais au collège : bases de grammaire, vocabulaire du quotidien, communication simple.",
      keyPoints: [
        "Le présent simple décrit des habitudes : I play, she plays.",
        "Le présent continu décrit une action en cours : I am playing.",
        "Le prétérit raconte le passé : I played, I went.",
        "Le futur avec will ou be going to.",
        "Les comparatifs : taller than, more interesting than.",
        "Vocabulaire de base : school, family, home, food, numbers, time.",
      ],
      example: { question: "Conjugue « to go » au prétérit.", answer: "I went, you went, he went…" },
      practice: { question: "« She ___ (play) football every Sunday. »", answer: "plays (présent simple, 3e personne : s)." },
    },
    lycee: {
      definition: "L'anglais au lycée : temps complexes, voix passive, modaux, discours indirect et compréhension de textes.",
      keyPoints: [
        "Le passif : to be + participe passé (The book was written).",
        "Les modaux : can, must, should, may, might.",
        "Le conditionnel : if + présent → will ; if + prétérit → would.",
        "Le discours indirect : He said that he was tired.",
        "Les relatifs : who, which, whose, where, when.",
        "La compréhension écrite : repérer le sujet, les idées principales, les connecteurs.",
      ],
      example: { question: "Transforme en passif : « They built the bridge in 1990. »", answer: "The bridge was built in 1990." },
      practice: { question: "Complète : « If I were rich, I ___ (travel) the world. »", answer: "would travel (conditionnel)." },
    },
  },
  maths: {
    college: {
      definition: "Les mathématiques au collège : calcul, géométrie, statistiques et probabilités.",
      keyPoints: [
        "Bien maîtriser les priorités de calcul (parenthèses, × et ÷, + et −).",
        "Apprendre les formules d'aires et de volumes par cœur.",
        "Toujours vérifier ses calculs avec un ordre de grandeur.",
        "Une figure se construit aux instruments : règle, équerre, compas, rapporteur.",
        "Relire l'énoncé : souligner les données, encadrer la question.",
        "Présenter les calculs en colonnes, étape par étape.",
      ],
      example: { question: "Pourquoi vérifier ses résultats avec un ordre de grandeur ?", answer: "Pour détecter une erreur de calcul grossière rapidement." },
      practice: { question: "Quel instrument sert à mesurer un angle ?", answer: "Le rapporteur." },
    },
    lycee: {
      definition: "Les mathématiques au lycée : fonctions, suites, géométrie analytique, statistiques et probabilités.",
      keyPoints: [
        "Étudier une fonction : ensemble de définition, limites, dérivée, tableau de variations.",
        "Une suite arithmétique : uₙ₊₁ = uₙ + r ; géométrique : uₙ₊₁ = q × uₙ.",
        "Le second degré : discriminant Δ = b² − 4ac, racines, signe.",
        "Coordonnées et équations de droites : y = ax + b.",
        "Statistiques : moyenne, médiane, écart-type.",
        "Probabilités : événements, arbres, loi binomiale.",
      ],
      example: { question: "Qu'est-ce que le discriminant d'un trinôme ?", answer: "Δ = b² − 4ac ; il indique le nombre de solutions réelles de l'équation ax² + bx + c = 0." },
      practice: { question: "Suite géométrique de raison 2 et u₁ = 3 : que vaut u₃ ?", answer: "u₃ = 3 × 2² = 12." },
    },
  },
  espagnol: {
    college: {
      definition: "L'espagnol est une langue romance, apprise comme langue vivante 2 (LV2) à l'école ivoirienne. On la parle notamment en Espagne et en Amérique latine.",
      keyPoints: [
        "Saluer : hola, buenos días, buenas tardes, buenas noches.",
        "Se présenter : me llamo..., tengo ... años.",
        "Les nombres de 0 à 100.",
        "La famille : madre, padre, hermano, hermana.",
        "Le vocabulaire de l'école : libro, mesa, profesor.",
      ],
      example: { question: "Comment dit-on « J'ai 14 ans » en espagnol ?", answer: "Tengo catorce años." },
      practice: { question: "Traduis : « Bonjour, je m'appelle Aminata. »", answer: "Hola, me llamo Aminata." },
    },
    lycee: {
      definition: "En lycée, l'espagnol approfondit la grammaire, le vocabulaire et la culture hispanophone (Espagne et Amérique latine).",
      keyPoints: [
        "Le présent : hablo, como, vivo.",
        "Le passé (pretérito) : hablé, comí, viví.",
        "Les adjectifs et le genre (o/a).",
        "La géographie et la culture de l'Espagne et de l'Amérique latine.",
        "Compréhension de textes courts.",
      ],
      example: { question: "Conjugue « comer » au prétérit : « ayer yo ... »", answer: "comí (ayer comí)." },
      practice: { question: "Traduis : « Je mange à la maison. »", answer: "Como en casa." },
    },
  },
  allemand: {
    college: {
      definition: "L'allemand est une langue germanique, apprise comme langue vivante 2 (LV2). Elle a des particularités : majuscules aux noms, articles der/die/das.",
      keyPoints: [
        "Saluer : hallo, guten Morgen, guten Tag.",
        "Se présenter : ich heiße..., ich bin ... Jahre alt.",
        "Les articles : der (masculin), die (féminin), das (neutre).",
        "Les nombres de 0 à 100.",
        "La famille : Mutter, Vater, Bruder, Schwester.",
      ],
      example: { question: "Comment dit-on « Je m'appelle Konan » en allemand ?", answer: "Ich heiße Konan." },
      practice: { question: "Traduis : « Bonjour, j'ai 15 ans. »", answer: "Hallo, ich bin 15 Jahre alt." },
    },
    lycee: {
      definition: "En lycée, l'allemand développe la grammaire (cas, conjugaison) et la culture germanophone.",
      keyPoints: [
        "Le présent : ich spreche, du sprichst.",
        "Les cas : nominatif, accusatif, datif.",
        "Le passé (Perfekt) : ich habe gesprochen.",
        "Le vocabulaire de la vie quotidienne et scolaire.",
        "Compréhension écrite de courts textes.",
      ],
      example: { question: "Conjugue « sprechen » au présent : « ich ... »", answer: "spreche (ich spreche)." },
      practice: { question: "Traduis : « Je parle allemand. »", answer: "Ich spreche Deutsch." },
    },
  },
  edhc: {
    college: {
      definition: "L'EDHC (Éducation au Développement Humain et Civique) forme le citoyen responsable et favorise le vivre-ensemble.",
      keyPoints: [
        "Les droits de l'enfant et les devoirs du citoyen.",
        "La République de Côte d'Ivoire : principes et symboles.",
        "La santé : hygiène, nutrition, prévention.",
        "L'environnement : protection et développement durable.",
        "La paix et la tolérance dans la communauté.",
      ],
      example: { question: "Cite deux droits fondamentaux de l'enfant.", answer: "Le droit à l'éducation et le droit à la santé." },
      practice: { question: "Qu'est-ce que le développement durable ?", answer: "Un développement qui répond aux besoins du présent sans compromettre l'avenir." },
    },
    lycee: {
      definition: "En lycée, l'EDHC aborde les institutions, la citoyenneté active et les grands enjeux de développement.",
      keyPoints: [
        "Les institutions de la République : exécutif, législatif, judiciaire.",
        "La Constitution et la loi.",
        "La participation citoyenne et le vote.",
        "Les enjeux du développement humain : santé, éducation, emploi.",
        "La protection de l'environnement et la responsabilité globale.",
      ],
      example: { question: "Quels sont les trois pouvoirs en Côte d'Ivoire ?", answer: "Le pouvoir exécutif, le législatif et le judiciaire." },
      practice: { question: "Pourquoi voter est-il un devoir citoyen ?", answer: "Parce que c'est choisir ses représentants et participer à la vie démocratique." },
    },
  },
};

function findBlock(subjectCode: string, chapterCode: string, cycle: "college" | "lycee"): ContentBlock | null {
  if (subjectCode === "maths") {
    return MATHS_BLOCKS[chapterCode] ?? null;
  }
  return null;
}

export async function seedCollegeContent(): Promise<void> {
  const grades = await query<{ id: number; code: string }>(`SELECT id, code FROM grades`);
  const gradeIdByCode = new Map(grades.map((g) => [g.code, g.id]));
  const collegeCodes = new Set(["6eme", "5eme", "4eme", "3eme"]);
  const lyceeCodes = new Set(["2nde", "1ere_s", "1ere_es", "1ere_l", "term_s", "term_es", "term_l"]);

  const chapters = await query<{ id: number; subject_id: number; grade_id: number; title: string; code: string }>(
    `SELECT c.id, c.subject_id, c.grade_id, c.title, c.code FROM chapters c WHERE c.status = 'approved'`,
  );

  const subjects = await query<{ id: number; code: string }>(`SELECT id, code FROM subjects`);
  const subjectCodeById = new Map(subjects.map((s) => [s.id, s.code]));

  let inserted = 0;
  let skipped = 0;

  for (const ch of chapters) {
    const gradeRow = [...gradeIdByCode.entries()].find(([, id]) => id === ch.grade_id);
    if (!gradeRow) continue;
    const gradeCode = gradeRow[0];
    const cycle = collegeCodes.has(gradeCode) ? "college" : lyceeCodes.has(gradeCode) ? "lycee" : null;
    if (!cycle) continue;

    const subjectCode = subjectCodeById.get(ch.subject_id) ?? "maths";
    const existing = await queryOne<{ c: number }>(`SELECT COUNT(*) AS c FROM lessons WHERE chapter_id = ?`, ch.id);
    if (existing && Number(existing.c) > 0) {
      skipped++;
      continue;
    }

    const gradeFr = GRADES_FR[gradeCode] ?? "";
    const block = findBlock(subjectCode, ch.code, cycle) ?? SUBJECT_BANKS[subjectCode]?.[cycle] ?? SUBJECT_BANKS.maths[cycle];
    const lessons = md(ch.title, block, gradeFr);

    for (const [i, lesson] of lessons.entries()) {
      await run(
        `INSERT INTO lessons (chapter_id, title, summary, content, content_md, duration_min, difficulty, is_premium, position, created_by, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, NULL, 'approved')`,
        ch.id,
        lesson.title,
        lesson.markdown.slice(0, 140),
        lesson.markdown,
        lesson.markdown,
        cycle === "college" ? 12 : 18,
        1,
        i + 1,
      );
      inserted++;
    }
  }

  console.log(`Seed contenu collège/lycée : ${inserted} leçons insérées, ${skipped} chapitres déjà pourvus`);
}

interface SeedQuestion {
  q: string;
  options: string[];
  answer: number;
  expl?: string;
}

const SUBJECT_QUIZ_BANKS: Record<string, Record<"college" | "lycee", SeedQuestion[]>> = {
  maths: {
    college: [
      q("Une fraction est irréductible quand :", ["Le dénominateur est premier", "Numérateur et dénominateur sont premiers entre eux", "Le numérateur est pair", "Elle est supérieure à 1"], 1),
      q("L'aire d'un triangle se calcule avec :", ["Base × hauteur", "(Base × hauteur) ÷ 2", "Côté × 4", "π × r²"], 1, "A = (base × hauteur) ÷ 2."),
      q("7 × 8 = ?", ["54", "56", "64", "48"], 1),
      q("Quel est le PGCD de 12 et 18 ?", ["3", "6", "9", "36"], 1, "12 = 2²×3, 18 = 2×3² : facteurs communs 2×3 = 6."),
      q("La médiane d'une série triée de 7 valeurs est :", ["La 1ère valeur", "La 4ème valeur", "La 7ème valeur", "La moyenne des valeurs"], 1),
      q("Un angle droit mesure :", ["45°", "90°", "180°", "360°"], 1),
      q("La somme des angles d'un triangle vaut :", ["90°", "180°", "270°", "360°"], 1),
      q("Quelle est la formule du périmètre d'un cercle ?", ["π × r", "2 × π × r", "π × r²", "2 × r"], 1, "P = 2πr."),
      q("3/4 + 1/4 = ?", ["1", "4/8", "3/8", "2"], 0, "Même dénominateur : 4/4 = 1."),
      q("10 % de 250 vaut :", ["25", "50", "2,5", "250"], 0, "250 × 10 ÷ 100 = 25."),
    ],
    lycee: [
      q("La dérivée de x³ est :", ["x²", "3x²", "3x", "x³"], 1),
      q("Le discriminant de x² − 5x + 6 = 0 vaut :", ["−1", "1", "25", "49"], 1, "Δ = 25 − 24 = 1."),
      q("Une suite arithmétique de raison 3 : u₅ si u₁ = 2 ?", ["15", "14", "17", "11"], 1, "u₅ = 2 + 4×3 = 14."),
      q("ln(e³) = ?", ["3", "e³", "1/3", "3e"], 0),
      q("La pente de y = −2x + 5 est :", ["5", "−2", "2", "−5"], 1),
      q("La limite de eˣ quand x → +∞ est :", ["0", "1", "+∞", "−∞"], 2),
      q("P(A ∪ B) si A et B incompatibles :", ["P(A) + P(B)", "P(A) × P(B)", "P(A) − P(B)", "P(A) ÷ P(B)"], 0),
      q("La fonction f(x) = 1/x a pour dérivée :", ["1/x²", "−1/x²", "ln x", "−x"], 1),
    ],
  },
  pc: {
    college: [
      q("À quelle température l'eau bout-elle ?", ["0°C", "50°C", "100°C", "120°C"], 2),
      q("Le passage solide → liquide s'appelle :", ["La fusion", "La vaporisation", "La condensation", "La solidification"], 0),
      q("Un circuit fermé contenant une pile et une lampe : la lampe", ["Ne s'allume jamais", "S'allume", "S'allume seulement la nuit", "Explose"], 1),
      q("La masse se mesure avec :", ["Une éprouvette", "Une balance", "Un thermomètre", "Un voltmètre"], 1),
      q("L'eau pure gèle à :", ["−10°C", "0°C", "4°C", "100°C"], 1),
      q("Quel est l'état de la vapeur d'eau ?", ["Solide", "Liquide", "Gazeux", "Aucun"], 2),
      q("Le volume d'un liquide se lit sur :", ["Une balance", "Une éprouvette graduée", "Un dynamomètre", "Une règle"], 1),
      q("Le sel dissous dans l'eau forme :", ["Une transformation chimique", "Un mélange", "Un corps pur", "Un gaz"], 1),
      q("Le verre est :", ["Un isolant", "Un conducteur", "Un générateur", "Un aimant"], 0),
      q("L'air est :", ["Un corps pur", "Un mélange de gaz", "Un liquide", "Un métal"], 1),
    ],
    lycee: [
      q("La loi d'Ohm s'écrit :", ["I = U × R", "U = R × I", "R = U × I", "U = I ÷ R"], 1),
      q("Le noyau d'un atome contient :", ["Des électrons", "Des protons et des neutrons", "Uniquement des protons", "Des ions"], 1),
      q("Un ion positif s'appelle :", ["Anion", "Cation", "Électron", "Neutron"], 1),
      q("L'énergie cinétique se calcule :", ["½ mv", "½ mv²", "mv²", "mgh"], 1),
      q("Une réaction chimique équilibrée conserve :", ["La masse", "La température", "Le volume", "La couleur"], 0),
      q("L'unité de la pression est :", ["Le volt", "Le pascal", "L'ohm", "Le joule"], 1),
      q("Un atome est électriquement :", ["Positif", "Négatif", "Neutre", "Variable"], 2),
      q("Le pH d'une solution acide est :", ["Supérieur à 7", "Inférieur à 7", "Égal à 7", "Nul"], 1),
    ],
  },
  svt: {
    college: [
      q("La plus petite unité du vivant est :", ["L'organe", "La cellule", "Le tissu", "L'organisme"], 1),
      q("La digestion transforme les aliments en :", ["Nutriments", "Roches", "Déchets solides", "Sang"], 0),
      q("Un écosystème comprend :", ["Uniquement les animaux", "Les êtres vivants et leur milieu", "Uniquement les plantes", "Le sol seulement"], 1),
      q("L'organe de la respiration chez l'homme est :", ["Le cœur", "Le poumon", "L'estomac", "Le foie"], 1),
      q("La dégradation des roches produit :", ["Le sol", "Le pétrole", "L'eau", "L'air"], 0),
      q("Les êtres vivants respirent pour produire :", ["De l'énergie", "Du sucre", "Des roches", "Du sol"], 0),
      q("La biodiversité désigne :", ["La variété des êtres vivants", "La hauteur des arbres", "La pollution", "Le nombre d'humains"], 0),
      q("Le squelette protège notamment :", ["Les muscles", "Les organes internes", "La peau", "Les yeux"], 1),
      q("Un volcan actif peut :", ["Émettre de la lave", "Produire du sol", "Créer des rivières", "Geler la terre"], 0),
      q("Les aliments riches en protéines :", ["Le pain", "La viande", "Le sucre", "L'eau"], 1),
    ],
    lycee: [
      q("L'information génétique est portée par :", ["L'ADN", "Le glucose", "L'eau", "Les protéines"], 0),
      q("La mitose produit :", ["4 gamètes", "2 cellules identiques", "1 cellule", "Des virus"], 1),
      q("Le groupe sanguin dépend :", ["Des antigènes A et B", "De la couleur du sang", "Du taux de glucose", "De la pression"], 0),
      q("Le rôle du système immunitaire :", ["Digérer", "Défendre l'organisme", "Respirer", "Circuler"], 1),
      q("Un gène est :", ["Une protéine", "Une portion d'ADN", "Une cellule", "Un chromosome entier"], 1),
      q("La photosynthèse a lieu dans :", ["Les racines", "Les feuilles", "Le tronc", "Les fleurs"], 1),
      q("Le glucose est stocké dans le foie sous forme de :", ["Lipides", "Glycogène", "Amidon", "Cholestérol"], 1),
      q("Le sang circule grâce à :", ["Le poumon", "Le cœur", "Le cerveau", "Le foie"], 1),
    ],
  },
  francais: {
    college: [
      q("« Ils mangeaient » est à :", ["L'imparfait", "Le passé simple", "Le futur", "Le présent"], 0),
      q("Le nom « chanteur » devient féminin : « chanteuse ». C'est une :", ["Dérivation", "Féminisation", "Conjugaison", "Accord"], 1),
      q("Une phrase commence par une majuscule et finit par :", ["Une virgule", "Un point", "Un accent", "Un trait d'union"], 1),
      q("Le sujet du verbe s'accorde :", ["Avec le verbe", "Avec l'objet", "Avec le complément", "Rien"], 0),
      q("« Il court vite. » — « vite » est :", ["Un adjectif", "Un adverbe", "Un verbe", "Un nom"], 1),
      q("Le pluriel de « cheval » est :", ["Chevals", "Chevaux", "Chevals", "Chevales"], 1),
      q("Un texte qui raconte une histoire est :", ["Narratif", "Descriptif", "Argumentatif", "Informatif"], 0),
      q("L'imparfait se forme à partir de :", ["L'infinitif", "La 1ère personne du pluriel du présent", "Le participe passé", "Le futur"], 1),
      q("Le synonyme de « content » est :", ["Triste", "Heureux", "En colère", "Fatigué"], 1),
      q("« Les enfants jouent dans la cour. » Le sujet est :", ["Jouent", "Les enfants", "La cour", "Dans"], 1),
    ],
    lycee: [
      q("Une comparaison utilise :", ["Un outil de comparaison (comme, tel…)", "Aucun outil", "Toujours une majuscule", "Une rime"], 0),
      q("« La vie est un long fleuve » est une :", ["Comparaison", "Métaphore", "Antithèse", "Hyperbole"], 1),
      q("Le registre qui fait rire est :", ["Tragique", "Comique", "Lyrique", "Épique"], 1),
      q("Une dissertation doit contenir :", ["Une problématique", "Uniquement des citations", "Des dessins", "Un tableau"], 0),
      q("La versification étudie :", ["Les vers et les rimes", "Les personnages", "Le vocabulaire", "La grammaire"], 0),
      q("« Il est beau comme un dieu » est une :", ["Métaphore", "Comparaison", "Antithèse", "Anaphore"], 1),
      q("Le registre tragique vise à :", ["Faire rire", "Inspirer la pitié et la crainte", "Informer", "Donner des ordres"], 1),
      q("Une anaphore est :", ["La répétition d'un mot en début de phrase", "Une figure d'opposition", "Un type de rime", "Une ponctuation"], 0),
    ],
  },
  hg: {
    college: [
      q("Les grandes périodes de l'histoire commencent par :", ["La Préhistoire", "L'Antiquité", "Le Moyen Âge", "L'Époque moderne"], 0),
      q("La légende d'une carte explique :", ["Les symboles", "Les distances", "Les continents", "Le climat"], 0),
      q("L'Égypte ancienne s'est développée le long du :", ["Niger", "Nil", "Congo", "Sénégal"], 1),
      q("Combien de continents y a-t-il ?", ["5", "6", "7", "8"], 2),
      q("La période du Moyen Âge suit :", ["La Préhistoire", "L'Antiquité", "La Renaissance", "Le 20e siècle"], 1),
      q("Un océan plus grand que l'Atlantique :", ["L'Indien", "Le Pacifique", "L'Arctique", "L'Austral"], 1),
      q("L'orientation d'une carte se fait grâce à :", ["La légende", "Le nord", "L'échelle", "Le titre"], 1),
      q("La Terre tourne autour du Soleil en :", ["24 heures", "365 jours", "30 jours", "7 jours"], 1),
      q("L'étude des populations s'appelle :", ["La géologie", "La démographie", "L'astronomie", "La botanique"], 1),
      q("Les premiers êtres humains étaient :", ["Des agriculteurs", "Des chasseurs-cueilleurs", "Des commerçants", "Des artisans"], 1),
    ],
    lycee: [
      q("La mondialisation se caractérise par :", ["L'isolement des pays", "Des flux croissants d'échanges", "La fin du commerce", "Des frontières fermées"], 1),
      q("Le développement durable équilibre :", ["Économie, social, environnement", "Guerre et paix", "Imports et exports", "Villes et campagnes"], 0),
      q("Les indépendances africaines ont eu lieu surtout :", ["Au 19e siècle", "Autour de 1960", "En 2000", "Avant 1800"], 1),
      q("Les deux guerres mondiales ont eu lieu au :", ["18e siècle", "20e siècle", "21e siècle", "19e siècle"], 1),
      q("Un flux migratoire est :", ["Un déplacement de populations", "Un échange commercial", "Une émission de radio", "Un cours d'eau"], 0),
      q("Une ONG est :", ["Une organisation non gouvernementale", "Une entreprise pétrolière", "Un parti politique", "Une banque"], 0),
      q("L'échelle mondiale étudie :", ["Une ville", "Le monde entier", "Un quartier", "Un pays"], 1),
      q("La colonisation a précédé :", ["Les indépendances", "La mondialisation moderne", "L'esclavage", "Les guerres mondiales"], 0),
    ],
  },
  anglais: {
    college: [
      q("« I play » au présent continu :", ["I am playing", "I played", "I will play", "I play"], 0),
      q("Le prétérit de « go » est :", ["Goed", "Went", "Gone", "Going"], 1),
      q("« She plays » — la 3e personne ajoute :", ["-s", "-es", "-ing", "rien"], 0),
      q("« School » signifie :", ["Maison", "École", "Magasin", "Église"], 1),
      q("Le futur avec « will » : « I ___ come. »", ["am", "will", "was", "does"], 1),
      q("« They are playing » = action :", ["Passée", "En cours", "Future", "Habituelle"], 1),
      q("Le contraire de « big » :", ["Small", "Tall", "Fast", "Old"], 0),
      q("« How old are you ? » demande :", ["Ton nom", "Ton âge", "Ton adresse", "Ton école"], 1),
      q("Au présent simple, « he has » à la négation :", ["He don't have", "He doesn't have", "He hasn't", "He not have"], 1),
      q("« Yesterday » signale le :", ["Présent", "Passé", "Futur", "Conditionnel"], 1),
    ],
    lycee: [
      q("Le passif de « They built the bridge » :", ["The bridge was built", "The bridge is building", "They were built", "The bridge build"], 0),
      q("« If I were rich, I ___ travel » :", ["will", "would", "am", "did"], 1),
      q("Le discours indirect : « He said he ___ tired. »", ["was", "is", "will be", "were"], 0),
      q("Le relatif pour une chose :", ["who", "which", "whose", "when"], 1),
      q("« Must » exprime :", ["Une obligation", "Un conseil léger", "Une permission", "Une possibilité"], 0),
      q("« The book was written » est au :", ["Présent simple", "Passif", "Futur", "Gérondif"], 1),
      q("« Since » s'utilise avec :", ["Un moment précis", "Une durée", "Une habitude", "Un lieu"], 0),
      q("Le comparatif de « good » :", ["gooder", "better", "best", "more good"], 1),
    ],
  },
  philo: {
    college: [],
    lycee: [
      q("Une dissertation de philosophie doit :", ["Réciter le cours par cœur", "Construire un raisonnement problématisé", "Donner uniquement son opinion", "Résumer un livre"], 1),
      q("« Je pense, donc je suis » est de :", ["Aristote", "Descartes", "Nietzsche", "Platon"], 1),
      q("L'impératif catégorique est une notion de :", ["Platon", "Kant", "Hegel", "Sartre"], 1),
      q("En philosophie, « le devoir » renvoie à :", ["Une contrainte externe", "Une obligation morale", "Un simple conseil", "Une punition"], 1),
      q("La liberté au sens politique désigne :", ["Faire ce qu'on veut sans limites", "L'état de celui qui obéit à la loi qu'il s'est donnée", "L'absence de toute règle", "Le pouvoir de dominer"], 1),
      q("Pour Descartes, le doute est :", ["Une fin en soi", "Une méthode pour trouver des certitudes", "Un signe de faiblesse", "Un péché"], 1),
      q("L'éthique d'Aristote repose sur :", ["Le devoir pur", "La recherche du bonheur (eudémonisme)", "La peur du châtiment", "La volonté de Dieu"], 1),
      q("La distinction entre « être » et « paraître » est essentielle chez :", ["Épicure", "Sartre", "Marx", "Socrate"], 1),
    ],
  },
  espagnol: {
    college: [
      q("Comment dit-on « bonjour » en espagnol ?", ["Hola", "Adiós", "Gracias", "Sí"], 0),
      q("« Tengo catorce años » signifie :", ["J'ai 14 ans", "Je m'appelle", "Je mange", "J'habite ici"], 0),
      q("Quel article espagnol signifie « la » ?", ["la", "el", "los", "las"], 0),
      q("« Madre » veut dire :", ["Mère", "Père", "Frère", "Sœur"], 0),
      q("Le mot pour « école » en espagnol :", ["Escuela", "Casa", "Libro", "Agua"], 0),
      q("« Gracias » se traduit par :", ["Merci", "S'il te plaît", "Bonjour", "Au revoir"], 0),
      q("Comment dit-on « il s'appelle » ?", ["se llama", "me llamo", "te llamas", "nos llamamos"], 0),
      q("Le mois « mayo » est :", ["Mai", "Mars", "Juin", "Avril"], 0),
      q("« Hermano » est le :", ["Frère", "Oncle", "Cousin", "Fils"], 0),
      q("Pour dire « dix » en espagnol :", ["diez", "dos", "cinco", "ocho"], 0),
    ],
    lycee: [
      q("Conjugue « comer » au prétérit : « ayer yo ... »", ["comí", "como", "comes", "comer"], 0),
      q("« Hablo » correspond à :", ["Je parle", "Tu parles", "Il parle", "Nous parlons"], 0),
      q("Comment dit-on « la maison » en espagnol ?", ["la casa", "el coche", "la mesa", "el libro"], 0),
      q("Le contraire de « grande » :", ["pequeño", "grande", "bueno", "malo"], 0),
      q("« América Latina » désigne :", ["L'Amérique hispanophone", "L'Europe", "L'Asie", "L'Afrique"], 0),
      q("Le mot pour « livre » :", ["libro", "mesa", "casa", "agua"], 0),
      q("Le prétérit de « vivir » à la 1re personne :", ["viví", "vivo", "vive", "vivió"], 0),
      q("Pour s'excuser on dit :", ["lo siento", "gracias", "hola", "hasta luego"], 0),
      q("« pero » signifie :", ["mais", "parce que", "donc", "et"], 0),
      q("Le pluriel de « casa » :", ["casas", "casa", "cases", "casis"], 0),
    ],
  },
  allemand: {
    college: [
      q("Comment dit-on « bonjour » en allemand ?", ["Hallo / Guten Tag", "Auf Wiedersehen", "Danke", "Ja"], 0),
      q("L'article « der » indique le :", ["masculin", "féminin", "neutre", "pluriel"], 0),
      q("« Ich heiße » veut dire :", ["Je m'appelle", "J'ai", "Je suis", "Je parle"], 0),
      q("Le mot pour « mère » en allemand :", ["Mutter", "Vater", "Bruder", "Schwester"], 0),
      q("Comment dit-on « merci » ?", ["Danke", "Bitte", "Hallo", "Nein"], 0),
      q("« Jahr » signifie :", ["Année", "Jour", "Mois", "Heure"], 0),
      q("La capitale de l'Allemagne est :", ["Berlin", "Paris", "Abidjan", "Londres"], 0),
      q("Pour dire « oui » :", ["ja", "nein", "bitte", "danke"], 0),
      q("« Schule » veut dire :", ["École", "Maison", "Livre", "Eau"], 0),
      q("L'article neutre est :", ["das", "der", "die", "den"], 0),
    ],
    lycee: [
      q("Conjugue « sprechen » au présent : « ich ... »", ["spreche", "sprechen", "sprichst", "sprach"], 0),
      q("Le passé composé (Perfekt) de « sprechen » :", ["ich habe gesprochen", "ich sprach", "ich spreche", "ich gesprochen"], 0),
      q("L'article « die » est pour :", ["féminin", "masculin", "neutre", "datif"], 0),
      q("« Deutsch » veut dire :", ["Allemand", "Anglais", "Français", "Espagnol"], 0),
      q("Comment dit-on « maison » ?", ["Haus", "Auto", "Buch", "Schule"], 0),
      q("La phrase « Ich habe einen Bruder » :", ["J'ai un frère", "J'ai une sœur", "Je suis grand", "Je vais à l'école"], 0),
      q("« und » signifie :", ["et", "mais", "ou", "avec"], 0),
      q("Le verbe « sein » à la 1re personne :", ["ich bin", "ich habe", "ich bin gewesen", "ich war"], 0),
      q("Pour demander son nom on dit :", ["Wie heißt du ?", "Wo wohnst du ?", "Wann kommst du ?", "Was ist das ?"], 0),
      q("Le mot pour « ami » :", ["Freund", "Feind", "Kind", "Haus"], 0),
    ],
  },
  edhc: {
    college: [
      q("L'EDHC forme :", ["le citoyen responsable", "le sportif", "le cuisinier", "le conducteur"], 0),
      q("Un droit fondamental de l'enfant :", ["le droit à l'éducation", "le droit de conduire", "le droit de voter", "le droit de travail"], 0),
      q("Le développement durable vise à :", ["répondre aux besoins présents sans nuire à l'avenir", "polluer davantage", "couper les arbres", "ignorer l'environnement"], 0),
      q("La Côte d'Ivoire est :", ["une république", "une monarchie", "une dictature", "un empire"], 0),
      q("Protéger l'environnement, c'est :", ["préserver la nature", "jeter ses déchets partout", "brûler la forêt", "gaspiller l'eau"], 0),
      q("La paix permet :", ["le vivre-ensemble", "la guerre", "la haine", "l'exclusion"], 0),
      q("Voter est :", ["un droit et un devoir citoyen", "interdit", "une obligation scolaire", "un jeu"], 0),
      q("Le symbole de la République :", ["le drapeau national", "une marque", "un animal sauvage", "un jouet"], 0),
      q("L'hygiène corporelle permet :", ["de rester en bonne santé", "de tomber malade", "de perdre du temps", "de polluer"], 0),
      q("Trier ses déchets, c'est :", ["un geste écocitoyen", "inutile", "interdit", "réservé aux adultes"], 0),
    ],
    lycee: [
      q("En Côte d'Ivoire, les trois pouvoirs sont :", ["exécutif, législatif, judiciaire", "armée, police, justice", "président, maire, chef", "nord, sud, centre"], 0),
      q("Voter est :", ["un devoir citoyen", "une obligation scolaire", "un jeu", "interdit"], 0),
      q("La Constitution :", ["organise le fonctionnement de l'État", "est un livre de recettes", "régit le sport", "n'existe pas"], 0),
      q("Le développement humain concerne :", ["santé, éducation, emploi", "seulement l'argent", "la guerre", "le climat seul"], 0),
      q("La citoyenneté active implique :", ["la participation à la vie de la cité", "l'indifférence", "le retrait", "la violence"], 0),
      q("Les institutions de la République :", ["appliquent et font respecter la loi", "remplacent la famille", "dirigent l'école", "gèrent le sport"], 0),
      q("La loi protège :", ["les droits des citoyens", "l'injustice", "l'arbitraire", "la violence"], 0),
      q("Le pouvoir législatif vote :", ["les lois", "les jugements", "les traités militaires", "les impôts scolaires"], 0),
      q("S'engager comme bénévole, c'est :", ["participer à la vie de la communauté", "s'isoler", "refuser d'aider", "nuire aux autres"], 0),
      q("La démocratie repose sur :", ["la souveraineté du peuple", "le pouvoir d'un seul", "l'oppression", "le hasard"], 0),
    ],
  },
};

function q(question: string, options: string[], answer: number, expl?: string): SeedQuestion {
  return { q: question, options, answer, expl };
}

function toMcq(question: string, answer: string): SeedQuestion | null {
  const trimmed = answer.trim();
  const frac = trimmed.match(/^(-?\d+(?:[.,]\d+)?)\s*\/\s*(-?\d+(?:[.,]\d+)?)$/);
  if (frac) {
    const [a, b] = [frac[1], frac[2]];
    return q(question, [`${a}/${b}`, `${b}/${a}`, "1", "0"], 0, trimmed);
  }
  const num = trimmed.match(/^-?\d+(?:[.,]\d+)?$/);
  if (num) {
    const n = parseFloat(num[0].replace(",", "."));
    const cand = [n, n + 1, n - 1, 2 * n, Math.round(n / 2), n + 2];
    const opts: number[] = [];
    for (const c of cand) {
      if (!opts.includes(c) && c !== 0 || (c === 0 && n === 0)) opts.push(c);
      if (opts.length === 4) break;
    }
    if (opts.length < 2) return null;
    return q(question, opts.map((c) => String(Math.round(c * 100) / 100).replace(".", ",")), 0, trimmed);
  }
  return null;
}

export async function seedCollegeQuizzes(regenerateSubjects: string[] = []): Promise<void> {
  const grades = await query<{ id: number; code: string }>(`SELECT id, code FROM grades`);
  const gradeIdByCode = new Map(grades.map((g) => [g.code, g.id]));
  const collegeCodes = new Set(["6eme", "5eme", "4eme", "3eme"]);
  const lyceeCodes = new Set(["2nde", "1ere_es", "1ere_l", "1ere_s", "term_es", "term_l", "term_s"]);
  const chapters = await query<{ id: number; subject_id: number; grade_id: number; title: string; code: string }>(
    `SELECT c.id, c.subject_id, c.grade_id, c.title, c.code FROM chapters c WHERE c.status = 'approved'`,
  );
  const subjects = await query<{ id: number; code: string }>(`SELECT id, code FROM subjects`);
  const subjectCodeById = new Map(subjects.map((s) => [s.id, s.code]));

  if (regenerateSubjects.length > 0) {
    const ids = subjects.filter((s) => regenerateSubjects.includes(s.code)).map((s) => s.id);
    if (ids.length > 0) {
      const marks = ids.map(() => "?").join(",");
      const auto = await query<{ id: number }>(
        `SELECT q.id FROM quizzes q WHERE q.created_by IS NULL AND q.chapter_id IS NOT NULL AND q.title LIKE 'Quiz : %' AND q.subject_id IN (${marks})`,
        ...ids,
      );
      if (auto.length > 0) {
        const qmarks = auto.map(() => "?").join(",");
        await run(`DELETE FROM questions WHERE quiz_id IN (${qmarks})`, ...auto.map((a) => a.id));
        await run(`DELETE FROM quizzes WHERE id IN (${qmarks})`, ...auto.map((a) => a.id));
      }
    }
  }

  let inserted = 0;
  let skipped = 0;

  for (const ch of chapters) {
    const gradeRow = [...gradeIdByCode.entries()].find(([, id]) => id === ch.grade_id);
    if (!gradeRow) continue;
    const gradeCode = gradeRow[0];
    const cycle = collegeCodes.has(gradeCode) ? "college" : lyceeCodes.has(gradeCode) ? "lycee" : null;
    if (!cycle) continue;

    const subjectCode = subjectCodeById.get(ch.subject_id) ?? "maths";
    const existing = await queryOne<{ c: number }>(`SELECT COUNT(*) AS c FROM quizzes WHERE chapter_id = ?`, ch.id);
    if (existing && Number(existing.c) > 0) {
      skipped++;
      continue;
    }

    const questions: SeedQuestion[] = [];
    const bank = SUBJECT_QUIZ_BANKS[subjectCode]?.[cycle] ?? SUBJECT_QUIZ_BANKS.maths[cycle];

    if (subjectCode === "maths") {
      const block = MATHS_BLOCKS[ch.code];
      if (block?.example) {
        const mcq = toMcq(block.example.question, block.example.answer);
        if (mcq) questions.push(mcq);
      }
      if (block?.practice) {
        const mcq = toMcq(block.practice.question, block.practice.answer);
        if (mcq) questions.push(mcq);
      }
    }
    while (questions.length < 3 && bank.length > 0) {
      const offset = ch.id % bank.length;
      const item = bank[offset];
      if (!questions.some((x) => x.q === item.q)) questions.push(item);
      if (bank.length === 1) break;
      bank.push(bank.shift()!);
    }
    if (questions.length === 0) continue;

    const r = await run(
      "INSERT INTO quizzes (subject_id, chapter_id, title, level, position, created_by, status) VALUES (?, ?, ?, ?, 0, NULL, 'approved')",
      ch.subject_id,
      ch.id,
      `Quiz : ${ch.title}`,
      "S'entraîner",
    );
    const quizId = Number(r.lastInsertRowid);
    for (const [i, qq] of questions.entries()) {
      await run(
        "INSERT INTO questions (quiz_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, 1, ?)",
        quizId,
        qq.q,
        JSON.stringify(qq.options),
        qq.answer,
        qq.expl ?? null,
        i,
      );
    }
    inserted++;
  }

  console.log(`Seed quiz par chapitre : ${inserted} quiz créés, ${skipped} chapitres déjà pourvus`);
}
