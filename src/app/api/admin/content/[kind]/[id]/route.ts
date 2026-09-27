import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import {
  updateSubject,
  deleteSubject,
  updateChapter,
  deleteChapter,
  updateLesson,
  deleteLesson,
  updateQuiz,
  deleteQuiz,
  updatePaper,
  deletePaper,
  updateChallenge,
  deleteChallenge,
  updateLeagueChallenge,
  deleteLeagueChallenge,
  updateCurriculum,
  deleteCurriculum,
  deleteSubjectGrade,
  deleteClassChapter,
} from "@/lib/admin-content";

const KINDS = ["subject", "chapter", "lesson", "quiz", "paper", "challenge", "league_challenge", "curriculum", "subject_grade", "class_chapter"];

async function PATCHHandler(req: NextRequest, { params }: { params: Promise<{ kind: string; id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { kind, id } = await params;
  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: "Type de contenu invalide" }, { status: 400 });
  }

  const actor = await getCurrentUser();
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  let res: { ok: true } | { error: string };
  switch (kind) {
    case "subject":
      res = await updateSubject(Number(id), body, actor!.id);
      break;
    case "chapter":
      res = await updateChapter(Number(id), body, actor!.id);
      break;
    case "lesson":
      res = await updateLesson(Number(id), body, actor!.id);
      break;
    case "quiz":
      res = await updateQuiz(Number(id), body, actor!.id);
      break;
    case "paper":
      res = await updatePaper(Number(id), body, actor!.id);
      break;
    case "challenge":
      res = await updateChallenge(Number(id), body, actor!.id);
      break;
    case "league_challenge":
      res = await updateLeagueChallenge(Number(id), body, actor!.id);
      break;
    case "curriculum":
      res = await updateCurriculum(Number(id), body, actor!.id);
      break;
    default:
      return NextResponse.json({ error: "Type de contenu invalide" }, { status: 400 });
  }

  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/admin/content/[kind]/[id]", PATCHHandler);

async function DELETEHandler(req: NextRequest, { params }: { params: Promise<{ kind: string; id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { kind, id } = await params;
  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: "Type de contenu invalide" }, { status: 400 });
  }

  const actor = await getCurrentUser();
  let res: { ok: true } | { error: string };
  switch (kind) {
    case "subject":
      res = await deleteSubject(Number(id), actor!.id);
      break;
    case "chapter":
      res = await deleteChapter(Number(id), actor!.id);
      break;
    case "lesson":
      res = await deleteLesson(Number(id), actor!.id);
      break;
    case "quiz":
      res = await deleteQuiz(Number(id), actor!.id);
      break;
    case "paper":
      res = await deletePaper(Number(id), actor!.id);
      break;
    case "challenge":
      res = await deleteChallenge(Number(id), actor!.id);
      break;
    case "league_challenge":
      res = await deleteLeagueChallenge(Number(id), actor!.id);
      break;
    case "curriculum":
      res = await deleteCurriculum(Number(id), actor!.id);
      break;
    case "subject_grade": {
      const subjectId = Number(req.nextUrl.searchParams.get("subject_id"));
      const gradeId = Number(req.nextUrl.searchParams.get("grade_id"));
      if (!subjectId || !gradeId) return NextResponse.json({ error: "subject_id et grade_id requis" }, { status: 400 });
      res = await deleteSubjectGrade(subjectId, gradeId, actor!.id);
      break;
    }
    case "class_chapter": {
      const classId = Number(req.nextUrl.searchParams.get("class_id"));
      const chapterId = Number(req.nextUrl.searchParams.get("chapter_id"));
      if (!classId || !chapterId) return NextResponse.json({ error: "class_id et chapter_id requis" }, { status: 400 });
      res = await deleteClassChapter(classId, chapterId, actor!.id);
      break;
    }
    default:
      return NextResponse.json({ error: "Type de contenu invalide" }, { status: 400 });
  }

  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/admin/content/[kind]/[id]", DELETEHandler);