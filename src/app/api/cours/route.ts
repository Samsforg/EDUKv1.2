import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  
  const grades = query<{ id: number; code: string; name: string; cycle: string; order_index: number }>(
    "SELECT id, code, name, cycle, order_index FROM grades ORDER BY order_index"
  );
  
  const subjects = query<{ id: number; code: string; name: string; icon: string; color: string; coefficient_json: string }>(
    "SELECT id, code, name, icon, color, coefficient_json FROM subjects ORDER BY name"
  );
  
  let userGrade = null;
  let userSubscription = null;
  
  if (user) {
    const u = queryOne<{ grade_id: number }>("SELECT grade_id FROM users WHERE id = ?", user.id);
    if (u?.grade_id) {
      userGrade = queryOne<{ id: number; code: string; name: string }>(
        "SELECT id, code, name FROM grades WHERE id = ?", u.grade_id
      );
    }
    
    const sub = queryOne<{ plan: string; status: string; end_at: string }>(
      `SELECT sp.name as plan, s.status, s.end_at 
       FROM subscriptions s 
       JOIN subscription_plans sp ON sp.id = s.plan_id 
       WHERE s.user_id = ? AND s.status = 'active'
       ORDER BY s.id DESC LIMIT 1`,
      user.id
    );
    if (sub) userSubscription = sub;
  }
  
  return NextResponse.json({ grades, subjects, userGrade, userSubscription });
}