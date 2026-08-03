import { query, queryOne } from "./db";

export interface Ligue {
  key: string;
  name: string;
  icon: string;
  min: number;
  nextMin: number | null;
}

export const LIGUES: Ligue[] = [
  { key: "maitre", name: "Ligue Maître", icon: "workspace_premium", min: 5000, nextMin: null },
  { key: "diamant", name: "Ligue Diamant", icon: "diamond", min: 3500, nextMin: 5000 },
  { key: "or", name: "Ligue Or", icon: "military_tech", min: 2000, nextMin: 3500 },
  { key: "argent", name: "Ligue Argent", icon: "shield", min: 1000, nextMin: 2000 },
  { key: "bronze", name: "Ligue Bronze", icon: "workspace_premium", min: 0, nextMin: 1000 },
];

export const LIGUE_ORDER = LIGUES.map((l) => l.key);
export const LIGUE_ORDER_NAMES: Record<string, string> = Object.fromEntries(LIGUES.map((l) => [l.key, l.name])) as Record<string, string>;

export function getLigueOf(xp: number): Ligue {
  return LIGUES.find((l) => xp >= l.min) ?? LIGUES[LIGUES.length - 1];
}

export function getLigueProgress(xp: number) {
  const ligue = getLigueOf(xp);
  const next = LIGUES.find((l) => l.key === ligue.key && l.nextMin !== null)?.nextMin ?? null;
  if (next === null) return { ligue, next, pct: 100, remaining: 0 };
  const span = next - ligue.min;
  const pct = Math.min(100, Math.round(((xp - ligue.min) / span) * 100));
  return { ligue, next, pct, remaining: next - xp };
}

interface Row {
  id: number;
  first_name: string;
  last_name: string;
  xp: number;
  streak: number;
  class_level: string | null;
  serie: string | null;
  commune: string | null;
  is_me?: boolean;
}

const ROW_SELECT = `
  SELECT u.id, u.first_name, u.last_name, u.xp, u.streak, u.class_level, s.name AS serie, u.commune
  FROM users u LEFT JOIN series s ON s.id = u.serie_id`;

function rankRows(rows: Row[], userId: number): Row[] {
  return rows.map((r) => ({ ...r, is_me: r.id === userId }));
}

export function getGlobalRanking(limit: number, userId: number) {
  const rows = query<Row>(
    `${ROW_SELECT} WHERE u.role = 'student' ORDER BY u.xp DESC, u.last_active DESC, u.id ASC LIMIT ?`,
    limit,
  );
  const myRank = queryOne<{ rank: number; xp: number }>(
    `SELECT rk.rank, rk.xp FROM (
       SELECT u.id, u.xp, ROW_NUMBER() OVER (ORDER BY u.xp DESC, u.last_active DESC, u.id ASC) AS rank
       FROM users u WHERE u.role = 'student'
     ) rk WHERE rk.id = ?`,
    userId,
  );
  const total = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE role = 'student'")!.c;
  return {
    ranking: rankRows(rows, userId),
    me: { ...(rows.find((r) => r.id === userId) ?? { id: userId, first_name: "", last_name: "", xp: myRank?.xp ?? 0, streak: 0, class_level: null, serie: null, commune: null }), rank: myRank?.rank ?? null, is_me: true },
    total,
    top_xp: rows[0]?.xp ?? 0,
  };
}

export function getCommuneRanking(commune: string, limit: number, userId: number) {
  const rows = query<Row>(
    `${ROW_SELECT} WHERE u.role = 'student' AND u.commune = ? ORDER BY u.xp DESC, u.last_active DESC, u.id ASC LIMIT ?`,
    commune,
    limit,
  );
  const myRank = queryOne<{ rank: number; xp: number }>(
    `SELECT rk.rank, rk.xp FROM (
       SELECT u.id, u.xp, ROW_NUMBER() OVER (ORDER BY u.xp DESC, u.last_active DESC, u.id ASC) AS rank
       FROM users u WHERE u.role = 'student' AND u.commune = ?
     ) rk WHERE rk.id = ?`,
    commune,
    userId,
  );
  const total = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE role = 'student' AND commune = ?", commune)!.c;
  return {
    commune,
    ranking: rankRows(rows, userId),
    me: { ...(rows.find((r) => r.id === userId) ?? { id: userId, first_name: "", last_name: "", xp: myRank?.xp ?? 0, streak: 0, class_level: null, serie: null, commune }), rank: myRank?.rank ?? null, is_me: true },
    total,
    top_xp: rows[0]?.xp ?? 0,
  };
}

export function getCommuneLeaders() {
  return query<{ commune: string; count: number; total_xp: number }>(
    `SELECT u.commune, COUNT(*) AS count, SUM(u.xp) AS total_xp
     FROM users u WHERE u.role = 'student' AND u.commune IS NOT NULL
     GROUP BY u.commune ORDER BY total_xp DESC, u.commune ASC`,
  );
}

