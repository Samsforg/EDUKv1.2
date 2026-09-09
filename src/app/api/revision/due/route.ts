import { NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";
import { getDueReviews, type ReviewItem } from "@/lib/spaced-repetition";
import { query, queryOne } from "@/lib/db";

interface EnrichedReview extends ReviewItem {
  best_score: number | null;
  attempts_count: number;
  icon: string;
  color: string;
}

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const due = await getDueReviews(user.id, 20);

  const enriched: EnrichedReview[] = [];
  for (const r of due) {
    const stats = await queryOne<{ best: number | null; cnt: number }>(
      `SELECT MAX(ROUND(score * 100.0 / NULLIF(max_score, 0))) AS best, COUNT(*) AS cnt
       FROM quiz_attempts WHERE user_id = ? AND quiz_id = ?`,
      user.id,
      r.quiz_id,
    );
    const subj = await queryOne<{ icon: string; color: string }>(
      "SELECT icon, color FROM subjects WHERE name = ?",
      r.subject_name,
    );
    enriched.push({
      ...r,
      best_score: stats?.best ?? null,
      attempts_count: stats?.cnt ?? 0,
      icon: subj?.icon ?? "quiz",
      color: subj?.color ?? "#1976d2",
    });
  }

  const totalDue = enriched.length;
  const overdue = enriched.filter((r) => new Date(r.due_at) < new Date()).length;
  const dueToday = totalDue - overdue;

  // Streak info
  const streak = await queryOne<{ streak: number }>(
    "SELECT streak FROM users WHERE id = ?",
    user.id,
  );

  return NextResponse.json({
    reviews: enriched,
    summary: {
      total: totalDue,
      overdue,
      due_today: dueToday,
      streak: streak?.streak ?? 0,
    },
  });
}

export const GET = guardApi("GET /api/revision/due", GETHandler);
