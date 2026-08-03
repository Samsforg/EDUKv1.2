"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Contributor {
  rank: number;
  user_id: number;
  name: string;
  xp: number;
  contributions: number;
}

interface ChallengeDetail {
  id: number;
  name: string;
  category: string;
  commune_a: string;
  commune_b: string;
  description: string;
  reward_desc: string;
  status: string;
  starts_at: string;
  ends_at: string;
  a: { xp: number; participants: number };
  b: { xp: number; participants: number };
  top_a: Contributor[];
  top_b: Contributor[];
  me: { commune: string | null; my_xp: number; my_rank: number | null; side: "a" | "b" | null };
}

function fmtXp(n: number) {
  return n.toLocaleString("fr-FR");
}

function useCountdown(endsAt: string) {
  const [left, setLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) return setLeft("Terminé");
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setLeft(d > 0 ? `${d}j ${h}h` : `${h}h ${m}m`);
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, [endsAt]);
  return left;
}

export default function DefiDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<ChallengeDetail | null>(null);
  const [error, setError] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/defis/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, [id]);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Connecte-toi pour voir ce défi</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  if (!data) return <div className="min-h-screen bg-background" />;

  const total = data.a.xp + data.b.xp;
  const pctA = total > 0 ? Math.round((data.a.xp / total) * 100) : 50;
  const leaderA = pctA >= 50;
  const diff = Math.abs(data.a.xp - data.b.xp);
  const isMine = data.me.side !== null;
  const mySide = data.me.side === "a" ? data.commune_a : data.me.side === "b" ? data.commune_b : null;
  const left = useCountdown(data.ends_at);

  const TopList = ({ title, side, list }: { title: string; side: "a" | "b"; list: Contributor[] }) => (
    <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
      <div className={`${side === "a" ? "bg-primary" : "bg-secondary"} text-white px-4 py-2 font-bold flex justify-between items-center`}>
        <span>Commune : {title}</span>
        <span className="material-symbols-outlined">{side === "a" ? "shield" : "flag"}</span>
      </div>
      <div className="p-2 space-y-1">
        {list.length === 0 && (
          <p className="text-sm text-on-surface-variant p-3">Aucune contribution pour l'instant.</p>
        )}
        {list.map((c) => (
          <div key={c.user_id} className="flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors rounded-lg">
            <span className={`font-bold w-6 ${side === "a" ? "text-primary" : "text-secondary"}`}>{c.rank}.</span>
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-sm shrink-0">
              {c.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex-grow">
              <p className="font-bold text-on-surface text-sm">{c.name}</p>
              <p className="text-xs text-on-surface-variant">{c.contributions} contributions</p>
            </div>
            <span className={`font-bold text-sm ${side === "a" ? "text-primary" : "text-secondary"}`}>{fmtXp(c.xp)} XP</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-40">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50 flex items-center justify-between px-margin-mobile h-16">
        <div className="flex items-center gap-3">
          <Link href="/defis" className="p-2 -ml-2 rounded-full text-primary hover:bg-surface-container-low active:scale-95 duration-100">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-title-md text-title-md font-bold text-primary truncate">{data.commune_a} vs {data.commune_b}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary text-primary font-bold text-sm">
          {(data.me.commune ?? "?").slice(0, 1).toUpperCase()}
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pb-16 pt-stack-md space-y-6">
        <section className="relative rounded-xl bg-surface-container shadow-sm border border-outline-variant p-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="font-label-xs uppercase text-primary font-bold">{data.commune_a}</span>
              <div className="text-3xl md:text-4xl font-black text-primary">
                {fmtXp(data.a.xp)} <span className="text-body-md font-normal">XP</span>
              </div>
            </div>
            <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold text-sm animate-pulse flex items-center gap-1">
              {data.status === "active" ? (
                <>
                  <span className="w-2 h-2 bg-on-secondary-container rounded-full animate-ping" /> LIVE
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">timer</span> {left}
                </>
              )}
            </div>
            <div className="text-right">
              <span className="font-label-xs uppercase text-secondary font-bold">{data.commune_b}</span>
              <div className="text-3xl md:text-4xl font-black text-secondary">
                {fmtXp(data.b.xp)} <span className="text-body-md font-normal">XP</span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-12 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant flex">
            <div className="h-full bg-primary-container relative" style={{ width: `${pctA}%` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
            </div>
            <div className="h-full bg-secondary-container relative" style={{ width: `${100 - pctA}%` }}>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>
          <div className="mt-4 text-center">
            {leaderA ? (
              <p className="text-sm text-on-surface-variant">
                <span className="font-bold text-primary">{data.commune_a}</span> mène de{" "}
                <span className="font-bold text-primary">{fmtXp(diff)} XP</span> !
              </p>
            ) : (
              <p className="text-sm text-on-surface-variant">
                <span className="font-bold text-secondary">{data.commune_b}</span> mène de{" "}
                <span className="font-bold text-secondary">{fmtXp(diff)} XP</span> !
              </p>
            )}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-gutter">
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-primary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
            <span className="text-xs text-on-surface-variant">Ma Contribution</span>
            <span className="text-xl font-bold text-primary">+{fmtXp(data.me.my_xp)} XP</span>
          </div>
          <div className="bg-surface border border-outline-variant p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
            <span className="text-xs text-on-surface-variant">Rang dans {isMine ? mySide : "ma commune"}</span>
            <span className="text-xl font-bold text-secondary">{data.me.my_rank ? `${data.me.my_rank}${ord(data.me.my_rank)}` : "—"}</span>
          </div>
        </section>

        <section className="bg-tertiary-fixed text-on-tertiary-fixed p-6 rounded-xl border border-tertiary flex items-start gap-4">
          <div className="bg-on-tertiary-container/10 p-3 rounded-full shrink-0">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
          <div>
            <h3 className="font-bold font-headline-sm">Récompenses Collectives</h3>
            <p className="text-body-md">{data.reward_desc}</p>
            <p className="text-xs text-on-tertiary-fixed/70 mt-1 italic">{data.description}</p>
          </div>
        </section>

        <section>
          <h3 className="font-title-md text-title-md text-primary mb-4">Top Contributeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <TopList side="a" title={data.commune_a} list={data.top_a} />
            <TopList side="b" title={data.commune_b} list={data.top_b} />
          </div>
        </section>
      </main>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-margin-mobile z-40">
        <Link
          href="/quiz"
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">bolt</span>
          {isMine ? "Contribuer maintenant" : "Rejoindre la bataille"}
        </Link>
      </div>

      <nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/accueil-edukora">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-xs">Accueil</span>
        </Link>
        <Link className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-all" href="/defis">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
          <span className="font-label-xs">Défis</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/tuteur-ia">
          <span className="material-symbols-outlined">smart_toy</span>
          <span className="font-label-xs">Tuteur AI</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/profil">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-xs">Profil</span>
        </Link>
      </nav>
    </div>
  );
}

function ord(n: number) {
  if (n === 1) return "er";
  return "ème";
}
