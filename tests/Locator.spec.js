const { test, expect } = require('@playwright/test');


test('Locator Practice', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    console.log(await page.title());

    const checkbox = page.getByLabel('Check me out if you Love IceCreams!');
    const employmentRadio = page.getByLabel('Employed');
    const genderSelect = page.getByLabel('Gender');
    const passwordInput = page.getByPlaceholder('Password');
    const emailInput = page.locator('[name="email"]');
    const nameInput = page.locator('[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });


    await checkbox.check();
    await employmentRadio.check();
    await genderSelect.selectOption('Female');
    await passwordInput.fill('Welcome@123');
    await emailInput.fill('john.doe@example.com');
    await nameInput.first().fill('John Doe');
    await submitButton.click();

    await page.getByText('Success! The Form has been submitted successfully!.').waitFor();
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();

    await page.getByRole('Link', { name: 'Shop' }).click();

    await page.locator('h1:has-text("Shop Name")').waitFor();

    await page.locator('app-card').filter({ hasText: 'Samsung Note 8' }).getByRole('button', { name: 'Add' }).click();


});

test("More Validations", async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.locator('#displayed-text')).toBeVisible();

    await page.locator('#hide-textbox').click();

    await expect(page.locator('#displayed-text')).toBeHidden();

    page.on('dialog', dialog => dialog.accept());

    await page.locator('#confirmbtn').click();

    await page.locator('#mousehover').hover();

    const framePage = await page.frameLocator('#courses-iframe');

    await framePage.locator('li a[href="lifetime-access"]:visible').click();

    const text = await framePage.locator('.text h2').textContent();

    console.log(text.split(" ")[1]);

});

test("Screenshots & Visual validations", async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.locator('#displayed-text')).toBeVisible();

    await page.locator('#displayed-text').screenshot({ path: './screnshots/screenshot1.png' });

    await page.locator('#hide-textbox').click();

    await page.screenshot({ path: './screnshots/screenshot.png', fullPage: true });

    await expect(page.locator('#displayed-text')).toBeHidden();
});

test("Visual Validation", async ({ page }) => { 
    await page.goto('https://www.paypal.com/in/home');

    expect(await page.screenshot()).toMatchSnapshot('paypal-homepage.png');
});