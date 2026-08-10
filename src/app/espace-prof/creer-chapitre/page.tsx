"use client";

import { Suspense, useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useRouter, useSearchParams } from "next/navigation";

interface Subject {
  id: number;
  code: string;
  name: string;
}

interface Grade {
  id: number;
  name: string;
}

interface Chapter {
  id: number;
  code: string;
  title: string;
  description: string;
  grade_id: number | null;
  grade_name: string | null;
  order_index: number;
  status: string;
}

function CreateChapterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [gradeId, setGradeId] = useState<string>("");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [orderIndex, setOrderIndex] = useState("");
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

    Promise.all([
      fetch("/api/subjects").then((r) => r.json()),
      fetch("/api/grades").then((r) => r.json()),
    ])
      .then(([sub, gr]) => {
        setSubjects(sub.subjects ?? []);
        setGrades(gr.grades ?? []);
        setSubjectId(sub.subjects?.[0]?.id ?? null);
        setGradeId(gr.grades?.[0]?.id?.toString() ?? "");
        if (editId) {
          fetch(`/api/prof/chapter/${editId}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
              if (d?.chapter) {
                setCode(d.chapter.code);
                setTitle(d.chapter.title);
                setDescription(d.chapter.description);
                setOrderIndex(d.chapter.order_index?.toString() ?? "");
                setSubjectId(d.chapter.subject_id);
                setGradeId(d.chapter.grade_id?.toString() ?? "");
              }
            });
        }
      })
      .finally(() => setLoaded(true));
  }, [router, editId]);

  async function save() {
    setError(null);
    if (!title.trim()) return setError("Donne un titre au chapitre.");
    if (!subjectId) return setError("Choisis une matière.");
    setSaving(true);

    const payload = {
      subject_id: subjectId,
      grade_id: gradeId ? Number(gradeId) : null,
      code,
      title,
      description,
      order_index: orderIndex ? Number(orderIndex) : undefined,
    };

    const res = editId
      ? await fetch(`/api/prof/chapter/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/prof/chapter", {
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
        <p className="font-headline-md text-on-surface">{editId ? "Chapitre modifié !" : "Chapitre soumis !"}</p>
        <p className="font-body-sm text-on-surface-variant text-center">
          Il sera visible des élèves une fois approuvé par l&apos;administration.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-28 font-['Hanken_Grotesk']">
      <PageHeader title={editId ? "Modifier le chapitre" : "Nouveau chapitre"} backHref="/espace-prof" />

      <main className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        {error && <p className="bg-error-container/20 text-error font-label-sm px-4 py-3 rounded-xl">{error}</p>}

        <section className="bg-surface border border-outline-variant rounded-xl p-4 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du chapitre (ex : Chapitre 1 : Nombres complexes)"
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={subjectId ?? ""}
              onChange={(e) => setSubjectId(Number(e.target.value))}
              className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <select
              value={gradeId}
              onChange={(e) => setGradeId(e.target.value)}
              className="rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
            >
              {grades.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code (ex : CH1)"
              className="rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
            <input
              value={orderIndex}
              onChange={(e) => setOrderIndex(e.target.value)}
              type="number"
              placeholder="Ordre (optionnel)"
              className="rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du chapitre (optionnel)"
            rows={3}
            className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary resize-none"
          />
        </section>

        <p className="font-body-sm text-on-surface-variant flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px] shrink-0">info</span>
          Ton chapitre sera soumis à l&apos;administration. Il n&apos;apparaîtra aux élèves qu&apos;après validation.
        </p>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={save}
            disabled={saving || !loaded}
            className="w-full h-12 rounded-full bg-primary text-on-primary font-label-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-transform duration-100"
          >
            {saving ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : editId ? <>Enregistrer <span className="material-symbols-outlined text-[18px]">save</span></> : <>Soumettre le chapitre <span className="material-symbols-outlined text-[18px]">rocket_launch</span></>}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CreateChapterPage />
    </Suspense>
  );
}
