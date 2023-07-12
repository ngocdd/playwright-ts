/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-12 10:16:26
*/

import { Page, Locator } from '@playwright/test';
import Actions from '../utils/actions/actions';

export default class LoginPage extends Actions {
  // list elements
  readonly page: Page;
  readonly txtOrgId: Locator;
  readonly txtUserName: Locator;
  readonly txtPassWord: Locator;
  readonly btnSubmit: Locator;
  readonly mnuLanguageOption: Locator;
  readonly drlLangEng: Locator;

  // constructor
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.txtOrgId = page.getByTestId('LoginTenantForm__textFieldOrganizations');
    this.txtUserName = page.getByTestId('LoginTenantForm__textFieldUsername');
    this.txtPassWord = page.getByTestId('LoginTenantForm__textFieldPassword');
    this.btnSubmit = page.getByTestId('LoginTenantForm__buttonLogin');
    this.mnuLanguageOption = page.getByTestId('LocaleSwitcher');
    this.drlLangEng = page.getByRole('menuitem', { name: 'ENGLISH' });
  }

  async login() {
    await this.goto(`${process.env.BASE_URL}`, 'go to login page');
    await this.click(this.mnuLanguageOption, 'tap on Language options');
    await this.click(this.drlLangEng, 'select Eng language');
    await this.input(this.txtOrgId, `${process.env.ORG_ID}`, 'input ORG_ID');
    await this.input(this.txtUserName, `${process.env.ADMIN_USERNAME}`, 'input user name');
    await this.input(this.txtPassWord, `${process.env.ADMIN_PASSWORD}`, 'input password');
    await this.click(this.btnSubmit, 'tap on login button');
  }
}
