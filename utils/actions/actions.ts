/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-12 09:51:23
*/

import { test, Page, Locator } from '@playwright/test';
import Logger from '../logger/logger';

export default class Actions {
  constructor(protected page: Page) {}

  public async goto(URL: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await this.page.goto(URL);
    });
  }

  public async input(locator: Locator, text: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await locator.fill(text);
    });
  }

  public async click(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await locator.click();
    });
  }

  public async uploadFile(locator: any, filePath: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await locator.setInputFiles(filePath);
    });
  }

  public async uploadFiles(locator: any, listFilePath: [], description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await locator.setInputFiles(listFilePath);
    });
  }
}
