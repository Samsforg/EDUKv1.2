import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

async function GETHandler(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const cls = await queryOne<{ id: number; teacher_id: number }>(
    "SELECT id, teacher_id FROM classes WHERE id = ?",
    Number(id),
  );
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user!.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });

  const members = await query<{ user_id: number }>(
    "SELECT user_id FROM class_students WHERE class_id = ?",
    Number(id),
  );
  const memberIds = members.map((m) => m.user_id);

  const globalStats = memberIds.length > 0
    ? await query<{ attempts: number; avg_pct: number | null; best_pct: number | null; students: number }>(
        `SELECT COUNT(*) AS attempts,
                ROUND(AVG(a.score * 100.0 / a.max_score)) AS avg_pct,
                MAX(ROUND(a.score * 100.0 / a.max_score)) AS best_pct,
                COUNT(DISTINCT a.user_id) AS students
         FROM quiz_attempts a
         WHERE a.user_id IN (${memberIds.map(() => "?").join(",")})`,
        ...memberIds,
      )
    : [];

  let bySubject: { subject_name: string; icon: string; color: string; attempts: number; avg_pct: number | null }[] = [];
  let byQuiz: {
    quiz_id: number;
    title: string;
    subject_name: string;
    icon: string;
    color: string;
    attempts: number;
    avg_pct: number | null;
    best_pct: number | null;
    students: number;
  }[] = [];

  if (memberIds.length > 0) {
    bySubject = await query<{
      subject_name: string;
      icon: string;
      color: string;
      attempts: number;
      avg_pct: number | null;
    }>(
      `SELECT s.name AS subject_name, s.icon, s.color,
              COUNT(*) AS attempts,
              ROUND(AVG(a.score * 100.0 / a.max_score)) AS avg_pct
       FROM quiz_attempts a
       JOIN quizzes q ON q.id = a.quiz_id
       JOIN subjects s ON s.id = q.subject_id
       WHERE a.user_id IN (${memberIds.map(() => "?").join(",")})
       GROUP BY s.id
       ORDER BY attempts DESC`,
      ...memberIds,
    );

    byQuiz = await query<{
      quiz_id: number;
      title: string;
      subject_name: string;
      icon: string;
      color: string;
      attempts: number;
      avg_pct: number | null;
      best_pct: number | null;
      students: number;
    }>(
      `SELECT q.id AS quiz_id, q.title, s.name AS subject_name, s.icon, s.color,
              COUNT(*) AS attempts,
              ROUND(AVG(a.score * 100.0 / a.max_score)) AS avg_pct,
              MAX(ROUND(a.score * 100.0 / a.max_score)) AS best_pct,
              COUNT(DISTINCT a.user_id) AS students
       FROM quiz_attempts a
       JOIN quizzes q ON q.id = a.quiz_id
       JOIN subjects s ON s.id = q.subject_id
       WHERE a.user_id IN (${memberIds.map(() => "?").join(",")})
       GROUP BY q.id, s.name, s.icon, s.color, q.title
       ORDER BY attempts DESC`,
      ...memberIds,
    );
  }

  return NextResponse.json({
    member_count: memberIds.length,
    global: globalStats[0] ?? { attempts: 0, avg_pct: null, best_pct: null, students: 0 },
    by_subject: bySubject,
    by_quiz: byQuiz,
  });
}

export const GET = guardApi("GET /api/prof/classes/[id]/stats", GETHandler);