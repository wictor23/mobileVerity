const BasePage = require("./BasePage");
const s = require("../utils/selectors");

class FormsPage extends BasePage {
  async open() {
    await this.click(s.formsTab);
  }

  async isDisplayed() {
    return this.exists(s.formInput);
  }

  async fillInput(value) {
    await this.setValue(s.formInput, value);
  }

  async toggleSwitch() {
    await this.click(s.switchControl);
  }

  async openDropdown() {
    await this.click(s.dropdown);
  }
}

module.exports = new FormsPage();