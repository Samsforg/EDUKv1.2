import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getKoraQuota, getFicheQuota, getDissertationQuota, getSimulateurQuota } from "@/lib/quotas";
import { getPremiumPlans } from "@/lib/plans";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const [kora, fiche, dissertation, simulateur, plans] = await Promise.all([
    getKoraQuota(user.id),
    getFicheQuota(user.id),
    getDissertationQuota(user.id),
    getSimulateurQuota(user.id),
    getPremiumPlans().catch(() => []),
  ]);

  const reussite = plans.find((p) => p.price_cents > 0 && p.interval === "month");
  const decouverte = plans.find((p) => p.price_cents === 0);

  return NextResponse.json({
    kora,
    fiche,
    dissertation,
    simulateur,
    plan: reussite
      ? { id: reussite.id, name: reussite.name, price_cents: reussite.price_cents, interval: reussite.interval }
      : null,
    decouverte_price: decouverte?.price_cents ?? 0,
  });
}

export const GET = guardApi("GET /api/tutor/quota", GETHandler);
