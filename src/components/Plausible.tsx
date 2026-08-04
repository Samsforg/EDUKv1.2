"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "edukora.ci";

export default function Plausible() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.plausible) {
      const q: unknown[][] = [];
      window.plausible = ((event: string, options?: { u?: string; props?: Record<string, string> }) => {
        q.push([event, options]);
        return window.plausible;
      }) as unknown as Window["plausible"];
      const script = document.createElement("script");
      script.defer = true;
      script.dataset.domain = PLAUSIBLE_DOMAIN;
      script.src = "https://plausible.io/js/script.tagged-events.js";
      window.addEventListener("load", () => document.head.appendChild(script));
    }
    const track = window.plausible;
    track?.("pageview", { u: window.location.href });
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { u?: string; props?: Record<string, string> }) => void;
  }
}
