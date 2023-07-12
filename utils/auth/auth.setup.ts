/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:59:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-12 09:54:23
*/

// import { Browser, Page, chromium } from '@playwright/test'
// import LoginPage from '../../page-objects/login-page'

// let loginPage: LoginPage

// async function authenticate() {
//   const browser: Browser = await chromium.launch({
//     headless: true,
//   })
//   const context = await browser.newContext()
//   const page: Page = await context.newPage()
//   loginPage = new LoginPage(page)

//   await loginPage.login()

//   await page.context().storageState({ path: './utils/auth/admin.json' })
//   // Dont forget your clean up :)
//   await browser.close()
// }

// export default authenticate
