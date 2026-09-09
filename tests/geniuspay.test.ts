import { canonicalPhone } from "@/lib/geniuspay";

describe("geniuspay.ts", () => {
  describe("canonicalPhone", () => {
    it("should return null for null/undefined", () => {
      expect(canonicalPhone(null)).toBeNull();
      expect(canonicalPhone(undefined)).toBeNull();
    });

    it("should strip +225 prefix and return last 9 digits", () => {
      expect(canonicalPhone("+2250707070707")).toBe("707070707");
    });

    it("should strip leading 225 and return last 9 digits", () => {
      expect(canonicalPhone("2250707070707")).toBe("707070707");
    });

    it("should strip leading 00 and return last 9 digits", () => {
      expect(canonicalPhone("002250707070707")).toBe("707070707");
    });

    it("should keep 9+ digit numbers as last 9", () => {
      expect(canonicalPhone("0707070707")).toBe("707070707");
    });

    it("should handle short numbers as-is", () => {
      expect(canonicalPhone("12345")).toBe("12345");
    });
  });
});
