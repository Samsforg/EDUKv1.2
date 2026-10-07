/**
 * P1.8 — PostgreSQL INSERT integrity : tables sans colonne `id`.
 *
 * Classe de bugs : `run()` (db.ts) append ` RETURNING id` à tout INSERT
 * dont le nom de table est absent de NO_ID_TABLES. Sur une table sans
 * colonne `id`, PostgreSQL répond 42703 `column "id" does not exist`
 * (preuve P1.7 avec subject_grades). Ce test verrouille :
 *   1. la couverture de NO_ID_TABLES sur les 24 tables prod sans `id`,
 *   2. l'invariant pur `toPgReturningId` (RETURNING iff colonne id),
 *   3. le fait que `duels` (qui possède `id` dans son DDL) n'est PAS
 *      sur-listé,
 *   4. les 4 INSERT réels du bug (subject_grades, class_chapters,
 *      duels, spaced_reviews) qui continuent de passer sur SQLite.
 *
 * Protocole : fixtures en BEGIN IMMEDIATE + ROLLBACK (data-trust) sur la
 * base de développement — aucun résidu, aucune donnée fabriquée.
 */
import fs from "node:fs";
import path from "node:path";
import { run, queryOne, NO_ID_TABLES, toPgReturningId } from "@/lib/db";

const STAMP = `${process.pid}${Date.now()}${Math.floor(Math.random() * 1000)}`;

const DB_SRC = fs.readFileSync(path.join(process.cwd(), "src", "lib", "db.ts"), "utf8");

// Inventaire information_schema de la production au 06/10/2026 (P1.8) :
// les 24 tables du schéma public sans colonne `id`.
const PROD_NO_ID_TABLES = [
  "class_chapters",
  "class_students",
  "daily_challenges",
  "forum_votes",
  "growth_metrics",
  "idempotency_keys",
  "league_challenge_progress",
  "lesson_reads",
  "live_blocked_users",
  "live_registrations",
  "parent_notification_settings",
  "password_resets",
  "rate_limits",
  "reminder_settings",
  "revoked_sessions",
  "saved_lessons",
  "sessions",
  "spaced_reviews",
  "subject_grades",
  "teacher_grades",
  "teacher_subjects",
  "user_badges",
  "user_progress",
  "webhook_events",
];

describe("Couverture de NO_ID_TABLES", () => {
  test("T1 : les deux tables corrigées P1.8 sont dans NO_ID_TABLES", () => {
    expect(NO_ID_TABLES.has("class_chapters")).toBe(true);
    expect(NO_ID_TABLES.has("spaced_reviews")).toBe(true);
    expect(NO_ID_TABLES.has("subject_grades")).toBe(true);
    expect(NO_ID_TABLES.has("growth_metrics")).toBe(true);
  });

  test("T2 : toutes les tables sans colonne id de la production sont couvertes", () => {
    const missing = PROD_NO_ID_TABLES.filter((t) => !NO_ID_TABLES.has(t));
    expect(missing).toEqual([]);
  });

  test("T3 : duels possède une colonne id dans son DDL et n'est PAS sur-listé", () => {
    const duelBlock = DB_SRC.slice(
      DB_SRC.indexOf("CREATE TABLE IF NOT EXISTS duels"),
      DB_SRC.indexOf("CREATE TABLE IF NOT EXISTS duels") + 400,
    );
    expect(duelBlock).toMatch(/id INTEGER PRIMARY KEY AUTOINCREMENT/);
    expect(NO_ID_TABLES.has("duels")).toBe(false);
  });
});

