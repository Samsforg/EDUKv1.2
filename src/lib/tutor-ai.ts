export interface TutorHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface TutorReplyContext {
  message: string;
  history: TutorHistoryItem[];
  studentName: string | null;
  serieName: string | null;
  classLevel: string | null;
}

const TIMEOUT_MS = 30000;
const MAX_HISTORY = 8;

function provider(): "openai" | "gemini" | null {
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GEMINI_API_KEY) return "gemini";
  return null;
}

export function isTutorAIConfigured(): boolean {
  return provider() !== null;
}

function buildSystemPrompt(ctx: TutorReplyContext): string {
  const profile = [
    ctx.studentName ? `L'élève s'appelle ${ctx.studentName}.` : "",
    ctx.classLevel ? `Il est en ${ctx.classLevel}.` : "",
    ctx.serieName ? `Il suit la série ${ctx.serieName}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `Tu es Kora, le tuteur IA bienveillant d'Edukora, une application éducative ivoirienne pour les élèves préparant le BAC et le BEPC.

Ton rôle : expliquer des notions de cours (maths, physique-chimie, SVT, français, anglais, histoire-géo), corriger des exercices, proposer des méthodes de révision et motiver l'élève.

Règles :
- Réponds toujours en français.
- Adopte un ton chaleureux, encourageant et pédagogique, comme un bon professeur.
- Explique étape par étape et donne un exemple concret quand c'est utile.
- Reste concis : 60 à 150 mots, sauf si une réponse détaillée est demandée.
- Si l'élève demande un corrigé d'exercice, explique le raisonnement avant la réponse finale.
- Ne fais jamais les devoirs à la place de l'élève : guide-le vers la solution.
- Si tu ne sais pas, propose une piste de révision plutôt qu'inventer.
- Utilise du texte simple (pas de markdown lourd ni d'emojis).

${profile}`;
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAI(ctx: TutorReplyContext): Promise<string | null> {
  const messages = [
    { role: "system", content: buildSystemPrompt(ctx) },
    ...ctx.history.slice(-MAX_HISTORY).map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: ctx.message },
  ];

  const res = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TUTOR_MODEL ?? "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? null;
}

async function callGemini(ctx: TutorReplyContext): Promise<string | null> {
  const contents = ctx.history
    .slice(-MAX_HISTORY)
    .map((h) => ({ role: h.role, parts: [{ text: h.content }] }));
  contents.push({ role: "user", parts: [{ text: ctx.message }] });

  const res = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_TUTOR_MODEL ?? "gemini-3-flash-preview"}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt(ctx) }] },
        contents,
        generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
      }),
    },
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;
}

export async function generateTutorReply(ctx: TutorReplyContext): Promise<string | null> {
  const p = provider();
  if (!p) return null;
  try {
    const reply = p === "openai" ? await callOpenAI(ctx) : await callGemini(ctx);
    if (!reply || reply.length === 0) return null;
    return reply.length > 2000 ? reply.slice(0, 2000) : reply;
  } catch {
    return null;
  }
}
