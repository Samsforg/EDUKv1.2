"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function nextStep() {
    setError("");
    if (!firstName.trim() || !lastName.trim()) {
      setError("Renseignez votre nom et votre prénom.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Un email ou un numéro de téléphone est requis.");
      return;
    }
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!terms) {
      setError("Veuillez accepter les Conditions Générales d'Utilisation.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          password,
          role: "parent",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la création du compte.");
      } else {
        router.push("/espace-parent/jumelage");
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
    <div className="min-h-screen bg-background text-on-background font-body flex flex-col">
      <header className="sticky top-0 z-40 bg-primary dark:bg-primary-container shadow-md flex justify-between items-center px-4 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={() => (step === 2 ? setStep(1) : router.push("/connexion-edukora"))}
            className="text-on-primary dark:text-on-primary-container hover:opacity-80 transition-opacity duration-200"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline text-headline-md font-bold text-on-primary">Profil Parent</h1>
        </div>
      </header>

      <main className="flex-grow pt-8 pb-12 px-4 md:px-8 flex items-center justify-center">
        <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-outline-variant">
          <div className="relative h-40 bg-primary overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary-container opacity-70"></div>
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <h2 className="font-headline text-2xl font-bold text-on-primary">Rejoignez Edukora</h2>
              <p className="text-on-primary-container text-sm">Le partenaire de réussite pour vos enfants.</p>
            </div>
          </div>

          <div className="flex p-6 pb-0 space-x-2">
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? "bg-secondary-container" : "bg-surface-container-highest"}`}></div>
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? "bg-secondary-container" : "bg-surface-container-highest"}`}></div>
          </div>

          <div className="p-6">
            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); nextStep(); } : handleSubmit} className="space-y-6">
              {step === 1 ? (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-headline text-xl font-semibold text-primary">Informations personnelles</h3>
                    <p className="text-on-surface-variant text-sm">Commençons par faire connaissance.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-label-sm font-semibold text-on-surface" htmlFor="lastname">Nom</label>
                      <input
                        className={inputClass}
                        id="lastname"
                        placeholder="Ex: Kouassi"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-label-sm font-semibold text-on-surface" htmlFor="firstname">Prénom</label>
                      <input
                        className={inputClass}
                        id="firstname"
                        placeholder="Ex: Jean"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-label-sm font-semibold text-on-surface" htmlFor="email">Email</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">mail</span>
                      <input
                        className={`${inputClass} pl-10`}
                        id="email"
                        placeholder="parent@edukora.ci"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-label-sm font-semibold text-on-surface" htmlFor="phone">Téléphone</label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-low text-on-surface-variant text-sm">+225</span>
                      <input
                        className={`${inputClass} rounded-l-none`}
                        id="phone"
                        placeholder="07 00 00 00 00"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-4 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Suivant
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-headline text-xl font-semibold text-primary">Création du mot de passe</h3>
                    <p className="text-on-surface-variant text-sm">Protégez l&apos;accès à votre espace parent.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-label-sm font-semibold text-on-surface" htmlFor="password">Mot de passe</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                      <input
                        className={`${inputClass} pl-10`}
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-label-sm font-semibold text-on-surface" htmlFor="confirm_password">Confirmer le mot de passe</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">verified_user</span>
                      <input
                        className={`${inputClass} pl-10`}
                        id="confirm_password"
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      className="mt-1 w-5 h-5 text-primary border-outline-variant rounded focus:ring-primary bg-surface transition-all"
                      id="terms"
                      type="checkbox"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                    />
                    <label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="terms">
                      J&apos;accepte les <a className="text-primary font-semibold underline" href="#">Conditions Générales d&apos;Utilisation</a> et la{" "}
                      <a className="text-primary font-semibold underline" href="#">Politique de Confidentialité</a> d&apos;Edukora.
                    </label>
                  </div>
                  {error && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3">{error}</p>}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full py-4 bg-surface-container-high text-on-surface-variant font-semibold rounded-lg hover:bg-surface-container-highest active:scale-95 transition-all"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      ) : (
                        "Créer mon compte"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Déjà un compte ?{" "}
                <Link href="/connexion-parent-edukora" className="text-primary font-bold hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
