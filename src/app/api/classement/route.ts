import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import {
  getGlobalRanking,
  getCommuneRanking,
  getCommuneLeaders,
  getLigueRanking,
  getLigueLadder,
  getLigueStatus,
  getAmbassadorRanking,
} from "@/lib/rank";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const sp = new URL(req.url).searchParams;
  const view = sp.get("view") ?? "global";
  const limit = Math.min(50, Math.max(1, Number(sp.get("limit")) || 20));

  switch (view) {
    case "commune": {
      const commune =
        sp.get("commune") ??
        queryOne<{ commune: string | null }>("SELECT commune FROM users WHERE id = ?", user.id)?.commune ??
        "";
      return NextResponse.json(getCommuneRanking(commune, limit, user.id));
    }
    case "communes":
      return NextResponse.json({ communes: getCommuneLeaders() });
    case "ligue":
      return NextResponse.json(getLigueRanking(sp.get("ligue") ?? "", limit, user.id));
    case "ligues":
      return NextResponse.json({ ligues: getLigueLadder(), me: getLigueStatus(user.id) });
    case "ambassadeurs":
      return NextResponse.json(getAmbassadorRanking(limit, user.id));
    default:
      return NextResponse.json(getGlobalRanking(limit, user.id));
  }
}
