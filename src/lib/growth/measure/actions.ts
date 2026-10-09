import { MIN_SAMPLE } from "../decision/thresholds";
import type {
  ActionHorizon,
  ActionMetricKey,
  GrowthActionPlan,
  GrowthActionQueue,
  GrowthActionType,
} from "../decision/types";
import type { DeclarationsLoad, WindowAggregate } from "./data";
import { addDays, dayOfTimestamp, utcDay } from "./dates";
import { MAX_WINDOW_DAYS, MIN_WINDOW_DAYS } from "./declaration";
import { funnelSourceAvailable, rateValue } from "./funnel";
import type {
  ActionDeclaration,
  ActionMeasurementEntry,
  ActionMeasurementResult,
  GrowthActionMeasurement,
  MeasurementConfidence,
  MeasureStatus,
  WindowEvolution,
  WindowMetric,
} from "./types";

/**
 * P2.4 Étape D — mesure avant/après des plans d'action P2.3.
 *
 * Principe :
 *   - l'état d'exécution ne vient QUE d'une déclaration explicite
 *     (`growth_action_implemented`) ; sinon `NOT_DECLARED` (le statut
 *     du plan reste PROPOSED, aucune exécution n'est déduite) ;
 *   - fenêtres closes bornées par le jour de déclaration :
 *     avant = [j − W, j), après = [j, j + W) ;
 *   - chaque métrique de fenêtre affiche dénominateur + statut ;
 *     jambs d'échantillon insuffisant → jamais un 0 de conclusion ;
 *   - résultat factuel (`OBSERVED` = évolution mesurée) avec mention
 *     explicite « corrélation temporelle uniquement » — aucune preuve
 *     causale, aucun jugement de qualité (hausse ≠ amélioration).
 *
 * Fonction pure : aucune requête (l'IO vit dans `data.ts`), aucune écriture.
 */

/** Plafond de fenêtres calculées par appel (documenté dans le payload). */
export const DECLARATION_WINDOW_CAP = 5;

const EPS = 1e-9;

const MEASURED_KEYS: ReadonlyArray<string> = [
  "page_view",
  "signup_started",
  "signup_completed",
  "activated",
  "begin_checkout",
  "purchase",
  "return_visit",
];

const RATE_METRIC_KEYS: ReadonlySet<ActionMetricKey> = new Set<ActionMetricKey>([
  "signup_rate",
  "activation_rate",
  "checkout_dropoff",
  "purchase_rate",
  "return_visit_rate",
]);

const NOT_MEASURED_REASONS: Record<string, string> = {
  attribution_coverage:
    "Couverture d'attribution : métrique de période fixe de la couche P2.2, non recalculable sur fenêtre glissante.",
  conversion_rate:
    "conversion_rate : définition non calibrée en P2.3 (cible absente) — jamais fabriquée dans la couche mesure.",
};

interface MetricDef {
  metric: ActionMetricKey;
  kind: "rate" | "dropoff" | "count" | "unmeasured";
  numerator?: string;
  denominator?: string;
  count?: string;
  min_sample: number;
  denominator_label: string;
}

const METRIC_DEFS: ReadonlyArray<MetricDef> = [
  {
    metric: "signup_rate",
    kind: "rate",
    numerator: "signup_completed",
    denominator: "page_view",
    min_sample: MIN_SAMPLE.traffic_rate,
    denominator_label: "pages vues",
  },
  {
    metric: "activation_rate",
    kind: "rate",
    numerator: "activated",
    denominator: "signup_completed",
    min_sample: MIN_SAMPLE.traffic_rate,
    denominator_label: "inscriptions terminées",
  },
  {
    metric: "checkout_dropoff",
    kind: "dropoff",
    numerator: "purchase",
    denominator: "begin_checkout",
    min_sample: MIN_SAMPLE.checkout_rate,
    denominator_label: "checkouts débutés",
  },
  {
    metric: "purchase_rate",
    kind: "rate",
    numerator: "purchase",
    denominator: "page_view",
    min_sample: MIN_SAMPLE.monetization,
    denominator_label: "pages vues",
  },
  {
    metric: "return_visit_rate",
    kind: "rate",
    numerator: "return_visit",
    denominator: "page_view",
    min_sample: MIN_SAMPLE.traffic_rate,
    denominator_label: "pages vues",
  },
  {
    metric: "subscription_count",
    kind: "count",
    count: "purchase",
    min_sample: MIN_SAMPLE.monetization,
    denominator_label: "",
  },
  {
    metric: "attribution_coverage",
    kind: "unmeasured",
    min_sample: 0,
    denominator_label: "",
  },
  {
    metric: "conversion_rate",
    kind: "unmeasured",
    min_sample: 0,
    denominator_label: "",
  },
];

