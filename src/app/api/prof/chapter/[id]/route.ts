import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getProfChapter, updateProfChapter } from "@/lib/prof-content";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

async function GETHandler(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const chapter = await getProfChapter(user!.id, Number(id));
  if (!chapter) return NextResponse.json({ error: "Chapitre introuvable" }, { status: 404 });
  return NextResponse.json({ chapter });
}

export const GET = guardApi("GET /api/prof/chapter/[id]", GETHandler);

async function PATCHHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const res = await updateProfChapter(user!.id, Number(id), {
    grade_id: body.grade_id !== undefined ? (body.grade_id ? Number(body.grade_id) : null) : undefined,
    code: body.code,
    title: body.title,
    description: body.description,
    order_index: body.order_index !== undefined ? Number(body.order_index) : undefined,
  });
  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/prof/chapter/[id]", PATCHHandler);
