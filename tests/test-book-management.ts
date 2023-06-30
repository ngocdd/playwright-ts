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
  
  
  test.skip('test create new book', async ({ page }) => {
    let bookName = await generateUUID('Book');
    // console.log(bookName);
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await expect(bookMngPage.snbMessage).toHaveText('You have created a new book successfully');
    await expect(bookMngPage.tblBook).toContainText(bookName);
  });

  test('test create new chapter in book', async ({ page }) => {
    let bookName = await generateUUID('Book');
    // console.log(bookName);
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);


    await bookMngPage.searchBook(bookName);

    let chapterName = await generateUUID('Chapter');
    await bookMngPage.addNewChapter(chapterName);

    await expect(bookMngPage.mnuChapter).toHaveText(chapterName);


  });
  

  
  
  
  
})