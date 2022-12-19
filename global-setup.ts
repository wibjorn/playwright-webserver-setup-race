import { chromium, FullConfig } from "@playwright/test";

export default async function globalSetup(config: FullConfig) {
  const browser = await chromium.launchPersistentContext("", {
    channel: "msedge",
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/index.html", {
    timeout: 240 * 1000,
    waitUntil: "networkidle",
  });

  await page.context().storageState({ path: `storage-state.json` });

  await browser.close();
}
