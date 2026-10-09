import { query, queryOne } from "@/lib/db";
import { testUsersWhere } from "@/lib/test-users";
import { ACTION_ID_RE, DECLARATION_EVENT, MAX_WINDOW_DAYS, MIN_WINDOW_DAYS } from "./declaration";
import type { ActionDeclaration } from "./types";

/**
 * P2.4 — accès SQL de la couche mesure : STRICTEMENT lecture seule
 * (SELECT uniquement), test users exclus des agrégats, aucune écriture,
 * aucun appel réseau, aucun secret.
 *
 * Conventions partagées avec `decision/data.ts` :
 *   - bornes textuelles UTC `[début, lendemain[` sur `created_at` ;
 *   - alias `tu` pour la sous-requête d'exclusion de test ;
 *   - `pageview` (nom réel) réconcilié avec `page_view` (taxonomie).
 * `created_at` est TEXT dans les deux moteurs (`toPgSchema` convertit
 * les défauts SQLite mais PAS le type de colonne) : bornes
 * textuelles ISO et `substr(created_at, 1, 10)` restent portables.
 */

/**
 * Exclut les lignes de test uniquement lorsque l'auteur est connu
 * (visiteurs anonymes conservés, comme `countFunnelForDay`).
 * Sans alias : la requête principale ne joint que `analytics_events`.
 */
const AUTHOR_NOT_TEST = `(user_id IS NULL OR NOT EXISTS (
  SELECT 1 FROM users tu WHERE tu.id = user_id AND (${testUsersWhere("tu")})
))`;

const FUNNEL_EVENTS = [
  "pageview",
  "page_view",
  "signup_started",
  "signup_completed",
  "activated",
  "begin_checkout",
  "purchase",
  "return_visit",
];

// ── Couverture (Étape C) ───────────────────────────────────────────────

export interface CoverageMeasurementInput {
  current_days_with_data: number | null;
  previous_days_with_data: number | null;
}

async function countDistinctDays(from: string, toExclusive: string): Promise<number> {
  const r = await queryOne<{ c: number | string }>(
    `SELECT COUNT(DISTINCT substr(created_at, 1, 10)) AS c
     FROM analytics_events
     WHERE created_at >= ? AND created_at < ? AND ${AUTHOR_NOT_TEST}`,
    from,
    toExclusive,
  );
  return Number(r?.c ?? 0);
}

export async function loadCoverage(
  currentFrom: string,
  currentToExclusive: string,
  previousFrom: string,
  previousToExclusive: string,
): Promise<CoverageMeasurementInput> {
  try {
    const current = await countDistinctDays(currentFrom, currentToExclusive);
    const previous = await countDistinctDays(previousFrom, previousToExclusive);
    return {
      current_days_with_data: current,
      previous_days_with_data: previous,
    };
  } catch {
    // Table absente ou requête échouée → null (jamais un 0 faux).
    return {
      current_days_with_data: null,
      previous_days_with_data: null,
    };
  }
}

// ── Déclarations d'actions (Étape D) ───────────────────────────────────

export interface DeclarationsLoad {
  rows: ActionDeclaration[];
  /** Lignes brutes lues (plafond de lecture inclus). */
  total: number;
  /** Lignes rejetées (props hors whitelist, identifiant hors format). */
  invalid: number;
  source: "ok" | "unavailable";
}

const DECLARATION_READ_LIMIT = 100;

function parseDeclarationRow(row: {
  props: string | null;
  created_at: string;
  user_id: number | null;
  id: number;
}): ActionDeclaration | null {
  if (row.user_id === null) return null;
  let props: unknown;
  try {
    props = JSON.parse(row.props ?? "{}");
  } catch {
    return null;
  }
  if (typeof props !== "object" || props === null || Array.isArray(props)) return null;
  const record = props as Record<string, unknown>;
  // Whitelist stricte identique à l'écriture : toute clé inconnue invalide la ligne.
  for (const key of Object.keys(record)) {
    if (key !== "action_id" && key !== "window_days") return null;
  }
  const actionId = record.action_id;
  if (typeof actionId !== "string" || !ACTION_ID_RE.test(actionId)) return null;
  const windowRaw = record.window_days;
  const windowDays =
    typeof windowRaw === "number" &&
    Number.isInteger(windowRaw) &&
    windowRaw >= MIN_WINDOW_DAYS &&
    windowRaw <= MAX_WINDOW_DAYS
      ? windowRaw
      : null;
  if (windowDays === null) return null;
  return {
    action_id: actionId,
    declared_at: row.created_at,
    declared_by: row.user_id,
    window_days: windowDays,
  };
}

