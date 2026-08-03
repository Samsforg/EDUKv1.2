import Link from "next/link";
import screens from "@/screens.json";

export const metadata = { title: "Tous les écrans - Edukora" };

export default function EcransPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface p-6 font-body-md">
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Tous les écrans Edukora</h1>
      <p className="text-label-sm text-on-surface-variant mb-6">{screens.length} écrans générés depuis Stitch</p>
      <ul className="space-y-2">
        {screens.map((s) => (
          <li key={s.slug}>
            <Link href={"/" + s.slug} className="block rounded-xl border border-outline-variant bg-surface-container-lowest p-3 hover:bg-surface-container-low transition-colors">
              <span className="text-label-sm text-on-surface">/{s.slug}</span>
              <span className="block text-label-xs text-on-surface-variant">{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
