"use client";

export interface ConfirmState {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export default function ConfirmDialog({ state, onClose }: { state: ConfirmState | null; onClose: () => void }) {
  if (!state) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl border border-outline-variant p-6 w-full max-w-sm shadow-xl">
        <div className="w-12 h-12 rounded-full bg-error-container/30 text-error flex items-center justify-center mb-4">
          <span className="material-symbols-outlined">warning</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{state.title}</h3>
        <p className="font-body-sm text-on-surface-variant mb-6">{state.message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-full border border-outline-variant text-on-surface font-label-md font-semibold active:scale-[0.98] transition-transform duration-100"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              state.onConfirm();
              onClose();
            }}
            className="flex-1 h-11 rounded-full bg-error text-on-error font-label-md font-semibold active:scale-[0.98] transition-transform duration-100"
          >
            {state.confirmLabel ?? "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}
