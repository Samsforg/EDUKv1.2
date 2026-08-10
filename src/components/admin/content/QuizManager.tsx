"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { ConfirmButton } from "./ConfirmButton";
import { QuestionsModal } from "./QuestionsModal";
import type { AdminQuiz } from "@/lib/admin-content";

function QuizModal({
  open,
  onClose,
  onSaved,
  mode,
  quiz,
  subjectId,
  chapters,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: (id?: number, title?: string) => void;
  mode: "create" | "edit";
  quiz?: AdminQuiz;
  subjectId: number;
  chapters: { id: number; title: string }[];
}) {
  const [title, setTitle] = useState(quiz?.title ?? "");
  const [level, setLevel] = useState(quiz?.level ?? "Terminale");
  const [chapterId, setChapterId] = useState(quiz?.chapter_id?.toString() ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Titre requis");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const payload = { title, level, chapter_id: chapterId ? Number(chapterId) : null };
      const res =
        mode === "create"
          ? await fetch("/api/admin/content/quiz", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payload, subject_id: subjectId }),
            })
          : await fetch(`/api/admin/content/quiz/${quiz?.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      onSaved(mode === "create" ? data.id : undefined, title);
      onClose();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={mode === "create" ? "Nouveau quiz" : "Modifier le quiz"}>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du quiz" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
        <div className="grid grid-cols-2 gap-2">
          <input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Niveau (ex. Terminale)" className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          <select value={chapterId} onChange={(e) => setChapterId(e.target.value)} className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary">
            <option value="">Chapitre —</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        <button type="submit" disabled={busy} className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
          {mode === "create" ? "Créer le quiz" : "Enregistrer"}
        </button>
      </form>
    </Modal>
  );
}

export function QuizManager({ subjectId, initialQuizzes, chapters }: { subjectId: number; initialQuizzes: AdminQuiz[]; chapters: { id: number; title: string }[] }) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<AdminQuiz | null>(null);
  const [questionsFor, setQuestionsFor] = useState<AdminQuiz | null>(null);

  function refresh() {
    router.refresh();
  }

  async function remove(quiz: AdminQuiz) {
    const res = await fetch(`/api/admin/content/quiz/${quiz.id}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg font-bold text-on-surface">Quiz ({initialQuizzes.length})</h3>
        <button onClick={() => setCreateOpen(true)} className="flex items-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Ajouter un quiz
        </button>
      </div>
      {initialQuizzes.length === 0 ? (
        <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center text-on-surface-variant">
          Aucun quiz dans cette matière.
        </div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
          {initialQuizzes.map((q) => (
            <div key={q.id} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-primary">quiz</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-on-surface truncate">{q.title}</p>
                <p className="text-xs text-on-surface-variant truncate">
                  {q.chapter_title ?? "Sans chapitre"} • {q.level} • {q.question_count} question{q.question_count > 1 ? "s" : ""} • {q.attempts} tentative{q.attempts > 1 ? "s" : ""}
                  {q.avg_percent !== null && ` • ${q.avg_percent}% moy.`}
                </p>
              </div>
              {q.status !== "approved" && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-tertiary-container text-on-tertiary-container shrink-0">en attente</span>
              )}
              <button onClick={() => setQuestionsFor(q)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Éditer les questions">
                <span className="material-symbols-outlined text-sm">help</span>
                Questions
              </button>
              <button onClick={() => setEditing(q)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Modifier">
                <span className="material-symbols-outlined text-sm">edit</span>
                Modifier
              </button>
              <ConfirmButton label="Supprimer" onConfirm={() => remove(q)} title="Supprimer le quiz, ses questions et les résultats associés" />
            </div>
          ))}
        </div>
      )}

      <QuizModal open={createOpen} onClose={() => setCreateOpen(false)} onSaved={(id, title) => {
        if (id) setQuestionsFor({ id, title: title ?? "", level: "", status: "approved", chapter_id: null, chapter_title: null, question_count: 0, attempts: 0, avg_percent: null });
      }} mode="create" subjectId={subjectId} chapters={chapters} />
      <QuizModal open={!!editing} onClose={() => setEditing(null)} onSaved={() => {}} mode="edit" quiz={editing ?? undefined} subjectId={subjectId} chapters={chapters} />
      <QuestionsModal open={!!questionsFor} onClose={() => setQuestionsFor(null)} onSaved={refresh} id={questionsFor?.id ?? 0} title={questionsFor?.title ?? ""} quiz />
    </section>
  );
}