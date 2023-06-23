import * as fs from 'fs-extra';

export function DataProvider(fileName: string){
    let jsonData;
    const filePath = `./utils/test-data/${fileName}.json`;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        try {
            jsonData = JSON.parse(data);
            return jsonData;
        } catch (parseError) {
            console.error('Error parsing JSONs:', parseError);
        }
    })
    console.log(jsonData);
    return jsonData;
}

console.log(DataProvider('question'));