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

  const papers = query<{
    id: number;
    category: string;
    year: number;
    title: string;
    duration_minutes: number;
    subject_name: string;
    icon: string;
    color: string;
    question_count: number;
    attempts: number;
    avg_score: number | null;
  }>(
    `SELECT p.id, p.category, p.year, p.title, p.duration_minutes, p.status, s.name AS subject_name, s.icon, s.color,
            (SELECT COUNT(*) FROM questions x WHERE x.paper_id = p.id) AS question_count,
            (SELECT COUNT(*) FROM exam_attempts a WHERE a.paper_id = p.id) AS attempts,
            (SELECT ROUND(AVG(a.score_over_20), 1) FROM exam_attempts a WHERE a.paper_id = p.id) AS avg_score
     FROM exam_papers p JOIN subjects s ON s.id = p.subject_id
     WHERE p.created_by = ?
     ORDER BY p.id DESC`,
    user!.id,
  );
  return NextResponse.json({ papers });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (
    !body || !body.title || !body.subject_id ||
    (body.category !== "BAC" && body.category !== "BEPC") ||
    !body.year || !Array.isArray(body.questions) || body.questions.length === 0
  ) {
    return NextResponse.json({ error: "Données invalides : titre, matière, catégorie, année et questions requis" }, { status: 400 });
  }

  for (const q of body.questions) {
    if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || !Number.isInteger(q.answerIndex) || q.answerIndex < 0 || q.answerIndex >= q.options.length) {
      return NextResponse.json({ error: "Question invalide : vérifie les options et la bonne réponse" }, { status: 400 });
    }
  }

  const subject = queryOne<{ id: number }>("SELECT id FROM subjects WHERE id = ?", Number(body.subject_id));
  if (!subject) return NextResponse.json({ error: "Matière introuvable" }, { status: 400 });

  const result = run(
    "INSERT INTO exam_papers (category, series_id, subject_id, year, title, duration_minutes, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    body.category,
    body.series_id ?? null,
    subject.id,
    Number(body.year),
    body.title.trim(),
    Math.max(10, Number(body.duration_minutes ?? 120)),
    user!.id,
    "pending",
  );
  const paperId = Number(result.lastInsertRowid);

  body.questions.forEach((q: { question: string; options: string[]; answerIndex: number; explanation?: string; points?: number }, i: number) => {
    run(
      "INSERT INTO questions (paper_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, ?, ?)",
      paperId,
      q.question.trim(),
      JSON.stringify(q.options.map((o) => o.trim())),
      q.answerIndex,
      q.explanation?.trim() || null,
      q.points ?? 1,
      i,
    );
  });

  return NextResponse.json({ ok: true, paper_id: paperId }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  const paper = queryOne<{ id: number; created_by: number | null }>(
    "SELECT id, created_by FROM exam_papers WHERE id = ?",
    Number(body.id),
  );
  if (!paper) return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });
  if (paper.created_by !== user!.id) return NextResponse.json({ error: "Pas ton sujet" }, { status: 403 });

  run("DELETE FROM exam_papers WHERE id = ?", paper.id);
  return NextResponse.json({ ok: true });
}
