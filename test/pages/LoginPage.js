const BasePage = require("./BasePage");
const s = require("../utils/selectors");

class LoginPage extends BasePage {
  get email() { return $(s.emailInput); }
  get password() { return $(s.passwordInput); }
  get loginButton() { return $(s.loginButton); }
  get signUpButton() { return $(s.signUpButton); }

  async open() {
    await this.click(s.loginTab);
  }

 async confirmCadastro() {
    await this.click(s.alertConfirm());
  }

  async login(email, password) {
    await this.setValue(s.emailInput, email);
    await this.setValue(s.passwordInput, password);
    await this.click(s.loginButton);
  }

  async SignUp(email, password, confirmpassword) {
    await this.setValue(s.emailInput, email);
    await this.setValue(s.passwordInput, password);
    await this.setValue(s.confirmPasswordInput, confirmpassword);
    await this.click(s.signUpButton);
  }

  async openSignup() {
    await this.click(s.loginCadastroTab);
  }

  async isDisplayed() {
    return this.exists(s.loginButton);
  }
}

module.exports = new LoginPage();