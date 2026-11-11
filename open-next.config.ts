/**
 * open-next.config.ts — Configuration OpenNext Cloudflare
 *
 * Configuration minimale pour Edukora avec Hyperdrive PostgreSQL.
 * Version: @opennextjs/cloudflare 1.20.15
 */

import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // Incremental cache utilisant R2 pour le cache côté Cloudflare
  incrementalCache: r2IncrementalCache,

  // Default settings - no custom providers or overrides needed
  // The build will use default configurations for other services
});