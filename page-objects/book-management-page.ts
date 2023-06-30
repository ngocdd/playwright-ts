import { Page, expect, Locator } from "@playwright/test";
import {LOType} from "../utils/enumeration/enumeration"

export default class BookManagementPage{
    // list elements
    readonly page:Page;
    readonly mnuLearningMaterial: Locator;
    readonly tblBook: Locator;
    readonly mnuBookManagement: Locator;
    readonly btnAddBook: Locator;
    readonly txtBookName: Locator;
    readonly txtChapterName: Locator;
    readonly btnSave: Locator;
    readonly btnAddChapter: Locator;
    readonly btnChapterSave: Locator;
    readonly btnAddTopic: any;
    readonly btnAddLO: any;
    readonly lstLO: Locator;
    readonly ddlLOType: any;
    readonly txtTopicName: Locator;
    readonly txtLOName: Locator;
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
    readonly mnuChapter: any;
    readonly mnuTopic: any;
    readonly mnuLO: any;
    readonly sttCheckExpand: any;
    readonly brdcTopic: Locator;
    readonly snbMessage: Locator;
    readonly txtSearchBox: Locator;
    readonly mnuBookName: any;
 
    // constructor
    constructor(page:Page){
        this.page = page;
        this.mnuLearningMaterial = page.getByTestId('MenuGroup__root').getByText('Learning Material');
        this.tblBook = page.getByTestId('TableBaseBody__root');
        this.mnuBookManagement = page.getByLabel('Book', {exact: true});
        this.mnuBookName = (bookName: string) => {return page.getByTestId('BookList__bookNameLink').getByTitle(bookName)};
        this.txtBookName = page.getByTestId('TextFieldHF__input');
        this.btnAddBook = page.getByTestId('AddBook__addButton');
        this.txtChapterName = page.getByTestId('ChapterForm__root').getByTestId('TextFieldHF__input');
        this.txtTopicName = page.getByTestId('TopicForm__root').getByTestId('TextFieldHF__input');
        this.btnSave = page.getByTestId('FooterDialogConfirm__buttonSave');
        this.btnAddChapter = page.getByTestId('ChapterForm__visibleFormControl');
        this.btnChapterSave = page.getByTestId('ChapterForm__submit');
        this.btnAddTopic = (chapterName: string) => {return page.getByTestId('ChapterItem_root').filter({hasText: `${chapterName}`}).getByTestId('TopicList__createTopic');}
        this.btnAddLO = (topicName: string) => {return page.getByTestId('TopicItem__root').filter({hasText: topicName}).getByTestId('LOAndAssignment__addLOs')};
        this.lstLO = page.getByTestId('SelectHF__select');
        this.ddlLOType = (loType: LOType) => {return page.locator(`[data-value="${loType}"]`)};
        this.txtLOName = page.getByTestId('TextFieldHF__input');
        this.btnQuestions = page.getByTestId('QuestionListSectionHeader__action').getByTestId('ActionPanel__trigger');
        this.btnCreateQuestion = page.getByLabel('createQuestion', {exact: true});
        this.btnDeleteQuestion = page.getByTestId('QuizAnswer__DeleteButton');
        this.ddlQuestionType = page.getByTestId('QuizTypeSelect__root');
        this.txtQuestionDescription = page.getByTestId('Editor__content').filter({hasText: 'Question Description'}).getByTestId('Editor__draftEditor');
        this.txtQuestionAnswers = (answerNumber = 1)=>{return page.getByTestId('Editor__content').filter({hasText: `Answer ${answerNumber}`}).getByTestId('Editor__draftEditor');}
        this.txtQuestionExplanation = page.getByTestId('Editor__content').filter({hasText: 'Explanation'}).getByTestId('Editor__draftEditor');
        this.rdoCorrectAnswer = (answerNumber = 1)=>{return page.getByTestId('QuizMCQAnswerItem__root').filter({hasText: `Answer ${answerNumber}`}).getByTestId('QuizMCQRadioHF__radio')};
        this.btnAddAnswer = page.getByTestId('QuizAnswerList__btnAddAnswer');
        this.btnExamDetail = page.getByTestId('ExamDetail__questionsTab');
        this.mnuChapter = (chapterName: string) => {return page.getByTestId('AccordionSummaryBase__content').filter({hasText: `${chapterName}`})};
        this.mnuTopic = (topicName: string) => {return page.getByTestId('TopicAccordion__name').filter({hasText: `${topicName}`})};
        this.mnuLO = (loName: string) => {return page.getByTestId('LOAndAssignmentItem__root').getByTitle(loName)};
        this.sttCheckExpand = (name: string) => {return page.getByTestId('AccordionSummaryBase__root').filter({hasText: `${name}`}).getAttribute('aria-expanded')};
        this.brdcTopic = page.getByTestId('MBreadcrumbItem').last();
        this.snbMessage = page.getByTestId('SnackbarBase__content');
        this.txtSearchBox = page.getByTestId('FormFilterAdvanced__textField').getByPlaceholder('Enter your keyword');
    }   


