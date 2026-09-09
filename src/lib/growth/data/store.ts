import type { GrowthStrategy, Content, Recommendation, Metrics } from "@/lib/growth/ai/types";
import { query, queryOne, run } from "@/lib/db";

export interface GrowthStore {
  getStrategy(date: string): Promise<GrowthStrategy | null>;
  saveStrategy(s: GrowthStrategy): Promise<void>;
  getStrategies(limit?: number): Promise<GrowthStrategy[]>;
  saveContent(c: Content): Promise<void>;
  getContentByStrategy(strategyId: string): Promise<Content[]>;
  getAllContent(limit?: number): Promise<Content[]>;
  updateContentStatus(id: string, status: Content["status"]): Promise<void>;
  updateStrategyStatus(id: string, status: GrowthStrategy["status"]): Promise<void>;
  getLatestMetrics(): Promise<Metrics | null>;
  saveMetrics(m: Metrics): Promise<void>;
  saveRecommendation(r: Recommendation): Promise<void>;
  getRecommendations(limit?: number): Promise<Recommendation[]>;
  updateRecommendationStatus(id: string, status: "validated" | "archived"): Promise<void>;
}

const S_STRATEGY = `SELECT id, date, objective, audience, hook, strategy, kpis, status, created_at as "createdAt" FROM growth_strategies`;
const S_CONTENT = `SELECT id, strategy_id as "strategyId", platform, text, hashtags, cta, visual_prompt as "visualPrompt", score, status, created_at as "createdAt" FROM growth_contents`;
const S_RECOMMENDATION = `SELECT id, date, type, title, description, priority, estimated_impact as "estimatedImpact", created_at as "createdAt" FROM growth_recommendations`;
const S_METRICS = `SELECT date, signups, active_users as "activeUsers", premium_conversions as "premiumConversions", referral_count as "referralCount", quiz_completions as "quizCompletions", kora_interactions as "koraInteractions", page_views as "pageViews", utm FROM growth_metrics`;

let _init = false;

async function ensureTables() {
  if (_init) return;
  _init = true;
  await run(`CREATE TABLE IF NOT EXISTS growth_strategies (
    id TEXT PRIMARY KEY, date TEXT NOT NULL, objective TEXT, audience TEXT,
    hook TEXT, strategy TEXT, kpis JSONB DEFAULT '[]', status TEXT DEFAULT 'draft',
    created_at TEXT DEFAULT now()
  )`).catch(() => {});
  await run(`CREATE TABLE IF NOT EXISTS growth_contents (
    id TEXT PRIMARY KEY, strategy_id TEXT, platform TEXT NOT NULL, text TEXT,
    hashtags JSONB DEFAULT '[]', cta TEXT, visual_prompt TEXT, score INTEGER,
    status TEXT DEFAULT 'draft', created_at TEXT DEFAULT now()
  )`).catch(() => {});
  await run(`CREATE TABLE IF NOT EXISTS growth_metrics (
    date TEXT PRIMARY KEY, signups INTEGER DEFAULT 0, active_users INTEGER DEFAULT 0,
    premium_conversions INTEGER DEFAULT 0, referral_count INTEGER DEFAULT 0,
    quiz_completions INTEGER DEFAULT 0, kora_interactions INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0, utm JSONB DEFAULT '{}'
  )`).catch(() => {});
  await run(`CREATE TABLE IF NOT EXISTS growth_recommendations (
    id TEXT PRIMARY KEY, date TEXT, type TEXT, title TEXT, description TEXT,
    priority TEXT DEFAULT 'medium', estimated_impact TEXT,
    created_at TEXT DEFAULT now()
  )`).catch(() => {});
}

export async function getStore(): Promise<GrowthStore> {
  await ensureTables();
  return {
    async getStrategy(date) {
      return (await queryOne<GrowthStrategy>(`${S_STRATEGY} WHERE date = $1`, date)) ?? null;
    },
    async saveStrategy(s) {
      await run(
        `INSERT INTO growth_strategies (id, date, objective, audience, hook, strategy, kpis, status, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        s.id, s.date, s.objective, s.audience, s.hook, s.strategy, JSON.stringify(s.kpis), s.status, s.createdAt
      );
    },
    async getStrategies(limit = 30) {
      return await query<GrowthStrategy>(`${S_STRATEGY} ORDER BY created_at DESC LIMIT $1`, limit);
    },
    async saveContent(c) {
      await run(
        `INSERT INTO growth_contents (id, strategy_id, platform, text, hashtags, cta, visual_prompt, score, status, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        c.id, c.strategyId, c.platform, c.text, JSON.stringify(c.hashtags), c.cta,
        c.visualPrompt ?? null, c.score ?? null, c.status, c.createdAt
      );
    },
    async getContentByStrategy(strategyId) {
      return await query<Content>(`${S_CONTENT} WHERE strategy_id = $1 ORDER BY created_at DESC`, strategyId);
    },
    async getAllContent(limit = 50) {
      return await query<Content>(`${S_CONTENT} ORDER BY created_at DESC LIMIT $1`, limit);
    },
    async updateContentStatus(id, status) {
      await run("UPDATE growth_contents SET status = $1 WHERE id = $2", status, id);
    },
    async updateStrategyStatus(id, status) {
      await run("UPDATE growth_strategies SET status = $1 WHERE id = $2", status, id);
    },
    async getLatestMetrics() {
      return (await queryOne<Metrics>(`${S_METRICS} ORDER BY date DESC LIMIT 1`)) ?? null;
    },
    async saveMetrics(m) {
      await run(
        `INSERT INTO growth_metrics (date, signups, active_users, premium_conversions, referral_count, quiz_completions, kora_interactions, page_views, utm)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (date) DO UPDATE SET signups=$2, active_users=$3, premium_conversions=$4, referral_count=$5, quiz_completions=$6, kora_interactions=$7, page_views=$8, utm=$9`,
        m.date, m.signups, m.activeUsers, m.premiumConversions, m.referralCount,
        m.quizCompletions, m.koraInteractions, m.pageViews, JSON.stringify(m.utm ?? {})
      );
    },
    async saveRecommendation(r) {
      await run(
        `INSERT INTO growth_recommendations (id, date, type, title, description, priority, estimated_impact, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        r.id, r.date, r.type, r.title, r.description, r.priority, r.estimatedImpact, r.createdAt
      );
    },
    async getRecommendations(limit = 20) {
      return await query<Recommendation>(`${S_RECOMMENDATION} ORDER BY created_at DESC LIMIT $1`, limit);
    },
    async updateRecommendationStatus(id, status) {
      await run("UPDATE growth_recommendations SET priority = $1 WHERE id = $2", status, id);
    },
  };
}
