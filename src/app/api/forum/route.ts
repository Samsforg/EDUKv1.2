import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const categories = query<{
    id: number;
    name: string;
    icon: string;
    color: string;
    description: string;
    posts_count: number;
    last_activity: string | null;
  }>(
    `SELECT c.id, c.name, c.icon, c.color, c.description,
            (SELECT COUNT(*) FROM forum_posts p WHERE p.category_id = c.id) AS posts_count,
            (SELECT MAX(p.created_at) FROM forum_posts p WHERE p.category_id = c.id) AS last_activity
     FROM forum_categories c ORDER BY c.position`,
  );

  const recent = query<{
    id: number;
    category_id: number;
    category_name: string;
    category_icon: string;
    category_color: string;
    title: string;
    content: string;
    author_id: number;
    author_name: string;
    votes: number;
    replies: number;
    user_voted: number;
    created_at: string;
  }>(
    `SELECT p.id, p.category_id, c.name AS category_name, c.icon AS category_icon, c.color AS category_color,
            p.title, p.content, p.user_id AS author_id,
            (u.first_name || ' ' || substr(u.last_name, 1, 1) || '.') AS author_name,
            (SELECT COUNT(*) FROM forum_votes v WHERE v.post_id = p.id) AS votes,
            (SELECT COUNT(*) FROM forum_replies r WHERE r.post_id = p.id) AS replies,
            (SELECT COUNT(*) FROM forum_votes v WHERE v.post_id = p.id AND v.user_id = ?) AS user_voted,
            p.created_at
     FROM forum_posts p
     JOIN forum_categories c ON c.id = p.category_id
     JOIN users u ON u.id = p.user_id
     ORDER BY p.created_at DESC LIMIT 8`,
    user.id,
  );

  return NextResponse.json({
    categories: categories.map((c) => ({
      ...c,
      last_activity: c.last_activity
        ? timeAgo(c.last_activity)
        : null,
    })),
    recent: recent.map((p) => ({
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
