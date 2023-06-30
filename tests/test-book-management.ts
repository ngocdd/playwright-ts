import { test, expect } from '@playwright/test';
import BookManagementPage from '../page-objects/book-management-page';
import { readJSONFile, generateUUID } from '../utils/data-provider/data-provider';
import { LOType } from '../utils/enumeration/enumeration';
import LoginPage from '../page-objects/login-page';

let loginPage : LoginPage;
let bookMngPage : BookManagementPage;

test.describe('test Book Management',async () => {

  test.beforeEach(async ({page}) => {
    // initial new pages
    loginPage = new LoginPage(page);
    bookMngPage = new BookManagementPage(page);
    await loginPage.login();
  });
  
  
  test('test create new book', async ({ page }) => {
    let bookName = await generateUUID('HTN');
    // console.log(bookName);
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.checksnbMessage();
    await expect(bookMngPage.snbMessage).toHaveText('You have created a new book successfully');
    await expect(bookMngPage.tblBook).toContainText(bookName);
  
  });
  

  
  
  
  
})