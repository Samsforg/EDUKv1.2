import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { generateRecommendation } from "@/lib/growth/marketing/strategy";
import { getStore } from "@/lib/growth/data/store";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  const s = await getStore();
  const recommendations = await s.getRecommendations(20);
  return NextResponse.json({ recommendations });
}

async function POSTHandler() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  try {
    const recommendation = await generateRecommendation();
    return NextResponse.json({ recommendation });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur IA" }, { status: 500 });
  }
}

export const GET = GETHandler;
export const POST = POSTHandler;
