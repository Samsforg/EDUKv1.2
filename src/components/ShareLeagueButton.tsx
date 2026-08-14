"use client";

import { useState } from "react";

interface ShareLeagueButtonProps {
  ligueName: string;
  rankInLigue: number | null;
  xp: number;
  nextLigueName?: string | null;
}

export default function ShareLeagueButton({ ligueName, rankInLigue, xp, nextLigueName }: ShareLeagueButtonProps) {
  const [busy, setBusy] = useState(false);

  async function handleShare() {
    if (busy) return;
    setBusy(true);
    const rank = rankInLigue != null ? `, classé·e #${rankInLigue} dans ma ligue` : "";
    const next = nextLigueName ? ` Je vise la Ligue ${nextLigueName} !` : "";
    const text = `🏆 Je suis en Ligue ${ligueName} sur Edukora (${xp.toLocaleString("fr-FR")} XP)${rank}${next} Rejoins-moi et prépare ton BAC/BEPC 👉 edukora.net`;
    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: "Ma Ligue Edukora", text });
          return;
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
        }
      }
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={busy}
      className="w-full mt-4 py-3 rounded-full border border-primary text-primary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100 disabled:opacity-60"
    >
      {busy ? (
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
      ) : (
        <>
          <span className="material-symbols-outlined text-lg">share</span>
          Partager ma ligue
        </>
      )}
    </button>
  );
}