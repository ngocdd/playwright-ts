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
  await homePage.gotoBookDetail('01H3CH2XGJB6XPGR130H58A2T3');
  await homePage.addNewLO();
  await homePage.addNewQuestion();
  await page.pause();
});