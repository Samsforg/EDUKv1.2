import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { run } from "@/lib/db";
import { getCurrentUser, addXp, notify } from "@/lib/session";
import { checkAIRateLimit } from "@/lib/ai/rate-limit";
import { correctDissertation, isDissertationAIConfigured } from "@/lib/ai/dissertation";
import { getDissertationQuota, DISSERTATION_MONTHLY_LIMIT } from "@/lib/quotas";
import { getPremiumPlans } from "@/lib/plans";
import { creditLigueChallenges } from "@/lib/ligue";

const EXAM_WHITELIST = ["BAC", "BEPC"];
const SUBJECT_WHITELIST = ["Français", "Philosophie", "Histoire-Géographie"];
const MAX_TEXT_LENGTH = 6000;

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.text !== "string" || !body.text.trim()) {
    return NextResponse.json({ error: "Collez votre dissertation avant de soumettre" }, { status: 400 });
  }

  const text = body.text.trim().slice(0, MAX_TEXT_LENGTH);
  if (text.length < 200) {
    return NextResponse.json(
      { error: "Votre copie est trop courte (200 caractères minimum, soit environ 40 mots)." },
      { status: 400 },
    );
  }

  const exam = EXAM_WHITELIST.includes(body.exam) ? body.exam : "BAC";
  const subject = SUBJECT_WHITELIST.includes(body.subject) ? body.subject : "Français";

  const quota = await getDissertationQuota(user.id);
  if (quota.limit !== null && quota.used >= quota.limit) {
    if (!quota.isPremium) {
      const plans = await getPremiumPlans().catch(() => []);
      const reussite = plans.find((p) => p.price_cents > 0 && p.interval === "month");
      const monthlyLimit = DISSERTATION_MONTHLY_LIMIT;
      return NextResponse.json(
        {
          error: `Vous avez utilisé votre correction de dissertation gratuite du mois. Passez au plan Réussite pour faire corriger jusqu'à ${monthlyLimit} dissertations par mois par Kora !`,
          code: "quota_exceeded",
          quota,
          plan: reussite
            ? { id: reussite.id, name: reussite.name, price_cents: reussite.price_cents, interval: reussite.interval }
            : null,
        },
        { status: 429 },
      );
    }
    return NextResponse.json(
      {
        error: `Vous avez atteint votre quota de ${quota.limit} dissertations ${quota.windowLabel ?? "pour cette période"} sur le plan « ${quota.planName} ». Il se réinitialisera à la prochaine période d'abonnement.`,
        code: "quota_exceeded",
        quota,
        plan: null,
      },
      { status: 429 },
    );
  }

  const aiRl = await checkAIRateLimit(`dissertation:${user.id}`);
  if (!aiRl.allowed) {
    const retryAfter = Math.max(1, Math.ceil((aiRl.resetAtMinute - Date.now()) / 1000));
    return NextResponse.json(
      {
        error: `Kora corrige actuellement d'autres copies. Réessayez dans ${retryAfter}s.`,
        code: "ai_rate_limit",
        retryAfter,
      },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  if (!isDissertationAIConfigured()) {
    return NextResponse.json(
      { error: "La correction par IA n'est pas disponible pour le moment. Réessayez plus tard." },
      { status: 503 },
    );
  }

  const result = await correctDissertation({ text, exam, subject });
  const provider = result ? "gateway" : null;

  const raw = result?.raw ?? null;
  await run(
    "INSERT INTO dissertation_corrections (user_id, exam, subject, input_text, note, criteria, feedback, provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    user.id,
    exam,
    subject,
    text,
    result?.note && result.note > 0 ? result.note : null,
    result?.criteria && result.criteria.length > 0 ? JSON.stringify(result.criteria) : null,
    result?.summary && result.summary.length > 0 ? result.summary : null,
    provider,
  );

  if (!result) {
    return NextResponse.json(
      { error: "Kora n'a pas pu corriger votre copie pour le moment. Réessayez dans quelques instants." },
      { status: 502 },
    );
  }

  await addXp(user.id, 10);
  await creditLigueChallenges(user.id, "xp_total", 10);
  if (result.note > 0) {
    await notify(
      user.id,
      `Dissertation corrigée : ${result.note}/20`,
      `Kora a corrigé ta dissertation de ${subject} (${exam}). Va voir ta note et tes conseils !`,
      "school",
    );
  }

  return NextResponse.json({ correction: result });
}

export const POST = guardApi("POST /api/tutor/dissertation", POSTHandler);