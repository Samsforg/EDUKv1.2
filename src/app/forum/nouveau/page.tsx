"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  posts_count: number;
}

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/forum")
      .then((r) => r.json())
      .then((d) => {
        const cats = d.categories ?? [];
        setCategories(cats);
        if (cats.length > 0) setCategoryId(cats[0].id);
      });
  }, []);

  async function submit() {
    if (sending || categoryId === null) return;
    setError(null);
    if (title.trim().length < 4) return setError("Le titre doit faire au moins 4 caractères.");
    if (content.trim().length < 10) return setError("Le contenu doit faire au moins 10 caractères.");
    setSending(true);
    const r = await fetch("/api/forum/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_id: categoryId, title: title.trim(), content: content.trim() }),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok) {
      router.push(`/forum/sujet/${d.id}`);
    } else {
      setError(d.error ?? "Une erreur est survenue.");
      setSending(false);
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant flex items-center gap-3 px-margin-mobile h-16">
        <Link href="/forum" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low active:scale-95 duration-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-title-md text-title-md text-on-surface">Nouveau sujet</h1>
          <p className="font-label-xs text-label-xs text-on-surface-variant">Partage ta question ou ton astuce</p>
        </div>
      </header>

      <main className="px-margin-mobile pt-6 space-y-5">
        <section className="space-y-2">
          <p className="font-label-sm text-on-surface">Catégorie</p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((c) => {
              const active = c.id === categoryId;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategoryId(c.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border font-label-sm whitespace-nowrap active:scale-95 duration-100 ${
                    active ? "text-on-primary border-transparent" : "text-on-surface-variant border-outline-variant bg-surface"
                  }`}
                  style={active ? { backgroundColor: c.color } : {}}
                >
                  <span className="material-symbols-outlined text-[16px]">{c.icon}</span>{c.name}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-2">
          <label className="font-label-sm text-on-surface block">Titre</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Ex. : Aide sur les dérivées"
            className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </section>

        <section className="space-y-2">
          <label className="font-label-sm text-on-surface block">Contenu</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={7}
            placeholder="Explique ta question ou partage ton astuce en quelques phrases..."
            className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </section>

        {error && (
          <p className="flex items-center gap-1.5 font-label-sm text-error">
            <span className="material-symbols-outlined text-[16px]">error</span>{error}
          </p>
        )}

        <button
          onClick={submit}
          disabled={sending || categoryId === null}
          className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-label-md font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-40"
        >
          {sending ? (
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
          ) : (
            <><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span> Publier le sujet</>
          )}
        </button>
      </main>
    </div>
  );
}
