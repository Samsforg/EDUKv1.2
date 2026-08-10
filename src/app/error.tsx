"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <span
            className="material-symbols-outlined text-primary text-6xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            error_outline
          </span>
        </div>
        <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-primary mb-2">
          Une erreur est survenue
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">
          Un problème inattendu a empêché l'affichage de cette page. Veuillez
          réessayer.
        </p>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={retry}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-body-md font-semibold text-on-primary"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body-md font-semibold text-primary"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
