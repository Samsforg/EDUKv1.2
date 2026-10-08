import type {
  GrowthData,
  GrowthOpportunity,
  GrowthSignal,
  InsightStatus,
  OpportunityType,
  SegmentKey,
  SignalType,
} from "./types";
import {
  MIN_SAMPLE,
  SOURCE_ANALYTICS,
  THRESHOLDS,
} from "./thresholds";
import {
  computeConfidence,
  computeImpact,
  computePriorityScore,
  computeUrgency,
  gapSeverity,
  scoreBucket,
  trendPct,
} from "./scoring";

/**
 * P2.1 — Growth Rule Engine déterministe (§10, §11).
 *
 * DATA → SIGNALS → OPPORTUNITIES. Aucune IA générative, aucun appel
 * externe, aucun coefficient dynamique : mêmes données → mêmes décisions.
 *
 * Règles (chaque seuil documenté dans thresholds.ts) :
 *   R1 IF taux activation < 0.30 THEN ACTIVATION_BOTTLENECK
 *   R2 IF abandon checkout > 0.50 THEN CHECKOUT_DROPOFF
 *   R3 IF activations ≥ 30 AND achats = 0 THEN MONETIZATION_OPPORTUNITY
 *   R4 IF taux retour < 0.20 THEN RETENTION_OPPORTUNITY
 *      (rétention D7 officielle = INSUFFICIENT_DATA → aucune reco, §12)
 *   R5 IF taux signup < 0.10 THEN ACQUISITION_WEAKNESS
 *      IF taux signup > 0.30 THEN ACQUISITION_STRENGTH
 *
 * Sous le minimum d'échantillon (MIN_SAMPLE) : status INSUFFICIENT_DATA,
 * signal possible mais JAMAIS d'opportunité ni de recommandation forte.
 */

/** Métriques agrégées de la période + tendances vs période précédente. */
export interface ComputedMetrics {
  period: string;
  visitors: number;
  signups: number;
  activated: number;
  checkoutStarted: number;
  purchases: number;
  returnVisits: number;
  signupRate: number | null;
  activationRate: number | null;
  checkoutDropoff: number | null;
  returnVisitRate: number | null;
  previousSignupRate: number | null;
  previousActivationRate: number | null;
  previousCheckoutDropoff: number | null;
  previousReturnVisitRate: number | null;
  activationTrend: number | null;
  signupTrend: number | null;
  dropoffTrend: number | null;
  returnTrend: number | null;
}

export interface RuleOutcome {
  metrics: ComputedMetrics;
  signals: GrowthSignal[];
  opportunities: GrowthOpportunity[];
}

function ratio(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return numerator / denominator;
}

function dropoffRate(checkouts: number, purchases: number): number | null {
  if (checkouts <= 0) return null;
  return 1 - Math.min(1, purchases / checkouts);
}

/** Période lisible `from/to` pour les payloads. */
export function periodLabel(data: GrowthData): string {
  return `${data.period.from}/${data.period.to}`;
}

export function computeMetrics(data: GrowthData): ComputedMetrics {
  const f = data.funnel;
  const p = data.previous_funnel;
  const visitors = f["page_view"] ?? 0;
  const signups = f["signup_completed"] ?? 0;
  const activated = f["activated"] ?? 0;
  const checkoutStarted = f["begin_checkout"] ?? 0;
  const purchases = f["purchase"] ?? 0;
  const returnVisits = f["return_visit"] ?? 0;

  const prevVisitors = p["page_view"] ?? 0;
  const prevSignups = p["signup_completed"] ?? 0;
  const prevActivated = p["activated"] ?? 0;
  const prevCheckouts = p["begin_checkout"] ?? 0;
  const prevPurchases = p["purchase"] ?? 0;
  const prevReturns = p["return_visit"] ?? 0;

  const signupRate = ratio(signups, visitors);
  const activationRate = ratio(activated, signups);
  const checkoutDropoff = dropoffRate(checkoutStarted, purchases);
  const returnVisitRate = ratio(returnVisits, visitors);
  const previousSignupRate = ratio(prevSignups, prevVisitors);
  const previousActivationRate = ratio(prevActivated, prevSignups);
  const previousCheckoutDropoff = dropoffRate(prevCheckouts, prevPurchases);
  const previousReturnVisitRate = ratio(prevReturns, prevVisitors);

  return {
    period: periodLabel(data),
    visitors,
    signups,
    activated,
    checkoutStarted,
    purchases,
    returnVisits,
    signupRate,
    activationRate,
    checkoutDropoff,
    returnVisitRate,
    previousSignupRate,
    previousActivationRate,
    previousCheckoutDropoff,
    previousReturnVisitRate,
    activationTrend: trendPct(activationRate ?? 0, previousActivationRate ?? 0),
    signupTrend: trendPct(signupRate ?? 0, previousSignupRate ?? 0),
    dropoffTrend: trendPct(checkoutDropoff ?? 0, previousCheckoutDropoff ?? 0),
    returnTrend: trendPct(returnVisitRate ?? 0, previousReturnVisitRate ?? 0),
  };
}

