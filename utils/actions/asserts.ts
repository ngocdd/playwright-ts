/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-09 21:44:27                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-10 21:49:19                               *
 *****************************************************************************/

import { Page, test, expect } from '@playwright/test'
import Logger from '../logger/logger'

export default class Asserts {
  constructor(protected page: Page) {}

  public async toHaveText(locator: any, expectedText: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description)
      await expect(locator).toHaveText(expectedText)
    })
  }

  public async toEnable(locator: any, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description)
      await expect(locator).toBeEnabled()
    })
  }
}
