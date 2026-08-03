"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Grade {
  id: number;
  code: string;
  name: string;
  cycle: string;
  order_index: number;
}

interface Subject {
  id: number;
  code: string;
  name: string;
  icon: string;
  color: string;
  coefficient_json: string;
}

interface CoursData {
  grades: Grade[];
  subjects: Subject[];
  userGrade: { id: number; code: string; name: string } | null;
  userSubscription: { plan: string; status: string; end_at: string } | null;
}

const CYCLE_COLORS: Record<string, string> = {
  college: "bg-blue-100 text-blue-800",
  lycee: "bg-purple-100 text-purple-800",
};

export default function CoursPage() {
  const [data, setData] = useState<CoursData | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/cours")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setData(d);
        if (d.userGrade && !selectedGrade) setSelectedGrade(d.userGrade.code);
      })
      .catch(() => setError(true));
  }, []);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Connecte-toi pour voir les cours</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  if (!data)
    return <div className="min-h-screen bg-background" />;

  const { grades, subjects, userGrade, userSubscription } = data;

  const filteredSubjects = selectedGrade
    ? subjects.filter((s) => {
        const coeff = JSON.parse(s.coefficient_json || "{}");
        return !!coeff[selectedGrade];
      })
    : subjects;

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      <PageHeader
        title="Cours & Programme MENAET"
        right={
          userSubscription && (
            <span className="bg-validation-amber/20 text-validation-amber text-xs font-bold px-2 py-1 rounded-full">
              {userSubscription.plan}
            </span>
          )
        }
      />

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        {userSubscription && (
          <div className="bg-primary-container/20 border border-primary/30 rounded-xl p-4 flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">workspace_premium</span>
            <div>
              <p className="font-label-md font-bold text-on-surface">Abonnement actif : {userSubscription.plan}</p>
              <p className="font-label-xs text-on-surface-variant">Expire le {new Date(userSubscription.end_at).toLocaleDateString("fr-FR")}</p>
            </div>
          </div>
        )}

        <section className="mb-8">
          <h2 className="font-title-md font-semibold text-on-surface mb-4">Mon niveau</h2>
          <div className="flex flex-wrap gap-2">
            {grades.map((g) => (
              <button
                key={g.code}
                onClick={() => setSelectedGrade(g.code)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedGrade === g.code
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
          {userGrade && !selectedGrade && (
            <p className="text-xs text-on-surface-variant mt-2">Niveau détecté : {userGrade.name}</p>
          )}
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-title-md font-semibold text-on-surface">Matières disponibles</h2>
            {selectedGrade && (
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${CYCLE_COLORS[grades.find(g => g.code === selectedGrade)?.cycle || "college"]}`}>
                {grades.find(g => g.code === selectedGrade)?.name}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSubjects.map((s) => (
              <Link
                key={s.code}
                href={`/cours/${s.code}/${selectedGrade || "term_s"}`}
                className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col items-center gap-3 hover:border-primary transition-colors group"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${s.color}20 text-[32px]`} style={{ color: s.color }}>
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3 className="font-title-md font-semibold text-on-surface text-center">{s.name}</h3>
                {selectedGrade && (
                  <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                    {JSON.parse(s.coefficient_json || "{}")[selectedGrade] || 0} coef
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>

        {userSubscription && (
          <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-3xl text-primary mb-2">school</span>
            <h3 className="font-title-md font-bold text-on-surface mb-2">Accès illimité aux leçons premium</h3>
            <p className="text-on-surface-variant mb-4">Tous les chapitres, exercices corrigés et vidéos sont accessibles avec ton abonnement.</p>
          </div>
        )}

        {!userSubscription && (
          <div className="bg-tertiary-container text-on-tertiary-container rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-3xl mb-2">workspace_premium</span>
            <h3 className="font-title-md font-bold mb-2">Débloque tout le programme MENAET</h3>
            <p className="text-on-tertiary-container/80 mb-4">Accède à toutes les leçons, exercices corrigés, vidéos et fiches de révision pour réussir ton BAC/BEPC.</p>
            <Link href="/abonnement" className="bg-on-tertiary-container text-tertiary-container font-bold px-6 py-3 rounded-xl inline-block">
              Voir les offres
            </Link>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/accueil-edukora">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-xs">Accueil</span>
        </Link>
        <div className="flex flex-col items-center justify-center text-primary font-bold p-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
          <span className="font-label-xs">Cours</span>
        </div>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/defis">
          <span className="material-symbols-outlined">swords</span>
          <span className="font-label-xs">Défis</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/profil">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-xs">Profil</span>
        </Link>
      </nav>
    </div>
  );
}