"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "edukora.ci";

export default function Plausible() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible("pageview", { u: window.location.href });
    }
  }, [pathname]);

  return (
    <>
      <Script
        defer
        data-domain={PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/script.tagged-events.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`
          window.plausible = window.plausible || function() {
            (window.plausible.q = window.plausible.q || []).push(arguments)
          }
        `}
      </Script>
    </>
  );
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { u?: string; props?: Record<string, string> }) => void;
  }
}