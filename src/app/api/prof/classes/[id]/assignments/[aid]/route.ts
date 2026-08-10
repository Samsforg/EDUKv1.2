import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser, notify } from "@/lib/session";

export const dynamic = "force-dynamic";

async function ensureTeacherOfClass(user: { id: number; role: string } | null, classId: number): Promise<NextResponse | true> {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  const cls = await queryOne<{ id: number; teacher_id: number; name: string }>(
    "SELECT id, teacher_id, name FROM classes WHERE id = ?",
    classId,
  );
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });
  return true;
}

async function GETHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; aid: string }> },
) {
  const user = await getCurrentUser();
  const assignmentId = Number((await params).aid);
  const assignment = await queryOne<{
    id: number;
    class_id: number;
    title: string;
    description: string | null;
    subject_id: number | null;
    deadline: string | null;
    max_score: number;
    created_at: string;
  }>("SELECT * FROM class_assignments WHERE id = ?", assignmentId);
  if (!assignment) return NextResponse.json({ error: "Devoir introuvable" }, { status: 404 });

  const check = await ensureTeacherOfClass(user, assignment.class_id);
  if (check !== true) return check;

  const submissions = await query<
    {
      student_id: number;
      first_name: string;
      last_name: string;
      content: string | null;
      score: number | null;
      feedback: string | null;
      submitted_at: string | null;
    }
  >(
    `SELECT u.id AS student_id, u.first_name, u.last_name,
            sub.content, sub.score, sub.feedback, sub.submitted_at
     FROM class_students cs
     JOIN users u ON u.id = cs.user_id
     LEFT JOIN assignment_submissions sub ON sub.assignment_id = ? AND sub.student_id = u.id
     WHERE cs.class_id = ?
     ORDER BY u.last_name`,
    assignmentId,
    assignment.class_id,
  );

  return NextResponse.json({ assignment, submissions });
}

async function PATCHHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; aid: string }> },
) {
  const user = await getCurrentUser();
  const assignmentId = Number((await params).aid);
  const assignment = await queryOne<{ id: number; class_id: number; title: string }>(
    "SELECT id, class_id, title FROM class_assignments WHERE id = ?",
    assignmentId,
  );
  if (!assignment) return NextResponse.json({ error: "Devoir introuvable" }, { status: 404 });

  const check = await ensureTeacherOfClass(user, assignment.class_id);
  if (check !== true) return check;

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });

  if (body.score !== undefined) {
    const score = Number(body.score);
    if (!Number.isFinite(score) || score < 0) {
      return NextResponse.json({ error: "Note invalide" }, { status: 400 });
    }
    await run(
      "UPDATE assignment_submissions SET score = ?, feedback = ?, submitted_at = submitted_at WHERE assignment_id = ? AND student_id = ?",
      score,
      body.feedback ? String(body.feedback) : null,
      assignmentId,
      Number(body.student_id),
    );
    await notify(
      Number(body.student_id),
      "Devoir noté",
      `« ${assignment.title} » : ${score}/20`,
      "assignment",
    );
    return NextResponse.json({ ok: true });
  }

  if (body.title || body.deadline || body.max_score) {
    await run(
      "UPDATE class_assignments SET title = COALESCE(?, title), description = COALESCE(?, description), deadline = COALESCE(?, deadline), max_score = COALESCE(?, max_score) WHERE id = ?",
      body.title ? String(body.title) : null,
      body.description !== undefined ? String(body.description) : null,
      body.deadline || null,
      body.max_score ? Number(body.max_score) : null,
      assignmentId,
    );
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Rien à mettre à jour" }, { status: 400 });
}

async function DELETEHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; aid: string }> },
) {
  const user = await getCurrentUser();
  const assignmentId = Number((await params).aid);
  const assignment = await queryOne<{ id: number; class_id: number }>(
    "SELECT id, class_id FROM class_assignments WHERE id = ?",
    assignmentId,
  );
  if (!assignment) return NextResponse.json({ error: "Devoir introuvable" }, { status: 404 });

  const check = await ensureTeacherOfClass(user, assignment.class_id);
  if (check !== true) return check;

  await run("DELETE FROM class_assignments WHERE id = ?", assignmentId);
  return NextResponse.json({ ok: true });
}

export const GET = guardApi("GET /api/prof/classes/[id]/assignments/[aid]", GETHandler);
export const PATCH = guardApi("PATCH /api/prof/classes/[id]/assignments/[aid]", PATCHHandler);
export const DELETE = guardApi("DELETE /api/prof/classes/[id]/assignments/[aid]", DELETEHandler);