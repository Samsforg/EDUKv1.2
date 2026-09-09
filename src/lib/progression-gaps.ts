import { queryOne, run } from "./db";

/**
 * Comble les trous du tronc commun existant (programme MENAET / officiel ivoirien)
 * sans toucher à PROGRESSION_MENAET : certaines (matière, classe) n'avaient pas
 * de chapitres du tout (ex : PC en 6e, Maths/PC en série L, ou toutes les matières
 * du tronc en séries ES). Idempotent : chaque chapitre est inséré une seule fois
 * (clé subject_id + grade_id + code).
 */

const SUBJECT_META: Record<string, { name: string; icon: string; color: string }> = {
  maths: { name: "Mathématiques", icon: "functions", color: "#1976d2" },
  pc: { name: "Physique-Chimie", icon: "science", color: "#d32f2f" },
  svt: { name: "SVT", icon: "biotech", color: "#388e3c" },
  francais: { name: "Français", icon: "menu_book", color: "#7b1fa2" },
  hg: { name: "Histoire-Géo", icon: "public", color: "#f57c00" },
  anglais: { name: "Anglais", icon: "translate", color: "#00796b" },
  philo: { name: "Philosophie", icon: "psychology", color: "#5d4037" },
  espagnol: { name: "Espagnol", icon: "translate", color: "#c2185b" },
  allemand: { name: "Allemand", icon: "translate", color: "#455a64" },
  edhc: { name: "EDHC", icon: "account_balance", color: "#00897b" },
};

const GAP_COEFF: Record<string, Record<string, number>> = {
  pc: { "6eme": 2, "1ere_l": 2, "term_l": 2, "1ere_es": 3, "term_es": 3 },
  maths: { "1ere_l": 3, "term_l": 3 },
  svt: { "1ere_es": 2, "term_es": 2 },
  francais: { "1ere_es": 4, "term_es": 4 },
  anglais: { "1ere_es": 3, "term_es": 3 },
  hg: { "1ere_es": 3, "term_es": 3 },
  espagnol: { "6eme": 2, "5eme": 2, "4eme": 2, "3eme": 2, "2nde": 2, "1ere_s": 2, "1ere_l": 2, "1ere_es": 2, "term_s": 2, "term_l": 2, "term_es": 2 },
  allemand: { "6eme": 2, "5eme": 2, "4eme": 2, "3eme": 2, "2nde": 2, "1ere_s": 2, "1ere_l": 2, "1ere_es": 2, "term_s": 2, "term_l": 2, "term_es": 2 },
  edhc: { "6eme": 2, "5eme": 2, "4eme": 2, "3eme": 2, "2nde": 2, "1ere_s": 2, "1ere_l": 2, "1ere_es": 2, "term_s": 2, "term_l": 2, "term_es": 2 },
};

