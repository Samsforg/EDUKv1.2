"use client";

export interface QuestionDraft {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  points: number;
}

export const BLANK_QUESTION: QuestionDraft = {
  question: "",
  options: ["", "", "", ""],
  answerIndex: 0,
  explanation: "",
  points: 1,
};

export function QuestionsEditor({
  questions,
  onChange,
}: {
  questions: QuestionDraft[];
  onChange: (q: QuestionDraft[]) => void;
}) {
  function update(index: number, patch: Partial<QuestionDraft>) {
    onChange(questions.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  }
  function updateOption(qIndex: number, oIndex: number, value: string) {
    onChange(
      questions.map((q, i) => {
        if (i !== qIndex) return q;
        const options = q.options.map((o, j) => (j === oIndex ? value : o));
        return { ...q, options };
      }),
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <div key={qi} className="border border-outline-variant rounded-xl p-3 space-y-2">
          <div className="flex items-start gap-2">
            <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container text-xs font-bold flex items-center justify-center shrink-0 mt-1">
              {qi + 1}
            </span>
            <textarea
              value={q.question}
              onChange={(e) => update(qi, { question: e.target.value })}
              placeholder="Énoncé de la question"
              rows={2}
              className="flex-1 bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary"
            />
            <button
              onClick={() => onChange(questions.filter((_, i) => i !== qi))}
              className="text-on-surface-variant hover:text-error shrink-0 mt-1"
              title="Supprimer cette question"
              aria-label={`Supprimer la question ${qi + 1}`}
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
          <div className="pl-8 grid gap-1.5">
            {q.options.map((o, oi) => (
              <div key={oi} className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => update(qi, { answerIndex: oi })}
                  className={
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border " +
                    (q.answerIndex === oi
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container-high text-on-surface-variant border-outline-variant hover:border-primary")
                  }
                  title="Cocher comme bonne réponse"
                >
                  {q.answerIndex === oi ? "✓" : String.fromCharCode(65 + oi)}
                </button>
                <input
                  value={o}
                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                  className="flex-1 bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-1.5 border border-outline-variant focus:outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
          <div className="pl-5 grid grid-cols-2 gap-2">
            <input
              value={q.explanation}
              onChange={(e) => update(qi, { explanation: e.target.value })}
              placeholder="Explication (facultatif)"
              className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-1.5 border border-outline-variant focus:outline-none focus:border-primary"
            />
            <input
              type="number"
              min={1}
              value={q.points}
              onChange={(e) => update(qi, { points: Math.max(1, Number(e.target.value) || 1) })}
              placeholder="Points"
              className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-1.5 border border-outline-variant focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => onChange([...questions, { ...BLANK_QUESTION }])}
        className="w-full flex items-center justify-center gap-1 border border-dashed border-primary text-primary rounded-xl py-2 text-label-sm font-semibold hover:bg-primary-container/30 transition-colors"
      >
        <span className="material-symbols-outlined text-sm">add</span>
        Ajouter une question
      </button>
    </div>
  );
}