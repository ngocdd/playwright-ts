import { Page, expect, Locator } from "@playwright/test";


export default class HomePage{
    // list elements
    readonly page:Page;
    readonly lmMenu: Locator;
    readonly lmBook: Locator;
    readonly btnAddBook: Locator;
    readonly txtChapterName: Locator;
    readonly FooterDialogConfirm__buttonSave: Locator;
    readonly dialogSuccess: Locator;
    readonly btnAddChapter: Locator;
    readonly btnChapterSave: Locator;
    readonly btnAddTopic: Locator;
    readonly btnAddLO: Locator;
    readonly listLO: Locator;
    readonly LO: Locator;
    readonly txtTopicName: Locator;
    readonly txtLOName: Locator;
    readonly btnQuestions: Locator;
    readonly createQuesiton: Locator;s



    // constructor
    constructor(page:Page){
        this.page = page;
        this.lmMenu = page.getByTestId('MenuGroup__root').getByText('Learning Material');
        this.lmBook = page.getByLabel('Book', {exact: true});
        this.btnAddBook = page.getByTestId('AddBook__addButton');
        this.txtChapterName = page.getByTestId('ChapterForm__root').getByTestId('TextFieldHF__input');
        this.txtTopicName = page.getByTestId('TopicForm__root').getByTestId('TextFieldHF__input');
        this.FooterDialogConfirm__buttonSave = page.getByTestId('FooterDialogConfirm__buttonSave');
        this.dialogSuccess = page.getByTestId('SnackbarBase__content');
        this.btnAddChapter = page.getByTestId('ChapterForm__visibleFormControl');
        this.btnChapterSave = page.getByTestId('ChapterForm__submit');
        this.btnAddTopic = page.getByTestId('TopicList__createTopic');
        this.btnAddLO = page.getByTestId('LOAndAssignment__addLOs');
        this.listLO = page.getByTestId('SelectHF__select');
        this.LO = page.getByRole('option').getByText('Learning Objective');
        this.txtLOName = page.getByTestId('TextFieldHF__input');
        this.btnQuestions = page.getByTestId('QuestionListSectionHeader__action').getByTestId('ActionPanel__trigger');
        this.createQuesiton = page.getByLabel('createQuestion', {exact: true});
    }

    // 
    async gotoBookManagement(){
        await this.lmMenu.click();
        await this.lmBook.click();
    }

    async addNewBook(bookName:string){
        await this.btnAddBook.click();
        await this.txtChapterName.fill(bookName);
        await this.FooterDialogConfirm__buttonSave.click();
        console.log(this.dialogSuccess.textContent());
    }

    async gotoBookDetail(bookId?:string){
        if (bookId){
            await this.gotoBookManagement();
            await this.page.goto(`${process.env.BASE_URL}syllabus/books/${bookId}/show`);
        }

    }

    async addNewChapter(){
        await this.btnAddChapter.click();
        await this.txtChapterName.fill('chapter name 1');
        await this.btnChapterSave.click();
    }

    async addNewTopic(){
        await this.btnAddTopic.click();
        await this.txtTopicName.fill('topic Name');
        await this.FooterDialogConfirm__buttonSave.click();
    }

    async addNewLO(){
        await this.btnAddLO.click();
        await this.listLO.click();
        await this.LO.click();
        await this.txtLOName.fill('abc');
        await this.FooterDialogConfirm__buttonSave.click();
    }

    async addNewQuestion(){
        await this.btnQuestions.click();
        await this.createQuesiton.click();
    }

}