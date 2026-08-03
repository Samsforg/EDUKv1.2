import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getReminderSettings, saveReminderSettings } from "@/lib/reminders";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const settings = getReminderSettings(user.id);
  const subjects = query<{ id: number; name: string; icon: string; color: string }>(
    "SELECT id, name, icon, color FROM subjects ORDER BY id",
  );

  return NextResponse.json({
    settings: { ...settings, subject_ids: settings.subject_ids },
    subjects: subjects.map((s) => ({ ...s, selected: settings.subject_ids.includes(s.id) })),
  });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Requête invalide" }, { status: 400 });

  const enabled = !!body.enabled;
  const frequency = ["daily", "weekly", "custom"].includes(body.frequency) ? body.frequency : "daily";
  const hour = typeof body.hour === "string" && /^\d{2}:\d{2}$/.test(body.hour) ? body.hour : "18:30";
  const subject_ids = Array.isArray(body.subject_ids)
    ? body.subject_ids.map(Number).filter((n: number) => Number.isInteger(n) && n > 0)
    : [];

  const settings = saveReminderSettings(user.id, { enabled, frequency, hour, subject_ids });
  return NextResponse.json({ settings });
}
