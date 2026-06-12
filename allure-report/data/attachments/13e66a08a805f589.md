# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPage.spec.js >> @Web Place Order for IPHONE 13 PRO
- Location: tests\ClientAppPage.spec.js:9:5

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('.card-body').first() to be visible

```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | 
  3  | class DashboardPage {
  4  | 
  5  |     constructor(page) {
  6  |         this.page = page;
  7  |         this.products = page.locator('.card-body');
  8  |         this.productText = page.locator('.card-body b');
  9  |         this.cart = page.locator('[routerlink="/dashboard/cart"]');
  10 | 
  11 |     }
  12 | 
  13 | 
  14 | 
  15 |     async clickOnCart() {
  16 |         await this.cart.click();
  17 |     }
  18 | 
  19 |     async dashboardPageDisplayed() {
> 20 |         await this.products.first().waitFor();
     |                                     ^ Error: locator.waitFor: Target page, context or browser has been closed
  21 |     }
  22 | 
  23 |     async searchAndAddProductToCart(productName) {
  24 |         const count = await this.products.count();
  25 |         const prices = [];
  26 |         console.log(count);
  27 |         let productFound = false;
  28 |         for (let i = 0; i < count; i++) {
  29 |             if ((await this.products.nth(i).locator('b').textContent()).toLowerCase() === productName.toLowerCase()) {
  30 |                 const price = await this.products.nth(i).locator('div div').textContent();
  31 |                 prices.push(price);
  32 |                 await this.products.nth(i).locator('text= Add To Cart').click();
  33 |                 console.log("Product added to cart : " + productName + " with price : " + price);
  34 |                 productFound = true;
  35 |                 break;
  36 |             }
  37 |         }
  38 |         if (!productFound) {
  39 |             console.log("Product not found : " + productName);
  40 |         }
  41 |         return prices;
  42 |     }
  43 | }
  44 | 
  45 | module.exports = { DashboardPage };
```