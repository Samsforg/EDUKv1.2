import type { AIEvent } from "./types";
import { logger } from "../logger";

export function logAI(event: AIEvent): void {
  logger.info(`[ai] ${JSON.stringify({ t: new Date().toISOString(), ...event })}`);
}
