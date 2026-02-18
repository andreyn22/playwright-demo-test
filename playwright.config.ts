import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests', // folder containing test files

  /* e.g. to set timeouts in playwright.config.ts (See: https://playwright.dev/docs/test-configuration ) */
  // timeout: 10000, // per-test timeout
  // globalTimeout: 60000, // timeout for entire test suite

  /* Run tests in files in parallel */
  fullyParallel: false, // set true to enable full parallel mode

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI, // prevents committing test.only in CI

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, // retries failed tests only in CI

  /* Opt out of parallel tests on CI. */
  workers: 1,   // workers: process.env.CI ? 1 : undefined -> allow multiple workers locally if needed

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html', // generates HTML report after execution

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000', // base URL for relative navigation

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry', // captures trace only on first retry

    headless: true, // runs browser in headed mode (visible UI)

    // actionTimeout: 5000, // timeout for individual actions like click, fill, etc.
    // navigationTimeout: 5000, // timeout for page navigation actions like goto, waitForNavigation, etc.

    launchOptions: {
      slowMo: 3000 // slows down each Playwright action by 1000ms
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium', // Google Chrome engine
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox', // Mozilla Firefox engine
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit', // Safari engine
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome', // emulates Pixel 5 device
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari', // emulates iPhone 12 device
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge', // runs tests in installed Edge browser
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome', // runs tests in installed Chrome browser
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start', // command to start local app
  //   url: 'http://localhost:3000', // expected app URL
  //   reuseExistingServer: !process.env.CI, // reuse server locally if already running
  // },
});
