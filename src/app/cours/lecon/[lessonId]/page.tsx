"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Lesson {
  id: number;
  title: string;
  content_md: string;
  content_html: string;
  video_url: string;
  duration_min: number;
  difficulty: number;
  is_premium: number;
  progress: { completed: number; score: number };
}

interface LessonPageProps {
  params: Promise<{ lessonId: string }>;
}

const DIFFICULTY_LABELS = { 1: "Facile", 2: "Moyen", 3: "Difficile" };
const DIFFICULTY_COLORS = { 1: "bg-impact-emerald", 2: "bg-warning-amber", 3: "bg-error" };

function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return <p className="text-on-surface-variant">Contenu non disponible</p>;
  
  return (
    <div className="prose prose-sm prose-invert max-w-none text-on-surface">
      {content.split('\n\n').map((paragraph, i) => (
        <p key={i} className="mb-4">{paragraph}</p>
      ))}
    </div>
  );
}

export default function LessonPage({ params }: LessonPageProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    params.then(async (p) => {
      try {
        const r = await fetch(`/api/cours/chapitres/${p.lessonId}/lecons`);
        if (!r.ok) throw new Error();
        const d = await r.json();
        if (d.lessons?.length > 0) {
          setLesson(d.lessons[0]);
        }
      } catch {
        setError(true);
      }
    });
  }, []);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">error</span>
        <p className="font-bold text-on-surface">Leçon introuvable</p>
        <Link href="/cours" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">Retour aux cours</Link>
      </div>
    );

  if (!lesson)
    return <div className="min-h-screen bg-background" />;

  const isCompleted = lesson.progress.completed === 1;

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50 flex items-center justify-between px-margin-mobile h-16">
        <div className="flex items-center gap-3">
          <Link href="/cours" className="p-2 -ml-2 rounded-full text-primary hover:bg-surface-container-low active:scale-95 duration-100">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-title-md text-title-md font-bold text-primary truncate">{lesson.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${DIFFICULTY_COLORS[lesson.difficulty as 1|2|3]}`}>
            {DIFFICULTY_LABELS[lesson.difficulty as 1|2|3]}
          </span>
          <span className="text-xs text-on-surface-variant">{lesson.duration_min} min</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg space-y-6">
        {lesson.video_url && (
          <section className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-outline-variant">
            <iframe
              src={lesson.video_url}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </section>
        )}

        <section className="bg-surface border border-outline-variant rounded-xl p-6">
          <MarkdownRenderer content={lesson.content_md} />
        </section>

        <section className="bg-surface border border-outline-variant rounded-xl p-6">
          <h3 className="font-title-md font-semibold text-on-surface mb-4">Vérifier mes acquis</h3>
          <p className="text-on-surface-variant mb-4">
            Teste ta compréhension avec des exercices interactifs.
          </p>
          <Link
            href={`/exercices/lecon/${lesson.id}`}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">quiz</span>
            Faire les exercices
          </Link>
        </section>

        <section className="flex items-center justify-between bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
          <div>
            <p className="font-label-md font-bold text-on-surface">{isCompleted ? "Leçon terminée" : "En progression"}</p>
            <p className="text-xs text-on-surface-variant">
              {isCompleted ? "Score : " + lesson.progress.score + "/100" : "Continue ton travail !"}
            </p>
          </div>
          {!isCompleted && (
            <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm active:scale-95 transition-transform">
              Marquer comme terminée
            </button>
          )}
        </section>
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