/**
 * P1.9 — Production schema hardening : `duels`, `class_assignments`,
 * `assignment_submissions` absentes de la base PostgreSQL de production
 * alors qu'elles figurent dans le SCHEMA (schema drift).
 *
 * Cause : initDb() ne rejoue le SCHEMA complet que si `users` manque ;
 * ces 3 tables ont été ajoutées au SCHEMA après la création de prod.
 * Correctif : bloc conditionnel to_regclass + statements générés depuis
 * SCHEMA via p19Statements() / toPgSchema (aucune duplication du DDL).
 *
 * Protocole : les tests s'exécutent sur une base SQLite EN MÉMOIRE
 * éphémère — aucune écriture sur data/edukora.db (dev), aucune écriture
 * en production, aucune fixture résiduelle possible.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { p19Statements, P19_TABLES, NO_ID_TABLES, toPgReturningId, queryOne } from "@/lib/db";

const PARENTS_DDL = `
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, password_hash TEXT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL);
CREATE TABLE subjects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);
CREATE TABLE classes (id INTEGER PRIMARY KEY AUTOINCREMENT, teacher_id INTEGER NOT NULL REFERENCES users(id), name TEXT NOT NULL, invite_code TEXT NOT NULL);
CREATE TABLE quizzes (id INTEGER PRIMARY KEY AUTOINCREMENT, subject_id INTEGER NOT NULL REFERENCES subjects(id), title TEXT NOT NULL);
`;

type MemDb = DatabaseSync;
const TABLES = ["duels", "class_assignments", "assignment_submissions"] as const;

function makeDb(): MemDb {
  const d = new DatabaseSync(":memory:");
  d.exec("PRAGMA foreign_keys = ON");
  d.exec(PARENTS_DDL);
  return d;
}

function execP19(d: MemDb, pg = false): void {
  for (const { sql } of p19Statements(pg)) {
    for (const stmt of sql) d.exec(stmt);
  }
}

function tableNames(d: MemDb): string[] {
  return (
    d
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name IN (?,?,?) ORDER BY name")
      .all(...TABLES) as { name: string }[]
  ).map((r) => r.name);
}

describe("P1.9 — migration des tables manquantes (base éphémère :memory:)", () => {
  test("T1 : les trois tables peuvent être créées depuis SCHEMA (+ dump PG si P19_DUMP=1)", () => {
    const d = makeDb();
    try {
      expect(tableNames(d)).toEqual([]);
      execP19(d);
      expect(tableNames(d)).toEqual(["assignment_submissions", "class_assignments", "duels"]);
      if (process.env.P19_DUMP === "1") {
        const out = path.join(os.tmpdir(), "p19-statements.json");
        fs.writeFileSync(out, JSON.stringify(p19Statements(true), null, 2), "utf8");
        expect(fs.existsSync(out)).toBe(true);
      }
    } finally {
      d.close();
    }
  });

  test("T2 : idempotence — 3 exécutions consécutives sans erreur", () => {
    const d = makeDb();
    try {
      for (let i = 0; i < 3; i++) {
        expect(() => execP19(d)).not.toThrow();
      }
      expect(tableNames(d)).toEqual(["assignment_submissions", "class_assignments", "duels"]);
      const idx = d
        .prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE type='index' AND name LIKE 'idx_%'")
        .get() as { n: number };
      expect(idx.n).toBeGreaterThanOrEqual(4);
    } finally {
      d.close();
    }
  });

  test("T3a : colonnes et PK conformes au DDL code", () => {
    const d = makeDb();
    try {
      execP19(d);
      const cols = (table: string) =>
        (d.prepare(`PRAGMA table_info(${table})`).all() as { name: string; pk: number; notnull: number }[])
          .map((c) => c.name);
      expect(cols("duels")).toEqual([
        "id", "challenger_id", "opponent_id", "quiz_id", "challenger_pct",
        "opponent_pct", "winner_id", "status", "created_at",
      ]);
      expect(cols("class_assignments")).toEqual([
        "id", "class_id", "title", "description", "subject_id", "deadline", "max_score", "created_at",
      ]);
      expect(cols("assignment_submissions")).toEqual([
        "assignment_id", "student_id", "content", "score", "feedback", "submitted_at",
      ]);
      const pk = (table: string) =>
        (d.prepare(`PRAGMA table_info(${table})`).all() as { name: string; pk: number }[])
          .filter((c) => c.pk > 0)
          .sort((a, b) => a.pk - b.pk)
          .map((c) => c.name);
      expect(pk("duels")).toEqual(["id"]);
      expect(pk("class_assignments")).toEqual(["id"]);
      expect(pk("assignment_submissions")).toEqual(["assignment_id", "student_id"]);
    } finally {
      d.close();
    }
  });

  test("T3b : FK et index conformes au DDL code", () => {
    const d = makeDb();
    try {
      execP19(d);
      const fks = (table: string) =>
        (d.prepare(`PRAGMA foreign_key_list(${table})`).all() as { table: string; from: string; to: string }[])
          .map((f) => `${f.from}->${f.table}(${f.to})`)
          .sort();
      expect(fks("duels")).toEqual([
        "challenger_id->users(id)", "opponent_id->users(id)", "quiz_id->quizzes(id)", "winner_id->users(id)",
      ]);
      expect(fks("class_assignments")).toEqual(["class_id->classes(id)", "subject_id->subjects(id)"]);
      expect(fks("assignment_submissions")).toEqual([
        "assignment_id->class_assignments(id)", "student_id->users(id)",
      ]);
      const idx = (table: string) =>
        (d.prepare(`PRAGMA index_list(${table})`).all() as { name: string; origin: string }[])
          .filter((i) => i.origin === "c")
          .map((i) => i.name)
          .sort();
      expect(idx("duels")).toEqual(["idx_duels_challenger", "idx_duels_opponent"]);
      expect(idx("class_assignments")).toEqual(["idx_class_assignments_class"]);
      expect(idx("assignment_submissions")).toEqual(["idx_assignment_submissions_student"]);
      const status = d.prepare("SELECT status FROM duels WHERE 0").all();
      expect(status).toEqual([]);
    } finally {
      d.close();
    }
  });

  test("T3c : statements PostgreSQL — conversion toPgSchema correcte, aucun DROP", () => {
    for (const { table, sql } of p19Statements(true)) {
      const all = sql.join("\n");
      expect(sql.length).toBeGreaterThan(0);
      expect(all).not.toMatch(/\bDROP\b/i);
      expect(all).not.toContain("AUTOINCREMENT");
      expect(all).not.toContain("datetime('now')");
      expect(all).toContain("CREATE TABLE IF NOT EXISTS");
      if (table === "duels" || table === "class_assignments") {
        expect(all).toContain("SERIAL PRIMARY KEY");
      }
      expect(all).toContain("FOREIGN KEY");
      expect(all).toContain("to_char(now()");
      expect(all).toMatch(/CREATE INDEX IF NOT EXISTS idx_/);
    }
    const subs = p19Statements(true).find((e) => e.table === "assignment_submissions")!;
    expect(subs.sql.join("\n")).toContain("PRIMARY KEY (assignment_id, student_id)");
    const duels = p19Statements(true).find((e) => e.table === "duels")!;
    expect(duels.sql.join("\n")).toContain("CHECK (status IN ('pending','done'))");
    const ordre = p19Statements(true).map((e) => e.table);
    expect(ordre.indexOf("class_assignments")).toBeLessThan(ordre.indexOf("assignment_submissions"));
  });

  test("T4 : duels — INSERT ... RETURNING id fonctionne (contrat run() P1.8)", () => {
    const d = makeDb();
    try {
      execP19(d);
      const uid1 = d.prepare("INSERT INTO users (password_hash, first_name, last_name) VALUES ('x','A','A')").run().lastInsertRowid;
      const uid2 = d.prepare("INSERT INTO users (password_hash, first_name, last_name) VALUES ('x','B','B')").run().lastInsertRowid;
      const sid = d.prepare("INSERT INTO subjects (name) VALUES ('S')").run().lastInsertRowid;
      const qid = d.prepare("INSERT INTO quizzes (subject_id, title) VALUES (?,'Q')").run(sid).lastInsertRowid;
      const row = d
        .prepare("INSERT INTO duels (challenger_id, opponent_id, quiz_id, status) VALUES (?, ?, ?, 'pending') RETURNING id")
        .get(uid1, uid2, qid) as { id: number };
      expect(typeof row.id).toBe("number");
      expect(row.id).toBeGreaterThan(0);
      const done = d.prepare("UPDATE duels SET status = 'done' WHERE id = ?").run(row.id);
      expect(done.changes).toBe(1);
      // contrat run() : RETURNING id doit être ajouté pour duels (possède id)
      const stmt = "INSERT INTO duels (challenger_id, opponent_id, quiz_id, status) VALUES (?, ?, ?, 'pending')";
      expect(toPgReturningId(stmt)).toBe(`${stmt} RETURNING id`);
      expect(NO_ID_TABLES.has("duels")).toBe(false);
    } finally {
      d.close();
    }
  });

  test("T5 : class_assignments — INSERT réel de la route prof accepté", () => {
    const d = makeDb();
    try {
      execP19(d);
      const uid = d.prepare("INSERT INTO users (password_hash, first_name, last_name) VALUES ('x','P','P')").run().lastInsertRowid;
      const cid = d.prepare("INSERT INTO classes (teacher_id, name, invite_code) VALUES (?,'C','INV')").run(uid).lastInsertRowid;
      // statement exact : src/app/api/prof/classes/[id]/assignments/route.ts:79
      d.prepare(
        "INSERT INTO class_assignments (class_id, title, description, subject_id, deadline, max_score) VALUES (?, ?, ?, ?, ?, ?)",
      ).run(cid, "Devoir P1.9", "desc", null, null, 20);
      const row = d.prepare("SELECT id, title, max_score FROM class_assignments WHERE class_id = ?").get(cid) as {
        id: number; title: string; max_score: number;
      };
      expect(row.title).toBe("Devoir P1.9");
      expect(row.max_score).toBe(20);
      expect(row.id).toBeGreaterThan(0);
      const del = d.prepare("DELETE FROM class_assignments WHERE id = ?").run(row.id);
      expect(del.changes).toBe(1);
    } finally {
      d.close();
    }
  });

  test("T6 : assignment_submissions — INSERT réel de submit + PK composite prouvée", () => {
    const d = makeDb();
    try {
      execP19(d);
      const uidT = d.prepare("INSERT INTO users (password_hash, first_name, last_name) VALUES ('x','T','T')").run().lastInsertRowid;
      const cid = d.prepare("INSERT INTO classes (teacher_id, name, invite_code) VALUES (?,'C','I2')").run(uidT).lastInsertRowid;
      const aid = d
        .prepare("INSERT INTO class_assignments (class_id, title, description, subject_id, deadline, max_score) VALUES (?, 'D', NULL, NULL, NULL, 20)")
        .run(cid).lastInsertRowid;
      const sid = d.prepare("INSERT INTO users (password_hash, first_name, last_name) VALUES ('x','E','E')").run().lastInsertRowid;
      // statement exact : src/app/api/classes/assignments/[id]/submit/route.ts:46
      d.prepare("INSERT INTO assignment_submissions (assignment_id, student_id, content) VALUES (?, ?, ?)").run(aid, sid, "réponse P19");
      const row = d.prepare("SELECT content FROM assignment_submissions WHERE assignment_id = ? AND student_id = ?").get(aid, sid) as {
        content: string;
      };
      expect(row.content).toBe("réponse P19");
      // PK (assignment_id, student_id) : doublon rejeté
      expect(() =>
        d.prepare("INSERT INTO assignment_submissions (assignment_id, student_id, content) VALUES (?, ?, ?)").run(aid, sid, "dup"),
      ).toThrow();
      // statement exact : prof/.../assignments/[aid]/route.ts:90
      const upd = d
        .prepare("UPDATE assignment_submissions SET score = ?, feedback = ?, submitted_at = submitted_at WHERE assignment_id = ? AND student_id = ?")
        .run(15, "bien", aid, sid);
      expect(upd.changes).toBe(1);
    } finally {
      d.close();
    }
  });

  test("T8 : NO_ID_TABLES — duels/class_assignments hors liste (possèdent id), assignment_submissions dedans", () => {
    expect(NO_ID_TABLES.has("duels")).toBe(false);
    expect(NO_ID_TABLES.has("class_assignments")).toBe(false);
    expect(NO_ID_TABLES.has("assignment_submissions")).toBe(true);
    expect(P19_TABLES).toEqual(["class_assignments", "assignment_submissions", "duels"]);
  });
});

describe("P1.9 — résidus (aucune écriture hors base éphémère)", () => {
  test("T7 : aucune écriture de fixture sur la base de développement", async () => {
    const r1 = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM duels");
    const r2 = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM class_assignments");
    const r3 = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM assignment_submissions");
    for (const r of [r1, r2, r3]) {
      expect(Number.isFinite(Number(r?.c))).toBe(true);
    }
    expect(await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM duels WHERE status = 'P19_TEST'")).toEqual({ c: 0 });
  });
});
