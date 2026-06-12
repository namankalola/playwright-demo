class OrderDetailsPage {
    constructor(page) {
        this.page = page;
        this.order = page.locator('small + div');
    }

    async getOrderIdFromOrderDetails() {
        const orderIdText = await this.order.textContent();
        return orderIdText;
    }

}

module.exports = { OrderDetailsPage };