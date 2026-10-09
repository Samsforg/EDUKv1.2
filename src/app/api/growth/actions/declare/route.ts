import { guardApi } from "@/lib/api-guard";
import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";
import { trackDb } from "@/lib/analytics-db";
import { DECLARATION_EVENT, hasDeclaration, parseDeclarationPayload } from "@/lib/growth/measure";

/**
 * P2.4 — POST /api/growth/actions/declare
 *
 * Mécanisme EXPLICITE d'enregistrement d'une réalisation d'action P2.3 :
 *  - admin-only (requireAdmin : 401/403) + guardApi (rate limit, headers) ;
 *  - corps strict : whitelist `action_id` + `window_days` (aucun contenu
 *    libre, aucune PII, aucun texte fourni par l'utilisateur) ;
 *  - idempotence : une déclaration existante pour `action_id` renvoie
 *    `already_declared` sans écrire de seconde ligne ;
 *  - écriture via `trackDb` (INSERT de la table `analytics_events`
 *    existant, événement serveur `growth_action_implemented` hors
 *    taxonomie client EVENTS) — identité admin résolue côté serveur,
 *    jamais depuis le corps de la requête ;
 *  - la couche mesure reste read-only : aucune action n'est exécutée.
 * CSRF : jeton exigé côté proxy (déjà actif sur /api/*).
 */
async function POSTHandler(req: NextRequest) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "corps_invalide" }, { status: 400 });
  }

  const parsed = parseDeclarationPayload(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { action_id, window_days } = parsed.value;

  if (await hasDeclaration(action_id)) {
    return NextResponse.json(
      { status: "already_declared", action_id, window_days },
      { status: 200 },
    );
  }

  await trackDb(
    DECLARATION_EVENT,
    { action_id, window_days },
    user.id,
    null,
    new URL(req.url).pathname,
  );

  return NextResponse.json({ status: "declared", action_id, window_days }, { status: 201 });
}

export const POST = guardApi("POST /api/growth/actions/declare", POSTHandler);
