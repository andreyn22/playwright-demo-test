import { test, expect } from "@playwright/test";


test.describe('TestSuite 1 - Form Controls', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("https://demoqa.com/");
    await page.getByRole("link", { name: "Forms" }).click();
    await expect(page).toHaveURL("https://demoqa.com/forms");
    await page.getByRole("link", { name: "Practice Form" }).click();
    await expect(page).toHaveURL("https://demoqa.com/automation-practice-form");
    await expect(page.locator("h1.text-center")).toHaveText("Practice Form");
  });

  test('Input fields', async ({ page }) => {
    const emailInput = page.locator("#userEmail");

    await emailInput.fill('test@andrei.com');
    await expect(emailInput).toHaveValue('test@andrei.com');

    await emailInput.clear();
    await expect(emailInput).toHaveValue('');

    await emailInput.pressSequentially('supercalifragilisticexpialidocious@andrei.com', { delay: 100 }); // Simulate typing with delay
    await expect(emailInput).toHaveValue('supercalifragilisticexpialidocious@andrei.com');
  });


  test('Radio buttons', async ({ page }) => {
    const userForm = page.locator("#userForm");

    await userForm.getByLabel('Male', { exact: true }).check(); // Exact true to avoid partial match with "Female"
    await expect(userForm.getByLabel('Male', { exact: true })).toBeChecked();


    await userForm.getByLabel('Female').check();
    await expect(userForm.getByLabel('Female')).toBeChecked();


    await userForm.getByLabel('Other').check(); // Force check if it's hidden
    await expect(userForm.getByLabel('Other')).toBeChecked();
  });


  test('Checkboxes 1', async ({ page }) => {
    const userForm = page.locator("#userForm");

    await userForm.getByLabel('Sports').check();
    await expect(userForm.getByLabel('Sports')).toBeChecked();

    await userForm.getByLabel('Reading').check();
    await expect(userForm.getByLabel('Reading')).toBeChecked();

    await userForm.getByLabel('Music').check();
    await expect(userForm.getByLabel('Music')).toBeChecked();

    await userForm.getByLabel('Music').uncheck(); // Uncheck the "Music" checkbox
    await expect(userForm.getByLabel('Music')).not.toBeChecked();

    const allCheckedBoxes = await userForm.locator('input[type="checkbox"]:checked').count(); // Count checked boxes
    expect(allCheckedBoxes).toBe(2); // Verify that 2 checkboxes are remaining checked

    const allUncheckedBoxes = await userForm.locator('input[type="checkbox"]:not(:checked)').count(); // Count unchecked boxes
    expect(allUncheckedBoxes).toBe(1); // Verify that 1 checkbox is unchecked
  });


  test('Checkboxes 2', async ({ page }) => {
    const userForm = page.locator("#userForm");

    const allBoxes = userForm.locator('input[type="checkbox"]');

    for (const box of await allBoxes.all()) { // Loop through all checkboxes and check them
      await box.check();
      expect(await box.isChecked()).toBeTruthy(); // Verify each checkbox is checked
    }

    for (const box of await allBoxes.all()) { // Loop through all checkboxes and uncheck them
      await box.uncheck();
      expect(await box.isChecked()).toBeFalsy(); // Verify all checkboxes are unchecked
    }
  });

});


test.describe('TestSuite 2 - Widgets', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("https://demoqa.com/");
    await page.getByRole("link", { name: "Widgets" }).click();
    await expect(page).toHaveURL("https://demoqa.com/widgets");
    await page.getByRole("link", { name: "Select Menu" }).click();
    await expect(page).toHaveURL("https://demoqa.com/select-menu");
    await expect(page.locator("h1.text-center")).toHaveText("Select Menu");
  });


  test('Dropdowns', async ({ page }) => {
    const oldStyleDropdown = page.locator("#oldSelectMenu");
    await oldStyleDropdown.click();
    await oldStyleDropdown.selectOption("Purple");
    await expect(oldStyleDropdown.locator("option:checked")).toHaveText("Purple");

  });

});


