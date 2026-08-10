import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getFicheQuota } from "@/lib/quotas";
import { getPremiumPlans } from "@/lib/plans";

async function GETHandler(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const lesson = await queryOne<{
    id: number;
    title: string;
    summary: string;
    content: string | null;
    position: number;
    chapter_id: number;
    chapter_title: string;
    subject_id: number;
    subject_name: string;
    subject_icon: string;
    subject_color: string;
  }>(
    `SELECT l.id, l.title, l.summary, l.content, l.position,
            c.id AS chapter_id, c.title AS chapter_title,
            s.id AS subject_id, s.name AS subject_name, s.icon AS subject_icon, s.color AS subject_color
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     JOIN subjects s ON s.id = c.subject_id
     WHERE l.id = ? AND l.status = 'approved' AND c.status = 'approved'`,
    Number(id),
  );
  if (!lesson) return NextResponse.json({ error: "Fiche introuvable" }, { status: 404 });

  const fq = await getFicheQuota(user.id);
  if (!fq.isPremium && fq.limit !== null && fq.used >= fq.limit) {
    const plans = await getPremiumPlans().catch(() => []);
    const reussite = plans.find((p) => p.price_cents > 0 && p.interval === "month");
    const decouverte = plans.find((p) => p.price_cents === 0);
    return NextResponse.json(
      {
        error: `Limite mensuelle atteinte : ${fq.limit} fiches/mois sur le plan Découverte. Passez au plan Réussite pour un accès illimité !`,
        code: "fiche_quota_exceeded",
        quota: fq,
        decouverte_price: decouverte?.price_cents ?? 0,
        plan: reussite
          ? { id: reussite.id, name: reussite.name, price_cents: reussite.price_cents, interval: reussite.interval }
          : null,
      },
      { status: 403 },
    );
  }

  const siblings = await query<{ id: number; title: string }>(
    "SELECT id, title FROM lessons WHERE chapter_id = ? AND status = 'approved' ORDER BY position",
    lesson.chapter_id,
  );
  const idx = siblings.findIndex((s) => s.id === lesson.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const saved = (await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM saved_lessons WHERE user_id = ? AND lesson_id = ?",
    user.id,
    lesson.id,
  ))!.c;
  const read = (await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM lesson_reads WHERE user_id = ? AND lesson_id = ?",
    user.id,
    lesson.id,
  ))!.c;

  return NextResponse.json({
    lesson: {
      id: lesson.id,
      title: lesson.title,
      summary: lesson.summary,
      content: lesson.content ?? "",
      chapterId: lesson.chapter_id,
      chapter: lesson.chapter_title,
      subjectId: lesson.subject_id,
      subject: lesson.subject_name,
      subjectIcon: lesson.subject_icon,
      subjectColor: lesson.subject_color,
      saved: saved > 0,
      read: read > 0,
    },
    prev,
    next,
  });
}

export const GET = guardApi("GET /api/lessons/[id]", GETHandler);
