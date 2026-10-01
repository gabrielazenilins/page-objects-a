const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const LoginPage = require('../pages/LoginPage')

Given('I am on the login page', async function () {
    this.loginPage = new LoginPage(this.page)
    await this.loginPage.navigateToLoginPage()
    await expect(this.page).toHaveTitle('BlazeDemo')   // verificação aqui, não no PO
});

When('I enter my email and password', async function () {
    await this.loginPage.enterEmail('test@example.com')
    await this.loginPage.enterPassword('password123')
});

Then('I click the login button', async function () {
    await this.loginPage.clickLoginButton()
})