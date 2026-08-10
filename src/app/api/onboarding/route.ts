import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const GOALS = ["bac", "bepc", "notes", "programme"] as const;

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const row = await queryOne<{ goal: string | null; seen_onboarding: number }>(
    "SELECT goal, seen_onboarding FROM users WHERE id = ?",
    user.id,
  );

  return NextResponse.json({
    goal: row?.goal ?? null,
    seen_onboarding: row?.seen_onboarding === 1,
    first_name: user.first_name,
    class_level: user.class_level ?? null,
  });
}

export const GET = guardApi("GET /api/onboarding", GETHandler);

async function PUTHandler(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Requête invalide" }, { status: 400 });

  const goal = typeof body.goal === "string" && (GOALS as readonly string[]).includes(body.goal) ? body.goal : null;
  const seen = body.seen_onboarding === true ? 1 : undefined;

  await run(
    "UPDATE users SET goal = COALESCE(?, goal), seen_onboarding = COALESCE(?, seen_onboarding) WHERE id = ?",
    goal,
    seen ?? null,
    user.id,
  );

  const row = await queryOne<{ goal: string | null; seen_onboarding: number }>(
    "SELECT goal, seen_onboarding FROM users WHERE id = ?",
    user.id,
  );

  return NextResponse.json({ goal: row?.goal ?? null, seen_onboarding: row?.seen_onboarding === 1 });
}

export const PUT = guardApi("PUT /api/onboarding", PUTHandler);
