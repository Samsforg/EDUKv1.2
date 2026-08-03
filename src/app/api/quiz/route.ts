import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  const quizzes = query<{
    id: number;
    subject_id: number;
    subject_name: string;
    icon: string;
    color: string;
    title: string;
    level: string;
    question_count: number;
    best_percent: number | null;
    attempts: number;
  }>(
    `SELECT q.id, q.subject_id, s.name AS subject_name, s.icon, s.color, q.title, q.level,
            (SELECT COUNT(*) FROM questions x WHERE x.quiz_id = q.id) AS question_count,
            (SELECT MAX(a.score * 100.0 / a.max_score) FROM quiz_attempts a WHERE a.quiz_id = q.id AND a.user_id = ?) AS best_percent,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.quiz_id = q.id AND a.user_id = ?) AS attempts
     FROM quizzes q JOIN subjects s ON s.id = q.subject_id
     WHERE q.status = 'approved'
     ORDER BY q.position, q.id`,
    user?.id ?? 0,
    user?.id ?? 0,
  );
  return NextResponse.json({ quizzes });
}
