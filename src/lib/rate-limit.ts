import { queryOne, run } from "./db";

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}

const PRESETS: Record<string, RateLimitConfig> = {
  login: { windowMs: 15 * 60 * 1000, max: 10 },
  register: { windowMs: 60 * 60 * 1000, max: 5 },
  quiz_submit: { windowMs: 5 * 60 * 1000, max: 20 },
  api_general: { windowMs: 60 * 1000, max: 60 },
  live_message: { windowMs: 60 * 1000, max: 30 },
  forum_post: { windowMs: 10 * 60 * 1000, max: 10 },
  push_subscribe: { windowMs: 60 * 60 * 1000, max: 10 },
};

let cleanupCounter = 0;

export function rateLimit(key: string, preset?: string): { allowed: boolean; remaining: number; resetAt: number } {
  const config = preset ? PRESETS[preset] ?? PRESETS.api_general : PRESETS.api_general;
  const now = Date.now();

  try {
    const row = queryOne<{ count: number; reset_at: number }>(
      "SELECT count, reset_at FROM rate_limits WHERE key = ?",
      key,
    );

    if (!row || now > row.reset_at) {
      run(
        "INSERT INTO rate_limits (key, count, reset_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = 1, reset_at = ?",
        key,
        now + config.windowMs,
        now + config.windowMs,
      );
      return { allowed: true, remaining: config.max - 1, resetAt: now + config.windowMs };
    }

    const nextCount = row.count + 1;
    run("UPDATE rate_limits SET count = ? WHERE key = ?", nextCount, key);
    if (nextCount > config.max) {
      return { allowed: false, remaining: 0, resetAt: row.reset_at };
    }
    return { allowed: true, remaining: config.max - nextCount, resetAt: row.reset_at };
  } catch (err) {
    // Si la table n'existe pas encore (premier boot), on autorise la requête.
    console.error("[rate-limit] erreur (requête autorisée):", err);
    return { allowed: true, remaining: config.max, resetAt: now + config.windowMs };
  } finally {
    cleanupCounter++;
    if (cleanupCounter % 100 === 0) {
      try {
        run("DELETE FROM rate_limits WHERE reset_at < ?", Date.now());
      } catch {
        // ignoré
      }
    }
  }
}

export function rateLimitResponse(resetAt: number): Response {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
  return Response.json(
    { error: `Trop de requêtes. Réessayez dans ${retryAfter}s` },
    { status: 429, headers: { "Retry-After": String(retryAfter), "X-RateLimit-RetryAfter": String(retryAfter) } }
  );
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
