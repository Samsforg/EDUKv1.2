import type { AnalyticsEvent } from "../ai/types";

const TRACKED_EVENTS = [
  "page_view", "signup_started", "signup_completed",
  "login_completed",
  "course_opened", "lesson_started", "lesson_completed",
  "quiz_started", "quiz_completed",
  "ai_tutor_opened", "ai_question_sent",
  "simulateur_started", "simulateur_completed",
  "fiche_opened", "fiche_read", "fiche_saved", "fiche_unsaved",
  "subscription_started", "begin_checkout", "add_payment_info", "purchase",
  "referral_code_copied", "referral_link_shared",
  "pricing_variant_viewed",
  "quota_exceeded",
] as const;

export type ValidEvent = (typeof TRACKED_EVENTS)[number];

export function isValidEvent(event: string): event is ValidEvent {
  return (TRACKED_EVENTS as readonly string[]).includes(event);
}

export function parseUTM(url: string): Record<string, string> {
  try {
    const u = new URL(url);
    const utm: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
      const v = u.searchParams.get(key);
      if (v) utm[key] = v;
    }
    return utm;
  } catch {
    return {};
  }
}

export function buildEvent(params: {
  event: string;
  userId?: number;
  sessionId?: string;
  url?: string;
  metadata?: Record<string, unknown>;
}): AnalyticsEvent | null {
  if (!isValidEvent(params.event)) return null;
  return {
    event: params.event,
    userId: params.userId,
    sessionId: params.sessionId,
    url: params.url,
    utm: params.url ? parseUTM(params.url) : undefined,
    metadata: params.metadata,
    timestamp: new Date().toISOString(),
  };
}
