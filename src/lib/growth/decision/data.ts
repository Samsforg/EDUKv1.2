import { countFunnelForDay } from "@/lib/analytics-db";
import { getBusinessRevenue, getCanonicalMRR } from "@/lib/business-metrics";
import { queryOne } from "@/lib/db";
import { testUsersWhere } from "@/lib/test-users";
import type { GrowthData, InsightStatus, SegmentKey } from "./types";
import { PERIOD_DAYS, RETENTION_STATUS, SOURCE_BUSINESS } from "./thresholds";

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

const notTest = (alias: string) =>
  `NOT EXISTS (SELECT 1 FROM users u WHERE u.id = ${alias} AND (${testUsersWhere("u")}))`;

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
      const r = await queryOne<{ c: number | string }>(
        `SELECT COUNT(DISTINCT e.user_id) AS c FROM analytics_events e
         WHERE e.event = 'return_visit' AND e.user_id IS NOT NULL
           AND e.created_at >= ? AND e.created_at < ? AND ${notTest("e.user_id")}`,
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

  return {
    period: { from: periodFrom, to: periodTo, days },
    previous_period: { from: previousFrom, to: previousTo, days },
    funnel,
    previous_funnel: previousFunnel,
    segments,
    segments_available: segmentsAvailable,
    revenue,
    retention: { available: false, value: null, status: RETENTION_STATUS as InsightStatus },
    created_at: now.toISOString(),
  };
}
