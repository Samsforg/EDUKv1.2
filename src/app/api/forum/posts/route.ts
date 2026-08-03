import { NextRequest, NextResponse } from "next/server";
import { run, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";
import { validate, ForumPostSchema } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const ip = getClientIp(req);
  const rl = rateLimit(`forum:${user.id}:${ip}`, "forum_post");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await req.json().catch(() => null);
  const v = validate(ForumPostSchema, body);
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const { category_id, title, body: content } = v.data;

  const cat = queryOne<{ id: number }>("SELECT id FROM forum_categories WHERE id = ?", category_id ?? 0);
  if (!cat) return NextResponse.json({ error: "Catégorie introuvable" }, { status: 404 });

  const r = run(
    "INSERT INTO forum_posts (category_id, user_id, title, content) VALUES (?, ?, ?, ?)",
    category_id ?? 0,
    user.id,
    title,
    content,
  );

  refreshBadges(user.id);

  return NextResponse.json({ id: Number(r.lastInsertRowid) }, { status: 201 });
}
