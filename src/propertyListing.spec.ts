import { Page, test } from '@playwright/test';
import { config } from './config';
import { getSecrets } from './utils/secrets';

test.beforeEach(async ({ page }) => {
  // Get secrets
  const secrets = await getSecrets();

  // Visit home page
  await page.goto(config.APP_BASE_URL);

  // Accept cookies
  await page.locator('text=Accept All').click();

  // Authenticate flow
  await page.locator('text=Sign in').click();
  await page.fill('[name=username]', secrets.auth.username);
  await page.fill('[name=password]', secrets.auth.password);
  await page.locator('[type=submit]').click();
});

test.describe('rent property application', () => {
  test('apply for property', async ({ page }) => {
    await page.waitForTimeout(1000 * 60 * 10);
  });
});
