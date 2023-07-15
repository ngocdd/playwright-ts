/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-15 11:33:06
*/

import { test } from '@playwright/test';
import BookManagementPage from '../page-objects/book-management-page';
import { generateRandom } from '../utils/data-provider/data-provider';
import { MoveDirection } from '../utils/enumeration/enumeration';
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

  test('test create new book', async ({ page }) => {
    // INITIAL
    let bookName = await generateRandom('Book');

    // PRECONDITIONS
    // STEPS
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);

    // ASSERTIONS

    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have created a new book successfully',
      'check created a new book successfully notification'
    );
    await bookMngPage.asserts.toHaveText(
      bookMngPage.mnuBookName(bookName),
      bookName,
      `check table book contain book name is ${bookName}`
    );
  });

  test('test create new chapter', async ({ page }) => {
    // INITIAL
    let bookName = await generateRandom('Book');
    let chapterName = await generateRandom('Chapter');

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.gotoBookDetail(bookName);

    // STEPS
    await bookMngPage.addNewChapter(chapterName);

    // ASSERTIONS
    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have added chapter successfully',
      'check created a new chapter successfully notification'
    );
    await bookMngPage.asserts.toHaveText(
      bookMngPage.mnuChapter(chapterName),
      chapterName,
      `check chapter ${chapterName} created`
    );
  });

  test('test create new topic', async ({ page }) => {
    // INITIAL
    let bookName = await generateRandom('Book');
    let chapterName = await generateRandom('Chapter');
    let topicName = await generateRandom('Topic');

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.gotoBookDetail(bookName);
    await bookMngPage.addNewChapter(chapterName);

    // STEPS
    await bookMngPage.addNewTopic(chapterName, topicName);

    // ASSERTIONS
    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have added topic successfully',
      ` check success notification`
    );

    await bookMngPage.asserts.toHaveText(
      bookMngPage.mnuTopic(topicName),
      topicName,
      `check topic name ${topicName} created`
    );
  });

  test('test move chapter', async ({ page }) => {
    // INITIAL
    let bookName = await generateRandom('Book');
    let chapterName1 = await generateRandom('Chapter1');
    let chapterName2 = await generateRandom('Chapter2');
    let chapterName3 = await generateRandom('Chapter3');

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.gotoBookDetail(bookName);
    await bookMngPage.addNewChapter(chapterName1);
    await bookMngPage.addNewChapter(chapterName2);
    await bookMngPage.addNewChapter(chapterName3);

    // STEPS
    await bookMngPage.moveChapter(chapterName1, MoveDirection.Down);
    await bookMngPage.moveChapter(chapterName3, MoveDirection.Up);

    // ASSERTIONS
    await bookMngPage.asserts.toBeEnable(bookMngPage.btnMoveChapterDown(chapterName3), `check move button is enable`);
    const listOriginalChapter = await bookMngPage.lstChapter.all();
    let afterMove = [];
    for (let i = 0; i < listOriginalChapter.length; i++) {
      const name = await listOriginalChapter[i];
      afterMove.push(name);
    }
    await bookMngPage.asserts.toHaveText(afterMove[0], chapterName2, `check move chapter 2`);
    await bookMngPage.asserts.toHaveText(afterMove[1], chapterName3, `check move chapter 3`);
    await bookMngPage.asserts.toHaveText(afterMove[2], chapterName1, `check move chapter 1`);
  });

  test('test move topic', async ({ page }) => {
    // INITIAL
    let bookName = await generateRandom('Book');
    let chapterName = await generateRandom('Chapter');
    let topicName1 = await generateRandom('Topic1');
    let topicName2 = await generateRandom('Topic2');
    let topicName3 = await generateRandom('Topic3');

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.gotoBookDetail(bookName);
    await bookMngPage.addNewChapter(chapterName);
    await bookMngPage.addNewTopic(chapterName, topicName1);
    await bookMngPage.addNewTopic(chapterName, topicName2);
    await bookMngPage.addNewTopic(chapterName, topicName3);

    //  STEPS
    await bookMngPage.moveTopic(topicName1, MoveDirection.Down);
    await bookMngPage.moveTopic(topicName3, MoveDirection.Up);

    // ASSERTIONS
    await bookMngPage.asserts.toBeEnable(bookMngPage.btnMoveTopicUp(topicName3), `check move button is enable`);
    const listOriginalTopic = await bookMngPage.lstTopic(chapterName).all();

    let afterMove = [];
    for (let i = 0; i < listOriginalTopic.length; i++) {
      const name = await listOriginalTopic[i];
      afterMove.push(name);
    }

    await bookMngPage.asserts.toHaveText(afterMove[0], topicName2, `check move topic 2`);
    await bookMngPage.asserts.toHaveText(afterMove[1], topicName3, `check move topic 3`);
    await bookMngPage.asserts.toHaveText(afterMove[2], topicName1, `check move topic 1`);
  });
});
