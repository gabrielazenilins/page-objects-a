class LoginPage{

    constructor(page){
        this.page=page;
        // Caso eu queira usar CSS
        //this.username= page.locator('#username');
        //this.password=page.locator('#password');
        //this.button=page.locator('button[type="submit"]');
        //this.flash=page.locator('#flash');
      
        // Usando XPath
        this.username= page.locator("xpath=//input[@id='username']");
        this.password= page.locator("xpath=//input[@id='password']");
        this.button= page.locator("xpath=//button[@type='submit']");
        this.flash= page.locator("xpath=//div[@id='flash']");
    }
    
  async goto() {
    await this.page.goto('/login');
  }
 
  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.button.click();
  }
 
  async getFlashMessage() {
    
    const text = await this.flash.textContent();
    return text.trim();
  }
}
 
module.exports = { LoginPage };
