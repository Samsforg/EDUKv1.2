import Link from "next/link";

export const metadata = {
  title: "Page introuvable",
  description:
    "La page que vous cherchez n'existe pas ou a été déplacée. Retournez à l'accueil Edukora.",
};

export default function NotFound() {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            school
          </span>
        </div>
        <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-primary mb-2">
          404
        </h1>
        <p className="font-body-md text-body-md font-semibold mb-1">
          Page introuvable
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-body-md font-semibold text-on-primary"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Retour à l'accueil
        </Link>
      </main>
    </div>
  );
}
