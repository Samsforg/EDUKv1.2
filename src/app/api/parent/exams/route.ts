import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getRecentResults, getSubjectStats, resolveLinkedChild } from "@/lib/parents";

const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];

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
  const childId = child.child_id;

  const allResults = getRecentResults(childId, 100);
  const subjects = getSubjectStats(childId);
  const estimated =
    subjects.length > 0
      ? Math.round((subjects.reduce((s, x) => s + x.avg_over_20, 0) / subjects.length) * 10) / 10
      : 0;
  const national_delta = Math.round((estimated - 10) * 10) / 10;

  const byMonth = new Map<string, { sum: number; count: number }>();
  for (const r of allResults) {
    const key = r.date.slice(0, 7);
    const cur = byMonth.get(key) ?? { sum: 0, count: 0 };
    cur.sum += r.score_over_20;
    cur.count += 1;
    byMonth.set(key, cur);
  }
  const evolution = [...byMonth.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([key, v]) => {
      const [y, m] = key.split("-").map(Number);
      return {
        month: `${MONTHS_FR[(m ?? 1) - 1]} ${String(y).slice(2)}`,
        avg: Math.round((v.sum / v.count) * 10) / 10,
        count: v.count,
      };
    });

  const sorted = [...subjects].sort((a, b) => b.avg_over_20 - a.avg_over_20);
  const weak = sorted[sorted.length - 1] ?? null;

  const exams = allResults
    .filter((r) => r.type === "exam")
    .map((r) => ({
      id: r.id,
      subject_name: r.subject_name,
      subject_icon: r.subject_icon,
      subject_color: r.subject_color,
      score_over_20: r.score_over_20,
      date: r.date,
      relative: r.relative,
      status: r.score_over_20 >= 10 ? "Admis" : "À renforcer",
      status_color: r.score_over_20 >= 10 ? "tertiary" : "error",
      trend: r.trend,
    }));

  const recommendation = weak
    ? `Basé sur les derniers résultats, nous recommandons une session intensive de 30 min sur ${weak.name} ce week-end pour remonter sa moyenne (${weak.avg_over_20.toFixed(1)}/20).`
    : "Lancez un premier examen blanc pour établir une base de suivi des performances.";

  return NextResponse.json({
    child: {
      id: child.child_id,
      first_name: child.first_name,
      last_name: child.last_name,
      class_level: child.class_level,
      serie_name: child.serie_name,
      online: child.online,
    },
    estimated_average: estimated,
    national_delta,
    evolution,
    exams,
    recommendation,
  });
}
