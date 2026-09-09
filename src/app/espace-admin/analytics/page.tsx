import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { query } from "@/lib/db";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  let total = 0;
  let byEvent: { event: string; c: number }[] = [];
  let recent: { id: number; event: string; url: string | null; created_at: string; user_id: number | null }[] = [];
  const funnel: { signup: number; quiz: number; lesson: number; sub: number } = { signup: 0, quiz: 0, lesson: 0, sub: 0 };
  let revenue: { total_cents: number; count: number; this_month_cents: number; this_month_count: number } = { total_cents: 0, count: 0, this_month_cents: 0, this_month_count: 0 };
  let conversion: { signups_7d: number; subs_7d: number; rate: number } = { signups_7d: 0, subs_7d: 0, rate: 0 };
  try {
    const t = await query<{ c: number }>("SELECT COUNT(*) AS c FROM analytics_events");
    total = t[0]?.c ?? 0;
    byEvent = await query<{ event: string; c: number }>(
      "SELECT event, COUNT(*) AS c FROM analytics_events WHERE created_at >= datetime('now','-7 days') GROUP BY event ORDER BY c DESC LIMIT 20"
    );
    recent = await query<{ id: number; event: string; url: string | null; created_at: string; user_id: number | null }>(
      "SELECT id, event, url, created_at, user_id FROM analytics_events ORDER BY id DESC LIMIT 50"
    );
    const f = await query<{ event: string; c: number }>(
      "SELECT event, COUNT(*) AS c FROM analytics_events WHERE event IN ('signup_completed','quiz_completed','lesson_completed','subscription_started') AND created_at >= datetime('now','-7 days') GROUP BY event"
    );
    f.forEach((r) => {
      if (r.event === "signup_completed") funnel.signup = r.c;
      if (r.event === "quiz_completed") funnel.quiz = r.c;
      if (r.event === "lesson_completed") funnel.lesson = r.c;
      if (r.event === "subscription_started") funnel.sub = r.c;
    });
    // Revenue from subscriptions table
    const rev = await query<{ total_cents: number; count: number }>(
      "SELECT COALESCE(SUM(price_cents), 0) AS total_cents, COUNT(*) AS count FROM subscriptions WHERE status = 'active'"
    );
    const revMonth = await query<{ total_cents: number; count: number }>(
      "SELECT COALESCE(SUM(price_cents), 0) AS total_cents, COUNT(*) AS count FROM subscriptions WHERE status = 'active' AND created_at >= date('now','start of month')"
    );
    revenue = {
      total_cents: rev[0]?.total_cents ?? 0,
      count: rev[0]?.count ?? 0,
      this_month_cents: revMonth[0]?.total_cents ?? 0,
      this_month_count: revMonth[0]?.count ?? 0,
    };
    // Conversion rate
    const signups7d = await query<{ c: number }>(
      "SELECT COUNT(*) AS c FROM analytics_events WHERE event = 'signup_completed' AND created_at >= datetime('now','-7 days')"
    );
    const subs7d = await query<{ c: number }>(
      "SELECT COUNT(*) AS c FROM analytics_events WHERE event = 'subscription_started' AND created_at >= datetime('now','-7 days')"
    );
    conversion = {
      signups_7d: signups7d[0]?.c ?? 0,
      subs_7d: subs7d[0]?.c ?? 0,
      rate: signups7d[0]?.c ? Math.round(((subs7d[0]?.c ?? 0) / signups7d[0].c) * 100) : 0,
    };
  } catch {
    // table not yet created
  }

  return (
    <AdminShell active="overview">
      <h2 className="font-display text-[28px] font-bold text-on-surface mb-1">Analytics interne (gratuit)</h2>
      <p className="text-on-surface-variant mb-6">PostHog-like self-hosted — 1st-party, capture pageview + events via /api/analytics/track → analytics_events.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl">
          <p className="text-label-sm text-on-surface-variant">Total events</p>
          <p className="text-headline-md font-bold text-primary">{total.toLocaleString("fr-FR")}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl">
          <p className="text-label-sm text-on-surface-variant">Events 7j</p>
          <p className="text-headline-md font-bold text-primary">{byEvent.reduce((s, r) => s + r.c, 0).toLocaleString("fr-FR")}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl">
          <p className="text-label-sm text-on-surface-variant">Types 7j</p>
          <p className="text-headline-md font-bold text-primary">{byEvent.length}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl">
          <p className="text-label-sm text-on-surface-variant">Revenus totaux</p>
          <p className="text-headline-md font-bold text-green-700">{(revenue.total_cents / 100).toLocaleString("fr-FR")} FCFA</p>
          <p className="text-label-xs text-on-surface-variant mt-1">{revenue.count} abonnement{revenue.count > 1 ? "s" : ""}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl">
          <p className="text-label-sm text-on-surface-variant">Revenus ce mois</p>
          <p className="text-headline-md font-bold text-green-700">{(revenue.this_month_cents / 100).toLocaleString("fr-FR")} FCFA</p>
          <p className="text-label-xs text-on-surface-variant mt-1">{revenue.this_month_count} nouveau{revenue.this_month_count > 1 ? "x" : ""}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl">
          <p className="text-label-sm text-on-surface-variant">Taux de conversion 7j</p>
          <p className="text-headline-md font-bold text-primary">{conversion.rate}%</p>
          <p className="text-label-xs text-on-surface-variant mt-1">{conversion.subs_7d} abonnés / {conversion.signups_7d} inscrits</p>
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4">
        <h3 className="font-semibold mb-3">Entonnoir 7j (funnel)</h3>
        <div className="grid grid-cols-4 gap-2 text-center text-sm">
          {[
            { label: "Inscriptions", v: funnel.signup },
            { label: "Quiz", v: funnel.quiz, pct: funnel.signup ? Math.round((funnel.quiz / funnel.signup) * 100) : 0 },
            { label: "Leçons", v: funnel.lesson, pct: funnel.quiz ? Math.round((funnel.lesson / funnel.quiz) * 100) : 0 },
            { label: "Abonnements", v: funnel.sub, pct: funnel.signup ? Math.round((funnel.sub / funnel.signup) * 100) : 0 },
          ].map((s) => (
            <div key={s.label} className="bg-surface rounded-lg p-3 border border-outline-variant">
              <p className="font-bold text-primary text-lg">{s.v}</p>
              <p className="text-xs text-on-surface-variant">{s.label}</p>
              {typeof s.pct === "number" && <p className="text-xs text-tertiary font-bold mt-1">{s.pct}%</p>}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
          <h3 className="font-semibold mb-3">Top events (7j)</h3>
          {byEvent.length === 0 ? <p className="text-sm text-on-surface-variant">Aucun événement.</p> : (
            <div className="space-y-2">
              {byEvent.map((r) => (
                <div key={r.event} className="flex justify-between text-sm border-b border-outline-variant/50 py-1.5">
                  <span className="font-medium">{r.event}</span><span className="text-primary font-bold">{r.c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
          <h3 className="font-semibold mb-3">Derniers events</h3>
          {recent.length === 0 ? <p className="text-sm text-on-surface-variant">Aucun.</p> : (
            <div className="max-h-[480px] overflow-auto divide-y divide-outline-variant/50 text-xs">
              {recent.map((r) => (
                <div key={r.id} className="py-2 flex justify-between gap-2">
                  <span className="font-mono">{r.event}</span>
                  <span className="text-on-surface-variant truncate max-w-[180px]">{r.url ?? ""}</span>
                  <span className="text-on-surface-variant">{new Date(r.created_at).toLocaleString("fr-FR")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
