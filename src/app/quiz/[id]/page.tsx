"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number;
}

interface QuizData {
  quiz: { id: number; title: string; subject_id: number; level: string };
  questions: Question[];
}

export default function QuizTakePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<QuizData | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/quiz/${id}`)
      .then((r) => r.json())
      .then((d) => (d.error ? setNotFound(true) : setData(d)))
      .catch(() => setNotFound(true));
  }, [id]);

  const q = data?.questions[current];
  const total = data?.questions.length ?? 0;
  const answered = Object.keys(answers).length;
  const progress = total > 0 ? Math.round((answered * 100) / total) : 0;

  async function submit() {
    if (!data || submitting) return;
    setSubmitting(true);
    const payload = {
      answers: data.questions.map((question) => ({
        questionId: question.id,
        selected: answers[question.id] ?? -1,
      })),
    };
    const res = await fetch(`/api/quiz/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (result.error) return;
    sessionStorage.setItem("edukora-quiz-result", JSON.stringify({ ...result, questions: data.questions, userAnswers: answers }));
    router.push(`/quiz/${id}/resultat`);
  }

  const answeredCurrent = useMemo(() => answers[q?.id ?? -1] !== undefined, [answers, q?.id]);

  if (notFound) {
    return (
      <div className="min-h-dvh bg-surface flex flex-col items-center justify-center gap-4 px-6 font-['Hanken_Grotesk']">
        <p className="text-on-surface font-headline-md">Quiz introuvable</p>
        <button onClick={() => router.push("/quiz")} className="bg-primary text-on-primary font-label-md px-6 py-3 rounded-full">Retour aux quiz</button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-['Hanken_Grotesk']">
      <header className="w-full max-w-lg mx-auto sticky top-0 bg-surface z-40 px-4 pt-4">
        <div className="flex items-center gap-2">
          <button onClick={() => router.push("/quiz")} className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-label-xs font-semibold text-on-surface-variant uppercase tracking-wider">{data.quiz.title}</span>
              <span className="font-label-xs text-primary">Question {current + 1} / {total}</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-500 ease-out" style={{ width: `${Math.max(progress, (current + (answeredCurrent ? 1 : 0)) / total * 100)}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col px-4 pt-8 pb-32">
        {q && (
          <div className="flex-1">
            <p className="font-title-sm text-title-sm text-on-surface mb-1">Question {current + 1}</p>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 leading-tight">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                    className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all duration-150 ${
                      selected
                        ? "border-primary bg-primary-container/20"
                        : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${selected ? "border-primary" : "border-outline-variant"}`}>
                      {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                    </div>
                    <span className={`font-body-md ${selected ? "font-semibold text-primary" : "text-on-surface"}`}>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-4 py-4">
          <div className="max-w-lg mx-auto flex gap-3">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant disabled:opacity-30 active:scale-95 transition-transform duration-100"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            {current < total - 1 ? (
              <button
                onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
                className="flex-1 h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100"
              >
                Suivant
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting || answered < total}
                className="flex-1 h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 disabled:opacity-40 active:scale-[0.98] transition-transform duration-100"
              >
                {submitting ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <>
                    Terminer le quiz
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  </>
                )}
              </button>
            )}
          </div>
          {current === total - 1 && answered < total && (
            <p className="text-center font-label-xs text-on-surface-variant mt-2">{answered} / {total} questions répondues</p>
          )}
        </div>
      </main>
    </div>
  );
}
