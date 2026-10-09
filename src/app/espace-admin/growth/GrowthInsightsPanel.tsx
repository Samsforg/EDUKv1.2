"use client";

import { useEffect, useState } from "react";
import type { GrowthActionPlan, GrowthInsightBundle } from "@/lib/growth/decision/types";
import type {
  ActionMeasurementEntry,
  ExperimentPreparation,
  FunnelRate,
  GrowthMeasurement,
  TrendPoint,
  WindowMetric,
} from "@/lib/growth/measure";

/**
 * P2.1 + P2.2 + P2.3 + P2.4 — panneau Decision Layer (§17) : Growth Health,
 * Attribution, Channels, Referrals, Actions proposées, Top Signals,
 * Top Opportunities, Top Recommendations + sections P2.4 de mesure
 * (entonnoir, évolution, couverture, mesure avant/après des actions
 * DÉCLARÉES, préparation d'expériences DRAFT). Lecture seule intégrale :
 * fetch unique de la route admin existante, aucun POST, aucune action
 * exposée (tout reste « PROPOSED »), aucune déclaration depuis l'UI
 * (le mécanisme de déclaration vit côté API, hors panneau).
 */

type InsightsBundle = GrowthInsightBundle & { measurement?: GrowthMeasurement };

const CARD = "bg-surface-container-lowest border border-outline-variant rounded-xl p-4";
const LABEL = "font-label-sm font-semibold text-on-surface-variant uppercase tracking-wide";

