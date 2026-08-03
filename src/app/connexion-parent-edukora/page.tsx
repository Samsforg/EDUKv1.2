"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) router.replace(d.user.role === "parent" ? "/espace-parent" : "/accueil-edukora");
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!identifier || !password) {
      setError("Renseignez votre identifiant et votre mot de passe.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Identifiant ou mot de passe incorrect.");
      } else if (data.user?.role !== "parent") {
        setError("Ce compte n'est pas un compte parent.");
      } else {
        router.push("/espace-parent");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-surface">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/30">
        <div className="hidden md:flex md:col-span-5 bg-primary relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
          <div className="relative z-10 text-center flex flex-col items-center">
            <img alt="Edukora Logo" className="w-24 h-24 mb-8 rounded-xl shadow-lg ring-4 ring-on-primary/10" src="/images/logo-edukora.png" />
            <h1 className="text-on-primary text-4xl font-headline font-bold leading-tight mb-4 tracking-tight">
              Eduquer pour<br />l&apos;avenir.
            </h1>
            <p className="text-on-primary-container font-body text-lg max-w-xs mx-auto opacity-90">
              Accédez à l&apos;espace parent pour suivre la progression académique de vos enfants avec sérénité.
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-lowest">
          <div className="md:hidden flex justify-center mb-8">
            <img alt="Edukora Logo" className="w-16 h-16 rounded-lg" src="/images/logo-edukora.png" />
          </div>
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-on-surface text-3xl font-headline font-bold mb-2">Bon retour parmi nous</h2>
            <p className="text-on-surface-variant font-body">Veuillez entrer vos identifiants pour accéder à votre tableau de bord parent.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="identifier">
                Email ou Numéro de téléphone
              </label>
              <input
                className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="password">
                Mot de passe
              </label>
              <input
                className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3" role="alert">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-headline font-bold py-4 rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <>
                  <span>Se connecter</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-on-surface-variant font-body">
              Pas encore de compte ?{" "}
              <Link
                href="/inscription-parent-edukora"
                className="text-primary font-bold hover:text-primary-container transition-colors ml-1 px-4 py-2 border border-primary/20 rounded-full hover:bg-primary/5"
              >
                Créer un compte parent
              </Link>
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link href="/connexion-edukora" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
              Espace élève ou professeur
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
