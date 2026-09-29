import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

async function GETHandler() {
  const user = await getCurrentUser();
  
  const grades = await query<{ id: number; code: string; name: string; cycle: string; order_index: number; track: string }>(
    "SELECT id, code, name, cycle, order_index, COALESCE(track, 'general') AS track FROM grades ORDER BY order_index"
  );

  const subjects = await query<{ id: number; code: string; name: string; icon: string; color: string; coefficient_json: string }>(
    "SELECT id, code, name, icon, color, coefficient_json FROM subjects ORDER BY name"
  );

  // Source de vérité normalisée (table subject_grades, éditable depuis
  // /espace-admin/coefficients) : { [subjectId]: { [gradeCode]: coefficient } }.
  const coefficientRows = await query<{ subject_id: number; grade_code: string; coefficient: number }>(
    `SELECT sg.subject_id, g.code AS grade_code, sg.coefficient
     FROM subject_grades sg
     JOIN subjects s ON s.id = sg.subject_id
     JOIN grades g ON g.id = sg.grade_id`
  ).catch(() => []);
  const coefficients: Record<number, Record<string, number>> = {};
  for (const r of coefficientRows) {
    (coefficients[r.subject_id] ??= {})[r.grade_code] = r.coefficient;
  }
  
  let userGrade = null;
  let userSubscription = null;
  
  if (user) {
    const u = await queryOne<{ grade_id: number }>("SELECT grade_id FROM users WHERE id = ?", user.id);
    if (u?.grade_id) {
      userGrade = await queryOne<{ id: number; code: string; name: string }>(
        "SELECT id, code, name FROM grades WHERE id = ?", u.grade_id
      );
    }
    
    const sub = await queryOne<{ plan: string; status: string; end_at: string }>(
      `SELECT sp.name as plan, s.status, s.end_at 
       FROM subscriptions s 
       JOIN subscription_plans sp ON sp.id = s.plan_id 
       WHERE s.user_id = ? AND s.status = 'active'
       ORDER BY s.id DESC LIMIT 1`,
      user.id
    );
    if (sub) userSubscription = sub;
  }
  
  const res = NextResponse.json({ grades, subjects, coefficients, userGrade, userSubscription });
  res.headers.set("Cache-Control", "private, max-age=30, stale-while-revalidate=300");
  return res;
}

export const GET = guardApi("GET /api/cours", GETHandler);