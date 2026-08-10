"use client";

import { useState } from "react";

export function ConfirmButton({ label, confirmLabel = "Confirmer", onConfirm, title }: { label: string; confirmLabel?: string; onConfirm: () => void; title?: string }) {
  const [arming, setArming] = useState(false);

  if (arming) {
    return (
      <span className="inline-flex items-center gap-1">
        <button
          onClick={async () => {
            setArming(false);
            await onConfirm();
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold bg-error text-on-error"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          {confirmLabel}
        </button>
        <button onClick={() => setArming(false)} className="px-1 text-on-surface-variant" title="Annuler" aria-label="Annuler">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setArming(true)}
      title={title}
      className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high hover:text-error transition-colors"
    >
      <span className="material-symbols-outlined text-sm">{label === "Supprimer" ? "delete" : "delete_forever"}</span>
      {label}
    </button>
  );
}