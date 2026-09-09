import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { logAudit } from "@/lib/audit";
import {
  generateChapterLessons,
  generateLessonsForChapters,
  isContentAIConfigured,
} from "@/lib/ai/lesson-generator";

async function POSTHandler(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => ({}));
  const chapterId = Number(body.chapterId) || 0;
  const all = body.all === true;
  const force = body.force === true;
  const limit = Math.max(1, Math.min(50, Number(body.limit) || 10));

  if (!isContentAIConfigured()) {
    return NextResponse.json({ error: "Aucun fournisseur IA configuré (clés API)" }, { status: 400 });
  }

  if (chapterId > 0) {
    const res = await generateChapterLessons(chapterId, { force });
    await logAudit(null, "content_ai", `Génération IA chapitre #${chapterId} → ${res.created} leçon(s) (${res.reason ?? "ok"})`);
    return NextResponse.json({ ok: res.ok, created: res.created, reason: res.reason });
  }

  if (all) {
    const rows = await query<{ id: number }>(
      `SELECT c.id
       FROM chapters c
       WHERE c.status = 'approved'
         AND NOT EXISTS (
           SELECT 1 FROM lessons l WHERE l.chapter_id = c.id AND l.ai_generated = 1
         )
       ORDER BY c.id
       LIMIT ?`,
      limit,
    );
    const ids = rows.map((r) => r.id);
    const res = await generateLessonsForChapters(ids, { force, limit });
    await logAudit(null, "content_ai", `Génération IA batch : ${res.processed} chapitre(s), ${res.created} leçon(s) créée(s), ${res.errors.length} erreur(s)`);
    return NextResponse.json({ ok: res.ok, processed: res.processed, created: res.created, errors: res.errors, remainingHint: ids.length });
  }

  return NextResponse.json({ error: "Précisez chapterId ou all=true" }, { status: 400 });
}

export const POST = guardApi("POST /api/admin/ai-generate-chapter", POSTHandler);
