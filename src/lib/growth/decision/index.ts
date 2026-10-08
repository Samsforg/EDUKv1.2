import type {
  GrowthData,
  GrowthHealth,
  GrowthInsight,
  GrowthInsightBundle,
  GrowthOpportunity,
  GrowthRecommendation,
  GrowthSegment,
  GrowthSignal,
  HealthStage,
  InsightStatus,
  OpportunityType,
} from "./types";
import { HEALTH_STAGES, MIN_SAMPLE, THRESHOLDS } from "./thresholds";
import { gapSeverity } from "./scoring";
import { computeMetrics, evaluateRules, type ComputedMetrics } from "./rules";
import { evaluateAttributionRules } from "./attribution-rules";
import { buildChannelPerformances } from "./channels";
import { buildReferralPerformances } from "./referrals";
import { computeCoverage } from "./attribution";
import { buildSegments } from "./segments";
import { buildRecommendation } from "./recommend";
import { buildActionPlans } from "./action-plans";

/**
 * P2.1 + P2.2 — orchestration du Decision Layer :
 *
 *   DATA → ATTRIBUTION → CHANNEL/REFERRAL PERFORMANCE → RULE ENGINE
 *        → SIGNALS → SEGMENTS → OPPORTUNITIES → RECOMMENDATIONS
 *        → PLANS D'ACTION PROPOSÉS (+ HEALTH)
 *
 * Fonction pure sur `GrowthData` : idempotence par construction (même
 * input → même output ; `created_at` est celui de l'input injecté).
 * Aucune écriture, aucun appel externe, aucune action exécutée : les
 * plans P2.3 sont des propositions classées par horizon, jamais
 * ordonnancées ni déclenchées.
 * La couche P2.2 ne modifie ni ne duplique les règles P2.1 (§13) :
 * elle est évaluée à côté et fusionnée dans les listes du bundle.
 */

interface MetricLink {
  metric: string;
  opportunityTypes: OpportunityType[];
}

const METRIC_LINKS: MetricLink[] = [
  { metric: "signup_rate", opportunityTypes: ["ACQUISITION_WEAKNESS", "ACQUISITION_STRENGTH"] },
  { metric: "activation_rate", opportunityTypes: ["ACTIVATION_BOTTLENECK"] },
  { metric: "checkout_dropoff", opportunityTypes: ["CHECKOUT_DROPOFF"] },
  { metric: "purchase_rate", opportunityTypes: ["MONETIZATION_OPPORTUNITY"] },
  { metric: "return_visit_rate", opportunityTypes: ["RETENTION_OPPORTUNITY"] },
  { metric: "retention_d7", opportunityTypes: [] },
];

const SEVERITY_RANK: Record<string, number> = { VALID: 0, INSUFFICIENT_DATA: 1, UNAVAILABLE: 2 };

function sampleStatus(sample: number, min: number): GrowthInsight["status"] {
  return sample >= min ? "VALID" : "INSUFFICIENT_DATA";
}

