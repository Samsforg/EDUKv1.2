import { createHash } from "node:crypto";
import { query, queryOne, run, IS_PG, toPgSchema } from "@/lib/db";
import { testUsersWhere } from "@/lib/test-users";

const TABLE_DDL = `
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  session_id TEXT,
  event TEXT NOT NULL,
  props TEXT,
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events(user_id, created_at);
`;

/** DDL SQLite canonique — traduit par toPgSchema en mode PostgreSQL. Exporté pour tests (P1.6 F3). */
export const ANALYTICS_CREATE_SQL = `CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      session_id TEXT,
      event TEXT NOT NULL,
      props TEXT,
      url TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`;

let ensured = false;
export async function ensureAnalyticsTable() {
  if (ensured) return;
  try {
    // P1.3/P1.6 F3 : sur PostgreSQL, le DDL SQLite brut échoue (AUTOINCREMENT
    // absent de PG → catch → table jamais créée → UTM/funnel/analytics
    // structurellement indisponibles). toPgSchema traduit SERIAL + défauts de
    // colonne TEXT. L'échec est journalisé (il était totalement silencieux).
    await run(IS_PG ? toPgSchema(ANALYTICS_CREATE_SQL) : ANALYTICS_CREATE_SQL);
    await run(`CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event, created_at)`);
    await run(`CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events(user_id, created_at)`);
    // P1.0 — activation : UNIQUE ligne `activated` par compte (dédup
    // atomique via ON CONFLICT, y compris sur requêtes concurrentes).
    await run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_analytics_activated ON analytics_events(user_id) WHERE event = 'activated'`);
    ensured = true;
  } catch (err) {
    // P1.6 F3 : jamais de fallback muet — l'échec de création de la table est
    // visible dans les logs (aucun secret ni PII dans le message).
    console.error("[analytics] ensureAnalyticsTable a échoué :", err instanceof Error ? err.message : err);
  }
  if (ensured) {
    try {
      const migrated = await hashLegacySessionIds();
      if (migrated > 0) console.warn(`[analytics] ${migrated} session_id historiques migrés vers sha256`);
    } catch {}
    try {
      const activated = await backfillActivation();
      if (activated > 0) console.warn(`[analytics] ${activated} activation(s) rétroactive(s) derivée(s) de lesson_started`);
    } catch {}
  }
}

// P1.0 — activation rétroactive : chaque compte dont une lesson_started
// existe (écrite avant P1.0) reçoit UN événement `activated` portant le
// timestamp de SA première lesson_started (copié tel quel → conservatoire
// pour la rétention). Idempotent : NOT EXISTS + index unique partiel.
const ACTIVATION_BACKFILL = `INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at)
SELECT f.user_id, f.session_id, 'activated', '{"trigger":"lesson_started"}', f.url, f.created_at
FROM analytics_events f
WHERE f.event = 'lesson_started'
  AND f.user_id IS NOT NULL
  AND f.id = (SELECT MIN(t.id) FROM analytics_events t WHERE t.event = 'lesson_started' AND t.user_id = f.user_id)
  AND NOT EXISTS (SELECT 1 FROM analytics_events a WHERE a.event = 'activated' AND a.user_id = f.user_id)
ON CONFLICT DO NOTHING`;

export async function backfillActivation(): Promise<number> {
  await ensureAnalyticsTable();
  const res = await run(ACTIVATION_BACKFILL);
  return res.changes;
}

// P0.9 — migration idempotente des anciens session_id stockés en clair
// (jeton de session signé tronqué à 80 car., écrit avant P0.8) vers
// sha256, exactement la transformation que la route /api/analytics/track
// applique depuis P0.8 : hacher la valeur historique préserve
// COUNT(DISTINCT session_id) et tous les regroupements existants.
// Seules les valeurs de longueur <> 64 sont candidates ; une valeur
// hex64 est déjà un hash (aucun double-hash), NULL est conservé.
const HASHED_SESSION_RE = /^[0-9a-f]{64}$/;

export async function hashLegacySessionIds(): Promise<number> {
  const rows = await query<{ id: number; session_id: string }>(
    "SELECT id, session_id FROM analytics_events WHERE session_id IS NOT NULL AND length(session_id) <> 64",
  );
  let migrated = 0;
  for (const r of rows) {
    if (HASHED_SESSION_RE.test(r.session_id)) continue;
    const hashed = createHash("sha256").update(r.session_id).digest("hex");
    await run("UPDATE analytics_events SET session_id = ? WHERE id = ?", hashed, r.id);
    migrated += 1;
  }
  return migrated;
}

export async function trackDb(event: string, props: Record<string, unknown>, userId: number | null, sessionId: string | null, url: string | null) {
  await ensureAnalyticsTable();
  await run(
    "INSERT INTO analytics_events (user_id, session_id, event, props, url) VALUES (?, ?, ?, ?, ?)",
    userId,
    sessionId,
    event,
    JSON.stringify(props ?? {}),
    url
  );
}

/**
 * P1.0 — activation : dérive l'événement `activated` à la première
 * lesson_started attribuée à un compte (identité résolue SERVEUR par la
 * route /api/analytics/track, jamais depuis le corps de la requête).
 * Dédup atomique : `ON CONFLICT DO NOTHING` sur l'index unique partiel
 * idx_analytics_activated (un seul activated par user_id, même en
 * requêtes concurrentes). Retourne true si la ligne a été créée.
 */
export async function maybeRecordActivation(userId: number, sessionId: string | null, url: string | null): Promise<boolean> {
  await ensureAnalyticsTable();
  const res = await run(
    `INSERT INTO analytics_events (user_id, session_id, event, props, url)
     VALUES (?, ?, 'activated', ?, ?)
     ON CONFLICT DO NOTHING`,
    userId,
    sessionId,
    JSON.stringify({ trigger: "lesson_started" }),
    url
  );
  return res.changes > 0;
}

/**
 * P1.0 — purchase first-party : enregistre UN événement `purchase` par
 * transaction de paiement confirmé (hook webhook GeniusPay, même garde que
 * le reçu email / le miroir GA4 : abonnement actif = paiement confirmé).
 *
 * Idempotence : insertion atomique `INSERT … SELECT … WHERE NOT EXISTS`
 * sur le fragment exact `"transaction_id":"<ref>"` dans props (ref échappée
 * JSON puis échappée LIKE avec `!` — pas de backslash : portable SQLite /
 * PG et compatible avec le convertisseur de placeholders). Un rejeu de
 * webhook (eventId différent) ne crée jamais de doublon.
 *
 * Jamais appelé depuis Business Metrics : cette ligne ne modifie ni MRR ni
 * revenue (frontière contract §8).
 */
export async function recordPurchase(input: {
  userId: number | null;
  transactionId: string;
  valueCents: number;
  currency: string;
  plan: string;
  subscriptionId?: number | null;
}): Promise<boolean> {
  await ensureAnalyticsTable();
  const props = JSON.stringify({
    transaction_id: input.transactionId,
    value_cents: input.valueCents,
    currency: input.currency,
    plan: input.plan,
    ...(input.subscriptionId ? { subscription_id: input.subscriptionId } : {}),
  });
  const refJson = JSON.stringify(input.transactionId).slice(1, -1);
  const refLike = refJson.replace(/[!%_]/g, (c) => `!${c}`);
  const res = await run(
    `INSERT INTO analytics_events (user_id, session_id, event, props, url)
     SELECT ?, NULL, 'purchase', ?, NULL
     WHERE NOT EXISTS (
       SELECT 1 FROM analytics_events WHERE event = 'purchase' AND props LIKE ? ESCAPE '!'
     )`,
    input.userId,
    props,
    `%transaction_id":"${refLike}"%`
  );
  return res.changes > 0;
}

