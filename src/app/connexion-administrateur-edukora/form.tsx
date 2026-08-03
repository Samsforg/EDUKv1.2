"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          router.replace(d.user.role === "admin" ? "/espace-admin" : "/accueil-edukora");
        }
      })
      .catch(() => {});
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Renseignez votre email et votre mot de passe.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Identifiant ou mot de passe incorrect.");
      } else if (data.user?.role !== "admin") {
        setError("Ce compte n'est pas un compte administrateur.");
      } else {
        router.replace("/espace-admin");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-panel rounded-xl shadow-sm p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3 text-primary bg-primary-fixed/50 p-4 rounded-lg">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
        <span className="text-xs font-semibold uppercase tracking-wider">Accès Sécurisé - Réservé aux administrateurs</span>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-error bg-error-container/40 p-3 rounded-lg text-sm font-medium" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-on-surface" htmlFor="email">Adresse Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
              <span className="material-symbols-outlined text-[20px]">alternate_email</span>
            </span>
            <input
              className="block w-full pl-10 pr-3 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/50"
              id="email"
              name="email"
              placeholder="admin@edukora.ci"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-on-surface" htmlFor="password">Mot de Passe</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </span>
            <input
              className="block w-full pl-10 pr-10 py-3 bg-surface border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline/50"
              id="password"
              name="password"
              placeholder="••••••••••••"
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors"
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
        </div>

        <button
          className="w-full mt-2 bg-secondary text-on-secondary py-3.5 rounded-lg font-bold text-sm uppercase tracking-widest shadow-md hover:bg-secondary-container hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:pointer-events-none"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 border-2 border-on-secondary/40 border-t-on-secondary rounded-full animate-spin"></span>
              <span>Authentification...</span>
            </>
          ) : (
            <>
              <span>Connexion Sécurisée</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">verified_user</span>
            </>
          )}
        </button>
      </form>

      <div className="flex flex-col gap-3 mt-4 items-center">
        <a className="text-xs font-semibold text-primary hover:text-primary-container underline underline-offset-4 decoration-primary/30 transition-all" href="/mot-de-passe-oubli-edukora">
          Mot de passe oublié ?
        </a>
      </div>
    </div>
  );
}