interface SignalSeed {
  type: SignalType;
  metric: string;
  value: number | null;
  threshold: number;
  status: InsightStatus;
  severity: GrowthSignal["severity"];
}

function makeSignal(seed: SignalSeed, period: string, createdAt: string): GrowthSignal {
  return {
    id: `sig_${seed.metric}#${period}`,
    type: seed.type,
    metric: seed.metric,
    value: seed.value,
    threshold: seed.threshold,
    period,
    severity: seed.severity,
    source: SOURCE_ANALYTICS,
    status: seed.status,
    created_at: createdAt,
  };
}

interface OpportunitySeed {
  type: OpportunityType;
  segment: SegmentKey | null;
  evidence: string;
  impact: number;
  confidence: number;
  urgency: number;
}

function makeOpportunity(seed: OpportunitySeed, period: string, createdAt: string): GrowthOpportunity {
  const priority_score = computePriorityScore(seed.impact, seed.confidence, seed.urgency);
  return {
    id: `opp_${seed.type}#${period}`,
    type: seed.type,
    segment: seed.segment,
    evidence: seed.evidence,
    impact: seed.impact,
    confidence: seed.confidence,
    urgency: seed.urgency,
    priority_score,
    priority: scoreBucket(priority_score),
    status: "VALID",
    created_at: createdAt,
  };
}

const fmtRate = (v: number | null): string => (v === null ? "n/a" : v.toFixed(3));

/**
 * Évalue les règles sur les données agrégées. Fonction pure : `created_at`
 * est celui de `data` (injecté), les ids sont dérivés du type + période.
 */
