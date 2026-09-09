import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { query, queryOne } from "@/lib/db";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

interface MonthRow {
  month: string;
  active: number;
  revenue: number;
}

export default async function AdminRevenuePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  let mrr = 0;
  let churnRate: number | null = null;
  let arpu: number | null = null;
  const monthly: MonthRow[] = [];
  let ltv: number | null = null;

  try {
    // MRR approximatif : abonnés actifs mensuels * prix moyen mensuel
    const mrrRow = await queryOne<{ c: number; avg_price: number | null }>(
      `SELECT COUNT(*) AS c, AVG(COALESCE(s.price_cents, p.price_cents)) AS avg_price
       FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id
       WHERE s.status IN ('active','trial') AND p.interval = 'month'`
    );
    mrr = Math.round((mrrRow?.c ?? 0) * (mrrRow?.avg_price ?? 0));

    // Churn : annulés / (actifs + annulés) sur les 30 derniers jours
    const churnRow = await queryOne<{ cancelled: number; total: number }>(
      `SELECT
         SUM(CASE WHEN s.status IN ('cancelled','unpaid') THEN 1 ELSE 0 END) AS cancelled,
         COUNT(*) AS total
       FROM subscriptions s
       WHERE s.updated_at >= datetime('now', '-30 days')`
    );
    churnRate = churnRow && churnRow.total > 0 ? Math.round((churnRow.cancelled / churnRow.total) * 10000) / 100 : null;

    // ARPU : revenu total / utilisateurs payants
    const arpuRow = await queryOne<{ total: number; payers: number }>(
      `SELECT COALESCE(SUM(COALESCE(s.price_cents, p.price_cents)), 0) AS total,
              COUNT(DISTINCT s.user_id) AS payers
       FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id
       WHERE s.status IN ('active','trial','cancelled')`
    );
    arpu = arpuRow && arpuRow.payers > 0 ? Math.round(arpuRow.total / arpuRow.payers) : null;
    ltv = arpu != null && churnRate != null && churnRate > 0 ? Math.round((arpu / churnRate) * 100) : null;

    // Revenu par mois (6 derniers)
    for (let i = 5; i >= 0; i--) {
      const row = await queryOne<{ revenue: number }>(
        `SELECT COALESCE(SUM(COALESCE(s.price_cents, p.price_cents)), 0) AS revenue
         FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id
         WHERE s.status IN ('active','trial')
           AND s.started_at >= datetime('now', '-${i} months', 'start of month')
           AND s.started_at < datetime('now', '-${i} months', 'start of month', '+1 month')`
      );
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      monthly.push({
        month: d.toLocaleDateString("fr-FR", { month: "short" }),
        active: 0,
        revenue: row?.revenue ?? 0,
      });
    }
  } catch {
    // DB indisponible
  }

  const kpis = [
    { label: "MRR (abonnés actifs)", value: `${mrr.toLocaleString("fr-FR")} F`, hint: "Revenu mensuel récurrent estimé", color: "text-primary" },
    { label: "Churn 30j", value: churnRate != null ? `${churnRate}%` : "—", hint: "% d'abonnements annulés", color: (churnRate ?? 0) <= 10 ? "text-tertiary" : "text-error" },
    { label: "ARPU", value: arpu != null ? `${arpu.toLocaleString("fr-FR")} F` : "—", hint: "Revenu moyen par abonné", color: "text-secondary" },
    { label: "LTV estimée", value: ltv != null ? `${ltv.toLocaleString("fr-FR")} F` : "—", hint: "ARPU ÷ churn mensuel", color: "text-primary" },
  ];

  return (
    <AdminShell active="overview">
      <h2 className="font-display text-[28px] font-bold text-on-surface mb-1">Revenus &amp; Rétention</h2>
      <p className="text-on-surface-variant mb-6">Suivi MRR, churn, ARPU et LTV — source : table subscriptions.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl">
            <p className="text-label-sm text-on-surface-variant">{k.label}</p>
            <p className={`text-headline-md font-bold mt-1 ${k.color}`}>{k.value}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{k.hint}</p>
          </div>
        ))}
      </div>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-4">
        <h3 className="font-headline text-headline-md font-semibold text-on-surface mb-4">Revenu des abonnés actifs par mois</h3>
        <div className="flex items-end gap-4 h-40">
          {monthly.map((m) => {
            const max = Math.max(...monthly.map((x) => x.revenue), 1);
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                <span className="text-xs font-bold text-primary">{(m.revenue / 1000).toFixed(0)}k</span>
                <div
                  className="w-full bg-primary/80 rounded-t-lg transition-all"
                  style={{ height: `${Math.max(4, (m.revenue / max) * 100)}%` }}
                />
                <span className="text-xs text-on-surface-variant capitalize">{m.month}</span>
              </div>
            );
          })}
        </div>
      </section>
    </AdminShell>
  );
}
