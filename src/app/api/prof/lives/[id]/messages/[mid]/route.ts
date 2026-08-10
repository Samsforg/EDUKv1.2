import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { deleteMessage } from "@/lib/live-prof";

async function DELETEHandler(
  _req: Request,
  { params }: { params: Promise<{ id: string; mid: string }> },
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id, mid } = await params;
  const r = await deleteMessage(Number(id), user.id, Number(mid));
  if (r === null) return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });
  return NextResponse.json(r);
}

export const DELETE = guardApi("DELETE /api/prof/lives/[id]/messages/[mid]", DELETEHandler);
