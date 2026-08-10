import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { run } from "@/lib/db";
import { logAudit } from "@/lib/audit";

async function safeDelete(table: string, where: string, uid: number) {
  try {
    await run(`DELETE FROM ${table} WHERE ${where} = ?`, uid);
  } catch {
    // table or column may not exist (migration not applied); ignore
  }
}

async function DELETEHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const uid = user.id;

  // Soft-anonymise identifiable fields first (keeps row id stable for audit trail)
  await safeDelete("password_resets", "user_id", uid);
  await run(
    "UPDATE users SET email = NULL, phone = NULL, first_name = '[supprimé]', last_name = '[supprimé]', referral_code = NULL WHERE id = ?",
    uid,
  );

  // Explicit deletion de toutes tables liées à l'utilisateur (ordre dépendance)
  await safeDelete("user_badges", "user_id", uid);
  await safeDelete("user_consents", "user_id", uid);
  await safeDelete("quiz_attempts", "user_id", uid);
  await safeDelete("exam_attempts", "user_id", uid);
  await safeDelete("saved_lessons", "user_id", uid);
  await safeDelete("lesson_reads", "user_id", uid);
  await safeDelete("user_progress", "user_id", uid);
  await safeDelete("subscriptions", "user_id", uid);
  await safeDelete("push_subscriptions", "user_id", uid);
  await safeDelete("notifications", "user_id", uid);
  await safeDelete("reminder_settings", "user_id", uid);
  await safeDelete("pairing_codes", "user_id", uid);
  await safeDelete("rate_limits", "user_id", uid);
  await safeDelete("challenge_contributions", "user_id", uid);
  await safeDelete("class_students", "user_id", uid);
  await safeDelete("assignment_submissions", "student_id", uid);
  await safeDelete("forum_replies", "user_id", uid);
  await safeDelete("forum_votes", "user_id", uid);
  await safeDelete("forum_posts", "user_id", uid);
  await safeDelete("live_messages", "user_id", uid);
  await safeDelete("live_registrations", "user_id", uid);
  await safeDelete("live_blocked_users", "user_id", uid);
  await safeDelete("disputes", "user_id", uid);
  await safeDelete("parent_child", "parent_id", uid);
  await safeDelete("parent_child", "child_id", uid);
  await safeDelete("sessions", "user_id", uid);

  // Supprimer les sessions de proctoring liées (via user_id sur proctoring_sessions)
  try {
    const proctSessions = await import("@/lib/db").then((m) =>
      m.query<{ id: number }>("SELECT id FROM proctoring_sessions WHERE user_id = ?", uid),
    );
    for (const s of proctSessions) {
      await run("DELETE FROM proctoring_events WHERE session_id = ?", s.id);
    }
    await safeDelete("proctoring_sessions", "user_id", uid);
  } catch {
    /* tables absentes */
  }

  await run("UPDATE users SET referred_by = NULL WHERE referred_by = ?", uid);

  // Journal d'audit AVANT suppression (FK actor_id -> users)
  await logAudit(uid, "suppression", "Compte utilisateur supprimé (RGPD)");

  // Suppression définitive du compte
  await run("DELETE FROM users WHERE id = ?", uid);

  return NextResponse.json({ ok: true, message: "Compte supprimé définitivement" });
}

export const DELETE = guardApi("DELETE /api/me", DELETEHandler);
