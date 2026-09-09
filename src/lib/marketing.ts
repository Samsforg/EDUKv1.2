"use client";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
export const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "";

export const MARKETING_ENABLED = !!(META_PIXEL_ID || TIKTOK_PIXEL_ID || GOOGLE_ADS_ID);

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void; load: (id: string) => void; page: () => void };
  }
}

function marketingAccepted(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(/(?:^|; )edukora_consent=([^;]*)/);
  if (!match) return false;
  try {
    const prefs = JSON.parse(decodeURIComponent(match[1]));
    return prefs.marketing === true || prefs.ia === true;
  } catch {
    return false;
  }
}

export function loadMarketingScripts(): void {
  if (typeof document === "undefined") return;
  if (!marketingAccepted()) return;
  if (!MARKETING_ENABLED) return;

  // Meta Pixel
  if (META_PIXEL_ID && !(window as unknown as Record<string, unknown>).edukora_meta_loaded) {
    (window as unknown as Record<string, unknown>).edukora_meta_loaded = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    // @ts-ignore
    window.fbq = window.fbq || function (...args: unknown[]) { (window.fbq!.q = (window.fbq!.q as unknown[]) ?? []).push(args); };
    // @ts-ignore
    window._fbq = window._fbq || [];
    window.fbq!("init", META_PIXEL_ID);
    window.fbq!("track", "PageView");
  }

  // TikTok Pixel
  if (TIKTOK_PIXEL_ID && !(window as unknown as Record<string, unknown>).edukora_tiktok_loaded) {
    (window as unknown as Record<string, unknown>).edukora_tiktok_loaded = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://analytics.tiktok.com/i18n/pixel/events.js";
    s.onload = () => {
      try {
        // @ts-ignore
        window.ttq?.load(TIKTOK_PIXEL_ID);
        window.ttq?.page();
      } catch {}
    };
    document.head.appendChild(s);
  }

  // Google Ads (gtag déjà chargé par analytics.ts si GA_ID présent, on réutilise)
  if (GOOGLE_ADS_ID && typeof (window as unknown as Record<string, unknown>).gtag === "function") {
    // @ts-ignore
    (window as unknown as Record<string, unknown>).gtag("config", GOOGLE_ADS_ID);
  }

  // Google AdSense — charge le script asynchrone pour les bannières pub
  if (ADSENSE_PUBLISHER_ID && !(window as unknown as Record<string, unknown>).edukora_adsense_loaded) {
    (window as unknown as Record<string, unknown>).edukora_adsense_loaded = true;
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;
    document.head.appendChild(s);
  }
}

export function trackMarketing(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (!marketingAccepted()) return;
  if (window.fbq) window.fbq("track", event, params);
  if (window.ttq) window.ttq.track(event, params);
  const gtag = (window as unknown as Record<string, unknown>).gtag as ((...a: unknown[]) => void) | undefined;
  if (gtag && GOOGLE_ADS_ID) gtag("event", event, { ...params, send_to: GOOGLE_ADS_ID });
}
