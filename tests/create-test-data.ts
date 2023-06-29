import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';
import LoginPage from '../page-objects/login-page';
import { readJSONFile } from '../utils/data-provider/data-provider';
import { LOType } from '../utils/enumeration/enumeration';



test.skip('create questions for LO worker 1', async({page})=>{
  // await page.waitForTimeout(10000);
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await loginPage.gotoLogin();
  await loginPage.login();

  const data = await readJSONFile('10chapter-15topics-5los');
  const questionData = await readJSONFile('question');

  await homePage.gotoBookDetail('01H3XVF42FTPAXF60EG5YDABVT');

  // create new chapter
  for(let i = 0; i< data.length; i++){
    let chapterName = data[i]['chapter_name']
    await homePage.addNewChapter(chapterName);
    await homePage.gotoChapterDetail(chapterName);

    // create new topic
    for(let y = 0; y < data[i]['topics'].length; y++){
    // for(let y = 0; y < 2; y++){
      let topicName = data[i]['topics'][y]['topic_name'];
      await homePage.addNewTopic(chapterName, topicName);
      await homePage.gotoTopicDetail(topicName);

      // create new LO
      for(let z=0; z < data[i]['topics'][z]['LO'].length; z++){
      // for(let z=0; z < 2; z++){
        let loName = data[i]['topics'][z]['LO'][z];
        await homePage.addNewLO(topicName, LOType.LO, `LO ${y+1}.${z+1}  ${loName}`);
        // console.log(` Worker1:    Chapter ${i+1} - Topic ${y+1} - LO ${y+1}.${z+1}:  ${loName}`);
        await homePage.gotoLosDetail(`Chapter ${i+1} - Topic ${y+1} - LO ${z+1}: ${loName}`);

        // create question for LO
        for(let q=0; q < 3; q++){
          await homePage.addNewQuestion();
          await homePage.inputQuestionDescription(`Question number ${q+1} \n ${questionData[q]['question']}`);

          // add answer for questions
          for(let a =0; a < questionData[q]['answers'].length; a++){
            await homePage.inputAnswers(a+1, questionData[q]['answers'][a]);
          }
          await homePage.inputQuestionExplanation(questionData[q]['explanation']);
          await homePage.saveAction();
        }
        await homePage.backtoTopic();
      }
    }
  }
});

