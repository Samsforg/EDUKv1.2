/**
 * P2.4 Étape D — mécanisme explicite de déclaration d'action réalisée.
 *
 * Événement serveur `growth_action_implemented` (hors taxonomie client
 * `EVENTS`, précédents `activated` / `purchase`) écrit par la route admin
 * via `trackDb` — aucun INSERT n'est écrit dans la couche mesure.
 *
 * Propriétés strictement minimales (whitelist, aucun contenu libre) :
 *   - `action_id` : identifiant déterministe P2.3 (format vérifié) ;
 *   - `window_days` : fenêtre d'observation 7..30 jours (défaut 14).
 * Aucun email, aucun nom, aucun texte fourni par l'utilisateur.
 */

export const DECLARATION_EVENT = "growth_action_implemented";

export const DECLARATION_PROPS_KEYS = ["action_id", "window_days"] as const;

export const DEFAULT_WINDOW_DAYS = 14;
export const MIN_WINDOW_DAYS = 7;
export const MAX_WINDOW_DAYS = 30;

const ACTION_ID_MAX_LENGTH = 200;

/** Format exact de `actionPlanId()` : `action_<TYPE>#<from>/<to>#<segment>`. */
export const ACTION_ID_RE =
  /^action_[A-Z][A-Z0-9_]*#\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}#[A-Za-z0-9_-]{1,40}$/;

export interface DeclarationPayload {
  action_id: string;
  window_days: number;
}

export type ParseResult =
  | { ok: true; value: DeclarationPayload }
  | { ok: false; error: string };

/**
 * Validation stricte : seules les clés de la whitelist sont acceptées ;
 * toute clé inconnue, tout champ libre, tout identifiant hors format →
 * rejet (aucune réflexion de valeur dans le message d'erreur).
 */
export function parseDeclarationPayload(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, error: "corps_invalide" };
  }
  const record = body as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (!(DECLARATION_PROPS_KEYS as readonly string[]).includes(key)) {
      return { ok: false, error: "champ_inconnu" };
    }
  }

  const actionId = record.action_id;
  if (
    typeof actionId !== "string" ||
    actionId.length === 0 ||
    actionId.length > ACTION_ID_MAX_LENGTH ||
    !ACTION_ID_RE.test(actionId)
  ) {
    return { ok: false, error: "action_id_invalide" };
  }

  let windowDays = DEFAULT_WINDOW_DAYS;
  if (record.window_days !== undefined) {
    const w = record.window_days;
    if (
      typeof w !== "number" ||
      !Number.isInteger(w) ||
      w < MIN_WINDOW_DAYS ||
      w > MAX_WINDOW_DAYS
    ) {
      return { ok: false, error: "window_days_invalide" };
    }
    windowDays = w;
  }

  return { ok: true, value: { action_id: actionId, window_days: windowDays } };
}
