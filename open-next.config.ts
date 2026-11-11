/**
 * open-next.config.ts — Configuration OpenNext Cloudflare
 *
 * Configuration minimale pour Edukora avec Hyperdrive PostgreSQL.
 * Version: @opennextjs/cloudflare 1.20.15
 *
 * NOTE D.10.2 : Le cache incrémental R2 a été retiré car R2 n'est pas
 * activé sur le compte Cloudflare. OpenNext utilise son cache par défaut
 * (en mémoire) en l'absence de configuration explicite.
 */

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Configuration par défaut — pas de cache R2 (R2 non activé sur le compte).
  // Le cache incrémental utilise le mécanisme par défaut d'OpenNext.
});
