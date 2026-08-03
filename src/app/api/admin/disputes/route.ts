import { NextResponse } from "next/server";
import { getDisputes } from "@/lib/disputes";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  return NextResponse.json({ disputes: getDisputes() });
}
