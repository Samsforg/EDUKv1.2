import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { startOrResumeSession } from "@/lib/proctoring";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const paper = queryOne<{
    id: number;
    category: string;
    year: number;
    title: string;
    duration_minutes: number;
    subject_name: string;
  }>(
    `SELECT p.id, p.category, p.year, p.title, p.duration_minutes, s.name AS subject_name
     FROM exam_papers p JOIN subjects s ON s.id = p.subject_id WHERE p.id = ? AND p.status = 'approved'`,
    Number(id),
  );
  if (!paper) return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });

  const questions = query<{ id: number; question: string; options: string; points: number; explanation: string | null }>(
    "SELECT id, question, options, points, explanation FROM questions WHERE paper_id = ? ORDER BY position",
    Number(id),
  );

  const user = await getCurrentUser();
  if (user && user.role === "student") {
    startOrResumeSession(user.id, Number(id));
  }

  return NextResponse.json({
    paper,
    questions: questions.map((x) => ({ ...x, options: JSON.parse(x.options) })),
  });
}
