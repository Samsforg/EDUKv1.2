"use client";

import { useEffect } from "react";
import { loadAnalyticsScripts, attachGlobalTracker } from "@/lib/analytics";

export default function EdukoraAnalytics() {
  useEffect(() => {
    attachGlobalTracker();
    loadAnalyticsScripts();
    const onConsent = () => loadAnalyticsScripts();
    window.addEventListener("edukora-consent-updated", onConsent);
    return () => window.removeEventListener("edukora-consent-updated", onConsent);
  }, []);
  return null;
}