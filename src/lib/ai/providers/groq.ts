import { fetchWithTimeout, sanitizeText } from "./base";
import type { AICompletion, AIProvider, AIGenerateOptions } from "../types";

const DEFAULT_MODEL = "llama-3.3-70b-versatile";
const DEFAULT_TIMEOUT_MS = 30000;

export class GroqProvider implements AIProvider {
  readonly name = "groq";

  isAvailable(): boolean {
    return Boolean(process.env.GROQ_API_KEY);
  }

  async generateResponse(options: AIGenerateOptions): Promise<AICompletion> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY manquante");

    const model = process.env.GROQ_MODEL ?? DEFAULT_MODEL;
    const res = await fetchWithTimeout(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: options.messages,
          max_tokens: options.maxTokens ?? 500,
          temperature: options.temperature ?? 0.7,
        }),
      },
      options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Groq ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    const text = sanitizeText(data.choices?.[0]?.message?.content);
    if (!text) throw new Error("Groq: réponse vide");
    return { text, provider: this.name, model };
  }
}
