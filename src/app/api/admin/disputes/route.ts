import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getDisputes } from "@/lib/disputes";
import { requireAdmin } from "@/lib/admin-guard";

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  return NextResponse.json({ disputes: await getDisputes() });
}

export const GET = guardApi("GET /api/admin/disputes", GETHandler);
