import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax");
  const headingText = await page.locator("h3").textContent();
  await page.getByText('Button Triggering AJAX Request').click();

  testInfo.setTimeout(testInfo.timeout + 2000); // increase timeout for this test by 2 seconds
});


test('timeout e.g. 1', async ({ page }) => {
  const successButton = page.locator('.bg-success');
  await successButton.click();
});


// e.g. to set timeouts in playwright.config.ts (See: https://playwright.dev/docs/test-configuration )

// export default defineConfig({
//   timeout: 10000, // per-test timeout
//   globalTimeout: 60000, // timeout for entire test suite
//   ...
//   use: {
//   ...
//   actionTimeout: 5000, // timeout for individual actions like click, fill, etc. 
//   navigationTimeout: 5000, // timeout for page navigation actions like goto, waitForNavigation, etc.
// },


  test('timeout e.g. 2', async ({ page }) => {
    const successButton = page.locator('.bg-success');
    await successButton.click({ timeout: 9000 }); // override default timeout for this action
  });


test('timeout e.g. 3', async ({ page }) => {
  test.setTimeout(10000); // override default timeout for this test
  const successButton = page.locator('.bg-success');
  await successButton.click();
});

test('timeout e.g. 4', async ({ page }) => {
  test.slow(); // mark test as slow to increase default timeout by 50%
  const successButton = page.locator('.bg-success');
  await successButton.click();
});
