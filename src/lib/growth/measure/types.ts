import type { ActionHorizon, ActionMetricKey, GrowthActionType } from "../decision/types";

/**
 * P2.4 — modèle de mesure (Étape B) : couche légère, déterministe, typée.
 *
 * Vocabulaire de statuts (conventions existantes étendues) :
 *   - `VALID`             — donnée calculable sur un échantillon suffisant ;
 *   - `INSUFFICIENT_DATA` — donnée présente mais échantillon < minimum ou
 *                           dénominateur nul (jamais affichée comme 0 %) ;
 *   - `MISSING_DATA`      — source absente / injoignable (table, requête) ;
 *   - `NOT_APPLICABLE`    — étape ou métrique inexistante dans le produit.
 *
 * `InsightStatus` P2.1 (`VALID | INSUFFICIENT_DATA | UNAVAILABLE`) reste
 * inchangé : ce vocabulaire ne s'applique qu'à la couche P2.4.
 * Aucune PII, aucun contenu libre, aucun événement fabriqué.
 */

export type MeasureStatus = "VALID" | "INSUFFICIENT_DATA" | "MISSING_DATA" | "NOT_APPLICABLE";

// ── Étape C — entonnoir ────────────────────────────────────────────────

export interface FunnelStep {
  key: string;
  label: string;
  count: number;
  status: MeasureStatus;
}

export interface FunnelRate {
  key: string;
  label: string;
  numerator_key: string;
  denominator_key: string;
  numerator: number;
  denominator: number;
  /** Libellé explicite du dénominateur (jamais de taux sans base). */
  denominator_label: string;
  /** null si dénominateur nul — jamais un faux 0. */
  value: number | null;
  min_sample: number;
  status: MeasureStatus;
}

export interface NotApplicableStage {
  key: string;
  label: string;
  reason: string;
}

export interface GrowthFunnelMeasurement {
  steps: FunnelStep[];
  rates: FunnelRate[];
  /** Étapes attendues mais absentes du produit (ex. préinscription). */
  not_applicable: NotApplicableStage[];
  /** true si la table `analytics_events` a répondu sur la période. */
  source_available: boolean;
  status: MeasureStatus;
  source: string;
}

// ── Étape C — évolution par période ────────────────────────────────────

export interface TrendPoint {
  key: string;
  label: string;
  kind: "count" | "rate";
  current: number | null;
  previous: number | null;
  /** current − previous (null si une des deux périodes manque). */
  delta: number | null;
  /** Variation relative vs période précédente (null si base nulle). */
  delta_pct: number | null;
  status: MeasureStatus;
}

export interface GrowthTrendMeasurement {
  period: { from: string; to: string; days: number };
  previous_period: { from: string; to: string; days: number };
  /** false si longueurs différentes ou source absente → périodes incomparables. */
  comparable: boolean;
  points: TrendPoint[];
  status: MeasureStatus;
}

// ── Étape C — couverture des données ───────────────────────────────────

export interface PeriodCoverage {
  days: number;
  /** null si la requête de couverture a échoué (jamais 0 faux). */
  days_with_data: number | null;
  rate: number | null;
  status: MeasureStatus;
}

export interface GrowthCoverageMeasurement {
  current: PeriodCoverage;
  previous: PeriodCoverage;
  /** true si la période courante inclut le jour courant (dernier jour partiel). */
  includes_partial_today: boolean;
  /** Volume non attribuable (couche P2.2) — distinct des données manquantes. */
  unattributed: number;
  unattributed_status: MeasureStatus;
}

// ── Étape D — mesure des actions P2.3 ──────────────────────────────────

/**
 * États réellement suivis :
 *   - `NOT_DECLARED`      — aucune déclaration explicite (statut P2.3 reste
 *                           `PROPOSED`, aucune exécution déduite) ;
 *   - `DECLARED_REALIZED` — réalisation déclarée explicitement par un admin ;
 *   - `UNKNOWN`           — source des déclarations indisponible (état
 *                           inconnu, jamais converti en « non déclarée »).
 * Il n'existe aucun état « acceptée » : le produit ne suit pas ce statut.
 */
export type ActionImplementationState = "NOT_DECLARED" | "DECLARED_REALIZED" | "UNKNOWN";

export type WindowEvolution = "HAUSSE" | "BAISSE" | "STABLE";

