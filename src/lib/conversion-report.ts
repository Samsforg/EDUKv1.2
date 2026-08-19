import { query, queryOne, type SqlParam } from "@/lib/db";

export interface ConversionStats {
  date: string;
  new_users_today: number;
  new_users_week: number;
  total_users: number;
  subscriptions_active: number;
  subscriptions_today: number;
  revenue_today_cents: number;
  revenue_week_cents: number;
  revenue_month_cents: number;
  avg_revenue_today_cents: number;
  cancelled_today: number;
  mrr_cents: number;
  conversion_rate: number;
  top_plan: string;
  plans: { name: string; count: number; revenue_cents: number }[];
  trends: { date: string; users: number; subs: number }[];
}

const todayStr = () => new Date().toISOString().slice(0, 10);
const dayStr = (offset: number) =>
  new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);

export async function getConversionStats(days = 7): Promise<ConversionStats> {
  const today = todayStr();

  const count = async (sql: string, ...args: SqlParam[]) =>
    (await queryOne<{ c: number }>(sql, ...args))?.c ?? 0;

  const totalUsers = await count("SELECT COUNT(*) AS c FROM users");
  const newUsersToday = await count("SELECT COUNT(*) AS c FROM users WHERE substr(created_at,1,10) = ?", today);
  const newUsersWeek = await count("SELECT COUNT(*) AS c FROM users WHERE created_at >= datetime('now','-7 days')");

  const activeSubs = await count("SELECT COUNT(*) AS c FROM subscriptions WHERE status = 'active'");
  const subsToday = await count(
    "SELECT COUNT(*) AS c FROM subscriptions WHERE status='active' AND substr(started_at,1,10) = ?",
    today,
  );
  const cancelledToday = await count(
    "SELECT COUNT(*) AS c FROM subscriptions WHERE status IN ('cancelled','unpaid') AND substr(started_at,1,10) = ?",
    today,
  );

  const sum = async (sql: string, ...args: SqlParam[]) =>
    (await queryOne<{ v: number | null }>(sql, ...args))?.v ?? 0;

  const revenueToday = await sum(
    "SELECT COALESCE(SUM(price_cents),0) AS v FROM subscriptions WHERE status='active' AND substr(started_at,1,10)=?",
    today,
  );
  const revenueWeek = await sum(
    "SELECT COALESCE(SUM(price_cents),0) AS v FROM subscriptions WHERE status='active' AND started_at >= datetime('now','-7 days')",
  );
  const revenueMonth = await sum(
    "SELECT COALESCE(SUM(price_cents),0) AS v FROM subscriptions WHERE status='active' AND started_at >= datetime('now','-30 days')",
  );
  const mrr = await sum(
    "SELECT COALESCE(SUM(price_cents),0) AS v FROM subscriptions WHERE status='active'",
  );

  const avgRevenueToday =
    subsToday > 0 ? Math.round(revenueToday / subsToday) : 0;

  const plans = await query<{ name: string; count: number; revenue_cents: number }>(
    `SELECT COALESCE(p.name, 'Premium') AS name, COUNT(*) AS count, COALESCE(SUM(s.price_cents),0) AS revenue_cents
     FROM subscriptions s LEFT JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.status='active' AND substr(s.started_at,1,10)=?
     GROUP BY COALESCE(p.name, 'Premium') ORDER BY count DESC LIMIT 5`,
    today,
  );

  const topPlan = plans[0]?.name ?? "—";

  const conversionRate =
    totalUsers > 0 ? Math.round((activeSubs / totalUsers) * 1000) / 10 : 0;

  const trends: { date: string; users: number; subs: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = dayStr(i);
    const users = await count("SELECT COUNT(*) AS c FROM users WHERE substr(created_at,1,10)=?", d);
    const subs = await count(
      "SELECT COUNT(*) AS c FROM subscriptions WHERE status='active' AND substr(started_at,1,10)=?",
      d,
    );
    trends.push({ date: d, users, subs });
  }

  return {
    date: today,
    new_users_today: newUsersToday,
    new_users_week: newUsersWeek,
    total_users: totalUsers,
    subscriptions_active: activeSubs,
    subscriptions_today: subsToday,
    revenue_today_cents: revenueToday,
    revenue_week_cents: revenueWeek,
    revenue_month_cents: revenueMonth,
    avg_revenue_today_cents: avgRevenueToday,
    cancelled_today: cancelledToday,
    mrr_cents: mrr,
    conversion_rate: conversionRate,
    top_plan: topPlan,
    plans,
    trends,
  };
}

