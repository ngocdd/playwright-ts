import { Browser, Page, chromium } from "@playwright/test";
import LoginPage from "../../page-objects/login-page";

let loginPage: LoginPage;

async function authenticate() {
  const browser: Browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  loginPage = new LoginPage(page);
  
  await loginPage.login();

  await page.context().storageState({ path: "./utils/auth/admin.json" });
  // Dont forget your clean up :)
  await browser.close();
}

export default authenticate;