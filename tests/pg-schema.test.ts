import { toPgSchema, NO_ID_TABLES } from "../src/lib/db";

describe("toPgSchema — classes migration", () => {
  it("generates valid PG statements from SQLite schema", () => {
    const sql = `
CREATE TABLE IF NOT EXISTS classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject_id INTEGER REFERENCES subjects(id),
  grade_id INTEGER REFERENCES grades(id),
  invite_code TEXT NOT NULL UNIQUE,
  year TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS class_students (
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (class_id, user_id)
);
`;
    const pg = toPgSchema(sql);
    expect(pg).toContain("SERIAL PRIMARY KEY");
    expect(pg).toContain("DEFAULT (now())");
    expect(pg).toContain("CREATE TABLE IF NOT EXISTS class_students");
    expect(pg).toContain("FOREIGN KEY");
    expect(pg).not.toContain("AUTOINCREMENT");
    expect(pg).not.toContain("datetime('now')");
  });

  it("class_students is in NO_ID_TABLES (composite PK, no RETURNING id on insert)", () => {
    expect(NO_ID_TABLES.has("class_students")).toBe(true);
  });

  it("assignment_submissions is in NO_ID_TABLES (composite PK)", () => {
    expect(NO_ID_TABLES.has("assignment_submissions")).toBe(true);
  });

  it("class_assignments includes new columns", () => {
    const sql = `
CREATE TABLE IF NOT EXISTS class_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  subject_id INTEGER REFERENCES subjects(id),
  deadline TEXT,
  max_score INTEGER NOT NULL DEFAULT 20,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS assignment_submissions (
  assignment_id INTEGER NOT NULL REFERENCES class_assignments(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  score REAL,
  feedback TEXT,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (assignment_id, student_id)
);
`;
    const pg = toPgSchema(sql);
    expect(pg).toContain("class_assignments");
    expect(pg).toContain("assignment_submissions");
    expect(pg).toContain("SERIAL PRIMARY KEY");
    expect(pg).toContain("PRIMARY KEY (assignment_id, student_id)");
  });

  it("notifications.type (dedup key) survives toPgSchema without DEFAULT", () => {
    const sql = `
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'notifications',
  type TEXT,
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;
    const pg = toPgSchema(sql);
    expect(pg).toContain("type TEXT");
    expect(pg).toContain("CREATE TABLE IF NOT EXISTS notifications");
  });
});