/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:59:14
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-10 21:59:14
*/

import * as fs from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'

export function readJSONFile(fileName: string): any {
  try {
    const fileContent = fs.readFileSync(`./utils/test-data/${fileName}.json`, 'utf8')
    const jsonData = JSON.parse(fileContent)
    // console.log(jsonData[0]['choices'][0]);
    return jsonData
  } catch (error) {
    console.error('Error reading/parsing JSON file:', error)
    throw error
  }
}

export function generateUUID(preFix?: string) {
  let myuuid: string
  myuuid = uuidv4()
  if (preFix) {
    myuuid = preFix + '---' + myuuid
    return myuuid
  } else {
    return myuuid
  }
}
