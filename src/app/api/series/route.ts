import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  const series = query<{ id: number; code: string; name: string }>(
    "SELECT id, code, name FROM series ORDER BY id",
  );
  return NextResponse.json({ series });
}
