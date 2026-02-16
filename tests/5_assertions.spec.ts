import { test, expect } from "@playwright/test";

// single test to demonstrate URL and Page Assertions
test("URL & Page Assertions", async ({ page }) => {
  await page.goto("https://demoqa.com/");

  await expect(page).toHaveTitle(/ToolsQA/); // Would pass if the title contains "ToolsQA" in the tag <title>...</title>

  await page.getByRole("link", { name: "Forms" }).click();
  await expect(page).toHaveURL("https://demoqa.com/forms");
});


// Test suite to demonstrate various assertion types in Playwright
test.describe("Playwright Assertion Types - DemoQA", () => {

  test.beforeEach(async ({ page }) => {
     // Navigate to base URL
    await page.getByRole("link", { name: "Forms" }).click(); // By Role and Name
    await expect(page).toHaveURL("https://demoqa.com/forms"); // Assertion: Verify Forms page URL
    await page.getByRole("link", { name: "Practice Form" }).click(); // By Role and Name
    await expect(page).toHaveURL("https://demoqa.com/automation-practice-form"); // Assertion: Verify Practice Form URL
  });

  test("General Assertions (JS values)", async ({ page }) => {
    const headingText = await page.locator("h1.text-center").textContent();

    expect(headingText).toBe("Practice Form"); // Strict equality
    expect(headingText).toContain("Practice"); // String contains
    expect(headingText?.length).toBeGreaterThan(12); // Boundary length check
    expect(headingText?.length).toBeGreaterThanOrEqual(13); // Length check
    expect(headingText?.length).toBeLessThan(14); // Boundary length check
  });


  test("Locator Assertions (UI with auto-wait)", async ({ page }) => {
    const emailInput = page.locator("#userEmail");
    const emailLabel = page.locator("#userEmail-label");

    await expect(emailInput).toBeVisible(); // Visibility
    await expect(emailLabel).toHaveText("Email"); // Text
    await expect(emailInput).toHaveAttribute("placeholder", "name@example.com"); // Attribute

    await emailInput.fill("test@test.com"); // Fill input field
    await expect(emailInput).toHaveValue("test@test.com"); // Value
  });


  test("State Assertions", async ({ page }) => {
    const maleRadio = page.locator("#gender-radio-1");

    await maleRadio.check({ force: true }); // Force check the radio button (since it's hidden)

    await expect(maleRadio).toBeChecked(); // Assertion: Verify radio button is checked
    await expect(maleRadio).toBeEnabled(); // Assertion: Verify radio button is enabled
  });


  // Soft assertion: does not stop test on failure
  test("Soft Assertions Demo 1", async ({ page }) => {
    const headingText = await page.locator("h1.text-center").textContent();

    expect.soft(headingText).toBe("Practice Form"); // Strict equality (13 characters)
    expect.soft(headingText).toContain("Practice"); // String contains
    expect.soft(headingText?.length).toBeGreaterThan(13); // Assertion will fail, but the test will continue
    expect.soft(headingText?.length).toBeGreaterThanOrEqual(13); // Will pass 
    expect.soft(headingText?.length).toBeLessThan(14); // Will pass
  });

  test("Soft Assertions 2", async ({ page }) => {
    await expect.soft(page.locator("#firstName")).toBeVisible();
    await expect.soft(page.locator("#lastNameeee")).toBeVisible(); // Will fail
    await expect.soft(page.locator("#userEmail")).toBeVisible();

    console.log("Test continues even after failure.");
  });
});
