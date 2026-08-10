import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getPremiumPlans } from "@/lib/plans";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import { logAudit } from "@/lib/audit";
import { revalidateTag } from "next/cache";

const INTERVALS = ["month", "quarter", "year"] as const;

async function PATCHHandler(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const planId = Number(id);
  const plan = await queryOne<{ id: number; name: string; interval: string; price_cents: number; features: string | null; sort_order: number }>(
    "SELECT id, name, interval, price_cents, features, sort_order FROM subscription_plans WHERE id = ?",
    planId,
  );
  if (!plan) return NextResponse.json({ error: "Plan introuvable" }, { status: 404 });

  const body = await req.json().catch(() => ({}));

  const name = typeof body.name === "string" ? body.name.trim() : plan.name;
  if (!name) return NextResponse.json({ error: "Le nom du plan est requis" }, { status: 400 });
  if (name.length > 80) return NextResponse.json({ error: "Nom de plan trop long (80 caractères max)" }, { status: 400 });

  const interval =
    typeof body.interval === "string" && INTERVALS.includes(body.interval as (typeof INTERVALS)[number])
      ? body.interval
      : plan.interval;

  let price = plan.price_cents;
  if (body.price_cents !== undefined) {
    const n = Number(body.price_cents);
    if (!Number.isFinite(n) || n < 0) return NextResponse.json({ error: "Prix invalide" }, { status: 400 });
    price = Math.round(n);
  }

  let features = plan.features ?? "";
  if (body.features !== undefined) {
    if (typeof body.features !== "string") return NextResponse.json({ error: "Avantages invalides" }, { status: 400 });
    features = body.features.slice(0, 1000);
  }

  let sortOrder = plan.sort_order;
  if (body.sort_order !== undefined) {
    const n = Number(body.sort_order);
    if (!Number.isFinite(n)) return NextResponse.json({ error: "Ordre invalide" }, { status: 400 });
    sortOrder = n;
  }

  const plans = await getPremiumPlans();
  if (plans.some((p) => p.id !== planId && p.name.toLowerCase() === name.toLowerCase())) {
    return NextResponse.json({ error: "Un autre plan porte déjà ce nom" }, { status: 409 });
  }

  await run(
    "UPDATE subscription_plans SET name = ?, interval = ?, price_cents = ?, features = ?, sort_order = ? WHERE id = ?",
    name,
    interval,
    price,
    features,
    sortOrder,
    planId,
  );

  const actor = await getCurrentUser();
  await logAudit(
    actor!.id,
    "tarif",
    `Plan « ${plan.name} » modifié → « ${name} » (${price} FCFA/${interval})`,
  );

  revalidateTag("premium-plans", "seconds");

  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/admin/plans/[id]", PATCHHandler);

async function DELETEHandler(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const planId = Number(id);
  const plan = await queryOne<{ id: number; name: string }>(
    "SELECT id, name FROM subscription_plans WHERE id = ?",
    planId,
  );
  if (!plan) return NextResponse.json({ error: "Plan introuvable" }, { status: 404 });

  const refs = await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM subscriptions WHERE plan_id = ?",
    planId,
  );
  if (refs && refs.c > 0) {
    return NextResponse.json(
      { error: "Ce plan est lié à des abonnements existants, il ne peut pas être supprimé" },
      { status: 400 },
    );
  }

  await run("DELETE FROM subscription_plans WHERE id = ?", planId);

  const actor = await getCurrentUser();
  await logAudit(actor!.id, "tarif", `Plan « ${plan.name} » supprimé`);
  revalidateTag("premium-plans", "seconds");

  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/admin/plans/[id]", DELETEHandler);
