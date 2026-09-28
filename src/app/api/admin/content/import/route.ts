import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import {
  MAX_IMPORT_PAYLOAD,
  importLessons,
  normalizeImportRows,
} from "@/lib/content-import";

async function POSTHandler(req: NextRequest) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const actor = await getCurrentUser();
  const body = await req.json().catch(() => null);
  const format = body?.format === "json" ? "json" : body?.format === "csv" ? "csv" : null;
  const payload = typeof body?.payload === "string" ? body.payload : null;
  if (!format || payload === null) {
    return NextResponse.json({ error: "format (csv|json) et payload requis" }, { status: 400 });
  }
  if (payload.length > MAX_IMPORT_PAYLOAD) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 2 Mo)" }, { status: 413 });
  }

  const normalized = normalizeImportRows(format, payload);
  if ("error" in normalized) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  const report = await importLessons(normalized.rows, actor!.id);
  return NextResponse.json({ ok: true, ...report });
}

export const POST = guardApi("POST /api/admin/content/import", POSTHandler);
