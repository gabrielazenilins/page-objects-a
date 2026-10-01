const { setWorldConstructor, Before, After, setDefaultTimeout } = require('@cucumber/cucumber')
const { chromium } = require('@playwright/test')

setDefaultTimeout(60 * 1000) // 60s por step, evita timeout em máquina mais lenta

class CustomWorld {
    constructor() {
        this.browser = null
        this.context = null
        this.page = null
    }
}

setWorldConstructor(CustomWorld)

// Roda antes de CADA cenário
Before(async function () {
    this.browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'true'
    })
    this.context = await this.browser.newContext()
    this.page = await this.context.newPage()
})

// Roda depois de CADA cenário, mesmo se ele falhar
After(async function () {
    await this.page?.close()
    await this.context?.close()
    await this.browser?.close()
})

module.exports = { CustomWorld }