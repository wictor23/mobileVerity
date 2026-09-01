function byText(text) {
  return `//*[@text="${text}" or @label="${text}" or @name="${text}"]`;
}

function byContainsText(text) {
  return `//*[contains(@text,"${text}") or contains(@label,"${text}") or contains(@name,"${text}")]`;
}

function byId(id) {
  return `//*[@resource-id="${id}" or @name="${id}" or @label="${id}" or @content-desc="${id}"]`;
}

function accessibility(id) {
  return `~${id}`;
}

/**
 * Retorna o seletor correto conforme a plataforma.
 */
function platformSelector(androidSelector, iosSelector) {
  return driver.isAndroid ? androidSelector : iosSelector;
}

const APP = {
  package: "com.wdiodemoapp",
  activity: "com.wdiodemoapp.MainActivity"
};

const SCREENS = {
  home: "Home-screen",
  login: "Login-screen",
  forms: "Forms-screen",
  swipe: "Swipe-screen",
  drag: "Drag-drop-screen",
  permissions: "Permissions-screen",
  dataManagement: "DataManagement-screen"
};

const MESSAGES = {
  invalidEmail: "Please enter a valid email address",
  shortPassword: "Please enter at least 8 characters",
  passwordMismatch: "Please enter the same password",
  loginSuccessTitle: "Success",
  loginSuccessBody: "You are logged in!",
  signUpSuccessTitle: "Signed Up!",
  signUpSuccessBody: "You successfully signed up!",
  activeButton: "This button is active",
  swipeSuccess: "Congratulations"
};

module.exports = {
  byText,
  byContainsText,
  byId,
  accessibility,
  platformSelector,

  APP,
  SCREENS,
  MESSAGES,

  // =========================
  // SCREENS
  // =========================

  homeScreen: accessibility(SCREENS.home),
  loginScreen: accessibility(SCREENS.login),
  formsScreen: accessibility(SCREENS.forms),
  swipeScreen: accessibility(SCREENS.swipe),
  dragScreen: accessibility(SCREENS.drag),
  permissionsScreen: accessibility(SCREENS.permissions),
  dataManagementScreen: accessibility(SCREENS.dataManagement),

  // =========================
  // NAVIGATION
  // =========================

  homeTab: byText("Home"),
  webviewTab: byText("Webview"),
  loginTab: byText("Login"),
  formsTab: byText("Forms"),
  swipeTab: byText("Swipe"),
  dragTab: byText("Drag"),
  permissionsTab: byText("Permissions"),
  menuTab: byText("Menu"),

  loginCadastroTab: byText("Sign up"),

  // =========================
  // LOGIN / SIGN UP
  // =========================

  loginContainerButton: accessibility("login-container"),
  signUpContainerButton: accessibility("sign-up-container"),

  emailInput: accessibility("input-email"),
  passwordInput: accessibility("input-password"),
  confirmPasswordInput: accessibility("input-repeat-password"),

  loginButton: accessibility("button-LOGIN"),
  signUpButton: accessibility("button-SIGN UP"),

  loginFormTitle: byText("Login / Sign up Form"),

  // =========================
  // FORMS
  // =========================

  formInput: accessibility("text-input"),
  formInputResult: accessibility("input-text-result"),

  switchControl: accessibility("switch"),
  switchText: accessibility("switch-text"),

  dropdown: accessibility("Dropdown"),
  dropdownChevron: accessibility("dropdown-chevron"),

  activeButton: accessibility("button-Active"),
  inactiveButton: accessibility("button-Inactive"),

  // =========================
  // SWIPE
  // =========================

  carousel: accessibility("Carousel"),
  swipeInstruction: byText("Swipe horizontal"),
  swipeVerticalHint: byContainsText("swipe vertical"),

  // =========================
  // DRAG AND DROP
  // =========================

  dragTitle: byText("Drag and Drop"),

  dragTargets: {
    c1: accessibility("drag-c1"),
    c2: accessibility("drag-c2"),
    c3: accessibility("drag-c3"),

    l1: accessibility("drag-l1"),
    l2: accessibility("drag-l2"),
    l3: accessibility("drag-l3"),

    r1: accessibility("drag-r1"),
    r2: accessibility("drag-r2"),
    r3: accessibility("drag-r3")
  },

  // =========================
  // VALIDATION MESSAGES
  // =========================

  invalidEmailMessage: byText(MESSAGES.invalidEmail),

  shortPasswordMessage: byText(MESSAGES.shortPassword),

  passwordMismatchMessage: byText(MESSAGES.passwordMismatch),

  loginSuccessMessage: byContainsText("logged in"),

  signUpSuccessMessage: byContainsText("signed up"),

  activeButtonAlert: byContainsText(MESSAGES.activeButton),

  // =========================
  // NATIVE ALERTS - MULTIPLATFORM
  // =========================

  alertTitle: () =>
    platformSelector(
      byId("android:id/alertTitle"),
      "//XCUIElementTypeAlert//XCUIElementTypeStaticText[1]"
    ),

  alertMessage: () =>
    platformSelector(
      byId("android:id/message"),
      "//XCUIElementTypeAlert//XCUIElementTypeStaticText[2]"
    ),

  alertConfirm: () =>
    platformSelector(
      byId("android:id/button1"),
      "//XCUIElementTypeAlert//XCUIElementTypeButton[@name='OK']"
    ),

  // =========================
  // LEGACY ANDROID SELECTORS
  // Mantidos para compatibilidade
  // =========================

  androidAlertTitle: byId("android:id/alertTitle"),

  androidAlertMessage: byId("android:id/message"),

  androidAlertConfirm: byId("android:id/button1")
};