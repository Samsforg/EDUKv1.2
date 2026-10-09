import { countFunnelForDay } from "@/lib/analytics-db";
import { getBusinessRevenue, getCanonicalMRR } from "@/lib/business-metrics";
import { IS_PG, query, queryOne } from "@/lib/db";
import { testUsersWhere } from "@/lib/test-users";
import { computeCoverage } from "./attribution";
import type {
  AttributionSourceType,
  ChannelRow,
  GrowthAttributionSummary,
  GrowthData,
  GrowthIntelligenceData,
  InsightStatus,
  ReferralRow,
  SegmentKey,
} from "./types";
import { MIN_SAMPLE, PERIOD_DAYS, RETENTION_STATUS, SOURCE_ATTRIBUTION, SOURCE_BUSINESS } from "./thresholds";

/**
 * P2.1 — couche DATA : agrégats réels → input du Decision Layer.
 *
 * - funnel : `countFunnelForDay` (P1.0 — SQL portable SQLite/PG, comptes de
 *   test exclus, événements anonymes conservés) sommé sur la fenêtre
 *   courante puis sur la fenêtre précédente (tendances) ;
 * - segments : 6 comptages DISTINCT test-exclus, bornes textuelles UTC
 *   (mêmes conventions que analytics-db) ;
 * - revenue : sources canoniques `getCanonicalMRR` / `getBusinessRevenue` ;
 * - retention : JAMAIS recalculée ici — l'état officiel du contrat P2 est
 *   rapporté tel quel (aucune métrique fabriquée).
 *
 * Lecture seule : aucune écriture, aucun appel externe, aucun secret.
 */

function isValidDay(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(new Date(`${date}T00:00:00Z`).getTime());
}

function utcDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function shiftDay(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return utcDay(d);
}

/** Bornes [début, lendemain[ en textuelle UTC — comparable sur created_at. */
function dayStart(date: string): string {
  return `${date} 00:00:00`;
}

function dayEndExclusive(date: string): string {
  return `${shiftDay(date, 1)} 00:00:00`;
}

// Alias `tu` (jamais `u`/`r`/`e`) : une sous-requête qui réutilise l'alias
// externe masquerait la colonne (`u.id = u.id`) et filtrerait toute la table.
const notTest = (alias: string) =>
  `NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = ${alias} AND (${testUsersWhere("tu")}))`;

async function sumFunnel(from: string, to: string): Promise<Record<string, number>> {
  const total: Record<string, number> = {};
  let day = from;
  let guard = 0;
  while (day <= to && guard < 62) {
    const funnel = await countFunnelForDay(day);
    for (const [key, value] of Object.entries(funnel)) {
      total[key] = (total[key] ?? 0) + value;
    }
    day = shiftDay(day, 1);
    guard += 1;
  }
  // P1.0 — même réconciliation que /api/growth/metrics : l'événement réel
  // s'appelle `pageview` (EdukoraAnalytics), la taxonomie dit `page_view`.
  if (total["pageview"] !== undefined || total["page_view"] !== undefined) {
    total["page_view"] = (total["pageview"] ?? 0) + (total["page_view"] ?? 0);
  }
  return total;
}

