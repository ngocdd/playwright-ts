import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';
import LoginPage from '../page-objects/login-page';

// const homePage: HomePage;
// const loginPage: LoginPage; 


test('test Elements page', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await loginPage.gotoLogin();
  await loginPage.login();
  await homePage.gotoBookDetail('01H39XX2Y899CZNRH4YAJW5191');
  await homePage.addNewChapter();
  await page.pause();
});