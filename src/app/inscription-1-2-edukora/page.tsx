"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { EVENTS, trackEvent } from "@/lib/analytics";

interface Serie {
  id: number;
  code: string;
  name: string;
}

function InscriptionPage() {
  const params = useSearchParams();
  const from = params.get("from");
  const destAfterSignup =
    from && from.startsWith("/") && !from.startsWith("//") && !from.startsWith("/connexion") && !from.startsWith("/inscription")
      ? from
      : null;
  const [series, setSeries] = useState<Serie[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [serieId, setSerieId] = useState<number | null>(null);
  const [gender, setGender] = useState<"M" | "F" | "">("");
  const [commune, setCommune] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const CLASSES = ["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"];
  const LYCEE_LEVELS = ["2nde", "1ère", "Terminale"];
  const showSerie = LYCEE_LEVELS.includes(classLevel.trim());
  const COMMUNES = ["Abobo", "Adjamé", "Attécoubé", "Cocody", "Koumassi", "Marcory", "Plateau", "Port-Bouët", "Treichville", "Yopougon", "Bouaké", "Yamoussoukro", "Daloa", "Korhogo", "San-Pédro", "Man", "Gagnoa", "Divo", "Abengourou", "Anyama", "Bingerville", "Grand-Bassam"];
  const NAME_RE = /^[\p{L}\p{M}\s'""''\-\.]{1,50}$/u;

  useEffect(() => {
    fetch("/api/series")
      .then((r) => r.json())
      .then((d) => setSeries(d.series ?? []))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const fn = firstName.trim();
    const ln = lastName.trim();
    if (!fn || !ln) {
      setError("Veuillez renseigner votre prénom et votre nom.");
      return;
    }
    if (!NAME_RE.test(fn)) {
      setError("Le prénom ne doit contenir que des lettres, espaces, tirets ou apostrophes.");
      return;
    }
    if (!NAME_RE.test(ln)) {
      setError("Le nom ne doit contenir que des lettres, espaces, tirets ou apostrophes.");
      return;
    }
    const phoneClean = phone.replace(/[\s\-().]/g, "");
    if (!phoneClean) {
      setError("Le numéro de téléphone est requis.");
      return;
    }
    if (!/^(?:\+?225)?(?:0[1-9]|[1-9])\d{8}$/.test(phoneClean)) {
      setError("Numéro de téléphone ivoirien invalide (ex. 07 00 00 00 00).");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (!/[a-zA-Z]/.test(password)) {
      setError("Le mot de passe doit contenir au moins une lettre.");
      return;
    }
    if (!/\d/.test(password)) {
      setError("Le mot de passe doit contenir au moins un chiffre.");
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("L'adresse email n'est pas valide.");
      return;
    }
    if (role === "student" && !classLevel.trim()) {
      setError("Veuillez choisir votre classe ou votre niveau.");
      return;
    }
    if (role === "student" && showSerie && !serieId) {
      setError("Veuillez choisir votre série.");
      return;
    }
    if (!acceptPrivacy) {
      setError("Veuillez accepter la politique de confidentialité.");
      return;
    }
    setLoading(true);
    trackEvent(EVENTS.signupStarted, { role, method: email.trim() ? "email" : "phone" });
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: fn,
          last_name: ln,
          email: email.trim() || null,
          phone: phoneClean || null,
          password,
          role,
          accept_privacy: acceptPrivacy,
          referral_code: referralCode.trim() || undefined,
          ...(role === "student"
            ? {
                serie_id: showSerie ? serieId : null,
                gender: gender || null,
                commune: commune.trim() || null,
                class_level: classLevel || null,
              }
            : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
      } else {
        trackEvent(EVENTS.signupCompleted, {
          role,
          method: email.trim() ? "email" : "phone",
          campaign: params.get("utm_campaign") ?? from ?? null,
          medium: params.get("utm_medium") ?? null,
          source: params.get("utm_source") ?? null,
        });
        window.location.assign(
          destAfterSignup ?? (role === "teacher" ? "/espace-prof" : "/bienvenue"),
        );
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
            <Image  src="/images/logo-edukora.webp" alt="Edukora" className="w-full h-full object-contain" loading="lazy" width={56} height={56} />
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
            <label htmlFor="email" className="block text-sm font-semibold text-on-surface">Email (optionnel)</label>
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
            <label htmlFor="phone" className="block text-sm font-semibold text-on-surface">Numéro de téléphone <span className="text-error">*</span></label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+225 07 00 00 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
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
            <p className="text-xs text-on-surface-variant">Minimum 8 caractères, 1 lettre et 1 chiffre.</p>
          </div>

          {role === "student" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-on-surface">Genre</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "M" | "F" | "")}
                    className={inputClass}
                  >
                    <option value="">—</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="commune" className="block text-sm font-semibold text-on-surface">Commune</label>
                  <select
                    id="commune"
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">—</option>
                    {COMMUNES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-on-surface">Classe ou niveau</label>
                <select
                  value={classLevel}
                  onChange={(e) => {
                    setClassLevel(e.target.value);
                    setSerieId(null);
                  }}
                  className={inputClass}
                >
                  <option value="">Choisir ma classe…</option>
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {showSerie && (
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
            </>
          )}

          {error && (
            <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3" role="alert">
              {error}
            </p>
          )}

          <div className="space-y-1.5">
            <label htmlFor="referralCode" className="block text-sm font-semibold text-on-surface">Code de parrainage (optionnel)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">diversity_3</span>
              </span>
              <input
                id="referralCode"
                type="text"
                autoComplete="off"
                placeholder="EDK-XXXXXX"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className={`${inputClass} pl-11`}
              />
            </div>
            <p className="text-xs text-on-surface-variant">Un ami t&apos;a parrainé ? Saisis son code pour l&apos;en remercier et rejoindre sa communauté.</p>
          </div>

          <div className="flex items-start gap-3">
            <input
              className="mt-1 w-5 h-5 text-primary border-outline-variant rounded focus:ring-primary bg-surface transition-all"
              id="acceptPrivacy"
              type="checkbox"
              checked={acceptPrivacy}
              onChange={(e) => setAcceptPrivacy(e.target.checked)}
            />
            <label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="acceptPrivacy">
              J&apos;accepte la{" "}
              <Link href="/param-tres-de-confidentialit-edukora" className="text-primary font-semibold underline">
                politique de confidentialité
              </Link>{" "}
              d&apos;Edukora et le traitement de mes données personnelles.
            </label>
          </div>

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
            <Link
              href={`/connexion-edukora${destAfterSignup ? `?from=${encodeURIComponent(destAfterSignup)}` : ""}`}
              className="font-semibold text-primary hover:text-primary-container transition-colors ml-1"
            >
              Se connecter
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
      <InscriptionPage />
    </Suspense>
  );
}
