"use client";

import { useState, useEffect } from "react";
import { getCsrfToken } from "@/lib/csrf-client";

interface Strategy {
  id: string; date: string; objective: string; audience: string;
  hook: string; strategy: string; kpis: string[]; status: string;
}

interface ContentItem {
  id: string; strategyId: string; platform: string; text: string;
  hashtags: string[]; cta: string; visualPrompt?: string;
  score?: number; status: string;
}

interface Metrics {
  date: string; signups: number; activeUsers: number;
  premiumConversions: number; referralCount: number;
  quizCompletions: number; koraInteractions: number; pageViews: number;
}

interface Recommendation {
  id: string; type: string; title: string; description: string;
  priority: string; estimatedImpact: string;
}

const CARD = "bg-surface-container-lowest border border-outline-variant rounded-xl p-4";
const BTN_PRIMARY = "h-9 px-4 rounded-full bg-primary text-on-primary font-label-sm font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 active:scale-[0.97] transition-transform text-sm";
const BTN_SECONDARY = "h-9 px-4 rounded-full border border-outline-variant text-on-surface font-label-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors text-sm";
const BTN_ALL = "h-10 px-6 rounded-full bg-tertiary text-on-tertiary font-label-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.97] transition-transform text-sm";

const PLATFORMS = [
  { id: "facebook", label: "FACEBOOK", icon: "thumb_up" },
  { id: "tiktok", label: "TIKTOK", icon: "music_note" },
  { id: "whatsapp", label: "WHATSAPP", icon: "chat" },
] as const;

