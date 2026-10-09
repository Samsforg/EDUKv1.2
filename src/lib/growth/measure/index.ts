import type { GrowthData, GrowthInsightBundle, GrowthActionQueue } from "../decision/types";import {
  buildActionMeasurement,
  processableDeclarations,
  todayFromData,
} from "./actions";
import { buildCoverageMeasurement } from "./coverage";
import { addDays, dayOfTimestamp, dayStart } from "./dates";
import {
  loadCoverage,
  loadDeclarations,
  loadWindowAggregates,
  type WindowAggregate,
} from "./data";
import { buildExperimentSection } from "./experiments";
import { buildFunnelMeasurement, MEASURE_SOURCE } from "./funnel";
import { buildTrendMeasurement } from "./trend";
import type { GrowthMeasurement } from "./types";

/**
 * P2.4 — orchestration de la couche mesure (Étape E) :
 *
 *   FUNNEL (C) -> TENDANCE (C) -> COUVERTURE (C) -> ACTIONS DÉCLARÉES (D)
 *        -> EXPÉRIMENTATIONS PRÉPARÉES (E)
 *
 * Fonction **asynchrone mais sans écriture** : 4 familles de SELECT
 * (couverture x2, registre des déclarations, 1 requête par fenêtre
 * d'action traitée, plafond 5), aucune écriture, aucun appel réseau,
 * aucun modèle génératif. Les échecs de source deviennent des statuts
 * `MISSING_DATA` (jamais des 0, jamais des « non déclarées »).
 */

export async function computeMeasurement(
  data: GrowthData,
  queue: GrowthActionQueue,
  attribution: GrowthInsightBundle["attribution"],
): Promise<GrowthMeasurement> {
  const coverageRaw = await loadCoverage(
    dayStart(data.period.from),
    dayStart(addDays(data.period.to, 1)),
    dayStart(data.previous_period.from),
    dayStart(addDays(data.previous_period.to, 1)),
  );

  const declarations = await loadDeclarations();
  const todayDay = todayFromData(data.created_at);

  // 1 requête SQL par déclaration traitée (plafond documenté : 5).
  const aggregates = new Map<string, WindowAggregate>();
  for (const declaration of processableDeclarations(declarations)) {
    const day = dayOfTimestamp(declaration.declared_at);
    if (!day) continue;
    const windowDays = declaration.window_days;
    aggregates.set(
      declaration.action_id,
      await loadWindowAggregates(
        dayStart(addDays(day, -windowDays)),
        dayStart(day),
        dayStart(day),
        dayStart(addDays(day, windowDays)),
      ),
    );
  }

  return {
    funnel: buildFunnelMeasurement(data),
    trend: buildTrendMeasurement(data),
    coverage: buildCoverageMeasurement(data, coverageRaw, attribution),
    actions: buildActionMeasurement(queue, declarations, aggregates, todayDay),
    experiments: buildExperimentSection(data),
    meta: {
      engine: "deterministic",
      source: MEASURE_SOURCE,
      test_users_excluded: true,
      causal_claims: false,
      executed_actions: false,
    },
  };
}

export { DECLARATION_WINDOW_CAP } from "./actions";
export {
  DECLARATION_EVENT,
  parseDeclarationPayload,
} from "./declaration";
export { hasDeclaration } from "./data";
export type * from "./types";
