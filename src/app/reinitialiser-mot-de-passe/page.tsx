"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
      } else {
        router.push("/connexion-edukora");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "peer block w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 pb-3 pt-3 text-base text-on-surface focus:outline-none focus:ring-0 focus:border-primary transition-colors";

  const labelClass =
    "pointer-events-none absolute top-3 left-4 text-base text-on-surface-variant transition-all duration-200 " +
    "peer-focus:-top-3 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-surface-container-lowest peer-focus:px-1 " +
    "peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-surface-container-lowest peer-[:not(:placeholder-shown)]:px-1";

  return (
    <div className="min-h-dvh bg-surface text-on-surface flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-6 sm:p-8 flex flex-col">
        <header className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 mb-4 bg-surface-container-lowest rounded-2xl flex items-center justify-center p-1">
            <img src="/images/logo-edukora.png" alt="Edukora" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-headline-md text-2xl font-bold text-primary mb-2 tracking-tight">Nouveau mot de passe</h1>
          <p className="text-on-surface-variant text-base">Choisissez un nouveau mot de passe pour votre compte.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <div className="relative">
            <input
              id="password"
              type={show ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-12`}
            />
            <label htmlFor="password" className={labelClass}>Nouveau mot de passe</label>
            <button
              type="button"
              aria-label="Afficher ou masquer le mot de passe"
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined">{show ? "visibility_off" : "visibility"}</span>
            </button>
          </div>

          <div className="relative">
            <input
              id="confirm"
              type={show ? "text" : "password"}
              placeholder=" "
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="confirm" className={labelClass}>Confirmer le mot de passe</label>
          </div>

          {error && (
            <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-on-primary rounded-lg font-semibold text-base tracking-wide hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
          >
            {loading ? (
              <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
            ) : (
              <span>Réinitialiser le mot de passe</span>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResetForm />
    </Suspense>
  );
}
