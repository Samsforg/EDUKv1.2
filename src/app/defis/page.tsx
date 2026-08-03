"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface SideScore {
  xp: number;
  participants: number;
}

interface Challenge {
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
  a: SideScore;
  b: SideScore;
}

interface DefisData {
  week: Challenge | null;
  actifs: Challenge[];
  upcoming: Challenge[];
  ended: Challenge[];
  me: { commune: string | null };
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
      setLeft(d > 0 ? `${d}j ${h}h restants` : `${h}h ${m}m restants`);
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, [endsAt]);
  return left;
}

function ChallengeCard({ c }: { c: Challenge }) {
  const left = useCountdown(c.ends_at);
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-gutter hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-surface-container-high text-on-surface-variant text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
          {c.category}
        </span>
        <span className="text-label-xs text-outline flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">timer</span>
          {left}
        </span>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">location_city</span>
          </div>
          <span className="font-label-sm text-on-surface font-semibold">{c.commune_a}</span>
          <span className="font-bold text-primary text-sm">{fmtXp(c.a.xp)} XP</span>
        </div>
        <div className="flex flex-col items-center px-2">
          <span className="text-outline font-black opacity-40 italic">vs</span>
          <span className="text-[10px] text-on-surface-variant">{c.a.participants + c.b.participants} lices</span>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary">location_city</span>
          </div>
          <span className="font-label-sm text-on-surface font-semibold">{c.commune_b}</span>
          <span className="font-bold text-secondary text-sm">{fmtXp(c.b.xp)} XP</span>
        </div>
      </div>
      <Link
        href={`/defis/${c.id}`}
        className="w-full py-2.5 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors active:scale-95 flex items-center justify-center gap-1"
      >
        {c.status === "upcoming" ? "Détails du défi" : "Rejoindre"}
      </Link>
    </div>
  );
}

export default function DefisPage() {
  const [data, setData] = useState<DefisData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/defis")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Connecte-toi pour voir les défis</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  const week = data?.week ?? null;
  const actifs = data?.actifs ?? [];

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      <PageHeader
        title="Défis Inter-Communes"
        subtitle="Affronte les communes voisines"
        right={
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary text-primary font-bold text-sm">
            {(data?.me?.commune ?? "?").slice(0, 1).toUpperCase()}
          </div>
        }
      />

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg space-y-8">
        <div>
          <h2 className="font-title-lg text-title-lg text-primary mb-1">Prêt pour le combat intellectuel ?</h2>
          <p className="text-on-surface-variant font-body-md">
            Gagnez des points pour votre commune et progressez vers votre réussite scolaire.
          </p>
        </div>

        {week && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-title-md text-title-md text-on-surface">Le Défi de la Semaine</h3>
              <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full font-label-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <Countdown endsAt={week.ends_at} />
              </span>
            </div>
            <Link
              href={`/defis/${week.id}`}
              className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm group block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
              <div className="p-gutter md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex flex-col items-center gap-3 text-center flex-1">
                  <div className="w-24 h-24 rounded-full bg-white shadow-md p-4 border border-outline-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-primary">location_city</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-on-surface">{week.commune_a}</h4>
                    <p className="text-primary font-bold text-xl">{fmtXp(week.a.xp)} XP</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-black text-secondary opacity-20 italic">VS</div>
                  <span className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-bold text-sm shadow-md">
                    Voir le duel
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 text-center flex-1">
                  <div className="w-24 h-24 rounded-full bg-white shadow-md p-4 border border-outline-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-secondary">location_city</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-on-surface">{week.commune_b}</h4>
                    <p className="text-secondary font-bold text-xl">{fmtXp(week.b.xp)} XP</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-2 bg-surface-container-highest flex">
                <div className="h-full bg-primary" style={{ width: `${pctA(week)}%` }} />
                <div className="h-full bg-secondary" style={{ width: `${100 - pctA(week)}%` }} />
              </div>
            </Link>
          </section>
        )}

        {actifs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-title-md text-title-md text-on-surface">Défis Actifs</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {actifs.map((c) => (
                <ChallengeCard key={c.id} c={c} />
              ))}
            </div>
          </section>
        )}

        {(data?.upcoming ?? []).length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-title-md text-title-md text-on-surface">À venir</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data?.upcoming ?? []).map((c) => (
                <ChallengeCard key={c.id} c={c} />
              ))}
            </div>
          </section>
        )}

        <div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-gutter flex flex-col items-center justify-center text-center opacity-80">
          <span className="material-symbols-outlined text-3xl text-outline-variant mb-2">campaign</span>
          <h4 className="font-label-sm text-on-surface-variant">
            Ta commune : <span className="font-bold text-on-surface">{data?.me?.commune ?? "—"}</span>
          </h4>
          <p className="text-label-xs text-outline-variant mt-1">
            Chaque quiz ou examen simulé réussi fait gagner des points à ta commune.
          </p>
        </div>

        <Link
          href="/defis-ligue"
          className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm group block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-validation-amber/10 to-primary/5 pointer-events-none" />
          <div className="p-gutter flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-full bg-validation-amber/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl text-validation-amber" style={{ fontVariationSettings: "'FILL' 1" }}>
                workspace_premium
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-title-md text-title-md text-on-surface">Défis de ta Ligue</h4>
              <p className="text-label-sm text-on-surface-variant mt-0.5">
                Relève les défis de ta ligue, gagne des badges et de l'XP exclusifs.
              </p>
            </div>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
          </div>
        </Link>
      </main>

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

function Countdown({ endsAt }: { endsAt: string }) {
  const left = useCountdown(endsAt);
  return <>{left}</>;
}

function pctA(c: Challenge) {
  const total = c.a.xp + c.b.xp;
  return total > 0 ? Math.max(5, Math.round((c.a.xp / total) * 100)) : 50;
}
