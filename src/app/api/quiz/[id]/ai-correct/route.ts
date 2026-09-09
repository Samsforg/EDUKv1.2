import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { guardApi } from "@/lib/api-guard";
import { getQuizAICorrections } from "@/lib/quiz-ai";
import { queryOne } from "@/lib/db";

async function POSTHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  const { id } = await params;
  const quizId = Number(id);
  const body = await req.json().catch(() => ({}));
  const answers: number[] = Array.isArray(body.answers) ? body.answers : [];
  const exists = await queryOne<{ id: number }>("SELECT id FROM quizzes WHERE id = ? AND status='approved'", quizId);
  if (!exists) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });
  const corrections = await getQuizAICorrections(quizId, answers);
  return NextResponse.json({ corrections });
}
export const POST = guardApi("POST /api/quiz/[id]/ai-correct", POSTHandler);
