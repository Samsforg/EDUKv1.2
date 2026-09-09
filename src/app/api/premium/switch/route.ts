import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";
import { queryOne, run } from "@/lib/db";
import { gpCreateSubscription, gpCancelSubscription } from "@/lib/geniuspay";
import { sendSubscriptionReceipt } from "@/lib/mailer";
import { logger } from "@/lib/logger";

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const newPlanId = Number(body.plan_id);
  if (!newPlanId) return NextResponse.json({ error: "plan_id requis" }, { status: 400 });

  // Find current active subscription
  const current = await queryOne<{
    id: number;
    plan_id: number;
    plan_name: string;
    provider_subscription_id: string | null;
    price_cents: number;
    end_at: string | null;
  }>(
    `SELECT s.id, s.plan_id, p.name AS plan_name, s.provider_subscription_id, s.price_cents, s.end_at
     FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.user_id = ? AND s.status = 'active'
     ORDER BY s.id DESC LIMIT 1`,
    user.id,
  );

  if (!current) {
    return NextResponse.json({ error: "Aucun abonnement actif à modifier" }, { status: 400 });
  }

  if (current.plan_id === newPlanId) {
    return NextResponse.json({ error: "Vous êtes déjà sur ce plan" }, { status: 400 });
  }

  // Fetch new plan details
  const newPlan = await queryOne<{
    id: number;
    name: string;
    interval: string;
    price_cents: number;
    currency: string;
  }>(
    "SELECT id, name, interval, price_cents, currency FROM subscription_plans WHERE id = ?",
    newPlanId,
  );
  if (!newPlan) return NextResponse.json({ error: "Plan inconnu" }, { status: 400 });

  const phone = user.phone;
  if (!phone) {
    return NextResponse.json({ error: "Numéro de téléphone requis pour le changement de plan" }, { status: 400 });
  }

  const billingCycle =
    newPlan.interval === "quarter" ? "quarterly" : newPlan.interval === "year" ? "yearly" : "monthly";

  // 1. Create new GeniusPay subscription
  let gpSub: { id: string; status: string; next_billing_date?: string };
  try {
    gpSub = await gpCreateSubscription({
      phone,
      name: `${user.first_name} ${user.last_name}`.trim(),
      planName: newPlan.name,
      amount: newPlan.price_cents,
      billingCycle,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Échec de la création du nouvel abonnement" }, { status: 502 });
  }

  const now = new Date().toISOString();

  // 2. Cancel old subscription immediately
  if (current.provider_subscription_id) {
    try {
      await gpCancelSubscription(current.provider_subscription_id, true, "Changement de plan");
    } catch (err: unknown) {
      logger.error("switch:cancel_old_failed", { subId: current.id, error: err instanceof Error ? err.message : String(err) });
      // Continue anyway — new subscription is created
    }
  }

  // 3. Mark old subscription as cancelled
  await run(
    "UPDATE subscriptions SET status = 'cancelled', cancel_at_period_end = 0, updated_at = ? WHERE id = ?",
    now,
    current.id,
  );

  // 4. Create new local subscription
  const isActive = gpSub.status === "active";
  const subStatus = isActive ? "active" : "incomplete";
  const subEndAt = isActive ? gpSub.next_billing_date ?? null : null;

  await run(
    "INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, provider_customer_id, price_cents, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, ?, ?, ?, ?, ?)",
    user.id,
    newPlan.id,
    gpSub.id,
    phone,
    newPlan.price_cents,
    subStatus,
    now,
    subEndAt,
  );

  if (isActive) {
    await sendSubscriptionReceipt(user.id, {
      planName: newPlan.name,
      amount: newPlan.price_cents,
      currency: newPlan.currency,
      endAt: gpSub.next_billing_date ?? null,
      reference: gpSub.id,
    });
  }

  const isUpgrade = newPlan.price_cents > current.price_cents;

  logger.info("switch:plan", {
    userId: user.id,
    from: current.plan_name,
    to: newPlan.name,
    isUpgrade,
    priceDiff: newPlan.price_cents - current.price_cents,
  });

  return NextResponse.json({
    ok: true,
    message: isUpgrade
      ? `Upgrade vers ${newPlan.name} confirmé !`
      : `Passage à ${newPlan.name} confirmé. Le changement prendra effet à la fin de la période courante.`,
    from_plan: current.plan_name,
    to_plan: newPlan.name,
    is_upgrade: isUpgrade,
  });
}

export const POST = guardApi("POST /api/premium/switch", POSTHandler);
