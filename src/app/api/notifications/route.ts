import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const notifications = await query<{ id: number; title: string; body: string; icon: string; read: number; created_at: string }>(
    "SELECT id, title, body, icon, read, created_at FROM notifications WHERE user_id = ? ORDER BY id DESC LIMIT 30",
    user.id,
  );
  const unread = (await query<{ c: number }>("SELECT COUNT(*) AS c FROM notifications WHERE user_id = ? AND read = 0", user.id))![0] ?? { c: 0 };

  return NextResponse.json({ notifications, unread: unread.c });
}

export const GET = guardApi("GET /api/notifications", GETHandler);

async function POSTHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  await run("UPDATE notifications SET read = 1 WHERE user_id = ?", user.id);
  return NextResponse.json({ ok: true });
}

export const POST = guardApi("POST /api/notifications", POSTHandler);
