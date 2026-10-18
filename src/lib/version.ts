export const UNKNOWN_BUILD_ID = "dev";

/**
 * Identifiant de version du déploiement courant.
 *
 * Côté serveur : la variable d'environnement de la plateforme (Vercel expose
 * l'empreinte du commit / l'identifiant de déploiement). En local, retombe sur
 * "dev" (version inconnue → aucune resynchronisation forcée).
 */
export function getBuildId(): string {
  const id =
    process.env.NEXT_PUBLIC_BUILD_ID ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_DEPLOYMENT_ID ||
    "";
  return id.trim() || UNKNOWN_BUILD_ID;
}

/** Vrai si l'identifiant est exploitable (ni vide, ni "dev"). */
export function isKnownBuildId(id: string | null | undefined): boolean {
  return typeof id === "string" && id.trim().length > 0 && id !== UNKNOWN_BUILD_ID;
}

/**
 * Vrai si les deux identifiants diffèrent ET sont tous les deux exploitables.
 * Un identifiant inconnu ("dev", vide, null) n'entraîne JAMAIS de
 * resynchronisation — sinon tout poste local bouclerait.
 */
export function buildIdsDiffer(
  a: string | null | undefined,
  b: string | null | undefined,
): boolean {
  if (!isKnownBuildId(a) || !isKnownBuildId(b)) return false;
  return a !== b;
}
