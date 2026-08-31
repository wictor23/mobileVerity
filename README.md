# 📱 Mobile Automation - WebdriverIO + Appium

Projeto de automação mobile criado para atender ao desafio de automação do `native-demo-app` do WebdriverIO.

## 🎯 Requisitos atendidos

- [x] JavaScript
- [x] WebdriverIO
- [x] Appium
- [x] Mocha
- [x] Chai
- [x] Page Object
- [x] Massa de dados em JSON
- [x] 10 cenários
- [x] Android Emulator
- [x] iOS Simulator
- [x] Screenshots automáticos em falhas
- [x] Allure Report
- [x] GitHub Actions
- [x] Artifacts de evidências
- [x] Execução manual por plataforma
- [x] Download automatizado do app de demonstração
- [ ] BrowserStack: opcional

## 📱 Aplicativo utilizado

O projeto usa o `webdriverio/native-demo-app`, aplicativo oficial de demonstração do ecossistema WebdriverIO/Appium.

A aplicação possui telas de Home, WebView, Login, Forms, Swipe e Drag, entre outras, e possui builds para Android e iOS Simulator. O build de iOS disponibilizado pelo projeto é para simulador, não para iPhone físico. 

## 📁 Estrutura

```text
.
├── .github/
│   └── workflows/
│       └── mobile-tests.yml
├── apps/
├── scripts/
│   └── download-demo-app.sh
├── test/
│   ├── data/
│   │   └── users.json
│   ├── pages/
│   │   ├── BasePage.js
│   │   ├── FormsPage.js
│   │   ├── HomePage.js
│   │   └── LoginPage.js
│   ├── specs/
│   │   ├── 01-login.spec.js
│   │   ├── 02-signup.spec.js
│   │   └── 03-navigation.spec.js
│   └── utils/
│       └── selectors.js
├── .env.example
├── .gitignore
├── .nvmrc
├── package.json
├── README.md
└── wdio.conf.js
```

## 💻 Execução local - Android

### Requisitos

- Node.js 20
- Java/JDK
- Android Studio
- Android SDK
- Android Emulator
- Appium 2

Instale as dependências:

```bash
npm install
```

Instale o driver Android:

```bash
npx appium driver install uiautomator2
```

Baixe o APK:

```bash
export PLATFORM=android
export DEMO_APP_VERSION=2.2.0
bash scripts/download-demo-app.sh
```

Inicie um emulador e execute:

```bash
npm run test:android
```

## 🍎 Execução local - iOS

### Requisitos

- macOS
- Xcode
- iOS Simulator
- Node.js 20

Instale as dependências:

```bash
npm install
```

Instale o driver XCUITest:

```bash
npx appium driver install xcuitest
```

Baixe o app para simulador:

```bash
export PLATFORM=ios
export DEMO_APP_VERSION=2.2.0
bash scripts/download-demo-app.sh
```

Execute:

```bash
npm run test:ios
```

## 🤖 GitHub Actions

O arquivo:

```text
.github/workflows/mobile-tests.yml
```

possui dois jobs independentes.

### Android

Executa em:

```text
ubuntu-latest
    ↓
Android Emulator
    ↓
Appium + UiAutomator2
    ↓
WebdriverIO
```

### iOS

Executa em:

```text
macos-14
    ↓
iPhone 15 Simulator
    ↓
Appium + XCUITest
    ↓
WebdriverIO
```

A pipeline é executada automaticamente em:

- push para `main`
- push para `develop`
- Pull Request para `main`
- Pull Request para `develop`

Também existe execução manual pelo botão **Run workflow**.

Na execução manual é possível escolher:

```text
both
android
ios
```

## 📊 Allure

Após a execução, a pipeline gera:

```text
allure-report-android
allure-report-ios
```

e também publica:

```text
allure-results-android
allure-results-ios
```

Os artifacts podem ser baixados diretamente na execução do workflow no GitHub.

## 📸 Screenshots

Quando um teste falha, o `afterTest` captura automaticamente:

```text
screenshots/
```

A pipeline publica esses arquivos como artifacts.

## 🧪 Cenários

### Login / Cadastro

1. Login com credenciais válidas
2. Login com e-mail inválido
3. Login com senha inválida
4. Exibição da tela de cadastro
5. Validação do fluxo de cadastro inválido

### Navegação

6. Navegação para Login
7. Navegação para Forms
8. Navegação para Swipe
9. Navegação para Drag
10. Abertura do Menu

## 🧩 Page Object

Os elementos e ações ficam separados dos testes.
Os testes ficam focados no comportamento e não na implementação dos elementos.

## ☁️ BrowserStack

O desafio classifica BrowserStack como opcional. A arquitetura permite adicionar um terceiro job:

```text
browserstack:
  runs-on: ubuntu-latest
```

para execução em dispositivos reais.

## ⚠️ Observação sobre iOS

O `native-demo-app` disponibiliza o aplicativo iOS para **Simulator**. O próprio projeto informa que não existe build para instalação em iPhone físico devido a limitações de segurança/distribuição da Apple.

Portanto, este projeto atende o requisito de execução em **iOS Simulator**. Para iPhone físico, seria necessário um aplicativo assinado e uma estratégia de device farm/dispositivo registrado.

## 📚 Referências

- WebdriverIO Native Demo App:
  https://github.com/webdriverio/native-demo-app
- WebdriverIO Appium Service:
  https://webdriver.io/docs/appium-service/
- Appium:
  https://appium.io/
- GitHub Actions:
  https://docs.github.com/actions
