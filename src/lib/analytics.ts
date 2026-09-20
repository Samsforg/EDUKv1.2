"use client";

import { trackMarketing } from "./marketing";

// ============================================================
// Edukora Analytics — GA4 (gtag) + Microsoft Clarity + Marketing
// Événements métier centralisés. Respecte le consentement
// (cookie edukora_consent.analytics === true / marketing === true).
// ============================================================

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";

// ------------------------------------------------------------------
// Événements Edukora (noms stables : ne pas modifier sans mettre à
// jour les rapports GA4 / tableaux de bord)
// ------------------------------------------------------------------
export const EVENTS = {
  signupStarted: "signup_started",
  signupCompleted: "signup_completed",
  courseOpened: "course_opened",
  lessonStarted: "lesson_started",
  lessonCompleted: "lesson_completed",
  quizStarted: "quiz_started",
  quizCompleted: "quiz_completed",
  aiTutorOpened: "ai_tutor_opened",
  aiQuestionSent: "ai_question_sent",
  subscriptionStarted: "subscription_started",
  checkoutStarted: "begin_checkout",
  addPaymentInfo: "add_payment_info",
  ficheOpened: "fiche_opened",
  simulateurStarted: "simulateur_started",
  simulateurCompleted: "simulateur_completed",
  quotaExceeded: "quota_exceeded",
  loginCompleted: "login_completed",
  pushPermissionGranted: "push_permission_granted",
  pushPermissionDenied: "push_permission_denied",
  signupStep2Completed: "signup_step_2_completed",
  ficheRead: "fiche_read",
  ficheSaved: "fiche_saved",
  ficheUnsaved: "fiche_unsaved",
  referralCodeCopied: "referral_code_copied",
  referralLinkShared: "referral_link_shared",
  pricingVariantViewed: "pricing_variant_viewed",
  abTestVariant: "ab_test_variant",
} as const;

export type EdukoraEventName = (typeof EVENTS)[keyof typeof EVENTS];

declare global {
  interface Window {
    edukoraTrack?: (name: EdukoraEventName, params?: TrackParams, opts?: { dedupe?: boolean }) => void;
  }
}

// Expose trackEvent sur window pour les scripts inline (pages serveur).
export function attachGlobalTracker(): void {
  if (typeof window !== "undefined") {
    window.edukoraTrack = trackEvent;
    void refreshUserPlanCache();
  }
}

// ------------------------------------------------------------------
// Statut premium (dimension GA4) : chargé une fois par session depuis
// /api/auth/me, réutilisé par tous les événements (plan: free|premium).
// ------------------------------------------------------------------
const PLAN_CACHE_KEY = "edukora_plan";

async function refreshUserPlanCache(): Promise<void> {
  try {
    if (sessionStorage.getItem(PLAN_CACHE_KEY)) return;
    const res = await fetch("/api/auth/me", { credentials: "same-origin" });
    const d = await res.json();
    if (d?.user) {
      sessionStorage.setItem(
        PLAN_CACHE_KEY,
        d.user.is_premium === true ? "premium" : "free",
      );
    }
  } catch {
    // silencieux : la dimension plan sera absente si le cache n'est pas peuplé
  }
}

function userPlan(): "premium" | "free" | null {
  try {
    const p = sessionStorage.getItem(PLAN_CACHE_KEY);
    return p === "premium" || p === "free" ? p : null;
  } catch {
    return null;
  }
}

interface TrackParams {
  [key: string]: string | number | boolean | null | undefined;
}

function analyticsAccepted(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(
    /(?:^|; )edukora_consent=([^;]*)/,
  );
  if (!match) return false;
  try {
    const prefs = JSON.parse(decodeURIComponent(match[1]));
    return prefs.analytics === true;
  } catch {
    return false;
  }
}

