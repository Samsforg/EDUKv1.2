"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/accueil-edukora", icon: "home", label: "Accueil" },
  { href: "/quiz", icon: "menu_book", label: "Quiz" },
  { href: "/tuteur-ia", icon: "smart_toy", label: "Tuteur AI" },
  { href: "/simulateur", icon: "description", label: "Examens" },
  { href: "/espace-eleve/profil", icon: "person", label: "Profil" },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-2 pb-safe bg-surface dark:bg-on-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 text-on-surface dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary ${isActive ? "bg-primary-container text-on-primary-container rounded-full" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label text-label-xs font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}