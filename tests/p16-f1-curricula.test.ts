/**
 * P1.6 F1 — populateCurricula / chapters.officiel_ref (bug 22P02 en prod).
 *
 * Bug : `MAX(CAST(COALESCE(c.officiel_ref,'') AS INTEGER))` échoue sur
 * PostgreSQL dès que la valeur n'est pas un entier (`''` → 22P02 ;
 * `"BO TECHNIQUE 2024 - …"` → 22P02), avalé par safeAsync → curricula = 0.
 *
 * Correction : parse 100 % JS (`parseOfficielYear`) + sélecteur de paires
 * portable sans CAST — aucun dialecte, donc aucun 22P02 possible.
 *
 * Approche d'intégration : fixtures dans une transaction BEGIN IMMEDIATE
 * puis ROLLBACK (même protocole que tests/data-trust.test.ts) — la base de
 * développement reste strictement intacte.
 */
import { run, queryOne } from "@/lib/db";
import { parseOfficielYear, populateCurricula, POPULATE_PAIRS_SQL } from "@/lib/init";

const STAMP = `${process.pid}${Date.now()}${Math.floor(Math.random() * 1000)}`;

describe("parseOfficielYear (conversion sûre officiel_ref → année)", () => {
  test('officiel_ref = "" → null (aucune année, aucun CAST SQL)', () => {
    expect(parseOfficielYear("")).toBeNull();
  });

  test("officiel_ref = NULL → null", () => {
    expect(parseOfficielYear(null)).toBeNull();
    expect(parseOfficielYear(undefined)).toBeNull();
  });

  test('officiel_ref = "123" → 123 (valeur numérique conservée)', () => {
    expect(parseOfficielYear("123")).toBe(123);
  });

  test('officiel_ref = "2024" → 2024', () => {
    expect(parseOfficielYear("2024")).toBe(2024);
  });

  test('officiel_ref = " 456 " → 456 (trim)', () => {
    expect(parseOfficielYear(" 456 ")).toBe(456);
  });

  test('valeur non numérique métier ("BO TECHNIQUE 2024 - …") → null, jamais réinterprétée', () => {
    expect(parseOfficielYear("BO TECHNIQUE 2024 - 5-2nde_g2")).toBeNull();
    expect(parseOfficielYear("BO MENAET 2023 - 1-term_s")).toBeNull();
  });

  test('préfixe numérique partiel ("2023abc") → null (strict, pas de parse de préfixe)', () => {
    expect(parseOfficielYear("2023abc")).toBeNull();
  });
});

describe("Sélecteur de paires — portable SQLite/PostgreSQL", () => {
  test("aucun CAST ni syntaxe dialectale (cause du 22P02 éliminée)", () => {
    expect(POPULATE_PAIRS_SQL).not.toMatch(/CAST\s*\(/i);
    expect(POPULATE_PAIRS_SQL).not.toMatch(/::/);
    expect(POPULATE_PAIRS_SQL).not.toMatch(/datetime\s*\(/i);
    expect(POPULATE_PAIRS_SQL).not.toMatch(/date\s*\(\s*'now'/i);
    expect(POPULATE_PAIRS_SQL).toContain("FROM chapters");
    expect(POPULATE_PAIRS_SQL).toContain("officiel_ref IS NOT NULL");
  });
});

describe("populateCurricula (intégration SQLite — fixtures ROLLBACK)", () => {
  test('ref "123" → year 123 ; ref "" → year 2024 ; ref NULL seule → paire absente', async () => {
    await run("BEGIN IMMEDIATE");
    try {
      const g = await run(
        "INSERT INTO grades (code, name, cycle, order_index) VALUES (?, ?, 'college', 9999)",
        `p16g_${STAMP}`,
        "P1.6 Grade",
      );
      const gradeId = Number(g.lastInsertRowid);
      const sA = await run(
        "INSERT INTO subjects (code, name, icon, color) VALUES (?, ?, 'book', '#1976d2')",
        `p16sa_${STAMP}`,
        "P1.6 Subject A",
      );
      const sB = await run(
        "INSERT INTO subjects (code, name, icon, color) VALUES (?, ?, 'book', '#1976d2')",
        `p16sb_${STAMP}`,
        "P1.6 Subject B",
      );
      const sC = await run(
        "INSERT INTO subjects (code, name, icon, color) VALUES (?, ?, 'book', '#1976d2')",
        `p16sc_${STAMP}`,
        "P1.6 Subject C",
      );
      const subA = Number(sA.lastInsertRowid);
      const subB = Number(sB.lastInsertRowid);
      const subC = Number(sC.lastInsertRowid);

      const addChapter = (subjectId: number, code: string, ref: string | null) =>
        run(
          "INSERT INTO chapters (subject_id, grade_id, code, title, officiel_ref) VALUES (?, ?, ?, ?, ?)",
          subjectId,
          gradeId,
          code,
          `P1.6 ${code}`,
          ref,
        );

      // A : mix numérique + non numériques → MAX = 123
      await addChapter(subA, `p16a1_${STAMP}`, "123");
      await addChapter(subA, `p16a2_${STAMP}`, "BO TECHNIQUE 2024 - x");
      await addChapter(subA, `p16a3_${STAMP}`, "");
      // B : uniquement "" → fallback 2024
      await addChapter(subB, `p16b1_${STAMP}`, "");
      // C : uniquement NULL → paire exclue (officiel_ref IS NOT NULL)
      await run(
        "INSERT INTO chapters (subject_id, grade_id, code, title, officiel_ref) VALUES (?, ?, ?, ?, NULL)",
        subC,
        gradeId,
        `p16c1_${STAMP}`,
        "P1.6 NULL ref",
      );

      // Le cœur du test : ne doit JAMAIS throw (SQLite comme PostgreSQL)
      await expect(populateCurricula()).resolves.toBeUndefined();

      const rowA = await queryOne<{ year: number }>(
        "SELECT year FROM curricula WHERE grade_id = ? AND subject_id = ?",
        gradeId,
        subA,
      );
      expect(rowA?.year).toBe(123);

      const rowB = await queryOne<{ year: number }>(
        "SELECT year FROM curricula WHERE grade_id = ? AND subject_id = ?",
        gradeId,
        subB,
      );
      expect(rowB?.year).toBe(2024);

      const rowC = await queryOne<{ id: number }>(
        "SELECT id FROM curricula WHERE grade_id = ? AND subject_id = ?",
        gradeId,
        subC,
      );
      expect(rowC).toBeUndefined();
    } finally {
      await run("ROLLBACK");
    }
  });

  test("curricula restent intacts après rollback (pas de residue fixture)", async () => {
    const left = await queryOne<{ c: number }>(
      "SELECT COUNT(*) AS c FROM curricula WHERE official_ref IS NOT NULL AND official_ref LIKE 'BO 2024' AND grade_id IN (SELECT id FROM grades WHERE code LIKE 'p16g_%')",
    );
    expect(Number(left?.c ?? 0)).toBe(0);
  });
});
