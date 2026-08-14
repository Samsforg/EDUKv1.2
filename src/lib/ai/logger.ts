import type { AIEvent } from "./types";

export function logAI(event: AIEvent): void {
  console.log(`[ai] ${JSON.stringify({ t: new Date().toISOString(), ...event })}`);
}
