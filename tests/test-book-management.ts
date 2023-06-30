import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/book-management-page';
import { readJSONFile, generateUUID } from '../utils/data-provider/data-provider';
import { LOType } from '../utils/enumeration/enumeration';
import LoginPage from '../page-objects/login-page';

let loginPage : LoginPage;
let homePage : HomePage;

test.beforeEach(async ({page}) => {
  // initial new pages
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await loginPage.login();
});




test('test create new book', async ({ page }) => {
  let bookName = await generateUUID('HTN');
  // console.log(bookName);
  await homePage.gotoBookManagement();
  await homePage.addNewBook(bookName);
  await homePage.checksnbMessage();
  await expect(homePage.snbMessage).toHaveText('You have created a new book successfully');
});


