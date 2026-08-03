"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";

interface Subject {
  id: number;
  name: string;
}

interface Series {
  id: number;
  code: string;
  name: string;
}

interface QDraft {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const EMPTY_Q: QDraft = { question: "", options: ["", "", "", ""], answerIndex: 0, explanation: "" };

export default function CreatePaperPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [category, setCategory] = useState<"BAC" | "BEPC">("BAC");
  const [year, setYear] = useState(2024);
  const [duration, setDuration] = useState(120);
  const [seriesId, setSeriesId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QDraft[]>([{ ...EMPTY_Q }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "teacher") router.replace("/connexion-edukora");
      });
    fetch("/api/subjects")
      .then((r) => r.json())
      .then((d) => {
        setSubjects(d.subjects ?? []);
        setSubjectId((d.subjects?.[0]?.id) ?? null);
      });
    fetch("/api/series")
      .then((r) => r.json())
      .then((d) => {
        setSeries(d.series ?? []);
        setSeriesId((d.series?.[0]?.id) ?? null);
      });
  }, [router]);

  function updateQuestion(i: number, patch: Partial<QDraft>) {
    setQuestions((prev) => prev.map((q, qi) => (qi === i ? { ...q, ...patch } : q)));
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, { ...EMPTY_Q }]);
  }

  function removeQuestion(i: number) {
    setQuestions((prev) => (prev.length > 1 ? prev.filter((_, qi) => qi !== i) : prev));
  }

  async function save() {
    setError(null);
    if (!title.trim()) return setError("Donne un titre au sujet.");
    if (!subjectId) return setError("Choisis une matière.");
    for (const q of questions) {
      if (!q.question.trim()) return setError("Toutes les questions doivent avoir un énoncé.");
      if (q.options.some((o) => !o.trim())) return setError("Toutes les options doivent être remplies.");
    }
    setSaving(true);
    const res = await fetch("/api/prof/paper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subject_id: subjectId, category, year, duration_minutes: duration, series_id: seriesId, questions }),
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
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-secondary text-3xl">check</span>
        </div>
        <p className="font-headline-md text-on-surface">Sujet publié !</p>
        <p className="font-body-sm text-on-surface-variant">Tes élèves peuvent déjà s&apos;entraîner dessus dans le Simulateur.</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-28 font-['Hanken_Grotesk']">
      <PageHeader title="Nouveau sujet d'examen" backHref="/espace-prof" />

      <main className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        {error && <p className="bg-error-container/20 text-error font-label-sm px-4 py-3 rounded-xl">{error}</p>}

        <section className="bg-surface border border-outline-variant rounded-xl p-4 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du sujet (ex : BAC Maths 2024 — Série C)"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-3">
            <select value={category} onChange={(e) => setCategory(e.target.value as "BAC" | "BEPC")} className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary">
              <option value="BAC">BAC</option>
              <option value="BEPC">BEPC</option>
            </select>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary">
              {[2024, 2023, 2022, 2025, 2026].sort((a, b) => b - a).map((y) => (
                <option key={y} value={y}>Session {y}</option>
              ))}
            </select>
            <select value={subjectId ?? ""} onChange={(e) => setSubjectId(Number(e.target.value))} className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary">
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <select value={seriesId ?? ""} onChange={(e) => setSeriesId(Number(e.target.value))} className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary">
              {series.map((s) => (
                <option key={s.id} value={s.id}>{s.code} — {s.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="font-label-sm text-on-surface-variant">Durée : {duration} min</span>
            <input type="range" min={10} max={240} step={10} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-40 accent-[var(--md-primary)]" />
          </div>
        </section>

        {questions.map((q, i) => (
          <section key={i} className="bg-surface border border-outline-variant rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-md font-semibold text-secondary">Question {i + 1}</span>
              {questions.length > 1 && (
                <button onClick={() => removeQuestion(i)} className="text-error font-label-sm hover:opacity-80">Supprimer</button>
              )}
            </div>
            <textarea
              value={q.question}
              onChange={(e) => updateQuestion(i, { question: e.target.value })}
              placeholder="Énoncé de la question…"
              rows={2}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary resize-none"
            />
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuestion(i, { answerIndex: oi })}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${q.answerIndex === oi ? "border-secondary" : "border-outline-variant"}`}
                    aria-label={`Bonne réponse : option ${oi + 1}`}
                  >
                    {q.answerIndex === oi && <div className="w-3 h-3 rounded-full bg-secondary"></div>}
                  </button>
                  <input
                    value={opt}
                    onChange={(e) => updateQuestion(i, { options: q.options.map((o, x) => (x === oi ? e.target.value : o)) })}
                    placeholder={`Option ${oi + 1}${q.answerIndex === oi ? " (bonne réponse)" : ""}`}
                    className="flex-1 rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2.5 font-body-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
            </div>
            <input
              value={q.explanation}
              onChange={(e) => updateQuestion(i, { explanation: e.target.value })}
              placeholder="Explication du corrigé (optionnel)"
              className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-2.5 font-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </section>
        ))}

        <button
          onClick={addQuestion}
          className="w-full h-12 rounded-full border-2 border-dashed border-outline-variant text-on-surface-variant font-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-100"
        >
          <span className="material-symbols-outlined text-[18px]">add</span> Ajouter une question
        </button>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={save}
            disabled={saving}
            className="w-full h-12 rounded-full bg-secondary text-on-secondary font-label-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-transform duration-100"
          >
            {saving ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <>Publier le sujet <span className="material-symbols-outlined text-[18px]">rocket_launch</span></>}
          </button>
        </div>
      </footer>
    </div>
  );
}
