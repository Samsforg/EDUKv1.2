import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { run, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";
import { validate, ForumPostSchema } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";
import { moderateContent } from "@/lib/moderation";

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const ip = getClientIp(req);
  const rl = await rateLimit(`forum:${user.id}:${ip}`, "forum_post");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await req.json().catch(() => null);
  const v = validate(ForumPostSchema, body);
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const { category_id, title, body: content } = v.data;

  const cat = await queryOne<{ id: number }>("SELECT id FROM forum_categories WHERE id = ?", category_id ?? 0);
  if (!cat) return NextResponse.json({ error: "Catégorie introuvable" }, { status: 404 });

  const postContent = [title, content].filter(Boolean).join(" ");
  const mod = moderateContent(postContent);
  if (!mod.approved) {
    return NextResponse.json({ error: `Contenu inapproprié : ${mod.reason}`, code: "MODERATION_FAILED" }, { status: 422 });
  }

  const r = await run(
    "INSERT INTO forum_posts (category_id, user_id, title, content) VALUES (?, ?, ?, ?)",
    category_id ?? 0,
    user.id,
    title,
    content,
  );

  await refreshBadges(user.id);

  return NextResponse.json({ id: Number(r.lastInsertRowid) }, { status: 201 });
}

export const POST = guardApi("POST /api/forum/posts", POSTHandler);
