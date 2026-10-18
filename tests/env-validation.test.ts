/**
 * P2.15 Phase C — Validation centralisée de configuration.
 *
 * Tests purement synthétiques : aucun secret réel, aucune lecture de
 * process.env, aucune connexion. Tournent partout (CI incluse, sans
 * modification de config : testMatch existant).
 */
import fs from "node:fs";
import path from "node:path";
import {
  ENV_SPECS,
  isObviouslyPlaceholder,
  knownVarNames,
  validateEnv,
} from "@/lib/env-validation";

const FULL_VALID: Record<string, string> = {
  DATABASE_URL: "postgresql://user:pass@db.example:5432/edukora",
  SESSION_SECRET: " secret-aleatoire-assez-long-pour-prod ",
  GENIUSPAY_API_KEY: "gp-key",
  GENIUSPAY_API_SECRET: "gp-secret",
  CRON_SECRET: "cron-secret",
  SMTP_HOST: "smtp.example",
  SMTP_PORT: "587",
  SMTP_USER: "user",
  SMTP_PASS: "pass",
  MAIL_FROM_EMAIL: "noreply@example.com",
  VAPID_PRIVATE_KEY: "vapid-priv",
  VAPID_PUBLIC_KEY: "vapid-pub",
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: "vapid-pub",
  NEXT_PUBLIC_APP_URL: "https://example.com",
  ADMIN_EMAIL: "admin@example.com",
  ADMIN_PASSWORD: "mot-de-passe-admin",
  BLOB_READ_WRITE_TOKEN: "blob-token",
};

describe("validateEnv — P0 bloquants", () => {
  test("environnement complet et valide → ok, sans erreur ni warning", () => {
    const r = validateEnv({ ...FULL_VALID });
    expect(r.ok).toBe(true);
    expect(r.errors).toEqual([]);
    expect(r.warnings).toEqual([]);
  });

  test("chaque P0 absente → erreur nommée (sans valeur)", () => {
    for (const name of ["DATABASE_URL", "SESSION_SECRET", "GENIUSPAY_API_KEY", "GENIUSPAY_API_SECRET"]) {
      const env = { ...FULL_VALID };
      delete env[name];
      const r = validateEnv(env);
      expect(r.ok).toBe(false);
      expect(r.errors).toContainEqual({ name, tier: "P0", reason: "missing" });
    }
  });

  test("DATABASE_URL non-postgres → invalid-format (pas de connexion tentée)", () => {
    const r = validateEnv({ ...FULL_VALID, DATABASE_URL: "mysql://h/db" });
    expect(r.ok).toBe(false);
    expect(r.errors).toContainEqual({ name: "DATABASE_URL", tier: "P0", reason: "invalid-format" });
  });

  test("valeur factice → placeholder, jamais acceptée en P0", () => {
    for (const fake of ["", "   ", "changeme", "  ChangeMe  ", "example", "xxx"]) {
      const r = validateEnv({ ...FULL_VALID, SESSION_SECRET: fake });
      expect(r.ok).toBe(false);
      expect(r.errors.some((e) => e.name === "SESSION_SECRET")).toBe(true);
    }
  });

  test("le résultat ne contient aucune valeur secrète", () => {
    const r = validateEnv({ SESSION_SECRET: "super-secret-xyz" });
    const dumped = JSON.stringify(r);
    expect(dumped).not.toContain("super-secret-xyz");
  });
});

describe("validateEnv — P1 en avertissements, P2 silencieux", () => {
  test("P1 absente → warning, pas d'erreur (ok reste true)", () => {
    const r = validateEnv({ ...FULL_VALID, CRON_SECRET: "" });
    expect(r.ok).toBe(true);
    expect(r.warnings).toContainEqual({ name: "CRON_SECRET", tier: "P1", reason: "missing" });
    expect(r.errors).toEqual([]);
  });

  test("SMTP_PORT non numérique → invalid-format en warning", () => {
    const r = validateEnv({ ...FULL_VALID, SMTP_PORT: "smtp" });
    expect(r.ok).toBe(true);
    expect(r.warnings).toContainEqual({ name: "SMTP_PORT", tier: "P1", reason: "invalid-format" });
  });

  test("NEXT_PUBLIC_APP_URL non-URL → invalid-format en warning", () => {
    const r = validateEnv({ ...FULL_VALID, NEXT_PUBLIC_APP_URL: "pas-une-url" });
    expect(r.warnings).toContainEqual({ name: "NEXT_PUBLIC_APP_URL", tier: "P1", reason: "invalid-format" });
  });

  test("P2 absentes → ni erreur ni warning", () => {
    const r = validateEnv({ ...FULL_VALID });
    const p2names = ENV_SPECS.filter((s) => s.tier === "P2").map((s) => s.name);
    expect(r.errors.map((e) => e.name)).toEqual([]);
    expect(r.warnings.map((w) => w.name)).toEqual([]);
    expect(p2names.length).toBeGreaterThan(0);
  });
});

describe("isObviouslyPlaceholder", () => {
  test("détecte vide et marqueurs manifestes, sans faux positifs courants", () => {
    expect(isObviouslyPlaceholder("")).toBe(true);
    expect(isObviouslyPlaceholder("   ")).toBe(true);
    expect(isObviouslyPlaceholder("ChangeMe")).toBe(true);
    expect(isObviouslyPlaceholder("prod-x7k9-secret-reel")).toBe(false);
    expect(isObviouslyPlaceholder("test")).toBe(false);
    expect(isObviouslyPlaceholder("password123")).toBe(false);
  });
});

describe("anti-dérive : toute variable lue dans src/ est inventoriée", () => {
  function* walk(dir: string): Generator<string> {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === "node_modules") continue;
        yield* walk(p);
      } else if (/\.(ts|tsx)$/.test(e.name)) yield p;
    }
  }

  test("process.env.* de src/ ⊆ knownVarNames()", () => {
    const known = new Set(knownVarNames());
    const found = new Set<string>();
    const srcDir = path.join(process.cwd(), "src");
    for (const file of walk(srcDir)) {
      const content = fs.readFileSync(file, "utf8");
      for (const m of content.matchAll(/process\.env\.([A-Z][A-Z0-9_]*)/g)) {
        found.add(m[1]);
      }
    }
    // Variables système/plateforme, hors périmètre applicatif (fournies par
    // Vercel/Node/Next, jamais à renseigner dans le dashboard).
    const system = new Set(["NODE_ENV", "VERCEL", "NEXT_PHASE", "VERCEL_PROJECT_PRODUCTION_URL", "NEXT_RUNTIME", "PORT"]);
    const unknown = [...found].filter((n) => !known.has(n) && !system.has(n));
    expect({ unknown, found: found.size, known: known.size }).toEqual({
      unknown: [],
      found: expect.any(Number),
      known: expect.any(Number),
    });
  });
});
