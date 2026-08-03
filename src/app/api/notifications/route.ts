import { NextResponse } from "next/server";
import { query, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const notifications = query<{ id: number; title: string; body: string; icon: string; read: number; created_at: string }>(
    "SELECT id, title, body, icon, read, created_at FROM notifications WHERE user_id = ? ORDER BY id DESC LIMIT 30",
    user.id,
  );
  const unread = query<{ c: number }>("SELECT COUNT(*) AS c FROM notifications WHERE user_id = ? AND read = 0", user.id)![0] ?? { c: 0 };

  return NextResponse.json({ notifications, unread: unread.c });
}

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  run("UPDATE notifications SET read = 1 WHERE user_id = ?", user.id);
  return NextResponse.json({ ok: true });
}
