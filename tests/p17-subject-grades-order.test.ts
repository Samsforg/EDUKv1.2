/**
 * P1.7 — subject_grades : ordre d'exécution dans doInit(), racine PG
 * `RETURNING id` (42703), idempotence et fidélité des coefficients.
 *
 * Bug production : subject_grades = 0 alors que 16/16 subjects ont un
 * coefficient_json valide. Cause prouvée : `run()` (db.ts) append
 * `RETURNING id` à tout INSERT d'une table absente de NO_ID_TABLES ;
 * subject_grades (PK composite subject_id+grade_id, aucune colonne id)
 * déclenchait 42703 à chaque cold start, avalé par le catch interne de
 * populateSubjectGrades → 0 ligne, silencieusement.
 *
 * Cause secondaire (DB fraîche) : l'appel à populateSubjectGrades était
 * placé AVANT les seeds qui remplissent subjects.coefficient_json
 * (seedTechnicalChapters / seedMENAET / seedProgressionMENAET /
 * seedProgressionGaps) → premier init lisait '{}' et produisait 0 ligne.
 *
 * Protocole : fixtures en BEGIN IMMEDIATE + ROLLBACK (data-trust) sur la
 * base de développement — aucun résidu, aucune donnée fabriquée.
 */
import fs from "node:fs";
import path from "node:path";
import { run, query, queryOne, NO_ID_TABLES } from "@/lib/db";
import { populateSubjectGrades } from "@/lib/init";

const STAMP = `${process.pid}${Date.now()}${Math.floor(Math.random() * 1000)}`;

const INIT_SRC = fs.readFileSync(path.join(process.cwd(), "src", "lib", "init.ts"), "utf8");
const DOINIT_SRC = INIT_SRC.slice(
  INIT_SRC.indexOf("async function doInit"),
  INIT_SRC.indexOf("async function fixMojibake"),
);

const countFor = async (subjectId: number): Promise<number> => {
  const row = await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM subject_grades WHERE subject_id = ?",
    subjectId,
  );
  return Number(row?.c ?? 0);
};

describe("doInit() — ordre : populateSubjectGrades après les remplisseurs de coefficient_json", () => {
  test("l'appel figure bien dans doInit() ET après chaque seed qui écrit subjects.coefficient_json", () => {
    const posPopulate = DOINIT_SRC.indexOf('safeAsync("populateSubjectGrades"');
    expect(posPopulate).toBeGreaterThan(-1);
    const writers = [
      'safeAsync("seedTechnicalChapters"', // INSERT subjects + coefficient_json (init.ts seedTechnicalSubjects)
      'safeAsync("seedMENAET"', // INSERT subjects avec coefficient_json
      'safeAsync("seedProgressionMENAET"', // UPDATE subjects SET coefficient_json
      'safeAsync("seedProgressionGaps"', // UPDATE subjects SET coefficient_json
    ];
    for (const writer of writers) {
      const pos = DOINIT_SRC.indexOf(writer);
      expect(pos).toBeGreaterThan(-1);
      expect(posPopulate).toBeGreaterThan(pos);
    }
  });

  test("l'appel ne précède plus aucun seed (position de fin, après le dernier Promise.all)", () => {
    const posPopulate = DOINIT_SRC.indexOf('safeAsync("populateSubjectGrades"');
    const posFinally = DOINIT_SRC.indexOf("} finally {");
    expect(posPopulate).toBeGreaterThan(posFinally - 400);
    expect(posPopulate).toBeLessThan(posFinally);
  });
});

describe("Racine PG — RETURNING id (42703)", () => {
  test("subject_grades est dans NO_ID_TABLES (run() n'ajoute donc pas RETURNING id)", () => {
    expect(NO_ID_TABLES.has("subject_grades")).toBe(true);
  });

  test("les autres cibles d'INSERT sans colonne id de ce bug restent couvertes par la liste historique", () => {
    for (const t of ["class_students", "growth_metrics", "webhook_events", "user_badges"]) {
      expect(NO_ID_TABLES.has(t)).toBe(true);
    }
  });
});

