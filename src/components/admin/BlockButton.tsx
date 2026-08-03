"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BlockButton({ userId, blocked }: { userId: number; blocked: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function toggle() {
    const action = blocked ? "débloquer" : "bloquer";
    if (!window.confirm(`Voulez-vous ${action} ce compte ?`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: !blocked }),
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
    <div>
      <button
        onClick={toggle}
        disabled={busy}
        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold transition-colors disabled:opacity-50 ${
          blocked
            ? "text-tertiary hover:bg-tertiary-container/30"
            : "text-error border border-error/40 hover:bg-error-container/30"
        }`}
      >
        {busy ? (
          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
        ) : (
          <span className="material-symbols-outlined text-sm">{blocked ? "lock_open" : "block"}</span>
        )}
        {blocked ? "Débloquer" : "Bloquer"}
      </button>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
