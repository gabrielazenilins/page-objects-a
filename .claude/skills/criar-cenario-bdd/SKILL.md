---
name: criar-cenario-bdd
description: Cria um cenário BDD completo (arquivo .feature, steps e Page Object) para uma página do BlazeDemo, seguindo o padrão do projeto. Use quando pedirem para automatizar uma nova página, tela ou fluxo.
---

# Criar cenário BDD

Projeto: Playwright + Cucumber, JavaScript **CommonJS** (`require` / `module.exports`).
Site testado: `https://blazedemo.com`

## Estrutura de pastas

```
POM/
├── features/            → cenários Gherkin (.feature), nome em minúsculo
│   ├── login.feature
│   └── home.feature
├── steps/               → step definitions, um arquivo por feature: <nome>.steps.js
│   ├── login.steps.js
│   └── home.steps.js
├── pages/               → Page Objects, um por página, PascalCase: <Nome>Page.js
│   ├── LoginPage.js
│   ├── HomePage.js
│   └── ReservePage.js   (página de resultado da busca: só seletores)
├── support/world.js     → abre/fecha o navegador em cada cenário (NÃO mexer)
└── cucumber.js          → já carrega features/**/*.feature, steps/**/*.js e support/**/*.js
```

Arquivos novos nessas pastas são carregados automaticamente, sem configuração extra.

## Antes de escrever
1. Se não estiver claro qual página ou comportamento testar, pergunte ao usuário.
2. Veja se a página já tem Page Object em `pages/` (`HomePage`, `LoginPage`, `ReservePage`).
   Se tiver, **acrescente métodos** em vez de recriar o arquivo.
3. Veja se o step já existe em `steps/` (ex.: `I am on the home page`). Se existir, reaproveite.
   O Cucumber dá erro com steps duplicados, mesmo que estejam em arquivos diferentes.

## Passos

### 1. Page Object em `pages/<Nome>Page.js`
Seletores como texto no constructor, métodos só de **ação**, sem `expect`, e `module.exports` no final.

```js
class HomePage {

    constructor(page){
        this.page = page
        this.departureCity = 'select[name="fromPort"]'
        this.findFlightsButton = 'input[value="Find Flights"]'
    }

    // Ações — sem verificação
    async navigateToHomePage(){
        await this.page.goto('https://blazedemo.com/')
    }
    async selectDepartureCity(city){
        await this.page.locator(this.departureCity).selectOption(city)
    }
    async clickFindFlightsButton(){
        await this.page.locator(this.findFlightsButton).click()
    }
}
module.exports = HomePage
```

Ações comuns do Playwright:
- abrir página: `await this.page.goto(url)`
- preencher campo: `await this.page.locator(this.campo).fill(texto)`
- escolher em `<select>`: `await this.page.locator(this.campo).selectOption(valor)`
- clicar: `await this.page.locator(this.botao).click()`

Se a página só é usada para **verificar** (ex.: página de destino), o Page Object tem só os seletores:

```js
class ReservePage {

    constructor(page){
        this.page = page
        this.flightsTitle = 'h3'
    }
}
module.exports = ReservePage
```

Prefira seletores estáveis (`#id`, `[name="..."]`, `[value="..."]`). Evite XPath longo e seletor por posição.

### 2. Feature em `features/<nome>.feature`
Palavras-chave em inglês. Textos da Feature e nome do Scenario em português. Os passos ficam em inglês.
`Given` = situação inicial, `When` = ação, `Then` = **verificação** (nunca só clicar).

```gherkin
Feature: Busca de voos no BlazeDemo
  Como usuário do BlazeDemo
  Eu quero escolher a cidade de origem e de destino
  Para ver os voos disponíveis

  Scenario: Buscar voos entre duas cidades
    Given I am on the home page
    When I select "Paris" as departure city and "Buenos Aires" as destination city
    And I click the Find Flights button
    Then I should see the flights from "Paris" to "Buenos Aires"
```

Use `"texto entre aspas"` para dados variáveis. No step, eles viram `{string}`.

### 3. Steps em `steps/<nome>.steps.js`
O Page Object é criado dentro do step com `this.page`. O `expect` fica **só aqui**.

```js
const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const HomePage = require('../pages/HomePage')
const ReservePage = require('../pages/ReservePage')

Given('I am on the home page', async function () {
    this.homePage = new HomePage(this.page)
    await this.homePage.navigateToHomePage()
    await expect(this.page).toHaveTitle('BlazeDemo')   // verificação aqui, não no PO
});

When('I select {string} as departure city and {string} as destination city', async function (departure, destination) {
    await this.homePage.selectDepartureCity(departure)
    await this.homePage.selectDestinationCity(destination)
});

Then('I should see the flights from {string} to {string}', async function (departure, destination) {
    this.reservePage = new ReservePage(this.page)
    await expect(this.page).toHaveURL(/reserve\.php/)
    await expect(this.page.locator(this.reservePage.flightsTitle)).toHaveText(`Flights from ${departure} to ${destination}:`)
})
```

Use sempre `async function` e nunca arrow function, senão o `this` (o World com `this.page`) não funciona.

Verificações comuns no `Then`:
- URL: `await expect(this.page).toHaveURL(/pagina\.php/)`
- título da aba: `await expect(this.page).toHaveTitle('BlazeDemo')`
- texto: `await expect(this.page.locator(seletor)).toHaveText('...')` ou `.toContainText('...')`
- elemento visível: `await expect(this.page.locator(seletor)).toBeVisible()`

### 4. Rodar o cenário novo
```
npm run test:bdd -- features/<nome>.feature
```
Para ver o navegador: `npm run test:bdd:headed -- features/<nome>.feature`.
Corrija até passar. Se der erro de timeout, revise o seletor. Nunca use `waitForTimeout`.

### 5. Resumo final
Liste os arquivos criados ou alterados e diga o que cada `Then` verifica.

## Não fazer
- Não colocar `expect` dentro do Page Object
- Não usar esperas fixas (`waitForTimeout`)
- Não colocar senhas reais no código (use dados de exemplo, como `test@example.com` / `password123`)
- Não alterar cenários existentes sem perguntar
- Não mexer em `support/world.js` nem na variável `HEADLESS` (ela funciona ao contrário de propósito)
- Não copiar o `Then` do `login.feature`: ele só clica e é apenas um modelo antigo
