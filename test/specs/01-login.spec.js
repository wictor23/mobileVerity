const { expect } = require("chai");
const HomePage = require("../pages/HomePage");
const LoginPage = require("../pages/LoginPage");
const data = require("../data/users.json");

describe("Login / Cadastro", () => {
  beforeEach(async () => {
    await HomePage.openLogin();
  });

  it("01 - deve realizar login com credenciais válidas", async () => {
    await LoginPage.openSignup();
    await LoginPage.SignUp(data.valid.email, data.valid.password, data.valid.password);
    await LoginPage.confirmCadastro();
    await HomePage.openLogin();
    await LoginPage.login(data.valid.email, data.valid.password);
    await LoginPage.confirmCadastro();
  });

  it("02 - deve rejeitar e-mail inválido", async () => {
    await LoginPage.login(data.invalidEmail.email, data.invalidEmail.password);
    const pageText = await browser.getPageSource();
    expect(pageText.toLowerCase()).to.include("invalid");
    await LoginPage.confirmCadastro();


  });

  it("03 - deve rejeitar senha inválida", async () => {
    await LoginPage.login(data.invalidPassword.email, data.invalidPassword.password);
    const pageText = await browser.getPageSource();
    expect(pageText.toLowerCase()).to.include("invalid");
    await LoginPage.confirmCadastro();

  });
});