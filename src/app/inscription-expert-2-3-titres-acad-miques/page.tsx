import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-6">
        <span className="material-symbols-outlined text-6xl text-primary">info</span>
        <h1 className="text-2xl font-headline font-bold text-on-surface">Inscription simplifiée</h1>
        <p className="text-on-surface-variant">
          L&apos;inscription enseignant a été simplifiée en 2 étapes. Veuillez recommencer depuis le début.
        </p>
        <Link href="/inscription-expert-1-3-infos-personnelles" className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          <span className="material-symbols-outlined">arrow_forward</span>
          Commencer l&apos;inscription
        </Link>
      </div>
    </div>
  );
}
