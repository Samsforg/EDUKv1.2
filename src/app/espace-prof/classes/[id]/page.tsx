"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { fetchFresh } from "@/lib/client-fetch";
import PageHeader from "@/components/PageHeader";
import ConfirmDialog, { type ConfirmState } from "@/components/ConfirmDialog";

interface ClsInfo {
  id: number;
  name: string;
  invite_code: string;
  year: string | null;
  subject_name: string | null;
  icon: string | null;
  color: string | null;
  grade_name: string | null;
}

interface Student {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  class_level: string | null;
  joined_at: string;
  attempts: number;
  avg_pct: number | null;
  best_pct: number | null;
}

interface ClassStats {
  member_count: number;
  global: { attempts: number; avg_pct: number | null; best_pct: number | null; students: number };
  by_subject: { subject_name: string; icon: string; color: string; attempts: number; avg_pct: number | null }[];
  by_quiz: { quiz_id: number; title: string; subject_name: string; icon: string; color: string; attempts: number; avg_pct: number | null; best_pct: number | null; students: number }[];
}

export default function TeacherClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [cls, setCls] = useState<ClsInfo | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<ClassStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [busyAdd, setBusyAdd] = useState(false);
  const [addMsg, setAddMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const [copied, setCopied] = useState(false);

  async function load() {
    try {
      const [detail, st] = await Promise.all([
        fetchFresh(`/api/prof/classes/${id}`).then(async (r) => {
          if (!r.ok) throw new Error((await r.json().catch(() => ({})))?.error ?? "Erreur");
          return r.json();
        }),
        fetchFresh(`/api/prof/classes/${id}/stats`).then(async (r) => {
          if (!r.ok) return null;
          return r.json();
        }),
      ]);
      setCls(detail.cls);
      setStudents(detail.students ?? []);
      setStats(st);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function addStudent(e: React.FormEvent) {
    e.preventDefault();
    setBusyAdd(true);
    setAddMsg(null);
    try {
      const res = await fetch(`/api/prof/classes/${id}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setAddMsg({ ok: res.ok, text: data.error ?? "Élève ajouté" });
      if (res.ok) {
        setEmail("");
        await load();
      }
    } catch {
      setAddMsg({ ok: false, text: "Erreur réseau" });
    } finally {
      setBusyAdd(false);
    }
  }

  async function removeStudent(userId: number, name: string) {
    setConfirm({
      title: "Retirer cet élève ?",
      message: `${name} sera retiré de la classe « ${cls?.name} ».`,
      onConfirm: async () => {
         await fetchFresh(`/api/prof/classes/${id}/students`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
        await load();
      },
    });
  }

  async function copy() {
    if (!cls) return;
    try {
      await navigator.clipboard.writeText(cls.invite_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.alert(`Code : ${cls.invite_code}`);
    }
  }

  async function exportStats(format: "csv" | "pdf") {
    try {
      const res = await fetchFresh(`/api/prof/classes/${id}/stats/export?format=${format}`, { });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        window.alert(data.error ?? "Échec de l'export");
        return;
      }
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="?([^";]+)"?/);
      const filename = match?.[1] ?? `classe-${id}.${format}`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.alert("Erreur réseau");
    }
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-dvh font-['Hanken_Grotesk']">
        <PageHeader title="Classe" backHref="/espace-prof/classes" />
        <main className="px-margin-mobile pt-6 text-center py-16 space-y-4">
          <p className="font-body-md text-on-surface-variant">{error}</p>
          <Link href="/espace-prof/classes" className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full">
            Retour aux classes
          </Link>
        </main>
      </div>
    );
  }

  const hasStats = (stats?.global.attempts ?? 0) > 0;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title={cls?.name ?? "Classe"} subtitle="Gestion des élèves et statistiques" backHref="/espace-prof/classes" />

      <main className="px-margin-mobile md:px-margin-desktop pt-6 space-y-6 max-w-4xl mx-auto">
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-body-sm text-on-surface-variant">
              {[cls?.subject_name, cls?.grade_name, cls?.year].filter(Boolean).join(" · ") || "Classe"}
            </p>
            <p className="font-label-sm text-on-surface-variant mt-2">Partage ce code à tes élèves pour qu&apos;ils rejoignent la classe depuis leur application :</p>
          </div>
          <button
            onClick={copy}
            className="bg-secondary-container text-on-secondary-container rounded-xl px-5 py-3 flex items-center gap-2 font-headline-md font-bold tracking-widest hover:brightness-105 active:scale-[0.98] transition-transform"
          >
            <span className="material-symbols-outlined">{copied ? "check" : "content_copy"}</span>
            {cls?.invite_code}
          </button>
          <Link
            href={`/espace-prof/classes/${id}/devoirs`}
            className="bg-primary text-on-primary rounded-xl px-5 py-3 flex items-center gap-2 font-label-md font-bold hover:brightness-105 active:scale-[0.98] transition-transform"
          >
            <span className="material-symbols-outlined">assignment</span>
            Devoirs
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportStats("csv")}
              className="bg-secondary-container text-on-secondary-container rounded-xl px-4 py-3 flex items-center gap-2 font-label-md font-bold hover:brightness-105 active:scale-[0.98] transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">file_download</span>
              CSV
            </button>
            <button
              onClick={() => exportStats("pdf")}
              className="bg-surface-container-high text-on-surface rounded-xl px-4 py-3 flex items-center gap-2 font-label-md font-bold hover:brightness-105 active:scale-[0.98] transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              PDF
            </button>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Élèves</p>
            <p className="font-headline-md text-headline-md text-primary mt-1">{students.length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Quiz tentés</p>
            <p className="font-headline-md text-headline-md text-secondary mt-1">{stats?.global.attempts ?? 0}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Moyenne</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-1">
              {hasStats ? `${stats?.global.avg_pct ?? "—"}%` : "—"}
            </p>
          </div>
        </section>

        {hasStats && (
          <>
            <section>
              <h3 className="font-title-md text-title-md text-on-surface font-bold mb-3">Par matière</h3>
              <div className="space-y-2">
                {stats?.by_subject.map((s) => (
                  <div key={s.subject_name} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "22", color: s.color }}>
                      <span className="material-symbols-outlined">{s.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-label-md font-semibold text-on-surface truncate">{s.subject_name}</p>
                        <p className="font-label-md font-bold text-primary">{s.avg_pct != null ? `${s.avg_pct}%` : "—"}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 rounded-full bg-outline-variant overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${s.avg_pct ?? 0}%` }}></div>
                        </div>
                        <span className="font-label-xs text-on-surface-variant shrink-0">{s.attempts} tentat{s.attempts > 1 ? "ives" : "ive"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-title-md text-title-md text-on-surface font-bold mb-3">Quiz réalisés par la classe</h3>
              <div className="space-y-2">
                {stats?.by_quiz.map((q) => (
                  <div key={q.quiz_id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: q.color + "22", color: q.color }}>
                      <span className="material-symbols-outlined">{q.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md font-semibold text-on-surface truncate">{q.title}</p>
                      <p className="font-label-xs text-on-surface-variant">
                        {q.subject_name} · {q.students} élève{q.students > 1 ? "s" : ""} · moyenne {q.avg_pct != null ? `${q.avg_pct}%` : "—"} · meilleur {q.best_pct != null ? `${q.best_pct}%` : "—"}
                      </p>
                    </div>
                    <span className="font-label-md font-bold text-secondary">{q.attempts} tentat{q.attempts > 1 ? "ives" : "ive"}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <section>
          <h3 className="font-title-md text-title-md text-on-surface font-bold mb-3">Élèves ({students.length})</h3>
          <form onSubmit={addStudent} className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email de l'élève à ajouter"
              className="flex-1 h-12 rounded-xl border border-outline-variant bg-surface px-4 text-on-surface focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={busyAdd || !email.trim()}
              className="h-12 px-5 rounded-full bg-primary text-on-primary font-label-md font-semibold disabled:opacity-50 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Ajouter
            </button>
          </form>
          {addMsg && (
            <p className={`font-label-sm mb-3 ${addMsg.ok ? "text-tertiary" : "text-error"}`}>{addMsg.text}</p>
          )}

          {students.length === 0 ? (
            <div className="text-center py-12 bg-surface-container-lowest border border-outline-variant rounded-xl">
              <div className="w-14 h-14 rounded-full bg-primary-container/30 flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-primary text-2xl">person_search</span>
              </div>
              <p className="font-body-md text-on-surface-variant">Aucun élève dans cette classe pour l&apos;instant.</p>
              <p className="font-label-sm text-on-surface-variant mt-1">Partage le code d&apos;invitation ou ajoute un élève par email.</p>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="divide-y divide-outline-variant">
                {students.map((s) => (
                  <div key={s.user_id} className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0">
                      {s.first_name?.[0] ?? "?"}{s.last_name?.[0] ?? ""}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md font-semibold text-on-surface truncate">
                        {s.first_name} {s.last_name}
                        {s.class_level ? <span className="font-label-xs text-on-surface-variant font-normal"> · {s.class_level}</span> : null}
                      </p>
                      <p className="font-label-xs text-on-surface-variant truncate">
                        {s.email ?? "Sans email"} · {s.attempts} tentative{s.attempts > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-label-md font-bold text-primary">{s.avg_pct != null ? `${s.avg_pct}%` : "—"}</p>
                      <p className="font-label-xs text-on-surface-variant">moyenne</p>
                    </div>
                    <button
                      onClick={() => removeStudent(s.user_id, `${s.first_name} ${s.last_name}`)}
                      aria-label="Retirer"
                      className="w-9 h-9 rounded-full text-error hover:bg-error-container/20 flex items-center justify-center shrink-0"
                    >
                      <span className="material-symbols-outlined text-[20px]">person_remove</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}