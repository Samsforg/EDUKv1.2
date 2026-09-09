import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { query } from "@/lib/db";
import { sendPushToUser } from "@/lib/push";
import { notify } from "@/lib/session";
import { requireCronSecret } from "@/lib/cron-auth";

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  const today = new Date().toISOString().slice(0, 10);
  // Utilisateurs avec streak à conserver et pas encore actifs aujourd'hui
  const users = await query<{ id: number; first_name: string; streak: number; last_active: string | null }>(
    "SELECT id, first_name, streak, last_active FROM users WHERE streak > 0 AND role = 'student'"
  );
  const candidates = users.filter((u) => !u.last_active || u.last_active.slice(0, 10) !== today);
  let sent = 0;
  let failed = 0;
  for (const u of candidates) {
    const title = `🔥 Ta série de ${u.streak} jour${u.streak > 1 ? "s" : ""} est en jeu !`;
    const body = `Salut ${u.first_name}, fais un quiz ou relis une fiche avant minuit pour garder ta série et gagner le bonus.`;
    try {
      await notify(u.id, title, body, "local_fire_department");
      await sendPushToUser(u.id, { title, body, tag: "streak-17h" }).catch(() => {});
      sent++;
    } catch {
      failed++;
    }
  }
  return NextResponse.json({ ok: true, checked: users.length, candidates: candidates.length, sent, failed });
}

export const GET = guardApi("GET /api/cron/streak", GETHandler);
