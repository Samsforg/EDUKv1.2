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
  const categoryId = Number(id);

  const category = queryOne<{ id: number; name: string; icon: string; color: string; description: string }>(
    "SELECT id, name, icon, color, description FROM forum_categories WHERE id = ?",
    categoryId,
  );
  if (!category) return NextResponse.json({ error: "Catégorie introuvable" }, { status: 404 });

  const posts = query<{
    id: number;
    title: string;
    content: string;
    author_id: number;
    author_name: string;
    author_xp: number;
    votes: number;
    replies: number;
    user_voted: number;
    created_at: string;
  }>(
    `SELECT p.id, p.title, p.content, p.user_id AS author_id,
            (u.first_name || ' ' || substr(u.last_name, 1, 1) || '.') AS author_name,
            u.xp AS author_xp,
            (SELECT COUNT(*) FROM forum_votes v WHERE v.post_id = p.id) AS votes,
            (SELECT COUNT(*) FROM forum_replies r WHERE r.post_id = p.id) AS replies,
            (SELECT COUNT(*) FROM forum_votes v WHERE v.post_id = p.id AND v.user_id = ?) AS user_voted,
            p.created_at
     FROM forum_posts p JOIN users u ON u.id = p.user_id
     WHERE p.category_id = ?
     ORDER BY votes DESC, p.created_at DESC`,
    user.id,
    categoryId,
  );

  return NextResponse.json({
    category,
    posts: posts.map((p) => ({
      ...p,
      user_voted: p.user_voted > 0,
      created_at: timeAgo(p.created_at),
    })),
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
