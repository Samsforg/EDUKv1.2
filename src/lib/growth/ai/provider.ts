import type { AIProvider } from "@/lib/growth/ai/types";
import { createGatewayProvider } from "@/lib/growth/ai/gateway-provider";

let _provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (_provider) return _provider;
  _provider = createGatewayProvider();
  return _provider;
}

export function resetAIProvider(): void {
  _provider = null;
}
