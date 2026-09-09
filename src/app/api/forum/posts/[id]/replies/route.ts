import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser, notify } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";
import { creditLigueChallenges } from "@/lib/ligue";
import { moderateContent } from "@/lib/moderation";

async function POSTHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const postId = Number(id);
  const body = await req.json().catch(() => null);
  const content = String(body?.content ?? "").trim();
  if (content.length < 2) return NextResponse.json({ error: "Réponse trop courte" }, { status: 400 });

  const post = await queryOne<{ id: number; user_id: number; title: string }>(
    "SELECT id, user_id, title FROM forum_posts WHERE id = ?",
    postId,
  );
  if (!post) return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });

  const mod = moderateContent(content);
  if (!mod.approved) {
    return NextResponse.json({ error: `Contenu inapproprié : ${mod.reason}`, code: "MODERATION_FAILED" }, { status: 422 });
  }

  const r = await run(
    "INSERT INTO forum_replies (post_id, user_id, content) VALUES (?, ?, ?)",
    postId,
    user.id,
    content,
  );

  await refreshBadges(user.id);
  await creditLigueChallenges(user.id, "forum_replies", 1);

  if (post.user_id !== user.id) {
    await notify(
      post.user_id,
      "Nouvelle réponse sur le forum",
      `${user.first_name} a répondu à ton sujet « ${post.title} »`,
      "forum",
    );
  }

  return NextResponse.json({ id: Number(r.lastInsertRowid) }, { status: 201 });
}

export const POST = guardApi("POST /api/forum/posts/[id]/replies", POSTHandler);
