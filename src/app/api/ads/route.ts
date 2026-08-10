import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface AdRow {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  background: string | null;
}

async function GETHandler() {
  const ads = await query<AdRow>(
    `SELECT id, title, subtitle, image_url, link_url, background
     FROM site_ads WHERE enabled = 1 ORDER BY sort_order ASC, id ASC`,
  );
  return NextResponse.json({ ads });
}

export const GET = guardApi("GET /api/ads", GETHandler);