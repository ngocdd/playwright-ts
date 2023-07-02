import { Locator } from '@playwright/test';
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

export function readJSONFile(fileName: string): any {
    try {
        const fileContent = fs.readFileSync(`./utils/test-data/${fileName}.json`, 'utf8');
        const jsonData = JSON.parse(fileContent);
        // console.log(jsonData[0]['choices'][0]);
        return jsonData;
    } catch (error) {
        console.error('Error reading/parsing JSON file:', error);
        throw error;
    }
}

export function generateUUID(preFix?: string){
    let myuuid: string;
    myuuid = uuidv4();
    if(preFix){
        myuuid = preFix + '---' + myuuid;
        return myuuid;
    }else{
        return myuuid
    }
}

// export async function getListElements(Locators: ){
//     let listElements: (string) [];
//     listElements = [];
//     for(let i =0; i < Elements.length; i++){
//         const temp = await Elements[i].textContent();
//         listElements.push(String(temp));
//     };
//     return listElements;
// }