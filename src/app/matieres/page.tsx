"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Subject {
  id: number;
  code: string;
  name: string;
  icon: string;
  color: string;
  quiz_count: number;
  paper_count: number;
  best_score: number | null;
  lessons_total: number;
  lessons_read: number;
  quiz_attempts: number;
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subjects")
      .then((r) => r.json())
      .then((d) => setSubjects(d.subjects ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Toutes les matières" subtitle="Choisis une matière pour t'entraîner" />

      <main className="px-margin-mobile pt-6 space-y-3">
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        ) : (
          subjects.map((s) => {
            const pct = s.lessons_total > 0 ? Math.round((s.lessons_read / s.lessons_total) * 100) : 0;
            return (
            <Link
              key={s.id}
              href={`/matieres/${s.id}`}
              className="block bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors active:scale-[0.98] duration-150"
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "1A", color: s.color }}>
                <span className="material-symbols-outlined text-[32px]">{s.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body-lg text-body-lg text-on-surface">{s.name}</h4>
                <p className="font-label-xs text-on-surface-variant mt-0.5">
                  {s.lessons_read}/{s.lessons_total} fiches lues · {s.quiz_attempts} quiz tentés
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ backgroundColor: s.color, width: `${Math.min(100, pct)}%` }}></div>
                  </div>
                  <span className="text-label-xs font-label-xs text-on-surface-variant">{pct}%</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant shrink-0">chevron_right</span>
            </Link>
            );
          })
        )}
      </main>
    </div>
  );
}
