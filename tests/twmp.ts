import { test, expect } from '@playwright/test';
import HomePage from '../page-objects/home-page';
import LoginPage from '../page-objects/login-page';
import { readJSONFile } from '../utils/data-provider/data-provider';
import { homedir } from 'os';
import { LOType } from '../utils/enumeration/enumeration';
import { setTimeout } from 'timers/promises';


test('test 1', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}`);
  await page.pause();
});


