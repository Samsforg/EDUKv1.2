/**
 * P2.2 §5 — performance par canal (fonctions pures).
 *
 * Contrats respectés :
 *   - dénominateur nul → taux `null` (0 visiteur → signupRate null ;
 *     10 visiteurs + 0 inscription → signupRate 0) ;
 *   - `visitors` par canal : NON ATTRIBUABLE aujourd'hui (les page_view
 *     ne portent aucune propriété d'attribution) → null, jamais un 0
 *     fabriqué (§2) ;
 *   - sample-size protection : statut INSUFFICIENT_DATA sous
 *     MIN_SAMPLE.segment — un canal à 4 inscrits n'est jamais déclaré
 *     « meilleur canal » (§7, §9) ;
 *   - aucun benchmark externe : les taux sont descriptifs.
 */

import type { GrowthChannelPerformance, InsightStatus } from "./types";
import type { ChannelRow } from "./types";
import { MIN_SAMPLE } from "./thresholds";

function ratio(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return numerator / denominator;
}

/**
 * Construit la performance normalisée d'un canal (ligne SQL agrégée).
 * Les taux restent `null` tant que le dénominateur est nul ou absent.
 */
export function buildChannelPerformance(row: ChannelRow): GrowthChannelPerformance {
  const minSample = MIN_SAMPLE.segment;
  const status: InsightStatus = row.signups >= minSample ? "VALID" : "INSUFFICIENT_DATA";
  return {
    channel: row.channel,
    // Page_view sans attribution : non calculable (aucun faux 0, §2).
    visitors: null,
    signups: row.signups,
    activated: row.activated,
    subscriptions: row.subscriptions,
    revenue: row.revenue_cents,
    signupRate: null,
    activationRate: ratio(row.activated, row.signups),
    // Inscrit → abonné actif (conversion monétisée du canal).
    conversionRate: ratio(row.subscriptions, row.signups),
    status,
    sample_size: row.signups,
    min_sample: minSample,
  };
}

/** Construit toutes les performances, tri signups décroissant (tie : canal alphabétique). */
export function buildChannelPerformances(rows: ChannelRow[]): GrowthChannelPerformance[] {
  return rows
    .map(buildChannelPerformance)
    .sort((a, b) => b.signups - a.signups || a.channel.localeCompare(b.channel));
}
