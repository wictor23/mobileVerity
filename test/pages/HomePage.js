const BasePage = require("./BasePage");
const s = require("../utils/selectors");

class HomePage extends BasePage {
  async isDisplayed() {
    return this.exists(s.loginTab);
  }

  async openLogin() {
    await this.click(s.loginTab);
  }

  async openForms() {
    await this.click(s.formsTab);
  }

  async openSwipe() {
    await this.click(s.swipeTab);
  }

  async openDrag() {
    await this.click(s.dragTab);
  }

  async openMenu() {
    await this.click(s.menuTab);
  }
}

module.exports = new HomePage();