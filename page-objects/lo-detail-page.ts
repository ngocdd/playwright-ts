/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-12 23:00:08
*/

import { Page, Locator } from '@playwright/test';
import Actions from '../utils/actions/actions';
import Asserts from '../utils/actions/asserts';

export default class LOPage {
  // list Pages
  readonly page: Page;
  readonly actions: Actions;
  readonly asserts: Asserts;

  // list Elements
  readonly btnSave: Locator;
  readonly btnEditLO: Locator;
  readonly lblUploadVideo: Locator;
  readonly lblUploadPdf: Locator;
  readonly txtBrightCoveLink: Locator;
  readonly btnBrightCoveUpload: Locator;
  readonly btnQuestions: Locator;
  readonly btnCreateQuestion: Locator;
  readonly ddlQuestionType: Locator;
  readonly txtQuestionDescription: Locator;
  readonly txtQuestionAnswers: any;
  readonly txtQuestionExplanation: Locator;
  readonly btnDeleteQuestion: Locator;
  readonly rdoCorrectAnswer: any;
  readonly btnAddAnswer: Locator;
  readonly btnExamDetail: Locator;
  readonly snbMessage: Locator;
  readonly lblQuestionTitle: Locator;

  // constructor
  constructor(page: Page) {
    // initial Pages
    this.page = page;
    this.actions = new Actions(page);
    this.asserts = new Asserts(page);

    // initial Elements
    this.btnSave = page.getByTestId('FooterDialogConfirm__buttonSave');
    this.btnEditLO = page.getByTestId('WrapperPageHeader__root').getByTestId('ActionPanel__root');
    this.lblUploadVideo = page.getByTestId('UploadInput__inputFile').first();
    this.lblUploadPdf = page.getByTestId('UploadInput__inputFile').last();
    this.txtBrightCoveLink = page.getByTestId('BrightCoveUpload__input');
    this.btnBrightCoveUpload = page.getByTestId('BrightCoveUpload_button');
    this.btnQuestions = page.getByTestId('QuestionListSectionHeader__action').getByTestId('ActionPanel__trigger');
    this.btnCreateQuestion = page.getByLabel('createQuestion', {
      exact: true,
    });
    this.btnDeleteQuestion = page.getByTestId('QuizAnswer__DeleteButton');
    this.ddlQuestionType = page.getByTestId('QuizTypeSelect__root');
    this.txtQuestionDescription = page
      .getByTestId('Editor__content')
      .filter({ hasText: 'Question Description' })
      .getByTestId('Editor__draftEditor');
    this.txtQuestionAnswers = (answerNumber = 1) => {
      return page
        .getByTestId('Editor__content')
        .filter({ hasText: `Answer ${answerNumber}` })
        .getByTestId('Editor__draftEditor');
    };
    this.txtQuestionExplanation = page
      .getByTestId('Editor__content')
      .filter({ hasText: 'Explanation' })
      .getByTestId('Editor__draftEditor');
    this.rdoCorrectAnswer = (answerNumber = 1) => {
      return page
        .getByTestId('QuizMCQAnswerItem__root')
        .filter({ hasText: `Answer ${answerNumber}` })
        .getByTestId('QuizMCQRadioHF__radio');
    };
    this.btnAddAnswer = page.getByTestId('QuizAnswerList__btnAddAnswer');
    this.btnExamDetail = page.getByTestId('ExamDetail__questionsTab');
    this.snbMessage = this.page.getByTestId('SnackbarBase__content');
    this.lblQuestionTitle = page.getByTestId('QuestionTitleWithPoint__title');
  }

  async saveAction() {
    await this.actions.click(this.btnSave, `click on Save button`);
  }

  async addNewQuestion() {
    await this.actions.click(this.btnQuestions, 'click on question menu');
    await this.actions.click(this.btnCreateQuestion, 'click create new quesitons');
  }

  async addNewAnswer() {
    await this.actions.click(this.btnAddAnswer, 'click on add new answer');
  }

  async selectCorrectAnswer(answerNumber = 1) {
    await this.actions.click(this.rdoCorrectAnswer(answerNumber), `click correct answer numer ${answerNumber}`);
  }

  async inputQuestionDescription(questionDescription: string) {
    await this.actions.input(
      this.txtQuestionDescription,
      questionDescription,
      `input question description is ${questionDescription}`
    );
  }

  async inputQuestionExplanation(questionExplanation: string) {
    await this.actions.input(
      this.txtQuestionExplanation,
      questionExplanation,
      `input question Explanation is ${questionExplanation}`
    );
  }

  async inputAnswers(answerNumber: number, answerDescription: string) {
    await this.actions.input(
      this.txtQuestionAnswers(answerNumber),
      answerDescription,
      `input answer description is ${answerDescription}`
    );
  }
}
