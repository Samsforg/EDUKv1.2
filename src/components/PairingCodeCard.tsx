"use client";

import { useState } from "react";

export function PairingCodeCard() {
  const [code, setCode] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function openCode() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    if (code) return;
    setLoading(true);
    try {
      const res = await fetch("/api/me/pairing-code");
      const data = await res.json();
      if (res.ok && data.code) setCode(data.code);
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard indisponible
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-surface border border-outline-variant rounded-xl active:scale-[0.98] transition-transform duration-100">
      <button onClick={openCode} className="w-full p-4 flex items-center gap-4 text-left">
        <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            family_restroom
          </span>
        </div>
        <div className="flex-1">
          <p className="font-label-md font-semibold text-on-surface">Jumelage parent</p>
          <p className="font-label-xs text-on-surface-variant">Laissez vos parents suivre vos progrès</p>
        </div>
        <span className="material-symbols-outlined text-primary">{open ? "expand_less" : "chevron_right"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            {loading ? (
              <div className="flex items-center justify-center gap-2 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                Génération du code…
              </div>
            ) : code ? (
              <>
                <p className="font-label-xs text-on-surface-variant mb-2">
                  Donnez ce code à vos parents, il est valable 30 jours :
                </p>
                <p className="font-headline-md text-headline-md tracking-[0.4em] font-bold text-primary">
                  {code}
                </p>
                <button
                  onClick={copy}
                  className="mt-3 inline-flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-4 py-2 rounded-full active:scale-[0.98] transition-transform"
                >
                  <span className="material-symbols-outlined text-base">{copied ? "check" : "content_copy"}</span>
                  {copied ? "Copié !" : "Copier le code"}
                </button>
              </>
            ) : (
              <p className="text-sm text-error">Impossible de générer le code.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
