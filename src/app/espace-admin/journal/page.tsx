import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getAuditLogs, getAuditActions, getAuditStats, actionLabel } from "@/lib/audit";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = { title: "Edukora Admin - Journal système" };

const ACTION_META: Record<string, { icon: string; cls: string }> = {
  approbation: { icon: "fact_check", cls: "bg-tertiary-container text-on-tertiary-container" },
  rejet: { icon: "cancel", cls: "bg-error-container text-on-error-container" },
  blocage: { icon: "block", cls: "bg-error-container text-on-error-container" },
  deblocage: { icon: "lock_open", cls: "bg-tertiary-container text-on-tertiary-container" },
  suppression: { icon: "person_remove", cls: "bg-error-container text-on-error-container" },
  role: { icon: "manage_accounts", cls: "bg-secondary-container text-on-secondary-container" },
  mot_de_passe: { icon: "key", cls: "bg-secondary-container text-on-secondary-container" },
  notification: { icon: "campaign", cls: "bg-primary-container text-on-primary-container" },
  promo: { icon: "confirmation_number", cls: "bg-tertiary-container text-on-tertiary-container" },
  litige: { icon: "gavel", cls: "bg-surface-container-high text-on-surface-variant" },
  proctoring: { icon: "monitor_heart", cls: "bg-surface-container-high text-on-surface-variant" },
  systeme: { icon: "settings", cls: "bg-surface-container-high text-on-surface-variant" },
  inscription: { icon: "person_add", cls: "bg-primary-container text-on-primary-container" },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const sp = await searchParams;
  const action = typeof sp.action === "string" ? sp.action : "";
  const logs = getAuditLogs(100, action || undefined);
  const actions = getAuditActions();
  const stats = getAuditStats();

  return (
    <AdminShell active="journal">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Journal Système</h2>
        <p className="text-on-surface-variant font-body mt-1">
          Traçabilité des actions d&apos;administration et événements de la plateforme.
        </p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Événements au total</p>
          <p className="text-3xl font-bold text-primary">{stats.total}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Aujourd&apos;hui</p>
          <p className="text-3xl font-bold text-primary">{stats.today}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Types d&apos;actions</p>
          <p className="text-3xl font-bold text-primary">{actions.length}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2 mb-4">
        <Link
          href="/espace-admin/journal"
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
            !action ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          Tout
        </Link>
        {actions.map((a) => (
          <Link
            key={a.action}
            href={`/espace-admin/journal?action=${a.action}`}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              action === a.action
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            {actionLabel(a.action)} ({a.count})
          </Link>
        ))}
      </div>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant">Aucun événement enregistré.</div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {logs.map((l) => {
              const meta = ACTION_META[l.action] ?? { icon: "history", cls: "bg-surface-container-high text-on-surface-variant" };
              return (
                <div key={l.id} className="flex items-start gap-4 p-4 hover:bg-surface-container transition-colors">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${meta.cls}`}>
                    <span className="material-symbols-outlined text-base">{meta.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-semibold text-on-surface">{actionLabel(l.action)}</p>
                      <span className="text-xs text-on-surface-variant shrink-0">{l.relative}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant">{l.detail}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Par {l.actor_name ?? "Système"} • {l.created_at.replace("T", " ").slice(0, 19)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </AdminShell>
  );
}
