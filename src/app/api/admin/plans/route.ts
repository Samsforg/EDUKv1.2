import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { run } from "@/lib/db";
import { getPremiumPlans } from "@/lib/plans";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import { logAudit } from "@/lib/audit";
import { revalidateTag } from "next/cache";

const INTERVALS = ["month", "quarter", "year"] as const;

function parsePlanBody(body: Record<string, unknown>) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) return { error: "Le nom du plan est requis" };
  if (name.length > 80) return { error: "Nom de plan trop long (80 caractères max)" };
  const interval = INTERVALS.includes(body.interval as (typeof INTERVALS)[number])
    ? (body.interval as string)
    : "month";
  const price = Math.max(0, Math.round(Number(body.price_cents) || 0));
  if (!Number.isFinite(price)) return { error: "Prix invalide" };
  const features = typeof body.features === "string" ? body.features.slice(0, 1000) : "";
  const sort_order = Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 99;
  return { name, interval, price_cents: price, features, sort_order };
}

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  const plans = await getPremiumPlans();
  return NextResponse.json({ plans });
}

export const GET = guardApi("GET /api/admin/plans", GETHandler);

async function POSTHandler(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => ({}));
  const parsed = parsePlanBody(body);
  if ("error" in parsed) return NextResponse.json(parsed, { status: 400 });

  const existing = await getPremiumPlans();
  if (existing.some((p) => p.name.toLowerCase() === parsed.name.toLowerCase())) {
    return NextResponse.json({ error: "Un plan porte déjà ce nom" }, { status: 409 });
  }

  const result = await run(
    "INSERT INTO subscription_plans (name, interval, price_cents, currency, features, sort_order) VALUES (?, ?, ?, 'XOF', ?, ?)",
    parsed.name,
    parsed.interval,
    parsed.price_cents,
    parsed.features,
    parsed.sort_order,
  );

  const actor = await getCurrentUser();
  await logAudit(
    actor!.id,
    "tarif",
    `Plan « ${parsed.name} » créé (${parsed.price_cents} FCFA/${parsed.interval})`,
  );

  revalidateTag("premium-plans", "seconds");
  return NextResponse.json({ ok: true, id: result.lastInsertRowid }, { status: 201 });
}

export const POST = guardApi("POST /api/admin/plans", POSTHandler);
