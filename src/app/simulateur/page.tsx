"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Paper {
  id: number;
  category: string;
  year: number;
  title: string;
  duration_minutes: number;
  subject_name: string;
  icon: string;
  color: string;
  question_count: number;
  best_score: number | null;
}

export default function SimulatorListPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);

  const subjects = Array.from(new Set(papers.map((p) => p.subject_name)));
  const filtered = subjectFilter ? papers.filter((p) => p.subject_name === subjectFilter) : papers;

  useEffect(() => {
    fetch("/api/simulator")
      .then((r) => r.json())
      .then((d) => setPapers(d.papers ?? []))
      .finally(() => setLoading(false));
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((d) => setFavs(new Set((d.favorites ?? []).filter((f: { item_type: string }) => f.item_type === "paper").map((f: { item_id: number }) => f.item_id))))
      .catch(() => {});
  }, []);

  async function toggleFav(e: React.MouseEvent, id: number) {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_type: "paper", item_id: id }),
    });
    const data = await res.json();
    setFavs((prev) => {
      const next = new Set(prev);
      if (data.favorite) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  const bac = papers.filter((p) => p.category === "BAC");
  const bepc = papers.filter((p) => p.category === "BEPC");

  function renderGroup(title: string, icon: string, items: Paper[]) {
    return (
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary">{icon}</span>
          <h2 className="font-title-md text-title-md text-on-surface">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/simulateur/${p.id}`}
              className="block bg-surface rounded-xl border border-outline-variant p-4 active:scale-[0.98] transition-transform duration-150"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: p.color + "22", color: p.color }}>
                  <span className="material-symbols-outlined">{p.icon || "description"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-xs font-bold uppercase tracking-wider" style={{ color: p.color }}>{p.subject_name}</span>
                    <span className="font-label-xs text-on-surface-variant">{p.year}</span>
                  </div>
                  <h3 className="font-title-sm text-title-sm text-on-surface truncate">{p.title}</h3>
                  <p className="font-label-xs text-on-surface-variant">
                    {p.question_count} questions · {p.duration_minutes} min
                  </p>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                  {p.best_score !== null && (
                    <>
                      <p className="font-title-md text-title-md text-primary">{p.best_score}<span className="text-label-sm text-on-surface-variant">/20</span></p>
                      <p className="font-label-xs text-on-surface-variant">record</p>
                    </>
                  )}
                  <button
                    onClick={(e) => toggleFav(e, p.id)}
                    aria-label="Ajouter aux favoris"
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${favs.has(p.id) ? "text-primary" : "text-on-surface-variant hover:bg-surface-container-high"}`}
                  >
                    <span className="material-symbols-outlined" style={favs.has(p.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>{favs.has(p.id) ? "bookmark" : "bookmark_border"}</span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/accueil-edukora" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-title-md text-title-md text-on-surface">Simulateur d&apos;examen</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">Sujets officiels BAC &amp; BEPC</p>
        </div>
      </header>

      <main className="px-margin-mobile pt-6 space-y-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        ) : (
          <>
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
            {bac.length > 0 && filtered.some((p) => p.category === "BAC") && renderGroup("BAC — Session 2024", "school", filtered.filter((p) => p.category === "BAC"))}
            {bepc.length > 0 && filtered.some((p) => p.category === "BEPC") && renderGroup("BEPC — Session 2024", "menu_book", filtered.filter((p) => p.category === "BEPC"))}
            {filtered.length === 0 && <p className="text-center text-on-surface-variant py-16">Aucun sujet dans cette matière.</p>}
          </>
        )}
      </main>
    </div>
  );
}