const PROGRESSION_GAPS: Record<string, Record<string, [string, string, string][]>> = {
  pc: {
    "6eme": [
      ["etats-matiere", "Les états de la matière", "Solide, liquide, gazeux et changements d'état"],
      ["eau", "L'eau et ses propriétés", "Cycle de l'eau, masse volumique, mélanges"],
      ["circuit-electrique", "Le circuit électrique", "Générateur, conducteurs et isolants, courant"],
      ["lumiere", "La lumière et les ombres", "Propagation, ombre et couleurs"],
      ["mesures", "Mesures et grandeurs", "Masse, volume, longueur et unités"],
    ],
    "1ere_l": [
      ["mecanique", "Mécanique", "Mouvement, forces et interactions"],
      ["energie", "Énergie", "Transferts et conservation"],
      ["electricite", "Électricité", "Courant, tension et circuits"],
      ["chimie", "Chimie et transformations", "Atomes, ions et réactions"],
      ["optique", "Optique", "Lumière et lentilles"],
    ],
    "term_l": [
      ["mecanique", "Mécanique", "Mouvement, forces et énergie"],
      ["electricite", "Électricité", "Courant, tension et circuits"],
      ["chimie", "Chimie", "Réactions et équilibres"],
      ["optique", "Optique", "Lentilles et instruments"],
      ["univers", "Le ciel et la Terre", "Système solaire et gravitation"],
    ],
    "1ere_es": [
      ["mecanique", "Mécanique", "Mouvement, forces et énergie"],
      ["electricite", "Électricité", "Courant, tension et circuits"],
      ["chimie", "Chimie", "Atomes, ions et réactions"],
      ["optique", "Optique", "Lumière et lentilles"],
      ["univers", "Le ciel et la Terre", "Système solaire et gravitation"],
    ],
    "term_es": [
      ["mecanique", "Mécanique", "Mouvement, forces et énergie"],
      ["electricite", "Électricité", "Courant, tension et circuits"],
      ["chimie", "Chimie", "Réactions et équilibres"],
      ["optique", "Optique", "Lentilles et instruments"],
      ["univers", "Le ciel et la Terre", "Système solaire et gravitation"],
    ],
  },
  maths: {
    "1ere_l": [
      ["nombres", "Ensemble des nombres", "Naturels, entiers, rationnels, réels"],
      ["fonctions", "Fonctions et représentation", "Courbe et tableau de variation"],
      ["statistiques", "Statistiques", "Moyenne, médiane, écart-type"],
      ["probabilites", "Probabilités", "Expérience aléatoire et probabilité"],
      ["geometrie", "Géométrie plane", "Vecteurs et droites"],
    ],
    "term_l": [
      ["suites", "Suites numériques", "Suites arithmétiques et géométriques"],
      ["fonctions", "Fonctions et dérivation", "Taux de variation et tangentes"],
      ["statistiques", "Statistiques", "Moyenne, médiane, écart-type"],
      ["probabilites", "Probabilités", "Événements et arbres"],
      ["geometrie", "Géométrie plane", "Vecteurs et droites"],
    ],
  },
  svt: {
    "1ere_es": [
      ["cellule", "La cellule et le fonctionnement du vivant", "Membrane et métabolisme"],
      ["genetique", "Génétique et évolution", "ADN et hérédité"],
      ["physiologie", "Physiologie humaine", "Systèmes et homéostasie"],
      ["ecologie", "Écologie", "Écosystèmes et biosphère"],
      ["reproduction", "Reproduction et développement", "Méiose et fécondation"],
    ],
    "term_es": [
      ["cellule", "La cellule et le fonctionnement du vivant", "Membrane et métabolisme"],
      ["genetique", "Génétique et évolution", "ADN et hérédité"],
      ["physiologie", "Physiologie humaine", "Systèmes et homéostasie"],
      ["ecologie", "Écologie", "Écosystèmes et biosphère"],
      ["geologie", "La Terre et son évolution", "Plaques et reliefs"],
    ],
  },
  francais: {
    "1ere_es": [
      ["methode", "Méthodologie", "Dissertation et commentaire composé"],
      ["litterature", "Littérature", "Roman, poésie et théâtre"],
      ["argumentation", "Argumentation", "Thèse, arguments et exemples"],
      ["langue", "Langue et communication", "Grammaire et lexique"],
      ["ecriture", "Écriture personnelle", "Journal et récit"],
    ],
    "term_es": [
      ["methode", "Méthodologie", "Dissertation et commentaire composé"],
      ["litterature", "Littérature", "Roman, poésie et théâtre"],
      ["argumentation", "Argumentation", "Thèse, contre-thèse et exemples"],
      ["langue", "Langue et communication", "Grammaire et lexique"],
      ["oral", "Expression orale", "Présentation et débat"],
    ],
  },
  anglais: {
    "1ere_es": [
      ["grammar", "Advanced grammar", "Tenses, modals and conditionals"],
      ["vocabulary", "Vocabulary", "Society, environment and culture"],
      ["reading", "Reading comprehension", "Texts and inference"],
      ["writing", "Writing skills", "Essay and summary"],
      ["oral", "Speaking", "Presentation and debate"],
    ],
    "term_es": [
      ["grammar", "Advanced grammar", "Voice, modals and clauses"],
      ["vocabulary", "Vocabulary", "Current affairs and culture"],
      ["reading", "Reading comprehension", "Texts and inference"],
      ["writing", "Writing skills", "Essay and summary"],
      ["culture", "English-speaking cultures", "History and geography"],
    ],
  },
  hg: {
    "1ere_es": [
      ["histoire-contemporaine", "Histoire contemporaine", "XXe siècle et guerres mondiales"],
      ["geographie", "Géographie des territoires", "Régions et aménagement"],
      ["mondialisation", "La mondialisation", "Flux et acteurs"],
      ["developpement", "Développement et inégalités", "Pays émergents"],
      ["methode-hg", "Méthodologie", "Carte et dissertation"],
    ],
    "term_es": [
      ["histoire-contemporaine", "Histoire contemporaine", "XXe siècle et mondialisation"],
      ["geographie", "Géographie des territoires", "Régions et aménagement"],
      ["mondialisation", "La mondialisation", "Flux et acteurs"],
      ["developpement", "Développement et inégalités", "Pays émergents"],
      ["civilisations", "Civilisations", "Afrique, Europe et Asie"],
    ],
  },
};

