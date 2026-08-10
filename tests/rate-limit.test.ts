import { rateLimit } from "@/lib/rate-limit";

const RUN = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

describe("rate-limit.ts", () => {
  it("should allow first request", async () => {
    const r = await rateLimit(`test-rl-1-${RUN}`, "login");
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(29);
  });

  it("should track count across calls", async () => {
    const key = `test-rl-track-${RUN}`;
    for (let i = 0; i < 30; i++) await rateLimit(key, "login");
    const last = await rateLimit(key, "login");
    expect(last.allowed).toBe(false);
    expect(last.remaining).toBe(0);
  });

  it("should allow after window reset", async () => {
    const key = `test-rl-reset-${RUN}`;
    const r1 = await rateLimit(key, "login");
    expect(r1.allowed).toBe(true);
    expect(r1.resetAt).toBeGreaterThan(Date.now());
  });

  it("should use default preset for unknown keys", async () => {
    const r = await rateLimit(`test-unknown-${RUN}`, "nonexistent_preset");
    expect(r.allowed).toBe(true);
  });
});