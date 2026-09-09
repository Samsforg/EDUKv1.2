"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface OnboardingData {
  goal: string | null;
  seen_onboarding: boolean;
  first_name: string;
  class_level: string | null;
}

const GOALS = [
  { id: "bac", icon: "school", title: "Préparer mon BAC", desc: "Baccalauréat, année 2027" },
  { id: "bepc", icon: "menu_book", title: "Préparer mon BEPC", desc: "Brevet, année 2027" },
  { id: "notes", icon: "trending_up", title: "Améliorer mes notes", desc: "Progresser chaque jour" },
  { id: "programme", icon: "calendar_month", title: "Suivre le programme", desc: "Au rythme des cours" },
] as const;

const HOURS = ["07:00", "12:30", "18:30", "20:00"] as const;

const SHORTCUTS = [
  { href: "/fiches", icon: "auto_stories", title: "Fiches de révision", desc: "Cours clairs et résumés" },
  { href: "/quiz", icon: "quiz", title: "Quiz", desc: "Teste-toi par chapitre" },
  { href: "/simulateur", icon: "timer", title: "Simulateur d'examen", desc: "Conditions réelles du BAC / BEPC" },
  { href: "/tuteur-ia", icon: "smart_toy", title: "Kora, ton tuteur IA", desc: "Pose tes questions à Kora" },
] as const;

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [hour, setHour] = useState<string>("18:30");
  const [remindersOn, setRemindersOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [savingReminders, setSavingReminders] = useState(false);

  useEffect(() => {
    const isEdit = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("edit") === "1";
    fetch("/api/onboarding")
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok && !d.first_name) throw new Error("no data");
        if (d.seen_onboarding && !isEdit) {
          router.replace("/accueil-edukora");
          return;
        }
        setData(d);
        if (d.goal) setGoal(d.goal);
      })
      .catch(() => router.replace("/accueil-edukora"));
  }, [router]);

  const selectGoal = (id: string) => {
    setGoal(id);
    fetch("/api/onboarding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal: id }),
    }).catch(() => {});
  };

  const saveReminders = async () => {
    if (!remindersOn) return;
    setSavingReminders(true);
    try {
      await fetch("/api/reminders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: true, frequency: "daily", hour, subject_ids: [] }),
      });
    } catch {
      // silencieux : les rappels sont optionnels
    } finally {
      setSavingReminders(false);
    }
  };

  const finish = async () => {
    setLoading(true);
    await Promise.all([
      saveReminders(),
      fetch("/api/onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seen_onboarding: true }),
      }),
    ]);
    router.push("/accueil-edukora");
  };

  if (!data) {
    return (
      <div className="min-h-dvh bg-surface text-on-surface flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
      </div>
    );
  }

  const first = data.first_name?.split(" ")[0] ?? "";

  return (
    <div className="min-h-dvh bg-surface text-on-surface flex flex-col items-center justify-center p-4 relative">
      <main className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-6 sm:p-8 flex flex-col">
        <header className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 mb-4 rounded-2xl flex items-center justify-center p-1">
            <Image  src="/images/logo-edukora.webp" alt="Edukora" className="w-full h-full object-contain" loading="lazy" width={56} height={56} />
          </div>
          <div className="flex items-center gap-2 mb-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/50" : "w-4 bg-surface-variant"}`}
              />
            ))}
          </div>
        </header>

        {step === 0 && (
          <section className="flex flex-col gap-5">
            <div className="text-center">
              <h1 className="font-headline-md text-2xl font-bold text-primary mb-1 tracking-tight">
                Bienvenue{first ? `, ${first}` : ""} 👋
              </h1>
              <p className="text-on-surface-variant text-sm">
                {data.class_level ? `Classe de ${data.class_level} · ` : ""}Choisis ton objectif pour un accompagnement sur mesure.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => selectGoal(g.id)}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-150 ${goal === g.id ? "border-primary bg-primary/10" : "border-outline-variant bg-surface-container-lowest hover:border-primary/40"}`}
                >
                  <span className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${goal === g.id ? "bg-primary text-on-primary" : "bg-secondary-container/20 text-primary"}`}>
                    <span className="material-symbols-outlined">{g.icon}</span>
                  </span>
                  <span className="flex flex-col">
                    <span className={`font-semibold text-sm ${goal === g.id ? "text-primary" : "text-on-surface"}`}>{g.title}</span>
                    <span className="text-xs text-on-surface-variant">{g.desc}</span>
                  </span>
                  {goal === g.id && <span className="material-symbols-outlined ml-auto text-primary">check_circle</span>}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!goal || loading}
              onClick={() => setStep(1)}
              className="w-full rounded-xl bg-primary text-on-primary py-3.5 font-semibold text-base transition-all duration-150 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none"
            >
              Continuer
            </button>
          </section>
        )}

        {step === 1 && (
          <section className="flex flex-col gap-5">
            <div className="text-center">
              <h1 className="font-headline-md text-2xl font-bold text-primary mb-1 tracking-tight">Quand veux-tu réviser ?</h1>
              <p className="text-on-surface-variant text-sm">Choisis un créneau : Edukora t&apos;enverra un rappel chaque jour.</p>
            </div>
            <label className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                <span className="text-sm font-semibold">Activer les rappels de révision</span>
              </span>
              <input
                type="checkbox"
                checked={remindersOn}
                onChange={(e) => setRemindersOn(e.target.checked)}
                className="accent-primary w-5 h-5"
              />
            </label>
            {remindersOn && (
              <div className="grid grid-cols-2 gap-3">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHour(h)}
                    className={`rounded-xl border-2 px-4 py-3 font-semibold text-sm transition-all duration-150 ${hour === h ? "border-primary bg-primary/10 text-primary" : "border-outline-variant text-on-surface hover:border-primary/40"}`}
                  >
                    {h.replace(":", "h")}
                  </button>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => setStep(2)}
                className="w-full rounded-xl bg-primary text-on-primary py-3.5 font-semibold text-base transition-all duration-150 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none"
              >
                {remindersOn ? `Je réviserai chaque jour à ${hour.replace(":", "h")}` : "Continuer"}
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full rounded-xl py-3 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
              >
                Plus tard
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="flex flex-col gap-5">
            <div className="text-center">
              <h1 className="font-headline-md text-2xl font-bold text-primary mb-1 tracking-tight">Tout est prêt ! 🚀</h1>
              <p className="text-on-surface-variant text-sm">Commence par explorer tes outils de réussite.</p>
            </div>
            <div className="flex flex-col gap-3">
              {SHORTCUTS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 transition-all duration-150 hover:border-primary/40 hover:bg-surface-container-low"
                >
                  <span className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-secondary-container/20 text-primary">
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-sm">{s.title}</span>
                    <span className="text-xs text-on-surface-variant">{s.desc}</span>
                  </span>
                  <span className="material-symbols-outlined ml-auto text-on-surface-variant">chevron_right</span>
                </Link>
              ))}
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={finish}
              className="w-full rounded-xl bg-primary text-on-primary py-3.5 font-semibold text-base transition-all duration-150 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? "C&apos;est parti…" : "C&apos;est parti !"}
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