export function evaluateRules(data: GrowthData): RuleOutcome {
  const m = computeMetrics(data);
  const period = m.period;
  const createdAt = data.created_at;
  const signals: GrowthSignal[] = [];
  const opportunities: GrowthOpportunity[] = [];

  // ── R1 — activation bottleneck ─────────────────────────────────────
  {
    const threshold = THRESHOLDS.activation_rate.min;
    const min = MIN_SAMPLE.traffic_rate;
    if (m.signups > 0 && m.activationRate !== null) {
      if (m.activationRate < threshold) {
        const enough = m.signups >= min;
        const signal = makeSignal(
          {
            type: "activation_rate_low",
            metric: "activation_rate",
            value: m.activationRate,
            threshold,
            status: enough ? "VALID" : "INSUFFICIENT_DATA",
            severity: enough ? gapSeverity(m.activationRate, threshold) : "info",
          },
          period,
          createdAt,
        );
        signals.push(signal);
        if (enough) {
          opportunities.push(
            makeOpportunity(
              {
                type: "ACTIVATION_BOTTLENECK",
                segment: "REGISTERED_NOT_ACTIVATED",
                evidence: `signup_completed = ${m.signups} · activated = ${m.activated} · activation_rate = ${fmtRate(m.activationRate)} (seuil ${threshold})`,
                impact: computeImpact(m.activationRate, threshold),
                confidence: computeConfidence(m.signups, min),
                urgency: computeUrgency(m.activationTrend),
              },
              period,
              createdAt,
            ),
          );
        }
      }
    }
  }

  // ── R2 — checkout dropoff ──────────────────────────────────────────
  {
    const threshold = THRESHOLDS.checkout_dropoff.max;
    const min = MIN_SAMPLE.checkout_rate;
    if (m.checkoutDropoff !== null && m.checkoutDropoff > threshold) {
      const enough = m.checkoutStarted >= min;
      signals.push(
        makeSignal(
          {
            type: "checkout_dropoff_high",
            metric: "checkout_dropoff",
            value: m.checkoutDropoff,
            threshold,
            status: enough ? "VALID" : "INSUFFICIENT_DATA",
            severity: enough ? gapSeverity(m.checkoutDropoff, threshold) : "info",
          },
          period,
          createdAt,
        ),
      );
      if (enough) {
        opportunities.push(
          makeOpportunity(
            {
              type: "CHECKOUT_DROPOFF",
              segment: "HIGH_INTENT",
              evidence: `begin_checkout = ${m.checkoutStarted} · purchase = ${m.purchases} · abandon = ${fmtRate(m.checkoutDropoff)} (seuil ${threshold})`,
              impact: computeImpact(m.checkoutDropoff, threshold),
              confidence: computeConfidence(m.checkoutStarted, min),
              urgency: computeUrgency(m.dropoffTrend),
            },
            period,
            createdAt,
          ),
        );
      }
    }
  }

  // ── R3 — monetization opportunity (booléenne, pas de seuil inventé) ─
  {
    const min = MIN_SAMPLE.monetization;
    if (m.activated > 0 && m.purchases === 0) {
      const enough = m.activated >= min;
      signals.push(
        makeSignal(
          {
            type: "purchase_rate_low",
            metric: "purchase_rate",
            value: 0,
            threshold: 0,
            status: enough ? "VALID" : "INSUFFICIENT_DATA",
            severity: enough ? "high" : "info",
          },
          period,
          createdAt,
        ),
      );
      if (enough) {
        opportunities.push(
          makeOpportunity(
            {
              type: "MONETIZATION_OPPORTUNITY",
              segment: "ACTIVATED_NOT_PAID",
              evidence: `activated = ${m.activated} · purchase = 0 (min sample ${min})`,
              impact: 80,
              confidence: computeConfidence(m.activated, min),
              urgency: computeUrgency(m.activationTrend),
            },
            period,
            createdAt,
          ),
        );
      }
    }
  }

  // ── R4 — retention : rapporte l'état officiel, ne fabrique rien ────
  signals.push(
    makeSignal(
      {
        type: "retention_unavailable",
        metric: "retention_d7",
        value: data.retention.available ? data.retention.value : null,
        threshold: MIN_SAMPLE.retention,
        status: data.retention.status,
        severity: "info",
      },
      period,
      createdAt,
    ),
  );
  {
    const threshold = THRESHOLDS.return_visit_rate.min;
    const min = MIN_SAMPLE.traffic_rate;
    if (m.returnVisitRate !== null && m.returnVisitRate < threshold) {
      const enough = m.visitors >= min;
      signals.push(
        makeSignal(
          {
            type: "return_visit_low",
            metric: "return_visit_rate",
            value: m.returnVisitRate,
            threshold,
            status: enough ? "VALID" : "INSUFFICIENT_DATA",
            severity: enough ? gapSeverity(m.returnVisitRate, threshold) : "info",
          },
          period,
          createdAt,
        ),
      );
      if (enough) {
        opportunities.push(
          makeOpportunity(
            {
              type: "RETENTION_OPPORTUNITY",
              segment: "RETURNING_USER",
              evidence: `return_visit = ${m.returnVisits} · page_view = ${m.visitors} · return_visit_rate = ${fmtRate(m.returnVisitRate)} (seuil ${threshold})`,
              impact: computeImpact(m.returnVisitRate, threshold),
              confidence: computeConfidence(m.visitors, min),
              urgency: computeUrgency(m.returnTrend),
            },
            period,
            createdAt,
          ),
        );
      }
    }
  }

  // ── R5 — acquisition (faible ou performante) ───────────────────────
  {
    const min = MIN_SAMPLE.traffic_rate;
    const lowThreshold = THRESHOLDS.signup_rate.min;
    const highThreshold = THRESHOLDS.signup_rate.high;
    if (m.signupRate === null) {
      // aucun visiteur — insight INSUFFICIENT_DATA produit en index.ts
    } else if (m.visitors < min) {
      if (m.signupRate < lowThreshold) {
        signals.push(
          makeSignal(
            {
              type: "signup_rate_low",
              metric: "signup_rate",
              value: m.signupRate,
              threshold: lowThreshold,
              status: "INSUFFICIENT_DATA",
              severity: "info",
            },
            period,
            createdAt,
          ),
        );
      }
    } else if (m.signupRate < lowThreshold) {
      signals.push(
        makeSignal(
          {
            type: "signup_rate_low",
            metric: "signup_rate",
            value: m.signupRate,
            threshold: lowThreshold,
            status: "VALID",
            severity: gapSeverity(m.signupRate, lowThreshold),
          },
          period,
          createdAt,
        ),
      );
      opportunities.push(
        makeOpportunity(
          {
            type: "ACQUISITION_WEAKNESS",
            segment: "NEW_VISITOR",
            evidence: `signup_completed = ${m.signups} · page_view = ${m.visitors} · signup_rate = ${fmtRate(m.signupRate)} (seuil ${lowThreshold})`,
            impact: computeImpact(m.signupRate, lowThreshold),
            confidence: computeConfidence(m.visitors, min),
            urgency: computeUrgency(m.signupTrend),
          },
          period,
          createdAt,
        ),
      );
    } else if (m.signupRate > highThreshold) {
      signals.push(
        makeSignal(
          {
            type: "signup_rate_high",
            metric: "signup_rate",
            value: m.signupRate,
            threshold: highThreshold,
            status: "VALID",
            severity: "info",
          },
          period,
          createdAt,
        ),
      );
      opportunities.push(
        makeOpportunity(
          {
            type: "ACQUISITION_STRENGTH",
            segment: "NEW_VISITOR",
            evidence: `signup_completed = ${m.signups} · page_view = ${m.visitors} · signup_rate = ${fmtRate(m.signupRate)} (seuil haut ${highThreshold})`,
            impact: computeImpact(m.signupRate, highThreshold),
            confidence: computeConfidence(m.visitors, min),
            urgency: computeUrgency(m.signupTrend),
          },
          period,
          createdAt,
        ),
      );
    }
  }

  return { metrics: m, signals, opportunities };
}
