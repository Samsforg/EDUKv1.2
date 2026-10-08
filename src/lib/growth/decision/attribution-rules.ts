import type {
  GrowthData,
  GrowthOpportunity,
  GrowthSignal,
} from "./types";
import {
  ATTRIBUTION_LIMITS,
  MIN_SAMPLE,
  THRESHOLDS,
} from "./thresholds";
import {
  computeConfidence,
  computeImpact,
  computeUrgency,
  gapSeverity,
} from "./scoring";
import { fmtRate, makeOpportunity, makeSignal } from "./rules";
import { buildChannelPerformances } from "./channels";
import { buildReferralPerformances } from "./referrals";

/**
 * P2.2 §10, §13 — règles étendues : canal, parrainage, attribution.
 *
 * Extension STRICTE du rule engine P2.1 (aucune règle P2.1 dupliquée ni
 * modifiée) :
 *   A1 IF couverture attribution < 1.0 (échantillon suffisant)
 *      THEN opportunité ATTRIBUTION_GAP
 *   A2 IF taux d'inscrits inconnus mesuré THEN signal unknown_source_rate
 *   C1 IF canal ≥ min sample THEN signaux channel_*_strength
 *      IF top canal ≥ min sample ET activationRate < 0.3
 *      THEN opportunité UNIQUE CHANNEL_ACTIVATION_GAP
 *      IF canal sous min sample THEN signal channel_insufficient_data
 *   R1 IF filleuls ≥ min sample THEN signal referral_signup_strength
 *      IF activationRate filleuls < 0.3 THEN REFERRAL_ACTIVATION_GAP
 *      IF abonnements actifs ≥ 1 THEN referral_monetization_strength
 *
 * Qualité de données (§14) : la confiance des opportunités DÉPENDANTES
 * des props UTM (canal) est plafonnée par la couverture d'attribution —
 * même priority_score P2.1, aucune second échelle.
 *
 * Aucune comparaison « meilleur / pire canal » : seuls des états factuels
 * au regard de seuils WORKING documentés (§9 — aucun benchmark inventé).
 */

export interface IntelOutcome {
  signals: GrowthSignal[];
  opportunities: GrowthOpportunity[];
}

/** Plafond de confiance imposé par la couverture d'attribution (§14). */
function coverageCap(data: GrowthData): number {
  const rate = data.intelligence?.attribution.coverage.coverageRate;
  if (rate === null || rate === undefined) return 0;
  return Math.round(rate * 100);
}

/** Nombre de canaux dont l'échantillon reste sous le plancher. */
const INSUFFICIENT_SIGNAL_LIMIT = 3;

