import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { Pool } from "pg";
import { put } from "@vercel/blob";
import { logger } from "@/lib/logger";
import { requireCronSecret } from "@/lib/cron-auth";

// Backup quotidien de la base Neon -> Vercel Blob (JSON par table).
// Déclenché par cron Vercel. Protégé par CRON_SECRET.
//
// Prérequis : BLOB_READ_WRITE_TOKEN sur Vercel (Vercel Blob store connecté au projet).

const TABLES = [
  "users",
  "subscriptions",
  "subscription_plans",
  "quiz_attempts",
  "exam_attempts",
  "questions",
  "quizzes",
  "exam_papers",
  "lessons",
  "chapters",
  "subjects",
  "series",
  "grades",
  "badges",
  "user_badges",
  "user_progress",
  "lesson_reads",
  "saved_lessons",
  "favorites",
  "notifications",
  "forum_posts",
  "forum_replies",
  "newsletter_subscribers",
  "promo_codes",
  "daily_challenges",
  "duels",
  "spaced_reviews",
  "parent_notification_settings",
  "push_subscriptions",
  "dissertation_corrections",
];

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return NextResponse.json({ error: "DATABASE_URL manquant" }, { status: 503 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN manquant — backup ignoré" }, { status: 503 });
  }

  const pool = new Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false }, max: 2 });
  const dump: Record<string, unknown[]> = {};
  let tables = 0;
  let rows = 0;
  try {
    for (const t of TABLES) {
      try {
        const r = await pool.query(`SELECT * FROM ${t}`);
        dump[t] = r.rows;
        tables++;
        rows += r.rowCount ?? 0;
      } catch {
        // table absente : on continue
      }
    }
    const json = JSON.stringify({
      exported_at: new Date().toISOString(),
      source: "neon",
      tables,
      rows,
      data: dump,
    });

    const day = new Date().toISOString().slice(0, 10);
    const pathname = `backups/edukora-${day}.json`;
    const blob = await put(pathname, json, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return NextResponse.json({ ok: true, tables, rows, size_kb: Math.round(json.length / 1024), url: blob.url });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    logger.error("cron:backup_failed", { error: msg });
    return NextResponse.json({ error: msg }, { status: 500 });
  } finally {
    await pool.end().catch(() => {});
  }
}

export const GET = guardApi("GET /api/cron/backup", GETHandler);
