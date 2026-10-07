"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  loadAnalyticsScripts,
  attachGlobalTracker,
  trackEvent,
  EVENTS,
} from "@/lib/analytics";
import { loadMarketingScripts } from "@/lib/marketing";

// Phase 3f — pages marketing qui comptent comme entree de parcours.
// Volontairement restreint aux pages visibles par un visiteur non
// connecte : les espaces connectes ne sont pas des entrees.
const MARKETING_PATHS = [
  "/",
  "/fonctionnalites",
  "/tarifs",
  "/parrainage",
  "/tuteur-ia-edukora",
  "/simulateur-d-examen-bac-bepc",
  "/resultats",
  "/blog",
];

const RETURN_VISIT_KEY = "edukora_seen";

// Cibles considerées comme « sortie vers l'inscription ». Le listener
// délégué les capte en une seule fois, quel que soit le nombre de CTA.
const SIGNUP_TARGET = /^\/(inscription|connexion)/;

function isMarketingPath(pathname: string): boolean {
  return MARKETING_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export default function EdukoraAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    attachGlobalTracker();
    loadAnalyticsScripts();
    loadMarketingScripts();
    const onConsent = () => {
      loadAnalyticsScripts();
      loadMarketingScripts();
    };
    window.addEventListener("edukora-consent-updated", onConsent);
    return () => window.removeEventListener("edukora-consent-updated", onConsent);
  }, []);
  useEffect(() => {
    // Pageview interne gratuit (PostHog-like, 100% 1st-party)
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "pageview", props: { path: pathname }, url: location.href }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  // 3f — landing_viewed + return_visit.
  // Le temoin de premiere visite vit en localStorage : `return_visit`
  // mesure une re-visite appareil, pas une session GA4 (qui peut
  // compter plusieurs sessions pour un meme appareil).
  useEffect(() => {
    if (!pathname || !isMarketingPath(pathname)) return;
    let returning = false;
    try {
      returning = window.localStorage.getItem(RETURN_VISIT_KEY) === "1";
      window.localStorage.setItem(RETURN_VISIT_KEY, "1");
    } catch {
      // navigation privee : on ignore, l'evenement reste envoye
    }
    trackEvent(EVENTS.landingViewed, { page_path: pathname });
    if (returning) {
      trackEvent(EVENTS.returnVisit, { page_path: pathname });
    }
  }, [pathname]);

  // 3f — cta_clicked.
  // Listener délégué au lieu de 12 instrumentations dans les pages
  // marketing : un seul point de maintenance, et tous les CTA sont
  // couverts, y compris ceux ajoutés plus tard. Le libellé est lu
  // dans le DOM (texte marketing statique) et passe ensuite par le
  // filtre PII de trackEvent avant d'atteindre un tiers.
  useEffect(() => {
    if (!pathname || pathname.startsWith("/inscription")) return;
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      let href: URL;
      try {
        href = new URL(anchor.href, location.origin);
      } catch {
        return;
      }
      if (href.origin !== location.origin) return;
      if (!SIGNUP_TARGET.test(href.pathname)) return;
      const label = (anchor.textContent ?? "").replace(/\s+/g, " ").trim();
      trackEvent(
        EVENTS.ctaClicked,
        {
          cta_target: href.pathname,
          cta_source: pathname,
          cta_label: label ? label.slice(0, 40) : null,
        },
        // Chaque clic est une interaction reelle : pas de dedupe.
        { dedupe: false },
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}