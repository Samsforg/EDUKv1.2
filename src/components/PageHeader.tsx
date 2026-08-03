"use client";

import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  right?: React.ReactNode;
  backLabel?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backHref = "/accueil-edukora",
  right,
  backLabel = "Retour",
}: PageHeaderProps) {
  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-50 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16">
      <div className="flex items-center gap-2 min-w-0">
        <Link
          href={backHref}
          aria-label={backLabel}
          title={backLabel}
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low active:scale-95 duration-100"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="min-w-0">
          <h1 className="font-title-md text-title-md font-bold text-primary truncate">{title}</h1>
          {subtitle && (
            <p className="font-label-xs text-label-xs text-on-surface-variant truncate">{subtitle}</p>
          )}
        </div>
      </div>
      {right && <div className="shrink-0 flex items-center gap-2">{right}</div>}
    </header>
  );
}