export function evaluateAttributionRules(data: GrowthData): IntelOutcome {
  const signals: GrowthSignal[] = [];
  const opportunities: GrowthOpportunity[] = [];
  const intel = data.intelligence;
  if (!intel || !intel.available) return { signals, opportunities };

  const period = `${data.period.from}/${data.period.to}`;
  const createdAt = data.created_at;
  const min = MIN_SAMPLE.segment;
  const activationThreshold = THRESHOLDS.activation_rate.min;

  // ── A1/A2 — attribution : couverture et taux d'inconnu ────────────
  const coverage = intel.attribution.coverage;
  if (coverage.coverageRate !== null) {
    signals.push(
      makeSignal(
        {
          type: "attribution_coverage",
          metric: "attribution_coverage",
          value: coverage.coverageRate,
          threshold: ATTRIBUTION_LIMITS.coverage_full,
          status: coverage.status,
          severity:
            coverage.status === "VALID"
              ? gapSeverity(coverage.coverageRate, ATTRIBUTION_LIMITS.coverage_full)
              : "info",
        },
        period,
        createdAt,
      ),
    );
    if (coverage.status === "VALID" && coverage.coverageRate < ATTRIBUTION_LIMITS.coverage_full) {
      const total = coverage.attributed + coverage.unattributed;
      opportunities.push(
        makeOpportunity(
          {
            type: "ATTRIBUTION_GAP",
            segment: null,
            evidence: `signups identifiés = ${total} · attribués = ${coverage.attributed} · couverture = ${fmtRate(coverage.coverageRate)} (borne 1.0)`,
            impact: computeImpact(coverage.coverageRate, ATTRIBUTION_LIMITS.coverage_full),
            // La couverture EST la mesure : sa confiance vient de son
            // propre échantillon (plafond coverage non appliqué ici).
            confidence: computeConfidence(total, min),
            urgency: computeUrgency(null),
          },
          period,
          createdAt,
        ),
      );
    }
  }

  const sources = intel.attribution.sources;
  if (sources.unknown_rate !== null) {
    signals.push(
      makeSignal(
        {
          type: "unknown_source_rate",
          metric: "unknown_source_rate",
          value: sources.unknown_rate,
          threshold: ATTRIBUTION_LIMITS.unknown_min,
          status: sources.status,
          severity:
            sources.status === "VALID"
              ? gapSeverity(sources.unknown_rate, ATTRIBUTION_LIMITS.unknown_min)
              : "info",
        },
        period,
        createdAt,
      ),
    );
  }

  // ── C1 — performance par canal ────────────────────────────────────
  const channels = buildChannelPerformances(intel.channels);
  const cap = coverageCap(data);
  const top = channels[0] ?? null;

  if (top && top.status === "VALID") {
    signals.push(
      makeSignal(
        {
          type: "channel_signup_strength",
          metric: `channel_signups:${top.channel}`,
          value: top.signups,
          threshold: min,
          status: "VALID",
          severity: "info",
        },
        period,
        createdAt,
      ),
    );
  }

  for (const ch of channels) {
    if (ch.status === "VALID") {
      if (ch.activationRate !== null && ch.activationRate >= activationThreshold) {
        signals.push(
          makeSignal(
            {
              type: "channel_activation_strength",
              metric: `channel_activation_rate:${ch.channel}`,
              value: ch.activationRate,
              threshold: activationThreshold,
              status: "VALID",
              severity: "info",
            },
            period,
            createdAt,
          ),
        );
      }
      if (ch.subscriptions >= 1) {
        signals.push(
          makeSignal(
            {
              type: "channel_monetization_strength",
              metric: `channel_subscriptions:${ch.channel}`,
              value: ch.subscriptions,
              threshold: 0,
              status: "VALID",
              severity: "info",
            },
            period,
            createdAt,
          ),
        );
      }
    }
  }

  // Sous-échantillons : signal explicite (jamais de décision forte).
  const weakChannels = channels.filter((c) => c.status === "INSUFFICIENT_DATA");
  for (const ch of weakChannels.slice(0, INSUFFICIENT_SIGNAL_LIMIT)) {
    signals.push(
      makeSignal(
        {
          type: "channel_insufficient_data",
          metric: `channel_sample:${ch.channel}`,
          value: ch.signups,
          threshold: min,
          status: "INSUFFICIENT_DATA",
          severity: "info",
        },
        period,
        createdAt,
      ),
    );
  }

  // Opportunité UNIQUE : le canal dominant (top volume) sous seuil
  // d'activation — on n'agit que sur un échantillon représentatif.
  if (
    top &&
    top.status === "VALID" &&
    top.activationRate !== null &&
    top.activationRate < activationThreshold
  ) {
    opportunities.push(
      makeOpportunity(
        {
          type: "CHANNEL_ACTIVATION_GAP",
          segment: null,
          evidence: `canal ${top.channel} · signup_completed = ${top.signups} · activated = ${top.activated} · activation_rate = ${fmtRate(top.activationRate)} (seuil ${activationThreshold})`,
          impact: computeImpact(top.activationRate, activationThreshold),
          confidence: Math.min(computeConfidence(top.signups, min), cap),
          urgency: computeUrgency(null),
        },
        period,
        createdAt,
      ),
    );
  }

  // ── R1 — boucle de parrainage (agrégat période, code non requis) ──
  const referrals = buildReferralPerformances(intel.referrals);
  const refSignups = referrals.reduce((sum, r) => sum + r.signups, 0);
  const refActivated = referrals.reduce((sum, r) => sum + r.activated, 0);
  const refSubscriptions = referrals.reduce((sum, r) => sum + r.subscriptions, 0);
  const refActivationRate = refSignups > 0 ? refActivated / refSignups : null;

  if (refSignups >= min) {
    signals.push(
      makeSignal(
        {
          type: "referral_signup_strength",
          metric: "referral_signups",
          value: refSignups,
          threshold: min,
          status: "VALID",
          severity: "info",
        },
        period,
        createdAt,
      ),
    );
    if (refActivationRate !== null && refActivationRate >= activationThreshold) {
      signals.push(
        makeSignal(
          {
            type: "referral_activation_strength",
            metric: "referral_activation_rate",
            value: refActivationRate,
            threshold: activationThreshold,
            status: "VALID",
            severity: "info",
          },
          period,
          createdAt,
        ),
      );
    }
    if (refSubscriptions >= 1) {
      signals.push(
        makeSignal(
          {
            type: "referral_monetization_strength",
            metric: "referral_subscriptions",
            value: refSubscriptions,
            threshold: 0,
            status: "VALID",
            severity: "info",
          },
          period,
          createdAt,
        ),
      );
    }
    if (refActivationRate !== null && refActivationRate < activationThreshold) {
      opportunities.push(
        makeOpportunity(
          {
            type: "REFERRAL_ACTIVATION_GAP",
            segment: null,
            evidence: `filleuls = ${refSignups} · activated = ${refActivated} · activation_rate = ${fmtRate(refActivationRate)} (seuil ${activationThreshold})`,
            impact: computeImpact(refActivationRate, activationThreshold),
            // La donnée parrainage ne dépend pas des props UTM :
            // confiance pilotée par l'échantillon seul.
            confidence: computeConfidence(refSignups, min),
            urgency: computeUrgency(null),
          },
          period,
          createdAt,
        ),
      );
    }
  }

  return { signals, opportunities };
}
