"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";

interface ChapterOption {
  id: number;
  code: string;
  title: string;
  subject_name: string;
  grade_name: string | null;
  status: string;
}

interface SubjectOption {
  id: number;
  code: string;
  name: string;
}

interface GradeOption {
  id: number;
  code: string;
  name: string;
}

interface ExerciseDraft {
  type: string;
  question_md: string;
  answer_md: string;
  explanation_md: string;
}

const EXERCISE_TYPES = ["qcm", "ouvert", "calcul", "dissertation", "vrai_faux"];
const BLANK_EXERCISE: ExerciseDraft = { type: "qcm", question_md: "", answer_md: "", explanation_md: "" };

const STEPS = ["Chapitre", "Leçon", "Exercices"];

function WizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Étape 1 — chapitre
  const [chapters, setChapters] = useState<ChapterOption[]>([]);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [grades, setGrades] = useState<GradeOption[]>([]);
  const [chapterMode, setChapterMode] = useState<"existing" | "new">("existing");
  const [chapterId, setChapterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [chapterCode, setChapterCode] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDesc, setChapterDesc] = useState("");

  // Étape 2 — leçon
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMd, setContentMd] = useState("");
  const [duration, setDuration] = useState("15");
  const [difficulty, setDifficulty] = useState("1");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  // Étape 3 — exercices
  const [exercises, setExercises] = useState<ExerciseDraft[]>([{ ...BLANK_EXERCISE }]);
  const [aiExercisesMd, setAiExercisesMd] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "teacher") router.replace("/connexion-edukora");
      });
    Promise.all([
      fetch("/api/prof/chapter?selectable=1").then((r) => r.json()).catch(() => ({})),
      fetch("/api/subjects").then((r) => r.json()).catch(() => ({})),
      fetch("/api/grades").then((r) => r.json()).catch(() => ({})),
    ])
      .then(([ch, sub, gr]) => {
        const list = ch.chapters ?? [];
        setChapters(list);
        setSubjects(sub.subjects ?? []);
        setGrades(gr.grades ?? []);
        if (list.length > 0) setChapterId(String(list[0].id));
        else setChapterMode("new");
      })
      .finally(() => setLoaded(true));
  }, [router]);

  async function continueFromChapter() {
    setError(null);
    if (chapterMode === "existing") {
      if (!chapterId) return setError("Choisis un chapitre.");
      setStep(1);
      return;
    }
    if (!chapterTitle.trim()) return setError("Donne un titre au chapitre.");
    if (!subjectId) return setError("Choisis une matière.");
    if (!gradeId) return setError("Choisis un niveau.");
    setSaving(true);
    try {
      const res = await fetch("/api/prof/chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject_id: Number(subjectId),
          grade_id: Number(gradeId),
          code: chapterCode.trim() || undefined,
          title: chapterTitle.trim(),
          description: chapterDesc.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error ?? "Création du chapitre impossible.");
      setChapterId(String(data.id));
      setStep(1);
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  async function generateDraft(kind: "course" | "exercises") {
    if (!chapterId) return;
    setAiLoading(true);
    setAiNotice(null);
    setError(null);
    try {
      const res = await fetch("/api/prof/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterId: Number(chapterId), kind }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error ?? "Génération IA impossible.");
      if (kind === "course") {
        setTitle(data.draft.title ?? "");
        setSummary(data.draft.summary ?? "");
        setContentMd(data.draft.content_md ?? "");
        setAiNotice("Brouillon IA inséré : relis et adapte le contenu avant l'envoi.");
      } else {
        setAiExercisesMd(data.draft.content_md ?? "");
        setAiNotice("Suggestion IA ci-dessous : recopie les énoncés dans l'éditeur d'exercices.");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setAiLoading(false);
    }
  }

  function updateExercise(i: number, patch: Partial<ExerciseDraft>) {
    setExercises((prev) => prev.map((x, xi) => (xi === i ? { ...x, ...patch } : x)));
  }

  async function submit() {
    setError(null);
    if (!title.trim()) return setError("Donne un titre à la leçon.");
    if (!contentMd.trim()) return setError("Le contenu de la leçon est vide.");
    const cleanExercises = exercises
      .filter((ex) => ex.question_md.trim() && ex.answer_md.trim())
      .map((ex) => ({ ...ex, difficulty: 1, points: 1 }));
    setSaving(true);
    try {
      const res = await fetch("/api/prof/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapter_id: Number(chapterId),
          title: title.trim(),
          summary: summary.trim(),
          content_md: contentMd,
          duration_min: Number(duration) || 15,
          difficulty: Number(difficulty) || 1,
          exercises: cleanExercises,
        }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error ?? "Envoi impossible.");
      setDone(true);
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary";

  if (done) {
    return (
      <div className="min-h-dvh bg-surface flex flex-col items-center justify-center gap-4 px-6 font-['Hanken_Grotesk']">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-3xl">check</span>
        </div>
        <p className="font-headline-md text-on-surface">Leçon soumise !</p>
        <p className="font-body-sm text-on-surface-variant text-center">
          Elle sera visible des élèves une fois approuvée par l&apos;administration.
        </p>
        <Link href="/espace-prof" className="mt-2 h-12 px-8 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2">
          Retour à mon espace
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-28 font-['Hanken_Grotesk']">
      <PageHeader title="Assistant de création" backHref="/espace-prof" />

      <main className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i < step ? "bg-primary text-on-primary" : i === step ? "border-2 border-primary text-primary" : "border border-outline-variant text-on-surface-variant"}`}>
                {i < step ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
              </div>
              <span className={`font-label-sm ${i === step ? "text-on-surface font-semibold" : "text-on-surface-variant"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-outline-variant" />}
            </div>
          ))}
        </div>

        {error && <p className="bg-error-container/20 text-error font-label-sm px-4 py-3 rounded-xl">{error}</p>}
        {aiNotice && <p className="bg-secondary-container/20 text-on-surface font-label-sm px-4 py-3 rounded-xl flex items-start gap-2"><span className="material-symbols-outlined text-[18px] shrink-0">auto_awesome</span>{aiNotice}</p>}

        {step === 0 && (
          <section className="bg-surface border border-outline-variant rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setChapterMode("existing")} className={`rounded-xl border-2 px-4 py-3 font-label-sm font-semibold ${chapterMode === "existing" ? "border-primary bg-primary/10 text-primary" : "border-outline-variant text-on-surface"}`}>
                Chapitre existant
              </button>
              <button type="button" onClick={() => setChapterMode("new")} className={`rounded-xl border-2 px-4 py-3 font-label-sm font-semibold ${chapterMode === "new" ? "border-primary bg-primary/10 text-primary" : "border-outline-variant text-on-surface"}`}>
                Nouveau chapitre
              </button>
            </div>
            {chapterMode === "existing" ? (
              <select value={chapterId} onChange={(e) => setChapterId(e.target.value)} className={inputClass}>
                {chapters.length === 0 && <option value="">Aucun chapitre disponible</option>}
                {chapters.map((c) => (
                  <option key={c.id} value={c.id}>{c.subject_name} · {c.title}{c.status === "pending" ? " (en attente)" : ""}</option>
                ))}
              </select>
            ) : (
              <>
                <input value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} placeholder="Titre du chapitre" className={inputClass} />
                <div className="grid grid-cols-2 gap-3">
                  <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className={inputClass}>
                    <option value="">Matière…</option>
                    {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  <select value={gradeId} onChange={(e) => setGradeId(e.target.value)} className={inputClass}>
                    <option value="">Niveau…</option>
                    {grades.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input value={chapterCode} onChange={(e) => setChapterCode(e.target.value)} placeholder="Code (ex : CH1)" className={inputClass} />
                  <input value={chapterDesc} onChange={(e) => setChapterDesc(e.target.value)} placeholder="Description (optionnel)" className={inputClass} />
                </div>
              </>
            )}
            <button onClick={continueFromChapter} disabled={saving || !loaded} className="w-full h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold disabled:opacity-50">
              {saving ? "Enregistrement…" : "Continuer vers la leçon"}
            </button>
          </section>
        )}

        {step === 1 && (
          <section className="bg-surface border border-outline-variant rounded-xl p-4 space-y-3">
            <button
              type="button"
              onClick={() => generateDraft("course")}
              disabled={aiLoading}
              className="w-full h-11 rounded-xl border-2 border-dashed border-primary/50 text-primary font-label-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[18px] ${aiLoading ? "animate-spin" : ""}`}>{aiLoading ? "progress_activity" : "auto_awesome"}</span>
              {aiLoading ? "Génération du brouillon…" : "Générer un brouillon avec l'IA"}
            </button>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre de la leçon" className={inputClass} />
            <input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Résumé court" className={inputClass} />
            <div className="grid grid-cols-2 gap-3">
              <input value={duration} onChange={(e) => setDuration(e.target.value)} type="number" min={1} placeholder="Durée (min)" className={inputClass} />
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={inputClass}>
                <option value="1">Facile</option>
                <option value="2">Moyen</option>
                <option value="3">Difficile</option>
              </select>
            </div>
            <textarea value={contentMd} onChange={(e) => setContentMd(e.target.value)} placeholder="Contenu de la leçon (Markdown)…" rows={10} className={`${inputClass} resize-none font-mono text-xs leading-relaxed`} />
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setStep(0)} className="h-12 rounded-full border border-outline-variant font-label-md font-semibold">Retour</button>
              <button onClick={() => { if (!title.trim() || !contentMd.trim()) { setError("Titre et contenu requis pour continuer."); return; } setError(null); setStep(2); }} className="h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold">Continuer</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="bg-surface border border-outline-variant rounded-xl p-4 space-y-3">
            <button
              type="button"
              onClick={() => generateDraft("exercises")}
              disabled={aiLoading}
              className="w-full h-11 rounded-xl border-2 border-dashed border-primary/50 text-primary font-label-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[18px] ${aiLoading ? "animate-spin" : ""}`}>{aiLoading ? "progress_activity" : "auto_awesome"}</span>
              {aiLoading ? "Génération…" : "Suggérer des exercices avec l'IA"}
            </button>
            {aiExercisesMd && (
              <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3 max-h-48 overflow-y-auto">
                <p className="font-label-xs font-bold text-on-surface-variant mb-2">SUGGESTION IA (à recopier ci-dessous)</p>
                <pre className="whitespace-pre-wrap font-body-sm text-on-surface text-xs">{aiExercisesMd}</pre>
              </div>
            )}
            {exercises.map((ex, i) => (
              <div key={i} className="border border-outline-variant rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <select value={ex.type} onChange={(e) => updateExercise(i, { type: e.target.value })} className="flex-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-sm text-on-surface">
                    {EXERCISE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {exercises.length > 1 && (
                    <button onClick={() => setExercises((prev) => prev.filter((_, xi) => xi !== i))} className="text-error" aria-label="Supprimer l'exercice">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  )}
                </div>
                <textarea value={ex.question_md} onChange={(e) => updateExercise(i, { question_md: e.target.value })} placeholder="Énoncé (Markdown)" rows={2} className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-sm text-on-surface resize-none" />
                <textarea value={ex.answer_md} onChange={(e) => updateExercise(i, { answer_md: e.target.value })} placeholder="Réponse corrigée" rows={2} className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-sm text-on-surface resize-none" />
                <input value={ex.explanation_md} onChange={(e) => updateExercise(i, { explanation_md: e.target.value })} placeholder="Explication (optionnel)" className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-sm text-on-surface" />
              </div>
            ))}
            <button onClick={() => setExercises((prev) => [...prev, { ...BLANK_EXERCISE }])} className="flex items-center gap-1 text-primary font-label-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">add</span> Ajouter un exercice
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setStep(1)} className="h-12 rounded-full border border-outline-variant font-label-md font-semibold">Retour</button>
              <button onClick={submit} disabled={saving} className="h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold disabled:opacity-50">
                {saving ? "Envoi…" : "Soumettre"}
              </button>
            </div>
            <p className="font-body-sm text-on-surface-variant flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0">info</span>
              La leçon sera soumise à l&apos;administration et visible des élèves après validation.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <WizardPage />
    </Suspense>
  );
}
