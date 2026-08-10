import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { gpGetSubscriptionStatus } from "@/lib/geniuspay";

function parseDateish(value: string | null | undefined): string | null {
  if (!value) return null;
  const d = /^\d{4}-\d{2}-\d{2}T/.test(value) ? new Date(value) : new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

async function GETHandler(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const ref = new URL(req.url).searchParams.get("ref");
  if (!ref) return NextResponse.json({ error: "ref requis" }, { status: 400 });

  const sub = await queryOne<{
    id: number;
    plan_id: number;
    provider_subscription_id: string;
    status: string;
    end_at: string | null;
    plan_name: string;
    price_cents: number;
    currency: string;
  }>(
    `SELECT s.id, s.plan_id, s.provider_subscription_id, s.status, s.end_at,
            p.name AS plan_name, COALESCE(s.price_cents, p.price_cents) AS price_cents, p.currency
     FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.user_id = ? AND s.provider_subscription_id = ? ORDER BY s.id DESC LIMIT 1`,
    user.id,
    ref,
  );
  if (!sub) return NextResponse.json({ error: "Transaction inconnue" }, { status: 404 });

  let gp: { is_active: boolean; status: string; next_billing_date?: string } | null = null;
  try {
    gp = await gpGetSubscriptionStatus(ref);
  } catch (err: any) {
    console.error("[status] geniuspay check failed:", err.message);
  }

  const status = gp?.status ?? sub.status;
  const endAt = parseDateish(gp?.next_billing_date) ?? sub.end_at;

  if (gp && status === "active" && sub.status !== "active") {
    await run(
      "UPDATE subscriptions SET status = 'active', end_at = COALESCE(?, end_at), updated_at = ? WHERE id = ?",
      parseDateish(gp.next_billing_date),
      new Date().toISOString(),
      sub.id,
    );
    console.log(`[status] abonnement ${ref} synchronisé comme actif (webhook manquant?)`);
  }

  return NextResponse.json({
    ref,
    status,
    is_active: status === "active",
    amount: sub.price_cents,
    currency: sub.currency,
    plan_name: sub.plan_name,
    end_at: endAt,
  });
}

export const GET = guardApi("GET /api/premium/status", GETHandler);
