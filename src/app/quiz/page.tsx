"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Quiz {
  id: number;
  subject_name: string;
  icon: string;
  color: string;
  title: string;
  level: string;
  question_count: number;
  best_percent: number | null;
  attempts: number;
}

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);

  const subjects = Array.from(new Set(quizzes.map((q) => q.subject_name)));
  const filtered = subjectFilter ? quizzes.filter((q) => q.subject_name === subjectFilter) : quizzes;

  useEffect(() => {
    fetch("/api/quiz")
      .then((r) => r.json())
      .then((d) => setQuizzes(d.quizzes ?? []))
      .finally(() => setLoading(false));
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((d) => setFavs(new Set((d.favorites ?? []).filter((f: { item_type: string }) => f.item_type === "quiz").map((f: { item_id: number }) => f.item_id))))
      .catch(() => {});
  }, []);

  async function toggleFav(e: React.MouseEvent, id: number) {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_type: "quiz", item_id: id }),
    });
    const data = await res.json();
    setFavs((prev) => {
      const next = new Set(prev);
      if (data.favorite) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Quiz" subtitle="Teste-toi et progresse" />

      <main className="px-margin-mobile pt-6 space-y-3">
        {subjects.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSubjectFilter(null)}
              className={`shrink-0 px-4 py-2 rounded-full font-label-sm transition-colors ${subjectFilter === null ? "bg-primary text-on-primary" : "bg-surface border border-outline-variant text-on-surface-variant"}`}
            >
              Toutes
            </button>
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSubjectFilter(subjectFilter === s ? null : s)}
                className={`shrink-0 px-4 py-2 rounded-full font-label-sm transition-colors ${subjectFilter === s ? "bg-primary text-on-primary" : "bg-surface border border-outline-variant text-on-surface-variant"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-on-surface-variant py-16">Aucun quiz dans cette matière.</p>
        ) : (
          filtered.map((q) => (
            <Link
              key={q.id}
              href={`/quiz/${q.id}`}
              className="block bg-surface rounded-xl border border-outline-variant p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-150"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ backgroundColor: q.color + "22", color: q.color }}
              >
                <span className="material-symbols-outlined">{q.icon || "quiz"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-xs font-bold uppercase tracking-wider" style={{ color: q.color }}>{q.subject_name}</span>
                  <span className="font-label-xs text-on-surface-variant">{q.level}</span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface truncate">{q.title}</h3>
                <p className="font-label-xs text-on-surface-variant">
                  {q.question_count} questions · {q.attempts} tentative{q.attempts > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                {q.best_percent !== null && (
                  <>
                    <p className="font-title-md text-title-md text-primary">{Math.round(q.best_percent)}%</p>
                    <p className="font-label-xs text-on-surface-variant">record</p>
                  </>
                )}
                <button
                  onClick={(e) => toggleFav(e, q.id)}
                  aria-label="Ajouter aux favoris"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${favs.has(q.id) ? "text-primary" : "text-on-surface-variant hover:bg-surface-container-high"}`}
                >
                  <span className="material-symbols-outlined" style={favs.has(q.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>{favs.has(q.id) ? "bookmark" : "bookmark_border"}</span>
                </button>
              </div>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
