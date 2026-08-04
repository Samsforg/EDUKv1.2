import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { ensureReady } from "./init";
import { Pool } from "pg";

export const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
export const isVercel = !!process.env.VERCEL;
export const IS_PG = !!process.env.DATABASE_URL && !isBuildPhase;

const NO_ID_TABLES = new Set([
  "league_challenge_progress",
  "live_registrations",
  "live_blocked_users",
  "user_badges",
  "favorites",
  "forum_votes",
  "saved_lessons",
  "lesson_reads",
  "challenge_contributions",
  "parent_child",
  "pairing_codes",
]);

const UNIT_MAP: Record<string, string> = {
  year: "years",
  month: "months",
  day: "days",
  hour: "hours",
  minute: "minutes",
  second: "seconds",
  week: "weeks",
};

const DATE_CONCAT_COL_RE = /datetime\(\s*([^,]+?)\s*,\s*'(-|\+)'.*\)/g;
const DATETIME_NOW_RE = /datetime\(\s*'now'[^)]*\)/g;
const DATE_ONLY_RE = /date\(\s*'now'\s*\)/g;

export function toPgDatetime(value: string): string {
  if (!value.includes("datetime('now") && !value.includes("date('now")) {
    return value;
  }
  let out = value;
  out = out.replace(DATE_CONCAT_COL_RE, (_m, col, sign, expr, unit) => {
    const u = unit.trim().replace(/^'+|'+$/g, "");
    const pgUnit = UNIT_MAP[u] || u;
    const s = sign === "-" ? "-" : "+";
    return `(${col}${s}(${expr}) * interval '1 ${pgUnit}')`;
  });
  out = out.replace(DATETIME_NOW_RE, (m) => {
    const args = m
      .slice("datetime('now'".length, -1)
      .split(",")
      .map((s) => s.trim());
    let result = "now()";
    for (const arg of args) {
      if (!arg) continue;
      const match = arg.match(/^'([+-]\d+)\s*(\w+)'$/);
      if (match) {
        const sign = match[1].startsWith("-") ? "-" : "+";
        const amount = Math.abs(parseInt(match[1], 10));
        const unit = UNIT_MAP[match[2]] || match[2];
        result += `${sign} interval '${amount} ${unit}'`;
      }
    }
    return result;
  });
  out = out.replace(DATE_ONLY_RE, "to_char(now(), 'YYYY-MM-DD')");
  return out;
}

let pool: Pool | null = null;
function getPool(): Pool {
  if (!IS_PG) throw new Error("pg mode disabled");
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      ssl: { rejectUnauthorized: false },
    });
    pool.on("error", (err) => {
      if (process.env.NODE_ENV !== "test") console.error("pg pool error:", err);
    });
  }
  return pool;
}

const db = isBuildPhase
  ? new DatabaseSync(":memory:")
  : (() => {
      const dataDir = isVercel
        ? path.join("/tmp", "edukora-data")
        : path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      return new DatabaseSync(path.join(dataDir, "edukora.db"));
    })();
