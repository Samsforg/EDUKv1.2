import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { generateContent } from "@/lib/growth/marketing/content";
import { generateVisualPrompt } from "@/lib/growth/marketing/visual";
import { calculateContentScore } from "@/lib/growth/marketing/scoring";
import { getStore } from "@/lib/growth/data/store";
import type { Content } from "@/lib/growth/ai/types";

const PLATFORMS = ["facebook", "tiktok", "whatsapp"] as const;

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  const s = await getStore();
  const contents = await s.getAllContent(50);
  return NextResponse.json({ contents });
}

async function POSTHandler(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const platform = body.platform as string | undefined;
  const platforms = body.platforms as string[] | undefined;
  const strategyId = (body.strategyId as string) || `auto-${Date.now()}`;
  const topic = body.topic as string | undefined;
  const includeVisual = body.includeVisual !== false;

  const targets = platforms?.length
    ? platforms.filter((p) => PLATFORMS.includes(p as typeof PLATFORMS[number]))
    : platform && PLATFORMS.includes(platform as typeof PLATFORMS[number])
      ? [platform]
      : [...PLATFORMS];

  if (targets.length === 0) {
    return NextResponse.json({ error: "Plateforme invalide" }, { status: 400 });
  }

  try {
    const results: Content[] = [];
    const errors: string[] = [];

    await Promise.allSettled(
      targets.map(async (p) => {
        try {
          const content = await generateContent(p as typeof PLATFORMS[number], strategyId, topic);
          content.score = calculateContentScore(content).score;
          if (includeVisual && !content.visualPrompt) {
            content.visualPrompt = await generateVisualPrompt(`${content.text} — ${p}`);
          }
          const s = await getStore();
          await s.saveContent(content);
          results.push(content);
        } catch (e) {
          errors.push(`${p}: ${e instanceof Error ? e.message : "erreur inconnue"}`);
        }
      }),
    );

    if (results.length === 0 && errors.length > 0) {
      return NextResponse.json({ error: `Échec IA : ${errors.join("; ")}` }, { status: 500 });
    }

    return NextResponse.json(
      results.length === 1 ? { content: results[0] } : { contents: results, errors: errors.length > 0 ? errors : undefined },
    );
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur IA" }, { status: 500 });
  }
}

export const GET = GETHandler;
export const POST = POSTHandler;
