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

export default function ChapitrePage({ params: _params }: { params: Promise<{ subjectCode: string; gradeCode: string }> }) {
  const [chapters, setChapters] = useState<Chapter[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { subjectCode, gradeCode } = await _params;
      try {
        const r = await fetch(`/api/cours/${subjectCode}/${gradeCode}`);
        if (!r.ok) throw new Error();
        const d = await r.json();
        setChapters(d.chapters ?? []);
      } catch {
        setError(true);
      }
    };
    load();
  }, [_params]);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">error</span>
        <p className="font-bold text-on-surface">Chapitre introuvable</p>
        <Link href="/cours" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">Retour aux cours</Link>
      </div>
    );

  if (!chapters)
    return (
      <div className="bg-background min-h-screen pb-24 animate-pulse">
        <div className="h-8 w-64 bg-surface-container-high rounded-lg mx-margin-mobile md:mx-margin-desktop mt-stack-lg mb-8" />
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-outline-variant p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-3/5 bg-surface-container-high rounded mb-2" />
                <div className="h-3 w-1/2 bg-surface-container-high rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  const first = chapters[0];

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-24">
      <PageHeader
        title={first ? first.title : "Matière"}
        subtitle={first ? `${first.grade_code?.toUpperCase()} / ${first.subject_code}` : ""}
        backHref="/cours"
      />

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        {chapters.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <span className="material-symbols-outlined text-5xl text-outline">menu_book</span>
            <p className="font-bold text-on-surface">Aucun chapitre publié</p>
            <p className="text-on-surface-variant">Cette matière arrive bientôt sur Edukora.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {chapters.map((c) => (
              <Link
                key={c.id}
                href={`/cours/chapitres/${c.id}`}
                className="block bg-surface border border-outline-variant rounded-xl p-5 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">chapter_add</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-label-md font-semibold text-on-surface truncate">
                      {c.order_index}. {c.title}
                    </h3>
                    <p className="font-label-xs text-on-surface-variant truncate">{c.description}</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
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