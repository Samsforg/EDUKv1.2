"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

interface Msg {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Comment réviser efficacement le bac ?",
  "Explique-moi la dérivée",
  "Quelle est l'unité de la force ?",
  "Entraîne-moi avec un quiz",
];

export default function TutorPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/tutor")
      .then((r) => r.json())
      .then((d) => {
        if (d.messages) {
          setMessages(d.messages);
          if (d.messages.length > 0) setChatId(d.messages[d.messages.length - 1].id);
        }
      });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || sending) return;
    setInput("");
    setSending(true);
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: message }]);
    const res = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, chatId }),
    });
    const data = await res.json();
    setSending(false);
    if (data.reply) {
      setChatId(data.chatId);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: data.reply }]);
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col font-['Hanken_Grotesk']">
      <PageHeader
        title="Kora, ton tuteur IA"
        subtitle={
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#1b873b]"></span> en ligne
          </span>
        }
        right={
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-xl">smart_toy</span>
          </div>
        }
      />

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-4 pb-28 space-y-3">
        {messages.length === 0 && (
          <div className="text-center pt-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-3xl">smart_toy</span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md text-on-surface">Salut, je suis Kora ! 👋</h2>
              <p className="font-body-sm text-on-surface-variant mt-1 max-w-xs mx-auto">
                Ton tuteur personnel pour réviser le BAC et le BEPC. Pose-moi tes questions ou laisse-moi te proposer des défis.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 px-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-4 py-2.5 rounded-full border border-outline-variant bg-surface text-on-surface font-label-sm active:scale-95 transition-transform duration-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl font-body-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary text-on-primary rounded-br-md"
                  : "bg-surface border border-outline-variant text-on-surface rounded-bl-md"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div className="bg-surface border border-outline-variant text-on-surface px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.15s" }}></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.3s" }}></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-4 py-3">
        <div className="max-w-lg mx-auto flex items-end gap-2">
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
            placeholder="Écris ton message…"
            className="flex-1 resize-none rounded-2xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:border-primary max-h-28"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || sending}
            className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform duration-100 shrink-0"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
