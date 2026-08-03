import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const postId = Number(id);

  const post = queryOne<{
    id: number;
    category_id: number;
    category_name: string;
    category_icon: string;
    category_color: string;
    title: string;
    content: string;
    author_id: number;
    author_name: string;
    author_xp: number;
    votes: number;
    user_voted: number;
    created_at: string;
  }>(
    `SELECT p.id, p.category_id, c.name AS category_name, c.icon AS category_icon, c.color AS category_color,
            p.title, p.content, p.user_id AS author_id,
            (u.first_name || ' ' || substr(u.last_name, 1, 1) || '.') AS author_name,
            u.xp AS author_xp,
            (SELECT COUNT(*) FROM forum_votes v WHERE v.post_id = p.id) AS votes,
            (SELECT COUNT(*) FROM forum_votes v WHERE v.post_id = p.id AND v.user_id = ?) AS user_voted,
            p.created_at
     FROM forum_posts p
     JOIN forum_categories c ON c.id = p.category_id
     JOIN users u ON u.id = p.user_id
     WHERE p.id = ?`,
    user.id,
    postId,
  );
  if (!post) return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });

  const replies = query<{
    id: number;
    author_id: number;
    author_name: string;
    author_xp: number;
    content: string;
    created_at: string;
  }>(
    `SELECT r.id, r.user_id AS author_id,
            (u.first_name || ' ' || substr(u.last_name, 1, 1) || '.') AS author_name,
            u.xp AS author_xp,
            r.content, r.created_at
     FROM forum_replies r JOIN users u ON u.id = r.user_id
     WHERE r.post_id = ?
     ORDER BY r.created_at ASC`,
    postId,
  );

  return NextResponse.json({
    post: { ...post, user_voted: post.user_voted > 0, created_at: timeAgo(post.created_at) },
    replies: replies.map((r) => ({ ...r, created_at: timeAgo(r.created_at) })),
  });
}

function timeAgo(date: string) {
  const s = Math.floor((Date.now() - new Date(date + "Z").getTime()) / 1000);
  if (s < 60) return "à l'instant";
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
  if (s < 86400 * 7) return `il y a ${Math.floor(s / 86400)} j`;
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
