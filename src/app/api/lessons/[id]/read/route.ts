import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const lessonId = Number(id);
  const exists = queryOne<{ id: number }>("SELECT id FROM lessons WHERE id = ?", lessonId);
  if (!exists) return NextResponse.json({ error: "Fiche introuvable" }, { status: 404 });

  run(
    "INSERT INTO lesson_reads (user_id, lesson_id) VALUES (?, ?) ON CONFLICT(user_id, lesson_id) DO NOTHING",
    user.id,
    lessonId,
  );
  refreshBadges(user.id);
  return NextResponse.json({ read: true });
}
