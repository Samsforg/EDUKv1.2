import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const paper = queryOne<{ id: number; title: string; created_by: number | null }>(
    "SELECT id, title, created_by FROM exam_papers WHERE id = ?",
    Number(id),
  );
  if (!paper) return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });
  if (paper.created_by !== user.id) return NextResponse.json({ error: "Pas ton sujet" }, { status: 403 });

  const attempts = query<{
    id: number;
    student_first: string;
    student_last: string;
    student_email: string | null;
    score: number;
    score_over_20: number;
    duration_seconds: number;
    completed_at: string;
  }>(
    `SELECT a.id, u.first_name AS student_first, u.last_name AS student_last, u.email AS student_email,
            a.score, a.score_over_20, a.duration_seconds, a.completed_at
     FROM exam_attempts a JOIN users u ON u.id = a.user_id
     WHERE a.paper_id = ?
     ORDER BY a.completed_at DESC`,
    Number(id),
  );

  return NextResponse.json({
    paper: { id: paper.id, title: paper.title },
    attempts,
    summary: {
      total: attempts.length,
      avg: attempts.length > 0 ? Math.round((attempts.reduce((acc, x) => acc + x.score_over_20, 0) / attempts.length) * 10) / 10 : null,
      best: attempts.length > 0 ? Math.max(...attempts.map((x) => x.score_over_20)) : null,
      passed: attempts.filter((x) => x.score_over_20 >= 10).length,
      students: new Set(attempts.map((x) => x.student_first + " " + x.student_last)).size,
    },
  });
}
