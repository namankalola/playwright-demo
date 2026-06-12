const { test, expect } = require('@playwright/test');

const url = 'https://rahulshettyacademy.com/client/';


test('Login to Client App', async ({ page }) => {

    const productName = 'ZARA COAT 3';
    const email = 'namankalola@gmail.com';
    await page.goto(url);
    console.log(await page.title());

    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Welcome@123');
    await page.locator('#login').click();

    // await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const prodList = await page.locator('.card-body b').allTextContents();
    console.log(prodList);

    const products = page.locator('.card-body');
    const cart = page.locator('[routerlink="/dashboard/cart"]');
    const cartProductName = page.locator('div[class="cartSection"] h3');

    const count = await products.count();
    const prices = [];
    console.log(count);
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            const price = await products.nth(i).locator('div div').textContent();
            prices.push(price);
            await products.nth(i).locator('text= Add To Cart').click();
            console.log("Product added to cart : " + productName + " with price : " + price);
            break;
        }
    }

    await cart.click();
    await cartProductName.first().waitFor();
    await expect(cartProductName, 'STORY-123: Selected product should be visible in the cart').toBeVisible();
    expect(await page.locator(".prodTotal p:has-text('" + prices[0] + "')").textContent()).toBe(prices[0]);
    const productUnitPrice = await cartProductName.locator('+p').textContent();
    console.log("Product unit price in cart : " + productUnitPrice);

    // Click on Checkout button

    const checkoutButton = page.locator('button:has-text("Checkout")');
    await checkoutButton.click();

    // Fill the personal Information form
    const placeOrderButton = page.locator('.actions a:has-text("Place Order")');
    const creditCardInput = page.locator("div:has-text('Credit Card Number') input");
    const expiryMonthSelect = page.locator("div:has-text('Expiry Date') select");
    const expiryYearSelect = page.locator("div:has-text('Expiry Date') select + select");
    const cVVInput = page.locator("div:has-text('CVV Code') input");
    const nameOnCardInput = page.locator("div:has-text('Name on Card') input");
    const applyCouponInput = page.locator("div:has-text('Apply Coupon') input");
    const countryInput = page.locator("[placeholder='Select Country']");
    const countryDropdown = page.locator('.ta-results');

    await placeOrderButton.waitFor();
    await creditCardInput.first().fill('4111 1111 1111 1111');
    // console.log("Credit card input field count : " + await creditCardInput.count());
    await expiryMonthSelect.first().selectOption('12');
    await expiryYearSelect.first().selectOption('26');
    await cVVInput.first().fill('123');
    await nameOnCardInput.first().fill('Naman Kalola');
    await applyCouponInput.first().fill('rahulshettyacademy');

    await countryInput.pressSequentially('India', { delay: 150 });
    await countryDropdown.first().waitFor();

    // await countryDropdown.locator('.ta-results button span i:has-text("India")').click();

    const optionsCount = await countryDropdown.locator('button').count();
    console.log("Country dropdown options count : " + optionsCount);

    for (let i = 0; i < optionsCount; i++) {
        const optionText = await countryDropdown.locator('button').nth(i).textContent();
        if (optionText.trim() === 'India') {
            await countryDropdown.locator('button').nth(i).click();
            console.log("Selected country : " + optionText);
            break;
        }
    }

    expect(await page.locator('div.user__name label')).toHaveText(email, 'STORY-124: Name on card should be displayed in the order summary');
    // Click on Place Order button
    await placeOrderButton.click();

    const thankYouMessage = page.locator('.hero-primary');
    await thankYouMessage.waitFor();
    expect(thankYouMessage).toHaveText(' Thankyou for the order. ', "Thank you page not displayed after placing the order");

    const orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    const orderIdText = await orderId.textContent();
    const orderIdValue = orderIdText.split('|')[1].trim();
    console.log("Order ID : " + orderIdValue);

    //Validate Order ID in Order History page
    const orderLink = page.locator('[routerlink="/dashboard/myorders"]');
    await orderLink.first().click();

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
            await rows.nth(i).locator('button:has-text("View")').click();
            break;
        }
    }

    const order = page.locator('small + div');
    await order.waitFor();
    expect(await order.textContent()).toContain(orderIdValue, "Order details not displayed for the selected order in Order History");
    console.log("OrderId is matching in Order Details : " + await order.textContent());

});
