"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  posts_count: number;
  last_activity: string | null;
}

interface RecentPost {
  id: number;
  category_id: number;
  category_name: string;
  category_icon: string;
  category_color: string;
  title: string;
  content: string;
  author_name: string;
  votes: number;
  replies: number;
  user_voted: boolean;
  created_at: string;
}

export default function ForumPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recent, setRecent] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/forum")
      .then((r) => r.json())
      .then((d) => {
        setCategories(d.categories ?? []);
        setRecent(d.recent ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader title="Communauté" subtitle="Entraide entre élèves de Côte d'Ivoire" />

      <main className="px-margin-mobile pt-4 space-y-5">
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        ) : (
          <>
            {/* Catégories */}
            <section className="space-y-2">
              <h2 className="font-title-sm text-title-sm text-on-surface">Catégories</h2>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/forum/categorie/${c.id}`}
                    className="bg-surface border border-outline-variant rounded-xl p-3.5 flex flex-col gap-2 hover:bg-surface-container-low active:scale-[0.98] duration-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: c.color + "1A", color: c.color }}>
                        <span className="material-symbols-outlined text-[22px]">{c.icon}</span>
                      </span>
                      <span className="font-label-xs text-on-surface-variant">{c.posts_count} sujet{c.posts_count > 1 ? "s" : ""}</span>
                    </div>
                    <div>
                      <p className="font-label-md font-semibold text-on-surface">{c.name}</p>
                      <p className="font-label-xs text-on-surface-variant mt-0.5 line-clamp-2">{c.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Derniers sujets */}
            {recent.length > 0 && (
              <section className="space-y-2 pb-6">
                <h2 className="font-title-sm text-title-sm text-on-surface">Derniers sujets</h2>
                <div className="space-y-2">
                  {recent.map((p) => (
                    <Link
                      key={p.id}
                      href={`/forum/sujet/${p.id}`}
                      className="flex items-center gap-3 bg-surface border border-outline-variant rounded-xl p-3.5 hover:bg-surface-container-low active:scale-[0.98] duration-100"
                    >
                      <span className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: p.category_color + "1A", color: p.category_color }}>
                        <span className="material-symbols-outlined text-[22px]">{p.category_icon}</span>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-md text-on-surface truncate">{p.title}</p>
                        <p className="font-label-xs text-on-surface-variant truncate">{p.author_name} · {p.category_name} · {p.created_at}</p>
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
                </div>
              </section>
            )}
          </>
        )}
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
