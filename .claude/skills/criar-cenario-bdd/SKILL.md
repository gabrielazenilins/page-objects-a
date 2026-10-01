---
name: criar-cenario-bdd
description: Cria um cenário BDD completo (arquivo .feature, steps e Page Object) para uma página do BlazeDemo, seguindo o padrão do projeto. Use quando pedirem para automatizar uma nova página, tela ou fluxo.
---

# Criar cenário BDD

## Antes de escrever
1. Leia `pages/LoginPage.js`, `steps/login.steps.js` e `features/login.feature`.
   Eles são o exemplo do padrão: copie o estilo.
2. Se não estiver claro qual página ou comportamento testar, pergunte ao usuário.

## Passos
1. Crie o Page Object em `pages/<Nome>Page.js`
   - seletores como texto no constructor
   - métodos só de ação, sem `expect`
   - `module.exports` no final
   - se a página já tiver Page Object, acrescente métodos em vez de recriar o arquivo
2. Crie a feature em `features/<nome>.feature`
   - palavras-chave em inglês, textos em português
   - o `Then` sempre verifica um resultado (URL, texto ou elemento visível)
3. Crie os steps em `steps/<nome>.steps.js`
   - crie o Page Object com `this.page`
   - `expect` só nos steps
   - reaproveite steps que já existem em vez de duplicar
4. Rode o cenário novo com `npm run test:bdd -- features/<nome>.feature`
   e corrija até passar.
5. No final, liste os arquivos criados e o que cada `Then` verifica.

## Não fazer
- Não colocar verificação dentro do Page Object
- Não colocar senhas reais no código
- Não alterar cenários existentes sem perguntar
- Não mexer em `support/world.js`