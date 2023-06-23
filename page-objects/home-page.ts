import { Page, expect, Locator } from "@playwright/test";

export default class HomePage{
    // list elements
    readonly page:Page;
    readonly mnuLearningMaterial: Locator;
    readonly mnuBook: Locator;
    readonly btnAddBook: Locator;
    readonly txtChapterName: Locator;
    readonly btnSave: Locator;
    readonly dlgSuccessPopup: Locator;
    readonly btnAddChapter: Locator;
    readonly btnChapterSave: Locator;
    readonly btnAddTopic: Locator;
    readonly btnAddLO: Locator;
    readonly lstLO: Locator;
    readonly ddlLO: Locator;
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

    // constructor
    constructor(page:Page){
        this.page = page;
        this.mnuLearningMaterial = page.getByTestId('MenuGroup__root').getByText('Learning Material');
        this.mnuBook = page.getByLabel('Book', {exact: true});
        this.btnAddBook = page.getByTestId('AddBook__addButton');
        this.txtChapterName = page.getByTestId('ChapterForm__root').getByTestId('TextFieldHF__input');
        this.txtTopicName = page.getByTestId('TopicForm__root').getByTestId('TextFieldHF__input');
        this.btnSave = page.getByTestId('FooterDialogConfirm__buttonSave');
        this.dlgSuccessPopup = page.getByTestId('SnackbarBase__content');
        this.btnAddChapter = page.getByTestId('ChapterForm__visibleFormControl');
        this.btnChapterSave = page.getByTestId('ChapterForm__submit');
        this.btnAddTopic = page.getByTestId('TopicList__createTopic');
        this.btnAddLO = page.getByTestId('LOAndAssignment__addLOs');
        this.lstLO = page.getByTestId('SelectHF__select');
        this.ddlLO = page.getByRole('option').getByText('Learning Objective');
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
    }   

    // 
    async gotoBookManagement(){
        await this.mnuLearningMaterial.click();
        await this.mnuBook.click();
    }

    async addNewBook(bookName:string){
        await this.btnAddBook.click();
        await this.txtChapterName.fill(bookName);
        await this.btnSave.click();
        console.log(this.dlgSuccessPopup.textContent());
    }

    async gotoBookDetail(bookId?:string){
        if (bookId){
            await this.gotoBookManagement();
            await this.page.goto(`${process.env.BASE_URL}syllabus/books/${bookId}/show`);
        }
    }

    async gotoLODetail(loID: string){
        await this.gotoBookManagement();
        await this.page.goto('https://backoffice-mfe.uat.manabie.io/syllabus/learning_objective/01H3MZ0F7HWFB8BDTBJADZZ38A/show?bookId=01H3CH2XGJB6XPGR130H58A2T3&chapterId=01H3MWPBYS9N4X0NKFS0CFATVY&parentId=01H3MWPGR0NS9QQ0DW0WPGSE4P');
    }

    async gotoExamDetail(){
        await this.gotoBookManagement();
        await this.page.goto('https://backoffice-mfe.uat.manabie.io/syllabus/exam_los/01H3N04HKWT566P7BCWVAJ76TG/show?bookId=01H3CH2XGJB6XPGR130H58A2T3&chapterId=01H3MWPBYS9N4X0NKFS0CFATVY&parentId=01H3MWPGR0NS9QQ0DW0WPGSE4P');
        await this.btnExamDetail.click();
    }

    async addNewChapter(){
        await this.btnAddChapter.click();
        await this.txtChapterName.fill('chapter name 1');
        await this.btnChapterSave.click();
    }

    async addNewTopic(){
        await this.btnAddTopic.click();
        await this.txtTopicName.fill('topic Name');
        await this.btnSave.click();
    }

    async addNewLO(){
        await this.btnAddLO.click();
        await this.lstLO.click();
        await this.ddlLO.click();
        await this.txtLOName.fill('abc');
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

}