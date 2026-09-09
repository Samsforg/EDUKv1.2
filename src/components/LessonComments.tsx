"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: number;
  user_id: number;
  lesson_id: number;
  content: string;
  parent_id: number | null;
  is_resolved: number;
  created_at: string;
  author_name: string;
  author_role: string;
}

export default function LessonComments({ lessonId, userRole }: { lessonId: number; userRole?: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetch(`/api/lessons/comments?lesson_id=${lessonId}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .finally(() => setLoading(false));
  }, [lessonId, open]);

  async function submit() {
    if (!text.trim() || sending) return;
    setSending(true);
    const res = await fetch("/api/lessons/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lesson_id: lessonId, content: text.trim(), parent_id: replyTo }),
    });
    const d = await res.json();
    if (d.ok) {
      setText("");
      setReplyTo(null);
      const r = await fetch(`/api/lessons/comments?lesson_id=${lessonId}`);
      const rd = await r.json();
      setComments(rd.comments ?? []);
    }
    setSending(false);
  }

  async function resolveComment(id: number) {
    await fetch(`/api/lessons/comments/${id}/resolve`, { method: "POST" });
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, is_resolved: 1 } : c)));
  }

  const topLevel = comments.filter((c) => !c.parent_id);
  const replies = comments.filter((c) => c.parent_id);

  return (
    <div className="mt-8 border-t border-outline-variant pt-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-label-md font-semibold text-on-surface hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">chat_bubble_outline</span>
        Questions & discussion ({comments.length})
        <span className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <span className="material-symbols-outlined text-primary text-2xl animate-spin">progress_activity</span>
            </div>
          ) : topLevel.length === 0 ? (
            <p className="text-center text-on-surface-variant font-body-sm py-6">
              Aucune question pour l&apos;instant. Sois le premier à poser une question !
            </p>
          ) : (
            topLevel.map((c) => (
              <div key={c.id} className={`rounded-xl border p-4 ${c.is_resolved ? "border-green-300 bg-green-50/50" : "border-outline-variant bg-surface"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-primary text-xs font-bold">
                    {c.author_name.charAt(0)}
                  </div>
                  <span className="font-label-sm font-semibold text-on-surface">{c.author_name}</span>
                  {c.author_role === "teacher" && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Enseignant</span>
                  )}
                  {c.is_resolved ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">Résolu</span>
                  ) : null}
                  <span className="text-xs text-on-surface-variant ml-auto">{formatDate(c.created_at)}</span>
                </div>
                <p className="font-body-sm text-on-surface whitespace-pre-wrap">{c.content}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Répondre
                  </button>
                  {(userRole === "teacher" || userRole === "admin") && !c.is_resolved && (
                    <button
                      onClick={() => resolveComment(c.id)}
                      className="text-xs text-green-600 font-semibold hover:underline"
                    >
                      Marquer résolu
                    </button>
                  )}
                </div>
                {replyTo === c.id && (
                  <div className="mt-3 flex gap-2">
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Ta réponse…"
                      className="flex-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit()}
                    />
                    <button
                      onClick={submit}
                      disabled={sending || !text.trim()}
                      className="px-3 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold disabled:opacity-40"
                    >
                      {sending ? "…" : "→"}
                    </button>
                  </div>
                )}
                {replies
                  .filter((r) => r.parent_id === c.id)
                  .map((r) => (
                    <div key={r.id} className="ml-6 mt-3 border-l-2 border-outline-variant pl-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-secondary text-[10px] font-bold">
                          {r.author_name.charAt(0)}
                        </div>
                        <span className="font-label-xs font-semibold text-on-surface">{r.author_name}</span>
                        {r.author_role === "teacher" && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Enseignant</span>
                        )}
                        <span className="text-[11px] text-on-surface-variant">{formatDate(r.created_at)}</span>
                      </div>
                      <p className="font-body-xs text-on-surface whitespace-pre-wrap">{r.content}</p>
                    </div>
                  ))}
              </div>
            ))
          )}

          {!replyTo && (
            <div className="flex gap-2 pt-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Pose une question sur cette fiche…"
                className="flex-1 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm focus:outline-none focus:border-primary"
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit()}
              />
              <button
                onClick={submit}
                disabled={sending || !text.trim()}
                className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 disabled:opacity-40 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "à l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH}h`;
  const diffJ = Math.floor(diffH / 24);
  if (diffJ < 7) return `il y a ${diffJ}j`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
