import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import crypto from "crypto";

function generateToken(): string {
  return crypto.randomBytes(8).toString("base64url");
}

async function POSTHandler(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const quizId = Number(id);

  const quiz = await queryOne<{ id: number; created_by: number | null; share_token: string | null }>(
    "SELECT id, created_by, share_token FROM quizzes WHERE id = ?",
    quizId,
  );
  if (!quiz) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });
  if (quiz.created_by !== user.id && user.role !== "admin") {
    return NextResponse.json({ error: "Pas ton quiz" }, { status: 403 });
  }

  const token = quiz.share_token || generateToken();
  if (!quiz.share_token) {
    await run("UPDATE quizzes SET share_token = ? WHERE id = ?", token, quizId);
  }

  const url = `${req.headers.get("origin") ?? (process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net")}/quiz/share/${token}`;
  return NextResponse.json({ ok: true, token, url });
}

export const POST = guardApi("POST /api/quiz/[id]/share", POSTHandler);
