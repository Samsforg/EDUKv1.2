import { fetchWithTimeout } from "./providers/base";
import { logAI } from "./logger";

export interface EmbeddingProvider {
  readonly name: string;
  readonly dimension: number;
  isAvailable(): boolean;
  embed(texts: string[]): Promise<number[][]>;
}

const DEFAULT_TIMEOUT_MS = 60000;

export class GeminiEmbeddingProvider implements EmbeddingProvider {
  readonly name = "gemini";
  readonly dimension = 768;
  private readonly model = "gemini-embedding-2";

  isAvailable(): boolean {
    return Boolean(process.env.GEMINI_API_KEY);
  }

  async embed(texts: string[]): Promise<number[][]> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY manquante");

    const concurrency = 8;
    const results: number[][] = [];
    for (let i = 0; i < texts.length; i += concurrency) {
      const batch = texts.slice(i, i + concurrency);
      const responses = await Promise.all(
        batch.map((text) => this.embedOne(text, apiKey)),
      );
      results.push(...responses);
    }
    return results;
  }

  private async embedOne(text: string, apiKey: string): Promise<number[]> {
    const res = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:embedContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: `models/${this.model}`,
          content: { parts: [{ text }] },
          outputDimensionality: this.dimension,
        }),
      },
      DEFAULT_TIMEOUT_MS,
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Gemini embeddings ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    const values: number[] = data.embedding?.values;
    if (!values || values.length !== this.dimension) {
      throw new Error("Gemini embeddings: réponse invalide");
    }
    return values;
  }
}

export class HuggingFaceEmbeddingProvider implements EmbeddingProvider {
  readonly name = "huggingface";
  readonly dimension = 384;
  private readonly model = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2";

  isAvailable(): boolean {
    return Boolean(process.env.HF_API_KEY);
  }

  async embed(texts: string[]): Promise<number[][]> {
    const apiKey = process.env.HF_API_KEY;
    if (!apiKey) throw new Error("HF_API_KEY manquante");

    const res = await fetchWithTimeout(
      "https://router.huggingface.co/v1/embeddings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.HF_EMBEDDING_MODEL ?? this.model,
          input: texts,
        }),
      },
      DEFAULT_TIMEOUT_MS,
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`HuggingFace embeddings ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    const values: number[][] = data.data?.map((d: { embedding: number[] }) => d.embedding);
    if (!values || values.length !== texts.length) {
      throw new Error("HuggingFace embeddings: réponse invalide");
    }
    return values;
  }
}

export function getEmbeddingProvider(): EmbeddingProvider | null {
  const preferred = process.env.AI_EMBEDDING_PROVIDER;
  const candidates: EmbeddingProvider[] = [new GeminiEmbeddingProvider(), new HuggingFaceEmbeddingProvider()];
  const byPreference = preferred
    ? [...candidates.filter((p) => p.name === preferred), ...candidates.filter((p) => p.name !== preferred)]
    : candidates;
  return byPreference.find((p) => p.isAvailable()) ?? null;
}

export async function embedTexts(texts: string[]): Promise<{ vectors: number[][]; provider: string } | null> {
  const provider = getEmbeddingProvider();
  if (!provider) return null;
  const start = Date.now();
  try {
    const vectors = await provider.embed(texts);
    logAI({ provider: provider.name, model: "", status: "success", latencyMs: Date.now() - start });
    return { vectors, provider: provider.name };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logAI({ provider: provider.name, model: "", status: "failure", error: message });
    return null;
  }
}
