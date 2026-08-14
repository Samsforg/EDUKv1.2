export function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export function sanitizeText(
  text: string | null | undefined,
  maxLength = 16000,
): string | null {
  const t = text?.trim();
  if (!t) return null;
  return t.length > maxLength ? t.slice(0, maxLength) : t;
}
