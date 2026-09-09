import { run, queryOne } from "./db";
import { addNewsletterContact } from "./brevo";

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
  try {
    await run(
      "INSERT INTO newsletter_subscribers (email, ip, user_agent, source) VALUES (?, ?, ?, ?)",
      clean,
      opts.ip ?? null,
      opts.userAgent ?? null,
      opts.source ?? "home",
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    const code = (e as { code?: string })?.code;
    if (code === "23505" || /UNIQUE|unique|duplicate/i.test(msg)) {
      return { ok: true, created: false };
    }
    throw e;
  }
  // Sync vers Brevo en arrière-plan (ne bloque pas l'inscription)
  void addNewsletterContact(clean, opts.source ?? "home").catch(() => {});
  return { ok: true, created: true };
}
