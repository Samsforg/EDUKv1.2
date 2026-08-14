import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { gpCreateSubscription } from "@/lib/geniuspay";
import { sendSubscriptionReceipt } from "@/lib/mailer";
import { ensureRentreePromo, getRedeemablePromo, applyPromoDiscount, RENTREE_PROMO_CODE } from "@/lib/promo";

function parseDateish(value: string | null | undefined): string | null {
  if (!value) return null;
  const d = /^\d{4}-\d{2}-\d{2}T/.test(value) ? new Date(value) : new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

async function POSTHandler(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { plan_id, promo } = body;
  if (!plan_id) return NextResponse.json({ error: "plan_id requis" }, { status: 400 });

  const plan = await queryOne<{
    id: number;
    name: string;
    interval: string;
    price_cents: number;
    currency: string;
  }>("SELECT id, name, interval, price_cents, currency FROM subscription_plans WHERE id = ?", plan_id);

  if (!plan) return NextResponse.json({ error: "Plan inconnu" }, { status: 400 });

  let priceCents = Math.round(plan.price_cents);
  if (promo) {
    if (String(promo).trim().toUpperCase() === RENTREE_PROMO_CODE) await ensureRentreePromo();
    const promoRow = await getRedeemablePromo(promo);
    if (!promoRow) {
      return NextResponse.json(
        { error: "Code promo invalide ou expiré", code: "PROMO_INVALID" },
        { status: 400 },
      );
    }
    priceCents = applyPromoDiscount(promoRow, priceCents);
    if (priceCents <= 0) {
      return NextResponse.json({ error: "Cette remise ne s'applique pas à ce plan" }, { status: 400 });
    }
    await run("UPDATE promo_codes SET used_count = used_count + 1 WHERE id = ?", promoRow.id);
    console.log(`[checkout] code promo « ${promoRow.code} » appliqué : ${plan.price_cents} -> ${priceCents} F (user ${user.id})`);
  }

  const existing = await queryOne<{ id: number }>(
    "SELECT id FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
    user.id,
  );
  if (existing) return NextResponse.json({ error: "Vous avez déjà un abonnement actif" }, { status: 400 });

  const phone = user.phone;
  if (!phone) {
    return NextResponse.json(
      {
        code: "PHONE_REQUIRED",
        error: "Ajoutez votre numéro de téléphone pour finaliser l'abonnement",
      },
      { status: 426 },
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
      amount: priceCents,
      billingCycle,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Échec de la création du paiement" }, { status: 502 });
  }

  const now = new Date().toISOString();
  const isActive = gpSub.status === "active";
  await run(
    "INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, provider_customer_id, price_cents, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, ?, ?, ?, ?, ?)",
    user.id,
    plan.id,
    gpSub.id,
    phone,
    priceCents,
    isActive ? "active" : "incomplete",
    now,
    parseDateish(gpSub.next_billing_date),
  );

  if (isActive) {
    const okMail = await sendSubscriptionReceipt(user.id, {
      planName: plan.name,
      amount: priceCents,
      currency: plan.currency,
      endAt: gpSub.next_billing_date ?? null,
      reference: gpSub.id,
    });
    console.log(`[checkout] reçu ${okMail ? "envoyé" : "ENVOI ÉCHOUÉ"} -> user ${user.id} (${plan.name})`);
  }

  return NextResponse.json({
    ref: gpSub.id,
    url: `/validation-ussd-geniuspay?ref=${encodeURIComponent(gpSub.id)}`,
  });
}

export const POST = guardApi("POST /api/premium/checkout", POSTHandler);
