"use client";

import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <main className="w-full max-w-md text-center">
        <span className="material-symbols-outlined text-error text-5xl mb-4 block">error_outline</span>
        <h1 className="font-headline text-xl font-bold text-on-surface mb-2">Erreur de chargement</h1>
        <p className="text-on-surface-variant text-sm mb-6">
          Une erreur est survenue dans cet espace. Veuillez réessayer.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={retry}
            className="h-11 bg-primary text-on-primary rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            Réessayer
          </button>
          <Link href="/accueil-edukora" className="h-11 flex items-center justify-center text-primary font-semibold">
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
