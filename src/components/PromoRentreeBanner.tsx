"use client";

import { useEffect, useState } from "react";
import { RENTREE_PROMO_CODE, RENTREE_PROMO_PERCENT, RENTREE_PROMO_ENDS_AT } from "@/lib/rentree";

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function PromoRentreeBanner({ compact = false }: { compact?: boolean }) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const end = new Date(`${RENTREE_PROMO_ENDS_AT}T23:59:59`).getTime();
    const tick = () => {
      const left = Math.ceil((end - Date.now()) / 86400000);
      setDaysLeft(left > 0 ? left : 0);
    };
    tick();
    const id = setInterval(tick, 3600000);
    return () => clearInterval(id);
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(RENTREE_PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-tertiary-container text-on-primary shadow-lg ${
        compact ? "px-4 py-3" : "px-6 py-5"
      }`}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 relative">
        <div className="flex items-center gap-3 shrink-0">
          <span className="material-symbols-outlined text-3xl">school</span>
          <div>
            <p className="font-headline font-extrabold text-lg leading-tight">Offre de Rentrée</p>
            <p className="text-sm opacity-90">
              -{RENTREE_PROMO_PERCENT} % sur l&apos;abonnement Réussite
            </p>
          </div>
        </div>
        <div className="hidden md:block h-10 w-px bg-white/25" />
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={copyCode}
            className="inline-flex items-center gap-2 rounded-full bg-on-primary text-primary font-extrabold px-4 py-2 text-sm shadow hover:brightness-110 active:scale-95 transition-all"
          >
            <span className="tracking-widest">{RENTREE_PROMO_CODE}</span>
            <span className="material-symbols-outlined text-[16px]">{copied ? "check" : "content_copy"}</span>
          </button>
          <p className="text-xs opacity-90 font-medium">
            Saisis le code au paiement.
            {daysLeft !== null && (
              <span className="ml-1">
                {daysLeft > 0 ? `${daysLeft} jour${daysLeft > 1 ? "s" : ""} restants` : "Dernier jour !"}
              </span>
            )}
            <span className="block text-[11px] opacity-80">Valable jusqu&apos;au {formatDate(RENTREE_PROMO_ENDS_AT)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}