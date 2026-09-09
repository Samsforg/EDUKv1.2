import { unstable_cache } from "next/cache";
import { query, queryOne } from "./db";

export interface PlanRow {
  id: number;
  name: string;
  interval: string;
  price_cents: number;
  currency: string;
  features: string | null;
  sort_order: number;
}

function fixPlanPrice(p: PlanRow): PlanRow {
  return p;
}

export async function getPremiumPlans(): Promise<PlanRow[]> {
  const rows = await query<PlanRow>(
    "SELECT id, name, interval, price_cents, currency, features, sort_order FROM subscription_plans ORDER BY sort_order, id",
  );
  return rows.map((r) => fixPlanPrice({ ...r }));
}

const cachedPremiumPlans = unstable_cache(getPremiumPlans, ["premium-plans"], {
  revalidate: 60,
  tags: ["premium-plans"],
});

export async function getCachedPremiumPlans(): Promise<PlanRow[]> {
  return cachedPremiumPlans();
}

export async function getPlanById(id: number): Promise<PlanRow | undefined> {
  const row = await queryOne<PlanRow>(
    "SELECT id, name, interval, price_cents, currency, features, sort_order FROM subscription_plans WHERE id = ?",
    id,
  );
  return row ? fixPlanPrice({ ...row }) : undefined;
}

export function planFeatures(plan: PlanRow | null | undefined): string[] {
  return (plan?.features ?? "").split("\n").map((f) => f.trim()).filter(Boolean);
}

export function formatPlanPrice(priceCents: number): string {
  return priceCents === 0 ? "0 FCFA" : `${priceCents.toLocaleString("fr-FR")} FCFA`;
}

export function formatPlanInterval(interval: string): string {
  if (interval === "year") return "/an";
  if (interval === "quarter") return "/trimestre";
  return "/mois";
}
