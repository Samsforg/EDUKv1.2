"use client";
import { useEffect, useRef, useState } from "react";
import { EVENTS, trackEvent } from "@/lib/analytics";

interface CertifProps {
  firstName: string;
  level: string;
  xp: number;
  streak: number;
  globalScore: number | null;
}

// Certificat de niveau partageable : rend un canvas et permet le partage WhatsApp / download.
export default function LevelCertificate({ firstName, level, xp, streak, globalScore }: CertifProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = 1080;
    const H = 1080;
    c.width = W;
    c.height = H;

    // Fond
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#0047ab");
    grad.addColorStop(1, "#00307a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Cercles déco
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath();
    ctx.arc(W - 120, 140, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(100, H - 120, 180, 0, Math.PI * 2);
    ctx.fill();

    // Bordure
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 6;
    ctx.strokeRect(48, 48, W - 96, H - 96);

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 44px Arial";
    ctx.fillText("CERTIFICAT DE NIVEAU", W / 2, 190);

    ctx.font = "28px Arial";
    ctx.fillStyle = "#cfe0ff";
    ctx.fillText("Edukora — Réussir son BAC & BEPC", W / 2, 240);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 84px Arial";
    ctx.fillText(firstName.toUpperCase(), W / 2, 420);

    ctx.font = "34px Arial";
    ctx.fillStyle = "#ffd166";
    ctx.fillText(`Niveau ${level}`, W / 2, 500);

    // Stats
    const stats = [
      { label: "XP total", value: String(xp) },
      { label: "Série", value: `${streak} j` },
      { label: "Score global", value: globalScore != null ? `${globalScore}%` : "—" },
    ];
    stats.forEach((s, i) => {
      const x = W / 2 + (i - 1) * 280;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 52px Arial";
      ctx.fillText(s.value, x, 650);
      ctx.font = "24px Arial";
      ctx.fillStyle = "#cfe0ff";
      ctx.fillText(s.label, x, 690);
    });

    ctx.fillStyle = "#cfe0ff";
    ctx.font = "22px Arial";
    ctx.fillText(new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }), W / 2, 820);
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("edukora.net", W / 2, 940);

    setDataUrl(c.toDataURL("image/png"));
  }, [firstName, level, xp, streak, globalScore]);

  const share = async () => {
    if (!dataUrl) return;
    trackEvent(EVENTS.referralLinkShared, { method: "certificate" });
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `edukora-certificat-${firstName}.png`, { type: "image/png" });
      if ("share" in navigator && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Mon certificat Edukora",
          text: `Je suis niveau ${level} sur Edukora avec ${xp} XP ! Rejoins-moi : https://edukora.net/inscription-1-2-edukora`,
        });
        return;
      }
      window.open(`https://wa.me/?text=${encodeURIComponent(`Mon certificat Edukora — Niveau ${level} (${xp} XP) 🏆 Rejoins-moi : https://edukora.net`)}`, "_blank", "noopener");
    } catch {}
  };

  return (
    <div className="bg-surface border border-outline-variant rounded-2xl p-5 space-y-3">
      <h3 className="font-title-md font-bold text-on-surface flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">workspace_premium</span>
        Mon certificat de niveau
      </h3>
      <canvas ref={canvasRef} className="w-full rounded-xl border border-outline-variant" style={{ aspectRatio: "1/1" }} />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={share}
          className="flex-1 bg-[#25D366] text-white rounded-xl py-3 font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-lg">share</span>
          Partager
        </button>
        <a
          href={dataUrl ?? undefined}
          download={`edukora-certificat-${firstName}.png`}
          className="flex-1 bg-surface-container-low text-on-surface rounded-xl py-3 font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          Télécharger
        </a>
      </div>
    </div>
  );
}
