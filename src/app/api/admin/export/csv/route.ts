import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { buildReportCsv } from "@/lib/report";
import { requireAdmin } from "@/lib/admin-guard";

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const csv = await buildReportCsv();
  const filename = `edukora-rapport-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

export const GET = guardApi("GET /api/admin/export/csv", GETHandler);
