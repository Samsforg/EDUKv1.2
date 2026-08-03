import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getLiveMessages, isBlockedFromChat, isChatPaused } from "@/lib/live";
import { validate, LiveMessageSchema } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  const { id } = await params;
  const session = queryOne<{ id: number }>("SELECT id FROM live_sessions WHERE id = ?", Number(id));
  if (!session) return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
  const messages = getLiveMessages(session.id, 30);
  return NextResponse.json({ messages });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const ip = getClientIp(req);
  const rl = rateLimit(`live-msg:${user.id}:${ip}`, "live_message");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const v = validate(LiveMessageSchema, { content: body?.body ?? body?.content ?? "" });
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const text = v.data.content.trim().slice(0, 300);

  const session = queryOne<{ status: string }>(
    "SELECT status FROM live_sessions WHERE id = ?",
    Number(id),
  );
  if (!session) return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
  if (session.status !== "live") {
    return NextResponse.json({ error: "Le chat est fermé hors direct" }, { status: 400 });
  }
  if (isChatPaused(Number(id))) {
    return NextResponse.json({ error: "Le chat est en pause par l'animateur" }, { status: 403 });
  }
  if (isBlockedFromChat(Number(id), user.id)) {
    return NextResponse.json({ error: "Vous avez été bloqué par le modérateur" }, { status: 403 });
  }

  run(
    "INSERT INTO live_messages (session_id, user_id, body) VALUES (?, ?, ?)",
    Number(id),
    user.id,
    text,
  );
  return NextResponse.json({ ok: true });
}
