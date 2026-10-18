"use client";
import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferred, setDeferred] = useState<Event | null>(null);
  // Lu une fois au montage : le premier rendu est `null` dans tous les cas
  // (`deferred` est nul), donc aucun risque de mismatch d'hydratation.
  const [dismissed, setDismissed] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      return !!localStorage.getItem("pwa-dismissed");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferred || dismissed) return null;

  const install = async () => {
    await (deferred as unknown as { prompt: () => Promise<void> }).prompt();
    setDeferred(null);
  };

  const dismiss = () => {
    localStorage.setItem("pwa-dismissed", "1");
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-surface border border-outline-variant rounded-2xl p-4 shadow-xl z-40 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0">
        <span className="material-symbols-outlined">install_mobile</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-label-sm font-bold text-on-surface">Installer Edukora</p>
        <p className="font-label-xs text-on-surface-variant">Accès rapide hors-ligne</p>
      </div>
      <button onClick={install} className="bg-primary text-on-primary px-3 py-2 rounded-xl text-sm font-bold">Installer</button>
      <button onClick={dismiss} className="text-on-surface-variant p-1"><span className="material-symbols-outlined text-sm">close</span></button>
    </div>
  );
}
