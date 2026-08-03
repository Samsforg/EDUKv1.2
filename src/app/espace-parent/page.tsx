import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getDashboardData, getParentChildren } from "@/lib/parents";
import { ParentShell } from "@/components/parent/ParentShell";

export const metadata: Metadata = { title: "Espace Parent - Tableau de bord" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ child?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "parent") redirect("/accueil-edukora");

  const sp = await searchParams;
  const children = getParentChildren(user.id);
  if (children.length === 0) redirect("/espace-parent/jumelage");

  const requested = sp.child ? Number(sp.child) : null;
  const active = children.find((c) => c.child_id === requested) ?? children[0];
  const data = getDashboardData(user.id, active.child_id);

  const initials = `${active.first_name[0]}${active.last_name[0]}`.toUpperCase();

  return (
    <ParentShell active="dashboard">
      <div className="space-y-6">
        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-headline text-xl font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-headline text-xl font-bold text-primary truncate">
              {active.first_name} {active.last_name}
            </h2>
            <p className="text-on-surface-variant text-sm font-medium truncate">
              {active.class_level ?? "Élève"}
              {active.serie_name ? ` • ${active.serie_name}` : ""}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`flex h-2 w-2 rounded-full ${active.online ? "bg-tertiary" : "bg-outline-variant"}`}
              ></span>
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  active.online ? "text-tertiary" : "text-on-surface-variant"
                }`}
              >
                {active.online ? "Actuellement en ligne" : "Hors ligne"}
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
        </section>

        {children.length > 1 && (
          <section className="flex gap-2 overflow-x-auto no-scrollbar">
            {children.map((c) => (
              <a
                key={c.child_id}
                href={`/espace-parent?child=${c.child_id}`}
                className={
                  c.child_id === active.child_id
                    ? "shrink-0 px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-sm"
                    : "shrink-0 px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest"
                }
              >
                {c.first_name}
              </a>
            ))}
          </section>
        )}

        <section className="space-y-4">
          <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">analytics</span>
            Vue d&apos;ensemble de la semaine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant flex flex-col items-center justify-center text-center shadow-sm">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeWidth="10"
                    className="stroke-surface-container-high"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * data.objectives) / 100}
                    className="stroke-tertiary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-on-surface">{data.objectives}%</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-on-surface">Objectifs atteints</p>
              <p className="text-xs text-on-surface-variant mt-1">
                {data.total_results > 0
                  ? `${data.total_results} évaluation${data.total_results > 1 ? "s" : ""} • ${data.study_time}h d'étude`
                  : `${data.study_time}h d'étude cette semaine`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20 flex flex-col justify-between">
                <span className="material-symbols-outlined text-primary mb-2">schedule</span>
                <div>
                  <p className="text-xs font-medium text-primary">Temps d&apos;étude</p>
                  <p className="text-xl font-bold text-primary">{data.study_time}h</p>
                </div>
              </div>
              <div className="bg-secondary-container/10 p-4 rounded-xl border border-secondary-container/20 flex flex-col justify-between">
                <span className="material-symbols-outlined text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                <div>
                  <p className="text-xs font-medium text-secondary">Série actuelle</p>
                  <p className="text-xl font-bold text-secondary">{data.streak} j.</p>
                </div>
              </div>
              <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <span className="material-symbols-outlined text-on-surface">workspace_premium</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-on-surface-variant">Moyenne BAC Estimée</p>
                    <p className="text-lg font-bold text-on-surface">{data.estimated_average} / 20</p>
                  </div>
                </div>
                <span
                  className={`font-bold text-sm ${data.average_delta >= 0 ? "text-tertiary" : "text-error"}`}
                >
                  {data.average_delta > 0 ? "↑" : data.average_delta < 0 ? "↓" : "•"} {data.delta_label}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-on-primary/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex gap-4">
            <div className="flex-shrink-0">
              <div className="bg-on-primary p-2 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  smart_toy
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-on-primary font-headline font-bold flex items-center gap-2">Avis du Tuteur IA</h4>
              <p className="text-on-primary/90 text-sm leading-relaxed">{data.advice}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-lg font-bold text-on-surface">Derniers résultats</h3>
            <Link href="/espace-parent/examens" className="text-primary text-sm font-semibold hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {data.results.length === 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl text-center">
                <p className="text-sm text-on-surface-variant">
                  Aucun résultat pour le moment. Encouragez {active.first_name} à lancer un quiz ou un examen blanc.
                </p>
              </div>
            )}
            {data.results.map((r) => (
              <div
                key={`${r.type}-${r.id}`}
                className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${r.subject_color}18` }}>
                    <span className="material-symbols-outlined text-primary" style={{ color: r.subject_color }}>
                      {r.subject_icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface truncate">{r.subject_name}</p>
                    <p className="text-xs text-on-surface-variant truncate">
                      {r.type === "exam" ? `Examen Blanc • ${r.year ?? ""} • ${r.relative}` : `Quiz de révision • ${r.relative}`}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-primary">{r.score_over_20}/20</p>
                  {r.trend && (
                    <span
                      className={`flex items-center justify-end text-xs font-bold ${
                        r.trend === "up" ? "text-tertiary" : r.trend === "down" ? "text-error" : "text-on-surface-variant"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">
                        {r.trend === "up" ? "trending_up" : r.trend === "down" ? "trending_down" : "trending_flat"}
                      </span>
                      {r.trend === "up" ? "Progression" : r.trend === "down" ? "Baisse" : "Stable"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ParentShell>
  );
}
