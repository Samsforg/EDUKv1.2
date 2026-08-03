"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/resultats", label: "Résultats" },
  { href: "/tarifs", label: "Tarifs" },
];

export default function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-outline-variant/60">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 h-16">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-headline-md text-headline-md font-bold text-primary">Edukora</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-label-sm font-semibold text-on-surface-variant">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-primary transition-colors ${pathname === l.href ? "text-primary" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/connexion-edukora" className="text-primary font-semibold text-label-sm px-4 py-2 hover:opacity-80 transition-opacity">
            Connexion
          </Link>
          <Link
            href="/inscription-1-2-edukora"
            className="bg-secondary-container text-on-secondary-fixed font-bold px-5 py-2 rounded-[12px] active:scale-95 transition-transform shadow-md text-label-sm"
          >
            S'inscrire
          </Link>
        </div>
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-[12px] border border-outline-variant text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t border-outline-variant/60 pt-4 bg-background">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`block font-label-sm font-semibold hover:text-primary ${pathname === l.href ? "text-primary" : "text-on-surface-variant"}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link
              href="/connexion-edukora"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center border border-outline-variant text-primary font-bold px-4 py-2.5 rounded-[12px] text-label-sm"
            >
              Connexion
            </Link>
            <Link
              href="/inscription-1-2-edukora"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-secondary-container text-on-secondary-fixed font-bold px-4 py-2.5 rounded-[12px] text-label-sm"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
