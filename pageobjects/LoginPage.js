class LoginPage {
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
        this.signOut = page.getByRole('button', { name: 'Sign Out' });

    }

    async clickOnSignOut() {
        await this.signOut.click();
    }

    async login(email, password) {
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.loginButton.click();
    }

    async goTo(url) {
        await this.page.goto(url);
    }
}

module.exports = { LoginPage };