    // 
    async gotoBookManagement(){
        await this.mnuLearningMaterial.click();
        await this.mnuBookManagement.click();
    }

    async addNewBook(bookName:string){
        await this.btnAddBook.click();
        await this.txtBookName.fill(bookName);
        await this.btnSave.click();
        // console.log(this.dlgSuccessPopup.textContent());
    }

    async gotoBookDetail(bookId?:string){
        if (bookId){
            await this.gotoBookManagement();
            await this.page.goto(`${process.env.BASE_URL}syllabus/books/${bookId}/show`);
        }
    }

    async gotoChapterDetail(chapterName: string){
        const chapterExpandResult = await this.sttCheckExpand(chapterName);
        if(chapterExpandResult == 'true'){
            // do nothing
        }else{
            await this.mnuChapter(chapterName).click();
        }  
    }

    async gotoTopicDetail(topicName: string){
        const chapterExpandResult = await this.sttCheckExpand(topicName);
        if(chapterExpandResult == 'true'){
            // do nothing
        }else{
            await this.mnuTopic(topicName).click();
        }  
    }

    async gotoLosDetail(loName: string){
        await this.mnuLO(loName).click();
    }

    async addNewChapter(chapterName: string){
        await this.btnAddChapter.click();
        await this.txtChapterName.fill(chapterName);
        await this.btnChapterSave.click();
    }

    async addNewTopic(chapterName: string, topicName: string){
        await this.btnAddTopic(chapterName).click();
        await this.txtTopicName.fill(topicName);
        await this.btnSave.click();
    }

    async addNewLO(topicName: string, loType: LOType, loName: string){
        await this.btnAddLO(topicName).click();
        await this.lstLO.click();
        await this.ddlLOType(loType).click();
        if([LOType.LO, LOType.FlashCard].includes(loType)){
            await this.txtLOName.fill(loName);
        }
        await this.btnSave.click();
    }

    async addNewQuestion(){
        await this.btnQuestions.click();
        await this.btnCreateQuestion.click();
    }

    async addNewAnswer(){
        await this.btnAddAnswer.click();
    }

    async selectCorrectAnswer(answerNumber = 1){
        await this.rdoCorrectAnswer(answerNumber).click();
    }

    async inputQuestionDescription(questionDescription: string){;
        await this.txtQuestionDescription.fill(questionDescription);
    }

    async inputQuestionExplanation(QuestionExplanation: string){;
        await this.txtQuestionExplanation.fill(QuestionExplanation);
    }

    async inputAnswers(answerNumber: number, answerDescription: string){
        await this.txtQuestionAnswers(answerNumber).fill(answerDescription);
    }

    async saveAction(){
        await this.btnSave.click();
    }
    
    async backtoTopic(){
        await this.brdcTopic.click();
    }

    async checksnbMessage(){
        // this.page.waitForSelector('SnackbarBase__content');
        const heeh = await this.snbMessage.textContent();
        // console.log(heeh);
    }

    async getListBook(){
        let listBookName = await this.tblBook.textContent();
        // console.log(aa);
        return listBookName;
    }

    async searchBook(bookName: string) {
        await this.txtSearchBox.fill(bookName);
        await this.txtSearchBox.focus();
        await this.page.keyboard.press('Enter');
        await this.mnuBookName(bookName).click();
    }

}