import { run, queryOne } from "./db";

interface SeedQuestion {
  q: string;
  options: string[];
  answer: number;
  expl?: string;
}

function q(
  question: string,
  options: string[],
  answer: number,
  expl?: string,
): SeedQuestion {
  return { q: question, options, answer, expl };
}

export function seedIfEmpty() {
  if (queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM series")!.c > 0) return;

  run("INSERT INTO series (code, name) VALUES (?, ?)", "C", "Série C (Sciences)");
  run("INSERT INTO series (code, name) VALUES (?, ?)", "D", "Série D (Sciences Exp.)");
  run("INSERT INTO series (code, name) VALUES (?, ?)", "A", "Série A (Littéraire)");
  run("INSERT INTO series (code, name) VALUES (?, ?)", "B", "Série B (Économique)");

  const subjects = [
    { code: "maths", name: "Mathématiques", icon: "calculate", color: "#0047ab" },
    { code: "pc", name: "Physique-Chimie", icon: "science", color: "#7c3aed" },
    { code: "svt", name: "SVT", icon: "biotech", color: "#0d9488" },
    { code: "francais", name: "Français", icon: "menu_book", color: "#c026d3" },
    { code: "anglais", name: "Anglais", icon: "translate", color: "#ea580c" },
  ];
  const subjectIds: Record<string, number> = {};
  for (const s of subjects) {
    const r = run(
      "INSERT INTO subjects (code, name, icon, color) VALUES (?, ?, ?, ?)",
      s.code, s.name, s.icon, s.color,
    );
    subjectIds[s.code] = Number(r.lastInsertRowid);
  }

  const chapters: Record<string, [string, string[]][]> = {
    maths: [
      ["Analyse", ["Limites et continuité", "Dérivées et applications", "Fonctions exponentielles et logarithmes", "Intégrales"]],
      ["Algèbre", ["Nombres complexes", "Suites numériques", "Équations et inéquations"]],
      ["Géométrie", ["Géométrie dans l'espace", "Produit scalaire et applications", "Configurations du plan"]],
      ["Probabilités", ["Dénombrement", "Probabilités conditionnelles", "Lois de probabilité"]],
    ],
    pc: [
      ["Chimie", ["Atomistique", "Réactions chimiques", "Oxydoréduction", "Équilibres acido-basiques"]],
      ["Mécanique", ["Mouvement rectiligne", "Lois de Newton", "Énergie cinétique et potentielle"]],
      ["Électricité", ["Circuits RC", "Oscillations électriques", "Piles et accumulateurs"]],
      ["Optique", ["Lentilles minces", "Miroirs et réflexion"]],
    ],
    svt: [
      ["Biologie cellulaire", ["La cellule : structure", "Photosynthèse et respiration"]],
      ["Génétique", ["Mendel et l'hérédité", "ADN et réplication", "Génétique humaine"]],
      ["Physiologie", ["Système nerveux", "Circulation et respiration", "Nutrition et digestion"]],
      ["Écologie", ["Écosystèmes", "Énergie dans les écosystèmes", "Impact humain sur l'environnement"]],
    ],
    francais: [
      ["Littérature", ["Le roman", "La poésie", "Le théâtre"]],
      ["Grammaire", ["Les propositions", "La concordance des temps", "Les figures de style"]],
      ["Expression écrite", ["Le commentaire composé", "La dissertation", "Le résumé"]],
    ],
    anglais: [
      ["Grammar", ["Tenses", "Conditionals", "Passive voice"]],
      ["Vocabulary", ["Education", "Environment", "Society"]],
      ["Reading", ["Comprehension", "Text analysis"]],
    ],
  };

  const chapterIds: Record<string, Record<string, number>> = {};
  for (const [subj, list] of Object.entries(chapters)) {
    chapterIds[subj] = {};
    list.forEach(([title, lessons], i) => {
      const code = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const r = run(
        "INSERT INTO chapters (subject_id, grade_id, code, title, description, order_index, position, officiel_ref) VALUES (?, 1, ?, ?, ?, ?, ?, '')",
        subjectIds[subj], code, title, "", i, i,
      );
      const cid = Number(r.lastInsertRowid);
      chapterIds[subj][title] = cid;
      lessons.forEach((summary, j) => {
        run(
          "INSERT INTO lessons (chapter_id, title, summary, content, position) VALUES (?, ?, ?, ?, ?)",
          cid, summary, summary, summary, j,
        );
      });
    });
  }

  // ---------------- QUIZ CONTENT ----------------
  const quizDefs: Record<string, [string, SeedQuestion[]][]> = {
    maths: [
      ["Quiz Analyse : Limites", [
        q("Quelle est la limite de f(x) = (x² - 1)/(x - 1) quand x tend vers 1 ?",
          ["0", "1", "2", "N'existe pas"], 2,
          "Factoriser : (x²-1)/(x-1) = (x-1)(x+1)/(x-1) = x+1, donc limite = 2."),
        q("f(x) = x² - 4x + 3. Que vaut f'(x) ?",
          ["2x - 4", "2x + 4", "x - 4", "2x"], 0,
          "La dérivée de x² est 2x, celle de -4x est -4, la constante disparaît."),
        q("Quelle est la limite de e^x quand x tend vers -∞ ?",
          ["+∞", "0", "1", "-∞"], 1,
          "e^x tend vers 0 quand x tend vers -∞."),
        q("L'équation ln(x) = 2 a pour solution :",
          ["x = 2", "x = e²", "x = 10", "x = e/2"], 1,
          "ln(x) = 2 ⇔ x = e²."),
        q("∫₀¹ x dx est égale à :",
          ["1", "1/2", "1/4", "0"], 1,
          "Primitive de x : x²/2, donc [x²/2]₀¹ = 1/2."),
        q("La fonction f(x) = x³ - 3x admet un maximum relatif en :",
          ["x = 0", "x = 1", "x = -1", "x = 3"], 2,
          "f'(x) = 3x² - 3 = 0 ⇔ x = ±1. En -1, f passe de croissante à décroissante : maximum."),
        q("Si u_n est une suite géométrique de raison 2 et u_0 = 3, alors u_4 = :",
          ["24", "36", "48", "64"], 2,
          "u_4 = u_0 × 2⁴ = 3 × 16 = 48."),
        q("Le nombre complexe i² est égal à :",
          ["1", "-1", "i", "0"], 1,
          "Par définition, i² = -1."),
        q("Un dé à 6 faces est lancé. La probabilité d'obtenir un nombre pair est :",
          ["1/6", "1/3", "1/2", "2/3"], 2,
          "3 faces paires sur 6 : 3/6 = 1/2."),
        q("La droite d'équation y = 2x + 3 a pour pente :",
          ["3", "2", "1/2", "-2"], 1,
          "Dans y = ax + b, a est le coefficient directeur : a = 2."),
      ]],
      ["Quiz Géométrie & Algèbre", [
        q("Les solutions de x² - 5x + 6 = 0 sont :",
          ["2 et 3", "-2 et -3", "1 et 6", "5 et 1"], 0,
          "Discriminant = 25 - 24 = 1, racines (5±1)/2 = 2 et 3."),
        q("Deux vecteurs u et v sont orthogonaux si :",
          ["u = v", "u·v = 0", "u·v = 1", "||u|| = ||v||"], 1,
          "L'orthogonalité est caractérisée par un produit scalaire nul."),
        q("La distance entre A(1;2) et B(4;6) est :",
          ["4", "5", "6", "√13"], 1,
          "d = √((4-1)² + (6-2)²) = √(9+16) = √25 = 5."),
        q("Le volume d'une sphère de rayon r est :",
          ["(4/3)πr³", "πr²", "2πr", "(1/3)πr³"], 0,
          "Formule du volume de la sphère : V = (4/3)πr³."),
        q("La somme des angles d'un triangle vaut :",
          ["90°", "180°", "270°", "360°"], 1,
          "La somme des angles d'un triangle est toujours 180°."),
      ]],
    ],
    pc: [
      ["Quiz Chimie : Réactions", [
        q("Dans l'atome, les électrons sont situés :",
          ["Dans le noyau", "Autour du noyau", "Dans les protons", "Dans les neutrons"], 1,
          "Les électrons gravitent autour du noyau (protons + neutrons)."),
        q("Le nombre d'oxydation de l'oxygène dans H₂O est :",
          ["+1", "-2", "+2", "0"], 1,
          "Dans l'eau, O est à l'état d'oxydation -2."),
        q("Une oxydation correspond à :",
          ["Un gain d'électrons", "Une perte d'électrons", "Un gain de protons", "Une perte de masse"], 1,
          "Oxydation = perte d'électrons ; réduction = gain."),
        q("Le pH d'une solution acide est :",
          ["> 7", "= 7", "< 7", "= 14"], 2,
          "pH < 7 : acide ; pH = 7 : neutre ; pH > 7 : basique."),
        q("Une solution de concentration 2 mol/L et de volume 0,5 L contient :",
          ["1 mol", "2 mol", "2,5 mol", "0,25 mol"], 0,
          "n = C × V = 2 × 0,5 = 1 mol."),
      ]],
      ["Quiz Mécanique", [
        q("La deuxième loi de Newton s'écrit :",
          ["F = m × a", "F = m / a", "F = m × v", "F = m × g"], 0,
          "ΣF = m·a : la résultante des forces égale masse × accélération."),
        q("Un corps en mouvement rectiligne uniforme a :",
          ["Une accélération constante non nulle", "Une vitesse constante", "Une vitesse nulle", "Une trajectoire circulaire"], 1,
          "MRU = vitesse constante, accélération nulle."),
        q("L'énergie cinétique d'un corps de masse m et vitesse v est :",
          ["m × v", "(1/2)mv²", "m × g × h", "m × v²"], 1,
          "E_c = (1/2)mv²."),
        q("Le poids d'un corps de masse 10 kg (g = 10 N/kg) est :",
          ["1 N", "10 N", "100 N", "1000 N"], 2,
          "P = m × g = 10 × 10 = 100 N."),
      ]],
    ],
    svt: [
      ["Quiz Biologie : La cellule", [
        q("La cellule est l'unité :",
          ["Structurale seulement", "Fonctionnelle seulement", "Structurale et fonctionnelle", "Ni structurale ni fonctionnelle"], 2,
          "La cellule est l'unité structurale ET fonctionnelle du vivant."),
        q("La photosynthèse se déroule dans :",
          ["Les mitochondries", "Les chloroplastes", "Le noyau", "La membrane"], 1,
          "Les chloroplastes contiennent la chlorophylle, lieu de la photosynthèse."),
        q("La respiration cellulaire produit principalement :",
          ["O₂ et glucose", "CO₂ et ATP", "Glucose et ATP", "CO₂ et O₂"], 1,
          "La respiration consomme O₂ et glucose pour produire CO₂ et ATP."),
        q("L'ADN est localisé dans :",
          ["Le cytoplasme", "Les ribosomes", "Le noyau", "La paroi"], 2,
          "L'ADN (matériel génétique) est dans le noyau des cellules eucaryotes."),
        q("Le nombre de chromosomes de l'humain est :",
          ["23", "44", "46", "48"], 2,
          "L'humain possède 46 chromosomes (23 paires)."),
      ]],
      ["Quiz Génétique", [
        q("Deux parents de groupe sanguin A homozygotes ont des enfants :",
          ["Tous de groupe A", "50% A et 50% O", "Tous de groupe O", "75% A et 25% O"], 0,
          "AA × AA → 100% de génotype AA (groupe A)."),
        q("Le phénotype correspond :",
          ["Au génotype", "À l'expression visible d'un gène", "À l'ADN", "Aux allèles"], 1,
          "Le phénotype est l'expression observable d'un caractère."),
        q("La réplication de l'ADN a lieu :",
          ["En phase G1", "En phase S", "En phase G2", "En mitose"], 1,
          "La synthèse d'ADN se fait pendant la phase S du cycle cellulaire."),
        q("Une maladie génétique récessive s'exprime :",
          ["À l'état hétérozygote", "Uniquement à l'état homozygote", "Chez tous les porteurs", "Uniquement chez les garçons"], 1,
          "Un allèle récessif ne s'exprime que s'il est présent en double exemplaire."),
      ]],
    ],
    francais: [
      ["Quiz Grammaire : Figures de style", [
        q("« Ses yeux étaient deux étoiles » est une :",
          ["Métaphore", "Comparaison", "Périphrase", "Hyperbole"], 0,
          "Métaphore : image sans outil de comparaison (sans « comme »)."),
        q("« Blanc comme neige » est une :",
          ["Métaphore", "Comparaison", "Métonymie", "Antithèse"], 1,
          "La comparaison utilise un outil de comparaison : « comme »."),
        q("« Je t'ai attendu mille ans » est une :",
          ["Litote", "Hyperbole", "Métonymie", "Personnification"], 1,
          "Hyperbole : exagération (mille ans)."),
        q("« La forêt soupire sous le vent » est une :",
          ["Métaphore", "Personnification", "Allégorie", "Métonymie"], 1,
          "On prête des sentiments humains à la forêt : personnification."),
        q("Le roman de l'émergence du héros au XIXe siècle s'appelle :",
          ["Roman d'apprentissage", "Roman policier", "Roman épistolaire", "Nouvelle"], 0,
          "Le roman d'apprentissage (Bildungsroman) raconte la formation du héros."),
      ]],
      ["Quiz Expression écrite", [
        q("Dans une dissertation, la thèse est :",
          ["Le titre", "L'idée défendue", "La conclusion", "L'introduction"], 1,
          "La thèse est la position défendue par le candidat."),
        q("Le commentaire composé se fait sur :",
          ["Un texte", "Deux textes", "Une image", "Un tableau"], 0,
          "Le commentaire composé porte sur un texte unique."),
        q("Un résumé doit garder :",
          ["Tous les détails", "L'essentiel du texte", "Les exemples seulement", "Les citations"], 1,
          "Le résumé conserve l'idée essentielle en réduisant le texte."),
        q("La proposition subordonnée relative est introduite par :",
          ["Une conjonction", "Un pronom relatif", "Une préposition", "Un adverbe"], 1,
          "Qui, que, dont, où : pronoms relatifs."),
      ]],
    ],
    anglais: [
      ["Quiz Grammar : Tenses", [
        q("She ______ to school every day.",
          ["go", "goes", "going", "gone"], 1,
          "Present simple, 3e personne du singulier : goes."),
        q("I ______ this film yesterday.",
          ["watch", "watched", "have watched", "watching"], 1,
          "Avec « yesterday », passé simple : watched."),
        q("They ______ football now.",
          ["play", "plays", "are playing", "played"], 2,
          "Action en cours : présent continu « are playing »."),
        q("He has ______ his homework.",
          ["do", "done", "did", "doing"], 1,
          "Present perfect : has + participe passé (done)."),
        q("If I were you, I ______ study harder.",
          ["will", "would", "can", "must"], 1,
          "Conditionnel de politesse/irréel : would."),
      ]],
      ["Quiz Vocabulary : Education", [
        q("A person who studies at school is a:",
          ["teacher", "student", "doctor", "driver"], 1,
          "Student = élève."),
        q("The book used in class is called a:",
          ["novel", "notebook", "textbook", "magazine"], 2,
          "Textbook = manuel scolaire."),
        q("The examination at the end of secondary school in Côte d'Ivoire is:",
          ["BEPC", "TOEFL", "IELTS", "SAT"], 0,
          "Le BEPC est l'examen de fin de collège en Côte d'Ivoire."),
        q("« Réviser » in English is:",
          ["to review", "to revise", "to repeat", "to return"], 1,
          "To revise = réviser."),
      ]],
    ],
  };

  for (const [subj, quizzes] of Object.entries(quizDefs)) {
    quizzes.forEach(([title, questions], i) => {
      const r = run(
        "INSERT INTO quizzes (subject_id, chapter_id, title, level, position) VALUES (?, ?, ?, ?, ?)",
        subjectIds[subj], null, title, "S'entraîner", i,
      );
      const qid = Number(r.lastInsertRowid);
      questions.forEach((qq, j) => {
        run(
          "INSERT INTO questions (quiz_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, ?, ?)",
          qid, qq.q, JSON.stringify(qq.options), qq.answer, qq.expl ?? null, 1, j,
        );
      });
    });
  }

  // Quiz diagnostic initial
  const diagQ = [
    q("2x + 3 = 11. Que vaut x ?", ["3", "4", "5", "8"], 1, "2x = 8 donc x = 4."),
    q("Quelle est la capitale de la France ?", ["Londres", "Paris", "Berlin", "Rome"], 1),
    q("10 % de 250 vaut :", ["25", "50", "2,5", "250"], 0, "250 × 10/100 = 25."),
    q("Le participe passé du verbe « prendre » est :", ["prenu", "pris", "prendé", "prinder"], 1),
    q("Un triangle équilatéral a :", ["2 côtés égaux", "3 côtés égaux", "4 côtés égaux", "0 côté égal"], 1),
    q("H₂O est la formule de :", ["Le sel", "L'eau", "Le sucre", "Le dioxyde de carbone"], 1),
    q("L'anglais de « école » est :", ["house", "school", "church", "shop"], 1),
    q("7 × 8 = ?", ["54", "56", "64", "48"], 1),
    q("La photosynthèse produit de l'oxygène à partir du :", ["CO₂ et H₂O", "N₂ et O₂", "CH₄ et CO₂", "H₂ et O₂"], 0),
    q("Un cercle de rayon 5 a une aire de :", ["10π", "25π", "50π", "5π"], 1, "A = πr² = π × 25."),
  ];
  const dr = run(
    "INSERT INTO quizzes (subject_id, chapter_id, title, level, position) VALUES (?, ?, ?, ?, ?)",
    subjectIds["maths"], null, "Diagnostic de démarrage", "Diagnostic", 99,
  );
  const diagId = Number(dr.lastInsertRowid);
  diagQ.forEach((qq, j) => {
    run(
      "INSERT INTO questions (quiz_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, ?, ?)",
      diagId, qq.q, JSON.stringify(qq.options), qq.answer, qq.expl ?? null, 1, j,
    );
  });

  // ---------------- EXAM PAPERS ----------------
  const papers: { category: "BAC" | "BEPC"; series: string | null; subject: string; year: number; duration: number; questions: SeedQuestion[] }[] = [
    {
      category: "BAC", series: "C", subject: "maths", year: 2024, duration: 180,
      questions: [
        q("Résoudre dans R : 2x - 6 = 0", ["x = 2", "x = 3", "x = -3", "x = 6"], 1, "2x = 6 ⇔ x = 3."),
        q("La limite de (3x + 2)/(x - 1) quand x → +∞ est :", ["3", "2", "1", "+∞"], 0, "Limite du rapport des termes de plus haut degré : 3."),
        q("f(x) = x² + 3x. f'(x) = ?", ["2x + 3", "2x", "x + 3", "2x² + 3x"], 0),
        q("Le discriminant de x² + 2x + 1 = 0 est :", ["0", "4", "-4", "2"], 0, "Δ = 4 - 4 = 0 : racine double."),
        q("∫ x² dx (primitive) :", ["x³/3", "x³", "x³/2", "2x"], 0),
        q("ln(e³) = ?", ["1", "3", "e³", "ln 3"], 1),
        q("Une suite arithmétique de raison 3 et de premier terme 2 a pour terme u₅ :", ["15", "17", "14", "20"], 1, "u₅ = 2 + 5×3 = 17."),
        q("La probabilité de tirer un as dans un jeu de 32 cartes :", ["1/32", "4/32", "1/4", "8/32"], 1, "4 as sur 32 cartes : 4/32."),
        q("Le module du nombre complexe 3 + 4i est :", ["5", "7", "12", "25"], 0, "|z| = √(9+16) = 5."),
        q("L'équation e^x = 5 a pour solution :", ["x = ln 5", "x = e⁵", "x = 5e", "x = log 5"], 0),
        q("Le plan vectoriel a pour dimension :", ["1", "2", "3", "4"], 1),
        q("cos(π/3) = ?", ["1/2", "√2/2", "√3/2", "1"], 0),
        q("Une fonction paire vérifie :", ["f(-x) = f(x)", "f(-x) = -f(x)", "f(x) = 0", "f(x) > 0"], 0),
        q("Le produit scalaire de (1;0) et (0;1) vaut :", ["0", "1", "-1", "2"], 0),
        q("La dérivée de ln(x) est :", ["1/x", "x", "ln(x)", "1"], 0),
        q("Un système de 2 équations à 2 inconnues peut avoir :", ["0, 1 ou une infinité de solutions", "Toujours 2 solutions", "Toujours 1 solution", "Jamais de solution"], 0),
        q("La somme 1 + 2 + 3 + ... + 10 vaut :", ["45", "55", "50", "60"], 1, "10×11/2 = 55."),
        q("Le coefficient directeur de la tangente en x=1 à f(x)=x² :", ["1", "2", "0", "4"], 1, "f'(x) = 2x, donc f'(1) = 2."),
        q("La fonction f(x) = 1/x est définie sur :", ["R", "R*", "R+", "]0;+∞["], 1),
        q("Un angle droit mesure :", ["60°", "90°", "120°", "180°"], 1),
      ],
    },
    {
      category: "BAC", series: "D", subject: "svt", year: 2024, duration: 180,
      questions: [
        q("La cellule eucaryote se distingue par la présence :", ["D'un noyau", "D'une membrane", "De cytoplasme", "D'ADN"], 0),
        q("La mitose permet :", ["La division cellulaire", "La fusion des gamètes", "La respiration", "La photosynthèse"], 0),
        q("L'allèle dominant s'écrit en général :", ["En majuscule", "En minuscule", "En italique", "En gras"], 0),
        q("Le génotype d'un individu de groupe A hétérozygote :", ["AA", "AO", "OO", "AB"], 1),
        q("La chaîne alimentaire commence par :", ["Les producteurs", "Les consommateurs", "Les décomposeurs", "Les carnivores"], 0),
        q("Le neurone transmet :", ["L'influx nerveux", "Le sang", "L'oxygène", "Les hormones"], 0),
        q("L'hémoglobine transporte :", ["Le CO₂ seulement", "L'O₂", "Les nutriments", "Les déchets"], 1),
        q("Le rein produit :", ["L'urine", "La bile", "Le suc gastrique", "La salive"], 0),
        q("Un écosystème comprend :", ["Le biotope et la biocénose", "Les rochers", "Le climat", "La pollution"], 0),
        q("L'ADN est composé de nucléotides formés de :", ["Sucre, phosphate, base azotée", "Acides aminés", "Lipides", "Glucides"], 0),
        q("La transcription produit :", ["De l'ARNm", "Des protéines", "De l'ADN", "Des lipides"], 0),
        q("La dérive génétique affecte surtout :", ["Les petites populations", "Les grandes populations", "Les clones", "Les hybrides"], 0),
        q("L'effet de serre est accentué par :", ["Le CO₂", "L'O₂", "L'azote", "La vapeur d'eau"], 0),
        q("Les chromosomes sexuels de l'homme :", ["XY", "XX", "YY", "X0"], 0),
        q("La vaccination protège contre :", ["Les maladies infectieuses", "Le vieillissement", "Le cancer du sang", "Les fractures"], 0),
      ],
    },
    {
      category: "BAC", series: null, subject: "francais", year: 2024, duration: 120,
      questions: [
        q("« La terre est bleue comme une orange » (Eluard) est une :", ["Comparaison", "Métaphore", "Métonymie", "Parallélisme"], 0),
        q("La tragédie classique respecte la règle des :", ["Trois unités", "Cinq actes seulement", "Deux unités", "Quatre actes"], 0),
        q("Auteur des « Misérables » :", ["Balzac", "Hugo", "Flaubert", "Zola"], 1),
        q("Le participe passé employé avec « être » s'accorde :", ["Avec le sujet", "Avec le COD", "Toujours invariable", "Avec le COI"], 0),
        q("Le registre comique vise à :", ["Faire rire", "Faire peur", "Émouvoir", "Dénoncer"], 0),
        q("Une métonymie remplace un mot par :", ["Un mot lié logiquement", "Un mot contraire", "Un mot de même son", "Une comparaison"], 0),
        q("Le théâtre de l'absurde :", ["Beckett, Ionesco", "Molière, Racine", "Corneille, Hugo", "Zola, Maupassant"], 0),
        q("Le vers de 12 syllabes s'appelle :", ["Un alexandrin", "Un décasyllabe", "Un octosyllabe", "Un hexamètre"], 0),
        q("L'antithèse oppose :", ["Deux idées", "Deux sons", "Deux lettres", "Deux rimes"], 0),
        q("Dans un récit, le narrateur interne dit :", ["Je", "Il", "On", "Vous"], 0),
        q("L'auteur du « Cahier d'un retour au pays natal » :", ["Aimé Césaire", "Léopold Senghor", "Camara Laye", "Amadou Kourouma"], 0),
        q("Le mouvement littéraire du XIXe siècle de la nature :", ["Le romantisme", "Le classicisme", "Le surréalisme", "Le symbolisme"], 0),
        q("La valeur du présent dans « Il mange en ce moment » :", ["D'actualité", "De vérité générale", "De narration", "Futur"], 0),
        q("Le dialogue de théâtre sert à :", ["Faire avancer l'action", "Décrire le décor", "Raconter au passé", "Donner des notes"], 0),
      ],
    },
    {
      category: "BEPC", series: null, subject: "maths", year: 2024, duration: 120,
      questions: [
        q("15 % de 200 :", ["30", "15", "20", "45"], 0, "200 × 0,15 = 30."),
        q("Résoudre : x + 5 = 12", ["x = 7", "x = 5", "x = 17", "x = 60"], 0),
        q("L'aire d'un rectangle de 4 cm × 6 cm :", ["24 cm²", "10 cm²", "12 cm²", "48 cm²"], 0),
        q("3/4 + 1/4 = ?", ["1", "4/8", "2", "3/8"], 0),
        q("Le périmètre d'un carré de côté 5 :", ["20", "25", "15", "10"], 0),
        q("2³ = ?", ["6", "8", "9", "23"], 1),
        q("L'écriture scientifique de 4500 :", ["4,5 × 10³", "45 × 10²", "0,45 × 10⁴", "4,5 × 10⁴"], 0),
        q("Un angle plat mesure :", ["180°", "90°", "360°", "45°"], 0),
        q("La médiane d'une série ordonnée de 7 valeurs est :", ["La 4e valeur", "La 3e valeur", "La 7e valeur", "La moyenne"], 0),
        q("(-3) × (-4) = ?", ["12", "-12", "7", "-7"], 0),
        q("Le pgcd de 12 et 18 :", ["6", "3", "36", "9"], 0),
        q("Un triangle rectangle vérifie :", ["Pythagore", "Thalès", "Al-Kashi", "Euler"], 0),
        q("La vitesse moyenne d'un trajet de 120 km en 2 h :", ["60 km/h", "120 km/h", "240 km/h", "30 km/h"], 0),
        q("2x + 2 = 10 → x = ?", ["4", "5", "6", "12"], 0),
        q("Une fonction linéaire s'écrit :", ["f(x) = ax", "f(x) = ax + b", "f(x) = x²", "f(x) = 1/x"], 0),
      ],
    },
    {
      category: "BEPC", series: null, subject: "pc", year: 2024, duration: 120,
      questions: [
        q("L'unité de la tension électrique :", ["Le volt", "L'ampère", "L'ohm", "Le watt"], 0),
        q("Un circuit en série :", ["Un seul chemin", "Plusieurs chemins", "Aucun courant", "Toujours des lampes"], 0),
        q("Le gaz nécessaire à la combustion :", ["Le dioxygène", "L'azote", "Le CO₂", "L'hélium"], 0),
        q("La matière est constituée :", ["De molécules", "D'ondes", "De sons", "De couleurs"], 0),
        q("L'ampèremètre se branche :", ["En série", "En dérivation", "Nulle part", "Sur la pile"], 0),
        q("Le pH d'une solution neutre :", ["7", "0", "14", "10"], 0),
        q("La masse se mesure avec :", ["Une balance", "Un voltmètre", "Un thermomètre", "Un chronomètre"], 0),
        q("L'état de l'eau dans les nuages :", ["Gaz", "Liquide", "Solide", "Plasma"], 1),
      ],
    },
    {
      category: "BEPC", series: null, subject: "svt", year: 2024, duration: 120,
      questions: [
        q("L'organe de la respiration chez l'humain :", ["Les poumons", "Le cœur", "Le foie", "Les reins"], 0),
        q("Le sang rouge contient :", ["Des globules rouges", "De la chlorophylle", "Des os", "De l'air"], 0),
        q("La digestion débute :", ["Dans la bouche", "Dans l'estomac", "Dans l'intestin", "Dans l'œsophage"], 0),
        q("Les aliments riches en protéines :", ["La viande", "Le riz", "Le sucre", "L'eau"], 0),
        q("La transmission des caractères se fait par :", ["Les gènes", "Les muscles", "Les os", "La peau"], 0),
        q("Le rejet des déchets du corps s'appelle :", ["L'excrétion", "La digestion", "La respiration", "La circulation"], 0),
        q("Le squelette protège :", ["Les organes", "La peau", "Les cheveux", "Les dents"], 0),
        q("Un être vivant est :", ["Capable de se reproduire", "Inerte", "En verre", "Uniquement végétal"], 0),
      ],
    },
  ];

  const seriesByCode: Record<string, number | null> = {
    C: 1, D: 2, A: 3, B: 4,
  };

  for (const p of papers) {
    const r = run(
      "INSERT INTO exam_papers (category, series_id, subject_id, year, title, duration_minutes) VALUES (?, ?, ?, ?, ?, ?)",
      p.category, p.series ? seriesByCode[p.series] : null, subjectIds[p.subject], p.year,
      `${p.category} ${p.subject === "maths" ? "Mathématiques" : p.subject === "svt" ? "SVT" : p.subject === "pc" ? "Physique-Chimie" : "Français"} ${p.year}`, p.duration,
    );
    const pid = Number(r.lastInsertRowid);
    p.questions.forEach((qq, j) => {
      run(
        "INSERT INTO questions (paper_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, ?, ?)",
        pid, qq.q, JSON.stringify(qq.options), qq.answer, qq.expl ?? null, 1, j,
      );
    });
  }

  // ---------------- BADGES ----------------
  const badges = [
    ["first_quiz", "Premier pas", "flag", "Termine ton premier quiz"],
    ["quiz_master", "Maître du quiz", "quiz", "Termine 10 quiz"],
    ["perfect_score", "Sans faute", "workspace_premium", "Obtenez 100 % à un quiz"],
    ["exam_ready", "Prêt pour l'examen", "school", "Termine un simulateur complet"],
    ["streak_3", "Série de 3", "local_fire_department", "3 jours d'activité consécutifs"],
    ["streak_7", "Série de 7", "local_fire_department", "7 jours d'activité consécutifs"],
    ["xp_100", "Expérimenté", "stars", "Atteins 100 XP"],
    ["xp_500", "Expert", "stars", "Atteins 500 XP"],
  ];
  for (const [code, name, icon, desc] of badges) {
    run("INSERT INTO badges (code, name, icon, description) VALUES (?, ?, ?, ?)", code, name, icon, desc);
  }
}