const LANG_GRADES = ["6eme", "5eme", "4eme", "3eme", "2nde", "1ere_s", "1ere_l", "1ere_es", "term_s", "term_l", "term_es"];

const ESP_CH: [string, string, string][] = [
  ["saludos", "Saludos y presentaciones", "Saludar y presentarse en español"],
  ["numeros", "Los números y la edad", "Contar y decir la edad"],
  ["familia", "La familia", "Miembros de la familia y descripción"],
  ["colegio", "Mi colegio y mi día", "Vocabulario escolar y rutina"],
  ["comida", "La comida", "Alimentos y preferencias"],
];

const ALLM_CH: [string, string, string][] = [
  ["begruessung", "Begrüßung und Vorstellung", "Sich begrüßen und vorstellen"],
  ["zahlen", "Zahlen und Alter", "Zählen und das Alter angeben"],
  ["familie", "Die Familie", "Familienmitglieder beschreiben"],
  ["schule", "Meine Schule und mein Tag", "Schulvokabeln und Tagesablauf"],
  ["essen", "Das Essen", "Lebensmittel und Vorlieben"],
];

const EDHC_CH: [string, string, string][] = [
  ["droits-devoirs", "Droits et devoirs du citoyen", "Droits fondamentaux et responsabilités"],
  ["etat-institutions", "L'État et les institutions", "Institutions de la République de Côte d'Ivoire"],
  ["developpement", "Développement humain", "Santé, éducation, bien-être"],
  ["environnement", "Environnement et citoyenneté", "Protection de l'environnement"],
  ["culture-paix", "Culture de la paix", "Vivre ensemble et tolérance"],
];

for (const g of LANG_GRADES) {
  PROGRESSION_GAPS.espagnol = { ...(PROGRESSION_GAPS.espagnol ?? {}), [g]: ESP_CH };
  PROGRESSION_GAPS.allemand = { ...(PROGRESSION_GAPS.allemand ?? {}), [g]: ALLM_CH };
  PROGRESSION_GAPS.edhc = { ...(PROGRESSION_GAPS.edhc ?? {}), [g]: EDHC_CH };
}

export async function seedProgressionGaps(): Promise<void> {
  let inserted = 0;
  let coeffPatched = 0;

  for (const [subjectCode, grades] of Object.entries(PROGRESSION_GAPS)) {
    let subject = await queryOne<{ id: number; coefficient_json: string }>(
      "SELECT id, coefficient_json FROM subjects WHERE code = ?",
      subjectCode,
    );
    if (!subject) {
      const meta = SUBJECT_META[subjectCode];
      if (!meta) {
        console.warn(`seedProgressionGaps: matière ${subjectCode} absente, ignorée`);
        continue;
      }
      const res = await run(
        "INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, ?, ?, ?)",
        subjectCode, meta.name, meta.icon, meta.color, "{}",
      );
      subject = { id: Number(res.lastInsertRowid), coefficient_json: "{}" };
    }

    const coeff = GAP_COEFF[subjectCode];
    if (coeff) {
      let parsed: Record<string, number> = {};
      try { parsed = JSON.parse(subject.coefficient_json || "{}"); } catch { parsed = {}; }
      let changed = false;
      for (const [gradeCode, value] of Object.entries(coeff)) {
        if (parsed[gradeCode] === undefined) { parsed[gradeCode] = value; changed = true; }
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
        subject.id, grade.id,
      );
      let order = (last?.m ?? 0) + 1;
      for (const ch of chapters) {
        const [code, title, description] = ch;
        const exists = await queryOne<{ c: number }>(
          "SELECT COUNT(*) AS c FROM chapters WHERE subject_id = ? AND grade_id = ? AND code = ?",
          subject.id, grade.id, code,
        );
        if (exists && exists.c > 0) continue;
        await run(
          "INSERT INTO chapters (subject_id, grade_id, code, title, description, order_index, officiel_ref) VALUES (?, ?, ?, ?, ?, ?, ?)",
          subject.id, grade.id, code, title, description, order,
          `BO MENAET 2023 - ${subjectCode}-${gradeCode}`,
        );
        order++;
        inserted++;
      }
    }
  }

  console.log(`Progression gaps seed: ${inserted} chapitres insérés, ${coeffPatched} matières complétées`);
}
