"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface Grade {
  id: number;
  name: string;
}

export default function TeacherDisciplinesPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Set<number>>(new Set());
  const [selectedGrades, setSelectedGrades] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/prof/subjects").then((r) => r.json()),
      fetch("/api/prof/grades").then((r) => r.json()),
      fetch("/api/subjects").then((r) => r.json()),
      fetch("/api/grades").then((r) => r.json()),
    ])
      .then(([me, mine, myGrades, allSub, allGrades]) => {
        if (!me.user || me.user.role !== "teacher") {
          router.replace("/connexion-edukora");
          return;
        }
        setSubjects(allSub.subjects ?? []);
        setGrades(allGrades.grades ?? []);
        setSelectedSubjects(new Set((mine.subjects ?? []).map((s: { subject_id: number }) => s.subject_id)));
        setSelectedGrades(new Set((myGrades.grades ?? []).map((g: { grade_id: number }) => g.grade_id)));
      })
      .finally(() => setLoading(false));
  }, [router]);

  function toggle(set: Set<number>, setter: (s: Set<number>) => void, id: number) {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
  }

  async function save() {
    setSaving(true);
    setError(null);
    setDone(false);
    try {
      const [res1, res2] = await Promise.all([
        fetch("/api/prof/subjects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject_ids: [...selectedSubjects] }),
        }),
        fetch("/api/prof/grades", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ grade_ids: [...selectedGrades] }),
        }),
      ]);
      const d1 = await res1.json().catch(() => null);
      const d2 = await res2.json().catch(() => null);
      if (!res1.ok || !res2.ok) {
        setError(d1?.error ?? d2?.error ?? "Erreur lors de l'enregistrement.");
        return;
      }
      setDone(true);
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 font-['Hanken_Grotesk']">
      <PageHeader
        title="Mes disciplines & niveaux"
        subtitle="Définis les matières et les niveaux que tu enseignes"
        backHref="/espace-prof"
      />

      <main className="px-margin-mobile md:px-margin-desktop pt-6 space-y-5 max-w-4xl mx-auto">
        <div className="bg-secondary-container/20 border border-secondary-container rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">school</span>
            <h2 className="font-title-md text-title-md text-on-surface font-bold">Comment ça marche ?</h2>
          </div>
          <p className="font-body-sm text-on-surface-variant leading-relaxed">
            En tant que professeur, tu crées des classes, des chapitres, des leçons, des quiz et des sujets
            uniquement pour tes matières et tes niveaux d&apos;enseignement. Tes élèves rejoignent tes classes
            avec le code d&apos;invitation. Tu peux en ajouter ou en retirer à tout moment.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        ) : (
          <>
            <section className="space-y-3">
              <h2 className="font-title-md text-title-md text-on-surface">Mes matières ({selectedSubjects.size})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map((s) => {
                  const active = selectedSubjects.has(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggle(selectedSubjects, setSelectedSubjects, s.id)}
                      className={`rounded-xl border-2 p-4 flex items-center gap-3 text-left transition-all duration-150 ${
                        active ? "border-primary bg-primary/10" : "border-outline-variant bg-surface-container-lowest"
                      }`}
                    >
                      <span
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ backgroundColor: s.color || "#7c4dff" }}
                      >
                        {s.icon || s.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-label-md font-semibold text-on-surface truncate">{s.name}</p>
                        <span className={`font-label-sm ${active ? "text-primary" : "text-on-surface-variant"}`}>
                          {active ? "Enseignée" : "Ajouter"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-title-md text-title-md text-on-surface pt-2 mt-6">Mes niveaux d&apos;enseignement ({selectedGrades.size})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {grades.map((gr) => {
                  const active = selectedGrades.has(gr.id);
                  return (
                    <button
                      key={gr.id}
                      type="button"
                      onClick={() => toggle(selectedGrades, setSelectedGrades, gr.id)}
                      className={`rounded-xl border-2 px-4 py-3 flex items-center gap-3 text-left transition-all duration-150 ${
                        active ? "border-primary bg-primary/10" : "border-outline-variant bg-surface-container-lowest"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary">{active ? "check_circle" : "radio_button_unchecked"}</span>
                      <span className="font-label-md font-semibold text-on-surface truncate">{gr.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {error && <p className="font-label-sm text-error">{error}</p>}
            {done && <p className="font-label-sm text-primary">Disciplines et niveaux enregistrés avec succès.</p>}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md px-6 py-3 rounded-full font-semibold active:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {saving && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
                <span className="material-symbols-outlined text-[18px]">check</span>
                Enregistrer
              </button>
              <button
                onClick={() => router.push("/espace-prof/classes")}
                className="h-12 px-6 rounded-full text-on-surface-variant hover:bg-surface-container-high font-label-sm"
              >
                Voir mes classes
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}