"use client";

import { useEffect } from "react";
import { registerPeriodicSync } from "@/lib/sync-client";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        if ("periodicSync" in reg) {
          registerPeriodicSync();
        }
      }).catch(() => {});
    }
  }, []);
  return null;
}