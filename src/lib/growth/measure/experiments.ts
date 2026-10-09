import { MIN_SAMPLE, PERIOD_DAYS } from "../decision/thresholds";
import type { ActionMetricKey, GrowthData } from "../decision/types";
import { funnelSourceAvailable, rateStatus, rateValue, stepCount } from "./funnel";
import type {
  ExperimentDraft,
  ExperimentPreparation,
  GrowthExperimentSection,
  MeasureStatus,
} from "./types";

/**
 * P2.4 Étape E — préparation des expérimentations (A/B) : **jamais de
 * lancement**. Trois hypothèses dérivées des goulots P2.1/P2.2, état
 * systématiquement `DRAFT` + `launch_state: "BLOCKED"` :
 *   - aucun mécanisme d'affectation aléatoire en production (absent) ;
 *   - aucun lien de consentement d'expérimentation câblé (registre P2.0) ;
 *   - volume primaire mesuré sur la période (jauge de faisabilité).
 * Aucune architecture d'expérimentation n'est simulée : l'objectif est de
 * préparer la lecture, pas de prétendre lancer.
 */

/** Horizon de faisabilité documenté (au-delà : volume insuffisant). */
const FEASIBILITY_HORIZON_DAYS = 90;

const DRAFTS: ReadonlyArray<ExperimentDraft> = [
  {
    id: "exp_acquisition_cta",
    title: "Acquisition : CTA d'inscription",
    hypothesis:
      "Une variante de l'appel à l'inscription pourrait modifier le taux d'inscription commencée depuis la page vue (mesure d'abord, conclusion ensuite).",
    primary_metric: "signup_rate",
    guardrail_metrics: ["activation_rate", "checkout_dropoff"],
    control: "Variante A — libellé actuel du CTA",
    candidate: "Variante B — libellé alternatif du CTA",
    eligible_population:
      "Visiteurs éligibles (comptes de test exclus dès la source), affectation non câblée",
    min_observations: 100,
    stop_criteria: [
      "Primaire ≥ 100 observations côté contrôle et candidat",
      "Aucun guardrail en dessous de sa baseline sur la période",
      "Fenêtre d'observation complète avant toute lecture de résultat",
    ],
  },
  {
    id: "exp_activation_premier_cours",
    title: "Activation : accès au premier cours",
    hypothesis:
      "Une variante d'accès direct au premier cours pourrait modifier le taux d'activation (inscription → 1re leçon) (mesure d'abord, conclusion ensuite).",
    primary_metric: "activation_rate",
    guardrail_metrics: ["signup_rate", "purchase_rate"],
    eligible_population:
      "Nouvelles inscriptions éligibles (comptes de test exclus dès la source), affectation non câblée",
    control: "Variante A — parcours actuel d'accès au cours",
    candidate: "Variante B — accès direct au premier cours",
    min_observations: 100,
    stop_criteria: [
      "Primaire ≥ 100 observations côté contrôle et candidat",
      "Aucun guardrail en dessous de sa baseline sur la période",
      "Fenêtre d'observation complète avant toute lecture de résultat",
    ],
  },
  {
    id: "exp_checkout_preuve_paiement",
    title: "Checkout : message de confiance",
    hypothesis:
      "Une variante de message de confiance avant paiement pourrait modifier le taux d'abandon de checkout (mesure d'abord, conclusion ensuite).",
    primary_metric: "checkout_dropoff",
    guardrail_metrics: ["purchase_rate", "activation_rate"],
    eligible_population:
      "Sessions de checkout éligibles (comptes de test exclus dès la source), affectation non câblée",
    control: "Variante A — écran de paiement actuel",
    candidate: "Variante B — écran de paiement avec message de confiance",
    min_observations: 60,
    stop_criteria: [
      "Primaire ≥ 60 observations côté contrôle et candidat",
      "Aucun guardrail en dessous de sa baseline sur la période",
      "Fenêtre d'observation complète avant toute lecture de résultat",
    ],
  },
];

const BASELINE_DEFS: Record<
  string,
  { numerator: string; denominator: string; min_sample: number; kind: "rate" | "dropoff" }
