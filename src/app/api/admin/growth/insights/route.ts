import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { computeGrowthData } from "@/lib/growth/decision/data";
import { runDecisionLayer } from "@/lib/growth/decision";

/**
 * P2.1 — GET /api/admin/growth/insights
 *
 * Route unique du Decision Layer Growth AI :
 *  - admin-protectée (requireAdmin) + guardApi (logging sans secret) ;
 *  - read-only : calcul à la volée, aucune écriture, aucun appel réseau
 *    externe, aucun envoi (email/SMS/messagerie), aucune campagne,
 *    aucun modèle génératif ;
 *  - test users exclus dès la source (countFunnelForDay / predicates) ;
 *  - réponse = agrégats sans PII (comptages, taux, recommandations).
 */
async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const data = await computeGrowthData();
  const bundle = runDecisionLayer(data);
  return NextResponse.json(bundle);
}

export const GET = guardApi("GET /api/admin/growth/insights", GETHandler);
