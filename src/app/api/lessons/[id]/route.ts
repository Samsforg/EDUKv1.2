import { NextRequest, NextResponse } from "next/server";
import { queryOne, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const lesson = queryOne<{
    id: number;
    title: string;
    summary: string;
    content: string | null;
    position: number;
    chapter_id: number;
    chapter_title: string;
    subject_id: number;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
  }>(
    `SELECT l.id, l.title, l.summary, l.content, l.position,
            c.id AS chapter_id, c.title AS chapter_title,
            s.id AS subject_id, s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     JOIN subjects s ON s.id = c.subject_id
     WHERE l.id = ?`,
    Number(id),
  );
  if (!lesson) return NextResponse.json({ error: "Fiche introuvable" }, { status: 404 });

  const siblings = query<{ id: number; title: string }>(
    "SELECT id, title FROM lessons WHERE chapter_id = ? ORDER BY position",
    lesson.chapter_id,
  );
  const idx = siblings.findIndex((s) => s.id === lesson.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const saved = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM saved_lessons WHERE user_id = ? AND lesson_id = ?",
    user.id,
    lesson.id,
  )!.c;
  const read = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM lesson_reads WHERE user_id = ? AND lesson_id = ?",
    user.id,
    lesson.id,
  )!.c;

  return NextResponse.json({
    lesson: {
      id: lesson.id,
      title: lesson.title,
      summary: lesson.summary,
      content: lesson.content ?? "",
      chapterId: lesson.chapter_id,
      chapter: lesson.chapter_title,
      subjectId: lesson.subject_id,
      subject: lesson.subject_name,
      subjectIcon: lesson.subject_icon,
      subjectColor: lesson.subject_color,
      saved: saved > 0,
      read: read > 0,
    },
    prev,
    next,
  });
}
