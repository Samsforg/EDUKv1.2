import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { logAudit } from "@/lib/audit";
import {
  findAbandonedCheckouts,
  sendAbandonedReminder,
  findExpiredTrials,
  sendTrialEndReminder,
} from "@/lib/abandoned-checkout";
import { logger } from "@/lib/logger";
import { requireCronSecret } from "@/lib/cron-auth";

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  const hoursParam = new URL(req.url).searchParams.get("hours") ?? "24";
  const hours = Math.max(1, Math.min(72, parseInt(hoursParam, 10) || 24));

  // 1) Relance des abandons (séquencement multi-touch : J+1, J+3, J+7)
  const subs = await findAbandonedCheckouts(hours);

  let sent = 0;
  let failed = 0;
  for (const s of subs) {
    try {
      const res = await sendAbandonedReminder(s);
      if (res.ok) sent++;
      else failed++;
      logger.info("cron:abandoned_reminder_sent", { subId: s.id, userId: s.user_id, channel: res.channel });
    } catch (err: unknown) {
      failed++;
      logger.error("cron:abandoned_failed", { subId: s.id, error: err instanceof Error ? err.message : String(err) });
    }
  }

  // 2) Relance des essais gratuits expirés sans conversion
  const trials = await findExpiredTrials(hours);
  let trialSent = 0;
  let trialFailed = 0;
  for (const t of trials) {
    try {
      const res = await sendTrialEndReminder(t);
      if (res.ok) trialSent++;
      else trialFailed++;
      logger.info("cron:trial_end_sent", { subId: t.id, userId: t.user_id, channel: res.channel });
    } catch (err: unknown) {
      trialFailed++;
      logger.error("cron:trial_end_failed", { subId: t.id, error: err instanceof Error ? err.message : String(err) });
    }
  }

  const totalSent = sent + trialSent;
  if (totalSent > 0) {
    await logAudit(
      null,
      "relance_checkout",
      `${sent} relance(s) d'abandon + ${trialSent} relance(s) de fin d'essai envoyées`,
    );
  }

  return NextResponse.json({
    ok: true,
    candidates: subs.length,
    sent,
    failed,
    trialCandidates: trials.length,
    trialSent,
    trialFailed,
    hours,
  });
}

export const GET = guardApi("GET /api/cron/abandoned", GETHandler);