function isValidDay(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(new Date(`${date}T00:00:00Z`).getTime());
}

/** Bornes [début du jour, lendemain 00:00[ en textuelle — comparable tel quel sur created_at (SQLite TEXT comme PG TIMESTAMPTZ). */
function dayBounds(date: string): [string, string] {
  const start = isValidDay(date) ? date : new Date().toISOString().slice(0, 10);
  const d = new Date(`${start}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return [`${start} 00:00:00`, `${d.toISOString().slice(0, 10)} 00:00:00`];
}

/**
 * P1.0 — comptage funnel par jour, couche Product Analytics :
 *   - exclude les comptes de test dès que l'identité est disponible
 *     (même prédicat NOT EXISTS que Business Metrics) ;
 *   - les événements anonymes (user_id NULL) restent comptés (ils ne sont
 *     attribuables à aucun compte de test) ;
 *   - SQL portable SQLite/PG (pas de `::`, bornes textuelles).
 * Clés internes : `_active_users`, `_unique_checkouts` (reprises telles
 * quelles par /api/growth/metrics).
 */
export async function countFunnelForDay(date: string): Promise<Record<string, number>> {
  await ensureAnalyticsTable();
  const funnel: Record<string, number> = {};
  const [start, endExclusive] = dayBounds(date);
  const notTest = (alias: string) =>
    `NOT EXISTS (SELECT 1 FROM users u WHERE u.id = ${alias} AND (${testUsersWhere("u")}))`;
  try {
    const rows = await query<{ event: string; c: number | string }>(
      `SELECT event, COUNT(*) AS c FROM analytics_events
       WHERE created_at >= ? AND created_at < ? AND ${notTest("user_id")}
       GROUP BY event`,
      start,
      endExclusive
    );
    for (const r of rows) funnel[r.event] = Number(r.c);

    const active = await queryOne<{ c: number | string }>(
      `SELECT COUNT(DISTINCT user_id) AS c FROM analytics_events
       WHERE created_at >= ? AND created_at < ? AND user_id IS NOT NULL
         AND ${notTest("user_id")}`,
      start,
      endExclusive
    );
    funnel["_active_users"] = Number(active?.c ?? 0);

    const checkouts = await queryOne<{ c: number | string }>(
      `SELECT COUNT(DISTINCT user_id) AS c FROM analytics_events
       WHERE event = 'begin_checkout' AND created_at >= ? AND created_at < ?
         AND ${notTest("user_id")}`,
      start,
      endExclusive
    );
    funnel["_unique_checkouts"] = Number(checkouts?.c ?? 0);
  } catch {
    // table absente — funnel vide (état historique préservé)
  }
  return funnel;
}

export interface AnalyticsDashboard7d {
  funnel: { signup: number; quiz: number; lesson: number; sub: number };
  conversion: {
    signups_auth: number;
    signups_anon: number;
    subs_auth: number;
    subs_anon: number;
    /** null (jamais faux 0) si aucune inscription authentifiée : 0/0 n'est pas un taux. */
    rate: number | null;
  };
}

/**
 * P1.2 — entonnoir + conversion 7j de `espace-admin/analytics`, même couche
 * que `countFunnelForDay` (Product Analytics, contrat §3/§7) :
 *   - comptes de test exclus dès que `user_id` est résolu serveur
 *     (prédicat `testUsersWhere` via NOT EXISTS, identique à P1.0) ;
 *   - événements anonymes (`user_id NULL`) conservés dans l'entonnoir mais
 *     comptés **séparément** en conversion (`*_anon`) — jamais transformés
 *     en inscrits attribuables (choix A+B P1.2) ;
 *   - taux = `subs_auth / signups_auth` (comptes test + anonymes hors
 *     dénominateur), `null` si dénominateur nul ;
 *   - SQL portable SQLite/PG : bornes textuelles UTC `YYYY-MM-DD HH:MM:SS`,
 *     aucun `::` ni `datetime('now')` ;
 *   - en cas d'absence de table, retours vides/valeurs par défaut.
 * Appel unique côté page : les libellés séparent les couches (flux brut /
 * KPI test-exclus) — la page ne cite aucun prédicat (garde data-trust).
 */
export async function getAnalyticsDashboard7d(): Promise<AnalyticsDashboard7d> {
  await ensureAnalyticsTable();
  const out: AnalyticsDashboard7d = {
    funnel: { signup: 0, quiz: 0, lesson: 0, sub: 0 },
    conversion: { signups_auth: 0, signups_anon: 0, subs_auth: 0, subs_anon: 0, rate: null },
  };
  const notTest = (alias: string) =>
    `NOT EXISTS (SELECT 1 FROM users u WHERE u.id = ${alias} AND (${testUsersWhere("u")}))`;
  const now = Date.now();
  const fmt = (t: number) => new Date(t).toISOString().slice(0, 19).replace("T", " ");
  const start = fmt(now - 7 * 86400000);
  const endExclusive = fmt(now + 86400000);
  try {
    const f = await query<{ event: string; c: number | string }>(
      `SELECT event, COUNT(*) AS c FROM analytics_events
       WHERE event IN ('signup_completed','quiz_completed','lesson_completed','subscription_started')
         AND created_at >= ? AND created_at < ? AND ${notTest("user_id")}
       GROUP BY event`,
      start,
      endExclusive,
    );
    for (const r of f) {
      const c = Number(r.c);
      if (r.event === "signup_completed") out.funnel.signup = c;
      if (r.event === "quiz_completed") out.funnel.quiz = c;
      if (r.event === "lesson_completed") out.funnel.lesson = c;
      if (r.event === "subscription_started") out.funnel.sub = c;
    }

    const conv = await query<{ event: string; auth: number | string; anon: number | string }>(
      `SELECT event,
              SUM(CASE WHEN user_id IS NOT NULL THEN 1 ELSE 0 END) AS auth,
              SUM(CASE WHEN user_id IS NULL THEN 1 ELSE 0 END) AS anon
       FROM analytics_events
       WHERE event IN ('signup_completed','subscription_started')
         AND created_at >= ? AND created_at < ? AND ${notTest("user_id")}
       GROUP BY event`,
      start,
      endExclusive,
    );
    for (const r of conv) {
      const auth = Number(r.auth);
      const anon = Number(r.anon);
      if (r.event === "signup_completed") {
        out.conversion.signups_auth = auth;
        out.conversion.signups_anon = anon;
      }
      if (r.event === "subscription_started") {
        out.conversion.subs_auth = auth;
        out.conversion.subs_anon = anon;
      }
    }
    out.conversion.rate = out.conversion.signups_auth
      ? Math.round((out.conversion.subs_auth / out.conversion.signups_auth) * 100)
      : null;
  } catch {
    // table absente — état par défaut préservé
  }
  return out;
}
