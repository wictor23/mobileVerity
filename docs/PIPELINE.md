# Pipeline

## Triggers

```yaml
push:
  branches:
    - main
    - develop

pull_request:
  branches:
    - main
    - develop

workflow_dispatch:
```

## Jobs

### Android

Runner:

```text
ubuntu-latest
```

Componentes:

```text
Node 20
Appium
UiAutomator2
Android Emulator API 35
WebdriverIO
Mocha
Chai
Allure
```

### iOS

Runner:

```text
macos-14
```

Componentes:

```text
Node 20
Xcode
Appium
XCUITest
iPhone 15 Simulator
WebdriverIO
Mocha
Chai
Allure
```

## Estratégia

Android e iOS são executados como jobs separados para que uma falha em uma plataforma não impeça a coleta de evidências da outra.

O job `summary` consolida os resultados e falha a pipeline quando qualquer ambiente falhar.

## Artifacts

Cada plataforma publica:

- Allure Report
- Allure Results
- Screenshots

O iOS também publica diagnósticos do Simulator.

## App

O APK e o app do iOS Simulator não são armazenados no Git.

A pipeline baixa a release oficial do `webdriverio/native-demo-app` pelo GitHub API antes da execução.