test.describe('TestSuite 3 - Tool Tips', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("https://demoqa.com/");
    await page.getByRole("link", { name: "Widgets" }).click();
    await expect(page).toHaveURL("https://demoqa.com/widgets");
    await page.getByRole("link", { name: "Tool Tips" }).click();
    await expect(page).toHaveURL("https://demoqa.com/tool-tips");
    await expect(page.locator("h1.text-center")).toHaveText("Tool Tips");
  });


  test('Tooltip button', async ({ page }) => {
    const toolTipButton = page.locator("#toolTipButton");
    await toolTipButton.click();
    const toolTipText = await page.locator(".tooltip-inner").textContent();
    // expect(toolTipText).toBe("You hovered over the Button"); // Might be flaky due to timing issues with tooltip appearance
    await expect(toolTipText).toBe("You hovered over the Button");

  });


  test('Tooltip input', async ({ page }) => {
    const toolTipInput = page.locator("#toolTipTextField");
    await toolTipInput.focus();
    const toolTipText = await page.locator(".tooltip-inner").textContent();
    // expect(toolTipText).toBe("You hovered over the text field"); // Might be flaky due to timing issues with tooltip appearance
    await expect(toolTipText).toBe("You hovered over the text field");

  });
});


test.describe('TestSuite 4 - JavaScript Alerts', () => {

  test('JS Alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1500);

    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS Alert');
      await page.waitForTimeout(2000);
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    await page.waitForTimeout(2000);
  });


  test('JS Prompt', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.waitForTimeout(1500);

    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS prompt');
      await page.waitForTimeout(2000);
      await dialog.accept('Playwright');
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText('You entered: Playwright');
    await page.waitForTimeout(2000);
  });

});


test.describe('TestSuite 5 - Web Tables', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("https://demoqa.com/");
    await page.getByRole("link", { name: "Elements" }).click();
    await expect(page).toHaveURL("https://demoqa.com/elements");
    await page.getByRole("link", { name: "Web Tables" }).click();
    await expect(page).toHaveURL("https://demoqa.com/webtables");
    await expect(page.locator("h1.text-center")).toHaveText("Web Tables");
  });


  test('Edit Web Table Row', async ({ page }) => {
    const targetRow = page.getByRole('row', { name: 'alden@example.com' });
    targetRow.getByTitle('Edit').click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Andrei');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Batman');
    await page.getByRole('textbox', { name: 'Age' }).fill('30');
    await page.getByPlaceholder('name@example.com').fill('andrei.batman@example.com');
    await page.getByRole('textbox', { name: 'Salary' }).fill('50000');
    await page.getByRole('textbox', { name: 'Department' }).fill('Testing');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Check the updated row data
    const updatedRow = page.getByRole('row', { name: 'andrei.batman@example.com' });
    await expect(updatedRow).toContainText('Andrei');
    await expect(updatedRow).toContainText('Batman');
    await expect(updatedRow).toContainText('30');
    await expect(updatedRow).toContainText('andrei.batman@example.com');
    await expect(updatedRow).toContainText('50000');
    await expect(updatedRow).toContainText('Testing');
  });


  test('Add New Row in a Table', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Age' }).fill('35');
    await page.getByPlaceholder('name@example.com').fill('john.doe@example.com');
    await page.getByRole('textbox', { name: 'Salary' }).fill('70000');
    await page.getByRole('textbox', { name: 'Department' }).fill('Management');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Check the new row data
    const newRow = page.getByRole('row', { name: 'john.doe@example.com' });
    await expect(newRow).toContainText('John');
    await expect(newRow).toContainText('Doe');
    await expect(newRow).toContainText('35');
    await expect(newRow).toContainText('john.doe@example.com');
    await expect(newRow).toContainText('70000');
    await expect(newRow).toContainText('Management');
  });


  test('Filter Table by Age', async ({ page }) => {
    const searchBox = page.locator('#searchBox');
    const rows = page.locator('tbody tr');
    const headers = page.locator('thead th');
    const headerTexts = await headers.allTextContents(); // Find the index of the "Age" column
    const ageColumnIndex = headerTexts.findIndex(h => h.trim() === 'Age');
    const validAges = ['39', '45', '29'];

    for (const age of validAges) {
      await searchBox.fill(age);
      await expect(rows).toHaveCount(1);
      const ageCell = rows.first().locator('td').nth(ageColumnIndex);
      await expect(ageCell).toHaveText(age); // Verify that the visible row contains the correct age using the dynamic column index
    }
  });


  test('Filter Table by invalid Age', async ({ page }) => {
    const searchBox = page.locator('#searchBox');
    const rows = page.locator('tbody tr');
    const invalidAges = ['999', '-1', 'abcxyz'];

    for (const age of invalidAges) {
      await searchBox.fill(age); // Fill the search box with an invalid age
      await expect(rows).toHaveCount(0);
      await expect(page.locator('.pagination')).toContainText('Page 1 of 0'); // Verify that the pagination shows no results
    }
  });

});


