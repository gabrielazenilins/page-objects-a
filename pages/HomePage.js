class HomePage {

    constructor(page){
        this.page = page
        this.departureCity = 'select[name="fromPort"]'
        this.destinationCity = 'select[name="toPort"]'
        this.findFlightsButton = 'input[value="Find Flights"]'
    }

    // Ações — sem verificação
    async navigateToHomePage(){
        await this.page.goto('https://blazedemo.com/')
    }
    async selectDepartureCity(city){
        await this.page.locator(this.departureCity).selectOption(city)
    }
    async selectDestinationCity(city){
        await this.page.locator(this.destinationCity).selectOption(city)
    }
    async clickFindFlightsButton(){
        await this.page.locator(this.findFlightsButton).click()
    }
}
module.exports = HomePage
