/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-09 21:44:27                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-09 21:53:15                               *
 *****************************************************************************/

/**
 * List of assertions
Assertion	Description
expect(locator).toBeAttached()	Element is attached
expect(locator).toBeChecked()	Checkbox is checked
expect(locator).toBeDisabled()	Element is disabled
expect(locator).toBeEditable()	Element is editable
expect(locator).toBeEmpty()	Container is empty
expect(locator).toBeEnabled()	Element is enabled
expect(locator).toBeFocused()	Element is focused
expect(locator).toBeHidden()	Element is not visible
expect(locator).toBeInViewport()	Element intersects viewport
expect(locator).toBeVisible()	Element is visible
expect(locator).toContainText()	Element contains text
expect(locator).toHaveAttribute()	Element has a DOM attribute
expect(locator).toHaveClass()	Element has a class property
expect(locator).toHaveCount()	List has exact number of children
expect(locator).toHaveCSS()	Element has CSS property
expect(locator).toHaveId()	Element has an ID
expect(locator).toHaveJSProperty()	Element has a JavaScript property
expect(locator).toHaveScreenshot()	Element has a screenshot
expect(locator).toHaveText()	Element matches text
expect(locator).toHaveValue()	Input has a value
expect(locator).toHaveValues()	Select has options selected
expect(page).toHaveScreenshot()	Page has a screenshot
expect(page).toHaveTitle()	Page has a title
expect(page).toHaveURL()	Page has a URL
expect(apiResponse).toBeOK()	Response has an OK status
 * 
 */

import { Page, test, expect } from '@playwright/test'
import { SrvRecord } from 'dns'

export default class Asserts {
  constructor(protected page: Page) {}

  public async toHaveText(locator: any, expectedText: string, description: string, locatorText?: string) {
    await test.step(description, async () => {
      if (locatorText) {
        await expect(locator(locatorText)).toHaveText(expectedText)
      } else {
        await expect(locator).toHaveText(expectedText)
      }
    })
  }

  public async toEquad(locator: any, toEquad: string, description: string, locatorText: string) {
    await test.step(description, async () => {
      await locator.toEquad()
    })
  }
}
