"use client";

interface Badge {
  code: string;
  name: string;
  icon: string;
  description: string;
  earned_at: string;
}

interface BadgesClientProps {
  badges: Badge[];
}

export default function BadgesClient({ badges }: BadgesClientProps) {
  return (
    <section className="pb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-headline-md text-headline-md text-on-surface">Tes Badges</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {badges.map((b) => (
          <div key={b.code} className="shrink-0 w-24 bg-surface-container-high border border-outline-variant rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
            <span className="material-symbols-outlined text-3xl" style={{ color: b.earned_at ? "#FFD700" : "currentColor", opacity: b.earned_at ? 1 : 0.4 }}>
              {b.icon}
            </span>
            <p className="text-[10px] font-semibold text-on-surface truncate" style={{ opacity: b.earned_at ? 1 : 0.6 }}>
              {b.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}