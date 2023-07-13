/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-13 23:03:17
*/

import { test } from '@playwright/test';
import BookManagementPage from '../page-objects/book-management-page';
import { generateUUID, readJSONFile } from '../utils/data-provider/data-provider';
import { LOType, MoveDirection, QuestionTypes } from '../utils/enumeration/enumeration';
import LoginPage from '../page-objects/login-page';
import LODetailPage from '../page-objects/lo-detail-page';

let loginPage: LoginPage;
let bookMngPage: BookManagementPage;
let LoDetailPage: LODetailPage;

test.describe('test Book Management', async () => {
  test.beforeEach(async ({ page }) => {
    // INITIAL
    loginPage = new LoginPage(page);
    bookMngPage = new BookManagementPage(page);
    LoDetailPage = new LODetailPage(page);

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

  test('test move LO', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book');
    let chapterName = await generateUUID('Chapter');
    let topicName = await generateUUID('Topic');
    let loName1 = await generateUUID('LO1');
    let loName2 = await generateUUID('LO2');
    let loName3 = await generateUUID('LO3');

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.gotoBookDetail(bookName);
    await bookMngPage.addNewChapter(chapterName);
    await bookMngPage.addNewTopic(chapterName, topicName);

    // STEPS
    await bookMngPage.addNewLO(topicName, LOType.LO, loName1);
    await bookMngPage.backToTopicDetail();
    await bookMngPage.addNewLO(topicName, LOType.LO, loName2);
    await bookMngPage.backToTopicDetail();
    await bookMngPage.addNewLO(topicName, LOType.LO, loName3);
    await bookMngPage.backToTopicDetail();
    await LODetailPage;

    // ASSERTIONS
    await bookMngPage.asserts.toBeEnable(bookMngPage.btnMoveTopicUp(loName3), `check move button is enable`);
    const listOriginalLO = await bookMngPage.lstTopic(chapterName).all();

    let afterMove = [];
    for (let i = 0; i < listOriginalLO.length; i++) {
      const name = await listOriginalLO[i].textContent();
      afterMove.push(name);
    }

    await bookMngPage.asserts.toHaveText(afterMove[0], loName2, `check move topic 2`);
    await bookMngPage.asserts.toHaveText(afterMove[1], loName2, `check move topic 3`);
    await bookMngPage.asserts.toHaveText(afterMove[2], loName1, `check move topic 1`);
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

    const questionData = await readJSONFile('question');
    //create question for LO
    for (let q = 0; q < 3; q++) {
      await LoDetailPage.addNewQuestion();

      await LoDetailPage.selectQuestionTypes(QuestionTypes.MA);
      await page.pause();
      await LoDetailPage.inputQuestionDescription(`Question number ${q + 1} \n ${questionData[q]['question']}`);

      // add answer for questions
      for (let a = 0; a < questionData[q]['answers'].length; a++) {
        await LoDetailPage.inputAnswers(a + 1, questionData[q]['answers'][a]);
      }
      await LoDetailPage.inputQuestionExplanation(questionData[q]['explanation']);
      await LoDetailPage.saveAction('Save');
      await LoDetailPage.asserts.toHaveText(
        LoDetailPage.snbMessage.last(),
        'You have created a new question successfully',
        `check notification create question successfully`
      );
    }

    // ASSERTIONS
    await LoDetailPage.asserts.toHaveCount(LoDetailPage.lblQuestionTitle, 3, `check have 3 questions created`);
  });
});
