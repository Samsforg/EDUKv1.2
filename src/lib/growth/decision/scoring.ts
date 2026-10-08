import type { PriorityLabel, SignalSeverity } from "./types";
import {
  MIN_SAMPLE,
  PRIORITY_BUCKETS,
  SCORE_FORMULA,
  SCORE_SCALE,
  SEVERITY_GAPS,
  URGENCY,
} from "./thresholds";

/**
 * P2.1 — score de priorité déterministe (§9).
 *
 *   priority_score = round(impact × confidence × urgency / 10000) ∈ [0,100]
 *
 * Les trois composantes sont sur la même échelle 0..100 :
 *   - impact    : à quel point l'écart observé vs seuil est grand ;
 *   - confidence: à quel point l'échantillon rend la mesure fiable ;
 *   - urgency   : à quel point la tendance récente exige d'agir.
 * Le produit pondère naturellement : un grand écart non fiable (petit
 * échantillon) reste prioritairement bas, comme un écart fiable mais
 * stable. Aucun coefficient n'est tuné arbitrairement : les tables
 * vivent dans thresholds.ts et sont testées.
 */

export function clampScore(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(SCORE_SCALE, Math.round(n)));
}

/**
 * Confiance 0..100 : linéaire avec la taille d'échantillon jusqu'au minimum
 * requis (100 au-delà). En dessous du minimum, la décision n'est de toute
 * façon jamais produite (rules.ts) — la fonction reste utilisable pour
 * afficher une confiance « indicative » plafonnée à 99.
 */
export function computeConfidence(sampleSize: number, minSample: number): number {
  if (minSample <= 0) return SCORE_SCALE;
  const ratio = sampleSize / minSample;
  const score = ratio >= 1 ? SCORE_SCALE : Math.floor(ratio * SCORE_SCALE);
  return Math.max(0, Math.min(ratio >= 1 ? SCORE_SCALE : 99, score));
}

/**
 * Impact 0..100 : écart relatif |value − threshold| / threshold, saturé.
 * Plus l'écart au seuil est grand, plus l'opportunité est grande — borné
 * à 100 pour éviter qu'un ratio extrême domine l'échelle.
 */
export function computeImpact(value: number, threshold: number): number {
  if (threshold === 0) return value === 0 ? 0 : SCORE_SCALE;
  const gap = Math.abs(value - threshold) / threshold;
  return clampScore(gap * SCORE_SCALE);
}

/**
 * Urgence 0..100 (table constante, thresholds.URGENCY) :
 *   - pas de période précédente exploitable → NO_TREND (50, neutre) ;
 *   - stable ou en hausse (trend ≥ 0)        → STABLE (40) ;
 *   - en baisse                              → 60 + min(40, baisse en %).
 * La baisse récente reflète l'actualité du problème : −40 % ou plus → 100.
 */
export function computeUrgency(trendPct: number | null): number {
  if (trendPct === null) return URGENCY.NO_TREND;
  if (trendPct >= 0) return URGENCY.STABLE;
  const decline = Math.min(100, Math.abs(trendPct));
  return Math.min(
    SCORE_SCALE,
    URGENCY.DECLINING_BASE + Math.min(URGENCY.DECLINING_MAX_BONUS, Math.round(decline)),
  );
}

/** priority_score = round(impact × confidence × urgency / 10000). */
export function computePriorityScore(impact: number, confidence: number, urgency: number): number {
  const i = clampScore(impact);
  const c = clampScore(confidence);
  const u = clampScore(urgency);
  return clampScore((i * c * u) / SCORE_FORMULA.divisor);
}

/** Buckets constants §9 : 80-100 CRITICAL … 0-19 IGNORE. */
export function scoreBucket(score: number): PriorityLabel {
  const s = clampScore(score);
  const found = PRIORITY_BUCKETS.find((b) => s >= b.min && s <= b.max);
  return found?.label ?? "IGNORE";
}

/** Gravité d'un signal selon l'écart relatif à son seuil (SEVERITY_GAPS). */
export function gapSeverity(value: number, threshold: number): SignalSeverity {
  if (threshold === 0) return value === 0 ? "info" : "high";
  const gap = Math.abs(value - threshold) / threshold;
  if (gap < SEVERITY_GAPS.low) return "low";
  if (gap < SEVERITY_GAPS.medium) return "medium";
  return "high";
}

/** Tendance en % : (actuel − précédent) / précédent × 100, null si base 0. */
export function trendPct(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return ((current - previous) / previous) * 100;
}

export { MIN_SAMPLE };
