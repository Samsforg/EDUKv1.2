import { query, queryOne, run } from "./db";

export interface LiveSession {
  id: number;
  title: string;
  subject_name: string;
  tagline: string;
  description: string;
  category: string;
  animator_name: string;
  animator_title: string;
  status: string;
  starts_at: string;
  duration_minutes: number;
  viewers: number;
  gradient: string;
  created_by: number | null;
  chat_paused: number | null;
}

export interface LiveMessage {
  id: number;
  name: string;
  body: string;
  priority: number;
  role: string;
  created_at: string;
  user_id: number;
}

export interface LiveDetail extends Omit<LiveSession, "chat_paused"> {
  chat_paused: boolean;
  resources: { id: number; title: string; file_type: string; size_mb: number }[];
  moments: { id: number; time_label: string; label: string }[];
  questions: { id: number; question: string; answer: string | null; name: string }[];
  pinned_question: { id: number; question: string; name: string } | null;
  registrations: number;
  registered: boolean;
}

const SESSION_COLS =
  "id, title, subject_name, tagline, description, category, animator_name, animator_title, status, starts_at, duration_minutes, viewers, gradient, created_by, chat_paused";

function toSession(r: LiveSession): LiveSession {
  return { ...r, created_by: r.created_by ?? null, chat_paused: r.chat_paused ?? 0 };
}

export async function getLiveHub(): Promise<{ live_now: LiveSession | null; upcoming: LiveSession[]; replays: LiveSession[]; categories: string[] } >{
  const rows = await query<LiveSession>(`SELECT ${SESSION_COLS} FROM live_sessions ORDER BY CASE status WHEN 'live' THEN 0 WHEN 'upcoming' THEN 1 ELSE 2 END, starts_at`);
  const normalized = rows.map(toSession);
  const liveNow = normalized.find((r) => r.status === "live") ?? null;
  const upcoming = normalized.filter((r) => r.status === "upcoming");
  const replays = normalized.filter((r) => r.status === "ended");
  const categories = Array.from(new Set(normalized.map((r) => r.category)));
  return { live_now: liveNow, upcoming, replays, categories };
}

export async function getLiveSession(id: number, userId?: number): Promise<LiveDetail | null >{
  const s = await queryOne<LiveSession>(`SELECT ${SESSION_COLS} FROM live_sessions WHERE id = ?`, id);
  if (!s) return null;
  const resources = await query<{ id: number; title: string; file_type: string; size_mb: number }>(
    "SELECT id, title, file_type, size_mb FROM live_resources WHERE session_id = ? ORDER BY id",
    id,
  );
  const moments = await query<{ id: number; time_label: string; label: string }>(
    "SELECT id, time_label, label FROM live_moments WHERE session_id = ? ORDER BY id",
    id,
  );
  const questions = await query<{ id: number; question: string; answer: string | null; name: string }>(
    `SELECT q.id, q.question, q.answer, u.first_name || ' ' || u.last_name AS name
     FROM live_questions q JOIN users u ON u.id = q.user_id
     WHERE q.session_id = ? ORDER BY q.id DESC LIMIT 20`,
    id,
  );
  const pinned_question = await queryOne<{ id: number; question: string; name: string }>(
    `SELECT q.id, q.question, u.first_name || ' ' || u.last_name AS name
     FROM live_questions q JOIN users u ON u.id = q.user_id
     WHERE q.session_id = ? AND q.pinned = 1 ORDER BY q.id DESC LIMIT 1`,
    id,
  );
  const registrations =
    (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM live_registrations WHERE session_id = ?", id))?.c ?? 0;
  const registered = userId
    ? !!await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM live_registrations WHERE session_id = ? AND user_id = ?", id, userId)
    : false;
  return {
    ...toSession(s),
    resources,
    moments,
    questions,
    pinned_question: pinned_question ?? null,
    registrations,
    registered,
    chat_paused: (s.chat_paused ?? 0) === 1,
  };
}

export async function getLiveMessages(sessionId: number, limit = 30): Promise<LiveMessage[] >{
  return (await query<LiveMessage>(
    `SELECT m.id, m.body, m.priority, m.role, m.created_at, u.first_name || ' ' || u.last_name AS name, m.user_id
     FROM live_messages m JOIN users u ON u.id = m.user_id
     WHERE m.session_id = ? ORDER BY m.id DESC LIMIT ?`,
    sessionId,
    limit,
  )).reverse();
}

export async function toggleRegistration(userId: number, sessionId: number): Promise<{ registered: boolean } >{
  const exists = !!await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM live_registrations WHERE session_id = ? AND user_id = ?",
    sessionId,
    userId,
  );
  if (exists) {
    await run("DELETE FROM live_registrations WHERE session_id = ? AND user_id = ?", sessionId, userId);
    return { registered: false };
  }
  await run("INSERT INTO live_registrations (session_id, user_id) VALUES (?, ?)", sessionId, userId);
  return { registered: true };
}

export async function isBlockedFromChat(sessionId: number, userId: number): Promise<boolean >{
  return !!await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM live_blocked_users WHERE session_id = ? AND user_id = ?",
    sessionId,
    userId,
  );
}

export async function isChatPaused(sessionId: number): Promise<boolean >{
  return ((await queryOne<{ c: number }>("SELECT chat_paused AS c FROM live_sessions WHERE id = ?", sessionId))?.c ?? 0) === 1;
}
