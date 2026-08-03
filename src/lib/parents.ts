import { query, queryOne, run } from "@/lib/db";

export interface ParentChild {
  child_id: number;
  first_name: string;
  last_name: string;
  class_level: string | null;
  serie_name: string | null;
  online: boolean;
  xp: number;
  streak: number;
  last_active: string | null;
}

export function getParentChildren(parentId: number): ParentChild[] {
  const today = new Date().toISOString().slice(0, 10);
  return query<ParentChild>(
    `SELECT u.id AS child_id, u.first_name, u.last_name, u.class_level, u.xp, u.streak, u.last_active,
            s.name AS serie_name
     FROM parent_child pc
     JOIN users u ON u.id = pc.child_id
     LEFT JOIN series s ON s.id = u.serie_id
     WHERE pc.parent_id = ?
     ORDER BY pc.created_at ASC`,
    parentId,
  ).map((c) => ({ ...c, online: c.last_active === today }));
}

export function isChildLinked(parentId: number, childId: number): boolean {
  return !!queryOne<{ id: number }>(
    "SELECT id FROM parent_child WHERE parent_id = ? AND child_id = ?",
    parentId,
    childId,
  );
}

export function resolveLinkedChild(
  parentId: number,
  requestedChildId?: number | null,
): ParentChild | null {
  const children = getParentChildren(parentId);
  if (requestedChildId) {
    return children.find((c) => c.child_id === requestedChildId) ?? null;
  }
  return children[0] ?? null;
}

export function linkChild(parentId: number, childId: number) {
  run("INSERT INTO parent_child (parent_id, child_id) VALUES (?, ?)", parentId, childId);
}

export function unlinkChild(parentId: number, childId: number) {
  run("DELETE FROM parent_child WHERE parent_id = ? AND child_id = ?", parentId, childId);
}

export function getWeekRange() {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = (day + 6) % 7;
  const mondayMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - diffToMonday * 86400000;
  const fmt = (ms: number) => new Date(ms).toISOString().slice(0, 10);
  return {
    monday: fmt(mondayMs),
    sunday: fmt(mondayMs + 6 * 86400000),
    today: fmt(mondayMs + diffToMonday * 86400000),
  };
}

interface ActivityEvent {
  t: string;
  hours: number;
}

function activityEvents(childId: number): ActivityEvent[] {
  const lessons = query<{ t: string }>("SELECT read_at AS t FROM lesson_reads WHERE user_id = ?", childId);
  const quizzes = query<{ t: string }>("SELECT completed_at AS t FROM quiz_attempts WHERE user_id = ?", childId);
  const exams = query<{ t: string; duration_seconds: number }>(
    "SELECT completed_at AS t, duration_seconds FROM exam_attempts WHERE user_id = ?",
    childId,
  );
  const events: ActivityEvent[] = [
    ...lessons.map((e) => ({ t: e.t, hours: 0.5 })),
    ...quizzes.map((e) => ({ t: e.t, hours: 0.5 })),
    ...exams.map((e) => ({ t: e.t, hours: Math.max(0.25, (e.duration_seconds || 0) / 3600) })),
  ];
  return events;
}

export interface WeekDay {
  label: string;
  date: string;
  hours: number;
  active: boolean;
  isToday: boolean;
}

export function getWeeklyActivity(childId: number) {
  const { monday, sunday, today } = getWeekRange();
  const labels = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
  const days: WeekDay[] = labels.map((label, i) => {
    const date = new Date(Date.parse(monday + "T00:00:00Z") + i * 86400000).toISOString().slice(0, 10);
    return { label, date, hours: 0, active: false, isToday: date === today };
  });
  const events = activityEvents(childId).filter((e) => e.t.slice(0, 10) >= monday && e.t.slice(0, 10) <= sunday);
  for (const e of events) {
    const date = e.t.slice(0, 10);
    const day = days.find((d) => d.date === date);
    if (day) {
      day.hours = Math.round((day.hours + e.hours) * 100) / 100;
      day.active = true;
    }
  }
  const total = Math.round(days.reduce((s, d) => s + d.hours, 0) * 100) / 100;
  const activeDays = days.filter((d) => d.active).length;
  return { days, total, activeDays };
}

