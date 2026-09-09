import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { queryOne } from "@/lib/db";
import { canTeachSubject, ensureProfSubject } from "@/lib/prof-subjects";
import {
  getProfLessons,
  createProfLesson,
  deleteProfLesson,
  saveProfLessonExercises,
} from "@/lib/prof-content";
import { moderateContent } from "@/lib/moderation";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

async function GETHandler() {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const lessons = await getProfLessons(user!.id);
  return NextResponse.json({ lessons });
}

export const GET = guardApi("GET /api/prof/lesson", GETHandler);

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.title || !body.chapter_id) {
    return NextResponse.json({ error: "Données invalides : titre et chapitre requis" }, { status: 400 });
  }

  const chapter = await queryOne<{ subject_id: number | null }>(
    "SELECT subject_id FROM chapters WHERE id = ?",
    Number(body.chapter_id),
  );
  if (!chapter) return NextResponse.json({ error: "Chapitre introuvable" }, { status: 400 });
  if (chapter.subject_id != null) {
    const teach = await canTeachSubject(user!.id, chapter.subject_id);
    if (teach === "no") {
      return NextResponse.json(
        { error: "Ce chapitre n'appartient pas à tes disciplines. Ajoute-la dans « Mes disciplines » avant de créer une leçon." },
        { status: 403 },
      );
    }
    if (teach === "first") await ensureProfSubject(user!.id, chapter.subject_id);
  }

  const lessonText = [body.title, body.summary, body.content_md].filter(Boolean).join(" ");
  const mod = moderateContent(lessonText);
  if (!mod.approved) {
    return NextResponse.json({ error: `Contenu inapproprié : ${mod.reason}`, code: "MODERATION_FAILED" }, { status: 422 });
  }

  const res = await createProfLesson(user!.id, {
    chapter_id: Number(body.chapter_id),
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

  if (Array.isArray(body.exercises) && body.exercises.length > 0) {
    const exRes = await saveProfLessonExercises(user!.id, res.id, body.exercises);
    if ("error" in exRes) return NextResponse.json({ error: exRes.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
}

export const POST = guardApi("POST /api/prof/lesson", POSTHandler);

async function DELETEHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || !body.id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  const res = await deleteProfLesson(user!.id, Number(body.id));
  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/prof/lesson", DELETEHandler);
