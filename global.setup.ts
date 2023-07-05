/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 09:44:56                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-03 09:44:57                               *
 *****************************************************************************/

import authenticate from './utils/auth/auth.setup'
import { setEnv } from './utils/env/env'

async function globalSetup() {
  // setup env for run test
  await setEnv()

  // get authentication for all tests
  // await authenticate();
}

export default globalSetup
