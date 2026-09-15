"use client";

import Link from "next/link";

interface DailyQuizClientProps {
  daily: {
    id: number;
    title: string;
    done_today: boolean;
    bonus_xp: number;
  };
}

export default function DailyQuizClient({ daily }: DailyQuizClientProps) {
  return (
    <Link href={`/quiz/${daily.id}`} className="col-span-2 bento-card relative overflow-hidden bg-secondary-container border border-outline-variant p-5 rounded-xl flex items-center gap-4 group active:scale-95 transition-transform duration-100">
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-secondary/10 rounded-full"></div>
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm shrink-0">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          flag
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-label-sm font-semibold text-on-surface flex items-center gap-1.5">
          Défi du jour
          {daily.done_today && (
            <span className="inline-flex items-center gap-0.5 bg-impact-emerald/15 text-impact-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[12px]">check_circle</span>
              Relevé
            </span>
          )}
        </p>
        <p className="text-label-xs text-on-surface truncate mt-0.5">{daily.title}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-label-xs font-bold text-on-primary">+{daily.bonus_xp} XP bonus</p>
        <span className="text-label-xs text-on-surface group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
          {daily.done_today ? "Rejouer" : "Lancer"}
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </span>
      </div>
    </Link>
  );
}