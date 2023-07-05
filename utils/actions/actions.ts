/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 17:31:21                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-05 20:14:32                               *
 *****************************************************************************/

import { test, Page } from '@playwright/test'

export default class Actions {
  constructor(protected page: Page) {}

  public async goto(URL: string, description: string) {
    await test.step(description, async () => {
      console.log(description)
      await this.page.goto(URL)
    })
  }
}
