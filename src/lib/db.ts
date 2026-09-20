import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { ensureReady } from "./init";
import { Pool, types as pgTypes } from "pg";

// node-pg renvoie BIGINT (int8, dont COUNT(*)) en string par défaut,
// ce qui cassait les comparaisons strictes en PG ("0" === 0 est false).
pgTypes.setTypeParser(20, (v) => Number(v));

export const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
export const isVercel = !!process.env.VERCEL;
export const IS_PG = !!process.env.DATABASE_URL && !isBuildPhase;

let insideInit = false;
export function isInsideInit(): boolean {
  return insideInit;
}
export function setInsideInit(v: boolean): void {
  insideInit = v;
}

const NO_ID_TABLES = new Set([
  "league_challenge_progress",
  "live_registrations",
  "live_blocked_users",
  "user_badges",
  "forum_votes",
  "saved_lessons",
  "lesson_reads",
  "password_resets",
  "sessions",
  "revoked_sessions",
  "user_progress",
  "rate_limits",
  "reminder_settings",
  "parent_notification_settings",
  "class_students",
  "assignment_submissions",
  "daily_challenges",
  "teacher_subjects",
  "teacher_grades",
  "idempotency_keys",
  "webhook_events",
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

const MAKE_INTERVAL_UNIT: Record<string, string> = {
  years: "years",
  months: "months",
  weeks: "weeks",
  days: "days",
  hours: "hours",
  minutes: "mins",
  seconds: "secs",
};

const DATETIME_NOW_RE = /datetime\(\s*'now'[^)]*\)/g;
const DATE_ONLY_RE = /date\(\s*'now'\s*\)/g;

async function withPgRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e: unknown) {
      const code = e && typeof e === "object" && "code" in e ? (e as { code: string }).code : undefined;
      const transient =
        code === "ECONNRESET" || code === "ETIMEDOUT" || code === "ECONNREFUSED" || code === "57P01";
      if (!transient || i === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw new Error("unreachable");
}

export function toPgDatetime(value: string): string {
  if (!value.includes("datetime('now") && !value.includes("date('now")) {
    return value;
  }
  let out = value;
  // Patterns concaténés : datetime('now', '-' || $N || ' hours') -> now() - make_interval(...)
  // (le split par virgule ci-dessous avalerait le placeholder $N du SQL).
  out = out.replace(
    /datetime\(\s*'now'\s*,\s*'[+-]'\s*\|\|\s*(\$\d+|\?)\s*\|\|\s*' ?(\w+)'\s*\)/g,
    (_m, ph: string, unit: string) => {
      const plural = MAKE_INTERVAL_UNIT[unit] || unit;
      return `(now() - make_interval(${plural} => ${ph}))`;
    },
  );
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
  out = out.replace(/\b([a-z_][a-z0-9_]*)\s*(>=|<=|>|<)\s*now\(\)/gi, "$1::timestamptz $2 now()");
  return out;
}

let pool: Pool | null = null;
function getPool(): Pool {
  if (!IS_PG) throw new Error("pg mode disabled");
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      ssl: process.env.DATABASE_SSL_DISABLED === "true"
        ? undefined
        : { rejectUnauthorized: true },
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
  gender TEXT,
  avatar_url TEXT,
  goal TEXT,
  seen_onboarding INTEGER NOT NULL DEFAULT 0,
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
  type TEXT,
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

CREATE INDEX IF NOT EXISTS idx_lesson_reads_user_readat ON lesson_reads (user_id, lesson_id, read_at);

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

CREATE TABLE IF NOT EXISTS user_consents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
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
  officiel_ref TEXT DEFAULT '',
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
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
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'approved'
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

CREATE TABLE IF NOT EXISTS teacher_subjects (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, subject_id)
);

CREATE TABLE IF NOT EXISTS teacher_grades (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, grade_id)
);

