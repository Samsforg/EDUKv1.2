import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";

async function POSTHandler(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const lessonId = Number(id);
  const exists = await queryOne<{ id: number }>(
    "SELECT l.id FROM lessons l JOIN chapters c ON c.id = l.chapter_id WHERE l.id = ? AND l.status = 'approved' AND c.status = 'approved'",
    lessonId,
  );
  if (!exists) return NextResponse.json({ error: "Fiche introuvable" }, { status: 404 });

  await run(
    "INSERT INTO lesson_reads (user_id, lesson_id) VALUES (?, ?) ON CONFLICT(user_id, lesson_id) DO NOTHING",
    user.id,
    lessonId,
  );
  await refreshBadges(user.id);
  return NextResponse.json({ read: true });
}

export const POST = guardApi("POST /api/lessons/[id]/read", POSTHandler);
