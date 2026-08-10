import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

async function GETHandler() {
  const grades = await query<{ id: number; code: string; name: string; cycle: string; order_index: number }>(
    "SELECT id, code, name, cycle, order_index FROM grades ORDER BY order_index, id",
  );
  return NextResponse.json({ grades });
}

export const GET = guardApi("GET /api/grades", GETHandler);