export function getPeakHours(childId: number): { label: string; hour: number } {
  const events = activityEvents(childId);
  if (events.length === 0) return { label: "18h-20h", hour: 18 };
  const counts = new Map<number, number>();
  for (const e of events) {
    const hour = Number(e.t.slice(11, 13));
    if (!Number.isNaN(hour)) counts.set(hour, (counts.get(hour) ?? 0) + 1);
  }
  let best = 18;
  let bestCount = 0;
  counts.forEach((c, h) => {
    if (c > bestCount) {
      best = h;
      bestCount = c;
    }
  });
  const end = (best + 2) % 24;
  return { label: `${String(best).padStart(2, "0")}h-${String(end).padStart(2, "0")}h`, hour: best };
}

export interface SubjectStat {
  subject_id: number;
  name: string;
  icon: string;
  color: string;
  attempts: number;
  avg_over_20: number;
}

export function getSubjectStats(childId: number): SubjectStat[] {
  const rows = query<{
    subject_id: number;
    name: string;
    icon: string;
    color: string;
    score: number;
    max_score: number;
    score_over_20: number;
  }>(
    `SELECT q.subject_id AS subject_id, s.name, s.icon, s.color, qa.score AS score, qa.max_score AS max_score, NULL AS score_over_20
     FROM quiz_attempts qa JOIN quizzes q ON q.id = qa.quiz_id JOIN subjects s ON s.id = q.subject_id WHERE qa.user_id = ?
     UNION ALL
     SELECT ep.subject_id AS subject_id, s.name, s.icon, s.color, ea.score AS score, NULL AS max_score, ea.score_over_20
     FROM exam_attempts ea JOIN exam_papers ep ON ep.id = ea.paper_id JOIN subjects s ON s.id = ep.subject_id WHERE ea.user_id = ?`,
    childId,
    childId,
  );
  const map = new Map<number, SubjectStat>();
  for (const r of rows) {
    const over20 =
      r.score_over_20 ?? (r.max_score && r.max_score > 0 ? (r.score / r.max_score) * 20 : 0);
    const cur = map.get(r.subject_id) ?? {
      subject_id: r.subject_id,
      name: r.name,
      icon: r.icon,
      color: r.color,
      attempts: 0,
      avg_over_20: 0,
    };
    cur.attempts += 1;
    cur.avg_over_20 = (cur.avg_over_20 * (cur.attempts - 1) + over20) / cur.attempts;
    map.set(r.subject_id, cur);
  }
  return [...map.values()].map((s) => ({ ...s, avg_over_20: Math.round(s.avg_over_20 * 10) / 10 }));
}

export interface RecentResult {
  id: number;
  type: "quiz" | "exam";
  title: string;
  subject_id: number;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  score_over_20: number;
  raw_score: number;
  max_score: number | null;
  year: number | null;
  completed_at: string;
  date: string;
  relative: string;
  trend: "up" | "down" | "flat" | null;
}

