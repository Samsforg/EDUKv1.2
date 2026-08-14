import { fetchWithTimeout, sanitizeText } from "./base";
import type { AICompletion, AIProvider, AIGenerateOptions } from "../types";

const DEFAULT_MODEL = "gemini-3-flash-preview";
const DEFAULT_TIMEOUT_MS = 30000;

export class GeminiProvider implements AIProvider {
  readonly name = "gemini";

  isAvailable(): boolean {
    return Boolean(process.env.GEMINI_API_KEY);
  }

  async generateResponse(options: AIGenerateOptions): Promise<AICompletion> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY manquante");

    const model = process.env.GEMINI_TUTOR_MODEL ?? DEFAULT_MODEL;
    const contents = options.messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const system = options.messages.find((m) => m.role === "system");
    const res = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: system
            ? { parts: [{ text: system.content }] }
            : undefined,
          contents,
          generationConfig: {
            maxOutputTokens: options.maxTokens ?? 500,
            temperature: options.temperature ?? 0.7,
          },
        }),
      },
      options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Gemini ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    const text = sanitizeText(data.candidates?.[0]?.content?.parts?.[0]?.text);
    if (!text) throw new Error("Gemini: réponse vide");
    return { text, provider: this.name, model };
  }
}
