/**
 * P2.1 — Growth AI Decision Layer : modèles conceptuels déterministes.
 *
 * Chaîne DATA → SIGNALS → SEGMENTS → OPPORTUNITIES → RECOMMENDATIONS →
 * ACTIONS PROPOSÉES. Ces structures sont produites par le moteur de règles
 * (aucune IA générative, aucun appel externe, 0 FCFA) et consommées par la
 * route admin read-only `/api/admin/growth/insights` et le panneau
 * `espace-admin/growth/GrowthInsightsPanel`.
 *
 * Rien n'est persisté en P2.1 : le même input produit toujours le même
 * output (idempotence par construction — `created_at` est injecté).
 */

/** §13 — statuts du contrat Growth Insight. */
export type InsightStatus = "VALID" | "INSUFFICIENT_DATA" | "UNAVAILABLE";

/** Gravité d'un signal — écart relatif au seuil (cf. thresholds.ts). */
export type SignalSeverity = "critical" | "high" | "medium" | "low" | "info";

/** Échelle de priorité §9 — buckets constants bornés par priority_score. */
export type PriorityLabel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "IGNORE";

/** §4 — types de signal (faits observés). */
export type SignalType =
  | "activation_rate_low"
  | "signup_rate_low"
  | "signup_rate_high"
  | "checkout_dropoff_high"
  | "purchase_rate_low"
  | "return_visit_low"
  | "retention_unavailable"
  // P2.2 — acquisition par canal
  | "channel_signup_strength"
  | "channel_activation_strength"
  | "channel_monetization_strength"
  | "channel_insufficient_data"
  // P2.2 — boucle de parrainage
  | "referral_signup_strength"
  | "referral_activation_strength"
  | "referral_monetization_strength"
  // P2.2 — attribution
  | "attribution_coverage"
  | "unknown_source_rate";

/** §5 — segments déterministes, tous fondés sur des données réelles. */
export type SegmentKey =
  | "NEW_VISITOR"
  | "REGISTERED_NOT_ACTIVATED"
  | "ACTIVATED_NOT_PAID"
  | "PAID_USER"
  | "RETURNING_USER"
  | "HIGH_INTENT"
  | "DORMANT_USER";

/** §6 — types d'opportunité issus du rule engine. */
export type OpportunityType =
  | "ACTIVATION_BOTTLENECK"
  | "CHECKOUT_DROPOFF"
  | "MONETIZATION_OPPORTUNITY"
  | "RETENTION_OPPORTUNITY"
  | "ACQUISITION_WEAKNESS"
  | "ACQUISITION_STRENGTH"
  // P2.2 — canal, parrainage, attribution
  | "CHANNEL_ACTIVATION_GAP"
  | "REFERRAL_ACTIVATION_GAP"
  | "ATTRIBUTION_GAP";

/** §8 — actions proposées : propositions uniquement, jamais exécutées. */
export type GrowthActionType =
  | "OPTIMIZE_LANDING"
  | "IMPROVE_ONBOARDING"
  | "PROMOTE_COURSE"
  | "IMPROVE_KORA_ENTRY"
  | "REACTIVATE_USER"
  | "PROMOTE_SUBSCRIPTION"
  | "CREATE_CONTENT"
  | "RUN_CAMPAIGN"
  // P2.2 — propositions d'amélioration du data produit
  | "IMPROVE_ATTRIBUTION"
  | "IMPROVE_REFERRAL_LOOP";

/** §4 — un signal est un fait observé, jamais une action. */
export interface GrowthSignal {
  id: string;
  type: SignalType;
  /** Clé métrique du funnel (`activation_rate`, `checkout_dropoff`, …). */
  metric: string;
  /** Taux 0..1 ou comptage réel ; null uniquement si dénominateur nul. */
  value: number | null;
  /** Seuil documenté comparé à `value` (cf. thresholds.ts). */
  threshold: number;
  /** Fenêtre analysée, ex. `1999-01-01/1999-01-07` (7 jours). */
  period: string;
  severity: SignalSeverity;
  /** Source de données agrégées, sans PII. */
  source: string;
  status: InsightStatus;
  created_at: string;
}

