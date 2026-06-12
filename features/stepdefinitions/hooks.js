const { Before, After, BeforeStep, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
const { DefaultAzureCredential } = require('@azure/identity');
const { getConnectOptions, ServiceOS } = require('@azure/playwright');

setDefaultTimeout(5 * 60 * 1000);

Before(async function () {
    if (process.env.PLAYWRIGHT_SERVICE_URL) {
        const { wsEndpoint, options } = await getConnectOptions({
            os: ServiceOS.LINUX,
            connectTimeout: 3 * 60 * 1000,
            exposeNetwork: '<loopback>',
            credential: new DefaultAzureCredential()
        });

        this.browser = await playwright.chromium.connect(wsEndpoint, options);
        console.log("Connected to Azure Playwright browser");
    } else {
        this.browser = await playwright.chromium.launch({ headless: false });
        console.log("Local browser launched successfully");
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
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
