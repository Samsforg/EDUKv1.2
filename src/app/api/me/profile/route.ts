import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const serie = queryOne<{ code: string; name: string }>(
    "SELECT code, name FROM series WHERE id = ?",
    user.serie_id ?? 0,
  );

  const quizStats = query<{ best_percent: number | null; total_attempts: number }>(
    `SELECT MAX(a.score * 100.0 / a.max_score) AS best_percent, COUNT(a.id) AS total_attempts
     FROM quiz_attempts a WHERE a.user_id = ?`,
    user.id,
  );
  const quizzesDone = quizStats.reduce((acc, s) => acc + s.total_attempts, 0);

  const examStats = queryOne<{ best: number | null; count: number }>(
    "SELECT MAX(score_over_20) AS best, COUNT(*) AS count FROM exam_attempts WHERE user_id = ?",
    user.id,
  );

  const globalScore =
    quizStats.length === 0
      ? null
      : (() => {
          const withScore = quizStats.filter((s) => s.best_percent !== null);
          if (withScore.length === 0) return null;
          return Math.round((withScore.reduce((acc, s) => acc + (s.best_percent ?? 0), 0) / withScore.length) * 100) / 100;
        })();

  const allBadges = query<{
    code: string;
    name: string;
    icon: string;
    description: string;
    earned_at: string | null;
  }>(
    `SELECT b.code, b.name, b.icon, b.description, ub.earned_at
     FROM badges b
     LEFT JOIN user_badges ub ON ub.badge_id = b.id AND ub.user_id = ?
     ORDER BY ub.earned_at IS NULL, ub.earned_at DESC, b.id`,
    user.id,
  );

  const quizHistory = query<{
    id: number;
    title: string;
    score: number;
    max_score: number;
    completed_at: string;
  }>(
    `SELECT q.id, q.title, a.score, a.max_score, a.completed_at
     FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
     WHERE a.user_id = ? ORDER BY a.completed_at DESC LIMIT 10`,
    user.id,
  );

  const examHistory = query<{
    id: number;
    title: string;
    score_over_20: number;
    duration_seconds: number;
    completed_at: string;
  }>(
    `SELECT p.id, p.title, a.score_over_20, a.duration_seconds, a.completed_at
     FROM exam_attempts a JOIN exam_papers p ON p.id = a.paper_id
     WHERE a.user_id = ? ORDER BY a.completed_at DESC LIMIT 10`,
    user.id,
  );

  return NextResponse.json({
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      serie: serie ?? null,
      xp: user.xp,
      streak: user.streak,
    },
    stats: {
      global_score: globalScore,
      quizzes_done: quizzesDone,
      exams_done: examStats?.count ?? 0,
      best_exam: examStats?.best ?? null,
      badges_earned: allBadges.filter((b) => b.earned_at !== null).length,
    },
    badges: allBadges,
    quiz_history: quizHistory,
    exam_history: examHistory,
  });
}