if (!IS_PG) {
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec("PRAGMA busy_timeout = 10000;");
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS series (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','teacher','admin','parent','expert')),
  email TEXT,
  phone TEXT,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  serie_id INTEGER REFERENCES series(id),
  class_level TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_active TEXT,
  referral_code TEXT UNIQUE,
  referred_by INTEGER REFERENCES users(id),
  commune TEXT,
  blocked INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quizzes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_id INTEGER NOT NULL REFERENCES subjects(id),
  chapter_id INTEGER REFERENCES chapters(id),
  title TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS exam_papers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL CHECK (category IN ('BAC','BEPC')),
  series_id INTEGER REFERENCES series(id),
  subject_id INTEGER NOT NULL REFERENCES subjects(id),
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 120,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  paper_id INTEGER REFERENCES exam_papers(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT NOT NULL,
  answer_index INTEGER NOT NULL,
  explanation TEXT,
  points INTEGER NOT NULL DEFAULT 1,
  position INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 0,
  answers TEXT NOT NULL DEFAULT '[]',
  completed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS exam_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  paper_id INTEGER NOT NULL REFERENCES exam_papers(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  score_over_20 REAL NOT NULL DEFAULT 0,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  completed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id INTEGER NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS tutor_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  chat_id INTEGER,
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS password_resets (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('quiz','paper')),
  item_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id, item_type, item_id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'notifications',
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS saved_lessons (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS lesson_reads (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  read_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS forum_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'forum',
  color TEXT NOT NULL DEFAULT '#0047ab',
  description TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS forum_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES forum_categories(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS forum_replies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS forum_votes (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, post_id)
);

CREATE TABLE IF NOT EXISTS promo_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL DEFAULT 'percent' CHECK (discount_type IN ('percent','fixed')),
  discount_value REAL NOT NULL DEFAULT 0,
  max_uses INTEGER NOT NULL DEFAULT 1,
  used_count INTEGER NOT NULL DEFAULT 0,
  starts_at TEXT,
  expires_at TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS disputes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','resolved')),
  resolution TEXT,
  resolved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS proctoring_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  paper_id INTEGER NOT NULL REFERENCES exam_papers(id) ON DELETE CASCADE,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  ended_at TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','ended'))
);

CREATE TABLE IF NOT EXISTS proctoring_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES proctoring_sessions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'National',
  commune_a TEXT NOT NULL,
  commune_b TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  reward_desc TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','active','ended')),
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS challenge_contributions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenge_id INTEGER NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  side TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS live_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Sciences',
  animator_name TEXT NOT NULL,
  animator_title TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','live','ended')),
  starts_at TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  viewers INTEGER NOT NULL DEFAULT 0,
  gradient TEXT NOT NULL DEFAULT 'from-primary to-secondary'
);

CREATE TABLE IF NOT EXISTS live_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS live_resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'PDF',
  size_mb REAL NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS live_moments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  time_label TEXT NOT NULL,
  label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS live_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS live_registrations (
  session_id INTEGER NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (session_id, user_id)
);

CREATE TABLE IF NOT EXISTS live_blocked_users (
  session_id INTEGER NOT NULL REFERENCES live_sessions(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (session_id, user_id)
);

CREATE TABLE IF NOT EXISTS league_challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ligue TEXT NOT NULL,
  title TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'flag',
  color TEXT NOT NULL DEFAULT 'primary',
  description TEXT NOT NULL DEFAULT '',
  goal_type TEXT NOT NULL,
  goal_value INTEGER NOT NULL DEFAULT 1,
  reward_type TEXT NOT NULL DEFAULT 'xp' CHECK (reward_type IN ('xp','badge')),
  reward_label TEXT NOT NULL DEFAULT '',
  reward_value TEXT NOT NULL DEFAULT '0'
);

CREATE TABLE IF NOT EXISTS league_challenge_progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id INTEGER NOT NULL REFERENCES league_challenges(id) ON DELETE CASCADE,
  progress INTEGER NOT NULL DEFAULT 0,
  completed INTEGER NOT NULL DEFAULT 0,
  completed_at TEXT,
  PRIMARY KEY (user_id, challenge_id)
);

CREATE TABLE IF NOT EXISTS grades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  cycle TEXT NOT NULL CHECK (cycle IN ('college','lycee')),
  order_index INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'book',
  color TEXT NOT NULL DEFAULT '#1976d2',
  coefficient_json TEXT DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS chapters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  order_index INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0,
  officiel_ref TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT DEFAULT '',
  content TEXT DEFAULT '',
  content_md TEXT DEFAULT '',
  content_html TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  duration_min INTEGER NOT NULL DEFAULT 15,
  difficulty INTEGER NOT NULL DEFAULT 1 CHECK (difficulty IN (1,2,3)),
  prerequisites TEXT DEFAULT '[]',
  is_premium INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('qcm','ouvert','calcul','dissertation','vrai_faux')),
  question_md TEXT NOT NULL,
  answer_md TEXT NOT NULL,
  explanation_md TEXT DEFAULT '',
  difficulty INTEGER NOT NULL DEFAULT 1 CHECK (difficulty IN (1,2,3)),
  points INTEGER NOT NULL DEFAULT 1,
  tags TEXT DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS user_progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed INTEGER NOT NULL DEFAULT 0,
  score INTEGER DEFAULT 0,
  time_spent_min INTEGER DEFAULT 0,
  completed_at TEXT,
  PRIMARY KEY (user_id, lesson_id)
);

 CREATE TABLE IF NOT EXISTS push_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, endpoint)
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  reset_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS subscription_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  interval TEXT NOT NULL CHECK (interval IN ('month','quarter','year')),
  price_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'XOF',
  features TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER NOT NULL REFERENCES subscription_plans(id),
  provider TEXT NOT NULL DEFAULT 'geniuspay',
  provider_subscription_id TEXT,
  provider_customer_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('incomplete','incomplete_expired','trial','active','past_due','cancelled','unpaid','no_default_provided','deleted')),
  started_at TEXT,
  end_at TEXT,
  cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
