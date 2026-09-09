import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { isPremiumUser } from "@/lib/quotas";

// Dépend de la session utilisateur et du statut premium : jamais mis en cache.
export const dynamic = "force-dynamic";

async function GETHandler(
  _req: Request,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  
  const { chapterId } = await params;
  
  const lessons = await query<{ 
    id: number; 
    title: string; 
    content_md: string; 
    video_url: string;
    duration_min: number;
    difficulty: number;
    is_premium: number;
  }>(
    `SELECT l.id, l.title, l.content_md, l.video_url, l.duration_min, l.difficulty, l.is_premium
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     WHERE l.chapter_id = ? AND l.status = 'approved' AND c.status = 'approved'
     ORDER BY l.id`,
    chapterId
  );
  
  const premium = await isPremiumUser(user.id);

  // Get user progress for each lesson
  const progress = await query<{ lesson_id: number; completed: number; score: number }>(
    `SELECT lesson_id, completed, score FROM user_progress WHERE user_id = ?`,
    user.id
  );
  const progressMap = new Map(progress.map(p => [p.lesson_id, p]));
  
  return NextResponse.json({ 
    lessons: lessons.map(l => {
      const locked = l.is_premium === 1 && !premium;
      return {
        ...l,
        locked,
        // Ne pas exposer le contenu premium aux utilisateurs non abonnés
        content_md: locked ? "" : l.content_md,
        video_url: locked ? "" : l.video_url,
        progress: progressMap.get(l.id) || { completed: 0, score: 0 }
      };
    })
  });
}

export const GET = guardApi("GET /api/cours/chapitres/[chapterId]/lecons", GETHandler);