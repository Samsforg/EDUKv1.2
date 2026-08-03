import { NextResponse } from "next/server";
import { queryOne, run, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { gpCancelSubscription } from "@/lib/geniuspay";

export async function GET() {
  const plans = query<{
    id: number;
    name: string;
    interval: string;
    price_cents: number;
    currency: string;
    features: string | null;
    sort_order: number;
  }>("SELECT id, name, interval, price_cents, currency, features, sort_order FROM subscription_plans ORDER BY sort_order");

  const user = await getCurrentUser();
  let activePlan: { id: number; name: string; end_at: string | null } | null = null;
  if (user) {
    activePlan = queryOne<{ id: number; name: string; end_at: string | null }>(
      `SELECT p.id, p.name, s.end_at FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id
       WHERE s.user_id = ? AND s.status = 'active' AND (s.end_at IS NULL OR s.end_at > ?)
       ORDER BY s.id DESC LIMIT 1`,
      user.id,
      new Date().toISOString(),
    ) ?? null;
  }

  return NextResponse.json({ plans, activePlan });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { action } = await req.json().catch(() => ({ action: "" }));
  if (action === "cancel") {
    const sub = queryOne<{ id: number; provider_subscription_id: string | null }>(
      "SELECT id, provider_subscription_id FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
      user.id,
    );
    if (!sub?.provider_subscription_id) {
      return NextResponse.json({ error: "Aucun abonnement actif" }, { status: 400 });
    }

    try {
      await gpCancelSubscription(sub.provider_subscription_id, false, "Annulation par l'utilisateur");
    } catch (err: any) {
      return NextResponse.json({ error: err.message ?? "Échec de l'annulation" }, { status: 502 });
    }

    run("UPDATE subscriptions SET cancel_at_period_end = 1, updated_at = ? WHERE id = ?", new Date().toISOString(), sub.id);
    return NextResponse.json({ ok: true, message: "Abonnement annulé à la fin de la période" });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}
