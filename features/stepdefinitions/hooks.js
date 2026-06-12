const { Before, After, BeforeStep, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

setDefaultTimeout(60 * 1000);

Before(async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
    console.log("Browser launched successfully");
});

After(async function () {
    await this.context?.close();
    await this.browser?.close();
    console.log("Browser closed successfully");
});

BeforeStep(async function () {});

AfterStep(async function ({result}) {
    if (result.status === Status.FAILED) {
        console.log("Step failed");
        await this.page.screenshot({ path: `./screenshots/${Date.now()}.png`, fullPage: true });
    }
});
