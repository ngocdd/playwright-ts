import { test, expect, Locator } from '@playwright/test';
import BookManagementPage from '../page-objects/book-management-page';
import { readJSONFile, generateUUID } from '../utils/data-provider/data-provider';
import { LOType, MoveDirection } from '../utils/enumeration/enumeration';
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
    await bookMngPage.gotoBookDetail(bookName);
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
    await bookMngPage.gotoBookDetail(bookName);
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
    await bookMngPage.gotoBookDetail(bookName);
    await bookMngPage.addNewChapter(chapterName);
    await bookMngPage.addNewTopic(chapterName, topicName);
    await bookMngPage.addNewLO(topicName, LOType.LO, loName);
    await bookMngPage.backtoTopicDetail();

    await expect(bookMngPage.snbMessage.last()).toHaveText('You have created a new LO successfully');
    await expect(bookMngPage.mnuLO(loName)).toHaveText(loName);
    // await page.pause();
  }); 


  test('test move chapter', async ({ page }) => {
    // initial
    let bookName = await generateUUID('Book');
    let chapterName1 = await generateUUID('Chapter1');
    let chapterName2 = await generateUUID('Chapter2');
    let chapterName3 = await generateUUID('Chapter3');

    // precondition
    await bookMngPage.gotoBookManagement();
    await bookMngPage.addNewBook(bookName);
    await bookMngPage.gotoBookDetail(bookName);
    await bookMngPage.addNewChapter(chapterName1);
    await bookMngPage.addNewChapter(chapterName2);
    await bookMngPage.addNewChapter(chapterName3);

    // steps
    await bookMngPage.moveChapter(chapterName1, MoveDirection.Down);
    await bookMngPage.moveChapter(chapterName3, MoveDirection.Up);
    
    // Assertion
    await expect(bookMngPage.btnMoveChapterDown(chapterName3)).toBeEnabled();
    const listOriginalChapter = await bookMngPage.lstChapter.all();
    // console.log(listOriginalChapter);
    
    let afterMove = [];
    for(let i =0; i < listOriginalChapter.length; i++){
      const name = await listOriginalChapter[i].textContent();
      afterMove.push(name);
    }
    await expect(afterMove[0]).toEqual(chapterName2);
    await expect(afterMove[1]).toEqual(chapterName3);
    await expect(afterMove[2]).toEqual(chapterName1);
    // console.log(afterMove);
    
  }); 

  test.only('test move topic', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book');
    let chapterName = await generateUUID('Chapter');
    let topicName1 = await generateUUID('Topic1');
    let topicName2 = await generateUUID('Topic2');
    let topicName3 = await generateUUID('Topic3');

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


    // ASSERTION
    await expect(await bookMngPage.btnMoveTopicUp(topicName3)).toBeEnabled();
    const listOriginalChapter = await bookMngPage.lstTopic(chapterName).all();
    
    let afterMove = [];
    for(let i =0; i < listOriginalChapter.length; i++){
      const name = await listOriginalChapter[i].textContent();
      afterMove.push(name);
    }
    await expect(afterMove[0]).toEqual(topicName2);
    await expect(afterMove[1]).toEqual(topicName3);
    await expect(afterMove[2]).toEqual(topicName1);

  }); 


  
})