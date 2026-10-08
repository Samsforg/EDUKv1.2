import type {
  Actionability,
  ActionHorizon,
  ActionMetricKey,
  ActionPriorityBand,
  GrowthActionMetric,
  GrowthActionPlan,
  GrowthActionQueue,
  GrowthData,
  GrowthOpportunity,
  GrowthRecommendation,
  OpportunityType,
} from "./types";
import {
  ATTRIBUTION_LIMITS,
  MIN_SAMPLE,
  THRESHOLDS,
} from "./thresholds";
import type { ComputedMetrics } from "./rules";
import { buildChannelPerformances } from "./channels";
import { buildReferralPerformances } from "./referrals";

/**
 * P2.3 — Growth Action Engine déterministe (§3-§18).
 *
 *   OPPORTUNITIES → RECOMMENDATIONS → PLANS D'ACTION PROPOSÉS
 *                 → FILE PAR HORIZON → PLAN DE MESURE
 *
 * Module PUR : mêmes données → mêmes plans. Aucune exécution, aucun
 * envoi, aucun ordonnancement, aucun budget (0 FCFA). Chaque plan porte
 * `mode`/`status` figés à "PROPOSED" : le moteur décrit quoi faire,
 * pourquoi, pour qui, avec quelle priorité et comment mesurer — un
 * humain décide, exécute et valide.
 *
 * Cibles : soit un seuil documenté de thresholds.ts (THRESHOLD_BASED),
 * soit `target: null` + TARGET_NOT_CALIBRATED — aucune cible n'est
 * inventée quand elle n'est pas justifiable par les données.
 */

/** P2.3 §7 — bornes de bande de priorité d'action (sur priority_score). */
export const ACTION_SCORE_BUCKETS = { high: 60, medium: 40 } as const;

/** P2.3 §6 — plancher de confiance sous lequel rien n'est actionnable. */
export const ACTION_CONFIDENCE_FLOOR = 40;

/** P2.3 §7 — bornes des libellés d'urgence / impact (échelles 0..100). */
export const ACTION_LABEL_GAPS = { upper: 70, mid: 40, impactHigh: 60, impactMid: 30 } as const;

// ── §6 — actionnabilité ───────────────────────────────────────────────

/**
 * Actionnabilité d'une recommandation : le constat est actionnable
 * seulement s'il est VALID et suffisamment fiable. Un constat sous le
 * plancher de confiance est BLOCKED → le plan rejoint `blocked`, il
 * n'est jamais présenté comme faisable.
 */
export function computeActionability(
  reco: Pick<GrowthRecommendation, "status">,
  opp: Pick<GrowthOpportunity, "status" | "confidence" | "priority_score">,
): Actionability {
  if (reco.status !== "VALID" || opp.status !== "VALID") return "BLOCKED";
  if (opp.confidence < ACTION_CONFIDENCE_FLOOR) return "BLOCKED";
  if (opp.priority_score >= ACTION_SCORE_BUCKETS.high) return "HIGH";
  if (opp.priority_score >= ACTION_SCORE_BUCKETS.medium) return "MEDIUM";
  return "LOW";
}

/**
 * P2.3 §7 — bande P0..P3 : combine actionnabilité et bucket de
 * priorité P2.1 (PRIORITY_BUCKETS, inchangé). Testée par branche.
 */
export function computeActionPriority(
  actionability: Actionability,
  priorityLabel: GrowthOpportunity["priority"],
): ActionPriorityBand {
  if (actionability === "BLOCKED") return "P3";
  if (actionability === "HIGH") {
    if (priorityLabel === "CRITICAL") return "P0";
    if (priorityLabel === "HIGH") return "P1";
    return "P2";
  }
  if (actionability === "MEDIUM") return "P2";
  const labelIsActionable =
    priorityLabel === "CRITICAL" || priorityLabel === "HIGH" || priorityLabel === "MEDIUM";
  return labelIsActionable ? "P2" : "P3";
}

