import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

async function POSTHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const assignmentId = Number((await params).id);
  const assignment = await queryOne<{ id: number; class_id: number; title: string; deadline: string | null }>(
    "SELECT id, class_id, title, deadline FROM class_assignments WHERE id = ?",
    assignmentId,
  );
  if (!assignment) return NextResponse.json({ error: "Devoir introuvable" }, { status: 404 });

  const member = await queryOne<{ user_id: number }>(
    "SELECT user_id FROM class_students WHERE class_id = ? AND user_id = ?",
    assignment.class_id,
    user.id,
  );
  if (!member) return NextResponse.json({ error: "Tu n'es pas membre de cette classe" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const content = body?.content ? String(body.content).trim() : "";
  if (!content) return NextResponse.json({ error: "Contenu requis" }, { status: 400 });

  const existing = await queryOne<{ assignment_id: number }>(
    "SELECT assignment_id FROM assignment_submissions WHERE assignment_id = ? AND student_id = ?",
    assignmentId,
    user.id,
  );

  if (existing) {
    await run(
      "UPDATE assignment_submissions SET content = ?, submitted_at = datetime('now') WHERE assignment_id = ? AND student_id = ?",
      content,
      assignmentId,
      user.id,
    );
  } else {
    await run(
      "INSERT INTO assignment_submissions (assignment_id, student_id, content) VALUES (?, ?, ?)",
      assignmentId,
      user.id,
      content,
    );
  }

  return NextResponse.json({ ok: true, submitted_at: new Date().toISOString() }, { status: 201 });
}

export const POST = guardApi("POST /api/classes/assignments/[id]/submit", POSTHandler);