export type ActionMeasurementResult = "NOT_APPLICABLE" | "INDETERMINATE" | "OBSERVED";

/** Aucun niveau « confirmé » : aucune preuve causale n'est revendiquée. */
export type MeasurementConfidence = "NONE" | "LOW" | "MEDIUM";

export interface ActionDeclaration {
  action_id: string;
  /** Horodatage de la déclaration (création de l'événement serveur). */
  declared_at: string;
  /** Identifiant interne du déclarant (admin) — jamais un email. */
  declared_by: number;
  window_days: number;
}

export interface WindowMetric {
  metric: ActionMetricKey;
  /** false → métrique non mesurable sur fenêtre (statut NOT_APPLICABLE). */
  measured: boolean;
  not_measured_reason: string | null;
  before: number | null;
  before_denominator: number | null;
  before_status: MeasureStatus;
  after: number | null;
  after_denominator: number | null;
  after_status: MeasureStatus;
  delta: number | null;
  /** Évolution factuelle du delta (hausse/baisse), jamais « amélioration ». */
  evolution: WindowEvolution | null;
  status: MeasureStatus;
}

export interface ActionMeasurementEntry {
  action_id: string;
  title: string;
  action_type: GrowthActionType;
  horizon: ActionHorizon;
  /** Figé à PROPOSED : la mesure ne transforme jamais le statut P2.3. */
  plan_status: "PROPOSED";
  implementation: ActionImplementationState;
  declared_at: string | null;
  window_days: number | null;
  /** Bornes [from, to_exclusive) de la fenêtre avant. */
  before_window: { from: string; to_exclusive: string } | null;
  after_window: { from: string; to_exclusive: string } | null;
  after_complete: boolean;
  /** Volume total d'événements observés dans chaque fenêtre. */
  volume: { before_events: number | null; after_events: number | null };
  metrics: WindowMetric[];
  result: ActionMeasurementResult;
  result_status: MeasureStatus;
  confidence: MeasurementConfidence;
  interpretation: string;
}

export interface GrowthActionMeasurement {
  /** Lignes brutes lues (source des déclarations). */
  declared_total: number;
  /** Déclarations valides après dédoublonnage (la première par action gagne). */
  declared_valid: number;
  duplicates_ignored: number;
  invalid_ignored: number;
  /** Plafond documenté de fenêtres calculées par appel. */
  window_cap: number;
  processed: number;
  /** MISSING_DATA si la lecture des déclarations a échoué. */
  load_status: MeasureStatus;
  entries: ActionMeasurementEntry[];
}

// ── Étape E — préparation des expérimentations ─────────────────────────

export interface ExperimentDraft {
  id: string;
  title: string;
  hypothesis: string;
  primary_metric: ActionMetricKey;
  guardrail_metrics: ActionMetricKey[];
  control: string;
  candidate: string;
  eligible_population: string;
  /** Volume minimal d'observations primaires avant toute lecture. */
  min_observations: number;
  stop_criteria: string[];
}

export interface ExperimentPreparation extends ExperimentDraft {
  /** Une expérience définie n'est pas en cours : toujours DRAFT en P2.4. */
  state: "DRAFT";
  baseline: number | null;
  baseline_denominator: number;
  baseline_status: MeasureStatus;
  /** Dénominateur primaire par jour sur la période courante. */
  daily_volume: number | null;
  estimated_days_to_min_sample: number | null;
  volume_status: MeasureStatus;
  /** Jamais LAUNCHABLE en P2.4 : affectation et consentement absents. */
  launch_state: "BLOCKED";
  blocking_reasons: string[];
}

export interface GrowthExperimentSection {
  experiments: ExperimentPreparation[];
  assignment_mechanism: "ABSENT";
  consent_link: "ABSENT";
  launched_count: 0;
  note: string;
}

// ── Bundle mesures ─────────────────────────────────────────────────────

export interface GrowthMeasurement {
  funnel: GrowthFunnelMeasurement;
  trend: GrowthTrendMeasurement;
  coverage: GrowthCoverageMeasurement;
  actions: GrowthActionMeasurement;
  experiments: GrowthExperimentSection;
  meta: {
    engine: "deterministic";
    source: string;
    test_users_excluded: true;
    /** Aucune conclusion causale n'est produite par la couche P2.4. */
    causal_claims: false;
    /** Aucune action n'est exécutée par la couche P2.4. */
    executed_actions: false;
  };
}
