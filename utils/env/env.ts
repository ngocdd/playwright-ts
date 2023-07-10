/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:59:24
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-10 21:59:24
*/

export function setEnv() {
  // default ENV is UAT
  if (!process.env.ENV) {
    process.env['ENV'] = 'stg'
  }

  // decrypt en
  require('@tka85/dotenvenc').decrypt({
    encryptedFile: `./utils/env/.${process.env.ENV}.enc`,
  })
}
