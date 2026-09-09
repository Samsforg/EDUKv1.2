"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("Professeur");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function nextStep() {
    setError("");
    if (!lastName.trim() || !firstName.trim()) {
      setError("Renseignez votre nom et votre prénom.");
      return;
    }
    if (!phone.trim()) {
      setError("Le numéro de téléphone est requis.");
      return;
    }
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
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
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          password,
          role: "teacher",
          accept_privacy: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la création du compte.");
      } else {
        router.push("/inscription-expert-3-3-soumission-r-ussie");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline";

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <header className="flex items-center px-4 md:px-8 h-16 w-full top-0 bg-surface border-b border-outline-variant z-50">
        <div className="flex items-center gap-4">
          <Link href="/connexion-expert-edukora" className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline font-bold text-2xl text-primary tracking-tight">Inscription Enseignant</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="space-y-4">
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">
                {step === 1 ? "Étape 01/02" : "Étape 02/02"}
              </span>
              <h2 className="text-4xl font-extrabold text-on-background leading-tight">
                Rejoignez l&apos;élite éducative de Côte d&apos;Ivoire.
              </h2>
              <p className="text-on-surface-variant text-lg">
                Partagez votre expertise avec les futurs bacheliers et participez à l&apos;excellence académique nationale.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-start gap-4 shadow-sm">
                <div className="p-2 bg-tertiary-container rounded-lg text-on-tertiary-container">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Certification d&apos;État</h3>
                  <p className="text-sm text-on-surface-variant">Processus conforme aux normes du Ministère de l&apos;Éducation Nationale.</p>
                </div>
              </div>
              <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-start gap-4 shadow-sm">
                <div className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Données Sécurisées</h3>
                  <p className="text-sm text-on-surface-variant">Chiffrement AES-256 pour la protection de vos documents officiels.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-10 shadow-xl shadow-primary/5">
            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); nextStep(); } : handleSubmit} className="space-y-8">
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-secondary-container h-full transition-all duration-500" style={{ width: step === 1 ? "50%" : "100%" }} />
              </div>

              {step === 1 ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">person</span>
                    Informations Personnelles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="lastname">Nom</label>
                      <input className={inputClass} id="lastname" placeholder="Ex: Kouassi" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="firstname">Prénom</label>
                      <input className={inputClass} id="firstname" placeholder="Ex: Koffi" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="email">Email Professionnel (optionnel)</label>
                    <input className={inputClass} id="email" type="email" placeholder="koffi.k@institution.ci" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="phone">Numéro de Téléphone <span className="text-error">*</span></label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-low text-on-surface-variant font-medium">+225</span>
                      <input className={`${inputClass} rounded-l-none`} id="phone" placeholder="07 00 00 00 00" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-on-surface-variant">Titre Académique</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(["Professeur", "Chercheur", "Expert"]).map((t) => (
                        <button key={t} type="button" onClick={() => setTitle(t)}
                          className={`p-4 border rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all ${title === t ? "border-primary bg-primary-fixed/20 text-primary" : "border-outline-variant bg-surface hover:border-primary"}`}>
                          <span className="material-symbols-outlined text-3xl">{t === "Professeur" ? "school" : t === "Chercheur" ? "science" : "psychology"}</span>
                          <span className="text-sm font-bold">{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {error && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3">{error}</p>}
                  <button type="submit" className="w-full py-4 bg-secondary-container text-on-secondary-container font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-secondary-container/20">
                    Continuer
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">lock</span>
                    Sécurité du Compte
                  </h3>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="password">Créer un Mot de Passe</label>
                    <div className="relative">
                      <input className={`${inputClass} pr-12`} id="password" placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                    <p className="text-xs text-outline flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-xs">info</span>
                      Minimum 8 caractères, incluant un chiffre et un symbole.
                    </p>
                  </div>
                  {error && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3">{error}</p>}
                  <div className="flex items-center gap-4 pt-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 px-6 rounded-lg font-bold border border-primary text-primary hover:bg-primary-fixed transition-all">
                      Précédent
                    </button>
                    <button type="submit" disabled={loading} className="flex-[2] py-3 px-6 rounded-lg font-bold bg-secondary text-on-secondary hover:opacity-90 shadow-md transform active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading ? (
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      ) : (
                        <>
                          Soumettre ma candidature
                          <span className="material-symbols-outlined">send</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="pt-6 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-on-surface-variant">
                Déjà inscrit ? <Link href="/connexion-expert-edukora" className="text-primary font-bold hover:underline">Se connecter</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-8 bg-surface-container-low text-center px-4">
        <p className="text-sm text-outline">© 2025 Edukora Côte d&apos;Ivoire. Tous droits réservés.</p>
        <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-on-surface-variant">
          <Link href="/politique-de-confidentialit" className="hover:text-primary transition-colors">Politique de Confidentialité</Link>
          <Link href="/conditions-g-n-rales-d-utilisation" className="hover:text-primary transition-colors">Conditions d&apos;Utilisation</Link>
          <Link href="mailto:contact@edukora.net" className="hover:text-primary transition-colors">Support Académique</Link>
        </div>
      </footer>
    </div>
  );
}
