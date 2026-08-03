import { query, queryOne, run } from "./db";
import { logAudit } from "./audit";

export interface ProctoringSessionRow {
  id: number;
  user_id: number;
  user_name: string;
  paper_id: number;
  paper_title: string;
  subject_name: string;
  duration_minutes: number;
  started_at: string;
  status: "active" | "ended";
  elapsed_min: number;
  events_count: number;
  warnings: number;
}

export interface ProctoringEventRow {
  id: number;
  session_id: number;
  user_name: string;
  event_type: string;
  detail: string;
  created_at: string;
  relative: string;
}

const EVENT_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  start: { label: "Début", color: "text-primary", bg: "bg-primary-container" },
  submission: { label: "Remise", color: "text-tertiary", bg: "bg-tertiary-container" },
  tab_switch: { label: "Changement d'onglet", color: "text-error", bg: "bg-error-container" },
  warning: { label: "Avertissement", color: "text-error", bg: "bg-error-container" },
  violation: { label: "Violation", color: "text-error", bg: "bg-error-container" },
  ended: { label: "Fin de session", color: "text-on-surface-variant", bg: "bg-surface-container-high" },
  expired: { label: "Expiration", color: "text-on-surface-variant", bg: "bg-surface-container-high" },
};

export function eventMeta(type: string) {
  return EVENT_LABELS[type] ?? { label: type, color: "text-on-surface-variant", bg: "bg-surface-container-high" };
}

export function startOrResumeSession(userId: number, paperId: number): number {
  const existing = queryOne<{ id: number }>(
    "SELECT id FROM proctoring_sessions WHERE user_id = ? AND paper_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
    userId,
    paperId,
  );
  if (existing) return existing.id;
  const id = Number(
    run(
      "INSERT INTO proctoring_sessions (user_id, paper_id, status) VALUES (?, ?, 'active')",
      userId,
      paperId,
    ).lastInsertRowid,
  );
  run(
    "INSERT INTO proctoring_events (session_id, event_type, detail) VALUES (?, 'start', 'Session de surveillance démarrée')",
    id,
  );
  return id;
}

export function logProctoringEvent(sessionId: number, type: string, detail: string) {
  run(
    "INSERT INTO proctoring_events (session_id, event_type, detail) VALUES (?, ?, ?)",
    sessionId,
    type,
    detail.slice(0, 300),
  );
}

export function endSession(userId: number, paperId: number, flags?: { type: string; detail: string }[]) {
  const session = queryOne<{ id: number }>(
    "SELECT id FROM proctoring_sessions WHERE user_id = ? AND paper_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
    userId,
    paperId,
  );
  if (!session) return;
  if (Array.isArray(flags)) {
    for (const f of flags) {
      if (f && typeof f.type === "string" && f.detail) logProctoringEvent(session.id, f.type, f.detail);
    }
  }
  run(
    "UPDATE proctoring_sessions SET status = 'ended', ended_at = datetime('now') WHERE id = ?",
    session.id,
  );
}

function expireStaleSessions() {
  run(
    `UPDATE proctoring_sessions SET status = 'ended', ended_at = datetime('now')
     WHERE status = 'active'
       AND datetime(started_at, '+' || (SELECT p.duration_minutes FROM exam_papers p WHERE p.id = proctoring_sessions.paper_id) || ' minutes', '+15 minutes') < datetime('now')`,
  );
}

export function getProctoringOverview(): {
  sessions: ProctoringSessionRow[];
  events: ProctoringEventRow[];
  stats: { active: number; today: number; warnings: number };
} {
  expireStaleSessions();
  const now = Date.now();

  const sessions = query<ProctoringSessionRow>(
    `SELECT ps.id, ps.user_id, u.first_name || ' ' || u.last_name AS user_name,
            ps.paper_id, p.title AS paper_title, s.name AS subject_name, p.duration_minutes,
            ps.started_at, ps.status,
            (SELECT COUNT(*) FROM proctoring_events e WHERE e.session_id = ps.id) AS events_count,
            (SELECT COUNT(*) FROM proctoring_events e WHERE e.session_id = ps.id
              AND e.event_type IN ('tab_switch','warning','violation')) AS warnings
     FROM proctoring_sessions ps
     JOIN users u ON u.id = ps.user_id
     JOIN exam_papers p ON p.id = ps.paper_id
     JOIN subjects s ON s.id = p.subject_id
     WHERE ps.status = 'active'
     ORDER BY ps.started_at DESC`,
  ).map((r) => ({
    ...r,
    elapsed_min: Math.max(0, Math.floor((now - new Date(r.started_at.replace(" ", "T") + "Z").getTime()) / 60000)),
  }));

  const events = query<ProctoringEventRow>(
    `SELECT e.id, e.session_id, e.event_type, e.detail, e.created_at,
            u.first_name || ' ' || u.last_name AS user_name
     FROM proctoring_events e
     JOIN proctoring_sessions ps ON ps.id = e.session_id
     JOIN users u ON u.id = ps.user_id
     ORDER BY e.id DESC LIMIT 40`,
  ).map((r) => ({
    ...r,
    relative: (() => {
      const t = new Date(r.created_at.replace(" ", "T") + "Z").getTime();
      if (Number.isNaN(t)) return r.created_at;
      const diff = Math.max(0, Math.floor((now - t) / 1000));
      if (diff < 60) return "à l'instant";
      if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
      if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
      return `il y a ${Math.floor(diff / 86400)} j`;
    })(),
  }));

  return {
    sessions,
    events,
    stats: {
      active: sessions.length,
      today:
        queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM proctoring_sessions WHERE started_at >= date('now')")?.c ?? 0,
      warnings:
        queryOne<{ c: number }>(
          "SELECT COUNT(*) AS c FROM proctoring_events WHERE event_type IN ('tab_switch','warning','violation') AND created_at >= date('now')",
        )?.c ?? 0,
    },
  };
}

export function terminateSession(id: number, actorId: number): { ok: true } | { error: string } {
  const row = queryOne<{ id: number; user_id: number; paper_id: number; status: string }>(
    "SELECT id, user_id, paper_id, status FROM proctoring_sessions WHERE id = ?",
    id,
  );
  if (!row) return { error: "Session introuvable" };
  if (row.status !== "active") return { error: "Cette session est déjà terminée" };
  run("UPDATE proctoring_sessions SET status = 'ended', ended_at = datetime('now') WHERE id = ?", id);
  logProctoringEvent(id, "ended", "Session terminée par l'administration");
  logAudit(actorId, "proctoring", `Session de surveillance #${id} terminée`);
  return { ok: true };
}
