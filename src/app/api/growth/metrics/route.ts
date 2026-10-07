import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getStore } from "@/lib/growth/data/store";
import { countFunnelForDay } from "@/lib/analytics-db";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  const s = await getStore();
  const metrics = await s.getLatestMetrics();
  return NextResponse.json({ metrics });
}

async function POSTHandler(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const rawDate = (body.date as string) ?? new Date().toISOString().split("T")[0];
  const date = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : new Date().toISOString().split("T")[0];

  // P1.0 — le comptage vit dans countFunnelForDay (analytics-db) : SQL
  // portable SQLite/PG + exclusion des comptes de test dès que l'identité
  // est disponible (les événements anonymes restent comptés). L'ancien SQL
  // inline (`COUNT(*)::text`, `created_at::date`) échouait silencieusement
  // sur SQLite (catch) → funnel vide → des 0 présentés comme réels.
  const funnel = await countFunnelForDay(date);

  // P0.8 / écart E1 — l'événement réellement émis s'appelle `pageview`
  // (src/components/EdukoraAnalytics.tsx), la taxonomie historique disait
  // `page_view`. Sans cette reconciliation les compteurs visitors/pageViews
  // restaient structurellement à 0. On normalise vers `page_view` pour ne
  // pas changer les lecteurs ni ignorer d'éventuelles lignes historiques.
  if (funnel["pageview"] !== undefined || funnel["page_view"] !== undefined) {
    funnel["page_view"] = (funnel["pageview"] ?? 0) + (funnel["page_view"] ?? 0);
  }

  const metrics = {
    date,
    signups: funnel["signup_completed"] ?? 0,
    activeUsers: funnel["_active_users"] ?? 0,
    premiumConversions: funnel["purchase"] ?? 0,
    referralCount: (funnel["referral_link_shared"] ?? 0) + (funnel["referral_code_copied"] ?? 0),
    quizCompletions: funnel["quiz_completed"] ?? 0,
    koraInteractions: (funnel["ai_question_sent"] ?? 0) + (funnel["ai_tutor_opened"] ?? 0),
    pageViews: funnel["page_view"] ?? 0,
  };

  const fullFunnel = {
    ...metrics,
    visitors: funnel["page_view"] ?? 0,
    signupStarted: funnel["signup_started"] ?? 0,
    loginCompleted: funnel["login_completed"] ?? 0,
    courseOpened: funnel["course_opened"] ?? 0,
    lessonStarted: funnel["lesson_started"] ?? 0,
    lessonCompleted: funnel["lesson_completed"] ?? 0,
    quizStarted: funnel["quiz_started"] ?? 0,
    simulateurStarted: funnel["simulateur_started"] ?? 0,
    simulateurCompleted: funnel["simulateur_completed"] ?? 0,
    ficheOpened: funnel["fiche_opened"] ?? 0,
    subscriptionStarted: funnel["subscription_started"] ?? 0,
    checkoutStarted: funnel["begin_checkout"] ?? 0,
    addPaymentInfo: funnel["add_payment_info"] ?? 0,
    purchase: funnel["purchase"] ?? 0,
    activation: funnel["activated"] ?? 0,
    quotaExceeded: funnel["quota_exceeded"] ?? 0,
    uniqueCheckouts: funnel["_unique_checkouts"] ?? 0,
    // P1.0 — rétention D7 : état NON DISPONIBLE explicite plutôt qu'un faux 0.
    // Le calcul exige des activations dont un retour intervient >= 7 jours
    // après ; la première activation remontable date de 2026-09-29 (premier
    // jour éligible : 2026-10-06, cf. docs/analytics-data-contract.md).
    retention: null,
    retentionStatus: "non_disponible:_retention_d7_historique_insuffisant",
  };

  const s = await getStore();
  await s.saveMetrics(metrics);

  return NextResponse.json({ ok: true, metrics: fullFunnel });
}

export const GET = GETHandler;
export const POST = POSTHandler;
