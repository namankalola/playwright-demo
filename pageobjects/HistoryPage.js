const { expect } = require('@playwright/test');
class HistoryPage {
    constructor(page) {
        this.page = page;
        this.orderLink = page.locator('[routerlink="/dashboard/myorders"]');
        this.orderHistoryTable = page.locator('h1:has-text("Your Orders") + table');
    }

    async orderHistoryPageDisplayed() {
         await this.orderHistoryTable.waitFor();
    }

    async clickOnOrderHistory() {
        await this.orderLink.first().click();
    }

    async searchOrderIdAndClickViewDetails(orderIdValue) {
        const rows = this.orderHistoryTable.locator('tr.ng-star-inserted');
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
        await expect(orderFound).toBeTruthy()
    }
}

module.exports = { HistoryPage };