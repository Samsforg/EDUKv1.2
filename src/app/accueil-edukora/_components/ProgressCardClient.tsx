"use client";

import { useEffect, useState } from "react";

interface ProgressCardClientProps {
  progress: {
    global_score: number | null;
    xp: number;
    streak: number;
  } | null;
  streakInfo: {
    current: number;
    isTodayDone: boolean;
    nextMilestone: number | null;
    bonusXp: number;
  } | null;
  exam: "BAC" | "BEPC" | null;
}

export default function ProgressCardClient({ progress, streakInfo, exam }: ProgressCardClientProps) {
  const [ringAnimated, setRingAnimated] = useState(false);

  useEffect(() => {
    if (progress?.global_score != null) {
      requestAnimationFrame(() => setRingAnimated(true));
    } else {
      setRingAnimated(false);
    }
  }, [progress?.global_score]);

  return (
    <div className="col-span-2 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
      <div className="space-y-1">
        <p className="text-label-sm font-label-sm text-on-surface">
          Score Global {exam ?? "Edukora"}
        </p>
        <p className="text-display-lg-mobile font-display-lg-mobile text-primary">
          {progress?.global_score != null ? `${progress.global_score}%` : "—"}
        </p>
        <div className="flex gap-2">
          <p className="text-label-xs font-label-xs text-on-surface bg-secondary-container/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
            {streakInfo?.current ?? progress?.streak ?? 0} jour{(streakInfo?.current ?? progress?.streak ?? 0) > 1 ? "s" : ""} {streakInfo?.isTodayDone ? "✓" : ""}
          </p>
          <p className="text-label-xs font-label-xs text-on-surface bg-tertiary-container/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">bolt</span> {progress?.xp ?? 0} XP
          </p>
        </div>
        {streakInfo?.nextMilestone && (
          <p className="text-label-xs text-on-surface mt-1">Prochain palier {streakInfo.nextMilestone}j → +{streakInfo.bonusXp} XP</p>
        )}
      </div>
      <div className="relative w-20 h-20">
        <svg className="w-full h-full">
          <circle className="text-outline-variant" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="6" />
          <circle
            className="text-primary progress-ring"
            cx="40"
            cy="40"
            fill="transparent"
            r="32"
            stroke="currentColor"
            strokeDasharray="201.06"
            strokeDashoffset={progress?.global_score != null && ringAnimated ? 201.06 - (201.06 * progress.global_score) / 100 : 201.06}
            strokeLinecap="round"
            strokeWidth="6"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            military_tech
          </span>
        </div>
      </div>
    </div>
  );
}