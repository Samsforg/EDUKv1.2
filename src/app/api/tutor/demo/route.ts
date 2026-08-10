import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { generateTutorReply, isTutorAIConfigured, type TutorHistoryItem } from "@/lib/tutor-ai";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

const MAX_HISTORY = 8;
const MAX_MESSAGE = 1000;

const DEMO_FALLBACK =
  "Très bonne question ! Le tuteur Kora interactif est réservé aux élèves connectés : crée ton compte gratuit et pose-moi toutes tes questions pour réviser ton BAC ou ton BEPC.";

async function POSTHandler(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`tutor_demo:${ip}`, "tutor_demo");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await req.json().catch(() => null);
  if (!body || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json({ error: "Message vide" }, { status: 400 });
  }
  const message = body.message.trim().slice(0, MAX_MESSAGE);

  if (!isTutorAIConfigured()) {
    return NextResponse.json({ reply: DEMO_FALLBACK });
  }

  const history: TutorHistoryItem[] = Array.isArray(body.history)
    ? body.history
        .filter((h: unknown): h is { role: unknown; content: unknown } => {
          if (!h || typeof h !== "object") return false;
          const o = h as { role?: unknown; content?: unknown };
          return (o.role === "user" || o.role === "assistant") && typeof o.content === "string";
        })
        .slice(-MAX_HISTORY)
        .map((h: { role: unknown; content: unknown }) => ({
          role: h.role as "user" | "assistant",
          content: (h.content as string).slice(0, MAX_MESSAGE),
        }))
    : [];

  const reply = await generateTutorReply({ message, history, studentName: null, serieName: null, classLevel: null });
  return NextResponse.json({ reply: reply ?? DEMO_FALLBACK });
}

export const POST = guardApi("POST /api/tutor/demo", POSTHandler);
