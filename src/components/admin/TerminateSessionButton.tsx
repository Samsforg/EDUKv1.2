"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TerminateSessionButton({ id }: { id: number }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function terminate() {
    if (!window.confirm("Terminer cette session de surveillance ? L'élève sera marqué comme hors session.")) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/proctoring/${id}`, { method: "PATCH" });
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
    <div>
      <button
        onClick={terminate}
        disabled={busy}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-error border border-error/40 hover:bg-error-container/30 transition-colors disabled:opacity-50"
      >
        {busy ? (
          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
        ) : (
          <span className="material-symbols-outlined text-sm">stop_circle</span>
        )}
        Terminer
      </button>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
