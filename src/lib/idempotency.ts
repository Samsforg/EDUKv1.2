/**
 * Clés d'idempotence — helpers purs, partagés par les routes qui doivent
 * rejeter les rejeux sans bloquer les opérations légitimes répétées.
 *
 * Utilisé par `POST /api/simulator/[id]/submit` (et compatible avec le
 * mécanisme maison `idempotency_keys` déjà employé par le checkout premium).
 */

// UUID v4 strict : identité de tentative stable, générée une seule fois par
// opération côté client, rejouée à l'identique en cas de retry réseau ou de
// double déclenchement (clic + expiration du chronomètre, StrictMode, etc.).
export const ATTEMPT_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function normalizeAttemptId(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

export function isValidAttemptId(value: unknown): value is string {
  return ATTEMPT_ID_RE.test(normalizeAttemptId(value));
}

/**
 * Clé d'idempotence déterministe, portée par utilisateur : deux opérations
 * distinctes n'entrent jamais en collision, deux rejeux de la même opération
 * produisent la même clé.
 */
export function idempotencyKey(prefix: string, userId: number, attemptId: string): string {
  return `${prefix}:${userId}:${normalizeAttemptId(attemptId)}`;
}

/** Réponse de réservation : traitement en vol, pas encore de résultat. */
export function pendingResponse(): string {
  return JSON.stringify({ status: "pending" });
}
