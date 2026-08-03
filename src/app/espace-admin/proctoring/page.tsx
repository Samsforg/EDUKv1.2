import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getProctoringOverview, eventMeta } from "@/lib/proctoring";
import { AdminShell } from "@/components/admin/AdminShell";
import { TerminateSessionButton } from "@/components/admin/TerminateSessionButton";

export const metadata: Metadata = { title: "Edukora Admin - Proctoring" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const { sessions, events, stats } = getProctoringOverview();

  return (
    <AdminShell active="proctoring">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Supervision du Proctoring</h2>
        <p className="text-on-surface-variant font-body mt-1">
          Surveillance des sessions d&apos;examen blanc en temps réel.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Sessions en cours</p>
          <p className="text-3xl font-bold text-primary">{stats.active}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Sessions aujourd&apos;hui</p>
          <p className="text-3xl font-bold text-primary">{stats.today}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Alertes aujourd&apos;hui</p>
          <p className={`text-3xl font-bold ${stats.warnings > 0 ? "text-error" : "text-primary"}`}>{stats.warnings}</p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-lg font-bold text-on-surface mb-3">Sessions en cours ({sessions.length})</h3>
        {sessions.length === 0 ? (
          <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-8 text-center text-on-surface-variant">
            Aucune session d&apos;examen en cours.
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative">
                    <Link href={`/espace-admin/utilisateurs/${s.user_id}`} className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs">
                      {s.user_name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                    </Link>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-tertiary border-2 border-surface-container-lowest"></span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-on-surface truncate">{s.user_name}</p>
                    <p className="text-xs text-on-surface-variant truncate">{s.paper_title} • {s.subject_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-center">
                    <p className="text-lg font-bold text-on-surface">{s.elapsed_min} min</p>
                    <p className="text-[11px] text-on-surface-variant">écoulées / {s.duration_minutes}</p>
                  </div>
                  <div className="w-24 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.min(100, (s.elapsed_min / Math.max(1, s.duration_minutes)) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${s.warnings > 0 ? "text-error" : "text-on-surface"}`}>{s.warnings}</p>
                    <p className="text-[11px] text-on-surface-variant">alertes</p>
                  </div>
                  <TerminateSessionButton id={s.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="font-display text-lg font-bold text-on-surface mb-3">Flux d&apos;événements ({events.length})</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          {events.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">Aucun événement de surveillance.</div>
          ) : (
            <div className="divide-y divide-outline-variant">
              {events.map((e) => {
                const meta = eventMeta(e.event_type);
                return (
                  <div key={e.id} className="flex items-start gap-4 p-4 hover:bg-surface-container transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${meta.bg}`}>
                      <span className={`material-symbols-outlined text-base ${meta.color}`}>{e.event_type === "submission" ? "assignment_turned_in" : "warning"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-semibold text-on-surface">{meta.label}</p>
                        <span className="text-xs text-on-surface-variant shrink-0">{e.relative}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant">{e.detail}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {e.user_name} • Session #{e.session_id}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
