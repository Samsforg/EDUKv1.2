import { NextRequest, NextResponse } from "next/server";
import { getLiveHub, getReplays } from "@/lib/live";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const view = req.nextUrl.searchParams.get("view") ?? "hub";
  if (view === "replays") {
    const q = req.nextUrl.searchParams.get("q") ?? "";
    const cat = req.nextUrl.searchParams.get("cat") ?? "";
    const replays = getReplays(q, cat);
    const all = getLiveHub();
    return NextResponse.json({ replays, categories: all.categories });
  }
  const hub = getLiveHub();
  return NextResponse.json({ ...hub, me: { name: `${user.first_name} ${user.last_name}` } });
}
