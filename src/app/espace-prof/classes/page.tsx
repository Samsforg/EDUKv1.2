"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchFresh } from "@/lib/client-fetch";
import PageHeader from "@/components/PageHeader";
import ConfirmDialog, { type ConfirmState } from "@/components/ConfirmDialog";

interface ClassItem {
  id: number;
  name: string;
  invite_code: string;
  year: string | null;
  subject_name: string | null;
  icon: string | null;
  color: string | null;
  grade_name: string | null;
  student_count: number;
  created_at: string;
}

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface Grade {
  id: number;
  name: string;
}

export default function TeacherClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [year, setYear] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  async function load() {
    const [c, s, g] = await Promise.all([
      fetchFresh("/api/prof/classes").then((r) => r.json()),
      fetchFresh("/api/subjects").then((r) => r.json()),
      fetchFresh("/api/grades").then((r) => r.json()),
    ]);
    setClasses(c.classes ?? []);
    setSubjects(s.subjects ?? []);
    setGrades(g.grades ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load().catch(() => {
      setLoading(false);
      router.replace("/connexion-edukora");
    });
  }, []);

  async function createClass(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/prof/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subject_id: subjectId ? Number(subjectId) : null,
          grade_id: gradeId ? Number(gradeId) : null,
          year: year.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setName("");
      setSubjectId("");
      setGradeId("");
      setYear("");
      setShowCreate(false);
      await load();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  async function regenerateCode(id: number) {
    await fetch(`/api/prof/classes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ new_invite: true }),
    });
    await load();
  }

  async function deleteClass(id: number) {
    await fetch("/api/prof/classes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  }

  async function copy(code: string, id: number) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      window.alert(`Code : ${code}`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 font-['Hanken_Grotesk']">
      <PageHeader
        title="Mes classes"
        subtitle="Crée tes classes et invite tes élèves"
        backHref="/espace-prof"
      />

      <main className="px-margin-mobile md:px-margin-desktop pt-6 space-y-5 max-w-4xl mx-auto">
        {classes.length === 0 && !showCreate && (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-3xl">groups</span>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-sm mx-auto">
              Tu n&apos;as pas encore de classe. Crée une classe puis partage le code d&apos;invitation à tes élève
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md px-6 py-3 rounded-full active:scale-[0.98] transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Créer une classe
            </button>
          </div>
        )}

        {showCreate && (
          <form onSubmit={createClass} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              <h2 className="font-title-md text-title-md text-on-surface font-bold">Nouvelle classe</h2>
            </div>
            <div className="space-y-1">
              <label className="font-label-sm text-on-surface-variant">Nom de la classe</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Terminale C1 - Mathématiques"
                className="w-full h-12 rounded-xl border border-outline-variant bg-surface px-4 text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="block">
                <label className="font-label-sm text-on-surface-variant">Matière (optionnel)</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full h-12 rounded-xl border border-outline-variant bg-surface px-3 text-on-surface focus:border-primary focus:outline-none"
                >
                  <option value="">Toutes matières</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-0.5">
                <label className="font-label-sm text-on-surface-variant">Niveau</label>
                <select
                  value={gradeId}
                  onChange={(e) => setGradeId(e.target.value)}
                  className="w-full h-12 rounded-xl border border-outline-variant bg-surface px-3 text-on-surface focus:border-primary focus:outline-none"
                >
                  <option value="">Tous niveaux</option>
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-0.5">
              <label className="font-label-sm text-on-surface-variant">Année scolaire (optionnel)</label>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Ex : 2026-2026"
                className="w-full h-12 rounded-xl border border-outline-variant bg-surface px-4 text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
            {error && <p className="font-label-sm text-error">{error}</p>}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={busy || !name.trim()}
                className="h-12 px-6 rounded-full bg-primary text-on-primary font-label-md font-semibold disabled:opacity-50 active:scale-[0.98] transition-transform flex items-center gap-2"
              >
                {busy ? (
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">check</span>
                )}
                Créer
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="h-12 px-6 rounded-full text-on-surface-variant hover:bg-surface-container-high font-label-sm"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {classes.length > 0 && (
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              {classes.length} classe{classes.length > 1 ? "s" : ""}
            </h2>
            <button
              onClick={() => setShowCreate((v) => !v)}
              className="flex items-center gap-1 text-primary font-label-sm font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">{showCreate ? "close" : "add"}</span>
              {showCreate ? "Fermer" : "Créer"}
            </button>
          </div>
        )}

        {classes.map((c) => (
          <div key={c.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: (c.color ?? "#0047ab") + "22", color: c.color ?? "#0047ab" }}
                >
                  <span className="material-symbols-outlined">{c.icon ?? "school"}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold truncate">{c.name}</h3>
                  <p className="font-body-sm text-on-surface-variant truncate">
                    {[c.subject_name, c.grade_name, c.year].filter(Boolean).join(" · ") || "Classe"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConfirm({ title: "Supprimer cette classe ?", message: `La classe « ${c.name} » et ses ${c.student_count} élèves seront supprimés.`, onConfirm: () => deleteClass(c.id) })}
                aria-label="Supprimer"
                className="w-9 h-9 rounded-full text-error hover:bg-error-container/20 flex items-center justify-center shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <div className="bg-surface-container-low rounded-lg px-4 py-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">person</span>
                <span className="font-label-md font-semibold text-on-surface">{c.student_count} élève{c.student_count > 1 ? "s" : ""}</span>
              </div>
              <button
                onClick={() => copy(c.invite_code, c.id)}
                className="bg-secondary-container/40 text-on-secondary-container rounded-lg px-4 py-2 flex items-center gap-2 font-label-md font-semibold hover:brightness-105 active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-lg">{copied === c.id ? "check" : "content_copy"}</span>
                <span className="tracking-widest font-bold">{c.invite_code}</span>
              </button>
              <button
                onClick={() => regenerateCode(c.id)}
                className="rounded-lg px-3 py-2 text-primary text-sm flex items-center gap-1 hover:bg-primary-container/20"
              >
                <span className="material-symbols-outlined text-lg">refresh</span>
                Regénérer
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant flex flex-wrap gap-2">
              <Link
                href={`/espace-prof/classes/${c.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-label-sm font-semibold active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                Voir la classe et les statistiques
              </Link>
            </div>
          </div>
        ))}
      </main>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}