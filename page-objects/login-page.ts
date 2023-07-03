/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 09:43:40                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-03 09:43:56                               *
 *****************************************************************************/

import { Page, Locator, expect } from "@playwright/test";
import HomePage from "./book-management-page";

let homePage: HomePage;

export default class LoginPage{
    // list elements
    readonly page:Page;
    readonly orgId: Locator;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly btnSubmit: Locator;
    readonly languageOption: Locator;
    readonly langEng: Locator;
    readonly profileName: Locator;

    // constructor
    constructor(page:Page){
        this.page = page;
        this.orgId = page.getByTestId('LoginTenantForm__textFieldOrganizations');
        this.userName = page.getByTestId('LoginTenantForm__textFieldUsername');
        this.passWord = page.getByTestId('LoginTenantForm__textFieldPassword');
        this.btnSubmit = page.getByTestId('LoginTenantForm__buttonLogin');
        this.languageOption = page.getByTestId('LocaleSwitcher');
        this.langEng = page.getByRole('menuitem',{name: 'ENGLISH'});
        this.profileName = page.getByTestId('Appbar__role');
    }

    // go to Login Page
    async gotoLoginPage(){
        await this.page.goto(`${process.env.BASE_URL}`);
        // await this.
    }

    async login(){
        homePage = new HomePage(this.page);
        await this.gotoLoginPage();
        await this.languageOption.click();
        await this.langEng.click();
        await this.orgId.fill(`${process.env.ORG_ID}`);
        await this.userName.fill(`${process.env.ADMIN_USERNAME}`);
        await this.passWord.fill(`${process.env.ADMIN_PASSWORD}`);
        await this.btnSubmit.click();
    }

    

}