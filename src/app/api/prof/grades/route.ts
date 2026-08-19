import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getProfGrades, ensureProfGrade } from "@/lib/prof-subjects";

export const dynamic = "force-dynamic";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

async function GETHandler() {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const grades = await getProfGrades(user!.id);
  const res = NextResponse.json({ grades });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export const GET = guardApi("GET /api/prof/grades", GETHandler);

async function PUTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  const ids: number[] = [];
  if (body && Array.isArray(body.grade_ids)) {
    for (const v of body.grade_ids) {
      const n = Number(v);
      if (Number.isFinite(n) && n > 0 && !ids.includes(n)) ids.push(n);
    }
  }

  for (const id of ids) {
    const grade = await queryOne<{ id: number }>("SELECT id FROM grades WHERE id = ?", id);
    if (!grade) return NextResponse.json({ error: "Niveau introuvable" }, { status: 400 });
  }

  await run("DELETE FROM teacher_grades WHERE user_id = ?", user!.id);
  for (const id of ids) await ensureProfGrade(user!.id, id);

  const grades = await getProfGrades(user!.id, false);
  return NextResponse.json({ ok: true, grades });
}

export const PUT = guardApi("PUT /api/prof/grades", PUTHandler);