/**
 * P2.0 B — robustesse de l'initialisation SQLite/dev.
 *
 * Reproduit le flux imposé par la phase :
 *   données historiques incohérentes → initialisation DB → comportement
 *   attendu documenté → schéma disponible.
 *
 * Incident P1.9 : `uniq_active_sub` violé par 2 abonnements actifs
 * historiques bloquait `db.exec(SCHEMA)` → tables suivantes (dont duels)
 * jamais créées. Ici : exécution statement par statement (une erreur ne
 * bloque jamais la suite) + réparation déterministe, non destructive et
 * explicite (UPDATE → 'cancelled', le plus récent par user conservé).
 */
import { DatabaseSync } from "node:sqlite";
import { p20SplitSqlStatements, p20ExecSchemaRobust } from "@/lib/db";

const MINI_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('active','cancelled')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_sub ON subscriptions(user_id) WHERE status = 'active';

CREATE TABLE IF NOT EXISTS duels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenger_id INTEGER NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS class_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
);
`;

const tableNames = (d: DatabaseSync): string[] =>
  (d
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
    .all() as { name: string }[])
    .map((r) => r.name);

describe("P2.0 B — initialisation SQLite robuste", () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => {
    warnSpy.mockRestore();
  });

  test("T-B1 : découpe SQL correcte — un ';' dans un littéral ne coupe pas", () => {
    const stmts = p20SplitSqlStatements(
      "CREATE TABLE t (a TEXT DEFAULT 'x;y'); CREATE TABLE u (b TEXT DEFAULT 'ok');",
    );
    expect(stmts).toHaveLength(2);
    expect(stmts[0]).toContain("'x;y'");
    expect(stmts[1]).toContain("CREATE TABLE u");
    expect(p20SplitSqlStatements("SELECT 1")).toEqual(["SELECT 1"]);
    expect(p20SplitSqlStatements("SELECT '' ; SELECT 2")).toHaveLength(2);
  });

  test("T-B2 : initialisation vierge → tout est créé, 0 ignoré, 0 réparé", () => {
    const d = new DatabaseSync(":memory:");
    try {
      const res = p20ExecSchemaRobust(d, MINI_SCHEMA);
      expect(res.skipped).toEqual([]);
      expect(res.repaired).toBe(0);
      expect(res.executed).toBe(p20SplitSqlStatements(MINI_SCHEMA).length);
      expect(tableNames(d)).toEqual(["class_assignments", "duels", "subscriptions", "users"]);
      const idx = d
        .prepare("SELECT name FROM sqlite_master WHERE type='index' AND name='uniq_active_sub'")
        .all();
      expect(idx).toHaveLength(1);
    } finally {
      d.close();
    }
  });

  test("T-B3 : initialisation avec données existantes → idempotent, données intactes", () => {
    const d = new DatabaseSync(":memory:");
    try {
      p20ExecSchemaRobust(d, MINI_SCHEMA);
      d.prepare("INSERT INTO users (email) VALUES ('a@b.c')").run();
      const before = d.prepare("SELECT * FROM subscriptions").all();
      const res = p20ExecSchemaRobust(d, MINI_SCHEMA);
      expect(res.skipped).toEqual([]);
      expect(res.repaired).toBe(0);
      expect(d.prepare("SELECT * FROM subscriptions").all()).toEqual(before);
      expect(tableNames(d)).toEqual(["class_assignments", "duels", "subscriptions", "users"]);
    } finally {
      d.close();
    }
  });

  test("T-B4 : incohérence historique → init → réparation explicite → schéma disponible", () => {
    const d = new DatabaseSync(":memory:");
    try {
      p20ExecSchemaRobust(d, MINI_SCHEMA);
      const u = d.prepare("INSERT INTO users (email) VALUES ('dup@test.fr')").run().lastInsertRowid;
      // Suppression de l'index AVANT les inserts pour rejouer le conflit comme dans l'incident.
      d.exec("DROP INDEX uniq_active_sub");
      d.prepare("INSERT INTO subscriptions (user_id, status) VALUES (?, 'active')").run(u);
      const recent = Number(
        d.prepare("INSERT INTO subscriptions (user_id, status) VALUES (?, 'active')").run(u).lastInsertRowid,
      );
      const res = p20ExecSchemaRobust(d, MINI_SCHEMA);

      // Comportement attendu documenté :
      expect(res.repaired).toBe(1);
      expect(res.skipped).toEqual([]);
      const rows = d.prepare("SELECT id, status FROM subscriptions ORDER BY id").all() as {
        id: number; status: string;
      }[];
      expect(rows).toHaveLength(2);
      expect(rows[rows.length - 1].id).toBe(recent);
      expect(rows[rows.length - 1].status).toBe("active");
      expect(rows.filter((r) => r.status === "cancelled")).toHaveLength(1);
      expect(warnSpy.mock.calls.flat().join("\n")).toContain("uniq_active_sub");
      expect(warnSpy.mock.calls.flat().join("\n")).toContain("cancelled");
      // Schéma disponible : index rétabli + tables APRÈS l'index créées.
      expect(
        d.prepare("SELECT name FROM sqlite_master WHERE type='index' AND name='uniq_active_sub'").all(),
      ).toHaveLength(1);
      expect(tableNames(d)).toEqual(["class_assignments", "duels", "subscriptions", "users"]);
      // Aucune donnée supprimée.
      expect(d.prepare("SELECT COUNT(*) AS n FROM subscriptions").get()).toEqual({ n: 2 });
      expect(d.prepare("SELECT COUNT(*) AS n FROM users").get()).toEqual({ n: 1 });
    } finally {
      d.close();
    }
  });

  test("T-B5 : échec non réparable → loggé, tables suivantes créées quand même", () => {
    const d = new DatabaseSync(":memory:");
    try {
      const bad = `
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT);
CREATE INDEX idx_bad ON table_inexistante(col);
CREATE TABLE duels (id INTEGER PRIMARY KEY AUTOINCREMENT);
`;
      const res = p20ExecSchemaRobust(d, bad);
      expect(res.skipped).toHaveLength(1);
      expect(res.skipped[0].error).toMatch(/no such table/i);
      expect(tableNames(d)).toEqual(["duels", "users"]);
      expect(warnSpy.mock.calls.flat().join("\n")).toContain("statement SCHEMA ignoré");
    } finally {
      d.close();
    }
  });
});
