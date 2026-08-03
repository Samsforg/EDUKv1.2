import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import type { Stripe } from "stripe";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY non configuré");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Stripe = require("stripe");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-07-29.dahlia" });
}

async function createPrice(plan: { name: string; interval: string; price_cents: number; currency: string }) {
  const stripe = getStripe();
  let stripeInterval: Stripe.PriceCreateParams.Recurring.Interval = "month";
  let intervalCount = 1;
  if (plan.interval === "quarter") {
    stripeInterval = "month";
    intervalCount = 3;
  } else if (plan.interval === "year") {
    stripeInterval = "year";
    intervalCount = 1;
  }

  return stripe.prices.create({
    unit_amount: plan.price_cents,
    currency: plan.currency.toLowerCase(),
    recurring: { interval: stripeInterval, interval_count: intervalCount },
    product_data: {
      name: plan.name,
    },
  });
}

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
    stripe_price_id: string | null;
  }>(
    "SELECT id, name, interval, price_cents, currency, stripe_price_id FROM subscription_plans WHERE id = ?",
    plan_id,
  );

  if (!plan) return NextResponse.json({ error: "Plan inconnu" }, { status: 400 });

  const existing = queryOne<{ id: number }>(
    "SELECT id FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
    user.id,
  );
  if (existing) return NextResponse.json({ error: "Vous avez déjà un abonnement actif" }, { status: 400 });

  let priceId: string;
  if (plan.stripe_price_id) {
    priceId = plan.stripe_price_id;
  } else {
    const price = await createPrice(plan);
    priceId = price.id;
    run("UPDATE subscription_plans SET stripe_price_id = ? WHERE id = ?", priceId, plan.id);
  }

  let customerId = queryOne<{ stripe_customer_id: string }>(
    "SELECT stripe_customer_id FROM subscriptions WHERE user_id = ? AND stripe_customer_id IS NOT NULL ORDER BY id DESC LIMIT 1",
    user.id,
  )?.stripe_customer_id;

  if (!customerId) {
    const stripe = getStripe();
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      name: `${user.first_name} ${user.last_name}`,
      metadata: { userId: String(user.id) },
    });
    customerId = customer.id;
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/paiement-reussi-edukora-premium`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/plans-d-abonnement-edukora-1`,
    metadata: { userId: String(user.id), planId: String(plan.id) },
  });

  const stripeSubId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;

  run(
    "INSERT INTO subscriptions (user_id, plan_id, stripe_subscription_id, stripe_customer_id, status, started_at) VALUES (?, ?, ?, ?, 'incomplete', ?)",
    user.id,
    plan.id,
    stripeSubId,
    customerId,
    new Date().toISOString(),
  );

  return NextResponse.json({ url: session.url });
}
