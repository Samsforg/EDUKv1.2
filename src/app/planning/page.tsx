"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Slot {
  time: string;
  period: string;
  type: "lesson" | "quiz" | "exam";
  title: string;
  subtitle: string;
  href: string;
  subject: { id: number; name: string; icon: string; color: string };
}

interface DayPlan {
  day: string;
  label: string;
  date: string;
  is_today: boolean;
  slots: Slot[];
}

interface PlanningData {
  week_start: string;
  focus: { id: number; name: string; icon: string; color: string };
  summary: { sessions: number; intensity_hours: number; unread: number; to_revise: number };
  days: DayPlan[];
}

const TYPE_LABEL: Record<Slot["type"], string> = {
  lesson: "Fiche",
  quiz: "Quiz",
  exam: "Examen",
};

const TYPE_ICON: Record<Slot["type"], string> = {
  lesson: "menu_book",
  quiz: "quiz",
  exam: "school",
};

export default function PlanningPage() {
  const [data, setData] = useState<PlanningData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/planning")
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Planning de révisions" subtitle="Ta semaine générée automatiquement" />

      <main className="px-margin-mobile pt-4 space-y-5">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Focus + intensité */}
            <section className="grid grid-cols-2 gap-3">
              <div className="bg-surface border border-outline-variant rounded-xl p-4">
                <p className="font-label-xs text-on-surface-variant uppercase tracking-wider mb-2">Focus prioritaire</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: data.focus.color + "1A", color: data.focus.color }}>
                    <span className="material-symbols-outlined">{data.focus.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-sm font-semibold text-on-surface truncate">{data.focus.name}</p>
                    <p className="font-label-xs text-on-surface-variant">{data.summary.to_revise} chapitre{data.summary.to_revise > 1 ? "s" : ""} à renforcer</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary rounded-xl p-4 text-on-primary">
                <p className="font-label-xs uppercase tracking-wider opacity-80 mb-2">Intensité hebdo</p>
                <p className="font-title-md text-title-md text-2xl font-bold">{data.summary.intensity_hours}h</p>
                <p className="font-label-xs opacity-80 mt-1">{data.summary.sessions} sessions cette semaine</p>
              </div>
            </section>

            {/* Légende */}
            <section className="flex items-center gap-4 text-label-xs text-on-surface-variant">
              {(["lesson", "quiz", "exam"] as const).map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-full ${t === "lesson" ? "bg-primary" : t === "quiz" ? "bg-secondary" : "bg-tertiary"}`}></span>
                  {TYPE_LABEL[t]}
                </span>
              ))}
              <span className="ml-auto">{data.week_start.slice(5).replace("-", "/")}</span>
            </section>

            {/* Grille de la semaine */}
            <section className="overflow-x-auto -mx-margin-mobile px-margin-mobile pb-2 no-scrollbar">
              <div className="grid grid-cols-7 gap-2 min-w-[980px]">
                {data.days.map((d) => (
                  <div key={d.day} className={`rounded-xl border ${d.is_today ? "border-primary bg-primary-container/10" : "border-outline-variant bg-surface"}`}>
                    <div className={`p-3 text-center border-b ${d.is_today ? "border-primary/30" : "border-outline-variant"}`}>
                      <p className={`font-label-xs font-bold uppercase tracking-wider ${d.is_today ? "text-primary" : "text-on-surface-variant"}`}>{d.day}</p>
                      <p className="font-label-xs text-on-surface-variant">{new Date(d.date).toLocaleDateString("fr-FR", { day: "2-digit" })}</p>
                    </div>
                    <div className="p-2 space-y-2 min-h-[220px]">
                      {d.slots.length === 0 && (
                        <p className="text-center text-label-xs text-on-surface-variant/60 pt-8">Libre</p>
                      )}
                      {d.slots.map((s, i) => (
                        <Link
                          key={`${d.day}-${s.time}-${i}`}
                          href={s.href}
                          className="block rounded-lg p-2.5 border-l-4 active:scale-[0.97] transition-transform duration-100"
                          style={{ backgroundColor: s.subject.color + "12", borderLeftColor: s.subject.color }}
                        >
                          <p className="font-label-xs font-bold flex items-center gap-1" style={{ color: s.subject.color }}>
                            <span className="material-symbols-outlined text-[14px]">{TYPE_ICON[s.type]}</span>
                            {s.period}
                          </p>
                          <p className="font-label-xs font-semibold text-on-surface leading-tight mt-1">{s.title}</p>
                          <p className="font-label-xs text-on-surface-variant leading-tight truncate">{s.subtitle}</p>
                          <p className="font-label-xs text-on-surface-variant mt-1">{s.time}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <p className="text-center text-label-xs text-on-surface-variant pb-4">
              Planning recalculé selon ta progression. Fais tes révisions et reviens pour le mettre à jour.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
