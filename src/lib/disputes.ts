import { query, queryOne, run } from "./db";
import { notify } from "./session";
import { logAudit } from "./audit";

export interface DisputeRow {
  id: number;
  user_id: number;
  user_name: string;
  subject: string;
  description: string;
  status: "open" | "resolved";
  resolution: string | null;
  resolved_by_name: string | null;
  created_at: string;
  resolved_at: string | null;
  relative: string;
}

export function getDisputes(): DisputeRow[] {
  const rows = query<DisputeRow>(
    `SELECT d.id, d.user_id, u.first_name || ' ' || u.last_name AS user_name,
            d.subject, d.description, d.status, d.resolution, d.resolved_at,
            rb.first_name || ' ' || rb.last_name AS resolved_by_name, d.created_at
     FROM disputes d
     JOIN users u ON u.id = d.user_id
     LEFT JOIN users rb ON rb.id = d.resolved_by
     ORDER BY (d.status = 'open') DESC, d.id DESC`,
  );
  const now = Date.now();
  return rows.map((r) => ({
    ...r,
    relative: (() => {
      const t = new Date(r.created_at.replace(" ", "T") + "Z").getTime();
      if (Number.isNaN(t)) return r.created_at;
      const diff = Math.max(0, Math.floor((now - t) / 1000));
      if (diff < 3600) return `il y a ${Math.max(1, Math.floor(diff / 60))} min`;
      if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
      return `il y a ${Math.floor(diff / 86400)} j`;
    })(),
  }));
}

export function openDispute(
  userId: number,
  subject: string,
  description: string,
): { ok: true; id: number } | { error: string } {
  const cleanSubject = subject.trim();
  const cleanDesc = description.trim();
  if (!cleanSubject || cleanSubject.length < 3) return { error: "Objet requis (3 caractères minimum)" };
  if (!cleanDesc || cleanDesc.length < 10) return { error: "Décrivez le problème (10 caractères minimum)" };
  const id = Number(
    run("INSERT INTO disputes (user_id, subject, description) VALUES (?, ?, ?)", userId, cleanSubject.slice(0, 120), cleanDesc.slice(0, 1000)).lastInsertRowid,
  );
  logAudit(userId, "litige", `Litige « ${cleanSubject.slice(0, 80)} » ouvert`);
  return { ok: true, id };
}

export function resolveDispute(
  id: number,
  resolution: string,
  actorId: number,
): { ok: true } | { error: string } {
  const row = queryOne<{ id: number; user_id: number; subject: string; status: string }>(
    "SELECT id, user_id, subject, status FROM disputes WHERE id = ?",
    id,
  );
  if (!row) return { error: "Litige introuvable" };
  const clean = resolution.trim();
  if (clean.length < 3) return { error: "La réponse doit contenir au moins 3 caractères" };
  run(
    "UPDATE disputes SET status = 'resolved', resolution = ?, resolved_by = ?, resolved_at = datetime('now') WHERE id = ?",
    clean.slice(0, 1000),
    actorId,
    id,
  );
  notify(
    row.user_id,
    "Litige résolu",
    `Votre litige « ${row.subject} » a été traité. Réponse : ${clean.slice(0, 200)}`,
    "verified",
  );
  logAudit(actorId, "litige", `Litige « ${row.subject} » résolu`);
  return { ok: true };
}
