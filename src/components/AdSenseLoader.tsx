"use client";

import { useEffect } from "react";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

/**
 * Loads the AdSense script only after the user has consented to marketing cookies.
 * This prevents the AdSense script from firing before GDPR consent.
 */
export default function AdSenseLoader() {
  useEffect(() => {
    if (!ADSENSE_ID) return;

    function hasMarketingConsent(): boolean {
      try {
        const match = document.cookie.match(/(?:^|; )edukora_consent=([^;]*)/);
        if (!match) return false;
        const prefs = JSON.parse(decodeURIComponent(match[1]));
        return prefs.marketing === true || prefs.ia === true;
      } catch {
        return false;
      }
    }

    function loadAdSense() {
      if (document.querySelector(`script[src*="adsbygoogle.js?client=${ADSENSE_ID}"]`)) return;
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    if (hasMarketingConsent()) {
      loadAdSense();
      return;
    }

    const onConsent = () => {
      if (hasMarketingConsent()) loadAdSense();
    };
    window.addEventListener("edukora-consent-updated", onConsent);
    return () => window.removeEventListener("edukora-consent-updated", onConsent);
  }, []);

  return null;
}
