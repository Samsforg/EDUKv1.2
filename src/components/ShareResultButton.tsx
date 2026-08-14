"use client";

import { useRef, useState } from "react";

interface ShareResultButtonProps {
  variant: "quiz" | "exam";
  title?: string;
  score: number;
  max: number;
  pct?: number;
  scoreOver20?: number;
  xp: number;
}

const WHATSAPP_GREEN = "#25D366";
const PRIMARY = "#0047ab";
const PRIMARY_DARK = "#082a75";

function buildShareText(props: ShareResultButtonProps): string {
  const headline =
    props.variant === "exam"
      ? `J'ai obtenu ${props.scoreOver20} / 20 à mon sujet d'examen sur Edukora !`
      : `J'ai réussi mon quiz avec ${props.pct ?? Math.round((props.score / props.max) * 100)}% de bonnes réponses sur Edukora !`;
  const topic = props.title ? ` (${props.title})` : "";
  return `${headline}${topic} 🎉 +${props.xp} XP gagnés. Rejoins-moi et prépare ton BAC/BEPC avec Edukora 👉 edukora.net`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Dessine la carte de résultat 1080x1080 (sans dépendance externe). */
function drawShareCard(canvas: HTMLCanvasElement, props: ShareResultButtonProps) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = 1080;
  const H = 1080;
  const pct = props.variant === "quiz"
    ? (props.pct ?? Math.round((props.score / props.max) * 100))
    : Math.max(0, Math.min(100, Math.round(((props.scoreOver20 ?? 0) / 20) * 100)));
  const bigScore =
    props.variant === "exam" && props.scoreOver20 != null
      ? `${props.scoreOver20} / 20`
      : `${props.score} / ${props.max}`;

  // Fond dégradé
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, PRIMARY);
  grad.addColorStop(1, PRIMARY_DARK);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Cercles décoratifs
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.beginPath();
  ctx.arc(W - 90, 90, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(40, H - 60, 180, 0, Math.PI * 2);
  ctx.fill();

  // Logo
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 64px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillText("EDUKORA", 80, 130);
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "500 34px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillText("Prépa BAC & BEPC en Côte d'Ivoire", 82, 182);

  // Titre
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 62px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  const headline =
    props.variant === "exam"
      ? "Mon résultat au sujet d'examen"
      : "J'ai réussi mon quiz !";
  ctx.fillText(headline, W / 2, 330);

  // Carte blanche centrale
  roundRect(ctx, 140, 380, W - 280, 380, 48);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.fillStyle = "#1c1b1f";
  ctx.font = "700 52px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  if (props.title) {
    const title = props.title.length > 42 ? `${props.title.slice(0, 42)}…` : props.title;
    ctx.fillText(title, W / 2, 470);
  }

  ctx.fillStyle = PRIMARY;
  ctx.font = "900 128px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillText(bigScore, W / 2, 610);

  // Anneau de pourcentage
  const cx = W / 2;
  const cy = 690;
  const r = 52;
  ctx.strokeStyle = "#e3e1ec";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = pct >= 70 ? "#1b873b" : pct >= 40 ? "#b26a00" : "#ba1a1a";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * pct) / 100);
  ctx.stroke();
  ctx.fillStyle = "#1c1b1f";
  ctx.font = "700 40px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillText(`${pct}%`, cx, cy + 14);

  // XP
  roundRect(ctx, W / 2 - 110, 772, 220, 76, 38);
  ctx.fillStyle = PRIMARY;
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 40px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillText(`+${props.xp} XP`, W / 2, 822);

  // Pied de page
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "600 40px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillText("Rejoins-moi, je prépare mon examen avec Edukora", W / 2, 930);
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "700 44px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  ctx.fillText("edukora.net", W / 2, 1000);
}

export default function ShareResultButton(props: ShareResultButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleShare() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("canvas indisponible");
      drawShareCard(canvas, props);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("impossible de générer l'image");
      const text = buildShareText(props);
      const file = new File([blob], "edukora-resultat.png", { type: "image/png" });

      // 1) Partage natif avec image (mobile Android/iOS)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "Mon résultat Edukora", text });
          return;
        } catch (err) {
          const name = (err as Error).name;
          if (name === "AbortError") return; // utilisateur a annulé
          // sinon on retombe sur le lien wa.me
        }
      }
      // 2) Repli : lien WhatsApp avec le texte
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError("Impossible de partager le résultat. Réessaie.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <canvas ref={canvasRef} width={1080} height={1080} className="hidden" aria-hidden="true" />
      <button
        onClick={handleShare}
        disabled={busy}
        className="w-full h-12 rounded-full text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100 disabled:opacity-60"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      >
        {busy ? (
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
        ) : (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
        Partager sur WhatsApp
      </button>
      {error && (
        <p className="mt-2 text-center text-body-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}