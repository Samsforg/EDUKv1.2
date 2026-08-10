"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { ConfirmButton } from "./ConfirmButton";
import { ApproveButton } from "../ApproveButton";
import type { AdminChapter, AdminLesson, GradeRow } from "@/lib/admin-content";

const EXERCISE_TYPES = ["qcm", "ouvert", "calcul", "dissertation", "vrai_faux"] as const;

const inputCls = "bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary";

function StatusBadge({ status }: { status: string }) {
  if (status === "approved") return null;
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-xs font-semibold bg-warning-container text-on-warning-container shrink-0">
        <span className="material-symbols-outlined text-xs">schedule</span>
        En attente
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-xs font-semibold bg-error-container text-on-error-container shrink-0">
      <span className="material-symbols-outlined text-xs">block</span>
      Rejeté
    </span>
  );
}

interface ExerciseDraft {
  type: string;
  question_md: string;
  answer_md: string;
  explanation_md: string;
  difficulty: number;
  points: number;
}

const BLANK_EXERCISE: ExerciseDraft = { type: "qcm", question_md: "", answer_md: "", explanation_md: "", difficulty: 1, points: 1 };

function ChapterModal({
  open,
  onClose,
  onSaved,
  mode,
  chapter,
  subjectId,
  grades,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  mode: "create" | "edit";
  chapter?: AdminChapter;
  subjectId: number;
  grades: GradeRow[];
}) {
  const [code, setCode] = useState(chapter?.code ?? "");
  const [title, setTitle] = useState(chapter?.title ?? "");
  const [description, setDescription] = useState(chapter?.description ?? "");
  const [gradeId, setGradeId] = useState(chapter?.grade_id?.toString() ?? (grades[0]?.id.toString() ?? ""));
  const [orderIndex, setOrderIndex] = useState(chapter?.order_index?.toString() ?? "0");
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
      const payload = {
        code,
        title,
        description,
        grade_id: gradeId ? Number(gradeId) : null,
        order_index: Number(orderIndex) || 0,
        position: Number(orderIndex) || 0,
      };
      const res =
        mode === "create"
          ? await fetch("/api/admin/content/chapter", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payload, subject_id: subjectId }),
            })
          : await fetch(`/api/admin/content/chapter/${chapter?.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
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
    <Modal open={open} onClose={onClose} title={mode === "create" ? "Nouveau chapitre" : "Modifier le chapitre"}>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du chapitre" className={`w-full ${inputCls}`} />
        <div className="grid grid-cols-2 gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code (ex. CH1)" className={inputCls} />
          <select value={gradeId} onChange={(e) => setGradeId(e.target.value)} className={inputCls} required>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <input value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)} type="number" placeholder="Ordre" className={`w-full ${inputCls}`} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (facultatif)" rows={2} className={`w-full ${inputCls}`} />
        {error && <p className="text-xs text-error">{error}</p>}
        <button type="submit" disabled={busy} className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
          {mode === "create" ? "Créer le chapitre" : "Enregistrer"}
        </button>
      </form>
    </Modal>
  );
}

function LessonModal({
  open,
  onClose,
  onSaved,
  mode,
  lesson,
  chapterId,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  mode: "create" | "edit";
  lesson?: AdminLesson;
  chapterId: number;
}) {
  const [title, setTitle] = useState(lesson?.title ?? "");
  const [summary, setSummary] = useState(lesson?.summary ?? "");
  const [contentMd, setContentMd] = useState(lesson?.content_md ?? "");
  const [videoUrl, setVideoUrl] = useState(lesson?.video_url ?? "");
  const [duration, setDuration] = useState(lesson?.duration_min?.toString() ?? "15");
  const [difficulty, setDifficulty] = useState(lesson?.difficulty?.toString() ?? "1");
  const [isPremium, setIsPremium] = useState(lesson ? lesson.is_premium === 1 : false);
  const [position, setPosition] = useState(lesson?.position?.toString() ?? "0");
  const [exercises, setExercises] = useState<ExerciseDraft[]>(lesson?.exercises.map((x) => ({ type: x.type, question_md: x.question_md, answer_md: x.answer_md, explanation_md: x.explanation_md, difficulty: x.difficulty, points: x.points })) ?? []);
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
      const payload = {
        title,
        summary,
        content_md: contentMd,
        video_url: videoUrl,
        duration_min: Number(duration) || 15,
        difficulty: Number(difficulty) || 1,
        is_premium: isPremium ? 1 : 0,
        position: Number(position) || 0,
      };
      let lessonId: number;
      if (mode === "create") {
        const res = await fetch("/api/admin/content/lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, chapter_id: chapterId }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Erreur");
          return;
        }
        lessonId = data.id;
      } else {
        const res = await fetch(`/api/admin/content/lesson/${lesson?.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Erreur");
          return;
        }
        lessonId = lesson!.id;
      }
      const res = await fetch("/api/admin/content/exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson_id: lessonId, exercises }),
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
    <Modal open={open} onClose={onClose} title={mode === "create" ? "Nouvelle leçon" : "Modifier la leçon"}>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de la leçon" className={`w-full ${inputCls}`} />
        <input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Résumé (court)" className={`w-full ${inputCls}`} />
        <textarea value={contentMd} onChange={(e) => setContentMd(e.target.value)} placeholder="Contenu au format Markdown" rows={8} className={`w-full ${inputCls} font-mono text-xs leading-relaxed`} />
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Lien vidéo (YouTube, optionnel)" className={`w-full ${inputCls}`} />
        <div className="grid grid-cols-2 gap-2">
          <input type="number" min={1} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Durée (min)" className={inputCls} />
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={inputCls}>
            <option value="1">Difficulté : Facile</option>
            <option value="2">Difficulté : Moyen</option>
            <option value="3">Difficulté : Difficile</option>
          </select>
          <input type="number" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" className={inputCls} />
          <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
            <input type="checkbox" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} className="accent-[var(--color-primary,#0047ab)]" />
            Leçon premium
          </label>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-label-xs font-semibold text-on-surface-variant">Exercices ({exercises.length})</p>
            <button
              type="button"
              onClick={() => setExercises([...exercises, { ...BLANK_EXERCISE }])}
              className="flex items-center gap-1 text-primary text-label-xs font-semibold hover:underline"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Ajouter un exercice
            </button>
          </div>
          <div className="space-y-2">
            {exercises.map((ex, i) => (
              <div key={i} className="border border-outline-variant rounded-lg p-2 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <select
                    value={ex.type}
                    onChange={(e) => setExercises(exercises.map((x, j) => (j === i ? { ...x, type: e.target.value } : x)))}
                    className={inputCls + " flex-1"}
                  >
                    {EXERCISE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={ex.points}
                    onChange={(e) => setExercises(exercises.map((x, j) => (j === i ? { ...x, points: Math.max(1, Number(e.target.value) || 1) } : x)))}
                    className={inputCls + " w-16"}
                    title="Points"
                  />
                  <select
                    value={ex.difficulty}
                    onChange={(e) => setExercises(exercises.map((x, j) => (j === i ? { ...x, difficulty: Number(e.target.value) } : x)))}
                    className={inputCls + " w-24"}
                    title="Difficulté"
                  >
                    <option value="1">Facile</option>
                    <option value="2">Moyen</option>
                    <option value="3">Difficile</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setExercises(exercises.filter((_, j) => j !== i))}
                    className="text-on-surface-variant hover:text-error"
                    title="Supprimer l'exercice"
                    aria-label="Supprimer l'exercice"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
                <textarea
                  value={ex.question_md}
                  onChange={(e) => setExercises(exercises.map((x, j) => (j === i ? { ...x, question_md: e.target.value } : x)))}
                  placeholder="Énoncé (Markdown)"
                  rows={1}
                  className={inputCls + " w-full"}
                />
                <textarea
                  value={ex.answer_md}
                  onChange={(e) => setExercises(exercises.map((x, j) => (j === i ? { ...x, answer_md: e.target.value } : x)))}
                  placeholder="Réponse (Markdown)"
                  rows={1}
                  className={inputCls + " w-full"}
                />
                <input
                  value={ex.explanation_md}
                  onChange={(e) => setExercises(exercises.map((x, j) => (j === i ? { ...x, explanation_md: e.target.value } : x)))}
                  placeholder="Explication (facultatif)"
                  className={inputCls + " w-full"}
                />
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-xs text-error">{error}</p>}
        <button type="submit" disabled={busy} className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
          {mode === "create" ? "Créer la leçon" : "Enregistrer"}
        </button>
      </form>
    </Modal>
  );
}

export function ChapterList({ subjectId, initialChapters, grades }: { subjectId: number; initialChapters: AdminChapter[]; grades: GradeRow[] }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(initialChapters[0]?.id ?? null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<AdminChapter | null>(null);
  const [lessonFor, setLessonFor] = useState<{ chapter: AdminChapter; lesson?: AdminLesson } | null>(null);

  function refresh() {
    router.refresh();
  }

  async function removeChapter(chapter: AdminChapter) {
    if (chapter.status === "pending" || chapter.status === "rejected") {
      const res = await fetch(`/api/admin/courses/${chapter.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "chapter", status: "rejected" }),
      });
      if (res.ok) refresh();
      return;
    }
    const res = await fetch(`/api/admin/content/chapter/${chapter.id}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  async function removeLesson(lesson: AdminLesson) {
    if (lesson.status === "pending" || lesson.status === "rejected") {
      const res = await fetch(`/api/admin/courses/${lesson.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "lesson", status: "rejected" }),
      });
      if (res.ok) refresh();
      return;
    }
    const res = await fetch(`/api/admin/content/lesson/${lesson.id}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg font-bold text-on-surface">Chapitres et leçons ({initialChapters.length})</h3>
        <button onClick={() => setCreateOpen(true)} className="flex items-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Ajouter un chapitre
        </button>
      </div>
      {initialChapters.length === 0 ? (
        <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center text-on-surface-variant">
          Aucun chapitre dans cette matière.
        </div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
          {initialChapters.map((c) => (
            <div key={c.id}>
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors">
                <button onClick={() => setExpanded(expanded === c.id ? null : c.id)} className="text-on-surface-variant shrink-0" title="Déplier" aria-label="Déplier">
                  <span className="material-symbols-outlined text-sm transition-transform" style={{ transform: expanded === c.id ? "rotate(90deg)" : undefined }}>
                    chevron_right
                  </span>
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-on-surface truncate flex items-center gap-2">
                    {c.title}
                    <StatusBadge status={c.status} />
                  </p>
                  <p className="text-xs text-on-surface-variant truncate">
                    {c.code} • {c.grade_name ?? "Toutes classes"} • {c.lessons.length} leçon{c.lessons.length > 1 ? "s" : ""}
                  </p>
                </div>
                {c.status !== "approved" && <ApproveButton kind="chapter" id={c.id} />}
                <button onClick={() => setLessonFor({ chapter: c })} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Ajouter une leçon">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Leçon
                </button>
                <button onClick={() => setEditing(c)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Modifier le chapitre">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Modifier
                </button>
                <ConfirmButton label="Supprimer" onConfirm={() => removeChapter(c)} title="Supprimer le chapitre et toutes ses leçons" />
              </div>
              {expanded === c.id && c.lessons.length > 0 && (
                <div className="bg-surface-container/40 divide-y divide-outline-variant/60">
                  {c.lessons.map((l) => (
                    <div key={l.id} className="flex items-center gap-3 px-4 py-2.5 pl-12 hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined text-sm text-on-surface-variant">{l.is_premium === 1 ? "workspace_premium" : "article"}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-on-surface truncate flex items-center gap-2">
                          {l.title}
                          <StatusBadge status={l.status} />
                        </p>
                        <p className="text-xs text-on-surface-variant truncate">
                          {l.duration_min} min • niveau {l.difficulty} • {l.position}{l.is_premium === 1 ? " • premium" : ""} • {l.exercises.length} exercice{l.exercises.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      {l.status !== "approved" && <ApproveButton kind="lesson" id={l.id} />}
                      <button onClick={() => setLessonFor({ chapter: c, lesson: l })} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Modifier la leçon">
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Modifier
                      </button>
                      <ConfirmButton label="Supprimer" onConfirm={() => removeLesson(l)} title="Supprimer la leçon et ses exercices" />
                    </div>
                  ))}
                </div>
              )}
              {expanded === c.id && c.lessons.length === 0 && (
                <p className="px-12 py-3 text-xs text-on-surface-variant bg-surface-container/40">Aucune leçon — cliquez sur « Leçon » pour en ajouter une.</p>
              )}
            </div>
          ))}
        </div>
      )}

      <ChapterModal open={createOpen} onClose={() => setCreateOpen(false)} onSaved={refresh} mode="create" subjectId={subjectId} grades={grades} />
      <ChapterModal open={!!editing} onClose={() => setEditing(null)} onSaved={refresh} mode="edit" chapter={editing ?? undefined} subjectId={subjectId} grades={grades} />
      <LessonModal open={!!lessonFor} onClose={() => setLessonFor(null)} onSaved={refresh} mode={lessonFor?.lesson ? "edit" : "create"} lesson={lessonFor?.lesson} chapterId={lessonFor?.chapter.id ?? 0} />
    </section>
  );
}