import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { maybeSendDailyReminder } from "@/lib/reminders";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  maybeSendDailyReminder(user.id);

  const me = queryOne<{ xp: number; streak: number; role: string }>(
    "SELECT xp, streak, role FROM users WHERE id = ?",
    user.id,
  )!;

  const quizStats = query<{
    subject_id: number;
    name: string;
    icon: string;
    color: string;
    best_percent: number | null;
    total_attempts: number;
  }>(
    `SELECT s.id AS subject_id, s.name, s.icon, s.color,
            MAX(a.score * 100.0 / a.max_score) AS best_percent,
            COUNT(a.id) AS total_attempts
     FROM subjects s
     LEFT JOIN quizzes q ON q.subject_id = s.id
     LEFT JOIN quiz_attempts a ON a.quiz_id = q.id AND a.user_id = ?
     GROUP BY s.id ORDER BY s.id`,
    user.id,
  );

  const examBest = queryOne<{ best: number | null; count: number }>(
    `SELECT MAX(score_over_20) AS best, COUNT(*) AS count FROM exam_attempts WHERE user_id = ?`,
    user.id,
  );

  const recentQuizzes = query<{
    id: number;
    title: string;
    score: number;
    max_score: number;
    completed_at: string;
  }>(
    `SELECT q.id, q.title, a.score, a.max_score, a.completed_at
     FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
     WHERE a.user_id = ? ORDER BY a.completed_at DESC LIMIT 5`,
    user.id,
  );

  const badges = query<{ code: string; name: string; icon: string; description: string; earned_at: string }>(
    `SELECT b.code, b.name, b.icon, b.description, ub.earned_at
     FROM user_badges ub JOIN badges b ON b.id = ub.badge_id
     WHERE ub.user_id = ? ORDER BY ub.earned_at DESC`,
    user.id,
  );

  const totalPossible = quizStats.reduce((acc, s) => acc + s.total_attempts, 0);
  const globalScore =
    quizStats.length === 0
      ? 0
      : Math.round(
          (quizStats.reduce((acc, s) => acc + (s.best_percent ?? 0), 0) /
            Math.max(1, quizStats.filter((s) => s.best_percent !== null).length)) *
            100,
        ) / 100;

  return NextResponse.json({
    xp: me.xp,
    streak: me.streak,
    global_score: totalPossible > 0 ? Math.round(globalScore * 100) / 100 : null,
    per_subject: quizStats.map((s) => ({
      ...s,
      best_percent: s.best_percent !== null ? Math.round(s.best_percent) : null,
    })),
    exams: {
      best: examBest?.best ?? null,
      count: examBest?.count ?? 0,
    },
    recent_quizzes: recentQuizzes,
    badges,
  });
}
