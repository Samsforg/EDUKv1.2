import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { findReactivationCandidates, sendReactivation } from "@/lib/reactivation";
import { logger } from "@/lib/logger";
import { requireCronSecret } from "@/lib/cron-auth";

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  const users = await findReactivationCandidates();
  let sent = 0;
  let failed = 0;
  for (const u of users) {
    try {
      const res = await sendReactivation(u);
      if (res.ok) sent++;
    } catch (err: unknown) {
      failed++;
      logger.error("cron:reactivation_failed", { userId: u.user_id, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return NextResponse.json({ ok: true, checked: users.length, sent, failed });
}

export const GET = guardApi("GET /api/cron/reactivation", GETHandler);