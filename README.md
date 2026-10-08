# POM: testes do BlazeDemo com Playwright + Cucumber

Projeto de estudo (mentoria) com testes automatizados de interface do site [BlazeDemo](https://blazedemo.com).
Os testes usam **BDD**: os cenários são escritos em Gherkin e implementados com o **Playwright**, seguindo o padrão **Page Object Model (POM)**.

## Tecnologias
- [Playwright](https://playwright.dev/): controla o navegador (Chromium)
- [Cucumber](https://github.com/cucumber/cucumber-js): roda os cenários escritos em Gherkin
- JavaScript em **CommonJS** (`require` / `module.exports`)
- GitHub Actions: roda os testes a cada push e pull request

## Estrutura

```
POM/
├── features/            → cenários em Gherkin (.feature)
│   ├── login.feature
│   └── home.feature
├── steps/               → step definitions (Given / When / Then)
│   ├── login.steps.js
│   └── home.steps.js
├── pages/               → Page Objects, um por página
│   ├── LoginPage.js
│   ├── HomePage.js
│   └── ReservePage.js
├── support/world.js     → abre e fecha o navegador em cada cenário
├── cucumber.js          → configuração do Cucumber
├── .github/workflows/   → pipeline de CI
└── .claude/             → skill e agent do Claude Code usados no projeto
```

## Como instalar

Pré-requisito: [Node.js](https://nodejs.org/) (versão LTS).

```bash
npm install
npx playwright install chromium
```

## Como rodar

| Comando | O que faz |
|---|---|
| `npm run test:bdd` | Roda todos os cenários com o navegador invisível |
| `npm run test:bdd:headed` | Roda todos os cenários com o navegador visível |
| `npm run test:bdd -- features/home.feature` | Roda só uma feature |

> **Atenção:** a variável `HEADLESS` funciona ao contrário de propósito: `HEADLESS=true` **abre** o navegador visível. Não altere essa lógica.

## Cenários automatizados

| Feature | Cenário | O que verifica |
|---|---|---|
| `home.feature` | Buscar voos entre duas cidades | Abre a página `reserve.php` com o título "Flights from Paris to Buenos Aires:" |
| `login.feature` | Login com credenciais válidas | Modelo do padrão, com e-mail e senha de exemplo |

## Padrão do projeto

O fluxo é sempre o mesmo: **feature → steps → Page Object**.

**Feature** (palavras-chave em inglês, textos em português):
```gherkin
Scenario: Buscar voos entre duas cidades
  Given I am on the home page
  When I select "Paris" as departure city and "Buenos Aires" as destination city
  And I click the Find Flights button
  Then I should see the flights from "Paris" to "Buenos Aires"
```

**Page Object** (seletores no constructor, métodos só de ação, sem `expect`):
```js
class HomePage {
    constructor(page){
        this.page = page
        this.findFlightsButton = 'input[value="Find Flights"]'
    }
    async clickFindFlightsButton(){
        await this.page.locator(this.findFlightsButton).click()
    }
}
module.exports = HomePage
```

**Step** (cria o Page Object e faz as verificações):
```js
When('I click the Find Flights button', async function () {
    await this.homePage.clickFindFlightsButton()
});
```

### Regras principais
- `expect` fica **somente nos steps**, nunca no Page Object
- O `Then` sempre **verifica** algo (URL, texto ou elemento visível), nunca só clica
- Não usar esperas fixas (`waitForTimeout`)
- Não colocar senhas reais no código

As regras completas estão no [CLAUDE.md](CLAUDE.md).

## Claude Code
O projeto tem dois recursos para o [Claude Code](https://claude.com/claude-code):
- **Skill `criar-cenario-bdd`** ([.claude/skills/criar-cenario-bdd/SKILL.md](.claude/skills/criar-cenario-bdd/SKILL.md)): cria feature, steps e Page Object de uma nova página seguindo o padrão.
- **Agent `revisor-bdd`** ([.claude/agents/revisor-bdd.md](.claude/agents/revisor-bdd.md)): revisa os arquivos e aponta o que foge das regras, sem editar nada.

## CI
O workflow [.github/workflows/playwright.yml](.github/workflows/playwright.yml) roda `npm run test:bdd` a cada push ou pull request na `main`.