// ------------------------------------------------------------------
// client_id GA4 réutilisable côté serveur (webhook → Measurement
// Protocol). Cookie `edukora_gacid` au format « cid.gid » de gtag.
// ------------------------------------------------------------------
function randomClientId(): string {
  const cid = Math.floor(Math.random() * 2 ** 48).toString();
  return `${cid}.${Date.now()}`;
}

export function ensureGaClientId(): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(/(?:^|; )edukora_gacid=([^;]*)/);
  if (m) return decodeURIComponent(m[1]);
  const cid = randomClientId();
  document.cookie =
    "edukora_gacid=" + encodeURIComponent(cid) + ";path=/;max-age=63072000;samesite=lax";
  return cid;
}

// ------------------------------------------------------------------
// Chargement des scripts (à appeler une fois, après consentement)
// ------------------------------------------------------------------
export function loadAnalyticsScripts(): void {
  if (typeof document === "undefined") return;
  if (!analyticsAccepted()) return;
  ensureGaClientId();
  if (!(window as any).edukora_analytics_loaded) {
    (window as any).edukora_analytics_loaded = true;
  }

  // --- GA4 ---
  if (GA_ID && !(window as any).edukora_gtag_loaded) {
    (window as any).edukora_gtag_loaded = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    const inline = document.createElement("script");
    inline.textContent = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: true });`;
    document.head.appendChild(inline);
  }

  // --- Clarity ---
  if (CLARITY_ID && !(window as any).edukora_clarity_loaded) {
    (window as any).edukora_clarity_loaded = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
    document.head.appendChild(script);
  }
}

// ------------------------------------------------------------------
// Envoi d'un événement vers GA4 + Clarity
// (dédupliqué par clé d'événement pour éviter les doubles comptes
//  dus au double rendu React / StrictMode)
// ------------------------------------------------------------------
const sentThisView = new Set<string>();

function sendToInternal(name: EdukoraEventName, params: TrackParams) {
  try {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: name, props: params, url: location.href }),
      keepalive: true,
    }).catch((err) => {
      if (process.env.NODE_ENV === "development") console.warn("[analytics] track failed:", err);
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.warn("[analytics] track failed:", err);
  }
}

export function trackEvent(
  name: EdukoraEventName,
  params: TrackParams = {},
  opts: { dedupe?: boolean } = {},
): void {
  if (typeof window === "undefined") return;
  // Toujours envoyer vers l'analytics interne gratuit (DB), même sans consentement (1st-party, anonymisable)
  sendToInternal(name, params);
  // Marketing pro (Meta/TikTok/Google Ads) — respecte son propre consentement marketing
  try {
    const map: Record<string, string> = {
      signup_completed: "CompleteRegistration",
      subscription_started: "Subscribe",
      begin_checkout: "InitiateCheckout",
      add_payment_info: "AddPaymentInfo",
      quiz_completed: "CompleteQuiz",
      lesson_completed: "CompleteLesson",
      simulateur_completed: "CompleteExam",
    };
    const mEvent = map[name];
    if (mEvent) trackMarketing(mEvent, params as Record<string, unknown>);
  } catch {}
  if (!analyticsAccepted()) return;

  const key = `${name}:${JSON.stringify(params).slice(0, 120)}`;
  if (opts.dedupe !== false && sentThisView.has(key)) return;
  if (opts.dedupe !== false) sentThisView.add(key);

  // Dimension globale : statut premium de l'utilisateur (free|premium)
  if (!("plan" in params) && (name.includes("quiz") || name.includes("fiche") || name.includes("lesson") || name.includes("simulateur") || name.includes("course"))) {
    const plan = userPlan();
    if (plan) params.plan = plan;
  }

  // GA4
  if (GA_ID && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, {
      ...params,
      event_source: "edukora",
    });
  }

  // Clarity : custom events (limités à 20 events custom par jour par session)
  if (CLARITY_ID && typeof (window as any).clarity === "function") {
    const clarityParams: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(params)) {
      if (typeof v === "string" || typeof v === "number") clarityParams[k] = v;
    }
    (window as any).clarity("event", name, clarityParams);
  }
}