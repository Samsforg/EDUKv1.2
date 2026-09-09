import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";
import { sendSms } from "@/lib/sms";
import { logger } from "@/lib/logger";

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.to || !body?.message) {
    return NextResponse.json({ error: "Paramètres manquants: to, message" }, { status: 400 });
  }

  const result = await sendSms(body.to, body.message);
  logger.info("sms:send", { to: body.to, ok: result.ok, by: user.id });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, recipients: result.recipients });
}

export const POST = guardApi("POST /api/sms/send", POSTHandler);