function flattenQueue(queue: GrowthActionQueue): GrowthActionPlan[] {
  return [...queue.now, ...queue.this_week, ...queue.backlog, ...queue.blocked];
}

/** Dédoublonnage déterministe : la déclaration la plus ancienne gagne. */
export function dedupeDeclarations(rows: ActionDeclaration[]): {
  distinct: ActionDeclaration[];
  duplicates: number;
} {
  const byId = new Map<string, ActionDeclaration>();
  for (const row of rows) {
    const existing = byId.get(row.action_id);
    if (!existing) {
      byId.set(row.action_id, row);
      continue;
    }
    // La plus ancienne gagne, indépendamment de l'ordre d'arrivée
    // (le SQL trie déjà `created_at ASC, id ASC` : comportement inchangé).
    if (row.declared_at < existing.declared_at) byId.set(row.action_id, row);
  }
  const distinct = [...byId.values()];
  return { distinct, duplicates: rows.length - distinct.length };
}

function evolutionOf(delta: number): WindowEvolution {
  if (delta > EPS) return "HAUSSE";
  if (delta < -EPS) return "BAISSE";
  return "STABLE";
}

function windowValue(
  def: MetricDef,
  counts: Record<string, number>,
  sourceAvailable: boolean,
): { value: number | null; denominator: number | null; status: MeasureStatus } {
  if (!sourceAvailable) return { value: null, denominator: null, status: "MISSING_DATA" };
  if (def.kind === "count") {
    const value = counts[def.count ?? ""] ?? 0;
    return {
      value,
      denominator: null,
      status: value >= def.min_sample ? "VALID" : "INSUFFICIENT_DATA",
    };
  }
  const denominator = counts[def.denominator ?? ""] ?? 0;
  if (def.kind === "dropoff") {
    const purchases = counts[def.numerator ?? ""] ?? 0;
    const value = denominator <= 0 ? null : 1 - Math.min(1, purchases / denominator);
    return {
      value,
      denominator,
      status:
        denominator <= 0
          ? "INSUFFICIENT_DATA"
          : denominator >= def.min_sample
            ? "VALID"
            : "INSUFFICIENT_DATA",
    };
  }
  const numerator = counts[def.numerator ?? ""] ?? 0;
  return {
    value: denominator <= 0 ? null : rateValue(numerator, denominator),
    denominator,
    status:
      denominator <= 0
        ? "INSUFFICIENT_DATA"
        : denominator >= def.min_sample
          ? "VALID"
          : "INSUFFICIENT_DATA",
  };
}

function mergeStatus(before: MeasureStatus, after: MeasureStatus): MeasureStatus {
  const rank: Record<MeasureStatus, number> = {
    MISSING_DATA: 3,
    INSUFFICIENT_DATA: 2,
    NOT_APPLICABLE: 1,
    VALID: 0,
  };
  return rank[before] >= rank[after] ? before : after;
}