export function getLigueRanking(ligueKey: string, limit: number, userId: number) {
  const ligue = LIGUES.find((l) => l.key === ligueKey) ?? getLigueOf(queryOne<{ xp: number }>("SELECT xp FROM users WHERE id = ?", userId)?.xp ?? 0);
  const rows = query<Row>(
    `${ROW_SELECT} WHERE u.role = 'student' AND u.xp >= ? AND u.xp < ? ORDER BY u.xp DESC, u.last_active DESC, u.id ASC LIMIT ?`,
    ligue.min,
    ligue.nextMin ?? 9_999_999,
    limit,
  );
  const all = query<{ id: number; xp: number; rank: number }>(
    `SELECT u.id, u.xp, ROW_NUMBER() OVER (ORDER BY u.xp DESC, u.last_active DESC, u.id ASC) AS rank
     FROM users u WHERE u.role = 'student' AND u.xp >= ? AND u.xp < ?`,
    ligue.min,
    ligue.nextMin ?? 9_999_999,
  );
  const total = all.length;
  const myRank = all.find((r) => r.id === userId)?.rank ?? null;
  const promoSize = Math.max(1, Math.ceil(total * 0.3));
  const relegSize = Math.max(1, Math.ceil(total * 0.3));
  const isMax = ligue.nextMin === null;
  const isMin = ligue.min === 0;
  return {
    ligue: { key: ligue.key, name: ligue.name, icon: ligue.icon, min: ligue.min, nextMin: ligue.nextMin },
    ranking: rows.map((r, i) => {
      const rank = i + 1;
      let zone = "maintien";
      if (!isMax && rank <= promoSize) zone = "promotion";
      if (!isMin && rank > total - relegSize) zone = "relegation";
      return { ...r, is_me: r.id === userId, zone };
    }),
    me: {
      ...(rows.find((r) => r.id === userId) ?? { id: userId, first_name: "", last_name: "", xp: all.find((r) => r.id === userId)?.xp ?? 0, streak: 0, class_level: null, serie: null, commune: null }),
      rank: myRank,
      zone: myRank === null ? null : !isMax && myRank <= promoSize ? "promotion" : !isMin && myRank > total - relegSize ? "relegation" : "maintien",
      is_me: true,
    },
    total,
    promo_size: isMax ? 0 : promoSize,
    releg_size: isMin ? 0 : relegSize,
  };
}

export function getLigueLadder() {
  return LIGUES.map((l) => ({
    ...l,
    count: queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE role = 'student' AND xp >= ? AND xp < ?", l.min, l.nextMin ?? 9_999_999)!.c,
  }));
}

export function getAmbassadorRanking(limit: number, userId: number) {
  const rows = query<
    Row & { filleuls: number }
  >(
    `SELECT u.id, u.first_name, u.last_name, u.xp, u.streak, u.class_level, s.name AS serie, u.commune,
            (SELECT COUNT(*) FROM users f WHERE f.referred_by = u.id) AS filleuls
     FROM users u LEFT JOIN series s ON s.id = u.serie_id
     WHERE u.role = 'student'
     ORDER BY filleuls DESC, u.xp DESC, u.id ASC
     LIMIT ?`,
    limit,
  );
  const myRank = queryOne<{ rank: number; filleuls: number }>(
    `SELECT rk.rank, rk.filleuls FROM (
       SELECT u.id,
              (SELECT COUNT(*) FROM users f WHERE f.referred_by = u.id) AS filleuls,
              ROW_NUMBER() OVER (ORDER BY (SELECT COUNT(*) FROM users f WHERE f.referred_by = u.id) DESC, u.xp DESC, u.id ASC) AS rank
       FROM users u WHERE u.role = 'student'
     ) rk WHERE rk.id = ?`,
    userId,
  );
  const total = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users WHERE role = 'student'")!.c;
  const ranking = rows.map((r, i) => {
    const tier = r.filleuls >= 10 ? "élite" : r.filleuls >= 5 ? "expert" : "novice";
    return { ...r, rank: i + 1, is_me: r.id === userId, tier };
  });
  const meRow = rows.find((r) => r.id === userId);
  return {
    ranking,
    me: {
      ...(meRow ?? { id: userId, first_name: "", last_name: "", xp: 0, streak: 0, class_level: null, serie: null, commune: null, filleuls: myRank?.filleuls ?? 0 }),
      rank: myRank?.rank ?? null,
      tier: (myRank?.filleuls ?? 0) >= 10 ? "élite" : (myRank?.filleuls ?? 0) >= 5 ? "expert" : "novice",
      is_me: true,
    },
    total,
  };
}

export function getLigueStatus(userId: number) {
  const me = queryOne<{ id: number; xp: number; streak: number; first_name: string; last_name: string; commune: string | null }>(
    "SELECT id, xp, streak, first_name, last_name, commune FROM users WHERE id = ?",
    userId,
  )!;
  const progress = getLigueProgress(me.xp);
  const ligueRank = queryOne<{ rank: number }>(
    `SELECT rk.rank FROM (
       SELECT u.id, ROW_NUMBER() OVER (ORDER BY u.xp DESC, u.last_active DESC, u.id ASC) AS rank
       FROM users u WHERE u.role = 'student' AND u.xp >= ? AND u.xp < ?
     ) rk WHERE rk.id = ?`,
    progress.ligue.min,
    progress.ligue.nextMin ?? 9_999_999,
    userId,
  );
  let communeRank: { rank: number; total: number } | null = null;
  if (me.commune) {
    communeRank = queryOne<{ rank: number; total: number }>(
      `SELECT rk.rank, (SELECT COUNT(*) FROM users WHERE role = 'student' AND commune = ?) AS total FROM (
         SELECT u.id, ROW_NUMBER() OVER (ORDER BY u.xp DESC, u.last_active DESC, u.id ASC) AS rank
         FROM users u WHERE u.role = 'student' AND u.commune = ?
       ) rk WHERE rk.id = ?`,
      me.commune,
      me.commune,
      userId,
    ) ?? null;
  }
  return {
    ligue: progress.ligue,
    next: progress.next,
    pct: progress.pct,
    remaining: progress.remaining,
    xp: me.xp,
    streak: me.streak,
    first_name: me.first_name,
    last_name: me.last_name,
    commune: me.commune,
    rank_in_ligue: ligueRank?.rank ?? null,
    rank_in_commune: communeRank?.rank ?? null,
    commune_total: communeRank?.total ?? null,
  };
}
