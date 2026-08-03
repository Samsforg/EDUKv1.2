import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const question = (body?.question ?? "").toString().trim().slice(0, 500);
  if (!question) return NextResponse.json({ error: "Question vide" }, { status: 400 });

  const session = queryOne<{ id: number }>("SELECT id FROM live_sessions WHERE id = ?", Number(id));
  if (!session) return NextResponse.json({ error: "Session introuvable" }, { status: 404 });

  run("INSERT INTO live_questions (session_id, user_id, question) VALUES (?, ?, ?)", Number(id), user.id, question);
  return NextResponse.json({ ok: true });
}
