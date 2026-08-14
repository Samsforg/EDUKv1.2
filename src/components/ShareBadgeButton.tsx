"use client";

import { useState } from "react";

interface ShareBadgeButtonProps {
  name: string;
  icon: string;
  earnedCount?: number;
  totalCount?: number;
}

export default function ShareBadgeButton({ name, icon, earnedCount, totalCount }: ShareBadgeButtonProps) {
  const [busy, setBusy] = useState(false);

  async function handleShare() {
    if (busy) return;
    setBusy(true);
    const collection = earnedCount != null && totalCount != null ? ` (${earnedCount}/${totalCount} badges débloqués)` : "";
    const text = `🎖️ J'ai débloqué le badge « ${name} » sur Edukora${collection} ! Rejoins-moi et prépare ton BAC/BEPC 👉 edukora.net`;
    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: "Mon badge Edukora", text });
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
      aria-label={`Partager le badge ${name}`}
      className="w-full mt-2.5 h-9 rounded-lg bg-primary/10 text-primary font-label-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform duration-100 disabled:opacity-60"
    >
      {busy ? (
        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
      ) : (
        <>
          <span className="material-symbols-outlined text-[16px]">{icon || "military_tech"}</span>
          Partager
        </>
      )}
    </button>
  );
}