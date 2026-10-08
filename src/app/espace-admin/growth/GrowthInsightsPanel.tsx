"use client";

import { useEffect, useState } from "react";
import type { GrowthActionPlan, GrowthInsightBundle } from "@/lib/growth/decision/types";

/**
 * P2.1 + P2.2 + P2.3 — panneau Decision Layer (§17) : Growth Health,
 * Attribution, Channels, Referrals, Actions proposées, Top Signals,
 * Top Opportunities, Top Recommendations. Lecture seule : fetch de la
 * route admin existante, aucune action exposée (tout reste « PROPOSED »).
 * Les cartes P2.2 sont en plus des cartes P2.1 — le dashboard existant
 * reste intact ; la file P2.3 ne propose que des plans, jamais d'envoi.
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

function fmtPct(v: number | null): string {
  return v === null ? "n/a" : `${(v * 100).toFixed(1)} %`;
}

function fmtMoney(cents: number): string {
  return `${(cents / 100).toLocaleString("fr-FR")} F`;
}

/** Carte d'un plan d'action proposé (P2.3 §17) — légère, sans dépendance. */
function ActionCard({ plan }: { plan: GrowthActionPlan }) {
  const metric = plan.success_metrics[0];
  return (
    <li className="text-sm border border-outline-variant rounded-lg px-3 py-2 grid gap-1">
      <span className="flex items-center justify-between gap-2">
        <span className="font-semibold">{plan.title}</span>
        <span className={ratingChip(plan.action_priority)}>{plan.action_priority}</span>
      </span>
      <span className="block text-xs text-on-surface-variant">{plan.objective}</span>
      <span className="block text-xs text-on-surface-variant">
        {plan.action_type} · actionnabilité {plan.actionability} · effort {plan.effort} ·
        impact {plan.expected_impact} · urgence {plan.urgency}
      </span>
      <span className="block text-xs text-on-surface-variant">
        Pour : {plan.target_segment ?? "—"}
        {plan.channel ? ` · canal ${plan.channel}` : ""} · score {plan.priority_score}
      </span>
      <span className="block text-xs text-on-surface-variant">
        Mesure : {metric?.metric ?? "—"} = {metric?.baseline === null || metric === undefined
          ? "n/a"
          : metric.baseline.toFixed(3)}
        {metric && metric.target !== null
          ? ` → cible ${metric.target} (${metric.target_calibration})`
          : metric
            ? ` (${metric.target_calibration})`
            : ""}
        {metric ? ` · min sample ${metric.minimum_sample}` : ""}
      </span>
      <span className="block text-xs text-on-surface-variant">Preuve : {plan.evidence[0]}</span>
      <span className="flex items-center gap-2">
        <span className={ratingChip(plan.status)}>{plan.status}</span>
        {plan.experiment_ready ? (
          <span className="text-xs text-primary">expérimentation mesurable</span>
        ) : (
          <span className="text-xs text-on-surface-variant">baseline non calibrée</span>
        )}
      </span>
    </li>
  );
}

