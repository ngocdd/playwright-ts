/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:58:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-10 23:09:12
*/

import { test } from '@playwright/test'
import BookManagementPage from '../page-objects/book-management-page'
import { generateUUID } from '../utils/data-provider/data-provider'
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

    await bookMngPage.asserts.toHaveText(
      bookMngPage.mnuTopic(topicName),
      topicName,
      `check topic name ${topicName} created`
    )
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
    await bookMngPage.backToTopicDetail()

    // ASSERTIONS
    await bookMngPage.asserts.toHaveText(
      bookMngPage.snbMessage.last(),
      'You have created a new LO successfully',
      `check notification create LO successfully`
    )
    await bookMngPage.asserts.toHaveText(bookMngPage.mnuLO(loName), loName, `check lo name is ${loName} created`)
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
    await bookMngPage.asserts.toEnable(bookMngPage.btnMoveChapterDown(chapterName3), `check move button is enable`)
    const listOriginalChapter = await bookMngPage.lstChapter.all()
    let afterMove = []
    for (let i = 0; i < listOriginalChapter.length; i++) {
      const name = await listOriginalChapter[i].textContent()
      afterMove.push(name)
    }
    await bookMngPage.asserts.toHaveText(afterMove[0], chapterName2, `check move chapter 2`)
    await bookMngPage.asserts.toHaveText(afterMove[1], chapterName3, `check move chapter 3`)
    await bookMngPage.asserts.toHaveText(afterMove[2], chapterName1, `check move chapter 1`)
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
    await bookMngPage.asserts.toEnable(bookMngPage.btnMoveTopicUp(topicName3), `check move button is enable`)
    const listOriginalTopic = await bookMngPage.lstTopic(chapterName).all()

    let afterMove = []
    for (let i = 0; i < listOriginalTopic.length; i++) {
      const name = await listOriginalTopic[i].textContent()
      afterMove.push(name)
    }

    await bookMngPage.asserts.toHaveText(afterMove[0], topicName2, `check move topic 2`)
    await bookMngPage.asserts.toHaveText(afterMove[1], topicName3, `check move topic 3`)
    await bookMngPage.asserts.toHaveText(afterMove[2], topicName1, `check move topic 1`)
  })

  test('test move LO', async ({ page }) => {
    // INITIAL
    let bookName = await generateUUID('Book')
    let chapterName = await generateUUID('Chapter')
    let topicName = await generateUUID('Topic')
    let loName1 = await generateUUID('LO1')
    let loName2 = await generateUUID('LO2')
    let loName3 = await generateUUID('LO3')

    // PRECONDITIONS
    await bookMngPage.gotoBookManagement()
    await bookMngPage.addNewBook(bookName)
    await bookMngPage.gotoBookDetail(bookName)
    await bookMngPage.addNewChapter(chapterName)
    await bookMngPage.addNewTopic(chapterName, topicName)

    // STEPS
    await bookMngPage.addNewLO(topicName, LOType.LO, loName1)
    await bookMngPage.backToTopicDetail()
    await bookMngPage.addNewLO(topicName, LOType.LO, loName2)
    await bookMngPage.backToTopicDetail()
    await bookMngPage.addNewLO(topicName, LOType.LO, loName3)
    await bookMngPage.backToTopicDetail()

    // ASSERTIONS
    await bookMngPage.asserts.toEnable(bookMngPage.btnMoveTopicUp(loName3), `check move button is enable`)
    const listOriginalLO = await bookMngPage.lstTopic(chapterName).all()

    let afterMove = []
    for (let i = 0; i < listOriginalLO.length; i++) {
      const name = await listOriginalLO[i].textContent()
      afterMove.push(name)
    }

    await bookMngPage.asserts.toHaveText(afterMove[0], loName2, `check move topic 2`)
    await bookMngPage.asserts.toHaveText(afterMove[1], loName2, `check move topic 3`)
    await bookMngPage.asserts.toHaveText(afterMove[2], loName1, `check move topic 1`)
  })
})
