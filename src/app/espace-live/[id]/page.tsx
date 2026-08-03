"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LiveDetail {
  id: number;
  title: string;
  subject_name: string;
  tagline: string;
  description: string;
  category: string;
  animator_name: string;
  animator_title: string;
  status: string;
  starts_at: string;
  duration_minutes: number;
  viewers: number;
  gradient: string;
  resources: { id: number; title: string; file_type: string; size_mb: number }[];
  moments: { id: number; time_label: string; label: string }[];
  questions: { id: number; question: string; answer: string | null; name: string }[];
  registrations: number;
  registered: boolean;
  chat_paused: boolean;
}

const OBJECTIFS: Record<string, string[]> = {
  Mathématiques: [
    "Maîtriser les propriétés fondamentales du chapitre visé.",
    "Savoir dresser un tableau de variations complet sans erreurs.",
    "Résoudre les équations et inéquations types du BAC.",
    "Tracer les courbes représentatives avec précision.",
  ],
  "Physique-Chimie": [
    "Comprendre les réactions acido-basiques pas à pas.",
    "Savoir interpréter une courbe de pH-métrie.",
    "Appliquer les formules dans les exercices du BAC.",
    "Éviter les pièges classiques de rédaction.",
  ],
  "SVT": [
    "Revoir les notions clés du programme en profondeur.",
    "Savoir analyser un document et rédiger une réponse structurée.",
    "Appliquer les méthodes aux exercices d'examen.",
    "Éviter les pièges classiques de rédaction.",
  ],
};

