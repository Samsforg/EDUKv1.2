import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { query } from "@/lib/db";
import { maybeSendDailyReminder } from "@/lib/reminders";
import { logger } from "@/lib/logger";
import { requireCronSecret } from "@/lib/cron-auth";

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  const users = await query<{ user_id: number }>(
    "SELECT user_id FROM reminder_settings WHERE enabled = 1",
  );

  let sent = 0;
  let failed = 0;
  for (const u of users) {
    try {
      if (await maybeSendDailyReminder(u.user_id, true)) sent++;
    } catch (err: unknown) {
      failed++;
      logger.error("cron:reminders_failed", { userId: u.user_id, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return NextResponse.json({ ok: true, checked: users.length, sent, failed });
}

export const GET = guardApi("GET /api/cron/reminders", GETHandler);