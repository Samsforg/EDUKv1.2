"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface ProfLive {
  id: number;
  title: string;
  subject_name: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  starts_at: string;
  duration_minutes: number;
  viewers: number;
  gradient: string;
  registrations: number;
  questions_count: number;
}

interface Board {
  live_now: ProfLive | null;
  upcoming: ProfLive[];
  past: ProfLive[];
  stats: { registrations: number; questions: number; sessions: number };
}

function parseDate(s: string) {
  const t = s.includes("T") ? s : s.replace(" ", "T");
  return new Date(t.endsWith("Z") ? t : t + "Z");
}

function fmtDate(s: string) {
  const d = parseDate(s);
  const now = new Date();
  const same = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  if (same) return `Aujourd'hui, ${time}`;
  return `${d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}, ${time}`;
}

const GRADIENT: Record<string, string> = {
  "from-primary to-secondary": "bg-gradient-to-r from-primary to-secondary",
  "from-secondary to-primary": "bg-gradient-to-r from-secondary to-primary",
  "from-secondary to-tertiary": "bg-gradient-to-r from-secondary to-tertiary",
  "from-tertiary to-primary": "bg-gradient-to-r from-tertiary to-primary",
  "from-primary to-tertiary": "bg-gradient-to-r from-primary to-tertiary",
  "from-tertiary to-secondary": "bg-gradient-to-r from-tertiary to-secondary",
};

const SUBJECTS = ["Mathématiques", "Français", "Physique-Chimie", "SVT", "Anglais", "Philosophie", "Histoire-Géographie"];
const CATEGORIES = ["Sciences", "Littérature", "Langues", "Physique", "SVT", "Autre"];

