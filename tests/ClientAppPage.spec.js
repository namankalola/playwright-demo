const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const testData = require('./testdata/ClientAppTestData.json');


const url = 'https://rahulshettyacademy.com/client/';

for (const data of testData) {
    test('@Web Place Order for ' + data.productName, async ({ page }) => {

        const productName = data.productName;
        const email = data.email;
        const password = data.password;

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo(url);
        await loginPage.login(email, password);

        // await page.waitForLoadState('networkidle');
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.dashboardPageDisplayed();
        const prices = await dashboardPage.searchAndAddProductToCart(productName);
        await dashboardPage.clickOnCart();

        const cartPage = poManager.getCartPage();
        await cartPage.cartPageDisplayed();
        await cartPage.unitPriceMatching(prices);

        // Click on Checkout button
        await cartPage.clickOnCheckout();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.checkoutPageDisplayed();

        await checkoutPage.fillPersonalInformationForm('4111 1111 1111 1111', '12', '26', '123', 'Naman Kalola', 'rahulshettyacademy', 'India');

        await checkoutPage.verifyUserEmailInShippingAddress(email);
        // Click on Place Order button
        await checkoutPage.clickOnPlaceOrder();

        const thankyouPage = poManager.getThankyouPage();

        await thankyouPage.thankYouPageDisplayed();

        const orderIdValue = await thankyouPage.getOrderId();
        console.log("Order ID : " + orderIdValue);

        //Validate Order ID in Order History page
        const historyPage = poManager.getHistoryPage();
        await historyPage.clickOnOrderHistory();
        await historyPage.orderHistoryPageDisplayed();
        await historyPage.searchOrderIdAndClickViewDetails(orderIdValue);


        const orderDetailsPage = poManager.getOrderDetailsPage();
        const orderIdFromDetails = await orderDetailsPage.getOrderIdFromOrderDetails();

        expect(orderIdFromDetails).toContain(orderIdValue, "Order details not displayed for the selected order in Order History");
        console.log("OrderId is matching in Order Details : " + orderIdFromDetails);
        console.log("Order ID in Order Details page : " + orderIdFromDetails);

        await loginPage.clickOnSignOut();
    });
}
