import { test } from '@playwright/test';
import { config } from './config';
import { getSecrets } from './utils/secrets';
import { getRentedPropertyUrl } from './utils/daft';

test.beforeEach(async ({ page }) => {
  // Get secrets
  const secrets = await getSecrets();

  // Visit home page
  await page.goto(config.daft.baseUrl);

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
    // Visit listing page
    await page.goto(getRentedPropertyUrl(config));

    await page.waitForTimeout(1000 * 60 * 10);
  });
});
