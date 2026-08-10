"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { useRouter, useSearchParams } from "next/navigation";

interface Chapter {
  id: number;
  code: string;
  title: string;
  subject_name: string;
  subject_icon: string;
  subject_color: string;
  grade_name: string | null;
  status: string;
}

interface ExerciseDraft {
  type: string;
  question_md: string;
  answer_md: string;
  explanation_md: string;
  difficulty: number;
  points: number;
}

const EXERCISE_TYPES = ["qcm", "ouvert", "calcul", "dissertation", "vrai_faux"];
const BLANK_EXERCISE: ExerciseDraft = { type: "qcm", question_md: "", answer_md: "", explanation_md: "", difficulty: 1, points: 1 };

function CreateLessonPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const presetChapter = searchParams.get("chapter");

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterId, setChapterId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMd, setContentMd] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("15");
  const [difficulty, setDifficulty] = useState("1");
  const [isPremium, setIsPremium] = useState(false);
  const [exercises, setExercises] = useState<ExerciseDraft[]>([{ ...BLANK_EXERCISE }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "teacher") router.replace("/connexion-edukora");
      });

    fetch("/api/prof/chapter?selectable=1")
      .then((r) => r.json())
      .then((d) => {
        const list = d.chapters ?? [];
        setChapters(list);
        if (editId) {
          fetch(`/api/prof/lesson/${editId}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
              if (data?.lesson) {
                const l = data.lesson;
                setChapterId(l.chapter_id?.toString() ?? "");
                setTitle(l.title);
                setSummary(l.summary);
                setContentMd(l.content_md);
                setVideoUrl(l.video_url);
                setDuration(l.duration_min?.toString() ?? "15");
                setDifficulty(l.difficulty?.toString() ?? "1");
                setIsPremium(l.is_premium === 1);
                if (Array.isArray(data.exercises) && data.exercises.length > 0) {
                  setExercises(data.exercises.map((x: ExerciseDraft) => ({ ...x })));
                }
              }
            });
        } else if (presetChapter) {
          setChapterId(presetChapter);
        } else if (list.length > 0) {
          setChapterId(list[0].id.toString());
        }
      })
      .finally(() => setLoaded(true));
  }, [router, editId, presetChapter]);

  function updateExercise(i: number, patch: Partial<ExerciseDraft>) {
    setExercises((prev) => prev.map((x, xi) => (xi === i ? { ...x, ...patch } : x)));
  }

  async function save() {
    setError(null);
    if (!title.trim()) return setError("Donne un titre à la leçon.");
    if (!chapterId) return setError("Choisis un chapitre.");
    for (const ex of exercises) {
      if (!ex.question_md.trim()) return setError("Tous les exercices doivent avoir un énoncé.");
      if (!ex.answer_md.trim()) return setError("Tous les exercices doivent avoir une réponse.");
    }
    setSaving(true);

    const payload = {
      chapter_id: Number(chapterId),
      title,
      summary,
      content_md: contentMd,
      video_url: videoUrl,
      duration_min: Number(duration) || 15,
      difficulty: Number(difficulty) || 1,
      is_premium: isPremium ? 1 : 0,
      exercises,
    };

    const res = editId
      ? await fetch(`/api/prof/lesson/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/prof/lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    const data = await res.json();
    setSaving(false);
    if (data.error) return setError(data.error);
    setDone(true);
    setTimeout(() => router.push("/espace-prof"), 1200);
  }

  if (done) {
    return (
      <div className="min-h-dvh bg-surface flex flex-col items-center justify-center gap-4 px-6 font-['Hanken_Grotesk']">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-3xl">check</span>
        </div>
        <p className="font-headline-md text-on-surface">{editId ? "Leçon modifiée !" : "Leçon soumise !"}</p>
        <p className="font-body-sm text-on-surface-variant text-center">
          Elle sera visible des élèves une fois approuvée par l&apos;administration.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-28 font-['Hanken_Grotesk']">
      <PageHeader title={editId ? "Modifier la leçon" : "Nouvelle leçon"} backHref="/espace-prof" />

      <main className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        {error && <p className="bg-error-container/20 text-error font-label-sm px-4 py-3 rounded-xl">{error}</p>}

        <section className="bg-surface border border-outline-variant rounded-xl p-4 space-y-3">
          <select
            value={chapterId}
            onChange={(e) => setChapterId(e.target.value)}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
          >
            {chapters.length === 0 && <option value="">Aucun chapitre disponible</option>}
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.subject_name} · {c.title}{c.status === "pending" ? " (en attente)" : ""}
              </option>
            ))}
          </select>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la leçon (ex : Leçon 1 : Définition)"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary"
          />
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Résumé court (affiché aux élèves)"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type="number"
              min={1}
              placeholder="Durée (min)"
              className="rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="1">Difficulté : Facile</option>
              <option value="2">Difficulté : Moyen</option>
              <option value="3">Difficulté : Difficile</option>
            </select>
          </div>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Lien vidéo (YouTube, optionnel)"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
          <label className="flex items-center gap-2 font-body-sm text-on-surface cursor-pointer">
            <input type="checkbox" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} className="accent-[var(--color-primary,#0047ab)]" />
            Leçon premium
          </label>
          <textarea
            value={contentMd}
            onChange={(e) => setContentMd(e.target.value)}
            placeholder="Contenu de la leçon au format Markdown…"
            rows={8}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary resize-none font-mono text-xs leading-relaxed"
          />
        </section>

        <section className="bg-surface border border-outline-variant rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-label-md font-semibold text-on-surface">Exercices ({exercises.length})</h3>
            <button
              onClick={() => setExercises((prev) => [...prev, { ...BLANK_EXERCISE }])}
              className="flex items-center gap-1 text-primary font-label-sm font-semibold hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">add</span> Ajouter un exercice
            </button>
          </div>
          {exercises.map((ex, i) => (
            <div key={i} className="border border-outline-variant rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <select
                  value={ex.type}
                  onChange={(e) => updateExercise(i, { type: e.target.value })}
                  className="flex-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-sm text-on-surface focus:outline-none focus:border-primary"
                >
                  {EXERCISE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={ex.points}
                  onChange={(e) => updateExercise(i, { points: Math.max(1, Number(e.target.value) || 1) })}
                  className="w-16 rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-2 font-body-sm text-on-surface focus:outline-none focus:border-primary"
                  title="Points"
                />
                <select
                  value={ex.difficulty}
                  onChange={(e) => updateExercise(i, { difficulty: Number(e.target.value) })}
                  className="rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-2 font-body-sm text-on-surface focus:outline-none focus:border-primary"
                  title="Difficulté"
                >
                  <option value="1">Facile</option>
                  <option value="2">Moyen</option>
                  <option value="3">Difficile</option>
                </select>
                {exercises.length > 1 && (
                  <button onClick={() => setExercises((prev) => prev.filter((_, xi) => xi !== i))} className="text-error" aria-label="Supprimer l'exercice">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                )}
              </div>
              <textarea
                value={ex.question_md}
                onChange={(e) => updateExercise(i, { question_md: e.target.value })}
                placeholder="Énoncé de l'exercice (Markdown)"
                rows={2}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-sm text-on-surface focus:outline-none focus:border-primary resize-none"
              />
              <textarea
                value={ex.answer_md}
                onChange={(e) => updateExercise(i, { answer_md: e.target.value })}
                placeholder="Réponse corrigée (Markdown)"
                rows={2}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-sm text-on-surface focus:outline-none focus:border-primary resize-none"
              />
              <input
                value={ex.explanation_md}
                onChange={(e) => updateExercise(i, { explanation_md: e.target.value })}
                placeholder="Explication (optionnel)"
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          ))}
        </section>

        <p className="font-body-sm text-on-surface-variant flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px] shrink-0">info</span>
          Ta leçon sera soumise à l&apos;administration. Elle n&apos;apparaîtra aux élèves qu&apos;après validation.
        </p>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={save}
            disabled={saving || !loaded}
            className="w-full h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-transform duration-100"
          >
            {saving ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : editId ? <>Enregistrer <span className="material-symbols-outlined text-[18px]">save</span></> : <>Soumettre la leçon <span className="material-symbols-outlined text-[18px]">rocket_launch</span></>}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CreateLessonPage />
    </Suspense>
  );
}
