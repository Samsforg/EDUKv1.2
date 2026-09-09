"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PlanSwitcher from "@/components/PlanSwitcher";

interface Plan {
  id: number;
  name: string;
  price_cents: number;
  interval: string;
  features: string | null;
}

interface ActivePlan {
  id: number;
  name: string;
  end_at: string | null;
}

export default function SubscriptionPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activePlan, setActivePlan] = useState<ActivePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancelMsg, setCancelMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/premium/plans")
      .then((r) => r.json())
      .then((d) => {
        setPlans(d.plans ?? []);
        setActivePlan(d.activePlan ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function cancelSubscription() {
    if (!window.confirm("Tu veux vraiment annuler ton abonnement ? Il restera actif jusqu'à la fin de la période.")) return;
    setCancelling(true);
    try {
      const res = await fetch("/api/premium/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      const data = await res.json();
      if (data.ok) {
        setCancelMsg("Abonnement annulé. Il restera actif jusqu'à la fin de la période payée.");
        setActivePlan(null);
      } else {
        setCancelMsg(data.error ?? "Erreur lors de l'annulation");
      }
    } catch {
      setCancelMsg("Erreur réseau");
    } finally {
      setCancelling(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Mon abonnement" backHref="/profil" />

      <main className="px-margin-mobile pt-4 max-w-lg mx-auto space-y-6">
        {activePlan && (
          <section className="bg-surface border border-outline-variant rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
              </div>
              <div>
                <p className="font-label-md font-semibold text-on-surface">{activePlan.name}</p>
                {activePlan.end_at && (
                  <p className="text-xs text-on-surface-variant">
                    Renouvellement le {new Date(activePlan.end_at).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {!activePlan && !cancelMsg && (
          <div className="text-center py-8 space-y-3">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant inline-block">card_membership</span>
            <p className="font-headline-sm text-on-surface">Aucun abonnement actif</p>
            <p className="font-body-sm text-on-surface-variant">Choisis un plan pour débloquer tout le contenu premium.</p>
          </div>
        )}

        {plans.length > 0 && (
          <section className="bg-surface border border-outline-variant rounded-2xl p-5">
            <PlanSwitcher
              plans={plans}
              currentPlanId={activePlan?.id ?? 0}
              onSwitched={() => {
                fetch("/api/premium/plans")
                  .then((r) => r.json())
                  .then((d) => setActivePlan(d.activePlan ?? null));
              }}
            />
          </section>
        )}

        {activePlan && (
          <section className="bg-surface border border-outline-variant rounded-2xl p-5 space-y-3">
            <h3 className="font-label-md font-semibold text-on-surface">Gestion</h3>
            <button
              onClick={cancelSubscription}
              disabled={cancelling}
              className="w-full py-3 rounded-xl border border-error/30 text-error font-label-sm font-semibold hover:bg-error-container/10 transition-colors disabled:opacity-50"
            >
              {cancelling ? "Annulation…" : "Annuler mon abonnement"}
            </button>
          </section>
        )}

        {cancelMsg && (
          <p className="text-sm text-on-surface-variant bg-surface-container-high rounded-xl px-4 py-3">{cancelMsg}</p>
        )}
      </main>
    </div>
  );
}
