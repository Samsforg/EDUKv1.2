"use client";

import { useMemo } from "react";
import { nextExamDate, formatExamDate, type ExamKind } from "@/lib/exam-dates";

interface ExamCountdownProps {
  kind: ExamKind;
}

const EXAM_LABELS: Record<ExamKind, string> = {
  BAC: "BAC",
  BEPC: "BEPC",
};

export default function ExamCountdown({ kind }: ExamCountdownProps) {
  const info = useMemo(() => nextExamDate(kind), [kind]);

  const daysStr = info.days.toString().padStart(2, "0");
  const [d1, d2] = daysStr.split("");
  const isSoon = info.days <= 30;

  return (
    <div className="col-span-2 bento-card relative overflow-hidden bg-primary rounded-xl text-on-primary shadow-md">
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-on-primary/10 rounded-full"></div>
      <div className="absolute -bottom-10 -left-4 w-24 h-24 bg-on-primary/10 rounded-full"></div>
      <div className="relative z-10 flex items-center gap-4 p-5">
        <div className="flex flex-col items-center shrink-0">
          <span className="font-label-xs uppercase tracking-widest opacity-80">J-{info.days}</span>
          <div className="flex items-end gap-1 mt-1">
            <span className="font-display font-black text-[44px] leading-none">{d1}</span>
            <span className="font-display font-black text-[44px] leading-none">{d2}</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">event</span>
            Session {info.date.getFullYear()}
          </p>
          <h3 className="font-headline-md text-headline-md leading-tight mt-0.5">
            {isSoon ? `C'est bientôt !` : `Le ${EXAM_LABELS[kind]} commence dans`}
            {isSoon ? ` Le ${formatExamDate(info.date).split(" ")[0]} ${EXAM_LABELS[kind]}` : ""}
          </h3>
          <p className="text-label-sm font-label-sm opacity-80 mt-1">
            {isSoon ? "Dernière ligne droite, reste concentré·e !" : formatExamDate(info.date)}
          </p>
        </div>
        <span className="material-symbols-outlined text-[28px] opacity-70 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
          hourglass_top
        </span>
      </div>
    </div>
  );
}