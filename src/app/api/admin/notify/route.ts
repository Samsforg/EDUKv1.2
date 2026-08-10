import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { sendNotification } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";

async function POSTHandler(req: NextRequest) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || typeof body.title !== "string" || typeof body.body !== "string") {
    return NextResponse.json({ error: "Titre et message requis" }, { status: 400 });
  }

  const actor = await getCurrentUser();
  const target = body.user_id != null ? Number(body.user_id) : "all";
  const result = await sendNotification(actor!.id, target, body.title, body.body);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true, count: result.count });
}

export const POST = guardApi("POST /api/admin/notify", POSTHandler);
