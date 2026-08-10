import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getContentOverview } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  return NextResponse.json(await getContentOverview());
}

export const GET = guardApi("GET /api/admin/content", GETHandler);
