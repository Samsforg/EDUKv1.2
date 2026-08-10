import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getProctoringOverview } from "@/lib/proctoring";
import { requireAdmin } from "@/lib/admin-guard";

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  return NextResponse.json(await getProctoringOverview());
}

export const GET = guardApi("GET /api/admin/proctoring", GETHandler);
