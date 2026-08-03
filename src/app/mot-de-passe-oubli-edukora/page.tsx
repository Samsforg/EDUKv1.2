"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resetLink, setResetLink] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
      } else {
        setResetLink(data.reset_link ?? "");
        setSent(true);
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:outline-none focus:ring-0 focus:border-primary transition-colors";

  if (sent) {
    return (
      <div className="min-h-dvh bg-surface text-on-surface flex flex-col items-center justify-center p-4">
        <main className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-tertiary-container/20 text-on-tertiary-container flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h1 className="font-headline-md text-2xl font-bold text-primary mb-2">Lien envoyé !</h1>
          <p className="text-on-surface-variant text-base mb-6">
            Si un compte existe pour <span className="font-bold text-primary">{email}</span>, un lien de
            réinitialisation a été généré.
          </p>
          {resetLink && (
            <div className="w-full mb-6 bg-surface-container-low rounded-lg border border-outline-variant p-4 text-left">
              <p className="text-xs text-on-surface-variant mb-1">Lien de réinitialisation (démonstration, pas de serveur e-mail) :</p>
              <Link href={resetLink} className="text-primary font-semibold text-sm break-all underline">
                {resetLink}
              </Link>
            </div>
          )}
          <Link
            href="/connexion-edukora"
            className="w-full h-12 bg-primary text-on-primary rounded-lg font-semibold flex items-center justify-center shadow-sm hover:bg-primary-container transition-colors"
          >
            Retour à la connexion
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-surface text-on-surface flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-6 sm:p-8 flex flex-col">
        <header className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 mb-4 bg-surface-container-lowest rounded-2xl flex items-center justify-center p-1">
            <img src="/images/logo-edukora.png" alt="Edukora" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-headline-md text-2xl font-bold text-primary mb-2 tracking-tight">Mot de passe oublié</h1>
          <p className="text-on-surface-variant text-base">
            Saisissez l'adresse e-mail associée à votre compte. Nous vous enverrons un lien pour réinitialiser votre
            mot de passe.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-on-surface">Adresse e-mail</label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
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
              <>
                <span>Envoyer le lien</span>
                <span className="material-symbols-outlined text-xl">send</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-on-surface-variant">
            Vous vous souvenez de votre mot de passe ?{" "}
            <Link href="/connexion-edukora" className="font-semibold text-primary hover:text-primary-container transition-colors ml-1">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
