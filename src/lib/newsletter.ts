import { run, queryOne } from "./db";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export async function subscribeNewsletter(
  email: string,
  opts: { ip?: string; userAgent?: string; source?: string } = {},
): Promise<{ ok: boolean; created: boolean; error?: string }> {
  const clean = email.trim().toLowerCase();
  if (!isValidEmail(clean)) {
    return { ok: false, created: false, error: "Adresse email invalide" };
  }
  const existing = await queryOne<{ id: number }>(
    "SELECT id FROM newsletter_subscribers WHERE email = ?",
    clean,
  );
  if (existing) {
    return { ok: true, created: false };
  }
  await run(
    "INSERT INTO newsletter_subscribers (email, ip, user_agent, source) VALUES (?, ?, ?, ?)",
    clean,
    opts.ip ?? null,
    opts.userAgent ?? null,
    opts.source ?? "home",
  );
  return { ok: true, created: true };
}
