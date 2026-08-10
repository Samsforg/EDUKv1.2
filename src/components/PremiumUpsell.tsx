"use client";

import Link from "next/link";

interface PlanInfo {
  id: number;
  name: string;
  price_cents: number;
  interval: string;
}

export function PremiumUpsell({
  open,
  onClose,
  message,
  plan,
  decouvertePrice = 0,
}: {
  open: boolean;
  onClose: () => void;
  message: string;
  plan: PlanInfo | null;
  decouvertePrice?: number;
}) {
  if (!open) return null;

  const price = plan ? `${plan.price_cents.toLocaleString("fr-FR")} FCFA` : "4 900 FCFA";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-surface rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl mx-0 sm:mx-4 animate-[slideUp_0.25s_ease-out]">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-primary text-3xl">workspace_premium</span>
        </div>
        <h3 className="font-headline text-headline-md font-bold text-on-surface">Limite atteinte</h3>
        <p className="font-body text-body-md text-on-surface-variant mt-2">{message}</p>

        <div className="mt-5 rounded-xl border border-outline-variant overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-surface-container-low">
            <div>
              <p className="font-label text-label-sm font-semibold text-on-surface">Plan Découverte</p>
              <p className="text-xs text-on-surface-variant">
                {decouvertePrice.toLocaleString("fr-FR")} FCFA / mois — limites gratuites
              </p>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
              Actuel
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-on-primary">
            <div>
              <p className="font-label text-label-sm font-bold">{plan?.name ?? "Réussite"}</p>
              <p className="text-xs text-on-primary/80">Kora IA : 30 questions/mois • Fiches illimitées</p>
            </div>
            <p className="font-bold text-sm">{price}<span className="text-xs font-normal opacity-80"> / mois</span></p>
          </div>
        </div>

        <Link
          href="/plans-d-abonnement-edukora-1"
          className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-secondary-container text-on-secondary-container font-extrabold active:scale-95 transition-transform duration-100"
        >
          Passer à Réussite
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
        <button
          onClick={onClose}
          className="mt-3 w-full py-2 text-center text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
        >
          Revenir plus tard
        </button>
      </div>
    </div>
  );
}
