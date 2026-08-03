import { NextResponse } from "next/server";
import { getPendingCourses } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const pending = getPendingCourses();
  return NextResponse.json({
    pending,
    quizzes: pending.filter((p) => p.kind === "quiz").length,
    papers: pending.filter((p) => p.kind === "paper").length,
  });
}
