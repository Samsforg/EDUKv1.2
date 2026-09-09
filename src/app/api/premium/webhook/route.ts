import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { queryOne, run, query } from "@/lib/db";
import { canonicalPhone } from "@/lib/geniuspay";
import { sendSubscriptionReceipt } from "@/lib/mailer";
import { sendGa4Purchase } from "@/lib/ga4-ssr";
import { addXp, notify } from "@/lib/session";
import { logger } from "@/lib/logger";

interface WebhookTransactionData {
  reference?: string | null;
  id?: string | null;
  customer_phone?: string | null;
  customer?: { phone?: string; name?: string };
  metadata?: Record<string, unknown>;
  amount?: number;
  status?: string;
  next_billing_date?: string;
  end_at?: string;
  subscription?: WebhookSubscriptionData;
}

interface WebhookSubscriptionData {
  id?: string;
  status?: string;
  next_billing_date?: string;
  is_trialing?: boolean;
  customer?: { phone?: string; name?: string };
  amount?: number;
  plan_name?: string;
  end_at?: string;
}

interface WebhookPayload {
  event?: string;
  data?: WebhookTransactionData;
  subscription?: WebhookSubscriptionData;
  reference?: string;
  customer_phone?: string;
  amount?: number;
  plan_name?: string;
  [key: string]: unknown;
}

async function sendReceiptIfActive(reference: string | null) {
  if (!reference) return;
  const sub = await queryOne<{
    id: number;
    user_id: number;
    plan_name: string;
    price_cents: number;
    currency: string;
    end_at: string | null;
    status: string;
    provider_subscription_id: string;
    ga_client_id: string | null;
  }>(
    `SELECT s.id, s.user_id, p.name AS plan_name, COALESCE(s.price_cents, p.price_cents) AS price_cents,
            p.currency, s.end_at, s.status, s.provider_subscription_id, s.ga_client_id
     FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.provider = 'geniuspay' AND s.provider_subscription_id = ?
     ORDER BY s.id DESC LIMIT 1`,
    String(reference),
  );
  if (!sub || sub.status !== "active") return;
  const okMail = await sendSubscriptionReceipt(sub.user_id, {
    planName: sub.plan_name,
    amount: sub.price_cents,
    currency: sub.currency,
    endAt: sub.end_at,
    reference: sub.provider_subscription_id,
  });
  logger.webhook("geniuspay", "receipt_email", { userId: sub.user_id, planName: sub.plan_name, sent: okMail });

  // Fire-and-forget : ne bloque jamais la réponse du webhook (GeniusPay attend un 200 rapide).
  void sendGa4Purchase({
    clientId: sub.ga_client_id,
    value: sub.price_cents,
    currency: sub.currency,
    planName: sub.plan_name,
    transactionId: sub.provider_subscription_id,
    userId: sub.user_id,
  });
}

const TIMESTAMP_TOLERANCE_SECONDS = 300;

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/**
 * Spec officiel GeniusPay :
 *   signature = HMAC-SHA256(timestamp + "." + json_payload, secret)
 * Headers : X-Webhook-Signature, X-Webhook-Timestamp, X-Webhook-Event.
 */
function verifySignature(
  raw: string,
  sigHeader: string | null,
  timestampHeader: string | null,
  parsed: unknown,
): { ok: boolean; reason?: string } {
  const secretsEnv = process.env.GENIUSPAY_WEBHOOK_SECRET;
  if (!secretsEnv) {
    return { ok: false, reason: "secret-non-configuré" };
  }
  if (!sigHeader || !timestampHeader) return { ok: false, reason: "headers-manquants" };
  const ts = Number(timestampHeader);
  if (!Number.isFinite(ts)) return { ok: false, reason: "timestamp-invalide" };
  const diff = Math.abs(Date.now() / 1000 - ts);
  if (diff > TIMESTAMP_TOLERANCE_SECONDS) return { ok: false, reason: "timestamp-expiré" };

  const secrets = secretsEnv.split(",").map((s) => s.trim()).filter(Boolean);
  const candidates = [`${timestampHeader}.${raw}`, `${timestampHeader}.${JSON.stringify(parsed)}`];
  for (const secret of secrets) {
    for (const data of candidates) {
      const expected = crypto.createHmac("sha256", secret).update(data).digest("hex");
      if (timingSafeEqual(expected, sigHeader)) return { ok: true };
    }
  }
  return { ok: false, reason: "signature-invalide" };
}

