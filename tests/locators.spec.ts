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
  await expect (page.locator('xpath=//textarea[@id="permanentAddress"]')).toHaveValue('Iasi') // Assertion  
})


test('User faces radio buttons and checkboxes', async ({ page }) => {
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