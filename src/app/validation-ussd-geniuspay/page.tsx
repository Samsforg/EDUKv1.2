"use client";

import React from "react";

export default function Page() {
  return <GeniusPayValidation />;
}

function GeniusPayValidation() {
  const [ref, setRef] = React.useState<string | null>(null);
  const [amount, setAmount] = React.useState<number | null>(null);
  const [planName, setPlanName] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [timeLeft, setTimeLeft] = React.useState(180);
  const [checking, setChecking] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("ref");
    if (!r) {
      setError("Aucune référence de paiement. Revenez à la page des plans et réessayez.");
      return;
    }
    setRef(r);
    fetch(`/api/premium/status?ref=${encodeURIComponent(r)}`, { credentials: "same-origin" })
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setAmount(d.amount);
        setPlanName(d.plan_name);
        if (d.is_active) {
          setDone(true);
          setTimeout(() => { window.location.href = "/paiement-reussi-edukora-premium-geniuspay"; }, 800);
        }
      })
      .catch((e) => setError(e.message || "Erreur de chargement"));
  }, []);

  React.useEffect(() => {
    if (done || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [done, timeLeft]);

  React.useEffect(() => {
    if (done || !ref || !checking) return;
    const iv = setInterval(() => {
      fetch(`/api/premium/status?ref=${encodeURIComponent(ref)}`, { credentials: "same-origin" })
        .then((res) => res.json())
        .then((d) => {
          if (d.is_active) {
            setDone(true);
            setTimeout(() => { window.location.href = "/paiement-reussi-edukora-premium-geniuspay"; }, 800);
          } else if (d.status === "failed" || d.status === "cancelled") {
            setError("Le paiement a échoué ou a été annulé. Réessayez depuis la page des plans.");
            setChecking(false);
          }
        })
        .catch(() => {});
    }, 3000);
    return () => clearInterval(iv);
  }, [ref, checking, done]);

  const mins = Math.floor(Math.max(timeLeft, 0) / 60);
  const secs = Math.max(timeLeft % 60, 0);
  const timer = `0${mins}:${secs < 10 ? "0" : ""}${secs}`;

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full flex items-center justify-between px-4 h-16 w-full z-50 bg-surface border-b border-outline-variant">
<div className="flex items-center gap-4">
<button onClick={() => { window.location.href = "/plans-d-abonnement-edukora-1"; }} className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 active:scale-95 hover:bg-surface-container-low">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline text-xl font-semibold text-primary">Paiement Sécurisé</h1>
</div>
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-sm overflow-hidden">
<img alt="Geniuspay Logo" className="w-full h-full object-contain" src="/images/ecran-324.png" />
</div>
<div className="font-headline font-bold text-primary">Edukora</div>
</div>
</header>
<main className="pt-24 pb-12 px-4 max-w-md mx-auto min-h-screen flex flex-col items-center">

{done ? (
  <div className="flex flex-col items-center text-center mt-10">
    <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6">
      <span className="material-symbols-outlined text-on-secondary-container text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
    </div>
    <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Paiement confirmé !</h2>
    <p className="text-on-surface-variant text-md">Votre pass premium est activé. Redirection en cours...</p>
  </div>
) : (
  <>
<div className="flex flex-col items-center mb-10 text-center">
<div className="loading-ring mb-8 flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary z-10 text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>tap_and_play</span>
</div>
<h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Validation en cours</h2>
<p className="text-on-surface-variant text-md">Geniuspay établit une connexion sécurisée avec votre opérateur. Veuillez autoriser la transaction sur votre téléphone mobile.</p>
{!error && !done && (
  <div className="mt-4 px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-sm font-semibold tracking-wide" id="countdown">
    Expire dans <span id="timer">{timer}</span>
  </div>
)}
{error && (
  <div className="mt-4 px-4 py-3 bg-error-container text-on-error-container rounded-xl text-sm font-semibold w-full text-center" id="error-box">{error}</div>
)}
</div>

<div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm mb-8">
<h3 className="font-headline font-semibold text-lg text-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined">checklist</span>
                Instructions USSD
            </h3>
<ul className="space-y-6">
<li className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold flex-shrink-0">1</div>
<div className="text-on-surface font-medium leading-tight pt-1">Regardez votre téléphone</div>
</li>
<li className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold flex-shrink-0">2</div>
<div className="text-on-surface font-medium leading-tight pt-1">Saisissez votre code PIN secret</div>
</li>
<li className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold flex-shrink-0">3</div>
<div className="text-on-surface font-medium leading-tight pt-1">Validez la transaction</div>
</li>
</ul>
</div>

<div className="w-full px-4 mb-10">
<div className="flex justify-between items-center py-2 border-b border-dashed border-outline-variant">
<span className="text-on-surface-variant text-sm">Montant à payer</span>
<span className="font-bold text-on-surface">{amount != null ? `${amount.toLocaleString("fr-FR")} FCFA` : "..."} <span className="text-on-surface-variant text-sm font-normal">({planName})</span></span>
</div>
<div className="flex justify-between items-center py-2">
<span className="text-on-surface-variant text-sm">Référence</span>
<span className="text-on-surface-variant text-sm font-mono uppercase">{ref ? ref.replace(/^sub_/, "").slice(0, 12) : "..."}</span>
</div>
</div>

<div className="w-full space-y-4">
<button
  onClick={() => { if (!checking) setChecking(true); }}
  className="w-full h-14 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
>
  {checking ? (
    <><span className="material-symbols-outlined animate-spin">sync</span> Vérification...</>
  ) : (
    <><span className="material-symbols-outlined">check_circle</span> J'ai validé le paiement</>
  )}
</button>
<a className="w-full py-3 flex items-center justify-center text-primary font-semibold hover:underline gap-2" href="#">
<span className="material-symbols-outlined text-sm">help</span>
                Besoin d'aide ?
            </a>
</div>
</>
)}

<div className="mt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-sm bg-[#FF8200]"></div>
<div className="w-6 h-6 rounded-sm bg-[#FFFFFF] border border-outline-variant"></div>
<div className="w-6 h-6 rounded-sm bg-[#009E60]"></div>
</div>
</div>
</main>

    </div>
  );
}
