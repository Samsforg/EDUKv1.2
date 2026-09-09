"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  class_level: string | null;
  xp: number;
  streak: number;
  commune: string | null;
  created_at: string;
  last_active_at: string | null;
}

interface SubjectStats {
  subject_name: string;
  icon: string;
  color: string;
  attempts: number;
  avg_pct: number | null;
  best_pct: number | null;
}

interface RecentAttempt {
  quiz_id: number;
  quiz_title: string;
  subject_name: string;
  score: number;
  max_score: number;
  pct: number;
  completed_at: string;
}

interface ExamAttempt {
  paper_id: number;
  paper_title: string;
  score: number;
  max_score: number;
  pct: number;
  completed_at: string;
}

interface Assignment {
  assignment_id: number;
  title: string;
  subject_name: string | null;
  score: number | null;
  max_score: number;
  submitted_at: string | null;
  status: string;
}

interface Analysis {
  total_quizzes: number;
  overall_avg: number | null;
  strengths: string[];
  weaknesses: string[];
}

interface Data {
  student: Student;
  classes: { class_id: number; class_name: string; subject_name: string | null }[];
  by_subject: SubjectStats[];
  recent_attempts: RecentAttempt[];
  exam_attempts: ExamAttempt[];
  assignments: Assignment[];
  analysis: Analysis;
}

function StudentContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "quizzes" | "exams" | "assignments">("overview");

  useEffect(() => {
    fetch(`/api/prof/student/${id}`)
      .then(async (r) => {
        if (!r.ok) {
          const j = await r.json().catch(() => null);
          setError(j?.error ?? "Impossible de charger le profil.");
          return null;
        }
        return r.json();
      })
      .then((d) => d && setData(d))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-dvh bg-surface flex flex-col items-center justify-center gap-4 px-6">
        <p className="font-headline-md text-on-surface">{error ?? "Erreur inconnue"}</p>
        <button onClick={() => router.push("/espace-prof/classes")} className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md">
          Retour aux classes
        </button>
      </div>
    );
  }

  const s = data.student;
  const a = data.analysis;
  const tabs = [
    { key: "overview" as const, label: "Vue d'ensemble", icon: "dashboard" },
    { key: "quizzes" as const, label: "Quiz", icon: "quiz" },
    { key: "exams" as const, label: "Examens", icon: "description" },
    { key: "assignments" as const, label: "Devoirs", icon: "assignment" },
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader
        title={`${s.first_name} ${s.last_name}`}
        subtitle={s.class_level ?? "Élève"}
        backHref="/espace-prof/classes"
      />

      <main className="px-margin-mobile pt-4 space-y-4">
        {/* Student card */}
        <div className="bg-surface border border-outline-variant rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-primary text-xl font-bold">
              {s.first_name.charAt(0)}{s.last_name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-headline-sm text-on-surface">{s.first_name} {s.last_name}</p>
              {s.email && <p className="text-xs text-on-surface-variant">{s.email}</p>}
              {s.commune && <p className="text-xs text-on-surface-variant">{s.commune}</p>}
            </div>
            <div className="text-right">
              <p className="font-label-sm font-bold text-primary">{s.xp} XP</p>
              <p className="text-xs text-on-surface-variant">🔥 {s.streak} jours</p>
            </div>
          </div>
          {data.classes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.classes.map((c) => (
                <span key={c.class_id} className="text-[11px] font-semibold px-2 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                  {c.class_name}{c.subject_name ? ` · ${c.subject_name}` : ""}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Analysis summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface border border-outline-variant rounded-xl p-4">
            <p className="text-label-xs text-on-surface-variant">Moyenne générale</p>
            <p className={`text-headline-md font-bold ${a.overall_avg != null && a.overall_avg >= 75 ? "text-green-600" : a.overall_avg != null && a.overall_avg >= 50 ? "text-amber-600" : "text-error"}`}>
              {a.overall_avg != null ? `${a.overall_avg}%` : "—"}
            </p>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl p-4">
            <p className="text-label-xs text-on-surface-variant">Quiz passés</p>
            <p className="text-headline-md font-bold text-primary">{a.total_quizzes}</p>
          </div>
        </div>

        {a.strengths.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-label-sm font-semibold text-green-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">trending_up</span> Points forts
            </p>
            <p className="text-sm text-green-700 mt-1">{a.strengths.join(", ")}</p>
          </div>
        )}

        {a.weaknesses.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-label-sm font-semibold text-red-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">trending_down</span> À renforcer
            </p>
            <p className="text-sm text-red-700 mt-1">{a.weaknesses.join(", ")}</p>
          </div>
        )}

        {/* Subject breakdown */}
        {data.by_subject.length > 0 && (
          <section className="bg-surface border border-outline-variant rounded-2xl overflow-hidden">
            <h3 className="px-4 py-3 font-label-md font-semibold text-on-surface border-b border-outline-variant/60">Par matière</h3>
            <div className="divide-y divide-outline-variant/60">
              {data.by_subject.map((sub) => (
                <div key={sub.subject_name} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${sub.color}22`, color: sub.color }}>
                    <span className="material-symbols-outlined text-lg">{sub.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-sm text-on-surface">{sub.subject_name}</p>
                    <p className="text-[11px] text-on-surface-variant">{sub.attempts} tentative{sub.attempts > 1 ? "s" : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-label-sm font-bold ${sub.avg_pct != null && sub.avg_pct >= 75 ? "text-green-600" : sub.avg_pct != null && sub.avg_pct >= 50 ? "text-amber-600" : "text-error"}`}>
                      {sub.avg_pct != null ? `${sub.avg_pct}%` : "—"}
                    </p>
                    {sub.best_pct != null && (
                      <p className="text-[11px] text-on-surface-variant">Best {sub.best_pct}%</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-container-high rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                tab === t.key ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "quizzes" && (
          <section className="space-y-2">
            {data.recent_attempts.length === 0 && (
              <p className="text-center text-on-surface-variant font-body-sm py-8">Aucun quiz passé.</p>
            )}
            {data.recent_attempts.map((a, i) => (
              <div key={i} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.pct >= 75 ? "bg-green-100" : a.pct >= 50 ? "bg-amber-100" : "bg-red-100"}`}>
                  <span className={`font-label-sm font-bold ${a.pct >= 75 ? "text-green-600" : a.pct >= 50 ? "text-amber-600" : "text-error"}`}>
                    {a.pct}%
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-sm text-on-surface truncate">{a.quiz_title}</p>
                  <p className="text-[11px] text-on-surface-variant">{a.subject_name} · {a.score}/{a.max_score}</p>
                </div>
                <span className="text-[11px] text-on-surface-variant">{formatDate(a.completed_at)}</span>
              </div>
            ))}
          </section>
        )}

        {tab === "exams" && (
          <section className="space-y-2">
            {data.exam_attempts.length === 0 && (
              <p className="text-center text-on-surface-variant font-body-sm py-8">Aucun examen passé.</p>
            )}
            {data.exam_attempts.map((e, i) => (
              <div key={i} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${e.pct >= 75 ? "bg-green-100" : e.pct >= 50 ? "bg-amber-100" : "bg-red-100"}`}>
                  <span className={`font-label-sm font-bold ${e.pct >= 75 ? "text-green-600" : e.pct >= 50 ? "text-amber-600" : "text-error"}`}>
                    {e.pct}%
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-sm text-on-surface truncate">{e.paper_title}</p>
                  <p className="text-[11px] text-on-surface-variant">{e.score}/{e.max_score}</p>
                </div>
                <span className="text-[11px] text-on-surface-variant">{formatDate(e.completed_at)}</span>
              </div>
            ))}
          </section>
        )}

        {tab === "assignments" && (
          <section className="space-y-2">
            {data.assignments.length === 0 && (
              <p className="text-center text-on-surface-variant font-body-sm py-8">Aucun devoir rendu.</p>
            )}
            {data.assignments.map((a, i) => (
              <div key={i} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  a.status === "graded" && a.score != null && a.score >= a.max_score * 0.75
                    ? "bg-green-100" : a.status === "graded" ? "bg-amber-100" : "bg-surface-container-high"
                }`}>
                  <span className="material-symbols-outlined text-lg text-on-surface-variant">
                    {a.status === "graded" ? "check" : "pending"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-sm text-on-surface truncate">{a.title}</p>
                  <p className="text-[11px] text-on-surface-variant">{a.subject_name ?? "—"}{a.score != null ? ` · ${a.score}/${a.max_score}` : ""}</p>
                </div>
                <span className="text-[11px] text-on-surface-variant">
                  {a.submitted_at ? formatDate(a.submitted_at) : "Non rendu"}
                </span>
              </div>
            ))}
          </section>
        )}

        {tab === "overview" && (
          <section className="space-y-3">
            <h3 className="font-label-md font-semibold text-on-surface">Activité récente</h3>
            {data.recent_attempts.length === 0 && data.exam_attempts.length === 0 ? (
              <p className="text-center text-on-surface-variant font-body-sm py-8">Aucune activité récente.</p>
            ) : (
              [...data.recent_attempts.slice(0, 5).map((a) => ({
                key: `q-${a.quiz_id}-${a.completed_at}`,
                title: a.quiz_title,
                subject: a.subject_name,
                score: `${a.score}/${a.max_score}`,
                pct: a.pct,
                date: a.completed_at,
                type: "quiz" as const,
              })),
              ...data.exam_attempts.slice(0, 5).map((e) => ({
                key: `e-${e.paper_id}-${e.completed_at}`,
                title: e.paper_title,
                subject: "Examen",
                score: `${e.score}/${e.max_score}`,
                pct: e.pct,
                date: e.completed_at,
                type: "exam" as const,
              }))]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 8)
              .map((item) => (
                <div key={item.key} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.pct >= 75 ? "bg-green-100" : item.pct >= 50 ? "bg-amber-100" : "bg-red-100"}`}>
                    <span className={`font-label-sm font-bold ${item.pct >= 75 ? "text-green-600" : item.pct >= 50 ? "text-amber-600" : "text-error"}`}>
                      {item.pct}%
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-sm text-on-surface truncate">{item.title}</p>
                    <p className="text-[11px] text-on-surface-variant">{item.subject} · {item.score}</p>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">{formatDate(item.date)}</span>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH}h`;
  const diffJ = Math.floor(diffH / 24);
  if (diffJ < 7) return `il y a ${diffJ}j`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function StudentPage() {
  return (
    <Suspense fallback={null}>
      <StudentContent />
    </Suspense>
  );
}
