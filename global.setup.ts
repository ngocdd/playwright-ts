import { test as setup, expect } from '@playwright/test';
import LoginPage from './page-objects/login-page';
import { STORAGE_STATE } from './playwright.config';


setup('do login', async ({ page }) => {
    let loginPage = new LoginPage(page);
    loginPage.gotoLogin();
    loginPage.login();

    // save storage
    await page.context().storageState({ path: STORAGE_STATE });

});

