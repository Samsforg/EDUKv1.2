"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_xp: number;
  votes: number;
  replies: number;
  user_voted: boolean;
  created_at: string;
}

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/forum/categories/${id}`)
      .then(async (r) => {
        if (!r.ok) {
          setError("Catégorie introuvable.");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) {
          setCategory(d.category);
          setPosts(d.posts ?? []);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/forum" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-title-md text-title-md text-on-surface truncate">{category?.name ?? "Catégorie"}</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">{posts.length} sujet{posts.length > 1 ? "s" : ""}</p>
        </div>
      </header>

      <main className="px-margin-mobile pt-4 space-y-2">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        )}

        {error && (
          <div className="text-center py-16 space-y-4">
            <p className="font-body-md text-on-surface-variant">{error}</p>
            <Link href="/forum" className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full">Retour au forum</Link>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant block">forum</span>
            <p className="font-body-md text-on-surface">Aucun sujet pour l&apos;instant</p>
            <p className="font-label-xs text-on-surface-variant">Sois le premier à lancer une discussion !</p>
          </div>
        )}

        {!loading && !error && posts.map((p) => (
          <Link
            key={p.id}
            href={`/forum/sujet/${p.id}`}
            className="flex items-center gap-3 bg-surface border border-outline-variant rounded-xl p-3.5 hover:bg-surface-container-low active:scale-[0.98] duration-100"
          >
            <span className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-label-md text-on-surface font-bold" style={{ backgroundColor: (category?.color ?? "#0047ab") + "1A", color: category?.color }}>
              {initials(p.author_name)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-label-md text-on-surface truncate">{p.title}</p>
              <p className="font-label-xs text-on-surface-variant truncate">{p.author_name} · {p.created_at} · {p.author_xp} XP</p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-primary font-label-xs">
                <span className="material-symbols-outlined text-[16px]" style={p.user_voted ? { fontVariationSettings: "'FILL' 1" } : {}}>arrow_drop_up</span>{p.votes}
              </span>
              <span className="flex items-center gap-0.5 text-on-surface-variant font-label-xs">
                <span className="material-symbols-outlined text-[16px]">chat_bubble</span>{p.replies}
              </span>
            </div>
          </Link>
        ))}
      </main>

      <Link
        href="/forum/nouveau"
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center z-50 active:scale-90 transition-transform hover:bg-primary/90"
        aria-label="Nouveau sujet"
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>edit</span>
      </Link>
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + second).toUpperCase();
}
