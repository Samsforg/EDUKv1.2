import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getLigueLadder, getLigueStatus, LIGUE_ORDER, LIGUES } from "@/lib/rank";

export const metadata = { title: "Ligues Académiques - Edukora" };

const STYLE: Record<string, { icon: string; circle: string; desc: string }> = {
  maitre: { icon: "workspace_premium", circle: "bg-on-tertiary-fixed text-tertiary-fixed", desc: "Les meilleurs de la plateforme" },
  diamant: { icon: "diamond", circle: "bg-blue-50 text-blue-600", desc: "Élite des révisions avancées" },
  or: { icon: "military_tech", circle: "bg-yellow-50 text-yellow-600", desc: "Excellence académique" },
  argent: { icon: "shield", circle: "bg-slate-100 text-slate-600", desc: "Régularité et progression" },
  bronze: { icon: "workspace_premium", circle: "bg-orange-50 text-orange-700", desc: "Premiers pas prometteurs" },
};

export default async function LiguesPage() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <Link href="/connexion-edukora" className="text-primary font-label-md">Se connecter</Link>
      </div>
    );
  }
  const ladder = getLigueLadder();
  const me = getLigueStatus(user.id);

  const myKey = me.ligue.key;
  const reachedMax = LIGUE_ORDER.findIndex((k) => k === myKey) === 0;
  const nextLigue = me.next !== null ? LIGUES.find((l) => l.min === me.next) : undefined;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/accueil-edukora" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-title-md text-title-md text-on-surface truncate">Ligues Académiques</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">Monte de ligue en gagnant de l&apos;XP</p>
        </div>
      </header>

      <main className="px-margin-mobile pt-4 space-y-5 pb-10">
        <div className="bg-expert-purple/10 text-expert-purple inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-xs font-semibold">
          <span className="material-symbols-outlined text-sm">star</span>
          Ligue des Communes
        </div>

        <div className="bg-surface border border-outline-variant rounded-2xl p-5 relative overflow-hidden">
          <span className="material-symbols-outlined absolute -right-6 -top-6 text-[130px] opacity-10 text-primary">military_tech</span>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute inset-0 bg-secondary-fixed opacity-20 rounded-full animate-pulse" />
              <div className={`relative w-16 h-16 rounded-full flex items-center justify-center text-[40px] ${STYLE[myKey]?.circle ?? "bg-slate-100 text-slate-600"}`}>
                <span className="material-symbols-outlined">{STYLE[myKey]?.icon ?? "shield"}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-label-xs uppercase tracking-wider text-on-surface-variant">Votre Ligue Actuelle</p>
              <p className="font-metric-num text-2xl font-extrabold text-primary">{me.ligue.name.replace("Ligue ", "")}</p>
              <p className="font-label-xs text-on-surface-variant">
                #{me.rank_in_ligue ?? "—"} dans la ligue
                {me.commune ? ` · #{me.rank_in_commune ?? "—"} à ${me.commune}` : ""}
              </p>
            </div>
            {me.rank_in_commune !== null && me.commune_total !== null && me.rank_in_commune <= Math.max(1, Math.ceil((me.commune_total ?? 0) * 0.05)) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-impact-emerald/10 text-impact-emerald font-label-xs font-bold">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                Top 5%
              </span>
            )}
          </div>
          {!reachedMax && me.next !== null && nextLigue && (
            <>
              <div className="flex justify-between mt-4 font-label-xs text-on-surface-variant">
                <span>Progression vers {nextLigue.name}</span>
                <span>{me.xp.toLocaleString("fr-FR")} / {me.next.toLocaleString("fr-FR")} XP</span>
              </div>
              <div className="mt-1.5 h-2 bg-outline-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: `${me.pct}%` }} />
              </div>
              {me.remaining > 0 && (
                <p className="mt-2 font-label-xs text-on-surface-variant">Plus que {me.remaining.toLocaleString("fr-FR")} XP avant la promotion.</p>
              )}
            </>
          )}
          {reachedMax && (
            <p className="mt-3 font-label-xs text-impact-emerald font-semibold">Tu as atteint le sommet de la hiérarchie académique !</p>
          )}
        </div>

        <Link
          href="/defis-ligue"
          className="bg-surface border border-outline-variant rounded-2xl p-4 flex items-center gap-4 hover:border-primary transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-validation-amber/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl text-validation-amber" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
          </div>
          <div className="flex-1">
            <p className="font-label-md font-bold text-on-surface">Défis de ta Ligue</p>
            <p className="font-label-xs text-on-surface-variant">
              Des défis sur-mesure pour {me.ligue.name.replace("Ligue ", "")} : badges, XP et trophées exclusifs.
            </p>
          </div>
          <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
        </Link>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Parcours des Échelons</h2>
          <p className="font-label-sm text-on-surface-variant mb-3">Hiérarchie académique — de Bronze à Maître.</p>
          <div className="space-y-3">
            {ladder.map((l) => {
              const active = l.key === myKey;
              const passed = !active && LIGUE_ORDER.indexOf(l.key) < LIGUE_ORDER.indexOf(myKey);
              return (
                <div
                  key={l.key}
                  className={`flex items-center gap-4 rounded-2xl border p-4 ${
                    active
                      ? "league-card-active bg-surface border-primary"
                      : passed
                        ? "bg-surface/60 border-outline-variant opacity-70"
                        : "bg-surface border-outline-variant"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-[32px] shrink-0 ${STYLE[l.key]?.circle ?? "bg-slate-100 text-slate-600"}`}>
                    <span className="material-symbols-outlined">{STYLE[l.key]?.icon ?? "shield"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-label-md font-bold text-on-surface">{l.name}</h3>
                      {active && (
                        <span className="bg-validation-amber text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Votre échelon</span>
                      )}
                      {passed && (
                        <span className="bg-impact-emerald/10 text-impact-emerald text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-[10px]">check</span> Complété
                        </span>
                      )}
                    </div>
                    <p className="font-label-xs text-on-surface-variant">{STYLE[l.key]?.desc}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="font-label-xs text-outline uppercase tracking-wider">{l.min.toLocaleString("fr-FR")}+ XP</p>
                    <p className="font-label-xs text-on-surface-variant">{l.count} élèves</p>
                  </div>
                  {active && <span className="font-label-sm font-bold text-primary hidden sm:block">ACTUEL</span>}
                </div>
              );
            })}
          </div>
        </section>

        <div className="bg-primary-container text-on-primary-container rounded-2xl p-4 flex gap-3 items-start">
          <span className="material-symbols-outlined">info</span>
          <p className="font-label-sm flex-1">
            Comment monter de ligue ? Gagne de l&apos;XP en complétant des quiz, des épreuves du simulateur et en entretenant ta série. Les paliers sont mis à jour chaque lundi à 00h00.
          </p>
        </div>

        <Link
          href="/classement"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-on-primary font-label-md font-semibold active:scale-[0.99] duration-100"
        >
          <span className="material-symbols-outlined">leaderboard</span>
          Voir le classement de ma ligue
        </Link>
      </main>
    </div>
  );
}