/** §5 — segment : comptage réel + fiabilité décisionnelle. */
export interface GrowthSegment {
  key: SegmentKey;
  /** Comptage réel (0 possible — jamais fabriqué). */
  count: number;
  status: InsightStatus;
  /** Taille d'échantillon derrière le comptage (= count). */
  sample_size: number;
  min_sample: number;
  source: string;
  created_at: string;
}

/** §6 — opportunité identifiée à partir de signaux réels. */
export interface GrowthOpportunity {
  id: string;
  type: OpportunityType;
  segment: SegmentKey | null;
  /** Preuve chiffrée, ex. `signup_completed = 100 · activated = 28`. */
  evidence: string;
  /** 0..100 — écart observé vs seuil (cf. scoring.computeImpact). */
  impact: number;
  /** 0..100 — fiabilité liée à la taille d'échantillon. */
  confidence: number;
  /** 0..100 — actualité du problème (tendance récente). */
  urgency: number;
  /** 0..100 — round(impact × confidence × urgency / 10000). */
  priority_score: number;
  priority: PriorityLabel;
  status: InsightStatus;
  created_at: string;
}

/** §8 — action proposée : `mode` est toujours "PROPOSED" en P2.1. */
export interface GrowthAction {
  type: GrowthActionType;
  mode: "PROPOSED";
  segment: SegmentKey | null;
  note: string;
}

/** §7 — recommandation : WHAT / WHY / FOR WHOM / WHEN / IMPACT / CONFIDENCE. */
export interface GrowthRecommendation {
  id: string;
  what: string;
  why: string;
  for_whom: SegmentKey | null;
  when: "immediately" | "this_week" | "next_cycle";
  expected_impact: string;
  /** 0..100 — reprise de la confiance de l'opportunité associée. */
  confidence: number;
  priority: PriorityLabel;
  priority_score: number;
  opportunity_type: OpportunityType;
  /** P2.2 §15 — preuve chiffrée reprise de l'opportunité. */
  evidence: string;
  /** P2.2 §15 — urgence 0..100 reprise de l'opportunité. */
  urgency: number;
  /** L'action reste une proposition : aucun envoi, aucune publication. */
  action: GrowthAction;
  status: InsightStatus;
  created_at: string;
}

/** §13 — contrat stable d'un insight métrique. */
export interface GrowthInsight {
  metric: string;
  period: string;
  sample_size: number;
  value: number | null;
  /** Seuil/benchmark documenté — null si la métrique n'en a pas. */
  benchmark: number | null;
  status: InsightStatus;
  signal: GrowthSignal | null;
  opportunity: GrowthOpportunity | null;
  recommendation: GrowthRecommendation | null;
  priority: PriorityLabel | null;
  confidence: number | null;
}

/** §17 — Growth Health par étape du funnel. */
export type HealthStage = "acquisition" | "activation" | "conversion" | "retention" | "revenue";

/** GOOD = bon état ; LOW/MEDIUM/HIGH = sévérité du problème observé. */
export type HealthRating = "GOOD" | "LOW" | "MEDIUM" | "HIGH" | "INSUFFICIENT_DATA";

export interface GrowthHealth {
  stage: HealthStage;
  rating: HealthRating;
  metric: string;
  value: number | null;
  benchmark: number | null;
  status: InsightStatus;
}

/**
 * Input du moteur — agrégats réels provenant de `data.ts`
 * (analytics_events test-exclus + sources business). Aucune PII.
 */
export interface GrowthData {
  period: { from: string; to: string; days: number };
  previous_period: { from: string; to: string; days: number };
  /** Agrégats `countFunnelForDay` sommés sur la période (clés EVENT). */
  funnel: Record<string, number>;
  /** Même agrégats sur la période précédente (tendances). */
  previous_funnel: Record<string, number>;
  /** Comptages réels par segment (test users exclus). */
  segments: Record<SegmentKey, number>;
  /** false si les requêtes segments ont échoué (table absente…). */
  segments_available: boolean;
  revenue: {
    mrr_cents: number;
    active_subs: number;
    /** false si les requêtes business ont échoué (pas de faux 0). */
    available: boolean;
    source: string;
  };
  /** Rétention D7 officielle — non fabriquée (contrat P2). */
  retention: { available: boolean; value: number | null; status: InsightStatus };
  /**
   * P2.2 — couche d'attribution (optionnelle pour préserver le contrat
   * d'entrée P2.1) : lignes par canal, par référent, couverture.
   * Absente → aucune règle P2.2 évaluée, sections du bundle vides.
   */
  intelligence?: GrowthIntelligenceData;
  created_at: string;
}

