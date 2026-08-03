import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const rows = query<{
    subject_id: number;
    subject_name: string;
    icon: string;
    color: string;
    chapter_id: number;
    chapter_title: string;
    chapter_pos: number;
    lesson_id: number;
    lesson_title: string;
    saved: number;
    read: number;
  }>(
    `SELECT s.id AS subject_id, s.name AS subject_name, s.icon, s.color,
            c.id AS chapter_id, c.title AS chapter_title, c.position AS chapter_pos,
            l.id AS lesson_id, l.title AS lesson_title,
            (SELECT COUNT(*) FROM saved_lessons sl WHERE sl.user_id = ? AND sl.lesson_id = l.id) AS saved,
            (SELECT COUNT(*) FROM lesson_reads lr WHERE lr.user_id = ? AND lr.lesson_id = l.id) AS read
     FROM subjects s
     JOIN chapters c ON c.subject_id = s.id
     JOIN lessons l ON l.chapter_id = c.id
     ORDER BY s.id, c.position, l.position`,
    user.id,
    user.id,
  );

  const subjects: Record<
    number,
    { id: number; name: string; icon: string; color: string; chapters: Record<number, { id: number; title: string; lessons: unknown[] }> }
  > = {};

  for (const r of rows) {
    subjects[r.subject_id] ??= {
      id: r.subject_id,
      name: r.subject_name,
      icon: r.icon,
      color: r.color,
      chapters: {},
    };
    const ch = (subjects[r.subject_id].chapters[r.chapter_id] ??= {
      id: r.chapter_id,
      title: r.chapter_title,
      lessons: [],
    });
    ch.lessons.push({
      id: r.lesson_id,
      title: r.lesson_title,
      saved: r.saved > 0,
      read: r.read > 0,
    });
  }

  return NextResponse.json({
    subjects: Object.values(subjects).map((s) => ({
      ...s,
      chapters: Object.values(s.chapters),
    })),
  });
}
