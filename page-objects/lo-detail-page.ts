/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-14 09:01:50
*/

import { Page, Locator } from '@playwright/test';
import Actions from '../utils/actions/actions';
import Asserts from '../utils/actions/asserts';
import { MoveDirection, QuestionTypes } from '../utils/enumeration/enumeration';

export default class LODetailPage {
  // list Pages
  readonly page: Page;
  readonly actions: Actions;
  readonly asserts: Asserts;

  // list Elements
  readonly btnSave: any;
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
  readonly btnPreviewQuestion: Locator;
  readonly ddlQuestionTypes: Locator;
  readonly ddlDiffLevel: Locator;
  readonly ddlQuestionTags: Locator;
  readonly txtFibAnswers: any;
  readonly txtFibAlAnswer: any;
  readonly lstQuestionType: any;
  readonly btnMoveLoUp: any;
  readonly btnMoveLoDown: any;

  // constructor
  constructor(page: Page) {
    // initial Pages
    this.page = page;
    this.actions = new Actions(page);
    this.asserts = new Asserts(page);

    // initial Elements
    this.btnSave = (label: string) => {
      return page.getByTestId('FooterDialogConfirm__buttonSave').filter({ hasText: label });
    };
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
    this.btnPreviewQuestion = page.getByTestId('QuizMain__buttonPreview');
    this.ddlQuestionTypes = page.getByTestId('QuizTypeSelect__root');

    this.ddlDiffLevel = page.getByTestId('SelectHF__select');
    this.ddlQuestionTags = page.getByTestId('QuizDescription__tag');
    this.txtFibAnswers = (answerNumber: number) => {
      return page.getByPlaceholder(`Answer 0${answerNumber}`);
    };
    this.txtFibAlAnswer = (answerNumber: number) => {
      return page
        .getByTestId('QuizFIBAnswerItem__root')
        .filter({ hasText: `Answer ${answerNumber}` })
        .getByTestId('QuizFIBAnswerInput__alternative');
    };
    this.lstQuestionType = (questionType: QuestionTypes) => {
      return page.getByRole('option').filter({ hasText: questionType });
    };
    this.btnMoveLoDown = (loName: string) => {
      return page
        .getByTestId('LOAndAssignmentItem__root')
        .filter({ hasText: loName })
        .getByTestId('LOAndAssignmentItem__moveDown');
    };

    this.btnMoveLoUp = (loName: string) => {
      return page
        .getByTestId('LOAndAssignmentItem__root')
        .filter({ hasText: loName })
        .getByTestId('LOAndAssignmentItem__moveDown');
    };
  }

  async saveAction(label: string) {
    await this.actions.click(this.btnSave(label), `click on Save button`);
  }

  async selectQuestionTypes(questionType: QuestionTypes) {
    await this.actions.click(this.ddlQuestionTypes, `select question type`);
    await this.actions.click(this.lstQuestionType(questionType), `select question type ${questionType}`);
    await this.actions.click(this.btnSave('Confirm'), `click on Confirm button`);
  }

  async addNewQuestion() {
    await this.actions.click(this.btnQuestions, 'click on question menu');
    await this.actions.click(this.btnCreateQuestion, 'click create new question');
  }

  async addNewAnswer() {
    await this.actions.click(this.btnAddAnswer, 'click on add new answer');
  }

  async selectCorrectAnswer(answerNumber = 1) {
    await this.actions.click(this.rdoCorrectAnswer(answerNumber), `click correct answer number ${answerNumber}`);
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

  async moveLo(loName: string, direction: MoveDirection) {
    if ((direction = MoveDirection.Up)) {
      await this.actions.click(this.btnMoveLoUp(loName), `move lo ${loName} ${direction}`);
    } else {
      await this.actions.click(this.btnMoveLoDown(loName), `move lo ${loName} ${direction}`);
    }
  }
}
