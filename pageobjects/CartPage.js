const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProductName = page.locator('div[class="cartSection"] h3');
        this.checkoutButton = page.locator('button:has-text("Checkout")');
    }

    async cartPageDisplayed() {
        await this.cartProductName.first().waitFor();
        await expect(this.cartProductName, 'STORY-123: Selected product should be visible in the cart').toBeVisible();
    }

    async unitPriceMatching(prices) {
        expect(await this.page.locator(".prodTotal p:has-text('" + prices[0] + "')").textContent()).toBe(prices[0]);
        const productUnitPrice = await this.cartProductName.locator('+p').textContent();
        console.log("Product unit price in cart : " + productUnitPrice);
    }

    async clickOnCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };