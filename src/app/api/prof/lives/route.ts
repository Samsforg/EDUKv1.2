import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getProfBoard, createLiveSession } from "@/lib/live-prof";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  return NextResponse.json(getProfBoard(user.id));
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Requête invalide" }, { status: 400 });

  const title = String(body.title ?? "").trim();
  const starts_at = String(body.starts_at ?? "").trim();
  if (title.length < 3) return NextResponse.json({ error: "Titre trop court" }, { status: 400 });
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(starts_at))
    return NextResponse.json({ error: "Date de début invalide" }, { status: 400 });

  const id = createLiveSession(user.id, { ...body, title, starts_at });
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
