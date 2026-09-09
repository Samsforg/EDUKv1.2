import { calculateContentScore } from "../../src/lib/growth/marketing/scoring";
import type { Content } from "../../src/lib/growth/ai/types";

function makeContent(overrides: Partial<Content> = {}): Content {
  return {
    id: "test-1",
    strategyId: "strat-1",
    platform: "facebook",
    text: "Découvre Edukora ! Le tuteur IA Kora est disponible 24h/24 pour t'aider à réviser ton BAC. Rejoins-nous maintenant !",
    hashtags: ["edukora", "bac2025", "ci"],
    cta: "Télécharge Edukora maintenant",
    status: "draft",
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("calculateContentScore", () => {
  test("good Facebook post scores 60+", () => {
    const c = makeContent();
    const result = calculateContentScore(c);
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  test("hook with engagement words scores higher", () => {
    const good = makeContent({ text: "Urgence ! Découvre Edukora avant tout le monde. 100% gratuit pour les BAC." });
    const bland = makeContent({ text: "Edukora est une application éducative pour les élèves." });
    expect(calculateContentScore(good).score).toBeGreaterThan(calculateContentScore(bland).score);
  });

  test("TikTok short text scores higher for length", () => {
    const short = makeContent({ platform: "tiktok", text: "Petit texte court de 50 mots max." });
    const long = makeContent({ platform: "tiktok", text: "A".repeat(500) });
    expect(calculateContentScore(short).breakdown.length).toBe(15);
    expect(calculateContentScore(long).breakdown.length).toBeLessThan(15);
  });

  test("WhatsApp short text scores higher for length", () => {
    const short = makeContent({ platform: "whatsapp", text: "Salut ! Essaie Edukora." });
    const long = makeContent({ platform: "whatsapp", text: "A".repeat(500) });
    expect(calculateContentScore(short).breakdown.length).toBe(15);
    expect(calculateContentScore(long).breakdown.length).toBeLessThan(15);
  });

  test("CTA with action words scores higher", () => {
    const withCta = makeContent({ cta: "Rejoins Edukora maintenant" });
    const noCta = makeContent({ cta: "" });
    expect(calculateContentScore(withCta).breakdown.cta).toBeGreaterThan(calculateContentScore(noCta).breakdown.cta);
  });

  test("2-8 hashtags is optimal", () => {
    const good = makeContent({ hashtags: ["edukora", "bac", "ci"] });
    const none = makeContent({ hashtags: [] });
    const tooMany = makeContent({ hashtags: ["a", "b", "c", "d", "e", "f", "g", "h", "i"] });
    const goodScore = calculateContentScore(good).breakdown.hashtags;
    expect(goodScore).toBe(10);
    expect(calculateContentScore(none).breakdown.hashtags).toBe(0);
    expect(calculateContentScore(tooMany).breakdown.hashtags).toBe(5);
  });

  test("score never exceeds 100", () => {
    const c = makeContent({
      text: "Urgence exclusive ! Découvre Edukora maintenant ! 100% gratuit !",
      hashtags: ["edukora", "bac", "ci", "premium"],
      cta: "Rejoins Edukora maintenant",
    });
    const result = calculateContentScore(c);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
