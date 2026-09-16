const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { SecurePage } = require('../pages/SecurePage');
 
test.describe('Login', () => {
  test('login com credenciais válidas leva à área segura', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const securePage = new SecurePage(page);
 
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
 
    await expect(page).toHaveURL(/.*\/secure/);
    await expect(securePage.pageHeader).toContainText('Secure Area');
 
    const flash = await securePage.getFlashMessage();
    expect(flash).toContain('You logged into a secure area!');
  });
 
  test('login com usuário inválido mostra mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);
 
    await loginPage.goto();
    await loginPage.login('usuario_invalido', 'SuperSecretPassword!');
 
    await expect(page).toHaveURL(/.*\/login/);
    const flash = await loginPage.getFlashMessage();
    expect(flash).toContain('Your username is invalid!');
  });
 
  test('login com senha inválida mostra mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);
 
    await loginPage.goto();
    await loginPage.login('tomsmith', 'senha_errada');
 
    await expect(page).toHaveURL(/.*\/login/);
    const flash = await loginPage.getFlashMessage();
    expect(flash).toContain('Your password is invalid!');
  });
});