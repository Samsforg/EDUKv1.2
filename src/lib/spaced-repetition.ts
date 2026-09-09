import { query, queryOne, run } from "@/lib/db";

// Répétition espacée SM-2 simplifiée : planifie le prochain quiz à revoir
// selon la performance (pct) et le nombre de révisions réussies.

export interface ReviewItem {
  quiz_id: number;
  quiz_title: string;
  subject_name: string;
  last_score_pct: number;
  interval_days: number;
  due_at: string;
  repetitions: number;
}

export async function ensureReviewTable(): Promise<void> {
  await run(`CREATE TABLE IF NOT EXISTS spaced_reviews (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    repetitions INTEGER NOT NULL DEFAULT 0,
    interval_days INTEGER NOT NULL DEFAULT 1,
    ease_factor REAL NOT NULL DEFAULT 2.5,
    due_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, quiz_id)
  )`);
}

function nextInterval(pct: number, prevInterval: number, ease: number): { days: number; reps: number; newEase: number } {
  // SM-2 adapté : <60% on recommence, sinon on allonge
  if (pct < 60) return { days: 1, reps: 0, newEase: Math.max(1.3, ease - 0.2) };
  const quality = pct >= 90 ? 5 : pct >= 75 ? 4 : 3;
  const newEase = Math.max(1.3, Math.min(3.0, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))));
  const days = prevInterval <= 1 ? 3 : Math.round(prevInterval * newEase);
  return { days: Math.min(180, days), reps: prevInterval <= 1 ? 1 : 0, newEase };
}

export async function scheduleReview(userId: number, quizId: number, pct: number): Promise<void> {
  await ensureReviewTable();
  const row = await queryOne<{ repetitions: number; interval_days: number; ease_factor: number }>(
    "SELECT repetitions, interval_days, ease_factor FROM spaced_reviews WHERE user_id = ? AND quiz_id = ?",
    userId,
    quizId
  );
  const prev = row ?? { repetitions: 0, interval_days: 1, ease_factor: 2.5 };
  const { days, reps, newEase } = nextInterval(pct, prev.interval_days, prev.ease_factor);
  await run(
    `INSERT INTO spaced_reviews (user_id, quiz_id, repetitions, interval_days, ease_factor, due_at, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now', '+' || ? || ' days'), datetime('now'))
     ON CONFLICT(user_id, quiz_id) DO UPDATE SET
       repetitions = excluded.repetitions,
       interval_days = excluded.interval_days,
       ease_factor = excluded.ease_factor,
       due_at = excluded.due_at,
       updated_at = datetime('now')`,
    userId,
    quizId,
    reps === 0 && pct < 60 ? 0 : prev.repetitions + 1,
    days,
    newEase,
    days
  );
}

export async function getDueReviews(userId: number, limit = 10): Promise<ReviewItem[]> {
  await ensureReviewTable();
  return query<ReviewItem>(
    `SELECT sr.quiz_id, q.title AS quiz_title, COALESCE(sub.name, '') AS subject_name,
            0 AS last_score_pct, sr.interval_days, sr.due_at, sr.repetitions
     FROM spaced_reviews sr
     JOIN quizzes q ON q.id = sr.quiz_id
     LEFT JOIN subjects sub ON sub.id = q.subject_id
     WHERE sr.user_id = ? AND sr.due_at <= datetime('now')
     ORDER BY sr.due_at ASC LIMIT ?`,
    userId,
    limit
  );
}
