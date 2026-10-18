"use client";

import { useEffect } from "react";
import { buildIdsDiffer } from "@/lib/version";

const META_NAME = "edukora-build";
const RELOAD_KEY = "edukora-build-reloaded";

/**
 * Lit l'identifiant de build injecté dans le document courant (rendu serveur au
 * moment du chargement de la page). S'il diffère de la version servie par
 * `/api/version` (déploiement courant), le client affiche une version obsolète :
 * on recharge une seule fois pour réaligner le client sur le serveur.
 */
function documentBuildId(): string | null {
  if (typeof document === "undefined") return null;
  const el = document.querySelector(`meta[name="${META_NAME}"]`);
  return el?.getAttribute("content") ?? null;
}

export default function VersionSync() {
  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { version?: string };
        const server = data?.version;
        const client = documentBuildId();
        if (!buildIdsDiffer(client, server)) return;
        // Anti-boucle : un seul rechargement par version serveur.
        if (sessionStorage.getItem(RELOAD_KEY) === server) return;
        sessionStorage.setItem(RELOAD_KEY, server ?? "");
        if (!cancelled) window.location.reload();
      } catch {
        // Réseau indisponible : on retentera au prochain focus / retour d'onglet.
      }
    }

    check();
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
  }, []);

  return null;
}
