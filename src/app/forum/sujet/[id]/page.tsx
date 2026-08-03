"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";

interface PostDetail {
  id: number;
  category_id: number;
  category_name: string;
  category_icon: string;
  category_color: string;
  title: string;
  content: string;
  author_name: string;
  author_xp: number;
  votes: number;
  user_voted: boolean;
  created_at: string;
}

interface Reply {
  id: number;
  author_name: string;
  author_xp: number;
  content: string;
  created_at: string;
}

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [voting, setVoting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function load() {
    setLoading(true);
    fetch(`/api/forum/posts/${id}`)
      .then(async (r) => {
        if (!r.ok) {
          setError("Sujet introuvable.");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) {
          setPost(d.post);
          setReplies(d.replies ?? []);
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [id]);

  async function sendReply() {
    if (!text.trim() || sending) return;
    setSending(true);
    const r = await fetch(`/api/forum/posts/${id}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text.trim() }),
    });
    if (r.ok) {
      setText("");
      load();
    }
    setSending(false);
  }

  async function toggleVote() {
    if (!post || voting) return;
    setVoting(true);
    const r = await fetch(`/api/forum/posts/${id}/vote`, { method: "POST" });
    if (r.ok) {
      const d = await r.json();
      setPost({ ...post, votes: d.votes, user_voted: d.voted });
    }
    setVoting(false);
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-32 font-['Hanken_Grotesk']">
      <PageHeader
        title={post?.category_name ?? "Sujet"}
        subtitle={`${replies.length} réponse${replies.length > 1 ? "s" : ""}`}
        backHref={`/forum/categorie/${post?.category_id ?? ""}`}
      />

      <main className="px-margin-mobile pt-4 space-y-3">
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

        {!loading && !error && post && (
          <>
            {/* Sujet */}
            <article className="bg-surface border border-outline-variant rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full flex items-center justify-center font-label-md font-bold" style={{ backgroundColor: post.category_color + "1A", color: post.category_color }}>
                  {initials(post.author_name)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-on-surface">{post.author_name}</p>
                  <p className="font-label-xs text-on-surface-variant">{post.created_at} · {post.author_xp} XP</p>
                </div>
                <span className="flex items-center gap-1 px-2 py-1 rounded-full font-label-xs" style={{ backgroundColor: post.category_color + "14", color: post.category_color }}>
                  <span className="material-symbols-outlined text-[14px]">{post.category_icon}</span>{post.category_name}
                </span>
              </div>
              <div>
                <h2 className="font-title-md text-title-md text-on-surface mb-2">{post.title}</h2>
                <p className="text-body-md text-on-surface-variant whitespace-pre-line leading-relaxed">{post.content}</p>
              </div>
              <button
                onClick={toggleVote}
                className={`flex items-center gap-1 px-4 py-2 rounded-full border font-label-sm active:scale-95 duration-100 ${
                  post.user_voted
                    ? "bg-primary border-primary text-on-primary"
                    : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-lg" style={post.user_voted ? { fontVariationSettings: "'FILL' 1" } : {}}>arrow_drop_up</span>
                {post.votes} {post.votes > 1 ? "votes" : "vote"}
              </button>
            </article>

            {/* Réponses */}
            <section className="space-y-2">
              <h2 className="font-title-sm text-title-sm text-on-surface">Réponses</h2>
              {replies.length === 0 && (
                <div className="bg-surface border border-outline-variant rounded-xl p-6 text-center">
                  <p className="font-body-md text-on-surface-variant">Aucune réponse pour l&apos;instant. Sois le premier à aider !</p>
                </div>
              )}
              {replies.map((r) => (
                <div key={r.id} className="bg-surface border border-outline-variant rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center font-label-sm font-bold text-on-surface bg-surface-container-high">
                      {initials(r.author_name)}
                    </span>
                    <p className="font-label-md text-on-surface">{r.author_name}</p>
                    <span className="font-label-xs text-on-surface-variant ml-auto">{r.created_at}</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant whitespace-pre-line leading-relaxed">{r.content}</p>
                </div>
              ))}
            </section>
          </>
        )}
      </main>

      {/* Barre de réponse */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-outline-variant px-margin-mobile pt-3 pb-5">
        <div className="flex items-end gap-2 max-w-xl mx-auto">
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-2xl px-4 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendReply();
                }
              }}
              rows={1}
              placeholder="Écrire une réponse..."
              className="w-full bg-transparent border-none focus:outline-none text-body-md p-0 placeholder:text-on-surface-variant/50 resize-none max-h-32"
            />
          </div>
          <button
            onClick={sendReply}
            disabled={!text.trim() || sending}
            className="w-11 h-11 flex items-center justify-center bg-primary text-on-primary rounded-full shadow-lg active:scale-90 transition-all disabled:opacity-40 disabled:active:scale-100"
            aria-label="Envoyer"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + second).toUpperCase();
}
