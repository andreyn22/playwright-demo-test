import { test } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/')
})


test('open playwright.dev home page', async ({ page, context }) => {
  const [GitHubPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a[aria-label="Star microsoft/playwright on GitHub"]').click()
  ])
  
  await GitHubPage.waitForLoadState()
  await GitHubPage.waitForURL('https://github.com/microsoft/playwright')
})


test('navigate to writing tests page', async ({ page }) => {
  await page.getByText('Get started').click()
  await page.waitForURL('https://playwright.dev/docs/intro')
  await page.getByText('How to install Playwright').click()
  await page.waitForURL('https://playwright.dev/docs/intro#installing-playwright')
  await page.getByText('How to run the example test').click()
})


// Other usage of test hooks:

// This test suite will be skipped when running tests
test.describe.skip('This is a skipped test suite', () => {
  test('This is a skipped test case', async ({ page }) => {
    await page.goto('https://playwright.dev/')})})


// This test case will be focused when running tests, and only this test case will be executed    
test.describe.only('This is a focused test suite', () => {
  test('This is a focused test case', async ({ page }) => {
    await page.goto('https://playwright.dev/')})})

// This test will run after each test case in the test suite, and it will navigate back to the home page of Playwright after each test case is executed. 
// This ensures that each test case starts with a clean state and does not interfere with the next test case.
test.afterEach(async ({ page }) => {
    await page.goto('https://playwright.dev/')
}) 

// This test will run after all the test cases in the test suite have been executed, and it will navigate back to the home page of Playwright after all the test cases are executed.
test.afterAll(async ({ page }) => {
    await page.goto('https://playwright.dev/')
}) 