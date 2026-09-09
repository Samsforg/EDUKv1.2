"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Veuillez renseigner votre adresse e-mail.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Erreur lors de l&apos;envoi. Réessayez.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>
      <header className="flex items-center px-4 md:px-8 h-16 w-full bg-surface border-b border-outline-variant sticky top-0 z-50">
        <Link href="/connexion-expert-edukora" className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-primary" aria-label="Retour">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="ml-4 font-headline text-xl font-bold text-primary">Récupération de compte</div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant p-8 md:p-12 rounded-xl shadow-sm">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
          </div>

          <div className="text-center space-y-4 mb-10">
            <h1 className="text-on-surface font-headline text-3xl leading-tight font-bold">Récupération Expert</h1>
            <p className="text-on-surface-variant text-body-md">
              Entrez votre adresse e-mail professionnelle pour recevoir un lien de réinitialisation sécurisé.
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container mx-auto">
                <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <h2 className="text-on-surface font-headline text-xl font-bold">E-mail Envoyé</h2>
              <p className="text-on-surface-variant">
                Si un compte Expert correspond à cet e-mail, vous recevrez un lien d&apos;accès dans quelques instants.
              </p>
              <Link href="/connexion-expert-edukora" className="w-full py-4 bg-primary text-on-primary font-headline font-semibold rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">arrow_back</span>
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">
                  E-mail professionnel
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <input
                    className="block w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nom.expert@edukora.ci"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-on-primary font-headline font-semibold rounded-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <>
                    Envoyer le lien de récupération
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link href="/connexion-expert-edukora" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Retour à la connexion
            </Link>
          </div>

          <div className="my-10 flex items-center gap-4">
            <div className="flex-grow h-[1px] bg-outline-variant"></div>
            <span className="text-outline text-xs font-bold tracking-widest uppercase">Vérification Edukora</span>
            <div className="flex-grow h-[1px] bg-outline-variant"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-surface-container-high/50 p-4 rounded-lg flex items-start gap-4">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <div>
                <div className="text-sm font-bold text-on-surface">Chiffrement AES-256</div>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Vos données sont protégées par un chiffrement de niveau bancaire pour garantir leur confidentialité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
