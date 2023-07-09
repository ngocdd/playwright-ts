/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 09:43:05                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-09 23:37:01                               *
 *****************************************************************************/

import { Page, expect, Locator } from '@playwright/test'
import { LOType, MoveDirection } from '../utils/enumeration/enumeration'
import Actions from '../utils/actions/actions'
import Asserts from '../utils/actions/asserts'

export default class BookManagementPage {
  // list elements
  readonly page: Page
  readonly actions: Actions
  readonly asserts: Asserts
  readonly mnuLearningMaterial: Locator
  readonly tblBook: Locator
  readonly mnuBookManagement: Locator
  readonly btnAddBook: Locator
  readonly txtBookName: Locator
  readonly txtChapterName: Locator
  readonly btnSave: Locator
  readonly btnAddChapter: Locator
  readonly btnChapterSave: Locator
  readonly btnAddTopic: any
  readonly btnAddLO: any
  readonly lstLO: Locator
  readonly ddlLOType: any
  readonly txtTopicName: Locator
  readonly txtLOName: Locator
  readonly btnQuestions: Locator
  readonly btnCreateQuestion: Locator
  readonly ddlQuestionType: Locator
  readonly txtQuestionDescription: Locator
  readonly txtQuestionAnswers: any
  readonly txtQuestionExplanation: Locator
  readonly btnDeleteQuestion: Locator
  readonly rdoCorrectAnswer: any
  readonly btnAddAnswer: Locator
  readonly btnExamDetail: Locator
  readonly mnuChapter: any
  readonly mnuTopic: any
  readonly mnuLO: any
  readonly sttCheckExpand: any
  readonly brdcTopic: Locator
  readonly snbMessage: Locator
  readonly txtSearchBox: Locator
  readonly mnuBookName: any
  readonly btnMoveChapterUp: any
  readonly btnMoveChapterDown: any
  readonly btnMoveTopicDown: any
  readonly btnMoveTopicUp: any
  readonly lstTopic: any
  readonly lstChapter: any

