import { getLigueOf, getLigueProgress, LIGUES } from "@/lib/rank";

describe("rank.ts", () => {
  describe("getLigueOf", () => {
    it("should return bronze for 0 XP", () => {
      expect(getLigueOf(0).key).toBe("bronze");
    });

    it("should return bronze for 999 XP", () => {
      expect(getLigueOf(999).key).toBe("bronze");
    });

    it("should return argent for 1000 XP", () => {
      expect(getLigueOf(1000).key).toBe("argent");
    });

    it("should return or for 2000 XP", () => {
      expect(getLigueOf(2000).key).toBe("or");
    });

    it("should return diamant for 3500 XP", () => {
      expect(getLigueOf(3500).key).toBe("diamant");
    });

    it("should return maitre for 5000 XP", () => {
      expect(getLigueOf(5000).key).toBe("maitre");
    });

    it("should return maitre for very high XP", () => {
      expect(getLigueOf(99999).key).toBe("maitre");
    });
  });

  describe("getLigueProgress", () => {
    it("should show 100% for maitre", () => {
      const p = getLigueProgress(5000);
      expect(p.pct).toBe(100);
      expect(p.remaining).toBe(0);
      expect(p.next).toBeNull();
    });

    it("should calculate pct correctly for argent", () => {
      const p = getLigueProgress(1500);
      expect(p.ligue.key).toBe("argent");
      expect(p.next).toBe(2000);
      expect(p.pct).toBe(50);
      expect(p.remaining).toBe(500);
    });

    it("should handle 0 XP", () => {
      const p = getLigueProgress(0);
      expect(p.ligue.key).toBe("bronze");
      expect(p.next).toBe(1000);
      expect(p.pct).toBe(0);
      expect(p.remaining).toBe(1000);
    });

    it("should clamp pct to 100", () => {
      const p = getLigueProgress(5500);
      expect(p.pct).toBe(100);
    });
  });

  describe("LIGUES", () => {
    it("should have 5 liguees", () => {
      expect(LIGUES).toHaveLength(5);
    });

    it("should be ordered from highest to lowest", () => {
      for (let i = 1; i < LIGUES.length; i++) {
        expect(LIGUES[i].min).toBeLessThan(LIGUES[i - 1].min);
      }
    });
  });
});