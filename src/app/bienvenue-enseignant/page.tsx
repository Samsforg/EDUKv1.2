"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: "welcome", icon: "waving_hand", title: "Bienvenue" },
  { id: "disciplines", icon: "school", title: "Disciplines" },
  { id: "first-chapter", icon: "menu_book", title: "Premier chapitre" },
  { id: "go", icon: "rocket_launch", title: "C'est parti" },
] as const;

const QUICK_SUBJECTS = [
  { code: "MATHS", name: "Mathématiques", icon: "calculate", color: "#7c4dff" },
  { code: "PC", name: "Physique-Chimie", icon: "science", color: "#00bfa5" },
  { code: "FRANCAIS", name: "Français", icon: "history_edu", color: "#ff6d00" },
  { code: "SVT", name: "SVT", icon: "menu_book", color: "#2e7d32" },
  { code: "HG", name: "Histoire-Géo", icon: "public", color: "#c62828" },
  { code: "ANGLAIS", name: "Anglais", icon: "translate", color: "#1565c0" },
];

const QUICK_GRADES = [
  "6ème", "5ème", "4ème", "3ème",
  "Seconde", "Première", "Terminale",
];

export default function TeacherOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profName, setProfName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterSubject, setChapterSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "teacher") {
          router.replace("/connexion-expert-edukora");
          return;
        }
        setProfName(d.user.first_name ?? "");
        setChecking(false);
      })
      .catch(() => router.replace("/connexion-expert-edukora"));
  }, [router]);

  function toggleSubject(code: string) {
    setSelectedSubjects((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code]
    );
  }

  function toggleGrade(g: string) {
    setSelectedGrades((prev) =>
      prev.includes(g) ? prev.filter((s) => s !== g) : [...prev, g]
    );
  }

  async function saveDisciplines() {
    if (selectedSubjects.length === 0 || selectedGrades.length === 0) return;
    setLoading(true);
    try {
      for (const code of selectedSubjects) {
        const subj = QUICK_SUBJECTS.find((s) => s.code === code);
        await fetch("/api/prof/subjects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject_code: code, name: subj?.name ?? code }),
        });
      }
      for (const grade of selectedGrades) {
        await fetch("/api/prof/grades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: grade }),
        });
      }
    } catch {
      // silencieux
    } finally {
      setLoading(false);
      setStep(2);
    }
  }

  async function saveFirstChapter() {
    if (!chapterTitle.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/prof/chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: chapterTitle.trim(),
          subject_code: chapterSubject || selectedSubjects[0] || "MATHS",
        }),
      });
    } catch {
      // silencieux
    } finally {
      setLoading(false);
      setStep(3);
    }
  }

  if (checking) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
      </div>
    );
  }

  const first = profName.split(" ")[0] ?? "";
  const inputClass = "w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline";

  return (
    <div className="min-h-dvh bg-surface text-on-surface flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-outline-variant">
        <div className="relative h-32 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary-container opacity-70" />
          <div className="relative z-10 p-6 flex flex-col justify-end h-full">
            <h2 className="font-headline text-2xl font-bold text-on-primary">
              {step === 0 ? `Bienvenue, Prof. ${first}` : step === 1 ? "Vos disciplines" : step === 2 ? "Votre premier chapitre" : "Tout est prêt !"}
            </h2>
          </div>
        </div>

        <div className="flex p-6 pb-0 space-x-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-secondary-container" : "bg-surface-container-highest"}`} />
          ))}
        </div>

        <div className="p-6">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-headline text-xl font-semibold text-primary">Bienvenue sur Edukora Pro</h3>
                <p className="text-on-surface-variant text-sm">
                  Commençons par configurer votre espace enseignant en quelques étapes simples.
                </p>
              </div>
              <div className="bg-surface-container rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">school</span>
                  <span className="text-sm font-semibold text-on-surface">1. Choisir vos matières et niveaux</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">menu_book</span>
                  <span className="text-sm font-semibold text-on-surface">2. Créer votre premier chapitre</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">quiz</span>
                  <span className="text-sm font-semibold text-on-surface">3. Créer un quiz pour vos élèves</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-4 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Configurer mon espace
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <Link href="/espace-prof" className="block text-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
                Passer et aller à l&apos;espace prof
              </Link>
            </div>
          )}

          {/* Step 1: Disciplines */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-headline text-xl font-semibold text-primary">Matières</h3>
                <p className="text-on-surface-variant text-sm">Sélectionnez les matières que vous enseignez.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_SUBJECTS.map((s) => (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => toggleSubject(s.code)}
                    className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-2 transition-all ${
                      selectedSubjects.includes(s.code)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-outline-variant text-on-surface hover:border-primary/40"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                    {s.name}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                <h3 className="font-headline text-lg font-semibold text-primary">Niveaux</h3>
                <p className="text-on-surface-variant text-sm">Quelles classes enseignez-vous ?</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_GRADES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGrade(g)}
                    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                      selectedGrades.includes(g)
                        ? "border-secondary bg-secondary/10 text-secondary"
                        : "border-outline-variant text-on-surface hover:border-secondary/40"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(0)} className="flex-1 py-3 rounded-lg font-bold border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-all">
                  Retour
                </button>
                <button
                  type="button"
                  disabled={selectedSubjects.length === 0 || selectedGrades.length === 0 || loading}
                  onClick={saveDisciplines}
                  className="flex-[2] py-3 rounded-lg font-bold bg-secondary-container text-on-secondary-container flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transition-all"
                >
                  {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : (
                    <>Enregistrer <span className="material-symbols-outlined">arrow_forward</span></>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: First chapter */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-headline text-xl font-semibold text-primary">Créez votre premier chapitre</h3>
                <p className="text-on-surface-variant text-sm">Les chapitres regroupent vos leçons par thème.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Titre du chapitre</label>
                <input
                  className={inputClass}
                  placeholder="Ex: Les équations du 2nd degré"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant">Matière</label>
                <select
                  className={inputClass}
                  value={chapterSubject}
                  onChange={(e) => setChapterSubject(e.target.value)}
                >
                  {selectedSubjects.map((code) => {
                    const s = QUICK_SUBJECTS.find((q) => q.code === code);
                    return <option key={code} value={code}>{s?.name ?? code}</option>;
                  })}
                </select>
              </div>
              <div className="bg-surface-container rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary shrink-0">lightbulb</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Le chapitre sera soumis à validation par l&apos;administration avant d&apos;être visible des élèves. Vous pourrez y ajouter des leçons en attendant.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-lg font-bold border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-all">
                  Retour
                </button>
                <button
                  type="button"
                  disabled={!chapterTitle.trim() || loading}
                  onClick={saveFirstChapter}
                  className="flex-[2] py-3 rounded-lg font-bold bg-secondary text-on-secondary flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 transition-all"
                >
                  {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : (
                    <>Créer le chapitre <span className="material-symbols-outlined">arrow_forward</span></>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Ready */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-1 text-center">
                <h3 className="font-headline text-xl font-semibold text-primary">Votre espace est prêt !</h3>
                <p className="text-on-surface-variant text-sm">Vous pouvez commencer à créer du contenu pour vos élèves.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/espace-prof/creer-lecon" className="flex flex-col items-center gap-2 p-4 bg-surface-container rounded-xl border border-outline-variant hover:border-primary/40 transition-all">
                  <span className="material-symbols-outlined text-2xl text-primary">menu_book</span>
                  <span className="text-xs font-semibold text-on-surface">Créer une leçon</span>
                </Link>
                <Link href="/espace-prof/creer-quiz" className="flex flex-col items-center gap-2 p-4 bg-surface-container rounded-xl border border-outline-variant hover:border-primary/40 transition-all">
                  <span className="material-symbols-outlined text-2xl text-secondary">quiz</span>
                  <span className="text-xs font-semibold text-on-surface">Créer un quiz</span>
                </Link>
                <Link href="/espace-prof/lives" className="flex flex-col items-center gap-2 p-4 bg-surface-container rounded-xl border border-outline-variant hover:border-primary/40 transition-all">
                  <span className="material-symbols-outlined text-2xl text-red-500">live_tv</span>
                  <span className="text-xs font-semibold text-on-surface">Programmer un live</span>
                </Link>
                <Link href="/espace-prof/classes" className="flex flex-col items-center gap-2 p-4 bg-surface-container rounded-xl border border-outline-variant hover:border-primary/40 transition-all">
                  <span className="material-symbols-outlined text-2xl text-tertiary">groups</span>
                  <span className="text-xs font-semibold text-on-surface">Mes classes</span>
                </Link>
              </div>
              <Link
                href="/espace-prof"
                className="w-full py-4 bg-primary text-on-primary font-bold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Accéder à mon espace prof
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
