"use client";

import Link from "next/link";

interface SubjectCard {
  subject_id: number;
  name: string;
  icon: string;
  color: string;
  best_percent: number | null;
  total_attempts: number;
}

interface SubjectCardsClientProps {
  subjects: SubjectCard[];
}

export default function SubjectCardsClient({ subjects }: SubjectCardsClientProps) {
  return (
    <section className="space-y-stack-md pb-8">
      <div className="flex justify-between items-center">
        <h2 className="font-headline-md text-headline-md text-on-surface">Tes Matières</h2>
        <Link href="/matieres" className="text-primary font-label-sm">Voir tout</Link>
      </div>
      <div className="grid grid-cols-1 gap-gutter">
        {subjects.map((s) => (
          <Link key={s.subject_id} href={`/matieres/${s.subject_id}`} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
            <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "1A", color: s.color }}>
              <span className="material-symbols-outlined text-[32px]">{s.icon || "menu_book"}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-body-lg text-body-lg text-on-surface">{s.name}</h4>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ backgroundColor: s.color, width: `${s.best_percent ?? 0}%` }}></div>
                </div>
                <span className="text-label-xs font-label-xs text-on-surface">{s.best_percent != null ? `${s.best_percent}%` : "—"}</span>
              </div>
            </div>
          </Link>
        ))}
        {!subjects.length && (
          <div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px]">menu_book</span>
            </div>
            <div className="flex-1">
              <h4 className="font-body-lg text-body-lg text-on-surface">Lance-toi pour commencer !</h4>
              <p className="text-label-xs text-on-surface mt-1">Fais un quiz ou un sujet d'examen pour voir tes scores par matière.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}