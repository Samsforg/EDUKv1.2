import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { CATEGORY_ORDER, computeBadgeProgress, refreshBadges, type BadgeCategory, type BadgeProgress } from "@/lib/badges";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  await refreshBadges(user.id);
  const badges = await computeBadgeProgress(user.id);
  const earned = badges.filter((b) => b.earned_at !== null);
  const locked = badges.filter((b) => b.earned_at === null);

  earned.sort((a, b) => (b.earned_at ?? "").localeCompare(a.earned_at ?? ""));

  const next =
    locked.length === 0
      ? null
      : locked
          .slice()
          .sort((a, b) => b.progress - a.progress || a.goal - b.goal)[0];

  const categories = CATEGORY_ORDER.map((cat) => ({
    name: cat,
    badges: badges.filter((b) => b.category === cat),
  })).filter((c) => c.badges.length > 0);

  return NextResponse.json({
    total: badges.length,
    earned_count: earned.length,
    earned,
    next,
    categories,
  });
}

export const GET = guardApi("GET /api/me/badges", GETHandler);
