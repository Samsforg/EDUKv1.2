import { query, queryOne, run } from "./db";
import { notify } from "./session";

export interface ProfLive {
  id: number;
  title: string;
  subject_name: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  starts_at: string;
  duration_minutes: number;
  viewers: number;
  gradient: string;
  registrations: number;
  questions_count: number;
}

const COLS =
  "s.id, s.title, s.subject_name, s.tagline, s.description, s.category, s.status, s.starts_at, s.duration_minutes, s.viewers, s.gradient";

function withCounts(rows: { id: number }[]): ProfLive[] {
  return rows.map((r) => {
    const reg = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM live_registrations WHERE session_id = ?", r.id);
    const q = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM live_questions WHERE session_id = ?", r.id);
    return {
      ...(r as unknown as Omit<ProfLive, "registrations" | "questions_count">),
      registrations: reg?.c ?? 0,
      questions_count: q?.c ?? 0,
    };
  });
}

export function isOwnedBy(sessionId: number, profId: number): boolean {
  return !!queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM live_sessions WHERE id = ? AND created_by = ?",
    sessionId,
    profId,
  );
}

export function getProfBoard(profId: number) {
  const mine = query<ProfLive>(
    `SELECT ${COLS} FROM live_sessions s WHERE s.created_by = ? ORDER BY CASE s.status WHEN 'live' THEN 0 WHEN 'upcoming' THEN 1 ELSE 2 END, s.starts_at`,
    profId,
  );
  const liveNow = mine.find((s) => s.status === "live") ?? null;
  const upcoming = withCounts(mine.filter((s) => s.status === "upcoming"));
  const past = withCounts(mine.filter((s) => s.status === "ended"));
  const stats = {
    registrations:
      queryOne<{ c: number }>(
        "SELECT COUNT(*) AS c FROM live_registrations r JOIN live_sessions s ON s.id = r.session_id WHERE s.created_by = ?",
        profId,
      )?.c ?? 0,
    questions:
      queryOne<{ c: number }>(
        "SELECT COUNT(*) AS c FROM live_questions q JOIN live_sessions s ON s.id = q.session_id WHERE s.created_by = ?",
        profId,
      )?.c ?? 0,
    sessions: mine.length,
  };
  return { live_now: liveNow, upcoming, past, stats };
}

export interface NewLiveInput {
  title: string;
  subject_name: string;
  tagline?: string;
  description?: string;
  category?: string;
  starts_at: string;
  duration_minutes?: number;
}

export function createLiveSession(profId: number, input: NewLiveInput): number {
  const prof = queryOne<{ first_name: string; last_name: string }>("SELECT first_name, last_name FROM users WHERE id = ?", profId)!;
  const title = String(input.title ?? "").trim();
  const subject = String(input.subject_name ?? "Mathématiques").trim();
  const startsAt = String(input.starts_at ?? "");
  const duration = Math.max(15, Math.min(240, Number(input.duration_minutes) || 60));
  const r = run(
    `INSERT INTO live_sessions (title, subject_name, tagline, description, category, animator_name, animator_title, status, starts_at, duration_minutes, gradient, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'upcoming', ?, ?, ?, ?)`,
    title,
    subject,
    String(input.tagline ?? "").trim(),
    String(input.description ?? "").trim(),
    String(input.category ?? "Sciences").trim(),
    `${prof.first_name} ${prof.last_name}`,
    `Professeur · ${subject}`,
    startsAt,
    duration,
    "from-secondary to-primary",
    profId,
  );
  const id = Number(r.lastInsertRowid);
  const students = query<{ id: number }>("SELECT id FROM users WHERE role = 'student'");
  for (const s of students) {
    notify(s.id, "Nouveau live programmé", `« ${title} » — ${subject}. Rendez-vous sur Espace Live !`, "live_tv");
  }
  return id;
}

export function setLiveStatus(sessionId: number, profId: number, status: "live" | "ended" | "upcoming") {
  if (!isOwnedBy(sessionId, profId)) return null;
  run("UPDATE live_sessions SET status = ? WHERE id = ?", status, sessionId);
  if (status === "live") {
    const s = queryOne<{ title: string }>("SELECT title FROM live_sessions WHERE id = ?", sessionId);
    const students = query<{ id: number }>("SELECT id FROM users WHERE role = 'student'");
    for (const st of students) {
      notify(st.id, "C'est parti ! 🔴", `Le live « ${s?.title ?? ""} » vient de démarrer. Rejoins-le maintenant.`, "live_tv");
    }
  }
  return { ok: true, status };
}

export function setChatPaused(sessionId: number, profId: number, paused: boolean) {
  if (!isOwnedBy(sessionId, profId)) return null;
  run("UPDATE live_sessions SET chat_paused = ? WHERE id = ?", paused ? 1 : 0, sessionId);
  return { ok: true, chat_paused: paused };
}

