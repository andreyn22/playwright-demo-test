import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  const headingText = await page.locator("h3").textContent();
  await page.getByText('Button Triggering AJAX Request').click();
  // Triggers AJAX call that loads success message after delay (AJAX = Asynchronous JavaScript And XML)
});


// Demonstrates Playwright's built-in auto-waiting on click()
test("Auto-wait via locator.click()", async ({ page }) => {
  const successButton = page.locator('.bg-success');

  await successButton.click();
  // click() automatically waits for element to be visible & enabled

  const successButtonText = await successButton.textContent();
  expect(successButtonText).toBe("Data loaded with AJAX get request.");
});


// Demonstrates explicit locator.waitFor()
test("Explicit wait using locator.waitFor()", async ({ page }) => {
  const successButton = page.locator('.bg-success');

  await successButton.waitFor({ state: "attached" });
  // Wait until element is attached to DOM (not necessarily visible)

  const successButtonText = await successButton.allTextContents();
  expect(successButtonText).toContain("Data loaded with AJAX get request.");
});


// Demonstrates auto-waiting built into expect()
test("Auto-wait via expect().toHaveText()", async ({ page }) => {
  const successButton = page.locator('.bg-success');

  await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
  // expect() retries automatically until timeout
});


//  Alternative explicit wait (not preferred over locator-based waits)
test("Alternative wait using page.waitForSelector()", async ({ page }) => {
  const successButton = page.locator('.bg-success');

  await page.waitForSelector('.bg-success');
  // Wait for selector to appear (legacy style)

  const successButtonText = await successButton.allTextContents();
  expect(successButtonText).toContain("Data loaded with AJAX get request.");
});


// Network-level wait
test("Alternative wait using page.waitForResponse()", async ({ page }) => {
  const successButton = page.locator('.bg-success');

  await page.waitForResponse('http://uitestingplayground.com/ajaxdata');
  // Wait until specific AJAX response is received

  const successButtonText = await successButton.allTextContents();
  expect(successButtonText).toContain("Data loaded with AJAX get request.");
});


// Last-resort network idle wait
test("Alternative wait using page.waitForLoadState('networkidle')", async ({ page }) => {
  const successButton = page.locator('.bg-success');

  await page.waitForLoadState('networkidle');
  // Wait until no network activity (not recommended unless necessary)

  const successButtonText = await successButton.allTextContents();
  expect(successButtonText).toContain("Data loaded with AJAX get request.");
});
