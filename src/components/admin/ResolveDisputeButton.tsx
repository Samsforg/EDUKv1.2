"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ResolveDisputeButton({ id, subject }: { id: number; subject: string }) {
  const [open, setOpen] = useState(false);
  const [resolution, setResolution] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (resolution.trim().length < 3) {
      setError("La réponse doit contenir au moins 3 caractères");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/disputes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resolution }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setOpen(false);
      setResolution("");
      router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold bg-primary text-on-primary hover:opacity-90 transition-opacity"
      >
        <span className="material-symbols-outlined text-sm">verified</span>
        Résoudre
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-surface-container-low border border-outline-variant rounded-xl shadow-lg p-4 z-20">
          <p className="text-label-sm font-semibold text-on-surface mb-1">Résoudre le litige</p>
          <p className="text-label-xs text-on-surface-variant mb-3">
            Réponse pour « {subject} » — l&apos;élève sera notifié.
          </p>
          <form onSubmit={submit}>
            <textarea
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="Explication de la résolution…"
              rows={3}
              className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary mb-2"
              autoFocus
            />
            {error && <p className="text-xs text-error mb-2">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">check</span>}
              Envoyer la réponse
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
