import { queryOne, run } from "../db";

const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export function getAIMaxPerMinute(): number {
  const v = Number(process.env.AI_MAX_REQUESTS_PER_MINUTE);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 10;
}

export function getAIMaxDaily(): number {
  const v = Number(process.env.AI_MAX_DAILY_REQUESTS);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 100;
}

export interface AIRateLimitResult {
  allowed: boolean;
  remainingMinute: number;
  remainingDaily: number;
  resetAtMinute: number;
  resetAtDaily: number;
}

async function bumpWindow(key: string, max: number, windowMs: number, now: number) {
  // Opération atomique : INSERT ou UPDATE en une seule requête SQL
  const resetAt = now + windowMs;
  await run(
    `INSERT INTO rate_limits (key, count, reset_at) VALUES (?, 1, ?)
     ON CONFLICT(key) DO UPDATE SET
       count = CASE WHEN rate_limits.reset_at < ? THEN 1 ELSE rate_limits.count + 1 END,
       reset_at = CASE WHEN rate_limits.reset_at < ? THEN ? ELSE rate_limits.reset_at END`,
    key, resetAt, now, now, resetAt,
  );

  const row = await queryOne<{ count: number; reset_at: number }>(
    "SELECT count, reset_at FROM rate_limits WHERE key = ?",
    key,
  );
  if (!row) return { count: 1, resetAt, remaining: max - 1 };
  return { count: row.count, resetAt: row.reset_at, remaining: Math.max(0, max - row.count) };
}

export async function checkAIRateLimit(subject: string): Promise<AIRateLimitResult> {
  const maxMin = getAIMaxPerMinute();
  const maxDay = getAIMaxDaily();
  const now = Date.now();
  try {
    const [minute, daily] = await Promise.all([
      bumpWindow(`ai:min:${subject}`, maxMin, MINUTE_MS, now),
      bumpWindow(`ai:day:${subject}`, maxDay, DAY_MS, now),
    ]);
    return {
      allowed: minute.count <= maxMin && daily.count <= maxDay,
      remainingMinute: minute.remaining,
      remainingDaily: daily.remaining,
      resetAtMinute: minute.resetAt,
      resetAtDaily: daily.resetAt,
    };
  } catch (err) {
    console.error("[ai-rate-limit] erreur (requête autorisée):", err);
    return {
      allowed: true,
      remainingMinute: maxMin,
      remainingDaily: maxDay,
      resetAtMinute: now + MINUTE_MS,
      resetAtDaily: now + DAY_MS,
    };
  }
}
