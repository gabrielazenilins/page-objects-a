# Projeto POM: testes do BlazeDemo (Playwright + Cucumber)

Aplicação testada: https://blazedemo.com
Linguagem: JavaScript (CommonJS, com require e module.exports)

## Onde fica cada coisa
- `features/` → cenários em Gherkin (arquivos .feature)
- `steps/` → step definitions (Given, When, Then)
- `pages/` → Page Objects (um arquivo por página, nome em PascalCase, ex.: LoginPage.js)
- `support/world.js` → abre e fecha o navegador em cada cenário

## Regras dos Page Objects
- Uma classe com `constructor(page)` que guarda `this.page`
- Os seletores ficam como texto no constructor (ex.: `this.email = '#email'`)
- Os métodos só fazem AÇÕES (navigateToLoginPage, enterEmail, clickLoginButton)
- NUNCA colocar `expect` dentro de um Page Object
- No fim do arquivo: `module.exports = NomeDaPage`

## Regras dos steps
- O Page Object é criado dentro do step: `this.loginPage = new LoginPage(this.page)`
- As verificações (`expect`) ficam SOMENTE nos steps
- Os steps são escritos em inglês

## Regras das features
- Palavras-chave em inglês (Feature, Scenario, Given, When, Then)
- Textos da Feature e nome do Scenario em português
- Given = situação inicial, When = ação, Then = algo que se VERIFICA (o Then nunca deve só clicar)

## Regras gerais
- Antes de criar algo novo, ler o LoginPage.js, o login.steps.js e o login.feature e copiar o padrão
- Não usar esperas fixas (waitForTimeout)
- Não colocar senhas reais no código

## Como rodar
- Navegador invisível: `npm run test:bdd`
- Navegador visível: `npm run test:bdd:headed`
- Atenção: a variável HEADLESS funciona ao contrário de propósito (HEADLESS=true abre o navegador visível). Não mexer nisso.