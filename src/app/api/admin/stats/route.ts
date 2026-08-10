import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getAdminStats, getActivityFeed, getSubjectStats } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  return NextResponse.json({
    stats: await getAdminStats(),
    activity: await getActivityFeed(10),
    subjects: await getSubjectStats(),
  });
}

export const GET = guardApi("GET /api/admin/stats", GETHandler);
