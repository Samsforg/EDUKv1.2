"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PromoActions({ id, active }: { id: number; active: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function toggle() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/promo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Erreur");
      else router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Supprimer ce code promo ? Cette action est irréversible.")) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/promo/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Erreur");
      else router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggle}
        disabled={busy}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-sm">{active ? "pause_circle" : "play_circle"}</span>
        {active ? "Désactiver" : "Activer"}
      </button>
      <button
        onClick={remove}
        disabled={busy}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-error-container/30 hover:text-error transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-sm">delete</span>
      </button>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