describe("populateSubjectGrades — intégration SQLite (fixtures ROLLBACK)", () => {
  test("A : premier init (état post-seeds) → subject_grades > 0 ; état '{}' → 0 (preuve de l'ordre)", async () => {
    await run("BEGIN IMMEDIATE");
    try {
      const g = await run(
        "INSERT INTO grades (code, name, cycle, order_index) VALUES (?, ?, 'lycee', 9999)",
        `p17g_${STAMP}`,
        "P1.7 Grade",
      );
      const gradeId = Number(g.lastInsertRowid);

      const sReady = await run(
        "INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, 'book', '#1976d2', ?)",
        `p17ready_${STAMP}`,
        "P1.7 Subject Ready",
        JSON.stringify({ [`p17g_${STAMP}`]: 3 }),
      );
      const readyId = Number(sReady.lastInsertRowid);

      const sEmpty = await run(
        "INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, 'book', '#1976d2', '{}')",
        `p17empty_${STAMP}`,
        "P1.7 Subject Empty",
      );
      const emptyId = Number(sEmpty.lastInsertRowid);

      await expect(populateSubjectGrades()).resolves.toBeUndefined();

      // sujet dont coefficient_json est déjà rempli (état après seeds) → lignes
      expect(await countFor(readyId)).toBe(1);
      // sujet encore '{}' (état lu AVANT les seeds) → 0 : c'est exactement le
      // défaut de premier init que le déplacement dans doInit() corrige
      expect(await countFor(emptyId)).toBe(0);
      // le grade fixture est bien résolu par code
      const row = await queryOne<{ coefficient: number }>(
        "SELECT coefficient FROM subject_grades WHERE subject_id = ? AND grade_id = ?",
        readyId,
        gradeId,
      );
      expect(row?.coefficient).toBe(3);
    } finally {
      await run("ROLLBACK");
    }
  });

  test("B : un sujet '{}' rempli par les seeds PUIS repliqué → lignes créées", async () => {
    await run("BEGIN IMMEDIATE");
    try {
      await run(
        "INSERT INTO grades (code, name, cycle, order_index) VALUES (?, ?, 'lycee', 9999)",
        `p17g2_${STAMP}`,
        "P1.7 Grade 2",
      );
      const gradeId = Number((await queryOne<{ id: number }>("SELECT id FROM grades WHERE code = ?", `p17g2_${STAMP}`))!.id);
      const s = await run(
        "INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, 'book', '#1976d2', '{}')",
        `p17patch_${STAMP}`,
        "P1.7 Subject Patched",
      );
      const subjectId = Number(s.lastInsertRowid);

      await populateSubjectGrades();
      expect(await countFor(subjectId)).toBe(0);

      await run("UPDATE subjects SET coefficient_json = ? WHERE id = ?", JSON.stringify({ [`p17g2_${STAMP}`]: 4 }), subjectId);
      await populateSubjectGrades();
      expect(await countFor(subjectId)).toBe(1);
      const row = await queryOne<{ coefficient: number }>(
        "SELECT coefficient FROM subject_grades WHERE subject_id = ? AND grade_id = ?",
        subjectId,
        gradeId,
      );
      expect(row?.coefficient).toBe(4);
    } finally {
      await run("ROLLBACK");
    }
  });

  test("C : idempotence — deux exécutions consécutives ne dupliquent pas", async () => {
    await run("BEGIN IMMEDIATE");
    try {
      await run(
        "INSERT INTO grades (code, name, cycle, order_index) VALUES (?, ?, 'lycee', 9999)",
        `p17g3_${STAMP}`,
        "P1.7 Grade 3",
      );
      const s = await run(
        "INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, 'book', '#1976d2', ?)",
        `p17idem_${STAMP}`,
        "P1.7 Subject Idem",
        JSON.stringify({ [`p17g3_${STAMP}`]: 2, [`p17g3_${STAMP}x`]: 7 }),
      );
      const subjectId = Number(s.lastInsertRowid);

      await populateSubjectGrades();
      const first = await countFor(subjectId);
      await populateSubjectGrades();
      const second = await countFor(subjectId);

      expect(first).toBe(1); // le code grade inexistant ne produit rien (pas d'invention)
      expect(second).toBe(first); // jamais 2× (ON CONFLICT DO UPDATE)
    } finally {
      await run("ROLLBACK");
    }
  });

  test("D : aucun coefficient inventé — chaque ligne reproduit exactement coefficient_json", async () => {
    await run("BEGIN IMMEDIATE");
    try {
      const gA = await run("INSERT INTO grades (code, name, cycle, order_index) VALUES (?, ?, 'lycee', 9999)", `p17da_${STAMP}`, "P1.7 DA");
      const gB = await run("INSERT INTO grades (code, name, cycle, order_index) VALUES (?, ?, 'lycee', 9999)", `p17db_${STAMP}`, "P1.7 DB");
      const coeffs = { [`p17da_${STAMP}`]: 6, [`p17db_${STAMP}`]: 2 };
      const s = await run(
        "INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, 'book', '#1976d2', ?)",
        `p17fidem_${STAMP}`,
        "P1.7 Subject Fidelity",
        JSON.stringify(coeffs),
      );
      const subjectId = Number(s.lastInsertRowid);

      await populateSubjectGrades();

      const rows = await query<{ grade_id: number; coefficient: number }>(
        "SELECT grade_id, coefficient FROM subject_grades WHERE subject_id = ?",
        subjectId,
      );
      expect(rows).toHaveLength(2);
      const byGrade = new Map(rows.map((r) => [r.grade_id, r.coefficient]));
      expect(byGrade.get(Number(gA.lastInsertRowid))).toBe(6);
      expect(byGrade.get(Number(gB.lastInsertRowid))).toBe(2);
    } finally {
      await run("ROLLBACK");
    }
  });

  test("résidus : aucune fixture p17* ne survit au rollback", async () => {
    const residue = await queryOne<{ c: number }>(
      `SELECT (SELECT COUNT(*) FROM subjects WHERE code LIKE 'p17\\_%' ESCAPE '\\' AND code LIKE '%${STAMP}') +
              (SELECT COUNT(*) FROM grades WHERE code LIKE 'p17\\_%' ESCAPE '\\' AND code LIKE '%${STAMP}') AS c`,
    );
    expect(Number(residue?.c ?? 0)).toBe(0);
  });
});
