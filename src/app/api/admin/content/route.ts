import { NextResponse } from "next/server";
import { getContentOverview } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  return NextResponse.json(getContentOverview());
}