function ratingChip(rating: string): string {
  const base = "px-2 py-0.5 rounded-full text-xs font-semibold";
  if (rating === "GOOD" || rating === "VALID" || rating === "OBSERVED") return `${base} text-tertiary`;
  if (rating === "INSUFFICIENT_DATA" || rating === "UNAVAILABLE") return `${base} bg-surface-container-high text-on-surface-variant`;
  if (rating === "HIGH" || rating === "CRITICAL") return `${base} bg-error-container text-on-error-container`;
  if (rating === "MEDIUM") return `${base} bg-secondary-container text-secondary`;
  if (rating === "LOW") return `${base} text-primary bg-primary-container`;
  if (rating === "DECLARED_REALIZED") return `${base} text-primary bg-primary-container`;
  if (rating === "NOT_DECLARED" || rating === "UNKNOWN" || rating === "NOT_APPLICABLE") return `${base} bg-surface-container-high text-on-surface-variant`;
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

function fmtNum(v: number | null): string {
  return v === null ? "n/a" : v.toLocaleString("fr-FR");
}

function fmtDelta(v: number | null, kind: "count" | "rate"): string {
  if (v === null) return "n/a";
  const sign = v > 0 ? "+" : "";
  return kind === "rate" ? `${sign}${(v * 100).toFixed(1)} pts` : `${sign}${v.toLocaleString("fr-FR")}`;
}

function windowLabel(w: { from: string; to_exclusive: string } | null): string {
  return w ? `${w.from} → ${w.to_exclusive}` : "n/a";
}

/** Ligne d'une métrique de fenêtre (P2.4) : avant → après + statuts. */
function WindowMetricRow({ wm }: { wm: WindowMetric }) {
  const isCount = wm.metric === "subscription_count";
  if (!wm.measured) {
    return (
      <li className="text-xs flex items-start justify-between gap-2 border-t border-outline-variant pt-1">
        <span className="text-on-surface-variant">
          {wm.metric} — {wm.not_measured_reason}
        </span>
        <span className={ratingChip(wm.status)}>{wm.status}</span>
      </li>
    );
  }
  const fmt = (v: number | null): string =>
    v === null ? "n/a" : isCount ? v.toLocaleString("fr-FR") : `${(v * 100).toFixed(1)} %`;
  return (
    <li className="text-xs flex items-center justify-between gap-2 border-t border-outline-variant pt-1">
      <span>
        {wm.metric} : {fmt(wm.before)} → {fmt(wm.after)}
        {wm.delta !== null
          ? ` (${wm.delta > 0 ? "+" : ""}${isCount ? wm.delta.toLocaleString("fr-FR") : `${(wm.delta * 100).toFixed(1)} pts`})`
          : ""}
        {wm.evolution ? ` · ${wm.evolution}` : ""}
        {` · base avant ${fmtNum(wm.before_denominator)} / après ${fmtNum(wm.after_denominator)}`}
      </span>
      <span className="flex gap-1 shrink-0">
        <span className={ratingChip(wm.before_status)}>{wm.before_status}</span>
        <span className={ratingChip(wm.after_status)}>{wm.after_status}</span>
      </span>
    </li>
  );
}

/** Carte d'une action déclarée et de sa mesure avant/après (P2.4 §D). */
function MeasurementActionEntry({ entry }: { entry: ActionMeasurementEntry }) {
  return (
    <li className="text-sm border border-outline-variant rounded-lg px-3 py-2 grid gap-1">
      <span className="flex items-center justify-between gap-2">
        <span className="font-semibold">{entry.title}</span>
        <span className="flex gap-1">
          <span className={ratingChip(entry.implementation)}>{entry.implementation}</span>
          <span className={ratingChip(entry.result)}>{entry.result}</span>
          <span className={ratingChip(entry.confidence)}>confiance {entry.confidence}</span>
        </span>
      </span>
      <span className="text-xs text-on-surface-variant">
        {entry.action_id} · {entry.action_type} · horizon {entry.horizon} · statut {entry.plan_status}
      </span>
      <span className="text-xs text-on-surface-variant">
        déclarée {entry.declared_at ?? "—"} · fenêtre {entry.window_days ?? "—"} j ·
        avant {windowLabel(entry.before_window)} · après {windowLabel(entry.after_window)} ·
        {" "}{entry.after_complete ? "fenêtre postérieure terminée" : "fenêtre postérieure en cours"}
      </span>
      {entry.volume.before_events !== null && entry.volume.after_events !== null && (
        <span className="text-xs text-on-surface-variant">
          événements observés : avant {fmtNum(entry.volume.before_events)} · après {fmtNum(entry.volume.after_events)}
        </span>
      )}
      {entry.metrics.length > 0 && (
        <ul className="grid gap-1 mt-1">
          {entry.metrics.map((wm) => (
            <WindowMetricRow key={wm.metric} wm={wm} />
          ))}
        </ul>
      )}
      <span className="text-xs text-on-surface-variant">{entry.interpretation}</span>
    </li>
  );
}

/** Sections P2.4 : entonnoir, évolution, couverture, actions, expériences. */
function MeasurementSections({ measurement }: { measurement: GrowthMeasurement }) {
  const { funnel, trend, coverage, actions, experiments } = measurement;
  const declaredEntries = actions.entries.filter((e) => e.implementation !== "NOT_DECLARED");
  const undeclaredCount = actions.entries.length - declaredEntries.length;

  return (
    <>
      {/* P2.4 Étape C — entonnoir de conversion mesurable */}
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Entonnoir de conversion (P2.4)</h2>
          <span className="text-xs text-on-surface-variant">
            {funnel.source} · dénominateurs affichés · jamais de faux 0
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mb-3">
          {funnel.steps.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between gap-2 border border-outline-variant rounded-lg px-3 py-2"
            >
              <span className="text-sm">{s.label}</span>
              <span className="flex items-center gap-2">
                <span className="text-sm font-semibold">{s.status === "MISSING_DATA" ? "n/a" : fmtNum(s.count)}</span>
                <span className={ratingChip(s.status)}>{s.status}</span>
              </span>
            </div>
          ))}
        </div>
        <ul className="grid gap-2 mb-3">
          {funnel.rates.map((r: FunnelRate) => (
            <li key={r.key} className="text-sm border border-outline-variant rounded-lg px-3 py-2 grid gap-1 sm:grid-cols-2">
              <span className="font-semibold">{r.label}</span>
              <span className="flex items-center gap-2 sm:justify-end">
                <span className="text-sm font-semibold">{r.value === null ? "n/a" : `${(r.value * 100).toFixed(1)} %`}</span>
                <span className={ratingChip(r.status)}>{r.status}</span>
              </span>
              <span className="text-xs text-on-surface-variant sm:col-span-2">
                {r.numerator_key} {fmtNum(r.numerator)} / {r.denominator_label} {fmtNum(r.denominator)} ·
                {" "}min sample {r.min_sample}
              </span>
            </li>
          ))}
        </ul>
        <div className="grid gap-1">
          {funnel.not_applicable.map((na) => (
            <p key={na.key} className="text-xs text-on-surface-variant">
              <span className={ratingChip("NOT_APPLICABLE")}>NOT_APPLICABLE</span>{" "}
              {na.label} — {na.reason}
            </p>
          ))}
        </div>
      </div>

      {/* P2.4 Étape C — évolution par période + couverture */}
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Évolution &amp; couverture (P2.4)</h2>
          <span className="text-xs text-on-surface-variant">
            {trend.period.from} → {trend.period.to} vs {trend.previous_period.from} → {trend.previous_period.to}
            {" · "}
            {trend.comparable ? "périodes comparables" : "périodes non comparables"}
          </span>
        </div>
        <ul className="grid gap-2 mb-3">
          {trend.points.map((p: TrendPoint) => (
            <li key={`${p.kind}-${p.key}`} className="text-sm border border-outline-variant rounded-lg px-3 py-2 grid gap-1 sm:grid-cols-2">
              <span className="font-semibold">{p.label}</span>
              <span className="flex items-center gap-2 sm:justify-end">
                <span className="text-xs text-on-surface-variant">{fmtDelta(p.delta, p.kind)}</span>
                <span className={ratingChip(p.status)}>{p.status}</span>
              </span>
              <span className="text-xs text-on-surface-variant sm:col-span-2">
                période {p.kind === "rate" ? fmtPct(p.current) : fmtNum(p.current)} ·
                {" "}précédente {p.kind === "rate" ? fmtPct(p.previous) : fmtNum(p.previous)} ·
                {" "}variation {p.delta_pct === null ? "n/a" : `${(p.delta_pct * 100).toFixed(1)} %`}
              </span>
            </li>
          ))}
        </ul>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-outline-variant rounded-lg px-3 py-2">
            <p className="text-xs text-on-surface-variant">Jours avec données (période courante)</p>
            <p className="text-sm font-semibold">
              {fmtNum(coverage.current.days_with_data)}/{coverage.current.days}
              {coverage.current.rate !== null ? ` · ${fmtPct(coverage.current.rate)}` : ""}
            </p>
            <span className={ratingChip(coverage.current.status)}>{coverage.current.status}</span>
          </div>
          <div className="border border-outline-variant rounded-lg px-3 py-2">
            <p className="text-xs text-on-surface-variant">Jours avec données (période précédente)</p>
            <p className="text-sm font-semibold">
              {fmtNum(coverage.previous.days_with_data)}/{coverage.previous.days}
              {coverage.previous.rate !== null ? ` · ${fmtPct(coverage.previous.rate)}` : ""}
            </p>
            <span className={ratingChip(coverage.previous.status)}>{coverage.previous.status}</span>
          </div>
          <div className="border border-outline-variant rounded-lg px-3 py-2">
            <p className="text-xs text-on-surface-variant">Dernier jour partiel inclus</p>
            <p className="text-sm font-semibold">{coverage.includes_partial_today ? "oui" : "non"}</p>
          </div>
          <div className="border border-outline-variant rounded-lg px-3 py-2">
            <p className="text-xs text-on-surface-variant">Inscrits sans attribution (P2.2)</p>
            <p className="text-sm font-semibold">{fmtNum(coverage.unattributed)}</p>
            <span className={ratingChip(coverage.unattributed_status)}>{coverage.unattributed_status}</span>
          </div>
        </div>
      </div>

      {/* P2.4 Étape D — mesure avant/après des actions déclarées */}
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Mesure des actions déclarées (P2.4)</h2>
          <span className="text-xs text-on-surface-variant">
            déclarées {actions.declared_valid}/{actions.declared_total} · doublons {actions.duplicates_ignored} ·
            {" "}invalides {actions.invalid_ignored} · fenêtres {actions.processed}/{actions.window_cap} ·
            {" "}corrélation temporelle uniquement
          </span>
        </div>
        <span className={ratingChip(actions.load_status)}>{actions.load_status}</span>
        {declaredEntries.length === 0 ? (
          <p className="text-sm text-on-surface-variant mt-2">
            Aucune action n&apos;a été déclarée : toutes restent des propositions PROPOSED.
          </p>
        ) : (
          <ul className="grid gap-2 mt-2">
            {declaredEntries.map((entry) => (
              <MeasurementActionEntry key={entry.action_id} entry={entry} />
            ))}
          </ul>
        )}
        {undeclaredCount > 0 && (
          <p className="text-xs text-on-surface-variant mt-2">
            {undeclaredCount} action(s) sans déclaration explicite — statut PROPOSED inchangé.
          </p>
        )}
      </div>

      {/* P2.4 Étape E — préparation des expérimentations (DRAFT, jamais lancées) */}
      <div className={CARD}>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className={LABEL}>Préparation d&apos;expériences (P2.4)</h2>
          <span className="text-xs text-on-surface-variant">
            aucun lancement · état DRAFT · affectation absente · consentement absent
          </span>
        </div>
        <ul className="grid gap-2">
          {experiments.experiments.map((x: ExperimentPreparation) => (
            <li key={x.id} className="text-sm border border-outline-variant rounded-lg px-3 py-2 grid gap-1">
              <span className="flex items-center justify-between gap-2">
                <span className="font-semibold">{x.title}</span>
                <span className="flex gap-1">
                  <span className={ratingChip(x.state)}>{x.state}</span>
                  <span className={ratingChip(x.launch_state)}>{x.launch_state}</span>
                </span>
              </span>
              <span className="text-xs text-on-surface-variant">{x.id} · {x.hypothesis}</span>
              <span className="text-xs text-on-surface-variant">
                primaire {x.primary_metric} = baseline {fmtPct(x.baseline)} (base {fmtNum(x.baseline_denominator)}) ·
                {" "}{x.min_observations} observations requises
                <span className={ratingChip(x.baseline_status)}> {x.baseline_status}</span>
              </span>
              <span className="text-xs text-on-surface-variant">
                guardrails {x.guardrail_metrics.join(", ")} · volume ~{x.daily_volume ?? "n/a"} observation(s)/jour ·
                {" "}~{x.estimated_days_to_min_sample ?? "n/a"} j requis
                <span className={ratingChip(x.volume_status)}> {x.volume_status}</span>
              </span>
              <span className="text-xs text-on-surface-variant">Contrôle : {x.control} · Candidat : {x.candidate}</span>
              <ul className="grid gap-1">
                {x.blocking_reasons.map((reason) => (
                  <li key={reason} className="text-xs text-on-surface-variant">— {reason}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="text-xs text-on-surface-variant mt-2">{experiments.note}</p>
      </div>
    </>
  );
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
  const [data, setData] = useState<InsightsBundle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/admin/growth/insights")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as InsightsBundle;
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

      {/* P2.4 — sections de mesure (lecture seule, ajoutées au bundle) */}
      {data.measurement ? <MeasurementSections measurement={data.measurement} /> : null}

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
