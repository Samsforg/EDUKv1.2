import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { queryOne } from "@/lib/db";
import { checkAIRateLimit } from "@/lib/ai/rate-limit";
import { generateLessonDraft, isContentAIConfigured } from "@/lib/ai/lesson-generator";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  const chapterId = Number(body?.chapterId);
  const kind = body?.kind === "exercises" ? "exercises" : "course";
  if (!Number.isFinite(chapterId) || chapterId <= 0) {
    return NextResponse.json({ error: "chapterId requis" }, { status: 400 });
  }

  // Le chapitre doit appartenir au prof ou être approuvé (contenu officiel).
  const chapter = await queryOne<{ id: number; created_by: number | null; status: string }>(
    "SELECT id, created_by, status FROM chapters WHERE id = ?",
    chapterId,
  );
  if (!chapter) return NextResponse.json({ error: "Chapitre introuvable" }, { status: 404 });
  if (chapter.created_by !== user!.id && chapter.status !== "approved") {
    return NextResponse.json({ error: "Chapitre non accessible" }, { status: 403 });
  }

  if (!isContentAIConfigured()) {
    return NextResponse.json({ error: "Assistant IA non configuré" }, { status: 400 });
  }

  const aiRl = await checkAIRateLimit(`prof-assist:${user!.id}`);
  if (!aiRl.allowed) {
    const retryAfter = Math.max(1, Math.ceil((aiRl.resetAtMinute - Date.now()) / 1000));
    return NextResponse.json(
      { error: `Trop de générations IA. Réessayez dans ${retryAfter}s.`, code: "ai_rate_limit", retryAfter },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const res = await generateLessonDraft(chapterId, kind);
  if (!res.ok) {
    const status = res.reason === "chapter_not_found" ? 404 : 502;
    return NextResponse.json({ error: "Génération IA impossible pour ce chapitre", reason: res.reason }, { status });
  }
  // Brouillon uniquement : aucune insertion, le prof relit puis soumet via /api/prof/lesson.
  return NextResponse.json({ ok: true, draft: res.draft });
}

export const POST = guardApi("POST /api/prof/ai-assist", POSTHandler);
