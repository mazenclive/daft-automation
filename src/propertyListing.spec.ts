import { test, expect, Page } from "@playwright/test";
import { config } from "./config";

test.beforeEach(async ({ page }) => {
  await page.goto(config.APP_RENT_URL);
});

test.describe("rent property application", () => {
  test("apply for property", async () => {});
});
