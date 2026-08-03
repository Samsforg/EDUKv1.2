import { query, queryOne, run } from "./db";

export interface ChallengeSummary {
  id: number;
  name: string;
  category: string;
  commune_a: string;
  commune_b: string;
  description: string;
  reward_desc: string;
  status: string;
  starts_at: string;
  ends_at: string;
  a: { xp: number; participants: number };
  b: { xp: number; participants: number };
}

export interface ChallengeDetail extends ChallengeSummary {
  top_a: { rank: number; user_id: number; name: string; xp: number; contributions: number }[];
  top_b: { rank: number; user_id: number; name: string; xp: number; contributions: number }[];
  me: { commune: string | null; my_xp: number; my_rank: number | null; side: "a" | "b" | null };
  total_participants: number;
}

function sideScore(challengeId: number, side: "a" | "b"): { xp: number; participants: number } {
  const row = queryOne<{ xp: number | null; participants: number }>(
    `SELECT COALESCE(SUM(xp), 0) AS xp, COUNT(DISTINCT user_id) AS participants
     FROM challenge_contributions WHERE challenge_id = ? AND side = ?`,
    challengeId,
    side,
  );
  return { xp: row?.xp ?? 0, participants: row?.participants ?? 0 };
}

function toSummary(c: { id: number; name: string; category: string; commune_a: string; commune_b: string; description: string; reward_desc: string; status: string; starts_at: string; ends_at: string }): ChallengeSummary {
  return {
    ...c,
    a: sideScore(c.id, "a"),
    b: sideScore(c.id, "b"),
  };
}

export function getChallenges(): ChallengeSummary[] {
  const rows = query<
    { id: number; name: string; category: string; commune_a: string; commune_b: string; description: string; reward_desc: string; status: string; starts_at: string; ends_at: string }
  >(
    "SELECT id, name, category, commune_a, commune_b, description, reward_desc, status, starts_at, ends_at FROM challenges ORDER BY CASE status WHEN 'active' THEN 0 WHEN 'upcoming' THEN 1 ELSE 2 END, ends_at",
  );
  return rows.map(toSummary);
}

export function getChallengeDetail(id: number, userId?: number): ChallengeDetail | null {
  const c = queryOne<
    { id: number; name: string; category: string; commune_a: string; commune_b: string; description: string; reward_desc: string; status: string; starts_at: string; ends_at: string }
  >(
    "SELECT id, name, category, commune_a, commune_b, description, reward_desc, status, starts_at, ends_at FROM challenges WHERE id = ?",
    id,
  );
  if (!c) return null;

  const top = (side: "a" | "b"): ChallengeDetail["top_a"] => {
    const rows = query<
      { user_id: number; name: string; xp: number; contributions: number }
    >(
      `SELECT u.id AS user_id, u.first_name || ' ' || u.last_name AS name, SUM(cc.xp) AS xp, COUNT(*) AS contributions
       FROM challenge_contributions cc JOIN users u ON u.id = cc.user_id
       WHERE cc.challenge_id = ? AND cc.side = ?
       GROUP BY u.id ORDER BY xp DESC, u.id LIMIT 5`,
      id,
      side,
    );
    return rows.map((r, i) => ({ rank: i + 1, ...r }));
  };

  const meCommune = userId
    ? queryOne<{ commune: string | null }>("SELECT commune FROM users WHERE id = ?", userId)?.commune ?? null
    : null;

  let myXp = 0;
  let mySide: "a" | "b" | null = null;
  let myRank: number | null = null;
  if (userId) {
    const mine = queryOne<{ side: string | null; xp: number }>(
      `SELECT side, COALESCE(SUM(xp), 0) AS xp FROM challenge_contributions WHERE challenge_id = ? AND user_id = ? GROUP BY side ORDER BY SUM(xp) DESC LIMIT 1`,
      id,
      userId,
    );
    if (mine && mine.side) {
      myXp = mine.xp;
      mySide = mine.side === "a" ? "a" : "b";
      const above = queryOne<{ n: number }>(
        `SELECT COUNT(*) AS n FROM (
           SELECT user_id FROM challenge_contributions WHERE challenge_id = ? AND side = ? AND user_id != ?
           GROUP BY user_id HAVING SUM(xp) > ?
         )`,
        id,
        mySide,
        userId,
        myXp,
      );
      myRank = (above?.n ?? 0) + 1;
    }
  }

  return {
    ...toSummary(c),
    top_a: top("a"),
    top_b: top("b"),
    me: { commune: meCommune, my_xp: myXp, my_rank: myRank, side: mySide },
    total_participants: 0,
  };
}

export function creditChallengeContribution(userId: number, xp: number) {
  if (xp < 5) return;
  const user = queryOne<{ commune: string | null }>("SELECT commune FROM users WHERE id = ?", userId);
  if (!user?.commune) return;
  const challenges = query<{ id: number; category: string; commune_a: string; commune_b: string }>(
    "SELECT id, category, commune_a, commune_b FROM challenges WHERE status = 'active'",
  );
  for (const c of challenges) {
    let side: "a" | "b" | null = null;
    if (c.category === "National") {
      side = (c.id + userId) % 2 === 0 ? "a" : "b";
    } else if (c.commune_a === user.commune) {
      side = "a";
    } else if (c.commune_b === user.commune) {
      side = "b";
    }
    if (side) {
      run(
        "INSERT INTO challenge_contributions (challenge_id, user_id, side, xp) VALUES (?, ?, ?, ?)",
        c.id,
        userId,
        side,
        xp,
      );
    }
  }
}
