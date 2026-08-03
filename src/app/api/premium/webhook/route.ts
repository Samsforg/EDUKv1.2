import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { queryOne, run } from "@/lib/db";

function verifySignature(raw: string, sigHeader: string | null): boolean {
  if (!sigHeader) return false;
  const secret = process.env.GENIUSPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const provided = sigHeader.replace(/^sha256=/, "");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
}

export async function POST(req: Request) {
  const raw = await (req as any).text().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Corps vide" }, { status: 400 });

  if (!verifySignature(raw, req.headers.get("x-geniuspay-signature"))) {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  let payload: any;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const event = payload.event as string;
  const sub = payload.data?.subscription;
  if (!sub?.id) {
    console.log(`[webhook] événement sans abonnement: ${event}`);
    return NextResponse.json({ received: true });
  }

  const now = new Date().toISOString();
  const endAt = sub.next_billing_date
    ? new Date(sub.next_billing_date + "T00:00:00").toISOString()
    : null;

  const existing = queryOne<{ id: number }>(
    "SELECT id FROM subscriptions WHERE provider_subscription_id = ? ORDER BY id DESC LIMIT 1",
    sub.id,
  );

  let nextStatus: string | null = null;
  switch (event) {
    case "subscription.payment_succeeded":
      nextStatus = "active";
      break;
    case "subscription.created":
      nextStatus = sub.status === "active" ? "active" : "incomplete";
      break;
    case "subscription.payment_failed":
    case "subscription.past_due":
      nextStatus = "past_due";
      break;
    case "subscription.cancelled":
      nextStatus = "cancelled";
      break;
    default:
      console.log(`[webhook] événement non géré: ${event}`);
  }

  if (nextStatus) {
    if (existing) {
      run(
        "UPDATE subscriptions SET status = ?, end_at = COALESCE(?, end_at), updated_at = ? WHERE id = ?",
        nextStatus,
        endAt,
        now,
        existing.id,
      );
    } else {
      const plan = queryOne<{ id: number }>(
        "SELECT id FROM subscription_plans WHERE name = ? ORDER BY id LIMIT 1",
        sub.plan_name ?? "Pass Premium Mensuel",
      );
      const phone = sub.customer?.phone ?? null;
      const user = phone
        ? queryOne<{ id: number }>("SELECT id FROM users WHERE phone = ? ORDER BY id LIMIT 1", phone)
        : null;
      if (plan && user) {
        run(
          "INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, provider_customer_id, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, ?, ?, ?, ?)",
          user.id,
          plan.id,
          sub.id,
          phone,
          nextStatus,
          now,
          endAt,
        );
      }
    }
  }

  console.log(`[webhook] ${event} pour ${sub.id} -> ${nextStatus ?? "ignoré"}`);
  return NextResponse.json({ received: true });
}
