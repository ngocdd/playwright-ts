/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-14 08:35:36
*/

import { test } from '@playwright/test';
import LoginPage from '../page-objects/login-page';
import { readJSONFile } from '../utils/data-provider/data-provider';
import { LOType } from '../utils/enumeration/enumeration';
import BookManagementPageV2 from '../page-objects/book-management-page-v2';

test.skip('create questions for LO worker 1', async ({ page }) => {
  // await page.waitForTimeout(10000);
  const bookManagementPageV2 = new BookManagementPageV2(page);
  const loginPage = new LoginPage(page);

  await loginPage.login();

  const data = await readJSONFile('10chapter-15topics-5los');

  await bookManagementPageV2.gotoBookDetail('HTN-BOOK_AUTO');

  // create new chapter
  for (let i = 0; i < data.length; i++) {
    let chapterName = data[i]['chapter_name'];
    await bookManagementPageV2.addNewChapter(chapterName);
    await bookManagementPageV2.gotoChapterDetail(chapterName);

    // create new topic
    for (let y = 0; y < data[i]['topics'].length; y++) {
      // for(let y = 0; y < 2; y++){
      let topicName = data[i]['topics'][y]['topic_name'];
      await bookManagementPageV2.addNewTopic(chapterName, topicName);
      await bookManagementPageV2.gotoTopicDetail(topicName);

      // create new LO
      for (let z = 0; z < data[i]['topics'][z]['LO'].length; z++) {
        // for(let z=0; z < 2; z++){
        let loName = data[i]['topics'][z]['LO'][z];
        await bookManagementPageV2.addNewLO(topicName, LOType.LO, `LO ${y + 1}.${z + 1}  ${loName}`);
        // console.log(` Worker1:    Chapter ${i+1} - Topic ${y+1} - LO ${y+1}.${z+1}:  ${loName}`);
        await bookManagementPageV2.gotoLosDetail(`Chapter ${i + 1} - Topic ${y + 1} - LO ${z + 1}: ${loName}`);

        // create question for LO
        // for(let q=0; q < 3; q++){
        //   await bookManagementPageV2.addNewQuestion();
        //   await bookManagementPageV2.inputQuestionDescription(`Question number ${q+1} \n ${questionData[q]['question']}`);

        //   // add answer for questions
        //   for(let a =0; a < questionData[q]['answers'].length; a++){
        //     await bookManagementPageV2.inputAnswers(a+1, questionData[q]['answers'][a]);
        //   }
        //   await bookManagementPageV2.inputQuestionExplanation(questionData[q]['explanation']);
        //   await bookManagementPageV2.saveAction();
        // }
        await bookManagementPageV2.backtoTopicDetail();
      }
    }
  }
});
