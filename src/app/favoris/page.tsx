"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Favorite {
  item_type: string;
  item_id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  level: string | null;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/favorites")
      .then((r) => r.json())
      .then((d) => setFavorites(d.favorites ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/accueil-edukora" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-title-md text-title-md text-on-surface">Mes favoris</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">Quiz et sujets sauvegardés</p>
        </div>
      </header>

      <main className="px-margin-mobile pt-6 space-y-3">
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-3xl">bookmark</span>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-xs mx-auto">
              Aucun favori pour l&apos;instant. Touche l&apos;icône bookmark sur un quiz ou un sujet pour le retrouver ici.
            </p>
            <Link href="/quiz" className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full mt-2">Parcourir les quiz</Link>
          </div>
        ) : (
          favorites.map((f) => (
            <Link
              key={`${f.item_type}-${f.item_id}`}
              href={f.item_type === "quiz" ? `/quiz/${f.item_id}` : `/simulateur/${f.item_id}`}
              className="block bg-surface rounded-xl border border-outline-variant p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-150"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: f.color + "22", color: f.color }}>
                <span className="material-symbols-outlined">{f.icon || "quiz"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-xs font-bold uppercase tracking-wider" style={{ color: f.color }}>{f.subtitle}</span>
                  {f.level && <span className="font-label-xs text-on-surface-variant">{f.level}</span>}
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface truncate">{f.title}</h3>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant shrink-0">chevron_right</span>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
