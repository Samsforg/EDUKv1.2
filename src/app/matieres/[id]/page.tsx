"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Chapter {
  id: number;
  title: string;
  position: number;
  lessons_total: number;
  lessons_read: number;
  quiz_count: number;
  attempts: number;
  best_percent: number | null;
  progress: number;
}

interface SubjectDetail {
  id: number;
  name: string;
  icon: string;
  color: string;
  lessons_total: number;
  lessons_read: number;
  quizzes_total: number;
  attempts: number;
  best_percent: number | null;
}

export default function SubjectPage() {
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<SubjectDetail | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/subjects/${id}`)
      .then(async (r) => {
        if (!r.ok) {
          setError("Matière introuvable.");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) {
          setSubject(d.subject);
          setChapters(d.chapters);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const overall = subject && subject.lessons_total > 0
    ? Math.round((subject.lessons_read / subject.lessons_total) * 100)
    : 0;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/matieres" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-title-md text-title-md text-on-surface truncate">{subject?.name ?? "Matière"}</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">Progression par chapitre</p>
        </div>
        {subject && (
          <Link href="/quiz" className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary-container/15 active:scale-95 duration-100" aria-label="Faire un quiz">
            <span className="material-symbols-outlined">quiz</span>
          </Link>
        )}
      </header>

      <main className="px-margin-mobile pt-4 space-y-4">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {error && (
          <div className="text-center py-16 space-y-4">
            <p className="font-body-md text-on-surface-variant">{error}</p>
            <Link href="/matieres" className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full">Retour aux matières</Link>
          </div>
        )}

        {!loading && !error && subject && (
          <>
            {/* Vue d'ensemble */}
            <section className="bg-surface border border-outline-variant rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: subject.color + "22", color: subject.color }}>
                  <span className="material-symbols-outlined text-[28px]">{subject.icon}</span>
                </span>
                <div className="flex-1">
                  <p className="font-label-sm text-on-surface-variant">Progression globale</p>
                  <p className="font-headline-md text-headline-md text-on-surface">
                    {subject.lessons_read}<span className="font-body-sm text-on-surface-variant">/{subject.lessons_total} fiches lues</span>
                  </p>
                </div>
                <span className="font-title-md text-title-md" style={{ color: subject.color }}>{overall}%</span>
              </div>
              <div className="h-2 bg-outline-variant/60 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ backgroundColor: subject.color, width: `${overall}%` }} />
              </div>
              <div className="flex gap-3 pt-1">
                <div className="flex-1 rounded-xl bg-surface-container-lowest border border-outline-variant p-3 text-center">
                  <p className="font-title-md text-title-md text-primary">{subject.best_percent != null ? `${Math.round(subject.best_percent)}%` : "—"}</p>
                  <p className="font-label-xs text-on-surface-variant">Meilleur quiz</p>
                </div>
                <div className="flex-1 rounded-xl bg-surface-container-lowest border border-outline-variant p-3 text-center">
                  <p className="font-title-md text-title-md text-on-surface">{subject.attempts}</p>
                  <p className="font-label-xs text-on-surface-variant">Quiz tentés</p>
                </div>
                <div className="flex-1 rounded-xl bg-surface-container-lowest border border-outline-variant p-3 text-center">
                  <p className="font-title-md text-title-md text-on-surface">{subject.quizzes_total}</p>
                  <p className="font-label-xs text-on-surface-variant">Quiz dispo</p>
                </div>
              </div>
            </section>

            {/* Chapitres */}
            <section className="space-y-2">
              <h2 className="font-title-sm text-title-sm text-on-surface">Chapitres</h2>
              {chapters.map((c) => (
                <div key={c.id} className="bg-surface border border-outline-variant rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-label-md font-semibold text-on-surface">{c.title}</h3>
                    <span className="font-label-sm text-on-surface-variant shrink-0">{c.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-outline-variant/60 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ backgroundColor: c.progress >= 100 ? "#1b873b" : subject.color, width: `${Math.max(c.progress, c.lessons_read > 0 ? 6 : 0)}%` }} />
                  </div>
                  <p className="font-label-xs text-on-surface-variant">
                    {c.lessons_read}/{c.lessons_total} fiches lues
                    {c.best_percent != null ? ` · meilleur quiz ${c.best_percent}%` : ""}
                    {c.attempts > 0 ? ` · ${c.attempts} tentative${c.attempts > 1 ? "s" : ""}` : " · pas encore tenté"}
                  </p>
                  <div className="flex gap-2 pt-1">
                    {c.lessons_total > 0 && (
                      <Link href={`/fiches?chapitre=${c.id}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-outline-variant text-primary font-label-sm active:scale-95 duration-100">
                        <span className="material-symbols-outlined text-lg">menu_book</span> Fiches
                      </Link>
                    )}
                    {c.quiz_count > 0 && (
                      <Link href="/quiz" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-primary text-on-primary font-label-sm active:scale-95 duration-100">
                        <span className="material-symbols-outlined text-lg">quiz</span> Quiz
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
