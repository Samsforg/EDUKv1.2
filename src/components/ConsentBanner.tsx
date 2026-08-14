"use client";

import { useEffect, useState } from "react";

const CONSENT_COOKIE = "edukora_consent";

function hasConsentCookie(): boolean {
  if (typeof document === "undefined") return true;
  return document.cookie.split(";").some((c) => c.trim().startsWith(CONSENT_COOKIE + "="));
}

function saveConsent(prefs: { essential: boolean; analytics: boolean; ia: boolean }) {
  document.cookie =
    CONSENT_COOKIE + "=" + encodeURIComponent(JSON.stringify(prefs)) + ";path=/;max-age=15552000;samesite=lax";
  try {
    localStorage.setItem("edukora_cookie_prefs", JSON.stringify(prefs));
  } catch (e) {}
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsentCookie()) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 md:p-4 pointer-events-none">
      <div className="mx-auto max-w-2xl bg-surface text-on-surface rounded-2xl border border-outline-variant shadow-lg p-4 md:p-5 pointer-events-auto">
        <div className="flex items-start gap-3 mb-2">
          <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            cookie
          </span>
          <div>
            <h2 className="font-headline-md text-headline-sm font-bold text-on-surface">Nous respectons votre vie privée</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Edukora utilise des cookies essentiels pour la sécurité et votre
              progression. Nous vous demandons votre accord avant d'activer les
              cookies analytiques qui nous aident à améliorer l'expérience.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <button
            onClick={() => {
              saveConsent({ essential: true, analytics: true, ia: true });
              setVisible(false);
            }}
            className="flex-1 bg-primary hover:bg-primary/90 text-on-primary font-bold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
          >
            Tout accepter
          </button>
          <a
            href="/pr-f-rences-de-cookies-et-donn-es"
            className="flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold py-3 px-4 rounded-xl border border-outline-variant text-center transition-all duration-200 active:scale-95"
          >
            Personnaliser
          </a>
        </div>
      </div>
    </div>
  );
}
