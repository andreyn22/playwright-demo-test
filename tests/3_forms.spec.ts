import { expect, test } from '@playwright/test'
import path from 'path'


test.beforeEach(async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  await page.evaluate(() => {
    document.querySelector('#fixedban')?.remove();
    document.querySelector('footer')?.remove();
  });
});


test('Fill Practice Form and Submit', async ({ page }) => {

  // First Name & Last Name
  await page.locator('#firstName').fill('Andrei')
  await page.locator('#lastName').fill('Batman')

  // Email
  await page.locator('#userEmail').fill('andrei@batman.com')

  // Gender
  await page.locator('#userForm #gender-radio-1').check({ force: true });
  await expect(page.locator('#userForm #gender-radio-1')).toBeChecked();

  // Mobile
  await page.locator('#userNumber').fill('0712345678')

  // Date of Birth (direct fill)
  await page.locator('#dateOfBirthInput').fill('13 Feb 2026')
  await page.keyboard.press('Enter')

  // Subjects (autocomplete)
  await page.locator('#subjectsInput').fill('Maths')
  await page.keyboard.press('Enter')

  // Hobbies
  const form = page.locator('#userForm');

  await form.getByText('Sports', { exact: true }).click();
  await expect(form.getByRole('checkbox', { name: 'Sports' })).toBeChecked();

  await form.getByText('Music', { exact: true }).click();
  await expect(form.getByRole('checkbox', { name: 'Music' })).toBeChecked();

  // Upload picture
  const filePath = path.resolve('tests/fixtures/arigato.jpg')
  await page.locator('#uploadPicture').setInputFiles(filePath)

  // Current Address
  await page.locator('#currentAddress').fill('Strada Test 123, Iasi')

  // State
  await page.locator('#state').click()
  await page.getByText('NCR', { exact: true }).click()

  // City
  await page.locator('#city').click()
  await page.getByText('Delhi', { exact: true }).click()

  // Submit
  await page.locator('#submit').click()

  // Verify modal appears
  await expect(page.locator('.modal-content')).toBeVisible()

  // Verify some submitted data
  await expect(page.locator('.table')).toContainText('Andrei')
  await expect(page.locator('.table')).toContainText('Batman')
  await expect(page.locator('.table')).toContainText('andrei@batman.com')
});
