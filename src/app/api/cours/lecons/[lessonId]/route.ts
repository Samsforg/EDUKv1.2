import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { isPremiumUser } from "@/lib/quotas";

// Ce route handler dépend de la session utilisateur et du statut premium :
// il DOIT rester dynamique (interdiction de mettre en cache une réponse par-utilisateur).
export const dynamic = "force-dynamic";

async function GETHandler(
  _req: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { lessonId } = await params;

  const lesson = await queryOne<{
    id: number;
    title: string;
    content_md: string;
    video_url: string;
    duration_min: number;
    difficulty: number;
    is_premium: number;
  }>(
    `SELECT l.id, l.title, l.content_md, l.video_url, l.duration_min, l.difficulty, l.is_premium
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     WHERE l.id = ? AND l.status = 'approved' AND c.status = 'approved'`,
    Number(lessonId),
  );
  if (!lesson) return NextResponse.json({ error: "Leçon introuvable" }, { status: 404 });

  if (lesson.is_premium === 1 && !(await isPremiumUser(user.id))) {
    return NextResponse.json(
      { error: "premium_required", lessonId: lesson.id, title: lesson.title },
      { status: 402 },
    );
  }

  const progress = await queryOne<{ completed: number; score: number }>(
    "SELECT completed, score FROM user_progress WHERE user_id = ? AND lesson_id = ?",
    user.id,
    Number(lessonId),
  );

  return NextResponse.json({
    lesson: {
      ...lesson,
      progress: progress ?? { completed: 0, score: 0 },
    },
  });
}

export const GET = guardApi("GET /api/cours/lecons/[lessonId]", GETHandler);