function ActionQueueCard({ title, plans }: { title: string; plans: GrowthActionPlan[] }) {
  return (
    <div className="border border-outline-variant rounded-lg px-3 py-2 grid gap-2">
      <h3 className={LABEL}>{title}</h3>
      {plans.length === 0 ? (
        <p className="text-xs text-on-surface-variant">Aucune action dans cette file.</p>
      ) : (
        <ul className="grid gap-2">{plans.map((p) => <ActionCard key={p.id} plan={p} />)}</ul>
      )}
    </div>
  );
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

      {/* P2.2 — attribution : couverture, sources, inconnus (§11-§12) */}
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Attribution</h2>
          <span className="text-xs text-on-surface-variant">inscrits de la période · test users exclus</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-outline-variant rounded-lg px-3 py-2">
            <p className="text-xs text-on-surface-variant">Couverture attribution</p>
            <p className="text-sm font-semibold">
              {fmtPct(data.attribution.coverage.coverageRate)}
              <span className="ml-1 text-xs font-normal text-on-surface-variant">
                ({data.attribution.coverage.attributed}/{data.attribution.coverage.attributed + data.attribution.coverage.unattributed})
              </span>
            </p>
            <span className={ratingChip(data.attribution.coverage.status)}>{data.attribution.coverage.status}</span>
          </div>
          <div className="border border-outline-variant rounded-lg px-3 py-2">
            <p className="text-xs text-on-surface-variant">Taux source inconnue</p>
            <p className="text-sm font-semibold">{fmtPct(data.attribution.sources.unknown_rate)}</p>
            <span className={ratingChip(data.attribution.sources.status)}>{data.attribution.sources.status}</span>
          </div>
          <div className="border border-outline-variant rounded-lg px-3 py-2">
            <p className="text-xs text-on-surface-variant">Source dominante</p>
            <p className="text-sm font-semibold">{data.attribution.top_source ?? "n/a"}</p>
          </div>
          <div className="border border-outline-variant rounded-lg px-3 py-2">
            <p className="text-xs text-on-surface-variant">Répartition des sources</p>
            <p className="text-xs">
              utm {data.attribution.sources.by_type.utm} · clic {data.attribution.sources.by_type.paid_click} ·
              parrainage {data.attribution.sources.by_type.referral} · inconnu {data.attribution.sources.by_type.unknown}
            </p>
          </div>
        </div>
      </div>

      {/* P2.2 — performance par canal (§5) */}
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Channels</h2>
          <span className="text-xs text-on-surface-variant">visiteurs par canal non attribuables (page_view sans props)</span>
        </div>
        {data.channels.length === 0 ? (
          <p className="text-sm text-on-surface-variant">Aucun inscrit identifié sur la période.</p>
        ) : (
          <ul className="grid gap-2">
            {data.channels.map((c) => (
              <li key={c.channel} className="text-sm border border-outline-variant rounded-lg px-3 py-2 grid gap-1 sm:grid-cols-2">
                <span className="font-semibold">{c.channel}</span>
                <span className={ratingChip(c.status)}>{c.status}</span>
                <span className="text-xs text-on-surface-variant">
                  inscrits {c.signups} · activés {c.activated} · abonnés {c.subscriptions} · revenu {fmtMoney(c.revenue)}
                </span>
                <span className="text-xs text-on-surface-variant">
                  activation {fmtPct(c.activationRate)} · conversion {fmtPct(c.conversionRate)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* P2.2 — performance par référent (§6) */}
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Referrals</h2>
          <span className="text-xs text-on-surface-variant">codes de parrainage · aucun identifiant personnel</span>
        </div>
        {data.referrals.length === 0 ? (
          <p className="text-sm text-on-surface-variant">Aucun filleul inscrit sur la période.</p>
        ) : (
          <ul className="grid gap-2">
            {data.referrals.map((r) => (
              <li key={r.referral} className="text-sm border border-outline-variant rounded-lg px-3 py-2 grid gap-1 sm:grid-cols-2">
                <span className="font-semibold">{r.referral}</span>
                <span className={ratingChip(r.status)}>{r.status}</span>
                <span className="text-xs text-on-surface-variant">
                  filleuls {r.signups} · activés {r.activated} · abonnés {r.subscriptions} · revenu {fmtMoney(r.revenue)}
                </span>
                <span className="text-xs text-on-surface-variant">
                  activation {fmtPct(r.activationRate)} · conversion {fmtPct(r.conversionRate)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* P2.3 — actions proposées, classées par horizon (§9, §17) */}
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Actions recommandées</h2>
          <span className="text-xs text-on-surface-variant">
            propositions PROPOSED · aucune exécution · aucun envoi automatique
          </span>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <ActionQueueCard title="À faire maintenant" plans={data.actions.now} />
          <ActionQueueCard title="Cette semaine" plans={data.actions.this_week} />
          <ActionQueueCard title="À surveiller" plans={data.actions.backlog} />
          <ActionQueueCard title="Bloquées par les données" plans={data.actions.blocked} />
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
