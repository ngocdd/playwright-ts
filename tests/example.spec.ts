import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';

let homePage: HomePage;

test('test Elements page', async ({ page }) => {
  homePage = new HomePage(page);
  homePage.gotoElementPage;
});
