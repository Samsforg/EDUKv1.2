import { queryOne, run } from "./db";

export interface ProgressionChapter {
  code: string;
  title: string;
  description: string;
}

export type ProgressionByGrade = Record<string, ProgressionChapter[]>;

export const PROGRESSION_MENAET: Record<string, ProgressionByGrade> = {
  maths: {
    "6eme": [
      ["nombres-entiers", "Nombres entiers naturels et décimaux", "Lecture, écriture, comparaison, encadrement et ordre de grandeur"],
      ["operations", "Opérations sur les nombres", "Addition, soustraction, multiplication et division euclidienne"],
      ["multiples-diviseurs", "Multiples, diviseurs et divisibilité", "Critères de divisibilité, nombres premiers, décomposition"],
      ["fractions", "Les fractions", "Écriture fractionnaire, comparaison, somme et différence"],
      ["decimaux-relatifs", "Nombres décimaux relatifs", "Repère sur une droite graduée, comparaison, valeur absolue"],
      ["calcul-litteral", "Calcul littéral", "Expressions algébriques, distributivité, évaluation"],
      ["proportionnalite", "Proportionnalité", "Tableaux de proportionnalité, pourcentages, échelles, vitesse"],
      ["droites-angles", "Droites, demi-droites et angles", "Positions relatives, mesure d'angles, bissectrice"],
      ["triangles-quadrilateres", "Triangles et quadrilatères", "Construction, propriétés, parallélogrammes usuels"],
      ["symetrie-axiale", "Symétrie axiale", "Axe de symétrie, construction de figures symétriques"],
      ["aires-volumes", "Périmètres, aires et volumes", "Formules usuelles, unités, pavé droit"],
      ["statistiques", "Statistiques et gestion de données", "Tableaux, diagrammes, moyenne"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "5eme": [
      ["arithmetique", "Arithmétique", "Division euclidienne, critères de divisibilité, puissances d'un entier"],
      ["nombres-premiers", "Nombres premiers, PGCD et PPCM", "Décomposition, liste des diviseurs, PGCD, PPCM"],
      ["fractions-rationnels", "Fractions et nombres rationnels", "Comparaison, simplification, opérations"],
      ["relatifs", "Nombres relatifs", "Addition, soustraction, comparaison sur une droite graduée"],
      ["calcul-litteral", "Calcul littéral", "Développement et réduction d'expressions simples"],
      ["equations", "Équations du premier degré", "Résolution d'équations simples, mise en problème"],
      ["proportionnalite", "Proportionnalité et pourcentages", "Quatrième proportionnelle, échelles, pourcentages"],
      ["symetrie-centrale", "Symétrie centrale", "Centre de symétrie, propriétés, constructions"],
      ["parallelogrammes", "Parallélogrammes", "Propriétés, aire, losange, rectangle, carré"],
      ["angles-droites", "Angles et droites remarquables", "Angles alternes-internes et correspondants, médiatrices"],
      ["triangle-proprietes", "Triangle et droites remarquables", "Hauteurs, médianes, médiatrices, cercle circonscrit"],
      ["prismes", "Prismes droits", "Formes, propriétés, aires latérales et volumes"],
      ["sphere", "Sphère et boule", "Description, relations métriques"],
      ["reperage", "Repérage d'un point", "Repérage sur une droite et sur un quadrillage"],
      ["statistiques", "Statistiques", "Moyenne, diagrammes en bâtons et circulaires"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "4eme": [
      ["calcul-litteral", "Calcul littéral et identités remarquables", "Développement, factorisation, identités remarquables"],
      ["puissances", "Puissances d'un nombre", "Règles de calcul, notation scientifique"],
      ["equations", "Équations du premier degré", "Résolution et problèmes concrets"],
      ["pythagore", "Théorème de Pythagore", "Triangle rectangle, calcul de longueurs, réciproque"],
      ["triangles-egaux", "Triangles égaux et semblables", "Cas d'égalité, conditions de similitude"],
      ["cosinus", "Cosinus d'un angle aigu", "Application au triangle rectangle"],
      ["distances-cercles", "Distance et cercle", "Médiatrice, distance d'un point à une droite, cercle circonscrit"],
      ["fonctions", "Notion de fonction", "Variable, image, antécédent, représentations"],
      ["translation-vecteurs", "Translation et vecteurs", "Notion de vecteur, somme de vecteurs, translation"],
      ["proportionnalite-statistiques", "Proportionnalité et statistiques", "Moyennes pondérées, fréquences, pourcentages"],
      ["agrandissements", "Agrandissements et réductions", "Effets sur les longueurs, aires et volumes"],
      ["probabilites", "Introduction aux probabilités", "Expériences aléatoires, événements, premiers calculs"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "3eme": [
      ["arithmetique", "Arithmétique", "Nombres premiers, PGCD, PPCM et applications"],
      ["racines-carrees", "Racines carrées", "Définition, propriétés, calculs"],
      ["calcul-litteral", "Identités remarquables et factorisation", "Approfondissement du calcul littéral"],
      ["equations-inequations", "Équations et inéquations du premier degré", "Résolution, problèmes et mise en équation"],
      ["systemes", "Systèmes d'équations", "Méthodes de substitution et de combinaison"],
      ["fonctions-affines", "Fonctions linéaires et affines", "Représentations graphiques, taux d'accroissement"],
      ["thales", "Théorème de Thalès", "Configuration de Thalès, agrandissement et réduction"],
      ["trigonometrie", "Trigonométrie dans le triangle rectangle", "Sinus, cosinus, tangente et relations"],
      ["vecteurs", "Vecteurs", "Somme de vecteurs, produit par un scalaire, translation"],
      ["rotations-homotheties", "Rotations et homothéties", "Transformations du plan"],
      ["solides-espace", "Solides de l'espace", "Prismes, pyramides, cônes, cylindres et sphères"],
      ["statistiques", "Statistiques", "Moyenne, médiane, étendue, diagrammes"],
      ["probabilites", "Probabilités", "Expériences aléatoires, événements, calculs"],
      ["agrandissements", "Agrandissements et réductions", "Effets sur les longueurs, aires et volumes"],
      ["geometrie-espace", "Géométrie dans l'espace", "Positions relatives, sections de solides"],
      ["applications-trigo", "Applications de la trigonométrie", "Problèmes de mesures, topographie"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "2nde": [
      ["ensembles-nombres", "Ensembles de nombres et intervalles", "N, Z, D, Q, R, intervalles, valeur absolue"],
      ["equations-inequations", "Équations et inéquations", "Premier degré, second degré, systèmes"],
      ["fonctions-generalites", "Généralités sur les fonctions", "Définitions, variations, représentations graphiques"],
      ["fonctions-references", "Fonctions de référence", "Carré, inverse, racine carrée, valeur absolue"],
      ["geometrie-vectorielle", "Géométrie vectorielle", "Vecteurs, colinéarité, coordonnées"],
      ["droites", "Équations de droites", "Coefficient directeur, systèmes linéaires"],
      ["statistiques", "Statistiques descriptives", "Regroupement par classes, indicateurs"],
      ["probabilites", "Probabilités", "Univers, événements, équiprobabilité"],
      ["pourcentages", "Pourcentages et évolutions", "Taux d'évolution, évolutions successives"],
      ["algorithmique", "Algorithmique et programmation", "Initiation aux algorithmes, Python"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_s": [
      ["derivees", "Dérivation", "Nombre dérivé, fonction dérivée, opérations"],
      ["suites", "Suites", "Suites arithmétiques, géométriques, convergence"],
      ["fonctions", "Fonctions de référence", "Carré, inverse, racine, exponentielle"],
      ["probabilites", "Probabilités conditionnelles", "Arbre, loi binomiale, indépendance"],
      ["second-degre", "Polynômes du second degré", "Forme canonique, factorisation, discriminant"],
      ["trigonometrie", "Trigonométrie", "Cercle trigonométrique, mesures d'angles, radians"],
      ["produit-scalaire", "Produit scalaire", "Définition, propriétés, applications géométriques"],
      ["geometrie-espace", "Géométrie dans l'espace", "Droites et plans, positions relatives, sections"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_s": [
      ["suites", "Suites numériques", "Suites arithmétiques, géométriques, limite, convergence"],
      ["fonctions", "Fonctions usuelles", "Exponentielle, logarithme, trigonométriques, dérivées"],
      ["derivees", "Dérivées et études de fonctions", "Règles de dérivation, variations, tangentes"],
      ["integrales", "Intégrales", "Primitives, intégrales définies, intégration par parties"],
      ["probabilites", "Probabilités", "Loi binomiale, loi normale, variables aléatoires"],
      ["complexes", "Nombres complexes", "Forme algébrique, module, argument, équations"],
      ["geometrie-espace", "Géométrie dans l'espace", "Produit scalaire dans l'espace, équations de plans"],
      ["statistiques-double", "Statistiques à deux variables", "Nuage de points, ajustement affine"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_es": [
      ["proportionnalite", "Proportionnalité et pourcentages", "Taux d'évolution, indices, application à la gestion"],
      ["fonctions", "Fonctions de référence", "Fonctions affines, carré, inverse, variations"],
      ["statistiques", "Statistiques", "Indicateurs de tendance centrale et de dispersion"],
      ["probabilites", "Probabilités", "Expériences aléatoires, événements, arbres"],
      ["suites", "Suites numériques", "Suites arithmétiques et géométriques, application à la finance"],
      ["equations", "Équations et inéquations", "Résolution, systèmes, problèmes économiques"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_es": [
      ["statistiques-double", "Statistiques à deux variables", "Nuage de points, ajustement affine, corrélation"],
      ["probabilites", "Probabilités", "Probabilités conditionnelles, loi binomiale, loi normale"],
      ["fonctions", "Étude de fonctions", "Exponentielle, logarithme, coûts marginaux"],
      ["suites", "Suites", "Suites géométriques, intérêts composés, amortissement"],
      ["integration", "Intégration et calcul d'aires", "Primitives, aires, valeurs moyennes"],
    ].map(([code, title, description]) => ({ code, title, description })),
  },
  pc: {
    "5eme": [
      ["eau", "L'eau et ses états", "Les trois états de l'eau, cycle de l'eau, propriétés"],
      ["melanges", "Les mélanges et les solutions", "Mélanges homogènes et hétérogènes, techniques de séparation"],
      ["circuits", "Circuits électriques simples", "Dipôles, schémas, montage, interrupteur"],
      ["courant", "Le courant électrique", "Conducteurs, isolants, sens du courant"],
      ["lumiere", "La lumière", "Sources de lumière, propagation rectiligne, ombres et éclipses"],
      ["matiere", "La matière : changements d'état", "Solidification, fusion, vaporisation, condensation"],
      ["masse-volume", "Masse et volume", "Mesures, unités, masse volumique"],
      ["technologie", "Initiation à la technologie", "Objets techniques, matériaux, énergie"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "4eme": [
      ["air", "L'air : composition et propriétés", "Composition de l'air, combustion, dioxygène"],
      ["atomes", "Atomes et molécules", "Modèle de l'atome, formules chimiques, symboles"],
      ["transformations-chimiques", "Transformations chimiques", "Réactifs, produits, conservation de la masse"],
      ["intensite", "L'intensité du courant", "Mesure, unités, générateurs"],
      ["tension", "La tension électrique", "Mesure, unités, loi d'additivité"],
      ["ohm", "La loi d'Ohm", "Résistance, relation U = R × I"],
      ["mouvement", "Mouvement et vitesse", "Trajectoires, vitesse moyenne, relation v = d/t"],
      ["son", "Le son", "Propagation, fréquence, intensité, émission"],
      ["optique", "Optique géométrique", "Sources, propagation, couleurs, ombres"],
      ["energie", "Énergie : formes et conversions", "Formes d'énergie, conversions, sources"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "3eme": [
      ["ions", "Ions et solutions ioniques", "Formation d'ions, tests d'identification, conservation de la charge"],
      ["reactions", "Réactions chimiques", "Équations-bilans, combustion, réactions avec les métaux"],
      ["ph", "Solutions acides et basiques : le pH", "Échelle de pH, indicateurs, réactions"],
      ["circuits-series", "Circuits en série et en dérivation", "Lois de l'intensité et de la tension"],
      ["ohm-puissance", "Loi d'Ohm, puissance et énergie", "Résistance, P = U × I, E = P × t"],
      ["mouvement-forces", "Mouvement et interactions", "Types de mouvements, notion de force"],
      ["poids-masse", "Poids et masse", "Relation P = m × g, différence poids/masse"],
      ["univers", "L'univers et le système solaire", "Astres, conditions de vie, distances astronomiques"],
      ["energie-electrique", "Énergie électrique et consommation", "Compteur, facture, économies d'énergie"],
      ["centrales", "Production d'énergie électrique", "Centrales thermiques, hydrauliques, renouvelables, transport"],
      ["signaux", "Signaux et information", "Signaux sonores et lumineux, transmission de l'information"],
      ["technologie", "Technologie : conception et innovation", "Objets techniques, processus de fabrication, NTIC"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "2nde": [
      ["corps-purs", "Corps purs et mélanges", "Identification, tests caractéristiques, grandeurs physiques"],
      ["solutions", "Solutions aqueuses et concentration", "Concentration molaire et massique, dissolution"],
      ["atome", "Structure de l'atome", "Noyau, électrons, éléments, isotopes"],
      ["classification", "Classification périodique des éléments", "Tableau périodique, familles chimiques"],
      ["liaisons", "Liaisons chimiques et molécules", "Liaisons ionique et covalente, représentations de Lewis"],
      ["transformations", "Transformations chimiques", "Équations-bilans, avancement, réactif limitant"],
      ["forces", "Forces et interactions", "Modélisation d'une force, poids, principe d'inertie"],
      ["cinematique", "Cinématique du point", "Trajectoire, vitesse, mouvement rectiligne uniforme"],
      ["ondes", "Ondes mécaniques et sonores", "Propagation, période, fréquence, vitesse"],
      ["electricite", "Électricité : lois fondamentales", "Intensité, tension, loi d'Ohm, associations"],
      ["optique", "Optique géométrique", "Propagation, réflexion, réfraction, lentilles"],
      ["energie", "Énergie et puissance", "Formes d'énergie, conservation, rendement"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_s": [
      ["transformations-chimiques", "Transformations chimiques", "Vitesse de réaction, équilibre, quotient de réaction"],
      ["ondes", "Ondes mécaniques", "Ondes progressives, stationnaires, interférences"],
      ["vitesse-reaction", "Vitesse des réactions chimiques", "Facteurs cinétiques, suivi temporel"],
      ["equilibre", "État d'équilibre et quotient de réaction", "Constante d'équilibre, déplacement d'équilibre"],
      ["acido-basique", "Réactions acido-basiques", "Couples acide/base, pH, titrages"],
      ["oxydoreduction", "Réactions d'oxydoréduction", "Couples oxydant/réducteur, piles"],
      ["travail-energie", "Travail et énergie", "Travail d'une force, énergies cinétique et potentielle"],
      ["newton", "Lois de Newton", "Principe d'inertie, dynamique, interactions"],
      ["ondes-progressives", "Ondes mécaniques progressives", "Ondes périodiques, le long d'une corde, intensité"],
      ["electricite-applications", "Électricité : applications", "Condensateurs, dipôles RC"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_s": [
      ["chimie", "Chimie organique", "Fonctions carbonylées, esters, acides, polymères"],
      ["electrochimie", "Électrochimie", "Piles, électrolyse, équation de Nernst"],
      ["mecanique", "Mécanique", "Cinématique, dynamique, énergie, oscillateurs"],
      ["acides-esters", "Acides carboxyliques, esters et polymères", "Estérification, hydrolyse, polymérisation"],
      ["radioactivite", "Radioactivité et réactions nucléaires", "Noyaux, désintégrations, fission et fusion"],
      ["oscillateurs", "Oscillateurs mécaniques", "Pendule, oscillateur élastique, énergie"],
      ["condensateur", "Condensateur et dipôles RC", "Charge, décharge, constante de temps"],
      ["ondes-elec", "Ondes et rayonnements", "Ondes électromagnétiques, lumière, spectres"],
    ].map(([code, title, description]) => ({ code, title, description })),
  },
  svt: {
    "6eme": [
      ["environnement", "L'environnement et les êtres vivants", "Milieux de vie, composantes, écosystèmes"],
      ["sol", "Le sol : un milieu vivant", "Composition du sol, êtres vivants du sol, fertilité"],
      ["cellules", "La cellule : unité du vivant", "Observation, organisation, fonctionnement"],
      ["hygiene", "Hygiène corporelle et alimentaire", "Règles d'hygiène, maladies courantes, prévention"],
      ["corps-humain", "Le corps humain : grandes étapes de la vie", "Organisation du corps, puberté, croissance"],
      ["organes-sens", "Les organes des sens", "Fonctionnement des sens, hygiène sensorielle"],
      ["aliments", "Alimentation et besoins du corps", "Familles d'aliments, régimes, conservation"],
      ["biodiversite", "Biodiversité et classification", "Diversité des êtres vivants, groupes, liens de parenté"],
      ["terre-geologie", "La Terre et les paysages", "Roches, sols, paysages, histoire de la Terre"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "5eme": [
      ["respiration", "La respiration chez les êtres vivants", "Respirations animale et végétale, organes respiratoires"],
      ["nutrition", "La nutrition chez les animaux", "Régimes alimentaires, digestion, absorption"],
      ["locomotion", "La locomotion", "Squelette, muscles, mouvements, hygiène posturale"],
      ["cycle-matiere", "Le cycle de la matière", "Décomposeurs, circulation de la matière, recyclage"],
      ["biodiversite", "Biodiversité actuelle et passée", "Diversité des espèces, fossiles, évolution"],
      ["systemes-corps", "Les systèmes du corps humain", "Aperçu des appareils, fonctionnement intégré"],
      ["seisme", "Les séismes", "Manifestations, risques, prévention"],
      ["volcanisme", "Le volcanisme", "Éruptions, produits volcaniques, risques"],
      ["roches", "La diversité des roches", "Roches magmatiques, sédimentaires, métamorphiques"],
      ["pollution", "Pollution et protection de l'environnement", "Pollution des sols et de l'eau, maintien des équilibres biologiques"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "4eme": [
      ["reproduction-sexuee", "La reproduction sexuée", "Chez les animaux et les végétaux, fécondation"],
      ["reproduction-asexuee", "La reproduction asexuée", "Bouturage, marcottage, multiplication végétative"],
      ["nutrition-vegetale", "La nutrition chez les végétaux", "Photosynthèse, respiration, sèves"],
      ["circulation", "La circulation du sang et l'excrétion", "Cœur, vaisseaux, élimination des déchets"],
      ["digestion", "La digestion des aliments", "Trajet des aliments, enzymes, absorption"],
      ["respiration-humaine", "La respiration chez l'Homme", "Appareil respiratoire, échanges gazeux"],
      ["ecologie", "Écologie et dynamique des populations", "Facteurs du milieu, relations entre êtres vivants"],
      ["sol-agriculture", "Le sol et l'agriculture", "Fertilisation, amendements, production agricole"],
      ["environnement", "Éducation à l'environnement", "Gestion durable des ressources, déchets"],
      ["hygiene-sante", "Hygiène et santé publique", "Maladies courantes, vaccination, hygiène de vie"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "3eme": [
      ["monde-vivant", "Le monde vivant : organisation et unité", "Cellules, tissus, organes, unité du vivant"],
      ["genetique", "Hérédité et génétique", "Chromosomes, gènes, allèles, transmission des caractères"],
      ["groupes-sanguins", "Groupes sanguins et transfusion", "Système ABO, facteur Rhésus, compatibilité"],
      ["immunite", "L'immunité", "Défenses de l'organisme, vaccination, sérum, SIDA"],
      ["reproduction-humaine", "Reproduction humaine et éducation sexuelle", "Appareils génitaux, fécondation, IST"],
      ["geologie-interne", "Géologie interne", "Structure de la Terre, plaques, séismes, volcans"],
      ["geologie-externe", "Géologie externe et roches", "Érosion, sédimentation, types de roches"],
      ["biotechnologie", "Biotechnologies et applications", "Fermentation, cultures, techniques modernes"],
      ["alimentation", "Alimentation et équilibre alimentaire", "Besoins, rations, carences"],
      ["environnement", "Environnement et développement durable", "Ressources, pollution, protection"],
      ["sante", "Éducation à la santé", "Hygiène, maladies, médicaments, santé communautaire"],
      ["methodes", "Outils et méthodes scientifiques", "Observation, expérimentation, démarche scientifique"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "2nde": [
      ["cytologie", "La cellule : unité de structure et de fonction", "Membrane, cytoplasme, noyau, organites"],
      ["composition-chimique", "Composition chimique des êtres vivants", "Matière minérale et organique"],
      ["nutrition-vegetale", "Nutrition des végétaux chlorophylliens", "Photosynthèse, sève élaborée, échanges"],
      ["respiration-fermentation", "Respiration et fermentation", "Respiration aérobie et anaérobie"],
      ["nutrition-animale", "Nutrition des animaux et de l'Homme", "Digestion, absorption, assimilation"],
      ["circulation-excretion", "Circulation et excrétion chez l'Homme", "Cœur, vaisseaux, reins"],
      ["geologie-externe", "Géologie externe : l'eau et la vie", "Roches sédimentaires, fossiles"],
      ["biodiversite", "Biodiversité et classification", "Espèces, liens de parenté, évolution"],
      ["environnement", "Éducation à l'environnement", "Écosystèmes, ressources, développement durable"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_s": [
      ["cellule", "Cellule et métabolisme", "Respiration, photosynthèse, division cellulaire"],
      ["meiose", "La méiose et la fécondation", "Biodiversité, brassage génétique"],
      ["reproduction-sexuee", "Reproduction sexuée des êtres vivants", "Cycle de développement, fécondation"],
      ["heredite", "Transmission des caractères héréditaires", "Lois de Mendel, génétique humaine"],
      ["immunologie", "Immunologie : défenses de l'organisme", "Réactions immunitaires, vaccination, groupes sanguins"],
      ["geologie-interne", "Géologie interne : volcans et séismes", "Activité interne de la Terre, plaques"],
      ["tectonique", "Tectonique des plaques", "Expansion océanique, mouvements des plaques"],
      ["sante", "Santé et environnement", "Maladies, hygiène, prévention"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_s": [
      ["genetique", "Génétique", "Méiose, croisements, groupes sanguins, arbres généalogiques"],
      ["evolution", "Évolution", "Sélection naturelle, spéciation, phylogénie"],
      ["geologie", "Géologie interne", "Plaques, séismes, volcanisme, structure de la Terre"],
      ["reproduction-humaine", "Reproduction humaine", "Appareils génitaux, cycles, contraception"],
      ["immunite", "Immunité et santé", "Réactions immunitaires, SIDA, vaccins"],
      ["systeme-nerveux", "Système nerveux et comportement", "Neurone, influx nerveux, drogues"],
      ["regulation", "Régulation hormonale", "Endocrinologie, homéostasie, diabète"],
      ["temps-geologiques", "Histoire de la Terre et temps géologiques", "Datation, crises biologiques, stratigraphie"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_l": [
      ["corps-humain", "Organisation et fonctionnement du corps humain", "Systèmes, cellules, grandes fonctions"],
      ["alimentation", "Alimentation et santé", "Besoins, équilibre alimentaire, hygiène"],
      ["environnement", "L'environnement et l'Homme", "Écosystèmes, ressources, pollution"],
      ["genetique", "Introduction à la génétique", "Gènes, hérédité, groupes sanguins"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_l": [
      ["sante", "Éducation à la santé", "Hygiène, maladies, prévention, santé communautaire"],
      ["reproduction", "Reproduction et sexualité responsable", "Appareils génitaux, IST, contraception"],
      ["environnement", "Environnement et développement durable", "Ressources, changements climatiques, protection"],
      ["biotechnologie", "Biotechnologies et société", "Applications, enjeux éthiques"],
    ].map(([code, title, description]) => ({ code, title, description })),
  },
  francais: {
    "6eme": [
      ["grammaire-phrase", "Grammaire : la phrase", "Types et formes de phrases, ponctuation"],
      ["grammaire-nom", "Grammaire : le nom et ses déterminants", "Genre, nombre, articles, adjectifs"],
      ["grammaire-verbe", "Grammaire : le verbe", "Conjugaison, temps simples, groupes"],
      ["orthographe", "Orthographe et accords", "Accords dans le groupe nominal, homophones"],
      ["vocabulaire", "Vocabulaire et familles de mots", "Sens propre et figuré, préfixes, suffixes"],
      ["expression-orale", "Expression orale", "Prise de parole, récitation, compte rendu"],
      ["expression-ecrite", "Expression écrite", "Rédaction de phrases et de courts textes"],
      ["lecture", "Lecture et compréhension", "Lecture de textes, repérage, résumé"],
      ["poesie", "La poésie", "Poèmes, versification, récitation"],
      ["recit", "Le récit", "Structure du récit, personnages, contes"],
      ["theatre", "Le texte théâtral", "Dialogue, didascalies, mise en scène"],
      ["dictees", "Dictées et maîtrise de l'orthographe", "Dictées préparées, révision des accords"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "5eme": [
      ["grammaire-phrase", "La phrase et ses constituants", "Groupes, fonctions, propositions"],
      ["grammaire-verbe", "Conjugaison : les temps composés", "Passé composé, plus-que-parfait, futur antérieur"],
      ["grammaire-pronoms", "Les pronoms et les adjectifs", "Classes grammaticales, substitution"],
      ["orthographe", "Orthographe grammaticale", "Accords sujet-verbe, participes passés"],
      ["vocabulaire", "Vocabulaire : dérivation et champ lexical", "Formation des mots, sens"],
      ["expression-ecrite", "Expression écrite : le paragraphe", "Organisation, connecteurs, rédaction"],
      ["lecture", "Lecture de textes narratifs", "Compréhension, analyse, résumé"],
      ["poesie", "Poésie : formes et figures", "Comparaison, métaphore, rimes"],
      ["theatre", "Théâtre : la comédie", "Comique, didascalies, jeu"],
      ["expression-orale", "Expression orale et argumentation", "Débat, exposé, argumentation simple"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "4eme": [
      ["grammaire-propositions", "Propositions subordonnées", "Relatives, conjonctives, interrogatives"],
      ["grammaire-verbe", "Conjugaison : le subjonctif et les temps", "Modes, valeurs des temps"],
      ["orthographe", "Orthographe : accords complexes", "Participes passés, accords de l'attribut"],
      ["vocabulaire", "Vocabulaire : registres de langue", "Familier, courant, soutenu"],
      ["expression-ecrite", "Expression écrite : la narration", "Nouvelle, récit, point de vue"],
      ["expression-orale", "Expression orale : l'exposé", "Préparation et présentation d'un exposé"],
      ["lecture-argumentatif", "Lecture du texte argumentatif", "Thèse, arguments, exemples"],
      ["poesie", "Poésie engagée et lyrique", "Mouvements, figures de style"],
      ["theatre", "Théâtre : la tragédie et la comédie", "Genres, registres, mise en scène"],
      ["textes-prescriptifs", "Textes prescriptifs et informatifs", "Consignes, notices, comptes rendus"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "3eme": [
      ["grammaire-fonctions", "Fonctions grammaticales et phrase complexe", "Sujet, compléments, subordonnées"],
      ["grammaire-verbe", "Conjugaison : révision des modes et temps", "Valeurs des temps, concordance"],
      ["orthographe", "Orthographe : homophones et accords", "Révision, dictées de synthèse"],
      ["vocabulaire", "Vocabulaire : sens et histoire des mots", "Étymologie, néologismes"],
      ["expression-ecrite", "Expression écrite : dissertation et écriture d'invention", "Introduction, développement, conclusion"],
      ["lecture-poetique", "Lecture poétique", "Poèmes, engagement, modernité"],
      ["lecture-romanesque", "Lecture du roman", "Personnages, narration, points de vue"],
      ["lecture-theatrale", "Lecture théâtrale", "Genres, registres, mise en scène"],
      ["argumentation", "Argumentation", "Convaincre et persuader, essais, presse"],
      ["expression-orale", "Communication orale", "Débat, plaidoirie, exposé structuré"],
      ["resume", "Résumé de texte et contraction", "Techniques du résumé, règles"],
      ["sujets-bepc", "Préparation à l'épreuve de français au BEPC", "Sujets types, méthodologie"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "2nde": [
      ["grammaire-discours", "Grammaire : discours et narratologie", "Discours direct/indirect, focalisation"],
      ["grammaire-verbe", "Conjugaison : modes et valeurs", "Indicatif, subjonctif, conditionnel"],
      ["orthographe", "Orthographe : révision systématique", "Accords, homophones, dictées"],
      ["vocabulaire", "Vocabulaire : formation et registres", "Dérivation, composition, registres"],
      ["expression-ecrite", "Expression écrite : la dissertation", "Analyse de sujet, plan, rédaction"],
      ["poesie", "Poésie : courants et formes", "Romantisme, symbolisme, versification"],
      ["roman", "Le roman et la nouvelle", "Étude d'œuvres, techniques narratives"],
      ["theatre", "Le théâtre : de la tragédie au drame", "Genres, registres, mise en scène"],
      ["argumentation", "Textes argumentatifs", "Thèse, arguments, persuasion"],
      ["lecture-methodique", "Lecture méthodique et explication de texte", "Méthodes, axes de lecture"],
      ["expression-orale", "Expression orale", "Exposé, débat, lecture expressive"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_s": [
      ["methodologie-commentaire", "Méthodologie du commentaire", "Analyse de texte, plan, rédaction"],
      ["dissertation", "La dissertation", "Sujets, plan, rédaction"],
      ["resume", "Résumé de texte", "Techniques et règles"],
      ["grammaire", "Grammaire et expression", "Syntaxe, conjugaison, orthographe"],
      ["lecture", "Lecture et culture littéraire", "Mouvements, œuvres majeures"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_l": [
      ["dissertation", "La dissertation littéraire", "Méthodologie approfondie"],
      ["commentaire", "Le commentaire composé", "Méthodes d'analyse"],
      ["resume", "Résumé et discussion", "Contraction de texte"],
      ["oeuvres", "Étude d'œuvres intégrales", "Genres littéraires, mouvements"],
      ["poesie", "Poésie : mouvements du XXe siècle", "Surréalisme, engagement, modernité"],
      ["roman", "Le roman contemporain", "Nouvelles formes, personnages"],
      ["theatre", "Le théâtre contemporain", "Absurde, renouveau dramatique"],
      ["essai", "L'essai et la littérature d'idées", "Argumentation, philosophie et littérature"],
      ["grammaire", "Grammaire et stylistique", "Figures, syntaxe, registres"],
      ["oral", "Épreuves orales et exposés", "Entretien, lecture expressive"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_s": [
      ["litterature", "Littérature XIXe-XXIe", "Romantisme, réalisme, surréalisme, contemporain"],
      ["dissertation", "Méthodologie dissertation", "Analyse du sujet, plan, introduction, développement"],
      ["commentaire", "Méthodologie du commentaire composé", "Analyse, plan, rédaction"],
      ["resume", "Résumé de texte", "Techniques, entraînement BAC"],
      ["grammaire", "Grammaire et expression écrite", "Révision syntaxique, orthographe"],
      ["oeuvres", "Étude des œuvres au programme", "Lecture et analyse d'œuvres"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_l": [
      ["litterature", "Littérature approfondie", "Études d'œuvres intégrales, commentaires"],
      ["dissertation", "La dissertation littéraire", "Méthodologie, sujets types"],
      ["commentaire", "Le commentaire composé", "Méthodes, entraînement"],
      ["resume", "Résumé et discussion", "Contraction, discussion critique"],
      ["oeuvres", "Études d'œuvres au programme", "Romans, poésie, théâtre, essais"],
      ["grammaire", "Grammaire et stylistique", "Figures, syntaxe, vocabulaire"],
      ["oral", "Épreuves orales", "Entretien, analyse dirigée"],
    ].map(([code, title, description]) => ({ code, title, description })),
  },
  hg: {
    "6eme": [
      ["histoire-origines", "Histoire : les origines de l'humanité", "Préhistoire, premiers hommes"],
      ["histoire-egypte", "Histoire : l'Égypte ancienne", "Civilisation égyptienne, pharaons"],
      ["histoire-afrique", "Histoire : les grands empires africains", "Ghana, Mali, Songhaï, Kanem-Bornou"],
      ["geo-terre", "Géographie : la Terre et les continents", "Représentations, repères, océans"],
      ["geo-cameroun", "Géographie : le Cameroun", "Situation, relief, climat, population"],
      ["geo-afrique", "Géographie : l'Afrique", "Milieux naturels, population, activités"],
      ["environnement", "L'environnement et le développement", "Milieux, ressources, protection"],
      ["orientation", "Les repères et l'orientation", "Cartes, plans, orientation dans l'espace"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "5eme": [
      ["histoire-islam", "Histoire : la naissance et l'expansion de l'islam", "Le prophète, les conquêtes, les civilisations"],
      ["histoire-moyen-age", "Histoire : le Moyen Âge en Europe", "Féodalité, chrétienté, royaumes"],
      ["histoire-empires", "Histoire : les grands royaumes d'Afrique", "Civilisations africaines médiévales"],
      ["geo-europe", "Géographie : l'Europe", "Milieux, population, activités"],
      ["geo-afrique", "Géographie : les grandes régions d'Afrique", "Afrique de l'Ouest, du Nord, centrale"],
      ["geo-population", "Géographie : la population mondiale", "Démographie, répartition, villes"],
      ["ressources", "Les ressources naturelles", "Eau, sols, forêts, exploitation"],
      ["commerce", "Les échanges et le commerce", "Routes commerciales, produits"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "4eme": [
      ["histoire-grece", "Histoire : la Grèce antique", "Cités, démocratie athénienne, conquêtes d'Alexandre"],
      ["histoire-rome", "Histoire : Rome", "République, Empire, christianisme"],
      ["histoire-croisades", "Histoire : les croisades et l'expansion européenne", "Croisades, contacts, commerce"],
      ["geo-climats", "Géographie : les climats et milieux de l'Afrique", "Climats, végétation, sols"],
      ["geo-cameroun", "Géographie : la population du Cameroun", "Croissance, répartition, migrations"],
      ["geo-activites", "Géographie : les activités économiques", "Agriculture, élevage, industries, commerce"],
      ["developpement", "Le développement", "Pays développés et en développement, indicateurs"],
      ["citoyennete", "Éducation civique : droits et devoirs", "Citoyenneté, institutions, démocratie"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "3eme": [
      ["histoire-contemporaine", "Histoire : la période contemporaine", "Révolution française, XIXe siècle"],
      ["histoire-colonisation", "Histoire : la colonisation de l'Afrique", "Conquête, administration, résistances"],
      ["histoire-cameroun", "Histoire : l'histoire du Cameroun", "Périodes précoloniale, coloniale, indépendance"],
      ["histoire-guerres", "Histoire : les deux guerres mondiales", "Causes, déroulement, conséquences"],
      ["geo-mondialisation", "Géographie : la mondialisation", "Échanges, acteurs, inégalités"],
      ["geo-cameroun", "Géographie : le Cameroun contemporain", "Population, ressources, développement"],
      ["geo-afrique", "Géographie : l'Afrique et ses défis", "Démographie, conflits, intégration"],
      ["geo-environnement", "Géographie : les problèmes d'environnement", "Climat, déforestation, pollution"],
      ["civisme", "Éducation civique : institutions camerounaises", "Constitution, pouvoirs, élections"],
      ["concours-bepc", "Préparation au BEPC", "Méthodologie des épreuves d'HGECM"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "2nde": [
      ["histoire-monde", "Histoire : le monde aux XIXe-XXe siècles", "Révolutions industrielles, impérialismes"],
      ["histoire-afrique", "Histoire : l'Afrique dans le monde", "Traite, colonisation, résistances"],
      ["histoire-internationale", "Histoire : les relations internationales", "Guerre froide, décolonisation"],
      ["geo-cartographie", "Géographie : lecture de cartes et croquis", "Langage cartographique, localisation"],
      ["geo-monde", "Géographie : le monde actuel", "États, population, espaces"],
      ["geo-afrique", "Géographie : l'Afrique subsaharienne", "Milieux, population, économie"],
      ["geo-cameroun", "Géographie : le Cameroun", "Milieux, population, organisation de l'espace"],
      ["developpement", "Développement et inégalités", "Indicateurs, défis, objectifs de développement durable"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_s": [
      ["histoire-moderne", "Histoire : la formation du monde moderne", "Grandes découvertes, révolutions, empires"],
      ["geo-espaces", "Géographie : les grands espaces de production et d'échange", "Espaces agricoles, industriels, urbains"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_l": [
      ["histoire-moderne", "Histoire : le monde moderne (XVe-XVIIIe siècles)", "Découvertes, Renaissance, révolutions"],
      ["histoire-france", "Histoire : la Révolution française et le XIXe siècle", "Révolution, Empire, industrialisation"],
      ["geo-population", "Géographie : la population mondiale", "Démographie, migrations, urbanisation"],
      ["geo-economie", "Géographie : les activités économiques", "Agriculture, industries, services, échanges"],
      ["geo-cameroun", "Géographie : le Cameroun", "Milieux, population, développement"],
      ["civisme", "Éducation civique", "Citoyenneté, institutions, droits de l'homme"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_s": [
      ["monde", "Le monde depuis 1945", "Guerre froide, décolonisation, mondialisation"],
      ["geo-cameroun", "Géographie du Cameroun", "Relief, climat, population, développement"],
      ["histoire-afrique", "Histoire : l'Afrique contemporaine", "Indépendances, défis, intégration"],
      ["geo-mondialisation", "Géographie : la mondialisation et les échanges", "Flux, acteurs, territoires"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_l": [
      ["monde", "Histoire du XXe siècle", "Totalitarismes, guerres, construction européenne"],
      ["geo-cameroun", "Géographie du Cameroun", "Milieux, population, développement"],
      ["geo-mondialisation", "Géographie : la mondialisation", "Échanges, inégalités, environnement"],
    ].map(([code, title, description]) => ({ code, title, description })),
  },
  anglais: {
    "6eme": [
      ["vocabulaire-base", "Basic vocabulary", "Numbers, colours, family, school, daily objects"],
      ["grammaire-base", "Basic grammar", "Articles, pronouns, verb to be, have got"],
      ["present-simple", "The simple present", "Affirmative, negative and interrogative forms"],
      ["communication", "Everyday communication", "Greetings, introductions, classroom language"],
      ["lecture", "Reading and comprehension", "Simple texts, word recognition"],
      ["expression-ecrite", "Simple writing", "Short sentences, describing oneself"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "5eme": [
      ["present-continu", "Present simple vs present continuous", "Usage and differences"],
      ["passe", "The simple past", "Regular and irregular verbs"],
      ["futur", "The future", "Going to and will"],
      ["vocabulaire-themes", "Thematic vocabulary", "Food, clothes, animals, home"],
      ["communication", "Communication skills", "Shopping, asking for help, directions"],
      ["lecture-ecriture", "Reading and writing", "Short paragraphs, comprehension"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "4eme": [
      ["passe-continu", "Past continuous", "Narrative tenses"],
      ["present-perfect", "The present perfect", "Formation and usage"],
      ["comparaison", "Comparison and superlatives", "Comparatives, superlatives"],
      ["modaux", "Modal verbs", "Can, must, should, would"],
      ["vocabulaire", "Vocabulary and idioms", "Travel, jobs, health"],
      ["expression", "Expression and comprehension", "Letters, dialogues, comprehension"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "3eme": [
      ["conditionnels-passif", "Conditionals and passive voice", "Type 1-2, passive forms"],
      ["discours", "Reported speech", "Direct and indirect speech"],
      ["relatives", "Relative clauses", "Who, which, that, whose"],
      ["prepositions", "Prepositions and phrasal verbs", "Place, time, movement"],
      ["vocabulaire", "Thematic vocabulary", "Environment, technology, society"],
      ["lecture", "Reading comprehension", "Texts and exercises BEPC style"],
      ["expression", "Writing skills", "Essay, letter, summary"],
      ["bepc", "BEPC preparation", "Exam format, practice tests"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "2nde": [
      ["tenses", "Revision of tenses", "Present, past and future forms"],
      ["modaux", "Modal verbs", "Can, could, must, may, might"],
      ["passif", "The passive voice", "Forms and uses"],
      ["conditionnels", "Conditional sentences", "Types 0-3"],
      ["vocabulaire", "Vocabulary expansion", "School, science, culture"],
      ["comprehension", "Listening and reading comprehension", "Authentic texts"],
      ["writing", "Writing essays", "Structure, linking words, paragraphs"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_s": [
      ["grammar", "Advanced grammar", "Reported speech, passive, conditionals"],
      ["reading", "Reading comprehension", "Literary and scientific texts"],
      ["writing", "Academic writing", "Essays, summaries, letters"],
      ["vocabulaire", "Vocabulary and idioms", "Science, technology, global issues"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "1ere_l": [
      ["grammar", "Grammar review", "Tenses, modals, passive, conditionals"],
      ["reading-literature", "Reading literature", "Short stories, extracts, analysis"],
      ["writing", "Writing skills", "Narrative and argumentative essays"],
      ["culture", "English-speaking world", "Culture, history, civilisation"],
      ["oral", "Oral communication", "Presentations, debates, interviews"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_s": [
      ["expression", "Expression écrite/orale", "Essay, summary, oral presentation"],
      ["grammar", "Grammar consolidation", "Complex structures, connectors"],
      ["reading", "Reading comprehension", "Scientific and cultural texts"],
      ["writing", "Writing essays", "Argumentative essays, BAC preparation"],
      ["oral", "Oral expression", "Presentations, discussions"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_l": [
      ["literature", "English literature", "Authors, works, analysis"],
      ["civilisation", "Civilisation of English-speaking countries", "History, institutions, culture"],
      ["writing", "Advanced writing", "Essays, dissertations"],
      ["grammar", "Advanced grammar", "Style, inversion, emphatic structures"],
      ["oral", "Oral skills", "Debates, presentations, comprehension"],
    ].map(([code, title, description]) => ({ code, title, description })),
  },
  philo: {
    "term_s": [
      ["sujet", "Sujet, conscience, liberté", "Cogito, inconscient, déterminisme"],
      ["raison-reel", "La raison et le réel", "Raison, vérité, science"],
      ["culture", "La culture", "Art, technique, travail"],
      ["politique", "La politique et la société", "État, justice, liberté politique"],
      ["religion", "La religion", "Croyance, foi, raison"],
      ["morale", "La morale et le bonheur", "Devoir, vertu, bonheur"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_l": [
      ["verite", "Vérité, savoir, croyance", "Critères de vérité, scientificité"],
      ["sujet", "Le sujet", "Conscience, inconscient, désir"],
      ["culture", "La culture", "Art, technique, travail, langage"],
      ["raison-reel", "La raison et le réel", "Vérité, science, démonstration"],
      ["politique", "La politique", "État, justice, société"],
      ["morale", "La morale", "Devoir, liberté, bonheur"],
      ["methode", "Méthodologie de la dissertation et de l'explication de texte", "Sujets types, méthodes"],
    ].map(([code, title, description]) => ({ code, title, description })),
    "term_es": [
      ["sujet", "Le sujet", "Conscience, inconscient, désir, liberté"],
      ["culture", "La culture", "Art, technique, travail, langage"],
      ["raison-reel", "La raison et le réel", "Vérité, science, religion"],
      ["politique", "La politique et la société", "État, justice, société"],
      ["morale", "La morale et le bonheur", "Devoir, bonheur, liberté"],
      ["methode", "Méthodologie", "Dissertation et explication de texte"],
    ].map(([code, title, description]) => ({ code, title, description })),
  },
};

/**
 * Coefficients de base par (matière, classe) selon les programmes officiels.
 * Ces clés sont AJOUTÉES si absentes afin que la matière apparaisse
 * dans l'interface élève pour la classe concernée (aucune valeur existante
 * n'est écrasée).
 */
export const COEFFICIENT_MENAET: Record<string, Record<string, number>> = {
  maths: {
    "6eme": 2, "5eme": 2, "4eme": 2, "3eme": 3,
    "2nde": 4, "1ere_s": 5, "1ere_es": 4, "term_s": 6, "term_es": 4,
  },
  pc: {
    "5eme": 2, "4eme": 2, "3eme": 2, "2nde": 3, "1ere_s": 4, "term_s": 5,
  },
  svt: {
    "6eme": 2, "5eme": 2, "4eme": 2, "3eme": 2,
    "2nde": 2, "1ere_s": 3, "1ere_l": 2, "term_s": 4, "term_l": 2,
  },
  francais: {
    "6eme": 3, "5eme": 3, "4eme": 3, "3eme": 4,
    "2nde": 4, "1ere_s": 3, "1ere_l": 5, "term_s": 2, "term_l": 5,
  },
  hg: {
    "6eme": 2, "5eme": 2, "4eme": 2, "3eme": 3,
    "2nde": 3, "1ere_s": 2, "1ere_l": 3, "term_s": 2, "term_l": 4,
  },
  anglais: {
    "6eme": 2, "5eme": 2, "4eme": 2, "3eme": 3,
    "2nde": 3, "1ere_s": 2, "1ere_l": 3, "term_s": 2, "term_l": 3,
  },
  philo: {
    "term_s": 2, "term_l": 7, "term_es": 4,
  },
};

const SUBJECT_META: Record<string, { name: string; icon: string; color: string }> = {
  maths: { name: "Mathématiques", icon: "functions", color: "#1976d2" },
  pc: { name: "Physique-Chimie", icon: "science", color: "#d32f2f" },
  svt: { name: "SVT", icon: "biotech", color: "#388e3c" },
  francais: { name: "Français", icon: "menu_book", color: "#7b1fa2" },
  hg: { name: "Histoire-Géo", icon: "public", color: "#f57c00" },
  anglais: { name: "Anglais", icon: "translate", color: "#00796b" },
  philo: { name: "Philosophie", icon: "psychology", color: "#5d4037" },
};

export async function seedProgressionMENAET(): Promise<void> {
  let inserted = 0;
  let coeffPatched = 0;
  let subjectsCreated = 0;

  for (const [subjectCode, grades] of Object.entries(PROGRESSION_MENAET)) {
    let subject = await queryOne<{ id: number; code: string; coefficient_json: string }>(
      "SELECT id, code, coefficient_json FROM subjects WHERE code = ?",
      subjectCode,
    );
    if (!subject) {
      const meta = SUBJECT_META[subjectCode];
      if (!meta) continue;
      const res = await run(
        "INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, ?, ?, ?)",
        subjectCode,
        meta.name,
        meta.icon,
        meta.color,
        "{}",
      );
      subject = { id: Number(res.lastInsertRowid), code: subjectCode, coefficient_json: "{}" };
      subjectsCreated++;
    }

    const coeff = COEFFICIENT_MENAET[subjectCode];
    if (coeff) {
      let parsed: Record<string, number> = {};
      try {
        parsed = JSON.parse(subject.coefficient_json || "{}");
      } catch {
        parsed = {};
      }
      let changed = false;
      for (const [gradeCode, value] of Object.entries(coeff)) {
        if (parsed[gradeCode] === undefined) {
          parsed[gradeCode] = value;
          changed = true;
        }
      }
      if (changed) {
        await run("UPDATE subjects SET coefficient_json = ? WHERE id = ?", JSON.stringify(parsed), subject.id);
        coeffPatched++;
      }
    }

    for (const [gradeCode, chapters] of Object.entries(grades)) {
      const grade = await queryOne<{ id: number }>("SELECT id FROM grades WHERE code = ?", gradeCode);
      if (!grade) continue;

      const last = await queryOne<{ m: number | null }>(
        "SELECT MAX(order_index) AS m FROM chapters WHERE subject_id = ? AND grade_id = ?",
        subject.id,
        grade.id,
      );
      let order = (last?.m ?? 0) + 1;

      for (const ch of chapters) {
        const exists = await queryOne<{ c: number }>(
          "SELECT COUNT(*) AS c FROM chapters WHERE subject_id = ? AND grade_id = ? AND code = ?",
          subject.id,
          grade.id,
          ch.code,
        );
        if (exists && exists.c > 0) continue;
        await run(
          "INSERT INTO chapters (subject_id, grade_id, code, title, description, order_index, officiel_ref) VALUES (?, ?, ?, ?, ?, ?, ?)",
          subject.id,
          grade.id,
          ch.code,
          ch.title,
          ch.description,
          order,
          `BO MENAET 2023 - ${subject.code}-${gradeCode}`,
        );
        order++;
        inserted++;
      }
    }
  }

  console.log(`Progression MENAET seed: ${inserted} chapitres insérés, ${coeffPatched} matières complétées, ${subjectsCreated} matières créées`);
}
