import { queryOne, run } from "./db";

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}

const PRESETS: Record<string, RateLimitConfig> = {
  login: { windowMs: 15 * 60 * 1000, max: 30 },
  register: { windowMs: 60 * 60 * 1000, max: 20 },
  quiz_submit: { windowMs: 5 * 60 * 1000, max: 60 },
  api_general: { windowMs: 60 * 1000, max: 120 },
  live_message: { windowMs: 60 * 1000, max: 30 },
  forum_post: { windowMs: 10 * 60 * 1000, max: 10 },
  push_subscribe: { windowMs: 60 * 60 * 1000, max: 20 },
  newsletter: { windowMs: 60 * 60 * 1000, max: 10 },
  tutor_demo: { windowMs: 60 * 60 * 1000, max: 30 },
};

let cleanupCounter = 0;

export async function rateLimit(key: string, preset?: string): Promise<{ allowed: boolean; remaining: number; resetAt: number } >{
  if (process.env.RATE_LIMIT_DISABLED === "1") {
    return { allowed: true, remaining: 999, resetAt: 0 };
  }
  const config = preset ? PRESETS[preset] ?? PRESETS.api_general : PRESETS.api_general;
  const now = Date.now();

  try {
    // Opération atomique : INSERT ou UPDATE en une seule requête SQL
    // Si la fenêtre est expirée, on réinitialise le compteur
    const resetAt = now + config.windowMs;
    await run(
      `INSERT INTO rate_limits (key, count, reset_at) VALUES (?, 1, ?)
       ON CONFLICT(key) DO UPDATE SET
         count = CASE WHEN rate_limits.reset_at < ? THEN 1 ELSE rate_limits.count + 1 END,
         reset_at = CASE WHEN rate_limits.reset_at < ? THEN ? ELSE rate_limits.reset_at END`,
      key, resetAt, now, now, resetAt,
    );

    // Lire le résultat final (une seule requête supplémentaire, pas de race condition)
    const row = await queryOne<{ count: number; reset_at: number }>(
      "SELECT count, reset_at FROM rate_limits WHERE key = ?",
      key,
    );

    if (!row) {
      return { allowed: true, remaining: config.max, resetAt };
    }

    if (row.count > config.max) {
      return { allowed: false, remaining: 0, resetAt: row.reset_at };
    }
    return { allowed: true, remaining: config.max - row.count, resetAt: row.reset_at };
  } catch (err) {
    // Si la table n'existe pas encore (premier boot), on autorise la requête.
    console.error("[rate-limit] erreur (requête autorisée):", err);
    return { allowed: true, remaining: config.max, resetAt: now + config.windowMs };
  } finally {
    cleanupCounter++;
    if (cleanupCounter % 100 === 0) {
      try {
        await run("DELETE FROM rate_limits WHERE reset_at < ?", Date.now());
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
