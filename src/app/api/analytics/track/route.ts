import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { trackDb, maybeRecordActivation } from "@/lib/analytics-db";
import { guardApi } from "@/lib/api-guard";

// P0.8 — minimisation RGPD : le cookie `edukora_session` contient un jeton
// signé réutilisable (v1.<payload>.<hmac>). Le stocker en clair dans
// analytics_events reviendrait à archiver des sessions ouvertes. On hache
// (sha256) avant persistance : le comptage `COUNT(DISTINCT session_id)` et la
// corrélation session ↔ événements restent identiques, la valeur non.
function fingerprint(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function POSTHandler(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const event = String(body.event ?? "").slice(0, 80);
  if (!event) return NextResponse.json({ ok: false }, { status: 400 });
  const props = (body.props && typeof body.props === "object" ? body.props : {}) as Record<string, unknown>;
  const url = typeof body.url === "string" ? body.url.slice(0, 500) : req.headers.get("referer")?.slice(0, 500) ?? null;
  // P0.8 — l'identité vient TOUJOURS de la session serveur, jamais du corps
  // de la requête : un client ne peut pas attribuer un événement à un autre
  // utilisateur, et un visiteur anonyme reste anonyme (user_id NULL — non
  // attribuable à un compte de test, limitation documentée au contrat).
  const rawSession = req.cookies.get("edukora_session")?.value?.slice(0, 80) ?? req.headers.get("x-session-id")?.slice(0, 80) ?? null;
  const sessionId = rawSession ? fingerprint(rawSession) : null;
  let userId: number | null = null;
  try {
    const u = await getCurrentUser();
    userId = u?.id ?? null;
  } catch { /* auth failure — analytics are non-critical */ }
  // P1.0 — activation : à la première lesson_started attribuée à un
  // compte (identité serveur ci-dessus, jamais depuis le corps), dérive
  // l'événement `activated` (dédup par index unique partiel). Await : sauf
  // erreur DB avalée par le catch ci-dessous, la réponse implique sa
  // persistance — les autres événements restent fire-and-forget. Les
  // visiteurs anonymes ne sont pas attribuables → aucun `activated`
  // (limitation documentée au contrat).
  if (event === "lesson_started" && userId !== null) {
    try {
      await maybeRecordActivation(userId, sessionId, url);
    } catch { /* analytics are non-critical */ }
  }
  // fire-and-forget, never block client
  trackDb(event, props, userId, sessionId, url).catch(() => {});
  return NextResponse.json({ ok: true });
}
export const POST = guardApi("POST /api/analytics/track", POSTHandler);
