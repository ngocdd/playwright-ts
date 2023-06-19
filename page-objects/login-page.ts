import { Page, Locator } from "@playwright/test";


export default class LoginPage{
    // list elements
    readonly page:Page;
    readonly orgId: Locator;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly btnSubmit: Locator;
    readonly languageOption: Locator;
    readonly langEng: Locator;

    // constructor
    constructor(page:Page){
        this.page = page;
        this.orgId = page.getByTestId('LoginTenantForm__textFieldOrganizations');
        this.userName = page.getByTestId('LoginTenantForm__textFieldUsername');
        this.passWord = page.getByTestId('LoginTenantForm__textFieldPassword');
        this.btnSubmit = page.getByTestId('LoginTenantForm__buttonLogin');
        this.languageOption = page.getByTestId('LocaleSwitcher');
        this.langEng = page.getByRole('menuitem',{name: 'ENGLISH'});
    }

    // go to Login Page
    async gotoLogin(){
        await this.page.goto(`${process.env.BASE_URL}`);
        // await this.
    }

    async login(){
        await this.languageOption.click();
        await this.langEng.click();
        await this.orgId.fill(`${process.env.ORD_ID}`);
        await this.userName.fill(`${process.env.ADMIN_USERNAME}`);
        await this.passWord.fill(`${process.env.ADMIN_PASSWORD}`);
        await this.btnSubmit.click();
    }

    

}