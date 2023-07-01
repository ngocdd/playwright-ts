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
    let bookName = await generateUUID('Book');

    // console.log(bookName);
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await expect(bookMngPage.snbMessage).toHaveText('You have created a new book successfully');
    await expect(bookMngPage.mnuBookName(bookName)).toContainText(bookName);
  });

  test('test create new chapter', async ({ page }) => {
    let bookName = await generateUUID('Book');
    let chapterName = await generateUUID('Chapter');

    // console.log(bookName);
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.searchBook(bookName);
    await bookMngPage.addNewChapter(chapterName);

    await expect(bookMngPage.snbMessage.last()).toHaveText('You have added chapter successfully');
    await expect(bookMngPage.mnuChapter(chapterName)).toHaveText(chapterName);
  }); 

  test('test create new topic', async ({ page }) => {
    let bookName = await generateUUID('Book');
    let chapterName = await generateUUID('Chapter');
    let topicName = await generateUUID('Topic');

    // console.log(bookName);
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.searchBook(bookName);
    await bookMngPage.addNewChapter(chapterName);
    await bookMngPage.addNewTopic(chapterName, topicName);

    await expect(bookMngPage.snbMessage.last()).toHaveText('You have added topic successfully');
    await expect(bookMngPage.mnuTopic(topicName)).toHaveText(topicName);
  }); 

  test('test create new LO', async ({ page }) => {
    let bookName = await generateUUID('Book');
    let chapterName = await generateUUID('Chapter');
    let topicName = await generateUUID('Topic');
    let loName = await generateUUID('LO');

    // console.log(bookName);
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.searchBook(bookName);
    await bookMngPage.addNewChapter(chapterName);
    await bookMngPage.addNewTopic(chapterName, topicName);
    await bookMngPage.addNewLO(topicName, LOType.LO, loName);
    await bookMngPage.backtoTopicDetail();

    await expect(bookMngPage.snbMessage.last()).toHaveText('You have created a new LO successfully');
    await expect(bookMngPage.mnuLO(loName)).toHaveText(loName);
    // await page.pause();
  }); 
  
})