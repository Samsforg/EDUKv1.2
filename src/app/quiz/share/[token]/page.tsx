"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  points: number;
}

interface QuizInfo {
  id: number;
  title: string;
  level: string;
  subject_name: string;
  icon: string;
  color: string;
  author: string | null;
}

export default function QuizSharePage({ params }: { params: Promise<{ token: string }> }) {
  const [token, setToken] = useState("");
  const [quiz, setQuiz] = useState<QuizInfo | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then((p) => {
      setToken(p.token);
      fetch(`/api/quiz/share/${p.token}`)
        .then(async (r) => {
          if (!r.ok) throw new Error("not found");
          return r.json();
        })
        .then((d) => {
          setQuiz(d.quiz);
          setQuestions(d.questions);
          setTotal(d.questions.reduce((s: number, q: QuizQuestion) => s + q.points, 0));
        })
        .catch(() => setError("Quiz introuvable ou non publié."))
        .finally(() => setLoading(false));
    });
  }, [params]);

  function selectAnswer(qId: number, idx: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  }

  function handleSubmit() {
    const pts = 0;
    questions.forEach((q) => {
      const correctOptions = q.options.map((_, i) => i).filter((_, i) => {
        // The correct answer is stored in the DB but we don't send it to the client
        // For share quizzes, we validate server-side or show results after signup
        return false;
      });
    });
    // For public share, we count locally (correct answers are not sent to client)
    // We'll submit to an endpoint that validates
    setSubmitted(true);
    setScore(Object.keys(answers).length);
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-dvh bg-surface flex flex-col items-center justify-center p-6 text-center gap-4">
        <span className="material-symbols-outlined text-5xl text-outline">quiz</span>
        <p className="font-bold text-on-surface">{error || "Quiz introuvable"}</p>
        <Link href="/accueil-edukora" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const answered = Object.keys(answers).length;
  const pct = questions.length > 0 ? Math.round((answered / questions.length) * 100) : 0;

  return (
    <div className="min-h-dvh bg-surface text-on-surface">
      <header className="sticky top-0 z-40 bg-primary text-on-primary px-4 h-16 flex items-center gap-3 shadow-sm">
        <Link href="/accueil-edukora" className="p-2 -ml-2 rounded-full hover:bg-primary-container/20 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-headline text-lg font-bold truncate">{quiz.title}</h1>
          <p className="text-on-primary-container text-xs">{quiz.subject_name} · {quiz.level}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm shrink-0">
          {quiz.icon}
        </div>
      </header>

      <main className="px-4 md:px-8 py-6 max-w-2xl mx-auto pb-32">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-6 flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-on-surface-variant">{answered}/{questions.length} répondues</span>
              <span className="font-bold text-primary">{pct}%</span>
            </div>
            <div className="h-2 bg-outline-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {quiz.author && (
          <p className="text-xs text-on-surface-variant mb-4">Créé par {quiz.author}</p>
        )}

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
              <p className="font-semibold text-on-surface mb-3">
                <span className="text-primary mr-2">Q{i + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => selectAnswer(q.id, j)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      answers[q.id] === j
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-outline-variant bg-surface hover:border-primary/40 text-on-surface"
                    }`}
                  >
                    <span className="mr-2 font-bold">{String.fromCharCode(65 + j)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={answered < questions.length}
            className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto md:relative md:bottom-auto md:left-auto md:right-auto md:mt-6 w-full py-4 bg-primary text-on-primary font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Terminer le quiz ({answered}/{questions.length})
          </button>
        ) : (
          <div className="mt-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-primary">emoji_events</span>
            <h2 className="font-headline text-xl font-bold text-on-surface">Quiz terminé !</h2>
            <p className="text-on-surface-variant">
              Vous avez répondu à {answered} question{answered > 1 ? "s" : ""} sur {questions.length}.
            </p>
            <div className="bg-primary/10 rounded-xl p-4">
              <p className="text-3xl font-bold text-primary">{answered}/{questions.length}</p>
              <p className="text-sm text-on-surface-variant">questions répondues</p>
            </div>
            <div className="space-y-3 pt-4">
              <p className="text-sm text-on-surface-variant font-semibold">Inscrivez-vous pour sauvegarder votre score et débloquer plus de quiz !</p>
              <Link
                href={`/inscription-1-2-edukora?from=${encodeURIComponent(`/quiz/share/${token}`)}`}
                className="block w-full py-3 bg-primary text-on-primary font-bold rounded-xl active:scale-95 transition-transform"
              >
                Créer un compte gratuit
              </Link>
              <Link href="/connexion-edukora" className="block w-full py-3 border border-primary text-primary font-bold rounded-xl active:scale-95 transition-transform">
                J&apos;ai déjà un compte
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
