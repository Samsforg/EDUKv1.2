import { query, queryOne, run } from "./db";

export interface AuditRow {
  id: number;
  actor_id: number | null;
  actor_name: string | null;
  action: string;
  detail: string;
  created_at: string;
  relative: string;
}

const ACTION_LABELS: Record<string, string> = {
  approbation: "Approbation",
  rejet: "Rejet",
  blocage: "Blocage",
  deblocage: "Déblocage",
  suppression: "Suppression",
  role: "Changement de rôle",
  mot_de_passe: "Mot de passe",
  notification: "Notification",
  promo: "Code promo",
  litige: "Litige",
  proctoring: "Proctoring",
  systeme: "Système",
  inscription: "Inscription",
};

export function actionLabel(action: string): string {
  return ACTION_LABELS[action] ?? action;
}

export function logAudit(actorId: number | null, action: string, detail: string) {
  run("INSERT INTO audit_logs (actor_id, action, detail) VALUES (?, ?, ?)", actorId, action, detail.slice(0, 500));
}

export function getAuditLogs(limit = 100, action?: string): AuditRow[] {
  const where = action ? "WHERE a.action = ?" : "";
  const rows = query<AuditRow>(
    `SELECT a.id, a.actor_id, u.first_name || ' ' || u.last_name AS actor_name,
            a.action, a.detail, a.created_at
     FROM audit_logs a LEFT JOIN users u ON u.id = a.actor_id
     ${where}
     ORDER BY a.id DESC LIMIT ?`,
    ...(action ? [action, limit] : [limit]),
  );
  const now = Date.now();
  return rows.map((r) => ({
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
}

export function getAuditActions(): { action: string; count: number }[] {
  return query<{ action: string; count: number }>(
    "SELECT action, COUNT(*) AS count FROM audit_logs GROUP BY action ORDER BY count DESC",
  );
}

export function getAuditStats(): { total: number; today: number } {
  return {
    total: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM audit_logs")?.c ?? 0,
    today:
      queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM audit_logs WHERE created_at >= date('now')")?.c ?? 0,
  };
}
