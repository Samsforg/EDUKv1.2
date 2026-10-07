import { query, queryOne } from "./db";
import { testUsersWhere } from "./test-users";

/**
 * MRR canonique — source de vérité business.
 *
 * Définition unique partagée par tous les écrans (conversion-report.ts,
 * revenus/page.tsx) afin qu'un même dataset produise le même MRR quelle que
 * soit la page qui l'affiche.
 *
 *   MRR = SUM(subscriptions.price_cents)
 *   WHERE status = 'active'
 *     AND user is not test
 *
 * Le trial n'est pas facturé (0 FCFA, cf. premium/checkout) → exclu.
 * Le prix utilisé est celui stocké au moment de l'abonnement
 * (subscriptions.price_cents), pas le prix actuel du plan.
 */
export async function getCanonicalMRR(): Promise<number> {
  const r = await queryOne<{ v: number | null }>(
    `SELECT COALESCE(SUM(s.price_cents),0) AS v
     FROM subscriptions s
     WHERE s.status = 'active'
       AND NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = s.user_id AND (${testUsersWhere("tu")}))`,
  );
  return Number(r?.v ?? 0);
}

/**
 * Revenue business + abonnements actifs — source Data Trust.
 *
 * Définition distincte de `getConversionStats()` (qui utilise des fenêtres
 * today/week/month sur `started_at`) : ici, revenue TOTAL et revenue du mois
 * courant sur `created_at`. Chaque métrique conserve sa définition explicite.
 *
 *   total_cents       = SUM(price_cents) WHERE status='active' AND not test
 *   this_month_cents  = même filtre + created_at >= début du mois
 *   count             = abonnements actifs (business)
 */
export async function getBusinessRevenue(): Promise<{
  total_cents: number;
  count: number;
  this_month_cents: number;
  this_month_count: number;
}> {
  const rev = await query<{ total_cents: number; count: number }>(
    `SELECT COALESCE(SUM(s.price_cents), 0) AS total_cents, COUNT(*) AS count
     FROM subscriptions s
     WHERE s.status = 'active'
       AND NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = s.user_id AND (${testUsersWhere("tu")}))`,
  );
  const revMonth = await query<{ total_cents: number; count: number }>(
    `SELECT COALESCE(SUM(s.price_cents), 0) AS total_cents, COUNT(*) AS count
     FROM subscriptions s
     WHERE s.status = 'active'
       AND s.created_at >= date('now','start of month')
       AND NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = s.user_id AND (${testUsersWhere("tu")}))`,
  );
  return {
    total_cents: rev[0]?.total_cents ?? 0,
    count: rev[0]?.count ?? 0,
    this_month_cents: revMonth[0]?.total_cents ?? 0,
    this_month_count: revMonth[0]?.count ?? 0,
  };
}
