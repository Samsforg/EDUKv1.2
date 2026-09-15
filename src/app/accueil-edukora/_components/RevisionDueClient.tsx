"use client";

import Link from "next/link";

interface RevisionDueClientProps {
  revisionDue: number;
}

export default function RevisionDueClient({ revisionDue }: RevisionDueClientProps) {
  return (
    <Link href="/revision" className="bg-tertiary-container/15 border border-tertiary/20 rounded-xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-100">
      <div className="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-tertiary">replay</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-label-sm font-semibold text-on-surface">Révisions à faire</p>
        <p className="text-label-xs text-on-surface-variant">{revisionDue} quiz à réviser aujourd'hui</p>
      </div>
      <span className="material-symbols-outlined text-on-surface shrink-0">chevron_right</span>
    </Link>
  );
}