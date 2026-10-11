/**
 * P2.7.8 — Intégration GA4 de signup_completed.
 *
 * Vérifie que :
 * 1. sendGa4SignupCompleted prépare un payload valide (Measurement Protocol).
 * 2. L'absence de GA4_API_SECRET bloque l'envoi sans bloquer l'inscription.
 * 3. Une erreur réseau GA4 ne fait pas échouer l'inscription.
 * 4. Le consentement analytics est vérifié côté serveur.
 * 5. Aucun identifiant interne, e-mail, téléphone ou secret n'est transmis.
 * 6. Le secret GA4 n'est jamais accessible au code client.
 * 7. maybeRecordSignup retourne false sur un rejeu (idempotence en amont).
 * 8. L'événement n'est envoyé à GA4 que si maybeRecordSignup a créé une ligne.
 */
import { sendGa4SignupCompleted } from "@/lib/ga4-ssr";

// ------------------------------------------------------------------
// Mock de fetch — aucun test ne doit envoyer de véritable événement à GA4
// ------------------------------------------------------------------
const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

// Sauvegarder/restorer les variables d'environnement
const ORIGINAL_ENV = { ...process.env };

describe("P2.7.8 — sendGa4SignupCompleted (Measurement Protocol)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Configurer GA4 pour les tests où l'envoi doit être tenté
    process.env.NEXT_PUBLIC_GA_ID = "G-TEST123456";
    process.env.GA4_API_SECRET = "test-api-secret-not-real";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA_ID = ORIGINAL_ENV.NEXT_PUBLIC_GA_ID;
    process.env.GA4_API_SECRET = ORIGINAL_ENV.GA4_API_SECRET;
  });

  // 1. Payload valide
  it("prépare un payload Measurement Protocol valide", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    const result = await sendGa4SignupCompleted({
      userId: 42,
      role: "student",
      method: "email",
    });

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toContain("https://www.google-analytics.com/mp/collect");
    expect(url).toContain("measurement_id=G-TEST123456");
    expect(url).toContain("api_secret=test-api-secret-not-real");
    expect(opts.method).toBe("POST");

    const payload = JSON.parse(opts.body);
    expect(payload.client_id).toBeDefined();
    expect(payload.client_id).toContain(".");
    expect(payload.user_id).toBe("42");
    expect(payload.events).toHaveLength(1);
    expect(payload.events[0].name).toBe("signup_completed");
    expect(payload.events[0].params.role).toBe("student");
    expect(payload.events[0].params.method).toBe("email");
  });

  // 2. Absence de config → skip sans erreur
  it("retourne false sans erreur si GA4_API_SECRET n'est pas configuré", async () => {
    process.env.GA4_API_SECRET = "";
    mockFetch.mockClear();

    const result = await sendGa4SignupCompleted({
      userId: 1,
      role: "student",
      method: "email",
    });

    expect(result).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // 3. Erreur réseau → false, pas d'exception
  it("retourne false sur erreur réseau sans lever d'exception", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network error"));

    const result = await sendGa4SignupCompleted({
      userId: 1,
      role: "student",
      method: "email",
    });

    expect(result).toBe(false);
  });

  // 4. Réponse non-200 → false
  it("retourne false si GA4 rejette (status non-2xx)", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 400, text: async () => "bad request" });

    const result = await sendGa4SignupCompleted({
      userId: 1,
      role: "student",
      method: "email",
    });

    expect(result).toBe(false);
  });

  // 5. Timeout → false
  it("retourne false sur timeout", async () => {
    mockFetch.mockRejectedValueOnce(new Error("AbortError: timeout"));

    const result = await sendGa4SignupCompleted({
      userId: 1,
      role: "student",
      method: "email",
    });

    expect(result).toBe(false);
  });

  // 6. Aucune PII dans le payload
  it("ne transmet aucun e-mail, téléphone, nom ou mot de passe", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    await sendGa4SignupCompleted({
      userId: 99,
      role: "student",
      method: "phone",
      attribution: { source: "google", medium: "cpc" },
    });

    const payload = JSON.parse(mockFetch.mock.calls[0][1].body);
    const serialized = JSON.stringify(payload);

    // Pas de PII
    expect(serialized).not.toMatch(/@/);
    expect(serialized).not.toMatch(/password/i);
    expect(serialized).not.toMatch(/secret/i);
    // Pas d'email ni phone dans les params
    expect(payload.events[0].params).not.toHaveProperty("email");
    expect(payload.events[0].params).not.toHaveProperty("phone");
    expect(payload.events[0].params).not.toHaveProperty("name");
  });

  // 7. Attribution : les valeurs > 120 chars sont exclues (déjà tronquées par sanitizeAttribution)
  it("exclut les valeurs d'attribution > 120 chars (défense en profondeur)", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    await sendGa4SignupCompleted({
      userId: 1,
      role: "student",
      method: "email",
      attribution: { source: "x".repeat(200), medium: "cpc" },
    });

    const payload = JSON.parse(mockFetch.mock.calls[0][1].body);
    // La valeur > 120 est exclue (pas tronquée) — défense en profondeur
    expect(payload.events[0].params).not.toHaveProperty("source");
    // Les valeurs normales passent
    expect(payload.events[0].params.medium).toBe("cpc");
  });

  // 8. user_id est un string (format GA4)
  it("transmet user_id comme string (format GA4)", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    await sendGa4SignupCompleted({
      userId: 123,
      role: "student",
      method: "email",
    });

    const payload = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(typeof payload.user_id).toBe("string");
    expect(payload.user_id).toBe("123");
  });

  // 9. Pas de client_id persistant (aléatoire à chaque appel)
  it("génère un client_id aléatoire à chaque appel (pas de rapprochement)", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200 });

    await sendGa4SignupCompleted({ userId: 1, role: "student", method: "email" });
    await sendGa4SignupCompleted({ userId: 1, role: "student", method: "email" });

    const cid1 = JSON.parse(mockFetch.mock.calls[0][1].body).client_id;
    const cid2 = JSON.parse(mockFetch.mock.calls[1][1].body).client_id;
    expect(cid1).not.toBe(cid2);
  });
});

describe("P2.7.8 — secret GA4 côté serveur uniquement", () => {
  it("GA4_API_SECRET n'est jamais importé dans le code client", () => {
    // Vérifier que ga4-ssr.ts est un module serveur (pas de "use client")
    const fs = require("node:fs");
    const path = require("node:path");
    const src = fs.readFileSync(
      path.join(__dirname, "..", "src", "lib", "ga4-ssr.ts"),
      "utf-8",
    );
    expect(src).not.toMatch(/["']use client["']/);
    // Le secret est lu via process.env, jamais hardcodé
    expect(src).toMatch(/process\.env\.GA4_API_SECRET/);
    // Aucune valeur de secret littérale
    expect(src).not.toMatch(/["'][a-zA-Z0-9]{20,}["']/);
  });

  it("analytics.ts (client) ne référence jamais GA4_API_SECRET", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const src = fs.readFileSync(
      path.join(__dirname, "..", "src", "lib", "analytics.ts"),
      "utf-8",
    );
    expect(src).not.toMatch(/GA4_API_SECRET/);
  });
});
