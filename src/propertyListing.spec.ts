import { test } from '@playwright/test';
import { config } from './config';
import { getSecrets } from './utils/secrets';
import { getRentedPropertyUrl } from './utils/daft';
import { getStringFromTemplate } from './utils/template';
import { initStorage } from './utils/storage';

test.beforeEach(async ({ page }) => {
  // Init storage
  await initStorage();

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

    // Loop through each listing and apply for property on single page
    const arrayOfLocators = page.locator('[data-testid="results"] > li');
    const listingsCount = await arrayOfLocators.count();

    for (let index = 0; index < listingsCount; index++) {
      const listing = await arrayOfLocators.nth(index);
      await listing.click();

      const address = (await page.innerText('[data-testid="address"]'))
        .split(',')
        .pop();

      await page.click('[data-testid="message-btn"]');

      // Wait for replies api because after the response frontend renders the compoents.
      await page.waitForResponse(
        /https:\/\/gateway\.daft\.ie\/api\/v1\/users.*/
      );

      // Submit form
      await page.fill('[name="name"]', config.contactInfo.fullName);
      await page.fill('[name="email"]', config.contactInfo.emailId);
      await page.fill('[name="phone"]', config.contactInfo.contactNumber);
      await page.fill(
        '[name="message"]',
        getStringFromTemplate(config.contactInfo.messageTemplate, { address })
      );
      // await page.click('[data-testid="submit-button"]');
      // await page.waitForResponse('https://gateway.daft.ie/old/v1/reply');

      await page.goBack();
    }

    await page.waitForTimeout(1000 * 60 * 10);
  });
});