export default function LiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<LiveDetail | null>(null);
  const [error, setError] = useState(false);
  const [asked, setAsked] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/live/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true));
  }, [id]);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Connecte-toi pour voir cette session</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  if (!data) return <div className="min-h-screen bg-background" />;

  const isLive = data.status === "live";
  const isEnded = data.status === "ended";
  const objectifs = OBJECTIFS[data.subject_name] ?? OBJECTIFS[data.category] ?? [
    "Revoir les notions clés du programme en profondeur.",
    "Appliquer les méthodes aux exercices types d'examen.",
    "Poser tes questions en direct et obtenir des réponses.",
    "Repartir avec des ressources pour réviser.",
  ];

  const ask = () => {
    if (asked) return;
    fetch(`/api/live/${data!.id}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "Cette session sera-t-elle disponible en replay ?" }),
    }).then((r) => r.ok && setAsked(true));
  };

  const toggleRegister = async () => {
    if (!data) return;
    setRegistering(true);
    try {
      const r = await fetch(`/api/live/${data.id}/register`, { method: "POST" });
      if (r.ok) {
        const result = await r.json();
        setData({ ...data, registered: result.registered, registrations: result.registered ? data.registrations + 1 : data.registrations - 1 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      <header className="flex justify-between items-center px-margin-mobile h-16 bg-primary text-on-primary shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/espace-live" className="p-2 -ml-2 rounded-full hover:bg-primary-container/20 active:scale-95 duration-100">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-title-md text-title-md font-bold">Edukora Live</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-on-primary/30 text-on-primary-container font-bold text-sm">
          <span className="material-symbols-outlined text-[18px]">person</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop mt-6 space-y-6">
        <section className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-lg border border-outline-variant">
          <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient ?? "from-primary to-secondary"}`} />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-on-secondary" />
              </span>
              {isLive
                ? "En direct maintenant"
                : isEnded
                  ? "Replay disponible"
                  : "Live programmé"}
            </div>
            <h2 className="text-white text-2xl md:text-4xl font-extrabold mb-2 leading-tight">{data.title}</h2>
            <p className="text-white/80 text-sm md:text-lg mb-6 max-w-2xl mx-auto line-clamp-2">{data.description}</p>
{isLive ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/espace-live/${data.id}/direct`}
                    className="bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-3 active:scale-95 shadow-lg"
                  >
                    <span className="material-symbols-outlined">live_tv</span>
                    Rejoindre le direct
                  </Link>
                  <button
                    onClick={toggleRegister}
                    disabled={registering}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg ${
                      data.registered
                        ? "bg-error text-on-error hover:bg-error-container"
                        : "bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary"
                    }`}
                  >
                    <span className="material-symbols-outlined">{data.registered ? "check_circle" : "person_add"}</span>
                    {data.registered ? "Inscrit" : "S'inscrire"}
                  </button>
                </div>
              ) : isEnded ? (
              <Link
                href={`/replays/${data.id}`}
                className="bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-3 active:scale-95 shadow-lg"
              >
                <span className="material-symbols-outlined">play_arrow</span>
                Voir le replay
              </Link>
) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={toggleRegister}
                    disabled={registering}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg ${
                      data.registered
                        ? "bg-error text-on-error hover:bg-error-container"
                        : "bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary"
                    }`}
                  >
                    <span className="material-symbols-outlined">{data.registered ? "check_circle" : "person_add"}</span>
                    {data.registered ? "Inscrit" : "S'inscrire"}
                  </button>
                  <button
                    onClick={ask}
                    className="bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-3 active:scale-95 shadow-lg"
                  >
                    <span className="material-symbols-outlined">{asked ? "check_circle" : "notifications"}</span>
                    {asked ? "Rappel activé !" : "Me rappeler la session"}
                  </button>
                </div>
              )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h3 className="font-title-md font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">target</span>
              Objectifs d'apprentissage
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectifs.map((o) => (
                <li key={o} className="flex gap-3 items-start p-3 bg-surface-container rounded-lg">
                  <span className="material-symbols-outlined text-tertiary">check_circle</span>
                  <span className="text-sm text-on-surface-variant">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 bg-primary text-on-primary rounded-xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-on-primary/20 flex items-center justify-center text-2xl font-black">
                  {data.animator_name.slice(0, 1)}
                </div>
                <div>
                  <h4 className="font-title-md font-bold">{data.animator_name}</h4>
                  <p className="text-on-primary/80 text-sm">{data.animator_title}</p>
                </div>
              </div>
              <p className="text-sm text-on-primary/90 leading-relaxed italic">
                {isLive
                  ? `La session est en cours, ${data.viewers.toLocaleString("fr-FR")} élèves suivent le direct.`
                  : isEnded
                    ? "Le replay est disponible avec les moments clés et les ressources de la session."
                    : "Prépare tes questions et tes supports : la session arrive bientôt."}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-on-primary/20 flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {data.duration_minutes} min
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">group</span>
                {Math.max(1, data.viewers).toLocaleString("fr-FR")}+ élèves
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-title-md font-semibold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">folder_open</span>
              Documents à télécharger
            </h3>
            <span className="text-xs text-on-surface-variant italic">Prépare-les avant la session !</span>
          </div>
          {data.resources.length === 0 && (
            <p className="text-sm text-on-surface-variant">Aucun document pour le moment.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.resources.map((r) => (
              <div key={r.id} className="group flex items-center justify-between p-4 bg-surface border border-outline-variant rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-error-container rounded-lg flex items-center justify-center text-error">
                    <span className="material-symbols-outlined">picture_as_pdf</span>
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface text-sm">{r.title}</p>
                    <p className="text-xs text-on-surface-variant">{r.size_mb.toLocaleString("fr-FR")} MB • {r.file_type}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 bg-tertiary-container text-on-tertiary-container p-6 rounded-2xl">
          <span className="material-symbols-outlined text-4xl shrink-0">help</span>
          <div className="flex-1">
            <h4 className="font-title-md font-bold">Pose tes questions en direct</h4>
            <p className="text-sm text-on-tertiary-container/80">
              Les questions prioritaires reçoivent une réponse du professeur à la fin de chaque démonstration.
            </p>
          </div>
          <Link
            href={isLive ? `/espace-live/${data.id}/direct` : "#"}
            onClick={(e) => {
              if (!isLive) {
                e.preventDefault();
                ask();
              }
            }}
            className="w-full md:w-auto bg-on-tertiary-container text-tertiary-container font-bold px-6 py-3 rounded-lg text-center shadow-lg active:scale-95 transition-transform"
          >
            {isLive ? "Rejoindre le chat" : "Poser ma question"}
          </Link>
        </div>
      </main>
    </div>
  );
}
