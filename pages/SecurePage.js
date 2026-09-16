class SecurePage {
  constructor(page) {
    this.page = page;

    // HTML real da página /secure:
    // <h2><i class="fa fa-lock"></i> Secure Area</h2>
    // <div id="flash" class="success">You logged into a secure area!...</div>
    // <a class="button secondary radius" href="/logout"><i class="fa fa-2x fa-sign-out"></i> Logout</a>
    //this.pageHeader = page.locator('h2');
    //this.flashMessage = page.locator('#flash');
    //this.logoutButton = page.locator('a.button.secondary.radius');

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