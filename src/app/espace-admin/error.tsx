"use client";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-error-container text-on-error-container flex items-center justify-center mb-5">
          <span className="material-symbols-outlined text-3xl">report_gmailerrorred</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-on-surface mb-2">Une erreur s&apos;est produite</h1>
        <p className="text-on-surface-variant mb-1">
          La console d&apos;administration n&apos;a pas pu charger cette vue. Vous pouvez réessayer.
        </p>
        {error.digest ? (
          <p className="text-xs text-on-surface-variant mb-4">Référence : {error.digest}</p>
        ) : (
          <p className="text-xs text-on-surface-variant mb-4">Vérifiez la connexion et réessayez.</p>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-semibold active:scale-95 duration-150 transition-all"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          Réessayer
        </button>
      </div>
    </div>
  );
}