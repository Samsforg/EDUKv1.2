import { NextResponse, type NextRequest } from "next/server";
import { captureException } from "@sentry/nextjs";
import { getClientIp, rateLimit, rateLimitResponse } from "./rate-limit";

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type ApiHandler = (req: NextRequest, ctx: any) => Promise<Response | undefined>;

const GLOBAL_LIMIT_BYPASS = new Set(["/api/health", "/api/warmup"]);

export function guardApi<H extends ApiHandler>(label: string, handler: H): H {
  const wrapped = async (req: NextRequest, ctx: any) => {
    try {
      // Protection globale sans casser : rate limit générique 120 req/min par IP
      const pathname = req.nextUrl?.pathname ?? new URL(req.url).pathname;
      if (!GLOBAL_LIMIT_BYPASS.has(pathname)) {
        const ip = getClientIp(req);
        const rl = await rateLimit(`global:${ip}:${pathname}`, "api_general");
        if (!rl.allowed) return rateLimitResponse(rl.resetAt);
      }
      const res = await handler(req, ctx);
      if (res) {
        res.headers.set("X-Content-Type-Options", "nosniff");
        res.headers.set("X-Frame-Options", "DENY");
        res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
        // Jamais mettre en cache une réponse d'API dépendante de la session/du statut premium.
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.headers.set("Pragma", "no-cache");
        res.headers.set("Expires", "0");
      }
      return res;
    } catch (err) {
      return handleApiCrash(err, label);
    }
  };
  return wrapped as H;
}

export function handleApiCrash(err: unknown, label?: string): NextResponse {
  if (err instanceof ApiError) {
    console.error(`[api] ${label ?? "?"} ${err.status}:`, err.message, err.details ?? "");
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error(`[api] ${label ?? "?"} 500:`, err);
  captureException(err, { tags: { api: label ?? "unknown" } });
  return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
}