async function countSegment(key: SegmentKey, from: string, to: string): Promise<number> {
  const start = dayStart(from);
  const end = dayEndExclusive(to);
  switch (key) {
    case "REGISTERED_NOT_ACTIVATED": {
      const r = await queryOne<{ c: number | string }>(
        `SELECT COUNT(DISTINCT e.user_id) AS c FROM analytics_events e
         WHERE e.event = 'signup_completed' AND e.user_id IS NOT NULL
           AND e.created_at >= ? AND e.created_at < ? AND ${notTest("e.user_id")}
           AND NOT EXISTS (
             SELECT 1 FROM analytics_events a
             WHERE a.user_id = e.user_id AND a.event = 'activated'
           )`,
        start,
        end,
      );
      return Number(r?.c ?? 0);
    }
    case "ACTIVATED_NOT_PAID": {
      const r = await queryOne<{ c: number | string }>(
        `SELECT COUNT(DISTINCT e.user_id) AS c FROM analytics_events e
         WHERE e.event = 'activated' AND e.user_id IS NOT NULL
           AND e.created_at >= ? AND e.created_at < ? AND ${notTest("e.user_id")}
           AND NOT EXISTS (
             SELECT 1 FROM analytics_events p
             WHERE p.user_id = e.user_id AND p.event = 'purchase'
           )
           AND NOT EXISTS (
             SELECT 1 FROM subscriptions s
             WHERE s.user_id = e.user_id AND s.status = 'active'
           )`,
        start,
        end,
      );
      return Number(r?.c ?? 0);
    }
    case "PAID_USER": {
      const r = await queryOne<{ c: number | string }>(
        `SELECT COUNT(*) AS c FROM subscriptions s
         WHERE s.status = 'active' AND ${notTest("s.user_id")}`,
      );
      return Number(r?.c ?? 0);
    }
    case "RETURNING_USER": {
      // P2.5.2 — P2-2 : le comptage repose désormais sur l'activité
      // utilisateur (user_id interne stable) répartie sur 2+ jours
      // distincts de la période, et non plus sur l'événement device-level
      // `return_visit` (localStorage, non fiable cross-device).
      // Le `return_visit` reste émis côté client (mesure device conservée)
      // mais n'est plus la source de vérité du segment.
      const r = await queryOne<{ c: number | string }>(
        `SELECT COUNT(*) AS c FROM (
           SELECT e.user_id
           FROM analytics_events e
           WHERE e.user_id IS NOT NULL
             AND e.created_at >= ? AND e.created_at < ? AND ${notTest("e.user_id")}
           GROUP BY e.user_id
           HAVING COUNT(DISTINCT substr(e.created_at, 1, 10)) >= 2
         ) t`,
        start,
        end,
      );
      return Number(r?.c ?? 0);
    }
    case "HIGH_INTENT": {
      const r = await queryOne<{ c: number | string }>(
        `SELECT COUNT(DISTINCT e.user_id) AS c FROM analytics_events e
         WHERE e.event = 'begin_checkout' AND e.user_id IS NOT NULL
           AND e.created_at >= ? AND e.created_at < ? AND ${notTest("e.user_id")}
           AND NOT EXISTS (
             SELECT 1 FROM analytics_events p
             WHERE p.user_id = e.user_id AND p.event = 'purchase'
           )
           AND NOT EXISTS (
             SELECT 1 FROM subscriptions s
             WHERE s.user_id = e.user_id AND s.status = 'active'
           )`,
        start,
        end,
      );
      return Number(r?.c ?? 0);
    }
    case "DORMANT_USER": {
      const lookbackStart = dayStart(shiftDay(to, -PERIOD_DAYS.dormant_lookback));
      const silentFrom = dayEndExclusive(shiftDay(to, -PERIOD_DAYS.dormant_after));
      const activeFrom = dayStart(shiftDay(to, -PERIOD_DAYS.dormant_after));
      const r = await queryOne<{ c: number | string }>(
        `SELECT COUNT(DISTINCT e.user_id) AS c FROM analytics_events e
         WHERE e.user_id IS NOT NULL AND ${notTest("e.user_id")}
           AND e.created_at >= ? AND e.created_at < ?
           AND NOT EXISTS (
             SELECT 1 FROM analytics_events r
             WHERE r.user_id = e.user_id AND r.created_at >= ?
           )`,
        lookbackStart,
        silentFrom,
        activeFrom,
      );
      return Number(r?.c ?? 0);
    }
    case "NEW_VISITOR":
      return 0;
    default:
      return 0;
  }
}

export interface GrowthDataOptions {
  /** Jour de fin de la fenêtre (UTC, défaut : jour courant). */
  anchorDate?: string;
  /** Taille de fenêtre en jours (défaut : PERIOD_DAYS.current = 7). */
  days?: number;
  /** Horloge injectable pour les tests (défaut : Date.now). */
  now?: Date;
}

// ── P2.2 — couche attribution (§3-§6) ───────────────────────────────
// Lecture seule : 2 requêtes agrégées SQL, extraction JSON dialectale
// (mêmes branches SQLite/PostgreSQL que le rapport UTM P1.2), comptes
// de test exclus des deux côtés de chaque relation.

/** Extraction dialectale d'une clé des props (whitelist stricte ci-dessous). */
function jsonExpr(propKey: "source" | "gclid" | "fbclid"): string {
  return IS_PG ? `(e.props::json->>'${propKey}')` : `json_extract(e.props, '$.${propKey}')`;
}

/** Canal SQL → classe de source (§12 : taxonomie utm/paid/referral/unknown). */
function channelToSourceType(channel: string): AttributionSourceType {
  if (channel === "paid_click") return "paid_click";
  if (channel === "referral") return "referral";
  if (channel === "unknown") return "unknown";
  return "utm";
}

interface SqlCountRow {
  [key: string]: number | string | null;
}

