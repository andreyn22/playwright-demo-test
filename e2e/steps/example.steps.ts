import { Given, When, Then, After } from '@cucumber/cucumber';
import { expect, Page, Browser, BrowserContext } from '@playwright/test';
import { chromium } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

Given('I navigate to the Playwright website', async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://playwright.dev/');
});

Then('the page title should contain {string}', async (title: string) => {
  await expect(page).toHaveTitle(new RegExp(title));
});

When('I click the {string} link', async (linkName: string) => {
  await page.getByRole('link', { name: linkName }).click();
});

Then('the heading {string} should be visible', async (heading: string) => {
  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
});

After(async () => {
  await context?.close();
  await browser?.close();
});
