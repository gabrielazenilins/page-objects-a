class LoginPage {

    constructor(page){
        this.page = page
        this.title = '.panel-heading'
        this.email = '#email'
        this.password = '#password'
        this.loginButton = 'button[type="submit"]'
    }

    // Ações — sem verificação
    async navigateToLoginPage(){
        await this.page.goto('https://blazedemo.com/login')
    }
    async enterEmail(email){
        await this.page.locator(this.email).fill(email)
    }
    async enterPassword(password){
        await this.page.locator(this.password).fill(password)
    }
    async clickLoginButton(){
        await this.page.locator(this.loginButton).click()
    }
}
module.exports = LoginPage