/** P2.3 §8 — horizon déduit de la bande (aucun ordre planifié). */
export function horizonForPriority(band: ActionPriorityBand): ActionHorizon {
  if (band === "P0" || band === "P1") return "NOW";
  if (band === "P2") return "THIS_WEEK";
  return "BACKLOG";
}

function urgencyLabel(urgency: number): string {
  if (urgency >= ACTION_LABEL_GAPS.upper) return "HIGH";
  if (urgency >= ACTION_LABEL_GAPS.mid) return "MEDIUM";
  return "LOW";
}

function impactLabel(impact: number): "LOW" | "MEDIUM" | "HIGH" {
  if (impact >= ACTION_LABEL_GAPS.impactHigh) return "HIGH";
  if (impact >= ACTION_LABEL_GAPS.impactMid) return "MEDIUM";
  return "LOW";
}

// ── §5 — playbooks (étapes et garde-fous proposés) ────────────────────

interface ActionPlaybook {
  title: (opp: GrowthOpportunity) => string;
  effort: "LOW" | "MEDIUM" | "HIGH";
  steps: string[];
  guardrails: string[];
}

/** Garde-fous communs à tous les plans (§16). */
const COMMON_GUARDRAILS: string[] = [
  "Exécution humaine requise : le moteur ne déclenche rien.",
  "Proposition sans budget : aucun envoi ni publication automatique.",
  "Rejouer la mesure sur la période suivante avant de conclure.",
];

