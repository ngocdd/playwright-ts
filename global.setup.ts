/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 09:44:56                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-10 14:37:29                               *
 *****************************************************************************/

import { setEnv } from './utils/env/env'

async function globalSetup() {
  // setup env for run test
  await setEnv()
}

export default globalSetup
