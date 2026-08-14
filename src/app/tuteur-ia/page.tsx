"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { PremiumUpsell } from "@/components/PremiumUpsell";

interface Msg {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface QuotaInfo {
  used: number;
  limit: number | null;
  isPremium: boolean;
  planName: string | null;
  windowLabel?: string | null;
}

interface PlanInfo {
  id: number;
  name: string;
  price_cents: number;
  interval: string;
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
  const [quota, setQuota] = useState<QuotaInfo | null>(null);
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [decouvertePrice, setDecouvertePrice] = useState(0);
  const [upsell, setUpsell] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const [sendError, setSendError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/tutor")
      .then((r) => r.json())
      .then((d) => {
        if (d.messages) {
          setMessages(d.messages);
          if (d.messages.length > 0) setChatId(d.messages[d.messages.length - 1].id);
        }
      })
      .catch(() => {});
    fetch("/api/tutor/quota")
      .then((r) => r.json())
      .then((d) => {
        if (d.kora) setQuota(d.kora);
        if (d.plan) setPlan(d.plan);
        if (typeof d.decouverte_price === "number") setDecouvertePrice(d.decouverte_price);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const blocked = !!quota && quota.limit !== null && quota.used >= quota.limit;

  async function send(text: string) {
    const message = text.trim();
    if (!message || sending) return;
    setSendError(null);
    if (blocked) {
      setUpsell({
        open: true,
        message: quota!.isPremium
          ? `Vous avez atteint votre quota de ${quota!.limit} questions ${quota!.windowLabel ?? "pour cette période"} sur le plan « ${quota!.planName} ». Il se réinitialisera à la prochaine période d'abonnement.`
          : `Vous avez utilisé vos ${quota!.limit} questions gratuites du mois. Profitez de Kora bien plus longtemps avec le plan Réussite.`,
      });
      return;
    }
    setInput("");
    setSending(true);
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: message }]);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, chatId }),
      });
      const data = await res.json();
      if (data.code === "quota_exceeded") {
        if (data.quota) setQuota(data.quota);
        if (data.plan) setPlan(data.plan);
        setUpsell({ open: true, message: data.error });
      } else if (data.reply) {
        setChatId(data.chatId);
        setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: data.reply }]);
        if (quota && quota.limit !== null) setQuota((q) => (q ? { ...q, used: q.used + 1 } : q));
      } else {
        setSendError(data.error ?? "Kora n'a pas pu répondre. Réessaye.");
      }
    } catch {
      setSendError("Erreur réseau. Vérifie ta connexion puis réessaye.");
    } finally {
      setSending(false);
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
          <div className="flex items-center gap-2">
            {quota && (
              <button
                onClick={() =>
                  setUpsell({
                    open: true,
                    message: quota.isPremium
                      ? quota.limit !== null
                        ? `Vous êtes abonné « ${quota.planName} » : il vous reste ${Math.max(0, quota.limit - quota.used)} question${Math.max(0, quota.limit - quota.used) > 1 ? "s" : ""} ${quota.windowLabel ?? "pour cette période"}.`
                        : `Vous êtes abonné « ${quota.planName} » : Kora illimité, bravo !`
                      : `Vous avez encore ${Math.max(0, (quota.limit ?? 0) - quota.used)} question${
                          Math.max(0, (quota.limit ?? 0) - quota.used) > 1 ? "s" : ""
                        } gratuite${Math.max(0, (quota.limit ?? 0) - quota.used) > 1 ? "s" : ""} sur ${quota.limit} ${quota.windowLabel ?? "aujourd'hui"}.`,
                  })
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${
                  quota.isPremium
                    ? "bg-secondary-container text-on-secondary-container border-transparent"
                    : blocked
                      ? "bg-error-container text-on-error-container border-transparent"
                      : "bg-primary-container/60 text-on-primary-container border-outline-variant"
                }`}
                title="Voir les limites de ton plan"
              >
                <span className={`material-symbols-outlined text-base ${quota.isPremium ? "fill-icon" : ""}`}>
                  {quota.isPremium ? "workspace_premium" : "all_inclusive"}
                </span>
                {quota.isPremium && quota.limit === null
                  ? "Kora illimité"
                  : `${quota.used}/${quota.limit ?? 0} ${quota.windowLabel ?? "aujourd'hui"}`}
              </button>
            )}
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-xl">smart_toy</span>
            </div>
          </div>
        }
      />

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-4 pb-28 space-y-3">
        <Link
          href="/correction-dissertation"
          className="flex items-center gap-3 rounded-2xl border border-outline-variant bg-surface px-4 py-3 active:scale-95 transition-transform"
        >
          <span className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary-container text-xl">edit_document</span>
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-bold text-sm text-on-surface">Kora corrige ta dissertation</span>
            <span className="block text-xs text-on-surface-variant truncate">Copie notée sur 20, barème BAC &amp; BEPC</span>
          </span>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </Link>

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

        {sendError && (
          <div className="flex justify-start">
            <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-md bg-error-container/50 text-on-error-container font-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{sendError}</span>
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

      <PremiumUpsell
        open={upsell.open}
        onClose={() => setUpsell({ open: false, message: "" })}
        message={upsell.message}
        plan={plan}
        decouvertePrice={decouvertePrice}
      />
    </div>
  );
}
