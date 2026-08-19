"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmDialog, { type ConfirmState } from "@/components/ConfirmDialog";

interface ProfQuiz {
  id: number;
  subject_name: string;
  icon: string;
  color: string;
  title: string;
  level: string;
  question_count: number;
  attempts: number;
  avg_percent: number | null;
  status: string;
}

interface ProfPaper {
  id: number;
  category: string;
  year: number;
  title: string;
  duration_minutes: number;
  subject_name: string;
  icon: string;
  color: string;
  question_count: number;
  attempts: number;
  avg_score: number | null;
  status: string;
}

interface ProfChapter {
  id: number;
  subject_code: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  grade_name: string | null;
  code: string;
  title: string;
  order_index: number;
  lesson_count: number;
  status: string;
}

interface ProfLesson {
  id: number;
  chapter_id: number;
  chapter_title: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  grade_name: string | null;
  title: string;
  summary: string;
  duration_min: number;
  difficulty: number;
  is_premium: number;
  exercise_count: number;
  status: string;
}

interface ProfInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface ProfSubjectChip {
  subject_id: number;
  name: string;
  icon: string | null;
  color: string | null;
}

interface ProfGradeChip {
  grade_id: number;
  name: string;
}

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [prof, setProf] = useState<ProfInfo | null>(null);
  const [subjects, setSubjects] = useState<ProfSubjectChip[]>([]);
  const [grades, setGrades] = useState<ProfGradeChip[]>([]);
  const [quizzes, setQuizzes] = useState<ProfQuiz[]>([]);
  const [papers, setPapers] = useState<ProfPaper[]>([]);
  const [chapters, setChapters] = useState<ProfChapter[]>([]);
  const [lessons, setLessons] = useState<ProfLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user) {
          router.replace("/connexion-edukora");
          return;
        }
        if (d.user.role !== "teacher") {
          router.replace("/accueil-edukora");
          return;
        }
        setProf(d.user);
      });
    fetch("/api/prof/quiz")
      .then((r) => r.json())
      .then((d) => setQuizzes(d.quizzes ?? []));
    fetch("/api/prof/paper")
      .then((r) => r.json())
      .then((d) => setPapers(d.papers ?? []));
    fetch("/api/prof/chapter")
      .then((r) => r.json())
      .then((d) => setChapters(d.chapters ?? []));
    fetch("/api/prof/lesson")
      .then((r) => r.json())
      .then((d) => setLessons(d.lessons ?? []));
    fetch("/api/prof/subjects")
      .then((r) => r.json())
      .then((d) => setSubjects(d.subjects ?? []));
    fetch("/api/prof/grades")
      .then((r) => r.json())
      .then((d) => setGrades(d.grades ?? []))
      .finally(() => setLoading(false));
  }, [router]);

  async function deleteQuiz(id: number) {
    await fetch("/api/prof/quiz", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  }

  async function deletePaper(id: number) {
    await fetch("/api/prof/paper", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setPapers((prev) => prev.filter((p) => p.id !== id));
  }

  async function deleteChapter(id: number) {
    await fetch("/api/prof/chapter", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setChapters((prev) => prev.filter((c) => c.id !== id));
    setLessons((prev) => prev.filter((l) => l.chapter_id !== id));
  }

  async function deleteLesson(id: number) {
    await fetch("/api/prof/lesson", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setLessons((prev) => prev.filter((l) => l.id !== id));
  }

  const avgQuiz = quizzes.length > 0 && quizzes.some((q) => q.avg_percent !== null)
    ? Math.round(quizzes.filter((q) => q.avg_percent !== null).reduce((a, q) => a + (q.avg_percent ?? 0), 0) / Math.max(1, quizzes.filter((q) => q.avg_percent !== null).length))
    : null;

  const STATUS_META: Record<string, { label: string; cls: string }> = {
    pending: { label: "En attente", cls: "bg-amber-100 text-amber-800" },
    approved: { label: "En ligne", cls: "bg-emerald-100 text-emerald-800" },
    rejected: { label: "Rejeté", cls: "bg-red-100 text-red-800" },
  };
  const statusBadge = (status: string) => {
    const m = STATUS_META[status] ?? STATUS_META.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${m.cls}`}>
        <span className="material-symbols-outlined text-xs">{status === "approved" ? "check_circle" : status === "rejected" ? "cancel" : "schedule"}</span>
        {m.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-primary flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <span className="font-headline-md text-headline-md font-bold text-on-primary">Edukora Pro</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs hover:opacity-90">↗</Link>
          <button
            onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); location.href = "/connexion-edukora"; }}
            className="w-9 h-9 rounded-full bg-primary-container/30 text-on-primary flex items-center justify-center hover:opacity-90"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </header>

      <main className="px-4 md:px-8 py-6 max-w-4xl mx-auto pb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-md font-bold">
            {prof?.first_name?.[0] ?? "P"}{prof?.last_name?.[0] ?? ""}
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md text-on-surface">Prof. {prof?.first_name} {prof?.last_name}</h1>
            <p className="font-label-sm text-on-surface-variant">Espace professeur — crée quiz et sujets pour tes élèves</p>
          </div>
        </div>

        <section className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="font-title-md text-title-md text-on-surface">Mon enseignement</h2>
            <Link
              href="/espace-prof/disciplines"
              className="inline-flex items-center gap-1 rounded-full border border-outline-variant px-4 py-2 font-label-sm text-on-surface-variant hover:bg-surface-container-high active:scale-[0.98] transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Changer
            </Link>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            {subjects.length === 0 && grades.length === 0 ? (
              <div className="flex flex-col items-start gap-3">
                <p className="font-body-sm text-on-surface-variant">
                  Tu n&apos;as pas encore défini ton enseignement. Choisis les matières et les niveaux que
                  tu enseignes pour créer tes classes, tes chapitres, tes leçons, tes quiz et tes sujets.
                </p>
                <Link
                  href="/espace-prof/disciplines"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md px-5 py-2.5 rounded-full active:scale-[0.98] transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Définir mes disciplines & niveaux
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {subjects.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => (
                      <span
                        key={`s${s.subject_id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-3 py-1.5 font-label-sm text-on-surface"
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: s.color ?? "#7c4dff" }}
                        >
                          {s.icon ?? s.name.charAt(0)}
                        </span>
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}
                {grades.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {grades.map((g) => (
                      <span
                        key={`g${g.grade_id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-secondary-container/20 px-3 py-1.5 font-label-sm text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[14px] text-secondary">school</span>
                        {g.name}
                      </span>
                    ))}
                  </div>
                ) : null}
                <Link
                  href="/espace-prof/disciplines"
                  className="inline-flex items-center gap-1 rounded-full border border-outline-variant px-3.5 py-1.5 font-label-sm text-primary"
                >
                  Changer
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Quiz créés</p>
            <p className="font-headline-md text-headline-md text-primary mt-1">{quizzes.length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Sujets créés</p>
            <p className="font-headline-md text-headline-md text-secondary mt-1">{papers.length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Chapitres</p>
            <p className="font-headline-md text-headline-md text-tertiary mt-1">{chapters.length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Leçons</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-1">{lessons.length}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-title-md text-title-md text-on-surface mb-3">Mes chapitres ({chapters.length})</h2>
          {chapters.length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">Aucun chapitre créé pour l&apos;instant. Crée un chapitre qui sera validé par l&apos;administration.</p>
          ) : (
            <div className="space-y-3">
              {chapters.map((c) => (
                <div key={c.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: c.subject_color + "22", color: c.subject_color }}>
                    <span className="material-symbols-outlined">{c.subject_icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs font-bold uppercase tracking-wider" style={{ color: c.subject_color }}>{c.subject_name}</span>
                      {c.grade_name && <span className="font-label-xs text-on-surface-variant">{c.grade_name}</span>}
                      {statusBadge(c.status)}
                    </div>
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{c.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">
                      {c.code} · {c.lesson_count} leçon{c.lesson_count > 1 ? "s" : ""}
                    </p>
                  </div>
                  <Link
                    href={`/espace-prof/creer-lecon?chapter=${c.id}`}
                    className="w-9 h-9 rounded-full text-primary hover:bg-primary-container/15 flex items-center justify-center shrink-0"
                    aria-label="Ajouter une leçon à ce chapitre"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </Link>
                  <Link
                    href={`/espace-prof/creer-chapitre?id=${c.id}`}
                    className="w-9 h-9 rounded-full text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center shrink-0"
                    aria-label="Modifier ce chapitre"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </Link>
                  <button onClick={() => setConfirm({ title: "Supprimer ce chapitre ?", message: `« ${c.title} » et ses leçons seront supprimés.`, onConfirm: () => deleteChapter(c.id) })} aria-label="Supprimer" className="w-9 h-9 rounded-full text-error hover:bg-error-container/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="font-title-md text-title-md text-on-surface mb-3">Mes leçons ({lessons.length})</h2>
          {lessons.length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">Aucune leçon créée pour l&apos;instant.</p>
          ) : (
            <div className="space-y-3">
              {lessons.map((l) => (
                <div key={l.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: l.subject_color + "22", color: l.subject_color }}>
                    <span className="material-symbols-outlined">{l.subject_icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs font-bold uppercase tracking-wider" style={{ color: l.subject_color }}>{l.subject_name}</span>
                      <span className="font-label-xs text-on-surface-variant">{l.chapter_title}</span>
                      {statusBadge(l.status)}
                    </div>
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{l.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">
                      {l.duration_min} min · niveau {l.difficulty}{l.is_premium === 1 ? " · premium" : ""} · {l.exercise_count} exercice{l.exercise_count > 1 ? "s" : ""}
                    </p>
                  </div>
                  <Link
                    href={`/espace-prof/creer-lecon?id=${l.id}`}
                    className="w-9 h-9 rounded-full text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center shrink-0"
                    aria-label="Modifier cette leçon"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </Link>
                  <button onClick={() => setConfirm({ title: "Supprimer cette leçon ?", message: `« ${l.title} » sera supprimée.`, onConfirm: () => deleteLesson(l.id) })} aria-label="Supprimer" className="w-9 h-9 rounded-full text-error hover:bg-error-container/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="font-title-md text-title-md text-on-surface mb-3">Mes quiz ({quizzes.length})</h2>
          {quizzes.length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">Aucun quiz créé pour l&apos;instant.</p>
          ) : (
            <div className="space-y-3">
              {quizzes.map((q) => (
                <div key={q.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: q.color + "22", color: q.color }}>
                    <span className="material-symbols-outlined">{q.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs font-bold uppercase tracking-wider" style={{ color: q.color }}>{q.subject_name}</span>
                      <span className="font-label-xs text-on-surface-variant">{q.level}</span>
                      {statusBadge(q.status)}
                    </div>
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{q.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">
                      {q.question_count} questions · {q.attempts} tentative{q.attempts > 1 ? "s" : ""} · moyenne {q.avg_percent != null ? `${q.avg_percent}%` : "—"}
                    </p>
                  </div>
                  <Link
                    href={`/espace-prof/tentatives?id=${q.id}&type=quiz`}
                    className="w-9 h-9 rounded-full text-primary hover:bg-primary-container/15 flex items-center justify-center shrink-0"
                    aria-label="Voir les tentatives"
                  >
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                  </Link>
                  <button onClick={() => setConfirm({ title: "Supprimer ce quiz ?", message: `« ${q.title} » et ses ${q.question_count} questions seront définitivement supprimés.`, onConfirm: () => deleteQuiz(q.id) })} aria-label="Supprimer" className="w-9 h-9 rounded-full text-error hover:bg-error-container/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="font-title-md text-title-md text-on-surface mb-3">Mes sujets d&apos;examen ({papers.length})</h2>
          {papers.length === 0 ? (
            <p className="bg-surface border border-outline-variant rounded-xl p-4 text-center font-body-sm text-on-surface-variant">Aucun sujet créé pour l&apos;instant.</p>
          ) : (
            <div className="space-y-3">
              {papers.map((p) => (
                <div key={p.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: p.color + "22", color: p.color }}>
                    <span className="material-symbols-outlined">{p.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-xs font-bold uppercase tracking-wider" style={{ color: p.color }}>{p.subject_name}</span>
                      <span className="font-label-xs text-on-surface-variant">{p.category} {p.year} · {p.duration_minutes} min</span>
                      {statusBadge(p.status)}
                    </div>
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{p.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">
                      {p.question_count} questions · {p.attempts} tentative{p.attempts > 1 ? "s" : ""} · moyenne {p.avg_score != null ? `${p.avg_score}/20` : "—"}
                    </p>
                  </div>
                  <Link
                    href={`/espace-prof/tentatives?id=${p.id}&type=paper`}
                    className="w-9 h-9 rounded-full text-primary hover:bg-primary-container/15 flex items-center justify-center shrink-0"
                    aria-label="Voir les tentatives"
                  >
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                  </Link>
                  <button onClick={() => setConfirm({ title: "Supprimer ce sujet ?", message: `« ${p.title} » et ses ${p.question_count} questions seront définitivement supprimés.`, onConfirm: () => deletePaper(p.id) })} aria-label="Supprimer" className="w-9 h-9 rounded-full text-error hover:bg-error-container/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {avgQuiz !== null && (
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-8">
            <p className="font-label-sm text-on-surface-variant">Score moyen global de tes quiz</p>
            <p className="font-headline-md text-headline-md text-primary mt-1">{avgQuiz}%</p>
          </section>
        )}
      </main>

<nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-outline-variant px-4 py-3">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <Link href="/espace-prof/classes" className="h-12 rounded-full bg-surface-container-high text-on-surface font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100">
            <span className="material-symbols-outlined text-[18px]">groups</span> Mes classes
          </Link>
          <Link href="/espace-prof/tentatives" className="h-12 rounded-full bg-surface-container-high text-on-surface font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100">
            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span> Tentatives
          </Link>
          <Link href="/espace-prof/creer-chapitre" className="h-12 rounded-full bg-tertiary text-on-tertiary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100">
            <span className="material-symbols-outlined text-[18px]">add</span> Nouveau chapitre
          </Link>
          <Link href="/espace-prof/creer-lecon" className="h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100">
            <span className="material-symbols-outlined text-[18px]">add</span> Nouvelle leçon
          </Link>
          <Link href="/espace-prof/creer-quiz" className="h-12 rounded-full bg-secondary text-on-secondary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100">
            <span className="material-symbols-outlined text-[18px]">add</span> Nouveau quiz
          </Link>
          <Link href="/espace-prof/creer-sujet" className="h-12 rounded-full bg-surface-container text-on-surface font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100">
            <span className="material-symbols-outlined text-[18px]">add</span> Nouveau sujet
          </Link>
        </div>
      </nav>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}
