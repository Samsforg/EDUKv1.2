import { getStore } from "../../src/lib/growth/data/store";
import type { GrowthStrategy, Content, Metrics, Recommendation } from "../../src/lib/growth/ai/types";

describe("store", () => {
  let s: Awaited<ReturnType<typeof getStore>>;

  beforeAll(async () => {
    s = await getStore();
  });

  test("save and get strategy", async () => {
    const st: GrowthStrategy = {
      id: "test-strat-1", date: "2026-01-01", objective: "Test", audience: "Test",
      hook: "Test", strategy: "Test", kpis: ["KPI 1"], status: "draft",
      createdAt: new Date().toISOString(),
    };
    await s.saveStrategy(st);
    const found = await s.getStrategy("2026-01-01");
    expect(found).not.toBeNull();
    expect(found!.id).toBe("test-strat-1");
  });

  test("save and get content", async () => {
    const c: Content = {
      id: "test-content-1", strategyId: "test-strat-1", platform: "facebook",
      text: "Test post", hashtags: ["test"], cta: "Test CTA", status: "draft",
      createdAt: new Date().toISOString(),
    };
    await s.saveContent(c);
    const all = await s.getContentByStrategy("test-strat-1");
    expect(all.length).toBeGreaterThanOrEqual(1);
  });

  test("save and get metrics", async () => {
    const m: Metrics = {
      date: "2026-01-01", signups: 10, activeUsers: 50, premiumConversions: 3,
      referralCount: 5, quizCompletions: 20, koraInteractions: 15, pageViews: 200,
    };
    await s.saveMetrics(m);
    const latest = await s.getLatestMetrics();
    expect(latest).not.toBeNull();
    expect(latest!.signups).toBe(10);
  });

  test("save and get recommendation", async () => {
    const r: Recommendation = {
      id: "test-rec-1", date: "2026-01-01", type: "content", title: "Test rec",
      description: "Test description", priority: "high", estimatedImpact: "+20% signups",
      createdAt: new Date().toISOString(),
    };
    await s.saveRecommendation(r);
    const recs = await s.getRecommendations(5);
    expect(recs.length).toBeGreaterThanOrEqual(1);
  });
});
