"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface BadgeItem {
  code: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  goal: number;
  hint: string;
  earned_at: string | null;
  measure: number;
  progress: number;
}

interface CategoryGroup {
  name: string;
  badges: BadgeItem[];
}

interface BadgesData {
  total: number;
  earned_count: number;
  earned: BadgeItem[];
  next: BadgeItem | null;
  categories: CategoryGroup[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Découverte: "#0047ab",
  Quiz: "#7c3aed",
  Examens: "#0d9488",
  "Assiduité": "#ea580c",
  XP: "#b91c1c",
  Cours: "#c026d3",
  Communauté: "#2563eb",
};

export default function BadgesPage() {
  const [data, setData] = useState<BadgesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me/badges")
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  const pct = data && data.next ? data.next.progress : 0;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Mes badges" subtitle="Récompenses et progression" backHref="/profil" />

      <main className="px-margin-mobile pt-4 space-y-6">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Héro */}
            <section className="bg-primary rounded-2xl p-6 text-on-primary relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-40 h-40 rounded-full bg-on-primary/10 pointer-events-none"></div>
              <span className="material-symbols-outlined absolute right-5 top-5 text-6xl opacity-15" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-label-sm uppercase tracking-widest opacity-80">Mes réussites</p>
                  <p className="font-headline-md text-headline-md mt-1">Continue de briller !</p>
                  <p className="font-label-xs opacity-80 mt-1">Chaque badge te rapproche de la réussite au BAC</p>
                </div>
                <div className="bg-on-primary/15 backdrop-blur px-6 py-4 rounded-2xl border border-on-primary/20 flex flex-col items-center shrink-0">
                  <span className="font-title-md text-title-md text-3xl font-bold leading-none">{data.earned_count}</span>
                  <span className="font-label-xs uppercase tracking-widest opacity-80 mt-1">/ {data.total}</span>
                </div>
              </div>
            </section>

            {/* Prochain badge */}
            {data.next && (
              <section className="bg-surface border border-outline-variant rounded-2xl p-4 flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0">
                  <svg className="w-full h-full">
                    <circle cx="32" cy="32" fill="transparent" r="27" stroke="currentColor" strokeWidth="6" className="text-outline-variant" />
                    <circle
                      cx="32" cy="32" fill="transparent" r="27" stroke="currentColor" strokeWidth="6"
                      strokeDasharray="169.65" strokeLinecap="round"
                      strokeDashoffset={169.65 - (169.65 * pct) / 100}
                      className="text-primary progress-ring"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">{data.next.icon}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Prochain badge</p>
                  <p className="font-label-md font-semibold text-on-surface truncate">{data.next.name}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="font-label-xs text-primary shrink-0">{Math.min(100, data.next.measure)}/{data.next.goal}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Débloqués */}
            {data.earned.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-title-sm text-title-sm text-on-surface">Badges débloqués</h2>
                  <span className="font-label-xs text-primary">{data.earned_count} débloqués</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {data.earned.map((b) => (
                    <div key={b.code} className="bg-surface border border-outline-variant rounded-xl p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: (CATEGORY_COLORS[b.category] ?? "#0047ab") + "1A", color: CATEGORY_COLORS[b.category] ?? "#0047ab" }}>
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
                      </div>
                      <p className="font-label-sm font-semibold text-on-surface leading-tight">{b.name}</p>
                      <p className="font-label-xs text-on-surface-variant mt-0.5">Obtenu le {b.earned_at ? formatDate(b.earned_at) : ""}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* En cours */}
            {data.earned_count < data.total && (
              <section>
                <h2 className="font-title-sm text-title-sm text-on-surface mb-3">À débloquer</h2>
                <div className="space-y-2">
                  {data.categories.flatMap((c) => c.badges)
                    .filter((b) => b.earned_at === null && b.progress > 0)
                    .map((b) => (
                      <div key={b.code} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-surface-container-highest text-on-surface-variant shrink-0">
                          <span className="material-symbols-outlined text-2xl">{b.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-end mb-1.5">
                            <p className="font-label-sm text-on-surface">{b.name}</p>
                            <span className="font-label-xs text-primary">{Math.min(100, b.progress)}%</span>
                          </div>
                          <div className="w-full h-2 bg-outline-variant rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, b.progress)}%` }}></div>
                          </div>
                          <p className="font-label-xs text-on-surface-variant mt-1.5">{b.hint} ({b.measure}/{b.goal})</p>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Tout par catégorie */}
            <section className="space-y-5 pb-6">
              <h2 className="font-title-sm text-title-sm text-on-surface">Tous les badges</h2>
              {data.categories.map((cat) => {
                const color = CATEGORY_COLORS[cat.name] ?? "#0047ab";
                const earned = cat.badges.filter((b) => b.earned_at !== null).length;
                return (
                  <div key={cat.name} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                      <p className="font-label-sm font-semibold text-on-surface">{cat.name}</p>
                      <span className="font-label-xs text-on-surface-variant">{earned}/{cat.badges.length}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {cat.badges.map((b) => {
                        const earnedBadge = b.earned_at !== null;
                        const started = b.progress > 0;
                        return (
                          <div key={b.code} className={`rounded-xl border p-3 flex flex-col items-center text-center ${earnedBadge ? "bg-surface border-outline-variant" : "bg-surface-container-high border-outline-variant opacity-70"}`}>
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-1.5 ${earnedBadge ? "" : started ? "bg-primary/10 text-primary" : "bg-outline-variant/30 text-on-surface-variant"}`}
                              style={earnedBadge ? { backgroundColor: color + "1A", color } : {}}>
                              <span className="material-symbols-outlined">{earnedBadge ? b.icon : started ? b.icon : "lock"}</span>
                            </div>
                            <p className="font-label-xs font-semibold text-on-surface leading-tight">{b.name}</p>
                            <p className="font-label-xs text-on-surface-variant leading-tight mt-0.5">{b.description}</p>
                            {!earnedBadge && (
                              <span className="font-label-xs text-primary mt-1">{Math.min(100, b.progress)}%</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Citation */}
            <section className="bg-tertiary-container/15 border border-tertiary-container/30 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                <div>
                  <p className="italic font-body-md text-on-surface">&laquo; Le succès n&apos;est pas final, l&apos;échec n&apos;est pas fatal : c&apos;est le courage de continuer qui compte. &raquo;</p>
                  <p className="font-label-xs text-tertiary uppercase font-bold mt-2">— Winston Churchill</p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date + "Z").toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}
