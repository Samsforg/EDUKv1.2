import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { trackDb } from "@/lib/analytics-db";
import { guardApi } from "@/lib/api-guard";

async function POSTHandler(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const event = String(body.event ?? "").slice(0, 80);
  if (!event) return NextResponse.json({ ok: false }, { status: 400 });
  const props = (body.props && typeof body.props === "object" ? body.props : {}) as Record<string, unknown>;
  const url = typeof body.url === "string" ? body.url.slice(0, 500) : req.headers.get("referer")?.slice(0, 500) ?? null;
  const sessionId = req.cookies.get("edukora_session")?.value?.slice(0, 80) ?? req.headers.get("x-session-id")?.slice(0, 80) ?? null;
  let userId: number | null = null;
  try {
    const u = await getCurrentUser();
    userId = u?.id ?? null;
  } catch { /* auth failure — analytics are non-critical */ }
  // fire-and-forget, never block client
  trackDb(event, props, userId, sessionId, url).catch(() => {});
  return NextResponse.json({ ok: true });
}
export const POST = guardApi("POST /api/analytics/track", POSTHandler);
