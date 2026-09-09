import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getStore } from "@/lib/growth/data/store";
import { query } from "@/lib/db";

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
  const date = (body.date as string) ?? new Date().toISOString().split("T")[0];

  const funnel: Record<string, number> = {};

  try {
    const rows = await query<{ event: string; c: string }>(
      `SELECT event, COUNT(*)::text AS c FROM analytics_events
       WHERE created_at::date = $1::date
       GROUP BY event`, date
    );
    for (const r of rows) funnel[r.event] = Number(r.c);

    const activeRow = await query<{ c: string }>(
      `SELECT COUNT(DISTINCT user_id)::text AS c FROM analytics_events
       WHERE created_at::date = $1::date AND user_id IS NOT NULL`, date
    );
    funnel["_active_users"] = Number(activeRow[0]?.c ?? 0);

    const pricingRow = await query<{ c: string }>(
      `SELECT COUNT(DISTINCT user_id)::text AS c FROM analytics_events
       WHERE event = 'begin_checkout' AND created_at::date = $1::date`, date
    );
    funnel["_unique_checkouts"] = Number(pricingRow[0]?.c ?? 0);
  } catch {
    // analytics_events may not exist
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
    quotaExceeded: funnel["quota_exceeded"] ?? 0,
    uniqueCheckouts: funnel["_unique_checkouts"] ?? 0,
  };

  const s = await getStore();
  await s.saveMetrics(metrics);

  return NextResponse.json({ ok: true, metrics: fullFunnel });
}

export const GET = GETHandler;
export const POST = POSTHandler;
