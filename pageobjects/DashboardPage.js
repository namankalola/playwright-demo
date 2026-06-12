const { expect } = require('@playwright/test');

class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink="/dashboard/cart"]');

    }



    async clickOnCart() {
        await this.cart.click();
    }

    async dashboardPageDisplayed() {
        await this.products.first().waitFor();
    }

    async searchAndAddProductToCart(productName) {
        const count = await this.products.count();
        const prices = [];
        console.log(count);
        let productFound = false;
        for (let i = 0; i < count; i++) {
            if ((await this.products.nth(i).locator('b').textContent()).toLowerCase() === productName.toLowerCase()) {
                const price = await this.products.nth(i).locator('div div').textContent();
                prices.push(price);
                await this.products.nth(i).locator('text= Add To Cart').click();
                console.log("Product added to cart : " + productName + " with price : " + price);
                productFound = true;
                break;
            }
        }
        if (!productFound) {
            console.log("Product not found : " + productName);
        }
        return prices;
    }
}

module.exports = { DashboardPage };