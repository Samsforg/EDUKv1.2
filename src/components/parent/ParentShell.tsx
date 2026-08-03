import Link from "next/link";
import type { ReactNode } from "react";

type ActiveTab = "dashboard" | "exams" | "attendance" | "profile";

export function ParentShell({ active, children }: { active: ActiveTab; children: ReactNode }) {
  const tabs: { key: ActiveTab; href: string; icon: string; label: string }[] = [
    { key: "dashboard", href: "/espace-parent", icon: "dashboard", label: "Tableau de bord" },
    { key: "exams", href: "/espace-parent/examens", icon: "assignment", label: "Examens" },
    { key: "attendance", href: "/espace-parent/assiduite", icon: "history_edu", label: "Assiduité" },
    { key: "profile", href: "/espace-parent/profil", icon: "person", label: "Profil" },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background pb-24">
      <header className="fixed top-0 w-full z-50 bg-primary flex items-center justify-between px-4 h-16 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/20 bg-on-primary/10 flex items-center justify-center">
            <img src="/images/logo-edukora.png" alt="Edukora" className="w-full h-full object-cover" />
          </div>
          <span className="text-on-primary font-headline text-lg font-semibold">Edukora Parent</span>
        </div>
        <Link
          href="/espace-parent/reglages-notifications"
          aria-label="Réglages des notifications"
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-primary hover:bg-primary-container/20 transition-colors duration-200"
        >
          <span className="material-symbols-outlined">notifications</span>
        </Link>
      </header>

      <main className="pt-20 px-4 max-w-2xl mx-auto">{children}</main>

      <nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface border-t border-outline-variant px-2 h-20 flex justify-around items-center shadow-lg rounded-t-xl">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={
              active === t.key
                ? "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-95 transition-transform duration-150"
                : "flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-95 transition-transform duration-150"
            }
          >
            <span className="material-symbols-outlined" style={active === t.key ? { fontVariationSettings: "'FILL' 1" } : undefined}>
              {t.icon}
            </span>
            <span className="font-label text-label-xs font-semibold">{t.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