function buildWindowMetric(
  def: MetricDef,
  aggregate: WindowAggregate,
): WindowMetric {
  if (def.kind === "unmeasured") {
    return {
      metric: def.metric,
      measured: false,
      not_measured_reason: NOT_MEASURED_REASONS[def.metric] ?? null,
      before: null,
      before_denominator: null,
      before_status: "NOT_APPLICABLE",
      after: null,
      after_denominator: null,
      after_status: "NOT_APPLICABLE",
      delta: null,
      evolution: null,
      status: "NOT_APPLICABLE",
    };
  }
  const sourceAvailable = aggregate.source === "ok";
  const b = windowValue(def, aggregate.before, sourceAvailable);
  const a = windowValue(def, aggregate.after, sourceAvailable);
  const both = b.value !== null && a.value !== null;
  const delta = both ? (a.value as number) - (b.value as number) : null;
  return {
    metric: def.metric,
    measured: true,
    not_measured_reason: null,
    before: b.value,
    before_denominator: b.denominator,
    before_status: b.status,
    after: a.value,
    after_denominator: a.denominator,
    after_status: a.status,
    delta,
    evolution: delta === null ? null : evolutionOf(delta),
    status: mergeStatus(b.status, a.status),
  };
}

function volumeOf(counts: Record<string, number> | null): number | null {
  if (!counts) return null;
  let total = 0;
  for (const key of MEASURED_KEYS) total += counts[key] ?? 0;
  return total;
}

interface DeclarationContext {
  decl: ActionDeclaration;
  aggregate: WindowAggregate | null;
  todayDay: string;
}

function buildDeclaredEntry(
  plan: GrowthActionPlan,
  ctx: DeclarationContext,
): ActionMeasurementEntry {
  const day = dayOfTimestamp(ctx.decl.declared_at);
  const windowDays = ctx.decl.window_days;
  const validDay = day !== null && windowDays >= MIN_WINDOW_DAYS && windowDays <= MAX_WINDOW_DAYS;
  const beforeWindow = validDay
    ? { from: addDays(day, -windowDays), to_exclusive: day }
    : null;
  const afterWindow = validDay
    ? { from: day, to_exclusive: addDays(day, windowDays) }
    : null;
  const afterComplete = validDay && addDays(day, windowDays) <= ctx.todayDay;

  const base: ActionMeasurementEntry = {
    action_id: plan.id,
    title: plan.title,
    action_type: plan.action_type as GrowthActionType,
    horizon: plan.horizon as ActionHorizon,
    plan_status: "PROPOSED",
    implementation: "DECLARED_REALIZED",
    declared_at: ctx.decl.declared_at,
    window_days: windowDays,
    before_window: beforeWindow,
    after_window: afterWindow,
    after_complete: afterComplete,
    volume: { before_events: null, after_events: null },
    metrics: [],
    result: "INDETERMINATE",
    result_status: "MISSING_DATA",
    confidence: "NONE",
    interpretation: "",
  };

  if (!ctx.aggregate) {
    return {
      ...base,
      interpretation:
        "Plafond de fenêtres atteint (5 déclarations mesurées par appel) : mesures non calculées pour cette déclaration.",
    };
  }
  if (ctx.aggregate.source !== "ok") {
    return {
      ...base,
      interpretation:
        "Source des agrégats indisponible sur les fenêtres : mesure non calculée (état non concluant).",
    };
  }

  const metrics = METRIC_DEFS.map((def) => buildWindowMetric(def, ctx.aggregate as WindowAggregate));
  const measurable = metrics.filter((m) => m.measured);
  const rateObserved = measurable.some(
    (m) =>
      RATE_METRIC_KEYS.has(m.metric) &&
      m.before_status === "VALID" &&
      m.after_status === "VALID" &&
      m.before !== null &&
      m.after !== null,
  );

  const anyMissing = measurable.some(
    (m) => m.before_status === "MISSING_DATA" || m.after_status === "MISSING_DATA",
  );

  const result: ActionMeasurementResult = rateObserved ? "OBSERVED" : "INDETERMINATE";
  const result_status: MeasureStatus = rateObserved
    ? "VALID"
    : anyMissing
      ? "MISSING_DATA"
      : "INSUFFICIENT_DATA";
  const confidence: MeasurementConfidence = rateObserved
    ? afterComplete
      ? "MEDIUM"
      : "LOW"
    : "NONE";

  let interpretation: string;
  if (rateObserved && afterComplete) {
    interpretation =
      "Évolution mesurée entre les deux fenêtres : corrélation temporelle uniquement, aucune preuve causale.";
  } else if (rateObserved) {
    interpretation =
      "Fenêtre postérieure encore en cours : évolution provisoire, corrélation temporelle uniquement.";
  } else {
    interpretation =
      "Échantillon insuffisant ou source incomplète sur l'une des fenêtres : résultat non concluant.";
  }

  return {
    ...base,
    volume: {
      before_events: volumeOf(ctx.aggregate.before),
      after_events: volumeOf(ctx.aggregate.after),
    },
    metrics,
    result,
    result_status,
    confidence,
    interpretation,
  };
}