> = {
  signup_rate: {
    numerator: "signup_completed",
    denominator: "page_view",
    min_sample: MIN_SAMPLE.traffic_rate,
    kind: "rate",
  },
  activation_rate: {
    numerator: "activated",
    denominator: "signup_completed",
    min_sample: MIN_SAMPLE.traffic_rate,
    kind: "rate",
  },
  checkout_dropoff: {
    numerator: "purchase",
    denominator: "begin_checkout",
    min_sample: MIN_SAMPLE.checkout_rate,
    kind: "dropoff",
  },
  purchase_rate: {
    numerator: "purchase",
    denominator: "page_view",
    min_sample: MIN_SAMPLE.monetization,
    kind: "rate",
  },
};

function baselineOf(
  funnel: Record<string, number>,
  sourceAvailable: boolean,
  metric: ActionMetricKey,
): { value: number | null; denominator: number; status: MeasureStatus } {
  const def = BASELINE_DEFS[metric];
  if (!def) return { value: null, denominator: 0, status: "NOT_APPLICABLE" };
  const denominator = sourceAvailable ? stepCount(funnel, def.denominator) : 0;
  const numerator = sourceAvailable ? stepCount(funnel, def.numerator) : 0;
  const value = !sourceAvailable
    ? null
    : def.kind === "dropoff"
      ? denominator <= 0
        ? null
        : 1 - Math.min(1, numerator / denominator)
      : rateValue(numerator, denominator);
  return {
    value,
    denominator,
    status: rateStatus(sourceAvailable, denominator, def.min_sample),
  };
}

export function buildExperimentSection(data: GrowthData): GrowthExperimentSection {
  const sourceAvailable = funnelSourceAvailable(data.funnel);
  const days = data.period.days;

  const experiments: ExperimentPreparation[] = DRAFTS.map((draft) => {
    const baseline = baselineOf(data.funnel, sourceAvailable, draft.primary_metric);

    const dailyRounded =
      baseline.denominator > 0 && days > 0
        ? Math.round((baseline.denominator / days) * 10) / 10
        : null;
    const estimatedDays =
      dailyRounded !== null && dailyRounded > 0
        ? Math.ceil(draft.min_observations / dailyRounded)
        : null;

    const volumeStatus: MeasureStatus = !sourceAvailable
      ? "MISSING_DATA"
      : estimatedDays === null
        ? "INSUFFICIENT_DATA"
        : estimatedDays <= FEASIBILITY_HORIZON_DAYS
          ? "VALID"
          : "INSUFFICIENT_DATA";

    const blockingReasons = [
      "Affectation aléatoire absente : aucun mécanisme d'affectation en production (P2.4 prépare la lecture, pas le lancement).",
      "Consentement d'expérimentation non câblé : aucun lien vers une-page consentement pour l'expérimentation (registre P2.0).",
    ];
    if (volumeStatus !== "VALID") {
      blockingReasons.push(
        estimatedDays === null
          ? `Volume primaire nul sur la période (${days} jours) : jauge de faisabilité non calculable.`
          : `Volume primaire insuffisant : ~${dailyRounded} observation(s)/jour, ${estimatedDays} jours requis pour ${draft.min_observations} observations (horizon ${FEASIBILITY_HORIZON_DAYS} j).`,
      );
    }

    return {
      ...draft,
      state: "DRAFT",
      baseline: baseline.value,
      baseline_denominator: baseline.denominator,
      baseline_status: baseline.status,
      daily_volume: dailyRounded,
      estimated_days_to_min_sample: estimatedDays,
      volume_status: volumeStatus,
      launch_state: "BLOCKED",
      blocking_reasons: blockingReasons,
    };
  });

  return {
    experiments,
    assignment_mechanism: "ABSENT",
    consent_link: "ABSENT",
    launched_count: 0,
    note: `Aucune expérience n'est lancée : état DRAFT/BLOCKED imposé (affectation, consentement, volume). Fenêtre minimale de référence : ${PERIOD_DAYS.current} jours.`,
  };
}
