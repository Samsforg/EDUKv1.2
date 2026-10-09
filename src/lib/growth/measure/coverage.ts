import type { GrowthData, GrowthInsightBundle } from "../decision/types";
import { dayOfTimestamp, daysBetween, utcDay } from "./dates";
import type { CoverageMeasurementInput } from "./data";
import type { GrowthCoverageMeasurement, MeasureStatus, PeriodCoverage } from "./types";

/**
 * P2.4 — couverture des donnees : jours observes / jours de la periode,
 * jour courant partiel, volume non attribuable.
 *
 *   -requete de couverture echouee -> days_with_data null + MISSING_DATA
 *     (jamais 0 faux) ;
 *   - taux de couverture = jours avec >= 1 evenement / jours de la periode ;
 *   - `unattributed` vient de la couche P2.2 (distinct des donnees
 *     manquantes : c'est un volume observe mais non attribuable).
 */

function buildPeriodCoverage(
  days: number,
  daysWithData: number | null,
): PeriodCoverage {
  const status: MeasureStatus = daysWithData === null ? "MISSING_DATA" : "VALID";
  return {
    days,
    days_with_data: daysWithData,
    rate: daysWithData === null || days <= 0 ? null : daysWithData / days,
    status,
  };
}

/** Statut P2.1 -> statut de mesure P2.4 (UNAVAILABLE = source absente). */
function mapInsightStatus(status: string): MeasureStatus {
  if (status === "VALID") return "VALID";
  if (status === "INSUFFICIENT_DATA") return "INSUFFICIENT_DATA";
  return "MISSING_DATA";
}

export function buildCoverageMeasurement(
  data: GrowthData,
  raw: CoverageMeasurementInput,
  attribution: GrowthInsightBundle["attribution"],
): GrowthCoverageMeasurement {
  const nowDay = dayOfTimestamp(data.created_at) ?? utcDay(new Date(data.created_at));
  const includesPartialToday =
    daysBetween(data.period.from, nowDay) >= 0 && daysBetween(data.period.to, nowDay) <= 0;

  return {
    current: buildPeriodCoverage(data.period.days, raw.current_days_with_data),
    previous: buildPeriodCoverage(data.previous_period.days, raw.previous_days_with_data),
    includes_partial_today: includesPartialToday,
    unattributed: attribution.coverage.unattributed,
    unattributed_status: mapInsightStatus(attribution.coverage.status),
  };
}
