/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-12 10:53:16
*/

import { test } from '@playwright/test';
import BookManagementPage from '../page-objects/book-management-page';
import { generateUUID } from '../utils/data-provider/data-provider';
import { LOType, MoveDirection } from '../utils/enumeration/enumeration';
import LoginPage from '../page-objects/login-page';

let loginPage: LoginPage;
let bookMngPage: BookManagementPage;

test.describe('test Book Management', async () => {
  test.beforeEach(async ({ page }) => {
    // INITIAL
    loginPage = new LoginPage(page);
    bookMngPage = new BookManagementPage(page);

    // PRECONDITIONS
    await loginPage.login();
  });



  test('test create new LO', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book');
    let chapterName = await generateUUID('Chapter');
    let topicName = await generateUUID('Topic');
    let loName = await generateUUID('LO');

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.gotoBookDetail(bookName);
    await bookMngPage.addNewChapter(chapterName);
    await bookMngPage.addNewTopic(chapterName, topicName);

    // STEPS
    await bookMngPage.addNewLO(topicName, LOType.LO, loName);
    await bookMngPage.backToTopicDetail();

    // ASSERTIONS
    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have created a new LO successfully',
      `check notification create LO successfully`
    );
    await bookMngPage.asserts.toHaveText(bookMngPage.mnuLO(loName), loName, `check lo name is ${loName} created`);
  });

   test('test questions for LO', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book');
    let chapterName = await generateUUID('Chapter');
    let topicName = await generateUUID('Topic');
    let loName = await generateUUID('LO');

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.gotoBookDetail(bookName);
    await bookMngPage.addNewChapter(chapterName);
    await bookMngPage.addNewTopic(chapterName, topicName);

    // STEPS
    await bookMngPage.addNewLO(topicName, LOType.LO, loName);
    await bookMngPage.backToTopicDetail();

    // ASSERTIONS
    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have created a new LO successfully',
      `check notification create LO successfully`
    );
    await bookMngPage.asserts.toHaveText(bookMngPage.mnuLO(loName), loName, `check lo name is ${loName} created`);
  });

 
});
