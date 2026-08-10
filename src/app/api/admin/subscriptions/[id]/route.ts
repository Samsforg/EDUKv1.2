import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import { setSubscriptionStatus, extendSubscription, SUB_STATUSES } from "@/lib/admin";

async function PATCHHandler(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const subId = Number(id);
  if (!Number.isFinite(subId)) return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });

  const actor = await getCurrentUser();
  if (!actor) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json().catch(() => ({}));

  if (body.status !== undefined) {
    if (typeof body.status !== "string" || !SUB_STATUSES.includes(body.status as (typeof SUB_STATUSES)[number])) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }
    const res = await setSubscriptionStatus(subId, body.status, actor.id);
    if (!("ok" in res)) return NextResponse.json({ error: res.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.extend_days !== undefined) {
    const res = await extendSubscription(subId, body.extend_days, actor.id);
    if (!("ok" in res)) return NextResponse.json({ error: res.error }, { status: 400 });
    return NextResponse.json({ ok: true, end_at: res.end_at });
  }

  return NextResponse.json({ error: "Aucune action valide (status ou extend_days)" }, { status: 400 });
}

export const PATCH = guardApi("PATCH /api/admin/subscriptions/[id]", PATCHHandler);
