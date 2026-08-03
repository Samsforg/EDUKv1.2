"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
  selected: boolean;
}

interface Settings {
  enabled: boolean;
  frequency: string;
  hour: string;
  subject_ids: number[];
}

export default function ReminderSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/reminders")
      .then((r) => r.json())
      .then((d) => {
        setSettings(d.settings);
        setSubjects(d.subjects ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/reminders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enabled: settings.enabled,
        frequency: settings.frequency,
        hour: settings.hour,
        subject_ids: subjects.filter((s) => s.selected).map((s) => s.id),
      }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  }

  function toggleSubject(id: number) {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s)));
  }

  const enabledSubject = subjects.find((s) => s.selected) ?? subjects[0];

  if (loading || !settings) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/profil" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-title-md text-title-md text-on-surface">Rappels de révision</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">Reste régulier jusqu&apos;au BAC / BEPC</p>
        </div>
      </header>

      <main className="px-margin-mobile pt-5 space-y-4">
        <section className="bg-surface border border-outline-variant rounded-xl p-4 flex justify-between items-center">
          <div>
            <h3 className="font-label-md font-semibold text-on-surface">Activer les rappels</h3>
            <p className="font-label-xs text-on-surface-variant mt-0.5">Recevoir une notification quand il est temps de réviser</p>
          </div>
          <button
            role="switch"
            aria-checked={settings.enabled}
            onClick={() => setSettings((s) => (s ? { ...s, enabled: !s.enabled } : s))}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${settings.enabled ? "bg-primary" : "bg-outline-variant"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.enabled ? "translate-x-5" : ""}`}></div>
          </button>
        </section>

        {settings.enabled && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-outline-variant rounded-xl p-4">
                <h3 className="font-label-md font-semibold text-on-surface mb-4">Fréquence &amp; heure</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-label-xs text-on-surface-variant mb-2">Fréquence</label>
                    <div className="flex gap-2">
                      {[
                        { key: "daily", label: "Quotidien" },
                        { key: "weekly", label: "Hebdo" },
                        { key: "custom", label: "Perso" },
                      ].map((f) => (
                        <button
                          key={f.key}
                          onClick={() => setSettings((s) => (s ? { ...s, frequency: f.key } : s))}
                          className={`flex-1 py-2.5 px-3 rounded-lg border font-label-xs transition-colors ${
                            settings.frequency === f.key
                              ? "border-primary bg-primary-container text-primary font-semibold"
                              : "border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-xs text-on-surface-variant mb-2">Heure du rappel</label>
                    <input
                      type="time"
                      value={settings.hour}
                      onChange={(e) => setSettings((s) => (s ? { ...s, hour: e.target.value } : s))}
                      className="w-full p-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-outline-variant rounded-xl p-4">
                <h3 className="font-label-md font-semibold text-on-surface mb-4">Sujets à privilégier</h3>
                <div className="space-y-2.5">
                  {subjects.map((s) => (
                    <label key={s.id} className="flex items-center p-3 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
                      <input
                        type="checkbox"
                        checked={s.selected}
                        onChange={() => toggleSubject(s.id)}
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <div className="ml-3 flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ color: s.color }}>{s.icon}</span>
                        <span className="font-body-md text-on-surface">{s.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-3">Aperçu de la notification</h3>
              <div className="bg-surface-container border border-outline-variant rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-xs font-bold text-primary">EDUKORA</span>
                      <span className="font-label-xs text-on-surface-variant">{settings.hour}</span>
                    </div>
                    <p className="font-body-sm font-semibold text-on-surface leading-tight">C&apos;est l&apos;heure de ta session {enabledSubject ? `de ${enabledSubject.name}` : "de révision"} !</p>
                    <p className="font-label-xs text-on-surface-variant mt-1">Relis une fiche et fais un quiz pour valider tes acquis du jour.</p>
                  </div>
                </div>
                <div className="mt-3 h-1 bg-outline-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
              </div>
            </section>
          </>
        )}

        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md font-semibold shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {saving ? (
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
          ) : saved ? (
            <>
              <span className="material-symbols-outlined">check_circle</span> Réglages enregistrés !
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span> Sauvegarder les réglages
            </>
          )}
        </button>
        {settings.enabled && !saved && (
          <p className="text-center font-label-xs text-on-surface-variant pb-4">Vous recevrez votre prochain rappel à {settings.hour}.</p>
        )}
      </main>
    </div>
  );
}
