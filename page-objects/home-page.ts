import { Page, expect, Locator } from "@playwright/test";


export default class HomePage_{
    // list elements
    readonly page:Page;
    readonly orgId: Locator;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly btnSubmit: Locator;


    constructor(page:Page){
        this.page = page;
        this.orgId = page.getByTestId('LoginTenantForm__textFieldOrganizations');
        this.userName = page.getByTestId('LoginTenantForm__textFieldUsername');
        this.passWord = page.getByTestId('LoginTenantForm__textFieldPassword');
        this.btnSubmit = page.getByTestId('LoginTenantForm__buttonLogin');
    }

    // list Elements
    async gotoHomePage(){
        await this.page.goto('https://backoffice.uat.manabie.io/');
        // await this.
    }

    async login(){
        await this.orgId.fill('manabie');
        await this.userName.fill('');
    }

}