import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import {
  createSubject,
  createChapter,
  createLesson,
  createQuiz,
  createPaper,
  createChallenge,
  createLeagueChallenge,
  saveQuizQuestions,
  savePaperQuestions,
  saveLessonExercises,
  getQuizQuestions,
  getPaperQuestions,
} from "@/lib/admin-content";

const KINDS = ["subject", "chapter", "lesson", "exercise", "quiz", "paper", "questions", "challenge", "league_challenge"];

async function GETHandler(req: NextRequest, { params }: { params: Promise<{ kind: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { kind } = await params;
  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });

  if (kind === "quiz") {
    return NextResponse.json({ questions: await getQuizQuestions(id) });
  }
  if (kind === "paper") {
    return NextResponse.json({ questions: await getPaperQuestions(id) });
  }
  return NextResponse.json({ error: "Type de contenu invalide" }, { status: 400 });
}

export const GET = guardApi("GET /api/admin/content/[kind]", GETHandler);

async function POSTHandler(req: NextRequest, { params }: { params: Promise<{ kind: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { kind } = await params;
  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: "Type de contenu invalide" }, { status: 400 });
  }

  const actor = await getCurrentUser();
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  switch (kind) {
    case "subject": {
      const res = await createSubject(body, actor!.id);
      if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
    }
    case "chapter": {
      if (!body.subject_id) return NextResponse.json({ error: "subject_id requis" }, { status: 400 });
      const res = await createChapter(Number(body.subject_id), body, actor!.id);
      if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
    }
    case "lesson": {
      if (!body.chapter_id) return NextResponse.json({ error: "chapter_id requis" }, { status: 400 });
      const res = await createLesson(Number(body.chapter_id), body, actor!.id);
      if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
    }
    case "exercise": {
      if (!body.lesson_id || !Array.isArray(body.exercises)) {
        return NextResponse.json({ error: "lesson_id et exercices requis" }, { status: 400 });
      }
      const res = await saveLessonExercises(Number(body.lesson_id), body.exercises, actor!.id);
      if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ ok: true });
    }
    case "quiz": {
      if (!body.subject_id) return NextResponse.json({ error: "subject_id requis" }, { status: 400 });
      const res = await createQuiz(Number(body.subject_id), body, actor!.id);
      if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
    }
    case "paper": {
      if (!body.subject_id) return NextResponse.json({ error: "subject_id requis" }, { status: 400 });
      const res = await createPaper(Number(body.subject_id), body, actor!.id);
      if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
    }
    case "challenge": {
      const res = await createChallenge(body, actor!.id);
      if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
    }
    case "league_challenge": {
      const res = await createLeagueChallenge(body, actor!.id);
      if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ ok: true, id: res.id }, { status: 201 });
    }
    case "questions": {
      if (!Array.isArray(body.questions)) {
        return NextResponse.json({ error: "questions requis" }, { status: 400 });
      }
      if (body.quiz_id) {
        const res = await saveQuizQuestions(Number(body.quiz_id), body.questions, actor!.id);
        if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
        return NextResponse.json({ ok: true });
      }
      if (body.paper_id) {
        const res = await savePaperQuestions(Number(body.paper_id), body.questions, actor!.id);
        if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json({ error: "quiz_id ou paper_id requis" }, { status: 400 });
    }
  }
}

export const POST = guardApi("POST /api/admin/content/[kind]", POSTHandler);
