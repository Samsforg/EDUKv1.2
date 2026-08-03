"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LiveSession {
  id: number;
  title: string;
  subject_name: string;
  tagline: string;
  description: string;
  category: string;
  animator_name: string;
  animator_title: string;
  status: string;
  starts_at: string;
  duration_minutes: number;
  viewers: number;
  gradient: string;
}

interface LiveHub {
  live_now: LiveSession | null;
  upcoming: LiveSession[];
  replays: LiveSession[];
  categories: string[];
  me?: string;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const isTomorrow = d.toDateString() === tomorrow.toDateString();
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  if (sameDay) return `Aujourd'hui, ${time}`;
  if (isTomorrow) return `Demain, ${time}`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + `, ${time}`;
}

function useRemaining(iso: string) {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const tick = () => {
      const diff = new Date(iso).getTime() - Date.now();
      if (diff <= 0) return setLabel("Commence bientôt");
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setLabel(h > 0 ? `${h}h ${m}m` : `${m}m`);
    };
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, [iso]);
  return label;
}

const CATEGORY_ICON: Record<string, string> = {
  Sciences: "calculate",
  Littérature: "history_edu",
  Langues: "public",
  SVT: "menu_book",
  Physique: "science",
};

export default function EspaceLivePage() {
  const [data, setData] = useState<LiveHub | null>(null);
  const [error, setError] = useState(false);
  const [cat, setCat] = useState<string>("");

  useEffect(() => {
    fetch("/api/live")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Connecte-toi pour accéder à Edukora Live</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  const live = data?.live_now ?? null;
  const upcoming = (data?.upcoming ?? []).filter((s) => !cat || s.category === cat);

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-28">
      <header className="flex justify-between items-center px-margin-mobile h-16 bg-primary text-on-primary shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/accueil-edukora" className="p-2 -ml-2 rounded-full hover:bg-primary-container/20 active:scale-95 duration-100">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-title-md text-title-md font-bold">Edukora Live</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-on-primary/30 text-on-primary-container font-bold text-sm">
          {(data?.me ?? "U").slice(0, 1)}
        </div>
      </header>

      <main className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto py-6 space-y-8">
        {live && (
          <section className="relative overflow-hidden rounded-xl bg-primary-container aspect-[16/9] md:aspect-[21/9] shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-secondary" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className="bg-error text-on-error px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                En Direct
              </span>
              <span className="bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">visibility</span>
                {live.viewers.toLocaleString("fr-FR")} élèves
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-lg">
                <p className="text-on-primary-container font-semibold text-sm mb-1 uppercase tracking-widest">{live.tagline}</p>
                <h2 className="text-white font-title-md md:text-3xl font-extrabold leading-tight">{live.title}</h2>
                <p className="text-white/80 mt-2 text-sm line-clamp-2">{live.description}</p>
              </div>
              <Link
                href={`/espace-live/${live.id}/direct`}
                className="bg-secondary-container text-on-secondary-container font-bold px-8 py-3 rounded-lg flex items-center justify-center gap-2 active:scale-95 shadow-md hover:brightness-110"
              >
                REJOINDRE
                <span className="material-symbols-outlined">play_arrow</span>
              </Link>
            </div>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-title-md text-title-md text-on-surface font-semibold">Catégories</h3>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-2">
            <button
              onClick={() => setCat("")}
              className={`flex-none px-6 py-4 rounded-xl flex flex-col items-center justify-center gap-2 min-w-[110px] shadow-sm active:scale-95 transition-colors ${
                !cat ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined text-3xl">apps</span>
              <span className="font-semibold text-sm">Toutes</span>
            </button>
            {(data?.categories ?? []).map((c) => (
              <button
                key={c}
                onClick={() => setCat(cat === c ? "" : c)}
                className={`flex-none px-6 py-4 rounded-xl flex flex-col items-center justify-center gap-2 min-w-[110px] shadow-sm active:scale-95 transition-colors ${
                  cat === c ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                }`}
              >
                <span className="material-symbols-outlined text-3xl">{CATEGORY_ICON[c] ?? "school"}</span>
                <span className="font-semibold text-sm">{c}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-title-md text-title-md text-on-surface font-semibold">Prochains Lives</h3>
          {upcoming.length === 0 && (
            <p className="text-on-surface-variant text-sm bg-surface border border-outline-variant rounded-xl p-4">
              Aucune session programmée dans cette catégorie pour l'instant.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((s) => (
              <LiveCard key={s.id} s={s} />
            ))}
          </div>
        </section>

        <section className="bg-tertiary-container text-on-tertiary-container p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-2">
            <h4 className="font-title-md font-bold">Ne manquez aucun direct !</h4>
            <p className="text-on-tertiary-container/80 text-sm">
              Activez les notifications pour être informé 15 minutes avant chaque session stratégique pour votre réussite.
            </p>
          </div>
          <Link
            href="/notifications"
            className="w-full md:w-auto bg-on-tertiary-container text-tertiary-container font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
            S'ABONNER AUX ALERTES
          </Link>
        </section>

        {(data?.replays ?? []).length > 0 && (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">Replays</h3>
              <Link href="/replays" className="text-primary font-semibold text-sm hover:underline">
                Voir tout
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.replays ?? []).slice(0, 3).map((s) => (
                <ReplayCard key={s.id} s={s} />
              ))}
            </div>
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-xl">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant group" href="/accueil-edukora">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">home</span>
          <span className="font-label-xs font-medium">Accueil</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant group" href="/cours">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">menu_book</span>
          <span className="font-label-xs font-medium">Cours</span>
        </Link>
        <Link className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-6 py-1 active:scale-90 transition-transform" href="/espace-live">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>live_tv</span>
          <span className="font-label-xs font-medium">Direct</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant group" href="/profil">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">person</span>
          <span className="font-label-xs font-medium">Profil</span>
        </Link>
      </nav>
    </div>
  );
}

function LiveCard({ s }: { s: LiveSession }) {
  const remaining = useRemaining(s.starts_at);
  return (
    <Link
      href={`/espace-live/${s.id}`}
      className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
    >
      <div className={`relative h-40 bg-gradient-to-br ${s.gradient}`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-secondary flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">timer</span>
          {remaining}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-primary font-bold text-xs">
            {s.animator_name.slice(0, 1)}
          </div>
          <span className="text-white text-xs font-bold drop-shadow-md">{s.animator_name}</span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-tertiary font-bold text-xs uppercase tracking-tight mb-1">{s.tagline}</span>
        <h4 className="font-bold text-on-surface text-lg leading-snug">{s.title}</h4>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-on-surface-variant text-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            {fmtDate(s.starts_at)}
          </div>
          <span className="text-primary-container p-1 rounded-full">
            <span className="material-symbols-outlined">chevron_right</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function ReplayCard({ s }: { s: LiveSession }) {
  return (
    <Link
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-secondary-container/90 text-on-secondary-container flex items-center justify-center shadow-xl">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </span>
        </div>
      </div>
      <div className="p-4">
        <span className="text-tertiary font-bold text-xs uppercase tracking-tight mb-1">{s.subject_name}</span>
        <h4 className="font-bold text-on-surface text-lg leading-snug">{s.title}</h4>
        <div className="mt-3 flex items-center gap-3 text-on-surface-variant text-xs">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            {fmtDate(s.starts_at)}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">group</span>
            {s.viewers.toLocaleString("fr-FR")}
          </span>
        </div>
      </div>
    </Link>
  );
}
