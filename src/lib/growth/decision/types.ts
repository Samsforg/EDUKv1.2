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
  | "retention_unavailable";

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
  | "ACQUISITION_STRENGTH";

/** §8 — actions proposées : propositions uniquement, jamais exécutées. */
export type GrowthActionType =
  | "OPTIMIZE_LANDING"
  | "IMPROVE_ONBOARDING"
  | "PROMOTE_COURSE"
  | "IMPROVE_KORA_ENTRY"
  | "REACTIVATE_USER"
  | "PROMOTE_SUBSCRIPTION"
  | "CREATE_CONTENT"
  | "RUN_CAMPAIGN";

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
  created_at: string;
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
  meta: {
    engine: "deterministic";
    external_calls: false;
    test_users_excluded: true;
    actions_executed: false;
  };
}
