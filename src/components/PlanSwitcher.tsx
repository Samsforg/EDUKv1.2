"use client";

import { useState } from "react";

interface Plan {
  id: number;
  name: string;
  price_cents: number;
  interval: string;
  features: string | null;
}

interface Props {
  plans: Plan[];
  currentPlanId: number;
  onSwitched?: () => void;
}

export default function PlanSwitcher({ plans, currentPlanId, onSwitched }: Props) {
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [confirmPlan, setConfirmPlan] = useState<Plan | null>(null);

  const current = plans.find((p) => p.id === currentPlanId);
  const others = plans.filter((p) => p.id !== currentPlanId);

  async function doSwitch(plan: Plan) {
    setBusy(plan.id);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/premium/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_id: plan.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors du changement");
        return;
      }
      setSuccess(data.message);
      setConfirmPlan(null);
      onSwitched?.();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="font-label-md font-semibold text-on-surface">Changer de plan</h3>

      {current && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          <div className="flex-1">
            <p className="font-label-sm font-semibold text-on-surface">{current.name}</p>
            <p className="text-xs text-on-surface-variant">
              {current.price_cents.toLocaleString("fr-FR")} FCFA / {current.interval === "month" ? "mois" : current.interval === "quarter" ? "trimestre" : "an"}
            </p>
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">Actuel</span>
        </div>
      )}

      {others.map((plan) => {
        const isUpgrade = plan.price_cents > (current?.price_cents ?? 0);
        return (
          <div key={plan.id} className="border border-outline-variant rounded-xl p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isUpgrade ? "bg-green-100" : "bg-amber-100"}`}>
              <span className={`material-symbols-outlined text-lg ${isUpgrade ? "text-green-600" : "text-amber-600"}`}>
                {isUpgrade ? "upgrade" : "downgrade"}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-label-sm font-semibold text-on-surface">{plan.name}</p>
              <p className="text-xs text-on-surface-variant">
                {plan.price_cents.toLocaleString("fr-FR")} FCFA / {plan.interval === "month" ? "mois" : plan.interval === "quarter" ? "trimestre" : "an"}
              </p>
            </div>
            <button
              onClick={() => setConfirmPlan(plan)}
              disabled={busy !== null}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                isUpgrade
                  ? "bg-primary text-on-primary hover:bg-primary/90"
                  : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
              } disabled:opacity-50`}
            >
              {isUpgrade ? "Upgrade" : "Passer à"}
            </button>
          </div>
        );
      })}

      {error && (
        <p className="text-sm text-error bg-error-container/30 rounded-lg px-4 py-3">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">{success}</p>
      )}

      {/* Confirmation modal */}
      {confirmPlan && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmPlan(null)} />
          <div className="relative w-full sm:max-w-md bg-surface rounded-t-2xl sm:rounded-2xl p-6 shadow-xl mx-0 sm:mx-4">
            <h4 className="font-headline-sm text-on-surface font-bold mb-2">
              {confirmPlan.price_cents > (current?.price_cents ?? 0) ? "Upgrade" : "Changer de plan"} ?
            </h4>
            <p className="font-body-sm text-on-surface-variant mb-4">
              Tu passes de <strong>{current?.name}</strong> à <strong>{confirmPlan.name}</strong> ({confirmPlan.price_cents.toLocaleString("fr-FR")} FCFA/mois).
              {confirmPlan.price_cents > (current?.price_cents ?? 0)
                ? " Le nouveau tarif s'applique immédiatement."
                : " Le changement prendra effet à la fin de ta période courante."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmPlan(null)}
                className="flex-1 h-11 rounded-xl border border-outline-variant text-on-surface font-label-sm font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={() => doSwitch(confirmPlan)}
                disabled={busy !== null}
                className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-label-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {busy === confirmPlan.id ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                ) : (
                  "Confirmer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
