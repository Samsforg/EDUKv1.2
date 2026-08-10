import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { toggleRegistration } from "@/lib/live";

async function POSTHandler(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const session = await queryOne<{ id: number }>("SELECT id FROM live_sessions WHERE id = ?", Number(id));
  if (!session) return NextResponse.json({ error: "Session introuvable" }, { status: 404 });

  return NextResponse.json(await toggleRegistration(user.id, session.id));
}

export const POST = guardApi("POST /api/live/[id]/register", POSTHandler);
