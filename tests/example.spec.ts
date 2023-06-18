import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';

let homePage: HomePage;

test('test Elements page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.gotoElementPage();
  await page.pause();
});

test('test new',async () => {
  
});