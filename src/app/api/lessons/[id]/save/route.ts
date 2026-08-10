import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

async function POSTHandler(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const lessonId = Number(id);
  const exists = await queryOne<{ id: number }>(
    "SELECT l.id FROM lessons l JOIN chapters c ON c.id = l.chapter_id WHERE l.id = ? AND l.status = 'approved' AND c.status = 'approved'",
    lessonId,
  );
  if (!exists) return NextResponse.json({ error: "Fiche introuvable" }, { status: 404 });

  const saved = (await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM saved_lessons WHERE user_id = ? AND lesson_id = ?",
    user.id,
    lessonId,
  ))!.c;

  if (saved > 0) {
    await run("DELETE FROM saved_lessons WHERE user_id = ? AND lesson_id = ?", user.id, lessonId);
    return NextResponse.json({ saved: false });
  }

  await run("INSERT INTO saved_lessons (user_id, lesson_id) VALUES (?, ?)", user.id, lessonId);
  return NextResponse.json({ saved: true });
}

export const POST = guardApi("POST /api/lessons/[id]/save", POSTHandler);
