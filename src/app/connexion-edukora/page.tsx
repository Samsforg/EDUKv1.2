"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ConnexionPage() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  function afterLogin(role?: string) {
    if (from && !from.startsWith("/connexion") && !from.startsWith("/inscription")) {
      router.replace(from);
      return;
    }
    router.replace(
      role === "parent"
        ? "/espace-parent"
        : role === "admin"
          ? "/espace-admin"
          : "/accueil-edukora",
    );
  }

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          afterLogin(d.user.role);
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [router, from]);

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
      } else {
        afterLogin(data.user?.role);
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

  if (checking) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-surface text-on-surface flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-6 sm:p-8 flex flex-col">
        <header className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 mb-4 bg-surface-container-lowest rounded-2xl flex items-center justify-center p-1">
            <img src="/images/logo-edukora.png" alt="Edukora Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-headline-md text-3xl font-bold text-primary mb-2 tracking-tight">Connexion</h1>
          <p className="text-on-surface-variant text-base">Ravis de vous revoir !</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <div className="relative">
            <input
              id="identifier"
              name="identifier"
              type="text"
              inputMode="email"
              autoComplete="username"
              placeholder=" "
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="identifier" className={labelClass}>
              Email ou Numéro de téléphone
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-12`}
            />
            <label htmlFor="password" className={labelClass}>
              Mot de passe
            </label>
            <button
              type="button"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
            </button>
          </div>

          <div className="flex justify-end -mt-2">
            <Link href="/mot-de-passe-oubli-edukora" className="text-sm font-medium text-primary hover:text-primary-container transition-colors">
              Mot de passe oublié ?
            </Link>
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
                <span>Se connecter</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-surface-variant"></div>
          <span className="flex-shrink-0 mx-4 text-on-surface-variant text-sm bg-surface-container-lowest px-2">Ou continuer avec</span>
          <div className="flex-grow border-t border-surface-variant"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => router.push("/accueil-edukora")}
            className="w-full h-12 bg-surface-container-lowest text-on-surface border border-outline-variant rounded-lg font-medium text-base hover:bg-surface-container-low active:bg-surface-container transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Continuer avec Google
          </button>
          <button
            type="button"
            onClick={() => router.push("/accueil-edukora")}
            className="w-full h-12 bg-on-surface text-surface-container-lowest rounded-lg font-medium text-base hover:bg-inverse-surface active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.365 14.363c0-3.32 2.705-4.887 2.827-4.962-1.545-2.257-3.957-2.56-4.805-2.602-2.05-.206-4.004 1.205-5.045 1.205-1.042 0-2.645-1.173-4.352-1.141-2.213.033-4.254 1.285-5.385 3.245-2.298 3.978-.588 9.873 1.656 13.114 1.097 1.583 2.397 3.36 4.103 3.295 1.637-.065 2.258-1.058 4.237-1.058 1.977 0 2.536 1.058 4.238 1.025 1.765-.033 2.906-1.616 4.002-3.218 1.272-1.854 1.794-3.655 1.823-3.753-.038-.016-3.5-1.34-3.5-5.148M14.613 4.968c.895-1.082 1.5-2.585 1.336-4.093-1.298.052-2.855.864-3.784 1.947-.832.964-1.554 2.493-1.353 3.97 1.455.112 2.906-.738 3.801-1.824"></path>
            </svg>
            Continuer avec Apple
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-on-surface-variant">
            Pas encore de compte ?{" "}
            <Link href="/inscription-1-2-edukora" className="font-semibold text-primary hover:text-primary-container transition-colors ml-1">
              S'inscrire
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConnexionPage />
    </Suspense>
  );
}
