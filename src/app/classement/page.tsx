"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface RankedUser {
  rank: number;
  id: number;
  first_name: string;
  last_name: string;
  xp: number;
  streak: number;
  class_level: string | null;
  serie: string | null;
  commune: string | null;
  is_me: boolean;
  zone?: string | null;
  filleuls?: number;
  tier?: string;
}

interface LeaderboardData {
  ranking: RankedUser[];
  me: RankedUser;
  total: number;
  top_xp: number;
  commune?: string;
}

interface CommunesData {
  communes: { commune: string; count: number; total_xp: number }[];
}

interface LigueData {
  ligue: { key: string; name: string; icon: string; min: number; nextMin: number | null };
  ranking: RankedUser[];
  me: RankedUser;
  total: number;
  promo_size: number;
  releg_size: number;
}

const MEDALS: Record<number, { color: string; icon: string }> = {
  1: { color: "#f5b301", icon: "emoji_events" },
  2: { color: "#9ca3af", icon: "military_tech" },
  3: { color: "#d97706", icon: "workspace_premium" },
};

const TIERS: Record<string, { label: string; cls: string; icon: string }> = {
  élite: { label: "Élite", cls: "bg-expert-purple/10 text-expert-purple", icon: "stars" },
  expert: { label: "Expert", cls: "bg-secondary-container text-on-secondary-container", icon: "school" },
  novice: { label: "Novice", cls: "bg-surface-container-high text-on-surface-variant", icon: "new_releases" },
};

const LIGUE_STYLE: Record<string, { icon: string; chip: string }> = {
  maitre: { icon: "workspace_premium", chip: "bg-on-tertiary-fixed/10 text-tertiary-fixed" },
  diamant: { icon: "diamond", chip: "bg-blue-50 text-blue-600" },
  or: { icon: "military_tech", chip: "bg-yellow-50 text-yellow-600" },
  argent: { icon: "shield", chip: "bg-slate-100 text-slate-600" },
  bronze: { icon: "workspace_premium", chip: "bg-orange-50 text-orange-700" },
};

type Tab = "global" | "commune" | "ambassadeurs" | "ligue";

