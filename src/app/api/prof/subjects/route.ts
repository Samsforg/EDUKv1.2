import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getProfSubjects, ensureProfSubject } from "@/lib/prof-subjects";

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

  const subjects = await getProfSubjects(user!.id);
  const res = NextResponse.json({ subjects });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export const GET = guardApi("GET /api/prof/subjects", GETHandler);

async function PUTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  const ids: number[] = [];
  if (body && Array.isArray(body.subject_ids)) {
    for (const v of body.subject_ids) {
      const n = Number(v);
      if (Number.isFinite(n) && n > 0 && !ids.includes(n)) ids.push(n);
    }
  }

  for (const id of ids) {
    const subject = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE id = ?", id);
    if (!subject) return NextResponse.json({ error: "Matière introuvable" }, { status: 400 });
  }

  await run("DELETE FROM teacher_subjects WHERE user_id = ?", user!.id);
  for (const id of ids) await ensureProfSubject(user!.id, id);

  const subjects = await getProfSubjects(user!.id, false);
  return NextResponse.json({ ok: true, subjects });
}

export const PUT = guardApi("PUT /api/prof/subjects", PUTHandler);