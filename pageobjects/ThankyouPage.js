const { expect } = require('@playwright/test');
class ThankyouPage {
    constructor(page) {
        this.page = page;
        this.thankYouMessage = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    async thankYouPageDisplayed() {
        await this.thankYouMessage.waitFor();
        expect(this.thankYouMessage).toHaveText(' Thankyou for the order. ', "Thank you page not displayed after placing the order");
    }

    async getOrderId() {
        const orderIdText = await this.orderId.textContent();
        const orderIdValue = orderIdText.split('|')[1].trim();
        return orderIdValue;
    }
}

module.exports = { ThankyouPage };