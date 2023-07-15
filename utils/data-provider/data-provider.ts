/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:59:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-15 12:28:56
*/

import * as fs from 'fs-extra';
import { v4 as UIDv4 } from 'uuid';
import { RanDomTypes } from '../enumeration/enumeration';
const short = require('short-uuid');

export function readJSONFile(fileName: string): any {
  try {
    const fileContent = fs.readFileSync(`./test-data/${fileName}.json`, 'utf8');
    const jsonData = JSON.parse(fileContent);
    // console.log(jsonData[0]['choices'][0]);
    return jsonData;
  } catch (error) {
    console.error('Error reading/parsing JSON file:', error);
    throw error;
  }
}

export function generateRandom(preFix?: string | undefined, type?: RanDomTypes) {
  const now = new Date();
  let myRandom = '';
  if (type === RanDomTypes.text && preFix) {
    return (myRandom = preFix + '--' + short.generate());
  } else if (type === RanDomTypes.date && preFix) {
    return (myRandom = preFix + '--' + now.toISOString());
  } else if (type === RanDomTypes.text_and__date && preFix) {
    return (myRandom = preFix + '--' + now.toISOString() + '-' + short.generate());
  } else if (type === RanDomTypes.text) {
    return (myRandom = short.generate());
  } else if (type === RanDomTypes.date) {
    return (myRandom = now.toISOString());
  } else {
    return (myRandom = UIDv4());
  }
}
