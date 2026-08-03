import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getParentSettings } from "@/lib/parents";
import { ParentShell } from "@/components/parent/ParentShell";
import { ParentNotificationForm } from "@/components/parent/ParentNotificationForm";

export const metadata: Metadata = { title: "Espace Parent - Réglages Notifications" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "parent") redirect("/accueil-edukora");

  const raw = getParentSettings(user.id);
  const initial = {
    academic_alerts: raw.academic_alerts === 1,
    score_drop: raw.score_drop === 1,
    results_alert: raw.results_alert === 1,
    weekly_report: raw.weekly_report === 1,
    encouragement: raw.encouragement === 1,
  };

  return (
    <ParentShell active="profile">
      <div className="space-y-6">
        <section className="text-center space-y-2">
          <h2 className="text-xl font-headline font-bold leading-tight text-on-surface">Gardez le fil de la réussite</h2>
          <p className="text-sm text-on-surface-variant">
            Recevez des alertes sur les résultats de vos enfants et restez connecté à leur progression.
          </p>
        </section>

        <ParentNotificationForm initial={initial} />
      </div>
    </ParentShell>
  );
}
