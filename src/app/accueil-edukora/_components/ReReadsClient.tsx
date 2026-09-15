"use client";

import Link from "next/link";

interface ReReadItem {
  id: string;
  reason: string;
  href: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  chapter_title: string;
}

interface ReReadsClientProps {
  reReads: ReReadItem[];
}

export default function ReReadsClient({ reReads }: ReReadsClientProps) {
  return (
    <section className="space-y-stack-md">
      <div className="flex justify-between items-center">
        <h2 className="font-headline-md text-headline-md text-on-surface">À revoir</h2>
        <Link href="/parcours" className="text-primary font-label-sm">Tout voir</Link>
      </div>
      {reReads.map((item) => (
        <Link key={item.id} href={item.href} className="bg-surface-container-high border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.subject_color + "1A", color: item.subject_color }}>
            <span className="material-symbols-outlined">{item.subject_icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label-sm text-on-surface truncate">{item.reason}</p>
            <p className="text-label-xs text-on-surface truncate">{item.chapter_title}</p>
          </div>
          <span className="material-symbols-outlined text-primary shrink-0">chevron_right</span>
        </Link>
      ))}
    </section>
  );
}