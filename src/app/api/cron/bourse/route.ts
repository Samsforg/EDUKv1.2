import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { query, queryOne, run } from "@/lib/db";
import { notify, addXp } from "@/lib/session";
import { requireCronSecret } from "@/lib/cron-auth";

// Bourse Edukora : chaque 1er du mois (cron), le top 3 XP gagne 1 mois Premium offert.
// Idempotent : un utilisateur ne peut recevoir la bourse qu'une fois par mois.

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  const already = await queryOne<{ c: number }>(
    `SELECT COUNT(*) AS c FROM notifications WHERE type = 'bourse' AND title LIKE '%${month}%'`
  );
  if ((already?.c ?? 0) > 0) {
    return NextResponse.json({ ok: true, message: "Bourse déjà distribuée ce mois" });
  }

  // Plan Premium mensuel actif
  const premiumPlan = await queryOne<{ id: number; price_cents: number }>(
    `SELECT p.id, p.price_cents FROM subscription_plans p WHERE p.interval = 'month' AND p.price_cents > 0 ORDER BY p.sort_order, p.id LIMIT 1`
  );
  if (!premiumPlan) return NextResponse.json({ error: "Aucun plan premium trouvé" }, { status: 503 });

  const top3 = await query<{ id: number; first_name: string; xp: number; email: string | null }>(
    `SELECT id, first_name, xp, email FROM users WHERE role = 'student' ORDER BY xp DESC, last_active DESC LIMIT 3`
  );
  if (top3.length === 0) return NextResponse.json({ ok: true, winners: 0 });

  let granted = 0;
  for (const [i, w] of top3.entries()) {
    const rank = i + 1;
    // Vérifier si l'utilisateur a déjà un abonnement actif — si oui, on prolonge end_at de 1 mois
    const active = await queryOne<{ id: number; end_at: string | null }>(
      "SELECT id, end_at FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
      w.id
    );
    if (active) {
      await run(
        "UPDATE subscriptions SET end_at = datetime(COALESCE(end_at, datetime('now')), '+1 month'), updated_at = datetime('now') WHERE id = ?",
        active.id
      );
    } else {
      await run(
        `INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, price_cents, status, started_at, end_at)
         VALUES (?, ?, 'edukora-bourse', ?, ?, 'active', datetime('now'), datetime('now', '+1 month'))`,
        w.id,
        premiumPlan.id,
        `BOURSE-${month}-${rank}`,
        0
      );
    }
    await addXp(w.id, 100);
    await notify(
      w.id,
      `🎓 Bourse Edukora ${month} — ${rank}${rank === 1 ? "er" : "ème"} !`,
      `Bravo ${w.first_name} ! Tu es ${rank}${rank === 1 ? "er" : "ème"} du classement : 1 mois de Premium t'est offert (+100 XP bonus). Continue comme ça !`,
      "emoji_events",
      `bourse-${month}`
    );
    granted++;
  }

  return NextResponse.json({ ok: true, month, winners: top3.map((w) => ({ id: w.id, name: w.first_name, xp: w.xp })), granted });
}

export const GET = guardApi("GET /api/cron/bourse", GETHandler);
