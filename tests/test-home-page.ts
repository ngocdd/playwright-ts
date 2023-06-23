import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';
import LoginPage from '../page-objects/login-page';
import * as fs from 'fs-extra';
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

test('test 2',async () => {
  

  const filePath = './utils/test-data/question.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed JSON:', jsonData.question);
      // Perform fursther operations with the jsonData object
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });
});