import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { generateStrategy } from "@/lib/growth/marketing/strategy";
import { getStore } from "@/lib/growth/data/store";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  const s = await getStore();
  const strategies = await s.getStrategies(30);
  return NextResponse.json({ strategies });
}

async function POSTHandler() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  try {
    const strategy = await generateStrategy();
    return NextResponse.json({ strategy });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur IA" }, { status: 500 });
  }
}

export const GET = GETHandler;
export const POST = POSTHandler;
