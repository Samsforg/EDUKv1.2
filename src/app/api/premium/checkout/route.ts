import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { gpCreateSubscription } from "@/lib/geniuspay";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { plan_id } = body;
  if (!plan_id) return NextResponse.json({ error: "plan_id requis" }, { status: 400 });

  const plan = queryOne<{
    id: number;
    name: string;
    interval: string;
    price_cents: number;
    currency: string;
  }>("SELECT id, name, interval, price_cents, currency FROM subscription_plans WHERE id = ?", plan_id);

  if (!plan) return NextResponse.json({ error: "Plan inconnu" }, { status: 400 });

  const existing = queryOne<{ id: number }>(
    "SELECT id FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
    user.id,
  );
  if (existing) return NextResponse.json({ error: "Vous avez déjà un abonnement actif" }, { status: 400 });

  const phone = user.phone;
  if (!phone) {
    return NextResponse.json(
      { error: "Ajoutez votre numéro de téléphone dans votre profil avant de vous abonner" },
      { status: 400 },
    );
  }

  const billingCycle =
    plan.interval === "quarter" ? "quarterly" : plan.interval === "year" ? "yearly" : "monthly";

  let gpSub: { id: string; status: string; next_billing_date?: string };
  try {
    gpSub = await gpCreateSubscription({
      phone,
      name: `${user.first_name} ${user.last_name}`.trim(),
      planName: plan.name,
      amount: Math.round(plan.price_cents),
      billingCycle,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Échec de la création du paiement" }, { status: 502 });
  }

  const now = new Date().toISOString();
  run(
    "INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, provider_customer_id, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, ?, ?, ?, ?)",
    user.id,
    plan.id,
    gpSub.id,
    phone,
    gpSub.status === "active" ? "active" : "incomplete",
    now,
    gpSub.next_billing_date ? new Date(gpSub.next_billing_date + "T00:00:00").toISOString() : null,
  );

  return NextResponse.json({
    ref: gpSub.id,
    url: `/validation-ussd-geniuspay?ref=${encodeURIComponent(gpSub.id)}`,
  });
}
