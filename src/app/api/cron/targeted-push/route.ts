import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { query, queryOne } from "@/lib/db";
import { sendPushToUser } from "@/lib/push";
import { logger } from "@/lib/logger";
import { requireCronSecret } from "@/lib/cron-auth";

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  let notified = 0;
  let failed = 0;

  // 1. Notify students about new approved quizzes in their enrolled subjects
  const newQuizzes = await query<{ id: number; title: string; subject_name: string; created_by: number }>(
    `SELECT q.id, q.title, s.name AS subject_name, q.created_by
     FROM quizzes q JOIN subjects s ON s.id = q.subject_id
     WHERE q.status = 'approved' AND q.created_at >= datetime('now', '-1 day')`
  );

  for (const quiz of newQuizzes) {
    // Get students who follow this subject (via prof_subjects or class enrollment)
    const students = await query<{ user_id: number }>(
      `SELECT DISTINCT cs.student_id AS user_id
       FROM class_students cs
       JOIN classes c ON c.id = cs.class_id
       WHERE c.subject_id = (SELECT subject_id FROM quizzes WHERE id = ?)
       UNION
       SELECT DISTINCT u.id AS user_id
       FROM users u
       WHERE u.role = 'student' AND u.grade_id IS NOT NULL
       AND NOT EXISTS (
         SELECT 1 FROM class_students cs2
         JOIN classes c2 ON c2.id = cs2.class_id
         WHERE cs2.student_id = u.id AND c2.subject_id = (SELECT subject_id FROM quizzes WHERE id = ?)
       )
       LIMIT 200`,
      quiz.id,
      quiz.id,
    );

    for (const s of students) {
      try {
        await sendPushToUser(s.user_id, {
          title: `Nouveau quiz : ${quiz.subject_name}`,
          body: `« ${quiz.title} » est maintenant disponible. Teste-toi !`,
          url: `/quiz`,
          tag: `new-quiz-${quiz.id}`,
        });
        notified++;
      } catch {
        failed++;
      }
    }
  }

  // 2. Notify about newly approved lessons
  const newLessons = await query<{ id: number; title: string; subject_name: string }>(
    `SELECT l.id, l.title, s.name AS subject_name
     FROM lessons l
     JOIN chapters ch ON ch.id = l.chapter_id
     JOIN subjects s ON s.id = ch.subject_id
     WHERE l.status = 'approved' AND l.created_at >= datetime('now', '-1 day')
     LIMIT 10`
  );

  for (const lesson of newLessons) {
    const students = await query<{ user_id: number }>(
      `SELECT DISTINCT cs.student_id AS user_id
       FROM class_students cs
       JOIN classes c ON c.id = cs.class_id
       JOIN subjects s ON s.id = c.subject_id
       WHERE s.name = ?
       LIMIT 200`,
      lesson.subject_name,
    );

    for (const s of students) {
      try {
        await sendPushToUser(s.user_id, {
          title: `Nouvelle leçon : ${lesson.subject_name}`,
          body: `« ${lesson.title} » vient d'être publié. Commence à réviser !`,
          url: `/matieres`,
          tag: `new-lesson-${lesson.id}`,
        });
        notified++;
      } catch {
        failed++;
      }
    }
  }

  logger.info("cron:targeted-push", { notified, failed, quizzes: newQuizzes.length, lessons: newLessons.length });
  return NextResponse.json({ ok: true, notified, failed });
}

export const GET = guardApi("GET /api/cron/targeted-push", GETHandler);
