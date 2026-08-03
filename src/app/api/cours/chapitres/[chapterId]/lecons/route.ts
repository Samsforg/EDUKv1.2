import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(
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
    `SELECT id, title, content_md, video_url, duration_min, difficulty, is_premium
     FROM lessons
     WHERE chapter_id = ?
     ORDER BY id`,
    chapterId
  );
  
  // Get user progress for each lesson
  const progress = await query<{ lesson_id: number; completed: number; score: number }>(
    `SELECT lesson_id, completed, score FROM user_progress WHERE user_id = ?`,
    user.id
  );
  const progressMap = new Map(progress.map(p => [p.lesson_id, p]));
  
  return NextResponse.json({ 
    lessons: lessons.map(l => ({
      ...l,
      progress: progressMap.get(l.id) || { completed: 0, score: 0 }
    }))
  });
}