export default function ProfBoard() {
  const [board, setBoard] = useState<Board | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject_name: "Mathématiques",
    category: "Sciences",
    starts_at: "",
    duration_minutes: "60",
    description: "",
  });

  const load = () =>
    fetch("/api/prof/lives")
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json()).error ?? "Erreur");
        setBoard(await r.json());
      })
      .catch((e) => setError(e.message ?? "Connecte-toi en tant que professeur"));

  useEffect(() => {
    load();
  }, []);

  const act = async (method: string, url: string, body?: unknown) => {
    setBusy(true);
    try {
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!r.ok) throw new Error(((await r.json().catch(() => null))?.error) ?? "Erreur");
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const create = async () => {
    if (form.title.trim().length < 3 || !form.starts_at) return;
    await act("POST", "/api/prof/lives", { ...form, duration_minutes: Number(form.duration_minutes) });
    setCreating(false);
    setForm({ title: "", subject_name: "Mathématiques", category: "Sciences", starts_at: "", duration_minutes: "60", description: "" });
  };

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">{error}</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  const liveNow = board?.live_now ?? null;
  const upcoming = board?.upcoming ?? [];
  const past = board?.past ?? [];
  const stats = board?.stats ?? { registrations: 0, questions: 0, sessions: 0 };

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-28">
      <PageHeader
        title="Edukora Professeur"
        subtitle="Tableau de bord des sessions live"
        right={
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary text-primary font-bold text-sm">
            K
          </div>
        }
      />

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg space-y-8">
        {liveNow && (
          <section className="relative overflow-hidden rounded-2xl bg-primary text-on-primary p-6 md:p-10 shadow-lg">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                live_tv
              </span>
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-on-secondary animate-pulse" />
                  En direct maintenant
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">{liveNow.title}</h2>
                <div className="flex flex-wrap gap-4 text-primary-fixed">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">group</span>
                    {liveNow.registrations.toLocaleString("fr-FR")} inscrits
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">forum</span>
                    {liveNow.questions_count} questions
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Link
                  href={`/prof/${liveNow.id}/moderation`}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                >
                  <span className="material-symbols-outlined">forum</span>
                  Modérer le chat
                </Link>
                <button
                  onClick={() => act("PATCH", `/api/prof/lives/${liveNow.id}`, { status: "ended" })}
                  disabled={busy}
                  className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">stop_circle</span>
                  Terminer le direct
                </button>
              </div>
            </div>
          </section>
        )}

        {!liveNow && upcoming.length > 0 && (
          <section className="relative overflow-hidden rounded-2xl bg-primary text-on-primary p-6 md:p-10 shadow-lg">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                functions
              </span>
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">timer</span>
                  Prochain direct
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">{upcoming[0].title}</h2>
                <div className="flex flex-wrap gap-4 text-primary-fixed">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">calendar_today</span>
                    {fmtDate(upcoming[0].starts_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">group</span>
                    {upcoming[0].registrations.toLocaleString("fr-FR")} inscrits
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => act("PATCH", `/api/prof/lives/${upcoming[0].id}`, { status: "live" })}
                  disabled={busy}
                  className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_circle
                  </span>
                  Lancer le direct
                </button>
                <Link
                  href={`/prof/${upcoming[0].id}/moderation`}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                >
                  <span className="material-symbols-outlined">forum</span>
                  Modération
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-primary-container/10 rounded-lg text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              </div>
              <span className="text-on-surface-variant font-bold text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">event</span>
                Total
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-on-surface-variant text-sm font-medium">Inscrits (Toutes sessions)</h3>
              <p className="text-3xl font-headline font-bold text-on-surface mt-1">{stats.registrations.toLocaleString("fr-FR")}</p>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-tertiary-container/10 rounded-lg text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
              </div>
              <span className="text-on-surface-variant font-bold text-sm">Total</span>
            </div>
            <div className="mt-4">
              <h3 className="text-on-surface-variant text-sm font-medium">Questions reçues</h3>
              <p className="text-3xl font-headline font-bold text-on-surface mt-1">{stats.questions.toLocaleString("fr-FR")}</p>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-impact-emerald/10 rounded-lg text-impact-emerald">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>live_tv</span>
              </div>
              <span className="text-on-surface-variant font-bold text-sm">Total</span>
            </div>
            <div className="mt-4">
              <h3 className="text-on-surface-variant text-sm font-medium">Sessions programmées</h3>
              <p className="text-3xl font-headline font-bold text-on-surface mt-1">{stats.sessions}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-title-lg text-title-lg text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">pending_actions</span>
              Sessions à venir
            </h2>
            <button
              onClick={() => setCreating(!creating)}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">add</span>
              Programmer un live
            </button>
          </div>

          {creating && (
            <div className="bg-surface border border-outline-variant rounded-xl p-6 mb-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface">Nouvelle session live</h3>
                <button onClick={() => setCreating(false)} className="p-1 text-on-surface-variant hover:bg-surface-container-low rounded-full">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block md:col-span-2">
                  <span className="font-label-sm text-on-surface-variant">Titre de la session *</span>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Ex : Révision BAC — Dérivées et limites"
                    className="mt-1 w-full rounded-lg border border-outline-variant bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-label-sm text-on-surface-variant">Matière</span>
                  <select
                    value={form.subject_name}
                    onChange={(e) => setForm({ ...form, subject_name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-outline-variant bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="font-label-sm text-on-surface-variant">Catégorie</span>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-outline-variant bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="font-label-sm text-on-surface-variant">Date et heure *</span>
                  <input
                    type="datetime-local"
                    value={form.starts_at}
                    onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-outline-variant bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-label-sm text-on-surface-variant">Durée (minutes)</span>
                  <select
                    value={form.duration_minutes}
                    onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-outline-variant bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    {[30, 45, 60, 90, 120].map((d) => (
                      <option key={d} value={d}>
                        {d} min
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className="font-label-sm text-on-surface-variant">Description</span>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    placeholder="Ce que les élèves vont apprendre pendant la session…"
                    className="mt-1 w-full rounded-lg border border-outline-variant bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCreating(false)}
                  className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-bold text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={create}
                  disabled={busy || form.title.trim().length < 3 || !form.starts_at}
                  className="px-5 py-2 rounded-lg bg-primary text-on-primary font-bold text-sm disabled:opacity-50"
                >
                  Programmer
                </button>
              </div>
            </div>
          )}

          {upcoming.length > 0 ? (
            <div className="space-y-3">
              {upcoming.map((s) => (
                <div key={s.id} className="bg-surface border border-outline-variant p-4 rounded-xl flex items-center justify-between gap-3 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-12 h-12 rounded-lg ${GRADIENT[s.gradient] ?? "bg-gradient-to-r from-primary to-secondary"} flex items-center justify-center text-white shrink-0`}>
                      <span className="material-symbols-outlined">live_tv</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-on-surface truncate">{s.title}</h4>
                      <p className="text-xs text-on-surface-variant">
                        {s.subject_name} · {fmtDate(s.starts_at)} · {s.duration_minutes} min
                      </p>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[12px]">group</span>
                        {s.registrations} inscrits · {s.questions_count} questions
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => act("PATCH", `/api/prof/lives/${s.id}`, { status: "live" })}
                      disabled={busy}
                      className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 active:scale-95 transition-all disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-lg">play_circle</span>
                      Lancer
                    </button>
                    <Link
                      href={`/prof/${s.id}/moderation`}
                      className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:text-primary transition-colors"
                      title="Modération"
                    >
                      <span className="material-symbols-outlined">forum</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-outline-variant p-8 rounded-xl flex flex-col items-center justify-center text-on-surface-variant/60 text-center">
              <span className="material-symbols-outlined text-4xl mb-2">live_tv</span>
              <p className="text-sm">Aucune session programmée. Programme ton premier live !</p>
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="font-title-lg text-title-lg text-on-surface flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-outline">history</span>
              Sessions terminées
            </h2>
            <div className="space-y-3">
              {past.map((s) => (
                <div key={s.id} className="bg-surface border border-outline-variant p-4 rounded-xl flex items-center justify-between gap-3 opacity-80">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">replay</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-on-surface truncate">{s.title}</h4>
                      <p className="text-xs text-on-surface-variant">
                        {fmtDate(s.starts_at)} · {s.registrations} inscrits · {s.questions_count} questions
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider shrink-0">Replay</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2">
        <div className="flex flex-col items-center justify-center text-primary font-bold p-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="font-label-xs">Bord</span>
        </div>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/espace-live">
          <span className="material-symbols-outlined">live_tv</span>
          <span className="font-label-xs">Live</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/accueil-edukora">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-xs">Accueil</span>
        </Link>
      </nav>
    </div>
  );
}
