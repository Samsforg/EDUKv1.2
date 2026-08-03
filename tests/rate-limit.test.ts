import { rateLimit } from "@/lib/rate-limit";

describe("rate-limit.ts", () => {
  it("should allow first request", () => {
    const r = rateLimit("test-rl-1", "login");
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(9);
  });

  it("should track count across calls", () => {
    const key = "test-rl-track";
    for (let i = 0; i < 10; i++) rateLimit(key, "login");
    const last = rateLimit(key, "login");
    expect(last.allowed).toBe(false);
    expect(last.remaining).toBe(0);
  });

  it("should allow after window reset", () => {
    const key = "test-rl-reset";
    const r1 = rateLimit(key, "login");
    expect(r1.allowed).toBe(true);
    expect(r1.resetAt).toBeGreaterThan(Date.now());
  });

  it("should use default preset for unknown keys", () => {
    const r = rateLimit("test-unknown", "nonexistent_preset");
    expect(r.allowed).toBe(true);
  });
});