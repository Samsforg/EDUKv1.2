/**
 * P1.2 — requête canonique d'acquisition UTM (contrat §4).
 *
 * Lit **uniquement** les props de `signup_completed` — les clés stockées sont
 * la forme courte émise par `signupAttributionProps()` (`source`, `medium`,
 * `campaign`, `content`, `term`, `gclid`, `fbclid`) et non les alias `utm_*`
 * de l'URL. En sortie, chaque segment est exposé sous son nom `utm_*`
 * canonique (attendu par un rapport d'acquisition).
 *
 * Fidélité aux règles P1.2 :
 *  - comptes de test exclus (même prédicat `testUsersWhere` que le reste du
 *    système) — un signups de test n'apparaît dans aucun segment ;
 *  - groupement par user_id : une personne = 1 signups par segment, même si
 *    elle émet plusieurs `signup_completed` ;
 *  - chaque segment porte ses métriques joignables : `signups`, `activated`,
 *    `purchasers`/`purchases` (événements `purchase` first-party) et
 *    `mrr_active_cents` (abonnement actif, helper métier) ;
 *  - les signups **sans identité** (`user_id NULL`, non joignables) sont
 *    comptés dans `unattributed_signups` — jamais attribués à un segment,
 *    jamais transformés en 0 ;
 *  - SQLite / PostgreSQL : branche dialectale sur l'extraction JSON
 *    (`json_extract` vs `props::json->>`), AUCUN `::` ni fonction
 *    non portable ailleurs ;
 *  - toute erreur d'extraction (props non-JSON) ou absence de table →
 *    `status: "indisponible"` (jamais des zéros silencieux).
 *
 * Ne jamais l'utiliser dans la couche Business Metrics : ce rapport est
 * couche Product Analytics (contrat §2), `mrr_active_cents` est la seule
 * donnée métier croisée et provient de getCanonicalMRR-compatible jointure
 * sur `subscriptions.status = 'active'`.
 */
import { query, queryOne, IS_PG } from "@/lib/db";
import { testUsersWhere } from "@/lib/test-users";
import { ensureAnalyticsTable } from "@/lib/analytics-db";

/** Clés stockées dans props de `signup_completed` (forme courte). */
export const UTM_PROP_KEYS = ["source", "medium", "campaign", "content", "term", "gclid", "fbclid"] as const;
export type UtmPropKey = (typeof UTM_PROP_KEYS)[number];

export interface UtmAcquisitionRow {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  signups: number;
  activated: number;
  purchasers: number;
  purchases: number;
  mrr_active_cents: number;
}

export type UtmAcquisitionReport =
  | { status: "ok"; rows: UtmAcquisitionRow[]; unattributed_signups: number }
  | { status: "indisponible"; reason: string };

/** Extraction dialectale d'une clé de props (SQLite vs PostgreSQL). */
function jsonExpr(propKey: UtmPropKey): string {
  return IS_PG ? `(e.props::json->>'${propKey}')` : `json_extract(e.props, '$.${propKey}')`;
}

export async function getUtmAcquisitionReport(): Promise<UtmAcquisitionReport> {
  try {
    await ensureAnalyticsTable();
    const notTestU = (alias: string) =>
      `NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = ${alias} AND (${testUsersWhere("tu")}))`;

    const rows = await query<UtmAcquisitionRow>(
      `WITH per_user AS (
         SELECT e.user_id,
                MIN(${jsonExpr("source")})   AS source,
                MIN(${jsonExpr("medium")})   AS medium,
                MIN(${jsonExpr("campaign")}) AS campaign,
                MIN(${jsonExpr("content")})  AS content,
                MIN(${jsonExpr("term")})     AS term,
                MIN(${jsonExpr("gclid")})    AS gclid,
                MIN(${jsonExpr("fbclid")})   AS fbclid
         FROM analytics_events e
         WHERE e.event = 'signup_completed' AND e.user_id IS NOT NULL
           AND ${notTestU("e.user_id")}
         GROUP BY e.user_id
       )
       SELECT p.source   AS utm_source,
              p.medium   AS utm_medium,
              p.campaign AS utm_campaign,
              p.content  AS utm_content,
              p.term     AS utm_term,
              p.gclid    AS gclid,
              p.fbclid   AS fbclid,
              COUNT(*)   AS signups,
              SUM(CASE WHEN EXISTS (
                     SELECT 1 FROM analytics_events a
                     WHERE a.user_id = p.user_id AND a.event = 'activated'
                   ) THEN 1 ELSE 0 END) AS activated,
              SUM(CASE WHEN EXISTS (
                     SELECT 1 FROM analytics_events pv
                     WHERE pv.user_id = p.user_id AND pv.event = 'purchase'
                   ) THEN 1 ELSE 0 END) AS purchasers,
              COALESCE(SUM((
                     SELECT COUNT(*) FROM analytics_events pv
                     WHERE pv.user_id = p.user_id AND pv.event = 'purchase'
                   )), 0) AS purchases,
              COALESCE(SUM((
                     SELECT SUM(s.price_cents) FROM subscriptions s
                     WHERE s.user_id = p.user_id AND s.status = 'active'
                       AND ${notTestU("s.user_id")}
                   )), 0) AS mrr_active_cents
       FROM per_user p
       GROUP BY p.source, p.medium, p.campaign, p.content, p.term, p.gclid, p.fbclid
       ORDER BY signups DESC, utm_source`,
    );

    const unattributed = await queryOne<{ c: number | string }>(
      `SELECT COUNT(*) AS c FROM analytics_events
       WHERE event = 'signup_completed' AND user_id IS NULL`,
    );

    return {
      status: "ok",
      rows: rows.map((r) => ({
        utm_source: r.utm_source,
        utm_medium: r.utm_medium,
        utm_campaign: r.utm_campaign,
        utm_content: r.utm_content,
        utm_term: r.utm_term,
        gclid: r.gclid,
        fbclid: r.fbclid,
        signups: Number(r.signups),
        activated: Number(r.activated ?? 0),
        purchasers: Number(r.purchasers ?? 0),
        purchases: Number(r.purchases ?? 0),
        mrr_active_cents: Number(r.mrr_active_cents ?? 0),
      })),
      unattributed_signups: Number(unattributed?.c ?? 0),
    };
  } catch (e) {
    return { status: "indisponible", reason: e instanceof Error ? e.message.slice(0, 120) : "unknown" };
  }
}
