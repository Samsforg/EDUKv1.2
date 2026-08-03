"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";

interface Attempt {
  id: number;
  student_first: string;
  student_last: string;
  student_email: string | null;
  score: number;
  max_score?: number;
  pct?: number;
  score_over_20?: number;
  duration_seconds?: number;
  completed_at: string;
  answers?: { questionId: number; correct: boolean }[];
}

interface DetailData {
  quiz?: { id: number; title: string };
  paper?: { id: number; title: string };
  attempts: Attempt[];
  summary: {
    total: number;
    avg_pct?: number | null;
    best_pct?: number | null;
    avg?: number | null;
    best?: number | null;
    passed?: number;
    students: number;
  };
}

export default function AttemptsPage() {
  return (
    <Suspense fallback={null}>
      <AttemptsContent />
    </Suspense>
  );
}

function AttemptsContent() {
  const { id } = useParams<{ id: string }>();
  const params = useSearchParams();
  const router = useRouter();
  const type = params.get("type") === "paper" ? "paper" : "quiz";
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/prof/${type}/${id}/attempts`)
      .then(async (r) => {
        if (!r.ok) {
          const j = await r.json().catch(() => null);
          setError(j?.error ?? "Impossible de charger les tentatives.");
          return null;
        }
        return r.json();
      })
      .then((d) => d && setData(d))
      .finally(() => setLoading(false));
  }, [type, id]);

  const title = data?.quiz?.title ?? data?.paper?.title ?? "";

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader
        title={title || (type === "quiz" ? "Tentatives du quiz" : "Tentatives du sujet")}
        subtitle={type === "quiz" ? "Réponses des élèves au quiz" : "Notes des élèves au sujet d'examen"}
        backHref="/espace-prof"
      />

      <main className="px-margin-mobile pt-6 space-y-4">
        {error && (
          <div className="text-center py-16 space-y-4">
            <p className="font-body-md text-on-surface-variant">{error}</p>
            <button onClick={() => router.push("/espace-prof")} className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full">Retour au tableau de bord</button>
          </div>
        )}

        {!error && loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {!error && !loading && data && (
          <>
            <section className="grid grid-cols-3 gap-3">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">Tentatives</p>
                <p className="font-headline-md text-headline-md text-primary mt-1">{data.summary.total}</p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">{type === "quiz" ? "Moyenne" : "Note moyenne"}</p>
                <p className="font-headline-md text-headline-md text-secondary mt-1">
                  {type === "quiz" ? (data.summary.avg_pct != null ? `${data.summary.avg_pct}%` : "—") : data.summary.avg != null ? `${data.summary.avg}/20` : "—"}
                </p>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                <p className="font-label-xs text-on-surface-variant uppercase tracking-wider">{type === "quiz" ? "Meilleur" : "Meilleure note"}</p>
                <p className="font-headline-md text-headline-md text-on-surface mt-1">
                  {type === "quiz" ? (data.summary.best_pct != null ? `${data.summary.best_pct}%` : "—") : data.summary.best != null ? `${data.summary.best}/20` : "—"}
                </p>
              </div>
            </section>

            {data.attempts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-primary text-3xl">group</span>
                </div>
                <p className="font-body-md text-on-surface-variant">Aucun élève n&apos;a encore tenté ce {type === "quiz" ? "quiz" : "sujet"}.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-label-sm text-on-surface-variant">{data.summary.students} élève{data.summary.students > 1 ? "s" : ""} · {type === "paper" && data.summary.passed !== undefined && `${data.summary.passed} réussite(s) (≥ 10/20)`}</p>
                {data.attempts.map((a) => {
                  const score = type === "quiz" ? `${a.score} / ${a.max_score}` : `${a.score_over_20}/20`;
                  const note = type === "quiz" ? a.pct : a.score_over_20;
                  const ok = type === "quiz" ? (a.pct ?? 0) >= 70 : (a.score_over_20 ?? 0) >= 10;
                  return (
                    <div key={a.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-secondary-container/15 text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-label-md font-semibold text-on-surface truncate">{a.student_first} {a.student_last}</h3>
                        <p className="font-label-xs text-on-surface-variant truncate">{a.student_email ?? "sans email"} · {a.completed_at.slice(0, 16).replace("T", " à ")}</p>
                        {a.duration_seconds !== undefined && (
                          <p className="font-label-xs text-on-surface-variant">{Math.floor(a.duration_seconds / 60)} min passées</p>
                        )}
                        {a.answers && a.answers.length > 0 && (
                          <p className="font-label-xs text-on-surface-variant">
                            {a.answers.filter((x) => x.correct).length} bonnes réponses / {a.answers.length}
                          </p>
                        )}
                      </div>
                      <span className={`font-title-md text-title-md shrink-0 ${ok ? "text-primary" : "text-error"}`}>{score}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
