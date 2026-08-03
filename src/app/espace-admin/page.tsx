import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getAdminStats, getActivityFeed, getSubjectStats, getTrends } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { TrendChart } from "@/components/admin/TrendChart";

export const metadata: Metadata = { title: "Edukora Admin - Vue d'ensemble" };

const KIND_META: Record<string, { icon: string; bg: string; color: string; label: string }> = {
  quiz: { icon: "quiz", bg: "bg-primary-fixed-dim", color: "text-primary", label: "Quiz terminé" },
  exam: { icon: "assignment_turned_in", bg: "bg-tertiary-fixed-dim", color: "text-tertiary", label: "Examen blanc" },
  forum: { icon: "forum", bg: "bg-secondary-fixed-dim", color: "text-secondary", label: "Nouveau sujet" },
  registration: { icon: "person_add", bg: "bg-primary-fixed-dim", color: "text-primary", label: "Inscription" },
};

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const stats = getAdminStats();
  const activity = getActivityFeed(8);
  const subjects = getSubjectStats();
  const trends = getTrends(14);

  const kpis = [
    {
      icon: "group",
      bg: "bg-primary-fixed text-on-primary-fixed",
      value: stats.users.total.toLocaleString("fr-FR"),
      label: "Utilisateurs",
      sub: `${stats.online_today} en ligne aujourd'hui`,
    },
    {
      icon: "pending_actions",
      bg: "bg-secondary-fixed text-on-secondary-fixed",
      value: String(stats.attempts.quiz + stats.attempts.exam),
      label: "Évaluations tentées",
      sub: `${stats.attempts.quiz} quiz • ${stats.attempts.exam} examens blancs`,
    },
    {
      icon: "auto_stories",
      bg: "bg-tertiary-fixed text-on-tertiary-fixed",
      value: String(stats.content.lessons + stats.content.quizzes + stats.content.papers),
      label: "Contenus pédagogiques",
      sub: `${stats.content.lessons} leçons • ${stats.content.quizzes} quiz • ${stats.content.papers} sujets`,
    },
    {
      icon: "forum",
      bg: "bg-error-container text-on-error-container",
      value: String(stats.forum.posts),
      label: "Sujets forum",
      sub: `${stats.forum.replies} réponses • ${stats.parent_links} jumelages parent`,
    },
  ];

  return (
    <AdminShell active="overview">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Tableau de Bord</h2>
          <p className="text-on-surface-variant font-body mt-1">Surveillance en temps réel de l&apos;écosystème Edukora.</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/api/admin/export/csv"
            className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label text-label-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            title="Télécharger le rapport complet (CSV)"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Exporter le rapport
          </a>
          <span className="bg-surface-container-high text-on-surface px-4 py-2 rounded-lg font-label text-label-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-between h-32">
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
          title="Inscriptions"
          subtitle="Nouveaux comptes par jour (14 derniers jours)"
          data={trends.map((t) => ({ label: t.label, value: t.registrations }))}
          color="#0047ab"
          legend="Inscriptions"
        />
        <TrendChart
          title="Tentatives d'évaluation"
          subtitle="Quiz et examens blancs terminés par jour (14 derniers jours)"
          data={trends.map((t) => ({ label: t.label, value: t.quiz_attempts + t.exam_attempts }))}
          color="#7c3aed"
          legend="Quiz + Examens"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <section className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline text-headline-md font-semibold text-on-surface">Flux d&apos;Activité Récente</h3>
          </div>
          <div className="flex-1 divide-y divide-outline-variant">
            {activity.length === 0 && (
              <div className="p-6 text-center text-sm text-on-surface-variant">Aucune activité récente.</div>
            )}
            {activity.map((a) => {
              const meta = KIND_META[a.kind] ?? KIND_META.quiz;
              return (
                <div key={`${a.kind}-${a.id}`} className="p-4 flex items-start gap-4 hover:bg-surface-container transition-colors">
                  <div className={`w-10 h-10 rounded-full ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                    <span className={`material-symbols-outlined ${meta.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {meta.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="font-body text-body-md font-semibold text-on-surface truncate">{meta.label}</p>
                      <span className="text-label-xs text-on-surface-variant shrink-0">{a.relative}</span>
                    </div>
                    <p className="text-on-surface-variant text-body-md truncate">{a.user_name} • {a.label}</p>
                    <p className="text-xs text-on-surface-variant">{a.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
            <h3 className="font-headline text-headline-md font-semibold text-on-surface mb-4">Accès Rapide</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "/espace-admin/utilisateurs", icon: "manage_accounts", label: "Gestion Utilisateurs" },
                { href: "/espace-admin/cours", icon: "auto_stories", label: "Contenu pédagogique" },
                { href: "/espace-admin/moderation", icon: "fact_check", label: "Modération forum" },
                { href: "/espace-admin/profil", icon: "settings", label: "Profil admin" },
              ].map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-3xl">{q.icon}</span>
                  <span className="text-label-xs font-semibold text-center">{q.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-primary-container text-on-primary-container p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-tertiary-fixed rounded-full animate-pulse"></div>
                <span className="text-label-xs font-bold uppercase tracking-wider">Engagement</span>
              </div>
              <h4 className="font-display text-headline-md font-bold mb-4">Synthèse des résultats</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-label-sm">
                    <span>Score moyen quiz</span>
                    <span className="font-semibold">{stats.engagement.avg_quiz_percent ?? "—"}%</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-1">
                    <div className="bg-tertiary-fixed h-full rounded-full" style={{ width: `${stats.engagement.avg_quiz_percent ?? 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-label-sm">
                    <span>Moyenne examens blancs</span>
                    <span className="font-semibold">{stats.engagement.avg_exam_over_20 ?? "—"}/20</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full mt-1">
                    <div className="bg-tertiary-fixed h-full rounded-full" style={{ width: `${((stats.engagement.avg_exam_over_20 ?? 0) / 20) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-label-sm">
                  <span>XP total communauté</span>
                  <span className="font-semibold">{stats.engagement.total_xp.toLocaleString("fr-FR")}</span>
                </div>
                <div className="flex justify-between items-center text-label-sm">
                  <span>Nouveaux inscrits (7 j)</span>
                  <span className="font-semibold">+{stats.new_week}</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </section>
      </div>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="p-6 border-b border-outline-variant">
          <h3 className="font-headline text-headline-md font-semibold text-on-surface">Performance par matière</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-6 py-3">Matière</th>
                <th className="px-6 py-3">Quiz</th>
                <th className="px-6 py-3">Sujets</th>
                <th className="px-6 py-3">Tentatives quiz</th>
                <th className="px-6 py-3">Tentatives examen</th>
                <th className="px-6 py-3">Moy. quiz</th>
                <th className="px-6 py-3">Moy. examen /20</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {subjects.map((s) => (
                <tr key={s.subject_id} className="hover:bg-surface-container transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center material-symbols-outlined text-base" style={{ backgroundColor: `${s.color}18`, color: s.color }}>
                        {s.icon}
                      </span>
                      <span className="font-semibold text-on-surface">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.quizzes}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.papers}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.quiz_attempts}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.exam_attempts}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${(s.avg_quiz_percent ?? 0) >= 50 ? "text-tertiary" : "text-error"}`}>
                      {s.avg_quiz_percent ?? "—"}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${(s.avg_exam_over_20 ?? 0) >= 10 ? "text-tertiary" : "text-error"}`}>
                      {s.avg_exam_over_20 ?? "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
