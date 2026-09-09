import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { gpCreateSubscription } from "@/lib/geniuspay";
import { sendSubscriptionReceipt } from "@/lib/mailer";
import { ensureRentreePromo, getRedeemablePromo, applyPromoDiscount, RENTREE_PROMO_CODE } from "@/lib/promo";
import { logger } from "@/lib/logger";

function parseDateish(value: string | null | undefined): string | null {
  if (!value) return null;
  const d = /^\d{4}-\d{2}-\d{2}T/.test(value) ? new Date(value) : new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

async function POSTHandler(req: Request) {
  try {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { plan_id, promo, trial, oneClick } = body as { plan_id?: number; promo?: string; trial?: boolean; oneClick?: boolean };
  if (!plan_id) return NextResponse.json({ error: "plan_id requis" }, { status: 400 });

  // Idempotence : même plan/promo/trial depuis même user = même réponse 24h
  const idemKey = req.headers.get("x-idempotency-key")?.trim() || `checkout:${user.id}:${plan_id}:${(promo ?? "").toUpperCase()}:${trial ? "trial" : "notrial"}`;
  const cached = await queryOne<{ response: string }>("SELECT response FROM idempotency_keys WHERE key = ? AND user_id = ?", idemKey, user.id);
  if (cached) {
    try { return NextResponse.json(JSON.parse(cached.response)); } catch { /* corrupted cache, re-process */ }
  }

  const plan = await queryOne<{
    id: number;
    name: string;
    interval: string;
    price_cents: number;
    currency: string;
  }>("SELECT id, name, interval, price_cents, currency FROM subscription_plans WHERE id = ?", plan_id);

  if (!plan) return NextResponse.json({ error: "Plan inconnu" }, { status: 400 });

  let priceCents = Math.round(plan.price_cents);

  // Promo parrain : le filleul (compte créé via un code) a -20% sur son 1er mois, une seule fois
  const referredBy = await queryOne<{ referred_by: number | null }>("SELECT referred_by FROM users WHERE id = ?", user.id);
  const isReferralDiscount =
    plan.interval === "month" &&
    !!referredBy?.referred_by &&
    !(await queryOne<{ id: number }>(
      "SELECT id FROM subscriptions WHERE user_id = ? AND price_cents IS NOT NULL LIMIT 1",
      user.id
    ));
  if (isReferralDiscount && !promo) {
    priceCents = Math.round(priceCents * 0.8);
    logger.checkout("referral_discount_applied", { userId: user.id, priceCents });
  }
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
    const upd = await run("UPDATE promo_codes SET used_count = used_count + 1 WHERE id = ? AND used_count < max_uses", promoRow.id);
    if (upd.changes === 0) {
      return NextResponse.json({ error: "Code promo épuisé entre-temps" }, { status: 409 });
    }
    logger.checkout("promo_code_applied", { code: promoRow.code, originalPrice: plan.price_cents, finalPrice: priceCents, userId: user.id });
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
  const phoneDigits = phone.replace(/\D/g, "").replace(/^225/, "");
  if (!/^(0[1-7]\d{8}|[1-7]\d{8})$/.test(phoneDigits)) {
    return NextResponse.json({ error: "Numéro Mobile Money invalide (ex. 07XXXXXXXX)" }, { status: 400 });
  }

  const billingCycle =
    plan.interval === "quarter" ? "quarterly" : plan.interval === "year" ? "yearly" : "monthly";

  // 1-clic : si le numéro est déjà vérifié et qu'on a un abonnement passé, on réutilise le phone sans friction (phone déjà en base = 1-clic)
  const isOneClick = !!oneClick && !!phone;
  // Essai gratuit 3 jours : offert une seule fois par utilisateur (has_used_trial)
  const uTrial = await queryOne<{ has_used_trial: number }>("SELECT has_used_trial FROM users WHERE id = ?", user.id);
  const hasHadTrial = (uTrial?.has_used_trial ?? 0) === 1;
  const wantTrial = !!trial && !hasHadTrial;
  const trialDays = wantTrial ? 3 : undefined;
  if (wantTrial && trialDays) {
    // le montant affiché aujourd'hui est 0 FCFA (trial), GeniusPay ne facture qu'après 3j
  }

  let gpSub!: { id: string; status: string; next_billing_date?: string };
  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      gpSub = await gpCreateSubscription({
        phone,
        name: `${user.first_name} ${user.last_name}`.trim(),
        planName: plan.name,
        amount: priceCents,
        billingCycle,
        trialDays,
      });
      break;
    } catch (err: unknown) {
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
        continue;
      }
      return NextResponse.json({ error: (err as Error).message ?? "Échec de la création du paiement", retryable: true }, { status: 502 });
    }
  }

  const now = new Date().toISOString();
  const isActive = gpSub.status === "active";
  // L'essai gratuit débloque le Premium immédiatement : on stocke 'trial' valable jusqu'à la fin de la période d'essai.
  const subStatus = isActive ? "active" : wantTrial ? "trial" : "incomplete";
  const subEndAt = isActive
    ? parseDateish(gpSub.next_billing_date)
    : wantTrial
      ? new Date(Date.now() + (trialDays ?? 3) * 86_400_000).toISOString()
      : null;

  const gaClientId =
    req.headers
      .get("cookie")
      ?.match(/(?:^|; )edukora_gacid=([^;]*)/)
      ?.map((x) => decodeURIComponent(x))[1] ?? null;

  try {
    await run(
      "INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, provider_customer_id, price_cents, status, started_at, end_at, ga_client_id) VALUES (?, ?, 'geniuspay', ?, ?, ?, ?, ?, ?, ?)",
      user.id,
      plan.id,
      gpSub.id,
      phone,
      priceCents,
      subStatus,
      now,
      subEndAt,
      gaClientId,
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/uniq_active|UNIQUE.*subscriptions/i.test(msg)) {
      return NextResponse.json({ error: "Vous avez déjà un abonnement actif (double clic évité)" }, { status: 409 });
    }
    throw e;
  }
  if (wantTrial) await run("UPDATE users SET has_used_trial = 1 WHERE id = ?", user.id);
  await run("UPDATE users SET phone_canonical = ? WHERE id = ? AND phone_canonical IS NULL", phoneDigits.slice(-10), user.id);

  if (isActive) {
    const okMail = await sendSubscriptionReceipt(user.id, {
      planName: plan.name,
      amount: priceCents,
      currency: plan.currency,
      endAt: gpSub.next_billing_date ?? null,
      reference: gpSub.id,
    });
    logger.checkout("receipt_email", { userId: user.id, planName: plan.name, sent: okMail });
  }

  const respBody = {
    ref: gpSub.id,
    url: `/validation-ussd-geniuspay?ref=${encodeURIComponent(gpSub.id)}`,
    trial: wantTrial ? { days: 3, active: gpSub.status === "trial" || isActive } : null,
    oneClick: isOneClick,
  };
  await run("INSERT INTO idempotency_keys (key, user_id, response) VALUES (?, ?, ?) ON CONFLICT(key) DO NOTHING", idemKey, user.id, JSON.stringify(respBody));
  return NextResponse.json(respBody);
  } catch (e: unknown) {
    logger.error("checkout:crash", { error: e instanceof Error ? e.message : String(e) });
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

export const POST = guardApi("POST /api/premium/checkout", POSTHandler);