CREATE INDEX IF NOT EXISTS idx_class_assignments_class ON class_assignments (class_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_student ON assignment_submissions (student_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes (teacher_id);
CREATE INDEX IF NOT EXISTS idx_class_students_user ON class_students (user_id);
CREATE INDEX IF NOT EXISTS idx_teacher_subjects_user ON teacher_subjects (user_id);
CREATE INDEX IF NOT EXISTS idx_teacher_grades_user ON teacher_grades (user_id);

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
  reset_at BIGINT NOT NULL
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
  price_cents INTEGER,
  status TEXT NOT NULL CHECK (status IN ('incomplete','incomplete_expired','trial','active','past_due','cancelled','unpaid','no_default_provided','deleted')),
  started_at TEXT,
  end_at TEXT,
  cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  ip TEXT,
  user_agent TEXT,
  source TEXT DEFAULT 'home',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_subscribers (created_at);

CREATE TABLE IF NOT EXISTS site_ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  link_url TEXT,
  background TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS document_chunks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_type TEXT NOT NULL,
  source_id INTEGER NOT NULL,
  lesson_id INTEGER,
  chapter_id INTEGER,
  subject_id INTEGER,
  grade_id INTEGER,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  embedding TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_document_chunks_source ON document_chunks (source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_lesson ON document_chunks (lesson_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_subject ON document_chunks (subject_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_grade ON document_chunks (grade_id);

CREATE TABLE IF NOT EXISTS daily_challenges (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, day)
);

CREATE TABLE IF NOT EXISTS dissertation_corrections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam TEXT NOT NULL DEFAULT 'BAC' CHECK (exam IN ('BAC','BEPC')),
  subject TEXT NOT NULL DEFAULT 'Français',
  input_text TEXT NOT NULL,
  note INTEGER,
  criteria TEXT,
  feedback TEXT,
  provider TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_dissertation_corrections_user ON dissertation_corrections (user_id, created_at);

CREATE TABLE IF NOT EXISTS idempotency_keys (
  key TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  response TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_idempotency_user ON idempotency_keys(user_id, created_at);

CREATE TABLE IF NOT EXISTS webhook_events (
  event_id TEXT PRIMARY KEY,
  provider TEXT NOT NULL DEFAULT 'geniuspay',
  processed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_sub ON subscriptions(user_id) WHERE status = 'active';

CREATE TABLE IF NOT EXISTS duels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challenger_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  opponent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  challenger_pct INTEGER,
  opponent_pct INTEGER,
  winner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','done')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_duels_challenger ON duels(challenger_id);
CREATE INDEX IF NOT EXISTS idx_duels_opponent ON duels(opponent_id);

CREATE TABLE IF NOT EXISTS spaced_reviews (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  repetitions INTEGER NOT NULL DEFAULT 0,
  interval_days INTEGER NOT NULL DEFAULT 1,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  due_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, quiz_id)
);
`;

export function getDb() {
  return db;
}

export type SqlParam = string | number | null | bigint | Uint8Array | number[];

export function toPgPlaceholders(sql: string): string {
  let out = "";
  let i = 0;
  let j = 1;
  const n = sql.length;
  while (i < n) {
    const c = sql[i];
    if (c === "'") {
      out += c;
      i++;
      while (i < n) {
        if (sql[i] === "\\") {
          out += sql[i] + sql[i + 1];
          i += 2;
          continue;
        }
        if (sql[i] === "'") {
          out += sql[i];
          i++;
          if (sql[i] === "'") {
            out += sql[i];
            i++;
            continue;
          }
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

export function toPgRound(sql: string): string {
  let out = "";
  let i = 0;
  const n = sql.length;
  while (i < n) {
    const m = /ROUND\(/i.exec(sql.slice(i));
    if (!m) {
      out += sql.slice(i);
      break;
    }
    const parenStart = i + m.index + 6;
    out += sql.slice(i, parenStart);
    let depth = 1;
    let j = parenStart;
    let commaAt = -1;
    while (j < n && depth > 0) {
      const ch = sql[j];
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      else if (ch === "," && depth === 1 && commaAt === -1) commaAt = j;
      j++;
    }
    const innerEnd = j - 1;
    if (commaAt !== -1) {
      out += sql.slice(parenStart, commaAt) + "::numeric" + sql.slice(commaAt, innerEnd) + ")";
    } else {
      out += sql.slice(parenStart, innerEnd) + ")";
    }
    i = j;
  }
  return out;
}

export function toPgSchema(schema: string): string {
  let out = schema
    .replace(/\bINTEGER PRIMARY KEY AUTOINCREMENT\b/g, "SERIAL PRIMARY KEY")
    .replace(/\bAUTOINCREMENT\b/g, "SERIAL")
    .replace(/DEFAULT \(datetime\('now'\)\)/g, "DEFAULT (now())")
    .replace(/datetime\('now'[^)]*\)/g, (m) => toPgDatetime(m));

  const fkAlters: string[] = [];
  const fkRe = /REFERENCES\s+([a-z_]+)\s*\(\s*([a-z_]+)\s*\)([^,\n)]*)/g;
  out = out.replace(
    /CREATE TABLE IF NOT EXISTS\s+([a-z_]+)\s*\(([^]*?)\)\s*;/g,
    (_m, table: string, body: string) => {
      fkRe.lastIndex = 0;
      let mm: RegExpExecArray | null;
      const fks: { col: string; refTbl: string; refCol: string; action: string }[] = [];
      while ((mm = fkRe.exec(body))) {
        const before = body.slice(0, mm.index);
        const lastSep = Math.max(before.lastIndexOf(","), before.lastIndexOf("("));
        const col = before.slice(lastSep + 1).trim().split(/\s+/)[0];
        fks.push({ col, refTbl: mm[1], refCol: mm[2], action: mm[3].trim() });
      }
      for (const fk of fks) {
        fkAlters.push(
          `ALTER TABLE ${table} ADD CONSTRAINT fk_${table}_${fk.col} FOREIGN KEY (${fk.col}) REFERENCES ${fk.refTbl}(${fk.refCol})${fk.action ? " " + fk.action : ""};`,
        );
      }
      return `CREATE TABLE IF NOT EXISTS ${table} (${body.replace(fkRe, "")});`;
    },
  );
  return fkAlters.length ? out + "\n" + fkAlters.join("\n") : out;
}

export async function initDb() {
  if (IS_PG) {
    const pool = getPool();
    const existing = await withPgRetry(() =>
      pool.query(
        "SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users' LIMIT 1",
      ),
    );
    if (existing.rowCount === 0) {
      const schema = toPgSchema(SCHEMA);
      await withPgRetry(async () => {
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
      });
    } else {
      const hasRate = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.rate_limits') IS NOT NULL AS exists"),
      );
      if (hasRate.rows[0].exists) {
        await withPgRetry(() =>
          pool.query("ALTER TABLE rate_limits ALTER COLUMN reset_at TYPE BIGINT USING reset_at::bigint"),
        );
      }
      await withPgRetry(() =>
        pool.query(
          "CREATE INDEX IF NOT EXISTS idx_lesson_reads_user_readat ON lesson_reads (user_id, lesson_id, read_at)",
        ),
      );
      const hasClasses = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.classes') IS NOT NULL AS exists"),
      );
      if (!hasClasses.rows[0].exists) {
        await withPgRetry(async () => {
          const pieces = toPgSchema(`
CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
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
CREATE TABLE IF NOT EXISTS class_assignments (
  id SERIAL PRIMARY KEY,
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
CREATE INDEX IF NOT EXISTS idx_class_assignments_class ON class_assignments (class_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_student ON assignment_submissions (student_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes (teacher_id);
CREATE INDEX IF NOT EXISTS idx_class_students_user ON class_students (user_id);
`).split(";");
          for (const stmt of pieces) {
            const trimmed = stmt.trim();
            if (trimmed) await pool.query(trimmed);
          }
        });
      }
      const hasTeacherSubjects = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.teacher_subjects') IS NOT NULL AS exists"),
      );
      if (!hasTeacherSubjects.rows[0].exists) {
        const pieces = toPgSchema(`
CREATE TABLE IF NOT EXISTS teacher_subjects (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, subject_id)
);
CREATE INDEX IF NOT EXISTS idx_teacher_subjects_user ON teacher_subjects (user_id);
`).split(";");
        for (const stmt of pieces) {
          const trimmed = stmt.trim();
          if (trimmed) await pool.query(trimmed);
        }
        await withPgRetry(() =>
          pool.query(`
INSERT INTO teacher_subjects (user_id, subject_id)
SELECT DISTINCT teacher_id, subject_id FROM classes
WHERE teacher_id IS NOT NULL AND subject_id IS NOT NULL
ON CONFLICT DO NOTHING`),
        );
      }
      const hasTeacherGrades = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.teacher_grades') IS NOT NULL AS exists"),
      );
      if (!hasTeacherGrades.rows[0].exists) {
        const pieces = toPgSchema(`
CREATE TABLE IF NOT EXISTS teacher_grades (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, grade_id)
);
CREATE INDEX IF NOT EXISTS idx_teacher_grades_user ON teacher_grades (user_id);
`).split(";");
        for (const stmt of pieces) {
          const trimmed = stmt.trim();
          if (trimmed) await pool.query(trimmed);
        }
        await withPgRetry(() =>
          pool.query(`
INSERT INTO teacher_grades (user_id, grade_id)
SELECT DISTINCT teacher_id, grade_id FROM classes
WHERE teacher_id IS NOT NULL AND grade_id IS NOT NULL
ON CONFLICT DO NOTHING`),
        );
      }
      const hasNewsletter = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.newsletter_subscribers') IS NOT NULL AS exists"),
      );
      if (!hasNewsletter.rows[0].exists) {
        const pieces = toPgSchema(`
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  ip TEXT,
  user_agent TEXT,
  source TEXT DEFAULT 'home',
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_newsletter_created ON newsletter_subscribers (created_at);
`).split(";");
        for (const stmt of pieces) {
          const trimmed = stmt.trim();
          if (trimmed) await pool.query(trimmed);
        }
      }
      const hasAds = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.site_ads') IS NOT NULL AS exists"),
      );
      if (!hasAds.rows[0].exists) {
        const pieces = toPgSchema(`
CREATE TABLE IF NOT EXISTS site_ads (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  link_url TEXT,
  background TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`).split(";");
        for (const stmt of pieces) {
          const trimmed = stmt.trim();
          if (trimmed) await pool.query(trimmed);
        }
      }
      const hasChunks = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.document_chunks') IS NOT NULL AS exists"),
      );
      if (!hasChunks.rows[0].exists) {
        await withPgRetry(() => pool.query("CREATE EXTENSION IF NOT EXISTS vector"));
        const pieces = toPgSchema(`
CREATE TABLE IF NOT EXISTS document_chunks (
  id SERIAL PRIMARY KEY,
  source_type TEXT NOT NULL,
  source_id INTEGER NOT NULL,
  lesson_id INTEGER,
  chapter_id INTEGER,
  subject_id INTEGER,
  grade_id INTEGER,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  embedding vector(768),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_document_chunks_source ON document_chunks (source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_lesson ON document_chunks (lesson_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_subject ON document_chunks (subject_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_grade ON document_chunks (grade_id);
`).split(";");
        for (const stmt of pieces) {
          const trimmed = stmt.trim();
          if (trimmed) await pool.query(trimmed);
        }
      }
      const hasDaily = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.daily_challenges') IS NOT NULL AS exists"),
      );
      if (!hasDaily.rows[0].exists) {
        const pieces = toPgSchema(`
CREATE TABLE IF NOT EXISTS daily_challenges (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, day)
);
`).split(";");
        for (const stmt of pieces) {
          const trimmed = stmt.trim();
          if (trimmed) await pool.query(trimmed);
        }
      }
      const hasDissertation = await withPgRetry(() =>
        pool.query("SELECT to_regclass('public.dissertation_corrections') IS NOT NULL AS exists"),
      );
      if (!hasDissertation.rows[0].exists) {
        const pieces = toPgSchema(`
CREATE TABLE IF NOT EXISTS dissertation_corrections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam TEXT NOT NULL DEFAULT 'BAC' CHECK (exam IN ('BAC','BEPC')),
  subject TEXT NOT NULL DEFAULT 'Français',
  input_text TEXT NOT NULL,
  note INTEGER,
  criteria TEXT,
  feedback TEXT,
  provider TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_dissertation_corrections_user ON dissertation_corrections (user_id, created_at);
`).split(";");
        for (const stmt of pieces) {
          const trimmed = stmt.trim();
          if (trimmed) await pool.query(trimmed);
        }
      }
      try { await withPgRetry(() => pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS has_used_trial INTEGER NOT NULL DEFAULT 0")); } catch {}
      try { await withPgRetry(() => pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_canonical TEXT")); } catch {}
      try { await withPgRetry(() => pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT")); } catch {}
      try { await withPgRetry(() => pool.query("CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_sub ON subscriptions(user_id) WHERE status = 'active'")); } catch {}
      try { await withPgRetry(() => pool.query("CREATE INDEX IF NOT EXISTS idx_users_phone_canonical ON users(phone_canonical)")); } catch {}
      try { await withPgRetry(() => pool.query("CREATE UNIQUE INDEX IF NOT EXISTS uniq_users_email ON users(email) WHERE email IS NOT NULL AND email != ''")); } catch {}
      try { await withPgRetry(() => pool.query("CREATE UNIQUE INDEX IF NOT EXISTS uniq_users_phone ON users(phone) WHERE phone IS NOT NULL AND phone != ''")); } catch {}
      try { await withPgRetry(() => pool.query("CREATE TABLE IF NOT EXISTS idempotency_keys (key TEXT PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, response TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())")); } catch {}
      try { await withPgRetry(() => pool.query("CREATE TABLE IF NOT EXISTS webhook_events (event_id TEXT PRIMARY KEY, provider TEXT NOT NULL DEFAULT 'geniuspay', processed_at TIMESTAMPTZ NOT NULL DEFAULT now())")); } catch {}
    }
    return;
  }
  db.exec(SCHEMA);
  try { db.exec("ALTER TABLE users ADD COLUMN has_used_trial INTEGER NOT NULL DEFAULT 0"); } catch {}
  try { db.exec("ALTER TABLE users ADD COLUMN phone_canonical TEXT"); } catch {}
  try { db.exec("ALTER TABLE users ADD COLUMN avatar_url TEXT"); } catch {}
  try { db.exec("CREATE INDEX IF NOT EXISTS idx_users_phone_canonical ON users(phone_canonical)"); } catch {}
  try { db.exec("CREATE UNIQUE INDEX IF NOT EXISTS uniq_users_email ON users(email) WHERE email IS NOT NULL AND email != ''"); } catch {}
  try { db.exec("CREATE UNIQUE INDEX IF NOT EXISTS uniq_users_phone ON users(phone) WHERE phone IS NOT NULL AND phone != ''"); } catch {}
}

export async function query<T = unknown>(sql: string, ...params: SqlParam[]): Promise<T[]> {
  if (!isInsideInit()) await ensureReady();
  if (IS_PG) {
    const pool = getPool();
    const r = await withPgRetry(() => pool.query(toPgDatetime(toPgRound(toPgPlaceholders(sql))), params as any));
    return r.rows as T[];
  }
  return db.prepare(sql).all(...(params as any[])) as T[];
}

export async function queryOne<T = unknown>(sql: string, ...params: SqlParam[]): Promise<T | undefined> {
  if (!isInsideInit()) await ensureReady();
  if (IS_PG) {
    const pool = getPool();
    const r = await withPgRetry(() => pool.query(toPgDatetime(toPgRound(toPgPlaceholders(sql))), params as any));
    return r.rowCount ? (r.rows[0] as T) : undefined;
  }
  return db.prepare(sql).get(...(params as any[])) as T | undefined;
}

export async function run(sql: string, ...params: SqlParam[]): Promise<{ lastInsertRowid: number | null; changes: number }> {
  if (!isInsideInit()) await ensureReady();
  if (IS_PG) {
    const pool = getPool();
    let finalSql = sql;
    const insertMatch = /^\s*insert\s+into\s+([a-zA-Z_]+)/i.exec(sql);
    if (insertMatch && !NO_ID_TABLES.has(insertMatch[1])) {
      finalSql = `${sql.replace(/;\s*$/, "")} RETURNING id`;
    }
    const r = await withPgRetry(() => pool.query(toPgDatetime(toPgRound(toPgPlaceholders(finalSql))), params as any));
    const row = r.rows?.[0] || {};
    return {
      lastInsertRowid: row.last_insert_rowid ?? row.inserted_id ?? row.id ?? null,
      changes: r.rowCount ?? 0,
    };
  }
  const res = db.prepare(sql).run(...(params as any[]));
  return {
    lastInsertRowid: res.lastInsertRowid == null ? null : Number(res.lastInsertRowid),
    changes: Number(res.changes),
  };
}

export { db, NO_ID_TABLES };
