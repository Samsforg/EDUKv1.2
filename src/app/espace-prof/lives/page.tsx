"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

interface ProfBoard {
  live_now: ProfLive | null;
  upcoming: ProfLive[];
  past: ProfLive[];
  stats: { registrations: number; questions: number; sessions: number };
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) + " " +
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const STATUS_BADGE: Record<string, { label: string; cls: string; icon: string }> = {
  live: { label: "En direct", cls: "bg-red-100 text-red-800", icon: "circle" },
  upcoming: { label: "Programmé", cls: "bg-blue-100 text-blue-800", icon: "schedule" },
  ended: { label: "Terminé", cls: "bg-gray-100 text-gray-600", icon: "check_circle" },
};

export default function LivesPage() {
  const router = useRouter();
  const [board, setBoard] = useState<ProfBoard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", subject_name: "Mathématiques", tagline: "", description: "", category: "Sciences", starts_at: "", duration_minutes: "60" });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "teacher") {
          router.replace("/connexion-expert-edukora");
          return;
        }
      })
      .catch(() => router.replace("/connexion-expert-edukora"));

    fetch("/api/prof/lives")
      .then(async (r) => {
        if (!r.ok) throw new Error("fail");
        return r.json();
      })
      .then(setBoard)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  async function createSession(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!form.title.trim() || form.title.trim().length < 3) {
      setFormError("Le titre doit contenir au moins 3 caractères.");
      return;
    }
    if (!form.starts_at) {
      setFormError("Veuillez choisir une date et une heure de début.");
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch("/api/prof/lives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          duration_minutes: Number(form.duration_minutes),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Erreur lors de la création.");
      } else {
        setShowCreate(false);
        setForm({ title: "", subject_name: "Mathématiques", tagline: "", description: "", category: "Sciences", starts_at: "", duration_minutes: "60" });
        const refreshed = await fetch("/api/prof/lives").then((r) => r.json());
        setBoard(refreshed);
      }
    } catch {
      setFormError("Erreur réseau. Réessayez.");
    } finally {
      setFormLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/prof/lives/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const refreshed = await fetch("/api/prof/lives").then((r) => r.json());
    setBoard(refreshed);
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline";

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-primary flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <Link href="/espace-prof" className="text-on-primary hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-md text-headline-md font-bold text-on-primary">Gestion des Lives</h1>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="bg-secondary-container text-on-secondary-container font-bold px-4 py-2 rounded-lg flex items-center gap-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Nouveau Live
        </button>
      </header>

      <main className="px-4 md:px-8 py-6 max-w-4xl mx-auto space-y-8">
        {board?.stats && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
              <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Sessions</p>
              <p className="font-headline-md text-headline-md text-primary mt-1">{board.stats.sessions}</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
              <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Inscrits</p>
              <p className="font-headline-md text-headline-md text-secondary mt-1">{board.stats.registrations}</p>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-center">
              <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Questions</p>
              <p className="font-headline-md text-headline-md text-tertiary mt-1">{board.stats.questions}</p>
            </div>
          </div>
        )}

        {showCreate && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Créer un nouveau live</h2>
            <form onSubmit={createSession} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Titre</label>
                  <input className={inputClass} placeholder="Ex: Révision BAC Maths" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Matière</label>
                  <input className={inputClass} value={form.subject_name} onChange={(e) => setForm({ ...form, subject_name: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Sous-titre</label>
                <input className={inputClass} placeholder="Ex: Prépare ton bac en 1h" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Description</label>
                <textarea className={`${inputClass} min-h-[80px]`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Catégorie</label>
                  <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option>Sciences</option>
                    <option>Littérature</option>
                    <option>Langues</option>
                    <option>SVT</option>
                    <option>Physique</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Début</label>
                  <input className={inputClass} type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Durée (min)</label>
                  <input className={inputClass} type="number" min={15} max={240} value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })} />
                </div>
              </div>
              {formError && <p className="text-sm text-error bg-error-container/40 rounded-lg px-4 py-3">{formError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-3 rounded-lg font-bold border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-all">
                  Annuler
                </button>
                <button type="submit" disabled={formLoading} className="flex-1 py-3 rounded-lg font-bold bg-secondary text-on-secondary hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60">
                  {formLoading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : "Créer le live"}
                </button>
              </div>
            </form>
          </div>
        )}

        {board?.live_now && (
          <section>
            <h2 className="font-title-md text-title-md text-on-surface mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              En direct maintenant
            </h2>
            <div className="bg-surface-container-lowest border-2 border-red-300 rounded-xl p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-on-surface text-lg">{board.live_now.title}</h3>
                <p className="text-on-surface-variant text-sm">{board.live_now.subject_name} · {board.live_now.viewers} spectateurs</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/espace-live/${board.live_now.id}/direct`} className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 active:scale-95">
                  <span className="material-symbols-outlined text-sm">play_arrow</span> Ouvrir
                </Link>
                <button onClick={() => updateStatus(board.live_now!.id, "ended")} className="bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg active:scale-95">
                  Terminer
                </button>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="font-title-md text-title-md text-on-surface mb-3">À venir ({(board?.upcoming ?? []).length})</h2>
          {(board?.upcoming ?? []).length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center text-on-surface-variant text-sm">
              Aucun live programmé. Cliquez sur &quot;Nouveau Live&quot; pour en créer un.
            </p>
          ) : (
            <div className="space-y-3">
              {board!.upcoming.map((s) => (
                <div key={s.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined text-white">live_tv</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs font-bold uppercase tracking-wider text-primary">{s.category}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                        <span className="material-symbols-outlined text-xs">schedule</span> Programmé
                      </span>
                    </div>
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{s.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">
                      {fmtDate(s.starts_at)} · {s.duration_minutes} min · {s.registrations} inscrit{s.registrations > 1 ? "s" : ""} · {s.questions_count} question{s.questions_count > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => updateStatus(s.id, "live")} className="bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-lg text-sm active:scale-95">
                      Lancer
                    </button>
                    <button onClick={() => updateStatus(s.id, "ended")} className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-lg">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-title-md text-title-md text-on-surface mb-3">Terminés ({(board?.past ?? []).length})</h2>
          {(board?.past ?? []).length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center text-on-surface-variant text-sm">Aucun live terminé.</p>
          ) : (
            <div className="space-y-3">
              {board!.past.map((s) => (
                <div key={s.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 opacity-75">
                  <div className="w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-gray-500">check_circle</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs font-bold uppercase tracking-wider text-on-surface-variant">{s.category}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">Terminé</span>
                    </div>
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{s.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">
                      {fmtDate(s.starts_at)} · {s.registrations} inscrit{s.registrations > 1 ? "s" : ""} · {s.questions_count} question{s.questions_count > 1 ? "s" : ""}
                    </p>
                  </div>
                  <Link href={`/replays/${s.id}`} className="text-primary font-bold text-sm hover:underline">
                    Voir le replay
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