test.describe('TestSuite 6 - Date Picker', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("https://demoqa.com/automation-practice-form");
  });


  test('Calendar opens on input click', async ({ page }) => {
    await page.locator('#dateOfBirthInput').click();
    await expect(page.locator('.react-datepicker')).toBeVisible();
  });


  test('Calendar closes after selecting date', async ({ page }) => {
    await page.locator('#dateOfBirthInput').click();
    await page.locator('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)').click();
    await expect(page.locator('.react-datepicker')).not.toBeVisible();
  });


  test('Navigate to next month using arrow', async ({ page }) => {
    await page.locator('#dateOfBirthInput').click();
    await page.locator('.react-datepicker__navigation--next').click();

    const monthLabel = page.locator('.react-datepicker__current-month');
    await expect(monthLabel).not.toBeEmpty();
  });


  test('Set date of birth by typing into input', async ({ page }) => {
    await page.locator("#dateOfBirthInput").fill("23 Jun 2026");
    await page.keyboard.press("Enter");

    await expect(page.locator("#dateOfBirthInput")).toHaveValue("23 Jun 2026");
  });


  test('Select date of birth using date picker UI', async ({ page }) => {
    await page.locator("#dateOfBirthInput").click();
    await page.locator(".react-datepicker__year-select").selectOption("2026");
    await page.locator(".react-datepicker__month-select").selectOption("5");
    await page.locator(".react-datepicker__day--023:not(.react-datepicker__day--outside-month)").click();

    await expect(page.locator("#dateOfBirthInput")).toHaveValue("23 Jun 2026");
  });


  test('Select date depending of current date', async ({ page }) => {
    let date = new Date();

    /*JS Date object reference for date manipulation  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date */
    date.setDate(date.getDate() + 7); // Set date to 7 days in the future
    const futureDay = String(date.getDate()).padStart(2, '0'); // Get day with leading zero
    const futureMonth = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
    const futureYear = date.getFullYear(); // Get year

    await page.locator("#dateOfBirthInput").click();
    await page.locator(".react-datepicker__year-select").selectOption(String(futureYear));
    await page.locator(".react-datepicker__month-select").selectOption(String(date.getMonth()));
    await page.locator(`.react-datepicker__day--0${futureDay}:not(.react-datepicker__day--outside-month)`).click();

    await expect(page.locator("#dateOfBirthInput")).toHaveValue(`${futureDay} ${futureMonth} ${futureYear}`);
  });


  test('Select Feb 29 in leap year', async ({ page }) => {
    await page.locator('#dateOfBirthInput').click();
    await page.locator('.react-datepicker__year-select').selectOption('2028'); // Select a leap year
    await page.locator('.react-datepicker__month-select').selectOption('1'); // February
    await page.locator('.react-datepicker__day--029:not(.react-datepicker__day--outside-month)').click();

    await expect(page.locator('#dateOfBirthInput')).toHaveValue('29 Feb 2028');
  });


  test('Reject invalid date input', async ({ page }) => {
    await page.locator('#dateOfBirthInput').fill('99 Foo 9999');
    await page.keyboard.press('Enter');

    await expect(page.locator('#dateOfBirthInput')).not.toHaveValue('99 Foo 9999');
  });


  test('Select date using keyboard navigation', async ({ page }) => {
    await page.locator('#dateOfBirthInput').click();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await expect(page.locator('#dateOfBirthInput')).not.toBeEmpty();
  });
});


