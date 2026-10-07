/**
 * P1.6 F7 — unités price_cents : legacy naming, valeur = FCFA entiers.
 *
 * `subscriptions.price_cents` / `subscription_plans.price_cents` stockent
 * des FCFA (currency = XOF, pas de sous-unité) : 4900 = 4 900 FCFA.
 * L'ancien formatFcfa divisait par 100 → « 49 FCFA » au lieu de
 * « 4 900 FCFA » dans les rapports WhatsApp/email/admin (F7).
 *
 * Aucune migration de données, aucun changement de pricing : seule la
 * couche affichage est alignée sur la réalité (règle P1.6 §14).
 */
import { formatFcfa } from "@/lib/conversion-report";

const fr = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

describe("F7 — formatFcfa affiche des FCFA entiers (plus de division par 100)", () => {
  test("4900 → « 4 900 FCFA » (plan Réussite mensuel)", () => {
    expect(formatFcfa(4900)).toBe(`${fr(4900)} FCFA`);
    expect(formatFcfa(4900)).not.toContain(fr(49));
  });

  test("14700 → « 14 700 FCFA » (plan Trimestriel)", () => {
    expect(formatFcfa(14700)).toBe(`${fr(14700)} FCFA`);
  });

  test("63790 → « 63 790 FCFA » (MRR canonique P1.5)", () => {
    expect(formatFcfa(63790)).toBe(`${fr(63790)} FCFA`);
  });

  test("0 → « 0 FCFA » (plan Découverte)", () => {
    expect(formatFcfa(0)).toBe("0 FCFA");
  });
});
