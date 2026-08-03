"use client";

import { useState } from "react";

export function DisputeButton() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setDone(true);
      setSubject("");
      setDescription("");
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          setDone(false);
          setError("");
        }}
        className="w-full bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-3 font-label-md font-semibold text-on-surface active:scale-[0.98] transition-transform duration-150"
      >
        <span className="material-symbols-outlined text-on-surface-variant">report_problem</span>
        Signaler un problème ou un litige
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)}></div>
          <div className="relative bg-surface w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 pb-8">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Signaler un problème</h3>
            <p className="font-label-sm text-on-surface-variant mb-4">
              L&apos;administration traitera votre demande et vous répondra dans vos notifications.
            </p>
            {done ? (
              <div className="flex flex-col items-center gap-2 py-6">
                <span className="material-symbols-outlined text-4xl text-primary">verified</span>
                <p className="font-label-md font-semibold text-on-surface">Signalement envoyé !</p>
                <button onClick={() => setOpen(false)} className="mt-2 px-4 py-2 rounded-full bg-primary text-on-primary font-label-md font-semibold">
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div>
                  <label className="block font-label-sm text-on-surface-variant mb-1">Objet</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex. Erreur de correction sur un quiz"
                    maxLength={120}
                    className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 font-label-md text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Expliquez le problème en détail…"
                    rows={4}
                    maxLength={1000}
                    className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 font-label-md text-on-surface focus:outline-none focus:border-primary resize-none"
                    required
                  />
                </div>
                {error && <p className="font-label-sm text-error">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {busy ? <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-lg">send</span>}
                  Envoyer le signalement
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
