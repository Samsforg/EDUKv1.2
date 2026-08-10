import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import {
  getProfLesson,
  getProfLessonExercises,
  updateProfLesson,
  saveProfLessonExercises,
} from "@/lib/prof-content";

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
  const lesson = await getProfLesson(user!.id, Number(id));
  if (!lesson) return NextResponse.json({ error: "Leçon introuvable" }, { status: 404 });
  const exercises = await getProfLessonExercises(Number(id));
  return NextResponse.json({ lesson, exercises });
}

export const GET = guardApi("GET /api/prof/lesson/[id]", GETHandler);

async function PATCHHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const res = await updateProfLesson(user!.id, Number(id), {
    title: body.title,
    summary: body.summary,
    content_md: body.content_md,
    video_url: body.video_url,
    duration_min: body.duration_min !== undefined ? Number(body.duration_min) : undefined,
    difficulty: body.difficulty !== undefined ? Number(body.difficulty) : undefined,
    is_premium: body.is_premium !== undefined ? Number(body.is_premium) : undefined,
    position: body.position !== undefined ? Number(body.position) : undefined,
  });
  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });

  if (Array.isArray(body.exercises)) {
    const exRes = await saveProfLessonExercises(user!.id, Number(id), body.exercises);
    if ("error" in exRes) return NextResponse.json({ error: exRes.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/prof/lesson/[id]", PATCHHandler);
