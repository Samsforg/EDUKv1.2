import type { GrowthData, GrowthSegment, SegmentKey } from "./types";
import { MIN_SAMPLE } from "./thresholds";

/**
 * P2.1 — segments déterministes (§5).
 *
 * Construits exclusivement à partir de comptages réels fournis par
 * `data.ts` (analytics_events / subscriptions, test users exclus).
 * Interdits par le cahier : HIGH_VALUE_USER, PARENT, STUDENT, TEACHER —
 * ces informations ne sont pas fiables dans les données actuelles.
 *
 * Le `count` est toujours le comptage réel (0 compris) ; le `status`
 * reflète la fiabilité décisionnelle (>= MIN_SAMPLE.segment → VALID).
 */

/** Ordre stable d'affichage du dashboard. */
export const SEGMENT_KEYS: readonly SegmentKey[] = [
  "NEW_VISITOR",
  "REGISTERED_NOT_ACTIVATED",
  "ACTIVATED_NOT_PAID",
  "PAID_USER",
  "RETURNING_USER",
  "HIGH_INTENT",
  "DORMANT_USER",
] as const;

/**
 * Source de chaque comptage (requête exécutée par data.ts, sans PII) :
 *  - NEW_VISITOR              : pages vues de la période (proxy visite —
 *                               session_id est fréquemment NULL, cf. P2) ;
 *  - REGISTERED_NOT_ACTIVATED : inscrits distincts de la période sans aucun
 *                               événement `activated` ;
 *  - ACTIVATED_NOT_PAID       : distincts `activated` sans `purchase` ni
 *                               abonnement actif ;
 *  - PAID_USER                : abonnements `status='active'` (non-test) ;
 *  - RETURNING_USER           : users avec activité sur 2+ jours distincts
 *                               de la période (P2.5.2 : user-based via
 *                               user_id, remplace le device-level
 *                               `return_visit` qui reste émis mais n'est
 *                               plus la source de vérité du segment) ;
 *  - HIGH_INTENT              : distincts `begin_checkout` sans achat ni
 *                               abonnement actif ;
 *  - DORMANT_USER             : distincts ayant eu une activité entre J-30
 *                               et J-14 et aucune activité depuis J-14.
 */
export const SEGMENT_SOURCES: Record<SegmentKey, string> = {
  NEW_VISITOR: "analytics_events.page_view (période, test users excluded)",
  REGISTERED_NOT_ACTIVATED: "analytics_events.signup_completed DISTINCT sans activated (période, test users excluded)",
  ACTIVATED_NOT_PAID: "analytics_events.activated DISTINCT sans purchase ni subscription active (période, test users excluded)",
  PAID_USER: "subscriptions.status='active' (test users excluded)",
  RETURNING_USER: "analytics_events.user_id actif 2+ jours distincts (période, test users excluded)",
  HIGH_INTENT: "analytics_events.begin_checkout DISTINCT sans purchase ni subscription active (période, test users excluded)",
  DORMANT_USER: "analytics_events activité J-30→J-14, aucune activité depuis J-14 (test users excluded)",
};

export function buildSegments(data: GrowthData): GrowthSegment[] {
  const min = MIN_SAMPLE.segment;
  const createdAt = data.created_at;
  return SEGMENT_KEYS.map((key) => {
    const count = data.segments[key] ?? 0;
    const status = !data.segments_available
      ? "UNAVAILABLE"
      : count >= min
        ? "VALID"
        : "INSUFFICIENT_DATA";
    return {
      key,
      count,
      status,
      sample_size: count,
      min_sample: min,
      source: SEGMENT_SOURCES[key],
      created_at: createdAt,
    };
  });
}
