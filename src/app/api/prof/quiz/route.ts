import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

export async function GET() {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const quizzes = query<{
    id: number;
    subject_name: string;
    icon: string;
    color: string;
    title: string;
    level: string;
    question_count: number;
    attempts: number;
    avg_percent: number | null;
  }>(
    `SELECT q.id, s.name AS subject_name, s.icon, s.color, q.title, q.level, q.status,
            (SELECT COUNT(*) FROM questions x WHERE x.quiz_id = q.id) AS question_count,
            (SELECT COUNT(*) FROM quiz_attempts a WHERE a.quiz_id = q.id) AS attempts,
            (SELECT ROUND(AVG(a.score * 100.0 / a.max_score)) FROM quiz_attempts a WHERE a.quiz_id = q.id) AS avg_percent
     FROM quizzes q JOIN subjects s ON s.id = q.subject_id
     WHERE q.created_by = ?
     ORDER BY q.id DESC`,
    user!.id,
  );
  return NextResponse.json({ quizzes });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.title || !body.subject_id || !Array.isArray(body.questions) || body.questions.length === 0) {
    return NextResponse.json({ error: "Données invalides : titre, matière et questions requis" }, { status: 400 });
  }

  for (const q of body.questions) {
    if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || !Number.isInteger(q.answerIndex) || q.answerIndex < 0 || q.answerIndex >= q.options.length) {
      return NextResponse.json({ error: "Question invalide : vérifie les options et la bonne réponse" }, { status: 400 });
    }
  }

  const subject = queryOne<{ id: number }>("SELECT id FROM subjects WHERE id = ?", Number(body.subject_id));
  if (!subject) return NextResponse.json({ error: "Matière introuvable" }, { status: 400 });

  const lastPos = queryOne<{ p: number }>("SELECT MAX(position) AS p FROM quizzes");
  const result = run(
    "INSERT INTO quizzes (subject_id, title, level, position, created_by, status) VALUES (?, ?, ?, ?, ?, ?)",
    subject.id,
    body.title.trim(),
    body.level ?? "Terminale",
    (lastPos?.p ?? 0) + 1,
    user!.id,
    "pending",
  );
  const quizId = Number(result.lastInsertRowid);

  body.questions.forEach((q: { question: string; options: string[]; answerIndex: number; explanation?: string; points?: number }, i: number) => {
    run(
      "INSERT INTO questions (quiz_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, ?, ?)",
      quizId,
      q.question.trim(),
      JSON.stringify(q.options.map((o) => o.trim())),
      q.answerIndex,
      q.explanation?.trim() || null,
      q.points ?? 1,
      i,
    );
  });

  return NextResponse.json({ ok: true, quiz_id: quizId }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  const quiz = queryOne<{ id: number; created_by: number | null }>(
    "SELECT id, created_by FROM quizzes WHERE id = ?",
    Number(body.id),
  );
  if (!quiz) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });
  if (quiz.created_by !== user!.id) return NextResponse.json({ error: "Pas ton quiz" }, { status: 403 });

  run("DELETE FROM quizzes WHERE id = ?", quiz.id);
  return NextResponse.json({ ok: true });
}
