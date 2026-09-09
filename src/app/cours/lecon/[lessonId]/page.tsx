"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { EVENTS, trackEvent } from "@/lib/analytics";
import { downloadLessonPdf } from "@/lib/pdf-export";

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
  const [premiumRequired, setPremiumRequired] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    params.then(async (p) => {
      try {
        const r = await fetch(`/api/cours/lecons/${p.lessonId}`, { cache: "no-store" });
        if (r.status === 402) {
          setPremiumRequired(true);
          return;
        }
        if (r.status === 401) {
          setNeedsAuth(true);
          return;
        }
        if (!r.ok) throw new Error();
        const d = await r.json();
        if (d.lesson) {
          setLesson(d.lesson);
          trackEvent(EVENTS.lessonStarted, {
            lesson_id: String(p.lessonId),
            lesson_title: d.lesson.title,
            is_premium: d.lesson.is_premium,
          });
        }
      } catch {
        setError(true);
      }
    });
  }, [params]);

  async function markComplete() {
    if (!lesson || completing) return;
    setCompleting(true);
    try {
      const r = await fetch(`/api/cours/lecons/${lesson.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!r.ok) throw new Error();
      setLesson({ ...lesson, progress: { ...lesson.progress, completed: 1 } });
      trackEvent(EVENTS.lessonCompleted, {
        lesson_id: String(lesson.id),
        lesson_title: lesson.title,
        duration_min: lesson.duration_min,
      });
    } finally {
      setCompleting(false);
    }
  }

  if (premiumRequired)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-primary">lock</span>
        <h1 className="font-display text-2xl font-bold text-on-surface">Leçon Premium</h1>
        <p className="text-on-surface-variant max-w-sm">
          Cette leçon fait partie de l&apos;abonnement Premium. Passe à Premium pour débloquer tout le contenu, les quiz et le suivi de progression.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/plans-d-abonnement-edukora-1" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">Découvrir Premium</Link>
          <Link href="/cours" className="text-primary font-bold px-6 py-3 rounded-xl">Retour aux cours</Link>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">error</span>
        <p className="font-bold text-on-surface">Leçon introuvable</p>
        <Link href="/cours" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">Retour aux cours</Link>
      </div>
    );

  if (needsAuth)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-primary">login</span>
        <h1 className="font-display text-2xl font-bold text-on-surface">Connecte-toi pour accéder à cette leçon</h1>
        <p className="text-on-surface-variant max-w-sm">
          Crée un compte gratuitement ou connecte-toi pour suivre ta progression, puis passe à Premium pour débloquer toutes les leçons et les quiz.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/connexion-edukora" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">Se connecter</Link>
          <Link href="/plans-d-abonnement-edukora-1" className="text-primary font-bold px-6 py-3 rounded-xl">Découvrir Premium</Link>
        </div>
      </div>
    );

  if (!lesson)
    return (
      <div className="bg-background min-h-screen pb-24 animate-pulse">
        <div className="h-8 w-64 bg-surface-container-high rounded-lg mx-margin-mobile md:mx-margin-desktop mt-stack-lg mb-8" />
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop space-y-6">
          <div className="aspect-video rounded-xl bg-surface-container-high" />
          <div className="rounded-xl border border-outline-variant p-6 space-y-3">
            <div className="h-4 w-full bg-surface-container-high rounded" />
            <div className="h-4 w-5/6 bg-surface-container-high rounded" />
            <div className="h-4 w-2/3 bg-surface-container-high rounded" />
          </div>
        </div>
      </div>
    );

  const isCompleted = lesson.progress.completed === 1;

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      {lesson.video_url && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: lesson.title,
              description: lesson.content_md.slice(0, 150),
              thumbnailUrl: "https://edukora.net/icons/launcher-512.png",
              uploadDate: new Date().toISOString(),
              contentUrl: lesson.video_url,
              embedUrl: lesson.video_url,
            }),
          }}
        />
      )}
      <PageHeader
        title={lesson.title}
        backHref="/cours"
        right={
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${DIFFICULTY_COLORS[lesson.difficulty as 1|2|3]}`}>
              {DIFFICULTY_LABELS[lesson.difficulty as 1|2|3]}
            </span>
            <span className="text-xs text-on-surface-variant">{lesson.duration_min} min</span>
          </div>
        }
      />

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
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="font-title-md font-semibold text-on-surface">Contenu de la fiche</h3>
            <button
              type="button"
              onClick={() => downloadLessonPdf(lesson).catch(() => {})}
              className="shrink-0 inline-flex items-center gap-1.5 text-primary text-xs font-bold bg-primary/10 px-3 py-2 rounded-lg active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              Exporter PDF
            </button>
          </div>
          <MarkdownRenderer content={lesson.content_md} />
        </section>

        <section className="bg-surface border border-outline-variant rounded-xl p-6">
          <h3 className="font-title-md font-semibold text-on-surface mb-4">Vérifier mes acquis</h3>
          <p className="text-on-surface-variant mb-4">
            Teste ta compréhension avec des exercices interactifs.
          </p>
          <Link
            href={`/quiz`}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">quiz</span>
            Faire des exercices
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
            <button
              onClick={markComplete}
              disabled={completing}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-sm active:scale-95 transition-transform disabled:opacity-60 flex items-center gap-2"
            >
              {completing ? (
                <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-lg">check</span>
              )}
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