const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { SecurePage } = require('../pages/SecurePage');
 
test.describe('Logout', () => {
  test('logout a partir da área segura retorna para o login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const securePage = new SecurePage(page);
 
    // pré-condição: precisa estar logada para poder testar o logout
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await expect(page).toHaveURL(/.*\/secure/);
 
    await securePage.logout();
 
    await expect(page).toHaveURL(/.*\/login/);
    const flash = await loginPage.getFlashMessage();
    expect(flash).toContain('You logged out of the secure area!');
  });
});