/**
 * Lecture du registre de déclarations : seuls les comptes **admin réels**
 * (role = admin, compte non-test) peuvent avoir déclaré. Tri déterministe
 * `created_at ASC, id ASC` (dédoublonnage « la première gagne » en amont).
 */
export async function loadDeclarations(): Promise<DeclarationsLoad> {
  try {
    const rows = await query<{
      id: number;
      props: string | null;
      created_at: string;
      user_id: number | null;
    }>(
      `SELECT e.id, e.props, e.created_at, e.user_id
       FROM analytics_events e
       JOIN users u ON u.id = e.user_id
       WHERE e.event = ? AND u.role = 'admin' AND NOT (${testUsersWhere("u")})
       ORDER BY e.created_at ASC, e.id ASC
       LIMIT ${DECLARATION_READ_LIMIT}`,
      DECLARATION_EVENT,
    );
    const parsed: ActionDeclaration[] = [];
    let invalid = 0;
    for (const row of rows) {
      const declaration = parseDeclarationRow(row);
      if (declaration) parsed.push(declaration);
      else invalid += 1;
    }
    return { rows: parsed, total: rows.length, invalid, source: "ok" };
  } catch {
    return { rows: [], total: 0, invalid: 0, source: "unavailable" };
  }
}

/**
 * Idempotence (Étape D) : true si une déclaration valide existe déjà pour
 * cette action (toutes pages de registre confondues, dédoublonnage inclus).
 * Source indisponible → false (meilleur effort documenté : l'insertion
 * `trackDb` reste idempotente côté couche mesure qui lit « première gagne »).
 */
export async function hasDeclaration(actionId: string): Promise<boolean> {
  const load = await loadDeclarations();
  if (load.source !== "ok") return false;
  return load.rows.some((declaration) => declaration.action_id === actionId);
}

// ── Agrégats de fenêtres avant/après (Étape D) ─────────────────────────

export interface WindowAggregate {
  before: Record<string, number>;
  after: Record<string, number>;
  source: "ok" | "unavailable";
}

/**
 * Une seule requête SQL par déclaration : les deux fenêtres sont comptées
 * en parallèle (2 colonnes `SUM(CASE WHEN ...)`), bornes incluses à gauche,
 * exclues à droite, test users exclues, événements anonymes conservés.
 */
export async function loadWindowAggregates(
  beforeFrom: string,
  beforeToExclusive: string,
  afterFrom: string,
  afterToExclusive: string,
): Promise<WindowAggregate> {
  const empty: WindowAggregate = { before: {}, after: {}, source: "unavailable" };
  try {
    const unionFrom = beforeFrom < afterFrom ? beforeFrom : afterFrom;
    const unionTo = beforeToExclusive > afterToExclusive ? beforeToExclusive : afterToExclusive;
    const rows = await query<{ event: string; c0: number | string; c1: number | string }>(
      `SELECT event,
              SUM(CASE WHEN created_at >= ? AND created_at < ? THEN 1 ELSE 0 END) AS c0,
              SUM(CASE WHEN created_at >= ? AND created_at < ? THEN 1 ELSE 0 END) AS c1
       FROM analytics_events
       WHERE created_at >= ? AND created_at < ?
         AND event IN (${FUNNEL_EVENTS.map(() => "?").join(", ")})
         AND ${AUTHOR_NOT_TEST}
       GROUP BY event`,
      beforeFrom,
      beforeToExclusive,
      afterFrom,
      afterToExclusive,
      unionFrom,
      unionTo,
      ...FUNNEL_EVENTS,
    );
    const before: Record<string, number> = {};
    const after: Record<string, number> = {};
    for (const row of rows) {
      before[row.event] = Number(row.c0 ?? 0);
      after[row.event] = Number(row.c1 ?? 0);
    }
    // Réconciliation P1.0 : événement réel `pageview` ↔ taxonomie `page_view`.
    for (const target of [before, after]) {
      if (target.pageview !== undefined || target.page_view !== undefined) {
        target.page_view = (target.pageview ?? 0) + (target.page_view ?? 0);
      }
    }
    return { before, after, source: "ok" };
  } catch {
    return empty;
  }
}
