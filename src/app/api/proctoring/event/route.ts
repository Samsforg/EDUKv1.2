import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";
import { logProctoringEvent, startOrResumeSession } from "@/lib/proctoring";

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const paperId = Number(body.paper_id ?? body.paperId);
  const type = String(body.type ?? "tab_switch").slice(0, 30);
  if (!paperId) return NextResponse.json({ error: "paper_id requis" }, { status: 400 });
  const sessionId = await startOrResumeSession(user.id, paperId);
  await logProctoringEvent(sessionId, type, String(body.detail ?? "tab_switch").slice(0, 300));
  return NextResponse.json({ ok: true });
}
export const POST = guardApi("POST /api/proctoring/event", POSTHandler);