describe("toPgReturningId — invariant RETURNING id (fonction pure)", () => {
  test("T4 : INSERT sur table sans id couverte → SQL strictement inchangé", () => {
    const classChapters = `INSERT INTO class_chapters (class_id, chapter_id, scheduled_at, status)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(class_id, chapter_id) DO UPDATE SET scheduled_at = excluded.scheduled_at, status = excluded.status`;
    const spacedReviews = `INSERT INTO spaced_reviews (user_id, quiz_id, repetitions, interval_days, ease_factor, due_at, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now', '+' || ? || ' days'), datetime('now'))
     ON CONFLICT(user_id, quiz_id) DO UPDATE SET
       repetitions = excluded.repetitions,
       interval_days = excluded.interval_days,
       ease_factor = excluded.ease_factor,
       due_at = excluded.due_at,
       updated_at = datetime('now')`;
    const subjectGrades =
      "INSERT INTO subject_grades (subject_id, grade_id, coefficient) VALUES (?, ?, ?) ON CONFLICT(subject_id, grade_id) DO UPDATE SET coefficient = excluded.coefficient";
    for (const sql of [classChapters, spacedReviews, subjectGrades]) {
      expect(toPgReturningId(sql)).toBe(sql);
      expect(toPgReturningId(sql)).not.toContain("RETURNING id");
    }
  });

  test("T5 : INSERT sur table avec id → RETURNING id ajouté (point-virgule final retiré)", () => {
    const users = "INSERT INTO users (role, email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?)";
    const out = toPgReturningId(users);
    expect(out.endsWith(" RETURNING id")).toBe(true);
    expect(out).not.toContain("; RETURNING id");

    const duels = "INSERT INTO duels (challenger_id, opponent_id, quiz_id, status) VALUES (?, ?, ?, 'pending')";
    expect(toPgReturningId(duels)).toBe(`${duels} RETURNING id`);

    const semicolon = "INSERT INTO chapters (subject_id, grade_id, code, title) VALUES (?, ?, ?, ?);";
    expect(toPgReturningId(semicolon)).toBe(
      "INSERT INTO chapters (subject_id, grade_id, code, title) VALUES (?, ?, ?, ?) RETURNING id",
    );

    // préfixe de schéma : c'est la TABLE qui décide, pas le préfixe
    expect(toPgReturningId("INSERT INTO public.users (email) VALUES (?)")).toBe(
      "INSERT INTO public.users (email) VALUES (?) RETURNING id",
    );
  });

  test("T6 : non-INSERT (SELECT/UPDATE/DELETE/CREATE) et INSERT OR IGNORE → inchangés", () => {
    const unchanged = [
      "SELECT id FROM users WHERE id = ?",
      "UPDATE duels SET challenger_pct = ? WHERE id = ?",
      "DELETE FROM class_chapters WHERE class_id = ? AND chapter_id = ?",
      "CREATE TABLE IF NOT EXISTS spaced_reviews (user_id INTEGER NOT NULL, PRIMARY KEY (user_id, quiz_id))",
      "INSERT OR IGNORE INTO revoked_sessions (token_hash, user_id) VALUES (?, ?)",
      "INSERT INTO public.spaced_reviews (user_id, quiz_id) VALUES (?, ?)",
    ];
    for (const sql of unchanged) {
      expect(toPgReturningId(sql)).toBe(sql);
    }
  });
});

type Fixture = {
  gradeId: number;
  subjectId: number;
  userId: number;
  opponentId: number;
  chapterId: number;
  classId: number;
  quizId: number;
};

