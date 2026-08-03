import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getPeakHours, getWeeklyActivity, resolveLinkedChild } from "@/lib/parents";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }

  const requested = req.nextUrl.searchParams.get("child");
  const child = resolveLinkedChild(user.id, requested ? Number(requested) : null);
  if (!child) {
    return NextResponse.json({ error: "Aucun enfant lié" }, { status: 404 });
  }

  const week = getWeeklyActivity(child.child_id);
  const peak = getPeakHours(child.child_id);
  const sortedDays = [...week.days].sort((a, b) => b.hours - a.hours);
  const bestDay = sortedDays[0];

  return NextResponse.json({
    child: {
      id: child.child_id,
      first_name: child.first_name,
      last_name: child.last_name,
    },
    days: week.days,
    total_hours: week.total,
    active_days: week.activeDays,
    streak: child.streak,
    peak: peak.label,
    recommendation: week.activeDays === 0
      ? `Aucune activité cette semaine. Encouragez ${child.first_name} à reprendre ses révisions : une session de 20 min suffit pour lancer une série.`
      : bestDay && bestDay.hours > 0
        ? `Une session de 30 min le ${bestDay.label.toLowerCase()} matin pourrait consolider ses acquis. Son rythme optimal détecté est entre ${peak.label}.`
        : "Lancez une session de révision pour établir une base de suivi.",
  });
}