export function postAnnouncement(sessionId: number, profId: number, body: string) {
  if (!isOwnedBy(sessionId, profId)) return null;
  const text = String(body ?? "").trim();
  if (text.length < 2) return { error: "Annonce trop courte" };
  const r = run(
    "INSERT INTO live_messages (session_id, user_id, body, role, priority, created_at) VALUES (?, ?, ?, 'system', 2, datetime('now'))",
    sessionId,
    profId,
    text,
  );
  return { ok: true, id: Number(r.lastInsertRowid) };
}

export function deleteMessage(sessionId: number, profId: number, messageId: number) {
  if (!isOwnedBy(sessionId, profId)) return null;
  run("DELETE FROM live_messages WHERE id = ? AND session_id = ?", messageId, sessionId);
  return { ok: true };
}

export function blockUser(sessionId: number, profId: number, userId: number) {
  if (!isOwnedBy(sessionId, profId)) return null;
  run(
    "INSERT INTO live_blocked_users (session_id, user_id) VALUES (?, ?) ON CONFLICT DO NOTHING",
    sessionId,
    userId,
  );
  return { ok: true };
}

export function unblockUser(sessionId: number, profId: number, userId: number) {
  if (!isOwnedBy(sessionId, profId)) return null;
  run("DELETE FROM live_blocked_users WHERE session_id = ? AND user_id = ?", sessionId, userId);
  return { ok: true };
}

export function pinQuestion(sessionId: number, profId: number, questionId: number, pinned: boolean) {
  if (!isOwnedBy(sessionId, profId)) return null;
  run("UPDATE live_questions SET pinned = ? WHERE id = ? AND session_id = ?", pinned ? 1 : 0, questionId, sessionId);
  return { ok: true };
}

export function answerQuestion(sessionId: number, profId: number, questionId: number, answer: string) {
  if (!isOwnedBy(sessionId, profId)) return null;
  const text = String(answer ?? "").trim();
  if (text.length < 2) return { error: "Réponse trop courte" };
  const q = queryOne<{ user_id: number; question: string; title: string }>(
    `SELECT q.user_id, q.question, s.title FROM live_questions q JOIN live_sessions s ON s.id = q.session_id
     WHERE q.id = ? AND q.session_id = ?`,
    questionId,
    sessionId,
  );
  if (!q) return { error: "Question introuvable" };
  run("UPDATE live_questions SET answer = ?, pinned = 0 WHERE id = ?", text, questionId);
  notify(q.user_id, "Réponse du professeur", `Le prof a répondu à ta question sur « ${q.title} ».`, "forum");
  return { ok: true };
}

export function getModerationData(sessionId: number, profId: number) {
  if (!isOwnedBy(sessionId, profId)) return null;
  const session = queryOne<{
    id: number;
    title: string;
    status: string;
    chat_paused: number;
    viewers: number;
    starts_at: string;
  }>(
    "SELECT id, title, status, chat_paused, viewers, starts_at FROM live_sessions WHERE id = ?",
    sessionId,
  );
  if (!session) return null;
  const messages = query<{ id: number; user_id: number; name: string; body: string; role: string; priority: number; created_at: string }>(
    `SELECT m.id, m.user_id, m.body, m.role, m.priority, m.created_at, u.first_name || ' ' || u.last_name AS name
     FROM live_messages m JOIN users u ON u.id = m.user_id
     WHERE m.session_id = ? ORDER BY m.id DESC LIMIT 60`,
    sessionId,
  ).reverse();
  const questions = query<{
    id: number;
    user_id: number;
    name: string;
    question: string;
    answer: string | null;
    pinned: number;
    created_at: string;
  }>(
    `SELECT q.id, q.user_id, q.question, q.answer, q.pinned, q.created_at, u.first_name || ' ' || u.last_name AS name
     FROM live_questions q JOIN users u ON u.id = q.user_id
     WHERE q.session_id = ? ORDER BY q.pinned DESC, q.id DESC LIMIT 30`,
    sessionId,
  );
  const blocked = query<{ id: number; name: string }>(
    `SELECT b.user_id AS id, u.first_name || ' ' || u.last_name AS name
     FROM live_blocked_users b JOIN users u ON u.id = b.user_id
     WHERE b.session_id = ? ORDER BY b.created_at DESC`,
    sessionId,
  );
  const registrations = query<{ user_id: number; name: string; email: string; created_at: string }>(
    `SELECT r.user_id, u.first_name || ' ' || u.last_name AS name, u.email, r.created_at
     FROM live_registrations r JOIN users u ON u.id = r.user_id
     WHERE r.session_id = ? ORDER BY r.created_at ASC`,
    sessionId,
  );
  return { session: { ...session, chat_paused: session.chat_paused === 1 }, messages, questions, blocked, registrations };
}
