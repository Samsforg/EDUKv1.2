import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getCurrentUser();
  const quiz = queryOne<{ id: number; title: string; subject_id: number; level: string }>(
    "SELECT id, title, subject_id, level FROM quizzes WHERE id = ? AND status = 'approved'",
    Number(id),
  );
  if (!quiz) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });

  const questions = query<{ id: number; question: string; options: string; points: number }>(
    "SELECT id, question, options, points FROM questions WHERE quiz_id = ? ORDER BY position",
    Number(id),
  );
  const lastAttempt = user
    ? queryOne<{ score: number; max_score: number }>(
        "SELECT score, max_score FROM quiz_attempts WHERE quiz_id = ? AND user_id = ? ORDER BY id DESC LIMIT 1",
        Number(id),
        user.id,
      )
    : null;

  return NextResponse.json({
    quiz,
    questions: questions.map((x) => ({ ...x, options: JSON.parse(x.options) })),
    lastAttempt,
  });
}
