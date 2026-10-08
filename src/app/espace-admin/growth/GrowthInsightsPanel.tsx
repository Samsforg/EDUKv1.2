"use client";

import { useEffect, useState } from "react";
import type { GrowthInsightBundle } from "@/lib/growth/decision/types";

/**
 * P2.1 — panneau Decision Layer (§17) : Growth Health, Top Signals,
 * Top Opportunities, Top Recommendations. Lecture seule : fetch de la
 * route admin existante, aucune action exposée (tout reste « PROPOSED »).
 */

const CARD = "bg-surface-container-lowest border border-outline-variant rounded-xl p-4";
const LABEL = "font-label-sm font-semibold text-on-surface-variant uppercase tracking-wide";

function ratingChip(rating: string): string {
  const base = "px-2 py-0.5 rounded-full text-xs font-semibold";
  if (rating === "GOOD" || rating === "VALID") return `${base} text-tertiary`;
  if (rating === "INSUFFICIENT_DATA" || rating === "UNAVAILABLE") return `${base} bg-surface-container-high text-on-surface-variant`;
  if (rating === "HIGH" || rating === "CRITICAL") return `${base} bg-error-container text-on-error-container`;
  if (rating === "MEDIUM") return `${base} bg-secondary-container text-secondary`;
  if (rating === "LOW") return `${base} text-primary bg-primary-container`;
  return `${base} bg-surface-container-high text-on-surface-variant`;
}

function fmtValue(v: number | null, benchmark: number | null): string {
  if (v === null) return "n/a";
  const pct = v <= 1 && benchmark !== null ? `${Math.round(v * 100)} %` : String(v);
  return benchmark !== null ? `${pct} (seuil ${benchmark <= 1 ? `${Math.round(benchmark * 100)} %` : benchmark})` : pct;
}

export default function GrowthInsightsPanel() {
  const [data, setData] = useState<GrowthInsightBundle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/admin/growth/insights")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as GrowthInsightBundle;
        if (alive) setData(json);
      })
      .catch(() => {
        if (alive) setError("Insights indisponibles.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return <section className={CARD}><p className="text-sm text-on-surface-variant">Chargement des insights Growth…</p></section>;
  }
  if (error || !data) {
    return <section className={CARD}><p className="text-sm text-on-surface-variant">{error ?? "Aucune donnée."}</p></section>;
  }

  const topSignals = data.signals.filter((s) => s.status === "VALID").slice(0, 3);
  const topOpps = data.opportunities.slice(0, 3);
  const topRecos = data.recommendations.slice(0, 3);

  return (
    <section className="grid gap-4" aria-label="Growth AI Decision Layer">
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Growth Health</h2>
          <span className="text-xs text-on-surface-variant">
            {data.period.from} → {data.period.to} · moteur déterministique · 0 action exécutée
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {data.health.map((h) => (
            <div key={h.stage} className="flex items-center justify-between gap-2 border border-outline-variant rounded-lg px-3 py-2">
              <span className="text-sm capitalize text-on-surface">{h.stage}</span>
              <span className={ratingChip(h.rating)}>{h.rating}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-5">
          {data.health.map((h) => (
            <p key={`v-${h.stage}`} className="text-xs text-on-surface-variant">
              {h.metric} : {fmtValue(h.value, h.benchmark)}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className={CARD}>
          <h2 className={`${LABEL} mb-3`}>Top Signals</h2>
          {topSignals.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Aucun signal VALID sur la période.</p>
          ) : (
            <ul className="grid gap-2">
              {topSignals.map((s) => (
                <li key={s.id} className="text-sm border border-outline-variant rounded-lg px-3 py-2">
                  <span className="font-semibold">{s.type}</span>
                  <span className="block text-xs text-on-surface-variant">
                    {s.metric} = {s.value === null ? "n/a" : s.value.toFixed(3)} · seuil {s.threshold} · {s.severity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={CARD}>
          <h2 className={`${LABEL} mb-3`}>Top Opportunities</h2>
          {topOpps.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Aucune opportunité au-dessus des seuils.</p>
          ) : (
            <ul className="grid gap-2">
              {topOpps.map((o) => (
                <li key={o.id} className="text-sm border border-outline-variant rounded-lg px-3 py-2">
                  <span className="font-semibold">{o.type}</span>{" "}
                  <span className={ratingChip(o.priority)}>{o.priority} · {o.priority_score}</span>
                  <span className="block text-xs text-on-surface-variant">{o.evidence}</span>
                  <span className="block text-xs text-on-surface-variant">
                    confiance {o.confidence} · impact {o.impact} · urgence {o.urgency}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={CARD}>
          <h2 className={`${LABEL} mb-3`}>Top Recommendations</h2>
          {topRecos.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Aucune recommandation forte (échantillons insuffisants ou seuils respectés).</p>
          ) : (
            <ul className="grid gap-2">
              {topRecos.map((r) => (
                <li key={r.id} className="text-sm border border-outline-variant rounded-lg px-3 py-2">
                  <span className="font-semibold">{r.action.type}</span>{" "}
                  <span className="text-xs text-on-surface-variant">({r.action.mode})</span>
                  <span className="block">{r.what}</span>
                  <span className="block text-xs text-on-surface-variant">Pour : {r.for_whom ?? "—"} · quand : {r.when}</span>
                  <span className="block text-xs text-on-surface-variant">Confiance : {r.confidence}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={CARD}>
        <h2 className={`${LABEL} mb-2`}>Segments</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {data.segments.map((s) => (
            <div key={s.key} className="flex items-center justify-between gap-2 border border-outline-variant rounded-lg px-3 py-2">
              <span className="text-sm text-on-surface">{s.key}</span>
              <span className="text-sm font-semibold">{s.count}</span>
              <span className={ratingChip(s.status)}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
