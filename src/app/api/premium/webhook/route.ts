import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";

function getStripe(): any {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY non configuré");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Stripe = require("stripe");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-07-29.dahlia" });
}

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 500 });
  }

  const raw = await (req as any).text().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Corps vide" }, { status: 400 });

  const stripe = getStripe();

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err: any) {
    console.error("[webhook] signature invalide:", err.message);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  function syncSubscription(sub: any) {
    const userId = Number(sub.metadata?.userId);
    const planId = Number(sub.metadata?.planId);
    if (!userId || !planId) return;

    const now = new Date().toISOString();
    const status = sub.status === "incomplete" ? "incomplete" : sub.status;
    const currentPeriodEnd = sub.current_period_end;
    const endAt = currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null;

    const existing = queryOne<{ id: number }>(
      "SELECT id FROM subscriptions WHERE user_id = ? AND plan_id = ? ORDER BY id DESC LIMIT 1",
      userId,
      planId,
    );

    if (existing) {
      run(
        "UPDATE subscriptions SET stripe_subscription_id = ?, status = ?, end_at = ?, cancel_at_period_end = ?, updated_at = ? WHERE id = ?",
        sub.id,
        status,
        endAt,
        sub.cancel_at_period_end ? 1 : 0,
        now,
        existing.id,
      );
    } else {
      const custId = typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? null;
      run(
        "INSERT INTO subscriptions (user_id, plan_id, stripe_subscription_id, stripe_customer_id, status, started_at, end_at, cancel_at_period_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        userId,
        planId,
        sub.id,
        custId,
        status,
        new Date(sub.created * 1000).toISOString(),
        endAt,
        sub.cancel_at_period_end ? 1 : 0,
      );
    }
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const subId = session.subscription;
      if (subId && typeof subId === "string") {
        const sub = stripe.subscriptions.retrieve(subId);
        sub.then(syncSubscription).catch((e: any) => console.error("[webhook] retrieve sub:", e.message));
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      syncSubscription(event.data.object);
      break;
    case "invoice.payment_succeeded": {
      const invoice = event.data.object;
      const subId = invoice.subscription;
      if (subId && typeof subId === "string") {
        stripe.subscriptions.retrieve(subId).then(syncSubscription).catch((e: any) => console.error("[webhook] retrieve sub:", e.message));
      }
      break;
    }
    default:
      console.log(`[webhook] événement non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