function assembleInsights(
  data: GrowthData,
  m: ComputedMetrics,
  signals: GrowthSignal[],
  opportunities: GrowthOpportunity[],
  recommendations: GrowthRecommendation[],
): GrowthInsight[] {
  const period = `${data.period.from}/${data.period.to}`;
  const values: Record<string, { sample: number; value: number | null; benchmark: number | null; status: GrowthInsight["status"] }> = {
    signup_rate: {
      sample: m.visitors,
      value: m.signupRate,
      benchmark: THRESHOLDS.signup_rate.min,
      status: m.signupRate === null || m.visitors === 0 ? "INSUFFICIENT_DATA" : sampleStatus(m.visitors, MIN_SAMPLE.traffic_rate),
    },
    activation_rate: {
      sample: m.signups,
      value: m.activationRate,
      benchmark: THRESHOLDS.activation_rate.min,
      status: m.activationRate === null ? "INSUFFICIENT_DATA" : sampleStatus(m.signups, MIN_SAMPLE.traffic_rate),
    },
    checkout_dropoff: {
      sample: m.checkoutStarted,
      value: m.checkoutDropoff,
      benchmark: THRESHOLDS.checkout_dropoff.max,
      status: m.checkoutDropoff === null ? "INSUFFICIENT_DATA" : sampleStatus(m.checkoutStarted, MIN_SAMPLE.checkout_rate),
    },
    purchase_rate: {
      sample: m.activated,
      value: m.activated > 0 ? m.purchases / m.activated : null,
      benchmark: null,
      status: m.activated === 0 ? "INSUFFICIENT_DATA" : "VALID",
    },
    return_visit_rate: {
      sample: m.visitors,
      value: m.returnVisitRate,
      benchmark: THRESHOLDS.return_visit_rate.min,
      status: m.returnVisitRate === null ? "INSUFFICIENT_DATA" : sampleStatus(m.visitors, MIN_SAMPLE.traffic_rate),
    },
    retention_d7: {
      sample: 0,
      value: data.retention.available ? data.retention.value : null,
      benchmark: null,
      status: data.retention.status,
    },
  };

  return METRIC_LINKS.map((link) => {
    const v = values[link.metric];
    const signal = signals.find((s) => s.metric === link.metric) ?? null;
    const opp =
      opportunities.find((o) => link.opportunityTypes.includes(o.type)) ?? null;
    const recommendation = opp
      ? recommendations.find((r) => r.opportunity_type === opp.type) ?? null
      : null;
    return {
      metric: link.metric,
      period,
      sample_size: v.sample,
      value: v.value,
      benchmark: v.benchmark,
      status: v.status,
      signal,
      opportunity: opp,
      recommendation,
      priority: opp?.priority ?? null,
      confidence: opp?.confidence ?? null,
    } satisfies GrowthInsight;
  });
}

function rateHealth(
  stage: HealthStage,
  metric: string,
  value: number | null,
  benchmark: number | null,
  status: GrowthInsight["status"],
  direction: "min" | "max",
): GrowthHealth {
  if (status !== "VALID" || value === null || benchmark === null) {
    return { stage, rating: "INSUFFICIENT_DATA", metric, value, benchmark, status };
  }
  const conforms = direction === "min" ? value >= benchmark : value <= benchmark;
  const severity = gapSeverity(value, benchmark);
  const rating: GrowthHealth["rating"] = conforms
    ? "GOOD"
    : severity === "high"
      ? "HIGH"
      : severity === "medium"
        ? "MEDIUM"
        : "LOW";
  return { stage, rating, metric, value, benchmark, status };
}

export function computeHealth(m: ComputedMetrics, data: GrowthData): GrowthHealth[] {
  const out: GrowthHealth[] = [];

  out.push(
    rateHealth(
      "acquisition",
      "signup_rate",
      m.signupRate,
      THRESHOLDS.signup_rate.min,
      m.signupRate === null || m.visitors === 0 ? "INSUFFICIENT_DATA" : sampleStatus(m.visitors, MIN_SAMPLE.traffic_rate),
      "min",
    ),
  );
  out.push(
    rateHealth(
      "activation",
      "activation_rate",
      m.activationRate,
      THRESHOLDS.activation_rate.min,
      m.activationRate === null ? "INSUFFICIENT_DATA" : sampleStatus(m.signups, MIN_SAMPLE.traffic_rate),
      "min",
    ),
  );
  out.push(
    rateHealth(
      "conversion",
      "checkout_dropoff",
      m.checkoutDropoff,
      THRESHOLDS.checkout_dropoff.max,
      m.checkoutDropoff === null ? "INSUFFICIENT_DATA" : sampleStatus(m.checkoutStarted, MIN_SAMPLE.checkout_rate),
      "max",
    ),
  );

  // Retention : l'état officiel du contrat P2 est rapporté tel quel (§12 —
  // n = 1 → aucune recommandation, aucune rétention alternative calculée).
  out.push({
    stage: "retention",
    rating: data.retention.status === "VALID" && data.retention.value !== null ? "GOOD" : "INSUFFICIENT_DATA",
    metric: "retention_d7",
    value: data.retention.available ? data.retention.value : null,
    benchmark: null,
    status: data.retention.status,
  });

  // Revenue : comptages réels uniquement. Gradation par volume d'abonnés
  // actifs (constants documentés) — 0 abonné = problème majeur.
  const revenueStatus: GrowthInsight["status"] = data.revenue.available ? "VALID" : "UNAVAILABLE";
  let rating: GrowthHealth["rating"] = "INSUFFICIENT_DATA";
  if (data.revenue.available) {
    const subs = data.revenue.active_subs;
    rating = subs >= MIN_SAMPLE.revenue_subs ? "GOOD" : subs >= 10 ? "LOW" : subs >= 1 ? "MEDIUM" : "HIGH";
  }
  out.push({
    stage: "revenue",
    rating,
    metric: "active_subscriptions",
    value: data.revenue.available ? data.revenue.active_subs : null,
    benchmark: MIN_SAMPLE.revenue_subs,
    status: revenueStatus,
  });

  return out;
}

