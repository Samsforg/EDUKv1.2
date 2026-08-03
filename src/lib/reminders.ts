import { query, queryOne, run } from "@/lib/db";
import { notify } from "@/lib/session";

export interface ReminderSettings {
  enabled: boolean;
  frequency: "daily" | "weekly" | "custom";
  hour: string;
  subject_ids: number[];
  last_reminder_date: string | null;
}

export const DEFAULT_HOUR = "18:30";

export function getReminderSettings(userId: number): ReminderSettings {
  const row = queryOne<{
    enabled: number;
    frequency: string;
    hour: string;
    subjects: string | null;
    last_reminder_date: string | null;
  }>("SELECT enabled, frequency, hour, subjects, last_reminder_date FROM reminder_settings WHERE user_id = ?", userId);

  const subjectIds = row?.subjects
    ? row.subjects
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((n) => Number.isInteger(n) && n > 0)
    : [];

  return {
    enabled: row ? row.enabled === 1 : false,
    frequency: (row?.frequency as ReminderSettings["frequency"]) ?? "daily",
    hour: row?.hour ?? DEFAULT_HOUR,
    subject_ids: subjectIds,
    last_reminder_date: row?.last_reminder_date ?? null,
  };
}

export function saveReminderSettings(
  userId: number,
  data: { enabled: boolean; frequency: string; hour: string; subject_ids: number[] },
) {
  run(
    `INSERT INTO reminder_settings (user_id, enabled, frequency, hour, subjects, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET
       enabled = excluded.enabled,
       frequency = excluded.frequency,
       hour = excluded.hour,
       subjects = excluded.subjects,
       updated_at = datetime('now')`,
    userId,
    data.enabled ? 1 : 0,
    data.frequency,
    data.hour,
    data.subject_ids.join(","),
  );
  return getReminderSettings(userId);
}

export function topReminderSubject(userId: number): { id: number; name: string; icon: string; color: string } | null {
  const settings = getReminderSettings(userId);
  const pref = settings.subject_ids;

  const stats = query<{ subject_id: number; unread: number; best: number | null; name: string; icon: string; color: string }>(
    `SELECT s.id AS subject_id, s.name, s.icon, s.color,
            (SELECT COUNT(*) FROM lessons l JOIN chapters c ON c.id = l.chapter_id WHERE c.subject_id = s.id
              AND NOT EXISTS (SELECT 1 FROM lesson_reads r WHERE r.user_id = ? AND r.lesson_id = l.id)) AS unread,
            (SELECT MAX(a.score * 100.0 / a.max_score) FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id WHERE q.subject_id = s.id AND a.user_id = ?) AS best
     FROM subjects s
     ORDER BY s.id`,
    userId,
    userId,
  );

  const candidates = pref.length > 0 ? stats.filter((s) => pref.includes(s.subject_id)) : stats;
  const ranked = candidates.sort((a, b) => b.unread - a.unread || (a.best ?? 0) - (b.best ?? 0));
  const top = ranked[0] ?? stats[0];
  if (!top) return null;
  return { id: top.subject_id, name: top.name, icon: top.icon, color: top.color };
}

export function maybeSendDailyReminder(userId: number): boolean {
  const settings = getReminderSettings(userId);
  if (!settings.enabled) return false;

  const today = new Date().toISOString().slice(0, 10);
  if (settings.last_reminder_date === today) return false;

  const [h, m] = (settings.hour || DEFAULT_HOUR).split(":").map((v) => Number(v));
  const now = new Date();
  if (now.getHours() * 60 + now.getMinutes() < h * 60 + m) return false;

  const top = topReminderSubject(userId);
  const subjectName = top ? top.name : "tes matières";
  const body = top
    ? `C'est l'heure de ta session de ${subjectName} ! Relis tes fiches et fais un quiz pour valider tes acquis du jour.`
    : "C'est l'heure de réviser ! Relis une fiche et fais un quiz pour valider tes acquis du jour.";

  notify(userId, "Rappel de révision", body, "school");
  run("UPDATE reminder_settings SET last_reminder_date = ? WHERE user_id = ?", today, userId);
  return true;
}
