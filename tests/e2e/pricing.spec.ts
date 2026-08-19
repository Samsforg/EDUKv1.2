import { test, expect } from "@playwright/test";

test.describe("A/B tarifs", () => {
  test("variante A : page classique (contrôle)", async ({ page }) => {
    await page.goto("/tarifs?ab_variant=A");
    await expect(page.getByRole("heading", { name: "Un investissement pour ton futur" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Essayer gratuitement" }).first()).toBeVisible();
    await expect(page.locator("text=OFFRE RENTRÉE -30%")).toHaveCount(0);
    await expect(page.getByText("Populaire")).toBeVisible();
    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === "ab_pricing")?.value).toBe("A");
  });

  test("variante B : 3 cartes avec prix promotionnels RENTREE30", async ({ page }) => {
    await page.goto("/tarifs?ab_variant=B");
    await expect(page.getByRole("heading", { name: "Un investissement pour ton futur" })).toBeVisible();
    await expect(page.locator("text=OFFRE RENTRÉE -30%")).toBeVisible();
    await expect(page.locator("text=3 430 FCFA").first()).toBeVisible();
    await expect(page.locator("text=Premium Réussite Trimestriel")).toBeVisible();
    await expect(page.locator("text=14 700 FCFA")).toBeVisible();
    await expect(page.getByRole("link", { name: /Profiter de -30%/ })).toBeVisible();
    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === "ab_pricing")?.value).toBe("B");
  });

  test("le cookie d'attribution reste stable entre deux visites", async ({ page }) => {
    await page.goto("/tarifs?ab_variant=B");
    await page.goto("/tarifs");
    await expect(page.locator("text=OFFRE RENTRÉE -30%")).toBeVisible();
    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === "ab_pricing")?.value).toBe("B");
  });

  test("la page d'abonnement applique le code RENTREE30 (-30%)", async ({ page }) => {
    await page.goto("/plans-d-abonnement-edukora-1");
    await page.waitForSelector("#price-container", { state: "visible", timeout: 30000 });
    const base = Number(await page.getAttribute("#price-container", "data-price-month"));
    expect(base).toBe(4900);
    await page.fill("#promo-input", "RENTREE30");
    await page.click("#promo-apply");
    const status = page.locator("#promo-status");
    await expect(status).toBeVisible({ timeout: 15000 });
    const price = await page.textContent("#price-value");
    expect(price!.replace(/\s/g, "")).toBe("3430");
  });
});