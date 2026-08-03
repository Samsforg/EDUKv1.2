"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Serie {
  id: number;
  code: string;
  name: string;
}

export default function Page() {
  const router = useRouter();
  const [series, setSeries] = useState<Serie[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [serieId, setSerieId] = useState<number | null>(null);
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/series")
      .then((r) => r.json())
      .then((d) => setSeries(d.series ?? []))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!firstName.trim() || !lastName.trim()) {
      setError("Veuillez renseigner votre prénom et votre nom.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Un email ou un numéro de téléphone est requis.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          password,
          serie_id: serieId,
          role,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
      } else {
        router.push(role === "teacher" ? "/espace-prof" : "/accueil-edukora");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-base text-on-surface focus:outline-none focus:ring-0 focus:border-primary transition-colors";

  return (
    <div className="min-h-dvh bg-surface text-on-surface flex flex-col items-center justify-center p-4 relative">
      <Link
        href="/"
        aria-label="Retour à l'accueil"
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-100 z-10"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </Link>
      <main className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-6 sm:p-8 flex flex-col">
        <header className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 mb-4 bg-surface-container-lowest rounded-2xl flex items-center justify-center p-1">
            <img src="/images/logo-edukora.png" alt="Edukora" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-headline-md text-3xl font-bold text-primary mb-2 tracking-tight">Créer un compte</h1>
          <p className="text-on-surface-variant text-base">Rejoignez Edukora et préparez votre BAC ou BEPC.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`rounded-xl border-2 px-4 py-3 flex flex-col items-center gap-1 transition-all duration-150 ${role === "student" ? "border-primary bg-primary/10" : "border-outline-variant bg-surface-container-lowest"}`}
            >
              <span className={`material-symbols-outlined ${role === "student" ? "text-primary" : "text-on-surface-variant"}`}>school</span>
              <span className={`text-sm font-semibold ${role === "student" ? "text-primary" : "text-on-surface"}`}>Élève</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`rounded-xl border-2 px-4 py-3 flex flex-col items-center gap-1 transition-all duration-150 ${role === "teacher" ? "border-primary bg-primary/10" : "border-outline-variant bg-surface-container-lowest"}`}
            >
              <span className={`material-symbols-outlined ${role === "teacher" ? "text-primary" : "text-on-surface-variant"}`}>co_present</span>
              <span className={`text-sm font-semibold ${role === "teacher" ? "text-primary" : "text-on-surface"}`}>Professeur</span>
            </button>
          </div>

          {role === "teacher" && (
            <p className="text-xs text-on-surface-variant bg-secondary-container/10 rounded-lg px-3 py-2">
              Espace professeur : créez des quiz et des sujets d&apos;examen pour vos élèves.
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="block text-sm font-semibold text-on-surface">Prénom</label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="lastName" className="block text-sm font-semibold text-on-surface">Nom</label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-on-surface">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-sm font-semibold text-on-surface">Numéro de téléphone</label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+225 07 00 00 00 00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-semibold text-on-surface">Mot de passe</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">Minimum 6 caractères.</p>
          </div>

          {role === "student" && (
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-on-surface">Ma série</label>
              <div className="grid grid-cols-2 gap-2">
                {series.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSerieId(s.id)}
                    className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                      serieId === s.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant bg-surface-container-lowest text-on-surface hover:border-primary/40"
                    }`}
                  >
                    <span className="block font-bold">{s.code}</span>
                    <span className="block text-xs text-on-surface-variant">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

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
                <span>Créer mon compte</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-on-surface-variant">
            Vous avez déjà un compte ?{" "}
            <Link href="/connexion-edukora" className="font-semibold text-primary hover:text-primary-container transition-colors ml-1">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
