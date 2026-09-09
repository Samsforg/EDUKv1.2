"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface ReviewItem {
  quiz_id: number;
  quiz_title: string;
  subject_name: string;
  last_score_pct: number;
  interval_days: number;
  due_at: string;
  repetitions: number;
  best_score: number | null;
  attempts_count: number;
  icon: string;
  color: string;
}

interface Summary {
  total: number;
  overdue: number;
  due_today: number;
  streak: number;
}

export default function RevisionPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "overdue" | "today">("all");

  useEffect(() => {
    fetch("/api/revision/due")
      .then((r) => r.json())
      .then((d) => {
        setReviews(d.reviews ?? []);
        setSummary(d.summary ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = reviews.filter((r) => {
    if (filter === "overdue") return new Date(r.due_at) < new Date();
    if (filter === "today") return new Date(r.due_at) >= new Date();
    return true;
  });

  const grouped = filtered.reduce<Record<string, ReviewItem[]>>((acc, r) => {
    (acc[r.subject_name] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Ma révision" subtitle="Révisions espacées intelligentes" backHref="/accueil-edukora" />

      <main className="px-margin-mobile pt-4 space-y-4">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {!loading && summary && (
          <>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface border border-outline-variant rounded-xl p-4 text-center">
                <p className="text-headline-md font-bold text-primary">{summary.total}</p>
                <p className="text-label-xs text-on-surface-variant mt-1">À réviser</p>
              </div>
              <div className="bg-surface border border-outline-variant rounded-xl p-4 text-center">
                <p className="text-headline-md font-bold text-error">{summary.overdue}</p>
                <p className="text-label-xs text-on-surface-variant mt-1">En retard</p>
              </div>
              <div className="bg-surface border border-outline-variant rounded-xl p-4 text-center">
                <p className="text-headline-md font-bold text-amber-600">🔥 {summary.streak}</p>
                <p className="text-label-xs text-on-surface-variant mt-1">Série jours</p>
              </div>
            </div>

            {summary.total > 0 && (
              <div className="bg-primary-container/15 rounded-xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                <p className="font-body-sm text-on-surface flex-1">
                  {summary.overdue > 0
                    ? `${summary.overdue} quiz en retard — révise-les maintenant pour ne pas oublier !`
                    : summary.due_today > 0
                      ? `${summary.due_today} quiz à réviser aujourd'hui. La régularité paie !`
                      : "Bravo ! Pas de révision prévue aujourd'hui. Reviens demain 🎉"}
                </p>
              </div>
            )}

            {reviews.length > 0 && (
              <div className="flex gap-2">
                {(["all", "overdue", "today"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      filter === f
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                    }`}
                  >
                    {f === "all" ? "Tous" : f === "overdue" ? `En retard (${summary.overdue})` : `Aujourd'hui (${summary.due_today})`}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {!loading && reviews.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant inline-block">school</span>
            <p className="font-headline-sm text-on-surface">Aucune révision prévue</p>
            <p className="font-body-sm text-on-surface-variant">Termine des quiz pour que le système planifie tes révisions.</p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md px-6 py-3 rounded-full active:scale-95 transition-transform"
            >
              Faire un quiz <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        )}

        {!loading && Object.entries(grouped).map(([subject, items]) => (
          <section key={subject} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/60">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${items[0].color}22`, color: items[0].color }}
              >
                <span className="material-symbols-outlined text-lg">{items[0].icon}</span>
              </span>
              <h2 className="font-label-md font-semibold text-on-surface flex-1">{subject}</h2>
              <span className="font-label-xs text-on-surface-variant">{items.length} quiz</span>
            </div>
            <div className="divide-y divide-outline-variant/60">
              {items.map((r) => {
                const overdue = new Date(r.due_at) < new Date();
                return (
                  <Link
                    key={r.quiz_id}
                    href={`/quiz/${r.quiz_id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low active:scale-[0.99] transition-transform"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${overdue ? "bg-error-container/20" : "bg-primary-container/20"}`}>
                      <span className={`material-symbols-outlined text-lg ${overdue ? "text-error" : "text-primary"}`}>
                        {overdue ? "schedule" : "replay"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-sm text-on-surface truncate">{r.quiz_title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {r.best_score != null && (
                          <span className={`text-[11px] font-bold ${r.best_score >= 75 ? "text-green-600" : r.best_score >= 50 ? "text-amber-600" : "text-error"}`}>
                            Meilleur : {r.best_score}%
                          </span>
                        )}
                        <span className="text-[11px] text-on-surface-variant">
                          {r.attempts_count} tentative{r.attempts_count > 1 ? "s" : ""}
                        </span>
                        <span className="text-[11px] text-on-surface-variant">
                          · intervalle {r.interval_days}j
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">chevron_right</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
