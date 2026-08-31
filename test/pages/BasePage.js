class BasePage {
  async waitForVisible(selector, timeout = 120000) {
    const element = $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async click(selector) {
    const element = await this.waitForVisible(selector);
    await element.click();
  }

  async setValue(selector, value) {
    const element = await this.waitForVisible(selector);
    await element.clearValue();
    await element.setValue(value);
  }

  async exists(selector, timeout = 5000) {
    const element = $(selector);
    return element.waitForExist({ timeout }).catch(() => false);
  }

  async getText(selector, timeout = 10000) {
    const element = await this.waitForVisible(selector, timeout);
    return element.getText();
  }
}

module.exports = BasePage;