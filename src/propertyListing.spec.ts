import { test } from '@playwright/test';
import { config } from './config';
import { getSecrets } from './utils/secrets';
import {
  getPropertyIdFromListingURL,
  getRentedPropertyUrl,
} from './utils/daft';
import { getStringFromTemplate } from './utils/template';
import { initStorage, isPropertyApplied, saveProperty } from './utils/storage';

test.beforeEach(async ({ page }) => {
  // Get secrets
  const secrets = await getSecrets();

  // Init storage
  await initStorage();

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

    // Loop through pagination
    for (let pageIndex = 0; pageIndex < config.maxPagesToScan; pageIndex++) {
      // Loop through each listing and apply for property on single page
      const arrayOfLocators = page.locator('[data-testid="results"] > li');
      const listingsCount = await arrayOfLocators.count();

      for (let listingIndex = 0; listingIndex < listingsCount; listingIndex++) {
        const listing = await arrayOfLocators.nth(listingIndex);
        await listing.click();

        await page.waitForNavigation({ waitUntil: 'networkidle' });

        const address = (await page.innerText('[data-testid="address"]'))
          .split(',')
          .pop();
        const propertyId = getPropertyIdFromListingURL(page.url());

        // Skip applied fo
        if (await isPropertyApplied(propertyId)) {
          await page.goBack();
          continue;
        }

        // Click message button if it exists
        try {
          await page.locator('[data-testid="message-btn"]').click();
        } catch (e) {}

        // Wait for replies api because after the response frontend renders the components.
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
        await page.click('[data-testid="submit-button"]');
        await page.waitForResponse('https://gateway.daft.ie/old/v1/reply');

        // Save property in database
        await saveProperty(propertyId);

        await page.goBack();
      }

      // Click next button if exists
      await page.click('[data-testid="go-to-next-page"]');
      await page.waitForNavigation({ waitUntil: 'networkidle' });
    }
  });
});
