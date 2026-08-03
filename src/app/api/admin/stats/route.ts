import { NextResponse } from "next/server";
import { getAdminStats, getActivityFeed, getSubjectStats } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  return NextResponse.json({
    stats: getAdminStats(),
    activity: getActivityFeed(10),
    subjects: getSubjectStats(),
  });
}
