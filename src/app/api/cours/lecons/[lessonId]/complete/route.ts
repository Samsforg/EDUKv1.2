import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser, applyActivity, addXp } from "@/lib/session";
import { isPremiumUser } from "@/lib/quotas";
import { validate, LessonCompleteSchema } from "@/lib/validation";

async function POSTHandler(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { lessonId } = await params;
  const body = await req.json().catch(() => null);
  const v = validate(LessonCompleteSchema, { ...body, lesson_id: Number(lessonId) });
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const lesson = await queryOne<{ id: number; is_premium: number }>(
    "SELECT id, is_premium FROM lessons WHERE id = ? AND status = 'approved'",
    Number(lessonId),
  );
  if (!lesson) return NextResponse.json({ error: "Leçon introuvable" }, { status: 404 });

  if (lesson.is_premium === 1 && !(await isPremiumUser(user.id))) {
    return NextResponse.json({ error: "premium_required" }, { status: 402 });
  }

  const score = v.data.score ?? 100;
  const timeSpent = v.data.time_spent_min ?? 0;

  await run(
    `INSERT INTO user_progress (user_id, lesson_id, completed, score, time_spent_min, completed_at)
     VALUES (?, ?, 1, ?, ?, datetime('now'))
     ON CONFLICT(user_id, lesson_id) DO UPDATE SET
       completed = 1,
       score = MAX(score, excluded.score),
       time_spent_min = MAX(time_spent_min, excluded.time_spent_min),
       completed_at = datetime('now')`,
    user.id,
    Number(lessonId),
    score,
    timeSpent,
  );

  await applyActivity(user.id);
  await addXp(user.id, 5);

  return NextResponse.json({ ok: true, completed: true });
}

export const POST = guardApi("POST /api/cours/lecons/[lessonId]/complete", POSTHandler);