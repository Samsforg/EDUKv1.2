import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser, notify } from "@/lib/session";

export const dynamic = "force-dynamic";

interface ClsRow {
  id: number;
  teacher_id: number;
  name: string;
}

async function ensureOwnClass(user: { id: number; role: string } | null, classId: number): Promise<NextResponse | ClsRow> {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  const cls = await queryOne<ClsRow>("SELECT id, teacher_id, name FROM classes WHERE id = ?", classId);
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });
  return cls;
}

interface AssignmentRow {
  id: number;
  title: string;
  description: string | null;
  subject_id: number | null;
  subject_name: string | null;
  deadline: string | null;
  max_score: number;
  created_at: string;
  submissions: number;
  graded: number;
  avg_score: number | null;
}

async function GETHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  const cls = await ensureOwnClass(user, Number((await params).id));
  if (cls instanceof NextResponse) return cls;

  const assignments = await query<AssignmentRow>(
    `SELECT a.id, a.title, a.description, a.subject_id, s.name AS subject_name,
            a.deadline, a.max_score, a.created_at,
            COUNT(DISTINCT sub.student_id) AS submissions,
            COUNT(sub.score) AS graded,
            ROUND(AVG(sub.score), 2) AS avg_score
     FROM class_assignments a
     LEFT JOIN subjects s ON s.id = a.subject_id
     LEFT JOIN assignment_submissions sub ON sub.assignment_id = a.id
     WHERE a.class_id = ?
     GROUP BY a.id
     ORDER BY a.created_at DESC`,
    cls.id,
  );
  return NextResponse.json({ assignments });
}

async function POSTHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  const cls = await ensureOwnClass(user, Number((await params).id));
  if (cls instanceof NextResponse) return cls;

  const body = await req.json().catch(() => null);
  const title = body?.title ? String(body.title).trim() : "";
  if (!title) return NextResponse.json({ error: "Titre requis" }, { status: 400 });

  const subjectId = body?.subject_id ? Number(body.subject_id) : null;
  const maxScore = body?.max_score && Number(body.max_score) > 0 ? Number(body.max_score) : 20;
  const deadline = body?.deadline ? String(body.deadline) : null;

  const res = await run(
    "INSERT INTO class_assignments (class_id, title, description, subject_id, deadline, max_score) VALUES (?, ?, ?, ?, ?, ?)",
    cls.id,
    title,
    body?.description ? String(body.description).trim() : null,
    subjectId,
    deadline,
    maxScore,
  );

  const studentIds = await query<{ user_id: number }>(
    "SELECT user_id FROM class_students WHERE class_id = ?",
    cls.id,
  );
  for (const st of studentIds) {
    await notify(st.user_id, "Nouveau devoir", `« ${title} » a été publié dans ${cls.name}`, "assignment");
  }

  return NextResponse.json({ ok: true, id: res.lastInsertRowid }, { status: 201 });
}

export const GET = guardApi("GET /api/prof/classes/[id]/assignments", GETHandler);
export const POST = guardApi("POST /api/prof/classes/[id]/assignments", POSTHandler);