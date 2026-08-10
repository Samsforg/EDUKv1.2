import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

async function GETHandler() {
  const series = await query<{ id: number; code: string; name: string }>(
    "SELECT id, code, name FROM series ORDER BY id",
  );
  return NextResponse.json({ series });
}

export const GET = guardApi("GET /api/series", GETHandler);
