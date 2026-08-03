"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Replay {
  id: number;
  title: string;
  subject_name: string;
  tagline: string;
  category: string;
  animator_name: string;
  starts_at: string;
  duration_minutes: number;
  viewers: number;
  gradient: string;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export default function ReplaysPage() {
  const [data, setData] = useState<{ replays: Replay[]; categories: string[] } | null>(null);
  const [error, setError] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  useEffect(() => {
    const url = `/api/live?view=replays&q=${encodeURIComponent(q)}&cat=${encodeURIComponent(cat)}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, [q, cat]);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Connecte-toi pour voir les replays</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  const replays = data?.replays ?? [];

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-16">
      <PageHeader
        title="Replays & Archives"
        backHref="/espace-live"
        right={
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary text-primary font-bold text-sm">
            <span className="material-symbols-outlined text-[18px]">replay</span>
          </div>
        }
      />

      <main className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-6 space-y-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une session, une matière, un professeur..."
            className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCat("")}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition-colors ${
              !cat ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            Toutes
          </button>
          {(data?.categories ?? []).map((c) => (
            <button
              key={c}
              onClick={() => setCat(cat === c ? "" : c)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold active:scale-95 transition-colors ${
                cat === c ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {replays.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">videocam_off</span>
            <p className="font-bold text-on-surface">Aucun replay trouvé</p>
            <p className="text-sm mt-1">Essaie une autre recherche ou catégorie.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {replays.map((s) => (
            <Link
              key={s.id}
              href={`/replays/${s.id}`}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className={`relative h-40 bg-gradient-to-br ${s.gradient}`}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-black/50 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">replay</span>
                    Replay
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-xs font-bold drop-shadow-md">{s.animator_name}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-secondary-container/90 text-on-secondary-container flex items-center justify-center shadow-xl">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-tertiary font-bold text-xs uppercase tracking-tight mb-1">{s.subject_name}</span>
                <h4 className="font-bold text-on-surface text-lg leading-snug line-clamp-2">{s.title}</h4>
                <div className="mt-auto pt-3 flex items-center justify-between text-on-surface-variant text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {fmtDate(s.starts_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">group</span>
                    {s.viewers.toLocaleString("fr-FR")}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {s.duration_minutes} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
