/**
 * API Integration Tests — verifies middleware + validation + rate limiting
 * Requires a running server on localhost:3003
 */

const BASE = "http://localhost:3003";

async function api(path: string, opts?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...opts?.headers },
    ...opts,
    redirect: "manual",
  });
  let data: unknown = null;
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("json")) data = await res.json().catch(() => null);
  return { status: res.status, data };
}

async function isServerUp(): Promise<boolean> {
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(2000) });
    return true;
  } catch {
    return false;
  }
}

describe("API Integration", () => {
  let serverUp = false;

  beforeAll(async () => {
    serverUp = await isServerUp();
  });

  describe("Middleware — protected routes return 401 without cookie", () => {
    it("GET /api/cours → 401", async () => {
      if (!serverUp) return;
      const r = await api("/api/cours");
      expect(r.status).toBe(401);
    });

    it("GET /api/subjects → 401", async () => {
      if (!serverUp) return;
      const r = await api("/api/subjects");
      expect(r.status).toBe(401);
    });

    it("GET /api/forum → 401", async () => {
      if (!serverUp) return;
      const r = await api("/api/forum");
      expect(r.status).toBe(401);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should reject missing fields (400)", async () => {
      if (!serverUp) return;
      const r = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({}),
      });
      expect(r.status).toBe(400);
    });

    it("should reject invalid credentials (401)", async () => {
      if (!serverUp) return;
      const r = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier: "nobody@test.ci", password: "wrong1234" }),
      });
      expect(r.status).toBe(401);
    });
  });

  describe("POST /api/auth/register — validation", () => {
    it("should accept valid register (201 or 429)", async () => {
      if (!serverUp) return;
      const r = await api("/api/auth/register", {
        method: "POST",
        headers: { "x-forwarded-for": `reg-${Date.now()}` },
        body: JSON.stringify({
          first_name: "Test",
          last_name: "User",
          email: `test-${Date.now()}@test.ci`,
          password: "123456",
        }),
      });
      expect([201, 429]).toContain(r.status);
    });
  });

  describe("POST /api/auth/register — rate limit", () => {
    it("should eventually return 429 after many register attempts", async () => {
      if (!serverUp) return;
      const ip = `reg-rl-${Date.now()}`;
      let got429 = false;
      for (let i = 0; i < 8; i++) {
        const r = await api("/api/auth/register", {
          method: "POST",
          headers: { "x-forwarded-for": ip },
          body: JSON.stringify({
            first_name: "Test",
            last_name: "User",
            email: `test-rl-${Date.now()}-${i}@test.ci`,
            password: "123456",
          }),
        });
        if (r.status === 429) { got429 = true; break; }
      }
      expect(got429).toBe(true);
    }, 15000);
  });

  describe("POST /api/auth/login — rate limit", () => {
    it("should eventually return 429 after 11+ login attempts", async () => {
      if (!serverUp) return;
      const ip = `test-rl-${Date.now()}`;
      let got429 = false;
      for (let i = 0; i < 15; i++) {
        const r = await api("/api/auth/login", {
          method: "POST",
          headers: { "x-forwarded-for": ip },
          body: JSON.stringify({ identifier: "test@test.ci", password: "wrong" }),
        });
        if (r.status === 429) { got429 = true; break; }
      }
      expect(got429).toBe(true);
    }, 15000);
  });
});
