/**
 * P2.0 A — garde anti-drift du SCHEMA (P1.9 était limité à 3 tables en dur).
 *
 * Couvre les exigences :
 *   table existante  → aucun DDL exécuté (plan vide = aucune statement)
 *   table absente    → création (plan ordonné SCHEMA, CREATE/FK/index)
 *   exécution #1/#2/#3 → aucune duplication (le gate exclut les présentes ;
 *                        CREATE TABLE/INDEX IF NOT EXISTS en file)
 *   aucun DROP destructif dans TOUS les statements générés (62 tables).
 */
import { p20SchemaTables, p20SchemaTableStatements, p20PlanSchemaGuard, p19Statements } from "@/lib/db";

describe("P2.0 A — garde anti-drift SCHEMA", () => {
  const tables = p20SchemaTables();

  test("T-A1 : inventaire des tables du SCHEMA — uniques, ordre FK respecté", () => {
    expect(tables.length).toBeGreaterThanOrEqual(62);
    expect(new Set(tables).size).toBe(tables.length);
    expect(tables).toEqual(expect.arrayContaining(["duels", "class_assignments", "assignment_submissions"]));
    const before = (a: string, b: string) => tables.indexOf(a) < tables.indexOf(b);
    expect(before("users", "sessions")).toBe(true);
    expect(before("classes", "class_assignments")).toBe(true);
    expect(before("class_assignments", "assignment_submissions")).toBe(true);
    expect(before("quizzes", "duels")).toBe(true);
    expect(before("subjects", "class_assignments")).toBe(true);
  });

  test("T-A2 : extraction possible pour CHAQUE table du SCHEMA (PG et SQLite)", () => {
    for (const t of tables) {
      for (const pg of [true, false]) {
        const entries = p20SchemaTableStatements([t], pg);
        expect(entries).toHaveLength(1);
        const all = entries[0].sql.join("\n");
        expect(all).toContain(`CREATE TABLE IF NOT EXISTS ${t} (`);
        if (pg) {
          expect(all).not.toContain("AUTOINCREMENT");
          expect(all).not.toContain("datetime('now')");
        }
      }
    }
  });

  test("T-A3 : table existante → plan vide (aucun DDL), idempotence ×3", () => {
    for (let i = 0; i < 3; i++) {
      expect(p20PlanSchemaGuard(tables, [])).toEqual([]);
      expect(p20PlanSchemaGuard(tables, ["duels"]).filter((e) => e.table === "duels")).toHaveLength(1);
      expect(p20PlanSchemaGuard(tables, [])).toEqual([]);
    }
  });

  test("T-A4 : tables absentes → création parfaite (SERIAL, PK, FK, index, DEFAULT, CHECK)", () => {
    const plan = p20PlanSchemaGuard(tables, ["duels", "class_assignments"]);
    expect(plan.map((e) => e.table)).toEqual(["class_assignments", "duels"]);
    const ca = plan.find((e) => e.table === "class_assignments")!.sql.join("\n");
    expect(ca).toMatch(/CREATE TABLE IF NOT EXISTS class_assignments \(|id SERIAL PRIMARY KEY/);
    expect(ca).toContain("SERIAL PRIMARY KEY");
    expect(ca).toContain("FOREIGN KEY (class_id) REFERENCES classes(id)");
    expect(ca).toContain("FOREIGN KEY (subject_id) REFERENCES subjects(id)");
    expect(ca).toContain("CREATE INDEX IF NOT EXISTS idx_class_assignments_class");
    expect(ca).toContain("to_char(now()");
    expect(ca).toContain("DEFAULT 20");
    const du = plan.find((e) => e.table === "duels")!.sql.join("\n");
    expect(du).toContain("SERIAL PRIMARY KEY");
    expect(du).toContain("CHECK (status IN ('pending','done'))");
    expect(du).toContain("FOREIGN KEY (challenger_id) REFERENCES users(id)");
    expect(du).toContain("CREATE INDEX IF NOT EXISTS idx_duels_challenger");
  });

  test("T-A5 : AUCUN DROP ni ALTER destructif dans les statements des 62 tables", () => {
    const all = p20SchemaTableStatements(tables, true)
      .flatMap((e) => e.sql)
      .join("\n");
    expect(all).not.toMatch(/\bDROP\b/i);
    expect(all).not.toMatch(/ALTER TABLE\s+\w+\s+ALTER COLUMN/i);
    expect(all).not.toMatch(/TRUNCATE/i);
    expect(all).toMatch(/CREATE TABLE IF NOT EXISTS/i);
  });

  test("T-A6 : ordre du SCHEMA préservé dans le plan (parent avant enfant)", () => {
    const plan = p20PlanSchemaGuard(tables, ["assignment_submissions", "class_assignments", "duels"]);
    expect(plan.map((e) => e.table)).toEqual([
      "class_assignments",
      "assignment_submissions",
      "duels",
    ]);
  });

  test("T-A7 : régression P1.9 — p19Statements inchangé (wrapper sur la générique)", () => {
    const p19 = p19Statements(true);
    expect(p19.map((e) => e.table)).toEqual(["class_assignments", "assignment_submissions", "duels"]);
    const plan = p20PlanSchemaGuard(tables, ["class_assignments", "assignment_submissions", "duels"]);
    expect(plan.map((e) => e.table)).toEqual(p19.map((e) => e.table));
    for (let i = 0; i < p19.length; i++) {
      expect(plan[i].sql).toEqual(p19[i].sql);
    }
  });

  test("T-A8 : couverture de TOUS les index du SCHEMA, y compris UNIQUE partiel", () => {
    const subs = p20SchemaTableStatements(["subscriptions"], true).flatMap((e) => e.sql).join("\n");
    expect(subs).toContain("CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_sub");
    expect(subs).toContain("WHERE status = 'active'");
    const duels = p20SchemaTableStatements(["duels"], true).flatMap((e) => e.sql).join("\n");
    expect(duels).not.toMatch(/WHERE/);
    const idxCount = tables.reduce(
      (n, t) =>
        n +
        p20SchemaTableStatements([t], false)
          .flatMap((e) => e.sql)
          .filter((s) => /^CREATE (?:UNIQUE )?INDEX/i.test(s)).length,
      0,
    );
    expect(idxCount).toBe(17);
  });
});
