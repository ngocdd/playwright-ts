/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:59:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-12 09:43:47
*/

import { Page, test, expect } from '@playwright/test';
import Logger from '../logger/logger';

export default class Asserts {
  constructor(protected page: Page) {}

  public async toHaveText(locator: any, expectedText: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toHaveText(expectedText);
    });
  }

  public async toContainText(locator: any, expectedText: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toContainText(expectedText);
    });
  }

  public async toHaveValue(locator: any, expectedValue: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toHaveValue(expectedValue);
    });
  }

  public async toHaveValues(locator: any, listExpectedValues: [], description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toHaveValues(listExpectedValues);
    });
  }

  public async toBeEnable(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeEnabled();
    });
  }

  public async toBeDisabled(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeDisabled();
    });
  }

  public async toBeAttached(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeAttached();
    });
  }

  public async toBeChecked(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeChecked();
    });
  }

  public async toBeEditable(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeEditable();
    });
  }

  public async toBeEmpty(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeEmpty();
    });
  }

  public async toBeFocused(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeFocused();
    });
  }

  public async toBeHidden(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeHidden();
    });
  }

  public async toBeInViewport(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeInViewport();
    });
  }

  public async toBeVisible(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toBeVisible();
    });
  }

  public async toHaveAttribute(locator: any, attributeName: string, attributeValue: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description);
      await expect(locator).toHaveAttribute(attributeName, attributeValue);
    });
  }
}
