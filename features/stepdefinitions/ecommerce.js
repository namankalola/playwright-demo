const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'https://rahulshettyacademy.com/client/';

Given('I am login to ecommerce application with username {string} and password {string}', { timeout: 60000 }, async function (username, password) {

    this.email = username;
    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo(url);
    await this.loginPage.login(username, password);

    // await page.waitForLoadState('networkidle');
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.dashboardPageDisplayed();
});

When('I add {string} to cart by clicking on Add To Cart button', async function (product) {
    this.prices = await this.dashboardPage.searchAndAddProductToCart(product);

});

Then('I navigated to cart page and verify {string} is added to cart', async function (product) {
    await this.dashboardPage.clickOnCart();
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.cartPageDisplayed();

});

Then('I validated the total price and proceed to checkout by clicking on Checkout Button', async function () {
    await this.cartPage.unitPriceMatching(this.prices);
    await this.cartPage.clickOnCheckout();
    this.checkoutPage = this.poManager.getCheckoutPage();
    await this.checkoutPage.checkoutPageDisplayed();
});

When('I filled all details in checkout page and click on Place Order button', async function () {
    await this.checkoutPage.fillPersonalInformationForm('4111 1111 1111 1111', '12', '26', '123', 'Naman Kalola', 'rahulshettyacademy', 'India');

    await this.checkoutPage.verifyUserEmailInShippingAddress(this.email);
    // Click on Place Order button
    await this.checkoutPage.clickOnPlaceOrder();
});

Then('I should see the order confirmation message', async function () {
    this.thankyouPage = this.poManager.getThankyouPage();
    await this.thankyouPage.thankYouPageDisplayed();
});

Then('I captured the order ID for future reference', async function () {
    this.orderId = await this.thankyouPage.getOrderId();
    console.log("Order ID : " + this.orderId);
});

When('I navigate to order history page and verify the order ID is present in order history', async function () {
    //Validate Order ID in Order History page
    this.historyPage = this.poManager.getHistoryPage();
    await this.historyPage.clickOnOrderHistory();
    await this.historyPage.orderHistoryPageDisplayed();

});

Then('I clicked on View Order Details link', async function () {
    await this.historyPage.searchOrderIdAndClickViewDetails(this.orderId);
});

Then('I should see the order details in Order Details page', async function () {
    this.orderDetailsPage = this.poManager.getOrderDetailsPage();
    const orderIdFromDetails = await this.orderDetailsPage.getOrderIdFromOrderDetails();
    expect(orderIdFromDetails).toContain(this.orderId, "Order details not displayed for the selected order in Order History");
    console.log("OrderId is matching in Order Details : " + orderIdFromDetails);
    console.log("Order ID in Order Details page : " + orderIdFromDetails);
});

Then('I logout from the application', async function () {
    await this.loginPage.clickOnSignOut();
});

Given('I am login to ecommerce2 application with username {string} and password {string}', async function (username, password) {

    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());
    // await expect(this.page).toHaveTitle('QA Automation Practice Sites | Playwright, Selenium & API Testing');

    await this.page.locator('input#username').fill(username);
    await this.page.locator('[type=password]').fill(password);

    await this.page.locator('#terms').check();
    await this.page.locator('#signInBtn').click();
});

Then('I should see the error message {string}', async function (message) {
    const errorMessage = await this.page.locator('[style*="display: block"]').textContent();
    await expect(this.page.locator('[style*="display: block"]')).toContainText(message);
    console.log(errorMessage);
});