const PLAYBOOK: Record<OpportunityType, ActionPlaybook> = {
  ACTIVATION_BOTTLENECK: {
    title: () => "Simplifier le parcours d'activation (inscription → première action)",
    effort: "MEDIUM",
    steps: [
      "Rejouer le parcours inscription → première action sur les événements de la période.",
      "Lister les étapes où les inscrits s'arrêtent (événements disponibles).",
      "Choisir puis appliquer une modification d'interface (décision humaine).",
      "Mesurer activation_rate sur la période suivante par rapport à la baseline.",
    ],
    guardrails: [
      "Ne pas changer la définition d'activation sans mettre à jour le contrat d'événements.",
    ],
  },
  CHECKOUT_DROPOFF: {
    title: () => "Revoir la confiance au moment du paiement (prix affiché, moyens, garantie)",
    effort: "MEDIUM",
    steps: [
      "Rejouer le parcours checkout de la période et lister les étapes d'abandon.",
      "Comparer les étapes affichées (prix, moyens de paiement, garantie).",
      "Appliquer l'ajustement d'affichage retenu (décision humaine).",
      "Mesurer checkout_dropoff sur la période suivante.",
    ],
    guardrails: [
      "Aucun changement de prix ni de contrat de paiement sans validation humaine.",
    ],
  },
  MONETIZATION_OPPORTUNITY: {
    title: () => "Mettre en avant l'offre Premium aux utilisateurs déjà activés",
    effort: "MEDIUM",
    steps: [
      "Lister les contenus déclencheurs déjà consommés par les utilisateurs activés.",
      "Définir la mise en avant (emplacement, message) — proposition à valider.",
      "Publier la mise en avant manuellement après validation.",
      "Mesurer subscription_count et purchase_rate sur la période suivante.",
    ],
    guardrails: [
      "Aucune relance automatique : la mise en avant reste une proposition publiée à la main.",
    ],
  },
  RETENTION_OPPORTUNITY: {
    title: () => "Préparer une relance des visiteurs peu revenus sur la période",
    effort: "LOW",
    steps: [
      "Définir le message de reprise et le segment cible existant.",
      "Préparer la liste de diffusion à partir des segments déjà calculés.",
      "Envoyer manuellement après validation — aucun envoi programmé.",
      "Mesurer return_visit_rate sur la période suivante.",
    ],
    guardrails: [
      "Le taux de retour est un proxy court : ne pas en conclure sur la rétention D7.",
      "Aucun message ne part automatiquement depuis ce moteur.",
    ],
  },
  ACQUISITION_WEAKNESS: {
    title: () => "Revoir la page d'atterrissage (accroche, promesse, appel à l'action)",
    effort: "MEDIUM",
    steps: [
      "Inventorier les versions de page d'atterrissage en service.",
      "Proposer des variantes d'accroche et d'appel à l'action.",
      "Valider puis déployer la variante retenue (décision humaine).",
      "Mesurer signup_rate sur la période suivante.",
    ],
    guardrails: [
      "Aucun déploiement automatique de variante ; aucun budget engagé avant validation.",
    ],
  },
  ACQUISITION_STRENGTH: {
    title: () => "Amplifier le canal d'acquisition au-dessus du seuil haut",
    effort: "HIGH",
    steps: [
      "Vérifier que le signal se maintient sur au moins deux périodes.",
      "Estimer le volume de trafic additionnel et le budget associé.",
      "Lancer la campagne manuellement après validation du budget.",
      "Surveiller signup_rate et la couverture d'attribution pendant la campagne.",
    ],
    guardrails: [
      "Aucune campagne automatique ; budget plafonné et validé avant lancement.",
      "Surveiller la couverture d'attribution : le volume sans source reste non attribué.",
    ],
  },
  CHANNEL_ACTIVATION_GAP: {
    title: (opp) => {
      const channel = extractChannel(opp.evidence);
      return channel
        ? `Améliorer l'activation du canal ${channel}`
        : "Améliorer l'activation du canal dominant";
    },
    effort: "MEDIUM",
    steps: [
      "Isoler le parcours d'activation des inscrits de ce canal (événements disponibles).",
      "Comparer les étapes avec celles de l'ensemble des inscrits de la période.",
      "Appliquer l'ajustement retenu pour ce parcours (décision humaine).",
      "Mesurer l'activation de ce canal sur la période suivante.",
    ],
    guardrails: [
      "Relire la couverture d'attribution avant toute décision fondée sur le canal.",
    ],
  },
  REFERRAL_ACTIVATION_GAP: {
    title: () => "Accompagner les filleuls jusqu'à leur première action utile",
    effort: "LOW",
    steps: [
      "Lister les étapes post-inscription vécues par les filleuls de la période.",
      "Ajouter un guide court de prise en main (proposition à valider).",
      "Publier le guide manuellement après validation.",
      "Mesurer l'activation des filleuls sur la période suivante.",
    ],
    guardrails: [
      "Aucun envoi automatique aux filleuls ; aucune donnée personnelle ajoutée.",
    ],
  },
  ATTRIBUTION_GAP: {
    title: () => "Compléter la collecte d'attribution sur les parcours sans signal",
    effort: "LOW",
    steps: [
      "Inventorier les parcours d'inscription sans paramètre d'acquisition.",
      "Étendre la capture existante à ces parcours (contrat d'événements inchangé).",
      "Déployer manuellement et vérifier les props sur une période test.",
      "Mesurer attribution_coverage sur la période suivante.",
    ],
    guardrails: [
      "Ne capturer que les paramètres déjà prévus au contrat ; aucune donnée personnelle ajoutée.",
    ],
  },
};

// ── §12-§13 — plan de mesure (baseline réelle, cible justifiée) ───────

function thresholdMetric(
  metric: ActionMetricKey,
  baseline: number | null,
  target: number,
  direction: "UP" | "DOWN",
  minimumSample: number,
): GrowthActionMetric {
  const calibrated = baseline !== null;
  return {
    metric,
    baseline,
    target: calibrated ? target : null,
    direction,
    minimum_sample: minimumSample,
    target_calibration: calibrated ? "THRESHOLD_BASED" : "TARGET_NOT_CALIBRATED",
  };
}

function uncalibratedMetric(
  metric: ActionMetricKey,
  baseline: number | null,
  direction: "UP" | "DOWN",
  minimumSample: number,
): GrowthActionMetric {
  return {
    metric,
    baseline,
    target: null,
    direction,
    minimum_sample: minimumSample,
    target_calibration: "TARGET_NOT_CALIBRATED",
  };
}

/** Canal extrait de l'evidence (`canal <nom>`), null si absent. */
function extractChannel(evidence: string): string | null {
  return evidence.match(/canal ([a-z0-9_.+-]+)/i)?.[1] ?? null;
}

