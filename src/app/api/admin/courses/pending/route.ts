import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getPendingCourses } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const pending = await getPendingCourses();
  return NextResponse.json({
    pending,
    quizzes: pending.filter((p) => p.kind === "quiz").length,
    papers: pending.filter((p) => p.kind === "paper").length,
  });
}

export const GET = guardApi("GET /api/admin/courses/pending", GETHandler);
