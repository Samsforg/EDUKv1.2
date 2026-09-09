/**
 * Isolement des comptes de test / virtuels (seeds, e2e, consent, api)
 * des vrais utilisateurs inscrits sur la plateforme.
 *
 * Domaines réservés aux tests (impossibles à prendre par un vrai utilisateur) :
 *  - @test.ci   → seeds de démo (init.ts), tests api/consent/gdpr/validation
 *  - @test.dev  → tests e2e Playwright (parcours élève/prof)
 *  - @e2e.test  → tests e2e Playwright (parcours élève)
 */

const TEST_EMAIL_SUFFIXES = ["@test.ci", "@test.dev", "@e2e.test", "@mailtest.fr"] as const;

const SAFE_ALIAS_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function sanitizeAlias(alias: string): string {
  if (!SAFE_ALIAS_RE.test(alias)) {
    throw new Error(`Invalid SQL alias: ${alias}`);
  }
  return alias;
}

export function isTestEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const e = email.trim().toLowerCase();
  return TEST_EMAIL_SUFFIXES.some((suffix) => e.endsWith(suffix));
}

/**
 * Fragment SQL « compte réel uniquement » à injecter dans les requêtes de comptage.
 * Compatible SQLite et Postgres (LOWER + COALESCE pour les comptes sans email).
 */
export function realUsersWhere(alias = "u"): string {
  const a = sanitizeAlias(alias);
  return TEST_EMAIL_SUFFIXES.map(
    (suffix) => `LOWER(COALESCE(${a}.email, '')) NOT LIKE '%${suffix}'`,
  ).join(" AND ");
}

/**
 * Fragment SQL « compte de test » (OR des domaines test) pour exclure
 * les abonnements / contenus liés à des comptes virtuels via NOT EXISTS.
 */
export function testUsersWhere(alias = "u"): string {
  const a = sanitizeAlias(alias);
  return TEST_EMAIL_SUFFIXES.map(
    (suffix) => `LOWER(COALESCE(${a}.email, '')) LIKE '%${suffix}'`,
  ).join(" OR ");
}