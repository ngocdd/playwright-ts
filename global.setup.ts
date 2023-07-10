/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:59:31
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-10 21:59:31
*/

import { setEnv } from './utils/env/env'

async function globalSetup() {
  // setup env for run test
  await setEnv()
}

export default globalSetup