  // constructor
  constructor(page: Page) {
    this.page = page
    this.actions = new Actions(page)
    this.asserts = new Asserts(page)
    this.mnuLearningMaterial = page.getByTestId('MenuGroup__root').getByText('Learning Material')
    this.tblBook = page.getByTestId('TableBaseBody__root')
    this.mnuBookManagement = page.getByLabel('Book', {
      exact: true,
    })
    this.mnuBookName = (bookName: string) => {
      return page.getByTitle(bookName).getByTestId('BookList__bookName')
    }

    this.txtBookName = page.getByTestId('TextFieldHF__input')
    this.btnAddBook = page.getByTestId('AddBook__addButton')
    this.txtChapterName = page.getByTestId('ChapterForm__root').getByTestId('TextFieldHF__input')
    this.txtTopicName = page.getByTestId('TopicForm__root').getByTestId('TextFieldHF__input')
    this.btnSave = page.getByTestId('FooterDialogConfirm__buttonSave')
    this.btnAddChapter = page.getByTestId('ChapterForm__visibleFormControl')
    this.btnChapterSave = page.getByTestId('ChapterForm__submit')
    this.btnAddTopic = (chapterName: string) => {
      return page.getByTestId('ChapterItem_root').filter({ hasText: chapterName }).getByTestId('TopicList__createTopic')
    }
    this.btnAddLO = (topicName: string) => {
      return page.getByTestId('TopicItem__root').filter({ hasText: topicName }).getByTestId('LOAndAssignment__addLOs')
    }
    this.lstLO = page.getByTestId('SelectHF__select')
    this.ddlLOType = (loType: LOType) => {
      return page.locator(`[data-value="${loType}"]`)
    }
    this.txtLOName = page.getByTestId('TextFieldHF__input')
    this.btnQuestions = page.getByTestId('QuestionListSectionHeader__action').getByTestId('ActionPanel__trigger')
    this.btnCreateQuestion = page.getByLabel('createQuestion', {
      exact: true,
    })
    this.btnDeleteQuestion = page.getByTestId('QuizAnswer__DeleteButton')
    this.ddlQuestionType = page.getByTestId('QuizTypeSelect__root')
    this.txtQuestionDescription = page
      .getByTestId('Editor__content')
      .filter({ hasText: 'Question Description' })
      .getByTestId('Editor__draftEditor')
    this.txtQuestionAnswers = (answerNumber = 1) => {
      return page
        .getByTestId('Editor__content')
        .filter({ hasText: `Answer ${answerNumber}` })
        .getByTestId('Editor__draftEditor')
    }
    this.txtQuestionExplanation = page
      .getByTestId('Editor__content')
      .filter({ hasText: 'Explanation' })
      .getByTestId('Editor__draftEditor')
    this.rdoCorrectAnswer = (answerNumber = 1) => {
      return page
        .getByTestId('QuizMCQAnswerItem__root')
        .filter({ hasText: `Answer ${answerNumber}` })
        .getByTestId('QuizMCQRadioHF__radio')
    }
    this.btnAddAnswer = page.getByTestId('QuizAnswerList__btnAddAnswer')
    this.btnExamDetail = page.getByTestId('ExamDetail__questionsTab')
    this.mnuChapter = (chapterName: string) => {
      return page.getByTestId('AccordionSummaryBase__content').filter({ hasText: chapterName })
    }
    this.mnuTopic = (topicName: string) => {
      return page.getByTestId('TopicAccordion__name').filter({ hasText: topicName })
    }
    this.mnuLO = (loName: string) => {
      return page.getByTestId('LOAndAssignmentItem__name').filter({ hasText: loName })
    }
    this.sttCheckExpand = (name: string) => {
      return page
        .getByTestId('AccordionSummaryBase__root')
        .filter({ hasText: `${name}` })
        .getAttribute('aria-expanded')
    }
    this.brdcTopic = page.getByTestId('MBreadcrumbItem').last()
    this.snbMessage = this.page.getByTestId('SnackbarBase__content')
    this.txtSearchBox = page.getByPlaceholder('Enter your keyword')
    this.btnMoveChapterDown = (chapterName: string) => {
      return page
        .getByTestId('AccordionSummaryBase__root')
        .filter({ hasText: chapterName })
        .getByTestId('ChapterItem__moveDown')
    }
    this.btnMoveChapterUp = (chapterName: string) => {
      return page
        .getByTestId('AccordionSummaryBase__root')
        .filter({ hasText: chapterName })
        .getByTestId('ChapterItem__moveUp')
    }
    this.btnMoveTopicDown = (topicName: string) => {
      return page
        .getByTestId('AccordionSummaryBase__root')
        .filter({ hasText: topicName })
        .getByTestId('TopicItem__moveDown')
    }
    this.btnMoveTopicUp = (topicName: string) => {
      return page
        .getByTestId('AccordionSummaryBase__root')
        .filter({ hasText: topicName })
        .getByTestId('TopicItem__moveUp')
    }
    this.lstTopic = (chapterName: string) => {
      return page.getByTestId('ChapterItem_root').filter({ hasText: chapterName }).getByTestId('TopicAccordion__name')
    }
    this.lstChapter = page.getByTestId('ChapterAccordion__name')
  }

  //
  async gotoBookManagement() {
    await this.actions.click(this.mnuLearningMaterial, 'open Learning Material menu')
    await this.actions.click(this.mnuBookManagement, 'open book management')
  }

  async addNewBook(bookName: string) {
    await this.actions.click(this.btnAddBook, 'tap on add new book button')
    await this.actions.input(this.txtBookName, bookName, `input book name: ${bookName}`)
    await this.actions.click(this.btnSave, 'tap on save button')
  }

  async gotoBookDetail(bookName: string) {
    await this.actions.click(this.mnuBookName(bookName), `click on book name ${bookName}`)
  }

