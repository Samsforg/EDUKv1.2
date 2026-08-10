import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getDefisOverview } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ChallengesManager } from "@/components/admin/content/ChallengesManager";
import { LeagueChallengesManager } from "@/components/admin/content/LeagueChallengesManager";

export const metadata: Metadata = { title: "Edukora Admin - Défis" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const { challenges, league_challenges, totals } = await getDefisOverview();

  return (
    <AdminShell active="defis">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Défis</h2>
        <p className="text-on-surface-variant font-body mt-1">
          Gestion complète des défis communautaires et des ligues académiques : création, modification, suppression et suivi des contributions.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col items-center text-center">
          <span className="p-2 bg-primary-container text-on-primary-container rounded-lg material-symbols-outlined mb-2">emoji_events</span>
          <h3 className="text-headline-md font-bold text-primary">{totals.challenges}</h3>
          <p className="text-on-surface-variant text-label-sm font-medium">Défis communautaires</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col items-center text-center">
          <span className="p-2 bg-tertiary-fixed/20 text-tertiary rounded-lg material-symbols-outlined mb-2">workspace_premium</span>
          <h3 className="text-headline-md font-bold text-primary">{totals.league_challenges}</h3>
          <p className="text-on-surface-variant text-label-sm font-medium">Défis de ligue</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col items-center text-center">
          <span className="p-2 bg-secondary-fixed/20 text-secondary rounded-lg material-symbols-outlined mb-2">radio_button_checked</span>
          <h3 className="text-headline-md font-bold text-primary">{totals.active_challenges}</h3>
          <p className="text-on-surface-variant text-label-sm font-medium">Défi actif</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col items-center text-center">
          <span className="p-2 bg-primary-fixed/20 text-primary rounded-lg material-symbols-outlined mb-2">schedule</span>
          <h3 className="text-headline-md font-bold text-primary">{totals.upcoming_challenges}</h3>
          <p className="text-on-surface-variant text-label-sm font-medium">Défi à venir</p>
        </div>
      </section>

      <ChallengesManager initialChallenges={challenges} />
      <LeagueChallengesManager initialChallenges={league_challenges} />
    </AdminShell>
  );
}
