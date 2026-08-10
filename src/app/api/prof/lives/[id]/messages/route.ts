import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { postAnnouncement } from "@/lib/live-prof";

async function POSTHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const r = await postAnnouncement(Number(id), user.id, body?.body ?? "");
  if (r === null) return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });
  if ("error" in r) return NextResponse.json({ error: r.error }, { status: 400 });
  return NextResponse.json(r, { status: 201 });
}

export const POST = guardApi("POST /api/prof/lives/[id]/messages", POSTHandler);
