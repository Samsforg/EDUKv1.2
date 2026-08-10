import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";

async function GETHandler() {
  try {
    const count = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users");
    const warnings: string[] = [];
    if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
      warnings.push("SESSION_SECRET non défini : sessions désactivées par sécurité (fail-closed).");
    }
    if (!process.env.GENIUSPAY_API_KEY || !process.env.GENIUSPAY_API_SECRET) {
      warnings.push("GENIUSPAY_API_KEY / GENIUSPAY_API_SECRET non définis : abonnements premium indisponibles.");
    }
    return NextResponse.json({
      ok: true,
      service: "edukora-api",
      timestamp: new Date().toISOString(),
      users: count?.c ?? 0,
      warnings,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export const GET = guardApi("GET /api/health", GETHandler);
