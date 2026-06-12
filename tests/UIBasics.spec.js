const { test, expect } = require('@playwright/test');

const url = 'https://rahulshettyacademy.com/loginpagePractise/';
test('Browser Context Playwright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
});

test('Enter wrong username and validate error message', async ({ page }) => {
    await page.goto(url);
    console.log(await page.title());
    // await expect(page).toHaveTitle('QA Automation Practice Sites | Playwright, Selenium & API Testing');

    await page.locator('input#username').fill('namankalola');
    await page.locator('[type=password]').fill('12345678');

    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();

    const message = await page.locator('[style*="display: block"]').textContent();
    await expect(page.locator('[style*="display: block"]')).toContainText('Incorrect username/password.');
    console.log(message);
});

test('User should be able to correct username and password and login successfully', async ({ page }) => {
    await page.goto(url);
    console.log(await page.title());
    const username = page.locator('input#username');
    const password = page.locator('[type=password]');
    const terms = page.locator('#terms');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');


    // await expect(page).toHaveTitle('QA Automation Practice Sites | Playwright, Selenium & API Testing');

    await username.fill('namankalola');
    await password.fill('12345678');

    await terms.check();
    await signInBtn.click();

    const message = await page.locator('[style*="display: block"]').textContent();
    await expect(page.locator('[style*="display: block"]')).toContainText('Incorrect username/password.');
    console.log(message);

    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signInBtn.click();

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.nth(2).textContent());
    console.log(await cardTitles.last().textContent());

    const titleCount = await cardTitles.count();
    const allTitles = await cardTitles.allTextContents();
    console.log("Total phones : " + titleCount);
    console.log(allTitles);
});


test('UI Validation', async ({ page }) => {
    await page.goto(url);

    const userName = page.locator('#username');
    const password = page.locator('#password');
    const loginBtn = page.locator('#signInBtn');
    const terms = page.locator('#terms');
    const cardTitles = page.locator('.card-body a');
    const studentDropdown = page.locator('select.form-control');

    await studentDropdown.selectOption('teach');
    console.log(await page.locator('.radiotextsty').last().isChecked());

    await page.locator('.radiotextsty').last().click();

    await page.locator('#okayBtn').click();

    expect(await page.locator('.radiotextsty').last()).toBeChecked();

    console.log(await page.locator('.radiotextsty').last().isChecked());
    console.log(await terms.isChecked());
    await terms.click();
    console.log(await terms.isChecked());
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    expect(await page.locator('a').toHaveAttribute('class', 'blinkingText'));

    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await loginBtn.click();

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.nth(2).textContent());
    console.log(await cardTitles.last().textContent());

    const titleCount = await cardTitles.count();
    const allTitles = await cardTitles.allTextContents();
    console.log("Total phones : " + titleCount);
    console.log(allTitles);

});

test('Child Window handle', async ({ page }) => {
    await page.goto(url);
    const documentLink = page.locator('[href*="documents-request"]');

    const [page2] = await Promise.all([
        page.context().waitForEvent('page'),
        documentLink.click()
    ])
    const text = await page2.locator('.red').textContent();

    const textArray = text.split('@');
    const domain = textArray[1].split(' ')[0];
    console.log(domain);

    const userName = page.locator('#username');
    const password = page.locator('#password');
    const loginBtn = page.locator('#signInBtn');
    const terms = page.locator('#terms');

    await userName.fill(domain);
    await password.fill('Learning@830$3mK2');
    await terms.check();
    
    console.log(await userName.inputValue());

});