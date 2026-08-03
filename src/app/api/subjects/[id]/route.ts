import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const subjectId = Number(id);

  const subject = queryOne<{ id: number; name: string; icon: string; color: string }>(
    "SELECT id, name, icon, color FROM subjects WHERE id = ?",
    subjectId,
  );
  if (!subject) return NextResponse.json({ error: "Matière introuvable" }, { status: 404 });

  const chapters = query<{
    id: number;
    title: string;
    position: number;
    lessons_total: number;
    lessons_read: number;
    quiz_count: number;
    attempts: number;
    best_percent: number | null;
  }>(
    `SELECT c.id, c.title, c.position,
            (SELECT COUNT(*) FROM lessons l WHERE l.chapter_id = c.id) AS lessons_total,
            (SELECT COUNT(*) FROM lessons l JOIN lesson_reads lr ON lr.lesson_id = l.id
             WHERE l.chapter_id = c.id AND lr.user_id = ?) AS lessons_read,
            (SELECT COUNT(*) FROM quizzes q WHERE q.chapter_id = c.id AND q.status = 'approved') AS quiz_count,
            (SELECT COUNT(*) FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
             WHERE q.chapter_id = c.id AND q.status = 'approved' AND a.user_id = ?) AS attempts,
            (SELECT MAX(score * 100.0 / max_score) FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
             WHERE q.chapter_id = c.id AND q.status = 'approved' AND a.user_id = ?) AS best_percent
     FROM chapters c WHERE c.subject_id = ?
     ORDER BY c.position`,
    user.id,
    user.id,
    user.id,
    subjectId,
  );

  const lessonsTotal = chapters.reduce((a, c) => a + c.lessons_total, 0);
  const lessonsRead = chapters.reduce((a, c) => a + c.lessons_read, 0);
  const quizzesTotal = chapters.reduce((a, c) => a + c.quiz_count, 0);
  const attempts = chapters.reduce((a, c) => a + c.attempts, 0);
  const bestPercent = chapters.reduce<number>(
    (max, c) => Math.max(max, c.best_percent ?? -1),
    -1,
  );

  return NextResponse.json({
    subject: { ...subject, lessons_total: lessonsTotal, lessons_read: lessonsRead, quizzes_total: quizzesTotal, attempts, best_percent: bestPercent >= 0 ? bestPercent : null },
    chapters: chapters.map((c) => ({
      ...c,
      best_percent: c.best_percent !== null ? Math.round(c.best_percent) : null,
      progress: c.lessons_total > 0 ? Math.round((c.lessons_read / c.lessons_total) * 100) : 0,
    })),
  });
}
