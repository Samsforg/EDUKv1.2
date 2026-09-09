import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";
import { run } from "@/lib/db";

async function POSTHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  if (user.role !== "teacher" && user.role !== "admin") {
    return NextResponse.json({ error: "Seuls les enseignants peuvent résoudre une question" }, { status: 403 });
  }

  const { id } = await params;
  await run(
    "UPDATE lesson_comments SET is_resolved = 1 WHERE id = ?",
    Number(id),
  );

  return NextResponse.json({ ok: true });
}

export const POST = guardApi("POST /api/lessons/comments/[id]/resolve", POSTHandler);
