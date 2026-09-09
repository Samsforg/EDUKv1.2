"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { useChapterOffline } from "@/lib/offline-chapter";

interface Lesson {
  id: number;
  title: string;
  video_url: string;
  duration_min: number;
  difficulty: number;
  is_premium: number;
  locked?: boolean;
  progress: { completed: number; score: number };
}

const DIFFICULTY_LABELS = { 1: "Facile", 2: "Moyen", 3: "Difficile" };

export default function ChapitreLessonsPage() {
  const params = useParams<{ chapterId: string }>();
  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [error, setError] = useState(false);
  const offline = useChapterOffline();

  useEffect(() => {
    fetch(`/api/cours/chapitres/${params.chapterId}/lecons`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setLessons(d.lessons ?? []))
      .catch(() => setError(true));
  }, [params.chapterId]);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">error</span>
        <p className="font-bold text-on-surface">Impossible de charger les leçons</p>
        <Link href="/cours" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">Retour aux cours</Link>
      </div>
    );

  if (!lessons)
    return (
      <div className="bg-background min-h-screen pb-24 animate-pulse">
        <div className="h-8 w-56 bg-surface-container-high rounded-lg mx-margin-mobile md:mx-margin-desktop mt-stack-lg mb-8" />
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-outline-variant p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-surface-container-high rounded mb-2" />
                <div className="h-3 w-1/3 bg-surface-container-high rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      <PageHeader title="Leçons du chapitre" subtitle={`${lessons.length} leçon${lessons.length > 1 ? "s" : ""}`} backHref="/cours" />

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        {lessons.length > 0 && (
          <div className="mb-5 bg-surface-container-low border border-outline-variant rounded-xl p-4 flex items-center gap-4">
            <span className="material-symbols-outlined text-primary text-3xl">offline_bolt</span>
            <div className="flex-1 min-w-0">
              <p className="font-label-md font-bold text-on-surface">Mode hors-ligne</p>
              <p className="text-xs text-on-surface-variant">
                {offline.downloading
                  ? `Téléchargement ${offline.progress}%…`
                  : offline.error
                    ? offline.error
                    : "Télécharge les fiches de ce chapitre pour les réviser sans connexion."}
              </p>
            </div>
            <button
              type="button"
              disabled={offline.downloading}
              onClick={() => offline.downloadChapter(Number(params.chapterId), lessons.map((l) => ({ id: l.id, title: l.title })))}
              className={`shrink-0 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-transform ${
                offline.downloading ? "bg-surface-container-high text-on-surface-variant" : "bg-primary text-on-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{offline.downloading ? "progress_activity" : "download"}</span>
              {offline.downloading ? `${offline.progress}%` : "Télécharger"}
            </button>
          </div>
        )}
        {lessons.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <span className="material-symbols-outlined text-5xl text-outline">menu_book</span>
            <p className="font-bold text-on-surface">Aucune leçon publiée pour ce chapitre</p>
            <p className="text-on-surface-variant">Reviens plus tard : les leçons sont en cours de préparation.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lessons.map((l) => (
              <Link
                key={l.id}
                href={l.locked ? "/plans-d-abonnement-edukora-1" : `/cours/lecon/${l.id}`}
                className={`block bg-surface border border-outline-variant rounded-xl p-4 hover:border-primary transition-colors ${l.locked ? "opacity-90" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${l.locked ? "bg-tertiary-container/50 text-on-tertiary-container" : l.progress.completed === 1 ? "bg-impact-emerald/15 text-impact-emerald" : "bg-primary-container/20 text-primary"}`}>
                    <span className="material-symbols-outlined">{l.locked ? "lock" : l.progress.completed === 1 ? "check_circle" : "play_circle"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-label-md font-semibold text-on-surface truncate">{l.title}</h3>
                    <p className="font-label-xs text-on-surface-variant">
                      {l.locked
                        ? "Contenu Premium"
                        : `${DIFFICULTY_LABELS[l.difficulty as 1 | 2 | 3] ?? "—"} · ${l.duration_min} min${l.progress.completed === 1 ? " · Terminée" : ""}`}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant">{l.locked ? "workspace_premium" : "chevron_right"}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/cours">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-label-xs">Cours</span>
        </Link>
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