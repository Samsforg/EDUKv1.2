import type { GrowthData } from "../decision/types";
import { MIN_SAMPLE } from "../decision/thresholds";
import {
  FUNNEL_RATE_DEFS,
  FUNNEL_STEP_DEFS,
  funnelSourceAvailable,
  rateStatus,
  rateValue,
  stepCount,
} from "./funnel";
import type { GrowthTrendMeasurement, MeasureStatus, TrendPoint } from "./types";

/**
 * P2.4 Étape C — évolution entre la période courante et la période
 * précédente (fenêtres de longueur égale produites par `computeGrowthData`).
 *
 * Comparabilité explicite :
 *   - longueurs différentes → périodes incomparables (NOT_APPLICABLE) ;
 *   - source absente sur l'une des deux périodes → MISSING_DATA ;
 *   - base de variation nulle → delta_pct null (jamais division par zéro).
 * Une évolution temporelle n'est jamais présentée comme une preuve causale.
 */

function countStatus(source: boolean): MeasureStatus {
  return source ? "VALID" : "MISSING_DATA";
}

function trendOf(current: number | null, previous: number | null): {
  delta: number | null;
  delta_pct: number | null;
} {
  if (current === null || previous === null) return { delta: null, delta_pct: null };
  const delta = current - previous;
  const delta_pct = previous !== 0 ? delta / Math.abs(previous) : null;
  return { delta, delta_pct };
}

export function buildTrendMeasurement(data: GrowthData): GrowthTrendMeasurement {
  const sourceCurrent = funnelSourceAvailable(data.funnel);
  const sourcePrevious = funnelSourceAvailable(data.previous_funnel);
  const sameLength = data.period.days === data.previous_period.days;
  const sourceOk = sourceCurrent && sourcePrevious;
  const comparable = sameLength && sourceOk;

  const status: MeasureStatus = !sourceOk
    ? "MISSING_DATA"
    : !sameLength
      ? "NOT_APPLICABLE"
      : "VALID";

  const points: TrendPoint[] = [];

  for (const def of FUNNEL_STEP_DEFS) {
    const current = sourceCurrent ? stepCount(data.funnel, def.key) : null;
    const previous = sourcePrevious ? stepCount(data.previous_funnel, def.key) : null;
    const { delta, delta_pct } = comparable ? trendOf(current, previous) : { delta: null, delta_pct: null };
    points.push({
      key: def.key,
      label: def.label,
      kind: "count",
      current,
      previous,
      delta,
      delta_pct,
      status: comparable ? countStatus(true) : status,
    });
  }

  for (const def of FUNNEL_RATE_DEFS) {
    const nCur = sourceCurrent ? stepCount(data.funnel, def.numerator) : 0;
    const dCur = sourceCurrent ? stepCount(data.funnel, def.denominator) : 0;
    const nPrev = sourcePrevious ? stepCount(data.previous_funnel, def.numerator) : 0;
    const dPrev = sourcePrevious ? stepCount(data.previous_funnel, def.denominator) : 0;

    const curStatus = rateStatus(sourceCurrent, dCur, def.min_sample);
    const prevStatus = rateStatus(sourcePrevious, dPrev, def.min_sample);
    const bothValid = curStatus === "VALID" && prevStatus === "VALID";

    const current = sourceCurrent ? rateValue(nCur, dCur) : null;
    const previous = sourcePrevious ? rateValue(nPrev, dPrev) : null;
    // Deltas seulement si périodes comparables ET taux valides des deux côtés.
    const { delta, delta_pct } =
      comparable && bothValid ? trendOf(current, previous) : { delta: null, delta_pct: null };

    const pointStatus: MeasureStatus = !sourceOk
      ? "MISSING_DATA"
      : !sameLength
        ? "NOT_APPLICABLE"
        : bothValid
          ? "VALID"
          : "INSUFFICIENT_DATA";

    points.push({
      key: def.key,
      label: def.label,
      kind: "rate",
      current: sourceCurrent ? current : null,
      previous: sourcePrevious ? previous : null,
      delta,
      delta_pct,
      status: pointStatus,
    });
  }

  return {
    period: data.period,
    previous_period: data.previous_period,
    comparable,
    points,
    status,
  };
}

/** Exposé pour tests : minimum d'échantillon d'un point de taux. */
export function rateMinSample(key: string): number {
  const def = FUNNEL_RATE_DEFS.find((d) => d.key === key);
  return def ? def.min_sample : MIN_SAMPLE.traffic_rate;
}
