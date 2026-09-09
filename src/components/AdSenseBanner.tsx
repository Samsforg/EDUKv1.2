"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_PUBLISHER_ID } from "@/lib/marketing";

interface AdSenseBannerProps {
  /** Google AdSense ad slot ID (format: 1234567890) */
  slot: string;
  /** Format de la bannière : "auto" s'adapte au conteneur, "fluid" est responsive natif */
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  /** Classe CSS additionnelle pour le conteneur */
  className?: string;
  /** Hauteur minimale en pixels (défaut: 100) */
  minHeight?: number;
  /** Label optionnel affiché au-dessus (ex: "Publicité") */
  label?: string;
}

/**
 * Bannière Google AdSense réutilisable.
 *
 * Respecte le consentement utilisateur : ne charge le script
 * que si le cookie `edukora_consent` autorise le marketing.
 *
 * Usage :
 *   <AdSenseBanner slot="1234567890" format="auto" />
 */
export default function AdSenseBanner({
  slot,
  format = "auto",
  className = "",
  minHeight = 100,
  label = "Publicité",
}: AdSenseBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ADSENSE_PUBLISHER_ID) return;

    // Vérifier le consentement marketing
    const match = document.cookie.match(/(?:^|; )edukora_consent=([^;]*)/);
    if (match) {
      try {
        const prefs = JSON.parse(decodeURIComponent(match[1]));
        if (prefs.marketing !== true && prefs.ia !== true) return;
      } catch {
        return;
      }
    } else {
      return; // Pas de consentement = pas de pub
    }

    setVisible(true);

    // Injecter la bannière AdSense une fois le conteneur monté
    const timer = setTimeout(() => {
      if (!ref.current || ref.current.dataset.adRendered) return;
      try {
        // @ts-ignore — adsbyglobal est défini par le script AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        ref.current.dataset.adRendered = "1";
      } catch {
        // AdSense pas encore chargé ou bloqué — on garde le fallback
      }
    }, 300);

    // Écouter les changements de consentement
    const onConsent = () => {
      const m = document.cookie.match(/(?:^|; )edukora_consent=([^;]*)/);
      if (m) {
        try {
          const p = JSON.parse(decodeURIComponent(m[1]));
          if (p.marketing === true || p.ia === true) setVisible(true);
        } catch {}
      }
    };
    window.addEventListener("edukora-consent-updated", onConsent);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("edukora-consent-updated", onConsent);
    };
  }, []);

  if (!ADSENSE_PUBLISHER_ID || !visible) return null;

  const formatAttr =
    format === "auto"
      ? "auto"
      : format === "fluid"
        ? "fluid"
        : format === "rectangle"
          ? "rectangle"
          : format === "horizontal"
            ? "horizontal"
            : format === "vertical"
              ? "vertical"
              : "auto";

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      {/* Label "Publicité" (requis par Google AdSense) */}
      <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
        <span className="text-[9px] uppercase tracking-widest text-on-surface-variant/50 bg-surface-container-low/80 px-2 py-0.5 rounded-b-md">
          {label}
        </span>
      </div>

      {/* Conteneur AdSense */}
      <div ref={ref} className="pt-4 flex justify-center items-center" style={{ minHeight: `${minHeight}px` }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format={formatAttr}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
