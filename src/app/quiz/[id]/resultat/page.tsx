"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Result {
  score: number;
  max: number;
  pct: number;
  xp: number;
  details: { questionId: number; correct: boolean; answer_index: number; explanation: string | null }[];
  questions: { id: number; question: string; options: string[] }[];
  userAnswers?: Record<string, number>;
}

export default function QuizResultPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("edukora-quiz-result");
    if (!raw) {
      router.replace("/quiz");
      return;
    }
    setResult(JSON.parse(raw));
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  const detailsById = Object.fromEntries(result.details.map((d) => [d.questionId, d]));

  return (
    <div className="bg-surface text-on-surface min-h-screen font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center justify-between px-4 h-16">
        <span className="font-headline-md text-headline-md font-bold text-primary">Résultats</span>
        <button onClick={() => router.push("/quiz")} className="text-on-surface-variant font-label-md font-semibold hover:opacity-80">Fermer</button>
      </header>

      <main className="w-full max-w-lg mx-auto px-4 pt-8 pb-16">
        <section className={`rounded-xl p-6 mb-8 text-center ${result.pct >= 70 ? "bg-primary-container/20" : result.pct >= 40 ? "bg-tertiary-container/20" : "bg-error-container/20"}`}>
          <p className="font-label-md text-on-surface-variant uppercase tracking-widest">Score global</p>
          <p className="font-headline-lg text-[40px] font-bold text-on-surface mt-2">{result.score} / {result.max}</p>
          <p className="font-title-md text-title-md mt-1" style={{ color: result.pct >= 70 ? "#1b873b" : result.pct >= 40 ? "#b26a00" : "#ba1a1a" }}>
            {result.pct}% de réussite
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-primary text-on-primary px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span className="font-label-md font-semibold">+{result.xp} XP</span>
          </div>
        </section>

        <h2 className="font-title-md text-title-md text-on-surface mb-4">Corrigé détaillé</h2>
        <div className="space-y-4">
          {result.questions.map((q, qi) => {
            const d = detailsById[q.id];
            const userChoice = result.userAnswers ? result.userAnswers[q.id] : undefined;
            const isSkipped = userChoice === undefined || userChoice === -1;
            return (
              <div key={q.id} className={`rounded-xl border p-4 ${d?.correct ? "border-outline-variant bg-surface-container-lowest" : "border-error/40 bg-error-container/10"}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-on-primary text-sm ${d?.correct ? "bg-primary" : "bg-error"}`}>
                    <span className="material-symbols-outlined text-[16px]">{d?.correct ? "check" : "close"}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-label-xs text-on-surface-variant uppercase tracking-wider mb-1">Question {qi + 1}</p>
                    <p className="font-body-md font-semibold text-on-surface mb-3">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, i) => {
                        const isCorrect = i === d?.answer_index;
                        const isWrongChoice = !isCorrect && userChoice === i;
                        const isSkipped = userChoice === undefined || userChoice === -1;
                        return (
                          <div
                            key={i}
                            className={`px-3 py-2.5 rounded-lg border text-body-sm flex items-center gap-2 ${
                              isCorrect
                                ? "border-primary bg-primary-container/15 text-primary font-semibold"
                                : isWrongChoice
                                  ? "border-error bg-error-container/30 text-on-error"
                                  : "border-outline-variant text-on-surface-variant"
                            }`}
                          >
                            {isCorrect && <span className="material-symbols-outlined text-[16px] shrink-0">check_circle</span>}
                            {isWrongChoice && <span className="material-symbols-outlined text-[16px] shrink-0">cancel</span>}
                            <span>{opt}</span>
                            {isWrongChoice && <span className="ml-auto font-label-xs shrink-0">ta réponse</span>}
                            {isCorrect && <span className="ml-auto font-label-xs shrink-0">bonne réponse</span>}
                          </div>
                        );
                      })}
                    </div>
                    {isSkipped && (
                      <p className="mt-2 font-label-xs text-on-surface-variant">Non répondue</p>
                    )}
                    {d?.explanation && (
                      <p className="mt-3 px-3 py-2.5 rounded-lg bg-secondary-container/15 border border-outline-variant text-body-sm text-on-surface-variant">
                        <span className="font-semibold text-secondary">Explication : </span>
                        {d.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button onClick={() => router.push(`/quiz/${id}`)} className="w-full h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold active:scale-[0.98] transition-transform duration-100">
            Recommencer ce quiz
          </button>
          <button onClick={() => router.push("/quiz")} className="w-full h-12 rounded-full border border-outline-variant text-on-surface font-label-md font-semibold active:scale-[0.98] transition-transform duration-100">
            Tous les quiz
          </button>
        </div>
      </main>
    </div>
  );
}
