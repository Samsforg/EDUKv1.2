import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/newsletter";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

async function POSTHandler(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`newsletter:${ip}`, "newsletter");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const result = await subscribeNewsletter(email, {
    ip,
    userAgent: req.headers.get("user-agent") ?? undefined,
    source: typeof body?.source === "string" ? body.source : "home",
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Adresse email invalide" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, created: result.created });
}

export const POST = guardApi("POST /api/newsletter", POSTHandler);
