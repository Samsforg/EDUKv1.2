import type { InsightStatus, PriorityLabel } from "./types";

/**
 * P2.1 — seuils, tailles d'échantillon et échelle de priorité.
 *
 * Toutes les constantes du Decision Layer sont centralisées ici, testées
 * (tests/p21-growth-ai-foundation.test.ts) et documentées. Elles sont
 * DELIBEREMENT constantes : un seuil recalculé à chaque exécution rendrait
 * les décisions non reproductibles.
 *
 * Origine des seuils : cibles de référence du funnel EdTech (objectifs de
 * travail), jamais dérivées d'un seul utilisateur — d'où les gardes
 * MIN_SAMPLE qui interdisent toute décision forte sur petit échantillon.
 * Recalibrage explicite attendu en P2.2 quand ≥ 30 jours d'historique
 * exploitable seront accumulés.
 */

/** Échelle du score de priorité (§9 : 0 → 100). */
export const SCORE_SCALE = 100;

/**
 * §12 — tailles d'échantillon minimales, adaptées à chaque métrique.
 * Sous le minimum : status = INSUFFICIENT_DATA, aucune recommandation forte.
 */
export const MIN_SAMPLE = {
  /** Taux dont le dénominateur = visiteurs ou inscrits (§12 ex. 30). */
  traffic_rate: 30,
  /** Taux dont le dénominateur = checkouts débutés (volume plus rare). */
  checkout_rate: 10,
  /** Activations requises pour conclure sur la monétisation. */
  monetization: 30,
  /** Rétention : minimum de cohortes — en dessous, pas de recommandation. */
  retention: 30,
  /** Segment jugé représentatif pour fonder une décision ciblée. */
  segment: 30,
  /** Abonnés actifs minimum pour juger sain le revenue. */
  revenue_subs: 30,
} as const;

/** Seuils de décision §11 — comparer aux valeurs 0..1 calculées. */
export const THRESHOLDS = {
  /**
   * Taux signup → activation (activé / inscrits).
   * Cible de travail : 30 % des nouveaux inscrits atteignent une action
   * d'activation dans la période.
   */
  activation_rate: { min: 0.3 },
  /**
   * Taux visiteur → inscription (inscrits / pages vues).
   * < 10 % : acquisition faible. > 30 % : acquisition performante.
   */
  signup_rate: { min: 0.1, high: 0.3 },
  /**
   * Abandon de checkout (1 − achats / checkouts débutés).
   * Au-delà de 50 % d'abandon : le parcours paiement pose problème.
   */
  checkout_dropoff: { max: 0.5 },
  /**
   * Taux retour (visites de retour / pages vues).
   * < 20 % : les visiteurs ne reviennent pas assez.
   */
  return_visit_rate: { min: 0.2 },
} as const;

/**
 * §9 — buckets de priorité (bornes inclusives sur priority_score).
 * Constantes et testées : 80-100 CRITICAL, 60-79 HIGH, 40-59 MEDIUM,
 * 20-39 LOW, 0-19 IGNORE.
 */
export const PRIORITY_BUCKETS: ReadonlyArray<{ label: PriorityLabel; min: number; max: number }> = [
  { label: "CRITICAL", min: 80, max: 100 },
  { label: "HIGH", min: 60, max: 79 },
  { label: "MEDIUM", min: 40, max: 59 },
  { label: "LOW", min: 20, max: 39 },
  { label: "IGNORE", min: 0, max: 19 },
];

/**
 * §9 — gravité selon l'écart relatif entre valeur observée et seuil.
 * gap < SEVERITY_GAPS.low → low ; < medium → medium ; sinon high.
 * `critical` est réservé au score CRITICAL (voir rules.ts).
 */
export const SEVERITY_GAPS = { low: 0.2, medium: 0.5 } as const;

/**
 * §9 — composantes du score (détail des justifications dans scoring.ts) :
 *   impact     : écart observé vs seuil, saturé à SCORE_SCALE ;
 *   confidence : fiabilité liée à l'échantillon (linéaire jusqu'au min sample) ;
 *   urgency    : tendance récente vs période précédente (neutre si absente).
 *   priority_score = round(impact × confidence × urgency / 10000) ∈ [0,100].
 */
export const SCORE_FORMULA = {
  /** Diviseur : 100 × 100 pour normaliser le produit de trois facteurs 0..100. */
  divisor: SCORE_SCALE * SCORE_SCALE,
} as const;

