import { query, queryOne } from "@/lib/db";
import { generateWithGateway } from "@/lib/ai/gateway";

export interface AICorrection {
  questionId: number;
  isCorrect: boolean;
  explanation: string;
  videoUrl: string | null;
  tip: string | null;
}

export async function generateAICorrection(
  question: { id: number; question: string; options: string; answer_index: number; explanation: string | null },
  selectedIndex: number,
  subjectName?: string,
  ragContext?: string | null
): Promise<{ explanation: string; tip: string | null }> {
  if (question.explanation && question.explanation.trim().length > 20) {
    return { explanation: question.explanation, tip: null };
  }
  try {
    const opts: string[] = JSON.parse(question.options);
    const correct = opts[question.answer_index] ?? "";
    const chosen = opts[selectedIndex] ?? "aucune réponse";
    const rag = ragContext ? `\nContexte cours: ${ragContext.slice(0, 600)}` : "";
    const prompt = `Tu es un professeur ivoirien du secondaire. Explique en 3 phrases max pourquoi la bonne réponse à cette question de ${subjectName ?? "cours"} est "${correct}" et pourquoi "${chosen}" est incorrect. Question: ${question.question}${rag}`;
    const res = await generateWithGateway({ messages: [{ role: "user", content: prompt }], maxTokens: 220, temperature: 0.6 });
    if (res?.text) return { explanation: res.text.trim(), tip: "Astuce: relis la leçon associée pour approfondir." };
  } catch (err) {
    console.warn("[quiz-ai] explanation generation failed:", err instanceof Error ? err.message : err);
  }
  return { explanation: question.explanation ?? "Bonne réponse : option " + (question.answer_index + 1) + ".", tip: null };
}

export async function getQuizAICorrections(quizId: number, answers: number[]): Promise<AICorrection[]> {
  const quiz = await queryOne<{ subject_id: number; chapter_id: number | null }>("SELECT subject_id, chapter_id FROM quizzes WHERE id = ?", quizId);
  const subject = quiz ? await queryOne<{ name: string }>("SELECT name FROM subjects WHERE id = ?", quiz.subject_id) : null;
  const questions = await query<{ id: number; question: string; options: string; answer_index: number; explanation: string | null }>(
    "SELECT id, question, options, answer_index, explanation FROM questions WHERE quiz_id = ? ORDER BY position",
    quizId
  );
  const ragRows = quiz?.subject_id
    ? await query<{ content: string }>("SELECT content FROM document_chunks WHERE subject_id = ? ORDER BY id DESC LIMIT 2", quiz.subject_id)
    : [];
  const ragContext = ragRows.map((r) => r.content).join("\n").slice(0, 800) || null;
  // try to find a video for the quiz's chapter/lesson
  const videoRow = await queryOne<{ video_url: string }>(
    `SELECT l.video_url FROM lessons l
     JOIN quizzes q ON q.chapter_id = l.chapter_id
     WHERE q.id = ? AND l.video_url IS NOT NULL AND l.video_url != '' LIMIT 1`,
    quizId
  );
  const videoUrl = videoRow?.video_url ?? null;

  const out: AICorrection[] = [];
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const sel = answers[i];
    const isCorrect = sel === q.answer_index;
    let ai = { explanation: q.explanation ?? "", tip: null as string | null };
    if (!isCorrect) ai = await generateAICorrection(q, sel ?? -1, subject?.name, ragContext);
    out.push({ questionId: q.id, isCorrect, explanation: ai.explanation, videoUrl: !isCorrect ? videoUrl : null, tip: ai.tip });
  }
  return out;
}
