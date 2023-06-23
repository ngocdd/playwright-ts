import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';
import LoginPage from '../page-objects/login-page';
import { readJSONFile } from '../utils/data-provider/data-provider';


test('test Elements page', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await loginPage.gotoLogin();
  await loginPage.login();
  await homePage.gotoExamDetail();
  const data = await readJSONFile('./utils/test-data/question.json');
  for(let i=0; i < data.length; i++){
    // console.log(data[i]['choices'][0]);
    await homePage.addNewQuestion();
    await homePage.inputQuestionDescription(data[i]['question']);
    await homePage.inputQuestionExplanation(data[i]['explanation']);
    for(let x=1;x <= 4;x++){
      await homePage.inputAnswers(x, data[i]['answers'][x-1]);
    }
    await homePage.saveAction();
  }
  await page.pause();
});

