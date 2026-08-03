import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { setLiveStatus, setChatPaused } from "@/lib/live-prof";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const sessionId = Number(id);
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Requête invalide" }, { status: 400 });

  if (typeof body.status === "string") {
    const status = ["live", "ended", "upcoming"].includes(body.status) ? body.status : null;
    if (!status) return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    const r = setLiveStatus(sessionId, user.id, status);
    if (!r) return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });
    return NextResponse.json(r);
  }

  if (typeof body.chat_paused === "boolean") {
    const r = setChatPaused(sessionId, user.id, body.chat_paused);
    if (!r) return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });
    return NextResponse.json(r);
  }

  return NextResponse.json({ error: "Aucune action valide" }, { status: 400 });
}
