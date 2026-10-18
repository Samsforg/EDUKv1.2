/**
 * Validation centralisée de la configuration (P2.15, Phase C).
 *
 * Complète — sans dupliquer ni contredire — les gardes existants :
 * - `resolveDbMode` (`db.ts`, fail-fast P1.6 F2) reste l'autorité pour le mode DB ;
 * - `sessionSecret()` (fail-closed), `gpFetch` (throw par appel),
 *   `isAvailable()` des providers IA gardent leurs contrats locaux.
 *
 * Ce module ne lit jamais `process.env` lui-même : il valide un objet
 * fourni (tests, scripts CI, checklist manuelle). Il ne renvoie JAMAIS de
 * valeur — uniquement des NOMS de variables et des motifs d'échec.
 */

export type EnvTier = "P0" | "P1" | "P2";

export interface EnvVarSpec {
  /** Nom exact de la variable. */
  name: string;
  /** P0 = démarrage/fonction critique ; P1 = fonctionnalité critique ; P2 = secondaire/pilotage. */
  tier: EnvTier;
  /** Catégorie fonctionnelle. */
  category: string;
  /** Condition lisible de requis. */
  requiredWhen: string;
  /** Vrai si la valeur est un secret (ne jamais l'afficher). */
  sensitive: boolean;
  /** Validation de format (sans effet de bord, sans log de la valeur). */
  validate?: (value: string) => boolean;
}

/** Marqueurs manifestes de valeur factice. Comparaison exacte, insensible à la casse. */
const PLACEHOLDERS = new Set([
  "changeme",
  "change-me",
  "changethis",
  "example",
  "placeholder",
  "xxx",
  "todo",
  "your-value-here",
  "replace-me",
  "password",
]);

/** Vrai si la valeur est vide ou manifestement factice. */
export function isObviouslyPlaceholder(value: string): boolean {
  const v = value.trim().toLowerCase();
  if (v.length === 0) return true;
  return PLACEHOLDERS.has(v);
}

