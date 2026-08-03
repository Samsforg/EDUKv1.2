import { NextResponse } from "next/server";
import { queryOne, run, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

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
      `SELECT p.id, p.name, s.end_at FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id WHERE s.user_id = ? AND s.status = 'active' ORDER BY s.id DESC LIMIT 1`,
      user.id,
    ) ?? null;
  }

  return NextResponse.json({ plans, activePlan });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { action } = await req.json().catch(() => ({ action: "" }));
  if (action === "cancel") {
    const sub = queryOne<{ id: number; stripe_subscription_id: string }>(
      "SELECT id, stripe_subscription_id FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
      user.id,
    );
    if (!sub?.stripe_subscription_id) return NextResponse.json({ error: "Aucun abonnement actif" }, { status: 400 });

    const Stripe = require("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });
    await stripe.subscriptions.update(sub.stripe_subscription_id, { cancel_at_period_end: true });
    run("UPDATE subscriptions SET cancel_at_period_end = 1 WHERE id = ?", sub.id);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}