function channelActivationBaseline(
  data: GrowthData,
  m: ComputedMetrics,
  evidence: string,
): number | null {
  const intel = data.intelligence;
  if (!intel || !intel.available) return m.activationRate;
  const channel = extractChannel(evidence);
  if (!channel) return m.activationRate;
  const perf = buildChannelPerformances(intel.channels).find((c) => c.channel === channel);
  return perf?.activationRate ?? m.activationRate;
}

function referralActivationBaseline(data: GrowthData, m: ComputedMetrics): number | null {
  const intel = data.intelligence;
  if (!intel || !intel.available) return m.activationRate;
  const refs = buildReferralPerformances(intel.referrals);
  const signups = refs.reduce((sum, r) => sum + r.signups, 0);
  const activated = refs.reduce((sum, r) => sum + r.activated, 0);
  if (signups <= 0) return m.activationRate;
  return activated / signups;
}

/** Métrique de succès du plan, dérivée des métriques déjà calculées. */
function buildSuccessMetrics(
  type: OpportunityType,
  data: GrowthData,
  m: ComputedMetrics,
  evidence: string,
): GrowthActionMetric[] {
  const intel = data.intelligence;
  switch (type) {
    case "ACTIVATION_BOTTLENECK":
      return [
        thresholdMetric(
          "activation_rate",
          m.activationRate,
          THRESHOLDS.activation_rate.min,
          "UP",
          MIN_SAMPLE.traffic_rate,
        ),
      ];
    case "CHANNEL_ACTIVATION_GAP":
      return [
        thresholdMetric(
          "activation_rate",
          channelActivationBaseline(data, m, evidence),
          THRESHOLDS.activation_rate.min,
          "UP",
          MIN_SAMPLE.traffic_rate,
        ),
      ];
    case "REFERRAL_ACTIVATION_GAP":
      return [
        thresholdMetric(
          "activation_rate",
          referralActivationBaseline(data, m),
          THRESHOLDS.activation_rate.min,
          "UP",
          MIN_SAMPLE.traffic_rate,
        ),
      ];
    case "ACQUISITION_WEAKNESS":
      return [
        thresholdMetric(
          "signup_rate",
          m.signupRate,
          THRESHOLDS.signup_rate.min,
          "UP",
          MIN_SAMPLE.traffic_rate,
        ),
      ];
    case "ACQUISITION_STRENGTH":
      return [
        thresholdMetric(
          "signup_rate",
          m.signupRate,
          THRESHOLDS.signup_rate.high,
          "UP",
          MIN_SAMPLE.traffic_rate,
        ),
      ];
    case "CHECKOUT_DROPOFF":
      return [
        thresholdMetric(
          "checkout_dropoff",
          m.checkoutDropoff,
          THRESHOLDS.checkout_dropoff.max,
          "DOWN",
          MIN_SAMPLE.checkout_rate,
        ),
      ];
    case "MONETIZATION_OPPORTUNITY":
      // Aucun seuil de conversion documenté → cible non calibrée.
      return [
        uncalibratedMetric(
          "subscription_count",
          m.purchases,
          "UP",
          MIN_SAMPLE.monetization,
        ),
      ];
    case "RETENTION_OPPORTUNITY":
      return [
        thresholdMetric(
          "return_visit_rate",
          m.returnVisitRate,
          THRESHOLDS.return_visit_rate.min,
          "UP",
          MIN_SAMPLE.traffic_rate,
        ),
      ];
    case "ATTRIBUTION_GAP": {
      const coverage = intel ? intel.attribution.coverage.coverageRate : null;
      return [
        thresholdMetric(
          "attribution_coverage",
          coverage,
          ATTRIBUTION_LIMITS.coverage_full,
          "UP",
          MIN_SAMPLE.traffic_rate,
        ),
      ];
    }
  }
}

// ── §5 — construction des plans ───────────────────────────────────────

/** Id déterministe : un plan par type d'opportunité, période et segment. */
export function actionPlanId(
  type: OpportunityType,
  period: string,
  segment: string | null,
): string {
  return `action_${type}#${period}#${segment ?? "global"}`;
}

