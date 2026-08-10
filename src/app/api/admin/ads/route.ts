import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, run } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import { logAudit } from "@/lib/audit";

interface AdRow {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  background: string | null;
  enabled: number;
  sort_order: number;
  created_at: string | null;
}

function parseAdBody(body: Record<string, unknown>) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) return { error: "Le titre de la pub est requis" };
  if (title.length > 80) return { error: "Titre trop long (80 caractères max)" };
  const subtitle = typeof body.subtitle === "string" ? body.subtitle.trim().slice(0, 200) : "";
  const image_url = typeof body.image_url === "string" ? body.image_url.trim().slice(0, 500) : "";
  const link_url = typeof body.link_url === "string" ? body.link_url.trim().slice(0, 500) : "";
  const background = typeof body.background === "string" ? body.background.trim().slice(0, 20) : "";
  const enabled = body.enabled === true || body.enabled === 1 ? 1 : 0;
  const sort_order = Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 99;
  return { title, subtitle: subtitle || null, image_url: image_url || null, link_url: link_url || null, background: background || null, enabled, sort_order };
}

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  const ads = await query<AdRow>(
    "SELECT id, title, subtitle, image_url, link_url, background, enabled, sort_order, created_at FROM site_ads ORDER BY sort_order ASC, id ASC",
  );
  return NextResponse.json({ ads });
}

export const GET = guardApi("GET /api/admin/ads", GETHandler);

async function POSTHandler(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => ({}));
  const parsed = parseAdBody(body);
  if ("error" in parsed) return NextResponse.json(parsed, { status: 400 });

  const result = await run(
    "INSERT INTO site_ads (title, subtitle, image_url, link_url, background, enabled, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
    parsed.title,
    parsed.subtitle,
    parsed.image_url,
    parsed.link_url,
    parsed.background,
    parsed.enabled,
    parsed.sort_order,
  );

  const actor = await getCurrentUser();
  await logAudit(actor!.id, "pub", `Pub « ${parsed.title} » créée`);

  return NextResponse.json({ ok: true, id: result.lastInsertRowid }, { status: 201 });
}

export const POST = guardApi("POST /api/admin/ads", POSTHandler);