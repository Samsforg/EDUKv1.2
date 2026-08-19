import type { Page } from "@playwright/test";

export const unique = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
export const password = "Azerty123!";

export async function acceptConsentIfVisible(page: Page) {
  const btn = page.getByRole("button", { name: "Tout accepter" });
  try {
    await btn.waitFor({ state: "visible", timeout: 4000 });
    await btn.click();
  } catch {}
}

export async function registerStudentViaUI(page: Page, email: string, firstName: string, lastName: string, niveau = "3ème") {
  await page.goto("/inscription-1-2-edukora");
  await page.waitForSelector('input#firstName', { state: "visible" });
  await acceptConsentIfVisible(page);

  await page.getByRole("button", { name: "Élève" }).click();
  await page.fill('input#firstName', firstName);
  await page.fill('input#lastName', lastName);
  await page.fill('input#email', email);
  await page.fill('input#password', password);
  await page.check('input#acceptPrivacy');
  await page.locator("select").nth(1).selectOption({ label: niveau });
  await page.click('button:has-text("Créer mon compte")');
  await page.waitForURL((url) => ["/accueil-edukora", "/bienvenue"].includes(url.pathname), { timeout: 15000 });
  return noAccent(niveau);
}

function noAccent(niveau: string): string {
  const map: Record<string, string> = { "3ème": "BEPC", "1ère": "BAC", Terminale: "BAC" };
  return map[niveau] ?? "BAC";
}