/** P2.2 — agrégat brut par canal (sortie SQL, avant normalisation). */
export interface ChannelRow {
  channel: string;
  signups: number;
  activated: number;
  subscriptions: number;
  /** Revenu actif agrégé en centimes (source : subscriptions.status='active'). */
  revenue_cents: number;
}

/** P2.2 — agrégat brut par référent (sortie SQL, avant normalisation). */
export interface ReferralRow {
  /** Code parrainage (identifiant public — jamais de nom, ni de PII). */
  referral: string;
  signups: number;
  activated: number;
  subscriptions: number;
  revenue_cents: number;
}

/** P2.2 — source d'acquisition classée (§4 : priorité utm → clic → referral). */
export type AttributionSourceType = "utm" | "paid_click" | "referral" | "unknown";

/**
 * P2.2 — couche d'attribution agrégée (§11, §12).
 * `coverageRate` = inscrits attribués / inscrits identifiés (null si 0).
 */
export interface AttributionCoverage {
  attributed: number;
  unattributed: number;
  coverageRate: number | null;
  status: InsightStatus;
  /** Métrique retenue : couverture d'attribution des INSCRITS (§9). */
  basis: "signups_identified";
}

/** P2.2 — répartition des inscrits par classe de source (§12). */
export interface SourceBreakdown {
  by_type: Record<AttributionSourceType, number>;
  unknown_rate: number | null;
  status: InsightStatus;
}

/** P2.2 — agrégats d'attribution calculés par `data.ts`. */
export interface GrowthAttributionSummary {
  coverage: AttributionCoverage;
  sources: SourceBreakdown;
  /** Canal dominant par volume d'inscrits (classement factuel, pas un « best of »). */
  top_source: string | null;
  source: string;
}

/**
 * P2.2 §5 — performance par canal. `visitors` est null tant que les
 * page_view ne portent pas d'attribution (aucun faux 0 — §2).
 */
export interface GrowthChannelPerformance {
  channel: string;
  visitors: number | null;
  signups: number;
  activated: number;
  subscriptions: number;
  /** Revenu actif en centimes. */
  revenue: number;
  signupRate: number | null;
  activationRate: number | null;
  conversionRate: number | null;
  status: InsightStatus;
  sample_size: number;
  min_sample: number;
}

/**
 * P2.2 §6 — performance par référent. `visitors` non attribuable par
 * référent (page_view sans lien de parrainage) → null documenté.
 */
export interface GrowthReferralPerformance {
  /** Code de parrainage uniquement (jamais nom/email du parrain). */
  referral: string;
  visitors: number | null;
  signups: number;
  activated: number;
  subscriptions: number;
  revenue: number;
  activationRate: number | null;
  conversionRate: number | null;
  status: InsightStatus;
  sample_size: number;
  min_sample: number;
}

/** P2.2 — input de la couche attribution (agréé par data.ts). */
export interface GrowthIntelligenceData {
  channels: ChannelRow[];
  referrals: ReferralRow[];
  attribution: GrowthAttributionSummary;
  /** false si les requêtes d'attribution ont échoué (pas de faux 0). */
  available: boolean;
}

// ── P2.3 — Growth Action Engine (§3-§18) ──────────────────────────────

/**
 * P2.3 §6 — actionnabilité d'une proposition, dérivée des données déjà
 * calculées (statut, confiance, score) :
 *   HIGH    — échantillon fiable + score élevé ;
 *   MEDIUM  — échantillon fiable + score intermédiaire ;
 *   LOW     — échantillon fiable + score bas ;
 *   BLOCKED — le constat n'est pas actionnable aujourd'hui (statut non
 *             VALID ou confiance sous plancher) → aucune action fondée.
 */
export type Actionability = "HIGH" | "MEDIUM" | "LOW" | "BLOCKED";

/** P2.3 §7 — bande de priorité d'action (bornes documentées dans action-plans). */
export type ActionPriorityBand = "P0" | "P1" | "P2" | "P3";

