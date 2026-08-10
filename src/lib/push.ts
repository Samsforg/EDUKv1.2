import webPush from "web-push";
import { query, run } from "@/lib/db";

let vapidReady = false;

function ensureVapid(): boolean {
  if (vapidReady) return true;
  const pub = process.env.VAPID_PUBLIC_KEY || process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return false;
  webPush.setVapidDetails("mailto:admin@edukora.ci", pub, priv);
  vapidReady = true;
  return true;
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}

export async function sendPushToUser(userId: number, payload: PushPayload): Promise<number> {
  if (!ensureVapid()) return 0;

  const subs = await query<{ id: number; endpoint: string; p256dh: string; auth: string }>(
    "SELECT id, endpoint, p256dh, auth FROM push_subscriptions WHERE user_id = ?",
    userId,
  );

  let sent = 0;
  for (const s of subs) {
    try {
      await webPush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        JSON.stringify({
          title: payload.title,
          body: payload.body,
          url: payload.url ?? "/accueil-edukora",
          tag: payload.tag ?? "edukora-notification",
        }),
      );
      sent++;
    } catch (err: any) {
      const status = err?.statusCode;
      if (status === 404 || status === 410) {
        await run("DELETE FROM push_subscriptions WHERE id = ?", s.id);
      } else {
        console.warn(`[push] échec d'envoi (user ${userId}):`, err?.message ?? err);
      }
    }
  }
  return sent;
}