import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const lessonId = Number(id);
  const exists = queryOne<{ id: number }>("SELECT id FROM lessons WHERE id = ?", lessonId);
  if (!exists) return NextResponse.json({ error: "Fiche introuvable" }, { status: 404 });

  const saved = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM saved_lessons WHERE user_id = ? AND lesson_id = ?",
    user.id,
    lessonId,
  )!.c;

  if (saved > 0) {
    run("DELETE FROM saved_lessons WHERE user_id = ? AND lesson_id = ?", user.id, lessonId);
    return NextResponse.json({ saved: false });
  }

  run("INSERT INTO saved_lessons (user_id, lesson_id) VALUES (?, ?)", user.id, lessonId);
  return NextResponse.json({ saved: true });
}
