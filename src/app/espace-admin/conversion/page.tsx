import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getConversionStats, formatFcfa } from "@/lib/conversion-report";
import { getAuditLogs, actionLabel } from "@/lib/audit";
import { AdminShell } from "@/components/admin/AdminShell";
import { TrendChart } from "@/components/admin/TrendChart";

export const metadata: Metadata = { title: "Edukora Admin - Conversion & Revenus" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const [stats, reminders] = await Promise.all([
    getConversionStats(7),
    getAuditLogs(10, "relance_checkout"),
  ]);

  const kpis = [
    {
      icon: "payments",
      bg: "bg-primary-fixed text-on-primary-fixed",
      value: formatFcfa(stats.mrr_cents),
      label: "MRR (abonnements actifs)",
      sub: `${stats.subscriptions_active} abonnés sur ${stats.total_users} utilisateurs`,
    },
    {
      icon: "percent",
      bg: "bg-secondary-fixed text-on-secondary-fixed",
      value: `${stats.conversion_rate} %`,
      label: "Taux de conversion",
      sub: `top offre : ${stats.top_plan}`,
    },
    {
      icon: "person_add",
      bg: "bg-tertiary-fixed text-on-tertiary-fixed",
      value: String(stats.new_users_week),
      label: "Nouveaux utilisateurs (7 j)",
      sub: `+${stats.new_users_today} aujourd'hui`,
    },
    {
      icon: "subscriptions",
      bg: "bg-primary-fixed text-on-primary-fixed",
      value: String(stats.subscriptions_today),
      label: "Nouveaux abonnements",
      sub: `${stats.cancelled_today} annulation(s) aujourd'hui`,
    },
    {
      icon: "account_balance_wallet",
      bg: "bg-tertiary-fixed text-on-tertiary-fixed",
      value: formatFcfa(stats.revenue_week_cents),
      label: "Revenus (7 j)",
      sub: `${formatFcfa(stats.revenue_today_cents)} aujourd'hui`,
    },
    {
      icon: "calendar_month",
      bg: "bg-secondary-fixed text-on-secondary-fixed",
      value: formatFcfa(stats.revenue_month_cents),
      label: "Revenus (30 j)",
      sub: "abonnements actifs seulement",
    },
  ];

  const userTrend = stats.trends.map((t) => ({ label: t.date.slice(5), value: t.users }));
  const subTrend = stats.trends.map((t) => ({ label: t.date.slice(5), value: t.subs }));

  return (
    <AdminShell active="conversion">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">
            Conversion &amp; Revenus
          </h2>
          <p className="text-on-surface-variant font-body mt-1">
            Performance commerciale et relances d&apos;abandon. Rapport quotidien : 7h45 (WhatsApp + email).
          </p>
        </div>
        <span className="bg-surface-container-high text-on-surface px-4 py-2 rounded-lg font-label text-label-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-between h-32"
          >
            <div className="flex justify-between items-start">
              <span className={`p-2 rounded-lg material-symbols-outlined ${k.bg}`}>{k.icon}</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-label-sm font-medium">{k.label}</p>
              <h3 className="text-headline-md font-bold text-primary">{k.value}</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">{k.sub}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <TrendChart
          title="Inscriptions (7 jours)"
          subtitle="Nouveaux utilisateurs par jour"
          data={userTrend}
          color="#6750a4"
          legend="Inscriptions"
        />
        <TrendChart
          title="Abonnements (7 jours)"
          subtitle="Abonnements actifs créés par jour"
          data={subTrend}
          color="#00897b"
          legend="Abonnements"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <h3 className="font-headline text-headline-md font-semibold text-on-surface mb-1">Offres aujourd&apos;hui</h3>
          <p className="text-xs text-on-surface-variant mb-5">Répartition des abonnements actifs par plan</p>
          {stats.plans.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Aucun abonnement actif aujourd&apos;hui.</p>
          ) : (
            <ul className="space-y-4">
              {stats.plans.map((p) => {
                const max = Math.max(...stats.plans.map((x) => x.count), 1);
                return (
                  <li key={p.name}>
                    <div className="flex items-center justify-between text-label-sm mb-1">
                      <span className="font-semibold text-on-surface">{p.name}</span>
                      <span className="text-on-surface-variant">
                        {p.count} • {formatFcfa(p.revenue_cents)}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(p.count / max) * 100}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <h3 className="font-headline text-headline-md font-semibold text-on-surface mb-1">
            Relances d&apos;abandon
          </h3>
          <p className="text-xs text-on-surface-variant mb-5">
            Crons 10h / 14h / 18h — abonnements checkout jamais finalisés
          </p>
          {reminders.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Aucune relance envoyée récemment.</p>
          ) : (
            <ul className="space-y-3">
              {reminders.map((r) => (
                <li key={r.id} className="flex items-start gap-3 text-label-sm">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">mark_email_read</span>
                  <div>
                    <p className="text-on-surface font-semibold">{actionLabel(r.action)}</p>
                    <p className="text-on-surface-variant">{r.detail}</p>
                    <p className="text-xs text-on-surface-variant/70">
                      {new Date(r.created_at).toLocaleString("fr-FR")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </AdminShell>
  );
}