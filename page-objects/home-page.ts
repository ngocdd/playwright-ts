import { Page, expect, Locator } from "@playwright/test";


export default class HomePage{
    // list elements
    readonly page:Page;
    readonly lmMenu: Locator;
    readonly lmBook: Locator;
    readonly btnAddBook: Locator;
    readonly txtInputText: Locator;
    readonly FooterDialogConfirm__buttonSave: Locator;
    readonly dialogSuccess: Locator;
    readonly btnAddChapter: Locator;
    readonly btnChapterSave: Locator;
    readonly btnAddTopic: Locator;
    readonly btnAddLO: Locator;
    readonly listLO: Locator;
    readonly LO: Locator;



    // constructor
    constructor(page:Page){
        this.page = page;
        this.lmMenu = page.getByTestId('MenuGroup__root').getByText('Learning Material');
        this.lmBook = page.getByLabel('Book', {exact: true});
        this.btnAddBook = page.getByTestId('AddBook__addButton');
        this.txtInputText = page.getByTestId('TextFieldHF__input');
        this.FooterDialogConfirm__buttonSave = page.getByTestId('FooterDialogConfirm__buttonSave');
        this.dialogSuccess = page.getByTestId('SnackbarBase__content');
        this.btnAddChapter = page.getByTestId('ChapterForm__visibleFormControl');
        this.btnChapterSave = page.getByTestId('ChapterForm__submit');
        this.btnAddTopic = page.getByTestId('TopicList__createTopic');
        this.btnAddLO = page.getByTestId('LOAndAssignment__addLOs');
        this.listLO = page.getByTestId('SelectHF__select');
        this.LO = page.getByRole('listbox').and(page.getByText('Learning Objective', {exact: true}));
    }

    // 
    async gotoBookManagement(){
        await this.lmMenu.click();
        await this.lmBook.click();
    }

    async addNewBook(bookName:string){
        this.btnAddBook.click();
        this.txtInputText.fill(bookName);
        this.FooterDialogConfirm__buttonSave.click();
        console.log(this.dialogSuccess.textContent());
    }

    async gotoBookDetail(bookId?:string){
        if (bookId){
            this.page.goto(`${process.env.BASE_URL}syllabus/books/${bookId}/show`);
        }

    }

    async addNewChapter(){
        await this.btnAddChapter.click();
        await this.txtInputText.fill('chapter name 1');
        await this.btnChapterSave.click();
        
    }


}