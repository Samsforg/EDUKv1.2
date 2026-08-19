import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { logAudit } from "@/lib/audit";
import { findAbandonedCheckouts, sendAbandonedReminder } from "@/lib/abandoned-checkout";

async function GETHandler(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const hoursParam = new URL(req.url).searchParams.get("hours") ?? "24";
  const hours = Math.max(1, Math.min(72, parseInt(hoursParam, 10) || 24));

  const subs = await findAbandonedCheckouts(hours);

  let sent = 0;
  let failed = 0;
  for (const s of subs) {
    try {
      const res = await sendAbandonedReminder(s);
      if (res.ok) sent++;
      else failed++;
      console.log(`[cron-abandoned] sub #${s.id} (user ${s.user_id}) -> ${res.channel}`);
    } catch (err: any) {
      failed++;
      console.error(`[cron-abandoned] sub #${s.id}:`, err?.message ?? err);
    }
  }

  if (sent > 0) {
    await logAudit(
      null,
      "relance_checkout",
      `${sent} relance(s) d'abandon envoyée(s) (${subs.length} candidate(s), ${hours}h)`,
    );
  }

  return NextResponse.json({ ok: true, candidates: subs.length, sent, failed, hours });
}

export const GET = guardApi("GET /api/cron/abandoned", GETHandler);