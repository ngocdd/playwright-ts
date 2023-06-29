import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';
import LoginPage from '../page-objects/login-page';
import { readJSONFile } from '../utils/data-provider/data-provider';
import { homedir } from 'os';
import { LOType } from '../utils/enumeration/enumeration';
import { setTimeout } from 'timers/promises';
import { STORAGE_STATE } from '../playwright.config';

let loginPage: LoginPage;

test('do login', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.login();

    // save storage
    // await page.context().storageState({ path: STORAGE_STATE });

});