export default function ClassementPage() {
  const [tab, setTab] = useState<Tab>("global");
  const [sub, setSub] = useState<"local" | "national">("local");
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [communes, setCommunes] = useState<CommunesData | null>(null);
  const [ligue, setLigue] = useState<LigueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setCommunes(null);
    setLigue(null);
    setShowAll(false);
    const url =
      tab === "global"
        ? "/api/classement?view=global&limit=50"
        : tab === "ambassadeurs"
          ? "/api/classement?view=ambassadeurs&limit=50"
          : tab === "commune" && sub === "national"
            ? "/api/classement?view=communes"
            : tab === "commune"
              ? "/api/classement?view=commune&limit=50"
              : "/api/classement?view=ligue&limit=50";
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (tab === "commune" && sub === "national") setCommunes(d);
        else if (tab === "ligue") setLigue(d);
        else if (d.ranking) setData(d);
      })
      .finally(() => setLoading(false));
  }, [tab, sub]);

  const ranking = data?.ranking ?? ligue?.ranking ?? [];
  const my = data?.me ?? ligue?.me;
  const total = data?.total ?? ligue?.total;
  const top_xp = data?.top_xp ?? 0;
  const pctOfTop = (xp: number) => (top_xp > 0 ? Math.max(8, Math.round((xp / top_xp) * 100)) : 0);
  const podium = ranking.slice(0, 3);
  const list = showAll ? ranking : ranking.slice(3, 23);

  const isAmb = tab === "ambassadeurs";
  const metric = (u: RankedUser) => (isAmb ? u.filleuls ?? 0 : u.xp);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/accueil-edukora" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-title-md text-title-md text-on-surface truncate">Classement</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">
            {total ? `${total} élèves en lice` : " "}
          </p>
        </div>
      </header>

      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur px-margin-mobile py-2.5">
        <div className="bg-surface-container-low p-1 rounded-full flex items-center gap-1 overflow-x-auto">
          {(
            [
              ["global", "Global"],
              ["commune", "Commune"],
              ["ambassadeurs", "Ambassadeurs"],
              ["ligue", "Ma Ligue"],
            ] as [Tab, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`flex-1 whitespace-nowrap px-3 py-2 rounded-full font-label-sm transition-all ${
                tab === k ? "bg-primary-container text-on-primary-container shadow-sm font-semibold" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-margin-mobile pt-4 space-y-4">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {tab === "commune" && !loading && data && !data.commune && (
          <div className="bg-surface border border-outline-variant rounded-2xl p-8 text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">location_off</span>
            <p className="font-label-md font-semibold text-on-surface">Aucune commune définie</p>
            <p className="font-label-sm text-on-surface-variant">Renseigne ta commune dans ton profil pour rejoindre le classement local.</p>
          </div>
        )}

        {tab === "commune" && !loading && !data && !communes && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {(tab === "global" || tab === "commune") && data && data.commune !== undefined && tab === "commune" && (
          <div className="bg-surface-container-low p-1 rounded-full flex items-center">
            {(
              [
                ["local", "Ma Commune"],
                ["national", "National"],
              ] as ["local" | "national", string][]
            ).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setSub(k)}
                className={`flex-1 py-2 rounded-full font-label-sm transition-all ${
                  sub === k ? "bg-primary-container text-on-primary-container shadow-sm font-semibold" : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {(tab === "global" || (tab === "commune" && sub === "local")) && data && !loading && (
          <>
            {data.commune && (
              <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-xl px-4 py-2.5">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <p className="font-label-sm text-on-surface flex-1">Classement de la commune</p>
                <span className="font-label-md font-bold text-primary">{data.commune}</span>
              </div>
            )}
            {podium.length > 0 && (
              <div className="flex items-end justify-center gap-3 pt-2">
                {[podium[1], podium[0], podium[2]]
                  .filter(Boolean)
                  .map((u) => {
                    const medal = MEDALS[u.rank];
                    const order = u.rank === 1 ? "order-2" : u.rank === 2 ? "order-1" : "order-3";
                    const height = u.rank === 1 ? "h-36" : u.rank === 2 ? "h-28" : "h-24";
                    return (
                      <div key={u.id} className={`${order} flex flex-col items-center ${height} w-24 justify-end`}>
                        <span className="material-symbols-outlined text-4xl" style={{ color: medal.color, fontVariationSettings: "'FILL' 1" }}>
                          {medal.icon}
                        </span>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${u.is_me ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface"}`}>
                          <span className="font-title-md text-title-md">{u.first_name[0] ?? "?"}</span>
                        </div>
                        <p className="font-label-sm text-on-surface mt-1 truncate max-w-full">
                          {u.first_name} {u.last_name?.[0] ?? ""}.
                        </p>
                        <p className="font-label-xs text-primary font-semibold">{metric(u)} XP</p>
                        <div className="w-full h-1.5 rounded-full mt-1" style={{ backgroundColor: medal.color }} />
                      </div>
                    );
                  })}
              </div>
            )}

            {list.map((u) => {
              const medal = MEDALS[u.rank];
              return (
                <div
                  key={u.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl ${
                    u.is_me ? "bg-primary/10 border border-primary/40" : "bg-surface border border-outline-variant"
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-title-sm ${
                      medal ? "" : u.is_me ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"
                    }`}
                    style={medal ? { color: medal.color, backgroundColor: `${medal.color}22` } : {}}
                  >
                    {medal ? (
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{medal.icon}</span>
                    ) : (
                      `#${u.rank}`
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-sm font-semibold text-on-surface truncate">
                      {u.first_name} {u.last_name}
                      {u.is_me && <span className="ml-1.5 text-xs text-primary font-bold">(toi)</span>}
                    </p>
                    <p className="font-label-xs text-on-surface-variant truncate">
                      {u.class_level ?? "Élève"}
                      {u.serie ? ` · ${u.serie}` : ""}
                      {u.commune ? ` · ${u.commune}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {u.streak > 0 && (
                      <span className="flex items-center gap-0.5 text-error">
                        <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                        <span className="font-label-xs">{u.streak}</span>
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pctOfTop(u.xp)}%` }} />
                      </div>
                      <span className="font-label-md font-bold text-primary">{u.xp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            {list.length === 0 && podium.length === 0 && (
              <p className="bg-surface border border-outline-variant rounded-2xl p-6 text-center font-label-sm text-on-surface-variant">Aucun élève pour l&apos;instant.</p>
            )}
            {ranking.length > 23 && (
              <button
                onClick={() => setShowAll((s) => !s)}
                className="w-full py-3 rounded-full border border-outline-variant bg-surface text-primary font-label-md active:scale-[0.99] duration-100"
              >
                {showAll ? "Réduire" : `Voir les ${ranking.length} premiers`}
              </button>
            )}
          </>
        )}

        {tab === "commune" && sub === "national" && communes && !loading && (
          <>
            <p className="font-label-sm text-on-surface-variant">
              Les communes d&apos;Abidjan et ses alentours s&apos;affrontent. La commune avec le plus de points gagne le titre de « Commune Championne ».
            </p>
            {communes.communes.map((c, i) => {
              const max = communes.communes[0]?.total_xp ?? 1;
              return (
                <div key={c.commune} className="flex items-center gap-3 p-3 rounded-2xl bg-surface border border-outline-variant">
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-title-sm ${
                    i === 0 ? "text-[#f5b301] bg-[#f5b30122]" : i === 1 ? "text-[#9ca3af] bg-[#9ca3af22]" : i === 2 ? "text-[#d97706] bg-[#d9770622]" : "bg-surface-container-high text-on-surface-variant"
                  }`}>
                    {i === 0 ? (
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                    ) : i === 1 ? (
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                    ) : i === 2 ? (
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                    ) : (
                      `#${i + 1}`
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-sm font-semibold text-on-surface truncate">{c.commune}</p>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${Math.max(6, Math.round((c.total_xp / max) * 100))}%` }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-label-md font-bold text-primary">{c.total_xp.toLocaleString("fr-FR")} XP</p>
                    <p className="font-label-xs text-on-surface-variant">{c.count} élèves</p>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {tab === "ambassadeurs" && data && !loading && (
          <>
            {podium.length > 0 && (
              <div className="flex items-end justify-center gap-3 pt-2">
                {[podium[1], podium[0], podium[2]]
                  .filter(Boolean)
                  .map((u) => {
                    const medal = MEDALS[u.rank];
                    const order = u.rank === 1 ? "order-2" : u.rank === 2 ? "order-1" : "order-3";
                    return (
                      <div key={u.id} className={`${order} flex flex-col items-center w-24 justify-end ${u.rank === 1 ? "h-40" : "h-32"}`}>
                        <span className="material-symbols-outlined text-4xl" style={{ color: medal.color, fontVariationSettings: "'FILL' 1" }}>
                          {medal.icon}
                        </span>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${u.is_me ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface"}`}>
                          <span className="font-title-md text-title-md">{u.first_name[0] ?? "?"}</span>
                        </div>
                        <p className="font-label-sm text-on-surface mt-1 truncate max-w-full">
                          {u.first_name} {u.last_name?.[0] ?? ""}.
                        </p>
                        <p className="font-label-xs text-primary font-semibold">{u.filleuls ?? 0} parrainages</p>
                      </div>
                    );
                  })}
              </div>
            )}

            {my && (
              <a
                href="#ma-position"
                className={`flex items-center gap-3 p-4 rounded-2xl border ${my.is_me ? "bg-primary text-on-primary border-primary" : "bg-surface border-outline-variant"}`}
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-title-sm ${my.is_me ? "bg-on-primary/20" : "bg-primary/10 text-primary"}`}>
                  {my.rank ? `#${my.rank}` : "—"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-label-sm font-semibold truncate">Ma position — {my.first_name}</p>
                  <p className="font-label-xs opacity-80">{my.filleuls ?? 0} filleuls · {my.tier}</p>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            )}

            {list.map((u) => {
              const medal = MEDALS[u.rank];
              const t = TIERS[u.tier ?? "novice"];
              return (
                <div
                  key={u.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl ${u.is_me ? "bg-primary/10 border border-primary/40" : "bg-surface border border-outline-variant"}`}
                >
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-title-sm ${
                      medal ? "" : u.is_me ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"
                    }`}
                    style={medal ? { color: medal.color, backgroundColor: `${medal.color}22` } : {}}
                  >
                    {medal ? (
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{medal.icon}</span>
                    ) : (
                      `#${u.rank}`
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-sm font-semibold text-on-surface truncate">
                      {u.first_name} {u.last_name}
                      {u.is_me && <span className="ml-1.5 text-xs text-primary font-bold">(toi)</span>}
                    </p>
                    <p className="font-label-xs text-on-surface-variant truncate">{u.commune ?? "Élève"}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${t.cls}`}>
                      <span className="material-symbols-outlined text-xs">{t.icon}</span>
                      {t.label}
                    </span>
                    <span className="font-label-md font-bold text-primary">{u.filleuls ?? 0}</span>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {tab === "ligue" && ligue && !loading && (
          <>
            <div className="bg-primary-container text-on-primary-container rounded-2xl p-4 relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -top-4 text-[120px] opacity-10">emoji_events</span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest/20 flex items-center justify-center">
                  <span className="material-symbols-outlined">{ligue.ligue.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-label-xs uppercase tracking-wider opacity-80">Ma ligue</p>
                  <p className="font-headline-md font-bold">{ligue.ligue.name}</p>
                </div>
                {my?.rank && (
                  <div className="text-right">
                    <p className="font-title-md font-bold">{my.rank} <span className="font-label-xs opacity-80">/ {ligue.total}</span></p>
                    <p className="font-label-xs opacity-80">Rang</p>
                  </div>
                )}
              </div>
              {ligue.ligue.nextMin !== null && (
                <div className="mt-3 h-2 bg-on-primary-container/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-on-primary-container rounded-full"
                    style={{ width: `${Math.min(100, Math.round(((my?.xp ?? 0) / ligue.ligue.nextMin) * 100))}%` }}
                  />
                </div>
              )}
            </div>

            {!ligue.ligue.nextMin && (
              <div className="bg-validation-amber/10 border border-validation-amber/40 rounded-2xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-validation-amber">workspace_premium</span>
                <p className="font-label-sm text-on-surface flex-1">Tu es au sommet de la hiérarchie académique !</p>
              </div>
            )}
            {ligue.ligue.nextMin && (
              <div className="bg-surface border border-outline-variant rounded-2xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">trending_up</span>
                <p className="font-label-sm text-on-surface flex-1">
                  Plus que <b>{Math.max(0, (ligue.ligue.nextMin ?? 0) - (my?.xp ?? 0)).toLocaleString("fr-FR")} XP</b> pour atteindre la prochaine ligue
                </p>
              </div>
            )}

            {ligue.promo_size > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-impact-emerald/10 border-l-4 border-impact-emerald">
                <span className="material-symbols-outlined text-sm text-impact-emerald">keyboard_double_arrow_up</span>
                <span className="font-label-xs font-semibold text-impact-emerald">ZONE DE PROMOTION (TOP {ligue.promo_size})</span>
              </div>
            )}
            {list.map((u) => (
              <div
                key={u.id}
                className={`flex items-center gap-3 p-3 rounded-2xl ${
                  u.is_me ? "bg-primary/10 border border-primary/40" : "bg-surface border border-outline-variant"
                }`}
              >
                <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-title-sm ${
                  u.is_me ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"
                }`}>
                  {u.rank < 10 ? `0${u.rank}` : u.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-label-sm font-semibold text-on-surface truncate">
                    {u.first_name} {u.last_name}
                    {u.is_me && <span className="ml-1.5 text-xs text-primary font-bold">(toi)</span>}
                  </p>
                  <p className="font-label-xs text-on-surface-variant truncate">
                    {u.commune ?? "Élève"} · {u.zone === "promotion" ? "Zone de promotion" : u.zone === "relegation" ? "Zone de relégation" : "Zone de maintien"}
                  </p>
                </div>
                <span className="font-label-md font-bold text-primary">{u.xp} XP</span>
              </div>
            ))}
            {ligue.releg_size > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-error/5 border-l-4 border-error">
                <span className="material-symbols-outlined text-sm text-error">keyboard_double_arrow_down</span>
                <span className="font-label-xs font-semibold text-error">ZONE DE RELÉGATION (DERNIERS {ligue.releg_size})</span>
              </div>
            )}
            {ligue.ranking.length > 23 && (
              <button
                onClick={() => setShowAll((s) => !s)}
                className="w-full py-3 rounded-full border border-outline-variant bg-surface text-primary font-label-md active:scale-[0.99] duration-100"
              >
                {showAll ? "Réduire" : `Voir les ${ligue.ranking.length} premiers`}
              </button>
            )}
            <Link
              href="/ligues"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-on-primary font-label-md font-semibold active:scale-[0.99] duration-100"
            >
              <span className="material-symbols-outlined">emoji_events</span>
              Voir le parcours des échelons
            </Link>
          </>
        )}

        {my && tab === "global" && (
          <a
            href="#ma-position"
            className={`flex items-center gap-3 p-4 rounded-2xl border ${my.is_me ? "bg-primary text-on-primary border-primary" : "bg-surface border-outline-variant"}`}
            id="ma-position"
          >
            <span className={`w-10 h-10 rounded-full flex items-center justify-center font-title-sm ${my.is_me ? "bg-on-primary/20" : "bg-primary/10 text-primary"}`}>
              {my.rank ? `#${my.rank}` : "—"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-label-sm font-semibold truncate">Ma position — {my.first_name}</p>
              <p className="font-label-xs opacity-80">{my.xp} XP · {my.streak} jours de série</p>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </a>
        )}
      </main>
    </div>
  );
}
