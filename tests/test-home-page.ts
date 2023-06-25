import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';
import LoginPage from '../page-objects/login-page';
import { readJSONFile } from '../utils/data-provider/data-provider';
import { homedir } from 'os';


test.skip('create questions for LOs', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await loginPage.gotoLogin();
  await loginPage.login();

  const data = await readJSONFile('question');
  for(let i=0; i < data.length; i++){
    // console.log(data[i]['choices'][0]);
    await homePage.addNewQuestion();
    await homePage.inputQuestionDescription("Question Number "+ i++ + "\n" + data[i]['question']);
    await homePage.inputQuestionExplanation(data[i]['explanation']);
    for(let x=1;x <= 4;x++){
      await homePage.inputAnswers(x, data[i]['answers'][x-1]);
    }
    await homePage.saveAction();
  }
  await page.pause();
});

test.skip('create chapters and topic for book', async({page})=>{
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await loginPage.gotoLogin();
  await loginPage.login();

  const data = await readJSONFile('chapters-and-topics');

  await homePage.gotoBookDetail('01H3PABGW2KC59CDJNN169BKFV');

  for(let i = 0; i< data.length; i++){
    let chapterName = data[i]['chapter_name']
    await homePage.addNewChapter(chapterName);
    await homePage.gotoChapterDetail(chapterName);
    for(let y =0; y < data[i]['topics'].length; y++){
      let topicName = data[i]['topics'][y];
      await homePage.addNewTopic(topicName);
    }
  }

});

test('check test script',async ({page}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await loginPage.gotoLogin();
  await loginPage.login();

  await homePage.gotoBookDetail('01H3PABGW2KC59CDJNN169BKFV');
  await homePage.gotoChapterDetail('Chapter 1')
  await homePage.addNewTopic('Chapter 1','new 1');
  await homePage.addNewLO('htn', 'hahaa')


  await page.pause();
});
