"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Msg {
  id: number;
  name: string;
  body: string;
  priority: number;
  created_at: string;
}

interface SessionInfo {
  id: number;
  title: string;
  subject_name: string;
  tagline: string;
  animator_name: string;
  animator_title: string;
  viewers: number;
  duration_minutes: number;
  status: string;
  gradient: string;
}

interface Detail extends SessionInfo {
  messages: Msg[];
  me: { name: string };
}

export default function LiveDirectPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<Detail | null>(null);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [hand, setHand] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/live/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setData(d);
        setMessages(d.messages ?? []);
      })
      .catch(() => setError(true));
  }, [id]);

  useEffect(() => {
    if (!data || data.status !== "live") return;
    timers.current = setInterval(() => {
      fetch(`/api/live/${data.id}/messages`)
        .then((r) => r.json())
        .then((d) => setMessages(d.messages ?? []))
        .catch(() => undefined);
    }, 6000);
    return () => {
      if (timers.current) clearInterval(timers.current);
    };
  }, [data]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [messages.length]);

  if (error)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline">lock</span>
        <p className="font-bold text-on-surface">Connecte-toi pour rejoindre le direct</p>
        <Link href="/login" className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl">
          Se connecter
        </Link>
      </div>
    );

  if (!data) return <div className="h-screen bg-surface" />;

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    fetch(`/api/live/${data.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    })
      .then((r) => (r.ok ? r.json() : r.json().then((j) => Promise.reject(new Error(j.error)))))
      .then(() => {
        setDraft("");
        setSendError(null);
        fetch(`/api/live/${data.id}/messages`)
          .then((r) => r.json())
          .then((d) => setMessages(d.messages ?? []));
      })
      .catch((e) => setSendError(e.message));
  };

  const reply = (text: string) => setDraft(text);

  return (
    <div className="bg-surface text-on-surface font-['Hanken_Grotesk'] h-screen flex flex-col overflow-hidden">
      <header className="flex justify-between items-center w-full px-4 h-16 bg-primary text-on-primary shrink-0">
        <div className="flex items-center gap-3">
          <Link href={`/espace-live/${data.id}`} className="p-2 -ml-2 rounded-full hover:bg-primary-container/20 active:scale-95 duration-100">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-title-md font-bold">Edukora Live</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-on-primary/20 flex items-center justify-center text-on-primary text-xs font-bold">
          {data.me.name.slice(0, 1)}
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <section className="w-full md:w-2/3 lg:w-3/4 flex flex-col bg-black">
          <div className="relative w-full aspect-video bg-inverse-surface overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient ?? "from-primary to-secondary"} opacity-70`} />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <span className="material-symbols-outlined text-7xl text-white/90">school</span>
              <p className="text-white text-xl md:text-3xl font-extrabold mt-2">{data.title}</p>
              <p className="text-white/70 text-sm mt-1">
                {data.animator_name} • {data.animator_title}
              </p>
            </div>
            <div className="absolute top-4 left-4 bg-error text-on-error px-3 py-1 rounded-lg text-label-xs font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              DIRECT
            </div>
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">visibility</span>
              {data.viewers.toLocaleString("fr-FR")} spectateurs
            </div>
          </div>

          <div className="bg-surface p-4 flex flex-col gap-2 border-b border-outline-variant">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-title-md font-semibold text-primary leading-tight">{data.title}</h2>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    {data.animator_name}
                  </span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {data.duration_minutes} min
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setHand(!hand)}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 ${
                    hand
                      ? "bg-tertiary-container text-on-tertiary-container ring-2 ring-tertiary"
                      : "bg-secondary text-on-secondary hover:bg-secondary-container"
                  }`}
                >
                  <span className="material-symbols-outlined">{hand ? "check_circle" : "front_hand"}</span>
                  {hand ? "Main levée !" : "Lever la main"}
                </button>
                <button className="flex items-center justify-center p-3 bg-surface-container-high rounded-xl text-primary hover:bg-surface-container-highest transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="flex-1 md:w-1/3 lg:w-1/4 bg-surface-container-lowest flex flex-col border-l border-outline-variant">
          <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low shrink-0">
            <h3 className="font-body-lg font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">forum</span>
              Chat en direct
            </h3>
            <span className="text-xs text-on-surface-variant">{messages.length} messages</span>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <div className="bg-primary-fixed p-3 rounded-xl flex gap-3 items-start border border-primary-container/20">
              <span className="material-symbols-outlined text-primary text-[20px]">keep</span>
              <p className="text-xs text-on-primary-fixed leading-snug">
                <strong>Edukora :</strong> Bienvenue ! Posez vos questions ici. Le professeur répondra aux questions prioritaires à la fin de chaque démonstration.
              </p>
            </div>
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col gap-1 ${m.priority ? "border-l-4 border-secondary pl-3 py-1" : ""}`}>
                <div className="flex items-center gap-2">
                  {m.priority > 0 && (
                    <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] px-2 py-0.5 rounded-full font-bold">
                      PRIORITAIRE
                    </span>
                  )}
                  <span className="font-bold text-label-xs text-on-surface">{m.name}</span>
                  <span className="text-[10px] text-on-surface-variant">
                    {m.created_at ? new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : ""}
                  </span>
                </div>
                <div className="bg-surface-container p-3 rounded-xl rounded-tl-none border border-outline-variant/30 text-sm">{m.body}</div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-surface border-t border-outline-variant shrink-0">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {["Merci Prof !", "J'ai compris", "Une question ?"].map((r) => (
                <button
                  key={r}
                  onClick={() => reply(r)}
                  className="whitespace-nowrap px-3 py-1.5 bg-surface-container-high rounded-full text-xs font-semibold hover:bg-outline-variant/20 active:scale-95"
                >
                  {r}
                </button>
              ))}
            </div>
            {sendError && <p className="text-xs text-error mb-2">{sendError}</p>}
            <div className="flex gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Envoyez un message..."
                rows={1}
                className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none"
              />
              <button
                onClick={send}
                className="px-4 rounded-xl bg-primary text-on-primary font-bold flex items-center gap-1 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
