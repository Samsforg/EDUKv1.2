import { query, queryOne, run } from "./db";
import { getLigueOf, getLigueProgress, LIGUE_ORDER_NAMES } from "./rank";
import { notify, addXp, awardBadge } from "./session";

export interface LigueChallenge {
  id: number;
  ligue: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  goal_type: string;
  goal_value: number;
  reward_type: string;
  reward_label: string;
  reward_value: string;
  progress: number;
  completed: boolean;
  completed_at: string | null;
  action: string;
}

type Row = Omit<LigueChallenge, "progress" | "completed" | "completed_at" | "action">;

const ACTION_BY_TYPE: Record<string, string> = {
  quiz_done: "/quiz",
  quiz_perfect: "/quiz",
  xp_total: "/quiz",
  forum_replies: "/forum",
};

function countSource(userId: number, goalType: string): number {
  if (goalType === "quiz_done") {
    return queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quiz_attempts WHERE user_id = ?", userId)!.c;
  }
  if (goalType === "quiz_perfect") {
    return queryOne<{ c: number }>(
      "SELECT COUNT(*) AS c FROM quiz_attempts WHERE user_id = ? AND max_score > 0 AND score = max_score",
      userId,
    )!.c;
  }
  if (goalType === "forum_replies") {
    return queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM forum_replies WHERE user_id = ?", userId)!.c;
  }
  return 0;
}

function grantReward(userId: number, c: Row) {
  if (c.reward_type === "xp") {
    addXp(userId, Number(c.reward_value) || 0);
    notify(
      userId,
      "Défi de ligue terminé",
      `Défi « ${c.title} » complété ! Récompense : +${c.reward_value} XP.`,
      c.icon,
    );
  } else {
    awardBadge(userId, c.reward_value);
  }
}

function ensureProgress(userId: number, c: Row): void {
  const row = queryOne<{ progress: number; completed: number }>(
    "SELECT progress, completed FROM league_challenge_progress WHERE user_id = ? AND challenge_id = ?",
    userId,
    c.id,
  );
  if (row) return;
  const initial = Math.min(c.goal_value, countSource(userId, c.goal_type));
  if (initial >= c.goal_value) {
    run(
      "INSERT INTO league_challenge_progress (user_id, challenge_id, progress, completed, completed_at) VALUES (?, ?, ?, 1, datetime('now'))",
      userId,
      c.id,
      c.goal_value,
    );
    grantReward(userId, c);
  } else {
    run(
      "INSERT INTO league_challenge_progress (user_id, challenge_id, progress, completed) VALUES (?, ?, ?, 0)",
      userId,
      c.id,
      initial,
    );
  }
}

function toView(userId: number, c: Row, init = true): LigueChallenge {
  if (init) ensureProgress(userId, c);
  const row = queryOne<{ progress: number; completed: number; completed_at: string | null }>(
    "SELECT progress, completed, completed_at FROM league_challenge_progress WHERE user_id = ? AND challenge_id = ?",
    userId,
    c.id,
  );
  return {
    ...c,
    progress: row?.progress ?? 0,
    completed: (row?.completed ?? 0) === 1,
    completed_at: row?.completed_at ?? null,
    action: ACTION_BY_TYPE[c.goal_type] ?? "/quiz",
  };
}

const COLUMNS = "id, ligue, title, icon, color, description, goal_type, goal_value, reward_type, reward_label, reward_value";

export function getLigueChallengesFor(userId: number) {
  const user = queryOne<{ xp: number }>("SELECT xp FROM users WHERE id = ?", userId);
  if (!user) return null;
  const progress = getLigueProgress(user.xp);
  const ligue = progress.ligue;
  const order = ["bronze", "argent", "or", "diamant", "maitre"];
  const idx = order.indexOf(ligue.key);
  const nextKey = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;

  const defs = query<Row>(`SELECT ${COLUMNS} FROM league_challenges ORDER BY id`);

  const mine = defs.filter((d) => d.ligue === ligue.key).map((d) => toView(userId, d));
  const locked = nextKey
    ? {
        ligue: nextKey,
        name: LIGUE_ORDER_NAMES[nextKey] ?? "Ligue suivante",
        challenges: defs.filter((d) => d.ligue === nextKey).map((d) => toView(userId, d, false)),
      }
    : null;

  return {
    me: { xp: user.xp, ligue: progress.ligue, next: progress.next, pct: progress.pct, remaining: progress.remaining },
    challenges: mine,
    locked,
  };
}

export function creditLigueChallenges(userId: number, goalType: string, amount = 1) {
  const user = queryOne<{ xp: number }>("SELECT xp FROM users WHERE id = ?", userId);
  if (!user) return;
  const ligue = getLigueOf(user.xp);
  const defs = query<Row>(`SELECT ${COLUMNS} FROM league_challenges WHERE ligue = ? AND goal_type = ?`, ligue.key, goalType);
  for (const c of defs) {
    const row = queryOne<{ progress: number; completed: number }>(
      "SELECT progress, completed FROM league_challenge_progress WHERE user_id = ? AND challenge_id = ?",
      userId,
      c.id,
    );
    if (row?.completed) continue;
    const current = row?.progress ?? 0;
    const next = Math.min(c.goal_value, current + amount);
    if (next >= c.goal_value) {
      run(
        "INSERT INTO league_challenge_progress (user_id, challenge_id, progress, completed, completed_at) VALUES (?, ?, ?, 1, datetime('now')) ON CONFLICT(user_id, challenge_id) DO UPDATE SET progress = excluded.progress, completed = 1, completed_at = datetime('now')",
        userId,
        c.id,
        next,
      );
      grantReward(userId, c);
    } else {
      run(
        "INSERT INTO league_challenge_progress (user_id, challenge_id, progress) VALUES (?, ?, ?) ON CONFLICT(user_id, challenge_id) DO UPDATE SET progress = excluded.progress",
        userId,
        c.id,
        next,
      );
    }
  }
}