`;

export function getDb() {
  return db;
}

export type SqlParam = string | number | null | bigint | Uint8Array;

export function toPgPlaceholders(sql: string): string {
  let out = "";
  let i = 0;
  let j = 1;
  const n = sql.length;
  while (i < n) {
    const c = sql[i];
    if (c === "'") {
        out += "''";
        i += 2;
        continue;
      }
      out += c;
      i++;
      while (i < n) {
        if (sql[i] === "\\") {
          out += sql[i] + sql[i + 1];
          i += 2;
          continue;
        }
        if (sql[i] === "'") {
          if (sql[i + 1] === "'") {
            out += "''";
            i += 2;
            continue;
          }
          out += sql[i];
          i++;
          break;
        }
        out += sql[i];
        i++;
      }
      continue;
    }
    if (c === "?") {
      out += "$" + j;
      j++;
    } else {
      out += c;
    }
    i++;
  }
  return out;
}

export function toPgSchema(schema: string): string {
  return schema
    .replace(/\bINTEGER PRIMARY KEY AUTOINCREMENT\b/g, "SERIAL PRIMARY KEY")
    .replace(/\bAUTOINCREMENT\b/g, "SERIAL")
    .replace(/DEFAULT \(datetime\('now'\)\)/g, "DEFAULT (now())")
    .replace(/datetime\('now'[^)]*\)/g, (m) => toPgDatetime(m));
}

export async function initDb() {
  await ensureReady();
  if (IS_PG) {
    const pool = getPool();
    const schema = toPgSchema(SCHEMA);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const stmt of schema.split(";")) {
        const trimmed = stmt.trim();
        if (trimmed) await client.query(trimmed);
      }
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
    return;
  }
  db.exec(SCHEMA);
}

export async function query<T = unknown>(sql: string, ...params: SqlParam[]): Promise<T[]> {
  await ensureReady();
  if (IS_PG) {
    const pool = getPool();
    const r = await pool.query(toPgPlaceholders(sql), params as any);
    return r.rows as T[];
  }
  return db.prepare(sql).all(...(params as any[])) as T[];
}

export async function queryOne<T = unknown>(sql: string, ...params: SqlParam[]): Promise<T | undefined> {
  await ensureReady();
  if (IS_PG) {
    const pool = getPool();
    const r = await pool.query(toPgPlaceholders(sql), params as any);
    return r.rowCount ? (r.rows[0] as T) : undefined;
  }
  return db.prepare(sql).get(...(params as any[])) as T | undefined;
}

export async function run(sql: string, ...params: SqlParam[]): Promise<{ lastInsertRowid: number | null; changes: number }> {
  await ensureReady();
  if (IS_PG) {
    const pool = getPool();
    const r = await pool.query(toPgPlaceholders(sql), params as any);
    const row = r.rows?.[0] || {};
    return {
      lastInsertRowid: row.last_insert_rowid ?? row.inserted_id ?? null,
      changes: r.rowCount ?? 0,
    };
  }
  const res = db.prepare(sql).run(...(params as any[]));
  return { lastInsertRowid: res.lastInsertRowid as number | null, changes: res.changes };
}

export { db, IS_PG, NO_ID_TABLES, toPgDatetime, toPgPlaceholders, toPgSchema };
