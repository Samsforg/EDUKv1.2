"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LigueChallenge {
  id: number;
  ligue: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  goal_type: string;
  goal_value: number;
  reward_type: string;
  reward_label: string;
  reward_value: string;
  progress: number;
  completed: boolean;
  completed_at: string | null;
  action: string;
}

interface DefisLigueData {
  me: {
    xp: number;
    ligue: { key: string; name: string; icon: string; min: number; nextMin: number | null };
    next: number | null;
    pct: number;
    remaining: number;
  };
  challenges: LigueChallenge[];
  locked: { ligue: string; name: string; challenges: LigueChallenge[] } | null;
}

const GRADIENT: Record<string, string> = {
  bronze: "league-bronze-gradient",
  argent: "league-silver-gradient",
  or: "league-gold-gradient",
  diamant: "league-diamond-gradient",
  maitre: "league-maitre-gradient",
};

const BAR_COLOR: Record<string, string> = {
  primary: "bg-primary",
  "impact-emerald": "bg-impact-emerald",
  "expert-purple": "bg-expert-purple",
  "validation-amber": "bg-validation-amber",
};

const ICON_BG: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  "impact-emerald": "bg-impact-emerald/10 text-impact-emerald",
  "expert-purple": "bg-expert-purple/10 text-expert-purple",
  "validation-amber": "bg-validation-amber/10 text-validation-amber",
};

function Card({ c }: { c: LigueChallenge }) {
  const pct = c.goal_value > 0 ? Math.round((c.progress / c.goal_value) * 100) : 0;
  return (
    <div className="glass-card rounded-xl p-gutter flex flex-col justify-between card-hover-effect border-l-4 border-l-primary">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${ICON_BG[c.color] ?? ICON_BG.primary}`}>
            <span className="material-symbols-outlined text-2xl">{c.icon}</span>
          </div>
          {c.reward_type === "xp" ? (
            <span className="flex items-center gap-1 text-impact-emerald bg-impact-emerald/10 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                add_circle
              </span>
              <span className="font-label-md text-label-md">+{c.reward_value} XP</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-validation-amber bg-validation-amber/10 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                emoji_events
              </span>
              <span className="font-label-md text-label-md">{c.reward_label}</span>
            </span>
          )}
        </div>
        <h4 className="font-title-md text-title-md text-on-surface mb-2">{c.title}</h4>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">{c.description}</p>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-label-md text-label-md text-on-surface-variant">Progression</span>
            <span className={`font-label-md text-label-md ${c.completed ? "text-impact-emerald" : "text-primary"}`}>
              {c.progress}/{c.goal_value}
            </span>
          </div>
          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${c.completed ? "bg-impact-emerald" : BAR_COLOR[c.color] ?? "bg-primary"}`}
              style={{ width: `${Math.max(c.completed ? 100 : pct, c.progress > 0 ? 6 : 0)}%` }}
            />
          </div>
        </div>
        {c.completed ? (
          <div className="w-full py-3 bg-impact-emerald/10 text-impact-emerald font-label-md text-label-md rounded flex items-center justify-center gap-2 uppercase tracking-wide">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Terminé
          </div>
        ) : (
          <Link
            href={c.action}
            className="w-full py-3 bg-primary text-white font-label-md text-label-md rounded hover:bg-primary-container transition-colors shadow-sm uppercase tracking-wide text-center block"
          >
            Commencer
          </Link>
        )}
      </div>
    </div>
  );
}

