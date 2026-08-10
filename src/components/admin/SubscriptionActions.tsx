"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EXTEND_OPTIONS: { label: string; days: number }[] = [
  { label: "+1 mois", days: 30 },
  { label: "+3 mois", days: 90 },
  { label: "+6 mois", days: 180 },
  { label: "+1 an", days: 365 },
];

export function SubscriptionActions({ subId }: { subId: number }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function act(action: string, body: Record<string, unknown>, confirmText: string) {
    if (!window.confirm(confirmText)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/subscriptions/${subId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
      } else {
        router.refresh();
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-1 items-start">
      <div className="flex items-center gap-1 flex-wrap">
        <button
          onClick={() => act("reactivate", { status: "active" }, "Réactiver cet abonnement ?")}
          disabled={busy}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-tertiary hover:bg-tertiary-container/30 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">play_arrow</span>
          Réactiver
        </button>
        <button
          onClick={() => act("suspend", { status: "past_due" }, "Suspendre cet abonnement ?")}
          disabled={busy}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant border border-outline-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">pause</span>
          Suspendre
        </button>
        <button
          onClick={() => act("cancel", { status: "cancelled" }, "Annuler définitivement cet abonnement ?")}
          disabled={busy}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-error border border-error/40 hover:bg-error-container/30 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">block</span>
          Annuler
        </button>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {EXTEND_OPTIONS.map((o) => (
          <button
            key={o.days}
            onClick={() =>
              act(
                "extend",
                { extend_days: o.days },
                `Prolonger l'abonnement de ${o.label.replace("+", "")} et le réactiver ?`,
              )
            }
            disabled={busy}
            className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-primary bg-primary-container/40 hover:bg-primary-container transition-colors disabled:opacity-50"
          >
            {o.label}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
      {busy && (
        <span className="material-symbols-outlined text-sm animate-spin text-on-surface-variant">
          progress_activity
        </span>
      )}
    </div>
  );
}
