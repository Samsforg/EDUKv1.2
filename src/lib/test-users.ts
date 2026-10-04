/**
 * Isolement des comptes de test / virtuels (seeds, e2e, fixtures admin)
 * des vrais utilisateurs inscrits sur la plateforme.
 *
 * Deux mécanismes complémentaires, tous deux utilisés par les prédicats SQL :
 *
 *  1. `users.is_test` — marqueur structurel. C'est la source de vérité : il
 *     tient même si l'email d'une fixture ressemble à un email réel. Il est
 *     posé explicitement à la création d'une fixture (`setup-test-accounts`)
 *     et par la migration de rattrapage dans `init.ts`.
 *
 *  2. Les domaines réservés ci-dessous — filet de sécurité pour les lignes
 *     créées avant la migration, et pour les fixtures dont `is_test` n'a pas
 *     été posé. Tous ces domaines sont réservés (RFC 2606 / RFC 6761) ou
 *     suivent la convention de test du projet : aucun utilisateur réel ne peut
 *     les obtenir.
 *
 * Un compte est donc « de test » si `is_test = 1` **ou** si son email
 * correspond à un motif réservé. L'union est volontaire : elle garantit
 * qu'aucune fixture ne peut être comptabilisée comme réelle, y compris une
 * fixture future créée avec un email anodin, tout en continuant d'exclure les
 * fixtures historiques que la migration n'a pas pu voir.
 */

/** Suffixes d'email réservés aux tests (impossibles pour un vrai compte). */
const TEST_EMAIL_SUFFIXES = [
  "@test.ci", // seeds de démo (init.ts), tests api/consent/gdpr/validation
  "@test.dev", // tests e2e Playwright (parcours élève/prof)
  "@e2e.test", // tests e2e Playwright (parcours élève)
  "@mailtest.fr", // tests de paiement local
  "@example.com", // RFC 2606 — flow/repro tests
  "@example.org", // RFC 2606
  "@example.net", // RFC 2606
  "@edu.test", // suffixe .test réservé — e2e/debug
  "@local.test", // suffixe .test réservé — cron qa
] as const;

/**
 * Motifs JS. `/(?:^test[.].*|[.]test|^test$)@edukora[.]net$/` couvre la
 * convention de test du projet sur le domaine réel : `prof.test@edukora.net`,
 * `eleve1.test@edukora.net`, `test.payment@edukora.net`, `test@edukora.net`.
 * Il ne matche ni `support@edukora.net` (le vrai compte admin) ni
 * `testing@edukora.net` : le local-part doit être `test`, commencer par
 * `test.` ou finir par `.test`.
 */
const TEST_EMAIL_PATTERNS = [/(?:^test[.].*|[.]test|^test$)@edukora[.]net$/i] as const;

/**
 * Équivalents SQL des motifs ci-dessus. `realUsersWhere` /
 * `testUsersWhere` doivent rester synchronisés avec `isTestEmail`.
 */
const TEST_EMAIL_SQL_LIKES = ["%.test@edukora.net", "test.%@edukora.net", "test@edukora.net"] as const;

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
  return TEST_EMAIL_SUFFIXES.some((suffix) => e.endsWith(suffix)) || TEST_EMAIL_PATTERNS.some((re) => re.test(e));
}

/**
 * Un compte est de test si le marqueur structurel `users.is_test` est posé,
 * ou si son email tombe sur un domaine réservé. Même logique d'union que les
 * prédicats SQL, à utiliser côté JS (affichage admin) au lieu de reconstruire
 * la règle.
 */
export function isTestUser(
  email: string | null | undefined,
  isTestFlag: boolean | number | null | undefined,
): boolean {
  return !!isTestFlag || isTestEmail(email);
}

/**
 * Conditions SQL sur l'email. `negate = true` produit la forme « email NON
 * réservé » (toutes les conditions jointes par AND), sinon la forme « email
 * réservé » (jointes par OR). Les deux formes sont construites à partir des
 * mêmes listes pour rester synchronisées avec `isTestEmail`.
 */
function emailConditions(emailExpr: string, negate: boolean): string {
  const op = negate ? "NOT LIKE" : "LIKE";
  const conds = [
    ...TEST_EMAIL_SUFFIXES.map((suffix) => `LOWER(COALESCE(${emailExpr}, '')) ${op} '%${suffix}'`),
    ...TEST_EMAIL_SQL_LIKES.map((like) => `LOWER(COALESCE(${emailExpr}, '')) ${op} '${like}'`),
  ];
  return conds.join(negate ? " AND " : " OR ");
}

/**
 * Fragment SQL « compte réel uniquement » à injecter dans les requêtes de
 * comptage. Exclut `is_test = 1` ainsi que les emails réservés.
 * Compatible SQLite et Postgres (LOWER + COALESCE pour les comptes sans
 * email).
 */
export function realUsersWhere(alias = "u"): string {
  const a = sanitizeAlias(alias);
  return `(${a}.is_test = 0 AND (${emailConditions(`${a}.email`, true)}))`;
}

/**
 * Fragment SQL « compte de test » pour exclure les abonnements / contenus
 * liés à des comptes virtuels via NOT EXISTS. Utilisé avec un alias de la
 * sous-requête (`tu`) : `NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = … AND (${testUsersWhere("tu")}))`.
 */
export function testUsersWhere(alias = "u"): string {
  const a = sanitizeAlias(alias);
  return `(${a}.is_test = 1 OR (${emailConditions(`${a}.email`, false)}))`;
}

/**
 * Prédicat « email de test » seul, sans alias de table — pour le backfill
 * `UPDATE users SET is_test = 1 …`, où aucun alias n'est disponible en
 * SQLite. Volontairement indépendant de `is_test` pour rester le prédicat
 * minimal qui décide quels comptes existants ont droit au marqueur.
 */
export function testEmailOnlyWhere(emailExpr = "email"): string {
  return `(${emailConditions(emailExpr, false)})`;
}