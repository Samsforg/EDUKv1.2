const hits = new Map<string, { count: number; resetAt: number }>();

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

export function rateLimit(key: string, preset?: string): { allowed: boolean; remaining: number; resetAt: number } {
  const config = preset ? PRESETS[preset] ?? PRESETS.api_general : PRESETS.api_general;
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.max - 1, resetAt: now + config.windowMs };
  }

  entry.count++;
  if (entry.count > config.max) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  return { allowed: true, remaining: config.max - entry.count, resetAt: entry.resetAt };
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

// Cleanup every 10 minutes
if (typeof setInterval !== "undefined" && process.env.NODE_ENV !== "test") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of hits) {
      if (now > v.resetAt) hits.delete(k);
    }
  }, 10 * 60 * 1000);
}