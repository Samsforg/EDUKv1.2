"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import PageHeader from "@/components/PageHeader";
import { PairingCodeCard } from "@/components/PairingCodeCard";
import { DisputeButton } from "@/components/DisputeButton";

interface ProfileData {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    serie: { code: string; name: string } | null;
    serie_id: number | null;
    class_level: string | null;
    xp: number;
    streak: number;
  };
  stats: {
    global_score: number | null;
    quizzes_done: number;
    exams_done: number;
    best_exam: number | null;
    badges_earned: number;
  };
  badges: { code: string; name: string; icon: string; description: string; earned_at: string | null }[];
  quiz_history: { id: number; title: string; score: number; max_score: number; completed_at: string }[];
  exam_history: { id: number; title: string; score_over_20: number; duration_seconds: number; completed_at: string }[];
}

const NEXT_XP = 500;

const SERIES = [
  { id: 1, code: "C", name: "Sciences" },
  { id: 2, code: "D", name: "Sciences Exp." },
  { id: 3, code: "A", name: "Littéraire" },
  { id: 4, code: "B", name: "Économique" },
];

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", serie_id: "", class_level: "" as string });
  const [pw, setPw] = useState({ current_password: "", new_password: "", confirm: "" });

  useEffect(() => {
    fetch("/api/me/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setData(d);
          setForm({
            first_name: d.user.first_name,
            last_name: d.user.last_name,
            email: d.user.email,
            phone: d.user.phone ?? "",
            serie_id: d.user.serie_id ? String(d.user.serie_id) : "",
            class_level: d.user.class_level ?? "",
          });
        }
      });
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de la mise à jour.");
      } else {
        setSuccess("Profil mis à jour avec succès.");
        setEditing(false);
        if (json.user) {
          setData((prev) =>
            prev
              ? {
                  ...prev,
                  user: {
                    ...prev.user,
                    first_name: json.user.first_name,
                    last_name: json.user.last_name,
                    email: json.user.email,
                    phone: json.user.phone,
                    serie_id: json.user.serie_id,
                    class_level: json.user.class_level,
                  },
                }
              : prev,
          );
        }
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    if (pw.new_password !== pw.confirm) {
      setError("La confirmation du nouveau mot de passe ne correspond pas.");
      setSaving(false);
      return;
    }
    if (pw.new_password.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: pw.current_password,
          new_password: pw.new_password,
        }),
      });
      const json = await res.json();
      if (!res.ok) setError(json.error ?? "Erreur lors du changement de mot de passe.");
      else {
        setSuccess("Mot de passe mis à jour.");
        setPw({ current_password: "", new_password: "", confirm: "" });
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  const { user, stats, badges, quiz_history, exam_history } = data;
  const earned = badges.filter((b) => b.earned_at !== null);
  const locked = badges.filter((b) => b.earned_at === null);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader
        title="Mon profil"
        backHref="/accueil-edukora"
        right={
          <>
            <ThemeToggle />
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                location.href = "/connexion-edukora";
              }}
              aria-label="Se déconnecter"
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </>
        }
      />

      <main className="px-margin-mobile pt-6 pb-10 space-y-6">
        <section className="bg-surface border border-outline-variant rounded-xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md shrink-0">
            {user.first_name[0]}{user.last_name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-title-md text-title-md text-on-surface truncate">{user.first_name} {user.last_name}</h2>
            <p className="font-label-sm text-on-surface-variant truncate">{user.email}</p>
            {user.serie ? (
              <span className="inline-flex items-center gap-1 mt-1.5 bg-secondary-container/15 text-secondary px-2.5 py-0.5 rounded-full font-label-xs">
                <span className="material-symbols-outlined text-[13px]">school</span>
                {user.serie.code} — {user.serie.name}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 mt-1.5 bg-surface-container-high text-on-surface-variant px-2.5 py-0.5 rounded-full font-label-xs">
                <span className="material-symbols-outlined text-[13px]">help</span>
                Série non renseignée
              </span>
            )}
          </div>
        </section>

        <section className="bg-surface border border-outline-variant rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline-md text-headline-md text-on-surface">Informations personnelles</h2>
            {!editing && (
              <button
                onClick={() => { setEditing(true); setError(null); setSuccess(null); }}
                className="text-primary hover:bg-primary-container/10 rounded-xl px-3 py-1.5 text-sm font-semibold flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Modifier
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={saveProfile} className="flex flex-col gap-4">
              {error && (
                <div className="bg-error-container/20 text-error p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="bg-tertiary-container/20 text-tertiary p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>{success}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-on-surface">Prénom</label>
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-on-surface">Nom</label>
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-sm font-medium text-on-surface">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-sm font-medium text-on-surface">Téléphone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Optionnel"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-on-surface">Série</label>
                  <select
                    value={form.serie_id}
                    onChange={(e) => setForm({ ...form, serie_id: e.target.value })}
                    className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm"
                  >
                    <option value="">Non renseignée</option>
                    {SERIES.map((s) => (
                      <option key={s.id} value={s.id}>{s.code} — {s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-on-surface">Niveau</label>
                  <input
                    type="text"
                    value={form.class_level}
                    onChange={(e) => setForm({ ...form, class_level: e.target.value })}
                    className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="ex: Terminale C"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary text-on-primary py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-surface-container-low text-on-surface-variant py-2.5 rounded-lg font-semibold"
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="text-on-surface-variant">Prénom : <span className="text-on-surface font-medium">{user.first_name}</span></p>
              <p className="text-on-surface-variant">Nom : <span className="text-on-surface font-medium">{user.last_name}</span></p>
              <p className="text-on-surface-variant">Email : <span className="text-on-surface font-medium">{user.email}</span></p>
              <p className="text-on-surface-variant">Téléphone : <span className="text-on-surface font-medium">{user.phone ?? "—"}</span></p>
              <p className="text-on-surface-variant">Série : <span className="text-on-surface font-medium">{user.serie ? `${user.serie.code} — ${user.serie.name}` : "—"}</span></p>
              <p className="text-on-surface-variant">Niveau : <span className="text-on-surface font-medium">{user.class_level ?? "—"}</span></p>
            </div>
          )}
        </section>

        <section className="bg-surface border border-outline-variant rounded-xl p-5">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Changer le mot de passe</h2>
          <form onSubmit={savePassword} className="flex flex-col gap-4">
            {error && (
              <div className="bg-error-container/20 text-error p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-tertiary-container/20 text-tertiary p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>{success}</span>
              </div>
            )}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Mot de passe actuel</label>
              <input
                type="password"
                value={pw.current_password}
                onChange={(e) => setPw({ ...pw, current_password: e.target.value })}
                required
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Nouveau mot de passe</label>
              <input
                type="password"
                value={pw.new_password}
                onChange={(e) => setPw({ ...pw, new_password: e.target.value })}
                required
                minLength={6}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-on-surface">Confirmer</label>
              <input
                type="password"
                value={pw.confirm}
                onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                required
                minLength={6}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">lock</span>}
              Changer le mot de passe
            </button>
          </form>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Score global</p>
            <p className="font-headline-md text-headline-md text-primary mt-1">{stats.global_score != null ? `${stats.global_score}%` : "—"}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Série d'activité</p>
            <p className="font-headline-md text-headline-md text-secondary mt-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[22px]">local_fire_department</span>{user.streak} j
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Quiz terminés</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-1">{stats.quizzes_done}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Meilleur examen</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-1">{stats.best_exam != null ? `${stats.best_exam}/20` : "—"}</p>
          </div>
        </section>

        <Link
          href="/reglages-rappels"
          className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-100"
        >
          <div className="w-11 h-11 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
          </div>
          <div className="flex-1">
            <p className="font-label-md font-semibold text-on-surface">Rappels de révision</p>
            <p className="font-label-xs text-on-surface-variant">Reste régulier avec des notifications</p>
          </div>
          <span className="material-symbols-outlined text-tertiary">chevron_right</span>
        </Link>

        <PairingCodeCard />

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <div className="flex justify-between items-center mb-2">
            <p className="font-label-md font-semibold text-on-surface">XP total</p>
            <p className="font-label-md text-primary font-semibold">{user.xp} / {NEXT_XP} XP</p>
          </div>
          <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full transition-all duration-500" style={{ width: `${Math.min(100, (user.xp / NEXT_XP) * 100)}%` }}></div>
          </div>
          <p className="font-label-xs text-on-surface-variant mt-2">{Math.max(0, NEXT_XP - user.xp)} XP avant le badge « Expert »</p>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">Mes badges</h2>
            <span className="font-label-sm text-primary">{earned.length} / {badges.length}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b) => {
              const isEarned = b.earned_at !== null;
              return (
                <div key={b.code} className={`rounded-xl border p-3 flex flex-col items-center gap-1.5 text-center ${isEarned ? "bg-surface border-outline-variant" : "bg-surface-container-high border-outline-variant opacity-60"}`}>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${isEarned ? "bg-primary/15 text-primary" : "bg-outline-variant/30 text-on-surface-variant"}`}>
                    <span className="material-symbols-outlined">{isEarned ? b.icon : "lock"}</span>
                  </div>
                  <p className="font-label-xs font-semibold text-on-surface leading-tight">{b.name}</p>
                  <p className="font-label-xs text-on-surface-variant leading-tight">{b.description}</p>
                </div>
              );
            })}
          </div>
          <Link href="/badges" className="mt-3 w-full bg-primary/10 text-primary rounded-xl p-3 flex items-center justify-center gap-2 font-label-md font-semibold active:scale-[0.98] transition-transform duration-150">
            <span className="material-symbols-outlined">military_tech</span>
            Voir ma progression détaillée
          </Link>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-3">Historique des quiz</h2>
          {quiz_history.length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">Aucun quiz terminé pour l&apos;instant.</p>
          ) : (
            <div className="space-y-2.5">
              {quiz_history.map((q) => {
                const pct = q.max_score > 0 ? Math.round((q.score * 100) / q.max_score) : 0;
                return (
                  <Link key={`quiz-${q.id}-${q.completed_at}`} href={`/quiz/${q.id}`} className="block bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-150">
                    <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-label-md font-semibold text-on-surface truncate">{q.title}</h3>
                      <p className="font-label-xs text-on-surface-variant">{q.score} / {q.max_score} · {q.completed_at.slice(0, 16).replace("T", " à ")}</p>
                    </div>
                    <span className={`font-title-md text-title-md shrink-0 ${pct >= 70 ? "text-primary" : pct >= 40 ? "text-secondary" : "text-error"}`}>{pct}%</span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-3">Historique des examens</h2>
          {exam_history.length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">Aucun examen simulé pour l&apos;instant.</p>
          ) : (
            <div className="space-y-2.5">
              {exam_history.map((e) => (
                <Link key={`exam-${e.id}-${e.completed_at}`} href={`/simulateur/${e.id}`} className="block bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform duration-150">
                  <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{e.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">{Math.floor(e.duration_seconds / 60)} min passées · {e.completed_at.slice(0, 16).replace("T", " à ")}</p>
                  </div>
                  <span className={`font-title-md text-title-md shrink-0 ${e.score_over_20 >= 10 ? "text-primary" : "text-error"}`}>{e.score_over_20}/20</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <DisputeButton />
        </section>
      </main>
    </div>
  );
}
