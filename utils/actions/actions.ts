/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 17:31:21                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-07 22:36:20                               *
 *****************************************************************************/

import { test, Page, Locator } from '@playwright/test'
import Logger from '../logger/logger'

export default class Actions {
  constructor(protected page: Page) {}

  public async goto(URL: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description)
      await this.page.goto(URL)
    })
  }

  public async input(locator: Locator, text: string, description: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description)
      await locator.fill(text)
    })
  }

  public async click(locator: any, description: string, locatorText?: string) {
    await test.step(description, async () => {
      Logger.info(`worker ${process.env.TEST_WORKER_INDEX}: ` + description)
      if (locatorText) {
        await locator(locatorText).click()
      } else {
        await locator.click()
      }
    })
  }
}
