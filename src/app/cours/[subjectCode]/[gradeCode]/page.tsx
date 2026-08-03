"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";

interface Chapter {
  id: number;
  code: string;
  title: string;
  description: string;
  order_index: number;
  subject_code: string;
  grade_code: string;
}

interface ChapterData {
  chapter: Chapter;
  lessons: { id: number; title: string; video_url: string; duration_min: number; difficulty: number; is_premium: number; progress: { completed: number; score: number } }[];
}

const DIFFICULTY_LABELS = { 1: "Facile", 2: "Moyen", 3: "Difficile" };
const DIFFICULTY_COLORS = { 1: "bg-impact-emerald", 2: "bg-warning-amber", 3: "bg-error" };

export default function ChapitrePage({ params }: { params: Promise<{ subjectCode: string; gradeCode: string }> }) {
  const [data, setData] = useState<ChapterData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    params.then(async (p) => {
      try {
        const r = await fetch(`/api/cours/${p.subjectCode}/${p.gradeCode}`);
        if (!r.ok) throw new Error();
        const d = await r.json();
        if (d.chapters?.length > 0) {
          setData({ chapter: d.chapters[0], lessons: [] });
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
        <p className="font-bold text-on-surface">Chapitre introuvable</p>
        <Link href="/cours" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">Retour aux cours</Link>
      </div>
    );

  if (!data)
    return <div className="min-h-screen bg-background" />;

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      <PageHeader
        title={data.chapter.title}
        subtitle={`${data.chapter.grade_code?.toUpperCase()} / ${data.chapter.subject_code}`}
        backHref="/cours"
      />

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <section className="bg-surface border border-outline-variant rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-bold">
              {data.chapter.grade_code} / {data.chapter.subject_code}
            </span>
            <span className="text-xs text-on-surface-variant">Chapitre {data.chapter.order_index}</span>
          </div>
          <p className="text-on-surface-variant">{data.chapter.description}</p>
        </section>

        <section>
          <h2 className="font-title-md font-semibold text-on-surface mb-4">Leçons</h2>
          <p className="text-on-surface-variant mb-4">Sélectionnez une leçon pour commencer</p>
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