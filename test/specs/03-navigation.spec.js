const { expect } = require("chai");
const HomePage = require("../pages/HomePage");
const FormsPage = require("../pages/FormsPage");

describe("Navegação", () => {
  beforeEach(async () => {
    
  });

  it("06 - deve navegar para Login", async () => {
    await HomePage.openLogin();
    expect(await browser.getPageSource()).to.match(/Login/i);
    await driver.hideKeyboard();
  });

  it("07 - deve navegar para Forms", async () => {
    await HomePage.openForms();
    expect(await FormsPage.isDisplayed()).to.equal(true);
  });

  it("08 - deve navegar para Swipe", async () => {
    await HomePage.openSwipe();
    expect(await browser.getPageSource()).to.match(/Swipe/i);
  });

  it("09 - deve navegar para Drag", async () => {
    await HomePage.openDrag();
    expect(await browser.getPageSource()).to.match(/Drag/i);
  });

});