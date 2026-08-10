import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { queryOne } from "@/lib/db";

const TARGETS = ["/", "/tarifs", "/plans-d-abonnement-edukora-1"];

async function GETHandler(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const origin =
    process.env.WARMUP_ORIGIN ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : req.nextUrl.origin);

  const fetches = TARGETS.map(async (path) => {
    try {
      const res = await fetch(origin + path, {
        headers: { "user-agent": "edukora-warmup/1.0" },
        cache: "no-store",
        signal: AbortSignal.timeout(9000),
      });
      return [path, res.status] as const;
    } catch (err) {
      return [path, -1] as const;
    }
  });

  const results: Record<string, number> = {};
  for (const [path, status] of await Promise.all(fetches)) {
    results[path] = status;
  }

  let users = 0;
  try {
    const c = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users");
    users = c?.c ?? 0;
  } catch {
    // DB indisponible : remonté plus bas
  }

  const ok = Object.values(results).every((s) => s === 200);
  return NextResponse.json(
    {
      ok,
      users,
      warmed_at: new Date().toISOString(),
      results,
    },
    { status: ok ? 200 : 502 },
  );
}

export const GET = guardApi("GET /api/warmup", GETHandler);
export const maxDuration = 10;
