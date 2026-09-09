import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne, query } from "@/lib/db";

async function GETHandler(
  _req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const quiz = await queryOne<{
    id: number;
    title: string;
    level: string;
    status: string;
    subject_name: string;
    icon: string;
    color: string;
    created_by: number | null;
  }>(
    `SELECT q.id, q.title, q.level, q.status, s.name AS subject_name, s.icon, s.color, q.created_by
     FROM quizzes q JOIN subjects s ON s.id = q.subject_id
     WHERE q.share_token = ? AND q.status = 'approved'`,
    token,
  );
  if (!quiz) return NextResponse.json({ error: "Quiz introuvable ou non publié" }, { status: 404 });

  const questions = await query<{
    id: number;
    question: string;
    options: string;
    points: number;
  }>(
    "SELECT id, question, options, points FROM questions WHERE quiz_id = ? ORDER BY position",
    quiz.id,
  );

  const author = quiz.created_by
    ? await queryOne<{ first_name: string; last_name: string }>(
        "SELECT first_name, last_name FROM users WHERE id = ?",
        quiz.created_by,
      )
    : null;

  return NextResponse.json({
    quiz: {
      id: quiz.id,
      title: quiz.title,
      level: quiz.level,
      subject_name: quiz.subject_name,
      icon: quiz.icon,
      color: quiz.color,
      author: author ? `${author.first_name} ${author.last_name}` : null,
    },
    questions: questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: JSON.parse(q.options),
      points: q.points,
    })),
  });
}

export const GET = guardApi("GET /api/quiz/share/[token]", GETHandler);
