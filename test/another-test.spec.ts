import { expect, test } from "@playwright/test";

test("b button test", async ({ page }) => {
  const button = await page.locator('[data-test-id="the-button"]');
  await expect(button).toBeVisible();
});
