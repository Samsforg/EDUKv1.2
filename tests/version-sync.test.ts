/**
 * P2.14 — Synchronisation de version client/serveur.
 *
 * Vérifie la logique pure de comparaison (aucune resynchronisation si une
 * version est inconnue → pas de boucle de rechargement) et l'endpoint
 * `/api/version` qui expose la version du déploiement courant sans cache.
 */
import { buildIdsDiffer, isKnownBuildId, UNKNOWN_BUILD_ID } from "@/lib/version";
import { GET } from "@/app/api/version/route";

describe("P2.14 — synchronisation de version", () => {
  it("détecte un écart entre deux versions connues et distinctes", () => {
    expect(buildIdsDiffer("sha-aaa", "sha-bbb")).toBe(true);
    expect(buildIdsDiffer("sha-bbb", "sha-aaa")).toBe(true);
  });

  it("ne signale aucun écart quand les versions sont identiques", () => {
    expect(buildIdsDiffer("sha-aaa", "sha-aaa")).toBe(false);
  });

  it("n'entraîne jamais de resynchronisation si une version est inconnue", () => {
    expect(buildIdsDiffer(UNKNOWN_BUILD_ID, "sha-bbb")).toBe(false);
    expect(buildIdsDiffer("sha-aaa", UNKNOWN_BUILD_ID)).toBe(false);
    expect(buildIdsDiffer("", "sha-bbb")).toBe(false);
    expect(buildIdsDiffer("sha-aaa", null)).toBe(false);
    expect(buildIdsDiffer(null, undefined)).toBe(false);
  });

  it("identifie correctement les versions exploitables", () => {
    expect(isKnownBuildId("sha-aaa")).toBe(true);
    expect(isKnownBuildId(UNKNOWN_BUILD_ID)).toBe(false);
    expect(isKnownBuildId("")).toBe(false);
    expect(isKnownBuildId(undefined)).toBe(false);
  });

  it("expose /api/version sans cache avec une version non vide", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toContain("no-store");
    const body = (await res.json()) as { version?: string };
    expect(typeof body.version).toBe("string");
    expect((body.version ?? "").length).toBeGreaterThan(0);
  });
});
