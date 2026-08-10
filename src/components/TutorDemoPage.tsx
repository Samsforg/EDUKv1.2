"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { icon: "functions", color: "text-secondary", label: "Réviser les Maths" },
  { icon: "history_edu", color: "text-tertiary", label: "Quiz d'Histoire" },
  { icon: "translate", color: "text-primary", label: "Pratique Anglais" },
  { icon: "science", color: "text-secondary-container", label: "Physique-Chimie" },
];

export default function TutorDemoPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || sending) return;
    setError(null);
    const history = messages.slice(-6);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setSending(true);
    try {
      const res = await fetch("/api/tutor/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Kora n'a pas pu répondre. Réessaie dans un instant.");
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply ?? "" }]);
    } catch {
      setError("Erreur réseau. Vérifie ta connexion puis réessaie.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md" style={{ minHeight: "max(884px, 100dvh)" }}>
      <header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Retour à l'accueil"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-100"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-fixed bg-surface-container">
            <img
              className="w-full h-full object-cover"
              src="/images/ecran-369.webp"
              alt="Portrait d'une élève ivoirienne souriante"
              loading="lazy"
            />
          </div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Edukora</h1>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100"
        >
          <span className="material-symbols-outlined text-primary">notifications</span>
        </button>
      </header>

      <main className="pt-20 pb-40 px-margin-mobile flex flex-col min-h-screen">
        <div className="space-y-6 flex-grow">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-on-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                smart_toy
              </span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Bonjour, Je suis Kora</h2>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto">Ton tuteur personnel pour réussir ton BAC et ton BEPC.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-on-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                smart_toy
              </span>
            </div>
            <div className="message-bubble ai-bubble bg-surface border border-primary p-4 rounded-2xl shadow-sm">
              <p className="font-body-md text-on-surface">Comment puis-je t'aider aujourd'hui ? Nous pouvons réviser les mathématiques, explorer l'histoire ou pratiquer ton anglais.</p>
            </div>
          </div>

          {messages.length === 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.label)}
                  className="flex flex-col items-start p-4 bg-surface border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all active:scale-95"
                >
                  <span className={`material-symbols-outlined mb-2 ${s.color}`}>{s.icon}</span>
                  <span className="font-label-sm text-on-surface">{s.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-3 mb-4`}>
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      smart_toy
                    </span>
                  </div>
                )}
                <div
                  className={`message-bubble ${
                    m.role === "user"
                      ? "user-bubble bg-primary-container text-on-primary-container p-4 rounded-2xl shadow-sm"
                      : "ai-bubble bg-surface border border-primary p-4 rounded-2xl shadow-sm"
                  }`}
                >
                  <p className="font-body-md text-on-surface whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    smart_toy
                  </span>
                </div>
                <div className="message-bubble ai-bubble bg-surface border border-primary p-4 rounded-2xl shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-3">
                <div className="message-bubble bg-error-container/50 text-on-error-container p-4 rounded-2xl shadow-sm">
                  <p className="font-body-md">{error}</p>
                </div>
              </div>
            )}
          </div>
          <div ref={bottomRef} />
        </div>
      </main>

      <div className="fixed bottom-20 left-0 w-full px-4 pb-4 bg-gradient-to-t from-background via-background to-transparent pt-10 z-40">
        <div className="max-w-xl mx-auto flex items-end gap-2 bg-surface-container-lowest p-2 rounded-2xl shadow-lg border border-outline-variant custom-blur">
          <button type="button" aria-label="Ajouter" className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Pose ta question ici..."
            className="flex-grow bg-transparent border-none focus:ring-0 font-body-md text-on-surface py-2 resize-none max-h-32"
          />
          <button
            type="button"
            onClick={() => send(input)}
            disabled={!input.trim() || sending}
            className="w-12 h-12 flex items-center justify-center bg-secondary-container rounded-full text-on-secondary shadow-sm active:scale-90 transition-transform disabled:opacity-50"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe px-2 rounded-t-xl">
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="/">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-xs text-label-xs">Accueil</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="/tuteur-ia">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-label-xs text-label-xs">Cours</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="/tuteur-ia">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          <span className="font-label-xs text-label-xs">Tuteur AI</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="/tuteur-ia">
          <div className="relative">
            <span className="material-symbols-outlined">bookmark</span>
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-error border border-surface text-[10px] font-bold text-on-error">3</span>
          </div>
          <span className="font-label-xs text-label-xs">Favoris</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="/tuteur-ia">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-xs text-label-xs">Profil</span>
        </a>
      </nav>
    </div>
  );
}
