class SecurePage {
  constructor(page) {
    this.page = page;

    // Caso eu queira usar CSS
    //this.pageHeader = page.locator('h2');
    //this.flashMessage = page.locator('#flash');
    //this.logoutButton = page.locator('a.button.secondary.radius');
    
  // Usando XPath
    this.pageHeader = page.locator("xpath=//h2");
    this.flashMessage = page.locator("xpath=//div[@id='flash']");
    this.logoutButton = page.locator("xpath=//a[contains(@class, 'button') and contains(@class, 'secondary') and contains(@class, 'radius')]");
  }

  async logout() {
    await this.logoutButton.click();
  }

  async isSecureAreaVisible() {
    return this.pageHeader.isVisible();
  }

  async getFlashMessage() {
    const text = await this.flashMessage.textContent();
    return text.trim();
  }
}

module.exports = { SecurePage };