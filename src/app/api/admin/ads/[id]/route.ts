import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import { logAudit } from "@/lib/audit";

async function PATCHHandler(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await ctx.params;
  const adId = Number(id);
  if (!Number.isInteger(adId)) return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });

  const existing = await queryOne<{ id: number }>("SELECT id FROM site_ads WHERE id = ?", adId);
  if (!existing) return NextResponse.json({ error: "Pub introuvable" }, { status: 404 });

  const body = await req.json().catch(() => ({}));

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) return NextResponse.json({ error: "Le titre de la pub est requis" }, { status: 400 });
  if (title.length > 80) return NextResponse.json({ error: "Titre trop long (80 caractères max)" }, { status: 400 });

  const subtitle = typeof body.subtitle === "string" ? body.subtitle.trim().slice(0, 200) : "";
  const image_url = typeof body.image_url === "string" ? body.image_url.trim().slice(0, 500) : "";
  const link_url = typeof body.link_url === "string" ? body.link_url.trim().slice(0, 500) : "";
  const background = typeof body.background === "string" ? body.background.trim().slice(0, 20) : "";
  const enabled = body.enabled === true || body.enabled === 1 ? 1 : 0;
  const sort_order = Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 99;

  await run(
    "UPDATE site_ads SET title = ?, subtitle = ?, image_url = ?, link_url = ?, background = ?, enabled = ?, sort_order = ? WHERE id = ?",
    title,
    subtitle || null,
    image_url || null,
    link_url || null,
    background || null,
    enabled,
    sort_order,
    adId,
  );

  const actor = await getCurrentUser();
  await logAudit(actor!.id, "pub", `Pub « ${title} » modifiée`);

  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/admin/ads/[id]", PATCHHandler);

async function DELETEHandler(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await ctx.params;
  const adId = Number(id);
  if (!Number.isInteger(adId)) return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });

  const existing = await queryOne<{ id: number; title: string }>(
    "SELECT id, title FROM site_ads WHERE id = ?",
    adId,
  );
  if (!existing) return NextResponse.json({ error: "Pub introuvable" }, { status: 404 });

  await run("DELETE FROM site_ads WHERE id = ?", adId);

  const actor = await getCurrentUser();
  await logAudit(actor!.id, "pub", `Pub « ${existing.title} » supprimée`);

  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/admin/ads/[id]", DELETEHandler);