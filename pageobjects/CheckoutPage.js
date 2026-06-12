const { expect } = require('@playwright/test');
class CheckoutPage {
    constructor(page) {
        this.page = page;
        // Fill the personal Information form
        this.placeOrderButton = page.locator('.actions a:has-text("Place Order")');
        this.creditCardInput = page.locator("div:has-text('Credit Card Number') input");
        this.expiryMonthSelect = page.locator("div:has-text('Expiry Date') select");
        this.expiryYearSelect = page.locator("div:has-text('Expiry Date') select + select");
        this.cVVInput = page.locator("div:has-text('CVV Code') input");
        this.nameOnCardInput = page.locator("div:has-text('Name on Card') input");
        this.applyCouponInput = page.locator("div:has-text('Apply Coupon') input");
        this.countryInput = page.locator("[placeholder='Select Country']");
        this.countryDropdown = page.locator('.ta-results');
        this.userNameLabel = page.locator('div.user__name label');
    }

    async checkoutPageDisplayed() {
        await this.placeOrderButton.waitFor();
    }

    async fillPersonalInformationForm(cardNumber, expiryMonth, expiryYear, cvv, nameOnCard, couponCode, country) {
        await this.creditCardInput.first().fill(cardNumber);
        await this.expiryMonthSelect.first().selectOption(expiryMonth);
        await this.expiryYearSelect.first().selectOption(expiryYear);
        await this.cVVInput.first().fill(cvv);
        await this.nameOnCardInput.first().fill(nameOnCard);
        await this.applyCouponInput.first().fill(couponCode);
        await this.countryInput.first().pressSequentially(country, { delay: 150 });
        await this.countryDropdown.first().waitFor();
        
        const optionsCount = await this.countryDropdown.locator('button').count();
        console.log("Country dropdown options count : " + optionsCount);

        for (let i = 0; i < optionsCount; i++) {
            const optionText = await this.countryDropdown.locator('button').nth(i).textContent();
            if (optionText.trim() === country) {
                await this.countryDropdown.locator('button').nth(i).click();
                console.log("Selected country : " + optionText);
                break;
            }
        }
    }

    async verifyUserEmailInShippingAddress(expectedName) {
        await this.userNameLabel.waitFor();
        expect(await this.userNameLabel.textContent()).toContain(expectedName);
    }

    async clickOnPlaceOrder() {
        await this.placeOrderButton.click();
    }
}

module.exports = { CheckoutPage };