/** Sections d'attribution du bundle P2.2 (vides et explicites si absente). */
function assembleIntelligenceSections(data: GrowthData): {
  attribution: GrowthInsightBundle["attribution"];
  channels: GrowthInsightBundle["channels"];
  referrals: GrowthInsightBundle["referrals"];
} {
  const intel = data.intelligence;
  if (!intel || !intel.available) {
    const status: InsightStatus = "UNAVAILABLE";
    return {
      attribution: {
        coverage: computeCoverage(0, 0),
        sources: {
          by_type: { utm: 0, paid_click: 0, referral: 0, unknown: 0 },
          unknown_rate: null,
          status: "INSUFFICIENT_DATA",
        },
        top_source: null,
        status,
      },
      channels: [],
      referrals: [],
    };
  }
  return {
    attribution: {
      coverage: intel.attribution.coverage,
      sources: intel.attribution.sources,
      top_source: intel.attribution.top_source,
      status: intel.attribution.coverage.status,
    },
    channels: buildChannelPerformances(intel.channels),
    referrals: buildReferralPerformances(intel.referrals),
  };
}

export function runDecisionLayer(data: GrowthData): GrowthInsightBundle {
  const { metrics, signals, opportunities } = evaluateRules(data);
  // P2.2 — règles d'attribution évaluées à côté de P2.1, jamais à la place.
  const intelRules = evaluateAttributionRules(data);

  const allSignals = [...signals, ...intelRules.signals];
  const allOpportunities = [...opportunities, ...intelRules.opportunities];

  const recommendations = allOpportunities.map((opp) => buildRecommendation(opp, data));
  const insights = assembleInsights(data, metrics, allSignals, allOpportunities, recommendations);
  const segments: GrowthSegment[] = buildSegments(data);
  const health = computeHealth(metrics, data);
  const intelligence = assembleIntelligenceSections(data);
  // P2.3 — plans d'action proposés : 1 par recommandation (aucune requête).
  const actions = buildActionPlans({ data, recommendations, opportunities: allOpportunities, metrics });

  const byPriority = <T extends { priority_score: number; id: string }>(a: T, b: T): number =>
    b.priority_score - a.priority_score || a.id.localeCompare(b.id);

  const sortedSignals = [...allSignals].sort(
    (a, b) => (SEVERITY_RANK[a.status] ?? 9) - (SEVERITY_RANK[b.status] ?? 9),
  );

  return {
    generated_at: data.created_at,
    period: data.period,
    health,
    segments,
    signals: sortedSignals,
    opportunities: [...allOpportunities].sort(byPriority),
    recommendations: [...recommendations].sort(byPriority),
    insights,
    attribution: intelligence.attribution,
    channels: intelligence.channels,
    referrals: intelligence.referrals,
    actions,
    meta: {
      engine: "deterministic",
      external_calls: false,
      test_users_excluded: true,
      actions_executed: false,
    },
  };
}

export { computeMetrics };
export { HEALTH_STAGES };
export type { GrowthInsightBundle };
