import { expect, test } from '@playwright/test'


test('Locator example', async ({ page, context }) => {
  await page.goto('https://playwright.dev/')
  await page.getByText('Get started').click()

  page.locator('input') // By Tag Name
  page.locator('#k-s6m0gyyion') // By ID  
  page.locator('.focus-visible keeper-lock-disabled') // By Class Name
  page.locator('input[type="password"]') // By Attribute
  page.locator(':text("Password")') // By exact text match or exact text match
})


test('User facing locators', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box')

  await page.getByRole('textbox', { name: "name@example.com" }).first().click() // By Role
  await page.getByPlaceholder('Full Name').first().click() // By Placeholder
  await page.getByRole('button', { name: "submit" }).click() // By Role and Name
  await page.getByText('Current Address').click() // By Text
  await page.getByTitle('Text Box').check // By Title
  await page.locator('xpath=//textarea[@id="permanentAddress"]').fill('Iasi') // By XPath
  await expect(page.locator('xpath=//textarea[@id="permanentAddress"]')).toHaveValue('Iasi') // Assertion  
})


test('User identifies Home link via parent container', async ({ page }) => {
  await page.goto('https://demoqa.com/links');

  const homeLink = page.locator('#linkWrapper').locator('a').filter({ hasText: /^Home$/ }) // By Parent Container and Text
  await expect(homeLink).toBeVisible(); // Assertion
  await expect(homeLink).toHaveAttribute('href', 'https://demoqa.com'); //

  await homeLink.click();
  await expect(page).toHaveURL('https://demoqa.com/links'); // Assertion: Verify that the URL is still the same after clicking the Home link
  await page.getByText('Selenium Online Training').check // Assertion: By Text
});


test('User interacts with radio buttons and checkboxes', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button') // By URL
  await page.getByTitle('Radio Button').check // By Title

  await page.getByText('Impressive').click() // By Text
  await expect(page.locator('#impressiveRadio')).toBeChecked() // Assertion
  await expect(page.locator('p.mt-3')).toHaveText('You have selected Impressive') // Assertion

  await page.getByText('Yes').click(); // By Text
  await expect(page.locator('#yesRadio')).toBeChecked() // Assertion
  await expect(page.locator('p.mt-3')).toHaveText('You have selected Yes') // Assertion

  await expect(page.locator('#noRadio')).toBeDisabled() // Assertion
})


test('User interacts with buttons', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');

  // Double Click
  await page.locator('#doubleClickBtn').dblclick();
  await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');

  // Right Click
  await page.locator('#rightClickBtn').click({ button: 'right' });
  await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');

  // Dynamic Click (strict safe)
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();
  await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click');
});
