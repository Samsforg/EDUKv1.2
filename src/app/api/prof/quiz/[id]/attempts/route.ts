import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const quiz = queryOne<{ id: number; title: string; created_by: number | null }>(
    "SELECT id, title, created_by FROM quizzes WHERE id = ?",
    Number(id),
  );
  if (!quiz) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });
  if (quiz.created_by !== user.id) return NextResponse.json({ error: "Pas ton quiz" }, { status: 403 });

  const attempts = query<{
    id: number;
    student_first: string;
    student_last: string;
    student_email: string | null;
    score: number;
    max_score: number;
    pct: number;
    completed_at: string;
    answers: string;
  }>(
    `SELECT a.id, u.first_name AS student_first, u.last_name AS student_last, u.email AS student_email,
            a.score, a.max_score, ROUND(a.score * 100.0 / a.max_score) AS pct, a.completed_at, a.answers
     FROM quiz_attempts a JOIN users u ON u.id = a.user_id
     WHERE a.quiz_id = ?
     ORDER BY a.completed_at DESC`,
    Number(id),
  );

  return NextResponse.json({
    quiz: { id: quiz.id, title: quiz.title },
    attempts: attempts.map((a) => {
      let parsed: unknown[] = [];
      try {
        parsed = JSON.parse(a.answers);
      } catch {}
      return { ...a, answers: parsed };
    }),
    summary: {
      total: attempts.length,
      avg_pct: attempts.length > 0 ? Math.round(attempts.reduce((acc, x) => acc + (x.pct ?? 0), 0) / attempts.length) : null,
      best_pct: attempts.length > 0 ? Math.max(...attempts.map((x) => x.pct ?? 0)) : null,
      students: new Set(attempts.map((x) => x.student_first + " " + x.student_last)).size,
    },
  });
}
