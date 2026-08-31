const { expect } = require("chai");
const HomePage = require("../pages/HomePage");
const LoginPage = require("../pages/LoginPage");
const data = require("../data/users.json");

describe("Cadastro", () => {
  beforeEach(async () => {
    await HomePage.openLogin();
    await LoginPage.openSignup();
  });

  it("04 - deve exibir a tela de cadastro", async () => {
    expect(await browser.getPageSource()).to.match(/Sign Up|SIGN UP/i);
  });

  it("05 - deve validar cadastro com dados inválidos", async () => {
    const sourceBefore = await browser.getPageSource();
    expect(sourceBefore).to.match(/Email|Password/i);


    await browser.keys(["Tab"]);
    await browser.keys(["Tab"]);
    expect(await browser.getPageSource()).to.match(/Sign Up|SIGN UP/i);
  });
});