/**
 * P2.2 §6 — performance par référent (fonctions pures).
 *
 * Source réelle : boucle de parrainage existante `users.referred_by`
 * (maillon unique, table `referrals` NON créée — P2.0). Lecture seule.
 *
 *   - `referral` = code de parrainage du parrain (identifiant public) —
 *     jamais nom, email ou identifiant sensible dans l'insight (§19) ;
 *   - `visitors` par référent : non attribuable (page_view sans lien de
 *     parrainage) → null documenté, pas de 0 fabriqué (§2) ;
 *   - dénominateur nul → taux null ;
 *   - sample-size protection : INSUFFICIENT_DATA sous MIN_SAMPLE.segment.
 */

import type { GrowthReferralPerformance, InsightStatus } from "./types";
import type { ReferralRow } from "./types";
import { MIN_SAMPLE } from "./thresholds";

function ratio(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return numerator / denominator;
}

export function buildReferralPerformance(row: ReferralRow): GrowthReferralPerformance {
  const minSample = MIN_SAMPLE.segment;
  const status: InsightStatus = row.signups >= minSample ? "VALID" : "INSUFFICIENT_DATA";
  return {
    referral: row.referral,
    // Page_view sans lien de parrainage : non calculable (§2).
    visitors: null,
    signups: row.signups,
    activated: row.activated,
    subscriptions: row.subscriptions,
    revenue: row.revenue_cents,
    activationRate: ratio(row.activated, row.signups),
    conversionRate: ratio(row.subscriptions, row.signups),
    status,
    sample_size: row.signups,
    min_sample: minSample,
  };
}

export function buildReferralPerformances(rows: ReferralRow[]): GrowthReferralPerformance[] {
  return rows
    .map(buildReferralPerformance)
    .sort((a, b) => b.signups - a.signups || a.referral.localeCompare(b.referral));
}