function parseDateish(value: string | null | undefined): string | null {
  if (!value) return null;
  const d = /^\d{4}-\d{2}-\d{2}T/.test(value) ? new Date(value) : new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

async function findUserByPhone(phone: string | null): Promise<number | null> {
  const canon = canonicalPhone(phone);
  if (!canon) return null;
  const row = await queryOne<{ id: number }>("SELECT id FROM users WHERE phone_canonical = ? LIMIT 1", canon);
  if (row) return row.id;
  // Fallback legacy (avant migration phone_canonical)
  for (const u of await query<{ id: number; phone: string | null }>(
    "SELECT id, phone FROM users WHERE phone IS NOT NULL AND phone != '' LIMIT 2000",
  )) {
    if (canonicalPhone(u.phone) === canon) {
      await run("UPDATE users SET phone_canonical = ? WHERE id = ?", canon, u.id).catch(() => {});
      return u.id;
    }
  }
  return null;
}

/** Récupère la souscription GeniusPay la plus récente d'un utilisateur. */
async function findLatestUserSubscription(userId: number) {
  return queryOne<{ id: number; status: string }>(
    "SELECT id, status FROM subscriptions WHERE user_id = ? AND provider = 'geniuspay' ORDER BY id DESC LIMIT 1",
    userId,
  );
}

/** Traite un événement via le payload `data` au format officiel (transaction). */
async function handleTransactionEvent(event: string, data: WebhookTransactionData): Promise<string | null> {
  const reference = data?.reference ?? data?.id ?? null;
  const orderId = data?.metadata?.order_id ?? data?.metadata?.ref ?? null;
  const phone = data?.customer_phone ?? null;

  let existing = await queryOne<{ id: number; status: string }>(
    "SELECT id, status FROM subscriptions WHERE provider = 'geniuspay' AND (provider_subscription_id = ? OR provider_subscription_id = ?) ORDER BY id DESC LIMIT 1",
    String(reference ?? ""),
    String(orderId ?? ""),
  );

  let user: number | null = null;
  if (!existing) {
    user = await findUserByPhone(phone);
    if (user) existing = await findLatestUserSubscription(user);
  }

  const now = new Date().toISOString();
  const endAt = parseDateish(data?.next_billing_date ?? data?.end_at ?? (data?.metadata?.next_billing_date as string | undefined));

  let nextStatus: string | null = null;
  switch (event) {
    case "payment.success":
      nextStatus = "active";
      break;
    case "payment.failed":
      nextStatus = "past_due";
      break;
    case "payment.cancelled":
      nextStatus = "cancelled";
      break;
    case "payment.refunded":
      nextStatus = "cancelled";
      break;
    case "payment.expired":
    case "payment.initiated":
      return null;
    default:
      return null;
  }

  if (nextStatus) {
    if (existing) {
      // Ne pas rétrograder un essai/actif vers 'incomplete'.
      const isDowngradeToIncomplete = nextStatus === "incomplete" && (existing.status === "trial" || existing.status === "active");
      if (!isDowngradeToIncomplete) {
        await run(
          "UPDATE subscriptions SET status = ?, end_at = COALESCE(?, end_at), updated_at = ? WHERE id = ?",
          nextStatus,
          endAt,
          now,
          existing.id,
        );
      }
    } else if (user && nextStatus === "active") {
      const amount = Math.round(Number(data?.amount) || 0);
      const plan =
        amount > 0
          ? (await queryOne<{ id: number }>(
              "SELECT id FROM subscription_plans WHERE price_cents = ? ORDER BY sort_order, id LIMIT 1",
              amount,
            )) ?? null
          : null;
      if (!plan) {
        logger.warn("webhook:no_plan_match", { amount });
        return nextStatus;
      }
      await run(
        "INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, provider_customer_id, price_cents, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, ?, ?, 'active', ?, ?)",
        user,
        plan.id,
        String(reference ?? ""),
        phone ?? null,
        amount,
        now,
        endAt,
      );
    }
  }
  if (nextStatus === "active") {
    await sendReceiptIfActive(reference);
    void (async () => {
      try {
        const subUser = await queryOne<{ user_id: number }>("SELECT user_id FROM subscriptions WHERE provider_subscription_id = ? ORDER BY id DESC LIMIT 1", String(reference ?? ""));
        if (!subUser) return;
        const filleul = await queryOne<{ referred_by: number | null; first_name: string }>("SELECT referred_by, first_name FROM users WHERE id = ?", subUser.user_id);
        if (filleul?.referred_by) {
          await addXp(filleul.referred_by, 300);
          await notify(filleul.referred_by, "Prime parrainage payant !", `${filleul.first_name} s'est abonné : +300 XP + prime Wave à réclamer sur /parrainage.`, "payments");
        }
      } catch (e: unknown) { logger.warn("webhook:referral_xp_failed", { error: e instanceof Error ? e.message : String(e) }); }
    })();
  }
  return nextStatus ?? null;
}

/** Rétro-compatibilité : payload `data.subscription` (API abonnements). */
async function handleSubscriptionEvent(event: string, sub: WebhookSubscriptionData): Promise<string | null> {
  if (!sub?.id) return null;
  const endAt = parseDateish(sub.next_billing_date);

  const existing = await queryOne<{ id: number; status: string }>(
    "SELECT id, status FROM subscriptions WHERE provider_subscription_id = ? ORDER BY id DESC LIMIT 1",
    sub.id,
  );

  let nextStatus: string | null = null;
  switch (event) {
    case "subscription.payment_succeeded":
    case "payment.success":
      nextStatus = "active";
      break;
    case "subscription.created":
      if (sub.status === "active") nextStatus = "active";
      else if (sub.status === "trial" || sub.status === "trialing" || sub.is_trialing) nextStatus = "trial";
      else nextStatus = "incomplete";
      break;
    case "subscription.payment_failed":
    case "subscription.past_due":
    case "payment.failed":
      nextStatus = "past_due";
      break;
    case "subscription.cancelled":
    case "payment.cancelled":
      nextStatus = "cancelled";
      break;
    default:
      return null;
  }

  const now = new Date().toISOString();
  if (existing) {
    // Ne pas rétrograder un essai ('trial') ou un abonnement actif vers 'incomplete'
    // (ex : subscription.created reçu avant le 1er paiement de l'essai).
    const isDowngradeToIncomplete = nextStatus === "incomplete" && (existing.status === "trial" || existing.status === "active");
    if (!isDowngradeToIncomplete) {
      await run(
        "UPDATE subscriptions SET status = ?, end_at = COALESCE(?, end_at), updated_at = ? WHERE id = ?",
        nextStatus,
        endAt,
        now,
        existing.id,
      );
    }
    if (nextStatus === "active") {
      await sendReceiptIfActive(sub.id);
      void (async () => {
        try {
          const subUser = await queryOne<{ user_id: number }>("SELECT user_id FROM subscriptions WHERE provider_subscription_id = ? ORDER BY id DESC LIMIT 1", String(sub.id));
          if (!subUser) return;
          const filleul = await queryOne<{ referred_by: number | null; first_name: string }>("SELECT referred_by, first_name FROM users WHERE id = ?", subUser.user_id);
          if (filleul?.referred_by) {
            await addXp(filleul.referred_by, 300);
            await notify(filleul.referred_by, "Prime parrainage payant !", `${filleul.first_name} s'est abonné : +300 XP + prime Wave à réclamer sur /parrainage.`, "payments");
          }
        } catch (e: unknown) { logger.warn("webhook:referral_xp_failed", { error: e instanceof Error ? e.message : String(e) }); }
      })();
    }
    return nextStatus;
  }

  const phone = sub.customer?.phone ?? null;
  const user = await findUserByPhone(phone);
  const amount = Math.round(Number(sub.amount) || 0);
  let plan = await queryOne<{ id: number }>(
    "SELECT id FROM subscription_plans WHERE name = ? ORDER BY id LIMIT 1",
    sub.plan_name ?? "Pass Premium Mensuel",
  );
  if (!plan && amount > 0) {
    plan = await queryOne<{ id: number }>(
      "SELECT id FROM subscription_plans WHERE price_cents = ? ORDER BY sort_order, id LIMIT 1",
      amount,
    );
  }
  if (user && plan) {
    const insertEndAt = nextStatus === "trial" && !endAt
      ? new Date(Date.now() + 3 * 86_400_000).toISOString()
      : endAt;
    await run(
      "INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, provider_customer_id, price_cents, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, ?, ?, ?, ?, ?)",
      user,
      plan.id,
      sub.id,
      phone,
      amount,
      nextStatus,
      now,
      insertEndAt,
    );
  }
  if (nextStatus === "active") {
    await sendReceiptIfActive(sub.id);
    void (async () => {
      try {
        const subUser = await queryOne<{ user_id: number }>("SELECT user_id FROM subscriptions WHERE provider_subscription_id = ? ORDER BY id DESC LIMIT 1", String(sub.id));
        if (!subUser) return;
        const filleul = await queryOne<{ referred_by: number | null; first_name: string }>("SELECT referred_by, first_name FROM users WHERE id = ?", subUser.user_id);
        if (filleul?.referred_by) {
          await addXp(filleul.referred_by, 300);
          await notify(filleul.referred_by, "Prime parrainage payant !", `${filleul.first_name} s'est abonné : +300 XP + prime Wave à réclamer sur /parrainage.`, "payments");
        }
      } catch (e: unknown) { logger.warn("webhook:referral_xp_failed", { error: e instanceof Error ? e.message : String(e) }); }
    })();
  }
  return nextStatus;
}

async function GETHandler() {
  return NextResponse.json({ ok: true, service: "geniuspay-webhook", message: "Endpoint de webhook opérationnel" });
}

export const GET = guardApi("GET /api/premium/webhook", GETHandler);

async function POSTHandler(req: Request) {
  const raw = await req.text().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Corps vide" }, { status: 400 });

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const sig = req.headers.get("x-webhook-signature");
  const tsHdr = req.headers.get("x-webhook-timestamp");
  const check = verifySignature(raw, sig, tsHdr, payload);
  if (!check.ok) {
    logger.warn("webhook:rejected", { reason: check.reason });
    return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
  }

  const event = (req.headers.get("x-webhook-event") ?? payload.event ?? "") as string;
  if (event === "webhook.test") {
    logger.info("webhook:test_received", { event });
    return NextResponse.json({ received: true });
  }

  const eventId = `${event}:${payload.data?.reference ?? payload.data?.id ?? payload.data?.subscription?.id ?? raw.slice(0, 80)}:${tsHdr ?? ""}`.slice(0, 200);
  const dup = await queryOne<{ event_id: string }>("SELECT event_id FROM webhook_events WHERE event_id = ?", eventId);
  if (dup) {
    logger.info("webhook:duplicate_ignored", { eventId });
    return NextResponse.json({ received: true, duplicate: true });
  }
  await run("INSERT INTO webhook_events (event_id) VALUES (?) ON CONFLICT(event_id) DO NOTHING", eventId);

  const data = payload.data ?? {};

  let nextStatus: string | null = null;
  try {
    if (data?.subscription?.id) {
      nextStatus = await handleSubscriptionEvent(event, data.subscription);
    } else if (data && (data.reference || data.id || data.customer_phone)) {
      nextStatus = await handleTransactionEvent(event, data);
    }
  } catch (err) {
    logger.error("webhook:processing_error", { error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }

  logger.webhook("geniuspay", event, { status: nextStatus ?? "ignored" });
  return NextResponse.json({ received: true });
}

export const POST = guardApi("POST /api/premium/webhook", POSTHandler);