function relativeLabel(dateStr: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const d = new Date(Date.parse(dateStr + "T00:00:00Z"));
  const t = new Date(Date.parse(today + "T00:00:00Z"));
  const diffDays = Math.round((t.getTime() - d.getTime()) / 86400000);
  if (diffDays <= 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `il y a ${diffDays} j.`;
  const month = d.toLocaleDateString("fr-FR", { month: "short" });
  return `${d.getDate()} ${month}`;
}

export function getRecentResults(childId: number, limit = 10): RecentResult[] {
  const quizRows = query<{
    id: number;
    score: number;
    max_score: number;
    completed_at: string;
    title: string;
    subject_id: number;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
  }>(
    `SELECT qa.id, qa.score, qa.max_score, qa.completed_at, q.title, q.subject_id AS subject_id,
            s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color
     FROM quiz_attempts qa JOIN quizzes q ON q.id = qa.quiz_id JOIN subjects s ON s.id = q.subject_id
     WHERE qa.user_id = ?`,
    childId,
  );
  const examRows = query<{
    id: number;
    score: number;
    score_over_20: number;
    completed_at: string;
    title: string;
    year: number;
    subject_id: number;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
  }>(
    `SELECT ea.id, ea.score, ea.score_over_20, ea.completed_at, ep.title, ep.year, ep.subject_id AS subject_id,
            s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color
     FROM exam_attempts ea JOIN exam_papers ep ON ep.id = ea.paper_id JOIN subjects s ON s.id = ep.subject_id
     WHERE ea.user_id = ?`,
    childId,
  );

  const results: RecentResult[] = [
    ...quizRows.map((r) => ({
      id: r.id,
      type: "quiz" as const,
      title: r.title,
      subject_id: r.subject_id,
      subject_name: r.subject_name,
      subject_icon: r.subject_icon,
      subject_color: r.subject_color,
      score_over_20: r.max_score > 0 ? Math.round((r.score / r.max_score) * 200) / 10 : 0,
      raw_score: r.score,
      max_score: r.max_score,
      year: null,
      completed_at: r.completed_at,
      date: r.completed_at.slice(0, 10),
      relative: "",
      trend: null,
    })),
    ...examRows.map((r) => ({
      id: r.id,
      type: "exam" as const,
      title: r.title,
      subject_id: r.subject_id,
      subject_name: r.subject_name,
      subject_icon: r.subject_icon,
      subject_color: r.subject_color,
      score_over_20: Math.round(r.score_over_20 * 10) / 10,
      raw_score: r.score,
      max_score: null,
      year: r.year,
      completed_at: r.completed_at,
      date: r.completed_at.slice(0, 10),
      relative: "",
      trend: null,
    })),
  ];

  results.sort((a, b) => (a.completed_at < b.completed_at ? 1 : -1));

  const prevBySubject = new Map<number, number>();
  for (const r of [...results].sort((a, b) => (a.completed_at > b.completed_at ? 1 : -1))) {
    const prev = prevBySubject.get(r.subject_id);
    if (prev === undefined) {
      r.trend = null;
    } else if (r.score_over_20 > prev) {
      r.trend = "up";
    } else if (r.score_over_20 < prev) {
      r.trend = "down";
    } else {
      r.trend = "flat";
    }
    prevBySubject.set(r.subject_id, r.score_over_20);
  }

  return results.slice(0, limit).map((r) => ({ ...r, relative: relativeLabel(r.date) }));
}

export interface DashboardData {
  child: ParentChild | null;
  objectives: number;
  study_time: number;
  streak: number;
  estimated_average: number;
  average_delta: number;
  delta_label: string;
  results: RecentResult[];
  strong: SubjectStat | null;
  weak: SubjectStat | null;
  advice: string;
  total_results: number;
  subjects: SubjectStat[];
}

export function getDashboardData(parentId: number, childId: number): DashboardData {
  const children = getParentChildren(parentId);
  const child = children.find((c) => c.child_id === childId) ?? children[0] ?? null;
  if (!child) {
    return {
      child: null,
      objectives: 0,
      study_time: 0,
      streak: 0,
      estimated_average: 0,
      average_delta: 0,
      delta_label: "",
      results: [],
      strong: null,
      weak: null,
      advice: "",
      total_results: 0,
      subjects: [],
    };
  }
  const id = child.child_id;
  const week = getWeeklyActivity(id);
  const subjects = getSubjectStats(id);
  const results = getRecentResults(id, 4);

  const avgValues = subjects.length ? subjects.reduce((s, x) => s + x.avg_over_20, 0) / subjects.length : 0;
  const estimated_average = Math.round(avgValues * 10) / 10;

  const oldRows = query<{ score: number; max_score: number; score_over_20: number; completed_at: string }>(
    `SELECT qa.score, qa.max_score, NULL AS score_over_20, qa.completed_at FROM quiz_attempts qa WHERE qa.user_id = ? AND qa.completed_at < datetime('now', '-30 days')
     UNION ALL
     SELECT ea.score, NULL AS max_score, ea.score_over_20, ea.completed_at FROM exam_attempts ea WHERE ea.user_id = ? AND ea.completed_at < datetime('now', '-30 days')`,
    id,
    id,
  );
  let oldAvg = 0;
  for (const r of oldRows) {
    oldAvg += r.score_over_20 ?? (r.max_score > 0 ? (r.score / r.max_score) * 20 : 0);
  }
  oldAvg = oldRows.length ? oldAvg / oldRows.length : estimated_average;
  const average_delta = Math.round((estimated_average - oldAvg) * 10) / 10;

  const sorted = [...subjects].sort((a, b) => b.avg_over_20 - a.avg_over_20);
  const strong = sorted[0] ?? null;
  const weak = sorted[sorted.length - 1] ?? null;

  let advice = "";
  if (strong && weak && strong.subject_id !== weak.subject_id) {
    advice = `${child.first_name} progresse bien en ${strong.name}, avec une moyenne de ${strong.avg_over_20.toFixed(1)}/20. Encouragez-le à continuer ses efforts en ${weak.name} (${weak.avg_over_20.toFixed(1)}/20) pour stabiliser ses résultats.`;
  } else if (strong && strong.avg_over_20 < 8) {
    advice = `${child.first_name} a besoin d'un coup de pouce en ${strong.name} (${strong.avg_over_20.toFixed(1)}/20). Encouragez-le à refaire les quiz et les examens blancs de ${strong.name} pour consolider les bases.`;
  } else if (strong) {
    advice = `${child.first_name} est régulier en ${strong.name} (${strong.avg_over_20.toFixed(1)}/20). Continuez à encourager ces efforts : la régularité paie au BAC.`;
  } else {
    advice = `${child.first_name} vient de commencer sa préparation. Encouragez-le à lancer un quiz ou un examen blanc pour établir une première base de suivi.`;
  }

  const objectives = week.activeDays > 0 ? Math.round((week.activeDays / 7) * 100) : 0;

  return {
    child,
    objectives,
    study_time: week.total,
    streak: child.streak,
    estimated_average,
    average_delta,
    delta_label: average_delta > 0 ? `+${average_delta.toFixed(1)}` : average_delta.toFixed(1),
    results,
    strong,
    weak,
    advice,
    total_results: subjects.reduce((s, x) => s + x.attempts, 0),
    subjects,
  };
}

export function getOrCreatePairingCode(userId: number): string {
  const existing = queryOne<{ code: string; expires_at: string | null }>(
    "SELECT code, expires_at FROM pairing_codes WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
    userId,
  );
  if (existing && (!existing.expires_at || new Date(existing.expires_at) > new Date())) {
    return existing.code;
  }
  const code = generateCode();
  run(
    "INSERT INTO pairing_codes (user_id, code, expires_at) VALUES (?, ?, datetime('now', '+30 days'))",
    userId,
    code,
  );
  return code;
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (;;) {
    code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    if (!queryOne<{ id: number }>("SELECT id FROM pairing_codes WHERE code = ?", code)) return code;
  }
}

export function getParentSettings(userId: number) {
  const s = queryOne<{
    academic_alerts: number;
    score_drop: number;
    results_alert: number;
    weekly_report: number;
    encouragement: number;
  }>(
    "SELECT academic_alerts, score_drop, results_alert, weekly_report, encouragement FROM parent_notification_settings WHERE user_id = ?",
    userId,
  );
  return (
    s ?? {
      academic_alerts: 1,
      score_drop: 1,
      results_alert: 1,
      weekly_report: 1,
      encouragement: 1,
    }
  );
}

export function saveParentSettings(
  userId: number,
  fields: Partial<{
    academic_alerts: boolean;
    score_drop: boolean;
    results_alert: boolean;
    weekly_report: boolean;
    encouragement: boolean;
  }>,
) {
  const cur = getParentSettings(userId);
  const next = { ...cur };
  (Object.keys(fields) as (keyof typeof fields)[]).forEach((k) => {
    if (typeof fields[k] === "boolean") (next as Record<string, number>)[k] = fields[k] ? 1 : 0;
  });
  run(
    `INSERT INTO parent_notification_settings (user_id, academic_alerts, score_drop, results_alert, weekly_report, encouragement, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET
       academic_alerts = excluded.academic_alerts,
       score_drop = excluded.score_drop,
       results_alert = excluded.results_alert,
       weekly_report = excluded.weekly_report,
       encouragement = excluded.encouragement,
       updated_at = excluded.updated_at`,
    userId,
    next.academic_alerts,
    next.score_drop,
    next.results_alert,
    next.weekly_report,
    next.encouragement,
  );
  return next;
}
