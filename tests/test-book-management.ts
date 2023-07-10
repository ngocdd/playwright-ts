/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 09:44:20                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-10 08:56:40                               *
 *****************************************************************************/

import { test, expect, Locator } from '@playwright/test'
import BookManagementPage from '../page-objects/book-management-page'
import { readJSONFile, generateUUID } from '../utils/data-provider/data-provider'
import { LOType, MoveDirection } from '../utils/enumeration/enumeration'
import LoginPage from '../page-objects/login-page'

let loginPage: LoginPage
let bookMngPage: BookManagementPage

test.describe('test Book Management', async () => {
  test.beforeEach(async ({ page }) => {
    // INITIAL
    loginPage = new LoginPage(page)
    bookMngPage = new BookManagementPage(page)

    // PRECONDITIONS
    await loginPage.login()
  })

  test('test create new book', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book')

    // PRECONDITIONS
    // STEPS
    await bookMngPage.gotoBookManagement()
    await bookMngPage.addNewBook(bookName)

    // ASSERTIONS

    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have created a new book successfully',
      'check created a new book successfully notification'
    )
    await bookMngPage.asserts.toHaveText(
      bookMngPage.mnuBookName(bookName),
      bookName,
      `check table book contain book name is ${bookName}`
    )
  })

  test('test create new chapter', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book')
    let chapterName = await generateUUID('Chapter')

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement()
    await bookMngPage.addNewBook(bookName)
    await bookMngPage.gotoBookDetail(bookName)

    // STEPS
    await bookMngPage.addNewChapter(chapterName)

    // ASSERTIONS
    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have added chapter successfully',
      'check created a new chapter successfully notification'
    )
    await bookMngPage.asserts.toHaveText(
      bookMngPage.mnuChapter(chapterName),
      chapterName,
      `check chapter ${chapterName} created`
    )
  })

  test('test create new topic', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book')
    let chapterName = await generateUUID('Chapter')
    let topicName = await generateUUID('Topic')

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement()
    await bookMngPage.addNewBook(bookName)
    await bookMngPage.gotoBookDetail(bookName)
    await bookMngPage.addNewChapter(chapterName)

    // STEPS
    await bookMngPage.addNewTopic(chapterName, topicName)

    // ASSERTIONS
    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have added topic successfully',
      ` check success notification`
    )

    await expect(bookMngPage.mnuTopic(topicName)).toHaveText(topicName)
  })

  test('test create new LO', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book')
    let chapterName = await generateUUID('Chapter')
    let topicName = await generateUUID('Topic')
    let loName = await generateUUID('LO')

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement()
    await bookMngPage.addNewBook(bookName)
    await bookMngPage.gotoBookDetail(bookName)
    await bookMngPage.addNewChapter(chapterName)
    await bookMngPage.addNewTopic(chapterName, topicName)

    // STEPS
    await bookMngPage.addNewLO(topicName, LOType.LO, loName)
    await bookMngPage.backtoTopicDetail()

    // ASSERTIONS
    await expect(bookMngPage.snbMessage.last()).toHaveText('You have created a new LO successfully')
    await expect(bookMngPage.mnuLO(loName)).toHaveText(loName)
  })

  test('test move chapter', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book')
    let chapterName1 = await generateUUID('Chapter1')
    let chapterName2 = await generateUUID('Chapter2')
    let chapterName3 = await generateUUID('Chapter3')

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement()
    await bookMngPage.addNewBook(bookName)
    await bookMngPage.gotoBookDetail(bookName)
    await bookMngPage.addNewChapter(chapterName1)
    await bookMngPage.addNewChapter(chapterName2)
    await bookMngPage.addNewChapter(chapterName3)

    // STEPS
    await bookMngPage.moveChapter(chapterName1, MoveDirection.Down)
    await bookMngPage.moveChapter(chapterName3, MoveDirection.Up)

    // ASSERTIONS
    await expect(bookMngPage.btnMoveChapterDown(chapterName3)).toBeEnabled()
    const listOriginalChapter = await bookMngPage.lstChapter.all()
    let afterMove = []
    for (let i = 0; i < listOriginalChapter.length; i++) {
      const name = await listOriginalChapter[i].textContent()
      afterMove.push(name)
    }
    await expect(afterMove[0]).toEqual(chapterName2)
    await expect(afterMove[1]).toEqual(chapterName3)
    await expect(afterMove[2]).toEqual(chapterName1)
  })

  test('test move topic', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book')
    let chapterName = await generateUUID('Chapter')
    let topicName1 = await generateUUID('Topic1')
    let topicName2 = await generateUUID('Topic2')
    let topicName3 = await generateUUID('Topic3')

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement()
    await bookMngPage.addNewBook(bookName)
    await bookMngPage.gotoBookDetail(bookName)
    await bookMngPage.addNewChapter(chapterName)
    await bookMngPage.addNewTopic(chapterName, topicName1)
    await bookMngPage.addNewTopic(chapterName, topicName2)
    await bookMngPage.addNewTopic(chapterName, topicName3)

    //  STEPS
    await bookMngPage.moveTopic(topicName1, MoveDirection.Down)
    await bookMngPage.moveTopic(topicName3, MoveDirection.Up)

    // ASSERTIONS
    await expect(await bookMngPage.btnMoveTopicUp(topicName3)).toBeEnabled()
    const listOriginalChapter = await bookMngPage.lstTopic(chapterName).all()

    let afterMove = []
    for (let i = 0; i < listOriginalChapter.length; i++) {
      const name = await listOriginalChapter[i].textContent()
      afterMove.push(name)
    }

    await expect(afterMove[0]).toEqual(topicName2)
    await expect(afterMove[1]).toEqual(topicName3)
    await expect(afterMove[2]).toEqual(topicName1)
  })
})
