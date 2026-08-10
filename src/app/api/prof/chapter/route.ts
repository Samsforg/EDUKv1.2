import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import {
  getProfChapters,
  getSelectableProfChapters,
  createProfChapter,
  deleteProfChapter,
} from "@/lib/prof-content";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

async function GETHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const url = new URL(req.url);
  const selectable = url.searchParams.get("selectable") === "1";
  const chapters = selectable
    ? await getSelectableProfChapters(user!.id)
    : await getProfChapters(user!.id);
  return NextResponse.json({ chapters });
}

export const GET = guardApi("GET /api/prof/chapter", GETHandler);

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.title || !body.subject_id) {
    return NextResponse.json({ error: "Données invalides : titre et matière requis" }, { status: 400 });
  }

  const res = await createProfChapter(user!.id, {
    subject_id: Number(body.subject_id),
    grade_id: body.grade_id ? Number(body.grade_id) : null,
    code: body.code,
    title: body.title,
    description: body.description,
    order_index: body.order_index !== undefined ? Number(body.order_index) : undefined,
  });
  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
  return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
}

export const POST = guardApi("POST /api/prof/chapter", POSTHandler);

async function DELETEHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  const res = await deleteProfChapter(user!.id, Number(body.id));
  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/prof/chapter", DELETEHandler);