/** §9 — table d'urgence (composante 0..100 de priority_score). */
export const URGENCY = {
  /** Pas de période précédente exploitable : neutre. */
  NO_TREND: 50,
  /** Stable ou en hausse : le problème n'est pas urgent. */
  STABLE: 40,
  /** Base quand la métrique se dégrade. */
  DECLINING_BASE: 60,
  /** Bonus linéaire : +1 par point de baisse %, plafonné ici (→ 100). */
  DECLINING_MAX_BONUS: 40,
} as const;

/** Durées par défaut du Decision Layer (fenêtre glissante en jours). */
export const PERIOD_DAYS = { current: 7, previous: 7, dormant_after: 14, dormant_lookback: 30 } as const;

/** Métriques de santé (§17) — libellés stables du dashboard. */
export const HEALTH_STAGES = ["acquisition", "activation", "conversion", "retention", "revenue"] as const;

/** Source par défaut signalée dans les payloads (agrégats, sans PII). */
export const SOURCE_ANALYTICS = "analytics_events (test users excluded)";
export const SOURCE_BUSINESS = "subscriptions + business-metrics (test users excluded)";
export const SOURCE_CONTRACT = "docs/analytics-data-contract.md (retention non fabricable en P2)";
/** P2.2 — source de la couche attribution (props signup + parrainage). */
export const SOURCE_ATTRIBUTION = "analytics_events.props (signup_completed) + users.referred_by (test users excluded)";

/**
 * Retention : le contrat P2 fige `retention: null` tant que l'historique
 * est insuffisant (n = 1). Le moteur ne recalcule JAMAIS une rétention
 * alternative : il reporte le statut officiel (§12, aucune fabrication).
 */
export const RETENTION_STATUS: InsightStatus = "INSUFFICIENT_DATA";

/**
 * P2.2 §3 — bornes d'attribution. Ce sont des LIMITES MATHÉMATIQUES de
 * la métrique (couverture maximale = 100 %, inconnu minimal = 0 %),
 * jamais des benchmarks marché : le moteur compare une valeur observée
 * à sa borne théorique, il ne juge jamais « bon / mauvais » (§9).
 */
export const ATTRIBUTION_LIMITS = {
  /** Couverture maximale théorique : tous les inscrits identifiés attribués. */
  coverage_full: 1,
  /** Inconnu minimal théorique : aucun inscrit identifié sans source. */
  unknown_min: 0,
} as const;

/**
 * P2.2 §8 — audit de recalibration des seuils (aucune valeur modifiée).
 *
 * Classification :
 *   CONTRACTUAL       — imposé par une règle métier / le cahier des charges ;
 *   WORKING           — cible de travail documentée, recalibrable avec data ;
 *   DATA-CALIBRATED   — recalibrable en priorité dès historique suffisant ;
 *   INSUFFICIENT_DATA — aucune modification justifiable aujourd'hui.
 *
 * `data_available` = état de l'historique réellement exploitable en
 * session (contrat P2 : rétention n = 1 ; aucun historique ≥ 30 jours
 * agrégé fourni). `confidence` = confiance dans la valeur actuelle du
 * seuil, pas dans la métrique mesurée. Aucun benchmark Côte d'Ivoire ni
 * EdTier externe n'a été introduit (§9 — aucun benchmark inventé).
 */
export interface ThresholdAuditEntry {
  threshold: string;
  value: string;
  classification: "CONTRACTUAL" | "WORKING" | "DATA-CALIBRATED" | "INSUFFICIENT_DATA";
  reason: string;
  minimum_sample: number;
  data_available: string;
  confidence: "high" | "medium" | "low";
  changed_in_p22: false;
}

