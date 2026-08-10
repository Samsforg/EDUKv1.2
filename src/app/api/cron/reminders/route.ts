import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { query } from "@/lib/db";
import { maybeSendDailyReminder } from "@/lib/reminders";

async function GETHandler(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const users = await query<{ user_id: number }>(
    "SELECT user_id FROM reminder_settings WHERE enabled = 1",
  );

  let sent = 0;
  let failed = 0;
  for (const u of users) {
    try {
      if (await maybeSendDailyReminder(u.user_id, true)) sent++;
    } catch (err: any) {
      failed++;
      console.error(`[cron-reminders] user ${u.user_id}:`, err?.message ?? err);
    }
  }

  return NextResponse.json({ ok: true, checked: users.length, sent, failed });
}

export const GET = guardApi("GET /api/cron/reminders", GETHandler);