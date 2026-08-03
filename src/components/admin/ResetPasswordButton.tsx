"use client";

import { useState } from "react";

export function ResetPasswordButton({ userId, userName }: { userId: number; userName: string }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/users/${userId}/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setDone(true);
      setPassword("");
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          setDone(false);
          setError("");
        }}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
        title="Réinitialiser le mot de passe"
      >
        <span className="material-symbols-outlined text-sm">key</span>
        Mot de passe
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-surface-container-low border border-outline-variant rounded-xl shadow-lg p-4 z-20">
          <p className="text-label-sm font-semibold text-on-surface mb-1">Réinitialiser le mot de passe</p>
          <p className="text-label-xs text-on-surface-variant mb-3">
            Nouveau mot de passe pour {userName}. Ses sessions actives seront déconnectées.
          </p>
          {done ? (
            <div className="text-sm text-primary flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Mot de passe réinitialisé
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="relative mb-2">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  minLength={6}
                  className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 pr-10 border border-outline-variant focus:outline-none focus:border-primary"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                  aria-label="Afficher le mot de passe"
                >
                  <span className="material-symbols-outlined text-sm">{show ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              {error && <p className="text-xs text-error mb-2">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {busy ? (
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">key</span>
                )}
                Enregistrer
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