  async gotoChapterDetail(chapterName: string) {
    const chapterExpandResult = await this.sttCheckExpand(chapterName)
    if (chapterExpandResult == 'true') {
      // do nothing
    } else {
      await this.actions.click(this.mnuChapter, `click on chapter ${chapterName}`)
    }
  }

  async gotoTopicDetail(topicName: string) {
    const chapterExpandResult = await this.sttCheckExpand(topicName)
    if (chapterExpandResult == 'true') {
      // do nothing
    } else {
      await this.actions.click(this.mnuTopic, `click on topic name ${topicName}`)
    }
  }

  async gotoLosDetail(loName: string) {
    await this.actions.click(this.mnuLO, `click on LO ${loName}`)
  }

  async addNewChapter(chapterName: string) {
    await this.actions.click(this.btnAddChapter, ' tap on add chapter button')
    await this.actions.input(this.txtChapterName, chapterName, `input chapter name is ${chapterName}`)
    await this.actions.click(this.btnChapterSave, 'tap on save chapter button')
  }

  async addNewTopic(chapterName: string, topicName: string) {
    await this.actions.click(this.btnAddTopic(chapterName), `click on add Topic for chapter ${chapterName}`)
    await this.actions.input(this.txtTopicName, topicName, `input topic name is ${topicName}`)
    await this.actions.click(this.btnSave, 'tap on save button')
  }

  async addNewLO(topicName: string, loType: LOType, loName: string) {
    await this.actions.click(this.btnAddLO(topicName), 'click on add LO button')
    await this.actions.click(this.lstLO, 'select dropdown list LO')
    await this.actions.click(this.ddlLOType(loType), `select LO type is ${loType}`)
    if ([LOType.LO, LOType.FlashCard].includes(loType)) {
      await this.actions.input(this.txtLOName, loName, `input LO name is ${loName}`)
      await this.actions.click(this.btnSave, 'tap on save button')
    }
  }

  async addNewQuestion() {
    await this.actions.click(this.btnQuestions, 'click on question menu')
    await this.actions.click(this.btnCreateQuestion, 'click create new quesitons')
  }

  async addNewAnswer() {
    await this.actions.click(this.btnAddAnswer, 'click on add new answer')
  }

  async selectCorrectAnswer(answerNumber = 1) {
    await this.actions.click(this.rdoCorrectAnswer(answerNumber), `click correct answer numer ${answerNumber}`)
  }

  async inputQuestionDescription(questionDescription: string) {
    await this.actions.input(
      this.txtQuestionDescription,
      questionDescription,
      `input question description is ${questionDescription}`
    )
  }

  async inputQuestionExplanation(questionExplanation: string) {
    await this.actions.input(
      this.txtQuestionExplanation,
      questionExplanation,
      `input question Explanation is ${questionExplanation}`
    )
  }

  async inputAnswers(answerNumber: number, answerDescription: string) {
    await this.actions.input(
      this.txtQuestionAnswers(answerNumber),
      answerDescription,
      `input answer description is ${answerDescription}`
    )
  }

  async backtoTopicDetail() {
    await this.actions.click(this.brdcTopic, 'click into topic on breadcum')
  }

  async moveChapter(chapterName: string, direction: MoveDirection) {
    if (direction == MoveDirection.Down) {
      await this.actions.click(this.btnMoveChapterDown(chapterName), `tap move move chapter ${chapterName} down`)
    }
    if (direction == MoveDirection.Up) {
      await this.actions.click(this.btnMoveChapterUp(chapterName), `tap move move chapter ${chapterName} up`)
    }
  }

  async moveTopic(topicName: string, direction: MoveDirection) {
    if (direction == MoveDirection.Down) {
      await this.actions.click(this.btnMoveTopicDown(topicName), `click on move Topic ${topicName} down`)
    }
    if (direction == MoveDirection.Up) {
      await this.actions.click(this.btnMoveTopicUp(topicName), `click on move Topic ${topicName} up`)
    }
  }
}