/** P2.3 §8 — horizon d'exécution proposé (pas d'ordonnancement automatique). */
export type ActionHorizon = "NOW" | "THIS_WEEK" | "BACKLOG";

/** P2.3 §12 — métriques de succès contractuelles (aucune autre n'est fabriquée). */
export type ActionMetricKey =
  | "signup_rate"
  | "activation_rate"
  | "checkout_dropoff"
  | "purchase_rate"
  | "return_visit_rate"
  | "attribution_coverage"
  | "subscription_count"
  | "conversion_rate";

/**
 * P2.3 §13 — origine de la cible : soit un seuil documenté de
 * thresholds.ts, soit aucun cible calibrée aujourd'hui (target null).
 */
export type TargetCalibration = "THRESHOLD_BASED" | "TARGET_NOT_CALIBRATED";

/** P2.3 §12 — métrique de succès : baseline réelle, cible justifiée ou null. */
export interface GrowthActionMetric {
  metric: ActionMetricKey;
  /** Valeur observée sur la période — null si le dénominateur est nul. */
  baseline: number | null;
  /** Cible documentée — null si TARGET_NOT_CALIBRATED (jamais inventée). */
  target: number | null;
  direction: "UP" | "DOWN" | "STABLE";
  minimum_sample: number;
  target_calibration: TargetCalibration;
}

/**
 * P2.3 §5 — plan d'action : PROPOSITION uniquement. Aucun statut
 * d'exécution n'existe (`mode`/`status` sont figés à "PROPOSED",
 * `steps` sont les étapes proposées à un humain, jamais déléguées).
 */
export interface GrowthActionPlan {
  id: string;
  opportunity_id: string;
  recommendation_id: string;
  opportunity_type: OpportunityType;
  action_type: GrowthActionType;
  title: string;
  objective: string;
  target_segment: SegmentKey | null;
  /** Canal concerné (extrait des données) — null si non applicable. */
  channel: string | null;
  priority_score: number;
  action_priority: ActionPriorityBand;
  actionability: Actionability;
  /** Libellé d'urgence dérivé de l'urgence 0..100 de l'opportunité. */
  urgency: string;
  effort: "LOW" | "MEDIUM" | "HIGH";
  /** Libellé d'impact attendu dérivé de l'impact 0..100 de l'opportunité. */
  expected_impact: "LOW" | "MEDIUM" | "HIGH";
  mode: "PROPOSED";
  status: "PROPOSED";
  horizon: ActionHorizon;
  /** true si une baseline existe pour au moins une métrique de succès. */
  experiment_ready: boolean;
  steps: string[];
  success_metrics: GrowthActionMetric[];
  guardrails: string[];
  evidence: string[];
  created_at: string;
}

/**
 * P2.3 §9 — file d'actions par horizon. Buckets disjoints : une action
 * BLOCKED n'appartient qu'au bucket `blocked` (jamais aux horizons).
 */
export interface GrowthActionQueue {
  now: GrowthActionPlan[];
  this_week: GrowthActionPlan[];
  backlog: GrowthActionPlan[];
  blocked: GrowthActionPlan[];
}

/** Sortie complète du Decision Layer (§17 dashboard + §13 contract). */
export interface GrowthInsightBundle {
  generated_at: string;
  period: { from: string; to: string; days: number };
  health: GrowthHealth[];
  segments: GrowthSegment[];
  signals: GrowthSignal[];
  opportunities: GrowthOpportunity[];
  recommendations: GrowthRecommendation[];
  insights: GrowthInsight[];
  /** P2.2 — attribution (§11-§12) : couverture et sources. */
  attribution: {
    coverage: AttributionCoverage;
    sources: SourceBreakdown;
    top_source: string | null;
    status: InsightStatus;
  };
  /** P2.2 — performance par canal (§5), triée par signups décroissant. */
  channels: GrowthChannelPerformance[];
  /** P2.2 — performance par référent (§6), triée par signups décroissant. */
  referrals: GrowthReferralPerformance[];
  /** P2.3 — plans d'action proposés, classés par horizon (§9). */
  actions: GrowthActionQueue;
  meta: {
    engine: "deterministic";
    external_calls: false;
    test_users_excluded: true;
    actions_executed: false;
  };
}