function num(v: number | string | null | undefined): number {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Performance par canal : inscrits de la période groupés par signal
 * d'acquisition (props de `signup_completed`, forme courte P1.0), avec
 * activation / abonnement / revenu joignés par `user_id`.
 * Le canal dérive de : utm_source → clic (gclid/fbclid) → parrainage →
 * inconnu (priorité §4, mêmes règles que attribution.ts côté client).
 */
async function loadChannelRows(from: string, to: string): Promise<ChannelRow[]> {
  const rows = await query<SqlCountRow>(
    `WITH per_user AS (
       SELECT e.user_id,
              MIN(${jsonExpr("source")})  AS source,
              MIN(${jsonExpr("gclid")})   AS gclid,
              MIN(${jsonExpr("fbclid")})  AS fbclid
       FROM analytics_events e
       WHERE e.event = 'signup_completed' AND e.user_id IS NOT NULL
         AND e.created_at >= ? AND e.created_at < ? AND ${notTest("e.user_id")}
       GROUP BY e.user_id
     )
     SELECT CASE
              WHEN p.source IS NOT NULL AND p.source <> '' THEN LOWER(TRIM(p.source))
              WHEN p.gclid IS NOT NULL OR p.fbclid IS NOT NULL THEN 'paid_click'
              WHEN u.referred_by IS NOT NULL THEN 'referral'
              ELSE 'unknown'
            END AS channel,
            COUNT(*) AS signups,
            SUM(CASE WHEN EXISTS (
                  SELECT 1 FROM analytics_events a
                  WHERE a.user_id = p.user_id AND a.event = 'activated'
                ) THEN 1 ELSE 0 END) AS activated,
            SUM(CASE WHEN EXISTS (
                  SELECT 1 FROM subscriptions s
                  WHERE s.user_id = p.user_id AND s.status = 'active'
                ) THEN 1 ELSE 0 END) AS subscriptions,
            COALESCE(SUM((
                  SELECT SUM(s2.price_cents) FROM subscriptions s2
                  WHERE s2.user_id = p.user_id AND s2.status = 'active'
                )), 0) AS revenue_cents
     FROM per_user p
     LEFT JOIN users u ON u.id = p.user_id
     GROUP BY channel
     ORDER BY signups DESC, channel`,
    dayStart(from),
    dayEndExclusive(to),
  );
  return rows.map((r) => ({
    channel: String(r.channel ?? "unknown"),
    signups: num(r.signups),
    activated: num(r.activated),
    subscriptions: num(r.subscriptions),
    revenue_cents: num(r.revenue_cents),
  }));
}

/**
 * Performance par référent : filleuls créés dans la période groupés par
 * code de parrainage. `signups` borné à la période ; activation /
 * abonnements / revenu reflètent l'état actuel (mêmes conventions que
 * le rapport UTM P1.2). Aucune PII : le code seulement.
 */
async function loadReferralRows(from: string, to: string): Promise<ReferralRow[]> {
  const rows = await query<SqlCountRow>(
    `SELECT r.referral_code AS referral,
            COUNT(u.id) AS signups,
            SUM(CASE WHEN EXISTS (
                  SELECT 1 FROM analytics_events a
                  WHERE a.user_id = u.id AND a.event = 'activated'
                ) THEN 1 ELSE 0 END) AS activated,
            SUM(CASE WHEN EXISTS (
                  SELECT 1 FROM subscriptions s
                  WHERE s.user_id = u.id AND s.status = 'active'
                ) THEN 1 ELSE 0 END) AS subscriptions,
            COALESCE(SUM((
                  SELECT SUM(s2.price_cents) FROM subscriptions s2
                  WHERE s2.user_id = u.id AND s2.status = 'active'
                )), 0) AS revenue_cents
     FROM users u JOIN users r ON r.id = u.referred_by
     WHERE u.created_at >= ? AND u.created_at < ? AND r.referral_code IS NOT NULL
       AND ${notTest("u.id")} AND ${notTest("r.id")}
     GROUP BY r.referral_code
     ORDER BY signups DESC, r.referral_code`,
    dayStart(from),
    dayEndExclusive(to),
  );
  return rows.map((r) => ({
    referral: String(r.referral ?? ""),
    signups: num(r.signups),
    activated: num(r.activated),
    subscriptions: num(r.subscriptions),
    revenue_cents: num(r.revenue_cents),
  }));
}

const EMPTY_ATTRIBUTION_SUMMARY: GrowthAttributionSummary = {
  coverage: computeCoverage(0, 0),
  sources: { by_type: { utm: 0, paid_click: 0, referral: 0, unknown: 0 }, unknown_rate: null, status: "INSUFFICIENT_DATA" },
  top_source: null,
  source: SOURCE_ATTRIBUTION,
};

/**
 * Couche d'attribution complète : canaux + référents + couverture.
 * Toute erreur (table absente, props illisibles) → `available: false`
 * et compteurs à 0 explicites (jamais de fausses métriques, §2).
 */
async function computeIntelligence(from: string, to: string): Promise<GrowthIntelligenceData> {
  try {
    const [channels, referrals] = await Promise.all([
      loadChannelRows(from, to),
      loadReferralRows(from, to),
    ]);

    const attributed = channels
      .filter((c) => c.channel !== "unknown")
      .reduce((sum, c) => sum + c.signups, 0);
    const unattributed = channels
      .filter((c) => c.channel === "unknown")
      .reduce((sum, c) => sum + c.signups, 0);
    const total = attributed + unattributed;

    const by_type: Record<AttributionSourceType, number> = { utm: 0, paid_click: 0, referral: 0, unknown: 0 };
    for (const c of channels) by_type[channelToSourceType(c.channel)] += c.signups;
    const unknown_rate = total > 0 ? by_type.unknown / total : null;
    const sourcesStatus: InsightStatus = total >= MIN_SAMPLE.segment ? "VALID" : "INSUFFICIENT_DATA";

    const topNonUnknown = channels.find((c) => c.channel !== "unknown") ?? null;

    const attribution: GrowthAttributionSummary = {
      coverage: computeCoverage(attributed, unattributed),
      sources: { by_type, unknown_rate, status: sourcesStatus },
      top_source: topNonUnknown ? topNonUnknown.channel : null,
      source: SOURCE_ATTRIBUTION,
    };

    return { channels, referrals, attribution, available: true };
  } catch {
    return {
      channels: [],
      referrals: [],
      attribution: EMPTY_ATTRIBUTION_SUMMARY,
      available: false,
    };
  }
}

/**
 * Construit l'input complet du Decision Layer pour la fenêtre
 * [anchor − days + 1, anchor] et la période précédente équivalente.
 */
export async function computeGrowthData(opts: GrowthDataOptions = {}): Promise<GrowthData> {
  const now = opts.now ?? new Date();
  const anchorRaw = opts.anchorDate ?? utcDay(now);
  const anchor = isValidDay(anchorRaw) ? anchorRaw : utcDay(now);
  const days = Math.max(1, Math.min(31, opts.days ?? PERIOD_DAYS.current));

  const periodFrom = shiftDay(anchor, -(days - 1));
  const periodTo = anchor;
  const previousFrom = shiftDay(periodFrom, -days);
  const previousTo = shiftDay(periodFrom, -1);

  const funnel = await sumFunnel(periodFrom, periodTo);
  const previousFunnel = await sumFunnel(previousFrom, previousTo);

  const segmentKeys: SegmentKey[] = [
    "NEW_VISITOR",
    "REGISTERED_NOT_ACTIVATED",
    "ACTIVATED_NOT_PAID",
    "PAID_USER",
    "RETURNING_USER",
    "HIGH_INTENT",
    "DORMANT_USER",
  ];
  const segments: Record<SegmentKey, number> = {
    NEW_VISITOR: funnel["page_view"] ?? 0,
    REGISTERED_NOT_ACTIVATED: 0,
    ACTIVATED_NOT_PAID: 0,
    PAID_USER: 0,
    RETURNING_USER: 0,
    HIGH_INTENT: 0,
    DORMANT_USER: 0,
  };
  let segmentsAvailable = true;
  try {
    for (const key of segmentKeys) {
      if (key === "NEW_VISITOR") continue;
      segments[key] = await countSegment(key, periodFrom, periodTo);
    }
  } catch {
    segmentsAvailable = false;
    for (const key of segmentKeys) segments[key] = 0;
    segments.NEW_VISITOR = funnel["page_view"] ?? 0;
  }

  let revenue = { mrr_cents: 0, active_subs: 0, available: false, source: SOURCE_BUSINESS };
  try {
    const [mrr, business] = await Promise.all([getCanonicalMRR(), getBusinessRevenue()]);
    revenue = { mrr_cents: mrr, active_subs: business.count, available: true, source: SOURCE_BUSINESS };
  } catch {
    revenue = { mrr_cents: 0, active_subs: 0, available: false, source: SOURCE_BUSINESS };
  }

  // P2.2 — couche attribution : canaux, référents, couverture (§11-§12).
  const intelligence = await computeIntelligence(periodFrom, periodTo);

  return {
    period: { from: periodFrom, to: periodTo, days },
    previous_period: { from: previousFrom, to: previousTo, days },
    funnel,
    previous_funnel: previousFunnel,
    segments,
    segments_available: segmentsAvailable,
    revenue,
    retention: { available: false, value: null, status: RETENTION_STATUS as InsightStatus },
    intelligence,
    created_at: now.toISOString(),
  };
}
