import { generateWithGateway } from "@/lib/ai/gateway";
import { logAI } from "@/lib/ai/logger";
import type { AIProvider } from "@/lib/growth/ai/types";

export function createGatewayProvider(): AIProvider {
  return {
    name: "gateway",
    isAvailable() {
      return true;
    },
    async generate({ system, prompt, maxTokens = 1024, temperature = 0.7 }) {
      const start = Date.now();
      const result = await generateWithGateway({
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
        maxTokens,
        temperature,
        timeoutMs: 30000,
      });

      if (!result) {
        throw new Error("All AI providers failed");
      }

      logAI({
        provider: `growth/${result.provider}`,
        model: result.model,
        status: "success",
        latencyMs: Date.now() - start,
        index: 1,
        total: 1,
      });

      return result.text;
    },
  };
}
