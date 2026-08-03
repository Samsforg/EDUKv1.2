"use client";

import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-primary-container/30 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-primary text-4xl">wifi_off</span>
      </div>
      <h1 className="font-title-lg text-title-lg text-on-surface mb-2">Pas de connexion</h1>
      <p className="font-body-sm text-on-surface-variant mb-8 max-w-xs">
        Tu es hors-ligne. Tes quiz et sujets déjà chargés restent disponibles, mais vérifie ta connexion pour continuer.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-primary text-on-primary font-label-md px-8 py-3 rounded-full active:scale-95 transition-transform duration-100"
      >
        Réessayer
      </button>
      <Link href="/accueil-edukora" className="mt-4 font-label-sm text-primary">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
