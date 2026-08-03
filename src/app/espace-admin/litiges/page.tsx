import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getDisputes } from "@/lib/disputes";
import { AdminShell } from "@/components/admin/AdminShell";
import { ResolveDisputeButton } from "@/components/admin/ResolveDisputeButton";

export const metadata: Metadata = { title: "Edukora Admin - Litiges" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const disputes = getDisputes();
  const open = disputes.filter((d) => d.status === "open").length;

  return (
    <AdminShell active="disputes">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Gestion des Litiges</h2>
        <p className="text-on-surface-variant font-body mt-1">
          {open} litige{open > 1 ? "s" : ""} en attente sur {disputes.length} au total.
        </p>
      </section>

      <section className="space-y-4">
        {disputes.length === 0 && (
          <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-10 text-center text-on-surface-variant">
            Aucun litige pour le moment.
          </div>
        )}
        {disputes.map((d) => (
          <article
            key={d.id}
            className={`bg-surface-container-lowest border rounded-xl overflow-hidden ${
              d.status === "open" ? "border-error/40" : "border-outline-variant"
            }`}
          >
            <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-xs shrink-0">
                  {d.user_name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-on-surface">{d.subject}</h3>
                    <span className="text-xs text-on-surface-variant">#{d.id}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        d.status === "open"
                          ? "bg-error-container text-on-error-container"
                          : "bg-tertiary-container text-on-tertiary-container"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{d.status === "open" ? "priority_high" : "check_circle"}</span>
                      {d.status === "open" ? "Ouvert" : "Résolu"}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {d.user_name} • {d.relative}
                  </p>
                  <p className="text-sm text-on-surface mt-2">{d.description}</p>
                  {d.status === "resolved" && d.resolution && (
                    <div className="mt-3 bg-tertiary-container/30 border border-tertiary-container rounded-lg p-3">
                      <p className="text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Résolution</p>
                      <p className="text-sm text-on-surface">{d.resolution}</p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Par {d.resolved_by_name ?? "Admin"}
                        {d.resolved_at ? ` le ${d.resolved_at.slice(0, 10)}` : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {d.status === "open" && <ResolveDisputeButton id={d.id} subject={d.subject} />}
            </div>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