export default function GrowthDashboard() {
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState({ strategy: false, content: false, allContent: false, rec: false });
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [tab, setTab] = useState<"strategy" | "content" | "metrics" | "recs">("strategy");

  useEffect(() => {
    fetch("/api/growth/strategy").then((r) => r.json()).then((d) => setStrategy(d.strategies?.[0] ?? null));
    fetch("/api/growth/content").then((r) => r.json()).then((d) => setContents(d.contents ?? []));
    fetch("/api/growth/metrics").then((r) => r.json()).then((d) => setMetrics(d.metrics));
    fetch("/api/growth/recommendation").then((r) => r.json()).then((d) => setRecs(d.recommendations ?? []));
  }, []);

  async function apiPost<T>(url: string, body?: Record<string, unknown>): Promise<T | null> {
    setError(null);
    try {
      const token = await getCsrfToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["x-csrf-token"] = token;
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || `Erreur HTTP ${res.status}`);
        return null;
      }
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur réseau");
      return null;
    }
  }

  async function genStrategy() {
    setLoading((l) => ({ ...l, strategy: true }));
    const d = await apiPost<{ strategy: Strategy }>("/api/growth/strategy");
    if (d?.strategy) setStrategy(d.strategy);
    setLoading((l) => ({ ...l, strategy: false }));
  }

  async function genContent(platform: string) {
    setLoading((l) => ({ ...l, content: true }));
    const d = await apiPost<{ content: ContentItem }>("/api/growth/content", { platform, strategyId: strategy?.id, includeVisual: true });
    if (d?.content) setContents((c) => [d.content, ...c]);
    setLoading((l) => ({ ...l, content: false }));
  }

  async function genAllContent() {
    setLoading((l) => ({ ...l, allContent: true }));
    const d = await apiPost<{ contents: ContentItem[] }>("/api/growth/content", { platforms: ["facebook", "tiktok", "whatsapp"], strategyId: strategy?.id, includeVisual: true });
    if (d?.contents) setContents((c) => [...d.contents, ...c]);
    setLoading((l) => ({ ...l, allContent: false }));
  }

  async function genRec() {
    setLoading((l) => ({ ...l, rec: true }));
    const d = await apiPost<{ recommendation: Recommendation }>("/api/growth/recommendation");
    if (d?.recommendation) setRecs((r) => [d.recommendation, ...r]);
    setLoading((l) => ({ ...l, rec: false }));
  }

  async function refreshMetrics() {
    setError(null);
    try {
      const token = await getCsrfToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["x-csrf-token"] = token;
      const res = await fetch("/api/growth/metrics", { method: "POST", headers, body: JSON.stringify({}) });
      const data = await res.json();
      if (data.metrics) setMetrics(data.metrics);
      else if (data.error) setError(data.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur réseau");
    }
  }

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-xl font-bold text-on-surface">Growth AI</h1>
        <span className="text-xs text-on-surface-variant">Module indépendant</span>
      </div>

      {error && (
        <div className="bg-error-container text-error rounded-xl px-4 py-3 text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
          <button onClick={() => setError(null)} className="ml-auto material-symbols-outlined text-sm">close</button>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["strategy", "content", "metrics", "recs"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${tab === t ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}`}>
            {t === "strategy" ? "Stratégie" : t === "content" ? "Contenu" : t === "metrics" ? "Métriques" : "Recommandations"}
          </button>
        ))}
      </div>

      {tab === "strategy" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button onClick={genStrategy} disabled={loading.strategy} className={BTN_PRIMARY}>
              {loading.strategy ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : <span className="material-symbols-outlined text-sm">auto_awesome</span>}
              GÉNÉRER UNE STRATÉGIE
            </button>
          </div>
          {strategy && (
            <div className="space-y-3">
              {[
                { label: "Objectif", value: strategy.objective, icon: "flag" },
                { label: "Audience", value: strategy.audience, icon: "group" },
                { label: "Hook", value: strategy.hook, icon: "flash_on" },
                { label: "Stratégie", value: strategy.strategy, icon: "route" },
              ].map((item) => (
                <div key={item.label} className={CARD}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-primary text-sm">{item.icon}</span>
                    <span className="font-label-sm text-on-surface-variant">{item.label}</span>
                  </div>
                  <p className="text-sm text-on-surface whitespace-pre-wrap">{item.value}</p>
                </div>
              ))}
              {strategy.kpis.length > 0 && (
                <div className={CARD}>
                  <span className="font-label-sm text-on-surface-variant block mb-1">KPIs</span>
                  <ul className="text-sm text-on-surface space-y-1">
                    {strategy.kpis.map((k, i) => <li key={i}>• {k}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab === "content" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap items-center">
            <button onClick={genAllContent} disabled={loading.allContent} className={BTN_ALL}>
              {loading.allContent ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : <span className="material-symbols-outlined text-sm">bolt</span>}
              TOUT GÉNÉRER
            </button>
            <span className="text-xs text-on-surface-variant">ou</span>
            {PLATFORMS.map((p) => (
              <button key={p.id} onClick={() => genContent(p.id)} disabled={loading.content} className={BTN_PRIMARY}>
                <span className="material-symbols-outlined text-sm">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {contents.map((c) => (
              <div key={c.id} className={CARD}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary">
                      {c.platform === "facebook" ? "thumb_up" : c.platform === "tiktok" ? "music_note" : "chat"}
                    </span>
                    <span className="font-label-sm font-semibold text-on-surface">{c.platform.toUpperCase()}</span>
                    {c.score != null && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.score >= 75 ? "bg-tertiary-container text-tertiary" : c.score >= 50 ? "bg-secondary-container text-secondary" : "bg-error-container text-error"}`}>
                        {c.score}/100
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => copyText(c.text, c.id)} className={BTN_SECONDARY}>
                      <span className="material-symbols-outlined text-sm">{copied === c.id ? "check" : "content_copy"}</span>
                      {copied === c.id ? "Copié" : "COPIER"}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-on-surface whitespace-pre-wrap mb-2">{c.text}</p>
                {c.hashtags.length > 0 && (
                  <p className="text-xs text-primary">{c.hashtags.map((h) => `#${h}`).join(" ")}</p>
                )}
                {c.cta && <p className="text-xs text-on-surface-variant mt-1">CTA: {c.cta}</p>}
                {c.visualPrompt && (
                  <div className="mt-2 bg-surface-container rounded-lg p-2">
                    <p className="text-xs text-on-surface-variant"><span className="material-symbols-outlined text-xs align-middle">image</span> {c.visualPrompt}</p>
                  </div>
                )}
              </div>
            ))}
            {contents.length === 0 && (
              <div className={CARD}>
                <p className="text-sm text-on-surface-variant text-center py-8">Aucun contenu généré. Clique sur &quot;TOUT GÉNÉRER&quot; ou choisis une plateforme.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "metrics" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={refreshMetrics} className={BTN_SECONDARY}>
              <span className="material-symbols-outlined text-sm">refresh</span>
              CALCULER LES MÉTRIQUES
            </button>
          </div>
          {metrics ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Inscriptions", value: metrics.signups, icon: "person_add" },
                { label: "Utilisateurs actifs", value: metrics.activeUsers, icon: "people" },
                { label: "Premium", value: metrics.premiumConversions, icon: "workspace_premium" },
                { label: "Parrainages", value: metrics.referralCount, icon: "diversity_3" },
                { label: "Quiz complétés", value: metrics.quizCompletions, icon: "quiz" },
                { label: "Interactions Kora", value: metrics.koraInteractions, icon: "smart_toy" },
                { label: "Page views", value: metrics.pageViews, icon: "visibility" },
              ].map((m) => (
                <div key={m.label} className={CARD}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-sm">{m.icon}</span>
                    <span className="text-xs text-on-surface-variant">{m.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-on-surface">{m.value.toLocaleString("fr-FR")}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={CARD}>
              <p className="text-sm text-on-surface-variant text-center py-8">Aucune métrique. Clique &quot;CALCULER LES MÉTRIQUES&quot; pour charger les données GA4.</p>
            </div>
          )}
        </div>
      )}

      {tab === "recs" && (
        <div className="space-y-4">
          <button onClick={genRec} disabled={loading.rec} className={BTN_PRIMARY}>
            {loading.rec ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : <span className="material-symbols-outlined text-sm">auto_awesome</span>}
            GÉNÉRER UNE RECOMMANDATION
          </button>
          <div className="space-y-3">
            {recs.map((r) => (
              <div key={r.id} className={CARD}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.priority === "high" ? "bg-error-container text-error" : r.priority === "medium" ? "bg-secondary-container text-secondary" : "bg-surface-container text-on-surface-variant"}`}>
                      {r.priority.toUpperCase()}
                    </span>
                    <span className="font-label-sm text-on-surface">{r.title}</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface mb-1">{r.description}</p>
                <p className="text-xs text-primary">{r.estimatedImpact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