export const THRESHOLD_AUDIT: readonly ThresholdAuditEntry[] = [
  {
    threshold: "THRESHOLDS.activation_rate.min",
    value: "0.30",
    classification: "WORKING",
    reason: "Cible de travail EdTech déclarée en P2.1 ; aucun contrat métier ni benchmark fourni ne l'impose.",
    minimum_sample: 30,
    data_available: "historique agrégé < 30 jours",
    confidence: "low",
    changed_in_p22: false,
  },
  {
    threshold: "THRESHOLDS.signup_rate.min",
    value: "0.10",
    classification: "WORKING",
    reason: "Seuil bas de détection d'une acquisition faible ; déclaratif P2.1, pas de donnée externe.",
    minimum_sample: 30,
    data_available: "historique agrégé < 30 jours",
    confidence: "low",
    changed_in_p22: false,
  },
  {
    threshold: "THRESHOLDS.signup_rate.high",
    value: "0.30",
    classification: "WORKING",
    reason: "Seuil haut de détection ; borné par la même famille de taux que le seuil bas.",
    minimum_sample: 30,
    data_available: "historique agrégé < 30 jours",
    confidence: "low",
    changed_in_p22: false,
  },
  {
    threshold: "THRESHOLDS.checkout_dropoff.max",
    value: "0.50",
    classification: "WORKING",
    reason: "Demi des checkouts abandonnés — repère de travail, pas un taux constaté Edukora.",
    minimum_sample: 10,
    data_available: "volumes checkout faibles",
    confidence: "low",
    changed_in_p22: false,
  },
  {
    threshold: "THRESHOLDS.return_visit_rate.min",
    value: "0.20",
    classification: "WORKING",
    reason: "Proxy de rétention court utilisé faute de rétention D7 disponible.",
    minimum_sample: 30,
    data_available: "rétention officielle n = 1",
    confidence: "low",
    changed_in_p22: false,
  },
  {
    threshold: "MIN_SAMPLE.traffic_rate / segment",
    value: "30",
    classification: "CONTRACTUAL",
    reason: "Garde d'échantillon du cahier P2.1 §12 (exemple contractuel « 30 ») : sous ce plancher, aucune décision forte.",
    minimum_sample: 30,
    data_available: "applicable dès aujourd'hui",
    confidence: "high",
    changed_in_p22: false,
  },
  {
    threshold: "MIN_SAMPLE.checkout_rate",
    value: "10",
    classification: "WORKING",
    reason: "Planter adapté à un volume d'événement plus rare (begin_checkout), resté volontairement bas.",
    minimum_sample: 10,
    data_available: "volumes checkout faibles",
    confidence: "medium",
    changed_in_p22: false,
  },
  {
    threshold: "MIN_SAMPLE.monetization / retention / revenue_subs",
    value: "30",
    classification: "WORKING",
    reason: "Plancher de décision sur monétisation/rétention/revenu ; même famille statistique que traffic_rate.",
    minimum_sample: 30,
    data_available: "rétention n = 1 ; abonnés actifs comptables en direct",
    confidence: "medium",
    changed_in_p22: false,
  },
  {
    threshold: "ATTRIBUTION_LIMITS.coverage_full",
    value: "1.0",
    classification: "CONTRACTUAL",
    reason: "Borne mathématique de la couverture (100 % = tous attribués) — pas un benchmark externe.",
    minimum_sample: 30,
    data_available: "calculable dès l'instant où des inscrits existent",
    confidence: "high",
    changed_in_p22: false,
  },
  {
    threshold: "ATTRIBUTION_LIMITS.unknown_min",
    value: "0.0",
    classification: "CONTRACTUAL",
    reason: "Borne mathématique du taux d'inconnu (0 % = aucune source inconnue).",
    minimum_sample: 30,
    data_available: "calculable dès l'instant où des inscrits existent",
    confidence: "high",
    changed_in_p22: false,
  },
  {
    threshold: "retention_d7 (rapport officiel)",
    value: "null — INSUFFICIENT_DATA",
    classification: "INSUFFICIENT_DATA",
    reason: "Contrat P2 : historique n = 1 < plancher 30 ; aucun recalibrage possible ni nécessaire.",
    minimum_sample: 30,
    data_available: "n = 1",
    confidence: "low",
    changed_in_p22: false,
  },
];

/**
 * P2.2 §14 — plafond de qualité de données : la confiance d'une
 * opportunité dépendant de l'attribution (canal, referral) est plafonnée
 * par la couverture d'attribution observée. Un grand volume de données
 * partielles ne peut pas produire une priorité maximale artificielle —
 * c'est le MÊME priority_score P2.1, seule la composante confidence
 * devient `min(confidence_sample, couverture × 100)`.
 */
export const DATA_QUALITY = {
  /** La couverture sert de plafond de confiance (0..100). */
  confidence_cap_from_coverage: true,
} as const;
