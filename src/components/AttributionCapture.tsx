"use client";

import { useEffect } from "react";
import { captureLandingAttribution } from "@/lib/attribution";

/**
 * P1.0 — capture first-touch (UTM + identifiants de clic publicitaires) au
 * montage de chaque page. Monté dans le layout racine : le premier contact
 * (landing) est enregistré avant toute navigation vers /inscription.
 * Rendu null côté serveur.
 */
export default function AttributionCapture() {
  useEffect(() => {
    captureLandingAttribution();
  }, []);
  return null;
}
