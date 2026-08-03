"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Chapter {
  id: number;
  title: string;
  status: "not_started" | "in_progress" | "needs_revision" | "mastered";
  status_label: string;
  lessons_total: number;
  lessons_read: number;
  progress: number;
  best_percent: number | null;
  attempts: number;
  next_lesson: { id: number; title: string } | null;
  quiz: { id: number; title: string } | null;
}

interface SubjectPlan {
  id: number;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

interface QueueItem {
  id: string;
  type: "lesson" | "quiz";
  reason: string;
  href: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  chapter_title: string;
  lesson_title?: string;
  quiz_title?: string;
}

interface PlanData {
  generated_at: string;
  summary: {
    lessons_read: number;
    lessons_total: number;
    lessons_remaining: number;
    overall_pct: number;
    chapters_total: number;
    status_counts: { not_started: number; in_progress: number; needs_revision: number; mastered: number };
    subjects_total: number;
    quizzes_taken: number;
    plan: { per_day_lessons: number; days: number; daily_minutes: number };
  };
  queue: QueueItem[];
  subjects: SubjectPlan[];
}

const STATUS_STYLE: Record<string, { bg: string; text: string; icon: string }> = {
  not_started: { bg: "bg-outline-variant/30", text: "text-on-surface-variant", icon: "radio_button_unchecked" },
  in_progress: { bg: "bg-primary/15", text: "text-primary", icon: "pending" },
  needs_revision: { bg: "bg-tertiary/15", text: "text-tertiary", icon: "replay" },
  mastered: { bg: "bg-[#1b873b]/15", text: "text-[#1b873b]", icon: "check_circle" },
};

export default function ParcoursPage() {
  const [data, setData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [refreshing, setRefreshing] = useState(false);

  function load(showSpinner = false) {
    if (showSpinner) setRefreshing(true);
    setLoading(true);
    fetch("/api/parcours")
      .then(async (r) => {
        if (!r.ok) return null;
        const d: PlanData = await r.json();
        setData(d);
        const initial: Record<number, boolean> = {};
        d.subjects.forEach((s) => (initial[s.id] = true));
        setOpen((prev) => {
          const next: Record<number, boolean> = {};
          d.subjects.forEach((s) => (next[s.id] = prev[s.id] ?? true));
          return next;
        });
        return d;
      })
      .catch(() => setData(null))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

  const s = data?.summary;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader
        title="Mon parcours de révision"
        subtitle="Généré depuis ta progression"
        right={
          <button
            onClick={() => load(true)}
            aria-label="Rafraîchir le parcours"
            className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 active:scale-95 duration-100"
          >
            <span className={`material-symbols-outlined ${refreshing ? "animate-spin" : ""}`}>refresh</span>
          </button>
        }
      />

      <main className="px-margin-mobile pt-4 space-y-5">
        <Link
          href="/planning"
          className="flex items-center gap-3 bg-secondary-container/40 border border-secondary/20 rounded-xl p-3.5 active:scale-[0.98] transition-transform duration-100"
        >
          <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          </div>
          <div className="flex-1">
            <p className="font-label-sm font-semibold text-on-surface">Voir mon planning hebdomadaire</p>
            <p className="font-label-xs text-on-surface-variant">Tes sessions réparties du lundi au dimanche</p>
          </div>
          <span className="material-symbols-outlined text-secondary">chevron_right</span>
        </Link>
        {loading && !data && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {!loading && !data && (
          <div className="text-center py-16 space-y-4">
            <p className="font-body-md text-on-surface-variant">Impossible de générer ton parcours.</p>
            <button onClick={() => load()} className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full">Réessayer</button>
          </div>
        )}

        {data && s && (
          <>
            {/* Vue d'ensemble */}
            <section className="bg-surface border border-outline-variant rounded-2xl p-4 flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full">
                  <circle cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="7" className="text-outline-variant" />
                  <circle
                    cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="7"
                    strokeDasharray="201.06" strokeLinecap="round"
                    strokeDashoffset={201.06 - (201.06 * s.overall_pct) / 100}
                    className="text-primary progress-ring"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-title-sm text-title-sm text-on-surface">{s.overall_pct}%</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-label-sm text-on-surface-variant">Programme de révision</p>
                {s.lessons_remaining > 0 ? (
                  <>
                    <p className="font-headline-md text-headline-md text-on-surface leading-tight">
                      {s.lessons_remaining} fiche{s.lessons_remaining > 1 ? "s" : ""} à lire
                    </p>
                    <p className="font-label-xs text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                      ≈ {s.plan.per_day_lessons} fiche{s.plan.per_day_lessons > 1 ? "s" : ""}/jour pendant {s.plan.days} jour{s.plan.days > 1 ? "s" : ""} ({s.plan.daily_minutes} min/jour)
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-headline-md text-headline-md text-on-surface leading-tight">Programme terminé 🎉</p>
                    <p className="font-label-xs text-on-surface-variant">Revois tes matières avec les quiz.</p>
                  </>
                )}
              </div>
            </section>

            {/* Compteurs de statut */}
            <section className="grid grid-cols-4 gap-2">
              {([
                ["not_started", "À commencer", s.status_counts.not_started],
                ["in_progress", "En cours", s.status_counts.in_progress],
                ["needs_revision", "À renforcer", s.status_counts.needs_revision],
                ["mastered", "Maîtrisé", s.status_counts.mastered],
              ] as const).map(([status, label, count]) => {
                const style = STATUS_STYLE[status];
                return (
                  <div key={status} className={`${style.bg} rounded-xl p-3 text-center`}>
                    <p className={`font-title-md text-title-md ${style.text}`}>{count}</p>
                    <p className={`font-label-xs ${style.text}`}>{label}</p>
                  </div>
                );
              })}
            </section>

            {/* File d'action */}
            {data.queue.length > 0 && (
              <section className="space-y-2">
                <h2 className="font-title-sm text-title-sm text-on-surface">À faire maintenant</h2>
                <div className="space-y-2">
                  {data.queue.map((item, i) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-3 bg-surface border border-outline-variant rounded-xl p-3.5 hover:bg-surface-container-low active:scale-[0.98] duration-100"
                    >
                      <span className="w-7 h-7 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-label-sm text-on-surface">{i + 1}</span>
                      <span className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.subject_color + "1A", color: item.subject_color }}>
                        <span className="material-symbols-outlined text-[22px]">{item.type === "lesson" ? "menu_book" : "quiz"}</span>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-sm text-on-surface truncate">{item.type === "lesson" ? item.lesson_title : item.quiz_title}</p>
                        <p className="font-label-xs text-on-surface-variant truncate">{item.subject_name} · {item.chapter_title}</p>
                      </div>
                      <div className="text-right shrink-0 hidden sm:block">
                        <p className="font-label-xs text-primary">{item.reason}</p>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant shrink-0">chevron_right</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Matières & chapitres */}
            <section className="space-y-3 pb-8">
              <h2 className="font-title-sm text-title-sm text-on-surface">Matières & chapitres</h2>
              {data.subjects.map((subj) => {
                const read = subj.chapters.reduce((a, c) => a + c.lessons_read, 0);
                const total = subj.chapters.reduce((a, c) => a + c.lessons_total, 0);
                const pct = total > 0 ? Math.round((read / total) * 100) : 0;
                const isOpen = open[subj.id] ?? true;
                return (
                  <div key={subj.id} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpen((o) => ({ ...o, [subj.id]: !o[subj.id] }))}
                      className="w-full flex items-center gap-3 p-4 text-left active:bg-surface-container-low duration-100"
                    >
                      <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: subj.color + "1A", color: subj.color }}>
                        <span className="material-symbols-outlined text-[24px]">{subj.icon}</span>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-md font-semibold text-on-surface">{subj.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-outline-variant/60 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ backgroundColor: subj.color, width: `${pct}%` }}></div>
                          </div>
                          <span className="font-label-xs text-on-surface-variant">{read}/{total}</span>
                        </div>
                      </div>
                      <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`}>expand_more</span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-outline-variant/60">
                        {subj.chapters.map((ch) => {
                          const st = STATUS_STYLE[ch.status];
                          return (
                            <div key={ch.id} className="px-4 py-3 border-b border-outline-variant/40 last:border-b-0 space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-label-sm text-on-surface">{ch.title}</p>
                                <span className={`font-label-xs flex items-center gap-1 px-2 py-0.5 rounded-full ${st.bg} ${st.text} shrink-0`}>
                                  <span className="material-symbols-outlined text-[12px]">{st.icon}</span>{ch.status_label}
                                </span>
                              </div>
                              <div className="h-1.5 bg-outline-variant/60 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ backgroundColor: ch.progress >= 100 ? "#1b873b" : subj.color, width: `${Math.max(ch.progress, ch.lessons_read > 0 ? 6 : 0)}%` }}></div>
                              </div>
                              <p className="font-label-xs text-on-surface-variant">
                                {ch.lessons_read}/{ch.lessons_total} fiches lues
                                {ch.best_percent !== null ? ` · quiz ${ch.best_percent}%` : ""}
                              </p>
                              {(ch.next_lesson || ch.quiz) && (
                                <div className="flex gap-2 pt-1">
                                  {ch.next_lesson && (
                                    <Link href={`/fiches/${ch.next_lesson.id}`} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-full border border-outline-variant text-primary font-label-xs active:scale-95 duration-100">
                                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                                      Lire {ch.next_lesson.title}
                                    </Link>
                                  )}
                                  {ch.quiz && (
                                    <Link href={`/quiz/${ch.quiz.id}`} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-full bg-primary text-on-primary font-label-xs active:scale-95 duration-100">
                                      <span className="material-symbols-outlined text-[16px]">quiz</span>
                                      Quiz
                                    </Link>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