async function ensureP18Tables(): Promise<void> {
  await run(`CREATE TABLE IF NOT EXISTS class_chapters (
    class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
    scheduled_at TEXT,
    status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned','active','completed')),
    PRIMARY KEY (class_id, chapter_id)
  )`);
  await run(`CREATE TABLE IF NOT EXISTS spaced_reviews (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    repetitions INTEGER NOT NULL DEFAULT 0,
    interval_days INTEGER NOT NULL DEFAULT 1,
    ease_factor REAL NOT NULL DEFAULT 2.5,
    due_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, quiz_id)
  )`);
  await run(`CREATE TABLE IF NOT EXISTS subject_grades (
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
    coefficient REAL NOT NULL DEFAULT 1,
    PRIMARY KEY (subject_id, grade_id)
  )`);
  await run(`CREATE TABLE IF NOT EXISTS duels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenger_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    opponent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    challenger_pct INTEGER,
    opponent_pct INTEGER,
    winner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','done')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
}

async function makeFixture(): Promise<Fixture> {
  await ensureP18Tables();
  const g = await run(
    "INSERT INTO grades (code, name, cycle, order_index) VALUES (?, ?, 'lycee', 9999)",
    `p18g_${STAMP}`,
    "P1.8 Grade",
  );
  const gradeId = Number(g.lastInsertRowid);
  const s = await run(
    "INSERT INTO subjects (code, name, icon, color, coefficient_json) VALUES (?, ?, 'book', '#1976d2', '{}')",
    `p18s_${STAMP}`,
    "P1.8 Subject",
  );
  const subjectId = Number(s.lastInsertRowid);
  const u1 = await run(
    "INSERT INTO users (role, email, password_hash, first_name, last_name, is_test) VALUES ('student', ?, 'x', 'P18', 'Fixture', 1)",
    `p18a_${STAMP}@test.local`,
  );
  const u2 = await run(
    "INSERT INTO users (role, email, password_hash, first_name, last_name, is_test) VALUES ('student', ?, 'x', 'P18', 'Fixture2', 1)",
    `p18b_${STAMP}@test.local`,
  );
  const ch = await run(
    "INSERT INTO chapters (subject_id, grade_id, code, title) VALUES (?, ?, ?, ?)",
    subjectId,
    gradeId,
    `p18ch_${STAMP}`,
    "P1.8 Chapitre",
  );
  const cl = await run(
    "INSERT INTO classes (teacher_id, name, invite_code) VALUES (?, ?, ?)",
    Number(u1.lastInsertRowid),
    "P1.8 Classe",
    `P18${STAMP}`,
  );
  const q = await run(
    "INSERT INTO quizzes (subject_id, title) VALUES (?, ?)",
    subjectId,
    "P1.8 Quiz",
  );
  return {
    gradeId,
    subjectId,
    userId: Number(u1.lastInsertRowid),
    opponentId: Number(u2.lastInsertRowid),
    chapterId: Number(ch.lastInsertRowid),
    classId: Number(cl.lastInsertRowid),
    quizId: Number(q.lastInsertRowid),
  };
}

describe("INSERT réels — les 4 tables du bug passent (fixtures SQLite ROLLBACK)", () => {
  test("T7a : class_chapters (PK composite, sans id) → changes = 1", async () => {
    await run("BEGIN IMMEDIATE");
    try {
      const f = await makeFixture();
      const r = await run(
        `INSERT INTO class_chapters (class_id, chapter_id, scheduled_at, status)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(class_id, chapter_id) DO UPDATE SET scheduled_at = excluded.scheduled_at, status = excluded.status`,
        f.classId,
        f.chapterId,
        "2026-10-06 08:00:00",
        "planned",
      );
      expect(r.changes).toBe(1);
    } finally {
      await run("ROLLBACK");
    }
  });

  test("T7b : spaced_reviews (PK composite, sans id) → changes = 1", async () => {
    await run("BEGIN IMMEDIATE");
    try {
      const f = await makeFixture();
      const r = await run(
        `INSERT INTO spaced_reviews (user_id, quiz_id, repetitions, interval_days, ease_factor, due_at, updated_at)
         VALUES (?, ?, ?, ?, ?, datetime('now', '+' || ? || ' days'), datetime('now'))
         ON CONFLICT(user_id, quiz_id) DO UPDATE SET
           repetitions = excluded.repetitions,
           interval_days = excluded.interval_days,
           ease_factor = excluded.ease_factor,
           due_at = excluded.due_at,
           updated_at = datetime('now')`,
        f.userId,
        f.quizId,
        0,
        3,
        2.5,
        3,
      );
      expect(r.changes).toBe(1);
    } finally {
      await run("ROLLBACK");
    }
  });

  test("T7c : duels (possède id, hors liste) → changes = 1 ET rowid SQLite renvoyé", async () => {
    await run("BEGIN IMMEDIATE");
    try {
      const f = await makeFixture();
      const r = await run(
        "INSERT INTO duels (challenger_id, opponent_id, quiz_id, status) VALUES (?, ?, ?, 'pending')",
        f.userId,
        f.opponentId,
        f.quizId,
      );
      expect(r.changes).toBe(1);
      expect(r.lastInsertRowid).not.toBeNull();
    } finally {
      await run("ROLLBACK");
    }
  });

  test("T7d : subject_grades (PK composite, sans id, régression P1.7) → changes = 1", async () => {
    await run("BEGIN IMMEDIATE");
    try {
      const f = await makeFixture();
      const r = await run(
        "INSERT INTO subject_grades (subject_id, grade_id, coefficient) VALUES (?, ?, ?) ON CONFLICT(subject_id, grade_id) DO UPDATE SET coefficient = excluded.coefficient",
        f.subjectId,
        f.gradeId,
        3,
      );
      expect(r.changes).toBe(1);
    } finally {
      await run("ROLLBACK");
    }
  });

  test("T8 : résidus — aucune fixture p18* ne survit au rollback", async () => {
    const residue = await queryOne<{ c: number }>(
      `SELECT (SELECT COUNT(*) FROM subjects WHERE code LIKE 'p18\\_%' ESCAPE '\\' AND code LIKE '%${STAMP}') +
              (SELECT COUNT(*) FROM grades WHERE code LIKE 'p18\\_%' ESCAPE '\\' AND code LIKE '%${STAMP}') +
              (SELECT COUNT(*) FROM users WHERE email LIKE '%${STAMP}@test.local') +
              (SELECT COUNT(*) FROM chapters WHERE code = 'p18ch_${STAMP}') +
              (SELECT COUNT(*) FROM classes WHERE invite_code = 'P18${STAMP}') AS c`,
    );
    expect(Number(residue?.c ?? 0)).toBe(0);
  });
});
