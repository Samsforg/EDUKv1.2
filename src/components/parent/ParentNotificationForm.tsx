"use client";

import { useState } from "react";

type SettingKey = "academic_alerts" | "score_drop" | "results_alert" | "weekly_report" | "encouragement";

const SETTINGS: { key: SettingKey; title: string; desc: string; section: "academic" | "communication" }[] = [
  { key: "academic_alerts", title: "Alertes académiques", desc: "Résultats d'examens blancs", section: "academic" },
  { key: "score_drop", title: "Baisse de score détectée", desc: "Alertes quand une note chute", section: "academic" },
  { key: "results_alert", title: "Nouveaux résultats", desc: "Quiz et examens terminés", section: "academic" },
  { key: "weekly_report", title: "Rapport hebdomadaire", desc: "Synthèse des progrès chaque lundi", section: "communication" },
  { key: "encouragement", title: "Messages d'encouragement", desc: "Partage d'encouragements vers votre enfant", section: "communication" },
];

export function ParentNotificationForm({ initial }: { initial: Record<SettingKey, boolean> }) {
  const [settings, setSettings] = useState(initial);
  const [saved, setSaved] = useState(false);

  async function toggle(key: SettingKey) {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    const res = await fetch("/api/parent/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: next[key] }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  function renderGroup(section: "academic" | "communication", title: string, icon: string) {
    const items = SETTINGS.filter((s) => s.section === section);
    return (
      <div>
        <h2 className="px-2 text-label-xs font-semibold uppercase tracking-wider text-outline mb-2">{title}</h2>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant/50 shadow-sm">
          {items.map((s) => (
            <div key={s.key} className="flex items-center justify-between p-4 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="material-symbols-outlined text-primary shrink-0">{icon}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-on-surface text-sm">{s.title}</p>
                  <p className="text-xs text-on-surface-variant truncate">{s.desc}</p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={settings[s.key]}
                onClick={() => toggle(s.key)}
                className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${
                  settings[s.key] ? "bg-primary" : "bg-surface-container-highest border border-outline-variant"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                    settings[s.key] ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderGroup("academic", "Alertes Académiques", "notifications_active")}
      {renderGroup("communication", "Communication", "forum")}

      <div className="flex items-center justify-center gap-2 text-xs font-medium text-tertiary" aria-live="polite">
        {saved && (
          <>
            <span className="material-symbols-outlined text-base">check_circle</span>
            Réglages enregistrés
          </>
        )}
      </div>
    </div>
  );
}