function isHttpUrl(value: string): boolean {
  const v = value.trim();
  if (!/^https?:\/\//i.test(v)) return false;
  try {
    const u = new URL(v);
    return u.hostname.length > 0 && !/\s/.test(v);
  } catch {
    return false;
  }
}

/** Format plausible d'URL PostgreSQL, sans rien en extraire. */
function isPlausiblePostgresUrl(value: string): boolean {
  const v = value.trim();
  if (!/^postgres(ql)?:\/\//i.test(v)) return false;
  const afterScheme = v.replace(/^postgres(ql)?:\/\//i, "");
  // Forme minimale : un hôte (présence de @ pour user@host ou de / pour host/db).
  return afterScheme.includes("@") || afterScheme.includes("/");
}

export const ENV_SPECS: readonly EnvVarSpec[] = [
  // ---- P0 : démarrage / sécurité / appels critiques ----
  { name: "DATABASE_URL", tier: "P0", category: "Base de données", requiredWhen: "Toujours sur Vercel (fail-fast au chargement de db.ts) ; pool au runtime", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) && isPlausiblePostgresUrl(v) },
  { name: "SESSION_SECRET", tier: "P0", category: "Authentification", requiredWhen: "Toujours (sessions refusées sans lui — fail-closed)", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "GENIUSPAY_API_KEY", tier: "P0", category: "Paiements", requiredWhen: "Tout appel premium (throw par appel dans gpFetch)", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "GENIUSPAY_API_SECRET", tier: "P0", category: "Paiements", requiredWhen: "Tout appel premium (throw par appel dans gpFetch)", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) },
  // ---- P1 : fonctionnalités critiques ----
  { name: "CRON_SECRET", tier: "P1", category: "Tâches planifiées", requiredWhen: "Routes /api/cron/* (désactivées sans lui)", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "SMTP_HOST", tier: "P1", category: "Email", requiredWhen: "Envois d'emails", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "SMTP_PORT", tier: "P1", category: "Email", requiredWhen: "Envois d'emails", sensitive: false, validate: (v) => /^\d{2,5}$/.test(v.trim()) },
  { name: "SMTP_USER", tier: "P1", category: "Email", requiredWhen: "Envois d'emails", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "SMTP_PASS", tier: "P1", category: "Email", requiredWhen: "Envois d'emails", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "MAIL_FROM_EMAIL", tier: "P1", category: "Email", requiredWhen: "Envois d'emails", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) && v.includes("@") },
  { name: "VAPID_PRIVATE_KEY", tier: "P1", category: "Notifications push", requiredWhen: "Push (avec VAPID_PUBLIC_KEY)", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "VAPID_PUBLIC_KEY", tier: "P1", category: "Notifications push", requiredWhen: "Push (avec VAPID_PRIVATE_KEY)", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "NEXT_PUBLIC_VAPID_PUBLIC_KEY", tier: "P1", category: "Notifications push", requiredWhen: "Push côté client (inlinée au build → recompiler après ajout)", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "NEXT_PUBLIC_APP_URL", tier: "P1", category: "Liens/SEO", requiredWhen: "Liens absolus, OG, canonicals (inlinée au build)", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) && isHttpUrl(v) },
  { name: "ADMIN_EMAIL", tier: "P1", category: "Administration", requiredWhen: "Bootstrap admin si utilisé", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "ADMIN_PASSWORD", tier: "P1", category: "Administration", requiredWhen: "Bootstrap admin si utilisé", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) },
  // ---- P2 : secondaire / pilotage / intégrations optionnelles ----
  { name: "SENTRY_DSN", tier: "P2", category: "Observabilité", requiredWhen: "Traces serveur (init sous if, sinon désactivé)", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "NEXT_PUBLIC_SENTRY_DSN", tier: "P2", category: "Observabilité", requiredWhen: "Traces client", sensitive: false, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "NEXT_PUBLIC_GA_ID", tier: "P2", category: "Analytics", requiredWhen: "GA4 (sous consentement)" , sensitive: false },
  { name: "NEXT_PUBLIC_CLARITY_ID", tier: "P2", category: "Analytics", requiredWhen: "Clarity (sous consentement)", sensitive: false },
  { name: "GA4_API_SECRET", tier: "P2", category: "Analytics", requiredWhen: "Envoi serveur GA4 optionnel", sensitive: true },
  { name: "NEXT_PUBLIC_GOOGLE_ADS_ID", tier: "P2", category: "Publicité", requiredWhen: "Google Ads (sous consentement)", sensitive: false },
  { name: "NEXT_PUBLIC_META_PIXEL_ID", tier: "P2", category: "Publicité", requiredWhen: "Meta Pixel (sous consentement)", sensitive: false },
  { name: "NEXT_PUBLIC_TIKTOK_PIXEL_ID", tier: "P2", category: "Publicité", requiredWhen: "TikTok (sous consentement)", sensitive: false },
  { name: "NEXT_PUBLIC_ADSENSE_PUBLISHER_ID", tier: "P2", category: "Publicité", requiredWhen: "Slots AdSense", sensitive: false },
  { name: "GROQ_API_KEY", tier: "P2", category: "IA", requiredWhen: "Provider Groq actif (chaîne filtrée par isAvailable, jamais bloquant)", sensitive: true },
  { name: "GEMINI_API_KEY", tier: "P2", category: "IA", requiredWhen: "Provider Gemini actif (jamais bloquant)", sensitive: true },
  { name: "OPENROUTER_API_KEY", tier: "P2", category: "IA", requiredWhen: "Provider OpenRouter actif (jamais bloquant)", sensitive: true },
  { name: "HF_API_KEY", tier: "P2", category: "IA", requiredWhen: "Provider HF actif (jamais bloquant)", sensitive: true },
  { name: "CLOUDFLARE_API_TOKEN", tier: "P2", category: "IA", requiredWhen: "Provider Cloudflare actif (jamais bloquant)", sensitive: true },
  { name: "BREVO_API_KEY", tier: "P2", category: "Email alternatif", requiredWhen: "Envois via Brevo si configuré", sensitive: true },
  { name: "WHATSAPP_API_KEY", tier: "P2", category: "Notifications", requiredWhen: "Canal WhatsApp si utilisé", sensitive: true },
  { name: "WHATSAPP_API_URL", tier: "P2", category: "Notifications", requiredWhen: "Canal WhatsApp si utilisé", sensitive: false },
  { name: "WHATSAPP_INSTANCE", tier: "P2", category: "Notifications", requiredWhen: "Canal WhatsApp si utilisé", sensitive: false },
  { name: "WHATSAPP_REPORT_GROUP", tier: "P2", category: "Notifications", requiredWhen: "Rapports WhatsApp si utilisés", sensitive: false },
  { name: "AFRICASTALKING_API_KEY", tier: "P2", category: "SMS", requiredWhen: "Canal SMS si utilisé", sensitive: true },
  { name: "AFRICASTALKING_USERNAME", tier: "P2", category: "SMS", requiredWhen: "Canal SMS si utilisé", sensitive: false },
  { name: "AFRICASTALKING_SENDER_ID", tier: "P2", category: "SMS", requiredWhen: "Canal SMS si utilisé", sensitive: false },
  { name: "AFRICASTALKING_BASE_URL", tier: "P2", category: "SMS", requiredWhen: "Canal SMS si utilisé", sensitive: false },
  { name: "GSC_VERIFICATION", tier: "P2", category: "SEO", requiredWhen: "Méta verification Google (rendu conditionnel)", sensitive: false },
  { name: "TEST_ACCOUNT_PASSWORD", tier: "P2", category: "Seed dev/test", requiredWhen: "Comptes de test locaux uniquement — route 403 en production + admin requis ; jamais en prod", sensitive: true },
  { name: "BLOB_READ_WRITE_TOKEN", tier: "P1", category: "Sauvegarde", requiredWhen: "Backup cron vers Vercel Blob (503 explicite sinon)", sensitive: true, validate: (v) => !isObviouslyPlaceholder(v) },
  { name: "GENIUSPAY_API_BASE", tier: "P2", category: "Paiements", requiredWhen: "Surcharge éventuelle de l'URL marchand (défaut codé valide)", sensitive: false },
  { name: "GENIUSPAY_COUNTRY_CODE", tier: "P2", category: "Paiements", requiredWhen: "Surcharge éventuelle (défaut 225 codé)", sensitive: false },
  { name: "GENIUSPAY_WEBHOOK_SECRET", tier: "P2", category: "Paiements", requiredWhen: "Aucun usage trouvé dans le code — vérifier avant d'exiger", sensitive: true },
  { name: "BREVO_NEWSLETTER_LIST_ID", tier: "P2", category: "Email", requiredWhen: "Liste newsletter si utilisée", sensitive: false },
  { name: "BREVO_REACTIVATION_TEMPLATE_ID", tier: "P2", category: "Email", requiredWhen: "Template réactivation si utilisé", sensitive: false },
  { name: "DATABASE_SSL_DISABLED", tier: "P2", category: "Base de données", requiredWhen: "Drapeau 'true' pour désactiver TLS (défaut : TLS actif)", sensitive: false },
  { name: "MAIL_USE_BREVO", tier: "P2", category: "Email", requiredWhen: "Drapeau '1' pour router via Brevo", sensitive: false },
  { name: "AB_PRICING", tier: "P2", category: "Produit", requiredWhen: "Drapeau A/B pricing ('off' pour désactiver, défaut actif)", sensitive: false },
  { name: "RATE_LIMIT_DISABLED", tier: "P2", category: "Sécurité", requiredWhen: "Drapeau '1' réservé aux tests (jamais en prod)", sensitive: false },
  { name: "WARMUP_ORIGIN", tier: "P2", category: "Ops", requiredWhen: "Origine warmup si surchargée (défaut codé)", sensitive: false },
  { name: "NEXT_PUBLIC_SENTRY_RELEASE", tier: "P2", category: "Observabilité", requiredWhen: "Release Sentry côté client (optionnel)", sensitive: false },
  { name: "NEXT_PUBLIC_BUILD_ID", tier: "P2", category: "Observabilité", requiredWhen: "Version de build côté client (synchro front/back) ; défaut 'dev'", sensitive: false },
  { name: "VERCEL_GIT_COMMIT_SHA", tier: "P2", category: "Observabilité", requiredWhen: "Fourni par Vercel (empreinte du déploiement) ; absent en local", sensitive: false },
  { name: "VERCEL_DEPLOYMENT_ID", tier: "P2", category: "Observabilité", requiredWhen: "Fourni par Vercel (identifiant de déploiement) ; absent en local", sensitive: false },
  { name: "AI_GATEWAY_ENABLED", tier: "P2", category: "IA", requiredWhen: "Drapeau 'true' pour la gateway (auto-détection sinon, jamais bloquant)", sensitive: false },
  { name: "AI_PRIMARY_PROVIDER", tier: "P2", category: "IA", requiredWhen: "Nom du provider prioritaire (optionnel)", sensitive: false },
  { name: "AI_MAX_REQUESTS_PER_MINUTE", tier: "P2", category: "IA", requiredWhen: "Quota IA (défaut codé si absent)", sensitive: false },
  { name: "AI_MAX_DAILY_REQUESTS", tier: "P2", category: "IA", requiredWhen: "Quota IA (défaut codé si absent)", sensitive: false },
  { name: "AI_EMBEDDING_PROVIDER", tier: "P2", category: "IA", requiredWhen: "Choix du provider d'embeddings (optionnel)", sensitive: false },
  { name: "CEREBRAS_API_KEY", tier: "P2", category: "IA", requiredWhen: "Provider Cerebras actif (isAvailable, jamais bloquant)", sensitive: true },
  { name: "CEREBRAS_MODEL", tier: "P2", category: "IA", requiredWhen: "Modèle Cerebras (défaut codé)", sensitive: false },
  { name: "CLOUDFLARE_ACCOUNT_ID", tier: "P2", category: "IA", requiredWhen: "Provider Cloudflare actif (jamais bloquant)", sensitive: false },
  { name: "CLOUDFLARE_MODEL", tier: "P2", category: "IA", requiredWhen: "Modèle Cloudflare (défaut codé)", sensitive: false },
  { name: "GEMINI_TUTOR_MODEL", tier: "P2", category: "IA", requiredWhen: "Modèle Gemini tuteur (défaut codé)", sensitive: false },
  { name: "GROQ_MODEL", tier: "P2", category: "IA", requiredWhen: "Modèle Groq (défaut codé)", sensitive: false },
  { name: "HF_MODEL", tier: "P2", category: "IA", requiredWhen: "Modèle HF (défaut codé)", sensitive: false },
  { name: "HF_EMBEDDING_MODEL", tier: "P2", category: "IA", requiredWhen: "Modèle d'embeddings HF (défaut codé)", sensitive: false },
  { name: "OPENAI_API_KEY", tier: "P2", category: "IA", requiredWhen: "Provider OpenAI actif (isAvailable, jamais bloquant)", sensitive: true },
  { name: "OPENAI_TUTOR_MODEL", tier: "P2", category: "IA", requiredWhen: "Modèle OpenAI tuteur (défaut codé)", sensitive: false },
  { name: "OPENROUTER_TUTOR_MODEL", tier: "P2", category: "IA", requiredWhen: "Modèle OpenRouter tuteur (défaut codé)", sensitive: false },
];

