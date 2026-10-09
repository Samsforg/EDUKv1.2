import type { GrowthData } from "../decision/types";
import { MIN_SAMPLE } from "../decision/thresholds";
import type {
  FunnelRate,
  FunnelStep,
  GrowthFunnelMeasurement,
  MeasureStatus,
  NotApplicableStage,
} from "./types";

/**
 * P2.4 Étape C — entonnoir de conversion réellement mesurable.
 *
 * Sources : `GrowthData.funnel` (agrégats `countFunnelForDay`, comptes de
 * test exclus à la source, réconciliation `pageview` → `page_view` faite
 * par `decision/data.ts`). Aucune nouvelle requête, aucun événement fabriqué.
 *
 * Règles de statut (jamais de faux 0) :
 *   - table absente (jamais de clé `_active_users`) → MISSING_DATA ;
 *   - dénominateur nul → valeur null + INSUFFICIENT_DATA ;
 *   - dénominateur > 0 mais < minimum → valeur calculée + INSUFFICIENT_DATA
 *     (la donnée existe, la lecture décisionnelle est interdite) ;
 *   - sinon → VALID (un 0 réel reste un 0 réel).
 */

export const MEASURE_SOURCE = "analytics_events (test users excluded)";

const STEP_DEFS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "page_view", label: "Pages vues (visites)" },
  { key: "signup_started", label: "Inscriptions commencées" },
  { key: "signup_completed", label: "Inscriptions terminées" },
  { key: "activated", label: "Activations (1re leçon)" },
  { key: "begin_checkout", label: "Checkouts débutés" },
  { key: "purchase", label: "Achats confirmés" },
];

interface RateDef {
  key: string;
  label: string;
  numerator: string;
  denominator: string;
  denominator_label: string;
  min_sample: number;
}

const RATE_DEFS: ReadonlyArray<RateDef> = [
  {
    key: "visit_to_signup_start",
    label: "Visite → inscription commencée",
    numerator: "signup_started",
    denominator: "page_view",
    denominator_label: "pages vues",
    min_sample: MIN_SAMPLE.traffic_rate,
  },
  {
    key: "signup_start_to_complete",
    label: "Inscription commencée → terminée",
    numerator: "signup_completed",
    denominator: "signup_started",
    denominator_label: "inscriptions commencées",
    min_sample: MIN_SAMPLE.traffic_rate,
  },
  {
    key: "signup_to_activation",
    label: "Inscription → activation",
    numerator: "activated",
    denominator: "signup_completed",
    denominator_label: "inscriptions terminées",
    min_sample: MIN_SAMPLE.traffic_rate,
  },
  {
    key: "activation_to_checkout",
    label: "Activation → checkout",
    numerator: "begin_checkout",
    denominator: "activated",
    denominator_label: "activations",
    min_sample: MIN_SAMPLE.traffic_rate,
  },
  {
    key: "checkout_to_purchase",
    label: "Checkout → achat confirmé",
    numerator: "purchase",
    denominator: "begin_checkout",
    denominator_label: "checkouts débutés",
    min_sample: MIN_SAMPLE.checkout_rate,
  },
];

/** Étapes du parcours attendues mais absentes du produit (jamais des 0). */
const NOT_APPLICABLE: ReadonlyArray<NotApplicableStage> = [
  {
    key: "preinscription_started",
    label: "Préinscription commencée",
    reason:
      "Aucun événement, ni table, ni route de préinscription n'existe dans le produit (audit P2.4).",
  },
  {
    key: "preinscription_completed",
    label: "Préinscription terminée",
    reason:
      "Aucune notion de fin de préinscription dans le produit (audit P2.4) — la chaîne mesurable commence à signup_started.",
  },
  {
    key: "unique_visitors",
    label: "Visiteurs uniques first-party",
    reason:
      "session_id est null pour les visiteurs anonymes (contrat analytics §3) — référence externe : console GA4.",
  },
  {
    key: "retention_d7",
    label: "Rétention D7",
    reason:
      "Historique insuffisant — état officiel INSUFFICIENT_DATA du contrat P2, jamais recalculé.",
  },
];

/** La table a répondu si le comptage quotidien a produit ses clés internes. */
export function funnelSourceAvailable(funnel: Record<string, number>): boolean {
  return Object.prototype.hasOwnProperty.call(funnel, "_active_users");
}

export function stepCount(funnel: Record<string, number>, key: string): number {
  return funnel[key] ?? 0;
}

export function rateValue(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return numerator / denominator;
}

export function rateStatus(
  sourceAvailable: boolean,
  denominator: number,
  minSample: number,
): MeasureStatus {
  if (!sourceAvailable) return "MISSING_DATA";
  if (denominator <= 0) return "INSUFFICIENT_DATA";
  return denominator >= minSample ? "VALID" : "INSUFFICIENT_DATA";
}

export function buildFunnelMeasurement(data: GrowthData): GrowthFunnelMeasurement {
  const funnel = data.funnel;
  const sourceAvailable = funnelSourceAvailable(funnel);

  const steps: FunnelStep[] = STEP_DEFS.map((def) => ({
    key: def.key,
    label: def.label,
    count: sourceAvailable ? stepCount(funnel, def.key) : 0,
    status: sourceAvailable ? "VALID" : "MISSING_DATA",
  }));

  const rates: FunnelRate[] = RATE_DEFS.map((def) => {
    const numerator = sourceAvailable ? stepCount(funnel, def.numerator) : 0;
    const denominator = sourceAvailable ? stepCount(funnel, def.denominator) : 0;
    return {
      key: def.key,
      label: def.label,
      numerator_key: def.numerator,
      denominator_key: def.denominator,
      numerator,
      denominator,
      denominator_label: def.denominator_label,
      value: sourceAvailable ? rateValue(numerator, denominator) : null,
      min_sample: def.min_sample,
      status: rateStatus(sourceAvailable, denominator, def.min_sample),
    };
  });

  const status: MeasureStatus = !sourceAvailable
    ? "MISSING_DATA"
    : rates.some((r) => r.status === "VALID")
      ? "VALID"
      : "INSUFFICIENT_DATA";

  return {
    steps,
    rates,
    not_applicable: [...NOT_APPLICABLE],
    source_available: sourceAvailable,
    status,
    source: MEASURE_SOURCE,
  };
}

/** Définitions réutilisées par la tendance et les expériences. */
export const FUNNEL_RATE_DEFS = RATE_DEFS;
export const FUNNEL_STEP_DEFS = STEP_DEFS;
