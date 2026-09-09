import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

async function GETHandler() {
  const user = await getCurrentUser();
  const subjects = await query<{
    id: number;
    code: string;
    name: string;
    icon: string;
    color: string;
    quiz_count: number;
    paper_count: number;
    best_score: number | null;
    lessons_total: number;
    lessons_read: number;
    quiz_attempts: number;
  }>(
    `SELECT s.id, s.code, s.name, s.icon, s.color,
            (SELECT COUNT(*) FROM quizzes q WHERE q.subject_id = s.id AND q.status = 'approved') AS quiz_count,
            (SELECT COUNT(*) FROM exam_papers p WHERE p.subject_id = s.id AND p.status = 'approved') AS paper_count,
            (SELECT MAX(score * 100.0 / max_score) FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
             WHERE q.subject_id = s.id AND a.user_id = ?) AS best_score,
            (SELECT COUNT(*) FROM lessons l
             JOIN chapters c ON c.id = l.chapter_id
             WHERE c.subject_id = s.id AND c.status = 'approved' AND l.status = 'approved') AS lessons_total,
            (SELECT COUNT(*) FROM lessons l
             JOIN chapters c ON c.id = l.chapter_id
             JOIN lesson_reads lr ON lr.lesson_id = l.id
             WHERE c.subject_id = s.id AND c.status = 'approved' AND l.status = 'approved' AND lr.user_id = ?) AS lessons_read,
            (SELECT COUNT(*) FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
             WHERE q.subject_id = s.id AND a.user_id = ?) AS quiz_attempts
     FROM subjects s ORDER BY s.id`,
    user?.id ?? 0,
    user?.id ?? 0,
    user?.id ?? 0,
  );
  const res = NextResponse.json({ subjects });
  res.headers.set("Cache-Control", "private, max-age=30, stale-while-revalidate=300");
  return res;
}

export const GET = guardApi("GET /api/subjects", GETHandler);
