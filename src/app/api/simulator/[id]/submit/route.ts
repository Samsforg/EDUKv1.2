import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser, applyActivity, addXp, notify } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";
import { endSession } from "@/lib/proctoring";
import { creditLigueChallenges } from "@/lib/ligue";
import { getSimulateurQuota } from "@/lib/quotas";
import { getPremiumPlans } from "@/lib/plans";
import {
  idempotencyKey,
  isValidAttemptId,
  normalizeAttemptId,
  pendingResponse,
} from "@/lib/idempotency";

// Préfixe de la clé d'idempotence des soumissions d'examen.
const SUBMIT_KEY_PREFIX = "simsubmit";

// Marge tolérée sur la durée déclarée (horloge locale décalée, pause, etc.).
const DURATION_TOLERANCE_SECONDS = 300;

async function POSTHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const paperId = Number(id);
  if (!Number.isInteger(paperId) || paperId <= 0) {
    return NextResponse.json({ error: "Identifiant d'épreuve invalide" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.answers)) {
    return NextResponse.json({ error: "Réponses invalides" }, { status: 400 });
  }

  // ------------------------------------------------------------------
  // Identité de la tentative + clé d'idempotence.
  //
  // `exam_attempts` n'a aucune contrainte d'unicité (user_id, paper_id) et le
  // quota Découverte compte précisément les tentatives : plusieurs tentatives
  // par examen sont donc légitimes. L'idempotence ne peut donc PAS porter sur
  // (utilisateur, épreuve) — sinon elle bloquerait les tentatives autorisées —
  // mais sur l'identité de la tentative, fournie par le client.
  // ------------------------------------------------------------------
  const attemptId = normalizeAttemptId(body.attempt_id);
  if (!isValidAttemptId(attemptId)) {
    return NextResponse.json(
      { error: "Identifiant de tentative invalide", code: "INVALID_ATTEMPT_ID" },
      { status: 400 },
    );
  }

  const paper = await queryOne<{ id: number; title: string; duration_minutes: number }>(
    "SELECT id, title, duration_minutes FROM exam_papers WHERE id = ? AND status = 'approved'",
    paperId,
  );
  if (!paper) return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });

  // Durée déclarée par le client : uniquement une plage de vraisemblance. Le
  // score, lui, est entièrement recalculé côté serveur.
  const declaredDuration = Math.round(Number(body.duration_seconds ?? 0));
  const maxDuration = (paper.duration_minutes ?? 0) * 60 + DURATION_TOLERANCE_SECONDS;
  if (!Number.isFinite(declaredDuration) || declaredDuration < 0 || declaredDuration > maxDuration) {
    return NextResponse.json({ error: "Durée de passage incohérente" }, { status: 400 });
  }

  // Drapeaux de surveillance. `endSession` attend {type,detail} : on valide la
  // forme et la longueur (l'API tronque elle-même à 300), sinon on les ignore.
  // Le client du simulateur n'en envoie d'ailleurs aucun actuellement.
  const rawFlags = body.flags;
  const flags: { type: string; detail: string }[] = Array.isArray(rawFlags)
    ? rawFlags
        .filter(
          (f: unknown): f is { type: string; detail: string } =>
            !!f &&
            typeof f === "object" &&
            typeof (f as { type?: unknown }).type === "string" &&
            typeof (f as { detail?: unknown }).detail === "string",
        )
        .map((f) => ({ type: f.type.trim().slice(0, 64), detail: f.detail.trim().slice(0, 300) }))
        .filter((f) => f.type.length > 0 && f.detail.length > 0)
    : [];

  // Origine de la soumission. Sert uniquement à la traçabilité produit : le
  // score et la validation restent calculés serveur.
  const timedOut = body.timed_out === true;

  const simQuota = await getSimulateurQuota(user.id);
  if (!simQuota.isPremium && simQuota.limit !== null && simQuota.used >= simQuota.limit) {
    const plans = await getPremiumPlans().catch(() => []);
    const reussite = plans.find((p) => p.price_cents > 0 && p.interval === "month");
    return NextResponse.json(
      {
        error: `Limite mensuelle atteinte : ${simQuota.limit} sujet${simQuota.limit > 1 ? "s" : ""} d'examen par mois sur le plan Découverte. Passez au plan Réussite pour un accès illimité !`,
        code: "simulateur_quota_exceeded",
        quota: simQuota,
        plan: reussite
          ? { id: reussite.id, name: reussite.name, price_cents: reussite.price_cents, interval: reussite.interval }
          : null,
      },
      { status: 403 },
    );
  }

  // ------------------------------------------------------------------
  // Réservation ATOMIQUE de la clé d'idempotence, AVANT tout effet
  // secondaire. `key` est la PRIMARY KEY de idempotency_keys : en cas de
  // requêtes concurrentes, une seule remporte l'INSERT (changes = 1), les
  // autres obtiennent changes = 0 et sont identifiées comme rejeux. Un simple
  // SELECT préalable ne suffirait pas — deux requêtes simultanées le
  // manqueraient toutes les deux.
  // ------------------------------------------------------------------
  const idemKey = idempotencyKey(SUBMIT_KEY_PREFIX, user.id, attemptId);
  const claimed = await run(
    "INSERT INTO idempotency_keys (key, user_id, response) VALUES (?, ?, ?) ON CONFLICT(key) DO NOTHING",
    idemKey,
    user.id,
    pendingResponse(),
  );

  if (claimed.changes === 0) {
    const cached = await queryOne<{ response: string }>(
      "SELECT response FROM idempotency_keys WHERE key = ? AND user_id = ?",
      idemKey,
      user.id,
    );
    if (cached?.response) {
      try {
        const parsed = JSON.parse(cached.response) as
          | { status?: string; [k: string]: unknown }
          | null;
        if (parsed && parsed.status === "pending") {
          // Une soumission de la même tentative est encore en vol : on ne
          // renvoie pas de résultat partiel.
          return NextResponse.json(
            { error: "Soumission déjà en cours de traitement", code: "SUBMISSION_IN_PROGRESS" },
            { status: 409 },
          );
        }
        if (parsed && parsed.status === "error") {
          // Échec déjà constaté lors de la première tentative de traitement.
          return NextResponse.json(
            { error: (parsed.error as string) ?? "Soumission échouée", code: "SUBMIT_FAILED" },
            { status: 500 },
          );
        }
        // Rejeu légitime : on renvoie le résultat déjà calculé, sans recréer
        // de tentative ni recrediter les récompenses.
        return NextResponse.json(parsed);
      } catch {
        // Cache corrompu : on retraite (l'unicité reste garantie par la clé).
      }
    }
    return NextResponse.json(
      { error: "Cette tentative a déjà été soumise", code: "ATTEMPT_ALREADY_SUBMITTED" },
      { status: 409 },
    );
  }

  // Vrai si la tentative a déjà été écrite dans exam_attempts.
  let attemptPersisted = false;

  try {
    const questions = await query<{ id: number; answer_index: number; points: number; explanation: string | null }>(
      "SELECT id, answer_index, points, explanation FROM questions WHERE paper_id = ? ORDER BY position",
      paperId,
    );

    let score = 0;
    let max = 0;
    const details = questions.map((q) => {
      const selected = body.answers.find((a: { questionId: number }) => a.questionId === q.id);
      const correct = selected && selected.selected === q.answer_index;
      if (correct) score += q.points;
      max += q.points;
      return {
        questionId: q.id,
        correct: !!correct,
        answer_index: q.answer_index,
        explanation: q.explanation,
      };
    });
    const scoreOver20 = max > 0 ? Math.round((score * 20) / max * 10) / 10 : 0;
    const duration = Math.max(0, declaredDuration);

    const inserted = await run(
      "INSERT INTO exam_attempts (user_id, paper_id, score, score_over_20, duration_seconds, timed_out) VALUES (?, ?, ?, ?, ?, ?)",
      user.id,
      paperId,
      score,
      scoreOver20,
      duration,
      timedOut ? 1 : 0,
    );
    attemptPersisted = inserted.changes === 1;

    await endSession(user.id, paperId, flags);
    await run(
      "INSERT INTO proctoring_events (session_id, event_type, detail) SELECT ps.id, 'submission', ? FROM proctoring_sessions ps WHERE ps.user_id = ? AND ps.paper_id = ? AND ps.status = 'ended' ORDER BY ps.id DESC LIMIT 1",
      `Épreuve soumise — ${scoreOver20}/20`,
      user.id,
      paperId,
    );

    await applyActivity(user.id);
    const xp = 20 + Math.max(0, Math.round(scoreOver20 * 3));
    await addXp(user.id, xp);
    await creditLigueChallenges(user.id, "xp_total", xp);

    await refreshBadges(user.id);

    const respBody = { score, max, score_over_20: scoreOver20, xp, details };

    // Cache de succès positionné AVANT la notification, effet le moins
    // critique : si la notification échoue, un rejeu renvoie malgré tout le
    // succès et ne recredite aucune récompense.
    await run(
      "UPDATE idempotency_keys SET response = ? WHERE key = ?",
      JSON.stringify({ status: "ok", ...respBody }),
      idemKey,
    );

    await notify(
      user.id,
      "Examen simulé",
      `Tu as obtenu ${scoreOver20}/20 au sujet « ${paper.title} » (+${xp} XP).`,
      "school",
    );

    return NextResponse.json(respBody);
  } catch (err) {
    if (attemptPersisted) {
      // La tentative est déjà en base : on conserve la clé et on marque
      // l'échec, afin qu'aucun rejeu ne recrédite XP / ligue / badges.
      await run(
        "UPDATE idempotency_keys SET response = ? WHERE key = ?",
        JSON.stringify({ status: "error", error: "Erreur lors de la correction. Réessaie." }),
        idemKey,
      ).catch(() => {});
      return NextResponse.json(
        { error: "Erreur lors de la correction. Réessaie." },
        { status: 500 },
      );
    }
    // Rien n'a été écrit : on libère la clé pour permettre une nouvelle
    // tentative de traitement.
    await run("DELETE FROM idempotency_keys WHERE key = ?", idemKey).catch(() => {});
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const POST = guardApi("POST /api/simulator/[id]/submit", POSTHandler);
