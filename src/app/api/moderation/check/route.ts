import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { moderateContent, moderateQuizQuestion } from "@/lib/moderation";

async function POSTHandler(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Body requis" }, { status: 400 });

  const { text, questions } = body as {
    text?: string;
    questions?: { question: string; options: string[] }[];
  };

  if (questions && Array.isArray(questions)) {
    const results = questions.map((q) => ({
      ...moderateQuizQuestion(q.question, q.options),
      question: q.question,
    }));
    const allApproved = results.every((r) => r.approved);
    return NextResponse.json({
      approved: allApproved,
      results,
    });
  }

  if (!text) return NextResponse.json({ error: "text requis" }, { status: 400 });

  const result = moderateContent(text);
  return NextResponse.json(result);
}

export const POST = guardApi("POST /api/moderation/check", POSTHandler);
