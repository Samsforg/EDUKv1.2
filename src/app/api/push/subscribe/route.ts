import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { queryOne, run } from "@/lib/db";
import webPush from "web-push";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

webPush.setVapidDetails(
  "mailto:admin@edukora.ci",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const ip = getClientIp(req);
  const rl = rateLimit(`push:${user.id}:${ip}`, "push_subscribe");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { subscription } = await req.json();
  if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
    return NextResponse.json({ error: "Subscription invalide" }, { status: 400 });
  }

  const existing = queryOne<{ id: number }>(
    "SELECT id FROM push_subscriptions WHERE user_id = ? AND endpoint = ?",
    user.id, subscription.endpoint
  );
  if (existing) {
    return NextResponse.json({ ok: true, message: "Déjà abonné" });
  }

  run(
    "INSERT INTO push_subscriptions (user_id, endpoint, p256dh, auth) VALUES (?, ?, ?, ?)",
    user.id, subscription.endpoint, subscription.keys.p256dh, subscription.keys.auth
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { endpoint } = await req.json();
  run("DELETE FROM push_subscriptions WHERE user_id = ? AND endpoint = ?", user.id, endpoint);
  return NextResponse.json({ ok: true });
}