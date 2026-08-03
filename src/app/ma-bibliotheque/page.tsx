"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SavedLesson {
  id: number;
  title: string;
  summary: string;
  subject: string;
  subjectIcon: string;
  subjectColor: string;
}

export default function BibliothequePage() {
  const [lessons, setLessons] = useState<SavedLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/lessons")
      .then((r) => r.json())
      .then((d) => {
        if (d.subjects) {
          const saved: SavedLesson[] = [];
          d.subjects.forEach((s: { name: string; icon: string; color: string; chapters: { title: string; lessons: { id: number; title: string; saved: boolean }[] }[] }) =>
            s.chapters.forEach((c) =>
              c.lessons.forEach((l) => {
                if (l.saved) saved.push({ id: l.id, title: l.title, summary: c.title, subject: s.name, subjectIcon: s.icon, subjectColor: s.color });
              }),
            ),
          );
          setLessons(saved);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/fiches" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-title-md text-title-md text-on-surface truncate">Ma bibliothèque</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">Fiches sauvegardées pour le hors-ligne</p>
        </div>
      </header>

      <main className="px-margin-mobile pt-4 space-y-2">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {!loading && lessons.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-3xl">collections_bookmark</span>
            </div>
            <p className="font-body-md text-on-surface-variant">Aucune fiche sauvegardée.</p>
            <p className="font-body-sm text-on-surface-variant">Ouvre une fiche puis touche le signet pour la garder disponible hors-ligne.</p>
            <Link href="/fiches" className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full active:scale-95 transition-transform duration-100">
              Explorer les fiches
            </Link>
          </div>
        )}

        {lessons.map((l) => (
          <Link
            key={l.id}
            href={`/fiches/${l.id}`}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface border border-outline-variant hover:bg-surface-container-low active:scale-[0.99] duration-100"
          >
            <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${l.subjectColor}22`, color: l.subjectColor }}>
              <span className="material-symbols-outlined">{l.subjectIcon}</span>
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-label-md font-semibold text-on-surface truncate">{l.title}</span>
              <span className="block font-label-xs text-on-surface-variant truncate">{l.subject} · {l.summary}</span>
            </span>
            <span className="material-symbols-outlined text-primary">bookmark</span>
          </Link>
        ))}
      </main>
    </div>
  );
}
