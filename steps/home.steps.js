const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const HomePage = require('../pages/HomePage')

Given('I am on the home page', async function () {
    this.homePage = new HomePage(this.page)
    await this.homePage.navigateToHomePage()
    await expect(this.page).toHaveTitle('BlazeDemo')   // verificação aqui, não no PO
});

When('I select {string} as departure city and {string} as destination city', async function (departure, destination) {
    await this.homePage.selectDepartureCity(departure)
    await this.homePage.selectDestinationCity(destination)
});

When('I click the Find Flights button', async function () {
    await this.homePage.clickFindFlightsButton()
});

Then('I should see the flights from {string} to {string}', async function (departure, destination) {
    await expect(this.page).toHaveURL(/reserve\.php/)
    await expect(this.page.locator('h3')).toHaveText(`Flights from ${departure} to ${destination}:`)
})
