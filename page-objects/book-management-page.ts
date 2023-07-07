/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 09:43:05                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-07 22:55:07                               *
 *****************************************************************************/

import { Page, expect, Locator } from '@playwright/test'
import { LOType, MoveDirection } from '../utils/enumeration/enumeration'
import Actions from '../utils/actions/actions'

export default class BookManagementPage extends Actions {
  // list elements
  readonly page: Page
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
    super(page)
    this.page = page
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
    this.snbMessage = page.getByTestId('SnackbarBase__content')
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
    await this.click(this.mnuLearningMaterial, 'open Learning Material menu')
    await this.click(this.mnuBookManagement, 'open book management')
  }

  async addNewBook(bookName: string) {
    await this.click(this.btnAddBook, 'tap on add new book button')
    await this.input(this.txtBookName, bookName, `input book name: ${bookName}`)
    await this.click(this.btnSave, 'tap on save button')
  }

  async gotoBookDetail(bookName: string) {
    await this.click(this.mnuBookName(bookName), `click on book name ${bookName}`)
  }

  async gotoChapterDetail(chapterName: string) {
    const chapterExpandResult = await this.sttCheckExpand(chapterName)
    if (chapterExpandResult == 'true') {
      // do nothing
    } else {
      await this.click(this.mnuChapter, `click on chapter ${chapterName}`)
    }
  }

  async gotoTopicDetail(topicName: string) {
    const chapterExpandResult = await this.sttCheckExpand(topicName)
    if (chapterExpandResult == 'true') {
      // do nothing
    } else {
      await this.click(this.mnuTopic, `click on topic name ${topicName}`)
    }
  }

  async gotoLosDetail(loName: string) {
    await this.click(this.mnuLO, `click on LO ${loName}`)
  }

  async addNewChapter(chapterName: string) {
    await this.click(this.btnAddChapter, ' tap on add chapter button')
    await this.input(this.txtChapterName, chapterName, `input chapter name is ${chapterName}`)
    await this.click(this.btnChapterSave, 'tap on save chapter button')
  }

  async addNewTopic(chapterName: string, topicName: string) {
    await this.click(this.btnAddTopic(chapterName), `click on add Topic for chapter ${chapterName}`)
    await this.input(this.txtTopicName, topicName, `input topic name is ${topicName}`)
    await this.click(this.btnSave, 'tap on save button')
  }

  async addNewLO(topicName: string, loType: LOType, loName: string) {
    await this.click(this.btnAddLO(topicName), 'click on add LO button')
    await this.click(this.lstLO, 'select dropdown list LO')
    await this.click(this.ddlLOType(loType), `select LO type is ${loType}`)
    if ([LOType.LO, LOType.FlashCard].includes(loType)) {
      await this.input(this.txtLOName, loName, `input LO name is ${loName}`)
      await this.click(this.btnSave, 'tap on save button')
    }
  }

  async addNewQuestion() {
    await this.click(this.btnQuestions, 'click on question menu')
    await this.click(this.btnCreateQuestion, 'click create new quesitons')
  }

  async addNewAnswer() {
    await this.click(this.btnAddAnswer, 'click on add new answer')
  }

  async selectCorrectAnswer(answerNumber = 1) {
    await this.click(this.rdoCorrectAnswer(answerNumber), `click correct answer numer ${answerNumber}`)
  }

  async inputQuestionDescription(questionDescription: string) {
    await this.input(
      this.txtQuestionDescription,
      questionDescription,
      `input question description is ${questionDescription}`
    )
  }

  async inputQuestionExplanation(questionExplanation: string) {
    await this.input(
      this.txtQuestionExplanation,
      questionExplanation,
      `input question Explanation is ${questionExplanation}`
    )
  }

  async inputAnswers(answerNumber: number, answerDescription: string) {
    await this.input(
      this.txtQuestionAnswers(answerNumber),
      answerDescription,
      `input answer description is ${answerDescription}`
    )
  }

  async backtoTopicDetail() {
    await this.click(this.brdcTopic, 'click into topic on breadcum')
  }

  async moveChapter(chapterName: string, direction: MoveDirection) {
    if (direction == MoveDirection.Down) {
      await this.click(this.btnMoveChapterDown(chapterName), `tap move move chapter ${chapterName} down`)
    }
    if (direction == MoveDirection.Up) {
      await this.click(this.btnMoveChapterUp(chapterName), `tap move move chapter ${chapterName} up`)
    }
  }

  async moveTopic(topicName: string, direction: MoveDirection) {
    if (direction == MoveDirection.Down) {
      await this.click(this.btnMoveTopicDown(topicName), `click on move Topic ${topicName} down`)
    }
    if (direction == MoveDirection.Up) {
      await this.click(this.btnMoveTopicUp(topicName), `click on move Topic ${topicName} up`)
    }
  }
}
