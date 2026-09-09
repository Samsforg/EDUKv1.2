import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";
import { query, queryOne } from "@/lib/db";

async function GETHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "teacher") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const { id: studentId } = await params;
  const sid = Number(studentId);

  // Verify the teacher shares at least one class with this student
  const shared = await queryOne<{ c: number }>(
    `SELECT COUNT(*) AS c FROM class_students cs
     JOIN classes c ON c.id = cs.class_id
     WHERE c.teacher_id = ? AND cs.user_id = ?`,
    user.id,
    sid,
  );
  if (!shared || shared.c === 0) {
    return NextResponse.json({ error: "Cet élève n'est pas dans tes classes" }, { status: 403 });
  }

  // Student profile
  const student = await queryOne<{
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    class_level: string | null;
    xp: number;
    streak: number;
    commune: string | null;
    created_at: string;
    last_active_at: string | null;
  }>(
    `SELECT id, first_name, last_name, email, class_level, xp, streak, commune, created_at, last_active_at
     FROM users WHERE id = ?`,
    sid,
  );
  if (!student) return NextResponse.json({ error: "Élève introuvable" }, { status: 404 });

  // Classes this student shares with the teacher
  const classes = await query<{ class_id: number; class_name: string; subject_name: string | null }>(
    `SELECT c.id AS class_id, c.name AS class_name, s.name AS subject_name
     FROM class_students cs
     JOIN classes c ON c.id = cs.class_id
     LEFT JOIN subjects s ON s.id = c.subject_id
     WHERE c.teacher_id = ? AND cs.user_id = ?
     ORDER BY c.name`,
    user.id,
    sid,
  );

  // Quiz attempts by subject
  const bySubject = await query<{
    subject_name: string;
    icon: string;
    color: string;
    attempts: number;
    avg_pct: number | null;
    best_pct: number | null;
  }>(
    `SELECT s.name AS subject_name, s.icon, s.color,
            COUNT(*) AS attempts,
            ROUND(AVG(a.score * 100.0 / NULLIF(a.max_score, 0))) AS avg_pct,
            MAX(ROUND(a.score * 100.0 / NULLIF(a.max_score, 0))) AS best_pct
     FROM quiz_attempts a
     JOIN quizzes q ON q.id = a.quiz_id
     JOIN subjects s ON s.id = q.subject_id
     WHERE a.user_id = ?
     GROUP BY s.id, s.name, s.icon, s.color
     ORDER BY attempts DESC`,
    sid,
  );

  // Recent quiz attempts (last 10)
  const recentAttempts = await query<{
    quiz_id: number;
    quiz_title: string;
    subject_name: string;
    score: number;
    max_score: number;
    pct: number;
    completed_at: string;
  }>(
    `SELECT a.quiz_id, q.title AS quiz_title, s.name AS subject_name,
            a.score, a.max_score,
            ROUND(a.score * 100.0 / NULLIF(a.max_score, 0)) AS pct,
            a.completed_at
     FROM quiz_attempts a
     JOIN quizzes q ON q.id = a.quiz_id
     JOIN subjects s ON s.id = q.subject_id
     WHERE a.user_id = ?
     ORDER BY a.completed_at DESC
     LIMIT 10`,
    sid,
  );

  // Exam attempts
  const examAttempts = await query<{
    paper_id: number;
    paper_title: string;
    score: number;
    max_score: number;
    pct: number;
    completed_at: string;
  }>(
    `SELECT ea.paper_id, ep.title AS paper_title,
            ea.score, ep.total_points AS max_score,
            ROUND(ea.score * 100.0 / NULLIF(ep.total_points, 0)) AS pct,
            ea.completed_at
     FROM exam_attempts ea
     JOIN exam_papers ep ON ep.id = ea.paper_id
     WHERE ea.user_id = ?
     ORDER BY ea.completed_at DESC
     LIMIT 10`,
    sid,
  );

  // Assignment submissions
  const assignments = await query<{
    assignment_id: number;
    title: string;
    subject_name: string | null;
    score: number | null;
    max_score: number;
    submitted_at: string | null;
    status: string;
  }>(
    `SELECT asub.assignment_id, ca.title, s.name AS subject_name,
            asub.score, ca.max_score, asub.submitted_at, asub.status
     FROM assignment_submissions asub
     JOIN class_assignments ca ON ca.id = asub.assignment_id
     LEFT JOIN subjects s ON s.id = ca.subject_id
     WHERE asub.user_id = ?
     ORDER BY asub.submitted_at DESC
     LIMIT 10`,
    sid,
  );

  // Weaknesses: subjects where avg is below 60%
  const weaknesses = bySubject.filter((s) => s.avg_pct != null && s.avg_pct < 60);

  // Strengths: subjects where avg is above 80%
  const strengths = bySubject.filter((s) => s.avg_pct != null && s.avg_pct >= 80);

  return NextResponse.json({
    student,
    classes,
    by_subject: bySubject,
    recent_attempts: recentAttempts,
    exam_attempts: examAttempts,
    assignments,
    analysis: {
      total_quizzes: bySubject.reduce((s, r) => s + r.attempts, 0),
      overall_avg: bySubject.length > 0
        ? Math.round(bySubject.reduce((s, r) => s + (r.avg_pct ?? 0), 0) / bySubject.length)
        : null,
      strengths: strengths.map((s) => s.subject_name),
      weaknesses: weaknesses.map((s) => s.subject_name),
    },
  });
}

export const GET = guardApi("GET /api/prof/student/[id]", GETHandler);
