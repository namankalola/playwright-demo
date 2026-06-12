const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CartPage } = require('../pageobjects/CartPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { ThankyouPage } = require('../pageobjects/ThankyouPage');
const { HistoryPage } = require('../pageobjects/HistoryPage');
const { OrderDetailsPage } = require('../pageobjects/OrderDetailsPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.thankyouPage = new ThankyouPage(page);
        this.historyPage = new HistoryPage(page);
        this.orderDetailsPage = new OrderDetailsPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
    getThankyouPage() {
        return this.thankyouPage;
    }
    getHistoryPage() {
        return this.historyPage;
    }
    getOrderDetailsPage() {
        return this.orderDetailsPage;
    }

}

module.exports = { POManager };