export default function DefisLigue() {
  const [data, setData] = useState<DefisLigueData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/defis-ligue")
      .then(async (r) => {
        if (!r.ok) throw new Error();
        setData(await r.json());
      })
      .catch(() => setError(true));
  }, []);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Connecte-toi pour voir les défis de ta ligue</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  const me = data?.me;
  const mine = data?.challenges ?? [];
  const done = mine.filter((c) => c.completed).length;
  const grad = me ? GRADIENT[me.ligue.key] ?? "league-silver-gradient" : "league-silver-gradient";

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-28">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50 flex items-center justify-between px-margin-mobile h-16">
        <div className="flex items-center gap-3">
          <Link href="/defis" className="p-2 -ml-2 rounded-full text-primary hover:bg-surface-container-low active:scale-95 duration-100">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-title-md text-title-md font-bold text-primary">Défis de la Ligue</h1>
        </div>
        <Link href="/ligues" className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary text-primary font-bold text-sm">
          {me?.ligue?.icon ? (
            <span className="material-symbols-outlined text-lg">{me.ligue.icon}</span>
          ) : (
            "?"
          )}
        </Link>
      </header>

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg space-y-10">
        {me && (
          <section>
            <div className="relative overflow-hidden rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 glass-card shadow-sm">
              <div className="relative z-10">
                <span className="font-label-md text-label-md text-primary uppercase tracking-widest mb-2 block">Statut Actuel</span>
                <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface mb-2">{me.ligue.name}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  {me.ligue.nextMin !== null
                    ? `Relevez les défis spécifiques pour débloquer la ligue supérieure et des récompenses exclusives. Encore ${me.remaining.toLocaleString("fr-FR")} XP pour la Ligue suivante.`
                    : "Vous êtes au sommet du classement ! Relevez tous les défis pour conserver votre titre."}
                </p>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-24 h-24 ${grad} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                  <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {me.ligue.icon}
                  </span>
                </div>
                {me.next !== null ? (
                  <div className="mt-4 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-32 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${me.pct}%` }} />
                      </div>
                      <span className="font-label-md text-label-md text-primary">{me.pct}%</span>
                    </div>
                    <span className="font-label-xs text-on-surface-variant">
                      {(me.xp - me.ligue.min).toLocaleString("fr-FR")} / {(me.next - me.ligue.min).toLocaleString("fr-FR")} XP
                    </span>
                  </div>
                ) : (
                  <span className="mt-4 font-label-md text-label-md text-validation-amber">Ligue maximale atteinte</span>
                )}
              </div>
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline-md text-headline-md-mobile text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-validation-amber">workspace_premium</span>
              Défis de la {me?.ligue?.name ?? "…"}
            </h3>
            <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
              {done}/{mine.length} terminés
            </span>
          </div>

          {mine.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {mine.map((c) => (
                <Card key={c.id} c={c} />
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-gutter text-center text-on-surface-variant font-body-md">
              Aucun défi pour ta ligue pour le moment. Reviens bientôt !
            </div>
          )}
        </section>

        {data?.locked && (
          <section className="opacity-70 grayscale-[0.5]">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="font-headline-md text-headline-md-mobile text-on-surface-variant">
                Défis de la {data.locked.name}
              </h3>
              <span className="material-symbols-outlined text-outline">lock</span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-surface/90 p-8 rounded-xl shadow-xl border border-surface-border backdrop-blur-sm">
                  <span className="material-symbols-outlined text-4xl text-validation-amber mb-4">lock_open</span>
                  <h4 className="font-headline-md text-on-surface mb-2">Contenu Verrouillé</h4>
                  <p className="font-body-md text-on-surface-variant mb-6 max-w-xs mx-auto">
                    Atteins la {data.locked.name}
                    {me && me.next !== null ? ` (${me.next.toLocaleString("fr-FR")} XP)` : ""} pour débloquer ces
                    défis légendaires.
                  </p>
                  <Link
                    href="/ligues"
                    className="px-6 py-2 border-2 border-primary text-primary font-label-md rounded hover:bg-primary/5 transition-colors"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter blur-md select-none pointer-events-none">
                {data.locked.challenges.map((c) => (
                  <div key={c.id} className="glass-card rounded-xl p-6 flex flex-col justify-between border-t-4 border-t-validation-amber/50">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${ICON_BG[c.color] ?? ICON_BG.primary}`}>
                        <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                      </div>
                      <div>
                        <h5 className="font-title-md text-title-md text-on-surface">{c.title}</h5>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">{c.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
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
