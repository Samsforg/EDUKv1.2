import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getSubscriptionsPage } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { SubFilters } from "@/components/admin/SubFilters";
import { SubscriptionActions } from "@/components/admin/SubscriptionActions";

export const metadata: Metadata = { title: "Edukora Admin - Abonnés" };

function str(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

const STATUS_LABELS: Record<string, { label: string; cls: string; icon: string }> = {
  active: { label: "Actif", cls: "bg-tertiary-container text-on-tertiary-container", icon: "check_circle" },
  trial: { label: "Essai", cls: "bg-secondary-container text-on-secondary-container", icon: "experiment" },
  incomplete: { label: "Incomplet", cls: "bg-surface-container-high text-on-surface-variant", icon: "hourglass_top" },
  past_due: { label: "En retard", cls: "bg-error-container text-on-error-container", icon: "warning" },
  unpaid: { label: "Impayé", cls: "bg-error-container text-on-error-container", icon: "cancel" },
  cancelled: { label: "Annulé", cls: "bg-surface-container-high text-on-surface-variant", icon: "block" },
};

function fmtDate(v: string | null | undefined): string {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v.slice(0, 10);
  return d.toLocaleDateString("fr-FR");
}

function fmtPrice(cents: number): string {
  return cents === 0 ? "0 FCFA" : `${cents.toLocaleString("fr-FR")} FCFA`;
}

function fmtCents(v: number): string {
  return v.toLocaleString("fr-FR");
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const sp = await searchParams;
  const q = str(sp.q);
  const status = str(sp.status);
  const page = Math.max(1, Number.parseInt(str(sp.page), 10) || 1);

  const { subs, total, pages, page: currentPage, stats } = await getSubscriptionsPage({ q, status, page });

  function pageHref(p: number): string {
    const spu = new URLSearchParams();
    if (q) spu.set("q", q);
    if (status && status !== "all") spu.set("status", status);
    if (p > 1) spu.set("page", String(p));
    const s = spu.toString();
    return `/espace-admin/abonnes${s ? `?${s}` : ""}`;
  }

  const statCards = [
    { label: "Abonnements", value: fmtCents(stats.total), icon: "subscriptions", cls: "text-primary bg-primary-container" },
    { label: "Actifs", value: fmtCents(stats.active), icon: "check_circle", cls: "text-tertiary bg-tertiary-container" },
    { label: "En retard / impayés", value: fmtCents(stats.past_due), icon: "warning", cls: "text-error bg-error-container" },
    { label: "Expirent sous 30 j", value: fmtCents(stats.expiring_30d), icon: "schedule", cls: "text-secondary bg-secondary-container" },
    { label: "Revenu mensuel récurrent", value: fmtPrice(stats.monthly_recurring), icon: "payments", cls: "text-on-surface bg-surface-container-high" },
  ];

  return (
    <AdminShell active="abonnes">
      <section className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Gestion des Abonnés</h2>
          <p className="text-on-surface-variant font-body mt-1">
            {total} abonnement{total > 1 ? "s" : ""}. Consultez, réactivez, suspendez, annulez ou prolongez les accès payants.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {statCards.map((c) => (
          <div
            key={c.label}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-2"
          >
            <span className={`w-9 h-9 rounded-full flex items-center justify-center ${c.cls}`}>
              <span className="material-symbols-outlined text-lg">{c.icon}</span>
            </span>
            <p className="font-display text-xl font-bold text-on-surface leading-tight">{c.value}</p>
            <p className="text-xs text-on-surface-variant font-medium">{c.label}</p>
          </div>
        ))}
      </section>

      <SubFilters initialQ={q} initialStatus={status || "all"} />

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        {subs.length === 0 ? (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">subscriptions</span>
            <p className="text-on-surface-variant">Aucun abonnement ne correspond à ces critères.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
                <tr>
                  <th className="px-6 py-3">Abonné</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Début</th>
                  <th className="px-6 py-3">Expiration</th>
                  <th className="px-6 py-3">Réf. paiement</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {subs.map((s) => {
                  const st = STATUS_LABELS[s.status] ?? { label: s.status, cls: "bg-surface-container-high text-on-surface-variant", icon: "help" };
                  const expiringSoon =
                    s.status === "active" && s.end_at && new Date(s.end_at).getTime() < Date.now() + 30 * 86400000;
                  return (
                    <tr key={s.id} className="hover:bg-surface-container transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/espace-admin/utilisateurs/${s.user_id}`} className="flex items-center gap-3 group">
                          <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs shrink-0">
                            {s.user_name
                              .split(" ")
                              .map((w) => w[0] ?? "")
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-on-surface group-hover:text-primary transition-colors">{s.user_name}</p>
                            <p className="text-xs text-on-surface-variant">
                              {s.email ?? "—"} {s.phone ? `• ${s.phone}` : ""}
                            </p>
                            {s.class_level ? <p className="text-xs text-on-surface-variant">{s.class_level}</p> : null}
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-on-surface">{s.plan_name}</p>
                        <p className="text-xs text-on-surface-variant">
                          {fmtPrice(s.price_cents)}
                          {s.interval === "quarter" ? " / trimestre" : s.interval === "year" ? " / an" : " / mois"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${st.cls}`}>
                          <span className="material-symbols-outlined text-sm">{st.icon}</span>
                          {st.label}
                        </span>
                        {expiringSoon && (
                          <p className="text-[11px] text-secondary font-semibold mt-1">Expire bientôt</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant text-sm">{fmtDate(s.started_at)}</td>
                      <td className="px-6 py-4 text-on-surface-variant text-sm">{fmtDate(s.end_at)}</td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-mono text-on-surface-variant">{s.provider_subscription_id ?? "—"}</p>
                        <p className="text-[11px] text-on-surface-variant capitalize">{s.provider}</p>
                      </td>
                      <td className="px-6 py-4">
                        <SubscriptionActions subId={s.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {pages > 1 && (
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4" aria-label="Pagination">
          <p className="text-sm text-on-surface-variant">
            Page {currentPage} sur {pages} — {total} résultat{total > 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-1">
            <Link
              href={pageHref(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold border border-outline-variant transition-colors ${
                currentPage <= 1
                  ? "text-on-surface-variant/40 pointer-events-none"
                  : "text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
              Précédent
            </Link>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={pageHref(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  p === currentPage
                    ? "bg-primary text-on-primary"
                    : "text-on-surface border border-outline-variant hover:bg-surface-container-high"
                }`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </Link>
            ))}
            <Link
              href={pageHref(currentPage + 1)}
              aria-disabled={currentPage >= pages}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold border border-outline-variant transition-colors ${
                currentPage >= pages
                  ? "text-on-surface-variant/40 pointer-events-none"
                  : "text-on-surface hover:bg-surface-container-high"
              }`}
            >
              Suivant
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </Link>
          </div>
        </nav>
      )}
    </AdminShell>
  );
}
