import { query, queryOne } from "./db";
import { testUsersWhere } from "./test-users";

/**
 * MRR canonique — source de vérité business (P2.12.1 C).
 *
 * Définition unique partagée par tous les écrans (admin.ts, conversion-report.ts,
 * growth/decision) afin qu'un même dataset produise le même MRR quelle que
 * soit la page qui l'affiche.
 *
 *   MRR mensuel = SUM(price_cents / diviseur_intervalle)
 *   WHERE status = 'active' AND user is not test
 *
 * Normalisation des intervalles (règle commerciale Edukora) :
 *   month = /1, quarter = /3 (14700 F → 4900/mois), year = /12.
 *   Sans cette division, un plan trimestriel comptait 3× trop (constat P2.12).
 *
 * `status` est la source de vérité de l'état d'un abonnement, PAS `end_at` :
 *   end_at = date de prochaine échéance, et il n'existe pas de cron
 *   d'expiration qui bascule le statut. Un abonnement dont end_at est passé
 *   mais dont status reste 'active' compte donc toujours — comportement
 *   vérifié par un test métier (data-trust, scénario 5) et volontairement
 *   conservé ici. Ne PAS filtrer sur end_at sans implémenter au préalable
 *   l'expiration automatisée.
 *
 * Le trial n'est pas facturé (0 FCFA) → exclu. Le prix utilisé est celui
 * stocké au moment de l'abonnement, pas le prix actuel du plan.
 */
export async function getCanonicalMRR(): Promise<number> {
  const r = await queryOne<{ v: number | null }>(
    `SELECT COALESCE(SUM(
       COALESCE(s.price_cents, p.price_cents) /
       CASE COALESCE(p.interval, 'month') WHEN 'year' THEN 12 WHEN 'quarter' THEN 3 ELSE 1 END
     ), 0) AS v
     FROM subscriptions s
     LEFT JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.status = 'active'
       AND NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = s.user_id AND (${testUsersWhere("tu")}))`,
  );
  return Math.round(Number(r?.v ?? 0));
}

/**
 * Revenue business + abonnements actifs — source Data Trust (P2.12.1 C).
 *
 * Mêmes filtres que le MRR canonique (actif, non-test ; `status` fait foi,
 * cf. note ci-dessus). Ici PAS de normalisation d'intervalle : `total_cents` /
 * `this_month_cents` reflètent le montant facturé, pas le revenu mensuel
 * récurrent. Chaque métrique conserve sa définition explicite.
 *
 *   total_cents       = SUM(price_cents) WHERE actif AND not test
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
