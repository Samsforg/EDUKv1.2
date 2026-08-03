"use client";

import { useMemo, useState } from "react";

export interface ExamItem {
  id: number;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  score_over_20: number;
  date: string;
  relative: string;
  status: string;
  status_color: string;
  trend: "up" | "down" | "flat" | null;
}

export function ExamList({ exams }: { exams: ExamItem[] }) {
  const [filter, setFilter] = useState<string>("Tous");
  const subjects = useMemo(() => {
    const set = new Set<string>();
    exams.forEach((e) => set.add(e.subject_name));
    return ["Tous", ...set];
  }, [exams]);

  const visible = filter === "Tous" ? exams : exams.filter((e) => e.subject_name === filter);

  return (
    <div className="space-y-4">
      <nav className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={
              filter === s
                ? "shrink-0 bg-primary text-on-primary px-6 py-2 rounded-full font-label text-label-sm transition-all shadow-md"
                : "shrink-0 bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-label text-label-sm hover:bg-surface-container-highest transition-all"
            }
          >
            {s}
          </button>
        ))}
      </nav>

      <div className="space-y-4">
        {visible.length === 0 && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 text-center">
            <p className="text-sm text-on-surface-variant">Aucun examen pour cette matière.</p>
          </div>
        )}
        {visible.map((e) => (
          <div key={e.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${e.subject_color}18` }}>
                  <span className="material-symbols-outlined" style={{ color: e.subject_color }}>
                    {e.subject_icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface">{e.subject_name}</h4>
                  <p className="text-label-xs text-on-surface-variant">{e.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-headline-md font-bold text-primary">{e.score_over_20}/20</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    e.status_color === "tertiary" ? "bg-tertiary-container/20 text-tertiary" : "bg-error-container text-on-error-container"
                  }`}
                >
                  {e.status}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/50">
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    e.trend === "up" ? "text-tertiary" : e.trend === "down" ? "text-error" : "text-on-surface-variant"
                  }`}
                >
                  {e.trend === "up" ? "trending_up" : e.trend === "down" ? "trending_down" : "trending_flat"}
                </span>
                <span className="text-label-sm font-semibold text-on-surface-variant">
                  {e.trend === "up" ? "Excellente progression" : e.trend === "down" ? "Focus à renforcer" : "Résultat stable"}
                </span>
              </div>
              <span className="text-label-xs text-on-surface-variant">{e.relative}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
