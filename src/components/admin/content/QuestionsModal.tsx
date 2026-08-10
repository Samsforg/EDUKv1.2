"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { QuestionsEditor, BLANK_QUESTION, type QuestionDraft } from "./QuestionsEditor";

export function QuestionsModal({
  open,
  onClose,
  onSaved,
  id,
  title,
  quiz,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  id: number;
  title: string;
  quiz?: boolean;
}) {
  const [questions, setQuestions] = useState<QuestionDraft[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/content/${quiz ? "quiz" : "paper"}?id=${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setQuestions(
        data.questions.length > 0
          ? data.questions.map((q: { question: string; options: string[]; answer_index: number; explanation: string | null; points: number }) => ({
              question: q.question,
              options: q.options,
              answerIndex: q.answer_index,
              explanation: q.explanation ?? "",
              points: q.points,
            }))
          : [{ ...BLANK_QUESTION }],
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (!questions) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz ? { quiz_id: id, questions } : { paper_id: id, questions }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      onSaved();
      onClose();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={`Questions — ${title}`}>
      {questions === null ? (
        <div className="text-center py-6">
          <button onClick={load} disabled={loading} className="flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50">
            {loading ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">quiz</span>}
            Charger les questions
          </button>
          {error && <p className="text-xs text-error mt-2">{error}</p>}
        </div>
      ) : (
        <div className="space-y-3">
          <QuestionsEditor questions={questions} onChange={setQuestions} />
          {error && <p className="text-xs text-error">{error}</p>}
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 bg-surface-container-high text-on-surface rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90">
              Annuler
            </button>
            <button onClick={save} disabled={busy} className="flex-1 flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50">
              {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
              Enregistrer les questions
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}