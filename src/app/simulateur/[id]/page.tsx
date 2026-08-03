"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number;
  explanation: string | null;
}

interface PaperData {
  paper: { id: number; title: string; duration_minutes: number; subject_name?: string; category?: string; year?: number };
  questions: Question[];
}

export default function SimulatorTakePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<PaperData | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    fetch(`/api/simulator/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setNotFound(true);
          return;
        }
        setData(d);
        setSecondsLeft(d.paper.duration_minutes * 60);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      submit(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  async function submit(timeout = false) {
    if (!data || submitting) return;
    setSubmitting(true);
    const payload = {
      answers: data.questions.map((q) => ({ questionId: q.id, selected: answers[q.id] ?? -1 })),
      duration_seconds: data.paper.duration_minutes * 60 - (secondsLeft ?? 0),
      timed_out: timeout,
    };
    const res = await fetch(`/api/simulator/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (result.error) return;
    sessionStorage.setItem("edukora-exam-result", JSON.stringify({ ...result, questions: data.questions, userAnswers: answers }));
    router.push(`/simulateur/${id}/resultat`);
  }

  const q = data?.questions[current];
  const total = data?.questions.length ?? 0;
  const answeredCount = Object.keys(answers).length;

  if (notFound) {
    return (
      <div className="min-h-dvh bg-surface flex flex-col items-center justify-center gap-4 px-6 font-['Hanken_Grotesk']">
        <p className="text-on-surface font-headline-md">Sujet introuvable</p>
        <button onClick={() => router.push("/simulateur")} className="bg-primary text-on-primary font-label-md px-6 py-3 rounded-full">Retour au simulateur</button>
      </div>
    );
  }

  if (!data || secondsLeft === null) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  const hh = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const urgent = secondsLeft < 300;
  const pctDone = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-['Hanken_Grotesk']">
      {/* Header */}
      <header className="w-full max-w-lg mx-auto sticky top-0 bg-surface z-40 px-4 pt-4 pb-3 border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setConfirmQuit(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100"
            aria-label="Quitter la session"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-label-xs font-bold text-primary uppercase tracking-wider truncate">{data.paper.subject_name ?? "Examen"}</p>
            <p className="font-label-xs text-on-surface-variant truncate">{data.paper.category} {data.paper.year ?? ""} · Conditions réelles</p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${urgent ? "bg-error-container/20 border-error" : "bg-surface-container-high border-outline-variant"}`}>
            <span className={`material-symbols-outlined text-[18px] ${urgent ? "text-error" : "text-primary"}`}>timer</span>
            <span className={`font-label-md font-bold tabular-nums ${urgent ? "text-error" : "text-on-surface"}`}>{hh}:{mm}:{ss}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 mb-1.5">
          <span className="font-label-xs text-on-surface-variant">Question {current + 1} sur {total}</span>
          <span className="font-label-xs text-on-surface-variant">{pctDone}% complété</span>
        </div>
        <div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full transition-all duration-500 ease-out" style={{ width: `${((answeredCount) / Math.max(1, total)) * 100}%` }}></div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col px-4 pt-6 pb-32">
        {q && (
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-xs text-on-surface-variant uppercase tracking-wider">Question {current + 1} / {total}</span>
              <span className="font-label-xs text-secondary">{q.points} pts</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 leading-tight">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                    className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all duration-150 ${
                      selected ? "border-primary bg-primary-container/20" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 shrink-0 flex items-center justify-center font-bold text-label-sm ${
                      selected ? "border-primary bg-primary text-on-primary" : "border-outline text-on-surface-variant"
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className={`font-body-md ${selected ? "font-semibold text-primary" : "text-on-surface"}`}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {q.explanation && (
              <div className="mt-5 rounded-xl bg-tertiary-container/10 border border-tertiary/20 p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                <div className="flex-1">
                  <p className="font-label-sm font-bold text-on-surface mb-1">Besoin d&apos;un indice ?</p>
                  {showHint ? (
                    <p className="font-label-sm text-on-surface-variant leading-relaxed">{q.explanation}</p>
                  ) : (
                    <button onClick={() => setShowHint(true)} className="font-label-sm text-primary underline underline-offset-2">
                      Afficher l&apos;indice
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-4 py-3">
        <div className="max-w-lg mx-auto">
          {total > 0 && (
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-2 justify-center">
              {data.questions.map((question, i) => {
                const isCurrent = i === current;
                const isAnswered = answers[question.id] !== undefined;
                return (
                  <button
                    key={question.id}
                    onClick={() => { setCurrent(i); setShowHint(false); }}
                    className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-label-xs font-bold border transition-colors ${
                      isCurrent
                        ? "bg-primary text-on-primary border-primary"
                        : isAnswered
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-surface-container-low text-on-surface-variant border-outline-variant"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant disabled:opacity-30 active:scale-95 transition-transform duration-100"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            {current < total - 1 ? (
              <button
                onClick={() => { setCurrent((c) => Math.min(total - 1, c + 1)); setShowHint(false); }}
                className="flex-1 h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100"
              >
                Suivant
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={() => setConfirmQuit(true)}
                disabled={submitting}
                className="flex-1 h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 disabled:opacity-40 active:scale-[0.98] transition-transform duration-100"
              >
                {submitting ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : "Terminer et corriger"}
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Modal de confirmation */}
      {confirmQuit && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmQuit(false)}></div>
          <div className="relative bg-surface rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">flag</span>
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-1">
              {current >= total - 1 ? "Terminer la session ?" : "Abandonner la session ?"}
            </h3>
            <p className="font-body-sm text-on-surface-variant mb-5">
              {current >= total - 1
                ? "Tes réponses seront corrigées et enregistrées dans ton historique."
                : `Tu as répondu à ${answeredCount} question${answeredCount > 1 ? "s" : ""} sur ${total}. Le chrono continue, ta progression sera perdue.`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmQuit(false)}
                className="flex-1 h-12 rounded-xl border border-outline-variant text-on-surface font-label-md font-semibold active:scale-[0.98] transition-transform duration-100"
              >
                {current >= total - 1 ? "Annuler" : "Continuer"}
              </button>
              <button
                onClick={() => submit()}
                disabled={submitting}
                className="flex-1 h-12 rounded-xl bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100"
              >
                {submitting ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : current >= total - 1 ? "Terminer" : "Abandonner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
