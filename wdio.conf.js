require("dotenv").config();

const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const platform = (process.env.PLATFORM || "android").toLowerCase();

const APPIUM_HOST = process.env.APPIUM_HOST || "127.0.0.1";
const APPIUM_PORT = Number(process.env.APPIUM_PORT || 4723);

const appPath = platform === "ios"
  ? path.resolve(process.env.IOS_APP || "./apps/wdiodemoapp.app")
  : path.resolve(process.env.ANDROID_APP || "./apps/android.wdio.apk");

const appiumJaEstaNoAr = () => {
  const sonda = [
    "const http=require('http');",
    `const req=http.get({host:'${APPIUM_HOST}',port:${APPIUM_PORT},path:'/status',timeout:1500},res=>{`,
    "let corpo='';",
    "res.on('data',p=>{corpo+=p});",
    "res.on('end',()=>{process.exit(res.statusCode===200&&corpo.includes('build')?0:1)});",
    "});",
    "req.on('error',()=>process.exit(1));",
    "req.on('timeout',()=>{req.destroy();process.exit(1)});"
  ].join("");

  return spawnSync(process.execPath, ["-e", sonda], { timeout: 5000 }).status === 0;
};

const servicoAppium = [
  ["appium", {
    command: "appium",
    args: {
      address: APPIUM_HOST,
      port: APPIUM_PORT,
      relaxedSecurity: true,
      logLevel: "info",
      log: path.resolve("./logs/appium.log")
    }
  }]
];

const commonConfig = {
  runner: "local",
  specs: ["./test/specs/**/*.spec.js"],
  maxInstances: 1,
  logLevel: process.env.LOG_LEVEL || "info",
  framework: "mocha",
  reporters: [
    "spec",
    ["allure", {
      outputDir: "allure-results",
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  services: servicoAppium,
  hostname: APPIUM_HOST,
  port: APPIUM_PORT,
  path: "/",
  connectionRetryTimeout: 900000,
  connectionRetryCount: 0,
  waitforTimeout: 900000,
  mochaOpts: {
    ui: "bdd",
    timeout: 900000
  },

  onPrepare: function () {
    fs.mkdirSync(path.resolve("./logs"), { recursive: true });
    fs.mkdirSync(path.resolve("./screenshots"), { recursive: true });

    if (!fs.existsSync(appPath)) {
      throw new Error(`Binario do aplicativo nao encontrado em ${appPath}`);
    }
  },

  before: async function () {
 console.log("[WDIO] Sessão Android iniciada");
  },

  beforeTest: async function (test) {
    console.log(`\n[TEST] ${test.title}`);
  },

  afterTest: async function (test, context, result) {
    if (!result.passed) {
      fs.mkdirSync(path.resolve("./screenshots"), { recursive: true });
      const fileName = `${Date.now()}-${test.title.replace(/[^a-z0-9-_]/gi, "_")}.png`;
      await browser.saveScreenshot(path.resolve("./screenshots", fileName));
    }
  }
};

const androidConfig = {
  ...commonConfig,
  capabilities: [{
    platformName: "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": process.env.ANDROID_DEVICE || "Pixel_6",
    "appium:platformVersion": process.env.ANDROID_VERSION || "35",
    "appium:app": appPath,
    "appium:autoGrantPermissions": true,
    "appium:noReset": false,
    "appium:newCommandTimeout": 120,
    'appium:uiautomator2ServerInstallTimeout': 90000,
    "appium:uiautomator2ServerLaunchTimeout": 90000,
    'appium:disableWindowAnimation': true,
    'appium:skipDeviceInitialization': true,
    'appium:skipServerInstallation': true
  }]
};

const iosConfig = {
  ...commonConfig,
  capabilities: [{
    platformName: "iOS",
    "appium:automationName": "XCUITest",
    "appium:deviceName": process.env.IOS_DEVICE || "iPhone 15",
    "appium:platformVersion": process.env.IOS_VERSION || "17.5",
    "appium:app": appPath,
    "appium:autoAcceptAlerts": true,
    "appium:noReset": true,
    "appium:newCommandTimeout": 120
  }]
};

exports.config = platform === "ios" ? iosConfig : androidConfig;