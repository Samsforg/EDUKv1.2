import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

interface ClsRow {
  id: number;
  teacher_id: number;
}

async function POSTHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const cls = await queryOne<ClsRow>("SELECT id, teacher_id FROM classes WHERE id = ?", Number(id));
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user!.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });

  if (body.email) {
    const email = String(body.email).trim().toLowerCase();
    if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 });
    const student = await queryOne<{ id: number }>(
      "SELECT id FROM users WHERE LOWER(email) = ?",
      email,
    );
    if (!student) return NextResponse.json({ error: "Aucun élève avec cet email" }, { status: 404 });

    const existing = await queryOne<{ user_id: number }>(
      "SELECT user_id FROM class_students WHERE class_id = ? AND user_id = ?",
      cls.id,
      student.id,
    );
    if (existing) return NextResponse.json({ error: "Cet élève est déjà dans la classe" }, { status: 400 });

    const isTeacher = await queryOne<{ role: string }>("SELECT role FROM users WHERE id = ?", student.id);
    if (isTeacher?.role !== "student") {
      return NextResponse.json({ error: "Ce compte n'est pas un élève" }, { status: 400 });
    }

    await run(
      "INSERT INTO class_students (class_id, user_id) VALUES (?, ?)",
      cls.id,
      student.id,
    );
    return NextResponse.json({ ok: true, user_id: student.id }, { status: 201 });
  }

  return NextResponse.json({ error: "Email requis" }, { status: 400 });
}

export const POST = guardApi("POST /api/prof/classes/[id]/students", POSTHandler);

async function DELETEHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const cls = await queryOne<ClsRow>("SELECT id, teacher_id FROM classes WHERE id = ?", Number(id));
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user!.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body || !body.user_id) return NextResponse.json({ error: "user_id manquant" }, { status: 400 });

  await run("DELETE FROM class_students WHERE class_id = ? AND user_id = ?", cls.id, Number(body.user_id));
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/prof/classes/[id]/students", DELETEHandler);