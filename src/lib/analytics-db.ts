import { query, queryOne, run } from "@/lib/db";

const TABLE_DDL = `
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  session_id TEXT,
  event TEXT NOT NULL,
  props TEXT,
  url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events(user_id, created_at);
`;

let ensured = false;
export async function ensureAnalyticsTable() {
  if (ensured) return;
  try {
    await run(`CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      session_id TEXT,
      event TEXT NOT NULL,
      props TEXT,
      url TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`);
    await run(`CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event, created_at)`);
    await run(`CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events(user_id, created_at)`);
    ensured = true;
  } catch {}
}

export async function trackDb(event: string, props: Record<string, unknown>, userId: number | null, sessionId: string | null, url: string | null) {
  await ensureAnalyticsTable();
  await run(
    "INSERT INTO analytics_events (user_id, session_id, event, props, url) VALUES (?, ?, ?, ?, ?)",
    userId,
    sessionId,
    event,
    JSON.stringify(props ?? {}),
    url
  );
}
