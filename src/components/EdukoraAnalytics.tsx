"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadAnalyticsScripts, attachGlobalTracker } from "@/lib/analytics";
import { loadMarketingScripts } from "@/lib/marketing";

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
  return null;
}