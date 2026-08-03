import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { deleteMessage } from "@/lib/live-prof";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; mid: string }> },
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id, mid } = await params;
  const r = deleteMessage(Number(id), user.id, Number(mid));
  if (r === null) return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });
  return NextResponse.json(r);
}
