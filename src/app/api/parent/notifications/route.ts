import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getParentSettings, saveParentSettings } from "@/lib/parents";

const FIELDS = ["academic_alerts", "score_drop", "results_alert", "weekly_report", "encouragement"] as const;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }
  return NextResponse.json({ settings: getParentSettings(user.id) });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });

  const fields: Partial<Record<(typeof FIELDS)[number], boolean>> = {};
  for (const f of FIELDS) {
    if (typeof body[f] === "boolean") fields[f] = body[f];
  }
  const settings = saveParentSettings(user.id, fields);
  return NextResponse.json({ ok: true, settings });
}