test.describe('TestSuite 7 - Sliders', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/widgets");
    await page.getByRole("link", { name: "Slider" }).click();
    await expect(page).toHaveURL("https://demoqa.com/slider");
  });


  test('Set slider value programmatically via input', async ({ page }) => {
    const slider = page.locator("#slider");
    const sliderValue = page.locator("#sliderValue");

    await slider.fill("0"); // set to minimum
    await expect(sliderValue).toHaveValue("0");

    await slider.fill("50"); // set to middle value
    await expect(sliderValue).toHaveValue("50");

    await slider.fill("100"); // set to maximum
    await expect(sliderValue).toHaveValue("100");
  });


  test('Adjust slider using user  keyboard interaction', async ({ page }) => {
    const slider = page.locator("#slider");
    const sliderValue = page.locator("#sliderValue");

    await slider.click(); // focus slider

    await page.keyboard.press('Home'); // move to min (0)
    await expect(sliderValue).toHaveValue("0");

    await page.keyboard.press('End'); // move to max (100)
    await expect(sliderValue).toHaveValue("100");

    await page.keyboard.press('ArrowLeft'); // decrease by step
    await expect(sliderValue).toHaveValue("99");
  });


  test('Adjust slider using mouse interaction', async ({ page }) => {
    const slider = page.locator('#slider');
    const sliderValue = page.locator('#sliderValue');

    const box = await slider.boundingBox();
    if (!box) throw new Error('Slider not visible');

    const y = box.y + box.height / 2;
    const margin = 2; // avoid exact edge clicks

    await page.mouse.click(box.x + margin, y);
    await expect(sliderValue).toHaveValue('0'); // Move to 0

    await page.mouse.click(box.x + box.width / 2, y);
    await expect(sliderValue).toHaveValue('50'); // Move to 50      

    await page.mouse.click(box.x + box.width - margin, y);
    await expect(sliderValue).toHaveValue('100'); // Move to 100

    await page.mouse.click(box.x + box.width * 0.75, y); // Move to 75
    const current = parseInt(await sliderValue.inputValue(), 10);
    expect(current).toBeGreaterThanOrEqual(74);
    expect(current).toBeLessThanOrEqual(76);
  });
});


test.describe('TestSuite 8 - Frames', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/frames");
    await expect(page).toHaveURL("https://demoqa.com/frames");
    await expect(page.locator("h1.text-center")).toHaveText("Frames");
  });


  test('Verify text inside first frame', async ({ page }) => {
    const frame = page.frameLocator('#frame1');

    await expect(frame.locator('#sampleHeading')).toHaveText('This is a sample page');
  });


  test('Verify text inside second frame', async ({ page }) => {
    const frame = page.frameLocator('#frame2');

    await expect(frame.locator('#sampleHeading')).toHaveText('This is a sample page');
  });


  test('Verify frames are independent', async ({ page }) => {
    const frame1 = page.frameLocator('#frame1');
    const frame2 = page.frameLocator('#frame2');

    await expect(frame1.locator('#sampleHeading')).toBeVisible();
    await expect(frame2.locator('#sampleHeading')).toBeVisible();
  });
});
