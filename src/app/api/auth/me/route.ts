import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getSubscriptionStatus } from "@/lib/quotas";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ user: null });
  const sub = await getSubscriptionStatus(user.id).catch(() => null);
  return NextResponse.json({
    user: sub ? { ...user, is_premium: sub.isPremium, plan_name: sub.planName } : user,
  });
}

export const GET = guardApi("GET /api/auth/me", GETHandler);
