// ─── AI Provider Abstraction ───────────────────────────────────────
export interface AIProvider {
  readonly name: string;
  isAvailable(): boolean;
  generate(opts: { system: string; prompt: string; maxTokens?: number; temperature?: number }): Promise<string>;
}

// ─── Growth Strategy ───────────────────────────────────────────────
export interface GrowthStrategy {
  id: string;
  date: string;
  objective: string;
  audience: string;
  hook: string;
  strategy: string;
  kpis: string[];
  status: "draft" | "validated" | "archived";
  createdAt: string;
}

// ─── Content ───────────────────────────────────────────────────────
export type ContentPlatform = "facebook" | "tiktok" | "whatsapp";

export interface Content {
  id: string;
  strategyId: string;
  platform: ContentPlatform;
  text: string;
  hashtags: string[];
  cta: string;
  visualPrompt?: string;
  score?: number;
  status: "draft" | "validated" | "archived";
  createdAt: string;
}

// ─── Metrics ───────────────────────────────────────────────────────
export interface Metrics {
  date: string;
  signups: number;
  activeUsers: number;
  premiumConversions: number;
  referralCount: number;
  quizCompletions: number;
  koraInteractions: number;
  pageViews: number;
  utm?: Record<string, string>;
}

// ─── Recommendation ────────────────────────────────────────────────
export interface Recommendation {
  id: string;
  date: string;
  type: "content" | "campaign" | "audience" | "timing";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedImpact: string;
  createdAt: string;
}

// ─── Analytics Events ──────────────────────────────────────────────
export type AnalyticsEventType =
  | "page_view"
  | "signup_started"
  | "signup_completed"
  | "login_completed"
  | "course_opened"
  | "lesson_started"
  | "lesson_completed"
  | "quiz_started"
  | "quiz_completed"
  | "ai_tutor_opened"
  | "ai_question_sent"
  | "simulateur_started"
  | "simulateur_completed"
  | "fiche_opened"
  | "fiche_read"
  | "fiche_saved"
  | "fiche_unsaved"
  | "subscription_started"
  | "begin_checkout"
  | "add_payment_info"
  | "purchase"
  | "referral_code_copied"
  | "referral_link_shared"
  | "pricing_variant_viewed"
  | "quota_exceeded";

export interface AnalyticsEvent {
  event: AnalyticsEventType;
  userId?: number;
  sessionId?: string;
  url?: string;
  utm?: Record<string, string>;
  metadata?: Record<string, unknown>;
  timestamp: string;
}