export interface BuildActionPlansInput {
  data: GrowthData;
  recommendations: GrowthRecommendation[];
  opportunities: GrowthOpportunity[];
  metrics: ComputedMetrics;
}

/** Construit un plan à partir d'une recommandation + son opportunité. */
export function buildActionPlan(
  reco: GrowthRecommendation,
  opp: GrowthOpportunity,
  input: BuildActionPlansInput,
): GrowthActionPlan {
  const { data, metrics } = input;
  const playbook = PLAYBOOK[reco.opportunity_type];
  const actionability = computeActionability(reco, opp);
  const actionPriority = computeActionPriority(actionability, opp.priority);
  const successMetrics = buildSuccessMetrics(reco.opportunity_type, data, metrics, opp.evidence);
  const period = `${data.period.from}/${data.period.to}`;

  return {
    id: actionPlanId(reco.opportunity_type, period, opp.segment),
    opportunity_id: opp.id,
    recommendation_id: reco.id,
    opportunity_type: reco.opportunity_type,
    action_type: reco.action.type,
    title: playbook.title(opp),
    objective: reco.what,
    target_segment: opp.segment,
    channel: extractChannel(opp.evidence),
    priority_score: opp.priority_score,
    action_priority: actionPriority,
    actionability,
    urgency: urgencyLabel(opp.urgency),
    effort: playbook.effort,
    expected_impact: impactLabel(opp.impact),
    mode: "PROPOSED",
    status: "PROPOSED",
    horizon: horizonForPriority(actionPriority),
    experiment_ready:
      actionability !== "BLOCKED" && successMetrics.some((x) => x.baseline !== null),
    steps: playbook.steps,
    success_metrics: successMetrics,
    guardrails: [...playbook.guardrails, ...COMMON_GUARDRAILS],
    evidence: [
      opp.evidence,
      `priorité ${opp.priority} · score ${opp.priority_score} · confiance ${opp.confidence} · actionnabilité ${actionability}`,
    ],
    created_at: data.created_at,
  };
}

const byScoreThenId = (a: GrowthActionPlan, b: GrowthActionPlan): number =>
  b.priority_score - a.priority_score || a.id.localeCompare(b.id);

/**
 * Assemble la file : dédoublonnage par id (le plan au score le plus
 * haut l'emporte), puis remplissage des buckets disjoints
 * NOW / THIS_WEEK / BACKLOG / blocked.
 */
export function buildActionQueue(plans: GrowthActionPlan[]): GrowthActionQueue {
  const deduped = new Map<string, GrowthActionPlan>();
  for (const plan of plans) {
    const existing = deduped.get(plan.id);
    if (!existing || plan.priority_score > existing.priority_score) {
      deduped.set(plan.id, plan);
    }
  }

  const queue: GrowthActionQueue = { now: [], this_week: [], backlog: [], blocked: [] };
  for (const plan of deduped.values()) {
    if (plan.actionability === "BLOCKED") queue.blocked.push(plan);
    else if (plan.horizon === "NOW") queue.now.push(plan);
    else if (plan.horizon === "THIS_WEEK") queue.this_week.push(plan);
    else queue.backlog.push(plan);
  }
  queue.now.sort(byScoreThenId);
  queue.this_week.sort(byScoreThenId);
  queue.backlog.sort(byScoreThenId);
  queue.blocked.sort(byScoreThenId);
  return queue;
}

/**
 * P2.3 — entrée du moteur : recommendations + opportunités déjà
 * produites par le Decision Layer → plans d'action proposés. Fonction
 * pure : aucun accès base, aucun appel réseau, aucune écriture.
 */
export function buildActionPlans(input: BuildActionPlansInput): GrowthActionQueue {
  const { recommendations, opportunities } = input;
  const plans: GrowthActionPlan[] = [];
  for (const reco of recommendations) {
    const opp = opportunities.find((o) => o.type === reco.opportunity_type);
    if (!opp) continue;
    plans.push(buildActionPlan(reco, opp, input));
  }
  return buildActionQueue(plans);
}
