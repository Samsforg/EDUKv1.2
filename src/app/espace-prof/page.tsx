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

interface ProfInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [prof, setProf] = useState<ProfInfo | null>(null);
  const [quizzes, setQuizzes] = useState<ProfQuiz[]>([]);
  const [papers, setPapers] = useState<ProfPaper[]>([]);
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
      .then((d) => setPapers(d.papers ?? []))
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

  const totalStudents = quizzes.reduce((acc, q) => acc + q.attempts, 0) + papers.reduce((acc, p) => acc + p.attempts, 0);
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
          <Link href="/accueil-edukora" className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs hover:opacity-90">↗</Link>
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

        <section className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Quiz créés</p>
            <p className="font-headline-md text-headline-md text-primary mt-1">{quizzes.length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Sujets créés</p>
            <p className="font-headline-md text-headline-md text-secondary mt-1">{papers.length}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Tentatives élèves</p>
            <p className="font-headline-md text-headline-md text-on-surface mt-1">{totalStudents}</p>
          </div>
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
          <Link href="/espace-prof/creer-quiz" className="h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100">
            <span className="material-symbols-outlined text-[18px]">add</span> Nouveau quiz
          </Link>
          <Link href="/espace-prof/creer-sujet" className="h-12 rounded-full bg-secondary text-on-secondary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100">
            <span className="material-symbols-outlined text-[18px]">add</span> Nouveau sujet
          </Link>
        </div>
      </nav>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}
