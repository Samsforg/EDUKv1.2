import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const postId = Number(id);

  const post = queryOne<{ id: number }>("SELECT id FROM forum_posts WHERE id = ?", postId);
  if (!post) return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });

  const existing = queryOne<{ user_id: number }>(
    "SELECT user_id FROM forum_votes WHERE user_id = ? AND post_id = ?",
    user.id,
    postId,
  );

  if (existing) {
    run("DELETE FROM forum_votes WHERE user_id = ? AND post_id = ?", user.id, postId);
  } else {
    run("INSERT INTO forum_votes (user_id, post_id) VALUES (?, ?)", user.id, postId);
  }

  const votes = queryOne<{ n: number }>(
    "SELECT COUNT(*) AS n FROM forum_votes WHERE post_id = ?",
    postId,
  );

  return NextResponse.json({
    voted: !existing,
    votes: votes?.n ?? 0,
  });
}