export interface EnvValidationIssue {
  /** Nom de la variable — jamais sa valeur. */
  name: string;
  tier: EnvTier;
  reason: "missing" | "invalid-format" | "placeholder";
}

export interface EnvValidationResult {
  ok: boolean;
  /** Bloquants (P0). */
  errors: EnvValidationIssue[];
  /** Avertissements (P1 manquantes/invalides). P2 non signalées ici. */
  warnings: EnvValidationIssue[];
}

/**
 * Valide un objet d'environnement fourni. Ne lit jamais process.env :
 * l'appelant décide de la source (tests, script CI, checklist).
 * Ne retourne que des noms + motifs — aucune valeur.
 */
export function validateEnv(env: Record<string, string | undefined>): EnvValidationResult {
  const errors: EnvValidationIssue[] = [];
  const warnings: EnvValidationIssue[] = [];
  for (const spec of ENV_SPECS) {
    const raw = env[spec.name];
    const value = typeof raw === "string" ? raw : "";
    if (value.trim().length === 0) {
      if (spec.tier === "P0") errors.push({ name: spec.name, tier: spec.tier, reason: "missing" });
      else if (spec.tier === "P1") warnings.push({ name: spec.name, tier: spec.tier, reason: "missing" });
      continue;
    }
    if (isObviouslyPlaceholder(value)) {
      const issue: EnvValidationIssue = { name: spec.name, tier: spec.tier, reason: "placeholder" };
      if (spec.tier === "P0") errors.push(issue);
      else if (spec.tier === "P1") warnings.push(issue);
      continue;
    }
    if (spec.validate && !spec.validate(value)) {
      const issue: EnvValidationIssue = { name: spec.name, tier: spec.tier, reason: "invalid-format" };
      if (spec.tier === "P0") errors.push(issue);
      else if (spec.tier === "P1") warnings.push(issue);
    }
  }
  return { ok: errors.length === 0, errors, warnings };
}

/** Noms connus — pour le test anti-dérive (code vs inventaire). */
export function knownVarNames(): string[] {
  return ENV_SPECS.map((s) => s.name);
}