export function formatFcfa(cents: number): string {
  return new Intl.NumberFormat("fr-FR").format(cents / 100) + " FCFA";
}

export function buildWhatsappReport(s: ConversionStats): string {
  const lines = [
    `📊 RAPPORT EDUKORA — ${s.date}`,
    "",
    `👥 Inscriptions : ${s.new_users_today} (7j : ${s.new_users_week})`,
    `📈 Abonnés actifs : ${s.subscriptions_active}/${s.total_users} utilisateurs (${s.conversion_rate}%)`,
    `✅ Nouveaux abonnements : ${s.subscriptions_today}`,
    `❌ Annulations : ${s.cancelled_today}`,
    `💰 Revenu aujourd'hui : ${formatFcfa(s.revenue_today_cents)}`,
    `🧾 Panier moyen aujourd'hui : ${formatFcfa(s.avg_revenue_today_cents)}`,
    `📆 Revenu 7j : ${formatFcfa(s.revenue_week_cents)}`,
    `🗓️ Revenu 30j : ${formatFcfa(s.revenue_month_cents)}`,
    `💳 MRR (abonnements actifs) : ${formatFcfa(s.mrr_cents)}`,
    `🏆 Top offre : ${s.top_plan}`,
  ];
  if (s.plans.length > 0) {
    lines.push("");
    lines.push("Offres aujourd'hui :");
    for (const p of s.plans.slice(0, 3)) {
      lines.push(`  • ${p.name} : ${p.count} (${formatFcfa(p.revenue_cents)})`);
    }
  }
  return lines.join("\n");
}

export function buildEmailReport(s: ConversionStats): { subject: string; html: string } {
  const money = (c: number) => formatFcfa(c);
  const rows = [
    ["Inscriptions aujourd'hui", s.new_users_today],
    ["Inscriptions 7 jours", s.new_users_week],
    ["Abonnés actifs", s.subscriptions_active],
    ["Nouveaux abonnements (jour)", s.subscriptions_today],
    ["Annulations (jour)", s.cancelled_today],
    ["Revenu aujourd'hui", money(s.revenue_today_cents)],
    ["Panier moyen (jour)", money(s.avg_revenue_today_cents)],
    ["Revenu 7 jours", money(s.revenue_week_cents)],
    ["Revenu 30 jours", money(s.revenue_month_cents)],
    ["MRR (abonnements actifs)", money(s.mrr_cents)],
    ["Conversion", s.conversion_rate + " %"],
    ["Top offre", s.top_plan],
  ];
  const tr = rows
    .map(([k, v]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600">${v}</td></tr>`)
    .join("");
  const trendRows = s.trends
    .slice(-7)
    .map((t) => `<tr><td style="padding:6px 12px">${t.date}</td><td style="padding:6px 12px;text-align:right">${t.users}</td><td style="padding:6px 12px;text-align:right">${t.subs}</td></tr>`)
    .join("");
  return {
    subject: `Rapport Edukora — ${s.date}`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:640px;margin:auto">
      <h2 style="color:#111">Rapport Edukora — ${s.date}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">${tr}</table>
      <h3 style="margin-top:24px">Tendance ${s.trends.length} jours</h3>
      <table style="border-collapse:collapse;width:100%;font-size:13px">
        <tr><th style="text-align:left">Date</th><th style="text-align:right">Inscriptions</th><th style="text-align:right">Abonnements</th></tr>
        ${trendRows}
      </table>
    </div>`,
  };
}