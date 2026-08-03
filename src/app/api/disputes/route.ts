import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { openDispute } from "@/lib/disputes";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "student") {
    return NextResponse.json({ error: "Réservé aux élèves" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.subject !== "string" || typeof body.description !== "string") {
    return NextResponse.json({ error: "Objet et description requis" }, { status: 400 });
  }
  const result = openDispute(user.id, body.subject, body.description);
  if ("error" in result) return NextResponse.json(result, { status: 400 });
  return NextResponse.json({ ok: true, id: result.id }, { status: 201 });
}
