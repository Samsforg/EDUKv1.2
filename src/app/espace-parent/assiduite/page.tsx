import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getParentChildren, getPeakHours, getWeeklyActivity, resolveLinkedChild } from "@/lib/parents";
import { ParentShell } from "@/components/parent/ParentShell";
import { EncourageButton } from "@/components/parent/EncourageButton";

export const metadata: Metadata = { title: "Espace Parent - Rapport d'Assiduité" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ child?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "parent") redirect("/accueil-edukora");

  const sp = await searchParams;
  const children = getParentChildren(user.id);
  if (children.length === 0) redirect("/espace-parent/jumelage");
  const active = resolveLinkedChild(user.id, sp.child ? Number(sp.child) : null) ?? children[0];
  const childId = active.child_id;

  const week = getWeeklyActivity(childId);
  const peak = getPeakHours(childId);
  const sortedDays = [...week.days].sort((a, b) => b.hours - a.hours);
  const bestDay = sortedDays[0];
  const maxHours = Math.max(...week.days.map((d) => d.hours), 0.01);

  const recommendation =
    week.activeDays === 0
      ? `Aucune activité cette semaine. Encouragez ${active.first_name} à reprendre ses révisions : une session de 20 min suffit pour lancer une série.`
      : bestDay && bestDay.hours > 0
        ? `Une session de 30 min le ${bestDay.label.toLowerCase()} matin pourrait consolider ses acquis. Son rythme optimal détecté est entre ${peak.label}.`
        : "Lancez une session de révision pour établir une base de suivi.";

  return (
    <ParentShell active="attendance">
      <div className="space-y-6">
        {children.length > 1 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {children.map((c) => (
              <a
                key={c.child_id}
                href={`/espace-parent/assiduite?child=${c.child_id}`}
                className={
                  c.child_id === active.child_id
                    ? "shrink-0 px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-sm"
                    : "shrink-0 px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest"
                }
              >
                {c.first_name}
              </a>
            ))}
          </div>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-semibold text-body-lg">Calendrier de Travail</h2>
            <span className="text-label-sm text-outline">Cette semaine</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center text-center">
              {week.days.map((d) => (
                <div key={d.label} className="flex flex-col items-center gap-2">
                  <span
                    className={`text-label-xs font-bold ${d.label === "SAM" || d.label === "DIM" ? "text-secondary" : "text-outline"}`}
                  >
                    {d.label}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-transform ${
                      d.active
                        ? "bg-tertiary-fixed-dim text-on-tertiary-fixed"
                        : "bg-surface-container-highest text-on-surface-variant font-medium"
                    } ${d.isToday ? "ring-2 ring-primary" : ""}`}
                  >
                    {d.date.slice(8, 10)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-headline font-semibold text-body-lg">Analyse de la régularité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
              <div className="flex items-end justify-between h-32 gap-2">
                {week.days.map((d) => (
                  <div
                    key={d.label}
                    className={`flex-1 rounded-t-sm ${d.active ? "bg-primary/40" : "bg-surface-container-highest"}`}
                    style={{ height: `${Math.max((d.hours / maxHours) * 100, d.active ? 8 : 3)}%` }}
                    title={`${d.label} : ${d.hours}h`}
                  ></div>
                ))}
              </div>
              <p className="text-label-sm text-center text-on-surface-variant font-medium mt-2">
                Heures d&apos;étude par jour ({week.total}h au total)
              </p>
            </div>

            <div className="bg-secondary-container/10 border border-secondary-container/20 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center gap-3 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container shadow-md">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <div className="text-center">
                <p className="text-label-sm uppercase tracking-widest text-secondary font-bold">Plus longue série</p>
                <p className="text-4xl font-headline font-extrabold text-on-secondary-container">{week.activeDays} j.</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {week.activeDays} jour{week.activeDays > 1 ? "s" : ""} d&apos;activité cette semaine
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary border border-outline/10 rounded-xl p-6 shadow-lg text-on-primary relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-on-primary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="flex items-start gap-4">
            <div className="bg-on-primary/20 p-3 rounded-lg">
              <span className="material-symbols-outlined text-3xl">schedule</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-body-lg">Heures de pointe</h3>
              <p className="mt-1 text-on-primary/80 font-medium leading-relaxed">
                {active.first_name} étudie principalement entre{" "}
                <span className="text-secondary-fixed font-bold underline decoration-2 underline-offset-4">{peak.label}</span>.
              </p>
              <p className="text-label-xs mt-3 text-on-primary/60 italic">
                {week.activeDays === 0
                  ? "Aucune activité détectée cette semaine."
                  : "Rythme optimal détecté pour la mémorisation."}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low border-l-4 border-primary-container rounded-r-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-primary-container font-bold">
            <span className="material-symbols-outlined text-2xl">smart_toy</span>
            <h3 className="font-headline">Recommandation Edukora</h3>
          </div>
          <p className="text-body-md text-on-surface-variant leading-relaxed">{recommendation}</p>
          <div className="pt-2">
            <a
              href="/espace-parent/examens"
              className="text-primary font-semibold text-label-sm flex items-center gap-1 hover:underline"
            >
              Voir les résultats
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </section>

        <div className="pt-4">
          <EncourageButton childId={childId} childName={active.first_name} />
        </div>
      </div>
    </ParentShell>
  );
}
