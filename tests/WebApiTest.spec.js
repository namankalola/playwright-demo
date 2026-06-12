const { test, expect, request } = require('@playwright/test');

const { APIUtils } = require('./utils/APIUtils');

const url = 'https://rahulshettyacademy.com/client/';
const email = 'namankalola@gmail.com';
const loginPayload = { userEmail: email, userPassword: "Welcome@123" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
let response;
let apiUtils;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log(response);
});

async function clickButton(page, button, orderIdValue) {
    const orderHistoryTable = page.locator('h1:has-text("Your Orders") + table');
    await orderHistoryTable.waitFor();

    const rows = orderHistoryTable.locator('tr.ng-star-inserted');
    const orderIds = rows.locator('th[scope="row"]');
    const orderCount = await orderIds.count();
    let orderFound = false;
    for (let i = 0; i < orderCount; i++) {
        const currentOrderId = await orderIds.nth(i).textContent();
        if (currentOrderId.trim() === orderIdValue) {
            console.log("Order ID found in Order History : " + currentOrderId);
            orderFound = true;
            await rows.nth(i).locator("button:has-text('" + button + "')").click();
            break;
        }
    }
}

test('@API Login to Client App', async ({ page }) => {

    const productName = 'ZARA COAT 3';


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);

    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/');


    //Validate Order ID in Order History page
    const orderLink = page.locator('[routerlink="/dashboard/myorders"]');
    await orderLink.first().click();

    const orderId = response.orderId;
    await clickButton(page, 'View', orderId);

    const order = page.locator('small + div');
    await order.waitFor();
    expect(await order.textContent()).toContain(orderId, "Order details not displayed for the selected order in Order History");
    console.log("OrderId is matching in Order Details : " + await order.textContent());

    // await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
    // await clickButton(page, 'Delete', orderIdValue);

    // await expect(page.getByText('Orders Deleted Successfully'), "Order Deleted successfully").toBeVisible();

    const message = await apiUtils.deleteOrder(response.token, orderId);
    await expect(message === 'Orders Deleted Successfully').toBeTruthy();
    console.log("Order Deleted successfully : " + orderId);
});
