import { test, expect } from "@playwright/test";

test("User extracts and verifies button values", async ({ page }) => {
  await page.goto("https://demoqa.com/"); // Navigate to base URL
  await page.getByRole("link", { name: "Elements" }).click(); // By Role and Name
  await expect(page).toHaveURL("https://demoqa.com/elements"); // Assertion: Verify Elements page URL
  await page.getByRole("link", { name: "Buttons" }).click(); // By Role and Name
  await expect(page).toHaveURL("https://demoqa.com/buttons"); // Assertion: Verify Buttons page URL

  const rightClickButton = page.locator("#rightClickBtn"); // By ID
  await expect(rightClickButton).toHaveText("Right Click Me"); // Assertion: Verify button text
});

test("User extracts and verifies input values", async ({ page }) => {
  await page.goto("https://demoqa.com/"); // Navigate to base URL
  await page.getByRole("link", { name: "Forms" }).click(); // By Role and Name
  await expect(page).toHaveURL("https://demoqa.com/forms"); // Assertion: Verify Forms page URL
  await page.getByRole("link", { name: "Practice Form" }).click(); // By Role and Name
  await expect(page).toHaveURL("https://demoqa.com/automation-practice-form"); // Assertion: Verify Practice Form URL

  await expect(page.locator("#userEmail-label")).toHaveText("Email"); // Assertion: Verify label text (By ID)
  const emailField = page.locator("#userEmail"); // By ID
  await expect(emailField).toHaveAttribute("placeholder", "name@example.com"); // Assertion: Verify placeholder attribute

  await emailField.fill("me_adn_15@someone.com"); // Fill input field
  const emailInput = await emailField.inputValue(); // Extract input value
  expect(emailInput).toBe("me_adn_15@someone.com"); // Assertion: Verify filled value
});
