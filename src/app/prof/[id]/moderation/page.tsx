"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface QItem {
  id: number;
  user_id: number;
  name: string;
  question: string;
  answer: string | null;
  pinned: number;
  created_at: string;
}

interface Msg {
  id: number;
  name: string;
  body: string;
  role: string;
  priority: number;
  created_at: string;
  user_id: number;
}

interface Registration {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

interface ModData {
  session: { id: number; title: string; status: string; chat_paused: boolean; viewers: number; starts_at: string };
  messages: Msg[];
  questions: QItem[];
  blocked: { id: number; name: string }[];
  registrations: Registration[];
}

function timeAgo(s: string) {
  const t = new Date(s.includes("T") ? s : s.replace(" ", "T") + "Z");
  const d = (Date.now() - t.getTime()) / 60000;
  if (d < 1) return "à l'instant";
  if (d < 60) return `il y a ${Math.floor(d)}m`;
  return `il y a ${Math.floor(d / 60)}h`;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function ModerationPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [data, setData] = useState<ModData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [announceOpen, setAnnounceOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [answerFor, setAnswerFor] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(`/api/prof/lives/${id}/moderation`);
      if (!r.ok) throw new Error(((await r.json().catch(() => null))?.error) ?? "Erreur");
      setData(await r.json());
    } catch (e) {
      setError((e as Error).message);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (data?.session.status !== "live") return;
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, [data?.session.status, load]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [data?.messages.length]);

  const act = async (method: string, url: string, body?: unknown) => {
    setBusy(true);
    try {
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!r.ok) throw new Error(((await r.json().catch(() => null))?.error) ?? "Erreur");
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const sendAnnounce = async () => {
    if (announce.trim().length < 2) return;
    await act("POST", `/api/prof/lives/${id}/messages`, { body: announce });
    setAnnounce("");
    setAnnounceOpen(false);
  };

  const submitAnswer = async (qid: number) => {
    if (answerText.trim().length < 2) return;
    await act("PATCH", `/api/prof/lives/${id}/questions/${qid}`, { answer: answerText });
    setAnswerText("");
    setAnswerFor(null);
  };

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">{error}</p>
        <Link href="/prof" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Retour au tableau de bord
        </Link>
      </div>
    );

  const s = data?.session;
  const priority = (data?.questions ?? []).filter((q) => !q.answer);
  const onScreen = priority.filter((q) => q.pinned === 1);
  const rest = priority.filter((q) => q.pinned !== 1);

  return (
    <div className="bg-background text-on-background font-['Hanken_Grotesk'] min-h-screen pb-28">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50 flex items-center justify-between px-margin-mobile h-16">
        <div className="flex items-center gap-3">
          <Link href="/prof" className="p-2 -ml-2 rounded-full text-primary hover:bg-surface-container-low active:scale-95 duration-100">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="min-w-0">
            <h1 className="font-title-md text-title-md font-bold text-primary truncate">{s?.title ?? "Modération"}</h1>
            <p className="font-label-xs text-on-surface-variant flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${s?.status === "live" ? "bg-error animate-pulse" : "bg-outline"}`} />
              {s?.status === "live" ? `En direct · ${s.viewers.toLocaleString("fr-FR")} connectés` : "Hors direct"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {s?.status === "live" && (
            <button
              onClick={() => act("PATCH", `/api/prof/lives/${id}`, { chat_paused: !s.chat_paused })}
              disabled={busy}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 active:scale-95 transition-all disabled:opacity-50 ${
                s.chat_paused ? "bg-error-container text-on-error-container" : "bg-surface-container-high text-on-surface-variant hover:bg-outline-variant"
              }`}
            >
              <span className="material-symbols-outlined text-lg">{s.chat_paused ? "play_circle" : "pause_circle"}</span>
              {s.chat_paused ? "Reprendre le chat" : "Mettre en pause"}
            </button>
          )}
          <button
            onClick={() => setAnnounceOpen(!announceOpen)}
            className="bg-secondary-container text-on-secondary-container px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">campaign</span>
            Annonce
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg space-y-4">
        {announceOpen && (
          <div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <span className="material-symbols-outlined text-primary shrink-0">campaign</span>
            <input
              autoFocus
              value={announce}
              onChange={(e) => setAnnounce(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendAnnounce()}
              placeholder="Annonce visible par tous les élèves connectés…"
              className="flex-1 bg-background border border-outline-variant rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
            <button
              onClick={sendAnnounce}
              disabled={busy || announce.trim().length < 2}
              className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-bold disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                Questions prioritaires
              </h3>
              <span className="bg-primary-container/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                {priority.length} EN ATTENTE
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {onScreen.map((q) => (
                <div key={q.id} className="bg-secondary-container/40 border-2 border-secondary-container rounded-xl p-4 shadow-md">
                  <div className="absolute -translate-y-1/2 ml-auto">
                    <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                      À L'ÉCRAN
                    </span>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-xs">
                        {initials(q.name)}
                      </div>
                      <span className="text-xs font-bold text-on-surface">{q.name}</span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant">{timeAgo(q.created_at)}</span>
                  </div>
                  <p className="text-sm text-on-surface font-semibold leading-relaxed italic">« {q.question} »</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => act("PATCH", `/api/prof/lives/${id}/questions/${q.id}`, { pinned: false })}
                      disabled={busy}
                      className="flex-1 bg-surface border border-secondary-container text-secondary-container text-xs py-2 rounded-lg font-bold disabled:opacity-50"
                    >
                      Retirer de l'écran
                    </button>
                    <button
                      onClick={() => setAnswerFor(q.id)}
                      className="flex-1 bg-primary text-on-primary text-xs py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                      Répondre
                    </button>
                  </div>
                </div>
              ))}

              {rest.map((q) => (
                <div key={q.id} className="bg-surface border border-primary/20 rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-xs">
                        {initials(q.name)}
                      </div>
                      <span className="text-xs font-bold text-on-surface">{q.name}</span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant">{timeAgo(q.created_at)}</span>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">{q.question}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => act("PATCH", `/api/prof/lives/${id}/questions/${q.id}`, { pinned: true })}
                      disabled={busy}
                      className="flex-1 bg-primary text-on-primary text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-sm">star</span>
                      Mettre en avant
                    </button>
                    <button
                      onClick={() => setAnswerFor(answerFor === q.id ? null : q.id)}
                      className="flex-1 bg-surface-container-high text-on-surface-variant text-xs py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                      Répondre
                    </button>
                  </div>
                  {answerFor === q.id && (
                    <div className="mt-3 flex gap-2">
                      <input
                        autoFocus
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitAnswer(q.id)}
                        placeholder="Écrire la réponse…"
                        className="flex-1 bg-background border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                      />
                      <button
                        onClick={() => submitAnswer(q.id)}
                        disabled={busy || answerText.trim().length < 2}
                        className="bg-primary text-on-primary px-3 py-2 rounded-lg text-xs font-bold disabled:opacity-50"
                      >
                        Envoyer
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {priority.length === 0 && (
                <div className="border-2 border-dashed border-outline-variant p-6 rounded-xl text-center text-on-surface-variant/60 text-sm">
                  Aucune question en attente. Les questions des élèves apparaîtront ici.
                </div>
              )}
            </div>

            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant">
              <h4 className="font-label-md font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-error">block</span>
                Utilisateurs bloqués
              </h4>
              {(data?.blocked ?? []).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {(data?.blocked ?? []).map((b) => (
                    <span key={b.id} className="inline-flex items-center gap-1.5 bg-error-container/40 text-on-error-container px-2.5 py-1 rounded-full text-xs font-bold">
                      {b.name}
                      <button
                        onClick={() => act("DELETE", `/api/prof/lives/${id}/block`, { user_id: b.id })}
                        className="hover:text-error transition-colors"
                        title="Débloquer"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-on-surface-variant">Aucun utilisateur bloqué sur cette session.</p>
              )}
            </div>
          </section>

          <section className="mt-6">
            <h4 className="font-label-md font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">group</span>
              Inscrits ({data?.registrations?.length ?? 0})
            </h4>
            {(data?.registrations ?? []).length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {(data?.registrations ?? []).map((r) => (
                  <div key={r.user_id} className="bg-surface border border-outline-variant rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-xs">
                        {initials(`${r.first_name} ${r.last_name}`)}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-on-surface">{r.first_name} {r.last_name}</span>
                        <p className="text-xs text-on-surface-variant">{r.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-on-surface-variant">{timeAgo(r.created_at)}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Retirer ${r.first_name} ${r.last_name} des inscrits ?`)) {
                            act("DELETE", `/api/prof/lives/${id}/registrations`, { user_id: r.user_id });
                          }
                        }}
                        className="p-1 hover:text-error text-xs text-error"
                        title="Désinscrire"
                      >
                        <span className="material-symbols-outlined text-lg">person_remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant text-center py-4">Aucun inscrit pour cette session.</p>
            )}
          </section>

          <section className="lg:col-span-7 flex flex-col bg-surface rounded-2xl border border-outline-variant overflow-hidden shadow-sm h-[60vh] lg:h-[75vh]">
            <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
              <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">chat_bubble</span>
                Flux du chat
              </h3>
              <span className="font-label-xs text-on-surface-variant">{data?.messages.length ?? 0} messages</span>
            </div>
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-background">
              {(data?.messages ?? []).map((m) =>
                m.role === "system" ? (
                  <div key={m.id} className="flex justify-center">
                    <div className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-sm font-semibold shadow-sm max-w-[85%] text-center">
                      📢 {m.body}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      {initials(m.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold">{m.name}</span>
                        <span className="text-[10px] text-on-surface-variant">{timeAgo(m.created_at)}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant break-words">{m.body}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={() => act("POST", `/api/prof/lives/${id}/block`, { user_id: m.user_id })}
                        className="p-1 hover:text-error"
                        title="Bloquer l'utilisateur"
                      >
                        <span className="material-symbols-outlined text-lg">block</span>
                      </button>
                      <button
                        onClick={() => act("DELETE", `/api/prof/lives/${id}/messages/${m.id}`)}
                        className="p-1 hover:text-error"
                        title="Supprimer le message"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </div>
                ),
              )}
              {(data?.messages ?? []).length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant/50">
                  <span className="material-symbols-outlined text-4xl mb-2">chat_bubble_outline</span>
                  <p className="text-sm">Le chat est vide pour le moment.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/prof">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-xs">Bord</span>
        </Link>
        <div className="flex flex-col items-center justify-center text-primary font-bold p-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
          <span className="font-label-xs">Modération</span>
        </div>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 p-2" href="/espace-live">
          <span className="material-symbols-outlined">live_tv</span>
          <span className="font-label-xs">Live</span>
        </Link>
      </nav>
    </div>
  );
}
