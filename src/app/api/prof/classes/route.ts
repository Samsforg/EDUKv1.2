import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { canTeachSubject, canTeachGrade, ensureProfSubject, ensureProfGrade } from "@/lib/prof-subjects";

export const dynamic = "force-dynamic";


function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

function makeInviteCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

interface ClassRow {
  id: number;
  name: string;
  invite_code: string;
  year: string | null;
  subject_name: string | null;
  icon: string | null;
  color: string | null;
  grade_name: string | null;
  student_count: number;
  created_at: string;
}

async function GETHandler() {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const classes = await query<ClassRow>(
    `SELECT c.id, c.name, c.invite_code, c.year,
            s.name AS subject_name, s.icon, s.color,
            g.name AS grade_name, c.created_at,
            (SELECT COUNT(*) FROM class_students cs WHERE cs.class_id = c.id) AS student_count
     FROM classes c
     LEFT JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.teacher_id = ?
     ORDER BY c.id DESC`,
    user!.id,
  );
  const res = NextResponse.json({ classes });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export const GET = guardApi("GET /api/prof/classes", GETHandler);

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.name.trim()) {
    return NextResponse.json({ error: "Le nom de la classe est requis" }, { status: 400 });
  }

  if (body.subject_id !== undefined && body.subject_id !== null) {
    const subjectId = Number(body.subject_id);
    const subject = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE id = ?", subjectId);
    if (!subject) return NextResponse.json({ error: "Matière introuvable" }, { status: 400 });
    const teach = await canTeachSubject(user!.id, subjectId);
    if (teach === "no") {
      return NextResponse.json(
        { error: "Cette matière n'est pas dans tes disciplines. Ajoute-la dans « Mes disciplines » avant de créer la classe." },
        { status: 403 },
      );
    }
    if (teach === "first") await ensureProfSubject(user!.id, subjectId);
  }
  if (body.grade_id !== undefined && body.grade_id !== null) {
    const gradeId = Number(body.grade_id);
    const grade = await queryOne<{ id: number }>("SELECT id FROM grades WHERE id = ?", gradeId);
    if (!grade) return NextResponse.json({ error: "Niveau introuvable" }, { status: 400 });
    const teachGrade = await canTeachGrade(user!.id, gradeId);
    if (teachGrade === "no") {
      return NextResponse.json(
        { error: "Ce niveau n'est pas dans tes niveaux d'enseignement. Ajoute-le dans « Mes disciplines & niveaux » avant de créer la classe." },
        { status: 403 },
      );
    }
    if (teachGrade === "first") await ensureProfGrade(user!.id, gradeId);
  }

  let code = makeInviteCode();
  let attempts = 0;
  while (attempts < 5) {
    const existing = await queryOne<{ id: number }>("SELECT id FROM classes WHERE invite_code = ?", code);
    if (!existing) break;
    code = makeInviteCode();
    attempts++;
  }

  const result = await run(
    "INSERT INTO classes (teacher_id, name, subject_id, grade_id, invite_code, year) VALUES (?, ?, ?, ?, ?, ?)",
    user!.id,
    body.name.trim(),
    body.subject_id != null ? Number(body.subject_id) : null,
    body.grade_id != null ? Number(body.grade_id) : null,
    code,
    body.year?.trim() || null,
  );

  return NextResponse.json({ ok: true, id: Number(result.lastInsertRowid), invite_code: code }, { status: 201 });
}

export const POST = guardApi("POST /api/prof/classes", POSTHandler);

async function DELETEHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  const cls = await queryOne<{ id: number; teacher_id: number }>(
    "SELECT id, teacher_id FROM classes WHERE id = ?",
    Number(body.id),
  );
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user!.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });

  await run("DELETE FROM classes WHERE id = ?", cls.id);
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/prof/classes", DELETEHandler);