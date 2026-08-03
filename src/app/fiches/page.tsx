"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LessonItem {
  id: number;
  title: string;
  saved: boolean;
  read: boolean;
}

interface Chapter {
  id: number;
  title: string;
  lessons: LessonItem[];
}

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export default function FichesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const targetChapter = Number(new URLSearchParams(window.location.search).get("chapitre"));
    fetch("/api/lessons")
      .then((r) => r.json())
      .then((d) => {
        if (d.subjects) {
          setSubjects(d.subjects);
          const initial: Record<number, boolean> = {};
          d.subjects.forEach((s: Subject) => {
            const contains = targetChapter > 0 && s.chapters.some((c) => c.id === targetChapter);
            initial[s.id] = !contains;
            if (contains) setTimeout(() => {
              document.getElementById(`chapitre-${targetChapter}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 150);
          });
          setOpen(initial);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const totalRead = subjects.reduce(
    (acc, s) => acc + s.chapters.reduce((a, c) => a + c.lessons.filter((l) => l.read).length, 0),
    0,
  );
  const totalLessons = subjects.reduce(
    (acc, s) => acc + s.chapters.reduce((a, c) => a + c.lessons.length, 0),
    0,
  );

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/accueil-edukora" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-title-md text-title-md text-on-surface truncate">Fiches de cours</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">{totalRead}/{totalLessons} fiches lues</p>
        </div>
        <Link href="/ma-bibliotheque" className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary-container/15 active:scale-95 duration-100" aria-label="Ma bibliothèque">
          <span className="material-symbols-outlined">collections_bookmark</span>
        </Link>
      </header>

      <main className="px-margin-mobile pt-4 space-y-4">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {!loading && totalLessons > 0 && (
          <div className="bg-primary-container/20 rounded-xl p-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">book</span>
            <p className="font-body-sm text-on-surface flex-1">
              {totalRead >= totalLessons
                ? "Bravo ! Tu as lu toutes les fiches. 🎉"
                : `${totalRead} fiche${totalRead > 1 ? "s" : ""} lue${totalRead > 1 ? "s" : ""} — continue, la régularité paie !`}
            </p>
          </div>
        )}

        {!loading &&
          subjects.map((s) => (
            <section key={s.id} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))}
                className="w-full flex items-center gap-3 px-4 py-4"
              >
                <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}22`, color: s.color }}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </span>
                <div className="flex-1 text-left">
                  <h2 className="font-label-md font-semibold text-on-surface">{s.name}</h2>
                  <p className="font-label-xs text-on-surface-variant">
                    {s.chapters.reduce((a, c) => a + c.lessons.length, 0)} fiches
                  </p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-200" style={{ transform: open[s.id] ? "rotate(180deg)" : "none" }}>
                  expand_more
                </span>
              </button>

              {open[s.id] &&
                s.chapters.map((c) => (
                  <div key={c.id} id={`chapitre-${c.id}`} className="border-t border-outline-variant/60 px-4 py-3">
                    <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wide mb-2">{c.title}</h3>
                    <div className="space-y-1">
                      {c.lessons.map((l) => (
                        <Link
                          key={l.id}
                          href={`/fiches/${l.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-container-low active:scale-[0.99] duration-100"
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${l.read ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"}`}>
                            <span className="material-symbols-outlined text-sm">{l.read ? "check" : "radio_button_unchecked"}</span>
                          </span>
                          <span className="flex-1 font-body-sm text-on-surface truncate">{l.title}</span>
                          <span className={`material-symbols-outlined text-lg ${l.saved ? "text-primary" : "text-outline-variant"}`}>
                            {l.saved ? "bookmark" : "bookmark_border"}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </section>
          ))}
      </main>
    </div>
  );
}
