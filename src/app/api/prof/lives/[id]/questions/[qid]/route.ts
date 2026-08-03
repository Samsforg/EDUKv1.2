import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { pinQuestion, answerQuestion } from "@/lib/live-prof";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; qid: string }> },
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id, qid } = await params;
  const sessionId = Number(id);
  const questionId = Number(qid);
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Requête invalide" }, { status: 400 });

  if (typeof body.pinned === "boolean") {
    const r = pinQuestion(sessionId, user.id, questionId, body.pinned);
    if (r === null) return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });
    return NextResponse.json(r);
  }

  if (typeof body.answer === "string") {
    const r = answerQuestion(sessionId, user.id, questionId, body.answer);
    if (r === null) return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });
    if ("error" in r) return NextResponse.json({ error: r.error }, { status: 400 });
    return NextResponse.json(r);
  }

  return NextResponse.json({ error: "Aucune action valide" }, { status: 400 });
}
