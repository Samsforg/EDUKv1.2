"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EVENTS, trackEvent } from "@/lib/analytics";

export default function Page() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) router.replace(d.user.role === "teacher" ? "/espace-prof" : "/accueil-edukora");
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
      } else if (data.user?.role !== "teacher") {
        setError("Ce compte n'est pas un compte enseignant.");
      } else {
        trackEvent(EVENTS.loginCompleted, {
          method: /^\d[\d\s+()-]*$/.test(identifier) ? "phone" : "email",
          role: "teacher",
        });
        router.push("/espace-prof");
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

  const inputClass =
    "peer block w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 pb-3 pt-3 text-base text-on-surface focus:outline-none focus:ring-0 focus:border-primary transition-colors";
  const labelClass =
    "pointer-events-none absolute top-3 left-4 text-base text-on-surface transition-all duration-200 peer-focus:-top-3 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-surface-container-lowest peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-surface-container-lowest peer-[:not(:placeholder-shown)]:px-1";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-surface">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/30">
        <div className="hidden md:flex md:col-span-5 bg-primary relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative z-10 text-center flex flex-col items-center">
            <Image alt="Edukora Logo" className="w-24 h-24 mb-8 rounded-xl shadow-lg ring-4 ring-on-primary/10" src="/images/logo-edukora.webp" loading="lazy" width={96} height={96} />
            <h1 className="text-on-primary text-4xl font-headline font-bold leading-tight mb-4 tracking-tight">
              Enseigner avec<br />impact.
            </h1>
            <p className="text-on-primary-container font-body text-lg max-w-xs mx-auto opacity-90">
              Créez des quiz, gérez vos sujets d&apos;examen et suivez la progression de vos élèves.
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-lowest">
          <div className="md:hidden flex justify-center mb-8">
            <Image alt="Edukora Logo" className="w-16 h-16 rounded-lg" src="/images/logo-edukora.webp" loading="lazy" width={64} height={64} />
          </div>
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-on-surface text-3xl font-headline font-bold mb-2">Espace Enseignant</h2>
            <p className="text-on-surface-variant font-body">Connectez-vous pour gérer vos cours et vos élèves.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                id="identifier"
                type="text"
                inputMode="email"
                autoComplete="username"
                placeholder=" "
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={inputClass}
              />
              <label htmlFor="identifier" className={labelClass}>Email ou Numéro de téléphone</label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-12`}
              />
              <label htmlFor="password" className={labelClass}>Mot de passe</label>
              <button
                type="button"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-on-surface hover:text-primary transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>

            <div className="flex justify-end -mt-2">
              <Link href="/mot-de-passe-oubli-edukora" className="text-sm font-medium text-primary hover:text-primary-container transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>

            {error && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3" role="alert">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-on-primary rounded-lg font-semibold text-base tracking-wide hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
            >
              {loading ? (
                <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
              ) : (
                <>
                  <span>Se connecter</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-on-surface-variant font-body">
              Pas encore de compte enseignant ?{" "}
              <Link href="/inscription-expert-1-3-infos-personnelles" className="text-primary font-bold hover:text-primary-container transition-colors ml-1 px-4 py-2 border border-primary/20 rounded-full hover:bg-primary/5">
                Postuler comme expert
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link href="/connexion-edukora" className="text-sm font-semibold text-primary hover:underline underline-offset-4">
              Espace élève
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