function buildUndeclaredEntry(plan: GrowthActionPlan): ActionMeasurementEntry {
  return {
    action_id: plan.id,
    title: plan.title,
    action_type: plan.action_type as GrowthActionType,
    horizon: plan.horizon as ActionHorizon,
    plan_status: "PROPOSED",
    implementation: "NOT_DECLARED",
    declared_at: null,
    window_days: null,
    before_window: null,
    after_window: null,
    after_complete: false,
    volume: { before_events: null, after_events: null },
    metrics: [],
    result: "NOT_APPLICABLE",
    result_status: "NOT_APPLICABLE",
    confidence: "NONE",
    interpretation:
      "Aucune déclaration explicite : l'action reste une proposition (aucune exécution n'est déduite).",
  };
}

function buildUnknownEntry(plan: GrowthActionPlan): ActionMeasurementEntry {
  return {
    action_id: plan.id,
    title: plan.title,
    action_type: plan.action_type as GrowthActionType,
    horizon: plan.horizon as ActionHorizon,
    plan_status: "PROPOSED",
    implementation: "UNKNOWN",
    declared_at: null,
    window_days: null,
    before_window: null,
    after_window: null,
    after_complete: false,
    volume: { before_events: null, after_events: null },
    metrics: [],
    result: "INDETERMINATE",
    result_status: "MISSING_DATA",
    confidence: "NONE",
    interpretation:
      "Source des déclarations indisponible : état inconnu (jamais converti en non déclarée).",
  };
}

export function buildActionMeasurement(
  queue: GrowthActionQueue,
  decl: DeclarationsLoad,
  aggregates: Map<string, WindowAggregate>,
  todayDay: string,
): GrowthActionMeasurement {
  const plans = flattenQueue(queue);

  if (decl.source !== "ok") {
    return {
      declared_total: decl.total,
      declared_valid: 0,
      duplicates_ignored: 0,
      invalid_ignored: decl.invalid,
      window_cap: DECLARATION_WINDOW_CAP,
      processed: 0,
      load_status: "MISSING_DATA",
      entries: plans.map(buildUnknownEntry),
    };
  }

  const { distinct, duplicates } = dedupeDeclarations(decl.rows);
  const byId = new Map<string, ActionDeclaration>();
  for (const declaration of distinct) byId.set(declaration.action_id, declaration);

  const entries = plans.map((plan) => {
    const declaration = byId.get(plan.id);
    if (!declaration) return buildUndeclaredEntry(plan);
    const aggregate = aggregates.get(plan.id) ?? null;
    return buildDeclaredEntry(plan, { decl: declaration, aggregate, todayDay });
  });

  return {
    declared_total: decl.total,
    declared_valid: distinct.length,
    duplicates_ignored: duplicates,
    invalid_ignored: decl.invalid,
    window_cap: DECLARATION_WINDOW_CAP,
    processed: aggregates.size,
    load_status: "VALID",
    entries,
  };
}

/** Sélection déterministe des déclarations à mesurer (plafond inclus). */
export function processableDeclarations(decl: DeclarationsLoad): ActionDeclaration[] {
  if (decl.source !== "ok") return [];
  const { distinct } = dedupeDeclarations(decl.rows);
  return distinct.slice(0, DECLARATION_WINDOW_CAP);
}

/** Disponibilité de la source funnel (réutilisée par `index.ts`). */
export { funnelSourceAvailable };

/** Jour courant dérivé de la date d'agrégation du bundle. */
export function todayFromData(createdAt: string): string {
  const day = dayOfTimestamp(createdAt);
  return day ?? utcDay(new Date());
}
