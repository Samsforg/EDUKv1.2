import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";

export async function GET() {
  try {
    const count = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users");
    const warnings: string[] = [];
    if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
      warnings.push("SESSION_SECRET non défini : sessions désactivées par sécurité (fail-closed).");
    }
    if (!process.env.GENIUSPAY_API_KEY) {
      warnings.push("GENIUSPAY_API_KEY non défini : abonnements premium indisponibles.");
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
