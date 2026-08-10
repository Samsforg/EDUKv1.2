import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getSubscriptionsPage } from "@/lib/admin";

async function GETHandler(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const status = url.searchParams.get("status") ?? "all";
  const page = Math.max(1, Number.parseInt(url.searchParams.get("page") ?? "1", 10) || 1);

  const result = await getSubscriptionsPage({ q, status, page });
  return NextResponse.json(result);
}

export const GET = guardApi("GET /api/admin/subscriptions", GETHandler);
