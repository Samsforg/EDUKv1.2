"use client";
// Téléchargement hors-ligne d'un chapitre complet : met les fiches en cache SW.
import { useState } from "react";

interface LessonLite {
  id: number;
  title: string;
}

export function useChapterOffline() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function downloadChapter(chapterId: number, lessons: LessonLite[]) {
    if (typeof caches === "undefined" || !("serviceWorker" in navigator)) {
      setError("Hors-ligne non supporté sur ce navigateur.");
      return;
    }
    setDownloading(true);
    setProgress(0);
    setError(null);
    try {
      const cache = await caches.open("edukora-edu");
      let done = 0;
      for (const l of lessons) {
        // Pré-charge la page leçon + son API (le SW staleWhileRevalidate les met en cache)
        await Promise.allSettled([
          fetch(`/cours/lecon/${l.id}`, { cache: "no-cache" }).then((r) => { if (r.ok) return cache.add(`/cours/lecon/${l.id}`); }),
          fetch(`/api/cours/lecons/${l.id}`, { credentials: "include" }).then((r) => { if (r.ok) return cache.add(`/api/cours/lecons/${l.id}`); }),
        ]);
        done++;
        setProgress(Math.round((done / lessons.length) * 100));
      }
      localStorage.setItem(`chapter-offline-${chapterId}`, JSON.stringify({ at: Date.now(), count: lessons.length }));
      setDownloaded(true);
    } catch {
      setError("Téléchargement interrompu. Réessayez avec une meilleure connexion.");
    } finally {
      setDownloading(false);
    }
  }

  return { downloading, progress, downloaded, error, downloadChapter };
}
