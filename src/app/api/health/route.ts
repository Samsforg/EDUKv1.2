import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";

export async function GET() {
  try {
    const count = queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users");
    return NextResponse.json({
      ok: true,
      service: "edukora-api",
      timestamp: new Date().toISOString(),
      users: count?.c ?? 0,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
