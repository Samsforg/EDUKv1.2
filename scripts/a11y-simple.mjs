import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const urls = [
    "https://edukora.net/",
    "https://edukora.net/connexion-edukora",
    "https://edukora.net/tarifs",
    "https://edukora.net/plans-d-abonnement-edukora-1",
    "https://edukora.net/accueil-edukora",
    "https://edukora.net/statut",
  ];

  const results = {};

  for (const url of urls) {
    try {
      console.log(`\n🔍 Audit: ${url}`);
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(3500);
      
      const builder = new AxeBuilder({ page });
      const result = await builder.analyze();
      
      results[url] = {
        violations: result.violations?.length ?? 0,
        passes: result.passes?.length ?? 0,
        incomplete: result.incomplete?.length ?? 0,
        details: result.violations,
      };
      
      if (result.violations?.length > 0) {
        console.log(`  ❌ ${result.violations.length} violations:`);
        result.violations.forEach((v) => {
          console.log(`    - [${v.impact}] ${v.id}: ${v.description}`);
          console.log(`      Impact: ${v.impact}, Nodes: ${v.nodes?.length}`);
          if (["color-contrast", "region", "landmark-one-main", "heading-order"].includes(v.id)) {
            (v.nodes || []).slice(0, 8).forEach((n) => {
              const html = (n.html || "").replace(/\s+/g, " ").slice(0, 200);
              console.log(`        > ${html}`);
            });
          }
        });
      } else {
        console.log(`  ✅ No violations`);
      }
    } catch (e) {
      console.error(`  ⚠️ Error: ${e}`);
      results[url] = { error: String(e) };
    }
  }

  await browser.close();

  console.log("\n📊 Summary:");
  for (const [url, data] of Object.entries(results)) {
    if (data.error) {
      console.log(`  ${url}: ⚠️ ${data.error}`);
    } else {
      console.log(`  ${url}: ${data.violations} violations, ${data.passes} passes`);
    }
  }
}

runAudit().catch(console.error);