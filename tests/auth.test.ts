import { hashPassword, verifyPassword, generateToken } from "@/lib/auth";

describe("auth.ts", () => {
  describe("hashPassword / verifyPassword", () => {
    it("should hash and verify correctly", () => {
      const hash = hashPassword("test123");
      expect(hash).toContain(":");
      expect(hash.split(":")).toHaveLength(2);
      expect(verifyPassword("test123", hash)).toBe(true);
    });

    it("should reject wrong password", () => {
      const hash = hashPassword("correct");
      expect(verifyPassword("wrong", hash)).toBe(false);
    });

    it("should produce different hashes for same password (different salts)", () => {
      const h1 = hashPassword("same");
      const h2 = hashPassword("same");
      expect(h1).not.toBe(h2);
      expect(verifyPassword("same", h1)).toBe(true);
      expect(verifyPassword("same", h2)).toBe(true);
    });

    it("should reject malformed stored hash", () => {
      expect(verifyPassword("test", "nocolon")).toBe(false);
      expect(verifyPassword("test", "abc:xyz")).toBe(false);
    });

    it("should handle empty-ish passwords", () => {
      const hash = hashPassword("a");
      expect(verifyPassword("a", hash)).toBe(true);
    });
  });

  describe("generateToken", () => {
    it("should return 64-char hex string", () => {
      const token = generateToken();
      expect(token).toHaveLength(64);
      expect(/^[0-9a-f]{64}$/.test(token)).toBe(true);
    });

    it("should be unique", () => {
      const t1 = generateToken();
      const t2 = generateToken();
      expect(t1).not.toBe(t2);
    });
  });
});