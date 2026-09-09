import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getLiveHub } from "@/lib/live";
import { getCurrentUser } from "@/lib/session";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const hub = await getLiveHub();
  return NextResponse.json({ ...hub, me: `${user.first_name} ${user.last_name}` });
}

export const GET = guardApi("GET /api/live", GETHandler);
