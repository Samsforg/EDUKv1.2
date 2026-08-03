import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getParentChildren, getRecentResults, getSubjectStats, resolveLinkedChild } from "@/lib/parents";
import { ParentShell } from "@/components/parent/ParentShell";
import { ExamList } from "@/components/parent/ExamList";

export const metadata: Metadata = { title: "Espace Parent - Suivi des Examens" };

const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];

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
  const active = resolveLinkedChild(user.id, sp.child ? Number(sp.child) : null) ?? children[0];
  const childId = active.child_id;

  const allResults = getRecentResults(childId, 100);
  const subjects = getSubjectStats(childId);
  const estimated =
    subjects.length > 0
      ? Math.round((subjects.reduce((s, x) => s + x.avg_over_20, 0) / subjects.length) * 10) / 10
      : 0;
  const nationalDelta = Math.round((estimated - 10) * 10) / 10;

  const byMonth = new Map<string, { sum: number; count: number }>();
  for (const r of allResults) {
    const key = r.date.slice(0, 7);
    const cur = byMonth.get(key) ?? { sum: 0, count: 0 };
    cur.sum += r.score_over_20;
    cur.count += 1;
    byMonth.set(key, cur);
  }
  const evolution = [...byMonth.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([key, v]) => {
      const [y, m] = key.split("-").map(Number);
      return {
        month: `${MONTHS_FR[(m ?? 1) - 1]} ${String(y).slice(2)}`,
        avg: Math.round((v.sum / v.count) * 10) / 10,
        count: v.count,
      };
    });

  const sorted = [...subjects].sort((a, b) => b.avg_over_20 - a.avg_over_20);
  const weak = sorted[sorted.length - 1] ?? null;

  const exams = allResults
    .filter((r) => r.type === "exam")
    .map((r) => ({
      id: r.id,
      subject_name: r.subject_name,
      subject_icon: r.subject_icon,
      subject_color: r.subject_color,
      score_over_20: r.score_over_20,
      date: r.date,
      relative: r.relative,
      status: r.score_over_20 >= 10 ? "Admis" : "À renforcer",
      status_color: r.score_over_20 >= 10 ? "tertiary" : "error",
      trend: r.trend,
    }));

  const recommendation = weak
    ? `Basé sur les derniers résultats, nous recommandons une session intensive de 30 min sur ${weak.name} ce week-end pour remonter sa moyenne (${weak.avg_over_20.toFixed(1)}/20).`
    : "Lancez un premier examen blanc pour établir une base de suivi des performances.";

  // Points pour la courbe d'évolution
  const chartPoints = evolution
    .map((p, i) => {
      const x = evolution.length === 1 ? 500 : (i / (evolution.length - 1)) * 1000;
      const y = 100 - (p.avg / 20) * 90 - 5;
      return { x, y: Math.max(5, Math.min(95, y)) };
    })
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  return (
    <ParentShell active="exams">
      <div className="space-y-6">
        {children.length > 1 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {children.map((c) => (
              <a
                key={c.child_id}
                href={`/espace-parent/examens?child=${c.child_id}`}
                className={
                  c.child_id === active.child_id
                    ? "shrink-0 px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-sm"
                    : "shrink-0 px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest"
                }
              >
                {c.first_name}
              </a>
            ))}
          </div>
        )}

        <section className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="text-body-md font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">stars</span>
              Objectif National
            </h2>
            <p className="text-label-sm text-on-surface-variant">
              Performance de {active.first_name} par rapport à la moyenne nationale (10/20).
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-full font-headline font-bold text-headline-md ${
              nationalDelta >= 0 ? "bg-primary text-on-primary" : "bg-error-container text-on-error-container"
            }`}
          >
            {nationalDelta > 0 ? "+" : ""}
            {nationalDelta} <span className="text-label-sm font-normal">pts</span>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-headline-md font-bold text-on-surface">Évolution des notes</h3>
              <p className="text-label-sm text-on-surface-variant">Moyenne par mois</p>
            </div>
            <div className="text-right">
              <span className="text-display-lg text-tertiary font-bold">{estimated}/20</span>
            </div>
          </div>
          {evolution.length >= 2 ? (
            <div className="w-full h-48 relative mt-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 100">
                <path
                  d={`M${chartPoints}`}
                  fill="none"
                  stroke="#0047AB"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                {evolution.map((p, i) => {
                  const pts = chartPoints.split(" ").map((s) => s.split(",").map(Number));
                  const [cx, cy] = pts[i];
                  return <circle key={i} cx={cx} cy={cy} fill="#0047AB" r="5" />;
                })}
              </svg>
              <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between text-label-xs text-on-surface-variant font-medium">
                {evolution.map((p, i) => (
                  <span key={i}>{p.month}</span>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-center gap-2">
              <span className="material-symbols-outlined text-4xl text-outline-variant">insights</span>
              <p className="text-sm text-on-surface-variant">
                {evolution.length === 1
                  ? `Moyenne actuelle : ${evolution[0].avg}/20 (${evolution[0].count} évaluation${evolution[0].count > 1 ? "s" : ""}). Ajoutez d'autres résultats pour voir la tendance.`
                  : "Pas encore assez de données pour afficher l'évolution."}
              </p>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h3 className="text-headline-md font-bold px-1">Examens Récents</h3>
          <ExamList exams={exams} />
        </section>

        <section className="relative bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-6 overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <span className="material-symbols-outlined text-[120px]">smart_toy</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline font-bold text-headline-md mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              Recommandation IA
            </h3>
            <p className="text-body-md opacity-90 mb-4 max-w-md">{recommendation}</p>
            <a
              href="/espace-parent/assiduite"
              className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-label text-label-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Voir l&apos;assiduité
            </a>
          </div>
        </section>
      </div>
    </ParentShell>
  );
}
